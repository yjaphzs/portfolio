import education from "@/data/education";
import profile from "@/data/profile";
import { techStack } from "@/data/techStack";
import { OG_IMAGE, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "@/lib/seo";

/**
 * Structured data for the homepage.
 *
 * One `@graph` rather than three separate <script> blocks so the nodes can
 * reference each other by `@id` — that is what tells Google the Person, the
 * WebSite and the ProfilePage are all the same entity rather than three
 * unrelated things that happen to share a name.
 *
 * Rendered only from `app/page.tsx`, never the root layout: repeating it on the
 * noindex archives and the 404 would be noise at best.
 */
export function JsonLd() {
  const personId = `${SITE_URL}/#person`;

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: profile.fullName,
        alternateName: profile.name,
        url: SITE_URL,
        image: `${SITE_URL}${OG_IMAGE}`,
        jobTitle: profile.title,
        email: `mailto:${profile.email}`,
        description: profile.bio[0],
        address: {
          "@type": "PostalAddress",
          addressLocality: profile.location.split(",")[0]?.trim(),
          addressCountry: "PH",
        },
        // The socials are the strongest signal tying this page to the same
        // person elsewhere on the web.
        sameAs: profile.socials.map((s) => s.url),
        alumniOf: education.map((edu) => ({
          "@type": "CollegeOrUniversity",
          name: edu.school,
        })),
        knowsAbout: Object.values(techStack).flat(),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_TITLE,
        description: SITE_DESCRIPTION,
        inLanguage: "en-US",
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: SITE_TITLE,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": personId },
        mainEntity: { "@id": personId },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        // Escaping `<` is what stops a "</script>" ever appearing inside the
        // block and closing it early. The data here is all local, but the cost
        // is one replace and it removes the question entirely.
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  );
}
