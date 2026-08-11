import projects from "@/data/projects";

import { PageShell } from "./components/PageShell";

export default function ProjectsPage() {
  return (
    <PageShell
      sectionId="projects"
      title="projects"
      intro="Everything worth showing, work and personal."
    >
      <ul className="space-y-8">
        {projects.map((p) => (
          <li key={p.title}>
            <div className="flex items-baseline justify-between gap-4">
              {/* Not every project has a public URL — the homepage assumes one. */}
              {p.url ? (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-[15px] font-medium text-crt-ink no-underline transition-colors hover:text-crt-accent"
                >
                  {p.title} ↗
                </a>
              ) : (
                <span className="text-[15px] font-medium text-crt-ink">
                  {p.title}
                </span>
              )}
            </div>
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
  );
}
