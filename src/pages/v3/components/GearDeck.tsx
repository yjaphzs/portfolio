import { useMemo } from "react";

import setup from "@/data/setup";
import { STEP_MS, TUNE_MS, useCrtTuner } from "@/hooks/useCrtTuner";

import { GearCard } from "./GearCard";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The desk as a channel dial: one card on screen, a burst of static between
 * them. The full nine are laid out at once on /setup — this is the teaser.
 *
 * Shares the tuning vocabulary with CrtGallery and the channel guide via
 * useCrtTuner rather than restating it.
 */
export function GearDeck() {
  // useCrtTuner preloads through this array, so it has to keep its identity.
  // Deliberately not filtered — the tuner's index indexes `setup` too, and
  // dropping an imageless entry here would silently shift the two apart.
  const images = useMemo(() => setup.map((item) => item.image ?? ""), []);

  const { index, tuning, tuneTo, step, total } = useCrtTuner(images);

  if (!setup.length) return null;

  const item = setup[index];

  /**
   * Arrows step the deck, but only while focus is inside it.
   *
   * Bound here rather than on the document deliberately: global arrows would
   * take scrolling away from the page, which is the same reason CrtGallery
   * only binds them in fullscreen.
   */
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    step(e.key === "ArrowRight" ? 1 : -1);
  };

  return (
    <div onKeyDown={onKeyDown}>
      <div className="relative mx-auto w-full max-w-[320px]">
        <div
          className="transition-opacity duration-200"
          style={{ opacity: tuning ? 0.15 : 1 }}
        >
          <GearCard item={item} number={index + 1} featured />
        </div>

        {/* The clipper is required, not decoration. .crt-noise's keyframe
            translates the layer by ±2%, so it has to be oversized (-inset-[6%])
            to avoid gaps at the edges — which means something must crop it back
            to the card, or the burst paints outside the card's rounded edge.
            CrtGallery gets this free from .crt-screen's own overflow-hidden;
            here the glow layers need to stay unclipped, so only the noise is
            wrapped. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl"
        >
          <span
            className={`crt-noise absolute -inset-[6%] transition-opacity duration-200 ${
              tuning ? "opacity-70" : "opacity-0"
            }`}
          />
        </span>
      </div>

      <div className="mx-auto mt-3 flex w-full max-w-[320px] items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous item"
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
          aria-label="Next item"
          className="cursor-pointer font-crt-mono text-[11px] uppercase tracking-[0.05em] text-crt-muted transition-colors hover:text-crt-accent focus-visible:text-crt-accent focus-visible:outline-none"
        >
          Next ▶
        </button>
      </div>

      {/* Jumping straight to a device beats stepping through nine of them. The
          thumbnails carry .gear-shot too — untreated they would reintroduce the
          white boxes the card treatment exists to remove. */}
      <ul className="mt-4 flex flex-wrap justify-center gap-1.5">
        {setup.map((g, i) => (
          <li key={g.id}>
            <button
              type="button"
              onClick={() => tuneTo(i, i === index ? STEP_MS : TUNE_MS)}
              aria-label={`${g.brand} ${g.model}`}
              aria-current={i === index ? "true" : undefined}
              className={`gear-shot block size-11 rounded-sm border transition-opacity outline-none focus-visible:ring-2 focus-visible:ring-crt-accent/80 ${
                i === index
                  ? "border-crt-accent"
                  : "border-crt-line opacity-50 hover:opacity-100"
              }`}
            >
              {g.image && (
                <img
                  src={g.image}
                  alt=""
                  loading="lazy"
                  draggable={false}
                  className="size-full object-contain"
                />
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
