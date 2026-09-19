"use client";

import { useMemo, useState } from "react";
import Link from "@/components/SafeLink";
import { clockLayers, communicationRoutes, warClockEntries, type ClockLayer } from "@/lib/interactive-history";

const DAY = 86400000;
const iso = (date: Date) => date.toISOString().slice(0, 10);
const dayDistance = (a: string, b: string) => Math.round((new Date(`${a}T12:00:00Z`).getTime() - new Date(`${b}T12:00:00Z`).getTime()) / DAY);
const pretty = (value: string) => new Intl.DateTimeFormat("en-US", { day:"numeric", month:"long", year:"numeric", timeZone:"UTC" }).format(new Date(`${value}T12:00:00Z`));

const presets = [
  ["Declaration", "1812-06-18"],
  ["Detroit", "1812-08-16"],
  ["Washington", "1814-08-24"],
  ["Baltimore", "1814-09-13"],
  ["Ghent", "1814-12-24"],
  ["New Orleans", "1815-01-08"],
  ["Ratification", "1815-02-17"],
] as const;

export function WarClock() {
  const [date, setDate] = useState("1814-12-24");
  const [active, setActive] = useState<ClockLayer[]>(clockLayers.map((layer) => layer.id));
  const [routeId, setRouteId] = useState("ghent-washington");
  const [conditions, setConditions] = useState<"best" | "typical" | "severe">("typical");
  const route = communicationRoutes.find((item) => item.id === routeId)!;
  const delay = route[conditions];
  const arrival = iso(new Date(new Date(`${date}T12:00:00Z`).getTime() + delay * DAY));
  const selected = useMemo(() => warClockEntries.filter((entry) => entry.date === date && active.includes(entry.layer)), [date, active]);
  const nearby = useMemo(() => warClockEntries.filter((entry) => active.includes(entry.layer)).map((entry) => ({ ...entry, distance: dayDistance(entry.date, date) })).filter((entry) => Math.abs(entry.distance) <= 30 && entry.distance !== 0).sort((a,b) => Math.abs(a.distance) - Math.abs(b.distance)).slice(0, 8), [date, active]);
  const unknownAtDestination = useMemo(() => warClockEntries.filter((entry) => entry.date <= date && entry.date > iso(new Date(new Date(`${date}T12:00:00Z`).getTime() - delay * DAY))).filter((entry) => active.includes(entry.layer)).slice(-6), [date, delay, active]);

  function toggle(layer: ClockLayer) {
    setActive((current) => current.includes(layer) ? current.filter((item) => item !== layer) : [...current, layer]);
  }

  return (
    <div className="clock-workbench">
      <section className="clock-controls" aria-label="War clock controls">
        <div className="clock-date-control">
          <label htmlFor="clock-date">Select any day</label>
          <input id="clock-date" type="date" min="1807-01-01" max="1818-12-31" value={date} onChange={(event) => setDate(event.target.value)} />
          <strong>{pretty(date)}</strong>
        </div>
        <div className="clock-presets" aria-label="Significant date presets">{presets.map(([label, value]) => <button className={date === value ? "active" : ""} key={value} onClick={() => setDate(value)}>{label}<span>{value}</span></button>)}</div>
        <fieldset className="clock-layer-control"><legend>Visible records</legend>{clockLayers.map((layer) => <label key={layer.id} style={{ "--layer": layer.color } as React.CSSProperties}><input type="checkbox" checked={active.includes(layer.id)} onChange={() => toggle(layer.id)} /><i />{layer.label}</label>)}</fieldset>
      </section>

      <section className="clock-now" aria-live="polite">
        <header><div><p className="section-kicker">What is happening</p><h2>{pretty(date)}</h2></div><span>{selected.length} exact-date {selected.length === 1 ? "record" : "records"}</span></header>
        {selected.length ? <div className="clock-exact-grid">{selected.map((entry) => <article key={entry.id} style={{ "--layer": clockLayers.find((item) => item.id === entry.layer)?.color } as React.CSSProperties}><span>{entry.layer}</span><p>{entry.place}</p><h3>{entry.title}</h3><p>{entry.summary}</p>{entry.href && <Link href={entry.href}>Open connected record →</Link>}</article>)}</div> : <div className="clock-empty"><b>No exact-date record in this edition.</b><p>That is not a claim that nothing happened. It marks the current limit of the project’s dated corpus. Nearby records remain visible below.</p></div>}
        <div className="clock-nearby"><p>Within thirty days</p>{nearby.map((entry) => <article key={entry.id}><time>{entry.distance < 0 ? `${Math.abs(entry.distance)} days before` : `${entry.distance} days after`}</time><i style={{ background: clockLayers.find((item) => item.id === entry.layer)?.color }} /><div><strong>{entry.title}</strong><span>{entry.place} · {entry.layer}</span></div></article>)}</div>
      </section>

      <section className="knowledge-lag">
        <header><p className="section-kicker">Knowledge horizon</p><h2>What has happened but may not be known?</h2><p>Choose a route and conditions. The shaded window is not a precise delivery prediction; it makes information latency visible.</p></header>
        <div className="lag-controls">
          <label>Route<select value={routeId} onChange={(event) => setRouteId(event.target.value)}>{communicationRoutes.map((item) => <option value={item.id} key={item.id}>{item.from} → {item.to}</option>)}</select></label>
          <label>Conditions<select value={conditions} onChange={(event) => setConditions(event.target.value as typeof conditions)}><option value="best">Fast favorable passage</option><option value="typical">Typical estimate</option><option value="severe">Severe delay</option></select></label>
        </div>
        <div className="lag-readout"><div><span>Depart</span><b>{pretty(date)}</b><small>{route.from}</small></div><i><span style={{ width: `${Math.min(100, delay / 70 * 100)}%` }} /></i><div><span>Estimated arrival</span><b>{pretty(arrival)}</b><small>{route.to} · about {delay} days</small></div></div>
        <p className="lag-method"><strong>{route.method}.</strong> Main constraints: {route.constraint}.</p>
        <div className="unknown-list"><h3>Events inside the possible knowledge gap</h3>{unknownAtDestination.length ? unknownAtDestination.map((entry) => <article key={entry.id}><time>{pretty(entry.date)}</time><div><strong>{entry.title}</strong><p>Already true at {entry.place}; not necessarily known at {route.to}.</p></div></article>) : <p>No corpus events fall inside this particular window.</p>}</div>
      </section>
    </div>
  );
}
