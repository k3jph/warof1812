import { readFile } from "node:fs/promises";

const baseUrl = process.env.BASE_URL ?? "http://127.0.0.1:4173";
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const page = async (pathname) => {
  const response = await fetch(new URL(pathname, baseUrl), { redirect:"follow" });
  const body = await response.text();
  return { response, body };
};

const sitemapResult = await page("/sitemap.xml");
assert(sitemapResult.response.ok, "Static sitemap is unavailable");
const routes = [...sitemapResult.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
assert(routes.length === 707, `Expected 707 canonical routes, found ${routes.length}`);

const failures = [];
const queue = [...routes];
await Promise.all(Array.from({ length:20 }, async () => {
  while (queue.length) {
    const pathname = queue.pop();
    if (!pathname) return;
    const result = await page(pathname.endsWith("/") ? pathname : pathname + "/");
    if (!result.response.ok || !/<html\b/i.test(result.body)) failures.push(`${pathname}: ${result.response.status}`);
  }
}));
assert(failures.length === 0, "Static route failures:\n" + failures.join("\n"));

const home = await page("/");
assert(home.response.ok, "Static homepage failed");
assert(home.body.includes("1812: The Whole Story"), "Static homepage is not the application");
assert(!home.body.includes("<h2>Local development</h2>"), "README/setup page is still being published");

const representative = [
  "/story/baltimore-holds/",
  "/events/north-point/",
  "/people/james-madison/",
  "/evidence/canada-mere-matter-of-marching/",
  "/edition/defence-fort-mhenry/",
];
for (const pathname of representative) {
  const result = await page(pathname);
  assert(result.response.ok, "Static representative route failed: " + pathname);
  assert(result.body.includes('rel="canonical"'), "Canonical metadata missing from " + pathname);
}

for (const pathname of [
  "/data/events.json",
  "/data/events.geojson",
  "/data/historical-gis.geojson",
  "/data/images.json",
  "/data/people.json",
  "/data/sources.json",
  "/data/timeline.json",
]) {
  const result = await page(pathname);
  assert(result.response.ok && result.body.length > 50, "Static data endpoint failed: " + pathname);
  JSON.parse(result.body);
}

const assetUrls = [
  ...home.body.matchAll(/(?:src|href)="(\/[^"]+\.(?:js|css))"/g),
].map((match) => match[1]);
assert(assetUrls.length > 0, "No client assets found in static homepage");
for (const asset of [...new Set(assetUrls)].slice(0,20)) {
  const result = await page(asset);
  assert(result.response.ok, "Static client asset failed: " + asset);
}

const notFound = await readFile("pages-static/404.html", "utf8");
assert(notFound.includes("Page not found"), "Static 404 artifact is not branded");
const cname = await readFile("pages-static/CNAME", "utf8");
assert(cname.trim() === "war1812.jameshoward.us", "Pages artifact has the wrong CNAME");

console.log(JSON.stringify({
  canonicalRoutes:routes.length,
  representativeRoutes:representative.length,
  dataEndpoints:7,
  checkedClientAssets:[...new Set(assetUrls)].slice(0,20).length,
  applicationHomepage:true,
  branded404:true,
  cname:cname.trim(),
}, null, 2));
