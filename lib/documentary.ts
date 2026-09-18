export type DocumentaryAnnotation = { term: string; note: string };

export type DocumentaryCounterpoint = {
  title: string;
  creator: string;
  date: string;
  summary: string;
  sourceUrl: string;
};

export type DocumentaryImage = {
  src: string;
  alt: string;
  caption: string;
  credit: string;
};

export type DocumentaryPacket = {
  slug: string;
  chapterSlug: string;
  chapterOrder: number;
  chapterTitle: string;
  title: string;
  creator: string;
  date: string;
  documentType: string;
  editorialIntroduction: string;
  diplomatic: string;
  modernized: string;
  transcriptionNote: string;
  annotations: DocumentaryAnnotation[];
  repository: string;
  collection: string;
  identifier: string;
  provenance: string;
  sourceUrl: string;
  rights: string;
  counterpoint?: DocumentaryCounterpoint;
  image?: DocumentaryImage;
};

export const documentaryPackets: DocumentaryPacket[] = [
  {
    slug: "embargo-act-1807", chapterSlug: "world-already-at-war", chapterOrder: 0, chapterTitle: "A World Already at War",
    title: "The Embargo Act", creator: "Tenth Congress of the United States", date: "22 December 1807", documentType: "Federal statute",
    editorialIntroduction: "Congress tried to use access to American commerce as a substitute for war. The statute's sweeping language helps explain why neutral-rights policy produced intense domestic coercion before it produced leverage abroad.",
    diplomatic: "An embargo be, and hereby is, laid on all ships and vessels within the limits and jurisdiction of the United States.",
    modernized: "All ships and vessels within United States jurisdiction were forbidden to depart for foreign trade.",
    transcriptionNote: "Capitalization is reduced; wording and legal syntax are retained from the enrolled statute.",
    annotations: [{ term: "embargo", note: "A state prohibition on ships entering or leaving ports for trade." }, { term: "jurisdiction", note: "The geographic and legal reach within which the United States claimed authority." }],
    repository: "Library of Congress", collection: "A Century of Lawmaking for a New Nation", identifier: "Statutes at Large, 2 Stat. 451", provenance: "Enrolled federal law; later printed in the Statutes at Large.", sourceUrl: "https://www.loc.gov/resource/llsl.002/?sp=490", rights: "Public-domain United States government record."
  },
  {
    slug: "madison-war-message", chapterSlug: "why-war", chapterOrder: 1, chapterTitle: "Why War?",
    title: "Special Message to Congress", creator: "James Madison", date: "1 June 1812", documentType: "Presidential message",
    editorialIntroduction: "Madison did not present one cause. He assembled maritime seizure, impressment, commercial restriction, violations of territorial waters, and frontier insecurity into a cumulative case for congressional action.",
    diplomatic: "British cruisers have been in the continued practice of violating the American flag on the great highway of nations.",
    modernized: "British warships repeatedly violated the protection claimed by American-flagged vessels on the open sea.",
    transcriptionNote: "Spelling is retained; the excerpt omits surrounding clauses without changing their order.",
    annotations: [{ term: "American flag", note: "Here the flag means the legal protection of the vessel and those sailing under it." }, { term: "great highway of nations", note: "Madison's formulation for the open sea as a shared international space." }],
    repository: "Miller Center, University of Virginia", collection: "Presidential Speeches", identifier: "Madison, Special Message, 1 June 1812", provenance: "Delivered by written message to both houses of Congress and printed in official proceedings.", sourceUrl: "https://millercenter.org/the-presidency/presidential-speeches/june-1-1812-special-message-congress-foreign-policy-crisis-war", rights: "Public-domain federal record; transcription supplied by the repository.",
    counterpoint: { title: "Federalist objections in Congress", creator: "Federalist members of Congress", date: "June 1812", summary: "Opponents argued that war would punish American commerce, expand executive power, and choose the wrong enemy while French violations continued.", sourceUrl: "https://history.house.gov/Records-and-Research/Listing/lfp_012/" }
  },
  {
    slug: "baltimore-riot-narrative", chapterSlug: "baltimore-at-war-with-itself", chapterOrder: 2, chapterTitle: "Baltimore I: A City at War With Itself",
    title: "An Exact and Authentic Narrative", creator: "Sufferers and eyewitnesses of the Baltimore riots", date: "1 September 1812", documentType: "Partisan pamphlet and collected testimony",
    editorialIntroduction: "This Federalist publication is both evidence and argument. Its depositions, letters, and survivor narratives document the violence while arranging that evidence to indict Republican government and defend the armed pressmen.",
    diplomatic: "The direful Mob was heard to shout, We'll drink their blood! we'll root them out!",
    modernized: "Witnesses recalled the mob threatening to drink Federalist blood and drive the defenders out.",
    transcriptionNote: "Capitalization, spelling, and exclamation marks follow the 1812 title page.",
    annotations: [{ term: "direful", note: "Causing dread or terrible suffering." }, { term: "Mob", note: "The capitalized word carries the pamphlet's political judgment, not merely a headcount." }],
    repository: "Library of Congress page images; transcription by Eugene H. Leache", collection: "Early American Imprints / American Memory", identifier: "Digital ID lhbcb 20045", provenance: "Printed in Baltimore for purchasers; the surviving edition was digitized from a public-domain copy.", sourceUrl: "https://penelope.uchicago.edu/Thayer/E/Gazetteer/Topics/history/American_and_Military/1812_Baltimore_Riot/Sep1_1812_pamphlet/home.html", rights: "The 1812 pamphlet is public domain. Verify image reuse against the holding repository.",
    counterpoint: { title: "Republican language of treason", creator: "Baltimore Republican speakers and newspapers", date: "June–July 1812", summary: "Pro-war rhetoric described Federalist dissent as Tory disloyalty. That framing helps explain the attackers without excusing the assault or the failure of officials.", sourceUrl: "https://www.nps.gov/articles/baltimore-riots.htm" }
  },
  {
    slug: "hull-proclamation", chapterSlug: "easy-conquest-that-wasnt", chapterOrder: 3, chapterTitle: "The Easy Conquest That Wasn't",
    title: "Proclamation to the Inhabitants of Canada", creator: "William Hull", date: "12 July 1812", documentType: "Military proclamation",
    editorialIntroduction: "Hull's proclamation promised protection and liberation while an invading army crossed into Upper Canada. Its confidence is most revealing when read beside his surrender at Detroit five weeks later.",
    diplomatic: "I come to find enemies, not to make them. I come to protect, not to injure you.",
    modernized: "Hull claimed that his army sought existing enemies and would protect Canadian civilians rather than harm them.",
    transcriptionNote: "Punctuation follows widely reproduced contemporary printings; consult the linked institutional edition before formal quotation.",
    annotations: [{ term: "inhabitants", note: "The proclamation addresses civilians as potential neutrals or allies rather than a unified Canadian nation." }, { term: "protect", note: "A standard invasion claim that also carried an implicit threat against resistance." }],
    repository: "Canadian War Museum", collection: "1812: One War, Four Perspectives", identifier: "Hull proclamation interpretive record", provenance: "Issued from Sandwich after the American crossing; circulated in print and manuscript copies.", sourceUrl: "https://www.warmuseum.ca/war-of-1812/", rights: "The historical text is public domain; repository media may have separate terms.",
    counterpoint: { title: "Brock's proclamation", creator: "Isaac Brock", date: "22 July 1812", summary: "Brock answered that American promises concealed conquest and warned that Britain could not restrain Indigenous allies if the invasion continued.", sourceUrl: "https://www.warmuseum.ca/war-of-1812/" }
  },
  {
    slug: "lawrence-last-command", chapterSlug: "old-ironsides", chapterOrder: 4, chapterTitle: "“Old Ironsides” and the War at Sea",
    title: "The reported last command of James Lawrence", creator: "James Lawrence, as remembered by survivors", date: "1 June 1813", documentType: "Attributed battlefield utterance",
    editorialIntroduction: "The phrase became more durable than the defeat in which it was spoken. Treating it as transmitted memory—rather than a stenographic record—shows how sailors and newspapers converted loss into usable heroism.",
    diplomatic: "Don't give up the ship. Fight her till she sinks.",
    modernized: "Continue fighting and do not surrender the ship, even if she is destroyed.",
    transcriptionNote: "This is an attributed recollection with variant wording, not a signed document. The uncertainty is part of the record.",
    annotations: [{ term: "ship", note: "USS Chesapeake, captured by HMS Shannon after a short and exceptionally bloody action." }, { term: "attributed", note: "The wording was reported by others and stabilized through repetition." }],
    repository: "Naval History and Heritage Command", collection: "War of 1812 histories", identifier: "James Lawrence tradition", provenance: "Survivor recollection repeated in early naval histories, public commemoration, and Perry's battle flag.", sourceUrl: "https://www.history.navy.mil/browse-by-topic/wars-conflicts-and-operations/1812.html", rights: "Public-domain historical phrase; institutional page text has separate terms.",
    counterpoint: { title: "Court-martial evidence after Chesapeake's loss", creator: "United States Navy", date: "1813", summary: "Testimony about readiness, discipline, wounds, and the boarding action resists reducing the defeat to either cowardice or a single heroic sentence.", sourceUrl: "https://www.history.navy.mil/browse-by-topic/wars-conflicts-and-operations/1812.html" }
  },
  {
    slug: "perry-dispatch", chapterSlug: "war-for-the-interior", chapterOrder: 5, chapterTitle: "The War for the Interior",
    title: "Dispatch from Lake Erie", creator: "Oliver Hazard Perry", date: "10 September 1813", documentType: "Naval victory dispatch",
    editorialIntroduction: "Nine words turned a fleet action into national shorthand. The full operational story includes shipyard labor, the ruined Lawrence, Perry's transfer to Niagara, Black sailors, and the land campaign the victory enabled.",
    diplomatic: "We have met the enemy and they are ours.",
    modernized: "We engaged the British squadron and captured it.",
    transcriptionNote: "Wording follows Perry's famous pencil dispatch to William Henry Harrison.",
    annotations: [{ term: "ours", note: "Perry followed the sentence with a list of captured British vessels." }, { term: "dispatch", note: "A brief official report sent from a commander to a superior." }],
    repository: "National Park Service", collection: "Perry's Victory and International Peace Memorial", identifier: "Perry to Harrison, 10 September 1813", provenance: "Written aboard USS Lawrence after the battle and delivered to Harrison.", sourceUrl: "https://home.nps.gov/pevi/learn/historyculture/battle_erie_detail.htm", rights: "Public-domain military correspondence.",
    counterpoint: { title: "British accounts of the squadron's condition", creator: "Royal Navy officers and court-martial witnesses", date: "1813–1814", summary: "British evidence emphasizes Barclay's wounds, incomplete crews, shortages, and the squadron's constrained supply without negating American victory.", sourceUrl: "https://www.canada.ca/en/library-archives/collection/research-help/military-history/war-1812.html" }
  },
  {
    slug: "lake-ontario-return", chapterSlug: "continental-naval-arms-race", chapterOrder: 6, chapterTitle: "Lakes, Shipyards, and a Continental Naval Arms Race",
    title: "Return of vessels on Lake Ontario", creator: "United States Navy", date: "1814", documentType: "Administrative fleet return",
    editorialIntroduction: "A fleet return lacks the drama of a captain's dispatch. That is precisely its value: guns, crews, tonnage, construction state, and location reveal shipbuilding itself as strategy.",
    diplomatic: "Vessels building at Sacket's Harbour.",
    modernized: "Warships under construction at Sackets Harbor.",
    transcriptionNote: "The heading preserves period spelling. The linked catalogue leads to related naval records; researchers should verify individual figures against the manuscript return.",
    annotations: [{ term: "return", note: "An official administrative list reporting personnel, materiel, or units at a stated date." }, { term: "Sacket's Harbour", note: "Period spelling for Sackets Harbor, New York, the principal American Lake Ontario yard." }],
    repository: "Naval History and Heritage Command", collection: "War of 1812 operational records", identifier: "Lake Ontario vessel returns, 1814", provenance: "Prepared within the naval command system to report changing strength on the lakes.", sourceUrl: "https://www.history.navy.mil/browse-by-topic/wars-conflicts-and-operations/1812.html", rights: "Public-domain United States naval record; item images may carry repository conditions.",
    counterpoint: { title: "British dockyard returns at Kingston", creator: "Royal Navy", date: "1814", summary: "British returns reveal the same strategic logic across the lake: each new hull forced the opponent to build, concentrate, or remain in port.", sourceUrl: "https://www.canada.ca/en/library-archives/collection/research-help/military-history/war-1812.html" }
  },
  {
    slug: "porter-madisons-island", chapterSlug: "war-around-cape-horn", chapterOrder: 7, chapterTitle: "The War Goes Around Cape Horn",
    title: "Porter's claim to Madison's Island", creator: "David Porter", date: "19 November 1813", documentType: "Naval proclamation and journal narrative",
    editorialIntroduction: "Porter's claim translated a temporary refitting base and intervention in local conflict into the language of American possession. Nuku Hiva was inhabited political ground, not an empty harbor awaiting a flag.",
    diplomatic: "I took possession of this island for the United States, and called it Madison's Island.",
    modernized: "Porter declared Nuku Hiva to be United States territory and renamed it for President Madison.",
    transcriptionNote: "Modern punctuation follows published editions of Porter's journal; consult a page image before scholarly quotation.",
    annotations: [{ term: "possession", note: "A unilateral imperial claim that the United States neither sustained nor effectively administered." }, { term: "this island", note: "Nuku Hiva in the Marquesas, home to multiple communities with their own rivalries and authority." }],
    repository: "Naval History and Heritage Command", collection: "The War in the Pacific, 1813–April 1814", identifier: "Porter journal and official reports", provenance: "Porter published an account after the cruise; official dispatches and later editions transmit the claim.", sourceUrl: "https://www.history.navy.mil/our-collections/art/travelling-exhibits/the-war-of-1812/the-war-in-the-pacific--1813-april-1814-.html", rights: "Historical text is public domain; repository media require item-level review.",
    counterpoint: { title: "Nuku Hiva beyond Porter's journal", creator: "Marquesan communities and later ethnographic reconstruction", date: "1813 and after", summary: "Local alliances and resistance show that Porter's base depended on Indigenous politics he only partially understood and represented through an American naval lens.", sourceUrl: "https://www.history.navy.mil/our-collections/art/travelling-exhibits/the-war-of-1812/the-war-in-the-pacific--1813-april-1814-.html" }
  },
  {
    slug: "mclure-newark-report", chapterSlug: "war-reaches-homes", chapterOrder: 8, chapterTitle: "The War Reaches Towns and Homes",
    title: "Report on the destruction of Newark", creator: "George McClure", date: "December 1813", documentType: "Military report",
    editorialIntroduction: "McClure described burning Newark as a military necessity during retreat. Civilian petitions and British retaliation narratives turned the same act into evidence of calculated cruelty.",
    diplomatic: "The village was set fire to, and about one hundred and fifty houses were laid in ashes.",
    modernized: "American troops burned the village, destroying about 150 houses.",
    transcriptionNote: "Spelling is modernized in the transmitted printed report; punctuation is retained.",
    annotations: [{ term: "Newark", note: "Present-day Niagara-on-the-Lake, Upper Canada." }, { term: "laid in ashes", note: "A conventional phrase that compresses household displacement into a military result." }],
    repository: "Library and Archives Canada", collection: "War of 1812 research collections", identifier: "Niagara campaign correspondence", provenance: "Official American report, subsequently printed and answered in British and Canadian accounts.", sourceUrl: "https://www.canada.ca/en/library-archives/collection/research-help/military-history/war-1812.html", rights: "Public-domain military correspondence.",
    counterpoint: { title: "Civilian damage claims", creator: "Residents of Newark and the Niagara frontier", date: "1813–1815", summary: "Claims enumerate homes, clothing, food, livestock, and tools, shifting attention from strategic justification to the material life destroyed.", sourceUrl: "https://www.nps.gov/subjects/warof1812/living-conflict-narratives.htm" }
  },
  {
    slug: "cochrane-proclamation", chapterSlug: "blockade", chapterOrder: 9, chapterTitle: "Blockade",
    title: "Proclamation offering reception and resettlement", creator: "Alexander Cochrane", date: "2 April 1814", documentType: "British military proclamation",
    editorialIntroduction: "The proclamation was a weapon against the American slave system and a route used by people already seeking freedom. Its bureaucratic options—service or resettlement—cannot contain the personal danger of escape.",
    diplomatic: "All those who may be disposed to emigrate from the United States, will, with their families, be received on board.",
    modernized: "People leaving the United States could bring their families and seek refuge aboard British ships.",
    transcriptionNote: "The excerpt preserves the proclamation's phrasing while omitting the clauses that specify military service and resettlement.",
    annotations: [{ term: "emigrate", note: "The proclamation's neutral legal term for flight from slavery and departure from the United States." }, { term: "received", note: "Reception did not guarantee equal treatment, family unity, or an easy resettlement." }],
    repository: "British naval correspondence; interpreted by the National Park Service", collection: "Black Freedom Seeking during the War of 1812", identifier: "Cochrane proclamation, 2 April 1814", provenance: "Issued by the Royal Navy's North American commander and circulated during Chesapeake operations.", sourceUrl: "https://www.nps.gov/articles/000/black-freedom-seeking-during-the-war-of-1812-from-the-chesapeake-cumberland-island-and-beyond-part-1.htm", rights: "Public-domain British military record.",
    counterpoint: { title: "American property-recovery claims", creator: "United States slaveholders and diplomats", date: "1815–1828", summary: "American claimants described refugees as private property wrongfully carried away, exposing the collision between treaty language and the freedom people had seized.", sourceUrl: "https://www.nps.gov/articles/000/black-freedom-seeking-during-the-war-of-1812-from-the-chesapeake-cumberland-island-and-beyond.htm" }
  },
  {
    slug: "treaty-fort-jackson", chapterSlug: "southern-borderlands", chapterOrder: 10, chapterTitle: "The Southern Borderlands",
    title: "Treaty of Fort Jackson", creator: "United States commissioners and Muscogee signatories", date: "9 August 1814", documentType: "Imposed treaty and land cession",
    editorialIntroduction: "The document presents cession as treaty settlement after military defeat. Its territorial reach included communities that had fought beside the United States, making the alliance's unequal ending visible in the text.",
    diplomatic: "The Creek nation cede to the United States all the territory belonging to said nation within the territories of the United States.",
    modernized: "The Muscogee Confederacy was compelled to transfer an enormous tract of land to the United States.",
    transcriptionNote: "The excerpt follows the treaty's legal vocabulary; capitalization is reduced.",
    annotations: [{ term: "Creek nation", note: "A United States treaty category imposed on politically diverse Muscogee towns and factions." }, { term: "cede", note: "To transfer territorial claim by treaty; here negotiated under overwhelming military coercion." }],
    repository: "National Archives treaty records; National Park Service interpretation", collection: "Creek War in the Southeast", identifier: "7 Stat. 120", provenance: "Signed at Fort Jackson after Horseshoe Bend and preserved among United States treaty records.", sourceUrl: "https://www.nps.gov/articles/creek-war-in-the-southeast-1.htm", rights: "Public-domain treaty record.",
    counterpoint: { title: "Claims of United States-allied Muscogee leaders", creator: "Lower Creek allies", date: "1814", summary: "Allied leaders protested that the cession punished towns that had supplied warriors and support to Jackson's campaign.", sourceUrl: "https://www.nps.gov/articles/creek-war-in-the-southeast-1.htm" }
  },
  {
    slug: "british-war-aims-1814", chapterSlug: "everything-changes", chapterOrder: 11, chapterTitle: "Everything Changes",
    title: "British instructions for the Ghent negotiations", creator: "British cabinet and Foreign Office", date: "1814", documentType: "Diplomatic instructions",
    editorialIntroduction: "Napoleon's abdication let British ministers consider North American security from a stronger position. The instructions connect reinforcements, bargaining leverage, the lakes, and proposed territorial arrangements.",
    diplomatic: "The military possession of the Lakes is essential to the security of His Majesty's North American dominions.",
    modernized: "British ministers regarded control of the Great Lakes as necessary to defend British North America.",
    transcriptionNote: "This reading excerpt follows printed diplomatic correspondence; consult the archival edition for the full instruction and capitalization.",
    annotations: [{ term: "military possession", note: "Operational control, not merely legal title." }, { term: "North American dominions", note: "British colonies in North America, especially Upper and Lower Canada." }],
    repository: "The National Archives (United Kingdom)", collection: "Foreign Office and Colonial Office correspondence", identifier: "Ghent negotiating instructions, 1814", provenance: "Cabinet policy transmitted to British plenipotentiaries while military campaigns continued.", sourceUrl: "https://discovery.nationalarchives.gov.uk/results/r?_q=%22war%20of%201812%22", rights: "Historical text is public domain; digital images require item-level review.",
    counterpoint: { title: "American instructions to the commissioners", creator: "James Monroe and the Madison administration", date: "1814", summary: "American instructions prioritized ending the war without territorial surrender and gradually accepted that maritime grievances might remain outside the treaty.", sourceUrl: "https://guides.loc.gov/treaty-of-ghent" }
  },
  {
    slug: "brown-chippawa-report", chapterSlug: "niagara-again", chapterOrder: 12, chapterTitle: "Niagara, Again",
    title: "Report after Chippawa", creator: "Jacob Brown", date: "7 July 1814", documentType: "After-action report",
    editorialIntroduction: "Brown's report turns training, confusion, casualties, and command into an official claim of performance. British returns and officer reports measure the same battle from another chain of command.",
    diplomatic: "The enemy had collected in great force in the plains of Chippewa, and was moving rapidly to meet us.",
    modernized: "A substantial British force assembled on the Chippawa plain and advanced toward the American army.",
    transcriptionNote: "Place-name spelling and syntax follow nineteenth-century printed copies; consult the archival edition before formal quotation.",
    annotations: [{ term: "enemy", note: "Brown's report compresses British regulars, Canadian militia, and allied forces into one command category." }, { term: "great force", note: "A commander's qualitative estimate, not a verified strength return." }],
    repository: "United States War Department correspondence", collection: "Official letters of the military and naval officers", identifier: "Brown report, July 1814", provenance: "Submitted through the War Department and printed in official compilations and newspapers.", sourceUrl: "https://www.nysl.nysed.gov/mssdesc/war1812.htm", rights: "Public-domain military correspondence.",
    counterpoint: { title: "British returns and Riall's report", creator: "Phineas Riall and British staff", date: "July 1814", summary: "British records describe an unexpected encounter, losses, and withdrawal while challenging the scale and meaning assigned by American victory reports.", sourceUrl: "https://www.canada.ca/en/library-archives/collection/research-help/military-history/war-1812.html" }
  },
  {
    slug: "macdonough-victory-report", chapterSlug: "plattsburgh", chapterOrder: 13, chapterTitle: "Plattsburgh: The Invasion That Turned Back",
    title: "Report of victory on Lake Champlain", creator: "Thomas Macdonough", date: "11 September 1814", documentType: "Naval dispatch",
    editorialIntroduction: "Macdonough's opening assigns victory to Providence, a conventional form that can obscure the deliberate anchoring, springs, kedges, and gunnery behind the result.",
    diplomatic: "The Almighty has been pleased to grant us a signal victory on Lake Champlain.",
    modernized: "Macdonough reported a decisive American naval victory and attributed it to divine favor.",
    transcriptionNote: "Wording follows the transmitted official report.",
    annotations: [{ term: "signal victory", note: "A conspicuous or decisive success, not a reference to flag signaling." }, { term: "Almighty", note: "Providential language was conventional in official victory reports and public thanksgiving." }],
    repository: "National Park Service and United States naval records", collection: "Battle of Lake Champlain", identifier: "Macdonough report, 11 September 1814", provenance: "Sent after the British squadron surrendered; rapidly printed in American newspapers.", sourceUrl: "https://www.nps.gov/articles/battle-of-lake-champlain.htm", rights: "Public-domain military correspondence.",
    counterpoint: { title: "Prévost's decision to withdraw", creator: "George Prévost and British officers", date: "September 1814", summary: "British correspondence disputes whether naval defeat made retreat immediately necessary, revealing conflict between logistical caution and officers' desire to continue the land attack.", sourceUrl: "https://www.canada.ca/en/library-archives/collection/research-help/military-history/war-1812.html" }
  },
  {
    slug: "dolley-madison-letter", chapterSlug: "washington-burns", chapterOrder: 14, chapterTitle: "Washington Burns",
    title: "Letter written during the evacuation of Washington", creator: "Dolley Madison", date: "23–24 August 1814", documentType: "Private letter",
    editorialIntroduction: "The letter records waiting, rumor, fear, household removal, and the effort to save Washington's portrait. Its first-person immediacy should be read beside the labor of named and unnamed staff around the presidential household.",
    diplomatic: "I insist on waiting until the large picture of Genl. Washington is secured.",
    modernized: "Madison delayed her departure until Gilbert Stuart's large portrait of George Washington had been removed.",
    transcriptionNote: "The abbreviation “Genl.” and punctuation follow the manuscript transcription.",
    annotations: [{ term: "large picture", note: "Gilbert Stuart's full-length Lansdowne portrait of George Washington." }, { term: "secured", note: "Removed from danger, not simply locked in place." }],
    repository: "Library of Congress", collection: "James Madison Papers / War of 1812 resource guide", identifier: "Dolley Madison to Lucy Payne Washington Todd", provenance: "Family letter later preserved among Madison-era manuscript collections.", sourceUrl: "https://guides.loc.gov/war-of-1812", rights: "Public-domain manuscript; verify reproduction rights for any page image.",
    counterpoint: { title: "British officer accounts of the occupation", creator: "George Robert Gleig and British participants", date: "1814 and later", summary: "British narratives framed the burning as controlled retaliation against public property, a claim complicated by looting, fear, and the broader destruction experienced by residents.", sourceUrl: "https://www.nationalarchives.gov.uk/help-with-your-research/research-guides/napoleonic-wars-war-of-1812/" }
  },
  {
    slug: "defence-fort-mhenry", chapterSlug: "baltimore-holds", chapterOrder: 15, chapterTitle: "Baltimore II: A City at War With an Empire",
    title: "Defence of Fort M'Henry", creator: "Francis Scott Key", date: "September 1814", documentType: "Broadside lyric",
    editorialIntroduction: "The broadside is not a battlefield report. It is a poetic witness document written after a night of partial vision, then printed, sung, preserved, and eventually nationalized.",
    diplomatic: "O say can you see, by the dawn's early light, What so proudly we hail'd at the twilight's last gleaming.",
    modernized: "At daybreak, can you still see the flag that we saluted at sunset?",
    transcriptionNote: "The apostrophe in “hail'd” and the broadside's punctuation are retained.",
    annotations: [{ term: "dawn", note: "The lyric turns morning visibility into evidence that the fort had not surrendered." }, { term: "we", note: "A rhetorical national community, not a precise inventory of everyone present or represented." }],
    repository: "Library of Congress and Fort McHenry NMHS", collection: "Star-Spangled Banner primary sources", identifier: "Baltimore broadside, September 1814", provenance: "Printed soon after the bombardment; later retitled, set to music, collected, and canonized.", sourceUrl: "https://home.nps.gov/fomc/learn/historyculture/the-bombardment-of-fort-mchenry.htm", rights: "Public-domain 1814 text. The local image is a separate c. 1819 print with no known publication restrictions.",
    counterpoint: { title: "Armistead's official report", creator: "George Armistead", date: "24 September 1814", summary: "The fort commander's report emphasizes duration, casualties, damage, discipline, and supporting batteries rather than the symbolic morning flag.", sourceUrl: "https://home.nps.gov/fomc/learn/historyculture/the-bombardment-of-fort-mchenry.htm" },
    image: { src: "/images/fort-mchenry-bombardment.jpg", alt: "Hand-colored nineteenth-century print showing bomb vessels firing toward Fort McHenry", caption: "John Bower's c. 1819 print is an early visual interpretation, produced after the battle rather than during it.", credit: "Library of Congress, Prints and Photographs Division; no known restrictions" }
  },
  {
    slug: "treaty-ghent-article-one", chapterSlug: "peace-at-ghent", chapterOrder: 16, chapterTitle: "Peace at Ghent",
    title: "Treaty of Ghent, Article I", creator: "British and American plenipotentiaries", date: "24 December 1814", documentType: "Bilateral peace treaty",
    editorialIntroduction: "The first article restores peace and territory. What it does not mention—impressment and neutral rights—is as important as what it commands.",
    diplomatic: "There shall be a firm and universal Peace between His Britannic Majesty and the United States.",
    modernized: "Britain and the United States agreed to a comprehensive peace.",
    transcriptionNote: "Capitalization follows the diplomatic transcription published by the Avalon Project.",
    annotations: [{ term: "universal Peace", note: "Peace applied across the parties' territories and people, subject to ratification and communication schedules." }, { term: "plenipotentiaries", note: "Diplomats formally empowered to negotiate and sign for their governments." }],
    repository: "National Archives / Library of Congress; transcription at Avalon Project", collection: "British-American Diplomacy", identifier: "Treaty of Ghent, Article I", provenance: "Signed at Ghent, exchanged through ratification, and proclaimed in the United States in February 1815.", sourceUrl: "https://avalon.law.yale.edu/19th_century/ghent.asp", rights: "Public-domain treaty text; repository images require item-level review.",
    counterpoint: { title: "Article IX and Indigenous exclusion", creator: "British and American plenipotentiaries", date: "24 December 1814", summary: "Article IX promised restoration of Indigenous rights and possessions, but Native nations were absent as equal parties and the provision could not reverse United States expansion.", sourceUrl: "https://avalon.law.yale.edu/19th_century/ghent.asp#art9" }
  },
  {
    slug: "jackson-free-men-color", chapterSlug: "new-orleans", chapterOrder: 17, chapterTitle: "New Orleans: The Battle After Peace Was Signed",
    title: "Appeal to the free men of color", creator: "Andrew Jackson", date: "21 September 1814", documentType: "Military recruitment address",
    editorialIntroduction: "Jackson's address used the language of citizenship, honor, and shared defense during emergency mobilization. The promises did not dissolve racial hierarchy after victory.",
    diplomatic: "To every noble-hearted, generous freeman of color, volunteering to serve during the present contest.",
    modernized: "Jackson publicly praised free Black men who volunteered for the defense of Louisiana.",
    transcriptionNote: "The excerpt retains the period term and rhetorical form of address.",
    annotations: [{ term: "freeman of color", note: "A period legal and social category for free Black and mixed-race men, especially significant in Louisiana." }, { term: "present contest", note: "The approaching British campaign in the Gulf and defense of New Orleans." }],
    repository: "National Park Service", collection: "Accounts of African American Service during the War of 1812", identifier: "Jackson address, 21 September 1814", provenance: "Issued during recruitment and preserved in printed military and civic records.", sourceUrl: "https://www.nps.gov/articles/accounts-of-african-american-service-during-the-war-of-1812.htm", rights: "Public-domain military address.",
    counterpoint: { title: "Postwar treatment of Black veterans", creator: "Veterans, legislators, and civic authorities", date: "1815 and after", summary: "Pay, recognition, voting rights, and legal equality remained unequal, testing the inclusive language used when military labor was urgently needed.", sourceUrl: "https://www.nps.gov/articles/accounts-of-african-american-service-during-the-war-of-1812.htm" }
  },
  {
    slug: "rush-bagot-notes", chapterSlug: "what-changed", chapterOrder: 18, chapterTitle: "What Did the War Change?",
    title: "Rush–Bagot exchange of notes", creator: "Richard Rush and Charles Bagot", date: "28–29 April 1817", documentType: "Diplomatic exchange",
    editorialIntroduction: "The arrangement limited naval armament on the Great Lakes without settling every border problem. It shows former enemies choosing managed restraint after an expensive shipbuilding race.",
    diplomatic: "The naval force to be maintained upon the American lakes by His Majesty and the Government of the United States shall be confined.",
    modernized: "Britain and the United States agreed to strict limits on warships kept on the Great Lakes.",
    transcriptionNote: "The excerpt retains the formal diplomatic syntax while omitting the vessel-by-vessel limits that follow.",
    annotations: [{ term: "exchange of notes", note: "Matching diplomatic letters that together created an international agreement." }, { term: "confined", note: "Restricted to specified numbers, armament, and size—not abolished without exception." }],
    repository: "Office of the Historian, U.S. Department of State", collection: "Milestones in the History of U.S. Foreign Relations", identifier: "Rush–Bagot Agreement, 1817", provenance: "Parallel diplomatic notes later treated as a binding bilateral arrangement.", sourceUrl: "https://history.state.gov/milestones/1801-1829/rush-bagot", rights: "Public-domain diplomatic record.",
    counterpoint: { title: "Treaty promises and Indigenous dispossession", creator: "United States treaty system and Native petitioners", date: "1815 and after", summary: "A quieter international border coexisted with accelerating United States pressure on Indigenous homelands south of it; peace between states did not mean restored security for Native nations.", sourceUrl: "https://www.nps.gov/subjects/warof1812/legacies-of-the-war-of-1812.htm" }
  }
];

export const documentaryByChapter = Object.fromEntries(documentaryPackets.map((packet) => [packet.chapterSlug, packet])) as Record<string, DocumentaryPacket>;
export const documentaryBySlug = Object.fromEntries(documentaryPackets.map((packet) => [packet.slug, packet])) as Record<string, DocumentaryPacket>;

const safeKey = (packet: DocumentaryPacket) => `${packet.creator.split(" ").slice(-1)[0].replace(/[^a-z0-9]/gi, "")}${packet.date.match(/\d{4}/)?.[0] || "1812"}`.toLowerCase();

export function documentaryCitation(packet: DocumentaryPacket, style: "chicago" | "mla" | "bibtex" | "ris") {
  const accessed = "accessed September 18, 2026";
  if (style === "mla") return `${packet.creator}. “${packet.title}.” ${packet.date}. ${packet.repository}, ${packet.sourceUrl}. Accessed 18 Sept. 2026.`;
  if (style === "bibtex") return `@misc{${safeKey(packet)},\n  author = {${packet.creator}},\n  title = {${packet.title}},\n  year = {${packet.date.match(/\d{4}/)?.[0] || "1812"}},\n  howpublished = {${packet.repository}},\n  url = {${packet.sourceUrl}},\n  note = {${packet.identifier}}\n}`;
  if (style === "ris") return `TY  - MANSCPT\nAU  - ${packet.creator}\nTI  - ${packet.title}\nDA  - ${packet.date}\nPB  - ${packet.repository}\nUR  - ${packet.sourceUrl}\nN1  - ${packet.identifier}\nER  -`;
  return `${packet.creator}. “${packet.title}.” ${packet.date}. ${packet.collection}. ${packet.repository}. ${packet.identifier}. ${packet.sourceUrl} (${accessed}).`;
}
