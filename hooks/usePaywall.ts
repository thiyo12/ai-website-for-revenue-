import { useEffect, useState } from "react";

async function sha256Hex(str: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function usePaywall() {
  const [status, setStatus] = useState<{
    loading: boolean;
    allowed: boolean;
    used: number;
    limit: number;
    remaining: number;
    checkoutUrl: string | null;
  } | null>(null);

  useEffect(() => {
    let cancelled = false;
    let ignore = false;

    void (async () => {
      const fp = await sha256Hex(
        navigator.userAgent +
          "|" +
          screen.width +
          "|" +
          screen.height +
          "|" +
          Intl.DateTimeFormat().resolvedOptions().timeZone
      );
      if (cancelled) return;

      const [usage, checkout] = await Promise.all([
        fetch("/api/usage", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fingerprint: fp }),
        }).then((r) => r.json()),
        fetch("/api/checkout").then((r) => r.json()),
      ]);
      if (cancelled) return;
      setStatus({
        loading: false,
        allowed: usage.allowed,
        used: usage.used,
        limit: usage.limit,
        remaining: usage.remaining,
        checkoutUrl: checkout?.url ?? null,
      });
    })().catch(() => {
      if (!cancelled && !ignore) setStatus({ loading: false, allowed: true, used: 0, limit: 3, remaining: 3, checkoutUrl: null });
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return status;
}
