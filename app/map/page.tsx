import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { MapExplorer } from "@/components/MapExplorer";
import { events } from "@/lib/content";
import { gisFeatures, gisLayers, gisSources } from "@/lib/historical-gis";

export const metadata: Metadata = pageMetadata("/map", "Campaign Map", "An interpretive, time-aware War of 1812 campaign map with sourced routes, regions, events, uncertainty, and explicit off-frame records.");
export default async function MapPage({ searchParams }: { searchParams: Promise<{ event?: string | string[] }> }) { const { event } = await searchParams; const initialEventId = typeof event === "string" ? event : ""; return <main id="main" className="page-shell map-page"><header className="page-title gis-page-title"><p className="section-kicker">The war as contested geography</p><h1>Campaign map</h1><p>The war does not happen on one frontier or on an empty map. Move through time, combine interpretive layers, inspect uncertainty, and ask what any mapped place meant then.</p><div className="gis-statline"><span><b>{gisFeatures.length}</b> spatial records</span><span><b>{gisLayers.length}</b> evidence layers</span><span><b>{gisSources.length}</b> source families</span><span><b>1812–1817</b> time-aware</span></div></header><MapExplorer events={events} initialEventId={initialEventId} /></main>; }
