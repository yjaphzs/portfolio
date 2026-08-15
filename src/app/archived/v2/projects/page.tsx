import Projects from "./Projects";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Projects — Portfolio v2",
  description:
    "The projects page from the archived v2 portfolio.",
  path: "/archived/v2/projects",
});

export default function ArchivedV2ProjectsPage() {
  return <Projects />;
}
