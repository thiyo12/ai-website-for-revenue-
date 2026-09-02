import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const CURRENCIES = [
  "USD", "EUR", "GBP", "JPY", "INR", "LKR",
  "AUD", "CAD", "CNY", "CHF", "NZD", "SGD", "AED", "BRL", "IDR", "MYR",
].join(",");

export async function GET(request: NextRequest) {
  const rawBase = (request.nextUrl.searchParams.get("base") ?? "USD").toUpperCase();

  // Whitelist the base currency to prevent injecting arbitrary path segments /
  // special characters into the upstream URL (SSRF path probing).
  const allowed = CURRENCIES.split(",");
  if (!allowed.includes(rawBase)) {
    return NextResponse.json({ error: "Unsupported base currency" }, { status: 400 });
  }
  const base = rawBase;

  const url = `https://open.er-api.com/v6/latest/${base}`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) {
      return NextResponse.json(
        { error: "Upstream exchange rate service unavailable" },
        { status: 502 }
      );
    }
    const data = await res.json();
    if (data.result !== "success" || !data.rates) {
      return NextResponse.json({ error: "Invalid response from exchange service" }, { status: 502 });
    }

    const rates: Record<string, number> = {};
    for (const code of CURRENCIES.split(",")) {
      if (code !== base && typeof data.rates[code] === "number") {
        rates[code] = data.rates[code];
      }
    }

    return NextResponse.json({
      base,
      date: data.time_last_update_utc ?? new Date().toISOString(),
      rates,
    });
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch exchange rates" }, { status: 500 });
  }
}
