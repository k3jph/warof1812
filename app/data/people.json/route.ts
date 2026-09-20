import { curatedPeople } from "@/lib/catalog";
import { humanIndexRecords } from "@/lib/human-record";

export async function GET() {
  const dossiers = curatedPeople.map((person) => ({ ...person, recordType:"curated-dossier" as const, url:`/people/${person.slug}`, storyUrl:person.chapter ? `/story/${person.chapter}` : null }));
  const researchIndex = humanIndexRecords.map((person) => ({
    slug:person.slug,
    name:person.name,
    aliases:person.aliases,
    recordType:"research-index" as const,
    group:person.group,
    role:person.role,
    scopeNote:person.scopeNote,
    sourceRefs:person.sourceRefs,
    url:`/people/${person.slug}`,
    personSpecificMetadata:false,
  }));
  return Response.json({
    title:"1812: The Whole Story: People",
    generatedFrom:"/people",
    description:"The collection contains curated person-specific dossiers and a separate research index. Index entries preserve names and group-level research routes without asserting individual movements, allegiances, events, relationships, chapter associations, or confidence judgments.",
    recordCount:dossiers.length + researchIndex.length,
    counts:{ curatedDossiers:dossiers.length, researchIndex:researchIndex.length },
    curatedDossiers:dossiers,
    researchIndex,
  }, { headers: { "Content-Disposition": "attachment; filename=1812-people.json", "Cache-Control": "public, max-age=300" } });
}
