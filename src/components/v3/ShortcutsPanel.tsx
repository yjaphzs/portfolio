import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { shortcutGroups } from "@/data/shortcuts";

import { OsdPanel } from "./OsdPanel";

type Props = {
  onClose: () => void;
};

/**
 * The keyboard legend, shown as a CRT on-screen display.
 *
 * Hand-rolled on OsdPanel rather than `components/ui/dialog`: every v3 overlay
 * is built this way, and the radix dialog's `bg-background` / `shadow-lg`
 * styling belongs to a different design language.
 */
export function ShortcutsPanel({ onClose }: Props) {
  return (
    <OsdPanel
      title="keyboard"
      label="Keyboard shortcuts"
      width="max-w-md"
      onClose={onClose}
      footer="Arrow keys act on whatever has focus, so they never take the page scroll away from you."
    >
      <div className="space-y-5">
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
                        <span key={key} className="inline-flex items-center gap-1">
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
    </OsdPanel>
  );
}
