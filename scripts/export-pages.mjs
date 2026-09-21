import { access, cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const baseUrl = process.env.BASE_URL ?? "http://127.0.0.1:8787";
const output = path.resolve(process.env.PAGES_DIR ?? "pages-static");
const client = path.resolve("dist/client");

const assert = (condition, message) => { if (!condition) throw new Error(message); };
const fetchBody = async (pathname, allow404 = false) => {
  const response = await fetch(new URL(pathname, baseUrl), { redirect:"follow" });
  if (!allow404) assert(response.ok, `Export fetch failed for ${pathname}: ${response.status}`);
  else assert(response.status === 404, `Expected 404 for ${pathname}, got ${response.status}`);
  return { response, body:await response.text() };
};
const writeText = async (relative, body) => {
  const target = path.join(output, relative);
  await mkdir(path.dirname(target), { recursive:true });
  await writeFile(target, body);
};
const routeFile = (pathname) => {
  if (pathname === "/") return "index.html";
  const clean = pathname.replace(/^\/+|\/+$/g, "");
  return path.join(clean, "index.html");
};

await access(client);
await rm(output, { recursive:true, force:true });
await mkdir(output, { recursive:true });
await cp(client, output, { recursive:true });
await writeFile(path.join(output, ".nojekyll"), "");
try {
  await cp("CNAME", path.join(output, "CNAME"));
} catch {}

const { body:sitemap } = await fetchBody("/sitemap.xml");
await writeText("sitemap.xml", sitemap);
const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
assert(routes.length > 100, `Sitemap unexpectedly small: ${routes.length}`);

const queue = [...routes];
await Promise.all(Array.from({ length:16 }, async () => {
  while (queue.length) {
    const pathname = queue.pop();
    if (!pathname) return;
    const { body } = await fetchBody(pathname);
    assert(/<html\b/i.test(body), `Expected HTML for ${pathname}`);
    await writeText(routeFile(pathname), body);
  }
}));

for (const pathname of ["/robots.txt"]) {
  const { body } = await fetchBody(pathname);
  await writeText(pathname.slice(1), body);
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
  const { body } = await fetchBody(pathname);
  await writeText(pathname.slice(1), body);
}

const { body:notFound } = await fetchBody("/pages-export-not-found", true);
assert(notFound.includes("Page not found"), "Application 404 was not captured");
await writeText("404.html", notFound);

console.log(JSON.stringify({
  output,
  copiedClient:"dist/client",
  canonicalRoutes:routes.length,
  dataEndpoints:7,
  custom404:true,
}, null, 2));
