import type { Metadata, Viewport } from "next";
// Self-hosted variable fonts: no build-time call to Google Fonts, no runtime third-party request.
import "@fontsource-variable/plus-jakarta-sans";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";

const SITE = "https://www.vovix.in";
const TITLE = "VOVIX | IT Automation, AI Document Processing & Data Engineering";
const DESC =
  "VOVIX Private Limited engineers business process automation, AI document processing, data pipelines and API integrations — and runs its own products: VOVIX Lens, OneView and Edge.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: TITLE, template: "%s | VOVIX" },
  description: DESC,
  applicationName: "VOVIX",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "VOVIX",
    url: SITE,
    title: TITLE,
    description: DESC,
    locale: "en_IN",
    images: [{ url: "/assets/og-image.png", width: 1200, height: 630, alt: "VOVIX — Automate Your Alpha" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: ["/assets/og-image.png"] },
  icons: {
    icon: [
      { url: "/assets/favicon.svg", type: "image/svg+xml" },
      { url: "/assets/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/assets/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = { themeColor: "#FFFFFF", width: "device-width", initialScale: 1 };

const orgLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE}/#organization`,
  name: "VOVIX Private Limited",
  legalName: "Vovix Private Limited",
  alternateName: ["Vovix", "VOVIX"],
  slogan: "Automate Your Alpha",
  url: `${SITE}/`,
  logo: `${SITE}/assets/logo-512.png`,
  email: "admin@vovix.in",
  telephone: "+91-90806-40562",
  description:
    "IT automation and AI engineering: business process automation, AI document processing, data pipelines, API integration and white-label engineering. Products: VOVIX Lens, VOVIX OneView, VOVIX Edge.",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "S. No 61/8a, Door No: S8, 'B' Block, 2nd Floor, Thanigaivel Flats, Sirpi Nagar, Guduvancheri",
    addressLocality: "Guduvancheri",
    addressRegion: "Tamil Nadu",
    postalCode: "603202",
    addressCountry: "IN",
  },
  foundingDate: "2026",
  areaServed: "Worldwide",
  knowsAbout: [
    "Business process automation", "AI document processing", "Document intelligence", "OCR",
    "TallyPrime integration", "Data engineering", "Data pipelines", "API integration",
    "Workflow automation", "White-label software engineering", "MetaTrader 5 integration",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" style={{ ["--font-sans" as string]: "'Plus Jakarta Sans Variable'", ["--font-mono" as string]: "'JetBrains Mono Variable'" }}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-control focus:bg-navy focus:px-4 focus:py-2 focus:text-white">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
