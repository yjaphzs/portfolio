import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import profile from "@/data/profile";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

import { PresenceStack } from "./PresenceStack";

type Item = {
  /** "#about" for in-page anchors, "/stack" for routes. */
  href: string;
  label: string;
  /** Channel number. Supplied by the caller from sections.ts — never hardcoded. */
  number: number;
};

type Props = {
  items: Item[];
  /** Matched against `item.href` to pick the tuned channel. */
  activeHref: string;
};

/** Row height in px. The needle's offset is derived from this, so the two must agree. */
const ROW = 28;

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The rail as the set's channel selector.
 *
 * The site already numbers portfolio versions CH 01/CH 02 in the time machine and
 * renders its version picker as a CRT on-screen display; the nav was the last
 * major surface not speaking that language. Sections are channels, and a needle
 * slides up the dial to whichever one you're reading.
 *
 * z-40 keeps it above page content but below the retro TV (z-10001) and the
 * channel guide (z-10002).
 */
/** Static burst before the channel actually changes. Matches ChannelGuide. */
const TUNE_MS = 200;

export function SideNav({ items, activeHref }: Props) {
  const activeIndex = Math.max(
    0,
    items.findIndex((i) => i.href === activeHref)
  );

  const navigate = useNavigate();
  const reducedMotion = usePrefersReducedMotion();
  const [tuning, setTuning] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const barRef = useRef<HTMLUListElement>(null);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  /*
   * The mobile bar overflows on narrow phones, so CH 08 can sit off-screen.
   *
   * scrollLeft, not scrollIntoView — the latter scrolls every scrollable
   * ancestor including the document, which would fight the page's own scrolling
   * every time the active section changed.
   */
  useEffect(() => {
    const el = barRef.current;
    const chan = el?.querySelector<HTMLElement>(`[data-chan="${activeIndex}"]`);
    if (!el || !chan) return;
    el.scrollTo({
      left: Math.max(0, chan.offsetLeft - (el.clientWidth - chan.offsetWidth) / 2),
      behavior: "smooth",
    });
  }, [activeIndex]);

  /**
   * Change channel behind a burst of static.
   *
   * Anchors were previously native fragment links with no handler. Intercepting
   * them lets the same tuning language the time machine uses apply to section
   * jumps and route changes alike — a channel change should look like one
   * wherever it happens.
   */
  const tune = useCallback(
    (href: string) => {
      const go = () => {
        if (href.startsWith("#")) {
          document
            .getElementById(href.slice(1))
            ?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
        } else {
          navigate(href);
        }
      };

      if (reducedMotion) {
        go();
        return;
      }

      setTuning(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => {
        go();
        setTuning(false);
      }, TUNE_MS);
    },
    [navigate, reducedMotion]
  );

  /**
   * Intercept plain left-clicks only.
   *
   * Modifier clicks and middle-clicks must fall through to the browser, or
   * "open in new tab" silently stops working on every nav item.
   */
  const onChannelClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
        return;
      }
      e.preventDefault();
      tune(href);
    },
    [tune]
  );

  return (
    <>
      {/* Fullscreen static during a channel change. -inset-[6%] because
          .crt-noise's keyframe translates ±2% — inset-0 shows edge gaps. */}
      {tuning && (
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-10002 print:hidden"
        >
          <span className="crt-noise absolute -inset-[6%] opacity-70" />
          <span className="crt-scanlines absolute inset-0" />
        </div>
      )}

      {/* ── Tuner rail (lg and up) ───────────────────────────────── */}
      <nav
        aria-label="Section navigation"
        className="fixed inset-y-0 left-0 z-40 hidden w-56 flex-col justify-between overflow-hidden border-r border-crt-line bg-crt-bg px-7 py-8 lg:flex print:hidden"
      >
        <span aria-hidden className="tuner-scanlines absolute inset-0" />

        <div className="relative">
          <Link
            to="/"
            className="flex items-center gap-2 no-underline"
            aria-label="Home"
          >
            <span
              aria-hidden
              className="tv-standby-pulse size-1.5 rounded-full bg-crt-accent"
            />
            <span className="font-pixel text-sm lowercase text-crt-ink transition-colors hover:text-crt-accent">
              { "Live : " + profile.initials.toLowerCase()}
            </span>
          </Link>

          {/* The dial */}
          <div className="relative mt-9">
            {/* Needle — one element that slides, rather than a per-row rule that
                grows. Rows are a fixed height so the offset needs no measuring. */}
            <span
              aria-hidden
              className="tuner-needle absolute left-0 top-0 w-0.75 rounded-full bg-crt-accent"
              style={{
                height: ROW - 10,
                transform: `translateY(${activeIndex * ROW + 5}px)`,
                boxShadow: "0 0 8px var(--crt-accent)",
              }}
            />

            <ul className="flex flex-col">
              {items.map((item, i) => {
                const tuned = i === activeIndex;
                const inner = (
                  <>
                    <span
                      className={`font-pixel text-[11px] transition-colors ${
                        tuned ? "text-crt-accent" : "text-crt-muted"
                      }`}
                    >
                      CH {pad(item.number)}
                    </span>
                    <span
                      className={`font-crt-mono text-[10px] uppercase tracking-[0.05em] transition-colors ${
                        tuned
                          ? "text-crt-ink"
                          : "text-crt-muted group-hover:text-crt-ink group-focus-visible:text-crt-ink"
                      }`}
                    >
                      {item.label}
                    </span>
                  </>
                );

                const cls = `group flex items-center gap-2.5 pl-4 no-underline outline-none ${
                  tuned ? "" : "opacity-80 hover:opacity-100"
                }`;

                return (
                  <li key={item.href} style={{ height: ROW }}>
                    {/* Kept as a real <a href> rather than a router Link so the
                        URL is still copyable and middle-clickable; onClick
                        intercepts plain left-clicks to play the static first. */}
                    <a
                      href={item.href}
                      onClick={(e) => onChannelClick(e, item.href)}
                      aria-current={tuned ? "true" : undefined}
                      className={cls}
                      style={{ height: ROW }}
                    >
                      {inner}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* ── Status block ───────────────────────────────────────── */}
        <div className="relative border-t border-crt-line pt-4">
          <PresenceStack />

          <ul className="mt-4 flex flex-col gap-1.5">
            {profile.socials.map((s) => (
              <li key={s.name}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-crt-mono text-[10px] uppercase tracking-[0.05em] text-crt-muted no-underline transition-colors hover:text-crt-accent"
                >
                  {s.name} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ── Top bar (below lg) ───────────────────────────────────── */}
      <nav
        aria-label="Section navigation"
        className="sticky top-0 z-40 border-b border-crt-line bg-crt-bg/85 backdrop-blur lg:hidden print:hidden"
      >
        {/* Same treatment as the gallery filmstrip — a scrollbar under the
            mobile channel strip would be the only one on the page. */}
        <ul
          ref={barRef}
          className="no-scrollbar filmstrip-fade flex gap-4 overflow-x-auto px-5 py-3"
        >
          {items.map((item, i) => {
            const tuned = i === activeIndex;
            return (
              <li key={item.href} data-chan={i} className="shrink-0">
                <a
                  href={item.href}
                  onClick={(e) => onChannelClick(e, item.href)}
                  aria-current={tuned ? "true" : undefined}
                  className={`font-crt-mono text-[10px] uppercase tracking-[0.05em] no-underline transition-colors ${
                    tuned ? "text-crt-accent" : "text-crt-muted"
                  }`}
                >
                  CH {pad(item.number)} {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
