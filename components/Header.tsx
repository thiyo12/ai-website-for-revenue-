import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-600 text-lg font-bold text-white">
            Q
          </span>
          <span className="text-lg font-semibold tracking-tight text-gray-900">
            Quic<span className="text-accent-600">Tools</span>
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/pricing"
            className="rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 transition-colors hover:text-accent-600"
          >
            Pricing
          </Link>
          <Link
            href="/games"
            className="rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 transition-colors hover:text-accent-600"
          >
            Games
          </Link>
          <Link
            href="/"
            className="rounded-lg bg-accent-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-700"
          >
            All Tools
          </Link>
        </nav>
      </div>
    </header>
  );
}