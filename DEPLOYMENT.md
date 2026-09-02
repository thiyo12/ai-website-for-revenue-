# Deploying QuicTools to a VPS

These steps get the site (23 tools + 12 games) and the **public video downloader**
running on a VPS. The downloader can reach Instagram/TikTok public reels only when the
VPS's IP is trusted by those platforms — see "Choosing a host" below.

## Prerequisites (choose a host)

Pick a VPS whose public IP is NOT obviously a blocked datacenter range.
The working downloader sites use clean cloud IPs (US/EU) or residential IPs.

Recommended options (in order of likelihood of working for IG/TikTok):
- A small VPS (Ubuntu 22.04/24.04) with a clean US/EU IP
- Render / Railway free tier (the downloader sites reference these)
- Any VPS + a residential `HTTPS_PROXY`/`SOCKS_PROXY` as a fallback

Requirements on the VPS:
- Node.js 20+ (tested on 22)
- Python 3 + pip (for yt-dlp) — or just the yt-dlp binary
- ffmpeg (for audio/dash merging)
- Enough RAM for a headless Chrome during session harvesting (~1–2 GB)

## 1. Install system dependencies

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install -y python3 python3-pip ffmpeg unzip curl

# yt-dlp via pip
pip3 install --upgrade yt-dlp
# or a standalone binary:
# curl -L -o /usr/local/bin/yt-dlp https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp
# chmod +x /usr/local/bin/yt-dlp

# Node 20+ (example using NodeSource if not present)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

## 2. Get the code

Option A — Git (recommended):
```bash
# From your local machine, first push the project to a private GitHub repo,
# then on the VPS:
git clone <your-private-repo-url> quictools
cd quictools
```

Option B — rsync from your machine:
```bash
# From your Mac, in the project folder:
rsync -av --exclude node_modules --exclude .next --exclude .env \
  ./ user@<vps-ip>:/home/user/quictools/
```

## 3. Install dependencies

```bash
cd quictools
npm install
# Install the Playwright browser used for warm-session harvesting:
npm run setup-browser
```

`better-sqlite3` is a native module — `npm install` will build it (needs
`python3` + `build-essential`). If the install fails, run:
```bash
sudo apt install -y build-essential
```

## 4. Database (PostgreSQL)

The site uses **PostgreSQL** via Prisma. Set up a Postgres server, then point the app at it.

**Option A — DigitalOcean Managed Database (recommended):**
Create a "PostgreSQL" Managed Database in the DO dashboard, then grab its connection string.

**Option B — Postgres on the same Droplet:**
```bash
sudo apt install -y postgresql
sudo -u postgres psql -c "CREATE USER quictools WITH PASSWORD 'CHANGE_ME';"
sudo -u postgres psql -c "CREATE DATABASE quictools OWNER quictools;"
```

## 4b. Configure environment

```bash
cp .env.example .env
nano .env
```

Set at minimum:
```env
NEXT_PUBLIC_SITE_URL="https://yourdomain.com"
SITE_NAME="QuicTools"
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/quictools?schema=public"
DISABLE_USAGE_LIMIT="true"
YTDLP_PATH="/usr/local/bin/yt-dlp"
```

## 4c. Create the tables

```bash
npx prisma db push
```
This creates the `UsageLog` and `License` tables from the schema (idempotent, safe to re-run).

If Instagram/TikTok still block the VPS IP, add a residential proxy:
```env
HTTPS_PROXY="http://user:pass@proxy:port"
# or
SOCKS_PROXY="socks5://user:pass@proxy:port"
```

## 5. Build and start

```bash
npm run build
# Start on port 3000
npm run start -- -p 3000
```

## 6. Reverse proxy with HTTPS (Caddy — easiest)

```bash
sudo apt install -y caddy
sudo caddy add-package github.com/caddyserver/nginx-adapter # optional
```

Create `/etc/caddy/Caddyfile`:
```caddy
yourdomain.com, www.yourdomain.com {
    reverse_proxy 127.0.0.1:3000
}
```

```bash
sudo systemctl reload caddy
```

Caddy issues an automatic TLS certificate, so HTTPS "just works".

## 7. Run it as a service (systemd)

Create `/etc/systemd/system/quictools.service`:
```ini
[Unit]
Description=QuicTools
After=network.target

[Service]
Type=simple
WorkingDirectory=/home/user/quictools
ExecStart=/usr/bin/npm run start -- -p 3000
Restart=always
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now quictools
```

## 8. Verify the downloader

```bash
# YouTube (must work)
curl -s "http://localhost:3000/api/extract?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DjNQXAC9IVRw" | grep -o '"platform":"youtube"'

# If the VPS IP is trusted, Instagram public reels now work too:
curl -s "http://localhost:3000/api/extract?url=https%3A%2F%2Fwww.instagram.com%2Freel%2F<REEL_ID>" | grep -o '"platform":"instagram"'
```

## Notes

- The warm-session harvester (`app/api/lib/mediaSession.ts`) opens Instagram/TikTok once
  every 6 hours with Playwright to keep an anonymous guest cookie jar fresh. It runs
  lazily on the first Instagram/TikTok request — the first request will be a little
  slower while it launches the browser.
- `MEDIA_IG_SESSION=false` and `MEDIA_TIKTOK_SESSION=false` disable harvesting.
- If the VPS IP is blocked, those platforms return a clear "temporarily unavailable"
  message — this is by design, not a bug.