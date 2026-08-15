import { bebasNeue, montserrat, notoSans } from "@/app/fonts";

/**
 * Scopes v1's three typefaces to v1.
 *
 * Bebas Neue, Noto Sans and Montserrat exist for this route alone. They used to
 * be requested on every page load of the whole site through a shared Google
 * Fonts <link>; here they are downloaded only by visitors who actually open the
 * 2025 archive.
 *
 * A wrapper <div> rather than the <html> tag because only the root layout
 * renders <html>. Custom properties inherit, and v1's entire DOM lives inside
 * `.archived-portfolio` below this element, so every `var(--font-*)` in its
 * SCSS resolves.
 */
export default function ArchivedV1Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${bebasNeue.variable} ${notoSans.variable} ${montserrat.variable}`}
    >
      {children}
    </div>
  );
}
