import type { Metadata } from "next";
import Link from "@/components/SafeLink";
import { chapters } from "@/lib/content";

export const metadata: Metadata = { title: "The Whole Story", description: "Follow the complete War of 1812 from its Atlantic and continental origins through Ghent, New Orleans, and the unequal peace." };

export default function StoryIndex() {
  return (
    <main id="main" className="page-shell story-index">
      <header className="page-title"><p className="section-kicker">The complete narrative</p><h1>The Whole Story</h1><p>Start before the declaration. Follow one event into the next. End only when the consequences are visible.</p><Link className="primary-action" href="/story/world-already-at-war">Begin at the beginning →</Link></header>
      <ol className="chapter-list">{chapters.map((chapter) => <li key={chapter.id}><Link href={`/story/${chapter.slug}`}><span className="chapter-number">{chapter.order === 0 ? "P" : chapter.order === 17 ? "C" : chapter.order === 18 ? "E" : String(chapter.order).padStart(2, "0")}</span><div><p>{chapter.eyebrow}</p><h2>{chapter.title}</h2><span>{chapter.subtitle}</span></div><b>→</b></Link></li>)}</ol>
    </main>
  );
}

