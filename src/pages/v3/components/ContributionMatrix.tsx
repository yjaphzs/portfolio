import { GitHubCalendar } from "react-github-calendar";
import type { Activity } from "react-activity-calendar";

const BLOCK = 11;
const MARGIN = 3;
/** Contribution count at which a dot reaches full radius. */
const SATURATION = 12;
const R_MIN = 1.1;
const R_MAX = BLOCK / 2;

/**
 * GitHub contributions as a print halftone rather than a heatmap.
 *
 * Dot RADIUS carries intensity; opacity is near-binary — empty days collapse to
 * a barely-visible pinprick and the year reads as texture. See patterns.md §2.
 *
 * Uses react-activity-calendar's `renderBlock` escape hatch, which passes
 * straight through react-github-calendar. No fork, no bespoke SVG.
 */
export function ContributionMatrix({ username }: { username: string }) {
  return (
    <div className="crt-calendar overflow-x-auto text-crt-accent">
      <GitHubCalendar
        username={username}
        blockSize={BLOCK}
        blockMargin={MARGIN}
        fontSize={11}
        showColorLegend={false}
        // The count caption is required, not decorative: the SVG carries no
        // meaning to a screen reader without it. Styled via .crt-calendar.
        showTotalCount
        labels={{ totalCount: "{{count}} contributions in the last year" }}
        showMonthLabels={false}
        showWeekdayLabels={false}
        errorMessage="Contribution graph unavailable right now."
        // Flat colour: the size ramp is doing the encoding, so the palette is
        // a single phosphor value rather than a five-step scale.
        theme={{
          light: ["currentColor", "currentColor"],
          dark: ["currentColor", "currentColor"],
        }}
        renderBlock={(block, activity: Activity) => {
          const y = Number(block.props.y ?? 0);
          const empty = activity.count === 0;

          // sqrt, not linear: circle AREA grows with r², so a linear map makes
          // a busy day look ~3x busier than it is.
          const t = Math.min(activity.count / SATURATION, 1);
          const r = empty ? R_MIN : R_MIN + (R_MAX - R_MIN) * Math.sqrt(t);

          return (
            <circle
              cx={BLOCK / 2}
              cy={y + BLOCK / 2}
              r={r}
              fill="currentColor"
              opacity={empty ? 0.12 : 0.92}
              data-date={activity.date}
            />
          );
        }}
      />
    </div>
  );
}
