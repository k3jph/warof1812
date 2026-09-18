import type { Metadata } from "next";
import Link from "@/components/SafeLink";
import { documentaryPackets } from "@/lib/documentary";

export const metadata: Metadata = { title: "Documentary Edition", description: "Nineteen primary-source packets with transcriptions, annotations, provenance, counter-records, and exportable citations." };

export default function DocumentaryEditionPage() {
  return <main id="main" className="edition-index">
    <header className="edition-hero"><div><p className="section-kicker">The documents beneath the narrative</p><h1>Documentary<br /><i>Edition</i></h1></div><div><p>Nineteen source packets—one for every movement of the story. Read period wording beside a modernized text, then inspect the editorial decisions, provenance, counter-evidence, and citation record.</p><dl><div><dt>19</dt><dd>chapter packets</dd></div><div><dt>2</dt><dd>text states</dd></div><div><dt>4</dt><dd>citation formats</dd></div></dl></div></header>
    <section className="edition-method"><div><p className="section-kicker">Editorial principles</p><h2>Evidence is not self-explanatory.</h2></div><div><p>Every packet identifies what kind of record survives, who produced it, how it reached the present, and what the transcription changes. A modernized reading improves access; it never silently replaces the historical text.</p><p>Where accounts conflict, the disagreement remains visible. Official reports, partisan pamphlets, private letters, treaty language, administrative returns, and remembered speech answer different questions—and conceal different things.</p></div></section>
    <section className="edition-register" aria-labelledby="register-title"><header><p className="section-kicker">Register of packets</p><h2 id="register-title">Open the archive</h2></header><ol>{documentaryPackets.map((packet) => <li key={packet.slug}><span>{String(packet.chapterOrder + 1).padStart(2,"0")}</span><div><p>{packet.chapterTitle}</p><h3><Link href={`/edition/${packet.slug}`}>{packet.title}</Link></h3><small>{packet.creator} · {packet.date}</small></div><div><b>{packet.documentType}</b><Link href={`/story/${packet.chapterSlug}#documentary-edition`}>Read in chapter →</Link></div></li>)}</ol></section>
    <aside className="edition-caution"><p className="section-kicker">Citation policy</p><h2>Export is a beginning, not an alibi.</h2><p>The downloadable citations carry the repository and identifier supplied here. For publication, confirm the repository record, the exact page or folio, the preferred institutional credit line, and any item-level reproduction conditions.</p><Link href="/sources">Research guide →</Link></aside>
  </main>;
}
