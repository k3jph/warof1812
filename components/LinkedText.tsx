import Link from "@/components/SafeLink";
import { allCatalogRecords } from "@/lib/catalog";

const linkableRecords = allCatalogRecords.filter((record) => record.kind !== "people" || record.recordDepth === "dossier");
const linkTargets = linkableRecords.flatMap((record) => [record.name, ...(record.aliases ?? [])].map((phrase) => ({ phrase, record })))
  .filter(({ phrase }) => phrase.length > 4)
  .sort((a, b) => b.phrase.length - a.phrase.length);
const byName = new Map(linkTargets.map(({ phrase, record }) => [phrase.toLowerCase(), record]));
const escaped = linkTargets.map(({ phrase }) => phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
const pattern = new RegExp(`(${escaped.join("|")})`, "gi");

export function linkText(text: string, linkedRecords = new Set<string>()) {
  return text.split(pattern).map((part, index) => {
    const record = byName.get(part.toLowerCase());
    const recordKey = record ? `${record.kind}-${record.slug}` : "";
    if (!record || linkedRecords.has(recordKey)) return part;
    linkedRecords.add(recordKey);
    return <Link className="narrative-link" href={`/${record.kind}/${record.slug}`} key={`${part}-${index}`}>{part}</Link>;
  });
}

export function LinkedText({ text }: { text: string }) {
  return linkText(text);
}
