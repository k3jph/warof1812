import type { Metadata } from "next";
import { CatalogIndex } from "@/components/CatalogIndex";
import { objects } from "@/lib/catalog";
export const metadata: Metadata = { title: "Objects", description: "Material objects that carry the evidence and memory of the War of 1812." };
export default function Page() { return <main id="main" className="page-shell"><header className="page-title"><p className="section-kicker">Reference collection</p><h1>Objects</h1><p>Flags, rockets, identity papers, and prints. Material evidence can illuminate the war, but it must still be read critically.</p></header><CatalogIndex records={objects} fixedKind="objects" /></main>; }

