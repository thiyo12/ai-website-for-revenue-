"use client";

import { usePathname } from "next/navigation";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export default function JsonLdGame({
  name,
  description,
  genre = "Puzzle",
}: {
  name: string;
  description: string;
  genre?: string;
}) {
  const pathname = usePathname();
  const url = `${SITE_URL}${pathname}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Game",
    name: `${name} - ${SITE_NAME}`,
    url,
    description,
    genre,
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    inLanguage: "en",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
