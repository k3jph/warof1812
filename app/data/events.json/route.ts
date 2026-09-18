import { events } from "@/lib/content";

export async function GET() {
  const records = events.map(({ x: displayX, y: displayY, ...event }) => {
    void displayX;
    void displayY;
    return { ...event, url: `/events/${event.id}` };
  });
  return Response.json({ title: "1812: The Whole Story — Events", generatedFrom: "/data", coordinateNote: "Latitude and longitude locate a documented site, city, or broad region at the stated precision; they do not reconstruct routes.", recordCount: records.length, records }, { headers: { "Content-Disposition": "attachment; filename=1812-events.json", "Cache-Control": "public, max-age=300" } });
}
