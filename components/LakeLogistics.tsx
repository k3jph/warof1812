"use client";

import { useMemo, useState } from "react";
import { lakeBases } from "@/lib/interactive-history";
import {
  DEFAULT_LAKE_ALLOCATION,
  LAKE_ALLOCATION_BUDGET,
  LAKE_RESOURCE_KEYS,
  evaluateLakeLogistics,
  type LakeAllocation,
  type LakeResource,
} from "@/lib/lake-logistics-model";

const labels: Record<LakeResource,string> = {
  timber:"Timber",
  iron:"Iron",
  guns:"Guns",
  canvas:"Canvas",
  "skilled labor":"Skilled labor",
  sailors:"Sailors",
  food:"Food",
  transport:"Transport capacity",
};

export function LakeLogistics() {
  const [baseId, setBaseId] = useState("kingston");
  const [month, setMonth] = useState(6);
  const [values, setValues] = useState<LakeAllocation>(DEFAULT_LAKE_ALLOCATION);
  const base = lakeBases.find((item) => item.id === baseId)!;
  const evaluation = useMemo(() => evaluateLakeLogistics(values, base, month), [values, base, month]);
  const bottleneck = evaluation.bottleneck;

  function setResource(key: LakeResource, value: number) {
    setValues((current) => ({ ...current, [key]:value }));
  }
  function resetBaseline() {
    setBaseId("kingston");
    setMonth(6);
    setValues(DEFAULT_LAKE_ALLOCATION);
  }

  return <div className="lake-workbench">
    <section className="lake-dashboard">
      <header>
        <div><p className="section-kicker">Inland naval yard</p><h1>Build the fleet. Feed it. Move it.</h1></div>
        <div className="lake-readiness" aria-live="polite">
          <span>Readiness index</span>
          <b>{evaluation.valid ? evaluation.readiness : "—"}</b>
          <i><span style={{width:`${evaluation.valid ? evaluation.readiness : 0}%`}} /></i>
        </div>
      </header>
      <div className="lake-selectors">
        <label>Shipyard<select value={baseId} onChange={(event)=>setBaseId(event.target.value)}>{lakeBases.map((item)=><option value={item.id} key={item.id}>{item.name} · {item.water}</option>)}</select></label>
        <label>Working month<select value={month} onChange={(event)=>setMonth(Number(event.target.value))}>{["January","February","March","April","May","June","July","August","September","October","November","December"].map((name,index)=><option value={index+1} key={name}>{name}</option>)}</select></label>
      </div>
      <p className="lake-base-note">{base.note}</p>
      <div className="lake-output" aria-live="polite">
        <div><b>{evaluation.valid ? evaluation.hulls : "—"}</b><span>hulls plausibly launched</span></div>
        <div><b>{evaluation.valid ? evaluation.sustainedVessels : "—"}</b><span>vessels plausibly sustained</span></div>
        <div><b>{evaluation.valid && bottleneck ? bottleneck.score : "—"}</b><span>weakest resource index</span></div>
        <div><b>{evaluation.valid ? Math.round(evaluation.seasonFactor*100) : "—"}</b><span>seasonal work window</span></div>
      </div>
      <p className="lake-model-note"><strong>How to read the scale.</strong> Readiness is a comparative 0–100 teaching index, not a measured historical statistic. It combines all eight resource indices with the selected yard and season. Launching requires enough overall readiness during a workable season. Sustaining a vessel also requires the weakest resource to clear an operational threshold, with local threat reducing rather than improving capacity.</p>
    </section>

    <section className="yard-allocation">
      <header>
        <div><p className="section-kicker">Allocation board</p><h2>Every ship is a supply chain.</h2></div>
        <div className={!evaluation.valid && evaluation.reason === "budget" ? "over" : ""}>
          <span>Allocation</span>
          <b>{evaluation.totalAllocation} / {LAKE_ALLOCATION_BUDGET}</b>
          <small>{evaluation.overBudget > 0 ? `${evaluation.overBudget} points over capacity` : `${LAKE_ALLOCATION_BUDGET - evaluation.totalAllocation} points unassigned`}</small>
        </div>
      </header>
      <div>{LAKE_RESOURCE_KEYS.map((key)=><label className={bottleneck?.key===key ? "bottleneck" : ""} key={key}>
        <span><b>{labels[key]}</b><small>{bottleneck?.key===key ? "Current bottleneck" : "Resource index"}</small></span>
        <input type="range" min="10" max="100" value={values[key]} onChange={(event)=>setResource(key,Number(event.target.value))} />
        <strong>{values[key]}</strong>
      </label>)}</div>
    </section>

    <aside className="yard-diagnosis">
      <p className="section-kicker">Yardmaster’s report</p>
      <h2>{!evaluation.valid && evaluation.reason === "budget"
        ? "The plan exceeds the yard’s carrying capacity."
        : bottleneck
          ? `${labels[bottleneck.key]} now governs the fleet.`
          : "Return the allocation to a valid range."}</h2>
      <p>{!evaluation.valid && evaluation.reason === "budget"
        ? `The model rejects outcomes above the ${LAKE_ALLOCATION_BUDGET}-point budget. Move resources rather than maximizing every input; launch and sustainment estimates resume only when the allocation is valid.`
        : bottleneck
          ? `The ${bottleneck.score}-point ${labels[bottleneck.key].toLowerCase()} score caps operational capacity. Improving stronger resources cannot erase a weak supply, crew, or transport link, and worsening the bottleneck cannot improve the result.`
          : "Each resource must remain on the 0–100 model scale."}</p>
      <button onClick={resetBaseline}>Reset baseline</button>
    </aside>
  </div>;
}
