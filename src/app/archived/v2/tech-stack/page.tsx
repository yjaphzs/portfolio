import TechStack from "./TechStack";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Tech Stack — Portfolio v2",
  description:
    "The tech stack page from the archived v2 portfolio.",
  path: "/archived/v2/tech-stack",
});

export default function ArchivedV2TechStackPage() {
  return <TechStack />;
}
