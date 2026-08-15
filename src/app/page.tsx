import Link from "next/link";

import { ProfilePicture } from "@/components/ProfilePicture";
import profile from "@/data/profile";
import education from "@/data/education";
import certifications from "@/data/certifications";
import projects from "@/data/projects";
import { gallerySrcs } from "@/data/gallery";
import { relevantExperience } from "@/data/experience";
import { techStack } from "@/data/techStack";

import { SECTIONS, SECTION_IDS, sectionNumber } from "@/data/sections";
import { SideNav } from "@/components/v3/SideNav";
import { SectionHeader } from "@/components/v3/SectionHeader";
import { ContributionMatrix } from "@/components/v3/ContributionMatrix";
import { PresenceStack } from "@/components/v3/PresenceStack";
import { PictureSwitch } from "@/components/v3/PictureSwitch";
import { GearDeck } from "@/components/v3/GearDeck";
import { CrtGallery } from "@/components/v3/CrtGallery";
import { AppHubCard } from "@/components/v3/AppHubCard";
import { JsonLd } from "@/components/JsonLd";

const GITHUB_USER = "yjaphzs";

/**
 * Section rhythm: 56px top and bottom, per the skill.
 *
 * `id` and the number both come from SECTIONS — never passed by hand, so the
 * rail, the page and the sub-pages cannot disagree. `scroll-mt-24` keeps an
 * anchor jump from parking the heading under the mobile top bar.
 */
function Section({
  id,
  action,
  children,
  delay = "crt-d1",
}: {
  id: string;
  action?: { label: string; href: string; external?: boolean };
  children: React.ReactNode;
  delay?: string;
}) {
  const section = SECTIONS.find((s) => s.id === id);
  if (!section) return null;

  return (
    <section id={id} className={`crt-reveal scroll-mt-24 py-14 ${delay}`}>
      <SectionHeader
        index={sectionNumber(id)}
        title={section.title}
        action={action}
      />
      {children}
    </section>
  );
}

export default function Portfolio() {
  const github = profile.socials.find((s) => s.name === "GitHub");
  const linkedin = profile.socials.find((s) => s.name === "LinkedIn");
  const navItems = SECTIONS.map((s) => ({
    href: `#${s.id}`,
    label: s.title,
    number: sectionNumber(s.id),
  }));

  return (
    <div className="relative min-h-screen bg-crt-bg font-sans text-[15px] leading-relaxed text-crt-ink antialiased">
      {/* Person + WebSite + ProfilePage, on the canonical page only. */}
      <JsonLd />

      {/* Texture — two masked instances only, per the skill. */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <div className="halftone halftone-wide mask-tr absolute right-0 top-0 h-[70vh] w-[65vw] opacity-[0.10]" />
        <div className="halftone mask-bl absolute bottom-0 left-0 h-[60vh] w-[55vw] opacity-[0.08]" />
      </div>

      <SideNav items={navItems} spySectionIds={SECTION_IDS} />

      {/* lg:pl-56 clears the 224px rail. The column keeps its 720px measure —
          the rail eats the margin, not the text. */}
      <main className="relative z-10 lg:pl-56">
        <div className="mx-auto max-w-3xl px-6">
        {/* ── Masthead ──────────────────────────────────────────── */}
        {/* The 80px lead-in is for the rail layout, where nothing sits above
            the column. Below lg the sticky channel bar already occupies that
            band, so the same padding read as dead space above the switch. */}
        <header className="crt-reveal pb-4 pt-8 lg:pt-20">
          <div className="mb-6 flex justify-end">
            <PictureSwitch />
          </div>

          {/* Two columns above sm, stacked below. The portrait is sized by the
              grid track alone — ProfilePicture's internal paddingBottom:100%
              spacer makes it square, so passing a height would fight it. */}
          <div className="grid gap-8 sm:grid-cols-[280px_1fr] sm:items-start">
            {/* Static by design: no hoverSrc/clickedSrc. Omitting them makes
                ProfilePicture drop its cursor, focus ring, role="button" and
                extra layers on its own. The archived v2 still passes all three
                and keeps its swap behaviour.
                rounded-none wins outright — cn() is twMerge and className is its
                last argument, so the baked-in rounded-xl is dropped, not layered. */}
            <ProfilePicture
              defaultSrc={profile.avatar}
              alt={profile.name}
              fallbackInitials={profile.initials}
              className="w-full rounded-none border-crt-line"
            />

            <div>
              <p className="font-crt-mono text-[11px] uppercase tracking-[0.05em] text-crt-muted">
                {profile.title}
              </p>
              <h1 className="mt-2 font-pixel text-[2rem] leading-none lowercase text-crt-ink">
                {profile.name}
              </h1>
              <p className="mt-2 font-crt-mono text-[10px] uppercase tracking-[0.05em] text-crt-muted">
                {profile.location}
              </p>

              <p className="mt-5 text-crt-secondary">{profile.bio[0]}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-crt-mono text-[11px] uppercase tracking-[0.05em]">
            <a
              href={`mailto:${profile.email}`}
              className="text-crt-muted no-underline transition-colors hover:text-crt-accent"
            >
              {profile.email} ↗
            </a>
            {github && (
              <a
                href={github.url}
                target="_blank"
                rel="noreferrer noopener"
                className="text-crt-muted no-underline transition-colors hover:text-crt-accent"
              >
                github ↗
              </a>
            )}
            {linkedin && (
              <a
                href={linkedin.url}
                target="_blank"
                rel="noreferrer noopener"
                className="text-crt-muted no-underline transition-colors hover:text-crt-accent"
              >
                linkedin ↗
              </a>
            )}
            <Link
              href="/resume"
              className="text-crt-accent no-underline transition-colors hover:text-crt-ink"
            >
              résumé →
            </Link>
          </div>

          {/* Desktop shows this in the rail's status block; the mobile top bar
              has no room for it, so it stays in the masthead there. */}
          <div className="mt-8 lg:hidden">
            <PresenceStack />
          </div>
        </header>

        {/* ── 01 about ──────────────────────────────────────────── */}
        <Section id="about" delay="crt-d2">
          <div className="space-y-4 text-crt-secondary">
            {profile.bio.slice(1).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Section>

        {/* ── 02 stack ──────────────────────────────────────────── */}
        <Section
          id="stack"
          delay="crt-d3"
          action={{ label: "View all", href: "/stack" }}
        >
          <div className="space-y-5">
            {Object.entries(techStack).map(([category, items]) => (
              <div key={category}>
                <p className="font-crt-mono text-[10px] uppercase tracking-[0.05em] text-crt-muted">
                  {category}
                </p>
                <p className="mt-1.5 text-[14px] text-crt-secondary">
                  {items.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 03 experience ─────────────────────────────────────── */}
        <Section
          id="experience"
          delay="crt-d4"
          action={{ label: "Full history", href: "/experience" }}
        >
          <ul className="space-y-6">
            {relevantExperience.map((exp) => (
              <li key={exp.id}>
                <div className="flex items-baseline justify-between gap-4">
                  <a
                    href={exp.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-[15px] font-medium text-crt-ink no-underline transition-colors hover:text-crt-accent"
                  >
                    {exp.company}
                  </a>
                  <span className="shrink-0 font-crt-mono text-[10px] uppercase tracking-[0.05em] text-crt-muted">
                    {exp.location}
                  </span>
                </div>
                <ul className="mt-1.5 space-y-1">
                  {exp.roles.map((role) => (
                    <li
                      key={role.title}
                      className="flex items-baseline justify-between gap-4"
                    >
                      <span className="text-[14px] text-crt-secondary">
                        {role.title}
                      </span>
                      <span className="shrink-0 font-crt-mono text-[10px] uppercase tracking-[0.05em] text-crt-muted">
                        {role.period}
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Section>

        {/* ── 04 projects ───────────────────────────────────────── */}
        <Section
          id="projects"
          delay="crt-d5"
          action={{ label: "All projects", href: "/projects" }}
        >
          <ul className="space-y-5">
            {projects.slice(0, 6).map((p) => (
              <li key={p.title}>
                <div className="flex items-baseline justify-between gap-4">
                  {p.url ? (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-[15px] font-medium text-crt-ink no-underline transition-colors hover:text-crt-accent"
                    >
                      {p.title} ↗
                    </a>
                  ) : (
                    <span className="text-[15px] font-medium text-crt-ink">
                      {p.title}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-[14px] text-crt-secondary">
                  {p.description}
                </p>
                <p className="mt-1.5 font-crt-mono text-[10px] uppercase tracking-[0.05em] text-crt-muted">
                  {p.tech.slice(0, 6).join(" · ")}
                </p>
              </li>
            ))}
          </ul>
        </Section>

        {/* ── 05 setup ──────────────────────────────────────────── */}
        <Section
          id="setup"
          delay="crt-d5"
          action={{ label: "The desk", href: "/setup" }}
        >
          <GearDeck />
        </Section>

        {/* ── 06 education ──────────────────────────────────────── */}
        <Section id="education" delay="crt-d5">
          <ul className="space-y-4">
            {education.map((e) => (
              <li key={e.degree} className="flex items-baseline justify-between gap-4">
                <span>
                  <span className="block text-[15px] text-crt-ink">{e.degree}</span>
                  <span className="block text-[13px] text-crt-secondary">
                    {e.school}
                  </span>
                </span>
                <span className="shrink-0 font-crt-mono text-[10px] uppercase tracking-[0.05em] text-crt-muted">
                  {e.period}
                </span>
              </li>
            ))}
          </ul>

          <ul className="mt-6 space-y-3 border-t border-crt-line pt-5">
            {certifications.map((c) => (
              <li
                key={c.name}
                className="flex items-baseline justify-between gap-4"
              >
                <span>
                  {/* Not every certification has a public credential URL. */}
                  {c.certificateUrl ? (
                    <a
                      href={c.certificateUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-[14px] text-crt-secondary no-underline transition-colors hover:text-crt-accent"
                    >
                      {c.name} ↗
                    </a>
                  ) : (
                    <span className="text-[14px] text-crt-secondary">
                      {c.name}
                    </span>
                  )}
                  <a
                    href={c.issuerUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-0.5 block font-crt-mono text-[10px] uppercase tracking-[0.05em] text-crt-muted no-underline transition-colors hover:text-crt-accent"
                  >
                    {c.issuer}
                  </a>
                </span>
                <span className="shrink-0 font-crt-mono text-[10px] uppercase tracking-[0.05em] text-crt-muted">
                  {c.date}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <AppHubCard />
          </div>
        </Section>

        {/* ── 07 gallery ────────────────────────────────────────── */}
        <Section id="gallery" delay="crt-d5">
          <CrtGallery images={gallerySrcs} alt="Gallery photo" />
        </Section>

        {/* ── 07 github ─────────────────────────────────────────── */}
        <Section
          id="github"
          delay="crt-d5"
          action={
            github
              ? { label: `@${GITHUB_USER}`, href: github.url, external: true }
              : undefined
          }
        >
          <ContributionMatrix username={GITHUB_USER} />
          <p className="mt-2 font-crt-mono text-[10px] uppercase tracking-[0.05em] text-crt-muted">
            Personal contributions only — does not include work activity.
          </p>
        </Section>

          <footer className="crt-reveal crt-d5 border-t border-crt-line py-10 font-crt-mono text-[10px] uppercase tracking-[0.05em] text-crt-muted">
            © {new Date().getFullYear()} {profile.name} — built with react, three
            and too much coffee
          </footer>
        </div>
      </main>
    </div>
  );
}
