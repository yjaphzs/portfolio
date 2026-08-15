"use client";

import { useTheme } from "@/hooks/useTheme";

/** Day / night in the set's own vocabulary — the TV menu word is "picture". */
const MODES = [
  { key: "light", label: "Day" },
  { key: "dark", label: "Night" },
] as const;

/**
 * Theme control as a two-channel selector.
 *
 * Replaces the shadcn ghost-button-with-lucide-icon on the v3 surfaces: a
 * floating rotating sun/moon belongs to a different design language, and the
 * icon alone never said what it would do. This borrows the rail's tuner
 * grammar instead — `tuned ? accent : muted`, a mono uppercase micro-label per
 * segment — so it reads as a sibling of the channel dial rather than a control
 * bolted onto the page.
 *
 * Both states stay visible, so the accent marks the current mode rather than
 * asking anyone to decode a single glyph. Archived v2 and the printable résumé
 * keep `components/theme-toggle` — they are not in this design language.
 */
export function PictureSwitch() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-2.5">
      {/* Decorative: the group below carries its own accessible name. */}
      <span
        aria-hidden
        className="font-crt-mono text-[10px] uppercase tracking-[0.05em] text-crt-muted"
      >
        Picture
      </span>

      <div
        role="group"
        aria-label="Picture mode"
        className="flex rounded-md border border-crt-line bg-crt-surface"
      >
        {MODES.map((mode, i) => {
          const tuned = resolvedTheme === mode.key;

          return (
            <button
              key={mode.key}
              type="button"
              // Pressing the tuned segment is not a no-op: it pins the choice,
              // so a "system" visitor stops following the OS from then on.
              onClick={() => setTheme(mode.key)}
              aria-pressed={tuned}
              // min-h-10 is the skill's 40px touch floor — the old icon button
              // was 32px, and this one lives in a thumb-reachable corner.
              className={`relative flex min-h-10 min-w-16 cursor-pointer items-center justify-center px-3.5 font-crt-mono text-[10px] uppercase tracking-[0.05em] transition-colors outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-crt-accent/80 ${
                i === 0 ? "rounded-l-md" : "rounded-r-md border-l border-crt-line"
              } ${
                tuned
                  ? "bg-crt-elevated text-crt-accent"
                  : "text-crt-muted hover:text-crt-ink"
              }`}
            >
              {mode.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
