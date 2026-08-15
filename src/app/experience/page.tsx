import { carouselSrcs, experience } from "@/data/experience";

import { PageShell } from "@/components/v3/PageShell";
import { CrtGallery } from "@/components/v3/CrtGallery";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Experience",
  description:
    "Every role in full: fintech platforms at Globalco, institution-wide systems at CLSU, plus creative web ads, QA and IT support.",
  path: "/experience",
});


/**
 * Full work history.
 *
 * Uses the complete `experience` array, NOT `relevantExperience` like the
 * homepage does. That filter drops Instructor I and Part-time Instructor, so
 * without this page those roles — and every role bullet in the data file — would
 * be invisible across the entire site.
 */
export default function ExperiencePage() {
  return (
    <>
      <Breadcrumbs name="Experience" path="/experience" />
      <PageShell
      sectionId="experience"
      title="experience"
      intro="Every role, with the detail the homepage timeline leaves out."
    >
      <ul className="space-y-14">
        {experience.map((exp) => (
          <li key={exp.id}>
            <div className="flex items-baseline justify-between gap-4 border-b border-crt-line pb-2">
              {/* The company is the section heading here, so the page reads
                  h1 → h2 (company) → h3 (role). Size and weight move onto the
                  heading and the anchor inherits them, so nothing shifts. */}
              <h2 className="text-[15px] font-medium">
                <a
                  href={exp.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-crt-ink no-underline transition-colors hover:text-crt-accent"
                >
                  {exp.company} ↗
                </a>
              </h2>
              <span className="shrink-0 font-crt-mono text-[10px] uppercase tracking-[0.05em] text-crt-muted">
                {exp.location}
              </span>
            </div>

            {exp.roles.map((role) => (
              <div key={role.title} className="mt-5">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-[14px] font-medium text-crt-ink">
                    {role.title}
                  </h3>
                  <span className="shrink-0 font-crt-mono text-[10px] uppercase tracking-[0.05em] text-crt-muted">
                    {role.period}
                  </span>
                </div>
                <ul className="mt-2 space-y-1.5">
                  {role.bullets.map((bullet, i) => (
                    <li
                      key={i}
                      className="relative pl-4 text-[14px] text-crt-secondary before:absolute before:left-0 before:top-[0.65em] before:h-1 before:w-1 before:rounded-full before:bg-crt-accent-dim"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {exp.carouselImages?.length ? (
              <div className="mt-6">
                <CrtGallery
                  images={carouselSrcs[exp.id]}
                  alt={`${exp.company} photo`}
                />
              </div>
            ) : null}
          </li>
        ))}
      </ul>
      </PageShell>
    </>
  );
}
