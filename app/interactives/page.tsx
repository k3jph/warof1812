import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "@/components/SafeLink";

export const metadata: Metadata = pageMetadata("/interactives", "Historical Systems", "Interactive models of information latency, blockade, inland naval logistics, and the human archive of the War of 1812.");
const systems = [
  ["01","War clock","Choose any date from 1807 through 1818. Compare simultaneous events with what people in another place could plausibly know.","Time · news · knowledge","/war-clock"],
  ["02","You are the courier","Carry a treaty, policy decision, military warning, or campaign order through weather, schedules, interception, and imperfect roads.","Information latency","/courier"],
  ["03","Blockade simulator","Change naval pressure, privateering, and evasion to see connected effects on trade, revenue, prices, finance, and coastal exposure.","Maritime systems","/blockade-lab"],
  ["04","Lake-war logistics","Try to create operational naval power from timber, guns, iron, canvas, labor, food, sailors, seasons, and transport distance.","Industrial systems","/lake-logistics"],
  ["05","The human record","Search twenty-four curated dossiers and a larger, explicitly limited research index of names and source routes.","People · dossiers · research leads","/people"],
] as const;
export default function InteractivesPage() { return <main id="main" className="systems-page"><header className="systems-header"><p className="section-kicker">Historical systems</p><h1>The war<br />in motion.</h1><p>Dates do not move information. Ships do not appear because a commander wants them. Blockades work through prices, credit, labor, and fear. Archives do not preserve everyone equally. These five workbenches make those systems visible.</p></header><nav className="systems-index" aria-label="Interactive historical systems">{systems.map(([number,title,copy,tag,href])=><Link href={href} key={href}><span>{number}</span><div><small>{tag}</small><h2>{title}</h2><p>{copy}</p></div><b>Open system →</b></Link>)}</nav><aside className="systems-rule"><p>Every interface distinguishes documented inputs, estimated constraints, and interpretive outputs. Where the evidence cannot support a precise number, the site uses ranges or indexes and says so.</p><Link href="/sources">Read the research method →</Link></aside></main>; }
