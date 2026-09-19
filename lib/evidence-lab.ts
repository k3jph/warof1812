export type ClaimState = "documented" | "qualified" | "unsupported";

export type EvidenceItem = {
  date: string;
  label: string;
  kind: "contemporary" | "later" | "material" | "absence";
  note: string;
  href?: string;
};

export type MemoryStep = {
  date: string;
  title: string;
  note: string;
};

export type EvidenceClaim = {
  slug: string;
  number: string;
  title: string;
  familiarVersion: string;
  verdict: string;
  state: ClaimState;
  confidence: number;
  confidenceNote: string;
  earliest: { date: string; label: string; note: string; href?: string };
  accepted: string[];
  possible: string[];
  unsupported: string[];
  contradictions: string[];
  evidence: EvidenceItem[];
  memoryPath: MemoryStep[];
  sourceRefs: string[];
  related: { label: string; href: string }[];
  chapters: string[];
};

export const evidenceClaims: EvidenceClaim[] = [
  {
    slug: "canada-mere-matter-of-marching",
    number: "01",
    title: "Canada was a “mere matter of marching”",
    familiarVersion: "American leaders assumed Canada would fall almost without a fight, and the phrase “a mere matter of marching” summarized the invasion plan.",
    verdict: "The phrase is authentic, but its usual job in the story is too large. Thomas Jefferson used it in a private letter on August 4, 1812, after war had begun. It documents his confidence, not a formal plan or a unanimous national belief. Failed campaigns at Detroit and Queenston Heights expose the distance between optimism and operational capacity.",
    state: "qualified",
    confidence: 96,
    confidenceNote: "High confidence in the wording, date, and context; lower confidence in claims about how widely the exact assumption was shared.",
    earliest: {
      date: "4 August 1812",
      label: "Thomas Jefferson to William Duane",
      note: "Jefferson called the acquisition of Canada “a mere matter of marching.” The surviving letter is the earliest identifiable appearance used by this case file.",
      href: "https://founders.archives.gov/documents/Jefferson/03-05-02-0231",
    },
    accepted: [
      "Jefferson wrote the phrase in a private letter after the declaration of war.",
      "The United States launched repeated invasions of Upper and Lower Canada.",
      "Some advocates expected local disaffection and American numerical advantages to make conquest easier than it proved.",
    ],
    possible: [
      "Jefferson’s confidence reflected assumptions shared by a meaningful portion of the war’s political supporters.",
      "Expectations of a short campaign weakened attention to logistics, command, militia law, and local resistance.",
    ],
    unsupported: [
      "The phrase was an official slogan, cabinet decision, or military order.",
      "Every American policymaker expected an effortless conquest.",
      "Canada was close to falling in 1812 and failed only because of one mistake or one commander.",
    ],
    contradictions: [
      "The letter postdates the declaration of war, so it cannot by itself explain why Congress voted for war.",
      "The phrase predicts ease; the 1812 campaigns instead reveal fractured command, supply failures, militia limits, and organized resistance.",
      "Later quotation often turns one former president’s private confidence into a collective national position.",
    ],
    evidence: [
      { date: "18 June 1812", label: "War declared", kind: "contemporary", note: "The United States declared war before Jefferson wrote the famous sentence.", href: "/events/war-declared" },
      { date: "4 August 1812", label: "Jefferson–Duane letter", kind: "contemporary", note: "The exact phrase appears in private correspondence, paired with a prediction that Quebec could be attacked in the next campaign.", href: "https://founders.archives.gov/documents/Jefferson/03-05-02-0231" },
      { date: "16 August 1812", label: "Detroit surrendered", kind: "contemporary", note: "Hull surrendered Detroit and his army, a sharp contradiction to the imagined ease of conquest.", href: "/events/detroit-surrender" },
      { date: "13 October 1812", label: "Queenston Heights", kind: "contemporary", note: "A second major invasion failed amid command, transport, and militia problems.", href: "/events/queenston-heights" },
      { date: "Later retelling", label: "A sentence becomes a consensus", kind: "later", note: "Histories repeatedly use the compact line as shorthand for a broad American underestimation of Canada." },
    ],
    memoryPath: [
      { date: "1812", title: "A private prediction", note: "One politically important observer makes a confident claim in correspondence." },
      { date: "1812–1814", title: "Campaigns answer it", note: "Defeat and stalemate make the sentence look dramatically naïve in retrospect." },
      { date: "Later histories", title: "Quotation becomes explanation", note: "The memorable line is detached from its date and speaker and made to stand for national strategy." },
      { date: "Now", title: "Useful, with a label", note: "The phrase works best as evidence of Jefferson’s confidence and a prompt to test wider assumptions, not as proof of unanimity." },
    ],
    sourceRefs: ["founders-jefferson-duane", "cwm", "lac"],
    related: [
      { label: "Read the Canada chapter", href: "/story/easy-conquest-that-wasnt" },
      { label: "Open Detroit", href: "/events/detroit-surrender" },
      { label: "Open Queenston Heights", href: "/events/queenston-heights" },
    ],
    chapters: ["why-war", "easy-conquest-that-wasnt", "war-for-the-interior"],
  },
  {
    slug: "dolley-madison-portrait",
    number: "02",
    title: "Dolley Madison saved Washington’s portrait",
    familiarVersion: "As British troops approached, Dolley Madison personally cut Gilbert Stuart’s portrait of George Washington from its frame and carried it to safety.",
    verdict: "Dolley Madison deserves credit for ordering that the portrait be saved and refusing to leave it behind. The physical removal and transport were collective work. Contemporary and later accounts identify White House steward Jean Pierre Sioussat, enslaved servant Paul Jennings, gardener Thomas McGrath, and New Yorkers Jacob Barker and Robert G. L. De Peyster in overlapping roles. The scissors-and-heroic-carry image is later embroidery.",
    state: "qualified",
    confidence: 94,
    confidenceNote: "High confidence in Dolley’s instruction and in a multi-person rescue; the participants’ exact sequence remains contested across accounts.",
    earliest: {
      date: "23–24 August 1814",
      label: "Dolley Madison’s letter and recollection",
      note: "Her near-contemporary account records her determination to secure the portrait before leaving. It establishes the order and urgency, not a solo physical rescue.",
      href: "https://www.whitehousehistory.org/questions/how-did-dolley-madison-save-george-washingtons-portrait",
    },
    accepted: [
      "Dolley Madison insisted that the Washington portrait be secured before she left the President’s House.",
      "The full-length Gilbert Stuart portrait was removed before British troops burned the building.",
      "Several workers and helpers performed the physical removal and transport.",
    ],
    possible: [
      "Different named participants may have handled distinct stages: freeing the canvas, carrying it away, and arranging its safe storage.",
      "Later accounts preserve genuine fragments even where their details conflict.",
    ],
    unsupported: [
      "Dolley personally cut the canvas from the frame with scissors.",
      "She single-handedly carried the portrait through the burning city.",
      "Only one person can properly receive credit for the rescue.",
    ],
    contradictions: [
      "Dolley’s agency in giving the order is sometimes treated as proof that she did the manual work herself.",
      "Paul Jennings later rejected the version in which she personally removed the portrait, while still placing her at the center of the decision.",
      "Accounts differ about who broke the frame, who carried the canvas, and who took it onward, evidence of a chain of custody, not necessarily a single winner.",
    ],
    evidence: [
      { date: "23–24 August 1814", label: "Dolley’s account", kind: "contemporary", note: "Her letter places the portrait among the objects she was determined to secure before evacuation.", href: "https://www.whitehousehistory.org/questions/how-did-dolley-madison-save-george-washingtons-portrait" },
      { date: "1814", label: "The object survives", kind: "material", note: "The Stuart portrait escaped the burning and remains a physical endpoint for the rescue story." },
      { date: "1865", label: "Paul Jennings publishes his memoir", kind: "later", note: "Jennings supplies a corrective eyewitness tradition: servants and other men took down the portrait after Dolley ordered its rescue.", href: "https://www.whitehousehistory.org/paul-jennings" },
      { date: "Later 19th century", label: "Names and roles multiply", kind: "later", note: "Accounts by or about Sioussat, McGrath, Barker, and De Peyster complicate a single-hero version." },
      { date: "Popular memory", label: "The scissors appear", kind: "absence", note: "The vivid image of Dolley cutting the portrait is not supported by the strongest surviving accounts." },
    ],
    memoryPath: [
      { date: "1814", title: "An order under pressure", note: "Dolley’s decision and the workers’ rapid action save a national symbol." },
      { date: "Early reporting", title: "A public heroine", note: "Newspaper circulation centers the First Lady and compresses collective labor into a personal act." },
      { date: "19th–20th centuries", title: "A teachable scene", note: "Schoolbooks, art, and commemoration add scissors, a solo rescue, and a dramatic escape." },
      { date: "Now", title: "Agency plus labor", note: "The strongest account preserves Dolley’s consequential order while restoring the people who physically moved the object." },
    ],
    sourceRefs: ["whha-portrait", "whha-jennings", "loc-guide"],
    related: [
      { label: "Read Washington Burns", href: "/story/washington-burns" },
      { label: "Open the burning event", href: "/events/burning-washington" },
      { label: "Meet Paul Jennings", href: "https://www.whitehousehistory.org/paul-jennings" },
    ],
    chapters: ["washington-burns"],
  },
  {
    slug: "new-orleans-won-the-war",
    number: "03",
    title: "New Orleans won the war",
    familiarVersion: "Andrew Jackson’s victory at New Orleans defeated Britain, forced peace, and won the War of 1812.",
    verdict: "The victory was real, overwhelming, and politically transformative. It did not force the Treaty of Ghent: negotiators had signed that agreement in Europe on December 24, 1814, two weeks before the main battle. But the treaty had not yet been ratified and news had not reached Louisiana. New Orleans shaped how Americans experienced the war’s ending and remembered its result, even though it did not write the peace terms.",
    state: "qualified",
    confidence: 99,
    confidenceNote: "The treaty, battle, and ratification dates are fixed. Interpretation is needed only when measuring the victory’s political and cultural consequences.",
    earliest: {
      date: "24 December 1814",
      label: "Treaty of Ghent signed",
      note: "The peace terms were agreed in Europe before the main Battle of New Orleans. The chronology is the decisive test of the causal claim.",
      href: "/events/treaty-ghent",
    },
    accepted: [
      "Jackson’s coalition won a lopsided defensive victory on January 8, 1815.",
      "Neither army at New Orleans knew that diplomats had signed a treaty in Ghent.",
      "The victory lifted American morale, elevated Jackson, and strongly shaped popular memory of the war.",
    ],
    possible: [
      "A British success might have complicated implementation or encouraged demands not contained in the signed text.",
      "The victory helped make an ambiguous peace feel like a national triumph to many Americans.",
    ],
    unsupported: [
      "The battle forced Britain to sign the Treaty of Ghent.",
      "Jackson’s victory inserted favorable terms into the treaty.",
      "The battle alone settled the war’s strategic result everywhere.",
    ],
    contradictions: [
      "The treaty was signed on December 24; the main battle occurred on January 8.",
      "Peace was not yet legally complete: the United States ratified the treaty in February, which explains why fighting continued without making the battle the cause of the signed agreement.",
      "The memorable final victory obscures both earlier defeats and the coalition, including free Black battalions, Choctaw fighters, militia, regulars, sailors, and Baratarians, that defended the city.",
    ],
    evidence: [
      { date: "24 December 1814", label: "Treaty signed at Ghent", kind: "contemporary", note: "Negotiators agreed to restore conquered territory and end the war without settling the maritime issues that had helped produce it.", href: "/events/treaty-ghent" },
      { date: "8 January 1815", label: "Main Battle of New Orleans", kind: "contemporary", note: "British troops attacked Jackson’s prepared line and suffered severe losses.", href: "/events/new-orleans" },
      { date: "16 February 1815", label: "U.S. Senate consents", kind: "contemporary", note: "American ratification came after news of both treaty and battle arrived.", href: "/events/us-ratification" },
      { date: "Postwar politics", label: "Jackson becomes a national figure", kind: "later", note: "The victory’s political afterlife was immense even though its diplomatic role was not." },
      { date: "Popular retelling", label: "Last battle becomes final cause", kind: "later", note: "Narrative order, great victory followed by celebrated peace, encouraged a causal connection the calendar does not support." },
    ],
    memoryPath: [
      { date: "December 1814", title: "Peace on paper", note: "Diplomats sign an agreement, but slow Atlantic communication leaves armies in the field." },
      { date: "January 1815", title: "Victory before the news", note: "The scale of the battlefield result produces a powerful ending Americans can see and celebrate." },
      { date: "1815 onward", title: "A national finale", note: "Commemoration links victory and peace, turning sequence into causation and Jackson into the war’s defining hero." },
      { date: "Now", title: "Two true endings", note: "Ghent ended the war diplomatically; New Orleans transformed its emotional and political meaning." },
    ],
    sourceRefs: ["loc-ghent", "nps-new-orleans-black", "nps-choctaw", "nps-jean-lafitte"],
    related: [
      { label: "Read New Orleans", href: "/story/new-orleans" },
      { label: "Read Peace at Ghent", href: "/story/peace-at-ghent" },
      { label: "Compare the dates", href: "/timeline" },
    ],
    chapters: ["peace-at-ghent", "new-orleans", "what-changed"],
  },
  {
    slug: "rockets-illuminated-the-flag",
    number: "04",
    title: "Rockets illuminated the flag all night",
    familiarVersion: "The rockets’ red glare continuously lit the enormous Star-Spangled Banner above Fort McHenry, letting Francis Scott Key watch it fly throughout the bombardment.",
    verdict: "British forces did fire Congreve rockets and exploding bombs, and Key’s lyric is contemporary testimony to their visible flashes. The rest needs restraint. Rain, darkness, smoke, and distance limited visibility; the lyric says the bursts gave intermittent proof, not continuous illumination. Fort McHenry also had a smaller storm flag. The famous large garrison flag is securely tied to the morning scene, but claims about which flag flew through every hour of the night exceed the surviving evidence.",
    state: "qualified",
    confidence: 91,
    confidenceNote: "High confidence that rockets were used and visible; moderate confidence in reconstructing nighttime flag visibility and which flag flew at each moment.",
    earliest: {
      date: "14 September 1814",
      label: "Francis Scott Key’s lyric",
      note: "The poem’s “rockets’ red glare” and “bombs bursting in air” are near-immediate evidence of flashes during the bombardment, and of uncertainty relieved only in moments.",
      href: "/explore/documents/defence-fort-mhenry",
    },
    accepted: [
      "British vessels fired Congreve rockets and explosive shells during the bombardment.",
      "Key saw flashes from the attack and used them in his near-contemporary lyric.",
      "A large American flag was visible over Fort McHenry in the morning after the bombardment.",
    ],
    possible: [
      "Explosions intermittently revealed a flag or the fort’s position during portions of the night.",
      "The smaller storm flag flew during at least part of the rain and was later replaced by the garrison flag.",
    ],
    unsupported: [
      "The rockets provided steady light through the entire night.",
      "Key could continuously see the great garrison flag from his vessel.",
      "The surviving flag’s exact hour-by-hour use can be reconstructed with certainty.",
    ],
    contradictions: [
      "The lyric’s question, whether the banner still waves, expresses impaired visibility, not an uninterrupted view.",
      "The great flag’s scale makes it central to memory, but the fort possessed a smaller storm flag suited to bad weather.",
      "Later images often show a clear, cinematic sky; accounts of the night describe rain, smoke, distance, and darkness.",
    ],
    evidence: [
      { date: "13–14 September 1814", label: "Congreve rockets and bomb shells", kind: "material", note: "Weapon type, British bombardment vessels, and defensive records establish that rockets and shells were part of the attack.", href: "/explore/objects/congreve-rocket" },
      { date: "14 September 1814", label: "Defence of Fort M’Henry", kind: "contemporary", note: "Key’s lyric describes intermittent visual evidence during the night and the flag visible at dawn.", href: "/explore/documents/defence-fort-mhenry" },
      { date: "1813–1814", label: "Two flags", kind: "material", note: "The fort’s large garrison flag and smaller storm flag complicate claims about exactly what flew during rain and bombardment.", href: "/explore/objects/fort-mchenry-storm-flag" },
      { date: "About 1819", label: "John Bower print", kind: "later", note: "An early visual commemoration dramatizes the night attack but is not a real-time optical record.", href: "https://www.loc.gov/pictures/item/2013645001/" },
      { date: "Later iconography", label: "A clear view replaces uncertainty", kind: "later", note: "Paintings and civic imagery often make flag, rockets, fleet, and fort simultaneously legible." },
    ],
    memoryPath: [
      { date: "1814", title: "A lyric of uncertain sight", note: "Flashes offer momentary evidence; dawn resolves the question." },
      { date: "19th century", title: "The scene becomes visible", note: "Prints and performances turn darkness and distance into a readable patriotic tableau." },
      { date: "20th century", title: "The surviving object dominates", note: "The great garrison flag becomes inseparable from every moment of the story." },
      { date: "Now", title: "Intermittence matters", note: "The evidence is stronger, and the lyric more powerful, when uncertainty remains in the night." },
    ],
    sourceRefs: ["nps-bombardment", "smithsonian-flag", "nps-garrison-flag", "loc-fort-print"],
    related: [
      { label: "Read Baltimore Holds", href: "/story/baltimore-holds" },
      { label: "Inspect the Congreve rocket", href: "/explore/objects/congreve-rocket" },
      { label: "Compare the two flags", href: "/explore/objects/fort-mchenry-storm-flag" },
    ],
    chapters: ["baltimore-holds"],
  },
  {
    slug: "filipino-contingent-new-orleans",
    number: "05",
    title: "An organized Filipino contingent fought at New Orleans",
    familiarVersion: "Hundreds of Filipino sailors from the St. Malo settlement fought as a distinct unit under Andrew Jackson at the Battle of New Orleans.",
    verdict: "Filipino and Asian maritime presence in Louisiana has a real history, and individual participation at New Orleans remains possible. The stronger claim, a separately organized Filipino or “Manilamen” contingent often supplied with a precise large number, has not been established by the available military rolls or contemporary battle accounts. Community tradition is evidence of memory and identity; it is not automatically a roster.",
    state: "unsupported",
    confidence: 89,
    confidenceNote: "High confidence that the organized-contingent claim lacks current documentary support; individual service remains an open research question.",
    earliest: {
      date: "Later retellings",
      label: "St. Malo tradition enters print",
      note: "The claim appears in accounts written long after the battle and grows more specific through repetition. No contemporary muster roll naming a distinct Filipino unit has been identified in the evidence reviewed here.",
      href: "https://www.louisianafolklife.org/LT/Articles_Essays/lfmStMalo.html",
    },
    accepted: [
      "People from the Philippines and other parts of Asia participated in the Gulf’s long maritime history.",
      "St. Malo became an important place in Filipino Louisiana history and community memory.",
      "Jackson’s New Orleans force was genuinely diverse and included free Black battalions, Choctaw fighters, Baratarians, militia, regulars, and sailors.",
    ],
    possible: [
      "Individual Filipino or Asian mariners may have served within units whose records used other racial, national, occupational, or legal labels.",
      "Genealogical, payroll, notarial, church, or shipping records may eventually identify individuals who cannot yet be securely linked to the battle.",
    ],
    unsupported: [
      "A separately organized Filipino unit fought at Chalmette.",
      "Frequently repeated totals such as several hundred fighters are established by contemporary records.",
      "The St. Malo settlement can be projected backward as a stable, fully documented military community in 1815.",
    ],
    contradictions: [
      "Detailed contemporary descriptions of Jackson’s coalition identify several units but do not name a Filipino contingent.",
      "Later retellings often supply exact numbers without showing a muster roll, payroll, or named roster.",
      "Historical labels can conceal people, so documentary silence does not prove no Filipino individual participated; it does limit a confident collective claim.",
    ],
    evidence: [
      { date: "1814–1815", label: "Military organization and battle accounts", kind: "absence", note: "The available unit records and contemporary descriptions reviewed by historians do not identify a separate Filipino contingent." },
      { date: "1815", label: "A diverse defense", kind: "contemporary", note: "Sources securely document free men of color, Choctaw fighters, Baratarians, state militia, regulars, and naval personnel.", href: "/story/new-orleans" },
      { date: "19th century onward", label: "St. Malo histories", kind: "later", note: "Writing about the settlement mixes documentation, oral tradition, local pride, and later elaboration.", href: "https://www.louisianafolklife.org/LT/Articles_Essays/lfmStMalo.html" },
      { date: "Modern repetition", label: "A precise contingent", kind: "later", note: "Popular summaries repeat unit language and large totals more confidently than the cited evidence warrants." },
      { date: "Open research", label: "Individuals may remain hidden", kind: "absence", note: "Names can be obscured by spelling, racial classification, occupational labels, and fragmentary records; absence of a unit is not absence of every person." },
    ],
    memoryPath: [
      { date: "1815", title: "A coalition leaves uneven records", note: "Some units and named participants are well documented; other lives remain difficult to trace." },
      { date: "Later community history", title: "Belonging claims a battlefield", note: "The battle becomes a way to place Filipino Louisiana within the nation’s founding memory." },
      { date: "Popular circulation", title: "Possibility hardens into a number", note: "Repetition converts a plausible individual presence into an organized contingent with exact strength." },
      { date: "Now", title: "Keep two truths apart", note: "Honor the documented community history while labeling the battlefield-unit claim unsupported pending new records." },
    ],
    sourceRefs: ["lafolklife", "nps-new-orleans-black", "nps-choctaw", "nps-jean-lafitte"],
    related: [
      { label: "Read New Orleans", href: "/story/new-orleans" },
      { label: "Read the St. Malo study", href: "https://www.louisianafolklife.org/LT/Articles_Essays/lfmStMalo.html" },
      { label: "Explore the evidence guide", href: "/sources" },
    ],
    chapters: ["new-orleans", "what-changed"],
  },
];

export const evidenceClaimBySlug = Object.fromEntries(evidenceClaims.map((claim) => [claim.slug, claim]));

export function claimsForChapter(chapter: string) {
  return evidenceClaims.filter((claim) => claim.chapters.includes(chapter));
}

export const claimStateLabel: Record<ClaimState, string> = {
  documented: "Documented",
  qualified: "True, with limits",
  unsupported: "Unsupported as stated",
};
