import Link from "@/components/SafeLink";
import { allCatalogRecords } from "@/lib/catalog";

const records = allCatalogRecords
  .filter((record) => record.name.length > 4)
  .sort((a, b) => b.name.length - a.name.length);
const byName = new Map(records.map((record) => [record.name.toLowerCase(), record]));
const escaped = records.map((record) => record.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
const pattern = new RegExp(`(${escaped.join("|")})`, "gi");

export function LinkedText({ text }: { text: string }) {
  return text.split(pattern).map((part, index) => {
    const record = byName.get(part.toLowerCase());
    return record ? <Link className="narrative-link" href={`/${record.kind}/${record.slug}`} key={`${part}-${index}`}>{part}</Link> : part;
  });
}

