# QuicTools phased production and monetization plan

**Owner:** QuicTools · **Target branch:** `main` · **Work branch:** `fix/seo-ad-reliability-20261015` · **Tracking issue:** [#3](https://github.com/thiyo12/ai-website-for-revenue-/issues/3) · **PR:** [#2](https://github.com/thiyo12/ai-website-for-revenue-/pull/2)

> A passing page smoke test is not proof every tool produces correct results. AdSense approval and Google rankings are not guaranteed by development work.

## Phase 0 — Baseline and release controls (completed on branch)
- [x] `npm run build` and sitemap generation pass under Node 22
- [x] Playwright baseline: 140 tests passed on workflow run #108; expanded tests added since (latest run pending)
- [x] Keep changes on a pull request and document release blockers
**Gate:** Never deploy a failing branch; record a successful build/test run for each candidate SHA.

## Phase 1 — Security and stability (CODE AUDIT GREEN; production validation pending)
- [x] Upgrade and lock Next.js 16.4.2 / React 19.2; enforce a high/critical dependency audit gate in CI.
- [x] `npm audit --omit=dev`: **0 production advisories** in successful branch run #108 (Oct 18, 2026).
- [x] Restrict media proxy hosts/redirects and validate common reserved IPv4/IPv6 ranges.
- [x] Add bounded media range requests, shared media input limits, FFmpeg timeout/thread limits, and output size guard.
- [x] Cap in-memory rate limiter client cardinality; test throttling and expiry.
- [x] Prefer the nearest forwarded IP over a spoofable leftmost chain entry; **still requires trusted edge proxy configuration**.
- [ ] Verify real deployment DNS / yt-dlp / FFmpeg, reverse-proxy trust, process isolation and distributed rate limiting under load.
**Gate:** Green latest commit CI and no untriaged critical/high production advisories; review runtime security at the host.

## Phase 2 — Every tool's real output (IN PROGRESS; blocks release)
- [x] Browser smoke checks of top-level tool/game routes and no uncaught client errors in that suite; mobile viewport coverage at 390px and narrow 320px Sudoku test.
- [x] Fixture output tests for PDF merge, JPG→PDF, PDF→DOCX, PDF→JPG, DOCX→PDF and image compression.
- [x] Parse DOCX ZIP central directory instead of trusting missing local-file sizes, cap compressed/uncompressed document sizes, and handle PDF.js text line boundaries and image-only PDF OCR guidance.
- [x] Unit converter, QR, word count, password, 2048, countdown and palette interaction regression tests.
- [ ] For *each* remaining tool, test normal input, invalid/empty input, download contents, large input boundaries and mobile interaction.
- [x] Remove nonfunctional external MP3 export promise from text-to-speech; local voice playback remains available.
- [ ] Test third-party APIs under realistic failures, especially real server video extraction and conversion.
- [ ] Fix formatting and Unicode limitations in Word/PDF tools rather than promising pixel-perfect conversion.
**Gate:** 100% of advertised operations have a passing test or are explicitly marked limited/unavailable.

## Phase 3 — AdSense and user trust (blocks approval request)
- [x] Add visible ad labels and remove direct ads adjacent to games.
- [x] Disable **direct** ad slots on high-risk simulated-content and download pages until human policy review.
- [ ] Verify AdSense Auto Ads exclusions in the AdSense console (code-level slot exclusion is not enough).
- [ ] Verify publisher ID, live ads.txt, account/site approval status, consent/CMP and applicable Google privacy controls.
- [ ] Review content ownership/copyright terms, simulated receipts/chats, legal pages, accessibility and accidental-click placement.
**Gate:** AdSense policy checklist reviewed using the owner account; consent works where required.

## Phase 4 — SEO, performance and accessibility
- [x] Remove obsolete sitemap URLs and validate new generated sitemap.
- [x] Add automated internal-link integrity checks on public navigation pages.
- [ ] Check deployed indexable pages: 200 response, unique title/H1, canonical, appropriate robots, original useful instructions, no thin duplicates, valid internal links.
- [ ] Run Lighthouse on mobile and desktop and measure Core Web Vitals (LCP, INP, CLS).
- [ ] Check Google Search Console indexing and sitemap results after deployment.
**Gate:** No 404s in sitemap, major regressions or misleading content.

## Phase 5 — Safe deployment, review, monitor
- [ ] Require green **latest commit** CI, maintainer review, and a rollback method.
- [ ] Merge approved PR into `main` and deploy with the production-specific environment.
- [ ] Verify real HTTPS site and repeat smoke/output/API checks against `https://quictools.cc`.
- [ ] Monitor deployment errors, resource usage, indexing and account policy feedback.
**Gate:** Production validated; do not claim AdSense approval without a Google account confirmation.

## Required release evidence
For each gate, attach the GitHub Actions run URL, test results, any manual notes, and owner-side AdSense/Search Console status. Update issue #3; avoid checking an item based only on code inspection.
