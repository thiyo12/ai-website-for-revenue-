import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing - Unlock Unlimited Access",
  description:
    "QuicTools is free to use with a daily limit. Unlock unlimited tool access with a simple one-time purchase. No subscription, no recurring fees.",
};

export default function PricingPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Unlimited Access
      </h1>
      <p className="mt-3 text-[15px] text-gray-600">
        Every QuicTools tool is free to use. To keep the site running and
        cover our costs, each browser gets a free daily allowance of{" "}
        <strong className="text-gray-900">3 tool uses</strong>. When you reach
        that limit, a simple one-time purchase unlocks{" "}
        <strong className="text-gray-900">unlimited use of every tool</strong> —
        no subscription, no recurring fees.
      </p>

      <div className="mt-8">
        <div className="rounded-2xl border border-accent-200 bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Lifetime Unlock</h2>
            <span className="rounded-full bg-accent-50 px-3 py-1 text-xs font-semibold text-accent-700">
              One-time
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Unlimited use of every tool, forever.
          </p>

          <p className="mt-6">
            <span className="text-2xl font-bold text-gray-900">Pricing varies by region</span>
          </p>
          <p className="mt-2 text-sm text-gray-600">
            We use location-based pricing so the unlock is affordable for
            everyone. Your price is shown automatically at checkout.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href="/api/checkout"
              className="w-full rounded-lg bg-accent-600 px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-accent-700"
            >
              Unlock now
            </a>
            <Link
              href="/restore-access"
              className="w-full rounded-lg border border-gray-300 bg-white px-6 py-3 text-center text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              Already paid? Restore access
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-3 text-[15px] leading-relaxed text-gray-600">
        <h2 className="text-lg font-semibold text-gray-900">How it works</h2>
        <ul className="list-inside list-disc space-y-1">
          <li>Use any tool for free — you get 3 tool uses per day.</li>
          <li>
            When you hit the limit, a friendly prompt explains the unlock.
          </li>
          <li>
            Complete the one-time payment via our secure checkout (powered by
            Lemon Squeezy).
          </li>
          <li>
            Your access is restored automatically and stays unlocked across
            visits on your device.
          </li>
        </ul>
      </div>
    </div>
  );
}
