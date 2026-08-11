import { Link } from "react-router-dom";
import { ArrowLeft, Printer } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DotGrid } from "@/components/ui/dot-grid";
import { ThemeToggle } from "@/components/theme-toggle";

import profile from "@/data/profile";
import education from "@/data/education";
import { experience } from "@/data/experience";
import projects from "@/data/projects";
import certifications from "@/data/certifications";
import { resumeExperience, resumeProjects, resumeSkills } from "@/data/resume";

/* ── helpers ──────────────────────────────────────────────────────────── */

/** "https://www.linkedin.com/in/yjaphzs/" → "linkedin.com/in/yjaphzs" */
function hostPath(url: string) {
    return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

/**
 * Outer span across a company's roles. Roles are stored newest-first, so the
 * range runs from the oldest role's start to the newest role's end.
 * "Nov 2020 – Sep 2021" + "Aug 2020 – Nov 2020" → "Aug 2020 – Sep 2021"
 */
function outerPeriod(roles: { period: string }[]) {
    if (roles.length === 1) return roles[0].period;
    const start = roles[roles.length - 1].period.split("–")[0].trim();
    const end = roles[0].period.split("–")[1]?.trim() ?? roles[0].period;
    return `${start} – ${end}`;
}

/* ── primitives ───────────────────────────────────────────────────────── */

function Section({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <section className="mt-2 first:mt-0">
            <h2 className="border-b border-black pb-0.5 text-[11pt] font-bold uppercase tracking-wide">
                {title}
            </h2>
            <div className="mt-1.5 space-y-1">{children}</div>
        </section>
    );
}

/** Organization / role row: label on the left, date or location on the right. */
function Row({
    left,
    right,
    bold = false,
    italic = false,
}: {
    left: React.ReactNode;
    right: React.ReactNode;
    bold?: boolean;
    italic?: boolean;
}) {
    return (
        <div className="flex items-baseline justify-between gap-4">
            <span
                className={[
                    "min-w-0",
                    bold ? "font-bold uppercase tracking-wide" : "",
                    italic ? "italic" : "",
                ].join(" ")}
            >
                {left}
            </span>
            <span className="shrink-0 whitespace-nowrap">{right}</span>
        </div>
    );
}

function Bullets({ items }: { items: string[] }) {
    if (!items.length) return null;
    return (
        <ul className="mt-0.5 list-disc space-y-[1px] pl-[1.1em] marker:text-black">
            {items.map((text, i) => (
                <li key={i} className="pl-0.5">
                    {text}
                </li>
            ))}
        </ul>
    );
}

/* ── page ─────────────────────────────────────────────────────────────── */

export default function ResumePage() {
    const contact = [
        profile.location,
        profile.email,
        ...profile.socials.map((s) => hostPath(s.url)),
        profile.website,
    ];

    return (
        <div className="min-h-screen bg-muted/30 font-[Inter,system-ui,sans-serif] text-foreground antialiased print:min-h-0 print:bg-white">
            <div className="print:hidden">
                <DotGrid />
            </div>

            <div className="relative z-1 mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8 print:max-w-none print:p-0">
                {/* Page chrome — screen only */}
                <div className="mb-4 flex items-center justify-between print:hidden">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground no-underline transition-colors hover:text-foreground"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        Back to Home
                    </Link>
                    <div className="flex items-center gap-2">
                        <Button
                            size="sm"
                            variant="outline"
                            className="h-7 px-2.5 text-xs"
                            onClick={() => window.print()}
                        >
                            <Printer className="mr-1 h-3.5 w-3.5" />
                            Print / Save as PDF
                        </Button>
                        <ThemeToggle />
                    </div>
                </div>

                {/*
                 * The sheet. Deliberately black-on-white in both themes — it is a
                 * document, not a UI surface. Serif face per Harvard convention,
                 * intentionally distinct from the site's Inter.
                 */}
                <article className="resume-sheet mx-auto w-full max-w-[8.5in] rounded-md border bg-white p-6 text-[10.5pt] leading-[1.28] text-black shadow-sm sm:p-12 print:max-w-none print:rounded-none print:border-0 print:p-0 print:shadow-none font-['EB_Garamond',Garamond,'Times_New_Roman',serif]">
                    {/* Header */}
                    <header className="text-center">
                        <h1 className="text-[16pt] font-bold uppercase tracking-[0.06em]">
                            {profile.fullName}
                        </h1>
                        {/* Kept just under body size so the whole contact line
                            stays on one row at narrow widths. */}
                        <p className="mt-1 text-[10pt]">
                            {contact.join("  |  ")}
                        </p>
                    </header>

                    <div className="mt-3">
                        {/* Education */}
                        <Section title="Education">
                            {education.map((edu) => (
                                <div key={edu.degree} className="resume-entry">
                                    <Row
                                        bold
                                        left={edu.school}
                                        right={edu.location}
                                    />
                                    <Row
                                        left={
                                            edu.major
                                                ? `${edu.degree}, Major in ${edu.major}`
                                                : edu.degree
                                        }
                                        right={edu.period}
                                    />
                                    {edu.coursework?.length ? (
                                        <p>
                                            <span className="italic">
                                                Relevant Coursework:
                                            </span>{" "}
                                            {edu.coursework.join(", ")}
                                        </p>
                                    ) : null}
                                </div>
                            ))}
                        </Section>

                        {/* Experience */}
                        <Section title="Experience">
                            {resumeExperience.map((entry) => {
                                const exp = experience.find(
                                    (e) => e.id === entry.id
                                );
                                if (!exp) return null;

                                if (entry.detail === "condensed") {
                                    return (
                                        <div
                                            key={entry.id}
                                            className="resume-entry"
                                        >
                                            <Row
                                                left={
                                                    <>
                                                        <span className="font-bold uppercase tracking-wide">
                                                            {exp.company}
                                                        </span>
                                                        {" — "}
                                                        <span className="italic">
                                                            {exp.roles
                                                                .map(
                                                                    (r) =>
                                                                        r.title
                                                                )
                                                                .join(" · ")}
                                                        </span>
                                                    </>
                                                }
                                                right={outerPeriod(exp.roles)}
                                            />
                                        </div>
                                    );
                                }

                                return (
                                    <div key={entry.id} className="resume-entry">
                                        <Row
                                            bold
                                            left={exp.company}
                                            right={exp.location}
                                        />
                                        {exp.roles.map((role, i) => (
                                            <div
                                                key={role.title}
                                                className={i > 0 ? "mt-1" : ""}
                                            >
                                                <Row
                                                    italic
                                                    left={role.title}
                                                    right={role.period}
                                                />
                                                <Bullets
                                                    items={role.bullets.slice(
                                                        0,
                                                        entry.bulletLimits?.[
                                                            i
                                                        ] ?? 0
                                                    )}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                );
                            })}
                        </Section>

                        {/* Projects */}
                        <Section title="Projects">
                            {resumeProjects.map((title) => {
                                const project = projects.find(
                                    (p) => p.title === title
                                );
                                if (!project) return null;
                                return (
                                    <div
                                        key={project.title}
                                        className="resume-entry"
                                    >
                                        <Row
                                            bold
                                            left={project.fullTitle}
                                            right={
                                                project.url
                                                    ? hostPath(project.url)
                                                    : ""
                                            }
                                        />
                                        {/*
                                         * No per-project tech line: it duplicates
                                         * the Technical Skills line in Additional
                                         * and costs a line each on a one-page budget.
                                         */}
                                        <Bullets
                                            items={[project.description]}
                                        />
                                    </div>
                                );
                            })}
                        </Section>

                        {/* Additional */}
                        <Section title="Additional">
                            <div className="resume-entry space-y-1">
                                <p>
                                    <span className="font-bold">
                                        Technical Skills:
                                    </span>{" "}
                                    {Object.entries(resumeSkills).map(
                                        ([group, items], i) => (
                                            <span key={group}>
                                                {i > 0 && "  |  "}
                                                <span className="italic">
                                                    {group}:
                                                </span>{" "}
                                                {items.join(", ")}
                                            </span>
                                        )
                                    )}
                                </p>
                                <p>
                                    <span className="font-bold">
                                        Certifications:
                                    </span>{" "}
                                    {certifications
                                        .map(
                                            (c) =>
                                                `${c.name} — ${c.issuer}, ${c.date}`
                                        )
                                        .join("; ")}
                                </p>
                            </div>
                        </Section>
                    </div>
                </article>
            </div>
        </div>
    );
}
