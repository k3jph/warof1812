import { imageLedger } from "@/lib/images";
export async function GET() { return Response.json({ title: "1812: The Whole Story — Image rights ledger", recordCount: imageLedger.length, records: imageLedger }, { headers: { "Content-Disposition": "attachment; filename=1812-image-rights.json", "Cache-Control": "public, max-age=300" } }); }
