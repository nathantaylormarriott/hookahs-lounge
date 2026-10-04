// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const nitroOptions = {
  // Netlify: static assets in `dist/`, SSR handler in `.netlify/functions-internal/`.
  preset: "netlify",
  // Leave the native Chrome-impersonation package outside the bundle. Netlify's Linux
  // install traces impit and its platform binary into the function.
  rollupConfig: {
    external: ["impit"],
  },
  traceDeps: ["impit"],
};

export default defineConfig({
  nitro: nitroOptions as { preset: string },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
