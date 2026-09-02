"use client";

import { usePaywall } from "@/hooks/usePaywall";

export default function PaywallModal() {
  const s = usePaywall();

  if (!s || s.loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-accent-200 border-t-accent-600" />
      </div>
    );
  }

  if (s.allowed) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="mx-4 max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-900">
          You&apos;ve used your {s.limit} free tools today
        </h2>
        <p className="mt-3 text-gray-600">
          Unlimited access is available with a one-time unlock.
        </p>

        <div className="mt-5 rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
          {s.remaining > 0 ? (
            <p>
              <span className="font-semibold text-gray-900">{s.remaining}</span>{" "}
              free use{s.remaining !== 1 ? "s" : ""} left today
            </p>
          ) : (
            <p className="font-semibold text-red-600">No free uses remaining</p>
          )}
        </div>

        <div className="mt-6 flex flex-col items-center gap-3">
          <a
            href={s.checkoutUrl ?? "/pricing"}
            className="w-full rounded-lg bg-accent-600 px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-accent-700"
          >
            Unlock unlimited access
          </a>
          <a
            href="/restore-access"
            className="text-sm text-accent-600 underline"
          >
            Already paid? Restore access
          </a>
        </div>
      </div>
    </div>
  );
}
