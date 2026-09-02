import { NextRequest, NextResponse } from "next/server";
import { checkoutUrl } from "@/lib/lemon";
import { getClientIp } from "@/lib/ip";

const PRICE_LK = "$1.59";
const PRICE_GLOBAL = "$3.49";

async function detectCountry(request: NextRequest): Promise<string> {
  const vercel = request.headers.get("x-vercel-ip-country");
  if (vercel) return vercel;
  const ip = getClientIp(request);
  try {
    const res = await fetch(`https://ipapi.co/${ip}/country/`, { signal: AbortSignal.timeout(3000) });
    if (res.ok) return (await res.text()).trim();
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
