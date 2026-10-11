export type NewsLink = { label: string; href: string };

export type NewsItem = {
  id: string;
  title: string;
  category: string;
  publishedAt: string;
  addedAt: string;
  source: {
    publisher: string;
    author?: string;
    title: string;
    url: string;
    kind: "Reporting" | "Research" | "Museum announcement";
    access: "Open access" | "Subscription may be required";
  };
  summary: string;
  context: string;
  dateNote?: string;
  related: NewsLink[];
  furtherReading?: NewsLink[];
};

// One record per underlying story. See editorial/1812-Today.md before adding an item.
const selections: NewsItem[] = [
  {
    id: "william-adamson-mystic-grave",
    title: "An unknown sailor in Mystic is remembered by name",
    category: "Research & remembrance",
    publishedAt: "2026-10-09",
    addedAt: "2026-10-10",
    source: {
      publisher: "The New York Times",
      author: "Malia Mendez",
      title: "His Unmarked Grave Lay Forgotten for 200 Years. They Had to Fix That.",
      url: "https://www.nytimes.com/2026/10/09/arts/mystic-conn-unmarked-grave-mystery.html",
      kind: "Reporting",
      access: "Subscription may be required",
    },
    summary: "A grave in Mystic, Connecticut, marked only as an unknown sailor from HMS Terror has a name: William Adamson. Malia Mendez follows Jon Fuller’s effort to mark the burial and the research by Grace Cleere and Roger Hutchins that connected it to a British Admiralty muster roll. A named plaque was dedicated in August 2026, with one of Adamson’s descendants present.",
    context: "Terror also took part in the bombardment of Fort McHenry. The records connect a death on the Connecticut coast to the wider naval war, without resolving every disputed detail of the skirmish.",
    dateNote: "The article appeared on October 9, 2026. The dedication took place in August; this was not an October discovery.",
    related: [
      { label: "Baltimore and Fort McHenry", href: "/baltimore" },
      { label: "Working with uncertain evidence", href: "/evidence" },
    ],
  },
  {
    id: "exploring-old-ironsides-exhibition",
    title: "A new photographic view of Old Ironsides",
    category: "Museums & exhibitions",
    publishedAt: "2026-06-09",
    addedAt: "2026-10-10",
    source: {
      publisher: "USS Constitution Museum",
      title: "USS Constitution Museum Opens Exploring Old Ironsides",
      url: "https://ussconstitutionmuseum.org/press-news/uss-constitution-museum-opens_photography_exhibition/",
      kind: "Museum announcement",
      access: "Open access",
    },
    summary: "The USS Constitution Museum announced Exploring Old Ironsides, an exhibition of Greg M. Cooper’s photographs of the ship. Drawn from more than two decades of work, the photographs concentrate on details and viewpoints visitors might miss. The exhibition also introduced a renewed gallery in the former Navy Yard pump house.",
    context: "A surviving ship can be encountered as a built object as well as a battle story. This selection links to the museum’s own announcement, rather than presenting its publicity as independent reporting.",
    dateNote: "The opening was announced in June 2026. Consult the museum for current exhibition and visiting information.",
    related: [{ label: "Ships of the War of 1812", href: "/ships" }],
    furtherReading: [{ label: "Museum exhibition information", href: "https://ussconstitutionmuseum.org/exploringoldironsides/" }],
  },
  {
    id: "shadrack-byfield-second-memoir",
    title: "A recovered memoir follows a soldier home from the war",
    category: "Archives & scholarship",
    publishedAt: "2026-01-19",
    addedAt: "2026-10-10",
    source: {
      publisher: "Journal of British Studies",
      author: "Eamonn O’Keeffe",
      title: "From Amputee to Author: Shadrack Byfield and the Making of a War of 1812 Veteran",
      url: "https://www.cambridge.org/core/journals/journal-of-british-studies/article/from-amputee-to-author-shadrack-byfield-and-the-making-of-a-war-of-1812-veteran/775AD03CFBCD32F7688A34FAF365EAC5",
      kind: "Research",
      access: "Open access",
    },
    summary: "A second autobiography by British veteran Shadrack Byfield survives in a single known copy in Cleveland. Eamonn O’Keeffe’s study uses it alongside other records to follow Byfield’s life after the loss of an arm: his pursuit of benefits, return to weaving, and changing account of his own experiences. A transcription of the 1851 book is available through Cambridge’s repository.",
    context: "Byfield’s two memoirs were written for different purposes and do not tell identical stories. Reading them together brings the costs of the war into civilian life and makes the work of comparing sources visible.",
    dateNote: "January 19, 2026 is the research article’s online publication date. The recovered autobiography was published in 1851.",
    related: [
      { label: "Perspective pathways", href: "/perspectives" },
      { label: "Documents and testimony", href: "/documents" },
    ],
    furtherReading: [{ label: "Read the transcribed 1851 memoir", href: "https://www.repository.cam.ac.uk/items/61f15583-612e-4ea5-aa89-2a57d106877c" }],
  },
  {
    id: "fort-mchenry-cannonball-inert",
    title: "A cannonball find at Fort McHenry, followed by a correction",
    category: "Historic sites & material evidence",
    publishedAt: "2025-11-26",
    addedAt: "2026-10-10",
    source: {
      publisher: "The Baltimore Banner",
      author: "Tim Prudente",
      title: "No bomb bursting in air: Cannonball dug up at Fort McHenry was corroded dud",
      url: "https://www.thebanner.com/community/local-news/cannonball-fort-mchenry-OLGCPV2WAFAG3BGLJIZWLFSTZQ/",
      kind: "Reporting",
      access: "Subscription may be required",
    },
    summary: "A cannonball uncovered during work at Fort McHenry prompted a closure and a bomb-squad response. The subsequent finding was less dramatic: specialists determined that the corroded object was inert. Tim Prudente’s follow-up also explains that its origins remained uncertain. Finding it at Fort McHenry did not establish that it came from the bombardment of 1814.",
    context: "The fort remained in military use long after the War of 1812. A find’s location supplies context, but it cannot by itself establish the object’s date or the episode to which it belonged.",
    dateNote: "This is follow-up reporting from November 2025, not a current closure notice.",
    related: [
      { label: "Baltimore, 1812–1814", href: "/baltimore" },
      { label: "Maryland field guide", href: "/backyard" },
    ],
  },
];

export const newsItems: readonly NewsItem[] = [...selections].sort(
  (a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.id.localeCompare(b.id),
);

export function formatNewsDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long", day: "numeric", year: "numeric", timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`));
}
