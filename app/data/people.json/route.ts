import { people } from "@/lib/catalog";

export async function GET() {
  const records = people.map((person) => ({ ...person, url: `/people/${person.slug}`, storyUrl: `/story/${person.chapter}` }));
  return Response.json({ title: "1812: The Whole Story — People", generatedFrom: "/people", recordCount: records.length, records }, { headers: { "Content-Disposition": "attachment; filename=1812-people.json", "Cache-Control": "public, max-age=300" } });
}
