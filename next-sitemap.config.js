/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://quictools.cc",
  generateRobotsTxt: false,
  outDir: "public",
  exclude: [
    "/opengraph-image",
    "/twitter-image",
    "/icon.svg",
    "/robots.txt",
    "/restore-access",
  ],

  // Low-priority informational / non-tool pages.
  // Every other top-level route is a tool or game and gets a high priority,
  // so we never need to hardcode the (large) list of tool slugs here again.
  LOW_PRIORITY: new Set([
    "/about",
    "/contact",
    "/pricing",
    "/privacy",
    "/terms-of-service",
    "/restore-access",
  ]),

  transform: async (_config, path) => {
    let priority = 0.9;

    if (path === "/") priority = 1;
    else if (path === "/games") priority = 0.85;
    else if (path.startsWith("/tools/")) priority = 0.7;
    else if (module.exports.LOW_PRIORITY.has(path)) priority = 0.4;

    return {
      loc: path,
      changefreq: "weekly",
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};