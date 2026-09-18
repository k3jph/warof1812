import Link from "@/components/SafeLink";
import { claimStateLabel, claimsForChapter } from "@/lib/evidence-lab";

export function EvidenceCases({ chapter }: { chapter: string }) {
  const claims = claimsForChapter(chapter);
  if (!claims.length) return null;
  return (
    <aside className="chapter-case-files">
      <div><p className="section-kicker">Evidence laboratory</p><h2>{claims.length === 1 ? "A familiar claim, tested" : "Familiar claims, tested"}</h2><p>Open the case file for the earliest trace, contradictions, and a finding that keeps uncertainty visible.</p></div>
      <div>{claims.map((claim) => <Link href={`/evidence/${claim.slug}`} data-state={claim.state} key={claim.slug}><span>{claim.number}</span><div><small>{claimStateLabel[claim.state]} · {claim.confidence}% confidence</small><strong>{claim.title}</strong></div><b>→</b></Link>)}</div>
    </aside>
  );
}
