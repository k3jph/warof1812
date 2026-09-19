"use client";

import { useMemo, useState } from "react";
import Link from "@/components/SafeLink";
import type { CatalogRecord } from "@/lib/catalog";
import type { HumanRecord } from "@/lib/human-record";

const allLabel = "All record groups";
export function HumanRecordIndex({ records, human }: { records: CatalogRecord[]; human: HumanRecord[] }) {
  const metadata = useMemo(() => Object.fromEntries(human.map((record) => [record.slug, record])), [human]);
  const groups = useMemo(() => [...new Set(records.map((record) => metadata[record.slug]?.group ?? record.eyebrow))].sort(), [records, metadata]);
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState(allLabel);
  const [confidence, setConfidence] = useState("All confidence levels");
  const [selectedSlug, setSelectedSlug] = useState(records[0]?.slug ?? "");
  const visible = useMemo(() => records.filter((record) => {
    const meta = metadata[record.slug];
    const recordGroup = meta?.group ?? record.eyebrow;
    const recordConfidence = meta?.identityConfidence ?? record.evidence ?? "Confirmed identity";
    const haystack = `${record.name} ${record.role} ${record.summary} ${recordGroup} ${meta?.places.join(" ") ?? ""} ${meta?.events.join(" ") ?? ""} ${meta?.unit ?? ""}`.toLowerCase();
    return (group === allLabel || recordGroup === group) && (confidence === "All confidence levels" || recordConfidence === confidence) && (!query.trim() || haystack.includes(query.trim().toLowerCase()));
  }), [records, metadata, group, confidence, query]);
  const selected = visible.find((record) => record.slug === selectedSlug) ?? visible[0] ?? records.find((record) => record.slug === selectedSlug) ?? records[0];
  const selectedMeta = metadata[selected?.slug];
  const selectedGroup = selectedMeta?.group ?? selected?.eyebrow;
  const relations = useMemo(() => {
    const explicit = (selectedMeta?.relationships ?? []).map((relationship) => {
      const record = records.find((item) => item.slug === relationship.target);
      return record ? { record, label:relationship.label } : undefined;
    }).filter((item): item is { record:CatalogRecord; label:string } => Boolean(item));
    if (explicit.length) return explicit.slice(0,6);
    return records.filter((record) => record.slug !== selected?.slug && (metadata[record.slug]?.group ?? record.eyebrow) === selectedGroup).slice(0,6).map((record) => ({ record, label:"shared record group" }));
  }, [records, metadata, selected, selectedGroup, selectedMeta]);
  const archiveCounts = useMemo(() => groups.map((name) => ({ name, count:records.filter((record)=>(metadata[record.slug]?.group ?? record.eyebrow)===name).length })).sort((a,b)=>b.count-a.count), [groups, records, metadata]);

  return <div className="human-workbench">
    <section className="human-controls">
      <label><span>Search names, units, places, events</span><input value={query} onChange={(event)=>setQuery(event.target.value)} placeholder="Try privateer, Ghent, Muscogee, printer…" /></label>
      <label><span>Record group</span><select value={group} onChange={(event)=>setGroup(event.target.value)}><option>{allLabel}</option>{groups.map((item)=><option key={item}>{item}</option>)}</select></label>
      <label><span>Identity confidence</span><select value={confidence} onChange={(event)=>setConfidence(event.target.value)}><option>All confidence levels</option><option>Confirmed identity</option><option>Strong match</option><option>Index-level match</option><option>Unresolved match</option><option>Documented</option><option>Strongly supported</option><option>Unresolved</option></select></label>
      <div className="human-count"><b>{visible.length}</b><span>visible of {records.length} named records</span></div>
    </section>

    <div className="human-main">
      <section className="human-list" aria-label="Named people">
        {visible.slice(0,240).map((record) => { const meta=metadata[record.slug]; return <button className={record.slug===selected?.slug ? "active" : ""} onClick={()=>setSelectedSlug(record.slug)} key={record.slug}><span>{record.name.slice(0,1)}</span><div><strong>{record.name}</strong><small>{meta?.group ?? record.eyebrow}</small></div><b>{meta?.identityConfidence === "Index-level match" ? "INDEX" : meta?.identityConfidence === "Strong match" ? "STRONG" : record.evidence ?? "DOSSIER"}</b></button>; })}
        {visible.length > 240 && <p className="human-list-limit">Showing the first 240 matches. Narrow the search to reach the remaining {visible.length - 240} records.</p>}
        {!visible.length && <p className="human-list-limit">No record matches all three filters.</p>}
      </section>
      {selected && <aside className="human-inspector">
        <header><p className="section-kicker">Selected human record</p><span>{selectedMeta?.identityConfidence ?? selected.evidence ?? "Documented"}</span><h2>{selected.name}</h2><p>{selected.role}</p></header>
        <div className="human-why"><span>Why is this person in the archive?</span><p>{selectedMeta?.archiveReason ?? selected.significance}</p></div>
        <dl><div><dt>Record group</dt><dd>{selectedGroup}</dd></div><div><dt>Unit / network</dt><dd>{selectedMeta?.unit ?? selected.eyebrow}</dd></div><div><dt>Places</dt><dd>{selectedMeta?.places.join(" · ") ?? "See connected narrative"}</dd></div><div><dt>Allegiance</dt><dd>{selectedMeta?.allegiances.join(" → ") ?? "See individual record"}</dd></div></dl>
        <Link className="human-open" href={`/people/${selected.slug}`}>Open full human record <span>→</span></Link>
      </aside>}
    </div>

    {selected && <section className="relationship-graph"><header><div><p className="section-kicker">Relationship graph</p><h2>{selectedMeta?.relationships.length ? "Named ties in the record" : "Shared archival context"}</h2></div><p>{selectedMeta?.relationships.length ? "These edges name a documented family, working, command, political, or adversarial connection. Their labels matter: relationship never implies agreement." : "Edges mean shared record group in this edition–not friendship, agreement, or direct contact. That distinction prevents a search result from becoming a false social network."}</p></header><div className="network-plot"><div className="network-center"><span>{selected.name.slice(0,1)}</span><strong>{selected.name}</strong></div>{relations.map(({record,label},index)=><Link href={`/people/${record.slug}`} className={`network-node node-${index+1}`} key={record.slug}><span>{record.name.slice(0,1)}</span><strong>{record.name}</strong><small>{label}</small></Link>)}</div></section>}

    <section className="archive-visibility"><header><p className="section-kicker">Archive visibility</p><h2>The collection is not the population.</h2><p>Record density measures what this edition can name and route to evidence. It also shows which institutions created the paper.</p></header><div>{archiveCounts.map((item)=><article key={item.name}><span>{item.name}</span><i><b style={{width:`${item.count/archiveCounts[0].count*100}%`}} /></i><strong>{item.count}</strong></article>)}</div></section>
  </div>;
}
