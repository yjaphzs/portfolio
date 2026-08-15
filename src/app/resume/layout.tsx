import { ebGaramond } from "@/app/fonts";

/**
 * Scopes EB Garamond to the résumé.
 *
 * The serif register exists for this one document — a printable sheet that
 * deliberately does not look like the rest of the site. No other route pays for
 * the download.
 */
export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={ebGaramond.variable}>{children}</div>;
}
