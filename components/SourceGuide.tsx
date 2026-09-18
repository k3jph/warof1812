"use client";

import { useMemo, useState } from "react";
import type { Source } from "@/lib/content";
import type { SourceGroup } from "@/lib/source-guide";

export function SourceGuide({ sources, groups }: { sources: Source[]; groups: SourceGroup[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const byId = useMemo(() => Object.fromEntries(sources.map((source) => [source.id, source])), [sources]);
  const normalizedQuery = query.trim().toLowerCase();

  const visible = groups
    .filter((group) => category === "all" || group.id === category)
    .map((group) => ({
      ...group,
      records: group.sourceIds
        .map((id) => byId[id])
        .filter((source): source is Source => Boolean(source))
        .filter((source) => !normalizedQuery || `${source.title} ${source.institution} ${source.type} ${source.note} ${group.title}`.toLowerCase().includes(normalizedQuery)),
    }))
    .filter((group) => group.records.length > 0);

  const resultCount = new Set(visible.flatMap((group) => group.records.map((source) => source.id))).size;

  return (
    <div className="source-guide">
      <div className="source-controls">
        <label><span>Search the guide</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try “newspapers,” “Black history,” or an institution" /></label>
        <label><span>Category</span><select value={category} onChange={(event) => setCategory(event.target.value)}><option value="all">All categories</option>{groups.map((group) => <option key={group.id} value={group.id}>{group.title}</option>)}</select></label>
      </div>
      <p className="result-count" aria-live="polite">{resultCount} distinct {resultCount === 1 ? "resource" : "resources"} across {visible.length} {visible.length === 1 ? "category" : "categories"}</p>
      {visible.length ? <div className="source-groups">{visible.map((group) => <section key={group.id} id={group.id}><header><p className="section-kicker">Research route</p><h2>{group.title}</h2><p>{group.description}</p></header><div>{group.records.map((source) => <article key={`${group.id}-${source.id}`}><p>{source.institution}</p><h3><a href={source.url} target="_blank" rel="noreferrer">{source.title} ↗</a></h3><span>{source.type}</span><p>{source.note}</p></article>)}</div></section>)}</div> : <div className="source-empty"><h2>No matching source yet</h2><p>Try a broader term or return to all categories. The guide will keep growing as the corpus grows.</p></div>}
    </div>
  );
}
