import fs from "node:fs";
import path from "node:path";

const sitemapPath = path.join(process.cwd(), "public", "sitemap-0.xml");
if (!fs.existsSync(sitemapPath)) throw new Error("Missing generated sitemap-0.xml; run npm run build first");
const xml = fs.readFileSync(sitemapPath, "utf8");
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]));
if (!urls.length) throw new Error("Generated sitemap has no URLs");
const excluded = new Set(["/pricing", "/restore-access", "/fake-whatsapp-chat", "/fake-tweet-generator", "/fake-notification-generator", "/fake-caller-id-generator"]);
const invalid = urls.filter((url) =>
  url.origin !== "https://quictools.cc" ||
  url.pathname.startsWith("/tools/") ||
  excluded.has(url.pathname)
);
if (invalid.length) throw new Error("Invalid sitemap entries: " + invalid.map((u) => u.href).join(", "));
console.log("Sitemap OK:", urls.length, "URLs; no deprecated or excluded pages.");
