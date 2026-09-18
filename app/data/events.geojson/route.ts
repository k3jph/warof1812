import { events } from "@/lib/content";

export async function GET() {
  const features = events.map((event) => ({ type: "Feature", id: event.id, geometry: { type: "Point", coordinates: [event.longitude, event.latitude] }, properties: { date: event.date, year: event.year, title: event.title, place: event.place, theater: event.theater, eventType: event.type, summary: event.summary, outcome: event.outcome, significance: event.significance, participants: event.participants, coordinatePrecision: event.coordinatePrecision, chapter: event.chapter, sourceRefs: event.sourceRefs, url: `/events/${event.id}` } }));
  return Response.json({ type: "FeatureCollection", title: "1812: The Whole Story — Events", coordinateNote: "Points identify a site, city, or broad region at the stated precision; they do not reconstruct routes or exact positions at sea.", features }, { headers: { "Content-Disposition": "attachment; filename=1812-events.geojson", "Cache-Control": "public, max-age=300" } });
}
