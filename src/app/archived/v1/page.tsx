import type { Metadata } from "next";

import ArchivedPortfolio from "@/components/v1/ArchivedPortfolio";
import { versions } from "@/data/versions";
import { pageMetadata } from "@/lib/seo";

const version = versions.find((v) => v.id === "archived-v1");
/* Built from the version record so a new archive with its own icons stays a
   one-file change. `noindex` itself comes from app/archived/layout.tsx. */
const prefix = version?.faviconPrefix ?? "";

export const metadata: Metadata = {
  ...pageMetadata({
    title: `${version?.label ?? "Portfolio v1"} (${version?.year ?? "2025"}, archived)`,
    description:
      "The original animated full-screen portfolio, kept online as an archive. Superseded by the current site.",
    path: "/archived/v1",
  }),
  icons: {
    icon: [
      { url: `${prefix}/favicon.ico`, sizes: "any" },
      { url: `${prefix}/favicon-32x32.png`, type: "image/png", sizes: "32x32" },
      { url: `${prefix}/favicon-16x16.png`, type: "image/png", sizes: "16x16" },
    ],
    apple: [{ url: `${prefix}/apple-touch-icon.png`, sizes: "180x180" }],
  },
  manifest: `${prefix}/site.webmanifest`,
};

export default function ArchivedV1Page() {
  return <ArchivedPortfolio />;
}
