export type HumanRecord = {
  slug: string;
  name: string;
  group: string;
  role: string;
  sourceRefs: string[];
  aliases: string[];
  scopeNote: string;
  relationships: { target: string; label: string }[];
  detail: "index";
};

type GroupSeed = Pick<HumanRecord, "group" | "role" | "sourceRefs"> & { names: string };
const slugify = (name: string) => name.toLowerCase().normalize("NFKD").replace(/[’'“”".]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const seeds: GroupSeed[] = [
  {
    group:"Political and diplomatic records", role:"Name listed for political or diplomatic research", sourceRefs:["house-declaration","loc-ghent","loc-manuscripts"],
    names:`James Madison|Dolley Madison|James Monroe|Elizabeth Kortright Monroe|Albert Gallatin|John Quincy Adams|Henry Clay|Jonathan Russell|James A. Bayard|William H. Crawford|Robert Smith|William Eustis|John Armstrong Jr.|George W. Campbell|Alexander J. Dallas|Richard Rush|John C. Calhoun|Langdon Cheves|Felix Grundy|George M. Troup|Josiah Quincy III|John Randolph of Roanoke|Timothy Pickering|Harrison Gray Otis|Daniel Webster|Rufus King|DeWitt Clinton|Elbridge Gerry|William Pinkney|Augustus John Foster|David Erskine|Anthony St. John Baker|Charles Bagot|Robert Stewart, Viscount Castlereagh|Robert Jenkinson, Lord Liverpool|Henry Bathurst|Henry Goulburn|James Gambier|William Adams|John Mason|William Jones|Benjamin Crowninshield|John Graham|Christopher Gore|William Lowndes|Nathaniel Macon|Nathaniel Pope|John Smilie|Roger Nelson|Samuel Taggart|Harmanus Bleecker|James Lloyd|Abijah Bigelow|Laban Wheaton|James Barbour|Charles Tait|William Branch Giles|Obadiah German|Michael Leib|William Reed|Nicholas Gilman|John Gaillard|William Wyatt Bibb|Outerbridge Horsey|Joseph Anderson`
  },
  {
    group:"United States Army and militia", role:"Name listed for military-service research", sourceRefs:["nara-war","nps-war","loc-guide"],
    names:`William Hull|Henry Dearborn|Wade Hampton I|James Wilkinson|William Henry Harrison|Winfield Scott|Jacob Brown|Edmund P. Gaines|Eleazer Wheelock Ripley|James Miller|George Croghan|Alexander Macomb|George Izard|Duncan McArthur|Lewis Cass|Alexander Smyth|Stephen Van Rensselaer|Solomon Van Rensselaer|William Wadsworth|Zebulon Pike|Thomas Jesup|Nathan Towson|Jacob Hindman|George Armistead|John Stricker|Samuel Smith|Joshua Barney|William H. Winder|Tobias Stansbury|Joseph Sterett|Levin Winder|John Coffee|William Carroll|John Adair|Thomas Hinds|Samuel Hopkins|Joseph Graham|John Williams|Richard Mentor Johnson|Isaac Shelby|Green Clay|Leonard Covington|James Winchester|John Parker Boyd|Moses Porter|George McClure|Peter Buell Porter|Hugh Brady|Enos Stone|Joseph Willcocks|Joseph G. Swift|Joseph Bloomfield|Morgan Lewis|Daniel Bissell|Alexander Cummings|Thomas Flournoy|John Chandler|Robert Swartwout|Joseph Anderson|James Simons|Charles Boerstler|Joseph Eldridge|John Chrystie|John Fenwick|Abraham Eustis|Daniel Appling|Thomas Sidney Jesup|Thomas Benton|Benjamin Forsyth|Daniel Davis|Nathaniel Rochester|George McFeely|James House|John Bankhead|George Mitchell|David B. Mitchell|John Floyd|Samuel Blackburn|William McIntosh|Andrew Jackson|John Thomas|John Pegram|John Gibson|William Butler|Samuel Dale|Ferdinand Claiborne|Thomas Flournoy|John Cocke|John Alexander|William Russell|Robert Butler|Daniel Carmick|William McRea|Henry D. Peire|George T. Ross|Jacques Villeré|Pierre de La Ronde|Jean Baptiste Plauché|Pierre Lacoste|Louis D’Aquin|Thomas Beale`
  },
  {
    group:"Naval, privateering, and maritime labor", role:"Name listed for maritime research", sourceRefs:["nhhc","nps-privateers","nara-impressment"],
    names:`John Rodgers|William Bainbridge|Isaac Hull|Stephen Decatur|Charles Stewart|Jacob Jones|David Porter|Isaac Chauncey|Jesse Duncan Elliott|William Burrows|William Henry Allen|James Biddle|Lewis Warrington|Johnston Blakeley|John Downes|Thomas Macdonough|Oliver Hazard Perry|James Lawrence|Charles Morris|Arthur Sinclair|Melancthon Taylor Woolsey|Thomas ap Catesby Jones|Daniel Todd Patterson|George Campbell Read|Joseph Tarbell|John Percival|Joseph Bainbridge|David Conner|Alexander Scammel Wadsworth|Edward Trenchard|Robert Henley|Daniel Turner|Jesse Wilkinson|Samuel Angus|Thomas Brown|George Parker|John Orde Creighton|John Renshaw|William Crane|John Shaw|John Cassin|Jesse D. Elliott|Thomas Holdup Stevens|John Pettigrew|Thomas Boyle|William Josephus Stafford|John Ordronaux|Pearl Durkee|William Wade|George R. Roberts|Richard Moon|Thomas Kemp|George Stiles|Jeremiah Mitchell|Luke Tiernan|Vincent Nolte|Jean Lafitte|Pierre Lafitte|Renato Beluche|Dominique You|Andrew Holmes|John Murphy|Benjamin Crowninshield|Samuel Hambleton|George Mitchell|Daniel Dobbins|Noah Brown|Henry Eckford|Adam Brown|Charles Browne|Abraham Bloodgood|Christian Bergh|John Floyd|Josiah Fox|William Doughty|Samuel Humphreys|William Rush|Francis Grice|Thomas Tennant|William Flanagan|John Clough|Joseph Snow|William Lord|Charles Ridgely|John S. Skinner|George Stiles Jr.|Peter Chazotte|William Westcott|Thomas Sangster|John H. Sherburne`
  },
  {
    group:"British, Canadian, and imperial service", role:"Name listed for British or Canadian service research", sourceRefs:["lac-british-records","uk-discovery","cwm"],
    names:`George Prévost|Isaac Brock|Roger Hale Sheaffe|Gordon Drummond|Henry Procter|Phineas Riall|Robert Ross|Edward Pakenham|John Keane|John Lambert|Alexander Cochrane|George Cockburn|John Borlase Warren|James Lucas Yeo|Robert Heriot Barclay|George Downie|Philip Broke|James Richard Dacres|John Carden|James Hillyar|William Thornton|Thomas Mullins|Charles Napier|Frederick Heriot|Charles de Salaberry|John Vincent|John Harvey|James FitzGibbon|Thomas Pearson|John Murray|Richard Bullock|Thomas Evans|Thomas Carleton|John Sherbrooke|John Coape Sherbrooke|Manley Power|Edward Baynes|Noah Freer|William Claus|Matthew Elliott|Robert Nichol|Thomas Ridout|William Merritt|John Strachan|John Beverley Robinson|Thomas Talbot|William Robinson|George Macdonell|Charles Michel de Salaberry|John By|Daniel McDouall|Robert McDouall|George Glasgow|Thomas Scott|William Drummond|John Le Couteur|Charles Plenderleath|William Worsley|George McGregor|William Caldwell|William Hamilton Merritt|George Theodore Barlow|Thomas Bligh|Joseph Wanton Morrison|Charles Brisbane|Thomas Masterman Hardy|Edward Owen|Thomas Ussher|Henry Hope|Edward Codrington|Thomas Fremantle|Pulteney Malcolm|George Burdett|William Fahie|Edward Troubridge|Robert Barrie|Thomas Cochrane|Peter Parker|George Lewis|George Urmston|James Scott|Henry Noble Shipton|William Brooke|Arthur Brooke|Harry Smith|James Macdonell|Richard Pierpoint|Runchey|Robert Grant|John Norton`
  },
  {
    group:"Indigenous nations and coalitions", role:"Name listed for Indigenous history research", sourceRefs:["nps-indigenous","lac","cwm"],
    names:`Tecumseh|Tenskwatawa|Roundhead|Walk-in-the-Water|Main Poc|Black Hawk|Shabbona|Waubonsie|Winamac|Metea|Black Partridge|Red Jacket|Farmer’s Brother|Young King|Captain Pollard|John Norton|John Brant|Black Snake|Captain Cold|Little Billy|Menawa|William Weatherford|Peter McQueen|Josiah Francis|Paddy Walsh|William McIntosh|Major Ridge|Pathkiller|John Ross|Pushmataha|Mushulatubbee|Hopothle Mico|Little Prince|Big Warrior|Junaluska|John Lowrey|Tustunnuggee Thlucco|Hillabee Chief|Peter Cornells|High Head Jim|Monahoe|Opothleyahola|William Perryman|Chief Chinnabee|Captain Isaacs|Captain Steele|Captain Monture|John Smoke Johnson|John Brant Dekarihokenh|Teyoninhokarawen|Captain Norton|Tehowagherengaraghkwin|John Deserontyon|Black Bird|Mad Sturgeon|White Loon|Split Log|Captain Johnny|Little Otter|Nan-non-see|Wabasha II|Little Crow|Tahkanne|Wapasha|The Crane|The Owl|Checote|Tuskegee Tustunnuggee|Jim Fife`
  },
  {
    group:"Women, households, print, and civilian witness", role:"Name listed for civilian and household research", sourceRefs:["nps-women-chesapeake","loc-newspapers","nps-living"],
    names:`Mary Pickersgill|Grace Wisher|Rebecca Young|Caroline Pickersgill|Margaret Young|Eliza Young|Mary Young|Louisa Armistead|Margaret Bayard Smith|Ann Matilda Hanson|Rachel Jackson|Laura Secord|Betsy Doyle|Jane Barnes|Mary Henry|Rosalie Stier Calvert|Kitty Knight|Anna Tuthill Symmes Harrison|Margaret Mackall Smith Taylor|Rebecca Wilkinson|Elizabeth Patterson Bonaparte|Sarah Ridout|Mary Beanes|Anna Maria Brodeau Thornton|Henrietta Liston|Lydia Huntley Sigourney|Sarah Josepha Hale|Mary Ann Bent|Mary Tayloe Lloyd Key|Elizabeth Phoebe Key|Mary Ann Armistead|Georgiana Armistead|Judith Armistead|Anna Maria Fitzhugh|Elizabeth Monroe Hay|Eliza Kortright Monroe Hay|Catherine Armistead|Sally McKean|Susan Decatur|Maria Mayo Scott|Margaret Smith Brown|Elizabeth Brown|Sarah Brown|Jane Irwin Harrison|Mary Ann Custis Lee|Eleanor Parke Custis Lewis|Sukey Young|Harriet Douglas|Mary Douglass|Margaret Stuart|Susan Wheeler Decatur|Sophia Dallas Bache|Anne Willing Bingham|Margaret Carr`
  },
  {
    group:"Black service, freedom seeking, and the Gulf coalition", role:"Name listed for Black history research", sourceRefs:["nps-new-orleans-black","nps-colonial","nps-freedom-1"],
    names:`Richard Pierpoint|George R. Roberts|Jordan Noble|Jean Baptiste Savary|Joseph Savary|Louis D’Aquin|Pierre Lacoste|Dominique You|Charles Ball|Prince Witten|George Lewis|William Williams|Caesar|Harry Jones|Jack Punch|Isaac Hammond|William Hammond|Jacob Cuffee|London Feribee|Daniel Coker|William Costin|Michael Shiner|Paul Jennings`
  },
  {
    group:"Baltimore and Maryland records", role:"Name listed for Maryland research", sourceRefs:["bca","msa-baltimore-records","nps-riots","nps-baltimore"],
    names:`Alexander Contee Hanson|James M. Lingan|Henry Lee|John Thomson|Otho Sprigg|Edward Johnson|Jacob Wagner|William Gwynn|Hezekiah Niles|John S. Skinner|Francis Scott Key|William Beanes|Samuel Smith|John Stricker|George Armistead|Joshua Barney|Joseph Sterett|Aquilla Randall|Daniel Wells Jr.|Henry McComas|John Montgomery|James Biays|Thomas Kemp|Thomas Boyle|George Stiles|Luke Tiernan|William Patterson|Robert Gilmor Jr.|John Donnell|William Lorman|Henry Payson|Isaac McKim|William Greetham|John Hollins|Joseph Townsend|William Wilson|Charles Ridgely|John Eager Howard|Nicholas Brice|James Mosher|Benjamin Edes|Joseph Robinson|Philip Reed|Peter Parker|John B. Morris|John Merryman|John Merryman Jr.|George Decker|Benjamin Howard|Charles Sterett Ridgely|William H. Marriott|Joseph Hopper Nicholson|William Pinkney|Robert Goodloe Harper|Joseph H. Nicholson|Roger Brooke Taney|John Purviance|George Douglas|Thomas Tenant|John Berry|William McDonald|Richard Frisby|Samuel Etting|Bernard Eder|John H. Barney|William Frick|Elias Glenn|John Kilby|William Stewart|Thomas Sheppard|Joseph White|James Calhoun|Jeremiah Sullivan|John Hughes|William Cooke|Samuel Hollingsworth|Henry Didier|Charles Carroll of Carrollton|Charles Carroll of Homewood|Robert Oliver|David Winchester|William Winchester`
  },
];

export const curatedRelationships: Record<string, { target: string; label: string }[]> = {
  "james-madison":[{target:"dolley-madison",label:"spouses and political household"},{target:"james-monroe",label:"president and secretary of state"},{target:"albert-gallatin",label:"administration and peace diplomacy"}],
  "mary-pickersgill":[{target:"grace-wisher",label:"indentured household labor"},{target:"rebecca-young",label:"mother, teacher, and flag-making trade"},{target:"caroline-pickersgill",label:"daughter and household work"}],
  "grace-wisher":[{target:"mary-pickersgill",label:"indentured household labor"},{target:"rebecca-young",label:"flag-making household network"},{target:"caroline-pickersgill",label:"shared household work"}],
  "alexander-contee-hanson":[{target:"ann-matilda-hanson",label:"spouses"},{target:"james-m-lingan",label:"defenders of the Federal Republican"},{target:"henry-lee",label:"defenders of the Federal Republican"},{target:"jacob-wagner",label:"newspaper business network"}],
  "andrew-jackson":[{target:"rachel-jackson",label:"spouses and political household"},{target:"john-coffee",label:"campaign command"},{target:"menawa",label:"opposing leaders at Horseshoe Bend"},{target:"william-mcintosh",label:"contingent wartime alliance"}],
  "tecumseh":[{target:"tenskwatawa",label:"brothers and coalition leadership"},{target:"isaac-brock",label:"strategic wartime alliance"},{target:"roundhead",label:"Indigenous coalition leadership"}],
  "tenskwatawa":[{target:"tecumseh",label:"brothers and coalition leadership"}],
  "francis-scott-key":[{target:"william-beanes",label:"truce mission and release"},{target:"george-armistead",label:"bombardment and flag memory"}],
  "samuel-smith":[{target:"john-stricker",label:"Baltimore defense command"},{target:"george-armistead",label:"city and harbor defense"},{target:"joshua-barney",label:"Chesapeake defense network"}],
  "oliver-hazard-perry":[{target:"william-henry-harrison",label:"lake victory and land campaign"},{target:"daniel-dobbins",label:"Lake Erie shipbuilding"}],
  "robert-ross":[{target:"alexander-cochrane",label:"Chesapeake expedition command"},{target:"john-stricker",label:"opposing commanders at North Point"}],
  "alexander-cochrane":[{target:"robert-ross",label:"Chesapeake expedition command"},{target:"george-cockburn",label:"Royal Navy operational command"}],
  "menawa":[{target:"andrew-jackson",label:"opposing leaders at Horseshoe Bend"},{target:"william-mcintosh",label:"divided Muscogee wartime politics"}],
  "jordan-noble":[{target:"andrew-jackson",label:"New Orleans defense coalition"}],
};

export const curatedPersonSlugs = new Set([
  "alexander-contee-hanson", "james-madison", "james-m-lingan", "henry-lee", "tecumseh", "tenskwatawa",
  "isaac-brock", "william-hull", "oliver-hazard-perry", "david-porter", "richard-pierpoint", "joshua-barney",
  "alexander-cochrane", "robert-ross", "john-stricker", "samuel-smith", "mary-pickersgill", "grace-wisher",
  "francis-scott-key", "thomas-macdonough", "andrew-jackson", "menawa", "prince-witten", "jordan-noble",
]);

type IdentityResolution = { slug: string; name: string; aliases: string[] };

const identityResolutions: Record<string, IdentityResolution> = {
  "captain-norton": { slug:"john-norton", name:"John Norton", aliases:["Captain Norton", "Teyoninhokarawen"] },
  "teyoninhokarawen": { slug:"john-norton", name:"John Norton", aliases:["Captain Norton", "Teyoninhokarawen"] },
  "john-brant-dekarihokenh": { slug:"john-brant", name:"John Brant", aliases:["John Brant Dekarihokenh", "Dekarihokenh"] },
  "jesse-d-elliott": { slug:"jesse-duncan-elliott", name:"Jesse Duncan Elliott", aliases:["Jesse D. Elliott"] },
  "thomas-jesup": { slug:"thomas-sidney-jesup", name:"Thomas Sidney Jesup", aliases:["Thomas Jesup"] },
  "charles-michel-de-salaberry": { slug:"charles-de-salaberry", name:"Charles de Salaberry", aliases:["Charles Michel de Salaberry"] },
  "john-sherbrooke": { slug:"john-coape-sherbrooke", name:"John Coape Sherbrooke", aliases:["John Sherbrooke"] },
  "william-merritt": { slug:"william-hamilton-merritt", name:"William Hamilton Merritt", aliases:["William Merritt"] },
  "susan-decatur": { slug:"susan-wheeler-decatur", name:"Susan Wheeler Decatur", aliases:["Susan Decatur"] },
  "joseph-h-nicholson": { slug:"joseph-hopper-nicholson", name:"Joseph Hopper Nicholson", aliases:["Joseph H. Nicholson"] },
  "elizabeth-monroe-hay": { slug:"eliza-kortright-monroe-hay", name:"Eliza Kortright Monroe Hay", aliases:["Elizabeth Monroe Hay", "Eliza Monroe Hay"] },
  "thomas-tennant": { slug:"thomas-tenant", name:"Thomas Tenant", aliases:["Thomas Tennant"] },
  "wabasha-ii": { slug:"wabasha", name:"Wabasha", aliases:["Wabasha II", "Wapasha"] },
  "wapasha": { slug:"wabasha", name:"Wabasha", aliases:["Wabasha II", "Wapasha"] },
  "runchey": { slug:"robert-runchey", name:"Robert Runchey", aliases:["Runchey"] },
};

const excludedRecords = new Set([
  "hillabee-chief",
  "georgiana-armistead",
  "anne-willing-bingham",
  "john-deserontyon",
  "checote",
]);

const preferredGroups: Record<string, string> = {
  "william-pinkney":"Political and diplomatic records",
  "benjamin-crowninshield":"Political and diplomatic records",
  "joseph-anderson":"Political and diplomatic records",
  "william-mcintosh":"Indigenous nations and coalitions",
  "pierre-lacoste":"United States Army and militia",
  "louis-daquin":"United States Army and militia",
  "thomas-boyle":"Naval, privateering, and maritime labor",
  "george-r-roberts":"Black service, freedom seeking, and the Gulf coalition",
  "thomas-kemp":"Naval, privateering, and maritime labor",
  "george-stiles":"Naval, privateering, and maritime labor",
  "luke-tiernan":"Naval, privateering, and maritime labor",
  "dominique-you":"Naval, privateering, and maritime labor",
  "charles-ridgely":"Baltimore and Maryland records",
  "john-s-skinner":"Baltimore and Maryland records",
  "joseph-sterett":"Baltimore and Maryland records",
  "peter-parker":"British, Canadian, and imperial service",
  "john-norton":"Indigenous nations and coalitions",
  "thomas-tenant":"Baltimore and Maryland records",
};

const unresolvedIdentitySlugs = new Set(["caesar", "the-owl", "george-mitchell", "john-floyd", "george-lewis"]);
const groupedCandidates = new Map<string, { name: string; group: string; role: string; sourceRefs: string[]; aliases: string[] }[]>();

for (const seed of seeds) {
  for (const seedName of seed.names.split("|")) {
    const seedSlug = slugify(seedName);
    if (excludedRecords.has(seedSlug)) continue;
    const resolution = identityResolutions[seedSlug];
    const slug = resolution?.slug ?? seedSlug;
    if (curatedPersonSlugs.has(slug)) continue;
    const candidate = {
      name: resolution?.name ?? seedName,
      group: seed.group,
      role: seed.role,
      sourceRefs: seed.sourceRefs,
      aliases: resolution?.aliases ?? [],
    };
    groupedCandidates.set(slug, [...(groupedCandidates.get(slug) ?? []), candidate]);
  }
}

export const humanIndexRecords: HumanRecord[] = [...groupedCandidates.entries()].map(([slug, candidates]) => {
  const preferredGroup = preferredGroups[slug];
  const selected = candidates.find((candidate) => candidate.group === preferredGroup) ?? candidates[0];
  const unresolved = unresolvedIdentitySlugs.has(slug);
  const aliases = [...new Set(candidates.flatMap((candidate) => [candidate.name, ...candidate.aliases]).filter((name) => name !== selected.name))];
  return {
    slug,
    name: selected.name,
    group: unresolved ? "Unresolved identities" : selected.group,
    role: unresolved ? "Name requiring source-level identity resolution" : selected.role,
    sourceRefs: [...new Set(candidates.flatMap((candidate) => candidate.sourceRefs))],
    aliases,
    scopeNote: unresolved
      ? "The available seed lists do not identify this name precisely enough to support a biographical claim. It remains a research lead pending source-level reconciliation."
      : "This is a research-index entry. Its group and source links describe where to continue research, not person-specific places, movements, allegiances, events, or relationships.",
    relationships: [],
    detail:"index" as const,
  };
}).sort((a, b) => a.name.localeCompare(b.name));

export const humanRecordBySlug = Object.fromEntries(humanIndexRecords.map((record) => [record.slug, record]));

export const humanGroups = [...new Set(humanIndexRecords.map((record) => record.group))];

export const personSlugAliases = Object.fromEntries(Object.entries(identityResolutions).map(([alias, resolution]) => [alias, resolution.slug]));
export const resolvePersonSlug = (slug: string) => personSlugAliases[slug] ?? slug;
