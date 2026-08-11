import { Sparkles, Archive } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type PortfolioVersion = {
  id: string;
  /** Channel number shown on the CRT guide. Zero-padded at render time. */
  channel: number;
  label: string;
  description: string;
  /** The version's entry route. */
  path: string;
  /**
   * Every other route belonging to this version. Listing them here is what keeps
   * the switcher visible on sub-pages — `knownPaths` is derived from this, so a
   * route that isn't declared simply won't show the time machine.
   */
  subPaths?: string[];
  /**
   * Public directory holding this version's favicon set, e.g. "/v1".
   * Empty string means the root set. Resolved per-version by useVersionFavicon;
   * without it, every archived version would inherit v1's icons.
   */
  faviconPrefix?: string;
  icon: LucideIcon;
  year: string;
  category: "latest" | "archived";
};

/**
 * Every portfolio version, newest first. Channel order on the retro TV guide
 * follows this array. Adding a version here surfaces it in both the CRT
 * channel guide and the no-WebGL fallback dialog — there is no second list.
 */
export const versions: PortfolioVersion[] = [
  {
    id: "latest",
    channel: 1,
    label: "Portfolio v3",
    description: "Retro CRT terminal — phosphor, halftone and pixel type",
    path: "/",
    // `/resume` is version-neutral: one print document shared by every version.
    subPaths: ["/stack", "/experience", "/projects", "/setup", "/resume"],
    faviconPrefix: "",
    icon: Sparkles,
    year: "2026",
    category: "latest",
  },
  {
    id: "archived-v2",
    channel: 2,
    label: "Portfolio v2",
    description: "Clean, modern CV-style layout with dark mode",
    path: "/archived/v2",
    subPaths: [
      "/archived/v2/tech-stack",
      "/archived/v2/experience",
      "/archived/v2/projects",
    ],
    faviconPrefix: "",
    icon: Archive,
    year: "2026",
    category: "archived",
  },
  {
    id: "archived-v1",
    channel: 3,
    label: "Portfolio v1",
    description: "Original animated full-screen portfolio",
    path: "/archived/v1",
    faviconPrefix: "/v1",
    icon: Archive,
    year: "2025",
    category: "archived",
  },
];

/**
 * Routes the version switcher is allowed to appear on — every version's entry
 * route plus its sub-pages. Derived rather than hand-listed so adding a version
 * or a sub-page registers itself. The 404 route is deliberately absent.
 */
export const knownPaths: string[] = versions.flatMap((v) => [
  v.path,
  ...(v.subPaths ?? []),
]);

/** The version that owns a given pathname, or undefined for unknown routes. */
export function versionForPath(pathname: string): PortfolioVersion | undefined {
  return versions.find(
    (v) => v.path === pathname || v.subPaths?.includes(pathname)
  );
}
