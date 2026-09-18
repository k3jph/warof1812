"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { EventRecord } from "@/lib/content";

const filters = ["All", "Canada / Great Lakes", "Old Northwest", "Atlantic / Naval", "Chesapeake", "Gulf", "Diplomacy"];
const W = 1000, H = 620, minLon = -155, maxLon = 10, minLat = -40, maxLat = 65;
const project = (lon: number, lat: number) => ({ x: ((lon - minLon) / (maxLon - minLon)) * W, y: ((maxLat - lat) / (maxLat - minLat)) * H });
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const chronology = (event: EventRecord) => event.year * 10000 + Math.max(0, months.findIndex((month) => event.date.includes(month)) + 1) * 100 + (Number(event.date.match(/^\d{1,2}/)?.[0]) || 0);
const matches = (event: EventRecord, filter: string) => filter === "All" ||
  (filter === "Canada / Great Lakes" && /Great Lakes|Niagara|Lake Champlain/.test(event.theater)) ||
  (filter === "Old Northwest" && event.theater === "Old Northwest") ||
  (filter === "Atlantic / Naval" && (event.theater === "Atlantic" || event.theater === "Pacific" || event.type === "naval")) ||
  event.theater === filter || event.type === filter.toLowerCase();

export function MapExplorer({ events }: { events: EventRecord[] }) {
  const ordered = useMemo(() => [...events].sort((a, b) => chronology(a) - chronology(b) || events.indexOf(a) - events.indexOf(b)), [events]);
  const [step, setStep] = useState(ordered.length - 1);
  const [filter, setFilter] = useState("All");
  const [playing, setPlaying] = useState(false);
  const [selectedId, setSelectedId] = useState(ordered.at(-1)?.id ?? "");
  useEffect(() => { if (!playing) return; const timer = window.setInterval(() => setStep((current) => current >= ordered.length - 1 ? 0 : current + 1), 900); return () => window.clearInterval(timer); }, [playing, ordered.length]);
  const current = ordered[step];
  const visible = ordered.slice(0, step + 1).filter((event) => matches(event, filter));
  const selected = visible.find((event) => event.id === selectedId) ?? visible.at(-1) ?? current;
  return <div className="map-explorer">
    <div className="map-controls"><div className="map-time-control"><button className="map-play" onClick={() => setPlaying((value) => !value)} aria-label={playing ? "Pause chronology" : "Play chronology"}>{playing ? "Pause" : "Play"}</button><div><span className="map-year">{current?.date}</span><label htmlFor="event-range">Event {step + 1} of {ordered.length}</label><input id="event-range" type="range" min="0" max={ordered.length - 1} value={step} onChange={(e) => { setStep(Number(e.target.value)); setPlaying(false); }} /></div></div><div className="filter-row" aria-label="Filter map by theater">{filters.map((name) => <button key={name} className={filter === name ? "active" : ""} onClick={() => setFilter(name)}>{name}</button>)}</div></div>
    <div className="war-map"><svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby="map-title map-desc"><title id="map-title">War of 1812 events through {current?.date}</title><desc id="map-desc">Generalized geographic locations for {visible.length} events. Select a point for its record.</desc><rect width={W} height={H} className="map-water" /><g className="map-graticule">{[-120,-90,-60,-30,0].map((lon) => { const p=project(lon,0); return <line key={`lon-${lon}`} x1={p.x} x2={p.x} y1="0" y2={H} />; })}{[-20,0,20,40,60].map((lat) => { const p=project(0,lat); return <line key={`lat-${lat}`} x1="0" x2={W} y1={p.y} y2={p.y} />; })}</g><g className="map-land"><path d="M95 72 L244 30 404 58 507 129 562 155 546 210 497 250 472 307 424 340 367 331 331 294 270 276 240 226 177 193 137 138 Z"/><path d="M420 343 L480 365 521 430 500 505 454 608 416 560 397 470 374 410 Z"/><path d="M904 83 L1000 83 1000 325 952 304 912 254 873 206 856 139 Z"/><path d="M275 167 L319 149 350 168 332 193 294 196 Z" className="map-lakes" /></g><g className="map-labels"><text x="310" y="220">NORTH AMERICA</text><text x="432" y="465">SOUTH AMERICA</text><text x="870" y="168">EUROPE</text><text x="705" y="310">ATLANTIC</text><text x="60" y="345">PACIFIC</text></g><g>{visible.map((event) => { const p=project(event.longitude,event.latitude); return <circle key={event.id} tabIndex={0} role="button" aria-label={`${event.date}: ${event.title}, ${event.place}`} onClick={() => setSelectedId(event.id)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setSelectedId(event.id); }} className={`map-dot type-${event.type} ${selected?.id === event.id ? "selected" : ""}`} cx={p.x} cy={p.y} r={selected?.id === event.id ? 9 : 6}><title>{event.date}: {event.title}</title></circle>; })}</g></svg></div>
    <p className="map-note">Coordinates identify a site, city, or broad region—not a troop route or a claim of exact position at sea. Each event record states its precision.</p>
    {selected && <article className="map-selected"><div><time>{selected.date}</time><span>{selected.theater} · {selected.coordinatePrecision} coordinate</span><h2>{selected.title}</h2><p>{selected.summary}</p></div><Link className="primary-action" href={`/events/${selected.id}`}>Open event record <span>→</span></Link></article>}
    <div className="map-event-list" aria-label="Visible events">{visible.map((event) => <article key={event.id}><time>{event.date}</time><h3><Link href={`/events/${event.id}`}>{event.title}</Link></h3><p>{event.place} · {event.theater}</p></article>)}</div>
  </div>;
}
