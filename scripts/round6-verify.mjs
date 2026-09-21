import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";

const BASE = "f05dd47f76d3e7bd08311725abdd32fc0c3c26b2";
const assert = (condition, message) => { if (!condition) throw new Error(message); };

execFileSync("git", ["diff", "--check", BASE, "HEAD"], { stdio:"inherit" });
const status = execFileSync("git", ["status", "--porcelain"], { encoding:"utf8" }).trim();
assert(status === "", "Working tree is not clean during verification:\n" + status);

const changed = execFileSync("git", ["diff", "--name-only", BASE, "HEAD"], { encoding:"utf8" }).trim().split("\n").filter(Boolean);
const forbidden = [
  "lib/baltimore.ts",
  "lib/documentary.ts",
  "lib/evidence-lab.ts",
  "lib/historical-gis.ts",
  "lib/human-record.ts",
  "lib/pilot-chapters.ts",
  "lib/source-guide.ts",
  "components/SiteHeader.tsx",
];
for (const file of forbidden) assert(!changed.includes(file), "Closed-scope file changed: " + file);

for (const file of changed) {
  const source = await readFile(file, "utf8").catch(() => "");
  assert(!source.includes("\uFFFD"), "Replacement character found in " + file);
}
const addedLines = execFileSync("git", ["diff", "--unified=0", BASE, "HEAD", "--", ...changed], { encoding:"utf8", maxBuffer:32 * 1024 * 1024 })
  .split("\n")
  .filter((line) => line.startsWith("+") && !line.startsWith("+++"));
assert(!addedLines.some((line) => line.includes("\u2014")), "An em dash was introduced in changed prose");

const css = await readFile("app/globals.css", "utf8");
assert(css.includes("color-mix(in srgb, currentColor 85%, var(--red) 15%) !important"), "Surface-aware kicker rule missing");
assert(css.includes(".transcription-pair.excerpt-long blockquote"), "Long-excerpt typography missing");
assert(css.includes(".transcription-pair.excerpt-medium blockquote"), "Medium-excerpt typography missing");

const reader = await readFile("components/DocumentaryReader.tsx", "utf8");
assert(reader.includes('const MajorHeading = standalone ? "h2" : "h3";'), "Documentary major heading semantics missing");
assert(reader.includes('const MinorHeading = standalone ? "h3" : "h4";'), "Documentary minor heading semantics missing");
assert(reader.includes('longestReading >= 320 ? "excerpt-long"'), "Documentary length classification missing");

const map = await readFile("components/MapExplorer.tsx", "utf8");
assert(map.includes("scrollIntoView({ behavior:\"auto\", block:\"start\" })"), "Off-frame immediate scroll feedback missing");
assert(map.includes("node.focus({ preventScroll:true })"), "Off-frame focus transfer missing");
assert(map.includes("data-selected-event-record={selectedEvent.id}"), "Selected-event focus target missing");

const model = await readFile("lib/lake-logistics-model.ts", "utf8");
assert(model.includes("LAKE_ALLOCATION_BUDGET = 480"), "Lake budget constant missing");
assert(model.includes('reason:"budget"'), "Above-budget rejection missing");
assert(model.includes("Math.min(readiness, bottleneck.score * 1.05)"), "Bottleneck must cap sustainment rather than be subtracted from it");
assert(model.includes("const sustainedVessels = Math.min(hulls, sustainableCapacity);"), "Sustained-vessel cap missing");

const expansions = await readFile("lib/chapter-expansions.ts", "utf8");
const everythingStart = expansions.indexOf('"everything-changes":');
const everythingEnd = expansions.indexOf('"niagara-again":', everythingStart);
assert(everythingStart >= 0 && everythingEnd > everythingStart, "everything-changes block missing");
const everything = expansions.slice(everythingStart, everythingEnd);
const paragraphBlocks = [...everything.matchAll(/paragraphs:\s*\[([\s\S]*?)\]/g)].map((match) => match[1]);
const prose = paragraphBlocks.flatMap((block) => [...block.matchAll(/"((?:\\.|[^"\\])*)"/g)].map((match) => match[1])).join(" ");
const proseWords = prose.split(/\s+/).filter(Boolean).length;
assert(proseWords >= 1450, "everything-changes remains too thin: " + proseWords + " paragraph words");
assert(everything.includes("Release from Europe changed the strategic calendar"), "Strategic consequence restoration missing");
assert(everything.includes("simultaneous strategic problems"), "1814 campaign transition restoration missing");
assert(!everything.includes("The British failure at Baltimore"), "Baltimore spoiler reintroduced");

const perryStart = expansions.indexOf('heading: "September 10"');
const perryEnd = expansions.indexOf('heading: "The land campaign opens"', perryStart);
const perry = expansions.slice(perryStart, perryEnd);
assert(perry.includes("Elliott rejected criticism of his conduct"), "Perry/Elliott dispute not restored");
assert(perry.includes("April 1815 inquiry"), "Perry/Elliott inquiry chronology missing");
assert(perry.includes("In 1818 he filed formal charges"), "Perry charges chronology missing");
assert(perry.includes('"dudley-naval-war"') && perry.includes('"skaggs-signal-victory"'), "Perry/Elliott sources missing");

assert(expansions.includes("The American Battlefield Trust biography says he died in a Baltimore hospital in November 1814."), "Battlefield Trust Williams date not preserved");
assert(expansions.includes("died there on March 19, 1815"), "NPS Williams date disagreement not preserved");
assert(expansions.includes('"nps-william-williams"'), "NPS Williams source is not attached to the claim");

const registry = await readFile("lib/content.ts", "utf8");
assert(registry.includes('id: "nps-william-williams"'), "Targeted NPS Williams source missing from registry");
const sourceIds = new Set([...registry.matchAll(/\{ id: "([^"]+)", title:/g)].map((match) => match[1]));
for (const id of ["dudley-naval-war","skaggs-signal-victory","nps-william-williams"]) {
  assert(sourceIds.has(id), "Changed prose references unresolved source " + id);
}

console.log(JSON.stringify({
  changedFiles:changed.length,
  everythingChangesParagraphWords:proseWords,
  targetedSources:["dudley-naval-war","skaggs-signal-victory","nps-william-williams"],
  textIntegrity:{replacementCharacters:0,addedEmDashes:0},
  diffCheck:"passed",
  workingTree:"clean",
}, null, 2));
