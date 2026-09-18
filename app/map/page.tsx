import type { Metadata } from "next";
import { MapExplorer } from "@/components/MapExplorer";
import { events } from "@/lib/content";

export const metadata: Metadata = { title: "Follow the War", description: "Move through a schematic strategic map of the War of 1812 and open every event in the connected narrative." };
export default function MapPage() { return <main id="main" className="page-shell map-page"><header className="page-title"><p className="section-kicker">The signature interactive</p><h1>Follow the War</h1><p>The war does not happen on one frontier. Move the date and watch its geography widen.</p></header><MapExplorer events={events} /></main>; }

