import Link from "next/link";
import AdSlot from "./AdSlot";
import ToolSeoText from "./ToolSeoText";
import SoftwareAppLd from "./SoftwareAppLd";
import RelatedTools from "./RelatedTools";

export default function ToolLayout({
  title,
  description,
  seoTitle,
  seoText,
  children,
}: {
  title: string;
  description: string;
  seoTitle: string;
  seoText: string;
  children: React.ReactNode;
}) {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-8">
      <SoftwareAppLd name={title} />

      {/* Header ad slot */}
      <AdSlot label="header" className="mb-5" />

      <nav aria-label="Breadcrumb" className="mb-4 text-sm">
        <Link href="/" className="text-accent-600 hover:underline">
          Home
        </Link>
        <span className="mx-2 text-gray-300">/</span>
        <span className="text-gray-500">{title}</span>
      </nav>

      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-base text-gray-600">{description}</p>
      </header>

      {/* Top ad slot */}
      <AdSlot label="top" className="mb-8" />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
        {children}
      </div>

      {/* Inline ad slot right after the tool */}
      <AdSlot label="inline" className="mt-8" />

      <p className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
        <svg
          className="h-4 w-4 text-accent-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
        Files never leave your browser. All processing happens locally.
      </p>

      <ToolSeoText title={seoTitle} text={seoText} />

      {/* Middle ad slot before internal links */}
      <AdSlot label="middle" className="mt-8" />

      {/* Internal linking to related tools for SEO */}
      <RelatedTools />

      {/* Bottom ad slot */}
      <AdSlot label="bottom" className="mt-8" />

      {/* Footer ad slot */}
      <AdSlot label="footer" className="mt-5" />
    </article>
  );
}
