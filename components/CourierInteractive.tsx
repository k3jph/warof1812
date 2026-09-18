"use client";

import { useState } from "react";
import { courierMissions } from "@/lib/interactive-history";

export function CourierInteractive() {
  const [missionId, setMissionId] = useState("ghent");
  const [step, setStep] = useState(0);
  const [days, setDays] = useState(0);
  const [risk, setRisk] = useState(0);
  const [journal, setJournal] = useState<{ route: string; choice: string; days: number; risk: number }[]>([]);
  const mission = courierMissions.find((item) => item.id === missionId)!;
  const complete = step >= mission.legs.length;
  const leg = mission.legs[step];
  const grade = days <= mission.deadline && risk < 55 ? "Delivered with usable time" : days <= mission.deadline ? "Delivered, but exposed" : "Delivered after the strategic window";
  const riskLabel = risk < 20 ? "low" : risk < 45 ? "rising" : risk < 70 ? "high" : "critical";
  const progress = Math.round(step / mission.legs.length * 100);
  const missionSummary = mission.legs.map((item) => item.to).join(" → ");

  function choose(choice: typeof leg.choices[number]) {
    setDays((value) => value + choice.days);
    setRisk((value) => Math.min(100, value + choice.risk));
    setJournal((items) => [...items, { route:`${leg.from} → ${leg.to}`, choice:choice.label, days:choice.days, risk:choice.risk }]);
    setStep((value) => value + 1);
  }
  function reset(nextId = missionId) { setMissionId(nextId); setStep(0); setDays(0); setRisk(0); setJournal([]); }

  return (
    <div className="courier-shell">
      <aside className="courier-missions"><p className="section-kicker">Dispatch desk</p><h2>Select a mission</h2>{courierMissions.map((item) => <button key={item.id} className={item.id === missionId ? "active" : ""} onClick={() => reset(item.id)}><span>{item.date}</span><strong>{item.title}</strong><small>{item.charge}</small></button>)}</aside>
      <section className="courier-play">
        <header><div><p className="section-kicker">You are the courier</p><h1>{mission.title}</h1><p>{mission.context}</p></div><dl><div><dt>Elapsed</dt><dd>{days} days</dd></div><div><dt>Exposure</dt><dd>{riskLabel} · {risk}</dd></div><div><dt>Target</dt><dd>{mission.deadline} days</dd></div></dl></header>
        <div className="courier-progress" aria-label={`${progress}% complete`}><span style={{ width:`${progress}%` }} /></div>
        <div className="courier-cargo"><span>Sealed dispatch</span><p>{mission.cargo}</p><small>{mission.charge} · {missionSummary}</small></div>
        {!complete ? <div className="courier-decision"><div><span>Leg {step + 1} of {mission.legs.length}</span><h2>{leg.from} → {leg.to}</h2><p>The fastest option is not always the first to arrive. Authentication, capture, weather, vessel availability, and exhausted horses all matter.</p></div><div>{leg.choices.map((choice) => <button key={choice.label} onClick={() => choose(choice)}><span><b>+{choice.days}</b> days <b>+{choice.risk}</b> exposure</span><strong>{choice.label}</strong><p>{choice.note}</p><i>Choose route →</i></button>)}</div></div> : <div className="courier-result"><span>Dispatch received</span><h2>{grade}</h2><p>{mission.truthAtArrival}</p><div><b>{days}</b><span>days elapsed</span><b>{risk}</b><span>cumulative exposure</span></div><button onClick={() => reset()}>Run this mission again</button></div>}
        <div className="courier-journal"><h2>Courier’s journal</h2>{journal.length ? journal.map((item, index) => <article key={`${item.route}-${index}`}><span>{String(index + 1).padStart(2,"0")}</span><div><strong>{item.route}</strong><p>{item.choice}</p></div><small>+{item.days}d · +{item.risk} risk</small></article>) : <p>No legs completed. Choose a route to begin.</p>}</div>
      </section>
    </div>
  );
}
