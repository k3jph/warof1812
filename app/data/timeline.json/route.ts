import { events } from "@/lib/content";

export async function GET() {
  const records = events.map(({ x: displayX, y: displayY, ...event }) => {
    void displayX;
    void displayY;
    return { ...event, storyUrl: `/story/${event.chapter}`, eventUrl: `/events/${event.id}` };
  });
  return Response.json({ title: "1812: The Whole Story – Timeline", generatedFrom: "/timeline", ordering: "Narrative chronology; date labels preserve ranges and approximate years.", recordCount: records.length, records }, { headers: { "Content-Disposition": "attachment; filename=1812-timeline.json", "Cache-Control": "public, max-age=300" } });
}
