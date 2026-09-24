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
    "/pricing",
    "/restore-access",
    "/tools/*",
  ],

  LOW_PRIORITY: new Set([
    "/about",
    "/contact",
    "/privacy",
    "/terms-of-service",
  ]),

  transform: async (_config, path) => {
    let priority = 0.9;

    if (path === "/") priority = 1;
    else if (path === "/games") priority = 0.65;
    else if (module.exports.LOW_PRIORITY.has(path)) priority = 0.4;

    return {
      loc: path,
      changefreq: "weekly",
      priority,
    };
  },
};
