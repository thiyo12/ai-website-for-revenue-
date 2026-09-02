import Link from "next/link";
import AdSlot from "./AdSlot";

export default function IndexLayout({
  toolName,
  toolHref,
  ctaText,
  intro,
  eyebrow,
  h1,
  faqs,
  body,
  children,
}: {
  toolName: string;
  toolHref: string;
  ctaText: string;
  intro: string[];
  eyebrow: string;
  h1: string;
  faqs: { q: string; a: string }[];
  body: { heading: string; text: string[] }[];
  children: React.ReactNode;
}) {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-8">
      <AdSlot label="header" className="mb-5" />

      <nav aria-label="Breadcrumb" className="mb-4 text-sm">
        <Link href="/" className="text-accent-600 hover:underline">
          Home
        </Link>
        <span className="mx-2 text-gray-300">/</span>
        <span className="text-gray-500">{h1}</span>
      </nav>

      <header className="mb-6">
        {eyebrow ? (
          <span className="mb-2 inline-block rounded-full bg-accent-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-600">
            {eyebrow}
          </span>
        ) : null}
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {h1}
        </h1>
        {intro.map((p, i) => (
          <p key={i} className="mt-3 max-w-2xl text-base text-gray-600">
            {p}
          </p>
        ))}
      </header>

      <AdSlot label="top" className="mb-8" />

      {/* CTA to the actual tool */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <p className="mb-4 text-sm text-gray-600">
          Ready to use it? Launch the free{" "}
          <span className="font-semibold text-gray-900">{toolName}</span> and
          finish the job in seconds.
        </p>
        <Link
          href={toolHref}
          className="inline-block rounded-lg bg-accent-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-700"
        >
          {ctaText}
        </Link>
      </div>

      <AdSlot label="inline" className="mt-8" />

      {/* Body content */}
      <section className="prose mt-10 space-y-8">
        {body.map((b) => (
          <div key={b.heading}>
            <h2 className="mb-3 text-2xl font-bold tracking-tight text-gray-900">
              {b.heading}
            </h2>
            {b.text.map((p, i) => (
              <p key={i} className="mb-3 text-[15px] leading-relaxed text-gray-600">
                {p}
              </p>
            ))}
          </div>
        ))}
      </section>

      <AdSlot label="middle" className="mt-10" />

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="mt-12" aria-label="Frequently asked questions">
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-gray-900">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <div
                key={f.q}
                className="rounded-xl border border-gray-200 bg-white p-5"
              >
                <h3 className="font-semibold text-gray-900">{f.q}</h3>
                <p className="mt-2 text-sm text-gray-600">{f.a}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <AdSlot label="bottom" className="mt-10" />

      {/* Related index pages */}
      {children}

      <AdSlot label="footer" className="mt-5" />
    </article>
  );
}
