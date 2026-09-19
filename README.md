# 1812: The Whole Story

**1812: The Whole Story** is a narrative-first, citation-rich public-history project about the War of 1812.

Canonical site: https://war1812.jameshoward.us

The project is designed for readers who want to understand the conflict as a connected story rather than as a list of battles. It combines long-form narrative, primary-source routes, maps, timelines, evidence notes, documentary packets, interactive historical systems, perspective pathways, and structured research data.

## Editorial approach

The site treats the war as more than a conflict between two national armies.

The narrative includes:

- the United States and the British Empire;
- Upper and Lower Canada and other parts of British North America;
- specific Indigenous nations, leaders, communities, and coalitions;
- enslaved people, freedom seekers, free Black communities, Black military service, Colonial Marines, and Black Refugees;
- women, children, civilians, laborers, merchants, privateers, sailors, shipbuilders, and refugees;
- Spanish Florida and the southern borderlands;
- the Pacific theater;
- communities whose histories do not fit neatly inside national categories.

Historical claims are distinguished, where necessary, among documented fact, strong inference, plausible reconstruction, later recollection, oral or community tradition, disputed interpretation, and unknown.

The controlling long-form voice specification is:

`editorial/1812-Narrative-Voice.md`

The guiding question for authored prose is not merely whether it is polished. It is whether the reasoning, evidence handling, and voice plausibly match James P. Howard II's established writing.

## Baltimore as a bookend

Baltimore appears twice in the American narrative.

In 1812, political violence over the newly declared war culminated in the murder of Revolutionary War General James M. Lingan and the severe beating of Henry "Light-Horse Harry" Lee and other Federalists.

In 1814, the same city mobilized labor, money, militia, sailors, fortifications, privateering networks, harbor defenses, and civic resources against a British invasion.

The project treats those episodes as parts of one history rather than unrelated local stories.

## Repository structure

Important content and editorial files include:

- `lib/content.ts` for the central chapter, event, source, and relationship model;
- `lib/pilot-chapters.ts` for the two calibrated long-form pilot chapters;
- `lib/chapter-expansions.ts` for non-pilot long-form chapter expansions;
- `lib/documentary.ts` for documentary source packets;
- `lib/catalog.ts` for people, places, ships, documents, and objects;
- `lib/evidence-lab.ts` for claim and evidence analysis;
- `lib/historical-gis.ts` for sourced spatial records;
- `lib/perspectives.ts` for perspective pathways;
- `lib/human-record.ts` for identity and archival-context records;
- `editorial/1812-Narrative-Voice.md` for the narrative voice standard;
- `app/` for routes and public-facing pages;
- `components/` for reusable visual and interactive components.

Recovery artifacts, when present, live under `recovery/` and are not imported into the production application.

## Local development

Prerequisites:

- Node.js 22.13.0 or newer
- the package manager and runtime dependencies described in `package.json`

Install dependencies:

```bash
npm run install:ci
```

Start a development server:

```bash
npm run dev
```

Run lint:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

The application uses the Vinext/Cloudflare worker toolchain already configured in the repository.

## Sources and outward links

The project intentionally links outward aggressively.

Narrative claims should lead readers toward the evidence beneath them, including archival records, maps, newspapers, museum objects, primary documents, authoritative public-history institutions, and relevant scholarship.

Major repositories include the Library of Congress, National Archives, Library and Archives Canada, National Park Service, Canadian War Museum, Parks Canada, Naval History and Heritage Command, Maryland State Archives, Baltimore City Archives, and other specialized institutions.

A repository or government source is not automatically a blanket reuse license. Image and object rights should be verified item by item.

## Data

The site exposes structured records through its data routes, including event, timeline, people, source, image-rights, and historical GIS data.

The structured corpus is intentionally reusable. It is designed to support later books, atlases, games, classroom resources, tours, posters, and other public-history projects without rebuilding the research from scratch.

## Independence and attribution

This is an independent public-history project created by James P. Howard II.

Howard serves as Treasurer and a member of the Board of Managers of the Society of the War of 1812 in the State of Maryland. Unless explicitly stated otherwise, the project's interpretations are his own and should not be understood as official positions of the Society or any other organization with which he is affiliated.

Corrections, stronger sources, and evidence that changes an interpretation are welcome.
