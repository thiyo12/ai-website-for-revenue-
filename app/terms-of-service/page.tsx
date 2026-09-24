import type { Metadata } from "next";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonical("/terms-of-service"),
  title: "Terms of Service",
  description:
    "Terms for using QuicTools utilities, generated content, mockup tools and online services.",
};

export default function TermsOfServicePage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Terms of Service
      </h1>
      <p className="mt-2 text-sm text-gray-500">
        Last updated: September 24, 2026
      </p>

      <div className="mt-6 space-y-6 text-[15px] leading-relaxed text-gray-600">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">Using QuicTools</h2>
          <p>
            By using QuicTools, you agree to use the site lawfully and not to
            misuse its tools, infrastructure, generated output, or third-party
            services.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">
            Tool processing and availability
          </h2>
          <p>
            Some tools process data locally in your browser while others may
            use server-side or third-party services. Features can change,
            become unavailable, or have practical file, browser, or processing
            limits. QuicTools does not guarantee uninterrupted availability or
            a particular result for every input.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">
            Mockups and simulated content
          </h2>
          <p>
            Mockup tools such as simulated chats, notifications, tweets, caller
            screens, or receipts are for legitimate demonstration,
            entertainment, design, or educational uses. Generated mockups are
            not authentic communications or proof that a real transaction or
            event occurred.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">
            Receipts are not proof of purchase
          </h2>
          <p>
            A receipt created with a QuicTools generator must not be presented
            as genuine proof of purchase, tax evidence, a reimbursement
            document, or evidence for a refund, warranty, return, or financial
            claim.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">
            Prohibited uses
          </h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>Fraud, deception, impersonation, or misleading representation.</li>
            <li>Harassment, threats, privacy invasion, or unlawful surveillance.</li>
            <li>Infringement of copyright, trademark, or other rights.</li>
            <li>Attempts to disrupt, overload, bypass, or exploit the service.</li>
            <li>Using generated material as false evidence of a real event or transaction.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">
            Your files and content
          </h2>
          <p>
            You are responsible for having the rights and permission needed for
            files, text, images, or other content you process through the
            service. You are also responsible for reviewing generated output
            before relying on or sharing it.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">
            No warranties
          </h2>
          <p>
            QuicTools is provided on an &quot;as is&quot; and &quot;as
            available&quot; basis. We work to make the tools useful and
            accurate, but we do not guarantee that every result is complete,
            error-free, or suitable for a particular legal, financial,
            professional, or technical purpose.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">
            Limitation of liability
          </h2>
          <p>
            To the extent permitted by applicable law, QuicTools is not liable
            for indirect, incidental, consequential, or special losses arising
            from use of the site or reliance on generated output.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">Changes</h2>
          <p>
            These terms may be updated when the service changes. The revision
            date above will be updated when material changes are published.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">Contact</h2>
          <p>
            Questions about these terms can be sent to{" "}
            <a
              href="mailto:quictools.cc@gmail.com"
              className="font-medium text-accent-600 hover:underline"
            >
              quictools.cc@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
