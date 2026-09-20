"use client";

import Link from "@/components/SafeLink";
import { useMemo, useState } from "react";
import type { CatalogRecord } from "@/lib/catalog";
import type { EventRecord } from "@/lib/content";

type ExploreRecord = { key: string; title: string; category: string; eyebrow: string; summary: string; href: string };
const pageSize = 48;

export function ExploreIndex({ events, catalog }: { events: EventRecord[]; catalog: CatalogRecord[] }) {
  const records: ExploreRecord[] = useMemo(() => [
    ...events.map((event) => ({ key: `event-${event.id}`, title: event.title, category: "Events", eyebrow: `${event.date} · ${event.place}`, summary: event.summary, href: `/events/${event.id}` })),
    ...catalog.map((record) => ({ key: `${record.kind}-${record.slug}`, title: record.name, category: record.kind[0].toUpperCase() + record.kind.slice(1), eyebrow: record.eyebrow, summary: record.summary, href: `/${record.kind}/${record.slug}` })),
  ], [events, catalog]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const categories = ["All", ...Array.from(new Set(records.map((record) => record.category)))];
  const hasSelection = Boolean(query.trim()) || category !== "All";
  const visible = hasSelection ? records.filter((record) => (category === "All" || record.category === category) && `${record.title} ${record.eyebrow} ${record.summary}`.toLowerCase().includes(query.trim().toLowerCase())) : [];
  const pageCount = Math.max(1, Math.ceil(visible.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const pageRecords = visible.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const firstVisible = visible.length ? (currentPage - 1) * pageSize + 1 : 0;
  const lastVisible = Math.min(currentPage * pageSize, visible.length);
  return (
    <div>
      <div className="explore-controls">
        <label><span>Search every collection</span><input value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder="Try Baltimore, Tecumseh, flag…" /></label>
        <label><span>Collection</span><select value={category} onChange={(event) => { setCategory(event.target.value); setPage(1); }}>{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
      </div>
      {!hasSelection && <p className="empty-state">Choose a collection or enter a search term to browse the catalog. Results appear 48 at a time.</p>}
      {hasSelection && <p className="result-count">{visible.length} records</p>}
      {hasSelection && <div className="catalog-grid compact">
        {pageRecords.map((record) => <article key={record.key}><p className="catalog-label">{record.category} · {record.eyebrow}</p><h2><Link href={record.href}>{record.title}</Link></h2><p>{record.summary}</p><Link className="catalog-link" href={record.href}>Open record →</Link></article>)}
      </div>}
      {hasSelection && visible.length > pageSize && <nav className="record-pagination explore-pagination" aria-label="Explore results pages"><button disabled={currentPage === 1} onClick={()=>setPage(currentPage - 1)}>Previous</button><span>{firstVisible}–{lastVisible} of {visible.length}</span><button disabled={currentPage === pageCount} onClick={()=>setPage(currentPage + 1)}>Next</button></nav>}
      {hasSelection && visible.length === 0 && <p className="empty-state">No records match that search.</p>}
    </div>
  );
}
