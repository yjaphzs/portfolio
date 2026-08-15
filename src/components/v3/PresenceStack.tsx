"use client";

import Image from "next/image";
import { useState } from "react";

import { presenceAvatars } from "@/data/assets";
import { usePresence } from "@/hooks/usePresence";
import { usePeakReporter } from "@/hooks/useVisitorStats";

import { StatsPanel } from "./StatsPanel";

const MAX_AVATARS = 3;

/**
 * Live viewer readout, and the way into the visitor statistics.
 *
 * Always rendered, including at a single viewer. It used to hide below 2 so it
 * never advertised an empty room, but now that it opens the stats panel, hiding
 * it would hide the only entry point — and "1 viewing" reads fine next to a
 * total-visits figure.
 */
export function PresenceStack() {
  const { count, live } = usePresence();
  const [open, setOpen] = useState(false);

  // Report the high-water mark for today whenever the live count exceeds it.
  usePeakReporter(count, live);

  // Clamp once and use it everywhere. Deriving the number from the clamped
  // value but the plural from the raw count produced "1 people viewing"
  // whenever presence was offline and count was 0.
  const viewers = Math.max(count, 1);
  const shown = Math.min(viewers, MAX_AVATARS);
  const overflow = Math.max(viewers - shown, 0);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="View visitor statistics"
        className="group flex w-full flex-col items-start gap-2 rounded-md text-left outline-none focus-visible:ring-2 focus-visible:ring-crt-accent/80"
      >
        <span className="flex items-center gap-2">
          <span
            aria-hidden
            className={`size-1.5 rounded-full ${
              live ? "tv-standby-pulse bg-crt-accent" : "bg-crt-muted"
            }`}
          />
          <span className="font-crt-mono text-[10px] uppercase tracking-[0.05em] text-crt-muted">
            {live ? "On Air" : "Offline"}
          </span>
        </span>

        <span className="flex items-center">
          {Array.from({ length: shown }, (_, i) => (
            <span
              key={i}
              aria-hidden
              className="presence-avatar size-[19px] shrink-0 rounded-full"
              style={{
                marginLeft: i === 0 ? 0 : -6,
                boxShadow:
                  "0 0 0 1.5px var(--crt-bg), 0 0 0 2.5px var(--crt-line)",
              }}
            >
              {/* `fill` against the .presence-avatar span, which already
                  supplies position:relative + overflow:hidden + isolation.
                  next/image renders a bare <img> with no wrapper, so the
                  `.presence-avatar img` grayscale filter and the ::after
                  mix-blend-mode tint both still apply. */}
              <Image
                src={presenceAvatars[i % presenceAvatars.length]}
                alt=""
                fill
                className="object-cover"
              />
            </span>
          ))}

          {overflow > 0 && (
            <span
              aria-hidden
              className="ml-[-6px] inline-flex h-[19px] min-w-[19px] items-center justify-center rounded-full bg-crt-elevated px-[5px] font-crt-mono text-[9px] font-semibold leading-none text-crt-muted"
              style={{
                boxShadow:
                  "0 0 0 1.5px var(--crt-bg), 0 0 0 2.5px var(--crt-line-strong)",
              }}
            >
              +{overflow}
            </span>
          )}
        </span>

        <span className="font-pixel text-[10px] text-crt-muted transition-colors group-hover:text-crt-accent">
          <b className="font-normal text-crt-ink">{viewers}</b>{" "}
          {viewers === 1 ? "person" : "people"} viewing
        </span>
      </button>

      {open && <StatsPanel liveCount={count} onClose={() => setOpen(false)} />}
    </>
  );
}
