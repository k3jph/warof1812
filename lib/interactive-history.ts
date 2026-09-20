export type ClockLayer = "military" | "political" | "newspaper" | "diplomatic" | "ships" | "civilian";

export type ClockEntry = {
  id: string;
  date: string;
  layer: ClockLayer;
  place: string;
  title: string;
  summary: string;
  sourceRefs: string[];
  href?: string;
};

export const clockLayers: { id: ClockLayer; label: string; color: string }[] = [
  { id: "military", label: "Military events", color: "#a94239" },
  { id: "political", label: "Political developments", color: "#68549b" },
  { id: "newspaper", label: "Newspaper reports", color: "#9a702f" },
  { id: "diplomatic", label: "Diplomatic movements", color: "#356c74" },
  { id: "ships", label: "Ships at sea", color: "#32658e" },
  { id: "civilian", label: "Civilian experiences", color: "#59724d" },
];

export const warClockEntries: ClockEntry[] = [
  { id:"embargo", date:"1807-12-22", layer:"political", place:"Washington, D.C.", title:"Embargo Act becomes law", summary:"The United States answers maritime coercion with a sweeping restriction on its own overseas trade.", sourceRefs:["loc-guide"] },
  { id:"chesapeake-news", date:"1807-07-02", layer:"newspaper", place:"Washington, D.C.", title:"News of the Chesapeake attack reaches the capital", summary:"Reports of Leopard firing on Chesapeake turn a naval encounter into an immediate political crisis.", sourceRefs:["nara-impressment"] },
  { id:"nonintercourse", date:"1809-03-01", layer:"political", place:"Washington, D.C.", title:"Non-Intercourse Act replaces the embargo", summary:"Congress reopens most trade while retaining restrictions against Britain and France.", sourceRefs:["loc-guide"] },
  { id:"tippecanoe", date:"1811-11-07", layer:"military", place:"Prophetstown", title:"Battle of Tippecanoe", summary:"Harrison’s force fights Tenskwatawa’s followers and destroys Prophetstown after the battle.", sourceRefs:["nps-indigenous"], href:"/events/tippecanoe" },
  { id:"war-message", date:"1812-06-01", layer:"political", place:"Washington, D.C.", title:"Madison sends his war message", summary:"The president presents maritime violations, commercial pressure, and frontier insecurity to Congress.", sourceRefs:["house-declaration"] },
  { id:"house-vote", date:"1812-06-04", layer:"political", place:"Washington, D.C.", title:"House approves war", summary:"The House votes 79–49 for war, revealing a sharply divided republic.", sourceRefs:["house-declaration"] },
  { id:"senate-vote", date:"1812-06-17", layer:"political", place:"Washington, D.C.", title:"Senate approves war", summary:"The Senate votes 19–13 after days of uncertainty and attempted amendments.", sourceRefs:["house-declaration"] },
  { id:"war-declared", date:"1812-06-18", layer:"political", place:"Washington, D.C.", title:"Madison signs the declaration", summary:"The United States formally enters war with Great Britain.", sourceRefs:["house-declaration"], href:"/events/war-declaration" },
  { id:"war-reaches-london", date:"1812-07-29", layer:"diplomatic", place:"London", title:"The declaration is known in London", summary:"Atlantic passage turns an American act in June into British operational knowledge weeks later.", sourceRefs:["loc-guide"] },
  { id:"baltimore-press", date:"1812-06-22", layer:"civilian", place:"Baltimore", title:"A newspaper press is destroyed", summary:"A pro-war crowd attacks the Federal Republican four days after the declaration.", sourceRefs:["nps-riots"], href:"/events/baltimore-riot-june" },
  { id:"baltimore-jail", date:"1812-07-28", layer:"civilian", place:"Baltimore", title:"The city jail becomes a killing ground", summary:"A mob murders James M. Lingan and gravely injures other antiwar Federalists held under official protection.", sourceRefs:["riot-narrative"], href:"/events/baltimore-jail-massacre" },
  { id:"detroit", date:"1812-08-16", layer:"military", place:"Detroit", title:"Hull surrenders Detroit", summary:"A major American army and fort capitulate to Brock, Tecumseh, and their smaller allied force.", sourceRefs:["cwm"], href:"/events/detroit-surrender" },
  { id:"guerriere", date:"1812-08-19", layer:"ships", place:"North Atlantic", title:"Constitution defeats Guerriere", summary:"The frigate victory is tactically limited but becomes exceptionally powerful news.", sourceRefs:["nhhc"], href:"/events/constitution-guerriere" },
  { id:"guerriere-boston-news", date:"1812-08-30", layer:"newspaper", place:"Boston", title:"A naval victory reaches the press", summary:"Constitution’s return and dispatches allow a distant sea fight to become a public event.", sourceRefs:["nhhc"] },
  { id:"queenston", date:"1812-10-13", layer:"military", place:"Queenston Heights", title:"The Niagara invasion fails", summary:"American troops cross the river but are isolated and defeated; Isaac Brock is killed.", sourceRefs:["cwm"], href:"/events/queenston-heights" },
  { id:"madison-reelected", date:"1812-12-02", layer:"political", place:"United States", title:"Madison wins reelection", summary:"The wartime election confirms the administration while exposing regional opposition.", sourceRefs:["loc-guide"] },
  { id:"york", date:"1813-04-27", layer:"military", place:"York, Upper Canada", title:"American forces capture York", summary:"The colonial capital is occupied; looting and burning feed a later cycle of retaliation.", sourceRefs:["cwm"], href:"/events/york" },
  { id:"havre", date:"1813-05-03", layer:"civilian", place:"Havre de Grace", title:"A Chesapeake town is burned", summary:"British raiders plunder and burn much of the town as the shoreline war widens.", sourceRefs:["nps-living"], href:"/events/havre-de-grace" },
  { id:"shannon", date:"1813-06-01", layer:"ships", place:"off Boston", title:"Shannon captures Chesapeake", summary:"A short, lethal action reverses the public pattern of American frigate victories.", sourceRefs:["nhhc"], href:"/events/chesapeake-shannon" },
  { id:"fort-mims", date:"1813-08-30", layer:"civilian", place:"Mississippi Territory", title:"Fort Mims is overrun", summary:"Mass death at the fortified settlement accelerates American mobilization in the Creek War.", sourceRefs:["nps-creek"], href:"/events/fort-mims" },
  { id:"lake-erie", date:"1813-09-10", layer:"ships", place:"Lake Erie", title:"Perry takes the British squadron", summary:"Control of the lake forces the British evacuation of Detroit.", sourceRefs:["nps-lake-erie"], href:"/events/lake-erie" },
  { id:"thames", date:"1813-10-05", layer:"military", place:"Upper Canada", title:"Battle of the Thames", summary:"The retreating British-Indigenous force is defeated and Tecumseh is killed.", sourceRefs:["nps-indigenous"], href:"/events/battle-thames" },
  { id:"newark", date:"1813-12-10", layer:"civilian", place:"Newark, Upper Canada", title:"Retreating Americans burn Newark", summary:"Civilians are displaced in winter and the act intensifies reciprocal-destruction arguments.", sourceRefs:["cwm"], href:"/events/burning-newark" },
  { id:"cochrane-proclamation", date:"1814-04-02", layer:"political", place:"North Atlantic station", title:"Cochrane offers reception and resettlement", summary:"A British proclamation creates a wartime opening seized by enslaved people pursuing freedom.", sourceRefs:["nps-freedom-1"], href:"/events/cochrane-proclamation" },
  { id:"napoleon", date:"1814-04-06", layer:"diplomatic", place:"Fontainebleau", title:"Napoleon abdicates", summary:"The European war pauses, releasing British troops, ships, and attention for North America.", sourceRefs:["cwm"], href:"/events/napoleon-abdication" },
  { id:"ghent-open", date:"1814-08-08", layer:"diplomatic", place:"Ghent", title:"Peace negotiations formally open", summary:"American and British commissioners begin bargaining while military operations continue across the Atlantic.", sourceRefs:["loc-ghent"], href:"/events/ghent-negotiations" },
  { id:"fort-jackson", date:"1814-08-09", layer:"diplomatic", place:"Mississippi Territory", title:"Treaty of Fort Jackson imposed", summary:"A vast Muscogee land cession includes territory claimed by U.S. allies as well as opponents.", sourceRefs:["nps-creek"], href:"/events/treaty-fort-jackson" },
  { id:"bladensburg", date:"1814-08-24", layer:"military", place:"Bladensburg", title:"The road to Washington opens", summary:"A disordered American defense collapses before the British advance.", sourceRefs:["nhhc-flotilla"], href:"/events/bladensburg" },
  { id:"washington", date:"1814-08-24", layer:"civilian", place:"Washington, D.C.", title:"Officials and residents evacuate", summary:"Flight, hiding, property loss, and uncertain British intentions shape the civilian experience of occupation.", sourceRefs:["nps-living"], href:"/events/burning-washington" },
  { id:"capital-news-baltimore", date:"1814-08-26", layer:"newspaper", place:"Baltimore", title:"News from the burned capital hardens preparation", summary:"Reports from Washington reach a city already building defenses and expecting attack.", sourceRefs:["bca"] },
  { id:"plattsburgh", date:"1814-09-11", layer:"ships", place:"Plattsburgh Bay", title:"Macdonough defeats the British squadron", summary:"Without lake control, the much larger British army abandons its invasion.", sourceRefs:["nps-plattsburgh"], href:"/events/lake-champlain" },
  { id:"north-point", date:"1814-09-12", layer:"military", place:"North Point", title:"Baltimore’s outer defense buys time", summary:"Maryland militia delay the British advance and British commander Robert Ross is mortally wounded.", sourceRefs:["nps-north-point"], href:"/events/north-point" },
  { id:"mchenry", date:"1814-09-13", layer:"military", place:"Baltimore harbor", title:"Bombardment of Fort McHenry begins", summary:"Bomb vessels and a rocket ship attack from beyond the useful range of most American guns.", sourceRefs:["nps-bombardment"], href:"/events/fort-mchenry" },
  { id:"baltimore-withdraw", date:"1814-09-14", layer:"military", place:"Baltimore", title:"The British operation fails", summary:"With harbor and land routes blocked, the expedition withdraws to its transports.", sourceRefs:["nps-baltimore"], href:"/events/british-withdraw-baltimore" },
  { id:"key-print", date:"1814-09-20", layer:"newspaper", place:"Baltimore", title:"Key’s lyric circulates in print", summary:"A witnessed bombardment becomes a reproducible public text within days.", sourceRefs:["nps-bombardment"], href:"/documents/defence-fort-mhenry" },
  { id:"pensacola", date:"1814-11-07", layer:"military", place:"Pensacola", title:"Jackson enters Spanish territory", summary:"American forces expel a British presence before moving toward New Orleans.", sourceRefs:["nps-prince-witten"], href:"/events/pensacola" },
  { id:"ghent-sign", date:"1814-12-24", layer:"diplomatic", place:"Ghent", title:"The treaty is signed", summary:"The agreement exists in Europe but has not crossed the Atlantic or become legally effective.", sourceRefs:["loc-ghent"], href:"/events/treaty-ghent" },
  { id:"new-orleans", date:"1815-01-08", layer:"military", place:"Chalmette", title:"Main assault at New Orleans", summary:"Jackson’s coalition wins an overwhelming defensive victory without knowing peace has been signed.", sourceRefs:["nps-new-orleans-black"], href:"/events/new-orleans" },
  { id:"treaty-arrives", date:"1815-02-11", layer:"diplomatic", place:"New York", title:"The treaty reaches the United States", summary:"A British vessel delivers the signed agreement roughly seven weeks after Ghent.", sourceRefs:["loc-ghent"] },
  { id:"ratification", date:"1815-02-17", layer:"political", place:"Washington, D.C.", title:"Ratifications are exchanged", summary:"Peace becomes effective for the United States; distant forces and prisoners still need the news.", sourceRefs:["loc-ghent"], href:"/events/us-ratification" },
  { id:"dartmoor", date:"1815-04-06", layer:"civilian", place:"Dartmoor Prison", title:"Guards fire on American prisoners", summary:"Seven prisoners are killed amid prolonged postwar confinement and uncertainty over release.", sourceRefs:["nps-dartmoor"] },
  { id:"rush-bagot", date:"1817-04-28", layer:"diplomatic", place:"Washington and London", title:"Rush–Bagot exchange completed", summary:"The governments limit naval armaments on the Great Lakes through exchanged notes.", sourceRefs:["state-rush-bagot"], href:"/events/rush-bagot" },
  { id:"convention", date:"1818-10-20", layer:"diplomatic", place:"London", title:"Convention of 1818 signed", summary:"The United States and Britain settle portions of the boundary and agree to joint occupation farther west.", sourceRefs:["state-rush-bagot"], href:"/events/convention-1818" },
];

export type CommunicationRoute = {
  id: string;
  from: string;
  to: string;
  best: number;
  typical: number;
  severe: number;
  method: string;
  constraint: string;
};

export const communicationRoutes: CommunicationRoute[] = [
  { id:"london-washington", from:"London", to:"Washington", best:28, typical:43, severe:70, method:"packet or merchant vessel, then overland", constraint:"winds, convoy schedules, capture risk, and no direct telegraph" },
  { id:"ghent-washington", from:"Ghent", to:"Washington", best:38, typical:50, severe:72, method:"courier to the coast, Atlantic passage, then land", constraint:"winter seas and dependence on a suitable sailing" },
  { id:"washington-baltimore", from:"Washington", to:"Baltimore", best:1, typical:2, severe:4, method:"mounted express or stage road", constraint:"road conditions, fresh horses, and disrupted traffic" },
  { id:"baltimore-new-orleans", from:"Baltimore", to:"New Orleans", best:18, typical:32, severe:55, method:"coastal vessel or mixed road-and-river route", constraint:"blockade, Gulf weather, difficult overland links" },
  { id:"washington-detroit", from:"Washington", to:"Detroit", best:18, typical:30, severe:50, method:"post roads, river crossings, and lake transport", constraint:"season, damaged roads, distance, and hostile operations" },
  { id:"montreal-niagara", from:"Montreal", to:"Niagara", best:8, typical:14, severe:26, method:"St. Lawrence and Lake Ontario transport", constraint:"ice, rapids, vessel availability, and American naval pressure" },
  { id:"sackets-detroit", from:"Sackets Harbor", to:"Detroit", best:12, typical:22, severe:40, method:"lake vessel plus portage and road", constraint:"control of Lake Ontario and Erie, transshipment, and season" },
  { id:"halifax-chesapeake", from:"Halifax", to:"Chesapeake Bay", best:7, typical:13, severe:24, method:"naval dispatch vessel", constraint:"weather, fleet rendezvous, and enemy cruisers" },
];

export type CourierChoice = { label: string; days: number; risk: number; note: string };
export type CourierLeg = { from: string; to: string; choices: CourierChoice[] };
export type CourierMission = { id: string; title: string; date: string; charge: string; cargo: string; context: string; deadline: number; legs: CourierLeg[]; truthAtArrival: string };

export const courierMissions: CourierMission[] = [
  { id:"ghent", title:"Carry the Treaty of Ghent", date:"24 December 1814", charge:"Ghent → Washington", cargo:"A signed treaty whose legal force still depends on ratification", context:"Fighting continues because neither armies nor publics can act on an agreement they have not received.", deadline:55, truthAtArrival:"Before the treaty reaches Washington, the main Battle of New Orleans has already been fought. Sequence is not causation.", legs:[
    { from:"Ghent", to:"Ostend", choices:[{label:"Wait for an official coach",days:3,risk:2,note:"Reliable papers and escort, but the coast does not wait."},{label:"Hire horses immediately",days:2,risk:8,note:"Faster movement with more chance of breakdown or confusion."}] },
    { from:"Ostend", to:"English Channel", choices:[{label:"Take the first neutral vessel",days:4,risk:18,note:"Departure is quick; its papers and seaworthiness are less certain."},{label:"Wait for a government packet",days:8,risk:5,note:"A slower but better protected passage."}] },
    { from:"Channel", to:"New York", choices:[{label:"Winter Atlantic crossing",days:36,risk:22,note:"A favorable passage is possible; storms or damage can add weeks."},{label:"Sail with convoy protection",days:45,risk:8,note:"Assembly and convoy speed sacrifice time for security."}] },
    { from:"New York", to:"Washington", choices:[{label:"Mounted express",days:4,risk:12,note:"Change horses and press south over winter roads."},{label:"Regular post",days:7,risk:3,note:"More dependable, but each scheduled handoff costs time."}] },
  ] },
  { id:"london", title:"Carry London’s decision", date:"June 1812", charge:"London → Washington", cargo:"A policy change concerning the Orders in Council", context:"A decision made in London cannot end an American crisis until it is carried, received, trusted, and interpreted.", deadline:42, truthAtArrival:"War may already have been declared before reliable news of the British policy change can alter debate.", legs:[
    { from:"Whitehall", to:"Liverpool", choices:[{label:"Government dispatch",days:3,risk:3,note:"Official and authenticated."},{label:"Commercial express",days:2,risk:10,note:"Fast, but the report may arrive without convincing papers."}] },
    { from:"Liverpool", to:"Halifax", choices:[{label:"Fast packet",days:27,risk:18,note:"A good run depends on wind and an immediate berth."},{label:"Merchant convoy",days:39,risk:6,note:"Safer, slower, and tied to the convoy’s departure."}] },
    { from:"Halifax", to:"Washington", choices:[{label:"Coastal vessel",days:10,risk:16,note:"Fast if the coast and blockade allow it."},{label:"Overland dispatch",days:16,risk:8,note:"Long roads avoid some naval uncertainty."}] },
  ] },
  { id:"chesapeake", title:"Move orders through the Chesapeake", date:"August 1814", charge:"Washington → Baltimore defenses", cargo:"Warnings and revised orders during the British advance", context:"Commanders are moving, roads are crowded, and a dispatch can reach the right city but the wrong headquarters.", deadline:3, truthAtArrival:"A delay of one or two days can turn advance warning into news of an event already completed.", legs:[
    { from:"Washington", to:"Ellicott’s Mills", choices:[{label:"Direct post road",days:1,risk:22,note:"Shortest route, congested by officials, civilians, and military traffic."},{label:"Western road",days:2,risk:8,note:"A longer approach avoids the principal movement corridor."}] },
    { from:"Ellicott’s Mills", to:"Baltimore", choices:[{label:"Ride through the night",days:1,risk:18,note:"Exhausted horses and darkness raise the chance of failure."},{label:"Wait for daylight",days:2,risk:4,note:"Reliable navigation costs the defenders time."}] },
  ] },
  { id:"lakes", title:"Coordinate an inland campaign", date:"Spring 1813", charge:"Albany → Sackets Harbor → Niagara", cargo:"Orders, estimates, and changing naval priorities", context:"Army plans depend on ships that are still being built and on information that ages during every transfer.", deadline:16, truthAtArrival:"By delivery, ship readiness, ice, roads, and enemy activity may have changed the plan’s premises.", legs:[
    { from:"Albany", to:"Utica", choices:[{label:"Turnpike express",days:3,risk:8,note:"Pay for speed and regular relays."},{label:"Supply convoy",days:6,risk:3,note:"Orders travel with the materiel they discuss."}] },
    { from:"Utica", to:"Sackets Harbor", choices:[{label:"Northern road",days:4,risk:16,note:"Mud and spring runoff can erase the timetable."},{label:"Wait for improved road",days:7,risk:5,note:"The road improves while the strategic window narrows."}] },
    { from:"Sackets Harbor", to:"Niagara", choices:[{label:"Dispatch schooner",days:4,risk:25,note:"Fast only if the squadron controls the water and can spare a vessel."},{label:"Overland around the lake",days:10,risk:9,note:"Slow but less dependent on naval conditions."}] },
  ] },
];

export const blockadeRegions = [
  { id:"chesapeake", name:"Chesapeake", exposure:1.18, customs:.82, privateering:.9, note:"Deep water access, vulnerable rivers, major privateering ports, and an expanding British operational base." },
  { id:"new-england", name:"New England", exposure:.82, customs:1.12, privateering:.84, note:"Heavy commercial dependence, regional opposition to the war, smuggling, and initially uneven British pressure." },
  { id:"middle-atlantic", name:"Middle Atlantic", exposure:1, customs:1.2, privateering:1.15, note:"Large ports and customs flows combine with strong privateering and high-value targets." },
  { id:"south-atlantic", name:"South Atlantic", exposure:1.08, customs:.72, privateering:.68, note:"Long coastline, export dependence, plantation commodities, and uneven defensive capacity." },
  { id:"gulf", name:"Gulf Coast", exposure:.92, customs:.58, privateering:.74, note:"Distant from the first blockade zones but vulnerable when British forces concentrate late in the war." },
];

export const lakeBases = [
  { id:"sackets", name:"Sackets Harbor", water:"Lake Ontario", timber:1.1, iron:.76, labor:1.02, transport:.66, threat:.82, season:.68, note:"A powerful yard at the end of a long and fragile supply line." },
  { id:"kingston", name:"Kingston", water:"Lake Ontario", timber:.95, iron:.9, labor:1.06, transport:.82, threat:.78, season:.68, note:"A developed imperial base supplied through the St. Lawrence system." },
  { id:"erie", name:"Erie", water:"Lake Erie", timber:1.14, iron:.62, labor:.76, transport:.55, threat:.72, season:.72, note:"Excellent timber; difficult movement of guns, iron, skilled workers, and crews across the watershed." },
  { id:"champlain", name:"Lake Champlain", water:"Lake Champlain", timber:1.06, iron:.7, labor:.84, transport:.74, threat:.88, season:.63, note:"A narrow strategic corridor where rapid construction could decide whether an army remained supplied." },
];
