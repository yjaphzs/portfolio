import projects from "@/data/projects";
import certifications from "@/data/certifications";
import { experience } from "@/data/experience";
import { techStack } from "@/data/techStack";

export type Stat = { value: string; label: string };

/**
 * Career start year, read from the oldest role on record.
 *
 * `experience` is newest-first, so the last entry's first role is the earliest.
 * Periods are free text ("Feb 2019 – May 2019"), so this pulls the first
 * four-digit year rather than trying to parse a date. Returns null on anything
 * unexpected — the caller drops the stat instead of rendering NaN.
 */
function careerStartYear(): number | null {
  const first = experience.at(-1)?.roles[0]?.period;
  const match = first?.match(/\d{4}/);
  if (!match) return null;

  const year = Number(match[0]);
  return Number.isFinite(year) ? year : null;
}

/**
 * Masthead figures, computed from the data files at render.
 *
 * Every number here is something the site already knows. Nothing is authored by
 * hand, so these cannot drift out of step with the content the way a manually
 * maintained "6+ yrs" would.
 */
export function getStats(): Stat[] {
  const stats: Stat[] = [];

  const start = careerStartYear();
  if (start) {
    const years = new Date().getFullYear() - start;
    if (years > 0) stats.push({ value: `${years}+ yrs`, label: "shipping" });
  }

  stats.push(
    { value: String(projects.length), label: "projects" },
    { value: String(Object.keys(techStack).length), label: "stack areas" },
    { value: String(certifications.length), label: "certs" }
  );

  return stats;
}
