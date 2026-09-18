export type GisLayerId =
  | "campaigns"
  | "blockade"
  | "privateering"
  | "freedom"
  | "logistics"
  | "homelands"
  | "boundaries"
  | "shorelines"
  | "territory"
  | "survivals";

export type Coordinate = [number, number];
export type GisGeometry =
  | { type: "Point"; coordinates: Coordinate }
  | { type: "LineString"; coordinates: Coordinate[] }
  | { type: "Polygon"; coordinates: Coordinate[][] };

export type GisSource = {
  id: string;
  title: string;
  institution: string;
  url: string;
  note: string;
};

export type GisFeature = {
  type: "Feature";
  id: string;
  geometry: GisGeometry;
  properties: {
    title: string;
    layer: GisLayerId;
    start: string;
    end: string;
    summary: string;
    confidence: "high" | "medium" | "low";
    precision: "site" | "corridor" | "generalized area" | "interpretive reconstruction";
    method: string;
    sourceIds: string[];
    then?: string;
    now?: string;
  };
};

export const gisLayers: { id: GisLayerId; label: string; short: string; color: string }[] = [
  { id: "campaigns", label: "Campaign routes", short: "Armies and raids", color: "#c7463d" },
  { id: "blockade", label: "British blockade", short: "Changing naval pressure", color: "#5aa9c8" },
  { id: "privateering", label: "Privateering patterns", short: "Departure and capture corridors", color: "#f0b34b" },
  { id: "freedom", label: "Freedom-seeking routes", short: "Flight to British lines", color: "#d581b3" },
  { id: "logistics", label: "Shipyards and supply", short: "The war behind the battles", color: "#63b98d" },
  { id: "homelands", label: "Indigenous homelands", short: "Overlapping lived landscapes", color: "#b7a15c" },
  { id: "boundaries", label: "Roads and boundaries", short: "Period movement and claims", color: "#d8d0bc" },
  { id: "shorelines", label: "Historical shorelines", short: "Places altered since 1812", color: "#8fd1d6" },
  { id: "territory", label: "Territorial change", short: "Cession, occupation, restoration", color: "#9a6fc0" },
  { id: "survivals", label: "Surviving sites", short: "The past in the present", color: "#f5eee0" },
];

export const gisSources: GisSource[] = [
  { id: "loc-maps", title: "Geography and Map Collections", institution: "Library of Congress", url: "https://www.loc.gov/maps/", note: "Period maps used to check place names, roads, coastlines, settlements, and political geography." },
  { id: "loc-guide", title: "War of 1812: A Resource Guide", institution: "Library of Congress", url: "https://guides.loc.gov/war-of-1812", note: "Gateway to campaign maps, newspapers, manuscripts, and printed primary sources." },
  { id: "nps-war", title: "War of 1812", institution: "National Park Service", url: "https://www.nps.gov/subjects/warof1812/index.htm", note: "Campaign, place, community, and preservation context." },
  { id: "nps-indigenous", title: "Native Voices: War of 1812", institution: "National Park Service", url: "https://www.nps.gov/subjects/warof1812/native-voices.htm", note: "Indigenous objectives, alliances, and consequences; polygons here are interpretive regions, never borders." },
  { id: "cwm", title: "1812: One War, Four Perspectives", institution: "Canadian War Museum", url: "https://www.warmuseum.ca/war-of-1812/", note: "Comparative American, British, Canadian, and Indigenous interpretation." },
  { id: "parks-war", title: "War of 1812 National Historic Sites", institution: "Parks Canada", url: "https://parks.canada.ca/culture/designation/evenement-event/guerre-war-1812", note: "Canadian campaign places and surviving historic sites." },
  { id: "nhhc", title: "War of 1812", institution: "Naval History and Heritage Command", url: "https://www.history.navy.mil/browse-by-topic/wars-conflicts-and-operations/1812.html", note: "Naval operations, lake fleets, blockade, and ship histories." },
  { id: "nps-privateers", title: "Privateers Make Their Mark", institution: "National Park Service", url: "https://www.nps.gov/stsp/learn/historyculture/privateers-make-their-mark.htm", note: "Baltimore privateering and commerce raiding." },
  { id: "nps-freedom", title: "Black Freedom Seeking During the War of 1812", institution: "National Park Service", url: "https://www.nps.gov/articles/000/black-freedom-seeking-during-the-war-of-1812-from-the-chesapeake-cumberland-island-and-beyond-part-1.htm", note: "Flight from slavery, British lines, and movements beyond the Chesapeake." },
  { id: "nps-colonial", title: "Freedom Seekers and the Colonial Marines", institution: "National Park Service", url: "https://www.nps.gov/stsp/learn/historyculture/colonial-marines.htm", note: "Tangier Island, the Corps of Colonial Marines, and Black refugee movement." },
  { id: "nps-flotilla", title: "Chesapeake Flotilla", institution: "Naval History and Heritage Command", url: "https://www.history.navy.mil/research/underwater-archaeology/sites-and-projects/ship-wrecksites/chesapeakeflotilla1812.html", note: "Barney's flotilla, Patuxent operations, and underwater archaeology." },
  { id: "nps-creek", title: "Creek War in the Southeast", institution: "National Park Service", url: "https://www.nps.gov/articles/creek-war-in-the-southeast-1.htm", note: "Muscogee civil war, United States intervention, and the road to the Treaty of Fort Jackson." },
  { id: "state-rush-bagot", title: "Rush–Bagot Pact and Convention of 1818", institution: "Office of the Historian, U.S. Department of State", url: "https://history.state.gov/milestones/1801-1829/rush-bagot", note: "Postwar Great Lakes demilitarization and boundary settlement." },
  { id: "nps-sites", title: "Places of the War of 1812", institution: "National Park Service", url: "https://www.nps.gov/subjects/warof1812/places.htm", note: "Surviving and commemorated places used for the present-day overlay." },
];

const feature = (id: string, layer: GisLayerId, title: string, geometry: GisGeometry, start: string, end: string, summary: string, sourceIds: string[], confidence: GisFeature["properties"]["confidence"] = "medium", precision: GisFeature["properties"]["precision"] = "corridor", method = "Generalized from the cited campaign and place records; bends indicate sequence, not a surveyed track.", extras: Pick<GisFeature["properties"], "then" | "now"> = {}): GisFeature => ({
  type: "Feature", id, geometry,
  properties: { title, layer, start, end, summary, sourceIds, confidence, precision, method, ...extras },
});

export const gisFeatures: GisFeature[] = [
  feature("hull-detroit", "campaigns", "Hull's road to Detroit", { type: "LineString", coordinates: [[-84.51,39.76],[-83.75,40.11],[-83.2,41.1],[-83.05,42.33]] }, "1812-05-25", "1812-08-16", "The northward supply corridor that ended with Detroit's surrender.", ["loc-guide","nps-war"], "medium"),
  feature("queenston-crossing", "campaigns", "Queenston Heights crossing", { type: "LineString", coordinates: [[-78.88,43.08],[-79.05,43.16]] }, "1812-10-13", "1812-10-13", "An American river crossing from Lewiston toward Queenston, followed by defeat and surrender.", ["parks-war","cwm"], "high", "site"),
  feature("lake-erie-thames", "campaigns", "Lake Erie to the Thames", { type: "LineString", coordinates: [[-83.04,41.65],[-82.81,42.18],[-82.18,42.39],[-81.87,42.56]] }, "1813-09-27", "1813-10-05", "Harrison's pursuit after Perry's victory, ending at the Thames and the death of Tecumseh.", ["nps-war","cwm"], "medium"),
  feature("st-lawrence-campaign", "campaigns", "The St. Lawrence campaign", { type: "LineString", coordinates: [[-76.49,44.23],[-75.93,44.33],[-75.18,44.74],[-74.64,45.01]] }, "1813-10-17", "1813-11-13", "Wilkinson's Montreal expedition moved down the St. Lawrence before turning back after Crysler's Farm.", ["loc-guide","parks-war"], "medium"),
  feature("niagara-1814", "campaigns", "Niagara campaign", { type: "LineString", coordinates: [[-79.06,42.89],[-78.93,43.09],[-79.08,43.09],[-79.07,43.16]] }, "1814-07-03", "1814-11-05", "Chippawa, Lundy's Lane, and Fort Erie compressed a destructive campaign into a narrow river corridor.", ["parks-war","cwm"], "high", "corridor"),
  feature("plattsburgh", "campaigns", "Prévost's Plattsburgh advance", { type: "LineString", coordinates: [[-73.55,45.0],[-73.36,44.73],[-73.45,44.43],[-73.45,44.7]] }, "1814-08-31", "1814-09-11", "The British advance south along Lake Champlain depended on the fleet Macdonough defeated.", ["nps-war","cwm"], "medium"),
  feature("washington-raid", "campaigns", "Benedict to Washington", { type: "LineString", coordinates: [[-76.69,38.51],[-76.64,38.75],[-76.86,38.94],[-77.04,38.9]] }, "1814-08-19", "1814-08-25", "Ross's force landed on the Patuxent, defeated the defense at Bladensburg, and entered Washington.", ["nps-flotilla","nps-war"], "high", "corridor"),
  feature("baltimore-campaign", "campaigns", "North Point and Baltimore", { type: "LineString", coordinates: [[-76.43,39.2],[-76.48,39.27],[-76.58,39.29]] }, "1814-09-12", "1814-09-14", "The British land advance met Stricker at North Point while the fleet tested Fort McHenry.", ["nps-war","nps-sites"], "high", "corridor"),
  feature("new-orleans-campaign", "campaigns", "Lake Borgne to New Orleans", { type: "LineString", coordinates: [[-89.63,30.02],[-89.88,29.94],[-89.99,29.99]] }, "1814-12-14", "1815-01-08", "A waterborne approach through the lakes and bayous brought the British army below New Orleans.", ["nps-war","loc-guide"], "medium"),

  feature("chesapeake-blockade", "blockade", "Chesapeake blockade zone", { type: "Polygon", coordinates: [[[-76.7,36.7],[-75.5,36.5],[-74.9,38.9],[-75.8,39.7],[-76.6,38.5],[-76.7,36.7]]] }, "1813-02-04", "1815-02-17", "British squadrons used the bay as a naval highway and progressively restricted American movement.", ["nhhc","nps-flotilla"], "medium", "generalized area", "Interpretive operational zone, not a daily ship-position plot. Extent changes with the time control."),
  feature("mid-atlantic-blockade", "blockade", "Mid-Atlantic blockade", { type: "Polygon", coordinates: [[[-75.7,35.4],[-73.3,35.6],[-72.2,41.0],[-74.0,41.4],[-75.2,38.7],[-75.7,35.4]]] }, "1813-05-26", "1815-02-17", "The blockade expanded beyond the Chesapeake toward the principal ports of the middle states.", ["nhhc","loc-guide"], "low", "interpretive reconstruction", "Generalized from blockade proclamations and operational accounts; no fixed offshore edge existed."),
  feature("atlantic-gulf-blockade", "blockade", "Atlantic and Gulf blockade", { type: "Polygon", coordinates: [[[-81.6,25.0],[-78.6,24.5],[-73.3,35.4],[-72.3,41.2],[-69.5,43.0],[-68.7,41.0],[-75.0,32.0],[-86.5,28.0],[-89.2,29.1],[-87.0,30.4],[-81.6,25.0]]] }, "1814-04-25", "1815-02-17", "By 1814 British pressure covered nearly the entire Atlantic and Gulf coast, though enforcement remained uneven.", ["nhhc","loc-guide"], "low", "interpretive reconstruction", "A theatre-scale envelope rather than a legal or continuously occupied polygon."),

  feature("baltimore-privateers", "privateering", "Baltimore privateer corridor", { type: "LineString", coordinates: [[-76.58,39.28],[-75.8,37.8],[-72.0,36.5],[-67.5,38.0]] }, "1812-06-20", "1815-02-17", "Fast schooners left Baltimore, passed the capes, and hunted British commerce across the western Atlantic.", ["nps-privateers","nhhc"], "medium", "interpretive reconstruction", "Representative traffic pattern assembled from port and prize narratives; not one vessel's voyage."),
  feature("salem-privateers", "privateering", "New England privateer corridor", { type: "LineString", coordinates: [[-70.9,42.52],[-68.0,41.5],[-64.0,43.0]] }, "1812-06-20", "1815-02-17", "Privateers from Salem and neighboring ports worked the approaches to British North America and the North Atlantic.", ["nhhc","loc-guide"], "low", "interpretive reconstruction"),
  feature("chesapeake-prizes", "privateering", "Chesapeake prize return", { type: "LineString", coordinates: [[-68.5,35.0],[-72.0,36.5],[-75.9,37.1],[-76.58,39.28]] }, "1812-07-01", "1814-04-25", "Captured merchantmen had to reach an American port through increasingly dangerous blockade waters.", ["nps-privateers","loc-guide"], "low", "interpretive reconstruction"),

  feature("hampton-freedom", "freedom", "Hampton Roads to British ships", { type: "LineString", coordinates: [[-76.6,37.0],[-76.32,36.94],[-75.9,36.8]] }, "1813-06-01", "1814-09-30", "Enslaved people used raids, local water knowledge, and British vessels in Hampton Roads to seek freedom.", ["nps-freedom","nps-colonial"], "medium", "interpretive reconstruction", "A composite corridor. Individual journeys were clandestine and cannot usually be traced as continuous lines."),
  feature("patuxent-tangier-freedom", "freedom", "Patuxent and Potomac to Tangier", { type: "LineString", coordinates: [[-77.05,38.25],[-76.7,38.5],[-76.3,38.0],[-75.99,37.83]] }, "1814-04-02", "1815-03-01", "Freedom seekers moved toward British raiding parties and the Tangier base where Colonial Marines trained.", ["nps-freedom","nps-colonial"], "medium", "interpretive reconstruction"),
  feature("refugee-diaspora", "freedom", "Black refugee diaspora", { type: "LineString", coordinates: [[-75.99,37.83],[-64.75,32.3],[-63.58,44.65],[-61.22,10.69]] }, "1814-05-01", "1816-12-31", "British evacuation dispersed Black refugees toward Bermuda, Nova Scotia, and Trinidad after the war.", ["nps-freedom","nps-colonial"], "medium", "corridor", "Destinations are documented; the connecting segments are schematic sea passages."),

  feature("erie-shipyard", "logistics", "Erie shipyard to Put-in-Bay", { type: "LineString", coordinates: [[-80.08,42.13],[-81.0,42.2],[-82.8,41.65]] }, "1813-03-01", "1813-09-10", "Ships built and armed at Erie made Perry's Lake Erie campaign possible.", ["nhhc","nps-war"], "high", "corridor"),
  feature("sackets-niagara", "logistics", "Sackets Harbor–Niagara supply line", { type: "LineString", coordinates: [[-76.12,43.95],[-77.8,43.5],[-79.05,43.16]] }, "1812-07-01", "1814-11-05", "Lake Ontario fleets linked the principal American naval yard to operations on the Niagara.", ["nhhc","parks-war"], "medium"),
  feature("kingston-niagara", "logistics", "Kingston–Niagara supply line", { type: "LineString", coordinates: [[-76.49,44.23],[-78.0,43.7],[-79.08,43.25]] }, "1812-06-18", "1814-11-05", "British naval construction at Kingston supported Upper Canada's exposed western front.", ["nhhc","parks-war"], "medium"),
  feature("patuxent-flotilla", "logistics", "Chesapeake Flotilla corridor", { type: "LineString", coordinates: [[-76.4,38.3],[-76.6,38.55],[-76.68,38.75]] }, "1814-06-01", "1814-08-22", "Barney's shallow-draft flotilla maneuvered in the Patuxent before its destruction above Pig Point.", ["nps-flotilla"], "high", "corridor"),
  feature("montreal-upper-canada", "logistics", "St. Lawrence lifeline", { type: "LineString", coordinates: [[-73.57,45.5],[-74.9,44.9],[-76.49,44.23]] }, "1812-06-18", "1815-02-17", "The St. Lawrence carried troops and supplies from Montreal toward Kingston and Upper Canada.", ["parks-war","cwm"], "medium"),

  feature("anishinaabe", "homelands", "Anishinaabe homelands and alliance networks", { type: "Polygon", coordinates: [[[-92.0,45.0],[-88.0,42.0],[-82.0,43.0],[-80.0,47.0],[-84.0,50.0],[-90.0,50.0],[-92.0,45.0]]] }, "1812-01-01", "1817-12-31", "A broad, overlapping Great Lakes world—not a state border—in which Ojibwe, Odawa, and Potawatomi communities pursued their own strategies.", ["nps-indigenous","cwm"], "low", "generalized area", "Interpretive homeland region. It intentionally overlaps other Indigenous landscapes and must not be read as an exclusive legal boundary."),
  feature("haudenosaunee", "homelands", "Haudenosaunee homelands", { type: "Polygon", coordinates: [[[-80.2,42.1],[-76.0,41.7],[-73.2,44.5],[-76.5,45.1],[-79.5,44.0],[-80.2,42.1]]] }, "1812-01-01", "1817-12-31", "Communities divided by the international border and by wartime allegiance occupied a connected homeland around the lower Great Lakes.", ["nps-indigenous","cwm"], "low", "generalized area", "Interpretive, overlapping region based on community locations and alliance geography."),
  feature("western-confederacy", "homelands", "Shawnee, Miami, and allied homelands", { type: "Polygon", coordinates: [[[-89.5,39.0],[-87.5,37.8],[-82.0,38.2],[-81.5,42.2],[-85.5,43.0],[-89.5,39.0]]] }, "1812-01-01", "1817-12-31", "The Ohio–Wabash country at the center of Tecumseh's confederacy and American expansion.", ["nps-indigenous","cwm"], "low", "generalized area", "A deliberately broad coalition landscape, not a claim of uniform control."),
  feature("muscogee", "homelands", "Muscogee homelands", { type: "Polygon", coordinates: [[[-88.7,30.8],[-84.0,31.0],[-82.5,34.4],[-85.5,35.2],[-88.3,33.8],[-88.7,30.8]]] }, "1812-01-01", "1817-12-31", "A network of towns and river valleys divided by civil war, American invasion, and the Fort Jackson cession.", ["nps-creek","nps-indigenous"], "low", "generalized area", "The polygon indicates a connected town-and-river world and overlaps neighboring homelands."),
  feature("cherokee", "homelands", "Cherokee homelands", { type: "Polygon", coordinates: [[[-87.0,33.5],[-83.0,33.8],[-80.8,36.0],[-83.8,37.0],[-87.0,35.8],[-87.0,33.5]]] }, "1812-01-01", "1817-12-31", "Cherokee towns and leaders entered the southern war for reasons distinct from United States expansionist goals.", ["nps-indigenous","nps-creek"], "low", "generalized area", "Interpretive, overlapping region; not a cadastral boundary."),

  feature("great-lakes-boundary", "boundaries", "International boundary through the lakes", { type: "LineString", coordinates: [[-89.5,48.0],[-84.5,46.0],[-83.1,42.1],[-79.0,43.2],[-76.5,44.2],[-73.6,45.0]] }, "1812-01-01", "1817-12-31", "The treaty boundary crossed Indigenous homelands and waterways whose exact demarcation remained unfinished.", ["loc-maps","state-rush-bagot"], "medium", "corridor", "Generalized treaty line; later commissions surveyed and adjusted particular segments."),
  feature("kings-highway", "boundaries", "King's Highway", { type: "LineString", coordinates: [[-83.0,42.3],[-81.25,42.98],[-79.4,43.65],[-76.5,44.23]] }, "1812-01-01", "1817-12-31", "The principal overland route through Upper Canada linked settlements, posts, and military supply points.", ["loc-maps","parks-war"], "low", "corridor", "Generalized from period-road geography; the historic road changed alignment and survives in fragments."),
  feature("champlain-road", "boundaries", "Lake Champlain invasion corridor", { type: "LineString", coordinates: [[-73.58,45.5],[-73.45,44.7],[-73.45,44.43]] }, "1812-01-01", "1817-12-31", "Roads and water routes south of Montreal made the Champlain valley a recurrent invasion axis.", ["loc-maps","nps-war"], "medium", "corridor"),
  feature("spanish-florida", "boundaries", "Spanish Florida and the contested Gulf border", { type: "LineString", coordinates: [[-87.6,31.0],[-85.0,31.0],[-82.0,31.0],[-81.4,30.7]] }, "1812-01-01", "1817-12-31", "A contested imperial border connected the Creek War, Pensacola, Mobile, and later American expansion.", ["loc-maps","nps-creek"], "low", "corridor", "Generalized political line; West Florida claims and control were contested."),

  feature("baltimore-1812-shore", "shorelines", "Baltimore's 1812 harbor edge", { type: "LineString", coordinates: [[-76.62,39.29],[-76.6,39.28],[-76.58,39.27],[-76.55,39.25]] }, "1812-01-01", "1817-12-31", "A schematic period shoreline marks a harbor later transformed by fill, rail infrastructure, dredging, and industry.", ["loc-maps","nps-sites"], "low", "interpretive reconstruction", "Visible only at close conceptual scale; consult local cadastral and hydrographic maps before parcel-level use.", { then: "A working tidal harbor of wharves, mudflats, shipyards, and defensive approaches.", now: "A heavily engineered waterfront whose modern edge should not be projected backward." }),
  feature("york-1812-shore", "shorelines", "York's 1812 waterfront", { type: "LineString", coordinates: [[-79.42,43.64],[-79.38,43.65],[-79.34,43.66]] }, "1812-01-01", "1817-12-31", "The town's original Lake Ontario edge lay north of much of today's filled Toronto waterfront.", ["loc-maps","parks-war"], "medium", "interpretive reconstruction", "Schematic historical edge intended to flag shoreline change, not to settle property location.", { then: "A shallow lakeshore and military harbor beside the small town of York.", now: "Railways, port works, and landfill moved the visible shoreline south." }),

  feature("fort-jackson-cession", "territory", "Fort Jackson cession", { type: "Polygon", coordinates: [[[-88.3,30.8],[-84.9,31.0],[-84.4,32.8],[-85.7,34.5],[-87.4,34.3],[-88.3,30.8]]] }, "1814-08-09", "1817-12-31", "The treaty imposed an enormous land cession on the Muscogee Confederacy, including towns that had fought alongside the United States.", ["nps-creek","nps-indigenous"], "low", "generalized area", "Interpretive extent only. Treaty descriptions and later surveys control any exact boundary."),
  feature("restored-positions", "territory", "Conquests restored by the Treaty of Ghent", { type: "LineString", coordinates: [[-84.62,45.87],[-83.05,42.33],[-79.08,43.25],[-67.0,45.0]] }, "1814-12-24", "1815-06-30", "The peace restored captured places rather than redrawing the border, obscuring how much territory had changed hands temporarily.", ["loc-guide","state-rush-bagot"], "medium", "interpretive reconstruction", "Connects representative restored positions; it is not a treaty boundary."),
  feature("rush-bagot-lakes", "territory", "Rush–Bagot demilitarized waters", { type: "LineString", coordinates: [[-92.0,47.8],[-87.0,45.5],[-83.1,42.2],[-79.0,43.2],[-76.2,44.0]] }, "1817-04-28", "1817-12-31", "The exchange of notes sharply limited naval forces on the Great Lakes and Lake Champlain, turning wartime shipbuilding corridors into a demilitarization problem.", ["state-rush-bagot"], "medium", "corridor", "Connects the covered lake systems schematically; the agreement applied by named waters and vessel limits, not by this line."),

  feature("site-fort-mchenry", "survivals", "Fort McHenry", { type: "Point", coordinates: [-76.5798,39.2631] }, "1812-01-01", "1817-12-31", "The star fort and its waterfront setting remain accessible in Baltimore.", ["nps-sites"], "high", "site", "Modern point located at the surviving historic site.", { then: "A working harbor fort guarding the Northwest Branch approaches.", now: "Fort McHenry National Monument and Historic Shrine." }),
  feature("site-fort-george", "survivals", "Fort George", { type: "Point", coordinates: [-79.0638,43.2501] }, "1812-01-01", "1817-12-31", "Reconstructed and surviving landscape elements interpret the Niagara frontier.", ["parks-war"], "high", "site", "Modern visitor-site point.", { then: "British headquarters on the Niagara until the American capture in 1813.", now: "Fort George National Historic Site." }),
  feature("site-fort-malden", "survivals", "Fort Malden", { type: "Point", coordinates: [-83.1127,42.1024] }, "1812-01-01", "1817-12-31", "The Amherstburg post anchored the western British position.", ["parks-war"], "high", "site", "Modern visitor-site point.", { then: "British post, dockyard, and alliance center at Amherstburg.", now: "Fort Malden National Historic Site." }),
  feature("site-sackets", "survivals", "Sackets Harbor battlefield", { type: "Point", coordinates: [-76.1191,43.9462] }, "1812-01-01", "1817-12-31", "The American Lake Ontario shipyard landscape survives in part.", ["nps-sites","nhhc"], "high", "site", "Modern preservation-site point.", { then: "The principal American naval base and shipbuilding yard on Lake Ontario.", now: "Sackets Harbor Battlefield State Historic Site and a living village." }),
  feature("site-horseshoe", "survivals", "Horseshoe Bend", { type: "Point", coordinates: [-85.74,32.98] }, "1812-01-01", "1817-12-31", "The Tallapoosa River bend preserves the landscape of the devastating 1814 battle.", ["nps-creek","nps-sites"], "high", "site", "Modern preservation-site point.", { then: "Tohopeka, a fortified Red Stick town within a river bend.", now: "Horseshoe Bend National Military Park." }),
  feature("site-plattsburgh", "survivals", "Plattsburgh Bay", { type: "Point", coordinates: [-73.43,44.69] }, "1812-01-01", "1817-12-31", "The bay remains the readable water landscape of Macdonough's 1814 victory.", ["nps-sites","nhhc"], "high", "site", "Modern landscape point.", { then: "A prepared American anchorage where naval position shaped the battle.", now: "A modern bay and city landscape with interpreted War of 1812 sites." }),
  feature("site-chalmette", "survivals", "Chalmette battlefield", { type: "Point", coordinates: [-89.99,29.94] }, "1812-01-01", "1817-12-31", "Part of the battlefield below New Orleans is preserved along the Mississippi.", ["nps-sites"], "high", "site", "Modern visitor-site point.", { then: "Plantation ground cut by canals, levees, and Rodriguez Canal.", now: "Chalmette Battlefield within Jean Lafitte National Historical Park and Preserve." }),
];

export const gisTimeline = [
  { date: "1812-06-18", label: "War declared" },
  { date: "1812-10-13", label: "Queenston Heights" },
  { date: "1813-05-26", label: "Blockade widens" },
  { date: "1813-10-05", label: "The Thames" },
  { date: "1814-04-25", label: "Coast under pressure" },
  { date: "1814-08-09", label: "Fort Jackson" },
  { date: "1814-08-24", label: "Washington burns" },
  { date: "1814-09-14", label: "Baltimore holds" },
  { date: "1814-12-24", label: "Ghent signed" },
  { date: "1815-02-17", label: "Peace ratified" },
  { date: "1817-04-28", label: "Rush–Bagot" },
];

export const historicalGeoJson = {
  type: "FeatureCollection" as const,
  name: "1812: The Whole Story — Historical GIS",
  generated: "2026-09-18",
  license: "Editorial interpretation; consult item-level source rights. Geometry is not for navigation or legal use.",
  sources: gisSources,
  features: gisFeatures,
};
