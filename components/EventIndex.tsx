"use client";

import Link from "@/components/SafeLink";
import { useState } from "react";
import type { EventRecord } from "@/lib/content";

export function EventIndex({ events }: { events: EventRecord[] }) {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState("All");
  const kinds = ["All", ...Array.from(new Set(events.map((event) => event.type)))];
  const visible = events.filter((event) => (kind === "All" || event.type === kind) && `${event.title} ${event.place} ${event.theater} ${event.summary}`.toLowerCase().includes(query.toLowerCase()));
  return (
    <div>
      <div className="explore-controls">
        <label><span>Search events</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try Baltimore, lake, treaty…" /></label>
        <label><span>Event type</span><select value={kind} onChange={(event) => setKind(event.target.value)}>{kinds.map((item) => <option key={item}>{item}</option>)}</select></label>
      </div>
      <p className="result-count">{visible.length} records</p>
      <div className="event-grid">
        {visible.map((event) => (
          <article key={event.id}>
            <div className="event-meta"><span>{event.type}</span><time>{event.date}</time></div>
            <h2><Link href={`/events/${event.id}`}>{event.title}</Link></h2>
            <p className="event-place">{event.place} · {event.theater}</p>
            <p>{event.summary}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
