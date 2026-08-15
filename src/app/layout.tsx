import "./globals.css";

import type { Metadata, Viewport } from "next";

import { ThemeProvider } from "@/components/theme-provider";
import { ThemeScript } from "@/components/theme-script";
import { TimeMachine } from "@/components/time-machine/TimeMachine";
import { baseMetadata } from "@/lib/seo";

import { ibmPlexMono, inter, silkscreen } from "./fonts";

const THEME_STORAGE_KEY = "portfolio-theme";

/** Title template, canonical, OG/Twitter defaults, icons — see lib/seo.ts. */
export const metadata: Metadata = baseMetadata;

/**
 * Was a single hardcoded `<meta name="theme-color" content="#ffffff">`, which
 * painted the browser chrome white even on the dark-first design. Now it
 * follows the theme.
 */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafbfc" },
    { media: "(prefers-color-scheme: dark)", color: "#08090b" },
  ],
};

/**
 * Root layout — the chrome that used to live in index.html and App.tsx.
 *
 * `suppressHydrationWarning` is on <html> and nowhere else: ThemeScript mutates
 * that element's className before React ever runs, which is a mismatch by
 * construction and the only one being suppressed.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${silkscreen.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        {/* First thing in <head> so the theme is settled before first paint. */}
        <ThemeScript storageKey={THEME_STORAGE_KEY} />
      </head>
      <body>
        <ThemeProvider defaultTheme="system" storageKey={THEME_STORAGE_KEY}>
          {children}
          {/* Mounted on every route: it owns the version switcher, and gates
              its own visibility on the pathname. */}
          <TimeMachine />
        </ThemeProvider>
      </body>
    </html>
  );
}
