import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-white">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-4 py-10 sm:flex-row sm:justify-between">
        <div className="text-center sm:text-left">
          <p className="text-base font-semibold text-gray-900">
            Quic<span className="text-accent-600">Tools</span>
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Free, private, browser-based tools. Your files never leave your
            device.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            <a
              href="mailto:quictools.cc@gmail.com"
              className="font-medium text-accent-600 hover:underline"
            >
              quictools.cc@gmail.com
            </a>
          </p>
        </div>

        <nav
          aria-label="Footer"
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-gray-600"
        >
          <Link href="/about" className="transition-colors hover:text-accent-600">
            About
          </Link>
          <Link href="/games" className="transition-colors hover:text-accent-600">
            Games
          </Link>
          <Link href="/contact" className="transition-colors hover:text-accent-600">
            Contact
          </Link>
          <Link href="/privacy" className="transition-colors hover:text-accent-600">
            Privacy Policy
          </Link>
          <Link href="/restore-access" className="transition-colors hover:text-accent-600">
            Restore Access
          </Link>
        </nav>
      </div>

      <div className="border-t border-gray-100 py-4 text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} QuicTools. All rights reserved.
      </div>
    </footer>
  );
}
