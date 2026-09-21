import type { Metadata } from "next";

export const SITE_ORIGIN = "https://war1812.jameshoward.us";
export const SITE_NAME = "1812: The Whole Story";

const socialImage = {
  url: "/og-icon.png",
  width: 1200,
  height: 630,
  alt: "Fort McHenry 15-star canton, the icon of 1812: The Whole Story",
};

const canonicalPath = (path: string) => path === "/" ? "/" : `/${path.replace(/^\/+|\/+$/g, "")}`;

export function pageMetadata(path: string, title: string, description: string, absoluteTitle = false): Metadata {
  const canonical = canonicalPath(path);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: SITE_NAME,
      title,
      description,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-icon.png"],
    },
  };
}
