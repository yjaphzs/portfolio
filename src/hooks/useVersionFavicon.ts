import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Swaps the document favicons to the archived v1 icon set while an archived
 * portfolio version is being viewed, and back again on the way out.
 *
 * Extracted verbatim from the original VersionSwitcher, which owned this as a
 * side effect. It lives in its own hook now so the version-switching UI can be
 * swapped or fall back without silently taking favicon behaviour with it.
 * Call it from a component that is mounted on every route.
 */
export function useVersionFavicon() {
  const location = useLocation();
  const faviconPrefix = location.pathname.startsWith("/archived") ? "/v1" : "";

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
