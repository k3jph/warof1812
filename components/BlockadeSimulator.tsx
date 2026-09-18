"use client";

import { useMemo, useState } from "react";
import { blockadeRegions } from "@/lib/interactive-history";

const clamp = (value: number) => Math.max(0, Math.min(100, Math.round(value)));
export function BlockadeSimulator() {
  const [regionId, setRegionId] = useState("chesapeake");
  const [year, setYear] = useState(1814);
  const [pressure, setPressure] = useState(82);
  const [privateers, setPrivateers] = useState(58);
  const [smuggling, setSmuggling] = useState(26);
  const region = blockadeRegions.find((item) => item.id === regionId)!;
  const model = useMemo(() => {
    const maturity = year === 1812 ? .32 : year === 1813 ? .65 : .96;
    const effective = pressure * maturity * region.exposure;
    const evasion = smuggling * .24 + privateers * .06;
    const shipping = clamp(100 - effective * .78 + evasion);
    const customs = clamp(shipping * .78 * region.customs);
    const insurance = clamp(18 + effective * .86 - smuggling * .08);
    const availability = clamp(100 - effective * .58 + smuggling * .35);
    const finance = clamp(38 + (100 - customs) * .52 + effective * .12);
    const incentive = clamp(20 + effective * .45 + (100 - shipping) * .18);
    const vulnerability = clamp(15 + effective * .66 - privateers * .05);
    return { shipping, customs, insurance, availability, finance, incentive, vulnerability, effective:clamp(effective) };
  }, [region, year, pressure, privateers, smuggling]);
  const rows = [
    ["Shipping volume", model.shipping, "more is better", "Merchant sailings that can still be attempted with acceptable risk."],
    ["Customs revenue", model.customs, "more is better", "The federal government depends heavily on duties collected from overseas trade."],
    ["Insurance cost", model.insurance, "more is worse", "Capture risk becomes a price long before a ship is actually taken."],
    ["Commodity availability", model.availability, "more is better", "Imports, coastal movement, and local substitutes shape what reaches markets."],
    ["Federal finance strain", model.finance, "more is worse", "Falling customs receipts compound the cost of raising and sustaining forces."],
    ["Privateering incentive", model.incentive, "higher is stronger", "Scarcer ordinary trade and valuable prizes can redirect capital and labor toward armed cruising."],
    ["Coastal vulnerability", model.vulnerability, "more is worse", "Naval presence can become raiding, intelligence gathering, occupation, and support for freedom seeking."],
  ] as const;
  return <div className="blockade-workbench">
    <section className="sim-controls"><div><p className="section-kicker">Constrained scenario</p><h1>Blockade pressure</h1><p>Adjust naval pressure and the responses available to merchants. Every output is an index, not a recovered historical statistic.</p></div><label>Region<select value={regionId} onChange={(event) => setRegionId(event.target.value)}>{blockadeRegions.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}</select></label><label>Campaign year<select value={year} onChange={(event) => setYear(Number(event.target.value))}><option>1812</option><option>1813</option><option>1814</option></select></label><Range label="British naval pressure" value={pressure} onChange={setPressure} /><Range label="Privateering effort" value={privateers} onChange={setPrivateers} /><Range label="Smuggling and evasion" value={smuggling} onChange={setSmuggling} /></section>
    <section className="sim-results"><header><div><span>Effective blockade</span><b>{model.effective}</b></div><p>{region.note}</p></header><div className="sim-bars">{rows.map(([label,value,direction,note]) => <article key={label}><div><h2>{label}</h2><span>{direction}</span></div><div className="sim-bar"><i style={{ width:`${value}%` }} /></div><b>{value}</b><p>{note}</p></article>)}</div></section>
    <aside className="model-note"><strong>What the model is doing</strong><p>Pressure is scaled by year and regional exposure. Evasion preserves some circulation; privateering responds to risk without reopening ordinary trade. The equations are deliberately inspectable and directional. They show why command of the sea could damage credit, revenue, employment, supply, and coastal security without producing a single famous fleet battle.</p></aside>
  </div>;
}

function Range({ label, value, onChange }: { label:string; value:number; onChange:(value:number)=>void }) { return <label className="sim-range"><span>{label}<b>{value}</b></span><input type="range" min="0" max="100" value={value} onChange={(event) => onChange(Number(event.target.value))} /></label>; }
