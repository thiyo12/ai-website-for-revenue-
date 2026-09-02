import { SignJWT, jwtVerify } from "jose";
import { ENV } from "./env";

const secret = () => {
  const s = ENV.JWT_SECRET || process.env.JWT_SECRET || "";
  if (!s) throw new Error("JWT_SECRET is required");
  return new TextEncoder().encode(s);
};

export async function createUnlockToken(email: string): Promise<string> {
  return await new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256", typ: "jwt" })
    .setIssuedAt()
    .setExpirationTime("1y")
    .sign(secret());
}

export async function verifyUnlockToken(token: string): Promise<{ email: string } | null> {
  try {
    const { payload } = await jwtVerify(token, secret());
    return payload as { email: string };
  } catch {
    return null;
  }
}

export function unlockCookieAttrs(): Record<string, string | number | boolean> {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    ...(ENV.COOKIE_DOMAIN ? { domain: ENV.COOKIE_DOMAIN } : {}),
  };
}
