import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "QuicTools privacy policy: all tools process data entirely in your browser — files and text never leave your device. Details about advertising cookies included.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>

      <div className="mt-6 space-y-6 text-[15px] leading-relaxed text-gray-600">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">
            Client-side-only processing
          </h2>
          <p>
            All tools on QuicTools are designed to run{" "}
            <strong>entirely in your browser</strong>. Images, PDFs, QR code
            content, written text, and conversion values are processed locally
            on your device using JavaScript. Nothing you upload, paste, or type
            into a tool is ever transmitted to our servers, stored, logged, or
            shared with any third party. This is why we can say with
            confidence: files never leave your browser.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">
            Usage limits
          </h2>
          <p>
            To keep the site free for everyone, the free plan allows a limited
            number of tool uses per day. To enforce this limit we record a
            lightweight, non-identifying usage event for each free use — based
            on your IP address and an anonymized device fingerprint hash. This
            data contains no file, text, or conversion content and is used only
            to count your daily usage and prevent abuse. It is never sold or
            shared with third parties.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">
            Licenses and unlock
          </h2>
          <p>
            When you purchase a license, your license key is stored so we can
            verify and renew it. After a successful purchase we set a secure
            cookie on your device that lets us recognize you as an unlocked
            user so you are not prompted to pay again. License details are
            handled by our payment processor and are never used for anything
            other than granting access.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">Advertising</h2>
          <p>
            QuicTools may display advertisements served by Google AdSense and
            its partners. Advertising networks such as Google may use cookies
            and similar technologies to serve and personalize ads based on your
            prior visits to this and other websites.
          </p>
          <p className="mt-2">
            To support the delivery of relevant ads, Google uses advertising
            cookies to build a profile of your interests. You can opt out of
            personalized advertising by visiting{" "}
            <a
              href="https://www.google.com/settings/ads"
              rel="noopener noreferrer"
              target="_blank"
              className="font-medium text-accent-600 hover:underline"
            >
              Google&apos;s Ads Settings
            </a>
            , or by visiting{" "}
            <a
              href="https://www.aboutads.info"
              rel="noopener noreferrer"
              target="_blank"
              className="font-medium text-accent-600 hover:underline"
            >
              www.aboutads.info
            </a>{" "}
            to opt out of third-party vendor cookie use.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">Cookies</h2>
          <p>
            QuicTools sets a small cookie only to remember your unlock/license
            status so you are not asked to pay again on repeat visits. This
            cookie does not contain personal information and does not track
            your activity. Additionally, advertising partners may set their own
            cookies to measure ad performance and personalize ads, as described
            above. You can control or delete cookies through your browser
            settings at any time.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">
            Currency converter
          </h2>
          <p>
            The currency converter fetches current exchange rates from a public
            rates API through our server. No personal data or amount you enter
            is transmitted — only a general request for the latest rates.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">
            Analytics and logs
          </h2>
          <p>
            We may use privacy-friendly, aggregated analytics to understand how
            many people visit the site and which tools are popular. This
            information does not identify you personally and does not include
            any file or text content processed by our tools.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">Contact</h2>
          <p>
            If you have any questions about this privacy policy or how your
            data is handled, contact us at{" "}
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