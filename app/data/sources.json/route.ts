import { sources } from "@/lib/content";
import { sourceGroups } from "@/lib/source-guide";

export async function GET() {
  return Response.json({ title: "1812: The Whole Story — Sources", generatedFrom: "/sources", outwardLinking: "Deliberate: source URLs lead readers to repositories and item records beyond this site.", recordCount: sources.length, records: sources, categories: sourceGroups }, { headers: { "Content-Disposition": "attachment; filename=1812-sources.json", "Cache-Control": "public, max-age=300" } });
}
