# SEO Change Log — QuicTools (quictools.cc)

Each entry records a batch of SEO work, what changed, why, and how to verify.
Covers the "Quiktools.cc AI SEO Growth Agent" program. Only quictools.cc is touched.

---

## Batch 1 — Technical SEO + content + schema (this session)

### 1. Canonical & hreflang moved into `<head>` (HIGH impact)
- **Problem:** `components/Hreflang.tsx` was a `"use client"` component rendering
  `<link rel="canonical">` into the DOM `<body>`. Google ignores `<link>` tags in
  the body, so the 36 tool pages + homepage had no effective canonical.
- **Change:**
  - Added `lib/seo.ts` helper `canonical(path)` returning Next.js `Metadata`
    `alternates.canonical` + `alternates.languages` (en / x-default) + og:url.
  - Deleted `components/Hreflang.tsx`; removed its usage from `app/layout.tsx`.
  - Applied `...canonical("/<path>")` to all 36 ToolLayout tool pages, the homepage
    (`app/page.tsx`), and info pages (`terms-of-service`, `privacy`, `about`,
    `contact`, `pricing`). Game pages + `/tools/*` index pages already set correct
    `alternates.canonical` in server metadata (kept).
- **Verify:** Search-page source of any tool page shows one `<link rel="canonical">`
  inside `<head>` (not `<body>`).
- **Files:** `lib/seo.ts` (new), `components/Hreflang.tsx` (deleted), `app/layout.tsx`,
  `app/page.tsx`, 36 tool `page.tsx`, 5 info `page.tsx`.

### 2. Sitemap now data-driven (MEDIUM)
- **Problem:** `next-sitemap.config.js` had a stale hardcoded priority list that
  omitted the 12 new tools, `/terms-of-service`, and `/tools/*` index pages.
- **Change:** Replaced the hardcoded list with a classifier: `/`=1.0, `/games`=0.85,
  `/tools/*`=0.7, info pages=0.4, all other tool/game pages=0.9. No stale list to
  maintain; new tools are picked up automatically.
- **Files:** `next-sitemap.config.js`.
- **Note:** sitemap regenerates on next `npm run build` (postbuild `next-sitemap`).

### 3. SEO landing pages — 12 new tools (HIGH — biggest funnel gap)
- Added full keyword-targeted `/tools/*` index pages (meta, H1, intro, body, FAQ,
  related) for: fake-whatsapp-chat, fake-tweet-generator, fake-notification-generator,
  fake-caller-id-generator, receipt-generator, signature-generator, invoice-generator,
  resume-builder, countdown-timer-generator, random-name-picker, text-to-handwriting,
  meme-generator.
- These auto-generate via `generateStaticParams` and inherit the full schema graph
  (WebPage / BreadcrumbList / FAQPage / HowTo / WebApplication) from `IndexLayout` +
  `IndexPageJsonLd`.
- **Files:** `lib/indexPages.ts`.

### 4. Breadcrumb schema added to tool pages (MEDIUM)
- `SoftwareAppLd.tsx` now also emits a `BreadcrumbList` JSON-LD matching the existing
  visible breadcrumb nav (Home → tool). FAQPage was intentionally NOT added to tool
  pages to stay Google-compliant (no visible FAQ there); index pages already have
  valid, visible FAQs with matched FAQPage schema.
- **Files:** `components/SoftwareAppLd.tsx`.

### 5. Internal linking — full coverage (MEDIUM)
- Completed the `RelatedTools` `NAMES`/`RELATED` maps so all 36 tool routes link to
  3 related tools. Added the missing `/social-media-video-downloader` entry.
- Verified: no dangling targets (every RELATED key/target exists in NAMES), no tool
  route missing a RELATED entry.
- **Files:** `components/RelatedTools.tsx`.

### 6. More high-volume index pages (MEDIUM)
- Added index pages for existing tools that lacked them: age-calculator, gpa-calculator,
  unit-converter, currency-converter, password-generator, username-generator,
  social-media-caption-generator, aspect-ratio-cropper, social-media-image-resizer,
  video-compressor-online.
- **Files:** `lib/indexPages.ts`.

### 7. Supported conversion pages (guarded) (MEDIUM)
- Added `jpg-to-pdf` index page (real `/jpg-to-pdf` tool exists).
- **Deliberately NOT added** (tool-gap — no real tool supports these): jpg-to-png,
  png-to-jpg, heic-to-jpg, webp conversion. Per guardrail, do not fabricate pages for
  unsupported conversions. These are recorded as future tool opportunities.
- **Files:** `lib/indexPages.ts`.

### 8. Metadata de-duplication (PASS — no changes needed)
- Scanned all 36 tool pages + games + info pages + 37 index pages for duplicate
  titles/descriptions. None found.

### Result
- Tool pages: 36 + homepage + info pages now emit canonical in `<head>`.
- Index landing pages: now **37** (was 14).
- Files changed: ~46 modified + 2 new (`lib/seo.ts`) + 1 deleted (Hreflang) + 2 docs.

---

### 9. Follow-up: restore-access noindexed (batch 1 cleanup)
- `restore-access` is a client action/support page with no SEO value but was being
  indexed (it fell into the old sitemap). Added `app/restore-access/layout.tsx`
  with `robots: { index: false, follow: false }` and excluded it from the sitemap.
- Verified rendered `<meta name="robots" content="noindex, nofollow"/>` and its
  removal from `sitemap-0.xml`.
- **Files:** `app/restore-access/layout.tsx` (new), `next-sitemap.config.js`.

### Coverage verification (batch 1)
- All 54 content pages (36 tool + homepage + games + info) emit a canonical in
  `<head>` (confirmed in prerendered HTML; none in `<body>`), no hreflang links in
  body, breadcrumb + WebApplication schema on tool pages.
- All 91 sitemap URLs map to real routes; every app page is in the sitemap except
  the intentionally-noindexed restore-access.
- Duplicate-title/description scan clean.

## Not yet done (future)
- Internationalization (hreflang beyond en/x-default) — deliberately deferred; avoid
  low-quality MT. Enable later once English funnel + measurement are solid.
- JPG→PNG / PNG→JPG / HEIC→JPG conversions require building new tools first.
- Add `lastmod` only on real content changes (currently set on every build).
- Next.js 15.x migration — the advisory ranges for the `next` npm advisories (SSRF,
  cache poisoning, etc.) require >=15.5.x to be marked fixed; this app uses none of
  the exploitable features (no Server Actions, no rewrites, no images.remotePatterns,
  no WebSocket), so 14.2.35 is a documented, acceptable interim posture.

---

## Security Remediation Batch (this session)

### HIGH — Eliminated the client-side env-secret foot-gun
- Splitting `lib/env.ts` into:
  - `lib/env.public.ts` → only `NEXT_PUBLIC_*` / public AdSense /site values.
  - `lib/env.server.ts` → secrets (`LEMONSQUEEZY_API_KEY`, `JWT_SECRET`,
    checkout URLs, `COOKIE_DOMAIN`, `DISABLE_USAGE_LIMIT`).
- Deleted the bundled object. Updated all consumers:
  - Client: `AdSlot.tsx` → now imports `PUBLIC_ENV` from `env.public` only.
  - Server: `layout.tsx` (public), `api/usage`, `api/lemon-squeezy`, `lib/jwt`,
    `lib/lemon`, `lib/usage` → import `SERVER_ENV` from `env.server`.
- **Verified:** the actual `JWT_SECRET`/`LEMONSQUEEZY_API_KEY` VALUES are absent from
  all client chunks and prerendered HTML; even the property-name references to the
  secrets are gone from client bundles. `env.public.ts` contains no secret fields.
- **Files:** `lib/env.public.ts` (new), `lib/env.server.ts` (new), `lib/env.ts`
  (deleted), `components/AdSlot.tsx`, `app/layout.tsx`, `app/api/usage/route.ts`,
  `app/api/lemon-squeezy/route.ts`, `lib/jwt.ts`, `lib/lemon.ts`, `lib/usage.ts`.

### HIGH — Usage limit state made explicit (stays disabled)
- `DISABLE_USAGE_LIMIT` is server-only now. It remains `true` (free-tools site).
  No gate was silently enabled; flagged for the operator to flip when the paid path
  is ready. `lib/usage.ts` returns `allowed:true, limit:999999` when disabled.

### MEDIUM — Rate-limited previously-unthrottled endpoints
- `/api/checkout` and `/api/exchange-rate` now use the shared `RateLimiter`
  (30/min/IP) via `getClientIp`, mirroring `/api/usage`.
- **Files:** `app/api/checkout/route.ts`, `app/api/exchange-rate/route.ts`.

### MEDIUM — Next.js upgraded 14.2.15 → 14.2.35 (latest patched 14.2.x)
- Covers interim patches without a React 19 / Async `params` migration.
- **Note:** `npm audit` still lists the `next` advisories; ranges require >=15.5.x.
  This app does not use the affected features (no Server Actions/rewrites/
  images.remotePatterns/WebSocket), so this is an accepted, documented posture.
  Full 15.x migration tracked under "Not yet done".
- **Files:** `package.json`, `package-lock.json`.

### MEDIUM — Added Edge-safe `middleware.ts` (CSRF + global gate)
- For non-safe (`POST/PUT/DELETE/…`) requests to `/api/*`, rejects when
  `Sec-Fetch-Site: cross-site` or a mismatched `Origin` is present. Non-browser
  clients (Lemon Squeezy webhook, curl) send neither and are unaffected.
- Dependency-free and Edge-safe (no Node imports). Only matches `/api/*`.
- **Files:** `middleware.ts` (new).

### LOW — Dependency & hygiene cleanups
- `playwright` → moved to `devDependencies` (it is not imported by any runtime code;
  avoids shipping a full Chromium in the production image).
- `dotenv` removed (Next.js loads `.env` natively; it was unused).
- `reactStrictMode` re-enabled (`true`).
- **Files:** `package.json`, `package-lock.json`, `next.config.mjs`.

### Known / accepted for this pass
- CSP still allows `script-src 'unsafe-inline' 'unsafe-eval'` (required by Next.js,
  AdSense, and html2canvas/jsPDF); not changed to avoid breaking ads/WASM tools.
- In-memory `RateLimiter` resets on restart and is single-instance (fine for the VPS).