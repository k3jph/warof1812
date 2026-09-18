"use client";

import { useState } from "react";
import Link from "next/link";
import type { EventRecord } from "@/lib/content";

export function ExploreIndex({ events }: { events: EventRecord[] }) {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState("All");
  const kinds = ["All", ...Array.from(new Set(events.map((event) => event.type)))];
  const visible = events.filter((event) => (kind === "All" || event.type === kind) && `${event.title} ${event.place} ${event.summary}`.toLowerCase().includes(query.toLowerCase()));
  return (
    <div>
      <div className="explore-controls">
        <label><span>Search the event corpus</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Try Baltimore, lake, treaty…" /></label>
        <label><span>Event type</span><select value={kind} onChange={(e) => setKind(e.target.value)}>{kinds.map((item) => <option key={item}>{item}</option>)}</select></label>
      </div>
      <p className="result-count">{visible.length} records</p>
      <div className="event-grid">
        {visible.map((event) => (
          <article key={event.id}>
            <div className="event-meta"><span>{event.type}</span><time>{event.date}</time></div>
            <h2><Link href={`/story/${event.chapter}`}>{event.title}</Link></h2>
            <p className="event-place">{event.place} · {event.theater}</p>
            <p>{event.summary}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

