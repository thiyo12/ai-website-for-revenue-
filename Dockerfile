# ============================================================
# QuicTools — full production image
# Includes: Node 20 (Next.js), Python3, yt-dlp, ffmpeg, Playwright
# Chromium (for warm-session harvesting). Everything the video
# downloader needs to actually work.
# ============================================================

# ---- Installer stage: full JS deps ----
FROM node:20-slim AS installer
WORKDIR /app
ENV DEBIAN_FRONTEND=noninteractive

# yt-dlp needs Python at runtime only; here just install build deps for native packages
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 python3-pip ffmpeg ca-certificates wget curl \
    && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
RUN npm ci

# ---- Builder stage: build Next.js ----
FROM node:20-slim AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y --no-install-recommends openssl \
    && rm -rf /var/lib/apt/lists/*
COPY --from=installer /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

# ---- Runner stage: production runtime with full toolchain ----
FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV DEBIAN_FRONTEND=noninteractive
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright

# Runtime deps: python3, ffmpeg, curl (yt-dlp download), openssl (prisma), ca certs
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 ffmpeg curl openssl ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# yt-dlp as a standalone binary (self-contained, no pip/venv, zero maintenance)
RUN curl -L -o /usr/local/bin/yt-dlp https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp \
    && chmod +x /usr/local/bin/yt-dlp

# Copy only the built standalone app + static assets (prunes the large full
# node_modules copy, slashing build/export disk usage on the server)
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public

# Install the Playwright headless browser (used for warm IG sessions)
RUN npx playwright install chromium-headless-shell \
    && npx playwright install-deps chromium-headless-shell || true

USER node
EXPOSE 3000
CMD ["node", "server.js"]