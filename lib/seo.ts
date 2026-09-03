import { SITE_URL } from "@/lib/site";

/**
 * Returns Next.js `Metadata` fields that place the canonical link and
 * hreflang alternates in the `<head>` so search engines read them.
 *
 * The previous implementation rendered `<link rel="canonical">` via a
 * client component, which injects the link into the `<body>` — Google
 * ignores canonical/hreflang tags that are not in the document `<head>`.
 *
 * Use this helper in every page's `export const metadata`:
 *   export const metadata = { ...canonical("/image-compressor"), title: "..." }
 */
export function canonical(path: string) {
  const url = `${SITE_URL}${path}`;
  return {
    alternates: {
      canonical: url,
      languages: {
        en: url,
        "x-default": url,
      },
    },
    openGraph: { url },
  } as const;
}