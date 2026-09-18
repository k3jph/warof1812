"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { baltimoreMoments, baltimoreSites, type BaltimoreYear } from "@/lib/baltimore";

export function BaltimoreExhibition() {
  const [year, setYear] = useState<BaltimoreYear>("1812");
  const sites = useMemo(() => baltimoreSites.filter((site) => site.year === year || site.year === "both"), [year]);
  const [selectedId, setSelectedId] = useState("gay-street");
  const selected = sites.find((site) => site.id === selectedId) ?? sites[0];
  const changeYear = (next: BaltimoreYear) => { setYear(next); setSelectedId(next === "1812" ? "gay-street" : "hampstead-hill"); };
  return <>
    <section className={`baltimore-city-layer year-${year}`} aria-labelledby="city-layer-title">
      <header><div><p className="section-kicker">The same city, differently organized</p><h2 id="city-layer-title">Baltimore on the ground</h2></div><div className="baltimore-year-switch" aria-label="Choose a Baltimore year"><button className={year === "1812" ? "active" : ""} aria-pressed={year === "1812"} onClick={() => changeYear("1812")}><strong>1812</strong><span>Civic violence</span></button><button className={year === "1814" ? "active" : ""} aria-pressed={year === "1814"} onClick={() => changeYear("1814")}><strong>1814</strong><span>City defense</span></button></div></header>
      <div className="baltimore-map-layout"><div className="baltimore-map" role="group" aria-label={`Schematic Baltimore city layer showing ${sites.length} sites for ${year}`}><div className="harbor-shape" aria-hidden="true" /><div className="street-grid" aria-hidden="true" /><span className="map-word city-word">CITY</span><span className="map-word harbor-word">HARBOR</span>{sites.map((site) => <button key={site.id} className={`baltimore-site-dot ${selected?.id === site.id ? "selected" : ""}`} style={{ left: `${site.x}%`, top: `${site.y}%` }} onClick={() => setSelectedId(site.id)} aria-label={`${site.name}: ${site.kicker}`}><span>{site.id === "battle-monument" ? "M" : ""}</span></button>)}</div>
        <article className="baltimore-site-card"><p>{selected.kicker}</p><h3>{selected.name}</h3><p>{selected.copy}</p><span>{selected.precision}</span>{selected.href && <Link href={selected.href}>Open the connected record →</Link>}</article></div>
      <p className="baltimore-map-note">This interpretive city layer shows relationships, not a surveyed historical basemap. Every point states its precision; vanished addresses are not presented as surviving buildings.</p>
    </section>
    <section className="baltimore-chronology" aria-labelledby="chronology-title"><header><p className="section-kicker">Sequence changes meaning</p><h2 id="chronology-title">What happened in {year}</h2><p>{year === "1812" ? "The violence developed through decisions: intimidation, armed defense, negotiated custody, and a second official failure." : "The defense worked as a system: warning, delay, fortification, harbor resistance, and withdrawal."}</p></header><ol>{baltimoreMoments[year].map((moment) => <li key={`${moment.time}-${moment.title}`}><time>{moment.time}</time><div><h3>{moment.title}</h3><p>{moment.copy}</p><a href={`#source-${moment.source}`}>Evidence note ↓</a></div></li>)}</ol></section>
  </>;
}
