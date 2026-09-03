"use client";

import { usePathname } from "next/navigation";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export default function SoftwareAppLd({ name }: { name: string }) {
  const pathname = usePathname();
  const url = `${SITE_URL}${pathname}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `${name} - ${SITE_NAME}`,
    url,
    description: `Free online ${name.toLowerCase()} by ${SITE_NAME}. Works 100% in your browser with no sign-up and no uploads.`,
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    applicationCategory: "UtilityApplication",
    inLanguage: "en",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        data-breadcrumb
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}