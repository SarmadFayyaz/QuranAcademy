import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";

export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    logo: `${SITE_URL}/assets/images/logo.jpg`,
    foundingDate: "2018",
    areaServed: "Worldwide",
    teaches: [
      "Quran Recitation",
      "Tajweed",
      "Quran Memorization (Hifz)",
      "Islamic Studies",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
