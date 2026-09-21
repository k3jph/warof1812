import type { MetadataRoute } from "next";
import { SITE_ORIGIN } from "@/lib/metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/data/events.json",
        "/data/events.geojson",
        "/data/historical-gis.geojson",
        "/data/images.json",
        "/data/people.json",
        "/data/sources.json",
        "/data/timeline.json",
      ],
    },
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
    host: SITE_ORIGIN,
  };
}
