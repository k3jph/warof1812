import type { Metadata } from "next";
import { sources } from "@/lib/content";

export const metadata: Metadata = { title: "Sources & Research Guide", description: "Primary documents, archives, museums, maps, and public-history resources for the War of 1812." };

const groups: [string, string[]][] = [
  ["Start here", ["loc-guide","nps-war","nara-war","cwm","lac"]],
  ["Declaration, politics & impressment", ["house-declaration","nara-impressment"]],
  ["Indigenous nations & the interior", ["nps-indigenous","nps-lake-erie","nps-creek"]],
  ["Naval war, lakes & Pacific", ["nhhc","nhhc-pacific","nhhc-flotilla"]],
  ["Black history, slavery & freedom seeking", ["nps-freedom-1","nps-colonial","parks-pierpoint","parks-black-militia","nps-prince-witten","nps-new-orleans-black"]],
  ["Maryland, Washington & Baltimore", ["nps-riots","bca","nps-baltimore","nps-north-point","nps-bombardment","nps-grace","smithsonian-flag","loc-fort-print"]],
  ["Gulf, peace & legacy", ["nps-choctaw","lafolklife","loc-ghent","state-rush-bagot","nps-legacies"]],
];
const byId = Object.fromEntries(sources.map((source) => [source.id, source]));

export default function SourcesPage() {
  return (
    <main id="main" className="page-shell sources-page">
      <header className="page-title"><p className="section-kicker">Evidence should be easy to reach</p><h1>Sources &amp; research guide</h1><p>This site links outward aggressively because the archive should never be harder to reach than the prose describing it. These are starting points, not a closed bibliography.</p></header>
      <aside className="source-policy"><h2>How sources are used</h2><p>Primary records and archival repositories come first; public-history institutions help orient the narrative; nation and tribal sources are sought for Indigenous history; modern scholarship resolves synthesis and dispute. Famous stories are separated into what happened, what contemporaries said, what later memory added, and what remains uncertain.</p></aside>
      <div className="source-groups">{groups.map(([title, ids]) => <section key={title}><h2>{title}</h2><div>{ids.map((id) => { const source = byId[id]; return <article key={id}><p>{source.institution}</p><h3><a href={source.url} target="_blank" rel="noreferrer">{source.title} ↗</a></h3><span>{source.type}</span><p>{source.note}</p></article>; })}</div></section>)}</div>
      <aside className="rights-policy"><p className="section-kicker">Images are evidence</p><h2>Rights and provenance</h2><p>Every published image requires an item-level record: creator, date, repository, source page, rights statement, credit line, caption, and descriptive alt text. A public repository is not a blanket license. “No known restrictions” is preserved as the institution states it; retrospective art is identified as retrospective.</p></aside>
    </main>
  );
}

