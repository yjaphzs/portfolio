import { PAGE_LINKS, sectionNumber } from "@/data/sections";
import { PictureSwitch } from "./PictureSwitch";
import { SideNav } from "./SideNav";

type Props = {
  /** Section id this page expands on — supplies its number, so it can't drift. */
  sectionId: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
};

/**
 * Shell for v3 detail pages.
 *
 * Same 720px column, halftone corners and rail as the homepage, so a sub-page
 * reads as the same document rather than a separate site. The rail runs in
 * page-links mode here — these pages are short, so there is nothing to spy on.
 */
export function PageShell({ sectionId, title, intro, children }: Props) {
  return (
    <div className="relative min-h-screen bg-crt-bg font-sans text-[15px] leading-relaxed text-crt-ink antialiased">
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <div className="halftone halftone-wide mask-tr absolute right-0 top-0 h-[70vh] w-[65vw] opacity-[0.10]" />
        <div className="halftone mask-bl absolute bottom-0 left-0 h-[60vh] w-[55vw] opacity-[0.08]" />
      </div>

      <SideNav items={PAGE_LINKS} />

      <main className="relative z-10 lg:pl-56">
        {/* Same reasoning as the homepage masthead: the mobile channel bar
            already fills the band this padding was reserving. */}
        <div className="mx-auto max-w-[720px] px-6 pb-20 pt-8 lg:pt-12">
          <div className="crt-reveal mb-8 flex items-center justify-end lg:mb-10">
            <PictureSwitch />
          </div>

          <header className="crt-reveal crt-d1 mb-10">
            {/* An <h1>, not a <p>: these four pages had no top-level heading at
                all. Tailwind's preflight resets h1 to inherit, so the pixel
                register renders identically. */}
            <h1 className="font-pixel text-sm lowercase text-crt-muted">
              {String(sectionNumber(sectionId)).padStart(2, "0")} — {title}
            </h1>
            {intro && (
              <p className="mt-3 max-w-[52ch] text-crt-secondary">{intro}</p>
            )}
          </header>

          <div className="crt-reveal crt-d2">{children}</div>
        </div>
      </main>
    </div>
  );
}
