import { sourceById } from "@/lib/content";

export function SourceList({ ids, heading = "Sources for this chapter" }: { ids: string[]; heading?: string }) {
  return (
    <section className="source-list" aria-labelledby="sources-heading">
      <p className="section-kicker">Follow the evidence</p>
      <h2 id="sources-heading">{heading}</h2>
      <ol>
        {ids.map((id) => {
          const source = sourceById[id];
          if (!source) return null;
          return (
            <li key={id} id={`source-${id}`}>
              <a href={source.url} target="_blank" rel="noreferrer">{source.title}</a>
              <span>{source.institution} · {source.type}</span>
              <p>{source.note}</p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

