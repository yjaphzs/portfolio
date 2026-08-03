import { Sparkles, Archive } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type PortfolioVersion = {
  id: string;
  /** Channel number shown on the CRT guide. Zero-padded at render time. */
  channel: number;
  label: string;
  description: string;
  path: string;
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
    label: "Latest Portfolio",
    description: "Clean, modern CV-style layout with dark mode",
    path: "/",
    icon: Sparkles,
    year: "2026",
    category: "latest",
  },
  {
    id: "archived-v1",
    channel: 2,
    label: "Portfolio v1",
    description: "Original animated full-screen portfolio",
    path: "/archived/v1",
    icon: Archive,
    year: "2025",
    category: "archived",
  },
];

/**
 * Routes the version switcher is allowed to appear on. Sub-pages of the latest
 * portfolio count; the 404 route deliberately does not.
 */
export const knownPaths = [
  "/",
  "/tech-stack",
  "/experience",
  "/projects",
  "/resume",
  ...versions.filter((v) => v.category === "archived").map((v) => v.path),
];
