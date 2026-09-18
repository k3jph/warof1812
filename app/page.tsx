import Link from "next/link";
import { chapters } from "@/lib/content";

const doors = [
  ["01", "Why War?", "A divided republic chooses war against the greatest naval power on Earth.", "/story/why-war"],
  ["03", "Invading Canada", "The easy conquest collapses at Detroit and Queenston Heights.", "/story/easy-conquest-that-wasnt"],
  ["06", "War on the Lakes", "Inland shipyards build fleets because water is the only reliable road.", "/story/continental-naval-arms-race"],
  ["10", "Southern Borderlands", "Muscogee civil war, Spanish Florida, slavery, and expansion overlap.", "/story/southern-borderlands"],
  ["14", "Washington Burns", "The capital falls; the Chesapeake campaign is not finished.", "/story/washington-burns"],
  ["15", "Baltimore Holds", "A city once divided confronts an army and fleet.", "/story/baltimore-holds"],
  ["16", "Peace", "Negotiators restore the map and abandon the buffer-state demand.", "/story/peace-at-ghent"],
  ["17", "New Orleans", "The treaty is signed in Europe. Peace has not reached Louisiana.", "/story/new-orleans"],
];

export default function Home() {
  return (
    <main id="main">
      <section className="hero">
        <div className="hero-image" role="img" aria-label="An approximately 1819 print of British bomb vessels firing on Fort McHenry at night"><div className="hero-shade" /></div>
        <div className="hero-copy">
          <p className="hero-kicker">The war no one explains as one story</p>
          <h1><span>18</span><span>12</span></h1>
          <p className="hero-deck">The United States declares war on the most powerful empire on Earth.</p>
          <p className="hero-summary">The fighting will stretch from Detroit to the Pacific, from the Great Lakes to the Chesapeake and Gulf—across Indigenous homelands and communities already caught in older struggles over land, empire, slavery, trade, and sovereignty.</p>
          <div className="hero-actions"><Link className="primary-action" href="/story/world-already-at-war">Begin the story <span>→</span></Link><Link href="/five-minutes">The war in five minutes</Link></div>
        </div>
        <a className="image-credit" href="https://www.loc.gov/pictures/item/2013645001/" target="_blank" rel="noreferrer">John Bower, <em>A View of the Bombardment of Fort McHenry</em>, c. 1819 · Library of Congress · No known restrictions</a>
      </section>

      <section className="bookend">
        <p className="section-kicker">An American bookend</p>
        <div className="bookend-grid">
          <article><span>1812</span><h2>Baltimore at war with itself.</h2><p>A newspaper press smashed. A city jail invaded. Revolutionary War General James M. Lingan murdered by a political mob.</p><Link href="/story/baltimore-at-war-with-itself">Enter the divided city →</Link></article>
          <div className="bookend-rule"><span>Between these two nights lies the War of 1812.</span></div>
          <article><span>1814</span><h2>Baltimore at war with an empire.</h2><p>Earthworks, militia, laborers, bomb ships, rockets—and an invading British army stopped outside the city.</p><Link href="/story/baltimore-holds">Enter the defended city →</Link></article>
        </div>
      </section>

      <section className="choose-depth">
        <div className="section-heading"><p className="section-kicker">Choose your depth</p><h2>One war. Three reading distances.</h2></div>
        <div className="depth-grid">
          <Link href="/five-minutes"><span>5 min</span><h3>The whole shape</h3><p>Causes, campaigns, peace, and the unequal aftermath in one concentrated account.</p><b>Read the overview →</b></Link>
          <Link href="/story"><span>Whole</span><h3>The complete narrative</h3><p>{chapters.length} connected movements, from the world before the war to the memories created after it.</p><b>See all chapters →</b></Link>
          <Link href="/map"><span>Follow</span><h3>The moving war</h3><p>Scrub through events across the lakes, Atlantic, Chesapeake, Gulf, Pacific, and negotiating table.</p><b>Open the map →</b></Link>
        </div>
      </section>

      <section className="story-doors">
        <div className="section-heading"><p className="section-kicker">Doors into the story</p><h2>What happens next?</h2></div>
        <div className="door-list">{doors.map(([number, title, copy, href]) => <Link href={href} key={href}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div><b>→</b></Link>)}</div>
      </section>

      <section className="perspective-band"><p>The war was never owned by one national memory.</p><div><span>American</span><span>British</span><span>Upper &amp; Lower Canadian</span><span>Indigenous</span></div><Link href="/about">How this project tells the story →</Link></section>
    </main>
  );
}

