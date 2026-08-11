import { techStack } from "@/data/techStack";

import { PageShell } from "./components/PageShell";

export default function StackPage() {
  return (
    <PageShell
      sectionId="stack"
      title="stack"
      intro="Everything I reach for, grouped by where it lives."
    >
      <ul className="space-y-8">
        {Object.entries(techStack).map(([category, items]) => (
          <li key={category}>
            <p className="font-crt-mono text-[10px] uppercase tracking-[0.05em] text-crt-muted">
              {category}
            </p>
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
  );
}
