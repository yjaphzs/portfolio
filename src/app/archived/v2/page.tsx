import NewPortfolio from "./NewPortfolio";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Portfolio v2 (2026, archived)",
  description:
    "The clean, CV-style portfolio with dark mode, kept online as an archive. Superseded by the current site.",
  path: "/archived/v2",
});

export default function ArchivedV2Page() {
  return <NewPortfolio />;
}
