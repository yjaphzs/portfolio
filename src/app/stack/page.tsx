import { techStack } from "@/data/techStack";

import { PageShell } from "@/components/v3/PageShell";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Tech Stack",
  description:
    "Everything I reach for, grouped by where it lives — languages, frameworks, data stores, infrastructure and tooling.",
  path: "/stack",
});


export default function StackPage() {
  return (
    <>
      <Breadcrumbs name="Tech Stack" path="/stack" />
      <PageShell
      sectionId="stack"
      title="stack"
      intro="Everything I reach for, grouped by where it lives."
    >
      <ul className="space-y-8">
        {Object.entries(techStack).map(([category, items]) => (
          <li key={category}>
            {/* A heading, not a styled <p>: these categories are the page's
                only structure, and without them the whole document was an h1
                followed by 180 words of undifferentiated list. */}
            <h2 className="font-crt-mono text-[10px] uppercase tracking-[0.05em] text-crt-muted">
              {category}
            </h2>
            <ul className="mt-2 flex flex-wrap gap-x-2 gap-y-1.5">
              {items.map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-crt-line bg-crt-surface px-2.5 py-1 text-[13px] text-crt-secondary"
                >
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      </PageShell>
    </>
  );
}
