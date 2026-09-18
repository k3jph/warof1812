import type { Metadata } from "next";
import Link from "next/link";
import { events } from "@/lib/content";

export const metadata: Metadata = { title: "Timeline", description: "A chronological War of 1812 timeline generated from the shared event corpus." };

export default function TimelinePage() {
  const grouped = events.reduce<Record<string, typeof events>>((acc, event) => {
    (acc[String(event.year)] ||= []).push(event);
    return acc;
  }, {});
  const groups = Object.entries(grouped);
  return (
    <main id="main" className="page-shell timeline-page">
      <header className="page-title"><p className="section-kicker">One corpus, many ways in</p><h1>Timeline</h1><p>The same event records power this chronology and the interactive map. No parallel list is maintained by hand.</p></header>
      <div className="timeline">{groups.map(([year, items]) => <section key={year}><div className="timeline-year">{year}</div><div>{items?.map((event) => <article key={event.id}><time>{event.date}</time><span className={`event-type type-${event.type}`}>{event.type}</span><h2><Link href={`/story/${event.chapter}`}>{event.title}</Link></h2><p className="event-place">{event.place} · {event.theater}</p><p>{event.summary}</p></article>)}</div></section>)}</div>
    </main>
  );
}
