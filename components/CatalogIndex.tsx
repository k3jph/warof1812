"use client";

import Link from "@/components/SafeLink";
import { useMemo, useState } from "react";
import type { CatalogKind, CatalogRecord } from "@/lib/catalog";

const labels: Record<CatalogKind, string> = {
  people: "People",
  places: "Places",
  ships: "Ships",
  documents: "Documents",
  objects: "Objects",
};

export function CatalogIndex({ records, fixedKind }: { records: CatalogRecord[]; fixedKind?: CatalogKind }) {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<CatalogKind | "all">(fixedKind ?? "all");
  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return records.filter((record) => {
      const matchesKind = kind === "all" || record.kind === kind;
      const haystack = `${record.name} ${record.eyebrow} ${record.role} ${record.summary} ${record.significance}`.toLowerCase();
      return matchesKind && (!needle || haystack.includes(needle));
    });
  }, [records, query, kind]);

  return (
    <div>
      <div className="explore-controls">
        <label>
          <span>Search this collection</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try Tecumseh, treaty, frigate…" />
        </label>
        {!fixedKind && (
          <label>
            <span>Collection</span>
            <select value={kind} onChange={(event) => setKind(event.target.value as CatalogKind | "all")}>
              <option value="all">All collections</option>
              {(Object.keys(labels) as CatalogKind[]).map((item) => <option value={item} key={item}>{labels[item]}</option>)}
            </select>
          </label>
        )}
      </div>
      <p className="result-count">{visible.length} {visible.length === 1 ? "record" : "records"}</p>
      <div className="catalog-grid">
        {visible.map((record) => (
          <article key={`${record.kind}-${record.slug}`}>
            <p className="catalog-label">{labels[record.kind]} · {record.eyebrow}</p>
            <h2><Link href={`/${record.kind}/${record.slug}`}>{record.name}</Link></h2>
            <p className="catalog-role">{record.role}</p>
            <p>{record.summary}</p>
            <Link className="catalog-link" href={`/${record.kind}/${record.slug}`}>Open record →</Link>
          </article>
        ))}
      </div>
      {visible.length === 0 && <p className="empty-state">No records match that search. Try a broader term or another collection.</p>}
    </div>
  );
}

