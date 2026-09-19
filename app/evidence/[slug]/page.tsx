import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "@/components/SafeLink";
import { sourceById } from "@/lib/content";
import { claimStateLabel, evidenceClaimBySlug, evidenceClaims } from "@/lib/evidence-lab";

export function generateStaticParams() {
  return evidenceClaims.map((claim) => ({ slug: claim.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const claim = evidenceClaimBySlug[slug];
  return claim ? { title: `${claim.title} · Evidence Laboratory`, description: claim.verdict } : {};
}

export default async function EvidenceCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const claim = evidenceClaimBySlug[slug];
  if (!claim) notFound();
  const current = evidenceClaims.findIndex((item) => item.slug === claim.slug);
  const previous = evidenceClaims[(current - 1 + evidenceClaims.length) % evidenceClaims.length];
  const next = evidenceClaims[(current + 1) % evidenceClaims.length];

  return (
    <main id="main" className="evidence-case" data-state={claim.state}>
      <header className="case-hero">
        <div className="case-hero-number"><span>Case file</span><b>{claim.number}</b><small>of {String(evidenceClaims.length).padStart(2, "0")}</small></div>
        <div className="case-hero-copy"><p className="section-kicker">Evidence laboratory</p><h1>{claim.title}</h1><p>{claim.familiarVersion}</p></div>
        <div className="verdict-stamp"><small>Assessment</small><strong>{claimStateLabel[claim.state]}</strong><div><span>Confidence</span><b>{claim.confidence}%</b></div><i aria-hidden="true"><span style={{ width: `${claim.confidence}%` }} /></i></div>
      </header>

      <section className="case-verdict">
        <p className="section-kicker">Finding</p>
        <h2>{claim.verdict}</h2>
        <p>{claim.confidenceNote}</p>
      </section>

      <section className="earliest-trace">
        <div><p className="section-kicker">Earliest identifiable trace</p><time>{claim.earliest.date}</time></div>
        <div><h2>{claim.earliest.label}</h2><p>{claim.earliest.note}</p>{claim.earliest.href && <Link href={claim.earliest.href}>Inspect the trace →</Link>}</div>
      </section>

      <section className="evidence-ledger" aria-labelledby="ledger-title">
        <header><p className="section-kicker">Evidence ledger</p><h2 id="ledger-title">What the record can and cannot do</h2></header>
        <div>
          {claim.evidence.map((item, index) => (
            <article data-kind={item.kind} key={`${item.date}-${item.label}`}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <time>{item.date}</time>
              <div><small>{item.kind}</small><h3>{item.label}</h3><p>{item.note}</p>{item.href && <Link href={item.href}>Open record →</Link>}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="finding-matrix" aria-label="Finding matrix">
        <article className="finding-accepted"><header><span>✓</span><div><p>Accepted</p><h2>Supported elements</h2></div></header><ul>{claim.accepted.map((item) => <li key={item}>{item}</li>)}</ul></article>
        <article className="finding-possible"><header><span>?</span><div><p>Possible</p><h2>Open elements</h2></div></header><ul>{claim.possible.map((item) => <li key={item}>{item}</li>)}</ul></article>
        <article className="finding-unsupported"><header><span>×</span><div><p>Unsupported</p><h2>Claims that outrun the record</h2></div></header><ul>{claim.unsupported.map((item) => <li key={item}>{item}</li>)}</ul></article>
      </section>

      <section className="case-contradictions">
        <header><p className="section-kicker">Contradiction log</p><h2>Where the familiar version strains</h2></header>
        <ol>{claim.contradictions.map((item, index) => <li key={item}><span>C{index + 1}</span><p>{item}</p></li>)}</ol>
      </section>

      <section className="memory-chain">
        <header><p className="section-kicker">Popular-memory pathway</p><h2>How the story acquired its familiar shape</h2></header>
        <div>{claim.memoryPath.map((step, index) => <article key={`${step.date}-${step.title}`}><span>{String(index + 1).padStart(2, "0")}</span><time>{step.date}</time><h3>{step.title}</h3><p>{step.note}</p></article>)}</div>
      </section>

      <section className="case-sources">
        <header><p className="section-kicker">Source bench</p><h2>Records used in this case</h2></header>
        <div>{claim.sourceRefs.map((id) => { const source = sourceById[id]; return source ? <article key={id}><span>{source.type}</span><h3>{source.title}</h3><p>{source.institution}</p><small>{source.note}</small><a href={source.url} target="_blank" rel="noreferrer">Open at institution ↗</a></article> : null; })}</div>
      </section>

      <aside className="case-related"><p className="section-kicker">Continue through the record</p><div>{claim.related.map((item) => <Link href={item.href} key={item.href}>{item.label}<span>→</span></Link>)}</div></aside>

      <nav className="case-nav" aria-label="Evidence case files">
        <Link href={`/evidence/${previous.slug}`}><span>Previous case</span><strong>{previous.number} · {previous.title}</strong></Link>
        <Link href="/evidence"><span>All files</span><strong>Evidence laboratory</strong></Link>
        <Link href={`/evidence/${next.slug}`}><span>Next case</span><strong>{next.number} · {next.title}</strong></Link>
      </nav>
    </main>
  );
}
