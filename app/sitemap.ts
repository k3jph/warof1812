import type { MetadataRoute } from "next";
import { documents, objects, people, places, ships } from "@/lib/catalog";
import { chapters, events } from "@/lib/content";
import { documentaryPackets } from "@/lib/documentary";
import { evidenceClaims } from "@/lib/evidence-lab";
import { SITE_ORIGIN } from "@/lib/metadata";
import { perspectives } from "@/lib/perspectives";

const staticRoutes = [
  "/",
  "/about",
  "/backyard",
  "/baltimore",
  "/blockade-lab",
  "/courier",
  "/data",
  "/documents",
  "/edition",
  "/events",
  "/evidence",
  "/explore",
  "/five-minutes",
  "/interactives",
  "/lake-logistics",
  "/map",
  "/maryland",
  "/objects",
  "/people",
  "/perspectives",
  "/places",
  "/privacy",
  "/ships",
  "/sources",
  "/story",
  "/timeline",
  "/twenty-minutes",
  "/war-clock",
];

const canonicalRoutes = [
  ...staticRoutes,
  ...chapters.map((chapter) => `/story/${chapter.slug}`),
  ...events.map((event) => `/events/${event.id}`),
  ...people.map((record) => `/people/${record.slug}`),
  ...places.map((record) => `/places/${record.slug}`),
  ...ships.map((record) => `/ships/${record.slug}`),
  ...documents.map((record) => `/documents/${record.slug}`),
  ...objects.map((record) => `/objects/${record.slug}`),
  ...documentaryPackets.map((packet) => `/edition/${packet.slug}`),
  ...evidenceClaims.map((claim) => `/evidence/${claim.slug}`),
  ...perspectives.map((path) => `/perspectives/${path.slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return Array.from(new Set(canonicalRoutes)).map((path) => ({
    url: new URL(path, SITE_ORIGIN).toString(),
  }));
}
