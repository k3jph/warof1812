import Link from "next/link";
import { SourceList } from "@/components/SourceList";
import type { CatalogRecord } from "@/lib/catalog";

const singular = { people: "person", places: "place", ships: "ship", documents: "document", objects: "object" };

export function CatalogDetail({ record }: { record: CatalogRecord }) {
  return (
    <main id="main" className="record-page">
      <header className="record-hero">
        <div>
          <p className="section-kicker">{singular[record.kind]} record</p>
          <p className="record-eyebrow">{record.eyebrow}</p>
          <h1>{record.name}</h1>
          {record.dates && <p className="record-dates">{record.dates}</p>}
          <p className="record-role">{record.role}</p>
        </div>
      </header>
      <div className="record-body">
        <section className="record-summary">
          <p>{record.summary}</p>
          <h2>Why this record matters</h2>
          <p>{record.significance}</p>
        </section>
        {(record.evidence || record.facts?.length) && (
          <aside className="record-facts" aria-label="Record details">
            {record.evidence && <div><span>Evidence status</span><strong>{record.evidence}</strong></div>}
            {record.facts?.map((fact) => <div key={fact.label}><span>{fact.label}</span><strong>{fact.value}</strong></div>)}
          </aside>
        )}
        <div className="record-actions">
          <Link className="primary-action" href={`/story/${record.chapter}`}>Read the connected story <span>→</span></Link>
          <Link href={`/${record.kind}`}>Back to {record.kind}</Link>
        </div>
        <SourceList ids={record.sourceRefs} heading="Evidence behind this record" />
      </div>
    </main>
  );
}

