import Link from "@/components/SafeLink";
import { allCatalogRecords } from "@/lib/catalog";

export function RelatedRecords({ chapter, narrativeText }: { chapter: string; narrativeText: string }) {
  const chapterText = narrativeText.toLowerCase();
  const records = allCatalogRecords.filter((record) => {
    if (record.chapter !== chapter || record.recordDepth === "index") return false;
    if (record.kind !== "people") return true;
    return [record.name, ...(record.aliases ?? [])].some((name) => chapterText.includes(name.toLowerCase()));
  });
  if (!records.length) return null;
  return (
    <section className="related-records">
      <p className="section-kicker">Keep following the evidence</p>
      <h2>People, places, ships, and objects</h2>
      <div>{records.map((record) => <Link href={`/${record.kind}/${record.slug}`} key={`${record.kind}-${record.slug}`}><span>{record.kind}</span><strong>{record.name}</strong><small>{record.role}</small></Link>)}</div>
    </section>
  );
}
