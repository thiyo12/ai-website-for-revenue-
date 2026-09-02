/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://quictools.cc",
  generateRobotsTxt: false,
  outDir: "public",
  exclude: ["/opengraph-image", "/twitter-image", "/icon.svg", "/robots.txt"],
  transform: async (_config, path) => {
    let priority = 0.8;
    if (path === "/") priority = 1;
    else if (path === "/games") priority = 0.85;
    else if (
      [
        "/image-compressor",
        "/pdf-to-word",
        "/word-to-pdf",
        "/image-to-text-ocr",
        "/jpg-to-pdf",
        "/pdf-to-jpg",
        "/background-remover",
        "/social-media-image-resizer",
        "/aspect-ratio-cropper",
        "/pdf-merger",
        "/qr-generator",
        "/text-to-speech",
        "/color-palette-generator",
        "/word-counter",
        "/unit-converter",
        "/currency-converter",
        "/age-calculator",
        "/password-generator",
        "/gpa-calculator",
        "/video-to-gif",
        "/social-media-video-compressor",
        "/username-generator",
        "/social-media-caption-generator",
        "/daily-word-game",
        "/daily-sudoku",
        "/2048",
        "/snake",
        "/minesweeper",
        "/memory-match",
        "/tetris",
        "/tic-tac-toe",
        "/connect-four",
        "/reaction-time-test",
        "/typing-speed-test",
        "/daily-trivia",
      ].includes(path)
    )
      priority = 0.9;
    else if (path === "/about" || path === "/contact") priority = 0.5;
    else if (path === "/privacy") priority = 0.3;

    return {
      loc: path,
      changefreq: "weekly",
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};
