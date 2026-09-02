export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.SITE_URL ??
  "https://quictools.cc"
).replace(/\/+$/, "");

export const SITE_NAME = "QuicTools";
export const SITE_DESCRIPTION =
  "Free online tools that run 100% in your browser. Compress images, merge PDFs, generate QR codes, count words, convert units, and more.";

export const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "";
export const BING_VERIFICATION = process.env.NEXT_PUBLIC_BING_VERIFICATION ?? "";