import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { EventIndex } from "@/components/EventIndex";
import { events } from "@/lib/content";

export const metadata: Metadata = pageMetadata("/events", "Events", "Browse the structured event record of the War of 1812.");
export default function EventsPage() { return <main id="main" className="page-shell"><header className="page-title"><p className="section-kicker">Reference collection</p><h1>Events</h1><p>{events.length} moments that move the war, from political rupture and raids to naval actions, occupations, battles, and peace.</p></header><EventIndex events={events} /></main>; }
