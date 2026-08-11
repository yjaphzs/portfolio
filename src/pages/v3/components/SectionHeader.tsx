import { Link } from "react-router-dom";

type Props = {
  /** Zero-padded at render. Numbering is structural — assign once, in reading order. */
  index: number;
  title: string;
  action?: { label: string; href: string; external?: boolean };
};

/**
 * The signature header: pixel numeral on the left, mono micro-label on the right.
 *
 * The two sides deliberately use different fonts AND different casing — that
 * disagreement is the effect. See patterns.md §1.
 */
export function SectionHeader({ index, title, action }: Props) {
  const label = action && (
    <>
      {action.label} {action.external ? "↗" : "→"}
    </>
  );

  return (
    <div className="mb-6 flex items-baseline justify-between gap-4">
      <h2 className="font-pixel text-sm lowercase text-crt-muted">
        {String(index).padStart(2, "0")} — {title}
      </h2>

      {action &&
        (action.external ? (
          <a
            href={action.href}
            target="_blank"
            rel="noreferrer noopener"
            className="shrink-0 font-crt-mono text-[11px] uppercase tracking-[0.05em] text-crt-muted no-underline transition-colors hover:text-crt-accent"
          >
            {label}
          </a>
        ) : (
          <Link
            to={action.href}
            className="shrink-0 font-crt-mono text-[11px] uppercase tracking-[0.05em] text-crt-muted no-underline transition-colors hover:text-crt-accent"
          >
            {label}
          </Link>
        ))}
    </div>
  );
}
