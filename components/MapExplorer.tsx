"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { EventRecord } from "@/lib/content";

const filters = ["All", "Great Lakes", "Chesapeake", "Gulf", "Atlantic", "Pacific", "Diplomacy"];

export function MapExplorer({ events }: { events: EventRecord[] }) {
  const years = [1807, 1811, 1812, 1813, 1814, 1815, 1817];
  const [yearIndex, setYearIndex] = useState(5);
  const [filter, setFilter] = useState("All");
  const year = years[yearIndex];
  const visible = useMemo(() => events.filter((event) => event.year <= year && (filter === "All" || event.theater.includes(filter))), [events, filter, year]);
  const latest = [...visible].reverse().slice(0, 8);
  return (
    <div className="map-explorer">
      <div className="map-controls">
        <div>
          <span className="map-year">{year}</span>
          <label htmlFor="year-range">Move through the war</label>
          <input id="year-range" type="range" min="0" max={years.length - 1} value={yearIndex} onChange={(e) => setYearIndex(Number(e.target.value))} />
        </div>
        <div className="filter-row" aria-label="Filter map by theater">
          {filters.map((name) => <button key={name} className={filter === name ? "active" : ""} onClick={() => setFilter(name)}>{name}</button>)}
        </div>
      </div>
      <div className="war-map" aria-label={`Schematic map showing ${visible.length} events through ${year}`}>
        <div className="map-grid" aria-hidden="true" />
        <span className="region-label atlantic-label">ATLANTIC</span>
        <span className="region-label lakes-label">GREAT LAKES</span>
        <span className="region-label gulf-label">GULF</span>
        <span className="region-label pacific-label">PACIFIC</span>
        {visible.map((event) => (
          <Link key={event.id} href={`/story/${event.chapter}`} className={`map-point type-${event.type}`} style={{ left: `${event.x}%`, top: `${event.y}%` }} title={`${event.date}: ${event.title}`}>
            <span className="sr-only">{event.date}: {event.title}, {event.place}</span>
          </Link>
        ))}
      </div>
      <p className="map-note">A schematic strategic view, not a territorial map. Points are generalized to keep the continental scale legible; the event list below is the accessible equivalent.</p>
      <div className="map-event-list">
        {latest.map((event) => (
          <article key={event.id}>
            <time>{event.date}</time>
            <h3><Link href={`/story/${event.chapter}`}>{event.title}</Link></h3>
            <p>{event.summary}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

