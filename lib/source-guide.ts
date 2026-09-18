export type SourceGroup = {
  id: string;
  title: string;
  description: string;
  sourceIds: string[];
};

export const sourceGroups: SourceGroup[] = [
  { id: "start", title: "Start Here", description: "The strongest broad entry points: a national research guide, public-history gateways, federal records, and a deliberately comparative Canadian exhibition.", sourceIds: ["loc-guide", "nps-war", "nara-war", "cwm", "lac"] },
  { id: "primary", title: "Primary Documents", description: "Treaty text, legislative records, and collection guides that lead toward documents created during the conflict.", sourceIds: ["house-declaration", "loc-ghent", "avalon-ghent", "nara-impressment"] },
  { id: "manuscripts", title: "Manuscripts", description: "Catalogues and finding aids for personal papers and institutional records. Descriptions are often searchable even when the underlying documents are not digitized.", sourceIds: ["loc-manuscripts", "loc-finding-aids", "nysl-war", "bca"] },
  { id: "newspapers", title: "Historic Newspapers", description: "Searchable newspaper evidence for politics, casualty reports, commercial disruption, rumor, commemoration, and local reaction. OCR should always be checked against the page image.", sourceIds: ["loc-newspapers", "nps-riots", "bca"] },
  { id: "maps", title: "Maps", description: "Cartographic collections for campaign geography and changing landscapes. Historical maps are arguments and artifacts, not neutral basemaps.", sourceIds: ["loc-maps", "loc-guide", "nhhc-flotilla"] },
  { id: "images", title: "Images & Prints", description: "Item-level catalogues for prints, drawings, and objects. Dates, creators, retrospective imagery, and rights language should be checked before reuse.", sourceIds: ["loc-pictures", "loc-fort-print", "smithsonian-flag"] },
  { id: "us-archives", title: "U.S. Archives", description: "Federal military, naval, maritime, and legislative records, supported by national collection guides.", sourceIds: ["nara-war", "nara-impressment", "loc-guide", "house-declaration"] },
  { id: "canadian-archives", title: "Canadian Archives", description: "National and provincial routes into British North American military, militia, civilian, and government records.", sourceIds: ["lac", "archives-ontario", "canada-military-history"] },
  { id: "british", title: "British / Imperial Sources", description: "British government catalogues and perspectives on a conflict embedded in a much larger imperial and European war.", sourceIds: ["uk-discovery", "cwm", "lac"] },
  { id: "indigenous", title: "Indigenous Sources", description: "Resources centered on Indigenous objectives, coalitions, land, diplomacy, and the unequal peace. Institutional interpretation is a starting point, not a substitute for nation and tribal sources.", sourceIds: ["nps-indigenous", "nps-creek", "nps-choctaw", "lac"] },
  { id: "black-history", title: "Black History / Slavery / Freedom Seeking", description: "Named lives, Black military service, British emancipation strategy, Spanish borderlands, and the choices made by enslaved and free people.", sourceIds: ["nps-freedom-1", "nps-colonial", "nps-tangier", "parks-pierpoint", "parks-black-militia", "nps-prince-witten", "nps-new-orleans-black"] },
  { id: "women-civilians", title: "Women / Civilian Life", description: "Household labor, occupation, political violence, displacement, and the civilians whose wartime experiences survive unevenly in the record.", sourceIds: ["nps-living", "nps-grace", "smithsonian-flag", "nps-riots"] },
  { id: "naval", title: "Naval Sources", description: "The oceanic war, privateering, lake fleets, coastal defense, archaeology, ships, sailors, and maritime identity.", sourceIds: ["nhhc", "nara-impressment", "nps-lake-erie", "nhhc-flotilla"] },
  { id: "chesapeake", title: "Maryland / Chesapeake", description: "The project's home ground: civic violence, raids, slavery and freedom seeking, Washington, North Point, Fort McHenry, and Baltimore's defense system.", sourceIds: ["bca", "nps-riots", "nps-tangier", "nhhc-flotilla", "nps-baltimore", "nps-north-point", "nps-bombardment", "nps-grace"] },
  { id: "gulf", title: "Gulf / Creek / Spanish Borderlands", description: "Muscogee civil conflict, U.S. expansion, Spanish Florida, Black sanctuary, Choctaw participation, and the coalition at New Orleans.", sourceIds: ["nps-creek", "nps-prince-witten", "nps-choctaw", "nps-new-orleans-black", "lafolklife"] },
  { id: "pacific", title: "Pacific", description: "The Essex cruise, British whaling, Valparaíso, Nuku Hiva, and Polynesian agency in a genuinely global war.", sourceIds: ["nhhc-pacific", "nhhc"] },
  { id: "prisoners", title: "Prisoners of War", description: "Collection guides for captivity, parole, prison records, and the American prisoners held in Britain. Catalogue records may require on-site research or reproduction orders.", sourceIds: ["nysl-war", "uk-discovery", "lac"] },
  { id: "diplomacy", title: "Diplomacy & Treaty", description: "Peace negotiations, the text of Ghent, restoration, borders, and the later choice to demilitarize the Great Lakes.", sourceIds: ["loc-ghent", "avalon-ghent", "state-rush-bagot", "lac"] },
  { id: "memory", title: "Memory / Commemoration", description: "How flags, songs, heroes, anniversaries, and national stories rearranged a complicated war after the fighting ended.", sourceIds: ["nps-legacies", "smithsonian-flag", "loc-fort-print", "cwm"] },
  { id: "scholarship", title: "Scholarly Works", description: "Routes for locating interpretive books and articles. Begin with recent bibliographies, then follow disagreements across national, Indigenous, Black, gender, diplomatic, and military history.", sourceIds: ["worldcat-scholarship", "loc-guide", "nara-war"] },
];
