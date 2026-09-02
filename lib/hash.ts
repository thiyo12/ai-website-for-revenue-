import { randomBytes, createHash } from "node:crypto";

export const SECRET = process.env.SECRET ?? "dev-secret-change-me";

export function sha256(str: string): string {
  return createHash("sha256").update(str).digest("hex");
}

export function randomToken(): string {
  return randomBytes(32).toString("hex");
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
