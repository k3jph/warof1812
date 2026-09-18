import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Maryland, 1812–1814", description: "The Chesapeake raids, Washington campaign, North Point, Fort McHenry, privateering, civilian experience, and Black Marylanders." };

const places = [
  ["Havre de Grace", "British raiders burned much of the town in May 1813, making the upper bay part of the war's civilian front.", "/story/war-reaches-homes"],
  ["St. Michaels", "A shipbuilding town resisted British attack. Later lantern stories show how memory can grow around a documented defense.", "/story/war-reaches-homes"],
  ["Benedict", "British regulars landed on the Patuxent in August 1814 and began the march that ended in Washington.", "/story/washington-burns"],
  ["Bladensburg", "A broken American defense exposed the capital; Barney's sailors and marines supplied its hardest resistance.", "/story/washington-burns"],
  ["North Point", "Stricker's militia delayed the British advance and returned to Baltimore's main defensive line.", "/story/baltimore-holds"],
  ["Fort McHenry", "The fort and supporting batteries closed the water approach while earthworks closed the land approach.", "/story/baltimore-holds"],
];

export default function MarylandPage() {
  return (
    <main id="main" className="page-shell maryland-page">
      <header className="maryland-hero"><p className="section-kicker">A regional gateway</p><h1>Maryland,<br /><span>1812–1814</span></h1><p>History in your own backyard is not a slogan here. The Chesapeake was an invasion route, an escape route, a privateering base, a workplace, and a landscape watched from every shoreline.</p></header>
      <section className="maryland-intro"><div><p className="section-kicker">The campaign</p><h2>A bay becomes a battlefield</h2></div><div><p>British naval superiority made the Chesapeake accessible and American weakness made it tempting. Raids in 1813 gathered intelligence and exposed defenses. Blockade squeezed commerce. Enslaved people made dangerous decisions about whether and how to reach British vessels. In 1814 the campaign escalated from raids to the burning of Washington and the attempted capture of Baltimore.</p><p>Maryland's story is unusually dense, but it is not the whole war. Use this gateway to move from local places into the continental and Atlantic narrative.</p></div></section>
      <section className="place-path"><p className="section-kicker">Follow the ground</p><h2>Six Maryland doors</h2><div>{places.map(([name, copy, href], index) => <Link href={href} key={name}><span>{String(index + 1).padStart(2, "0")}</span><h3>{name}</h3><p>{copy}</p><b>Open story →</b></Link>)}</div></section>
      <section className="maryland-bookend"><div><span>1812</span><h2>The city jail</h2><p>Political violence kills James M. Lingan and nearly kills other antiwar Federalists in official custody.</p></div><div><span>1814</span><h2>The city defenses</h2><p>A vast civic and military system denies both the land and water approaches to Baltimore.</p></div></section>
      <section className="backyard-callout"><p className="section-kicker">Mobile field guide</p><h2>History in Your Own Backyard</h2><p>A concise route through North Point, Fort McHenry, Havre de Grace, Bladensburg, and the landscapes between them.</p><div><Link className="primary-action" href="/five-minutes">Start with five minutes →</Link><Link href="/map">See the campaign on the map →</Link></div></section>
    </main>
  );
}

