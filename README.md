# 1812: The Whole Story

**1812: The Whole Story** is a citation-rich public-history site about the War of 1812. Its nineteen-chapter narrative follows the war across the Atlantic, Great Lakes, Indigenous homelands, Chesapeake, Gulf Coast, Pacific, diplomatic table, and later public memory. Reference collections, source packets, evidence panels, maps, objects, and interactive systems let readers inspect the record beneath the narrative.

Canonical site: <https://war1812.jameshoward.us>

## Local development

Node.js 22.13 or newer is required. The lockfile is authoritative.

```sh
npm run install:ci
npm run dev
```

For a production build and project checks:

```sh
npm run build
npm run lint
npx tsc --noEmit --incremental false
```

The project is built with Next.js, React, TypeScript, Vinext, and Cloudflare Workers tooling. Generated runtime directories are ignored and should not be committed.

## Content architecture

- `app/` contains routes, layouts, metadata, data endpoints, and the site-wide presentation layer.
- `lib/content.ts` defines the chapter sequence, core sources, events, and shared narrative scaffolding.
- `lib/pilot-chapters.ts` contains the two voice-calibration chapters.
- `lib/chapter-expansions.ts` contains the expanded narrative for the other seventeen chapters.
- `lib/documentary.ts`, `lib/evidence-lab.ts`, `lib/catalog.ts`, and the related GIS, human-record, and perspective modules provide the evidence and reference layers.
- `editorial/1812-Narrative-Voice.md` is the controlling editorial specification.

## Evidence and sources

The project distinguishes documented fact from inference, later memory, oral or community tradition, dispute, and uncertainty. It favors primary sources and durable institutional collections, links readers to the deepest useful external record, and keeps counter-evidence visible when accounts conflict. Maps and datasets identify their precision and limits rather than presenting interpretation as exact reconstruction.

The narrative is written for a general audience without hiding how historical claims are made. Citations, source packets, image rights, evidence ledgers, and community participation records are part of the interpretation, not an appendix to it.
