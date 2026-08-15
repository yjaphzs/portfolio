import type { Metadata } from "next";

/**
 * Shared chrome for every archived portfolio version.
 *
 * Its only job is the robots directive. Once each route became real prerendered
 * HTML, v1 and v2 turned into fully crawlable copies of the same bio, roles and
 * projects as the live site — three documents competing for the same queries,
 * with Google picking which one is canonical. `noindex` settles it.
 *
 * `follow` is deliberate: the archives link to /resume and back to the live
 * site, and that link equity should still flow.
 *
 * Metadata merges field-by-field down the tree, so declaring it once here
 * covers v1, v2, every v2 sub-page, and any archive added later.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function ArchivedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
