/**
 * The homepage sections, in order. Single source of truth for id, label and
 * number.
 *
 * The index is derived from position rather than written at each call site.
 * Hardcoding it previously let gallery and github both claim `07`; with the rail
 * and four sub-pages also displaying these numbers there would now be three
 * places to drift apart.
 *
 * `id` doubles as the anchor target — sections render `id={s.id}` and the nav
 * links to `#${s.id}`.
 */
export type Section = {
  id: string;
  /** Lowercase, as authored — the pixel register renders it verbatim. */
  title: string;
  /** Sub-page route, when the section has one. */
  href?: string;
};

export const SECTIONS: Section[] = [
  { id: "about", title: "about" },
  { id: "stack", title: "stack", href: "/stack" },
  { id: "experience", title: "experience", href: "/experience" },
  { id: "projects", title: "projects", href: "/projects" },
  { id: "setup", title: "setup", href: "/setup" },
  { id: "education", title: "education" },
  { id: "gallery", title: "gallery" },
  { id: "github", title: "github" },
];

/**
 * Stable module-level id list. useActiveSection keys its IntersectionObserver
 * effect on this array, so it must not be rebuilt per render or the observer
 * would tear down and re-subscribe on every pass.
 */
export const SECTION_IDS = SECTIONS.map((s) => s.id);

/** 1-based section number, zero-padded at render. */
export const sectionNumber = (id: string) =>
  SECTIONS.findIndex((s) => s.id === id) + 1;

/**
 * Nav for the detail pages, which have no sections of their own to spy on.
 * Numbered sequentially so the rail still reads as a channel dial — these are
 * positions on the dial, not the homepage's section numbers.
 */
export const PAGE_LINKS = [
  { href: "/", label: "home" },
  ...SECTIONS.filter((s) => s.href).map((s) => ({
    href: s.href as string,
    label: s.title,
  })),
  { href: "/resume", label: "résumé" },
].map((link, i) => ({ ...link, number: i + 1 }));
