import { NextRequest, NextResponse } from "next/server";
import { createUnlockToken, unlockCookieAttrs } from "@/lib/jwt";
import { lsGet } from "@/lib/lemon";
import { sha256 } from "@/lib/hash";
import { RateLimiter, getClientIp } from "../lib/rate";
import prisma from "@/lib/prisma";

const restoreLimiter = new RateLimiter(5, 60_000);

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  if (restoreLimiter.isLimited(ip)) {
    return NextResponse.json(
      { error: "Too many attempts. Please wait a minute and try again." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json().catch(() => ({}));
    const email = (body.email as string ?? "").trim().toLowerCase();
    const licenseKey = (body.licenseKey as string ?? "").trim();

    if (!email || !licenseKey) {
      return NextResponse.json({ error: "email and licenseKey required" }, { status: 400 });
    }

    const res = await lsGet(`/v1/licenses/${encodeURIComponent(licenseKey)}`);
    const okResponse = res.ok;
    const data = okResponse ? ((await res.json()) as any) : null;
    const licenseData = data?.data?.attributes;
    const licenseEmail = (licenseData.email ?? "").trim().toLowerCase();

    // Generic error: do not reveal whether the key is invalid or the email does
    // not match (prevents license brute-force / email enumeration).
    if (!okResponse || !licenseData || licenseEmail !== email) {
      return NextResponse.json(
        { error: "License could not be restored. Please double-check your license key and email." },
        { status: 400 }
      );
    }

    const variant = licenseData.variant_name ?? "Global";

    // Upsert license record
    await prisma.license.upsert({
      where: { licenseKey },
      update: { email, variantPaid: variant },
      create: { email, licenseKey, variantPaid: variant },
    });

    const token = await createUnlockToken(email);
    const cookie = unlockCookieAttrs();
    const headers = new Headers();
    headers.append(
      "Set-Cookie",
      `quicktools_unlock=${token}; Path=/; HttpOnly${cookie.secure ? "; Secure" : ""}; SameSite=${cookie.sameSite}; Max-Age=${cookie.maxAge}${cookie.domain ? "; Domain=" + cookie.domain : ""}`
    );
    return new NextResponse(JSON.stringify({ success: true }), { headers, status: 200 });
  } catch (e) {
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}
