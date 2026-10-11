import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { formatNewsDate, newsItems } from "../lib/news.ts";

const baseUrl = process.env.BASE_URL ?? "http://127.0.0.1:8787";
const chromeBin = process.env.CHROME_BIN;
assert(chromeBin, "CHROME_BIN is required for news verification");
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const today = new Date().toISOString().slice(0, 10);
const ids = newsItems.map((item) => item.id);
assert(newsItems.length >= 4, "The four launch selections must remain available");
assert.equal(new Set(ids).size, ids.length, "News identifiers must be unique");
assert.equal(new Set(newsItems.map((item) => item.source.url)).size, ids.length, "Duplicate lead sources");
assert.equal(formatNewsDate("2026-10-09"), "October 9, 2026", "News dates shifted across time zones");
const internalLinks = new Set(["/news", "/explore"]);
for (const [index, item] of newsItems.entries()) {
  assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.id), "Unsafe news identifier");
  for (const date of [item.publishedAt, item.addedAt]) {
    assert(/^\d{4}-\d{2}-\d{2}$/.test(date), "Invalid news date format");
    assert.equal(new Date(`${date}T12:00:00Z`).toISOString().slice(0, 10), date, "Invalid calendar date");
    assert(date <= today, "A news date is in the future");
  }
  assert(item.addedAt >= item.publishedAt, "An item was added before its source existed");
  if (index) assert(newsItems[index - 1].publishedAt >= item.publishedAt, "News is not newest first");
  assert(item.title && item.summary && item.context && item.source.publisher && item.source.title, "Incomplete news record");
  assert(!JSON.stringify(item).includes("\u2014"), "News prose contains an em dash");
  for (const url of [item.source.url, ...(item.furtherReading ?? []).map((link) => link.href)]) {
    const parsed = new URL(url);
    assert.equal(parsed.protocol, "https:", "Source links must use HTTPS");
    assert(!parsed.username && !parsed.password, "Credentials in a source link");
    assert(![...parsed.searchParams.keys()].some((key) => /^(utm_|fbclid|gclid)/i.test(key)), "Tracking parameters in a source link");
  }
  for (const link of item.related) {
    assert(link.href.startsWith("/") && !link.href.startsWith("//"), "Related history must link inside the site");
    internalLinks.add(link.href);
  }
}
const get = async (path) => {
  const response = await fetch(new URL(path, baseUrl), { signal: AbortSignal.timeout(30000) });
  assert(response.ok, `Page failed: ${path} (${response.status})`);
  return response.text();
};
const archive = await get("/news/");
const home = await get("/");
const articleIds = (html) => [...html.matchAll(/<article\b[^>]*\bdata-news-id="([^"]+)"/g)].map((match) => match[1]);
assert.deepEqual(articleIds(archive), ids, "The archive did not render all selections in order");
assert.deepEqual(articleIds(home), ids.slice(0, 3), "The homepage must render only the three newest selections");
assert.equal((archive.match(/<h1\b/g) ?? []).length, 1, "The archive must have one h1");
assert(/<link[^>]+rel="canonical"[^>]+href="https:\/\/war1812\.jameshoward\.us\/news"/.test(archive), "News canonical metadata missing");
assert(archive.includes('property="og:title"') && archive.includes("1812 Today"), "News sharing metadata missing");
assert(archive.includes("Subscription may be required") && archive.includes("Museum announcement"), "News source and access labels missing");
assert((await get("/sitemap.xml")).includes("https://war1812.jameshoward.us/news"), "Sitemap omits news");
assert((await get("/explore/")).includes('aria-label="Recent news and discoveries"'), "Explore omits news");
for (const link of internalLinks) await get(link.endsWith("/") ? link : `${link}/`);
for (const item of newsItems) assert(archive.includes(`id="${item.id}"`), "A news permalink anchor is missing");

class Cdp {
  constructor(url) { this.url = url; this.id = 0; this.pending = new Map(); this.waiters = new Map(); }
  async open() {
    this.ws = new WebSocket(this.url);
    await new Promise((resolve, reject) => {
      this.ws.addEventListener("open", resolve, { once: true });
      this.ws.addEventListener("error", reject, { once: true });
    });
    this.ws.addEventListener("message", (event) => {
      const message = JSON.parse(String(event.data));
      if (message.id) {
        const pending = this.pending.get(message.id);
        if (!pending) return;
        this.pending.delete(message.id);
        clearTimeout(pending.timer);
        if (message.error) pending.reject(new Error(message.error.message));
        else pending.resolve(message.result);
      } else {
        const waiter = this.waiters.get(message.method);
        if (waiter) { clearTimeout(waiter.timer); this.waiters.delete(message.method); waiter.resolve(message.params); }
      }
    });
  }
  send(method, params = {}) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => { this.pending.delete(id); reject(new Error(`CDP timeout: ${method}`)); }, 30000);
      this.pending.set(id, { resolve, reject, timer });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
  once(method) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => { this.waiters.delete(method); reject(new Error(`Browser event timeout: ${method}`)); }, 30000);
      this.waiters.set(method, { resolve, reject, timer });
    });
  }
  close() {
    for (const pending of this.pending.values()) clearTimeout(pending.timer);
    for (const waiter of this.waiters.values()) clearTimeout(waiter.timer);
    this.ws?.close();
  }
}

const profile = await mkdtemp(join(tmpdir(), "war1812-news-"));
const chrome = spawn(chromeBin, ["--headless=new", "--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage", "--remote-debugging-address=127.0.0.1", "--remote-debugging-port=0", `--user-data-dir=${profile}`, "about:blank"], { stdio: "ignore" });
let launchError;
chrome.on("error", (error) => { launchError = error; });
let cdp;
try {
  let port;
  for (let attempt = 0; attempt < 60; attempt += 1) {
    if (launchError) throw launchError;
    const activePort = await readFile(join(profile, "DevToolsActivePort"), "utf8").catch(() => "");
    if (activePort) { port = Number(activePort.split("\n")[0]); break; }
    await sleep(200);
  }
  assert(port, "Chrome did not start for news verification");
  const targetResponse = await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: "PUT" });
  assert(targetResponse.ok, "Could not create news verification browser target");
  const target = await targetResponse.json();
  cdp = new Cdp(target.webSocketDebuggerUrl);
  await cdp.open();
  await cdp.send("Page.enable");
  await cdp.send("Runtime.enable");
  await mkdir("news-screenshots", { recursive: true });
  const evaluate = async (expression) => {
    const result = await cdp.send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
    assert(!result.exceptionDetails, "Browser evaluation failed: " + JSON.stringify(result.exceptionDetails));
    return result.result.value;
  };
  const navigate = async (path, width) => {
    await cdp.send("Emulation.setDeviceMetricsOverride", { width, height: 1100, deviceScaleFactor: 1, mobile: false });
    const loaded = cdp.once("Page.loadEventFired");
    await cdp.send("Page.navigate", { url: new URL(path, baseUrl).toString() });
    await loaded;
    await sleep(400);
  };
  const report = [];
  for (const width of [390, 820, 1100, 1440]) {
    for (const path of ["/news/", "/"]) {
      await navigate(path, width);
      const state = await evaluate(`(() => {
        const root = document.querySelector(${JSON.stringify(path === "/" ? "[data-recent-news]" : "main")});
        const articles = [...root.querySelectorAll('[data-news-id]')];
        const first = articles[0]?.querySelector('a');
        first?.focus();
        return {
          width: document.documentElement.clientWidth,
          scroll: Math.max(document.body.scrollWidth, document.documentElement.scrollWidth),
          ids: articles.map((article) => article.dataset.newsId),
          images: root.querySelectorAll('img').length,
          headings: articles.every((article) => Boolean(document.getElementById(article.getAttribute('aria-labelledby')))),
          focus: document.activeElement === first,
          navCount: document.querySelectorAll('nav[aria-label="Primary navigation"] a').length
        };
      })()`);
      assert(state.scroll <= state.width + 1, `Horizontal overflow on ${path} at ${width}px`);
      assert.deepEqual(state.ids, path === "/" ? ids.slice(0, 3) : ids, "Browser news order mismatch");
      assert.equal(state.images, 0, "News should not borrow publisher images");
      assert(state.headings && state.focus, "News heading or keyboard navigation regression");
      assert.equal(state.navCount, 11, "The primary navigation was crowded with another item");
      const clip = await evaluate(`(() => {
        const root = document.querySelector(${JSON.stringify(path === "/" ? "[data-recent-news]" : "main")});
        const rect = root.getBoundingClientRect();
        return {x: 0, y: Math.max(0, rect.top + window.scrollY), width: document.documentElement.clientWidth, height: Math.min(rect.height, 6500), scale: 1};
      })()`);
      const shot = await cdp.send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, clip });
      await writeFile(`news-screenshots/${path === "/" ? "home" : "archive"}-${width}.png`, Buffer.from(shot.data, "base64"));
      report.push({ path, width, ...state });
    }
  }
  await cdp.send("Emulation.setScriptExecutionDisabled", { value: true });
  await navigate("/news/", 390);
  assert.equal(await evaluate("document.querySelectorAll('article[data-news-id]').length"), ids.length, "News requires JavaScript to render");
  const summary = { records: ids.length, homepageRecords: Math.min(ids.length, 3), checkedInternalRoutes: internalLinks.size, javascriptDisabled: true, layouts: report };
  await writeFile("news-screenshots/verification.json", JSON.stringify(summary, null, 2));
  console.log(JSON.stringify(summary, null, 2));
} finally {
  cdp?.close();
  const stopped = new Promise((resolve) => chrome.once("close", resolve));
  chrome.kill("SIGTERM");
  await Promise.race([stopped, sleep(2000)]);
  await rm(profile, { recursive: true, force: true }).catch(() => {});
}
