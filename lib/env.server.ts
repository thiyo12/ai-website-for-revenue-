/**
 * SERVER-ONLY environment variables — containing secrets (Lemon Squeezy API
 * key, JWT secret) and server-side configuration. This module must NEVER be
 * imported by any "use client" component or anything bundled to the browser.
 *
 * If you need public values on the client, import from "./env.public" instead.
 */
export const SERVER_ENV = {
  LEMONSQUEEZY_CHECKOUT_LK: process.env.LEMONSQUEEZY_CHECKOUT_LK ?? "",
  LEMONSQUEEZY_CHECKOUT_GLOBAL: process.env.LEMONSQUEEZY_CHECKOUT_GLOBAL ?? "",
  LEMONSQUEEZY_API_KEY: process.env.LEMONSQUEEZY_API_KEY ?? "",
  JWT_SECRET: process.env.JWT_SECRET ?? "",
  COOKIE_DOMAIN: process.env.COOKIE_DOMAIN ?? "",
  DISABLE_USAGE_LIMIT: process.env.DISABLE_USAGE_LIMIT !== "false",
} as const;