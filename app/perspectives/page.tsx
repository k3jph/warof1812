import type { Metadata } from "next";
import Link from "next/link";
import { perspectives } from "@/lib/perspectives";

export const metadata: Metadata = { title: "Perspective Pathways", description: "Ten complete alternate readings of the War of 1812 through sovereignty, freedom seeking, labor, citizenship, occupation, captivity, place, objects, and memory." };

const crossings = [
  { name: "Tecumseh and the Thames", paths: ["Sovereignty", "British North America", "Memory & myth"], note: "The same death can mark coalition collapse, colonial survival, or the making of a transnational hero." },
  { name: "The Chesapeake blockade", paths: ["Freedom seeking", "Civilians", "Maryland", "Sailors"], note: "One naval system becomes an escape corridor, civilian emergency, regional campaign, and maritime labor regime." },
  { name: "Fort McHenry's flag", paths: ["Women & labor", "Maryland", "Material war", "Memory & myth"], note: "A household product becomes military signal, local survival object, museum artifact, and national emblem." },
  { name: "The Treaty of Ghent", paths: ["Sovereignty", "Sailors", "Prisoners", "Material war", "Memory & myth"], note: "Its text restores states while omitting maritime redress, Indigenous power, and the lived lag between signature and peace." },
];

export default function PerspectivesPage() {
  return <main id="main" className="perspectives-page">
    <header className="perspectives-hero"><div><p className="section-kicker">Ten readings · one evidence corpus</p><h1>Change the question.<br/><em>Change the war.</em></h1></div><div><p>A chronology tells you what happened next. A perspective pathway asks why the sequence looks different when another person&apos;s stakes determine what matters.</p><dl><div><dt>10</dt><dd>complete pathways</dd></div><div><dt>{perspectives.reduce((sum,path)=>sum+path.stages.length,0)}</dt><dd>curated movements</dd></div><div><dt>1</dt><dd>shared evidence corpus</dd></div></dl></div></header>

    <section className="perspective-principle"><p className="section-kicker">The governing rule</p><blockquote>Nothing here invents a separate war. Each pathway reorders the same people, events, places, documents, objects, and sources around a different historical question.</blockquote></section>

    <section className="perspective-index" aria-label="Perspective pathways">
      {perspectives.map((path) => <Link href={`/perspectives/${path.slug}`} key={path.slug} style={{ "--path-accent": path.accent } as React.CSSProperties}>
        <span className="perspective-number">{path.number}</span><div><p>{path.tags.join(" · ")}</p><h2>{path.title}</h2><strong>{path.question}</strong></div><div className="perspective-route-preview">{path.stages.map((item,index)=><i key={item.title}><b>{index+1}</b><span>{item.title}</span></i>)}</div><em>Follow this pathway →</em>
      </Link>)}
    </section>

    <section className="perspective-crossings"><header><p className="section-kicker">Evidence at the crossings</p><h2>The record does not belong to one pathway.</h2><p>The most useful evidence changes meaning without changing identity. These crossings make the method visible.</p></header><div>{crossings.map((item,index)=><article key={item.name}><span>{String(index+1).padStart(2,"0")}</span><h3>{item.name}</h3><p>{item.note}</p><div>{item.paths.map(path=><b key={path}>{path}</b>)}</div></article>)}</div></section>
  </main>;
}
