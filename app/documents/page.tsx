import type { Metadata } from "next";
import { CatalogIndex } from "@/components/CatalogIndex";
import { documents } from "@/lib/catalog";
export const metadata: Metadata = { title: "Documents", description: "Documents that declared, described, contested, and ended the War of 1812." };
export default function Page() { return <main id="main" className="page-shell"><header className="page-title"><p className="section-kicker">Reference collection</p><h1>Documents</h1><p>War messages, statutes, newspapers, dispatches, proclamations, treaties, and lyrics—the words through which the war became policy and memory.</p></header><CatalogIndex records={documents} fixedKind="documents" /></main>; }

