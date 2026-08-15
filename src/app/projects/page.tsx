import projects from "@/data/projects";

import { PageShell } from "@/components/v3/PageShell";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Projects",
  description:
    "Everything worth showing, work and personal — university platforms, fintech portals and side builds.",
  path: "/projects",
});


export default function ProjectsPage() {
  return (
    <>
      <Breadcrumbs name="Projects" path="/projects" />
      <PageShell
      sectionId="projects"
      title="projects"
      intro="Everything worth showing, work and personal."
    >
      <ul className="space-y-8">
        {projects.map((p) => (
          <li key={p.title}>
            {/* The project name is this entry's heading. Size and weight sit
                on the h2 so the anchor inherits them and nothing shifts. */}
            <h2 className="flex items-baseline justify-between gap-4 text-[15px] font-medium">
              {/* Not every project has a public URL — the homepage assumes one. */}
              {p.url ? (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-crt-ink no-underline transition-colors hover:text-crt-accent"
                >
                  {p.title} ↗
                </a>
              ) : (
                <span className="text-crt-ink">{p.title}</span>
              )}
            </h2>
            <p className="mt-0.5 font-crt-mono text-[10px] uppercase tracking-[0.05em] text-crt-muted">
              {p.fullTitle}
            </p>
            <p className="mt-2 text-[14px] text-crt-secondary">
              {p.description}
            </p>
            <p className="mt-2 font-crt-mono text-[10px] uppercase tracking-[0.05em] text-crt-muted">
              {p.tech.join(" · ")}
            </p>
          </li>
        ))}
      </ul>
      </PageShell>
    </>
  );
}
