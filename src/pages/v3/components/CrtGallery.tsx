import { useCallback, useEffect, useRef, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Props = {
  images: string[];
  /** Used for alt text: "{alt} 3". */
  alt: string;
};

/** Static burst when stepping between images. */
const STEP_MS = 160;
/** Longer burst for the deliberate act of opening or closing fullscreen. */
const TUNE_MS = 380;

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The gallery as a television: one screen, a thumbnail dial beneath it, and a
 * burst of static when the channel changes.
 *
 * Replaces the embla filmstrip + plain black lightbox. Two reasons beyond
 * looks: that lightbox had no CRT treatment at all, and it mounted a SEPARATE
 * React tree per thumbnail — fifteen of them for the homepage gallery. This
 * mounts one screen and moves an index.
 *
 * The transition deliberately reuses ChannelGuide's vocabulary rather than
 * inventing a second one: grain ramps up, the picture dims beneath it, the swap
 * happens mid-burst, then it settles.
 */
export function CrtGallery({ images, alt }: Props) {
  const [index, setIndex] = useState(0);
  const [tuning, setTuning] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const timer = useRef<number | undefined>(undefined);
  const dialRef = useRef<HTMLUListElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const total = images.length;

  /** Show a nudge button only when there is actually room to move that way. */
  const syncDialEdges = useCallback(() => {
    const el = dialRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < max - 2);
  }, []);

  /** Move the strip by roughly one screenful, without changing channel. */
  const nudgeDial = useCallback((dir: 1 | -1) => {
    const el = dialRef.current;
    if (!el) return;
    el.scrollBy({
      left: dir * el.clientWidth * 0.8,
      behavior: "smooth",
    });
  }, []);

  /**
   * Move to an image behind a burst of static.
   *
   * The static exists to hide the swap, so the incoming image is decoded first —
   * otherwise the burst hides a blank frame and the illusion inverts into
   * static, nothing, then a pop.
   */
  const tuneTo = useCallback(
    (next: number, duration: number) => {
      if (next === index || total === 0) return;
      const target = ((next % total) + total) % total;

      if (reducedMotion) {
        setIndex(target);
        return;
      }

      const img = new Image();
      img.src = images[target];

      setTuning(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => {
        setIndex(target);
        setTuning(false);
      }, duration);
    },
    [index, total, images, reducedMotion]
  );

  const step = useCallback(
    (delta: number) => tuneTo(index + delta, STEP_MS),
    [index, tuneTo]
  );

  /** Opening fullscreen is a deliberate act, so it gets the full channel-change
   *  burst rather than the short step one. */
  const openFullscreen = useCallback(() => {
    setFullscreen(true);
    if (reducedMotion) return;
    setTuning(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setTuning(false), TUNE_MS);
  }, [reducedMotion]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  /*
   * Keep the tuned thumbnail on screen.
   *
   * With 15 thumbs the strip is ~804px inside a 720px column, so stepping past
   * the visible range would otherwise highlight a thumbnail nobody can see.
   * `setIndex` is deferred by STEP_MS, so this lands together with the static —
   * the scroll is hidden by the burst rather than racing it.
   */
  useEffect(() => {
    const el = dialRef.current;
    if (!el) return;
    const thumb = el.querySelector<HTMLElement>(`[data-thumb="${index}"]`);
    if (!thumb) return;

    /*
     * Set scrollLeft on the strip directly rather than calling scrollIntoView.
     *
     * scrollIntoView walks EVERY scrollable ancestor, including the document —
     * so on mount, with the gallery below the fold, it scrolled the whole page
     * down to the gallery and the nav opened highlighting the wrong section.
     * scrollTo on the element cannot escape the element.
     */
    const target = thumb.offsetLeft - (el.clientWidth - thumb.offsetWidth) / 2;
    el.scrollTo({
      left: Math.max(0, target),
      behavior: reducedMotion ? "auto" : "smooth",
    });
    syncDialEdges();
  }, [index, reducedMotion, syncDialEdges]);

  // Edge state also has to settle once images have laid out.
  useEffect(() => {
    syncDialEdges();
    window.addEventListener("resize", syncDialEdges);
    return () => window.removeEventListener("resize", syncDialEdges);
  }, [syncDialEdges, total]);

  // Warm the neighbours so stepping is instant even on a cold cache.
  useEffect(() => {
    if (total < 2) return;
    [(index + 1) % total, (index - 1 + total) % total].forEach((i) => {
      const img = new Image();
      img.src = images[i];
    });
  }, [index, images, total]);

  // Fullscreen owns the arrow keys and Escape; the inline screen does not, so
  // it never fights the page's own scrolling.
  useEffect(() => {
    if (!fullscreen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFullscreen(false);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [fullscreen, step]);

  if (!total) return null;

  const screen = (
    <div className="crt-screen relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-crt-line">
      <img
        src={images[index]}
        alt={`${alt} ${index + 1}`}
        className="size-full object-contain transition-opacity duration-200"
        style={{ opacity: tuning ? 0.15 : 1 }}
        draggable={false}
      />

      {/* -inset-[6%] is load-bearing: .crt-noise's keyframe translates the layer
          by ±2%, so an inset-0 element would show a gap at the edges. */}
      <span
        aria-hidden
        className={`crt-noise absolute -inset-[6%] transition-opacity duration-200 ${
          tuning ? "opacity-70" : "opacity-[0.07]"
        }`}
      />
      <span aria-hidden className="crt-screen-lines absolute inset-0" />
    </div>
  );

  const readout = (
    <div className="mt-3 flex items-center justify-between gap-4">
      <button
        type="button"
        onClick={() => step(-1)}
        aria-label="Previous image"
        className="cursor-pointer font-crt-mono text-[11px] uppercase tracking-[0.05em] text-crt-muted transition-colors hover:text-crt-accent focus-visible:text-crt-accent focus-visible:outline-none"
      >
        ◀ Prev
      </button>

      <span className="font-pixel text-[11px] text-crt-muted">
        CH {pad(index + 1)}/{pad(total)}
      </span>

      <button
        type="button"
        onClick={() => step(1)}
        aria-label="Next image"
        className="cursor-pointer font-crt-mono text-[11px] uppercase tracking-[0.05em] text-crt-muted transition-colors hover:text-crt-accent focus-visible:text-crt-accent focus-visible:outline-none"
      >
        Next ▶
      </button>
    </div>
  );

  return (
    <>
      <div>
        <button
          type="button"
          onClick={openFullscreen}
          aria-label={`Open ${alt} ${index + 1} fullscreen`}
          className="block w-full cursor-zoom-in rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-crt-accent/80"
        >
          {screen}
        </button>

        {readout}

        {/* The dial. Jumping straight to a thumbnail is what keeps a 15-image
            set quick to browse — stepping one at a time would not.
            The nudge buttons sit OUTSIDE the <ul>: filmstrip-fade is a mask and
            applies to descendants, so a button inside would fade with it. */}
        {total > 1 && (
          <div className="relative mt-3">
            <ul
              ref={dialRef}
              onScroll={syncDialEdges}
              className="no-scrollbar filmstrip-fade flex gap-1.5 overflow-x-auto"
            >
              {images.map((img, i) => (
                <li key={i} data-thumb={i} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => tuneTo(i, STEP_MS)}
                    aria-label={`${alt} ${i + 1}`}
                    aria-current={i === index ? "true" : undefined}
                    className={`block size-12 overflow-hidden rounded-sm border transition-colors outline-none focus-visible:ring-2 focus-visible:ring-crt-accent/80 ${
                      i === index
                        ? "border-crt-accent"
                        : "border-crt-line opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      loading="lazy"
                      className="size-full object-cover"
                    />
                  </button>
                </li>
              ))}
            </ul>

            {canScrollLeft && (
              <button
                type="button"
                aria-label="Scroll thumbnails left"
                onClick={() => nudgeDial(-1)}
                className="absolute left-0 top-1/2 -translate-y-1/2 rounded-sm border border-crt-line bg-crt-surface/90 px-1 py-2 font-crt-mono text-[10px] text-crt-muted backdrop-blur transition-colors hover:text-crt-accent focus-visible:text-crt-accent focus-visible:outline-none"
              >
                ◀
              </button>
            )}

            {canScrollRight && (
              <button
                type="button"
                aria-label="Scroll thumbnails right"
                onClick={() => nudgeDial(1)}
                className="absolute right-0 top-1/2 -translate-y-1/2 rounded-sm border border-crt-line bg-crt-surface/90 px-1 py-2 font-crt-mono text-[10px] text-crt-muted backdrop-blur transition-colors hover:text-crt-accent focus-visible:text-crt-accent focus-visible:outline-none"
              >
                ▶
              </button>
            )}
          </div>
        )}
      </div>

      {fullscreen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${alt} viewer`}
          className="fixed inset-0 z-10002 flex flex-col items-center justify-center gap-4 bg-crt-bg/95 p-6 backdrop-blur-sm print:hidden"
        >
          <button
            type="button"
            aria-label="Close viewer"
            onClick={() => setFullscreen(false)}
            className="absolute inset-0 cursor-default"
          />

          <div className="relative w-full max-w-4xl">
            {screen}
            {readout}
          </div>

          <button
            type="button"
            onClick={() => setFullscreen(false)}
            className="relative cursor-pointer font-crt-mono text-[11px] uppercase tracking-[0.05em] text-crt-muted transition-colors hover:text-crt-accent"
          >
            [Esc] Close
          </button>
        </div>
      )}
    </>
  );
}
