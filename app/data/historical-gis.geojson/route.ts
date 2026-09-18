import { historicalGeoJson } from "@/lib/historical-gis";

export async function GET() {
  return Response.json(historicalGeoJson, { headers: { "Content-Disposition": "attachment; filename=1812-historical-gis.geojson", "Cache-Control": "public, max-age=300" } });
}
