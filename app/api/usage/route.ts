import { NextRequest, NextResponse } from "next/server";
import { checkUsageLimit, recordUsage } from "@/lib/usage";
import { verifyUnlockToken } from "@/lib/jwt";
import { getClientIp } from "@/lib/ip";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const fingerprint = body.fingerprint as string | undefined;
    if (!fingerprint || typeof fingerprint !== "string") {
      return NextResponse.json({ error: "fingerprint required" }, { status: 400 });
    }

    const ip = getClientIp(request);
    const auth = request.headers.get("authorization");
    const token = auth?.startsWith("Bearer ") ? auth.slice(7) : undefined;

    if (token) {
      const decoded = await verifyUnlockToken(token);
      if (decoded) {
        return NextResponse.json({ allowed: true, used: 0, limit: 3, remaining: 999, unlocked: true });
      }
    }

    const result = await checkUsageLimit(fingerprint, ip);
    if (result.allowed) {
      await recordUsage(fingerprint, ip);
    }
    return NextResponse.json({ ...result, unlocked: false });
  } catch (e) {
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}
