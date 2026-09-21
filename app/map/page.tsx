import type { Metadata } from "next";
import Link from "@/components/SafeLink";
import { pageMetadata } from "@/lib/metadata";
import { MapExplorer } from "@/components/MapExplorer";
import { events } from "@/lib/content";
import { gisFeatures, gisLayers, gisSources } from "@/lib/historical-gis";

export const metadata: Metadata = pageMetadata("/map", "Campaign Map", "An interpretive, time-aware War of 1812 campaign map with sourced routes, regions, events, uncertainty, and explicit off-frame records.");

const inPrimaryFrame = (longitude: number, latitude: number) =>
  longitude >= -100 && longitude <= -60 && latitude >= 9 && latitude <= 51;

export default async function MapPage({ searchParams }: { searchParams: Promise<{ event?: string | string[] }> }) {
  const { event } = await searchParams;
  const requestedEventId = typeof event === "string" ? event : "";
  const requestedEvent = events.find((item) => item.id === requestedEventId);
  const initialEventId = requestedEvent?.id ?? "";
  const initialOffFrame = Boolean(requestedEvent && !inPrimaryFrame(requestedEvent.longitude, requestedEvent.latitude));

  return <main id="main" className="page-shell map-page">
    <header className="page-title gis-page-title">
      <p className="section-kicker">The war as contested geography</p>
      <h1>Campaign map</h1>
      <p>The war does not happen on one frontier or on an empty map. Move through time, combine interpretive layers, inspect uncertainty, and ask what any mapped place meant then.</p>
      {initialOffFrame && requestedEvent && <aside className="gis-deep-link-status" aria-live="polite">
        <span>Selected beyond the primary frame</span>
        <strong>{requestedEvent.title}</strong>
        <small>{requestedEvent.date} · {requestedEvent.place}</small>
        <div><a href="#selected-map-event">Jump to the selected event record ↓</a><Link href={`/events/${requestedEvent.id}`}>Open full event →</Link></div>
      </aside>}
      <div className="gis-statline"><span><b>{gisFeatures.length}</b> spatial records</span><span><b>{gisLayers.length}</b> evidence layers</span><span><b>{gisSources.length}</b> source families</span><span><b>1812–1817</b> time-aware</span></div>
    </header>
    <MapExplorer events={events} initialEventId={initialEventId} />
  </main>;
}
