"use client";

import { PUBLIC_ENV } from "@/lib/env.public";
import { usePaywall } from "@/hooks/usePaywall";

function EnabledPaywallModal() {
  const s = usePaywall();

  if (!s || s.loading || s.allowed) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="mx-4 max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-900">QuicTools Pro</h2>
        <p className="mt-3 text-gray-600">
          Premium access is available when QuicTools Pro is enabled.
        </p>
        <div className="mt-6 flex flex-col items-center gap-3">
          <a
            href={s.checkoutUrl ?? "/pricing"}
            className="w-full rounded-lg bg-accent-600 px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-accent-700"
          >
            View Pro access
          </a>
          <a href="/restore-access" className="text-sm text-accent-600 underline">
            Restore previous access
          </a>
        </div>
      </div>
    </div>
  );
}

export default function PaywallModal() {
  if (!PUBLIC_ENV.PRO_PAYWALL_ENABLED) return null;
  return <EnabledPaywallModal />;
}
