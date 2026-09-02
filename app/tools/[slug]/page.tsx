import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getIndexPage, indexPages } from "@/lib/indexPages";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import IndexLayout from "@/components/IndexLayout";
import IndexPageJsonLd from "@/components/IndexPageJsonLd";
import RelatedIndexPages from "@/components/RelatedIndexPages";

export function generateStaticParams() {
  return indexPages.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const page = getIndexPage(params.slug);
  if (!page) return {};
  const url = `${SITE_URL}/tools/${page.slug}`;
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
    },
  };
}

export default function IndexPage({ params }: { params: { slug: string } }) {
  const page = getIndexPage(params.slug);
  if (!page) notFound();

  return (
    <>
      <IndexPageJsonLd page={page} />
      <IndexLayout
        h1={page.h1}
        eyebrow={page.eyebrow}
        intro={page.intro}
        toolName={page.toolName}
        toolHref={page.toolHref}
        ctaText={page.ctaText}
        faqs={page.faqs}
        body={page.body}
      >
        <RelatedIndexPages slug={page.slug} />
      </IndexLayout>
    </>
  );
}
