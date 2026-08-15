import type { MetadataRoute } from "next";

import { versions } from "@/data/versions";
import { SITE_URL } from "@/lib/seo";

/** Emitted as a file at build time — there is no server to generate it. */
export const dynamic = "force-static";

/**
 * The live routes only.
 *
 * Derived from the version marked `latest` rather than hand-listed, so the
 * archived versions are excluded structurally: a future v4 that pushes v3 into
 * the archive drops out of the sitemap on its own, and no one has to remember
 * to prune this file. Matches the `noindex` those routes carry.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const latest = versions.find((v) => v.category === "latest");
  if (!latest) return [];

  const paths = [latest.path, ...(latest.subPaths ?? [])];
  const lastModified = new Date();

  return paths.map((path) => ({
    url: new URL(path, SITE_URL).toString(),
    lastModified,
    changeFrequency: path === "/" ? "monthly" : "yearly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
