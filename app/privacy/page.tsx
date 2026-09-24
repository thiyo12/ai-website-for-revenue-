import type { Metadata } from "next";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonical("/privacy"),
  title: "Privacy Policy",
  description:
    "How QuicTools handles browser-based processing, server-assisted features, analytics, advertising, cookies and consent.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-gray-500">
        Last updated: September 24, 2026
      </p>

      <div className="mt-6 space-y-6 text-[15px] leading-relaxed text-gray-600">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">
            How tool processing works
          </h2>
          <p>
            Many QuicTools utilities process files or input directly in your
            browser using JavaScript or WebAssembly. For those tools, the file
            does not need to be uploaded to QuicTools for the main processing
            step. Other features may use our server or a third-party service
            when network access, current data, or server-side processing is
            required.
          </p>
          <p className="mt-2">
            We aim to describe the processing method accurately on relevant
            tool pages. Do not assume that every tool has identical data flow.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">
            Server-assisted features and logs
          </h2>
          <p>
            When a feature communicates with our server, normal technical
            request information such as IP address, user agent, timestamps,
            request path, and security/rate-limit data may be processed in
            server or infrastructure logs. We do not intentionally use file or
            text content submitted to a tool for advertising profiles.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">
            Currency and other live-data tools
          </h2>
          <p>
            Features that need current information may request data from an
            external provider. For example, the currency converter obtains
            exchange-rate information from an online rates service. The exact
            amount you type does not need to be sent merely to obtain a general
            exchange-rate table.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">
            Analytics
          </h2>
          <p>
            QuicTools uses Google Analytics to understand traffic, page usage,
            device/browser information, and which parts of the site are useful.
            Analytics technologies may use cookies or similar identifiers,
            subject to applicable consent requirements and browser settings.
            Tool file contents are not intentionally sent to Google Analytics.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">
            Advertising
          </h2>
          <p>
            QuicTools may display advertising, including Google AdSense. Google
            and its advertising partners may use cookies or similar
            technologies for ad delivery, measurement, fraud prevention, and,
            where permitted and consented to, personalization.
          </p>
          <p className="mt-2">
            In regions where consent is required, QuicTools may present a
            consent message before advertising or analytics technologies use
            data for purposes that require consent. You can also manage
            advertising preferences through Google&apos;s advertising controls
            and your browser settings.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">
            Payments and future premium features
          </h2>
          <p>
            Core QuicTools access is currently free. Payment-related code may
            remain available for a future optional Pro offering. If a paid
            feature is introduced, the checkout provider will process payment
            information under its own privacy terms; QuicTools does not need to
            store full card details.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">
            Security and retention
          </h2>
          <p>
            We use reasonable technical measures to protect the site and limit
            unnecessary data collection. Operational logs and security data may
            be retained for legitimate operational, abuse-prevention, and
            troubleshooting purposes and then deleted or rotated according to
            infrastructure needs.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">Contact</h2>
          <p>
            Questions about this policy can be sent to{" "}
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
