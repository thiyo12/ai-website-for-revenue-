#!/usr/bin/env node
// Read-only verification of a newly deployed QuicTools build.
// Usage: npm run qa:live
// SITE_URL=https://staging.example.com FULL_SITEMAP=1 npm run qa:live
import { readFileSync } from "node:fs";

const origin = new URL(process.env.SITE_URL || "https://quictools.cc").origin;
const checks = [];
const full = process.env.FULL_SITEMAP === "1";

if (!/^https:/.test(origin) && !origin.startsWith("http://localhost")) {
  throw new Error("Only an HTTPS deployment or local test server may be checked.");
}

async function get(url) {
  const target = new URL(url, origin);
  if (target.origin !== origin) throw new Error("Cross-origin sitemap URL: " + target.href);
  const response = await fetch(target.href, {
    redirect: "follow",
    signal: AbortSignal.timeout(15_000),
    headers: { "User-Agent": "QuicToolsReleaseReadiness/1.0" },
  });
  if (!response.ok) throw new Error(target.pathname + " returned HTTP " + response.status);
  if (new URL(response.url).origin !== origin) {
    throw new Error(target.pathname + " redirected to an unexpected domain.");
  }
  return await response.text();
}

function locs(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/&amp;/g, "&"));
}

async function verify(name, fn) {
  try {
    const result = await fn();
    checks.push({ name, ok: true });
    console.log("PASS", name, result || "");
  } catch (error) {
    checks.push({ name, ok: false });
    console.error("FAIL", name, error instanceof Error ? error.message : String(error));
  }
}

await verify("Homepage and metadata", async () => {
  const html = await get("/");
  if (!/<title>[^<]+<\/title>/i.test(html)) throw Error("Missing page title");
  if (!/name=["']description["']/i.test(html)) throw Error("Missing meta description");
  if (!/<h1[\s>]/i.test(html)) throw Error("Missing homepage H1");
});
await verify("robots.txt sitemap declaration", async () => {
  const txt = await get("/robots.txt");
  if (!txt.includes(origin + "/sitemap.xml")) throw Error("robots.txt does not reference the deployed sitemap");
  if (/^Disallow:\s*\/\s*$/m.test(txt)) throw Error("robots.txt globally disallows crawling");
});
await verify("AdSense ads.txt matches repository", async () => {
  const deployed = (await get("/ads.txt")).trim();
  const expected = readFileSync(new URL("../public/ads.txt", import.meta.url), "utf8").trim();
  if (!expected.includes("google.com, pub-")) throw Error("Repository ads.txt publisher entry missing");
  if (!deployed.includes(expected)) throw Error("Deployed ads.txt does not match the repository's publisher entry");
});
await verify("Sitemap index and indexable pages", async () => {
  const root = await get("/sitemap.xml");
  if (!/<(?:sitemapindex|urlset)\b/i.test(root)) throw Error("Invalid sitemap XML root");
  const childSitemaps = /<sitemapindex\b/i.test(root) ? locs(root) : [];
  let listed = /<urlset\b/i.test(root) ? locs(root) : [];
  for (const part of childSitemaps) {
    const xml = await get(part);
    if (!/<urlset\b/i.test(xml)) throw Error("Invalid child sitemap: " + part);
    listed = listed.concat(locs(xml));
  }
  if (listed.length < 10) throw Error("Unexpectedly few indexable URLs: " + listed.length);
  for (const url of (full ? listed : listed.slice(0, 20))) {
    const html = await get(url);
    if (!/<title>[^<]+<\/title>/i.test(html)) throw Error("Missing title on sitemap page " + url);
    if (/name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html)) {
      throw Error("Noindex page included in sitemap: " + url);
    }
  }
  return listed.length + " URLs listed; checked " + (full ? listed.length : Math.min(20, listed.length));
});
const failed = checks.filter((check) => !check.ok);
console.log("\nReadiness checks: " + (checks.length - failed.length) + "/" + checks.length + " passed.");
console.log("Note: this does not verify AdSense account approval, consent setup, or real-user performance.");
if (failed.length) process.exitCode = 1;
