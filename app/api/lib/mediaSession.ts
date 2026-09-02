import { chromium } from "playwright";
import { writeFile } from "node:fs/promises";
import { mkdtempSync, existsSync } from "node:fs";
import os from "node:os";
import path from "node:path";

export interface MediaSession {
  instagramCookieJar: string | null;
  tiktokCookieJar: string | null;
  sslCert: string | null;
  proxy: string | null;
  lastFetched: number;
}

interface SessionState {
  instagram?: string | null;
  tiktok?: string | null;
  expiresAt: number;
  fetching: Promise<MediaSession> | null;
}

const SESSION_TTL_MS = 6 * 60 * 60 * 1000;
const state: SessionState = { expiresAt: 0, fetching: null };

const SESSION_DIR = mkdtempSync(path.join(os.tmpdir(), "media-session-"));

function netscapeCookie(
  domain: string,
  cookie: { name: string; value: string; secure?: boolean; expires?: number }
): string {
  const expires = cookie.expires ? Math.floor(cookie.expires) : 2147483647;
  // Use a bare domain (no leading dot) to satisfy yt-dlp's parser
  return [
    domain.replace(/^\./, ""),
    "FALSE",
    "/",
    cookie.secure ? "TRUE" : "FALSE",
    String(expires),
    cookie.name,
    cookie.value,
  ].join("\t");
}

function proxyFromEnv(): string | null {
  if (process.env.SOCKS_PROXY || process.env.SOCKS5_PROXY) {
    return process.env.SOCKS_PROXY || process.env.SOCKS5_PROXY || null;
  }
  if (process.env.HTTPS_PROXY) return process.env.HTTPS_PROXY;
  if (process.env.HTTP_PROXY) return process.env.HTTP_PROXY;
  return null;
}

async function harvestCookieJar(domain: string, host: string, topUrl: string): Promise<string> {
  const dir = path.join(SESSION_DIR, host);
  const ctx = await chromium.launchPersistentContext(dir, {
    headless: true,
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    locale: "en-US",
    viewport: { width: 1280, height: 900 },
    args: ["--no-sandbox", "--disable-blink-features=AutomationControlled"],
  });
  try {
    const page = ctx.pages()[0] || (await ctx.newPage());
    await page.goto(topUrl, { waitUntil: "domcontentloaded", timeout: 30000 }).catch(() => {});
    await page.waitForTimeout(6000);
    const cookies = await ctx.cookies(domain);
    const jar = ["# Netscape HTTP Cookie File", ...cookies.map((c) => netscapeCookie(domain, c))];
    const file = path.join(SESSION_DIR, `${host}.txt`);
    await writeFile(file, jar.join("\n"), "utf8");
    return file;
  } finally {
    await ctx.close().catch(() => {});
  }
}

async function fetchSessions(): Promise<MediaSession> {
  const instagramEnabled = process.env.MEDIA_IG_SESSION !== "false";
  const tiktokEnabled = process.env.MEDIA_TIKTOK_SESSION !== "false";

  const proxy = proxyFromEnv();

  const [instagram, tiktok] = await Promise.all([
    instagramEnabled
      ? harvestCookieJar(
          "https://www.instagram.com",
          "instagram",
          "https://www.instagram.com/"
        )
      : Promise.resolve(null),
    tiktokEnabled
      ? harvestCookieJar("https://www.tiktok.com", "tiktok", "https://www.tiktok.com/")
      : Promise.resolve(null),
  ]);

  return {
    instagramCookieJar: instagram,
    tiktokCookieJar: tiktok,
    sslCert: process.env.SSL_CERT_FILE || null,
    proxy,
    lastFetched: Date.now(),
  };
}

export function getMediaSession(): Promise<MediaSession> {
  if (state.fetching) return state.fetching;
  if (state.expiresAt > Date.now()) {
    return Promise.resolve({
      instagramCookieJar: state.instagram ?? null,
      tiktokCookieJar: state.tiktok ?? null,
      sslCert: process.env.SSL_CERT_FILE || null,
      proxy: proxyFromEnv(),
      lastFetched: Date.now(),
    });
  }
  state.fetching = fetchSessions().then((s) => {
    state.instagram = s.instagramCookieJar;
    state.tiktok = s.tiktokCookieJar;
    state.expiresAt = Date.now() + SESSION_TTL_MS;
    state.fetching = null;
    return s;
  });
  return state.fetching;
}

export function sessionFileExists(platform: "instagram" | "tiktok"): boolean {
  const file = path.join(SESSION_DIR, `${platform}.txt`);
  return existsSync(file);
}