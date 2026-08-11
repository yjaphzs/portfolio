import { useEffect } from "react";

import { useVisitorStats } from "@/hooks/useVisitorStats";

type Props = {
  liveCount: number;
  onClose: () => void;
};

const fmt = (n: number) => n.toLocaleString("en-US");

/**
 * Visitor statistics, shown as a CRT on-screen display.
 *
 * Deliberately aggregate-only: viewing now, total, today, peak. No per-visitor
 * records, no referrers, no IP-derived location — nothing here is personal data,
 * so the site needs no privacy notice and no consent banner for it.
 *
 * z-10002 matches the channel guide, so it clears the retro TV trigger.
 */
export function StatsPanel({ liveCount, onClose }: Props) {
  const { stats, loading, error, load } = useVisitorStats();

  useEffect(() => {
    void load();
  }, [load]);

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

  const rows: Array<[string, string]> = [
    ["Viewing now", fmt(Math.max(liveCount, 1))],
    ["Total visits", stats ? fmt(stats.totalVisits) : "—"],
    ["Visits today", stats ? fmt(stats.visitsToday) : "—"],
    ["Peak today", stats ? fmt(Math.max(stats.peakToday, liveCount)) : "—"],
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Visitor statistics"
      className="fixed inset-0 z-10002 flex items-center justify-center p-6 print:hidden"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-crt-bg/85 backdrop-blur-sm"
      />

      <div className="relative w-full max-w-sm overflow-hidden rounded-xl border border-crt-line bg-crt-surface p-6">
        <span aria-hidden className="crt-scanlines absolute inset-0 opacity-40" />

        <div className="relative">
          <div className="flex items-baseline justify-between border-b border-crt-line pb-3">
            <p className="font-pixel text-sm lowercase text-crt-muted">
              ▐ signal report
            </p>
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer font-crt-mono text-[10px] uppercase tracking-[0.05em] text-crt-muted transition-colors hover:text-crt-accent focus-visible:text-crt-accent focus-visible:outline-none"
            >
              [Esc]
            </button>
          </div>

          <dl className="mt-4 space-y-3">
            {rows.map(([label, value]) => (
              <div key={label} className="flex items-baseline justify-between gap-4">
                <dt className="font-crt-mono text-[10px] uppercase tracking-[0.05em] text-crt-muted">
                  {label}
                </dt>
                <dd className="font-pixel text-lg text-crt-accent">
                  {loading && value === "—" ? "···" : value}
                </dd>
              </div>
            ))}
          </dl>

          {error && (
            <p className="mt-4 font-crt-mono text-[10px] uppercase tracking-[0.05em] text-crt-muted">
              Statistics unavailable
            </p>
          )}

          <p className="mt-5 border-t border-crt-line pt-3 font-crt-mono text-[9px] leading-relaxed text-crt-muted">
            Anonymous counts only. No cookies, no tracking, nothing stored about
            you.
          </p>
        </div>
      </div>
    </div>
  );
}
