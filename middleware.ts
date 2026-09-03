import { NextRequest, NextResponse } from "next/server";

/**
 * Global request protection for /api/*.
 *
 * CSRF guard: for state-changing (non-safe) requests, we reject requests that
 * originate from a different site. Browsers send `Sec-Fetch-Site` (and usually
 * `Origin`) on cross-origin requests, so we can distinguish a forged request
 * from the user's own same-origin app or a traditional API client (curl, the
 * webhook sender, etc.) which send neither.
 *
 * This is kept dependency-free and Edge-safe (no Node/Prisma imports).
 */

const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

function isSameOrigin(origin: string | null, host: string | null): boolean {
  if (!origin || !host) return false;
  try {
    const o = new URL(origin);
    return o.host.toLowerCase() === (host || "").toLowerCase();
  } catch {
    return false;
  }
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only guard API routes; everything else passes through untouched.
  if (!pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  const method = req.method;
  if (!SAFE_METHODS.has(method)) {
    // CSRF check for state-changing requests.
    const requestHost = req.headers.get("host");
    const origin = req.headers.get("origin");
    const secFetchSite = req.headers.get("sec-fetch-site");

    // A browser flagging the request as cross-site is a forged request.
    if (secFetchSite === "cross-site") {
      return NextResponse.json(
        { error: "Cross-site request blocked" },
        { status: 403 }
      );
    }

    // If an Origin is present, it must match our own host.
    if (origin && !isSameOrigin(origin, requestHost)) {
      return NextResponse.json(
        { error: "Request blocked: invalid origin" },
        { status: 403 }
      );
    }
    // (No Origin / no Sec-Fetch-Site => non-browser client; allow. True CSRF
    //  requires a browser, and browsers provide these headers.)
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};