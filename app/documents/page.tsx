import type { Metadata } from "next";
import Link from "@/components/SafeLink";
import { CatalogIndex } from "@/components/CatalogIndex";
import { documents } from "@/lib/catalog";
export const metadata: Metadata = { title: "Documents", description: "Documents that declared, described, contested, and ended the War of 1812." };
export default function Page() { return <main id="main" className="page-shell"><header className="page-title"><p className="section-kicker">Reference collection</p><h1>Documents</h1><p>War messages, statutes, newspapers, dispatches, proclamations, treaties, and lyrics–the words through which the war became policy and memory.</p></header><aside className="documents-edition-door"><div><p className="section-kicker">Read beyond the catalogue</p><h2>Nineteen edited source packets</h2><p>Compare diplomatic and modernized readings, follow annotations and provenance, set official accounts against counter-records, and export citations.</p></div><Link className="primary-action" href="/edition">Open the documentary edition <span>→</span></Link></aside><CatalogIndex records={documents} fixedKind="documents" /></main>; }
