"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import type { GearItem } from "@/data/setup";

type Props = {
  item: GearItem;
  /** 1-based position, shown as the card's collector number. */
  number?: number;
  /** Adds the rotating-conic bloom. Reserved for the single homepage card —
   *  nine animated gradients on the setup page would be a lot of paint. */
  featured?: boolean;
  /**
   * Heading level for the product name. The card sits directly under the page
   * <h1> on /setup but under a section <h2> on the homepage, so the level has
   * to come from the caller or one of the two outlines ends up malformed.
   */
  headingLevel?: "h2" | "h3";
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * A piece of gear as a trading card: collector banner, illustration window,
 * name, and the two or three specs worth reading at a glance. Flips to a full
 * spec sheet on its back.
 *
 * The illustration treatment lives in `.gear-shot` (index.css) — see the comment
 * there for why the photos are multiplied onto a light plate rather than tinted
 * the way the presence avatars are.
 */
export function GearCard({
  item,
  number,
  featured = false,
  headingLevel: Heading = "h2",
}: Props) {
  const [flipped, setFlipped] = useState(false);
  const rows = item.specs ?? [];
  const flippable = rows.length > 0;

  // A card that flips away while off-screen would keep its back facing out when
  // the deck returns to it. Reset whenever the item changes.
  useEffect(() => setFlipped(false), [item.id]);

  const banner = (
    <div className="flex items-baseline justify-between gap-2">
      <p className="truncate font-crt-mono text-[10px] uppercase tracking-[0.05em] text-crt-muted">
        {item.category}
      </p>
      {number !== undefined && (
        <p className="shrink-0 font-pixel text-[10px] text-crt-muted">
          {pad(number)}
        </p>
      )}
    </div>
  );

  const front = (
    <div
      className="gear-card-face relative flex h-full flex-col rounded-xl border border-crt-line bg-crt-surface p-4"
      aria-hidden={flipped}
    >
      {banner}

      <div className="gear-shot mt-3 aspect-square w-full rounded-lg border border-crt-line">
        {item.image ? (
          // `fill` against .gear-shot, which is position:relative. Its
          // mix-blend-mode:multiply plate and image-rendering:pixelated are
          // element-level rules on the <img> and survive the swap. Lazy
          // loading is next/image's default, so the attribute is gone.
          <Image
            src={item.image}
            alt={`${item.brand} ${item.model}`}
            fill
            draggable={false}
            className="object-contain"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-crt-mono text-[10px] uppercase tracking-[0.05em] text-crt-muted">
              {item.category}
            </span>
          </div>
        )}

        <span aria-hidden className="halftone absolute inset-0 opacity-[0.12]" />
        <span
          aria-hidden
          className="crt-screen-lines absolute inset-0 opacity-70"
        />
      </div>

      {/* The product name is the card's heading — nine of these are the whole
          substance of /setup, and they were previously anonymous <p>s. */}
      <Heading className="mt-3 text-[15px] font-medium leading-snug text-crt-ink">
        {item.brand} {item.model}
      </Heading>
      {item.spec && (
        <p className="mt-1 text-[13px] leading-snug text-crt-secondary">
          {item.spec}
        </p>
      )}

      {flippable && (
        <p className="mt-auto pt-3 font-crt-mono text-[10px] uppercase tracking-[0.05em] text-crt-muted">
          ▸ Full specs
        </p>
      )}
    </div>
  );

  const back = (
    <div
      className="gear-card-back gear-card-face relative flex h-full flex-col overflow-hidden rounded-xl border border-crt-line bg-crt-surface p-4"
      aria-hidden={!flipped}
    >
      <span aria-hidden className="crt-scanlines absolute inset-0 opacity-40" />

      {/* flex-1 so the trailing hint can be pushed to the bottom edge — the back
          is stretched to the front's height by the grid stack, and the sheets
          are shorter than the illustration. */}
      <div className="relative flex min-h-0 flex-1 flex-col">
        {banner}

        <p className="mt-2 border-b border-crt-line pb-2 text-[15px] font-medium leading-snug text-crt-ink">
          {item.brand} {item.model}
        </p>

        <dl className="mt-3 min-h-0 space-y-2 overflow-y-auto">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-baseline justify-between gap-3"
            >
              <dt className="shrink-0 font-crt-mono text-[9px] uppercase tracking-[0.05em] text-crt-muted">
                {row.label}
              </dt>
              <dd className="text-right text-[12px] leading-snug text-crt-secondary">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-auto pt-3 font-crt-mono text-[10px] uppercase tracking-[0.05em] text-crt-muted">
          ◂ Back
        </p>
      </div>
    </div>
  );

  const faces = (
    <div className="gear-card-inner h-full">
      {front}
      {back}
    </div>
  );

  if (!flippable) {
    return <div className="gear-card h-full">{faces}</div>;
  }

  return (
    <div className="gear-card group relative h-full" data-flipped={flipped}>
      {featured && (
        <>
          <span
            aria-hidden
            className="crt-border-rotate pointer-events-none absolute -inset-1 rounded-xl opacity-20 blur-lg transition-opacity duration-500 group-hover:opacity-40"
          />
          <span
            aria-hidden
            className="crt-border-rotate pointer-events-none absolute -inset-px rounded-xl opacity-40 transition-opacity duration-500 group-hover:opacity-70"
          />
        </>
      )}

      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        aria-pressed={flipped}
        aria-label={
          flipped
            ? `Hide full specifications for ${item.brand} ${item.model}`
            : `Show full specifications for ${item.brand} ${item.model}`
        }
        className="relative block h-full w-full cursor-pointer text-left outline-none focus-visible:ring-2 focus-visible:ring-crt-accent/80 focus-visible:ring-offset-2 focus-visible:ring-offset-crt-bg"
      >
        {faces}
      </button>
    </div>
  );
}
