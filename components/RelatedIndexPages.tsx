import Link from "next/link";
import { getRelatedIndexPages } from "@/lib/indexPages";

export default function RelatedIndexPages({ slug }: { slug: string }) {
  const related = getRelatedIndexPages(slug);
  if (related.length === 0) return null;

  return (
    <section className="mt-12 rounded-2xl border border-gray-200 bg-gray-50 p-6">
      <h2 className="mb-4 text-xl font-bold tracking-tight text-gray-900">
        You might also need…
      </h2>
      <ul className="grid gap-2 sm:grid-cols-2">
        {related.map((r) => (
          <li key={r.slug}>
            <Link
              href={`/tools/${r.slug}`}
              className="flex items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-accent-600 transition-colors hover:border-accent-300 hover:bg-accent-50"
            >
              {r.h1}
              <svg
                className="h-4 w-4 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
