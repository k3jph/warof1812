import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://war1812.jameshoward.us"),
  title: { default: "1812: The Whole Story", template: "%s · 1812: The Whole Story" },
  description: "A narrative-first, citation-rich public history of the War of 1812, from the Atlantic crisis to Ghent, New Orleans, and the unequal peace.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", siteName: "1812: The Whole Story", title: "1812: The Whole Story", description: "A narrative-first, citation-rich public history of the War of 1812." },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = { "@context": "https://schema.org", "@type": "WebSite", name: "1812: The Whole Story", url: "https://war1812.jameshoward.us", description: "A narrative-first, citation-rich public history of the War of 1812." };
  return <html lang="en"><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /><SiteHeader />{children}<SiteFooter /></body></html>;
}
