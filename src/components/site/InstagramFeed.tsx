import { useEffect, useState } from "react";
import { LOUNGE } from "@/lib/lounge";
import { getInstagramFeed, type InstagramPost } from "@/lib/instagram";

export function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    getInstagramFeed()
      .then((next) => {
        if (!cancelled) setPosts(next);
      })
      .catch(() => {
        if (!cancelled) setPosts([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="instagram" className="relative scroll-mt-28 px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="eyebrow">Instagram</span>
          <a
            href={LOUNGE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="section-title-shadow mt-4 block text-[clamp(2rem,4.6vw,3.6rem)] leading-[0.92] font-medium tracking-[-0.045em] transition-colors hover:text-gold"
          >
            @hookahsloungeuk
          </a>
        </div>

        {posts === null ? (
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
            {Array.from({ length: 4 }, (_, index) => (
              <div key={index} className="aspect-[3/4] rounded-2xl bg-foreground/8" />
            ))}
          </div>
        ) : posts.length > 0 ? (
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
            {posts.map((post) => (
              <a
                key={post.id}
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-[3/4] overflow-hidden rounded-2xl"
              >
                {post.videoUrl ? (
                  <video
                    src={post.videoUrl}
                    poster={post.image}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    referrerPolicy="no-referrer"
                    disablePictureInPicture
                    aria-label={post.caption || "Post from Hookahs Lounge Birmingham"}
                    ref={(node) => {
                      if (node) node.muted = true;
                    }}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <img
                    src={post.image}
                    alt={post.caption || "Post from Hookahs Lounge Birmingham"}
                    width={640}
                    height={853}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                )}
              </a>
            ))}
          </div>
        ) : (
          <a
            href={LOUNGE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 block text-center text-sm tracking-[0.16em] text-gold uppercase"
          >
            Follow on Instagram
          </a>
        )}
      </div>
    </section>
  );
}
