import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/SiteHeader";
import { SITE_ORIGIN } from "@/lib/metadata";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: { default: "1812: The Whole Story", template: "%s · 1812: The Whole Story" },
  description: "A narrative-first, citation-rich public history of the War of 1812, from the Atlantic crisis to Ghent, New Orleans, and the unequal peace.",
  applicationName: "1812: The Whole Story",
  authors: [{ name: "James P. Howard, II", url: "https://jameshoward.us" }],
  creator: "James P. Howard, II",
  publisher: "James P. Howard, II",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon.ico", type: "image/x-icon", sizes: "16x16 32x32" },
    ],
    shortcut: [{ url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" }],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "1812: The Whole Story",
    url: SITE_ORIGIN,
    description: "A narrative-first, citation-rich public history of the War of 1812.",
    image: `${SITE_ORIGIN}/icon-512.png`,
    publisher: {
      "@type": "Person",
      name: "James P. Howard, II",
      url: "https://jameshoward.us",
      image: "https://jameshoward.us/assets/img/identity/jh-badge-1x1.svg",
    },
  };
  return <html lang="en"><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /><SiteHeader />{children}<SiteFooter /></body></html>;
}
