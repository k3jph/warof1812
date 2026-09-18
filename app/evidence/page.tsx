import type { Metadata } from "next";
import Link from "@/components/SafeLink";
import { claimStateLabel, evidenceClaims } from "@/lib/evidence-lab";

export const metadata: Metadata = {
  title: "Evidence Laboratory",
  description: "Test five familiar War of 1812 claims against primary evidence, contradictions, uncertainty, and the history of popular memory.",
};

export default function EvidenceLabPage() {
  return (
    <main id="main" className="evidence-lab">
      <header className="lab-hero">
        <div className="lab-hero-copy">
          <p className="section-kicker">Evidence laboratory · five open case files</p>
          <h1>Put the story<br />on the table.</h1>
          <p>Famous claims survive because they are vivid, useful, and easy to repeat. Here, each one is separated into its earliest trace, supporting evidence, contradictions, uncertainty, and afterlife.</p>
        </div>
        <div className="lab-readout" aria-label="Laboratory summary">
          <span><b>05</b> claims tested</span>
          <span><b>25</b> evidence entries</span>
          <span><b>03</b> verdict states</span>
          <span><b>01</b> rule: label uncertainty</span>
        </div>
      </header>

      <section className="lab-key" aria-labelledby="lab-key-title">
        <div><p className="section-kicker">Reading the findings</p><h2 id="lab-key-title">A verdict is not a fact-checking trophy.</h2></div>
        <div className="lab-key-grid">
          <article data-state="documented"><span>Documented</span><p>The central claim is supported by strong contemporary or material evidence.</p></article>
          <article data-state="qualified"><span>True, with limits</span><p>A real event or phrase has accumulated details, certainty, or causal weight it cannot carry.</p></article>
          <article data-state="unsupported"><span>Unsupported as stated</span><p>The precise version outruns available records. This does not erase adjacent history or end research.</p></article>
        </div>
      </section>

      <section className="case-index" aria-labelledby="case-index-title">
        <header><div><p className="section-kicker">Case register</p><h2 id="case-index-title">Five claims. Five evidence trails.</h2></div><p>Select a file to see what is accepted, what remains possible, what is unsupported, and how the familiar version entered memory.</p></header>
        <div className="case-table" role="list">
          {evidenceClaims.map((claim) => (
            <Link href={`/evidence/${claim.slug}`} className="case-row" data-state={claim.state} role="listitem" key={claim.slug}>
              <span className="case-number">{claim.number}</span>
              <div className="case-title"><small>Claim</small><h3>{claim.title}</h3><p>{claim.familiarVersion}</p></div>
              <div className="case-finding"><small>Finding</small><strong>{claimStateLabel[claim.state]}</strong><p>{claim.verdict}</p></div>
              <div className="case-confidence"><small>Confidence</small><b>{claim.confidence}%</b><span aria-hidden="true"><i style={{ width: `${claim.confidence}%` }} /></span></div>
              <span className="case-open">Open file <b>→</b></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="lab-method">
        <div><p className="section-kicker">Method card</p><h2>How a case is tested</h2></div>
        <ol>
          <li><span>01</span><div><h3>State the familiar version</h3><p>Make the popular claim precise enough to test. Do not quietly improve it first.</p></div></li>
          <li><span>02</span><div><h3>Find the earliest trace</h3><p>Separate a contemporary statement from a later quotation, illustration, textbook, or tradition.</p></div></li>
          <li><span>03</span><div><h3>Build both columns</h3><p>Record evidence that supports the claim and evidence that limits, contradicts, or fails to confirm it.</p></div></li>
          <li><span>04</span><div><h3>Grade each element</h3><p>Keep documented, possible, and unsupported details apart instead of issuing a single all-or-nothing ruling.</p></div></li>
          <li><span>05</span><div><h3>Explain the memory</h3><p>Ask why a version spread. A claim can be historically weak and culturally important at the same time.</p></div></li>
        </ol>
      </section>

      <aside className="lab-caution">
        <p className="section-kicker">Caution · documentary silence</p>
        <p><strong>“Not documented” does not always mean “did not happen.”</strong> Records disappear, names change, institutions classify people badly, and some lives were never entered into official files. The laboratory marks the strength of the present claim against the evidence currently identified. It leaves the door open for a better document.</p>
        <Link href="/sources">Open the research guide →</Link>
      </aside>
    </main>
  );
}
