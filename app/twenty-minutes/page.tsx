import type { Metadata } from "next";
import Link from "@/components/SafeLink";
import { SourceList } from "@/components/SourceList";

export const metadata: Metadata = {
  title: "The War in Twenty Minutes",
  description: "A deliberate, connected account of the War of 1812 from the Atlantic crisis through its unequal aftermath.",
};

type Movement = {
  title: string;
  date: string;
  theater: string;
  href: string;
  paragraphs: string[];
  sourceRefs: string[];
};

const movements: Movement[] = [
  {
    title: "A republic inside a larger war",
    date: "1803–June 1812",
    theater: "Atlantic world and North American interior",
    href: "/story/world-already-at-war",
    sourceRefs: ["nara-impressment", "house-declaration", "nps-indigenous", "loc-guide"],
    paragraphs: [
      "The United States entered the crisis as a neutral republic trying to trade inside a European war. Britain needed sailors and claimed the right to recover British subjects from American vessels. France and Britain both restricted commerce, but British warships could stop a vessel, inspect its papers, and remove men. An impressed sailor experienced the dispute as confinement and forced labor long before diplomats turned his case into correspondence.",
      "The western conflict had its own origin. The United States was converting disputed treaties, surveys, and settlements into control of Native homelands. Tecumseh and Tenskwatawa built resistance among people from several nations, though they never spoke for all Native communities. British weapons and posts helped that coalition. They did not create the land pressure to which it responded.",
      "Madison put these injuries before Congress on June 1, 1812. The declaration passed narrowly on June 18, with every Federalist voting against it and Republicans divided. Maritime rights, impressment, western land, Canada, party credibility, and national standing had entered the same vote without becoming one agreed war aim."
    ],
  },
  {
    title: "Baltimore goes to war with itself",
    date: "June–July 1812",
    theater: "Baltimore",
    href: "/story/baltimore-at-war-with-itself",
    sourceRefs: ["nps-riots", "riot-narrative", "msa-hanson", "bca"],
    paragraphs: [
      "Four days after the declaration, a Baltimore crowd destroyed the office of Alexander Contee Hanson's antiwar Federal Republican. Hanson returned five weeks later with armed allies. A crowd attacked the house; the defenders fired and killed a man outside. City officials negotiated their transfer to jail under a promise of protection.",
      "The crowd entered the jail on July 28 and beat, stabbed, and tortured prisoners. James M. Lingan, a Revolutionary veteran, was murdered. Henry Lee and Hanson barely survived. This was the first Baltimore bookend: a prowar city treating dissent as an internal enemy and failing the prisoners in its custody."
    ],
  },
  {
    title: "The easy conquest fails",
    date: "July–October 1812",
    theater: "Detroit and Niagara",
    href: "/story/easy-conquest-that-wasnt",
    sourceRefs: ["army-campaign-1812", "cwm", "parks-queenston", "nps-indigenous"],
    paragraphs: [
      "The administration expected attacks on British North America to create leverage that its small navy could not obtain at sea. William Hull reached Detroit over roads that consumed the food and animal power needed to keep using them. He crossed into Upper Canada, waited, and withdrew as British and Indigenous forces threatened his communications.",
      "Isaac Brock moved quickly because Upper Canada was vulnerable. Tecumseh joined him because British resistance offered the best available barrier to American expansion. Captured correspondence exposed Hull's fear. On August 16, after Brock magnified his apparent strength and warned about an assault he might not control, Hull surrendered Detroit and troops who had not yet been beaten in the fort.",
      "At Queenston Heights in October, Americans crossed the Niagara River and captured ground above it. Many New York militiamen then refused to cross an international boundary. John Norton and Haudenosaunee warriors checked the isolated force until British reinforcements arrived. By afternoon, the Americans on the heights were trapped and surrendered. Population and proximity had not supplied boats, command, food, legal authority, or control of the water."
    ],
  },
  {
    title: "Victories at sea, blockade at the coast",
    date: "1812–1813",
    theater: "Atlantic Ocean",
    href: "/story/old-ironsides",
    sourceRefs: ["nhhc", "nara-war", "loc-pictures", "nps-privateers"],
    paragraphs: [
      "The large American frigates could not contest the Royal Navy as a system, but they could win favorable single-ship fights. Constitution defeated Guerriere and Java; United States captured Macedonian. These victories came from strong hulls, heavy batteries, practiced crews, and commanders who found the kind of battle their ships could win. Newspapers converted captured colors and concise reports into national evidence.",
      "HMS Shannon captured Chesapeake in June 1813 after a short and bloody action, and James Lawrence's remembered command not to give up the ship outlived the defeat. The duels mattered to morale and naval practice. Meanwhile Britain tightened a blockade that American frigates and privateers could harass but could not remove."
    ],
  },
  {
    title: "Lake Erie carries an army",
    date: "January–October 1813",
    theater: "Lake Erie, Detroit, and the Thames",
    href: "/story/war-for-the-interior",
    sourceRefs: ["nps-lake-erie", "nps-indigenous", "lac-british-records", "ontario-military-heritage"],
    paragraphs: [
      "After defeat at the River Raisin and a difficult defense at Fort Meigs, William Henry Harrison could not recover Detroit while Britain supplied its position across Lake Erie. At Presque Isle, workers built an American squadron from timber, imported fittings, scarce cannon, credit, and labor. Oliver Hazard Perry brought it into action on September 10.",
      "Perry's flagship Lawrence absorbed concentrated fire until it could no longer fight. He transferred by boat to Niagara, broke the damaged British line, and received its surrender. The victory gave the United States the route it needed. Harrison retook Detroit and pursued Henry Procter's retreating column into Upper Canada.",
      "At the Thames on October 5, American mounted troops broke the British line and Tecumseh was killed in the fighting that followed. His death shattered the strongest wartime form of the Indigenous coalition south of the lakes. The United States restored authority at Detroit and opened the region more securely to settlement."
    ],
  },
  {
    title: "An inland naval arms race",
    date: "1813–1814",
    theater: "Lake Ontario",
    href: "/story/continental-naval-arms-race",
    sourceRefs: ["ontario-military-heritage", "lac", "nhhc", "state-rush-bagot"],
    paragraphs: [
      "Lake Ontario was the road between Kingston, York, Niagara, Sackets Harbor, and the St. Lawrence. The United States and Britain enlarged dockyards, moved cannon overland, recruited scarce sailors, and built past each other's latest ship. Fleets transported invasions and supplies even when commanders refused the evenly matched battle their critics wanted.",
      "The race culminated in Britain's 112-gun St. Lawrence and two even larger American ships left unfinished by peace. Workers, hospitals, timber roads, small craft, and seasonal ice sustained the contest. In 1817, Rush-Bagot sharply limited armed vessels on the lakes, leaving hulls and waterfronts from an emergency both governments had decided was too expensive to preserve."
    ],
  },
  {
    title: "The war rounds Cape Horn",
    date: "1812–1814",
    theater: "Pacific Ocean and Marquesas Islands",
    href: "/story/war-around-cape-horn",
    sourceRefs: ["nhhc-pacific", "nhhc", "worldcat-scholarship"],
    paragraphs: [
      "USS Essex entered the Pacific and captured British whalers far from immediate naval protection. Commerce raiding gave David Porter prizes, supplies, and a temporary local advantage. It also created a floating population of captors, prisoners, prize crews, and sailors whose national attachments did not always fit the flags above them.",
      "At Nuku Hiva, Porter intervened in Marquesan conflicts, destroyed property, built a small base, and declared an inhabited island an American possession. The claim had neither durable local consent nor a government able to sustain it. HMS Phoebe and Cherub later trapped Essex at Valparaíso and captured it. Porter's journal carried the cruise home, including an imperial gesture that American memory long treated as scenery for naval adventure."
    ],
  },
  {
    title: "War reaches homes",
    date: "1813–1814",
    theater: "Niagara and Chesapeake communities",
    href: "/story/war-reaches-homes",
    sourceRefs: ["nps-living", "nps-freedom-1", "nps-women-chesapeake", "lac"],
    paragraphs: [
      "American troops captured York in April 1813, and a magazine explosion killed or wounded hundreds, including Zebulon Pike. Soldiers burned the parliament buildings and looted other property. In December, American forces burned Newark while withdrawing from Fort George. British and Indigenous forces answered with raids on the American side of the Niagara. Each command described its own destruction as military necessity or retaliation.",
      "Households encountered the war through evacuation, requisition, fire, missing livestock, interrupted work, billeting, and compensation claims. Those burdens differed sharply. A property owner might petition an officer; an enslaved person might use the arrival of British ships as a dangerous opening toward freedom; Indigenous villages and crops were attacked as the material base of resistance.",
      "In the Chesapeake, British vessels could move faster by water than local militia could move by road. Raids at places such as Havre de Grace and St. Michaels gathered provisions, tested defenses, and learned the bay. By 1814, residents recognized sails in a creek as both military warning and, for some people held in slavery, a possible route out."
    ],
  },
  {
    title: "The blockade becomes a system",
    date: "1813–1814",
    theater: "United States coast and Atlantic economy",
    href: "/story/blockade",
    sourceRefs: ["nps-trade-commerce", "whha-war-finance", "nhhc", "nps-freedom-1", "nps-privateers"],
    paragraphs: [
      "Britain closed the coast in stages. New England remained outside the first broad declarations because opposition to the war and cross-border trade both served British interests. As the blockade widened, insurance rose, voyages stopped, sailors and dockworkers lost work, exports accumulated, imported goods grew scarce, and customs revenue collapsed. The federal government was losing its ordinary income while borrowing more to fight.",
      "Privateers captured British merchantmen and forced convoying, but commerce raiding was not sea control. A raider needed one vulnerable prize and an escape route. The Royal Navy could lose individual ships and still keep American commerce from moving normally, gather intelligence in the Chesapeake, carry troops toward Washington and Baltimore, and receive thousands of freedom seekers aboard its fleet."
    ],
  },
  {
    title: "Civil war in the southern borderlands",
    date: "1813–1814",
    theater: "Muscogee country and Spanish Florida",
    href: "/story/southern-borderlands",
    sourceRefs: ["nps-creek", "nps-horseshoe-participants", "nps-prince-witten", "nps-indigenous"],
    paragraphs: [
      "The Muscogee conflict grew from disputes over authority, land cessions, trade, debt, and movements rejecting American influence. Red Stick militants attacked Fort Mims in August 1813, killing hundreds and taking captives. American armies entered a civil war in which Lower Creek, Cherokee, and Choctaw warriors also fought beside the United States for their own reasons.",
      "At Horseshoe Bend on March 27, 1814, Andrew Jackson's force attacked the fortified Red Stick community at Tohopeka. Cherokee warriors crossed the Tallapoosa, seized canoes, and attacked from the rear while American infantry assaulted the breastwork. A large proportion of the Red Stick defenders were killed. Menawa survived; women and children were captured.",
      "Jackson then imposed the Treaty of Fort Jackson on the Muscogee Confederacy, taking roughly twenty-three million acres from hostile and allied towns alike. The line became surveys, sales, roads, plantation expansion, and enslavement. Red Stick refugees and other communities moved toward Florida, where the war's consequences continued beyond its formal dates."
    ],
  },
  {
    title: "Everything gets heavier",
    date: "Spring–summer 1814",
    theater: "North America and Europe",
    href: "/story/everything-changes",
    sourceRefs: ["cwm", "canada-military-history", "loc-ghent", "nara-war"],
    paragraphs: [
      "Napoleon's first abdication freed British veteran regiments, ships, and attention for North America. The troops remained dependent on Atlantic transport, local food, roads, and water. Britain now had enough capacity to attempt distinct campaigns through the Chesapeake, Lake Champlain, and the Gulf while defending Canada and negotiating at Ghent.",
      "The United States had improved unevenly. Some regular units were well trained and the lake fleets existed; militia law, divided departments, weak intelligence, and financial failure remained. The blockade had reduced customs income, loans were harder to sell, and contractors doubted government paper. Britain had more options. It did not have one master blow whose parts would succeed or fail together."
    ],
  },
  {
    title: "The Niagara army improves and withdraws",
    date: "July–November 1814",
    theater: "Niagara peninsula",
    href: "/story/niagara-again",
    sourceRefs: ["ontario-military-heritage", "lac-british-records", "canada-military-history", "nps-indigenous"],
    paragraphs: [
      "Jacob Brown and Winfield Scott crossed the Niagara River with the most coherent American regular formation yet sent into Upper Canada. At Chippawa on July 5, Scott's brigade maintained order under fire and drove Phineas Riall's force from the field. Training had changed what American units could do. It had not solved naval support or supply.",
      "At Lundy's Lane on July 25, units arrived in stages and fought into darkness around high ground and artillery. Both sides claimed victory from different hours of the battle. The American advance stopped. The army withdrew to Fort Erie, survived a siege and assault, then destroyed the fort and returned across the river. Farms, buildings, hospitals, graves, and claims remained in the peninsula."
    ],
  },
  {
    title: "Washington burns",
    date: "August 19–25, 1814",
    theater: "Patuxent, Bladensburg, and Washington",
    href: "/story/washington-burns",
    sourceRefs: ["nhhc-flotilla", "whha-portrait", "whha-jennings", "loc-guide"],
    paragraphs: [
      "A British expedition landed through the Patuxent and marched toward a capital whose defense had been divided by uncertain intelligence and command. Joshua Barney's flotilla was destroyed to prevent capture, and its sailors and marines marched inland. At Bladensburg on August 24, poorly coordinated American lines broke while Barney's artillery made a costly stand near the road.",
      "British troops entered Washington and burned the Capitol, President's House, Treasury, and other public buildings. American personnel burned ships and stores at the Navy Yard. Dolley Madison ordered Gilbert Stuart's portrait of George Washington saved; Paul Jennings and other workers later corrected the story that she had physically carried it out herself.",
      "The government escaped, and the British withdrew on August 25 rather than hold the city. Residents returned to smoldering structures, missing records, temporary offices, and years of rebuilding. The spectacle was enormous. It did not compel surrender."
    ],
  },
  {
    title: "The fleet at Plattsburgh turns",
    date: "September 6–11, 1814",
    theater: "Lake Champlain",
    href: "/story/plattsburgh",
    sourceRefs: ["nps-plattsburgh", "nhhc", "canada-military-history", "lac-british-records"],
    paragraphs: [
      "George Prévost advanced beside Lake Champlain with roughly ten thousand troops, while Alexander Macomb held the ground south of the Saranac with a much smaller mixed force. Macomb strengthened bridges, streets, and forts to gain time. The campaign could continue south only if the British squadron controlled the lake well enough to move food, ammunition, and heavy stores behind the army.",
      "Thomas Macdonough anchored inside Plattsburgh Bay with springs and kedge anchors arranged to rotate his ships. Confiance's opening broadside battered Saratoga. Once Saratoga's engaged guns were disabled, its crew hauled the ship around and brought the fresh port battery to bear. Confiance could not complete the same maneuver and surrendered; Linnet followed.",
      "Prévost recalled the land attack and withdrew in rain. British officers accused him of abandoning a winnable fight. His answer concerned the campaign rather than the nearest bridge: an army that captured Plattsburgh without naval transport and protection might not be supportable farther south."
    ],
  },
  {
    title: "Baltimore holds",
    date: "September 12–14, 1814",
    theater: "North Point and Baltimore Harbor",
    href: "/story/baltimore-holds",
    sourceRefs: ["nps-baltimore", "nps-north-point", "nps-bombardment", "nps-grace", "smithsonian-flag"],
    paragraphs: [
      "Baltimore had spent two years turning alarm into preparation. Samuel Smith coordinated earthworks on Hampstead Hill, militia, artillery, harbor obstructions, Fort McHenry, and supporting batteries. At North Point on September 12, Robert Ross was killed during skirmishing. John Stricker's brigade fought, withdrew in order, and bought time without pretending it could destroy the expedition in the field.",
      "British bomb vessels shelled Fort McHenry from beyond the effective range of most of its guns. During the night, boats tried another route toward the harbor and were driven back by Forts Covington and Babcock. Arthur Brooke found the land works occupied and no naval opening. He did not order the assault.",
      "The British reembarked. Francis Scott Key's lyric and the large flag made by Mary Pickersgill's household, including the indentured Black teenager Grace Wisher, became the compact symbols. The second Baltimore bookend was a real act of collective defense, built by a city whose unity in 1814 had not erased the jail murder of 1812."
    ],
  },
  {
    title: "Ghent supplies the resolution",
    date: "August–December 1814",
    theater: "Ghent",
    href: "/story/peace-at-ghent",
    sourceRefs: ["loc-ghent", "avalon-ghent", "senate-ghent", "nps-indigenous"],
    paragraphs: [
      "British negotiators initially demanded an Indigenous buffer, boundary changes, and restrictions intended to secure Canada. The American commissioners rejected the buffer as a limit on United States sovereignty over land it claimed. No Indigenous delegation had an equal seat. As campaign reports, costs, and ministerial instructions changed, the talks moved toward restoration of the prewar territorial position.",
      "The Treaty of Ghent was signed on December 24. It restored conquered places, created boundary commissions, addressed prisoners and property, and promised restoration of Indigenous rights in language the United States would not enforce broadly. It said nothing about impressment or neutral maritime rights. Peace became legally effective between the governments when ratifications were exchanged on February 17, 1815."
    ],
  },
  {
    title: "New Orleans is the coda",
    date: "December 1814–February 1815",
    theater: "Louisiana and the Gulf",
    href: "/story/new-orleans",
    sourceRefs: ["nps-new-orleans-black", "nps-choctaw", "nps-jean-lafitte", "loc-ghent"],
    paragraphs: [
      "The treaty existed in Europe while British forces entered Louisiana. Jackson's command included regulars, Louisiana militia, Tennessee and Kentucky militia, sailors, marines, free men of color, Choctaw fighters, and Baratarians. Enslaved labor helped build the east-bank line behind the Rodriguez Canal. These participants shared a defensive position, not an equal legal status or common future.",
      "On January 8, British columns advanced over exposed ground without the timing and equipment their plan required. American artillery and musketry shattered the main attack; an action across the river on the west bank could not rescue it. The victory did not force Britain to sign a treaty completed two weeks earlier. It transformed the American experience of the ending and made Jackson a national hero."
    ],
  },
  {
    title: "The map returns; the world does not",
    date: "1815 and after",
    theater: "North America and the Atlantic world",
    href: "/story/what-changed",
    sourceRefs: ["nps-legacies", "nps-freedom-1", "nps-freedom-2", "nps-indigenous", "state-rush-bagot"],
    paragraphs: [
      "The United States gained no Canadian territory and no written concession on impressment. Britain gained no permanent American territory. Americans could celebrate survival and late victories; British North American communities could celebrate defense. For Tecumseh's coalition and many other Native nations, British withdrawal and American land pressure made the peace profoundly unequal. Thousands of people who reached British lines carried freedom into Nova Scotia, Trinidad, and other parts of the Atlantic, while American slaveholders pursued compensation.",
      "Financial breakdown encouraged the Second Bank, military failure encouraged professional reform and fortification, and the lake arms race gave way to negotiated limits. The final accounting still depends on whose object is measured and when. The formal state of war ended on February 17, 1815. Land cessions, refugee settlement, pensions, rebuilding, memory, and dispossession kept their own calendars."
    ],
  },
];

const sourceRefs = Array.from(new Set(movements.flatMap((movement) => movement.sourceRefs)));

export default function TwentyMinutesPage() {
  return (
    <main id="main" className="page-shell twenty-minute-page">
      <header className="page-title">
        <p className="section-kicker">A connected account · about 20 minutes</p>
        <h1>The war at reading distance</h1>
        <p>This is a compressed narrative, written for this page rather than extracted from chapter openings. It follows the chronology through Ghent, with New Orleans in its proper place as the military coda.</p>
        <div className="reading-meta"><span>{movements.length} movements</span><span>Medium depth</span><span>Source linked</span></div>
      </header>
      <article className="medium-read">
        {movements.map((movement, index) => (
          <section key={movement.href}>
            <div className="medium-number">{String(index + 1).padStart(2, "0")}</div>
            <div>
              <p className="section-kicker">{movement.date} · {movement.theater}</p>
              <h2>{movement.title}</h2>
              {movement.paragraphs.map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}
              <Link href={movement.href}>Open the full chapter →</Link>
            </div>
          </section>
        ))}
        <aside className="continue-box"><p>You now have the whole shape. The full narrative restores the evidence notes, documentary packets, local records, and arguments compressed here.</p><Link className="primary-action" href="/story">Open the complete story <span>→</span></Link></aside>
        <SourceList ids={sourceRefs} heading="Sources across this account" />
      </article>
    </main>
  );
}
