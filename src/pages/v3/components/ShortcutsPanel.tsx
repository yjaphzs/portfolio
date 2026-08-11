import { useEffect } from "react";

import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { shortcutGroups } from "@/data/shortcuts";

type Props = {
  onClose: () => void;
};

/**
 * The keyboard legend, shown as a CRT on-screen display.
 *
 * Hand-rolled to match StatsPanel and the channel guide rather than using
 * `components/ui/dialog`: every v3 overlay is built this way, and the radix
 * dialog's `bg-background` / `shadow-lg` styling belongs to a different design
 * language. z-10002 matches the other overlays, clearing the retro TV.
 */
export function ShortcutsPanel({ onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Keyboard shortcuts"
      className="fixed inset-0 z-10002 flex items-center justify-center p-6 print:hidden"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-crt-bg/85 backdrop-blur-sm"
      />

      <div className="relative max-h-full w-full max-w-md overflow-hidden rounded-xl border border-crt-line bg-crt-surface p-6">
        {/* .crt-scanlines paints pure-black lines, which read as texture on a
            dark panel and as heavy banding on a light one. This panel is much
            taller than the stats readout, so the same opacity that works there
            fights the text here — hence the per-theme step. */}
        <span
          aria-hidden
          className="crt-scanlines absolute inset-0 opacity-[0.12] dark:opacity-40"
        />

        <div className="relative">
          <div className="flex items-baseline justify-between border-b border-crt-line pb-3">
            <p className="font-pixel text-sm lowercase text-crt-muted">
              ▐ keyboard
            </p>
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer font-crt-mono text-[10px] uppercase tracking-[0.05em] text-crt-muted transition-colors hover:text-crt-accent focus-visible:text-crt-accent focus-visible:outline-none"
            >
              [Esc]
            </button>
          </div>

          <div className="mt-4 space-y-5">
            {shortcutGroups.map((group) => (
              <section key={group.title}>
                <p className="font-crt-mono text-[10px] uppercase tracking-[0.05em] text-crt-muted">
                  {group.title}
                </p>

                <dl className="mt-2 space-y-2">
                  {group.items.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between gap-4"
                    >
                      <dt className="text-[13px] leading-snug text-crt-secondary">
                        {item.label}
                      </dt>
                      <dd className="shrink-0">
                        <KbdGroup>
                          {item.keys.map((key, i) => (
                            <span
                              key={key}
                              className="inline-flex items-center gap-1"
                            >
                              {i > 0 && (
                                <span className="font-crt-mono text-[10px] text-crt-muted">
                                  {item.joiner ?? "/"}
                                </span>
                              )}
                              <Kbd>{key}</Kbd>
                            </span>
                          ))}
                        </KbdGroup>
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            ))}
          </div>

          <p className="mt-5 border-t border-crt-line pt-3 font-crt-mono text-[9px] leading-relaxed text-crt-muted">
            Arrow keys act on whatever has focus, so they never take the page
            scroll away from you.
          </p>
        </div>
      </div>
    </div>
  );
}
