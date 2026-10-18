# QuicTools phased production and monetization plan

**Owner:** QuicTools · **Target branch:** `main` · **Work branch:** `fix/seo-ad-reliability-20261015` · **Tracking issue:** [#3](https://github.com/thiyo12/ai-website-for-revenue-/issues/3) · **PR:** [#2](https://github.com/thiyo12/ai-website-for-revenue-/pull/2)

> A passing page smoke test is not proof every tool produces correct results. AdSense approval and Google rankings are not guaranteed by development work.

## Phase 0 — Baseline and release controls (completed on branch)
- [x] `npm run build` and sitemap generation pass under Node 22
- [x] Playwright baseline: 71 tests passed on workflow run #56
- [x] Keep changes on a pull request and document release blockers
**Gate:** Never deploy a failing branch; record a successful build/test run for each candidate SHA.

## Phase 1 — Security and stability (IN PROGRESS; blocks release)
- [ ] Run an explicit `npm audit --omit=dev` in CI, record affected production packages, and classify findings as patched / mitigated / not exploitable with evidence.
- [ ] Fix production critical/high findings, update the lockfile safely, and enforce an audit gate; don't run `npm audit fix --force` blindly.
- [x] Restrict video-download proxy destinations and redirects to YouTube media CDN, with size limits and negative security tests.
- [ ] Validate yt-dlp, ffmpeg, file-size ceilings, rate limits, resource exhaustion, DNS rebinding, and proxy header trust in the production environment.
- [ ] Add input/size/timeout tests for each server endpoint.
**Gate:** No untriaged critical/high production advisories; no open arbitrary-address proxy; supported deployment runtimes.

## Phase 2 — Every tool's real output (IN PROGRESS; blocks release)
- [x] Browser smoke checks of top-level tool/game routes and no uncaught client errors in that suite.
- [x] Fixture output tests for PDF merge, JPG→PDF, PDF→DOCX, PDF→JPG, DOCX→PDF and image compression.
- [x] Unit converter, QR, word count, password, 2048, countdown and palette interaction regression tests.
- [ ] For *each* remaining tool, test normal input, invalid/empty input, download contents, large input boundaries and mobile interaction.
- [ ] Test third-party APIs under realistic failures and verify user-facing limitations (notably text-to-speech export and video extraction).
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
