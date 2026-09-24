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

      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
        {children}
      </div>

      <AdSlot slot="inline" className="mt-8" />

      <p className="mt-6 text-center text-sm text-gray-500">
        Privacy and processing method depend on the tool.{" "}
        <Link href="/privacy" className="font-medium text-accent-600 hover:underline">
          See how QuicTools handles data.
        </Link>
      </p>

      <ToolSeoText title={seoTitle} text={seoText} />

      <RelatedTools />

      <AdSlot slot="bottom" className="mt-8" />
    </article>
  );
}
