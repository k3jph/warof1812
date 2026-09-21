import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { TimelineExplorer } from "@/components/TimelineExplorer";
import { events } from "@/lib/content";

export const metadata: Metadata = pageMetadata("/timeline", "Timeline", "A chronological War of 1812 timeline generated from the shared event corpus.");

export default function TimelinePage() {
  return (
    <main id="main" className="page-shell timeline-page">
      <header className="page-title"><p className="section-kicker">One corpus, many ways in</p><h1>Timeline</h1><p>The same event records power this chronology and the interactive map. No parallel list is maintained by hand.</p></header>
      <TimelineExplorer events={events} />
    </main>
  );
}
