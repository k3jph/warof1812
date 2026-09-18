import type { Metadata } from "next";
import { HumanRecordIndex } from "@/components/HumanRecordIndex";
import { people } from "@/lib/catalog";
import { humanIndexRecords } from "@/lib/human-record";
export const metadata: Metadata = { title: "The Human Record", description: "Hundreds of named people connected by events, units, places, relationships, identity confidence, and the unequal workings of the archive." };
export default function Page() { return <main id="main" className="people-lab"><header className="people-lab-header"><div><p className="section-kicker">Prosopography · the human record</p><h1>Who enters<br />the archive?</h1></div><p>Search {people.length} named records. Follow shared events, geographic movement, allegiance, units, family and business networks, and the evidence supporting each identity match. Then ask why the name survived at all.</p></header><HumanRecordIndex records={people} human={humanIndexRecords} /></main>; }
