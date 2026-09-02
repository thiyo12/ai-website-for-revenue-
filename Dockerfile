# ============================================================
# QuicTools — full production image
# Includes: Node 20 (Next.js), Python3, yt-dlp, ffmpeg, Playwright
# Chromium (for warm-session harvesting). Everything the video
# downloader needs to actually work.
# ============================================================

# ---- Installer stage: full JS deps + Python/yt-dlp deps ----
FROM node:20-slim AS installer
WORKDIR /app
ENV DEBIAN_FRONTEND=noninteractive

# Build tools + yt-dlp + ffmpeg + Playwright system deps
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 python3-pip ffmpeg \
    ca-certificates wget curl \
    && rm -rf /var/lib/apt/lists/*

# yt-dlp (python3-pip path)
RUN python3 -m pip install --no-cache-dir --upgrade yt-dlp

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

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 python3-pip ffmpeg openssl ca-certificates \
    && rm -rf /var/lib/apt/lists/* \
    && python3 -m pip install --no-cache-dir --upgrade yt-dlp

# Copy built app (node_modules includes playwright, so browser must be present)
COPY --from=installer /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY --from=builder /app/prisma ./prisma

# Install the Playwright headless browser (used for warm IG/TikTok sessions)
RUN npx playwright install chromium-headless-shell \
    && npx playwright install-deps chromium-headless-shell || true

USER node
EXPOSE 3000
CMD ["npm", "run", "start"]