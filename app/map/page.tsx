import type { Metadata } from "next";
import { MapExplorer } from "@/components/MapExplorer";
import { events } from "@/lib/content";
import { gisFeatures, gisLayers, gisSources } from "@/lib/historical-gis";

export const metadata: Metadata = { title: "Historical GIS", description: "A sourced, time-aware historical GIS of War of 1812 campaigns, blockade zones, Indigenous homelands, freedom-seeking routes, logistics, territorial change, and surviving sites." };
export default function MapPage() { return <main id="main" className="page-shell map-page"><header className="page-title gis-page-title"><p className="section-kicker">The war as contested geography</p><h1>Historical GIS</h1><p>The war does not happen on one frontier—or on an empty map. Move through time, combine layers, inspect uncertainty, and ask what any mapped place meant then.</p><div className="gis-statline"><span><b>{gisFeatures.length}</b> spatial records</span><span><b>{gisLayers.length}</b> evidence layers</span><span><b>{gisSources.length}</b> source families</span><span><b>1812–1817</b> time-aware</span></div></header><MapExplorer events={events} /></main>; }
