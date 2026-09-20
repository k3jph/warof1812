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
  witness: string;
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
    witness: "The enrolled act as printed in United States Statutes at Large, volume 2, page 451.",
    diplomatic: "An embargo be, and hereby is, laid on all ships and vessels in the ports and places within the limits or jurisdiction of the United States ...",
    modernized: "All ships and vessels within United States jurisdiction were forbidden to depart for foreign trade.",
    transcriptionNote: "Excerpt from section 1. Capitalization is reduced; the ellipsis marks the omitted remainder of the statutory sentence.",
    annotations: [{ term: "embargo", note: "A state prohibition on ships entering or leaving ports for trade." }, { term: "jurisdiction", note: "The geographic and legal reach within which the United States claimed authority." }],
    repository: "Library of Congress", collection: "United States Statutes at Large", identifier: "2 Stat. 451, sec. 1", provenance: "Enrolled federal law printed in the Statutes at Large. The repository scan is the cited witness.", sourceUrl: "https://www.loc.gov/resource/llsl.002/?sp=490", rights: "Public-domain United States government record."
  },
  {
    slug: "madison-war-message", chapterSlug: "why-war", chapterOrder: 1, chapterTitle: "Why War?",
    title: "Special Message to Congress", creator: "James Madison", date: "1 June 1812", documentType: "Presidential message",
    editorialIntroduction: "Madison did not present one cause. He assembled maritime seizure, impressment, commercial restriction, violations of territorial waters, and frontier insecurity into a cumulative case for congressional action.",
    witness: "The message as printed in the official congressional record and reproduced by the Miller Center.",
    diplomatic: "British cruisers have been in the continued practice of violating the American flag on the great highway of nations, and of seizing and carrying off persons sailing under it; not in the exercise of a belligerent right founded on the law of nations against an enemy, but of a municipal prerogative over British subjects.",
    modernized: "British warships repeatedly violated the protection claimed by American-flagged vessels on the open sea.",
    transcriptionNote: "One complete sentence is reproduced. Spelling and punctuation follow the linked transcription.",
    annotations: [{ term: "American flag", note: "Here the flag means the legal protection of the vessel and those sailing under it." }, { term: "great highway of nations", note: "Madison's formulation for the open sea as a shared international space." }],
    repository: "Miller Center, University of Virginia", collection: "Presidential Speeches", identifier: "James Madison, Special Message to Congress, 1 June 1812", provenance: "Delivered as a written message to Congress and printed in its proceedings. The linked transcription is the displayed witness.", sourceUrl: "https://millercenter.org/the-presidency/presidential-speeches/june-1-1812-special-message-congress-foreign-policy-crisis-war", rights: "Public-domain federal record; transcription supplied by the repository.",
    counterpoint: { title: "Federalist objections in Congress", creator: "Federalist members of Congress", date: "June 1812", summary: "Opponents argued that war would punish American commerce, expand executive power, and choose the wrong enemy while French violations continued.", sourceUrl: "https://history.house.gov/Records-and-Research/Listing/lfp_012/" }
  },
  {
    slug: "baltimore-riot-narrative", chapterSlug: "baltimore-at-war-with-itself", chapterOrder: 2, chapterTitle: "Baltimore I: A City at War With Itself",
    title: "An Exact and Authentic Narrative", creator: "Sufferers and eyewitnesses of the Baltimore riots", date: "1 September 1812", documentType: "Partisan pamphlet and collected testimony",
    editorialIntroduction: "This Federalist publication is both evidence and argument. Its depositions, letters, and survivor narratives document the violence while arranging that evidence to indict Republican government and defend the armed pressmen.",
    witness: "The 1812 pamphlet, printed page 4, in the digitized University of California copy.",
    diplomatic: "On the night of the 22d June, the office and entire printing apparatus of the Federal Republican was demolished by a Mob in Baltimore, in the presence of the Mayor, the Judge of the Criminal Court, and several other Magistrates and Police Officers, whose authority was not exerted to save it, and preserve the peace of the city.",
    modernized: "The pamphlet charged that a Baltimore crowd destroyed the Federal Republican office on June 22 while city officials failed to intervene.",
    transcriptionNote: "One complete sentence is transcribed from printed page 4. Capitalization and period spelling are retained; obvious scanner errors are not used as copy text.",
    annotations: [{ term: "Mob", note: "The capitalized word carries the pamphlet's partisan judgment as well as describing a crowd." }, { term: "Federal Republican", note: "The antiwar Federalist newspaper attacked in June and again at the level of its defenders in July." }],
    repository: "Internet Archive", collection: "University of California Libraries", identifier: "An Exact and Authentic Narrative (1812), printed p. 4", provenance: "Printed in Baltimore in 1812. The linked digitization supplies page images of the cited witness.", sourceUrl: "https://archive.org/details/exactauthenticna01thom", rights: "Public-domain printed pamphlet.",
    counterpoint: { title: "Republican language of treason", creator: "Baltimore Republican speakers and newspapers", date: "June–July 1812", summary: "Pro-war rhetoric described Federalist dissent as Tory disloyalty. That framing helps explain the attackers without excusing the assault or the failure of officials.", sourceUrl: "https://www.nps.gov/articles/baltimore-riots.htm" }
  },
  {
    slug: "hull-proclamation", chapterSlug: "easy-conquest-that-wasnt", chapterOrder: 3, chapterTitle: "The Easy Conquest That Wasn't",
    title: "Proclamation to the Inhabitants of Canada", creator: "William Hull", date: "12 July 1812", documentType: "Military proclamation",
    editorialIntroduction: "Hull's proclamation promised protection and liberation while an invading army crossed into Upper Canada. Its confidence is most revealing when read beside his surrender at Detroit five weeks later.",
    witness: "Hull's proclamation as transmitted in contemporary printings and reproduced by the Canadian War Museum.",
    diplomatic: "I come to find enemies, not to make them. I come to protect, not to injure you.",
    modernized: "Hull claimed that his army sought existing enemies and would protect Canadian civilians rather than harm them.",
    transcriptionNote: "Punctuation follows widely reproduced contemporary printings; consult the linked institutional edition before formal quotation.",
    annotations: [{ term: "inhabitants", note: "The proclamation addresses civilians as potential neutrals or allies rather than a unified Canadian nation." }, { term: "protect", note: "A standard invasion claim that also carried an implicit threat against resistance." }],
    repository: "Canadian War Museum", collection: "1812: One War, Four Perspectives", identifier: "Hull proclamation interpretive record", provenance: "Issued from Sandwich after the American crossing; circulated in print and manuscript copies.", sourceUrl: "https://www.warmuseum.ca/war-of-1812/", rights: "The historical text is public domain; repository media may have separate terms.",
    counterpoint: { title: "Brock's proclamation", creator: "Isaac Brock", date: "22 July 1812", summary: "Brock answered that American promises concealed conquest and warned that Britain could not restrain Indigenous allies if the invasion continued.", sourceUrl: "https://www.warmuseum.ca/war-of-1812/" }
  },
  {
    slug: "lawrence-last-command", chapterSlug: "old-ironsides", chapterOrder: 4, chapterTitle: "“Old Ironsides” and the War at Sea",
    title: "Report of the capture of Chesapeake", creator: "George Budd", date: "15 June 1813", documentType: "Official naval report",
    editorialIntroduction: "Budd's report records the action and the collapse of command after Lawrence and the other senior officers were wounded. It replaces a famous attributed utterance with a named participant's formal account.",
    witness: "Budd's report as printed in John Brannan's 1823 compilation, pages 165–167.",
    diplomatic: "The unfortunate death of captain James Lawrence, and lieutenant Augustus C. Ludlow, has rendered it my duty to inform you of the capture of the late United States' frigate Chesapeake.",
    modernized: "Budd reported Chesapeake's capture because Lawrence and Ludlow had died from their wounds.",
    transcriptionNote: "The opening sentence is reproduced from the 1823 printed witness; capitalization is reduced.",
    annotations: [{ term: "late", note: "Here meaning the former United States frigate after its capture." }, { term: "George Budd", note: "Chesapeake's surviving third lieutenant and the officer who submitted the report." }],
    repository: "Internet Archive", collection: "John Brannan, Official Letters of the Military and Naval Officers of the United States", identifier: "George Budd to the Secretary of the Navy, Halifax, 15 June 1813, pp. 165–167", provenance: "Budd sent the report from Halifax; Brannan printed it in the 1823 documentary compilation. The linked scan is the cited witness.", sourceUrl: "https://archive.org/details/officialletterso00bran", rights: "Public-domain naval correspondence and printed edition.",
    counterpoint: { title: "Court-martial evidence after Chesapeake's loss", creator: "United States Navy", date: "1813", summary: "Testimony about readiness, discipline, wounds, and the boarding action resists reducing the defeat to either cowardice or a single heroic sentence.", sourceUrl: "https://www.history.navy.mil/browse-by-topic/wars-conflicts-and-operations/1812.html" }
  },
  {
    slug: "perry-dispatch", chapterSlug: "war-for-the-interior", chapterOrder: 5, chapterTitle: "The War for the Interior",
    title: "Dispatch from Lake Erie", creator: "Oliver Hazard Perry", date: "10 September 1813", documentType: "Naval victory dispatch",
    editorialIntroduction: "Nine words turned a fleet action into national shorthand. The full operational story includes shipyard labor, the ruined Lawrence, Perry's transfer to Niagara, Black sailors, and the land campaign the victory enabled.",
    witness: "Perry's pencil dispatch to William Henry Harrison, as transcribed by the National Park Service.",
    diplomatic: "We have met the enemy and they are ours: two ships, two brigs, one schooner and one sloop.",
    modernized: "We engaged the British squadron and captured it.",
    transcriptionNote: "Wording follows Perry's famous pencil dispatch to William Henry Harrison.",
    annotations: [{ term: "ours", note: "Perry followed the sentence with a list of captured British vessels." }, { term: "dispatch", note: "A brief official report sent from a commander to a superior." }],
    repository: "National Park Service", collection: "Perry's Victory and International Peace Memorial", identifier: "Perry to Harrison, 10 September 1813", provenance: "Written aboard USS Lawrence after the battle and delivered to Harrison.", sourceUrl: "https://home.nps.gov/pevi/learn/historyculture/battle_erie_detail.htm", rights: "Public-domain military correspondence.",
    counterpoint: { title: "British accounts of the squadron's condition", creator: "Royal Navy officers and court-martial witnesses", date: "1813–1814", summary: "British evidence emphasizes Barclay's wounds, incomplete crews, shortages, and the squadron's constrained supply without negating American victory.", sourceUrl: "https://www.canada.ca/en/library-archives/collection/research-help/military-history/war-1812.html" }
  },
  {
    slug: "lake-ontario-return", chapterSlug: "continental-naval-arms-race", chapterOrder: 6, chapterTitle: "Lakes, Shipyards, and a Continental Naval Arms Race",
    title: "Report on the defense of Sackets Harbor", creator: "Jacob Brown", date: "29 May 1813", documentType: "Official military report",
    editorialIntroduction: "Brown's same-day report identifies the attacking commanders and records that the unfinished General Pike survived. It supplies a document rather than a detached column heading.",
    witness: "Brown's report to Henry Dearborn as printed in John Brannan's 1823 compilation, page 164.",
    diplomatic: "The new ship and commodore Chauncey's prize, the Duke of Gloucester, are yet safe in Sackett's Harbor.",
    modernized: "Brown reported that the unfinished General Pike and the captured Duke of Gloucester survived the attack.",
    transcriptionNote: "One complete sentence is reproduced from the 1823 printed witness. The printed spelling of Sackett's Harbor is retained.",
    annotations: [{ term: "new ship", note: "USS General Pike, then under construction. A fire was extinguished and the ship was launched on June 12." }, { term: "prize", note: "A captured enemy vessel adjudicated as lawful wartime property." }],
    repository: "Internet Archive", collection: "John Brannan, Official Letters of the Military and Naval Officers of the United States", identifier: "Jacob Brown to Henry Dearborn, 29 May 1813, p. 164", provenance: "Brown wrote on the day of the attack; Brannan printed the report in 1823. The linked scan is the cited witness.", sourceUrl: "https://archive.org/details/officialletterso00bran", rights: "Public-domain military correspondence and printed edition.",
    counterpoint: { title: "British dockyard returns at Kingston", creator: "Royal Navy", date: "1814", summary: "British returns reveal the same strategic logic across the lake: each new hull forced the opponent to build, concentrate, or remain in port.", sourceUrl: "https://www.canada.ca/en/library-archives/collection/research-help/military-history/war-1812.html" }
  },
  {
    slug: "porter-madisons-island", chapterSlug: "war-around-cape-horn", chapterOrder: 7, chapterTitle: "The War Goes Around Cape Horn",
    title: "Porter's claim to Madison's Island", creator: "David Porter", date: "19 November 1813", documentType: "Naval proclamation and journal narrative",
    editorialIntroduction: "Porter's claim translated a temporary refitting base and intervention in local conflict into the language of American possession. Nuku Hiva was inhabited political ground, not an empty harbor awaiting a flag.",
    witness: "Porter's published declaration in Journal of a Cruise Made to the Pacific Ocean, volume 2 (1815), pages 83–85.",
    diplomatic: "I do declare that I have, in the most solemn manner, under the American flag displayed in Fort Madison, and in the presence of numerous witnesses taken possession of the said island, called Madison's Island, for the use of the United States, whereof I am a citizen.",
    modernized: "Porter declared Nuku Hiva to be United States territory and renamed it for President Madison.",
    transcriptionNote: "One complete clause is transcribed from Porter's 1815 printed declaration; capitalization is reduced.",
    annotations: [{ term: "possession", note: "A unilateral imperial claim that the United States neither sustained nor effectively administered." }, { term: "this island", note: "Nuku Hiva in the Marquesas, home to multiple communities with their own rivalries and authority." }],
    repository: "HathiTrust / public-domain transcription at The Whalesite", collection: "David Porter, Journal of a Cruise Made to the Pacific Ocean, vol. 2", identifier: "Philadelphia, 1815, pp. 83–85", provenance: "Porter printed the declaration in his post-cruise journal. The linked edition is the cited witness, not the location of the original signed instrument.", sourceUrl: "https://whalesite.org/galapagos/1815%20-%20Porter%20-%20Journal%20of%20a%20cruise%20made%20to%20the%20Pacific%20-%20vol%202.htm", rights: "Public-domain printed book.",
    counterpoint: { title: "Nuku Hiva beyond Porter's journal", creator: "Marquesan communities and later ethnographic reconstruction", date: "1813 and after", summary: "Local alliances and resistance show that Porter's base depended on Indigenous politics he only partially understood and represented through an American naval lens.", sourceUrl: "https://www.history.navy.mil/our-collections/art/travelling-exhibits/the-war-of-1812/the-war-in-the-pacific--1813-april-1814-.html" }
  },
  {
    slug: "mclure-newark-report", chapterSlug: "war-reaches-homes", chapterOrder: 8, chapterTitle: "The War Reaches Towns and Homes",
    title: "Report on the destruction of Newark", creator: "George McClure", date: "December 1813", documentType: "Military report",
    editorialIntroduction: "McClure described burning Newark as a military necessity during retreat. Civilian petitions and British retaliation narratives turned the same act into evidence of calculated cruelty.",
    witness: "McClure's published defense as printed in John Brannan's 1823 compilation, page 291.",
    diplomatic: "I accordingly gave orders for all the arms, ammunition and public stores, of every description, to be sent across the river ... and ordered the town of Newark to be burnt.",
    modernized: "McClure said he ordered public stores evacuated and Newark burned as the British approached.",
    transcriptionNote: "Two clauses from one sentence are joined with an ellipsis marking the omitted words. Capitalization is reduced.",
    annotations: [{ term: "Newark", note: "Present-day Niagara-on-the-Lake, Upper Canada." }, { term: "ordered", note: "McClure accepted responsibility while arguing that the evacuation made the destruction militarily necessary." }],
    repository: "Internet Archive", collection: "John Brannan, Official Letters of the Military and Naval Officers of the United States", identifier: "George McClure, published defense, p. 291", provenance: "McClure's statement was printed in the 1823 compilation. It is a retrospective defense by the responsible commander, not a neutral damage inventory.", sourceUrl: "https://archive.org/details/officialletterso00bran", rights: "Public-domain military correspondence and printed edition.",
    counterpoint: { title: "Civilian damage claims", creator: "Residents of Newark and the Niagara frontier", date: "1813–1815", summary: "Claims enumerate homes, clothing, food, livestock, and tools, shifting attention from strategic justification to the material life destroyed.", sourceUrl: "https://www.nps.gov/subjects/warof1812/living-conflict-narratives.htm" }
  },
  {
    slug: "cochrane-proclamation", chapterSlug: "blockade", chapterOrder: 9, chapterTitle: "Blockade",
    title: "Proclamation offering reception and resettlement", creator: "Alexander Cochrane", date: "2 April 1814", documentType: "British military proclamation",
    editorialIntroduction: "The proclamation was a weapon against the American slave system and a route used by people already seeking freedom. Its bureaucratic options of service or resettlement cannot contain the personal danger of escape.",
    witness: "Cochrane's proclamation as issued at Bermuda and reproduced from an Indiana University broadside.",
    diplomatic: "All those who may be disposed to emigrate from the UNITED STATES will, with their Families, be received on board His Majesty's Ships or Vessels of War, or at the Military Posts that may be established, upon or near the Coast of the UNITED STATES, when they will have their choice of either entering into His Majesty's Sea or Land Forces, or of being sent as FREE Settlers to the British Possessions in North America or the West Indies, where they will meet with due encouragement.",
    modernized: "People leaving the United States could bring their families and seek refuge aboard British ships.",
    transcriptionNote: "The complete notice sentence is reproduced; capitalization follows the broadside transcription.",
    annotations: [{ term: "emigrate", note: "The proclamation's neutral legal term for flight from slavery and departure from the United States." }, { term: "received", note: "Reception did not guarantee equal treatment, family unity, or an easy resettlement." }],
    repository: "Indiana University; transcription by Baltimore Heritage", collection: "Cochrane proclamation broadside", identifier: "VAC2927, 2 April 1814", provenance: "Issued at Bermuda by the Royal Navy's North American commander. The linked page identifies and transcribes the broadside witness.", sourceUrl: "https://1814.baltimoreheritage.org/admiral-alexander-cochrane-let-the-landings-you-may-make-be-more-for-the-protection-of-the-desertion-of-the-black-population-than-with-a-view-to-any-other-advantage/", rights: "Public-domain British proclamation; image rights remain with the holding repository.",
    counterpoint: { title: "American property-recovery claims", creator: "United States slaveholders and diplomats", date: "1815–1828", summary: "American claimants described refugees as private property wrongfully carried away, exposing the collision between treaty language and the freedom people had seized.", sourceUrl: "https://www.nps.gov/articles/000/black-freedom-seeking-during-the-war-of-1812-from-the-chesapeake-cumberland-island-and-beyond.htm" }
  },
  {
    slug: "treaty-fort-jackson", chapterSlug: "southern-borderlands", chapterOrder: 10, chapterTitle: "The Southern Borderlands",
    title: "Treaty of Fort Jackson", creator: "United States commissioners and Muscogee signatories", date: "9 August 1814", documentType: "Imposed treaty and land cession",
    editorialIntroduction: "The document presents cession as treaty settlement after military defeat. Its territorial reach included communities that had fought beside the United States, making the alliance's unequal ending visible in the text.",
    witness: "Article 1 of the ratified treaty as printed at 7 Stat. 120 and presented with the National Archives treaty scan.",
    diplomatic: "The United States demand an equivalent for all expenses incurred in prosecuting the war to its termination, by a cession of all the territory belonging to the Creek nation within the territories of the United States, lying west, south, and south-eastwardly, of a line to be run and described by persons duly authorized and appointed by the President of the United States: ...",
    modernized: "The Muscogee Confederacy was compelled to transfer an enormous tract of land to the United States.",
    transcriptionNote: "The opening clause of Article 1 is reproduced; capitalization is reduced and the ellipsis marks the omitted boundary description.",
    annotations: [{ term: "Creek nation", note: "A United States treaty category imposed on politically diverse Muscogee towns and factions." }, { term: "cede", note: "To transfer territorial claim by treaty; here negotiated under overwhelming military coercion." }],
    repository: "National Archives and Records Administration", collection: "Ratified Indian Treaties", identifier: "Ratified Indian Treaty 61; 7 Stat. 120, art. 1", provenance: "Signed at Fort Jackson after Horseshoe Bend and preserved among United States ratified treaty records. The linked presentation includes the National Archives scan and transcript.", sourceUrl: "https://americanindian.si.edu/nationtonation/treaty-fort-jackson.html", rights: "Public-domain United States treaty record.",
    counterpoint: { title: "Claims of United States-allied Muscogee leaders", creator: "Lower Creek allies", date: "1814", summary: "Allied leaders protested that the cession punished towns that had supplied warriors and support to Jackson's campaign.", sourceUrl: "https://www.nps.gov/articles/creek-war-in-the-southeast-1.htm" }
  },
  {
    slug: "british-war-aims-1814", chapterSlug: "everything-changes", chapterOrder: 11, chapterTitle: "Everything Changes",
    title: "American commissioners report Britain's opening terms", creator: "John Quincy Adams, James A. Bayard, Henry Clay, Jonathan Russell, and Albert Gallatin", date: "12 August 1814", documentType: "Diplomatic dispatch",
    editorialIntroduction: "The American commissioners recorded Britain's initial Ghent demands, including a permanent Indigenous boundary. The dispatch identifies its speakers, date, and chain of transmission, unlike the unlocated memorandum it replaces.",
    witness: "The commissioners' dispatch as printed in American State Papers, Foreign Relations, volume 3, pages 705–707.",
    diplomatic: "The Indian allies of Great Britain to be included in the pacification, and a definite boundary to be settled for their territory. The British commissioners stated that an arrangement upon this point was a sine qua non.",
    modernized: "The American commissioners reported that Britain initially made peace for its Indigenous allies and a fixed territorial boundary indispensable to an agreement.",
    transcriptionNote: "Two consecutive sentences are reproduced from the official printed dispatch; capitalization is reduced.",
    annotations: [{ term: "pacification", note: "Inclusion in the peace settlement and an end to hostilities." }, { term: "sine qua non", note: "A condition without which Britain said it would not conclude peace at that stage of the negotiation." }],
    repository: "Library of Congress / Internet Archive", collection: "American State Papers, Foreign Relations, vol. 3", identifier: "No. 269, American commissioners to the Secretary of State, 12 August 1814, pp. 705–707", provenance: "The American plenipotentiaries sent the dispatch from Ghent. Congress later printed it in American State Papers. The linked scan is the cited witness.", sourceUrl: "https://archive.org/details/americanstatepap_o03unit/page/705/mode/2up", rights: "Public-domain diplomatic correspondence and federal printing.",
    counterpoint: { title: "American instructions to the commissioners", creator: "James Monroe and the Madison administration", date: "1814", summary: "American instructions prioritized ending the war without territorial surrender and gradually accepted that maritime grievances might remain outside the treaty.", sourceUrl: "https://guides.loc.gov/treaty-of-ghent" }
  },
  {
    slug: "brown-chippawa-report", chapterSlug: "niagara-again", chapterOrder: 12, chapterTitle: "Niagara, Again",
    title: "Report after Chippawa", creator: "Jacob Brown", date: "7 July 1814", documentType: "After-action report",
    editorialIntroduction: "Brown's report turns training, confusion, casualties, and command into an official claim of performance. British returns and officer reports measure the same battle from another chain of command.",
    witness: "Brown's report as printed in John Brannan's 1823 compilation, pages 368–370.",
    diplomatic: "At 4 o'clock in the afternoon, agreeably to a plan I had given general Porter, he advanced from the rear of our camp, with the volunteers and Indians (taking the woods in order to keep out of view of the enemy).",
    modernized: "Brown reported ordering Porter's volunteers and Indigenous warriors to advance through the woods on the American left.",
    transcriptionNote: "One complete sentence is reproduced from the 1823 printed witness; capitalization is reduced.",
    annotations: [{ term: "enemy", note: "Brown's report compresses British regulars, Canadian militia, and allied forces into one command category." }, { term: "great force", note: "A commander's qualitative estimate, not a verified strength return." }],
    repository: "Internet Archive", collection: "John Brannan, Official Letters of the Military and Naval Officers of the United States", identifier: "Jacob Brown, Chippawa Plains, 7 July 1814, pp. 368–370", provenance: "Brown submitted the report through the War Department; Brannan printed it in 1823. The linked scan is the cited witness.", sourceUrl: "https://archive.org/details/officialletterso00bran", rights: "Public-domain military correspondence and printed edition.",
    counterpoint: { title: "British returns and Riall's report", creator: "Phineas Riall and British staff", date: "July 1814", summary: "British records describe an unexpected encounter, losses, and withdrawal while challenging the scale and meaning assigned by American victory reports.", sourceUrl: "https://www.canada.ca/en/library-archives/collection/research-help/military-history/war-1812.html" }
  },
  {
    slug: "macdonough-victory-report", chapterSlug: "plattsburgh", chapterOrder: 13, chapterTitle: "Plattsburgh: The Invasion That Turned Back",
    title: "Report of victory on Lake Champlain", creator: "Thomas Macdonough", date: "11 September 1814", documentType: "Naval dispatch",
    editorialIntroduction: "Macdonough's opening assigns victory to Providence, a conventional form that can obscure the deliberate anchoring, springs, kedges, and gunnery behind the result.",
    witness: "Macdonough's dispatch as printed in John Brannan's 1823 compilation, page 410.",
    diplomatic: "The Almighty has been pleased to grant us a signal victory on lake Champlain, in the capture of one frigate, one brig, and two sloops of war of the enemy.",
    modernized: "Macdonough reported a decisive American naval victory and attributed it to divine favor.",
    transcriptionNote: "The complete body sentence is reproduced from the 1823 printed witness; capitalization is reduced.",
    annotations: [{ term: "signal victory", note: "A conspicuous or decisive success, not a reference to flag signaling." }, { term: "Almighty", note: "Providential language was conventional in official victory reports and public thanksgiving." }],
    repository: "Internet Archive", collection: "John Brannan, Official Letters of the Military and Naval Officers of the United States", identifier: "Thomas Macdonough to William Jones, 11 September 1814, p. 410", provenance: "Sent from USS Saratoga after the British squadron surrendered; Brannan printed the dispatch in 1823. The linked scan is the cited witness.", sourceUrl: "https://archive.org/details/officialletterso00bran", rights: "Public-domain naval correspondence and printed edition.",
    counterpoint: { title: "Prévost's decision to withdraw", creator: "George Prévost and British officers", date: "September 1814", summary: "British correspondence disputes whether naval defeat made retreat immediately necessary, revealing conflict between logistical caution and officers' desire to continue the land attack.", sourceUrl: "https://www.canada.ca/en/library-archives/collection/research-help/military-history/war-1812.html" }
  },
  {
    slug: "dolley-madison-letter", chapterSlug: "washington-burns", chapterOrder: 14, chapterTitle: "Washington Burns",
    title: "Letter written during the evacuation of Washington", creator: "Dolley Madison", date: "23–24 August 1814", documentType: "Private letter",
    editorialIntroduction: "The received text records waiting, rumor, fear, household removal, and the effort to save Washington's portrait. The original letter does not survive. Madison later supplied an extract in her own hand to her biographer, so its immediacy must be read through that transmission history.",
    witness: "Dolley Madison's later handwritten extract of the lost 1814 letter, supplied to biographer Lucia B. Cutts and edited in the Dolley Madison Digital Edition.",
    diplomatic: "I insist on waiting until the large picture of Genl. Washington is secured.",
    modernized: "Madison delayed her departure until Gilbert Stuart's large portrait of George Washington had been removed.",
    transcriptionNote: "The abbreviation “Genl.” follows the later copy. This is not a transcription of the lost original letter.",
    annotations: [{ term: "large picture", note: "Gilbert Stuart's full-length Lansdowne portrait of George Washington." }, { term: "secured", note: "Removed from danger, not simply locked in place." }],
    repository: "Dolley Madison Digital Edition, University of Virginia Press", collection: "Selected Letters of Dolley Payne Madison", identifier: "Dolley Madison to Lucy Payne Washington Todd, extract dated 23–24 August 1814", provenance: "The original letter is lost. Madison later copied an extract for Lucia B. Cutts; the documentary edition explains that surviving witness.", sourceUrl: "https://rotunda.upress.virginia.edu/dmde/intro.xqy", rights: "Public-domain historical text; editorial apparatus has separate rights.",
    counterpoint: { title: "British officer accounts of the occupation", creator: "George Robert Gleig and British participants", date: "1814 and later", summary: "British narratives framed the burning as controlled retaliation against public property, a claim complicated by looting, fear, and the broader destruction experienced by residents.", sourceUrl: "https://www.nationalarchives.gov.uk/help-with-your-research/research-guides/napoleonic-wars-war-of-1812/" }
  },
  {
    slug: "defence-fort-mhenry", chapterSlug: "baltimore-holds", chapterOrder: 15, chapterTitle: "Baltimore II: A City at War With an Empire",
    title: "Defence of Fort M'Henry", creator: "Francis Scott Key", date: "September 1814", documentType: "Broadside lyric",
    editorialIntroduction: "The broadside is not a battlefield report. It is a poetic witness document written after a night of partial vision, then printed, sung, preserved, and eventually nationalized.",
    witness: "The first broadside printing, one of two known surviving copies, transcribed from the Smithsonian copy.",
    diplomatic: "O! say can you see by the dawn's early light, What so proudly we hailed at the twilight's last gleaming, ...",
    modernized: "At daybreak, can you still see the flag that we saluted at sunset?",
    transcriptionNote: "The opening line break is closed with a space. The exclamation mark, capitalization, and comma follow the broadside witness; the ellipsis marks the omitted continuation.",
    annotations: [{ term: "dawn", note: "The lyric turns morning visibility into evidence that the fort had not surrendered." }, { term: "we", note: "A rhetorical national community, not a precise inventory of everyone present or represented." }],
    repository: "Smithsonian Institution", collection: "Star-Spangled Banner primary sources", identifier: "Defence of Fort M'Henry broadside, Baltimore, September 1814", provenance: "Printed soon after the bombardment. The Smithsonian copy is one of two known surviving first broadsides and is the cited witness.", sourceUrl: "https://amhistory.si.edu/starspangledbanner/the-lyrics.aspx", rights: "Public-domain 1814 text. The local image is a separate c. 1819 print with no known publication restrictions.",
    counterpoint: { title: "Armistead's official report", creator: "George Armistead", date: "24 September 1814", summary: "The fort commander's report emphasizes duration, casualties, damage, discipline, and supporting batteries rather than the symbolic morning flag.", sourceUrl: "https://home.nps.gov/fomc/learn/historyculture/the-bombardment-of-fort-mchenry.htm" },
    image: { src: "/images/fort-mchenry-bombardment.jpg", alt: "Hand-colored nineteenth-century print showing bomb vessels firing toward Fort McHenry", caption: "John Bower's c. 1819 print is an early visual interpretation, produced after the battle rather than during it.", credit: "Library of Congress, Prints and Photographs Division; no known restrictions" }
  },
  {
    slug: "treaty-ghent-article-one", chapterSlug: "peace-at-ghent", chapterOrder: 16, chapterTitle: "Peace at Ghent",
    title: "Treaty of Ghent, Article I", creator: "British and American plenipotentiaries", date: "24 December 1814", documentType: "Bilateral peace treaty",
    editorialIntroduction: "The first article restores peace and territory. What it does not mention, impressment and neutral rights, is as important as what it commands.",
    witness: "Article I of the signed treaty as transcribed by the Avalon Project from the United States treaty text.",
    diplomatic: "There shall be a firm and universal Peace between His Britannic Majesty and the United States, and between their respective Countries, Territories, Cities, Towns and People of every Degree, without exception of Places or Persons.",
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
    witness: "The printed recruitment address preserved and digitized by the Maryland State Archives.",
    diplomatic: "To every noble-hearted, generous freeman of color, volunteering to serve during the present contest with Great Britain, and no longer, there will be paid the same bounty in money and lands, now received by the white soldiers of the United States, viz. one hundred and twenty-four dollars in money, and one hundred and sixty acres in land.",
    modernized: "Jackson publicly praised free Black men who volunteered for the defense of Louisiana.",
    transcriptionNote: "The complete sentence is reproduced, including the service-duration limit and material terms.",
    annotations: [{ term: "freeman of color", note: "A period legal and social category for free Black and mixed-race men, especially significant in Louisiana." }, { term: "present contest", note: "The approaching British campaign in the Gulf and defense of New Orleans." }],
    repository: "Maryland State Archives", collection: "Documents for the Classroom", identifier: "Andrew Jackson, To the Free Colored Inhabitants of Louisiana, 21 September 1814", provenance: "Issued at Mobile during recruitment and preserved as a printed address. The linked archival teaching record supplies the cited witness.", sourceUrl: "https://teaching.msa.maryland.gov/", rights: "Public-domain military address; archival image terms may differ.",
    counterpoint: { title: "Postwar treatment of Black veterans", creator: "Veterans, legislators, and civic authorities", date: "1815 and after", summary: "Pay, recognition, voting rights, and legal equality remained unequal, testing the inclusive language used when military labor was urgently needed.", sourceUrl: "https://www.nps.gov/articles/accounts-of-african-american-service-during-the-war-of-1812.htm" }
  },
  {
    slug: "rush-bagot-notes", chapterSlug: "what-changed", chapterOrder: 18, chapterTitle: "What Did the War Change?",
    title: "Rush–Bagot exchange of notes", creator: "Richard Rush and Charles Bagot", date: "28–29 April 1817", documentType: "Diplomatic exchange",
    editorialIntroduction: "The arrangement limited naval armament on the Great Lakes without settling every border problem. It shows former enemies choosing managed restraint after an expensive shipbuilding race.",
    witness: "Bagot's note and Rush's confirming reply as transcribed by the Avalon Project.",
    diplomatic: "The naval force to be maintained upon the American lakes, by his majesty and the government of the United States, shall henceforth be confined to the following vessels on each side, that is: ...",
    modernized: "Britain and the United States agreed to strict limits on warships kept on the Great Lakes.",
    transcriptionNote: "The introductory clause is reproduced; the ellipsis marks the omitted vessel-by-vessel limits.",
    annotations: [{ term: "exchange of notes", note: "Matching diplomatic letters that together created an international agreement." }, { term: "confined", note: "Restricted to specified numbers, armament, and size, not abolished without exception." }],
    repository: "Avalon Project, Yale Law School", collection: "British-American Diplomacy", identifier: "Exchange of Notes Relative to Naval Forces on the American Lakes, 28–29 April 1817", provenance: "Bagot and Rush exchanged parallel diplomatic notes later treated as a binding bilateral arrangement. The linked transcription supplies both witnesses.", sourceUrl: "https://avalon.law.yale.edu/19th_century/conv1817.asp", rights: "Public-domain diplomatic record.",
    counterpoint: { title: "Treaty promises and Indigenous dispossession", creator: "United States treaty system and Native petitioners", date: "1815 and after", summary: "A quieter international border coexisted with accelerating United States pressure on Indigenous homelands south of it; peace between states did not mean restored security for Native nations.", sourceUrl: "https://www.nps.gov/subjects/warof1812/legacies-of-the-war-of-1812.htm" }
  }
];

export const documentaryByChapter = Object.fromEntries(documentaryPackets.map((packet) => [packet.chapterSlug, packet])) as Record<string, DocumentaryPacket>;
export const documentaryBySlug = Object.fromEntries(documentaryPackets.map((packet) => [packet.slug, packet])) as Record<string, DocumentaryPacket>;

const safeKey = (packet: DocumentaryPacket) => `${packet.creator.split(" ").slice(-1)[0].replace(/[^a-z0-9]/gi, "")}${packet.date.match(/\d{4}/)?.[0] || "1812"}`.toLowerCase();

export function documentaryCitation(packet: DocumentaryPacket, style: "chicago" | "mla" | "bibtex" | "ris") {
  const accessed = "accessed September 20, 2026";
  if (style === "mla") return `${packet.creator}. “${packet.title}.” ${packet.date}. ${packet.collection}, ${packet.repository}, ${packet.identifier}, ${packet.sourceUrl}. Accessed 20 Sept. 2026.`;
  if (style === "bibtex") return `@misc{${safeKey(packet)},\n  author = {${packet.creator}},\n  title = {${packet.title}},\n  year = {${packet.date.match(/\d{4}/)?.[0] || "1812"}},\n  howpublished = {${packet.repository}},\n  url = {${packet.sourceUrl}},\n  note = {${packet.identifier}}\n}`;
  if (style === "ris") return `TY  - MANSCPT\nAU  - ${packet.creator}\nTI  - ${packet.title}\nDA  - ${packet.date}\nPB  - ${packet.repository}\nUR  - ${packet.sourceUrl}\nN1  - ${packet.identifier}\nER  -`;
  return `${packet.creator}. “${packet.title}.” ${packet.date}. ${packet.collection}. ${packet.repository}. ${packet.identifier}. ${packet.sourceUrl} (${accessed}).`;
}
