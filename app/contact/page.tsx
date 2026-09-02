import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the QuicTools team. Send feedback, report a bug, or suggest a new free online tool.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Contact QuicTools
      </h1>

      <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-gray-600">
        <p>
          Have a question, a bug report, or an idea for a new tool? We would
          love to hear from you.
        </p>
        <p>
          Please reach out by email. We read every message and try to respond
          within a few business days.
        </p>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Email us at</p>
          <a
            href="mailto:quictools.cc@gmail.com"
            className="mt-1 inline-block text-lg font-semibold text-accent-600 hover:underline"
          >
            quictools.cc@gmail.com
          </a>
          <p className="mt-3 text-sm text-gray-500">
            Before writing, you may find an answer in our{" "}
            <span className="text-gray-600">About</span> or{" "}
            <span className="text-gray-600">Privacy Policy</span> pages.
          </p>
        </div>
      </div>
    </div>
  );
}