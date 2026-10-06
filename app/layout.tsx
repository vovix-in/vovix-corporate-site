import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

const SITE = "https://www.vovix.in";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "Vovix | Enterprise Platforms & Automation Engineering",
  description:
    "Vovix builds enterprise web platforms, SaaS dashboards and automation pipelines — and runs three products of its own: Vovix Lens, Edge and OneView.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Vovix",
    url: SITE,
    title: "Vovix | Enterprise Platforms & Automation Engineering",
    description:
      "Custom web platforms, SaaS dashboards and automation pipelines. The same engineering runs Vovix Lens, Edge and OneView in production.",
    images: [{ url: "/assets/og-image.png", width: 1200, height: 630, alt: "Vovix Private Limited" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vovix | Enterprise Platforms & Automation Engineering",
    images: ["/assets/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/assets/favicon.svg", type: "image/svg+xml" },
      { url: "/assets/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/assets/apple-touch-icon.png", sizes: "180x180" }],
  },
};

const orgLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE}/#organization`,
  name: "Vovix Private Limited",
  legalName: "Vovix Private Limited",
  alternateName: ["Vovix", "VOVIX"],
  url: `${SITE}/`,
  logo: `${SITE}/assets/favicon.svg`,
  email: "admin@vovix.in",
  description:
    "Enterprise software engineering: custom web platforms, SaaS dashboards, automation pipelines and ERP integration. Products: Vovix Lens, Vovix OneView, Vovix Edge.",
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
    "Web platform engineering", "SaaS development", "Next.js", "Business process automation",
    "Document data extraction", "TallyPrime integration", "ERP integration", "Data pipelines",
    "API integration", "Internal dashboards", "Design systems",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <head>
        <meta name="theme-color" content="#FFFFFF" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-control focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
