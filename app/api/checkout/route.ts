import { NextRequest, NextResponse } from "next/server";
import { checkoutUrl } from "@/lib/lemon";
import { getClientIp } from "../lib/rate";

const PRICE_LK = "$1.59";
const PRICE_GLOBAL = "$3.49";

function isWellFormedIp(ip: string): boolean {
  const v = ip.trim();
  if (!v || v.length > 45) return false;
  if (v.includes(".")) {
    const parts = v.split(".");
    if (parts.length !== 4) return false;
    return parts.every((p) => /^\d{1,3}$/.test(p) && Number(p) <= 255);
  }
  if (v.includes(":")) return /^[0-9a-fA-F:.]+$/.test(v);
  return false;
}

async function detectCountry(request: NextRequest): Promise<string> {
  // Only trust the proxy-provided country header (e.g. Caddy/Traefik set this).
  const proxied = request.headers.get("cf-ipcountry") ?? request.headers.get("x-vercel-ip-country");
  if (proxied && /^[A-Za-z]{2}$/.test(proxied)) return proxied.toUpperCase();

  // Fall back to a geo lookup using a validated, well-formed IP. Never embed an
  // arbitrary (possibly injected) string into the upstream URL.
  const ip = getClientIp(request);
  if (!isWellFormedIp(ip)) return "US";
  try {
    const res = await fetch(`https://ipapi.co/${ip}/country/`, { signal: AbortSignal.timeout(3000) });
    if (res.ok) return (await res.text()).trim().toUpperCase();
  } catch {}
  return "US";
}

export async function GET(request: NextRequest) {
  const country = await detectCountry(request);
  const variant = country === "LK" ? "LK" : "Global";
  const price = variant === "LK" ? PRICE_LK : PRICE_GLOBAL;
  const url = checkoutUrl(variant);
  return NextResponse.json({ url, price, variant, country });
}
