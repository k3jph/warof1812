import type { Metadata } from "next";
import { CatalogIndex } from "@/components/CatalogIndex";
import { people } from "@/lib/catalog";
export const metadata: Metadata = { title: "People", description: "People who shaped, fought, endured, witnessed, and remembered the War of 1812." };
export default function Page() { return <main id="main" className="page-shell"><header className="page-title"><p className="section-kicker">Reference collection</p><h1>People</h1><p>Leaders and laborers, sailors and soldiers, diplomats and witnesses. No one record stands in for an entire community.</p></header><CatalogIndex records={people} fixedKind="people" /></main>; }

