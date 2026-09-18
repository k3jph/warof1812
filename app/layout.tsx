import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://war-of-1812-whole-story.k3jph.chatgpt.site"),
  title: { default: "1812: The Whole Story", template: "%s · 1812: The Whole Story" },
  description: "A narrative-first, citation-rich public history of the War of 1812—from the Atlantic crisis to Ghent, New Orleans, and the unequal peace.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SiteHeader />{children}<SiteFooter /></body></html>;
}

