"use client";

import { useMemo, useState } from "react";
import Link from "@/components/SafeLink";
import type { EventRecord } from "@/lib/content";

const filters = ["All", "military", "naval", "political", "diplomatic", "Indigenous", "civilian", "Black history", "Chesapeake"];
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const chronology = (event: EventRecord) => event.year * 10000 + Math.max(0, months.findIndex((month) => event.date.includes(month)) + 1) * 100 + (Number(event.date.match(/^\d{1,2}/)?.[0]) || 0);
export function TimelineExplorer({ events }: { events: EventRecord[] }) {
  const [filter, setFilter] = useState("All");
  const shown = useMemo(() => events.filter((event) => filter === "All" || event.type.toLowerCase() === filter.toLowerCase() || (filter === "military" && ["battle","raid","occupation"].includes(event.type)) || (filter === "Chesapeake" && event.theater === "Chesapeake") || (filter === "Indigenous" && (event.type === "Indigenous" || event.participants.some((p) => /Indigenous|Muscogee|Creek|Choctaw|Tecumseh|Haudenosaunee|Cherokee/.test(p)))) || (filter === "Black history" && event.participants.some((p) => /Black|enslaved|free men of color|freedom seekers|Refugees|Colonial Marines/.test(p)))).sort((a,b) => chronology(a) - chronology(b)), [events, filter]);
  const grouped = shown.reduce<Record<string, EventRecord[]>>((acc, event) => { (acc[String(event.year)] ||= []).push(event); return acc; }, {});
  return <><div className="timeline-filters" aria-label="Filter timeline by event type">{filters.map((name) => <button key={name} className={filter === name ? "active" : ""} aria-pressed={filter === name} onClick={() => setFilter(name)}>{name}</button>)}</div><p className="result-count" aria-live="polite">Showing {shown.length} of {events.length} events</p><div className="timeline">{Object.entries(grouped).map(([year, items]) => <section key={year}><div className="timeline-year">{year}</div><div>{items.map((event) => <article key={event.id}><time>{event.date}</time><span className={`event-type type-${event.type}`}>{event.type}</span><h2><Link href={`/events/${event.id}`}>{event.title}</Link></h2><p className="event-place">{event.place} · {event.theater}</p><p>{event.summary}</p><p className="event-participants"><strong>Participants:</strong> {event.participants.join(" · ")}</p></article>)}</div></section>)}</div></>;
}
