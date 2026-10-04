import { createServerFn } from "@tanstack/react-start";

const PROFILE_URL = "https://www.instagram.com/hookahsloungeuk/";
const CACHE_MS = 15 * 60 * 1000;
const POST_LIMIT = 4;

export type InstagramPost = {
  id: string;
  href: string;
  image: string;
  videoUrl?: string;
  caption: string;
  video: boolean;
};

type TimelineNode = {
  code?: string;
  display_uri?: string;
  media_type?: number;
  product_type?: string;
  accessibility_caption?: string | null;
  caption?: { text?: string } | null;
};

type FetchClient = {
  fetch: (url: string, init?: RequestInit) => Promise<{ ok: boolean; text: () => Promise<string> }>;
};

let cache: { at: number; posts: InstagramPost[] } | null = null;

function extractTimeline(html: string): { edges: Array<{ node: TimelineNode }> } | null {
  const key = "polaris_ordered_timeline_connection";
  const start = html.indexOf(key);
  if (start < 0) return null;

  let slice = html.slice(start + key.length);
  if (slice.startsWith('\\"')) {
    slice = slice.replace(/\\"/g, '"').replace(/\\\//g, "/");
  }

  const brace = slice.indexOf("{");
  if (brace < 0) return null;

  let depth = 0;
  let end = 0;
  let inString = false;
  let escaped = false;
  for (let i = brace; i < slice.length; i++) {
    const char = slice[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === '"') inString = false;
      continue;
    }
    if (char === '"') {
      inString = true;
      continue;
    }
    if (char === "{") depth += 1;
    else if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        end = i + 1;
        break;
      }
    }
  }
  if (!end) return null;

  try {
    return JSON.parse(slice.slice(brace, end)) as { edges: Array<{ node: TimelineNode }> };
  } catch {
    return null;
  }
}

function postedAt(node: TimelineNode): number | null {
  const match = node.accessibility_caption?.match(/on ([A-Za-z]+ \d{1,2}, \d{4})/);
  if (!match) return null;
  const time = Date.parse(match[1]);
  return Number.isNaN(time) ? null : time;
}

/** Pinned posts are placed first and break newest-first order. Keep the ordered run. */
function withoutPinned(edges: Array<{ node: TimelineNode }>) {
  const dates = edges.map((edge) => postedAt(edge.node));
  for (let start = 0; start < edges.length; start++) {
    let ordered = true;
    for (let index = start + 1; index < edges.length; index++) {
      const previous = dates[index - 1];
      const next = dates[index];
      if (previous != null && next != null && previous < next) {
        ordered = false;
        break;
      }
    }
    if (ordered) return edges.slice(start);
  }
  return edges;
}

function parsePosts(html: string): InstagramPost[] {
  const timeline = extractTimeline(html);
  if (!timeline?.edges) return [];

  const posts: InstagramPost[] = [];
  for (const edge of withoutPinned(timeline.edges)) {
    const node = edge.node;
    const code = node.code;
    const image = node.display_uri;
    if (!code || !image?.startsWith("https://")) continue;
    const video = node.product_type === "clips" || node.media_type === 2;
    const caption = node.caption?.text?.split("\n").find((line) => line.trim())?.trim() ?? "";
    posts.push({
      id: code,
      href: video
        ? `https://www.instagram.com/reel/${code}/`
        : `https://www.instagram.com/p/${code}/`,
      image,
      caption,
      video,
    });
    if (posts.length >= POST_LIMIT) break;
  }
  return posts;
}

function extractBalanced(source: string, open: "[" | "{", close: "]" | "}"): string | null {
  let depth = 0;
  let end = 0;
  let inString = false;
  let escaped = false;
  for (let index = 0; index < source.length; index++) {
    const char = source[index];
    if (inString) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === '"') inString = false;
      continue;
    }
    if (char === '"') {
      inString = true;
      continue;
    }
    if (char === open) depth += 1;
    else if (char === close) {
      depth -= 1;
      if (depth === 0) {
        end = index + 1;
        break;
      }
    }
  }
  return end ? source.slice(0, end) : null;
}

function pickVideoUrl(html: string): string | undefined {
  const marker = html.indexOf('"video_versions"');
  if (marker < 0) return undefined;
  const start = html.indexOf("[", marker);
  if (start < 0) return undefined;
  const json = extractBalanced(html.slice(start), "[", "]");
  if (!json) return undefined;
  try {
    const versions = JSON.parse(json) as Array<{ type?: number; url?: string }>;
    const chosen = versions.find((version) => version.type === 103) ?? versions.at(-1);
    return chosen?.url?.startsWith("https://") ? chosen.url : undefined;
  } catch {
    return undefined;
  }
}

async function attachVideos(client: FetchClient, posts: InstagramPost[], signal: AbortSignal) {
  await Promise.all(
    posts.map(async (post) => {
      if (!post.video || signal.aborted) return;
      try {
        const response = await client.fetch(`https://www.instagram.com/reel/${post.id}/`, {
          headers: { "accept-language": "en-GB,en;q=0.9" },
          signal,
        });
        if (!response.ok) return;
        post.videoUrl = pickVideoUrl(await response.text());
      } catch {
        post.videoUrl = undefined;
      }
    }),
  );
}

export const getInstagramFeed = createServerFn({ method: "GET" }).handler(async () => {
  if (cache && Date.now() - cache.at < CACHE_MS) return cache.posts;

  try {
    const { Impit } = await import("impit");
    const client = new Impit({ browser: "chrome" });
    const signal = AbortSignal.timeout(8000);
    const response = await client.fetch(PROFILE_URL, {
      headers: { "accept-language": "en-GB,en;q=0.9" },
      signal,
    });
    if (!response.ok) return cache?.posts ?? [];
    const posts = parsePosts(await response.text());
    if (posts.length === 0) return cache?.posts ?? [];
    await attachVideos(client, posts, signal);
    cache = { at: Date.now(), posts };
    return posts;
  } catch (error) {
    console.error("Instagram feed failed", error);
    return cache?.posts ?? [];
  }
});
