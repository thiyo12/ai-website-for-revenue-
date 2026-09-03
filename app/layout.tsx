import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdSlot from "@/components/AdSlot";
import { GSC_VERIFICATION, BING_VERIFICATION, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import { PUBLIC_ENV } from "@/lib/env.public";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} - Free Online Tools, Private & Browser-Based`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "quicktools",
    "quictools",
    "free online tools",
    "image compressor",
    "pdf merger",
    "qr code generator",
    "youtube video downloader",
    "facebook video downloader",
    "tiktok video downloader",
    "word counter",
    "unit converter",
    "online calculator",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  openGraph: {
    title: `${SITE_NAME} - Free Online Tools, Private & Browser-Based`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} - Free Online Tools, Private & Browser-Based`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  applicationName: SITE_NAME,
  formatDetection: { email: false, telephone: false, address: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      inLanguage: "en",
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/icon.svg`,
        },
      },
    },
    {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/icon.svg`,
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ============================================================
          GOOGLE SEARCH CONSOLE VERIFICATION
          Set NEXT_PUBLIC_GSC_VERIFICATION in your env (e.g. .env.local)
          to your GSC html meta tag content value. Empty = tag omitted.
          ============================================================ */}
        {GSC_VERIFICATION ? (
          <meta name="google-site-verification" content={GSC_VERIFICATION} />
        ) : null}

        {BING_VERIFICATION ? (
          <meta name="msvalidate.01" content={BING_VERIFICATION} />
        ) : null}

        {/* ============================================================
          GOOGLE ADSENSE - PLACEHOLDER
          Replace ca-pub-XXXXXXXXXXXXXXXX / data-ad-slot values with your
          own publisher ID and slots, uncomment this block, and rebuild.
          ============================================================ */}
        {/* <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
        /> */}

        {/* GOOGLE ANALYTICS 4 (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-9TN9YGWPW2"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-9TN9YGWPW2');`,
          }}
        />

        {/* GOOGLE ADSENSE - loaded from env when NEXT_PUBLIC_ADSENSE_ID is set */}
        {PUBLIC_ENV.ADSENSE_ID ? (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${PUBLIC_ENV.ADSENSE_ID}`}
            crossOrigin="anonymous"
          />
        ) : null}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <Header />

        {/* Ad slot below the header, present on every page */}
        <AdSlot label="header" />

        <main className="flex-1">{children}</main>

        <Footer />
      </body>
    </html>
  );
}