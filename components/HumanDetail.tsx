import Link from "@/components/SafeLink";
import { SourceList } from "@/components/SourceList";
import type { CatalogRecord } from "@/lib/catalog";
import type { HumanRecord } from "@/lib/human-record";

export function HumanDetail({ record, human }: { record: CatalogRecord; human?: HumanRecord }) {
  const confidence = human?.identityConfidence ?? record.evidence ?? "Documented";
  return <main id="main" className="human-detail-page">
    <header className="human-detail-hero"><div><p className="section-kicker">Human record</p><span>{human?.group ?? record.eyebrow}</span><h1>{record.name}</h1>{record.dates && <p>{record.dates}</p>}<strong>{record.role}</strong></div><aside><span>Identity confidence</span><b>{confidence}</b><p>{human?.confidenceNote ?? "This is a biographical dossier with a named source route. Individual claims remain limited to the evidence cited below."}</p></aside></header>
    <section className="human-detail-core"><div><p>{record.summary}</p><h2>Why this record matters</h2><p>{record.significance}</p></div><aside><p className="section-kicker">Why is this person in the archive?</p><p>{human?.archiveReason ?? record.significance}</p></aside></section>
    <section className="human-evidence-grid"><article><span>Unit or working network</span><h2>{human?.unit ?? record.eyebrow}</h2></article><article><span>Allegiance record</span><h2>{human?.allegiances.join(" → ") ?? "See cited individual record"}</h2></article><article><span>Connected events</span><h2>{human?.events.join(" · ") ?? "See connected story and sources"}</h2></article></section>
    <section className="human-movement"><header><p className="section-kicker">Geographic movement</p><h2>Places attached to this identity</h2><p>For index records, locations are research routes for the record group, not proof of a personal journey. The distinction is shown on every entry.</p></header><div>{(human?.movements ?? [{date:"Connected narrative",place:"See story",note:"This dossier has not yet been converted into a movement sequence."}]).map((item,index)=><article key={`${item.place}-${index}`}><span>{String(index+1).padStart(2,"0")}</span><time>{item.date}</time><h3>{item.place}</h3><p>{item.note}</p></article>)}</div></section>
    <div className="human-detail-actions"><Link className="primary-action" href={`/story/${record.chapter}`}>Read the connected story <span>→</span></Link><Link href="/people">Back to the human record</Link></div>
    <div className="human-detail-sources"><SourceList ids={record.sourceRefs} heading="Evidence routes for this identity" /></div>
  </main>;
}
