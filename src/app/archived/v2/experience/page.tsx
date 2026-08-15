import Experience from "./Experience";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Experience — Portfolio v2",
  description:
    "The experience page from the archived v2 portfolio.",
  path: "/archived/v2/experience",
});

export default function ArchivedV2ExperiencePage() {
  return <Experience />;
}
