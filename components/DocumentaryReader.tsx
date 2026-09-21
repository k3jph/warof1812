import Link from "@/components/SafeLink";
import Image from "next/image";
import { documentaryCitation, type DocumentaryPacket } from "@/lib/documentary";

const citationFormats = [
  ["Chicago", "chicago", "txt"],
  ["MLA", "mla", "txt"],
  ["BibTeX", "bibtex", "bib"],
  ["RIS", "ris", "ris"],
] as const;

export function DocumentaryReader({ packet, standalone = false }: { packet: DocumentaryPacket; standalone?: boolean }) {
  return (
    <section className={`documentary-reader ${standalone ? "standalone" : "embedded"}`} id="documentary-edition" aria-labelledby={`documentary-title-${packet.slug}`}>
      <header className="documentary-heading">
        <div><p className="section-kicker">Documentary edition · packet {String(packet.chapterOrder + 1).padStart(2, "0")}</p>{standalone ? <h1 id={`documentary-title-${packet.slug}`}>{packet.title}</h1> : <h2 id={`documentary-title-${packet.slug}`}>{packet.title}</h2>}<p>{packet.editorialIntroduction}</p></div>
        <div className="documentary-stamp"><span>{packet.date}</span><strong>{packet.documentType}</strong>{standalone ? <Link href={`/story/${packet.chapterSlug}`}>Read the chapter →</Link> : <Link href={`/edition/${packet.slug}`}>Open this source alone →</Link>}</div>
      </header>

      {packet.image && <figure className="documentary-image"><Image src={packet.image.src} alt={packet.image.alt} width={640} height={507} /><figcaption><span>{packet.image.caption}</span><small>{packet.image.credit}</small></figcaption></figure>}

      <div className="transcription-pair" aria-label="Historical excerpt and modernized reading">
        <article><p>Excerpt</p><blockquote>{packet.diplomatic}</blockquote><span>Historical wording and forms retained where stated.</span></article>
        <article><p>Modernized reading</p><blockquote>{packet.modernized}</blockquote><span>Plain-language reading; not a substitute for quotation.</span></article>
      </div>
      <p className="transcription-note"><strong>Editorial method:</strong> {packet.transcriptionNote}</p>

      <div className="documentary-apparatus">
        <section><p className="section-kicker">Annotations</p><ol>{packet.annotations.map((annotation) => <li key={annotation.term}><strong>{annotation.term}</strong><span>{annotation.note}</span></li>)}</ol></section>
        <section className="provenance-card"><p className="section-kicker">Witness and provenance</p><dl><div><dt>Creator</dt><dd>{packet.creator}</dd></div><div><dt>Witness used</dt><dd>{packet.witness}</dd></div><div><dt>Repository or edition</dt><dd>{packet.repository}</dd></div><div><dt>Collection</dt><dd>{packet.collection}</dd></div><div><dt>Identifier</dt><dd>{packet.identifier}</dd></div><div><dt>Transmission</dt><dd>{packet.provenance}</dd></div><div><dt>Rights</dt><dd>{packet.rights}</dd></div></dl><a href={packet.sourceUrl} target="_blank" rel="noreferrer">Open the cited witness ↗</a></section>
      </div>

      {packet.counterpoint && <aside className="counterpoint"><div><p className="section-kicker">Read against the grain</p><h3>{packet.counterpoint.title}</h3><p>{packet.counterpoint.creator} · {packet.counterpoint.date}</p></div><div><p>{packet.counterpoint.summary}</p><a href={packet.counterpoint.sourceUrl} target="_blank" rel="noreferrer">Open the counter-record ↗</a></div></aside>}

      <footer className="citation-downloads"><div><p className="section-kicker">Take the citation with you</p><h3>Four research formats</h3></div><div>{citationFormats.map(([label, style, extension]) => { const content = documentaryCitation(packet, style); return <a key={style} download={`${packet.slug}-${style}.${extension}`} href={`data:text/plain;charset=utf-8,${encodeURIComponent(content)}`}>{label}<span>↓</span></a>; })}</div></footer>
    </section>
  );
}
