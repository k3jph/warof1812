import type { Metadata } from "next";
import { events, sources } from "@/lib/content";
import { people } from "@/lib/catalog";

export const metadata: Metadata = { title: "Open Data", description: "Download the public event, timeline, people, and source records behind 1812: The Whole Story." };

const downloads = [
  { href: "/data/events.json", title: "Events", count: events.length, description: "Dated public event records with theater, type, chapter, summary, and source references." },
  { href: "/data/timeline.json", title: "Timeline", count: events.length, description: "The event corpus in narrative chronology for timelines and teaching tools." },
  { href: "/data/people.json", title: "People", count: people.length, description: "Public biographical records with roles, significance, evidence labels, chapters, and sources." },
  { href: "/data/sources.json", title: "Sources", count: sources.length, description: "The source registry plus the categories used in the research guide." },
];

export default function DataPage() {
  return <main id="main" className="page-shell data-page">
    <header className="page-title"><p className="section-kicker">A reusable public-history corpus</p><h1>Open data</h1><p>Download the structured public records behind the narrative. The files are plain JSON, designed for research, teaching, prototyping, and inspection.</p></header>
    <section className="data-grid" aria-label="Available data downloads">{downloads.map((item) => <article key={item.href}><p>{item.count} records</p><h2>{item.title}</h2><p>{item.description}</p><a href={item.href} download>Download JSON ↓</a></article>)}</section>
    <aside className="data-note"><p className="section-kicker">Method before format</p><h2>No false precision</h2><p>The interactive map uses hand-tuned display positions to tell a strategic story. Those <code>x</code>/<code>y</code> values are not latitude and longitude, so they are intentionally excluded from the exports. A GeoJSON file will be published only when each location has verified geographic coordinates and a stated precision.</p></aside>
    <section className="data-schema"><h2>What travels with each record</h2><p>Stable IDs, public summaries, internal paths, and source references remain attached wherever they exist. Private editorial notes and working metadata are not published. Source URLs belong to their institutions and may change; the research guide explains access and rights limits.</p><p>Suggested citation: <cite>“1812: The Whole Story,” public data export, accessed [date].</cite></p></section>
  </main>;
}
