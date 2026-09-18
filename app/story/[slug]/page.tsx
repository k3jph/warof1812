import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChapterNav } from "@/components/ChapterNav";
import { LinkedText } from "@/components/LinkedText";
import { RelatedRecords } from "@/components/RelatedRecords";
import { SourceList } from "@/components/SourceList";
import { chapterBySlug, chapters, events } from "@/lib/content";

export function generateStaticParams() { return chapters.map((chapter) => ({ slug: chapter.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const chapter = chapterBySlug[slug]; return chapter ? { title: chapter.title, description: chapter.lede } : {}; }

export default async function ChapterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const chapter = chapterBySlug[slug];
  if (!chapter) notFound();
  const related = events.filter((event) => chapter.relatedEvents.includes(event.id));
  return (
    <main id="main" className="chapter-page">
      <header className="chapter-hero"><div className="chapter-progress"><span style={{ width: `${((chapter.order + 1) / chapters.length) * 100}%` }} /></div><div className="chapter-title-wrap"><p className="section-kicker">{chapter.eyebrow}</p><h1>{chapter.title}</h1><p className="chapter-subtitle">{chapter.subtitle}</p><div className="chapter-tags"><span>{chapter.date}</span>{chapter.theaters.map((item) => <span key={item}>{item}</span>)}</div></div></header>
      <article className="chapter-body">
        <p className="chapter-lede"><LinkedText text={chapter.lede} /></p>
        {chapter.sections.map((section, sectionIndex) => <section key={section.heading}><div className="section-number">{String(sectionIndex + 1).padStart(2, "0")}</div><div><h2>{section.heading}</h2>{section.paragraphs.map((paragraph, index) => <p key={index}><LinkedText text={paragraph} />{index === section.paragraphs.length - 1 && sectionIndex === chapter.sections.length - 1 ? <sup><a href={`#source-${chapter.sourceRefs[0]}`}>1</a></sup> : null}</p>)}{section.evidence && <aside className="evidence-box"><p className="section-kicker">History / Memory / Evidence</p><h3>The familiar story</h3><p><LinkedText text={section.evidence.familiar} /></p><h3>What the evidence shows</h3><p><LinkedText text={section.evidence.documented} /></p>{section.evidence.uncertain && <><h3>What remains uncertain</h3><p><LinkedText text={section.evidence.uncertain} /></p></>}</aside>}</div></section>)}
        <aside className="participation-audit"><p className="section-kicker">Who else was here?</p><h2>Communities in this chapter</h2><div>{chapter.communities.map((community) => <span key={community}>{community}</span>)}</div><p>These labels are research pathways, not claims that every member of a community shared one allegiance or experience.</p></aside>
        {related.length > 0 && <section className="related-events"><p className="section-kicker">From the event corpus</p><h2>Events in this movement</h2><div>{related.map((event) => <article key={event.id}><time>{event.date}</time><h3><a href={`/events/${event.id}`}>{event.title}</a></h3><p>{event.summary}</p></article>)}</div><a className="map-path" href="/map">See these events on the map →</a></section>}
        <RelatedRecords chapter={chapter.slug} />
        <SourceList ids={chapter.sourceRefs} />
      </article>
      <ChapterNav current={chapter.order} />
    </main>
  );
}
