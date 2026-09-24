/**
 * PUBLIC environment variables — safe to bundle into client JavaScript.
 * Only reference NEXT_PUBLIC_* values here.
 */
export const PUBLIC_ENV = {
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? "https://quictools.cc",
  SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME ?? "QuicTools",
  ADSENSE_ID: process.env.NEXT_PUBLIC_ADSENSE_ID ?? "ca-pub-3655016924906610",
  ADSENSE_SLOT_HEADER: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HEADER ?? "",
  ADSENSE_SLOT_TOP: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP ?? "",
  ADSENSE_SLOT_MIDDLE: process.env.NEXT_PUBLIC_ADSENSE_SLOT_MIDDLE ?? "",
  ADSENSE_SLOT_BOTTOM: process.env.NEXT_PUBLIC_ADSENSE_SLOT_BOTTOM ?? "",
  ADSENSE_SLOT_INLINE: process.env.NEXT_PUBLIC_ADSENSE_SLOT_INLINE ?? "",
  ADSENSE_SLOT_FOOTER: process.env.NEXT_PUBLIC_ADSENSE_SLOT_FOOTER ?? "",
  PRO_PAYWALL_ENABLED: process.env.NEXT_PUBLIC_ENABLE_PRO_PAYWALL === "true",
} as const;
