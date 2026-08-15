import { useEffect } from "react";

import { useVisitorStats } from "@/hooks/useVisitorStats";

import { OsdPanel } from "./OsdPanel";

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
 * Positioning, scroll lock, Escape and focus all belong to OsdPanel.
 */
export function StatsPanel({ liveCount, onClose }: Props) {
  const { stats, loading, error, load } = useVisitorStats();

  useEffect(() => {
    void load();
  }, [load]);

  const rows: Array<[string, string]> = [
    ["Viewing now", fmt(Math.max(liveCount, 1))],
    ["Total visits", stats ? fmt(stats.totalVisits) : "—"],
    ["Visits today", stats ? fmt(stats.visitsToday) : "—"],
    ["Peak today", stats ? fmt(Math.max(stats.peakToday, liveCount)) : "—"],
  ];

  return (
    <OsdPanel
      title="signal report"
      label="Visitor statistics"
      width="max-w-sm"
      onClose={onClose}
      footer="Anonymous counts only. No cookies, no tracking, nothing stored about you."
    >
      <dl className="space-y-3">
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
    </OsdPanel>
  );
}
