import { SITE_NAME, SITE_URL } from "@/lib/site";
import type { IndexPage } from "@/lib/indexPages";

export default function IndexPageJsonLd({ page }: { page: IndexPage }) {
  const path = `/tools/${page.slug}`;
  const url = `${SITE_URL}${path}`;
  const toolUrl = `${SITE_URL}${page.toolHref}`;

  const graph: unknown[] = [
    {
      "@type": "WebPage",
      "@id": url,
      url,
      name: page.h1,
      description: page.metaDescription,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      inLanguage: "en",
      about: page.toolName,
      breadcrumb: { "@id": `${url}#breadcrumb` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: page.toolName, item: toolUrl },
        { "@type": "ListItem", position: 3, name: page.h1, item: url },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: page.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@type": "HowTo",
      name: `How to ${page.h1.replace(/^Free /, "").toLowerCase().replace(/ online$/, "")}`,
      step: [
        { "@type": "HowToStep", position: 1, name: "Open the tool", text: `Click "${page.ctaText}".` },
        { "@type": "HowToStep", position: 2, name: "Add your file", text: `Upload or select your file in the ${page.toolName}.` },
        { "@type": "HowToStep", position: 3, name: "Download the result", text: "Preview and download your finished file." },
      ],
      totalTime: "PT1M",
      tool: page.toolName,
    },
    {
      "@type": "WebApplication",
      name: `${page.toolName} - ${SITE_NAME}`,
      url: toolUrl,
      description: `Free online ${page.toolName.toLowerCase()} by ${SITE_NAME}. Works 100% in your browser, no sign-up, no uploads.`,
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript",
      applicationCategory: "UtilityApplication",
      inLanguage: "en",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  );
}
