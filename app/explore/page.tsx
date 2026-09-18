import type { Metadata } from "next";
import { ExploreIndex } from "@/components/ExploreIndex";
import { events } from "@/lib/content";

export const metadata: Metadata = { title: "Explore", description: "Search and filter the structured War of 1812 event corpus." };
export default function ExplorePage() { return <main id="main" className="page-shell explore-page"><header className="page-title"><p className="section-kicker">Museum and reference mode</p><h1>Explore the corpus</h1><p>Search events, places, raids, battles, occupations, naval actions, political decisions, and diplomacy—then return to the story that connects them.</p></header><ExploreIndex events={events} /></main>; }

