import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "About This Project", description: "Why James P. Howard II built 1812: The Whole Story and how the project handles evidence, uncertainty, and institutional independence." };

export default function AboutPage() {
  return (
    <main id="main" className="page-shell about-page">
      <header className="page-title"><p className="section-kicker">Why this exists</p><h1>About This Project</h1><p>I built <em>1812: The Whole Story</em> because I went looking for the website I assumed must already exist.</p></header>
      <article className="about-copy">
        <p>I serve as Treasurer and a member of the Board of Managers of the Society of the War of 1812 in the State of Maryland. That work has given me plenty of reasons to spend time with the war—its people, places, surviving objects and documents, and especially its extraordinary concentration of history here in Maryland.</p>
        <p>But whenever I wanted to point someone toward a good general history, I ran into the same problem. Excellent resources exist. The National Park Service, Library of Congress, National Archives, Library and Archives Canada, museums, battlefield sites, state archives, and historical societies hold enormous collections. Scholars have written excellent books. Individual battles, ships, people, and places are often documented in remarkable depth.</p>
        <p>What I could not find was a single place that simply <strong>told the whole story well</strong>.</p>
        <p>The usual alternative is an encyclopedia article: accurate and useful, but organized for reference rather than reading. You can learn what happened at Detroit, Fort McHenry, or New Orleans. It is harder to begin with the world before the war, follow one event naturally into the next, understand why different people entered the conflict for very different reasons, and emerge knowing what the war changed.</p>
        <p>So I decided to build that.</p>
        <blockquote>The War of 1812 was never just two national armies fighting each other.</blockquote>
        <p>It involved the United States and the British Empire, but also Indigenous nations pursuing political and territorial objectives of their own; inhabitants of Upper and Lower Canada; enslaved people making bids for freedom under extraordinarily dangerous circumstances; free Black communities; sailors whose nationality itself could be contested; privateers; immigrants and diasporic communities; women and children; merchants, laborers, shipbuilders, refugees, prisoners, and civilians who happened to live where armies and navies decided to fight.</p>
        <p>Even familiar places become more complicated when viewed that way. Baltimore appears twice. In 1812, Americans killed one another in the city over opposition to the newly declared war. A pro-war mob destroyed an antiwar newspaper office and later broke into the jail, where it murdered Revolutionary War General James M. Lingan and brutally attacked other Federalists. Two years later, the same city mobilized on an extraordinary scale against a British invasion. Those two Baltimores belong to the same history.</p>
        <p>My aim is not to replace serious scholarship. It is to make that scholarship <strong>navigable</strong>. Every major claim should lead somewhere: to an archival document, a map, a contemporary newspaper, a museum object, a scholarly work, or an authoritative historical institution. Where sources disagree, the disagreement should remain visible. Where a story rests partly on oral tradition or later memory, that should be clear too.</p>
        <h2>About James P. Howard II</h2>
        <p>I am a Maryland researcher, writer, teacher, and technologist with a longstanding interest in early American history and genealogy. Professionally, my background is not academic history. I hold a doctorate in public policy and work in artificial intelligence, data science, computational modeling, and information systems. I have taught mathematics and statistics for many years and written and edited books and scholarly work across technical and public-policy fields.</p>
        <p>That background affects this project. I tend to think in systems: how evidence connects, how information can be structured, how uncertainty should be represented, and how a very large body of material can be made understandable without making it simplistic. Beneath the narrative is a reusable corpus of people, places, events, ships, documents, objects, maps, quotations, sources, and evidence.</p>
        <p>Genealogy led me into archives long before this project did. It taught me that the interesting part of history frequently begins where the neat summary ends.</p>
        <p><em>1812: The Whole Story</em> is an independent public-history project. Unless specifically stated otherwise, its views and interpretations are my own and should not be taken as official positions of the Society of the War of 1812 in the State of Maryland or any other organization with which I am affiliated.</p>
        <div className="about-actions"><Link className="primary-action" href="/story/world-already-at-war">Begin the story →</Link><Link href="/sources">Inspect the sources →</Link></div>
      </article>
    </main>
  );
}

