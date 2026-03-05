import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, SOCIAL_LINKS } from "@/lib/constants";

export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    logo: `${SITE_URL}/assets/images/logo.png`,
    foundingDate: "2018",
    areaServed: "Worldwide",
    teaches: [
      "Quran Recitation",
      "Tajweed",
      "Quran Memorization (Hifz)",
      "Islamic Studies",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+92-310-5175338",
        contactType: "customer service",
        areaServed: "PK",
        availableLanguage: ["English", "Urdu"],
      },
      {
        "@type": "ContactPoint",
        telephone: "+44-7916-632814",
        contactType: "customer service",
        areaServed: "GB",
        availableLanguage: ["English"],
      },
    ],
    sameAs: [
      SOCIAL_LINKS.facebook,
      SOCIAL_LINKS.instagram,
      SOCIAL_LINKS.youtube,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
