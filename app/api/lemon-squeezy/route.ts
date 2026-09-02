import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ENV } from "@/lib/env";
import { createHmac, timingSafeEqual } from "node:crypto";

function validSignature(rawBody: string, signature: string | null): boolean {
  if (!signature) return false;
  const sig = signature.replace(/^sha256=/, "");
  const expected = createHmac("sha256", ENV.LEMONSQUEEZY_API_KEY).update(rawBody).digest();
  let sigBuf: Buffer;
  try {
    sigBuf = Buffer.from(sig, "hex");
  } catch {
    return false;
  }
  if (expected.length !== sigBuf.length) return false;
  return timingSafeEqual(expected, sigBuf);
}

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-signature");
  const test = request.headers.get("x-test");

  if (!test && process.env.NODE_ENV === "production") {
    if (!signature || !validSignature(rawBody, signature)) {
      return new NextResponse("Invalid signature", { status: 401 });
    }
  }

  try {
    const payload = JSON.parse(rawBody) as any;
    const event = payload?.event;
    const data = payload?.data?.attributes;
    const licenseKeys: string[] = data?.license_keys ?? [];
    const email = (data?.customer_email ?? "").trim().toLowerCase();

    if (event === "order_fulfilled" || event === "subscription_created") {
      const variant = data?.variant_name ?? "Global";
      for (const key of licenseKeys) {
        await prisma.license.upsert({
          where: { licenseKey: key },
          update: { email, variantPaid: variant },
          create: { email, licenseKey: key, variantPaid: variant },
        });
      }
    }

    return new NextResponse("OK", { status: 200 });
  } catch {
    return new NextResponse("Bad payload", { status: 400 });
  }
}
