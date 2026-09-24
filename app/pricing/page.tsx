import type { Metadata } from "next";
import Link from "next/link";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonical("/pricing"),
  title: "QuicTools is currently free",
  description:
    "QuicTools is currently free to use. A future optional Pro plan may add convenience features such as ad-free use and advanced processing.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function PricingPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        QuicTools is currently free
      </h1>
      <p className="mt-4 text-[15px] leading-relaxed text-gray-600">
        The core QuicTools utilities are currently available without a paid
        unlock. We are focusing on making the tools useful, reliable, and easy
        to access.
      </p>

      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">Future QuicTools Pro</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">
          In the future, an optional Pro plan may offer convenience features
          such as an ad-free experience, larger or batch jobs, advanced exports,
          and other power-user features. Core free access will remain the focus
          while the product is being improved.
        </p>
      </div>

      <Link
        href="/"
        className="mt-8 inline-block rounded-lg bg-accent-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-700"
      >
        Browse free tools
      </Link>
    </div>
  );
}
