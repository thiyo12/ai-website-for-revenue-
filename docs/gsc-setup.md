# Search Console setup — QuicTools (quictools.cc)

Currently the site runs without a verified Search Console / Bing account, so the SEO
measurement loop relies on on-page/technical signals. This doc covers how to add
verification and what to measure once it's live.

## 1. Verify in Google Search Console

1. Go to https://search.google.com/search-console → **Add property** → URL prefix:
   `https://quictools.cc`.
2. Choose the HTML-tag verification method and copy the meta tag, e.g.
   `<meta name="google-site-verification" content="XXXX" />`.
3. Set the token in the app env:
   - Google: `NEXT_PUBLIC_GSC_VERIFICATION=XXXX` (already rendered by
     `app/layout.tsx`), OR
   - follow the recommended DNS TXT method in GSC.
4. Same for Bing Webmaster Tools (`NEXT_PUBLIC_BING_VERIFICATION=YYYY`).
5. Deploy (Dokploy dashboard → Redeploy) with the env vars, then click **Verify** in
   GSC.

The verification meta hooks already exist in `lib/site.ts` and `app/layout.tsx` — you
only need to provide the token values.

## 2. Submit the sitemap

- Sitemap URL: `https://quictools.cc/sitemap.xml` (index → `sitemap-0.xml`).
- In GSC → Sitemaps → enter `sitemap.xml` → Submit. Do the same in Bing.

## 3. What to measure after verification

Monitored in the SEO change log vs baseline. Wait ~2–4 weeks for Google to crawl after
the canonical fix + new landing pages.

- **Indexed pages:** GSC → Pages: URL count trending up toward the sitemap total.
- **Crawl stats:** 200 responses, no soft 404s, no 5xx.
- **Canonicalize:** any "duplicate without user-selected canonical".
- **Rich results:** GSC → Enhancements: WebApplication/Breadcrumb disabled by Google?
  FAQPage on index pages should pass validation.
- **Queries / impressions (core content):**
  - image compress / jpeg compress / png compress
  - pdf to word / word to pdf / pdf to jpg / merge pdf
  - compress video / convert video to gif
  - mockup keywords: fake whatsapp chat, fake tweet, fake notification, caller id
  - generators: invoice, resume, signature, receipt, text to handwriting, meme, meme
    generator, random name picker, countdown timer
  - calculators/converters: age calculator, gpa calculator, unit converter,
    currency converter, password generator, username generator
- **Core Web Vitals:** field data (if any) for URL groups.

## 4. Optional Bing

Bing Webmaster Tools supports importing from GSC — verify once, or set
`NEXT_PUBLIC_BING_VERIFICATION` and submit the sitemap there too.

## Baseline (no GSC yet)

Recorded in `seo-change-log.md`: 36 tool pages + games + info pages now export a
canonical in `<head>`; 37 index landing pages exist; RelatedTools links each tool to 3
related tools.