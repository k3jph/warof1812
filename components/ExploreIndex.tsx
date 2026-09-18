"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { CatalogRecord } from "@/lib/catalog";
import type { EventRecord } from "@/lib/content";

type ExploreRecord = { key: string; title: string; category: string; eyebrow: string; summary: string; href: string };

export function ExploreIndex({ events, catalog }: { events: EventRecord[]; catalog: CatalogRecord[] }) {
  const records: ExploreRecord[] = useMemo(() => [
    ...events.map((event) => ({ key: `event-${event.id}`, title: event.title, category: "Events", eyebrow: `${event.date} · ${event.place}`, summary: event.summary, href: `/events/${event.id}` })),
    ...catalog.map((record) => ({ key: `${record.kind}-${record.slug}`, title: record.name, category: record.kind[0].toUpperCase() + record.kind.slice(1), eyebrow: record.eyebrow, summary: record.summary, href: `/${record.kind}/${record.slug}` })),
  ], [events, catalog]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categories = ["All", ...Array.from(new Set(records.map((record) => record.category)))];
  const visible = records.filter((record) => (category === "All" || record.category === category) && `${record.title} ${record.eyebrow} ${record.summary}`.toLowerCase().includes(query.toLowerCase()));
  return (
    <div>
      <div className="explore-controls">
        <label><span>Search every collection</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try Baltimore, Tecumseh, flag…" /></label>
        <label><span>Collection</span><select value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
      </div>
      <p className="result-count">{visible.length} records</p>
      <div className="catalog-grid compact">
        {visible.map((record) => <article key={record.key}><p className="catalog-label">{record.category} · {record.eyebrow}</p><h2><Link href={record.href}>{record.title}</Link></h2><p>{record.summary}</p><Link className="catalog-link" href={record.href}>Open record →</Link></article>)}
      </div>
      {visible.length === 0 && <p className="empty-state">No records match that search.</p>}
    </div>
  );
}
