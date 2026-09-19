export type PerspectiveRefKind = "story" | "events" | "people" | "places" | "ships" | "documents" | "objects" | "edition" | "map";

export type PerspectiveRef = { kind: PerspectiveRefKind; slug: string; label?: string };

export type PerspectiveStage = {
  kicker: string;
  title: string;
  summary: string;
  argument: string;
  evidence: PerspectiveRef[];
  sourceRefs?: string[];
};

export type Perspective = {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  question: string;
  thesis: string;
  introduction: string[];
  accent: string;
  tags: string[];
  stages: PerspectiveStage[];
  tensions: string[];
  conclusion: string;
};

const ref = (kind: PerspectiveRefKind, slug: string, label?: string): PerspectiveRef => ({ kind, slug, label });
const stage = (kicker: string, title: string, summary: string, argument: string, evidence: PerspectiveRef[], sourceRefs: string[] = []): PerspectiveStage => ({ kicker, title, summary, argument, evidence, sourceRefs });

export const perspectives: Perspective[] = [
  {
    slug: "indigenous-sovereignty", number: "01", title: "Indigenous Sovereignty", shortTitle: "Sovereignty", accent: "#b69245",
    subtitle: "Read the war as a struggle over land, diplomacy, coalition, and the right of Native nations to determine their own futures.",
    question: "What changes when the United States and Britain are not the only political actors on the map?",
    thesis: "The War of 1812 was also a war against Indigenous political possibility. Native nations entered it with distinct strategies; the interstate peace ended without securing their central aims.",
    introduction: ["This route begins before the declaration because the struggle in the Old Northwest was already violent. It follows coalition building rather than treating Indigenous fighters as an appendage to British command.", "It then moves south, where Muscogee civil conflict and United States intervention produced an enormous coerced land cession, and ends at a peace table from which Native diplomats were absent."],
    tags: ["sovereignty", "land", "coalition", "diplomacy"],
    stages: [
      stage("Before 1812", "A war already underway", "Prophetstown and the confederacy grew from decades of land cessions, settler expansion, spiritual renewal, and political organizing.", "Beginning at the declaration hides the conflict the American state was already waging over Indigenous land and authority.", [ref("story","world-already-at-war"),ref("people","tenskwatawa"),ref("events","tippecanoe")], ["nps-indigenous"]),
      stage("1812", "Alliance without subordination", "Tecumseh and other leaders cooperated with Britain because British arms and posts offered leverage against American expansion.", "Calling them simply British allies mistakes a strategic relationship for political obedience.", [ref("people","tecumseh"),ref("people","isaac-brock"),ref("events","detroit-surrender")], ["cwm","nps-indigenous"]),
      stage("1812–1813", "The border crosses homelands", "Detroit, the Niagara, and the western lakes were not empty frontiers between two future nations.", "The international border divided connected communities and turned homelands into military corridors.", [ref("places","detroit"),ref("places","queenston-heights"),ref("map","indigenous-geographies","Open the Indigenous map lens")], ["loc-maps","nps-indigenous"]),
      stage("October 1813", "The coalition loses its center", "Tecumseh's death at the Thames damaged a political project that no other wartime participant could simply inherit.", "An American battlefield victory became a severe loss of Indigenous diplomatic leverage.", [ref("story","war-for-the-interior"),ref("events","battle-thames"),ref("people","tecumseh")], ["nps-indigenous"]),
      stage("1813–1814", "A second Indigenous war", "The Creek War joined Muscogee civil conflict, American expansion, Cherokee participation, and competing visions of survival.", "Folding Horseshoe Bend into Jackson's rise erases the Native political world the campaign shattered.", [ref("story","southern-borderlands"),ref("people","menawa"),ref("places","horseshoe-bend"),ref("documents","treaty-fort-jackson")], ["nps-creek","nps-horseshoe-participants"]),
      stage("1814 and after", "Peace between states", "Britain abandoned the proposed Indigenous buffer state; Ghent promised restoration but could not restore lost power, land, or lives.", "The map returned to its interstate status quo while Indigenous autonomy deteriorated.", [ref("story","peace-at-ghent"),ref("documents","treaty-of-ghent"),ref("story","what-changed")], ["loc-ghent","nps-legacies"]),
    ],
    tensions: ["Alliance versus dependence", "Treaty language versus enforceable power", "Later national borders versus older homelands"],
    conclusion: "Through this path, the war's central diplomatic failure is not that Ghent omitted impressment. It is that the states made peace over lands whose peoples were not admitted as equal makers of that peace."
  },
  {
    slug: "slavery-and-freedom", number: "02", title: "Slavery & Freedom Seeking", shortTitle: "Freedom seeking", accent: "#b94e82",
    subtitle: "Follow people who turned imperial war into an opening, while both belligerents used Black service without accepting Black equality.",
    question: "What does the war look like when freedom seeking, rather than state policy, drives the route?",
    thesis: "British strategy created openings, but enslaved people made the decisive choices: gathering intelligence, reaching ships, enlisting, evacuating, and building new communities after the peace.",
    introduction: ["This pathway refuses to treat emancipation as a gift bestowed by an empire. Cochrane's proclamation mattered because people already searching for escape acted on it.", "The route also holds several Black experiences together: enslavement and flight in the Chesapeake, Loyalist settlement and militia service in Upper Canada, free Black military service in Louisiana, and coerced labor inside a celebrated Baltimore household."],
    tags: ["slavery", "flight", "military service", "diaspora"],
    stages: [
      stage("Before the opening", "Freedom across imperial lines", "Richard Pierpoint's life joined African birth, enslavement, Loyalist service, freedom, and Black settlement in Upper Canada.", "The war inherited Black Atlantic histories that began long before 1812.", [ref("people","richard-pierpoint"),ref("story","easy-conquest-that-wasnt")], ["parks-pierpoint","parks-black-militia"]),
      stage("1813", "Water as an escape route", "British raids and ships created moving points of contact along the Chesapeake.", "Local geography and individual action mattered as much as proclamation language.", [ref("story","blockade"),ref("events","chesapeake-blockade"),ref("map","black-freedom","Open the Black freedom map lens")], ["nps-freedom-1"]),
      stage("April 1814", "A weapon and an opening", "Cochrane offered reception, service, or resettlement to people leaving the United States.", "The proclamation served British war aims and offered a real route out of American slavery; both facts must remain visible.", [ref("documents","cochrane-proclamation"),ref("people","alexander-cochrane"),ref("events","cochrane-proclamation")], ["nps-freedom-1","nps-colonial"]),
      stage("1814", "Colonial Marines", "Freedom seekers became guides, sailors, soldiers, and members of a British military community centered at Tangier.", "Their knowledge changed Chesapeake operations, but their service should not consume the larger history of families and civilians who also escaped.", [ref("story","washington-burns"),ref("edition","cochrane-proclamation","Read Cochrane's proclamation"),ref("map","black-freedom","Trace the escape corridors")], ["nps-colonial","nps-tangier"]),
      stage("Baltimore", "Labor inside the icon", "Grace Wisher worked in Mary Pickersgill's household while the enormous Fort McHenry flag was made.", "A national relic emerged from a racial and household labor system, not from a lone patriotic heroine.", [ref("people","grace-wisher"),ref("people","mary-pickersgill"),ref("objects","star-spangled-banner")], ["nps-grace","smithsonian-flag"]),
      stage("Gulf and aftermath", "Service, refuge, diaspora", "Free Black units defended New Orleans while Black refugees from British lines formed communities in Nova Scotia and Trinidad.", "The peace produced no single Black outcome: service, liberation, discrimination, mobility, and exclusion coexisted.", [ref("people","jordan-noble"),ref("events","new-orleans"),ref("events","black-refugee-resettlement"),ref("story","what-changed")], ["nps-new-orleans-black","nps-freedom-2"]),
    ],
    tensions: ["British strategy versus Black agency", "Military service versus civil equality", "National iconography versus racialized labor"],
    conclusion: "This route transforms the Chesapeake from the setting of raids into a geography of freedom seeking, and makes the postwar Black Atlantic one of the war's major outcomes."
  },
  {
    slug: "women-and-household-labor", number: "03", title: "Women & Household Labor", shortTitle: "Women and labor", accent: "#c76b52",
    subtitle: "Reconstruct the war through households that provisioned, fled, preserved property, made military objects, and carried memory.",
    question: "How much of war disappears when the household is treated as background?",
    thesis: "Households were logistical systems, workplaces, political spaces, and targets. Women's labor sustained war and survival even when official records named men as the principal actors.",
    introduction: ["This path moves away from the battlefield without moving away from war. Homes became billets, workshops, stores, infirmaries, intelligence networks, and objects of retaliation.", "The archive is uneven. Famous women are often credited with work others performed, while workers such as Grace Wisher enter the record only through contracts, institutional research, or the objects their labor helped produce."],
    tags: ["household", "labor", "flight", "credit"],
    stages: [
      stage("1812", "Politics enters the home", "Baltimore's partisan violence moved from a newspaper office to a defended house and then into the jail.", "The boundary between public politics and domestic space collapsed at the war's opening.", [ref("story","baltimore-at-war-with-itself"),ref("documents","hanson-federal-republican"),ref("events","baltimore-jail-massacre")], ["nps-riots","riot-narrative"]),
      stage("1813", "Homes become the battlefield", "Raids at Havre de Grace and the burning of Newark exposed families to plunder, fire, displacement, and retaliatory logic.", "Civilian suffering was not collateral scenery; it became part of how both sides justified escalation.", [ref("story","war-reaches-homes"),ref("places","havre-de-grace"),ref("events","burning-newark")], ["nps-living","cwm"]),
      stage("1813", "A household manufactures a flag", "Pickersgill's household produced two unusually large flags through skilled, coordinated labor.", "The workshop was commercial and domestic at once, and its workers occupied unequal legal and social positions.", [ref("people","mary-pickersgill"),ref("people","grace-wisher"),ref("objects","fort-mchenry-storm-flag")], ["nps-grace","nps-garrison-flag"]),
      stage("August 1814", "Saving, carrying, evacuating", "Dolley Madison directed the rescue of Stuart's Washington portrait, but staff and laborers physically removed it as the household fled.", "The familiar heroic story narrows a collective emergency into a single famous act.", [ref("story","washington-burns"),ref("events","burning-washington"),ref("edition","dolley-madison-letter","Read Dolley Madison's letter")], ["nps-women-chesapeake"]),
      stage("September 1814", "A city behind the defenses", "Baltimore's survival depended on provisioning, nursing, sewing, transport, communications, and the maintenance of households under threat.", "The visible earthworks rested on a wider civic labor system.", [ref("story","baltimore-holds"),ref("places","baltimore"),ref("objects","star-spangled-banner")], ["nps-women-chesapeake","nps-baltimore"]),
      stage("After the danger", "Who receives credit?", "Objects and recollections preserved some names while compressing groups of workers into a single patriotic figure.", "Memory is another household product: curated, inherited, displayed, and sometimes corrected by later research.", [ref("objects","star-spangled-banner"),ref("objects","fort-mchenry-bombardment-print"),ref("story","what-changed")], ["smithsonian-flag","nps-creating-legacies"]),
    ],
    tensions: ["Domestic space versus military space", "Direction versus physical labor", "Patriotic memory versus unequal credit"],
    conclusion: "The pathway reveals household labor as infrastructure. Flags, food, information, evacuation, care, and memory did not sit beside the war; they made the war materially possible."
  },
  {
    slug: "sailors-and-citizenship", number: "04", title: "Sailors & Contested Citizenship", shortTitle: "Sailors and citizenship", accent: "#3885a5",
    subtitle: "Read the conflict through bodies, papers, prize law, impressment, and the unstable meaning of national identity at sea.",
    question: "Who could prove citizenship when a naval officer claimed the right to decide?",
    thesis: "The maritime crisis was about sovereignty in an intimate form: whether a sailor's body belonged to himself, a nation, or the naval power able to seize him.",
    introduction: ["This route begins with sailors rather than admirals. Protection certificates attempted to make citizenship portable, but paper could fail before force.", "It connects impressment to frigate glory, privateering, captivity, inland navies, and a peace treaty that did not mention the grievance most closely associated with the war."],
    tags: ["impressment", "citizenship", "labor", "naval war"],
    stages: [
      stage("Before 1812", "A body described on paper", "Protection certificates recorded age, complexion, scars, height, and birthplace so sailors could assert American status.", "Citizenship at sea became an evidentiary problem written onto the body.", [ref("objects","protection-certificate"),ref("events","chesapeake-leopard"),ref("story","world-already-at-war")], ["nara-impressment"]),
      stage("June 1812", "The maritime indictment", "Madison placed impressment beside commercial restrictions, searches, and violations of American waters.", "The administration's case was maritime without being reducible to one maritime grievance.", [ref("documents","madison-war-message"),ref("documents","declaration-of-war"),ref("story","why-war")], ["house-declaration","nara-war"]),
      stage("1812–1813", "Victory, death, and the sailor's deck", "Frigate duels produced heroes and slogans while ordinary crews endured splinters, close-range fire, amputation, capture, and prize distribution.", "The iconic ship obscures a multinational labor force operating it.", [ref("ships","uss-constitution"),ref("ships","hms-guerriere"),ref("ships","uss-chesapeake"),ref("story","old-ironsides")], ["nhhc"]),
      stage("Commerce war", "Private violence under public license", "Privateers converted merchant capital, seafaring skill, and legal commissions into attacks on British trade.", "The line between naval war and business enterprise was institutional, not moral simplicity.", [ref("story","blockade"),ref("places","baltimore"),ref("map","water-and-supply","Open the maritime map lens")], ["nps-privateers"]),
      stage("Inland seas", "Sailors build the battlefield", "Freshwater squadrons had to be built, armed, crewed, and supplied before they could fight.", "The decisive naval labor often occurred in forests, yards, and transport corridors far from salt water.", [ref("story","continental-naval-arms-race"),ref("places","sackets-harbor"),ref("ships","uss-niagara")], ["nps-freshwater","nhhc"]),
      stage("Peace", "The missing grievance", "Ghent ended the war without a British concession on impressment.", "Military circumstance and the end of the Napoleonic emergency made the issue less urgent, but silence in the treaty complicates claims of vindication.", [ref("documents","treaty-of-ghent"),ref("story","peace-at-ghent"),ref("story","what-changed")], ["loc-ghent"]),
    ],
    tensions: ["Paper citizenship versus coercive power", "Naval heroism versus maritime labor", "War aims versus treaty text"],
    conclusion: "Following sailors makes the war's abstractions physical: citizenship becomes a scar description, sovereignty becomes a boarding party, and victory becomes survival on a crowded gun deck."
  },
  {
    slug: "british-north-america", number: "05", title: "British North America", shortTitle: "British North America", accent: "#6f8158",
    subtitle: "Follow Upper and Lower Canada as colonies defended by imperial troops, local militia, Black settlers, and Indigenous allies, not a modern nation acting in unison.",
    question: "How can the Canadian story be told without projecting Canada backward into 1812?",
    thesis: "British North America survived invasion through an imperial and local coalition whose participants did not share one identity, one purpose, or equal power.",
    introduction: ["This path treats later Canadian memory as an outcome to be explained, not a starting assumption. Upper Canada was vulnerable, politically divided, and dependent on waterways and alliance.", "It follows defense, occupation, retaliation, logistics, and the gradual conversion of wartime survival into a national origin story."],
    tags: ["empire", "colony", "militia", "later Canada"],
    stages: [
      stage("Summer 1812", "A province that does not collapse", "Hull expected weakness and possible welcome; Brock and Tecumseh used speed, intelligence, fear, and alliance to reverse the invasion.", "The defense was neither purely British nor already Canadian in the modern national sense.", [ref("story","easy-conquest-that-wasnt"),ref("people","isaac-brock"),ref("events","detroit-surrender")], ["cwm","lac"]),
      stage("Queenston", "Militia, regulars, and allies", "The battle joined British regulars, local militia, and Indigenous warriors against an isolated American crossing.", "Later commemoration often turns a contingent coalition into a unified national people.", [ref("places","queenston-heights"),ref("events","queenston-heights"),ref("people","richard-pierpoint")], ["cwm","parks-black-militia"]),
      stage("1813", "Capital under occupation", "York was captured, looted, and partly burned, becoming a touchstone in later retaliation narratives.", "The colonial capital's experience reveals civilian vulnerability and the politics of remembering destruction.", [ref("places","york"),ref("events","york"),ref("story","war-reaches-homes")], ["cwm","lac"]),
      stage("The lake lifeline", "Kingston holds the province together", "Shipbuilding and supply at Kingston protected the St. Lawrence connection to Upper Canada.", "Military survival depended less on heroic militia mythology than on an imperial logistics system.", [ref("places","kingston"),ref("story","continental-naval-arms-race"),ref("map","water-and-supply","Open the logistics map lens")], ["lac","lac-british-records"]),
      stage("1814", "Invasion and restraint", "British power increased after Napoleon's abdication, but costly Niagara battles and the failure at Plattsburgh limited what victory could buy.", "British North America survived; Britain still chose negotiation over indefinite continental escalation.", [ref("story","niagara-again"),ref("story","plattsburgh"),ref("ships","hms-confiance")], ["nps-plattsburgh","lac"]),
      stage("After 1815", "Survival becomes memory", "Colonial defense supplied later Canada with heroes, battlefields, and a story of resisting American conquest.", "That memory is real and politically powerful, but it can flatten French-speaking, Black, Indigenous, imperial, and local experiences.", [ref("story","what-changed"),ref("events","rush-bagot"),ref("map","indigenous-geographies","Compare border and homeland layers")], ["cwm","state-rush-bagot"]),
    ],
    tensions: ["Colonial survival versus later nationhood", "Local service versus imperial power", "Shared defense versus unequal alliances"],
    conclusion: "This pathway replaces the sentence “Canada won” with a harder account of how British colonies survived, who made that survival possible, and how the event was later nationalized."
  },
  {
    slug: "civilians-under-occupation", number: "06", title: "Civilians Under Occupation", shortTitle: "Civilians", accent: "#8c5d4a",
    subtitle: "Move through invaded towns, burned homes, requisitions, evacuation, political violence, and the choices civilians made under armed power.",
    question: "What is a campaign when viewed from the doorway rather than headquarters?",
    thesis: "Occupation was never one experience. Civilians negotiated, resisted, fled, cooperated, concealed goods, sought protection, pursued freedom, and later argued over what the invasion meant.",
    introduction: ["Campaign maps produce arrows; households experienced soldiers. This path reorders the war around moments when armed forces entered towns, used property, punished communities, or made flight necessary.", "It also begins with domestic political violence in Baltimore, because wartime coercion did not arrive only under a foreign flag."],
    tags: ["occupation", "property", "violence", "survival"],
    stages: [
      stage("Baltimore, 1812", "Coercion before invasion", "A press was destroyed, a defended house besieged, and prisoners attacked inside a city jail.", "The war began with Americans policing political belonging through violence.", [ref("story","baltimore-at-war-with-itself"),ref("people","james-m-lingan"),ref("documents","hanson-federal-republican")], ["nps-riots","riot-narrative"]),
      stage("York, 1813", "A capital captured", "American troops occupied York, destroyed military property, looted, and burned the parliament buildings.", "Command intent, battlefield disorder, and civilian memory do not collapse into one simple retaliation story.", [ref("places","york"),ref("events","york"),ref("story","war-reaches-homes")], ["cwm"]),
      stage("Chesapeake, 1813", "War comes by water", "Havre de Grace and other exposed communities faced raids, fire, and plunder from forces that could appear rapidly along the bay.", "Blockade became local occupation in pulses rather than a continuous front line.", [ref("places","havre-de-grace"),ref("events","st-michaels"),ref("events","chesapeake-blockade")], ["nps-living"]),
      stage("Niagara, 1813", "Retaliation acquires a history", "The burning of Newark left civilians exposed and helped justify later British destruction.", "Civilian suffering became evidence in an escalating moral argument between belligerents.", [ref("events","burning-newark"),ref("story","war-reaches-homes"),ref("places","queenston-heights")], ["cwm","nps-living"]),
      stage("Washington, 1814", "Capital in flight", "Officials, workers, residents, and enslaved people confronted evacuation, destruction, opportunity, and the collapse of public protection.", "The famous buildings were only the most visible part of a citywide emergency.", [ref("events","burning-washington"),ref("events","navy-yard-burning"),ref("story","washington-burns")], ["loc-guide","nps-women-chesapeake"]),
      stage("Baltimore, 1814", "Defense as civic occupation", "Earthworks, militia, labor, rationing, and rumor reorganized ordinary life before the British arrived.", "A defended city is also a city occupied by its own preparations for violence.", [ref("story","baltimore-holds"),ref("people","samuel-smith"),ref("events","north-point"),ref("places","fort-mchenry")], ["nps-baltimore"]),
    ],
    tensions: ["Protection versus coercion", "Military necessity versus civilian property", "Event memory versus daily survival"],
    conclusion: "Viewed from civilian ground, the war becomes a sequence of unstable authorities. The central question is often not who controlled a town, but what people could preserve, refuse, or escape while control changed."
  },
  {
    slug: "prisoners-and-captivity", number: "07", title: "Prisoners & Captivity", shortTitle: "Prisoners", accent: "#70628d",
    subtitle: "Trace surrender, confinement, parole, prison ships, Dartmoor, and the uncertain moment when a war ends for people still behind walls.",
    question: "When does peace begin for a prisoner?",
    thesis: "Captivity was not a pause outside the war. It was a system of exchange, coercion, disease, information, labor, and delayed release that continued after diplomats signed.",
    introduction: ["The War of 1812 produced prisoners through naval capture, battlefield surrender, occupation, and privateering. Status mattered: officer, sailor, militiaman, civilian, and privateersman could encounter different rules and expectations.", "This route also reaches backward through James Lingan's Revolutionary imprisonment and forward to Dartmoor, where Americans died after the treaty had been signed."],
    tags: ["captivity", "parole", "exchange", "Dartmoor"],
    stages: [
      stage("A remembered captivity", "Lingan and the prison-ship generation", "James M. Lingan had survived imprisonment during the Revolution before a Baltimore mob murdered him in 1812.", "Captivity memory shaped ideas of patriotic sacrifice long before the new war created new prisoners.", [ref("people","james-m-lingan"),ref("events","baltimore-jail-massacre"),ref("story","baltimore-at-war-with-itself")], ["nps-riots"]),
      stage("August 1812", "An army surrendered", "Hull surrendered Detroit, its garrison, and attached forces without a final assault.", "Mass captivity could be produced by command judgment as decisively as battlefield defeat.", [ref("people","william-hull"),ref("events","detroit-surrender"),ref("places","detroit")], ["cwm","lac"]),
      stage("October 1812", "Trapped across the river", "American troops on Queenston Heights became prisoners when reinforcement failed and retreat across the Niagara collapsed.", "Geography turned tactical isolation into captivity.", [ref("events","queenston-heights"),ref("places","queenston-heights"),ref("story","easy-conquest-that-wasnt")], ["cwm"]),
      stage("At sea", "Prizes carry people", "Captured warships and merchant vessels transferred sailors into parole, exchange, or confinement systems.", "A naval victory created a human custody problem as well as a captured object.", [ref("ships","hms-guerriere"),ref("ships","uss-chesapeake"),ref("story","old-ironsides")], ["nhhc","nara-war"]),
      stage("Dartmoor", "A prison after Napoleon", "Thousands of American prisoners were held in Dartmoor amid crowding, disease, delayed exchange, and worsening uncertainty.", "The prison belonged to an Atlantic system strained by two simultaneous wars.", [ref("story","peace-at-ghent"),ref("documents","treaty-of-ghent")], ["nps-dartmoor","loc-dartmoor"]),
      stage("April 1815", "Peace has arrived; release has not", "British guards killed American prisoners at Dartmoor after Ghent but before repatriation was complete.", "Treaty dates do not automatically describe the lived end of war.", [ref("edition","treaty-ghent-article-one","Read the treaty's restoration terms"),ref("story","what-changed")], ["nps-dartmoor","loc-dartmoor"]),
    ],
    tensions: ["Surrender versus protection", "Prisoner status versus lived treatment", "Diplomatic peace versus delayed release"],
    conclusion: "Captivity stretches the war's chronology. For prisoners, the decisive dates were not only declaration and treaty but capture, exchange cartel, transfer, news, and the day a gate finally opened."
  },
  {
    slug: "maryland-war", number: "08", title: "Maryland's War", shortTitle: "Maryland", accent: "#b33b34",
    subtitle: "Read the entire conflict from a state that moved from partisan murder to invasion, occupation, resistance, and national iconography.",
    question: "What does Maryland reveal that a march from declaration to New Orleans conceals?",
    thesis: "Maryland is not one celebrated night at Fort McHenry. It is a two-year sequence of political fracture, coastal exposure, local resistance, national failure, and organized metropolitan defense.",
    introduction: ["Baltimore bookends the American war: in 1812, Americans killed a Revolutionary general over political dissent; in 1814, a fortified city stopped a British expedition.", "Between those moments, Maryland's waterfront communities lived under blockade and raid, the state supplied privateers and defenders, and the road through Bladensburg exposed the capital."],
    tags: ["Baltimore", "Chesapeake", "local resistance", "defense"],
    stages: [
      stage("June–July 1812", "Baltimore at war with itself", "The destruction of the Federal Republican and the jail massacre make political violence the state's first wartime campaign.", "Later unity must be explained; it cannot be projected backward.", [ref("story","baltimore-at-war-with-itself"),ref("people","alexander-contee-hanson"),ref("people","james-m-lingan"),ref("documents","hanson-federal-republican")], ["nps-riots","bca"]),
      stage("1812–1814", "A port fights commerce", "Baltimore privateers attacked British shipping and helped make the city a strategic and symbolic target.", "The defense of Baltimore began economically before it became an earthwork line.", [ref("places","baltimore"),ref("story","blockade"),ref("map","water-and-supply","Open the privateering layer")], ["nps-privateers","bca"]),
      stage("1813", "The bay becomes a front", "Havre de Grace burned, St. Michaels resisted, and communities watched British ships use the Chesapeake as a road.", "Maryland experienced naval power as recurring local emergency.", [ref("places","havre-de-grace"),ref("events","st-michaels"),ref("events","chesapeake-blockade")], ["nps-living"]),
      stage("August 1814", "The road to Washington", "The British landed on the Patuxent, dispersed defenders at Bladensburg, and entered the capital.", "Maryland's campaign joins local geography to the national government's greatest wartime humiliation.", [ref("places","bladensburg"),ref("events","bladensburg"),ref("story","washington-burns"),ref("people","joshua-barney")], ["nhhc-flotilla"]),
      stage("September 1814", "Baltimore's defense system", "North Point delayed the army while Fort McHenry and the harbor defenses denied the fleet.", "No single fort, flag, or death explains the outcome; the city survived through coordinated preparation.", [ref("events","north-point"),ref("events","fort-mchenry"),ref("people","john-stricker"),ref("people","samuel-smith")], ["nps-baltimore","nps-north-point"]),
      stage("Afterward", "A local survival becomes a national symbol", "Key's lyric and the great flag traveled far beyond the defensive system that produced them.", "National memory magnified Baltimore while often losing the riots, privateering, household labor, and bay communities around it.", [ref("documents","defence-fort-mhenry"),ref("objects","star-spangled-banner"),ref("objects","fort-mchenry-bombardment-print"),ref("story","what-changed")], ["smithsonian-flag","nps-creating-legacies"]),
    ],
    tensions: ["Partisan fracture versus wartime unity", "Local defense versus national memory", "One iconic night versus a two-year Chesapeake war"],
    conclusion: "Maryland turns the war into a problem of political transformation: how a city capable of murdering dissenters became a disciplined defensive system, and how that complicated story was compressed into a flag."
  },
  {
    slug: "material-war", number: "09", title: "The Material War", shortTitle: "Material objects", accent: "#9a7041",
    subtitle: "Let documents, ships, flags, weapons, shipyards, earthworks, and printed images carry the narrative.",
    question: "What can an object prove, and what stories have later owners made it carry?",
    thesis: "The war was assembled from things. Material evidence reveals labor, technology, scale, damage, custody, and memory that heroic narrative routinely smooths away.",
    introduction: ["This path treats an identity paper, a frigate, a battle flag, a rocket, a treaty, and a print as historical arguments rather than illustrations.", "Objects are not transparent. Their survival is selective; captions can overclaim; conservation changes appearance; and a later national relic may have begun as an ordinary working tool."],
    tags: ["objects", "technology", "labor", "provenance"],
    stages: [
      stage("Identity paper", "The sailor on the certificate", "Protection certificates attempted to fix a person's citizenship through physical description.", "The document's failure under impressment reveals the distance between recorded identity and enforceable rights.", [ref("objects","protection-certificate"),ref("story","world-already-at-war"),ref("events","chesapeake-leopard")], ["nara-impressment"]),
      stage("Hull and timber", "A frigate becomes a character", "Constitution's construction and damage helped generate the name Old Ironsides.", "Material resilience became moral personality through crew testimony, reporting, and repetition.", [ref("ships","uss-constitution"),ref("ships","hms-guerriere"),ref("story","old-ironsides")], ["nhhc"]),
      stage("Freshwater industry", "Build the fleet before the battle", "Lawrence and Niagara existed because timber, iron, canvas, guns, workers, and transport converged at Erie.", "The object-centered story turns victory into a supply-chain achievement.", [ref("ships","uss-lawrence"),ref("ships","uss-niagara"),ref("objects","lake-erie-battle-flag"),ref("story","continental-naval-arms-race")], ["nps-lake-erie","nps-freshwater"]),
      stage("Rocket", "Technology as spectacle", "Congreve rockets were noisy, conspicuous, frightening, and less precise than their cultural afterlife suggests.", "A weapon's psychological effect can exceed its physical accuracy.", [ref("objects","congreve-rocket"),ref("events","bladensburg"),ref("events","fort-mchenry")], ["nps-bombardment"]),
      stage("Flag", "A working signal becomes a relic", "The garrison flag was manufactured, flown, privately held, clipped for souvenirs, conserved, and displayed.", "Its object biography is longer and stranger than the bombardment alone.", [ref("objects","star-spangled-banner"),ref("objects","fort-mchenry-storm-flag"),ref("people","grace-wisher")], ["smithsonian-flag","nps-garrison-flag"]),
      stage("Paper and print", "The war is fixed after the fact", "The Treaty of Ghent fixed state obligations; Bower's print fixed a visual memory of bombardment.", "Legal and pictorial objects do different kinds of historical work, and both demand provenance.", [ref("documents","treaty-of-ghent"),ref("objects","fort-mchenry-bombardment-print"),ref("edition","defence-fort-mhenry","Compare the lyric and print")], ["loc-ghent","loc-fort-print"]),
    ],
    tensions: ["Use value versus relic value", "Physical evidence versus later caption", "Survival versus representativeness"],
    conclusion: "Objects slow the story down. They replace generic claims with dimensions, materials, wear, handwriting, damage, custody, and the names of people whose labor survives only because a thing did."
  },
  {
    slug: "memory-and-myth", number: "10", title: "Memory & Myth", shortTitle: "Memory and myth", accent: "#506b8b",
    subtitle: "Track how defeats became slogans, local episodes became national origins, and an inconclusive settlement became victory memory.",
    question: "When does the history of the war become the history people needed it to mean?",
    thesis: "War memory began during the fighting. Participants reused recent deaths, selected symbols, and shaped reports; later generations turned those choices into national common sense.",
    introduction: ["Myth here does not mean simple falsehood. It means a story powerful enough to organize memory by selecting heroes, beginnings, endings, and causal links.", "This route pairs the familiar version with the surviving evidence. Its aim is not to drain the war of meaning, but to show who produced that meaning and what fell outside the frame."],
    tags: ["commemoration", "myth", "nationalism", "evidence"],
    stages: [
      stage("1812", "Old Ironsides", "A tactical frigate victory produced a nickname that made timber, crew performance, and luck into national character.", "The story was already becoming legend while strategic command of the sea remained British.", [ref("ships","uss-constitution"),ref("events","constitution-guerriere"),ref("story","old-ironsides")], ["nhhc"]),
      stage("1813", "Memory carried into battle", "Perry flew James Lawrence's dying command months after Chesapeake was captured.", "The war recycled defeat into morale before later historians entered the story.", [ref("objects","lake-erie-battle-flag"),ref("ships","uss-chesapeake"),ref("documents","perry-dispatch")], ["nps-lake-erie","nhhc"]),
      stage("1813 and after", "Tecumseh made usable", "American, British, Canadian, and Indigenous memories assigned different meanings to Tecumseh's coalition and death.", "A single heroic biography can obscure the broader political project and the people who sustained it.", [ref("people","tecumseh"),ref("events","battle-thames"),ref("story","war-for-the-interior")], ["nps-indigenous","cwm"]),
      stage("August 1814", "Dolley saves the portrait", "The celebrated story centers Dolley Madison while the physical removal was performed by household staff and laborers.", "Correcting credit strengthens the episode by restoring collective action and unequal visibility.", [ref("story","washington-burns"),ref("events","burning-washington"),ref("edition","dolley-madison-letter","Read the contemporary letter")], ["nps-women-chesapeake"]),
      stage("September 1814", "Flag, lyric, anthem", "A working garrison flag inspired a lyric that circulated as song and became the national anthem only in 1931.", "The bombardment, the poem, and national canonization are three different historical moments.", [ref("objects","star-spangled-banner"),ref("documents","defence-fort-mhenry"),ref("people","francis-scott-key")], ["smithsonian-flag","nps-bombardment"]),
      stage("1815 and after", "Victory after the treaty", "New Orleans made an already-signed peace feel triumphant and elevated Jackson into a national political future.", "The emotional ending displaced the treaty's status quo and the unequal consequences for Native nations and Black Americans.", [ref("events","new-orleans"),ref("people","andrew-jackson"),ref("documents","treaty-of-ghent"),ref("story","what-changed")], ["nps-legacies","loc-ghent"]),
    ],
    tensions: ["Meaning versus accuracy", "National usefulness versus excluded experience", "Contemporary reporting versus later commemoration"],
    conclusion: "The war's most durable victory may have been narrative: separate events, ambiguous aims, and unequal outcomes were arranged into a usable national past. The evidence lets us see that arrangement being made."
  },
];

export const perspectiveBySlug = Object.fromEntries(perspectives.map((item) => [item.slug, item]));

export const perspectiveHref = (reference: PerspectiveRef) => {
  if (reference.kind === "story") return `/story/${reference.slug}`;
  if (reference.kind === "events") return `/events/${reference.slug}`;
  if (reference.kind === "edition") return `/edition/${reference.slug}`;
  if (reference.kind === "map") return "/map";
  return `/${reference.kind}/${reference.slug}`;
};

export const perspectivesForChapter = (chapter: string) => perspectives.filter((path) => path.stages.some((item) => item.evidence.some((reference) => reference.kind === "story" && reference.slug === chapter)));
