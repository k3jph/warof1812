import type { Metadata } from "next";
import { CatalogIndex } from "@/components/CatalogIndex";
import { ships } from "@/lib/catalog";
export const metadata: Metadata = { title: "Ships", description: "Atlantic frigates and inland warships of the War of 1812." };
export default function Page() { return <main id="main" className="page-shell"><header className="page-title"><p className="section-kicker">Reference collection</p><h1>Ships</h1><p>Ocean-going frigates and fresh-water flagships: weapons, workplaces, symbols, and mobile pieces of larger supply systems.</p></header><CatalogIndex records={ships} fixedKind="ships" /></main>; }

