import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";

const baseUrl = process.env.BASE_URL ?? "http://127.0.0.1:8787";
const canonicalOrigin = "https://war1812.jameshoward.us";
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const page = async (path) => {
  const response = await fetch(new URL(path, baseUrl), { redirect: "follow" });
  const text = await response.text();
  return { response, text };
};
const attr = (html, pattern, label) => {
  const match = html.match(pattern);
  assert(match, `Missing ${label}`);
  return match[1].replaceAll("&amp;", "&");
};

const { response: sitemapResponse, text: sitemap } = await page("/sitemap.xml");
assert(sitemapResponse.ok, "sitemap.xml did not return 200");
const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
assert(locations.length > 100, `Sitemap unexpectedly small: ${locations.length}`);
assert(new Set(locations).size === locations.length, "Sitemap contains duplicate URLs");
assert(locations.every((url) => url.startsWith(canonicalOrigin)), "Sitemap contains a non-canonical host");
for (const expected of [
  "/story/baltimore-holds",
  "/events/north-point",
  "/people/james-madison",
  "/evidence/canada-mere-matter-of-marching",
  "/edition/defence-fort-mhenry",
]) assert(locations.includes(`${canonicalOrigin}${expected}`), `Sitemap missing ${expected}`);

const queue = [...locations];
const crawlFailures = [];
await Promise.all(Array.from({ length: 16 }, async () => {
  while (queue.length) {
    const absolute = queue.pop();
    if (!absolute) return;
    const target = new URL(absolute);
    const response = await fetch(new URL(target.pathname + target.search, baseUrl), { redirect: "follow" });
    if (!response.ok) crawlFailures.push(`${target.pathname}: ${response.status}`);
    await response.arrayBuffer();
  }
}));
assert(crawlFailures.length === 0, `Canonical route crawl failures:\n${crawlFailures.join("\n")}`);

const representative = [
  "/",
  "/story/baltimore-holds",
  "/events/north-point",
  "/people/james-madison",
  "/evidence/canada-mere-matter-of-marching",
  "/edition/defence-fort-mhenry",
];
const socialTitles = new Set();
for (const path of representative) {
  const { response, text } = await page(path);
  assert(response.ok, `Representative route failed: ${path}`);
  const canonical = attr(text, /<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i, `canonical on ${path}`);
  const ogUrl = attr(text, /<meta[^>]+property="og:url"[^>]+content="([^"]+)"/i, `og:url on ${path}`);
  const ogTitle = attr(text, /<meta[^>]+property="og:title"[^>]+content="([^"]+)"/i, `og:title on ${path}`);
  const ogDescription = attr(text, /<meta[^>]+property="og:description"[^>]+content="([^"]+)"/i, `og:description on ${path}`);
  const twitterTitle = attr(text, /<meta[^>]+name="twitter:title"[^>]+content="([^"]+)"/i, `twitter:title on ${path}`);
  const twitterDescription = attr(text, /<meta[^>]+name="twitter:description"[^>]+content="([^"]+)"/i, `twitter:description on ${path}`);
  const expectedCanonical = path === "/" ? canonicalOrigin : new URL(path, canonicalOrigin).toString();
  assert(canonical === expectedCanonical, `Canonical mismatch on ${path}: ${canonical}`);
  assert(ogUrl === expectedCanonical, `Open Graph URL mismatch on ${path}: ${ogUrl}`);
  if (path !== "/") {
    assert(ogTitle !== "1812: The Whole Story", `Open Graph title is generic on ${path}`);
    assert(twitterTitle !== "1812: The Whole Story", `Twitter title is generic on ${path}`);
  }
  assert(ogTitle === twitterTitle, `Open Graph and Twitter titles disagree on ${path}`);
  assert(ogDescription.length > 30 && twitterDescription.length > 30, `Social description too short on ${path}`);
  socialTitles.add(ogTitle);
}
assert(socialTitles.size === representative.length, "Representative routes reuse a generic Open Graph title");

const packet = await page("/edition/defence-fort-mhenry");
assert((packet.text.match(/<h1\b/gi) ?? []).length === 1, "Standalone documentary packet must have exactly one h1");

const robots = await page("/robots.txt");
assert(robots.response.ok, "robots.txt did not return 200");
assert(robots.text.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`), "robots.txt has the wrong sitemap host");
assert(robots.text.includes("Disallow: /data/events.json"), "robots.txt does not exclude raw data endpoints");

const missing = await page("/round5-this-page-does-not-exist");
assert(missing.response.status === 404, `Branded 404 returned ${missing.response.status}`);
assert(missing.text.includes("Page not found"), "Branded 404 copy is missing");
for (const href of ["/", "/story", "/explore", "/map"]) assert(missing.text.includes(`href="${href}"`), `404 missing link ${href}`);

const explore = await readFile("components/ExploreIndex.tsx", "utf8");
const people = await readFile("components/HumanRecordIndex.tsx", "utf8");
assert(explore.includes("const pageSize = 48"), "Explore pagination page size regressed");
assert(explore.includes("const hasSelection = Boolean(query.trim()) || category !== \"All\";"), "Explore search gating regressed");
assert(people.includes("const pageSize = 48"), "People pagination page size regressed");

const map = await readFile("components/MapExplorer.tsx", "utf8");
assert(!map.includes('role="img" aria-labelledby="gis-title'), "Map still nests controls under role=img");
assert(map.includes('role="group" aria-labelledby="gis-title gis-desc"'), "Map group semantics missing");
assert(map.includes('aria-pressed={selectedFeatureId === item.id}'), "Map feature selection state missing");
assert(map.includes('id="gis-keyboard-record"'), "Keyboard map navigator missing");
assert(map.includes('initialEventId?: string'), "Map initial event deep-link prop missing");

const warClock = await readFile("components/WarClock.tsx", "utf8");
assert(warClock.includes("entry.place.toLowerCase().includes(route.from.toLowerCase())"), "War Clock route-origin restriction missing");
const lake = await readFile("components/LakeLogistics.tsx", "utf8");
const lakeModel = await readFile("lib/lake-logistics-model.ts", "utf8");
assert(lake.includes('useState("kingston")') && lake.includes("useState(6)"), "Lake Logistics baseline selector regressed");
assert(lakeModel.includes("LAKE_ALLOCATION_BUDGET = 480"), "Lake Logistics budget regressed");
const baselineMatch = lakeModel.match(/DEFAULT_LAKE_ALLOCATION:[^=]+ = \{([^}]+)\}/);
assert(baselineMatch, "Lake Logistics baseline allocation missing");
const numbers = [...baselineMatch[1].matchAll(/:\s*(\d+)/g)].map((match) => Number(match[1]));
assert(numbers.reduce((sum, value) => sum + value, 0) === 480, "Lake Logistics baseline does not use the 480-point cap");

const changed = execFileSync("git", ["diff", "--name-only", "HEAD^", "HEAD"], { encoding: "utf8" }).trim().split("\n").filter(Boolean);
const forbidden = [
  "lib/baltimore.ts",
  "lib/documentary.ts",
  "lib/evidence-lab.ts",
  "lib/human-record.ts",
  "lib/pilot-chapters.ts",
  "lib/source-guide.ts",
];
for (const file of forbidden) assert(!changed.includes(file), `Out-of-scope content file changed: ${file}`);
for (const file of changed) {
  const source = await readFile(file, "utf8").catch(() => "");
  assert(!source.includes("\uFFFD"), `Replacement character found in ${file}`);
}
const addedLines = execFileSync("git", ["diff", "--unified=0", "HEAD^", "HEAD", "--", ...changed], { encoding: "utf8", maxBuffer: 16 * 1024 * 1024 })
  .split("\n")
  .filter((line) => line.startsWith("+") && !line.startsWith("+++"));
assert(!addedLines.some((line) => line.includes("\u2014")), "An em dash was introduced in changed prose");

console.log(`Round 5 verification passed: ${locations.length} canonical routes crawled; metadata, 404, robots, sitemap, accessibility source checks, pagination checks, and scope scans passed.`);
