export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.SITE_URL ??
  "https://quictools.cc"
).replace(/\/+$/, "");

export const SITE_NAME = "QuicTools";
export const SITE_DESCRIPTION =
  "Fast, practical online tools for images, PDFs, text, QR codes, calculations and everyday tasks. Many tools process data locally in your browser.";

export const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "";
export const BING_VERIFICATION = process.env.NEXT_PUBLIC_BING_VERIFICATION ?? "";
