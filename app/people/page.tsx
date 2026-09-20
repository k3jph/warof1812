import type { Metadata } from "next";
import { HumanRecordIndex } from "@/components/HumanRecordIndex";
import { curatedPeople, people } from "@/lib/catalog";
import { humanIndexRecords } from "@/lib/human-record";
export const metadata: Metadata = { title: "People", description: "Twenty-four curated person dossiers and a larger research index of names connected to the War of 1812." };
export default function Page() { return <main id="main" className="people-lab"><header className="people-lab-header"><div><p className="section-kicker">Curated dossiers · research index</p><h1>Who enters<br />the archive?</h1></div><p>This collection contains {curatedPeople.length} person-specific dossiers and {humanIndexRecords.length} index-only research leads. Dossiers contain individualized biographical claims. Index entries preserve names and group-level routes for further research without assigning personal movements, allegiances, events, relationships, or confidence labels.</p></header><HumanRecordIndex records={people} human={humanIndexRecords} /></main>; }
