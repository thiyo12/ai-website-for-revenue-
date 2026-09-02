import { NextRequest, NextResponse } from "next/server";
import { createUnlockToken, unlockCookieAttrs } from "@/lib/jwt";
import { lsGet } from "@/lib/lemon";
import { sha256 } from "@/lib/hash";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const email = (body.email as string ?? "").trim().toLowerCase();
    const licenseKey = (body.licenseKey as string ?? "").trim();

    if (!email || !licenseKey) {
      return NextResponse.json({ error: "email and licenseKey required" }, { status: 400 });
    }

    const res = await lsGet(`/v1/licenses/${encodeURIComponent(licenseKey)}`);
    if (!res.ok) {
      return NextResponse.json({ error: "Invalid license key" }, { status: 400 });
    }
    const data = (await res.json()) as any;
    const licenseData = data?.data?.attributes;
    if (!licenseData) {
      return NextResponse.json({ error: "Invalid license key" }, { status: 400 });
    }

    const licenseEmail = (licenseData.email ?? "").trim().toLowerCase();
    if (licenseEmail !== email) {
      return NextResponse.json({ error: "License does not match this email" }, { status: 400 });
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
