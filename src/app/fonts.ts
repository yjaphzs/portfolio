import {
  Bebas_Neue,
  EB_Garamond,
  IBM_Plex_Mono,
  Inter,
  Montserrat,
  Noto_Sans,
  Silkscreen,
} from "next/font/google";

/**
 * The four typographic registers of the design language, plus the three faces
 * the archived v1 still needs.
 *
 * These were one render-blocking Google Fonts <link> requesting all seven
 * families on every route. next/font self-hosts them and scopes each one to the
 * layout that uses it, so the homepage no longer downloads three faces that
 * exist solely for a 2025 archive.
 *
 * Each export supplies a CSS custom property; `src/app/globals.css` maps those
 * onto the Tailwind font tokens (--font-pixel, --font-crt-mono, …) in its
 * `@theme inline` block, so utility class names are unchanged.
 */

/* ── Root: every route ─────────────────────────────────────────────────── */

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const silkscreen = Silkscreen({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-silkscreen",
  display: "swap",
  /*
   * Silkscreen is a bitmap-derived pixel face; the synthetic metric-matched
   * fallback Next generates from Arial is visibly wrong during the swap —
   * wrong enough that the section markers jump. Plain fallback is calmer.
   */
  adjustFontFallback: false,
});

export const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

/* ── /resume only ──────────────────────────────────────────────────────── */

export const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-eb-garamond",
  display: "swap",
});

/* ── /archived/v1 only ─────────────────────────────────────────────────── */

export const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas-neue",
  display: "swap",
});

export const notoSans = Noto_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-noto-sans",
  display: "swap",
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-montserrat",
  display: "swap",
});
