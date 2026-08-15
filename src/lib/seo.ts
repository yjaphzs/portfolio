import type { Metadata } from "next";

import profile from "@/data/profile";

/**
 * One place for everything a crawler reads.
 *
 * Before the Next.js migration the site was a single-shell SPA: all 12 routes
 * returned the same <title>, the same description and the same canonical URL,
 * and `document.title` was never set anywhere. Each route now carries its own,
 * built from here so they cannot drift apart.
 */

export const SITE_URL = "https://yjaphzs.xyz";

/** 1200×630, lives in public/. Not `profile.avatar` — that is a content-hashed
 *  bundle URL that changes on every build, which would rot every shared link. */
export const OG_IMAGE = "/og-image.webp";

export const SITE_TITLE = `${profile.name} — ${profile.title}`;

/**
 * Kept under ~160 characters. Google truncates past roughly that, and this is
 * the one description that shows for the site's most valuable query — the
 * previous 227-character version lost its final clause in the SERP.
 */
export const SITE_DESCRIPTION =
  "Senior Full-Stack Developer in Makati City building modern web apps with " +
  "Next.js, React, Firebase and FastAPI — fintech, Agentic AI and university systems.";

/** Shorter, for cards where the full description gets truncated anyway. */
const SOCIAL_DESCRIPTION =
  "Senior Full-Stack Developer building modern web apps with Next.js, React, " +
  "Firebase, and FastAPI — plus Agentic AI workflows for data annotation and crawling.";

const KEYWORDS = [
  "Senior Full-Stack Developer",
  "Software Engineer",
  "Web Development",
  "Next.js",
  "React",
  "Firebase",
  "FastAPI",
  "TypeScript",
  "JavaScript",
  "Laravel",
  "PHP",
  "MySQL",
  "Agentic AI",
  "AI Agents",
  "Data Annotation",
  "Web Crawling",
];

/** Root icon set. `sizes: "any"` on the .ico is what lets it win over the PNGs. */
export const ICONS: Metadata["icons"] = {
  icon: [
    { url: "/favicon.ico", sizes: "any" },
    { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
  ],
  apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
};

/**
 * Defaults for every route. `metadataBase` is load-bearing: without it Next
 * emits relative og:image and canonical URLs, which crawlers reject.
 */
export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    // Sub-pages set only their own name; this appends the identity.
    template: `%s — ${profile.name}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: profile.name,
  authors: [{ name: profile.fullName, url: SITE_URL }],
  creator: profile.name,
  publisher: profile.name,
  keywords: KEYWORDS,
  manifest: "/site.webmanifest",
  icons: ICONS,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: profile.name,
    locale: "en_US",
    url: "/",
    title: SITE_TITLE,
    description: SOCIAL_DESCRIPTION,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: SITE_TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SOCIAL_DESCRIPTION,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

type PageMetaOptions = {
  /** Page name only — the layout template appends the site identity. */
  title: string;
  description: string;
  /** Route path, e.g. "/stack". Resolved against SITE_URL for the canonical. */
  path: string;
  /** Archived versions and the 404 opt out of indexing. */
  noindex?: boolean;
};

/**
 * Per-route metadata.
 *
 * Sets title, canonical, Open Graph and Twitter together on purpose: the
 * layout's `title.template` does NOT apply to `openGraph.title`, so a page that
 * set only `title` would share the homepage's card everywhere it was posted.
 */
export function pageMetadata({
  title,
  description,
  path,
  noindex = false,
}: PageMetaOptions): Metadata {
  const fullTitle = `${title} — ${profile.name}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: profile.name,
      locale: "en_US",
      url: path,
      title: fullTitle,
      description,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
