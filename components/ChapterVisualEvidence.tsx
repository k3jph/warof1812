import Link from "@/components/SafeLink";

type VisualItem = {
  kind: string;
  title: string;
  note: string;
  href: string;
  external?: boolean;
};

const evidence: Record<string, VisualItem[]> = {
  "baltimore-at-war-with-itself": [
    { kind: "Historic print", title: "The jail attack in public memory", note: "A later print of the assault, shown with an account that separates the image from the documented sequence.", href: "https://www.nps.gov/articles/baltimore-riots.htm", external: true },
    { kind: "City record", title: "Baltimore directories", note: "Addresses, occupations, businesses, and the physical city behind the political narrative.", href: "https://msa.maryland.gov/bca/baltimore-city-directories/index.html", external: true },
    { kind: "Document object", title: "The 1812 riot pamphlet", note: "Read the title page, survivor testimony, provenance, and partisan counterpoint together.", href: "/edition/baltimore-riot-narrative" }
  ],
  "easy-conquest-that-wasnt": [
    { kind: "Fort plan", title: "Detroit and Fort Lernoult", note: "The 1792 plan makes the fort, settlement, river, and approach legible as an operational system.", href: "https://www.heritagetrust.on.ca/exhibits/ontarios-military-heritage-1-2", external: true },
    { kind: "Later image", title: "The death of Brock", note: "A nineteenth-century image of Queenston Heights that records later memory as much as the 1812 battle.", href: "https://www.heritagetrust.on.ca/exhibits/ontarios-military-heritage-1-2", external: true },
    { kind: "Interactive map", title: "Water, supply, and the border", note: "Open the map to compare posts, routes, waterways, Indigenous geographies, and dated events.", href: "/map" }
  ]
};

export function ChapterVisualEvidence({ chapter }: { chapter: string }) {
  const items = evidence[chapter];
  if (!items) return null;
  return (
    <aside className="chapter-visual-evidence">
      <header><p className="section-kicker">Read the material record</p><h2>Images, objects, and maps</h2><p>These records do explanatory work. Their captions identify what they document and what they reconstruct later.</p></header>
      <div>{items.map((item) => item.external ? <a href={item.href} target="_blank" rel="noreferrer" key={item.title}><span>{item.kind}</span><strong>{item.title}</strong><p>{item.note}</p><b>Open record ↗</b></a> : <Link href={item.href} key={item.title}><span>{item.kind}</span><strong>{item.title}</strong><p>{item.note}</p><b>Open in the project →</b></Link>)}</div>
    </aside>
  );
}
