import Link from "@/components/SafeLink";
import { SourceList } from "@/components/SourceList";
import type { CatalogRecord } from "@/lib/catalog";
import type { HumanRecord } from "@/lib/human-record";

export function HumanDetail({ record, human }: { record: CatalogRecord; human?: HumanRecord }) {
  const isIndex = record.recordDepth === "index";
  return <main id="main" className="human-detail-page">
    <header className="human-detail-hero">
      <div><p className="section-kicker">{isIndex ? "People research index" : "Curated person dossier"}</p><span>{human?.group ?? record.eyebrow}</span><h1>{record.name}</h1>{record.dates && <p>{record.dates}</p>}<strong>{record.role}</strong></div>
      <aside><span>Record depth</span><b>{isIndex ? "Research lead" : "Curated dossier"}</b><p>{isIndex ? "This entry preserves a name and group-level research routes. It does not claim person-specific movements, allegiance, events, relationships, or biographical facts." : "This dossier contains person-specific biographical claims and source routes selected for this edition."}</p></aside>
    </header>
    <section className="human-detail-core"><div><p>{record.summary}</p><h2>{isIndex ? "What this entry establishes" : "Why this record matters"}</h2><p>{record.significance}</p></div><aside><p className="section-kicker">{isIndex ? "Scope limit" : "Editorial status"}</p><p>{isIndex ? human?.scopeNote : "The dates, role, narrative connection, and source routes on this page belong to this person. Broader claims remain limited to the cited evidence."}</p></aside></section>
    {record.chapter ? <div className="human-detail-actions"><Link className="primary-action" href={`/story/${record.chapter}`}>Read the connected story <span>→</span></Link><Link href="/people">Back to the people collection</Link></div> : <div className="human-detail-actions"><Link href="/people">Back to the people collection</Link></div>}
    <div className="human-detail-sources"><SourceList ids={record.sourceRefs} heading={isIndex ? "Group-level research routes" : "Sources for this dossier"} />{isIndex && <p className="human-source-caveat">These sources describe the research group or collection route. They are not represented as citations for a completed biography of this person.</p>}</div>
  </main>;
}
