import { SITE_URL } from "@/lib/seo";

/**
 * BreadcrumbList structured data for the detail pages.
 *
 * Google uses this to replace the raw URL in the result with a readable trail
 * ("yjaphzs.xyz › Tech Stack"), and it states the hierarchy explicitly rather
 * than leaving it to be inferred from the URL. The visible trail already exists
 * as the rail's "home" link, so this adds no UI.
 */
export function Breadcrumbs({ name, path }: { name: string; path: string }) {
  const graph = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name,
        item: `${SITE_URL}${path}`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  );
}
