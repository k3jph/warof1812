import type { Metadata } from "next";
import { ExploreIndex } from "@/components/ExploreIndex";
import { allCatalogRecords, catalogByKind } from "@/lib/catalog";
import { events } from "@/lib/content";

export const metadata: Metadata = { title: "Explore", description: "Search the events, people, places, ships, documents, and objects of the War of 1812." };
export default function ExplorePage() {
  const collections = [
    ["events", "Events", events.length, "Battles, raids, occupations, politics, and peace."],
    ["people", "People", catalogByKind.people.length, "Leaders, witnesses, workers, and fighters."],
    ["places", "Places", catalogByKind.places.length, "Cities, forts, shipyards, islands, and battlefields."],
    ["ships", "Ships", catalogByKind.ships.length, "Atlantic frigates and inland flagships."],
    ["documents", "Documents", catalogByKind.documents.length, "Messages, treaties, newspapers, and lyrics."],
    ["objects", "Objects", catalogByKind.objects.length, "Flags, weapons, certificates, and prints."],
  ] as const;
  return <main id="main" className="page-shell explore-page"><header className="page-title"><p className="section-kicker">Museum and reference mode</p><h1>Explore the whole record</h1><p>Move between narrative and evidence. Search across events, people, places, ships, documents, and objects–or open a collection and browse slowly.</p></header><nav className="collection-doors" aria-label="Explore collections">{collections.map(([href, label, count, copy]) => <a href={`/${href}`} key={href}><span>{count} records</span><h2>{label}</h2><p>{copy}</p><b>Enter collection →</b></a>)}</nav><ExploreIndex events={events} catalog={allCatalogRecords} /></main>;
}
