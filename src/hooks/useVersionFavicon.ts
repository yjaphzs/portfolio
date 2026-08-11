import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { versionForPath } from "@/data/versions";

/**
 * Swaps the document favicons to whichever set the current portfolio version
 * owns, and back again on the way out.
 *
 * The prefix is resolved per-version from `versions.ts` rather than by sniffing
 * the path. The previous `startsWith("/archived") ? "/v1"` shortcut worked only
 * while exactly one archived version existed — a second would silently inherit
 * v1's icons. Unknown routes (404) fall back to the root set.
 *
 * Call it from a component that is mounted on every route.
 */
export function useVersionFavicon() {
  const location = useLocation();
  const faviconPrefix = versionForPath(location.pathname)?.faviconPrefix ?? "";

  useEffect(() => {
    const updateFavicon = (selector: string, path: string) => {
      const el = document.querySelector<HTMLLinkElement>(selector);
      if (el) el.href = path;
    };

    const cacheBust = `?v=${Date.now()}`;
    updateFavicon(
      'link[rel="icon"][sizes="any"]',
      `${faviconPrefix}/favicon.ico${cacheBust}`
    );
    updateFavicon(
      'link[rel="icon"][sizes="32x32"]',
      `${faviconPrefix}/favicon-32x32.png${cacheBust}`
    );
    updateFavicon(
      'link[rel="icon"][sizes="16x16"]',
      `${faviconPrefix}/favicon-16x16.png${cacheBust}`
    );
    updateFavicon(
      'link[rel="apple-touch-icon"]',
      `${faviconPrefix}/apple-touch-icon.png${cacheBust}`
    );
  }, [faviconPrefix]);
}
