import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
   * Static export. `next build` writes one HTML file per route into out/ —
   * out/index.html, out/stack.html, …, out/404.html — with no Node runtime
   * behind them. Firebase Hosting serves that directory as-is.
   *
   * Consequences worth remembering before reaching for a Next feature:
   * rewrites, redirects, headers, cookies, Server Actions and ISR are all
   * unavailable here. Cache headers live in firebase.json instead.
   */
  output: "export",

  /*
   * No image optimizer without a server. Static imports still give next/image
   * real intrinsic width/height (so layout is stable) — they just aren't
   * resized or re-encoded at request time.
   */
  images: { unoptimized: true },

  /*
   * Matches firebase.json's `"trailingSlash": false` + `"cleanUrls": true`:
   * /stack is served from stack.html. The two must agree, or every version-
   * switcher path check (which compares pathnames exactly) silently fails.
   */
  trailingSlash: false,
};

export default nextConfig;
