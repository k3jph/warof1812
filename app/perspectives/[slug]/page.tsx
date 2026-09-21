import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "@/components/SafeLink";
import { notFound } from "next/navigation";
import { allCatalogRecords } from "@/lib/catalog";
import { chapterBySlug, events, sourceById } from "@/lib/content";
import { documentaryBySlug } from "@/lib/documentary";
import { perspectiveBySlug, perspectiveHref, perspectives, type PerspectiveRef } from "@/lib/perspectives";

export function generateStaticParams() { return perspectives.map((path)=>({slug:path.slug})); }
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{ const {slug}=await params; const path=perspectiveBySlug[slug]; return path ? pageMetadata(`/perspectives/${path.slug}`, path.title, path.subtitle) : {}; }

function evidenceRecord(reference: PerspectiveRef) {
  if (reference.kind === "story") { const record=chapterBySlug[reference.slug]; return record && { title:record.title, eyebrow:record.eyebrow, summary:record.lede, sourceRefs:record.sourceRefs }; }
  if (reference.kind === "events") { const record=events.find((item)=>item.id===reference.slug); return record && { title:record.title, eyebrow:`${record.date} · ${record.place}`, summary:record.summary, sourceRefs:record.sourceRefs }; }
  if (reference.kind === "edition") { const record=documentaryBySlug[reference.slug]; return record && { title:record.title, eyebrow:`Documentary edition · ${record.date}`, summary:record.editorialIntroduction, sourceRefs:[] as string[] }; }
  if (reference.kind === "map") return { title:reference.label ?? "Campaign map", eyebrow:"Spatial evidence", summary:"Compare dated routes, regions, operational zones, and surviving places, with construction notes and confidence labels.", sourceRefs:[] as string[] };
  const record=allCatalogRecords.find((item)=>item.kind===reference.kind&&item.slug===reference.slug);
  return record && { title:record.name, eyebrow:`${reference.kind} · ${record.eyebrow}`, summary:record.summary, sourceRefs:record.sourceRefs };
}

export default async function PerspectivePage({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params; const path=perspectiveBySlug[slug]; if(!path) notFound();
  const sourceIds=Array.from(new Set(path.stages.flatMap(item=>[...(item.sourceRefs??[]),...item.evidence.flatMap(reference=>evidenceRecord(reference)?.sourceRefs??[])])));
  const pathIndex=perspectives.findIndex(item=>item.slug===slug); const prev=perspectives[(pathIndex-1+perspectives.length)%perspectives.length]; const next=perspectives[(pathIndex+1)%perspectives.length];
  return <main id="main" className="perspective-page" style={{"--path-accent":path.accent} as React.CSSProperties}>
    <header className="perspective-path-hero"><div className="path-ordinal">Path {path.number} / {perspectives.length}</div><div><p className="section-kicker">{path.tags.join(" · ")}</p><h1>{path.title}</h1><p>{path.subtitle}</p></div><blockquote><span>The question</span>{path.question}</blockquote></header>

    <section className="perspective-thesis"><p className="section-kicker">The reading</p><h2>{path.thesis}</h2><div>{path.introduction.map(paragraph=><p key={paragraph}>{paragraph}</p>)}</div></section>

    <nav className="path-route" aria-label="Pathway movements"><p>Reading route</p>{path.stages.map((item,index)=><a href={`#movement-${index+1}`} key={item.title}><span>{String(index+1).padStart(2,"0")}</span><strong>{item.title}</strong></a>)}</nav>

    <article className="path-movements">
      {path.stages.map((item,index)=><section id={`movement-${index+1}`} key={item.title}>
        <div className="movement-rail"><span>{String(index+1).padStart(2,"0")}</span><i /></div>
        <div className="movement-copy"><p className="section-kicker">{item.kicker}</p><h2>{item.title}</h2><p className="movement-summary">{item.summary}</p><blockquote>{item.argument}</blockquote>
          <div className="movement-evidence"><p>Evidence in this movement</p>{item.evidence.map(reference=>{const record=evidenceRecord(reference); if(!record)return null; return <Link href={perspectiveHref(reference)} key={`${reference.kind}-${reference.slug}`}><span>{record.eyebrow}</span><h3>{reference.label??record.title}</h3><p>{record.summary}</p><b>Open evidence →</b></Link>;})}</div>
        </div>
      </section>)}
    </article>

    <section className="path-reckoning"><div><p className="section-kicker">What this pathway changes</p><h2>{path.conclusion}</h2></div><div><p>Keep these tensions visible</p>{path.tensions.map((item,index)=><span key={item}><b>{String(index+1).padStart(2,"0")}</b>{item}</span>)}</div></section>

    <section className="path-sources"><header><p className="section-kicker">Source trail</p><h2>The shared evidence beneath this reading</h2><p>These sources also support other pathways. The interpretation changes; the provenance does not.</p></header><div>{sourceIds.map(id=>{const source=sourceById[id]; if(!source)return null; return <article key={id}><span>{source.type}</span><h3>{source.title}</h3><p>{source.institution}</p><small>{source.note}</small><a href={source.url} target="_blank" rel="noreferrer">Open source ↗</a></article>;})}</div></section>

    <nav className="perspective-path-nav" aria-label="Other perspective pathways"><Link href={`/perspectives/${prev.slug}`}><span>Previous pathway</span><strong>← {prev.title}</strong></Link><Link href="/perspectives"><span>All pathways</span><strong>Change the question</strong></Link><Link href={`/perspectives/${next.slug}`}><span>Next pathway</span><strong>{next.title} →</strong></Link></nav>
  </main>;
}
