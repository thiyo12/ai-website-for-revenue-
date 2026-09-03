/** @type {import('next').NextConfig} */

const csp = [
  // Default: same-origin + data/blob for media
  "default-src 'self' data: blob:",
  // Scripts: self, AdSense, CDN-wasm tools, plus unsafe-inline for Next's own scripts
  // (AdSense requires 'unsafe-inline' for its injected snippets and eval for ads)
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://googlesyndication.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://adservice.google.com https://cdn.jsdelivr.net https://www.googletagmanager.com",
  // Styles: self + inline (Next injects inline styles)
  "style-src 'self' 'unsafe-inline'",
  // Images: self + CDN video/image hosts
  "img-src 'self' data: blob: https://pagead2.googlesyndication.com https://*.googlesyndication.com https://*.cdninstagram.com https://*.fbcdn.net https://*.pinimg.com https://*.redd.it https://*.ytimg.com https://i.ytimg.com https://cdn.jsdelivr.net https://i.vimeocdn.com https://*.cloudfront.net",
  // Connections (fetch/XHR/WebSocket): self + source APIs + metadata
  "connect-src 'self' https://pagead2.googlesyndication.com https://*.googlesyndication.com https://googleads.g.doubleclick.net https://cdn.jsdelivr.net https://api.lemonsqueezy.com https://ipapi.co https://open.er-api.com https://www.googletagmanager.com https://www.google-analytics.com https://analytics.google.com",
  // Workers for ffmpeg wasm + blob workers
  "worker-src 'self' blob:",
  // Objects disabled
  "object-src 'none'",
  // Frame ancestors: block clickjacking
  "frame-ancestors 'none'",
  // No base-uri override
  "base-uri 'self'",
  // Form actions: self
  "form-action 'self'",
  // Upgrade insecure requests
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;