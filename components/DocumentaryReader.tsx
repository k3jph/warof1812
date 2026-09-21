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
  const MajorHeading = standalone ? "h2" : "h3";
  const MinorHeading = standalone ? "h3" : "h4";
  const longestReading = Math.max(packet.diplomatic.length, packet.modernized.length);
  const excerptClass = longestReading >= 320 ? "excerpt-long" : longestReading >= 180 ? "excerpt-medium" : "excerpt-short";

  return (
    <section className={`documentary-reader ${standalone ? "standalone" : "embedded"}`} id="documentary-edition" aria-labelledby={`documentary-title-${packet.slug}`}>
      <header className="documentary-heading">
        <div><p className="section-kicker">Documentary edition · packet {String(packet.chapterOrder + 1).padStart(2, "0")}</p>{standalone ? <h1 id={`documentary-title-${packet.slug}`}>{packet.title}</h1> : <h2 id={`documentary-title-${packet.slug}`}>{packet.title}</h2>}<p>{packet.editorialIntroduction}</p></div>
        <div className="documentary-stamp"><span>{packet.date}</span><strong>{packet.documentType}</strong>{standalone ? <Link href={`/story/${packet.chapterSlug}`}>Read the chapter →</Link> : <Link href={`/edition/${packet.slug}`}>Open this source alone →</Link>}</div>
      </header>

      {packet.image && <figure className="documentary-image"><Image src={packet.image.src} alt={packet.image.alt} width={640} height={507} /><figcaption><span>{packet.image.caption}</span><small>{packet.image.credit}</small></figcaption></figure>}

      <div className={`transcription-pair ${excerptClass}`} aria-label="Historical excerpt and modernized reading" data-excerpt-length={excerptClass.replace("excerpt-","")}>
        <article><MajorHeading className="transcription-label">Excerpt</MajorHeading><blockquote>{packet.diplomatic}</blockquote><span>Historical wording and forms retained where stated.</span></article>
        <article><MajorHeading className="transcription-label">Modernized reading</MajorHeading><blockquote>{packet.modernized}</blockquote><span>Plain-language reading; not a substitute for quotation.</span></article>
      </div>
      <p className="transcription-note"><strong>Editorial method:</strong> {packet.transcriptionNote}</p>

      <div className="documentary-apparatus">
        <section><MajorHeading className="documentary-section-title">Annotations</MajorHeading><ol>{packet.annotations.map((annotation) => <li key={annotation.term}><strong>{annotation.term}</strong><span>{annotation.note}</span></li>)}</ol></section>
        <section className="provenance-card"><MajorHeading className="documentary-section-title">Witness and provenance</MajorHeading><dl><div><dt>Creator</dt><dd>{packet.creator}</dd></div><div><dt>Witness used</dt><dd>{packet.witness}</dd></div><div><dt>Repository or edition</dt><dd>{packet.repository}</dd></div><div><dt>Collection</dt><dd>{packet.collection}</dd></div><div><dt>Identifier</dt><dd>{packet.identifier}</dd></div><div><dt>Transmission</dt><dd>{packet.provenance}</dd></div><div><dt>Rights</dt><dd>{packet.rights}</dd></div></dl><a href={packet.sourceUrl} target="_blank" rel="noreferrer">Open the cited witness ↗</a></section>
      </div>

      {packet.counterpoint && <aside className="counterpoint"><div><MajorHeading className="documentary-section-title">Read against the grain</MajorHeading><MinorHeading>{packet.counterpoint.title}</MinorHeading><p>{packet.counterpoint.creator} · {packet.counterpoint.date}</p></div><div><p>{packet.counterpoint.summary}</p><a href={packet.counterpoint.sourceUrl} target="_blank" rel="noreferrer">Open the counter-record ↗</a></div></aside>}

      <footer className="citation-downloads"><div><MajorHeading className="documentary-section-title">Take the citation with you</MajorHeading><MinorHeading>Four research formats</MinorHeading></div><div>{citationFormats.map(([label, style, extension]) => { const citation = documentaryCitation(packet, style); return <a key={style} download={`${packet.slug}-${style}.${extension}`} href={`data:text/plain;charset=utf-8,${encodeURIComponent(citation)}`}>{label}<span>↓</span></a>; })}</div></footer>
    </section>
  );
}
