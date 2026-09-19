import type { Metadata } from "next";
import { CatalogIndex } from "@/components/CatalogIndex";
import { places } from "@/lib/catalog";
export const metadata: Metadata = { title: "Places", description: "Places that shaped the geography and logistics of the War of 1812." };
export default function Page() { return <main id="main" className="page-shell"><header className="page-title"><p className="section-kicker">Reference collection</p><h1>Places</h1><p>Forts, ports, towns, shipyards, islands, and battlefields, landscapes that made some choices possible and others impossible.</p></header><CatalogIndex records={places} fixedKind="places" /></main>; }

