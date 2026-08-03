/**
 * Editorial layer for the printable resume at /resume.
 *
 * This file holds NO facts. Every name, date, bullet, and description is read
 * from experience.ts / education.ts / projects.ts / certifications.ts / profile.ts
 * at render time, so the resume cannot drift from the portfolio.
 *
 * What lives here is purely "what makes the cut on one page":
 *   - which experience entries get full treatment vs. a single condensed line
 *   - how many bullets each role is allowed
 *   - which projects to feature
 *   - a resume-appropriate regrouping of techStack.ts
 *
 * If the printed page spills onto a second sheet, lower a bulletLimits value
 * here rather than touching the layout in Resume.tsx.
 */

import { experience } from "@/data/experience";
import { techStack } from "@/data/techStack";
import projects from "@/data/projects";

export type ResumeEntry = {
  /** Matches `id` on an entry in experience.ts */
  id: string;
  /**
   * "full"      → company line, then each role with its own dated line and bullets
   * "condensed" → a single line: "Company — Role · Role" against the outer date
   *               span, no bullets. Location is dropped; these are the oldest
   *               entries and the line has to stay unwrapped.
   */
  detail: "full" | "condensed";
  /**
   * Max bullets per role, positional. Ignored for condensed entries.
   * This is the knob to turn if the printed page spills onto a second sheet.
   */
  bulletLimits?: number[];
};

/*
 * Weighted toward the two most recent employers.
 *
 * Globalco and CLSU (2022) carry the detail — they are the roles being hired
 * against. Everything from PhilRice back collapses to a single dated line, which
 * is what pays for that depth: the page budget is fixed, so emphasis has to come
 * out of somewhere rather than being added on top.
 */
export const resumeExperience: ResumeEntry[] = [
  {
    id: "globalco-2025",
    detail: "full",
    bulletLimits: [5, 3],
  },
  {
    id: "clsu-2022",
    detail: "full",
    bulletLimits: [3, 2],
  },
  { id: "philrice-2021", detail: "condensed" },
  { id: "wideout-2020", detail: "condensed" },
  { id: "clsu-2019", detail: "condensed" },
  { id: "technodream-2019", detail: "condensed" },
];

/** Matches `title` in projects.ts. Order here is the order on the page. */
export const resumeProjects = ["Barkr AI Portal", "RADIIS (v2.0)"];

/**
 * A curated regrouping of techStack.ts for the "Additional" section. The raw
 * categories carry portfolio-only noise (Lucide React, Discord, Font Awesome)
 * and are grouped for badges rather than for a one-line resume read.
 *
 * Every value below must exist somewhere in techStack.ts — enforced in dev by
 * assertSkillsInTechStack() at the bottom of this file.
 */
export const resumeSkills: Record<string, string[]> = {
  Languages: ["JavaScript", "TypeScript", "Python", "PHP"],
  Frontend: ["Next.js", "React", "Tailwind CSS"],
  Backend: [
    "FastAPI",
    "Laravel",
    "Node.js",
    "GraphQL",
    "REST APIs",
    "PostgreSQL",
    "MySQL",
  ],
  Firebase: [
    "Authentication",
    "Firestore",
    "Cloud Functions",
    "Storage",
    "Data Connect",
  ],
  "Google Cloud": ["Compute Engine", "Cloud SQL", "IAM & Service Accounts"],
  Integrations: ["BoldSign API", "HubSpot", "Webhooks"],
  DevOps: ["Docker", "GitHub Actions", "WordPress"],
  "AI & Workflow": ["Claude", "Codex", "Asana"],
};

/* ── Drift guards (dev only) ──────────────────────────────────────────────
 * These exist because the whole point of this page is that it can't go stale.
 * A typo'd id or a skill that no longer exists in techStack.ts should be loud
 * in the console during `npm run dev`, not silently missing from the PDF.
 */
if (import.meta.env.DEV) {
  const knownIds = new Set(experience.map((e) => e.id));
  const unknownIds = resumeExperience
    .map((e) => e.id)
    .filter((id) => !knownIds.has(id));
  if (unknownIds.length) {
    console.error(
      `[resume.ts] resumeExperience references unknown experience id(s): ${unknownIds.join(", ")}`
    );
  }

  const knownTech = new Set(Object.values(techStack).flat());
  const unknownTech = Object.values(resumeSkills)
    .flat()
    .filter((skill) => !knownTech.has(skill));
  if (unknownTech.length) {
    console.error(
      `[resume.ts] resumeSkills lists skill(s) missing from techStack.ts: ${unknownTech.join(", ")}`
    );
  }

  const knownProjects = new Set(projects.map((p) => p.title));
  const unknownProjects = resumeProjects.filter((t) => !knownProjects.has(t));
  if (unknownProjects.length) {
    console.error(
      `[resume.ts] resumeProjects references unknown project title(s): ${unknownProjects.join(", ")}`
    );
  }
}
