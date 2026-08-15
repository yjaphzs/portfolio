import { useEffect, useState } from "react";

/** How close to the document bottom counts as "at the bottom", in px. */
const BOTTOM_SLACK = 4;
/** How close to the top counts as "at the top", in px. */
const TOP_SLACK = 8;

/**
 * Tracks which section the reader is currently on, for nav highlighting.
 *
 * The `rootMargin` is deliberately lopsided: it shrinks the observation band to
 * `[0.15V, 0.35V]` — a strip 20% of the viewport tall, sitting in the upper
 * third. Without that, a plain "is it visible" test marks two or three sections
 * active at once on a tall screen, and the highlight lags a screen behind what
 * you are actually reading.
 *
 * ── Why the bottom-of-document branch exists ─────────────────────────────
 * An observer alone cannot reach the LAST section. At maximum scroll the
 * document bottom meets the viewport bottom, so a short trailing section plus a
 * short footer can leave that section's top permanently below the band. On this
 * page `#github` parks at roughly `V − 412`, which only intersects
 * `[0.15V, 0.35V]` when the viewport is under ~634px tall — so on any normal
 * screen it never activates, and because the callback only fires for
 * intersecting entries and never clears, the previous section stuck forever.
 *
 * Widening the band would paper over it and misreport the middle of the page.
 * Detecting "scrolled to the bottom" and forcing the last id is exact, and it
 * generalises to any future short trailing section without retuning margins.
 */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? "");
  const [edge, setEdge] = useState<"top" | "bottom" | null>("top");

  useEffect(() => {
    if (!ids.length) return;

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Several sections can cross the band in one callback while scrolling
        // fast; take the one nearest the top of the document.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActive(visible[0].target.id);
      },
      {
        rootMargin: "-15% 0px -65% 0px",
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));

    const onScroll = () => {
      const doc = document.documentElement;
      const y = window.scrollY;
      if (y + window.innerHeight >= doc.scrollHeight - BOTTOM_SLACK) {
        setEdge("bottom");
      } else if (y <= TOP_SLACK) {
        setEdge("top");
      } else {
        setEdge(null);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids]);

  /*
   * Both document edges are decided by scroll position, not the observer.
   *
   * Bottom: the last section can never enter the band (see above).
   * Top: during load, image and font reflow drags sections through the band, so
   * the observer latches whatever passed through last — the rail would open
   * highlighting a section halfway down the page. Anchoring the top to the first
   * id makes the initial state deterministic.
   */
  if (edge === "bottom") return ids[ids.length - 1] ?? "";
  if (edge === "top") return ids[0] ?? "";
  return active;
}
