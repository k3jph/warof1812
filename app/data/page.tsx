import type { Metadata } from "next";
import { events, sources } from "@/lib/content";
import { people } from "@/lib/catalog";
import { imageLedger } from "@/lib/images";
import { gisFeatures } from "@/lib/historical-gis";

export const metadata: Metadata = { title: "Open Data", description: "Download the public event, timeline, people, and source records behind 1812: The Whole Story." };

const downloads = [
  { href: "/data/events.json", title: "Events", count: events.length, description: "Dated public event records with theater, type, chapter, summary, and source references." },
  { href: "/data/events.geojson", title: "Event GeoJSON", count: events.length, description: "Point features with latitude, longitude, coordinate precision, participants, outcomes, and sources." },
  { href: "/data/historical-gis.geojson", title: "Historical GIS", count: gisFeatures.length, description: "Dated campaign lines, operational zones, homeland regions, freedom-seeking routes, logistics, historical geography, and surviving-site points, with uncertainty and provenance." },
  { href: "/data/timeline.json", title: "Timeline", count: events.length, description: "The event corpus in narrative chronology for timelines and teaching tools." },
  { href: "/data/people.json", title: "People", count: people.length, description: "Twenty-four curated dossiers plus a separately labeled research index with group-level source routes." },
  { href: "/data/sources.json", title: "Sources", count: sources.length, description: "The source registry plus the categories used in the research guide." },
  { href: "/data/images.json", title: "Image rights", count: imageLedger.length, description: "Item-level creator, repository, credit, rights, caption, and alt-text metadata." },
];

export default function DataPage() {
  return <main id="main" className="page-shell data-page">
    <header className="page-title"><p className="section-kicker">A reusable public-history corpus</p><h1>Open data</h1><p>Download the structured public records behind the narrative. The files are plain JSON, designed for research, teaching, prototyping, and inspection.</p></header>
    <section className="data-grid" aria-label="Available data downloads">{downloads.map((item) => <article key={item.href}><p>{item.count} records</p><h2>{item.title}</h2><p>{item.description}</p><a href={item.href} download>Download {item.href.endsWith("geojson") ? "GeoJSON" : "JSON"} ↓</a></article>)}</section>
    <aside className="data-note"><p className="section-kicker">Method before format</p><h2>Coordinates with declared precision</h2><p>Every event now carries latitude, longitude, and a <code>site</code>, <code>city</code>, or <code>regional</code> precision label. Ocean actions and theater-wide events intentionally use broad points. The data locates events; it does not imply an exact ship position or reconstruct a route.</p></aside>
    <section className="data-schema"><h2>What travels with each record</h2><p>Stable IDs, public summaries, internal paths, and source references remain attached wherever they exist. Private editorial notes and working metadata are not published. Source URLs belong to their institutions and may change; the research guide explains access and rights limits.</p><p>Suggested citation: <cite>“1812: The Whole Story,” public data export, accessed [date].</cite></p></section>
  </main>;
}
