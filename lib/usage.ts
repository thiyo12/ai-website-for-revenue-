import { sha256 } from "./hash";
import prisma from "./prisma";
import { ENV } from "./env";

export async function checkUsageLimit(
  fingerprint: string,
  ip: string
): Promise<{ allowed: boolean; used: number; limit: number; remaining: number }> {
  if (ENV.DISABLE_USAGE_LIMIT) {
    return { allowed: true, used: 0, limit: 999999, remaining: 999999 };
  }

  const key = sha256(fingerprint + ip);
  const limit = 3;
  const windowMs = 24 * 60 * 60 * 1000;
  const windowStart = new Date(Date.now() - windowMs);

  const used = await prisma.usageLog.count({
    where: {
      fingerprint: key,
      timestamp: { gte: windowStart },
    },
  });

  return {
    allowed: used < limit,
    used,
    limit,
    remaining: Math.max(limit - used, 0),
  };
}

export async function recordUsage(fingerprint: string, ip: string): Promise<void> {
  const key = sha256(fingerprint + ip);
  await prisma.usageLog.create({ data: { fingerprint: key } });
}
