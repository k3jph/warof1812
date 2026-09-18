import Link from "next/link";
import { perspectivesForChapter } from "@/lib/perspectives";

export function PerspectiveThreads({ chapter }: { chapter: string }) {
  const paths = perspectivesForChapter(chapter);
  if (!paths.length) return null;
  return <aside className="perspective-threads"><div><p className="section-kicker">Change the question</p><h2>Read this chapter through another pathway</h2><p>The evidence stays put. The stakes and sequence change.</p></div><div>{paths.map(path=><Link href={`/perspectives/${path.slug}`} key={path.slug} style={{"--path-accent":path.accent} as React.CSSProperties}><span>{path.number}</span><strong>{path.title}</strong><small>{path.question}</small></Link>)}</div></aside>;
}
