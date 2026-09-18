import type { Metadata } from "next";
import Link from "next/link";
import { SourceList } from "@/components/SourceList";
import { chapterBySlug } from "@/lib/content";

export const metadata: Metadata = { title: "The War in Twenty Minutes", description: "A connected, medium-length account of the War of 1812." };

const selections = [
  "world-already-at-war", "why-war", "baltimore-at-war-with-itself", "easy-conquest-that-wasnt",
  "old-ironsides", "war-for-the-interior", "continental-naval-arms-race", "southern-borderlands",
  "everything-changes", "plattsburgh", "washington-burns", "baltimore-holds", "peace-at-ghent",
  "new-orleans", "what-changed",
].map((slug) => chapterBySlug[slug]);

const sourceRefs = Array.from(new Set(selections.flatMap((chapter) => chapter.sourceRefs)));

export default function TwentyMinutesPage() {
  return (
    <main id="main" className="page-shell twenty-minute-page">
      <header className="page-title">
        <p className="section-kicker">A connected account · about 20 minutes</p>
        <h1>The war at reading distance</h1>
        <p>This version keeps the causes, major campaigns, diplomacy, civilian experience, and unequal aftermath in one line of sight. Each movement opens into the full chapter.</p>
        <div className="reading-meta"><span>15 movements</span><span>Medium depth</span><span>Source linked</span></div>
      </header>
      <article className="medium-read">
        {selections.map((chapter, index) => (
          <section key={chapter.slug}>
            <div className="medium-number">{String(index + 1).padStart(2, "0")}</div>
            <div>
              <p className="section-kicker">{chapter.date} · {chapter.theaters[0]}</p>
              <h2>{chapter.title}</h2>
              <p className="medium-lede">{chapter.lede}</p>
              {chapter.sections.slice(0, 2).map((section) => <p key={section.heading}>{section.paragraphs[0]}</p>)}
              <Link href={`/story/${chapter.slug}`}>Read the full movement →</Link>
            </div>
          </section>
        ))}
        <aside className="continue-box"><p>You now have the whole shape. The full narrative restores the omitted scenes, evidence notes, communities, and connections.</p><Link className="primary-action" href="/story">Open the complete story <span>→</span></Link></aside>
        <SourceList ids={sourceRefs} heading="Sources across this account" />
      </article>
    </main>
  );
}

