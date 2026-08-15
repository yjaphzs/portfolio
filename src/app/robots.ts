import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo";

/** Emitted as a file at build time — there is no server to generate it. */
export const dynamic = "force-static";

/**
 * Deliberately no `disallow: "/archived/"`.
 *
 * Blocking those paths here would stop crawlers fetching them at all, which
 * means they would never read the `noindex` those pages carry — and a blocked
 * URL can still be indexed as a bare link with no snippet. Letting crawlers in
 * so they can see the `noindex`, plus leaving the archives out of the sitemap,
 * is the combination that actually keeps them out of results.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
