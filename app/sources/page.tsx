import type { Metadata } from "next";
import { sources } from "@/lib/content";
import { sourceGroups } from "@/lib/source-guide";
import { SourceGuide } from "@/components/SourceGuide";

export const metadata: Metadata = { title: "Sources & Research Guide", description: "Primary documents, archives, museums, maps, and public-history resources for the War of 1812." };

export default function SourcesPage() {
  return (
    <main id="main" className="page-shell sources-page">
      <header className="page-title"><p className="section-kicker">Evidence should be easy to reach</p><h1>Sources &amp; research guide</h1><p>This site links outward deliberately and aggressively because the archive should never be harder to reach than the prose describing it. These are research routes, not a closed bibliography.</p></header>
      <aside className="source-policy"><h2>How sources are used</h2><p>Primary records and archival repositories come first; public-history institutions help orient the narrative; nation and tribal sources are sought for Indigenous history; modern scholarship resolves synthesis and dispute. Famous stories are separated into what happened, what contemporaries said, what later memory added, and what remains uncertain.</p></aside>
      <SourceGuide sources={sources} groups={sourceGroups} />
      <aside className="rights-policy"><p className="section-kicker">Images are evidence</p><h2>Rights and provenance</h2><div><p>Every published image requires an item-level record: creator, date, repository, source page, rights statement, credit line, caption, and descriptive alt text. A public repository is not a blanket license. “No known restrictions” is preserved as the institution states it; retrospective art is identified as retrospective.</p><p className="rights-links"><a href={sources.find((source) => source.id === "loc-rights")?.url} target="_blank" rel="noreferrer">Library of Congress guidance ↗</a><a href={sources.find((source) => source.id === "smithsonian-terms")?.url} target="_blank" rel="noreferrer">Smithsonian terms ↗</a></p></div></aside>
    </main>
  );
}
