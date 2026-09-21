"use client";

import { useMemo, useState } from "react";
import { lakeBases } from "@/lib/interactive-history";

const resources = ["timber","iron","guns","canvas","skilled labor","sailors","food","transport"] as const;
type Resource = typeof resources[number];
const labels: Record<Resource,string> = { timber:"Timber", iron:"Iron", guns:"Guns", canvas:"Canvas", "skilled labor":"Skilled labor", sailors:"Sailors", food:"Food", transport:"Transport capacity" };
const baseValues: Record<Resource,number> = { timber:58, iron:58, guns:63, canvas:67, "skilled labor":52, sailors:54, food:64, transport:64 };

export function LakeLogistics() {
  const [baseId, setBaseId] = useState("kingston");
  const [month, setMonth] = useState(6);
  const [values, setValues] = useState<Record<Resource,number>>(baseValues);
  const base = lakeBases.find((item) => item.id === baseId)!;
  const seasonFactor = [0,.28,.34,.48,.68,.9,1,.98,.92,.78,.56,.36,.28][month] * base.season;
  const scored = useMemo(() => {
    const weights: Record<Resource,number> = { timber:base.timber, iron:base.iron, guns:base.iron*.92, canvas:base.transport*.95, "skilled labor":base.labor, sailors:base.labor*.92, food:base.transport, transport:base.transport };
    return resources.map((key) => ({ key, score:Math.max(1, Math.round(values[key] * weights[key] * (key === "timber" || key === "skilled labor" ? .85 + seasonFactor*.15 : 1))) })).sort((a,b)=>a.score-b.score);
  }, [values, base, seasonFactor]);
  const bottleneck = scored[0];
  const readiness = Math.round(Math.pow(scored.reduce((product,item)=>product*item.score,1),1/scored.length) * (.62 + seasonFactor*.38));
  const hulls = Math.max(0,Math.floor((readiness - 30) / 16));
  const operational = Math.max(0,Math.floor((readiness - Math.max(42, bottleneck.score)) / 9));
  const over = Object.values(values).reduce((sum,item)=>sum+item,0) - 480;
  function setResource(key: Resource, value: number) { setValues((current)=>({ ...current, [key]:value })); }
  function resetBaseline() { setBaseId("kingston"); setMonth(6); setValues(baseValues); }
  return <div className="lake-workbench">
    <section className="lake-dashboard"><header><div><p className="section-kicker">Inland naval yard</p><h1>Build the fleet. Feed it. Move it.</h1></div><div className="lake-readiness"><span>Readiness index</span><b>{Math.min(100,readiness)}</b><i><span style={{width:`${Math.min(100,readiness)}%`}} /></i></div></header><div className="lake-selectors"><label>Shipyard<select value={baseId} onChange={(event)=>setBaseId(event.target.value)}>{lakeBases.map((item)=><option value={item.id} key={item.id}>{item.name} · {item.water}</option>)}</select></label><label>Working month<select value={month} onChange={(event)=>setMonth(Number(event.target.value))}>{["January","February","March","April","May","June","July","August","September","October","November","December"].map((name,index)=><option value={index+1} key={name}>{name}</option>)}</select></label></div><p className="lake-base-note">{base.note}</p><div className="lake-output"><div><b>{hulls}</b><span>hulls plausibly launched</span></div><div><b>{operational}</b><span>vessels plausibly sustained</span></div><div><b>{bottleneck.score}</b><span>weakest resource index</span></div><div><b>{Math.round(seasonFactor*100)}</b><span>seasonal work window</span></div><p className="lake-model-note"><strong>How to read the scale.</strong> Readiness is a comparative 0–100 model index, not a measured historical statistic. It combines the eight resource indices with the selected yard’s supply multipliers and seasonal work window. The hull and sustained-vessel counts are teaching outputs from those constraints, so a ship can be launchable before the yard can reliably keep one operational.</p></div></section>
    <section className="yard-allocation"><header><div><p className="section-kicker">Allocation board</p><h2>Every ship is a supply chain.</h2></div><div className={over > 0 ? "over" : ""}><span>Allocation</span><b>{Object.values(values).reduce((sum,item)=>sum+item,0)} / 480</b><small>{over > 0 ? `${over} points over capacity` : `${Math.abs(over)} points unassigned`}</small></div></header><div>{resources.map((key)=><label className={bottleneck.key===key ? "bottleneck" : ""} key={key}><span><b>{labels[key]}</b><small>{bottleneck.key===key ? "Current bottleneck" : "Resource index"}</small></span><input type="range" min="10" max="100" value={values[key]} onChange={(event)=>setResource(key,Number(event.target.value))} /><strong>{values[key]}</strong></label>)}</div></section>
    <aside className="yard-diagnosis"><p className="section-kicker">Yardmaster’s report</p><h2>{over > 0 ? "The plan exceeds the yard’s carrying capacity." : `${labels[bottleneck.key]} now governs the fleet.`}</h2><p>{over > 0 ? "Move resources rather than simply maximizing every input. An inland yard cannot summon unlimited money, wagons, people, guns, and provisions at once." : `Additional strength elsewhere cannot fully compensate for a ${bottleneck.score}-point ${labels[bottleneck.key].toLowerCase()} constraint. Ships that cannot be armed, crewed, fed, or moved are not operational power.`}</p><button onClick={resetBaseline}>Reset baseline</button></aside>
  </div>;
}
