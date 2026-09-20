"use client";

import { useMemo, useState } from "react";
import Link from "@/components/SafeLink";
import type { CatalogRecord } from "@/lib/catalog";
import { curatedRelationships, type HumanRecord } from "@/lib/human-record";

const allLabel = "All record groups";
const pageSize = 48;
export function HumanRecordIndex({ records, human }: { records: CatalogRecord[]; human: HumanRecord[] }) {
  const metadata = useMemo(() => Object.fromEntries(human.map((record) => [record.slug, record])), [human]);
  const groups = useMemo(() => [...new Set(records.map((record) => metadata[record.slug]?.group ?? record.eyebrow))].sort(), [records, metadata]);
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState(allLabel);
  const [recordDepth, setRecordDepth] = useState("All record types");
  const [page, setPage] = useState(1);
  const [selectedSlug, setSelectedSlug] = useState(records[0]?.slug ?? "");
  const visible = useMemo(() => records.filter((record) => {
    const meta = metadata[record.slug];
    const recordGroup = meta?.group ?? record.eyebrow;
    const depthLabel = record.recordDepth === "index" ? "Research index" : "Curated dossiers";
    const haystack = `${record.name} ${record.aliases?.join(" ") ?? ""} ${record.role} ${record.summary} ${recordGroup}`.toLowerCase();
    return (group === allLabel || recordGroup === group) && (recordDepth === "All record types" || depthLabel === recordDepth) && (!query.trim() || haystack.includes(query.trim().toLowerCase()));
  }), [records, metadata, group, recordDepth, query]);
  const pageCount = Math.max(1, Math.ceil(visible.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const pageRecords = visible.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const selected = pageRecords.find((record) => record.slug === selectedSlug) ?? pageRecords[0] ?? records.find((record) => record.slug === selectedSlug) ?? records[0];
  const selectedMeta = metadata[selected?.slug];
  const selectedGroup = selectedMeta?.group ?? selected?.eyebrow;
  const relations = (selected?.recordDepth === "dossier" ? curatedRelationships[selected.slug] ?? [] : []).map((relationship) => {
    const record = records.find((item) => item.slug === relationship.target);
    return record ? { record, label:relationship.label } : undefined;
  }).filter((item): item is { record:CatalogRecord; label:string } => Boolean(item)).slice(0,6);
  const archiveCounts = useMemo(() => groups.map((name) => ({ name, count:records.filter((record)=>(metadata[record.slug]?.group ?? record.eyebrow)===name).length })).sort((a,b)=>b.count-a.count), [groups, records, metadata]);
  const updateQuery = (value: string) => { setQuery(value); setPage(1); };
  const updateGroup = (value: string) => { setGroup(value); setPage(1); };
  const updateDepth = (value: string) => { setRecordDepth(value); setPage(1); };
  const firstVisible = visible.length ? (currentPage - 1) * pageSize + 1 : 0;
  const lastVisible = Math.min(currentPage * pageSize, visible.length);

  return <div className="human-workbench">
    <section className="human-controls">
      <label><span>Search names and research groups</span><input value={query} onChange={(event)=>updateQuery(event.target.value)} placeholder="Try privateer, Muscogee, printer…" /></label>
      <label><span>Record group</span><select value={group} onChange={(event)=>updateGroup(event.target.value)}><option>{allLabel}</option>{groups.map((item)=><option key={item}>{item}</option>)}</select></label>
      <label><span>Record type</span><select value={recordDepth} onChange={(event)=>updateDepth(event.target.value)}><option>All record types</option><option>Curated dossiers</option><option>Research index</option></select></label>
      <div className="human-count"><b>{visible.length}</b><span>matches in {records.length} named records</span></div>
    </section>

    <div className="human-main">
      <section className="human-list" aria-label="Named people">
        {pageRecords.map((record) => { const meta=metadata[record.slug]; return <button className={record.slug===selected?.slug ? "active" : ""} onClick={()=>setSelectedSlug(record.slug)} key={record.slug}><span>{record.name.slice(0,1)}</span><div><strong>{record.name}</strong><small>{meta?.group ?? record.eyebrow}</small></div><b>{record.recordDepth === "index" ? "INDEX" : "DOSSIER"}</b></button>; })}
        {!visible.length && <p className="human-list-limit">No record matches all three filters.</p>}
        {visible.length > pageSize && <nav className="record-pagination" aria-label="People results pages"><button disabled={currentPage === 1} onClick={()=>setPage(currentPage - 1)}>Previous</button><span>{firstVisible}–{lastVisible} of {visible.length}</span><button disabled={currentPage === pageCount} onClick={()=>setPage(currentPage + 1)}>Next</button></nav>}
      </section>
      {selected && <aside className="human-inspector">
        <header><p className="section-kicker">Selected person</p><span>{selected.recordDepth === "index" ? "Research-index entry" : "Curated dossier"}</span><h2>{selected.name}</h2><p>{selected.role}</p></header>
        <div className="human-why"><span>{selected.recordDepth === "index" ? "What this entry means" : "Why this record matters"}</span><p>{selected.recordDepth === "index" ? selectedMeta?.scopeNote : selected.significance}</p></div>
        <dl><div><dt>Record group</dt><dd>{selectedGroup}</dd></div>{selected.recordDepth === "index" ? <><div><dt>Aliases merged</dt><dd>{selected.aliases?.length ? selected.aliases.join(" · ") : "None recorded"}</dd></div><div><dt>Source level</dt><dd>Group-level research routes only</dd></div></> : <><div><dt>Dates</dt><dd>{selected.dates ?? "Not established"}</dd></div><div><dt>Connected chapter</dt><dd>{selected.chapter ? "Person-specific narrative connection" : "No chapter assigned"}</dd></div></>}</dl>
        <Link className="human-open" href={`/people/${selected.slug}`}>Open full human record <span>→</span></Link>
      </aside>}
    </div>

    {selected && relations.length > 0 && <section className="relationship-graph"><header><div><p className="section-kicker">Relationship graph</p><h2>Named ties in the record</h2></div><p>These edges name a curated family, working, command, political, or adversarial connection. Shared index-group membership never creates an edge.</p></header><div className="network-plot"><div className="network-center"><span>{selected.name.slice(0,1)}</span><strong>{selected.name}</strong></div>{relations.map(({record,label},index)=><Link href={`/people/${record.slug}`} className={`network-node node-${index+1}`} key={record.slug}><span>{record.name.slice(0,1)}</span><strong>{record.name}</strong><small>{label}</small></Link>)}</div></section>}

    <section className="archive-visibility"><header><p className="section-kicker">Index composition</p><h2>The collection is not the population.</h2><p>These counts describe how names are organized for research in this edition. They do not measure historical participation, importance, survival in the archive, or confidence in an identity.</p></header><div>{archiveCounts.map((item)=><article key={item.name}><span>{item.name}</span><i><b style={{width:`${item.count/archiveCounts[0].count*100}%`}} /></i><strong>{item.count}</strong></article>)}</div></section>
  </div>;
}
