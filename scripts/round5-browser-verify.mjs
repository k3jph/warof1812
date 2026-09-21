import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";

const chromeBin = process.env.CHROME_BIN;
const baseUrl = process.env.BASE_URL ?? "http://127.0.0.1:8787";
if (!chromeBin) throw new Error("CHROME_BIN is required");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const assert = (condition, message) => { if (!condition) throw new Error(message); };

class Cdp {
  constructor(url) {
    this.url = url;
    this.id = 0;
    this.pending = new Map();
    this.waiters = new Map();
  }
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
        if (message.error) pending.reject(new Error(message.error.message));
        else pending.resolve(message.result);
        return;
      }
      const waiters = this.waiters.get(message.method);
      if (!waiters?.length) return;
      const waiter = waiters.shift();
      waiter(message.params);
    });
  }
  send(method, params = {}) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
  once(method) {
    return new Promise((resolve) => {
      const waiters = this.waiters.get(method) ?? [];
      waiters.push(resolve);
      this.waiters.set(method, waiters);
    });
  }
  close() { this.ws?.close(); }
}

const chrome = spawn(chromeBin, [
  "--headless=new",
  "--no-sandbox",
  "--disable-gpu",
  "--disable-dev-shm-usage",
  "--remote-debugging-address=127.0.0.1",
  "--remote-debugging-port=9222",
  "--user-data-dir=/tmp/war1812-round5-chrome",
  "about:blank",
], { stdio: ["ignore", "pipe", "pipe"] });

try {
  let version;
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      const response = await fetch("http://127.0.0.1:9222/json/version");
      if (response.ok) { version = await response.json(); break; }
    } catch {}
    await sleep(200);
  }
  assert(version, "Chrome DevTools endpoint did not start");
  const create = await fetch("http://127.0.0.1:9222/json/new?" + encodeURIComponent("about:blank"), { method: "PUT" });
  assert(create.ok, "Could not create Chrome verification target");
  const target = await create.json();
  const cdp = new Cdp(target.webSocketDebuggerUrl);
  await cdp.open();
  await cdp.send("Page.enable");
  await cdp.send("Runtime.enable");
  await mkdir("round5-screenshots", { recursive: true });

  const evaluate = async (expression) => {
    const result = await cdp.send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
    if (result.exceptionDetails) throw new Error("Browser evaluation failed: " + result.exceptionDetails.text);
    return result.result.value;
  };
  const navigate = async (path, width = 1100, height = 1100) => {
    await cdp.send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: false });
    const loaded = cdp.once("Page.loadEventFired");
    await cdp.send("Page.navigate", { url: new URL(path, baseUrl).toString() });
    await loaded;
    await sleep(800);
  };
  const screenshot = async (name) => {
    const result = await cdp.send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
    await writeFile("round5-screenshots/" + name + ".png", Buffer.from(result.data, "base64"));
  };

  for (const width of [390, 820, 1100, 1440]) {
    for (const path of ["/edition", "/documents"]) {
      await navigate(path, width, 1200);
      const dimensions = await evaluate("(() => ({scroll: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth), client: document.documentElement.clientWidth}))()");
      assert(dimensions.scroll <= dimensions.client + 1, "Horizontal overflow on " + path + " at " + width + "px: " + dimensions.scroll + " > " + dimensions.client);
      await screenshot(path.slice(1) + "-" + width);
    }
  }

  await navigate("/edition/defence-fort-mhenry", 820, 1200);
  assert(await evaluate('document.querySelectorAll("h1").length === 1'), "Standalone documentary packet does not have exactly one h1");
  await screenshot("packet-820");

  const eventIds = ["detroit-surrender", "north-point", "new-orleans", "nuku-hiva", "treaty-ghent"];
  for (const id of eventIds) {
    await navigate("/map?event=" + id, 1100, 1200);
    const selected = await evaluate("(() => { const href = " + JSON.stringify("/events/") + " + " + JSON.stringify(id) + "; const record = [...document.querySelectorAll('a')].some((link) => link.getAttribute('href') === href); const pressedMarker = document.querySelector('circle[aria-pressed=\"true\"]'); const pressedOffFrame = document.querySelector('.gis-off-frame button[aria-pressed=\"true\"]'); return record && Boolean(pressedMarker || pressedOffFrame); })()");
    assert(selected, "Map deep link did not select " + id);
  }
  await screenshot("map-deeplink-1100");

  await navigate("/map?event=north-point", 1100, 1200);
  const mapA11y = await evaluate("(() => ({ roleImg: Boolean(document.querySelector('svg[role=\"img\"]')), group: Boolean(document.querySelector('svg[role=\"group\"]')), keyboardNavigator: Boolean(document.querySelector('#gis-keyboard-record')), focusables: document.querySelectorAll('.gis-feature[tabindex=\"0\"][role=\"button\"]').length, presetStates: [...document.querySelectorAll('.gis-presets button')].every((button) => button.hasAttribute('aria-pressed')), layerCheckboxes: document.querySelectorAll('.gis-layer-list input[type=\"checkbox\"]').length }))()");
  assert(!mapA11y.roleImg && mapA11y.group, "Interactive map SVG semantics are incorrect");
  assert(mapA11y.keyboardNavigator && mapA11y.focusables > 0, "Map lacks keyboard-reachable records");
  assert(mapA11y.presetStates && mapA11y.layerCheckboxes > 0, "Map controls do not expose selected state");
  const keyboardSelection = await evaluate("(async () => { const feature = document.querySelector('.gis-feature[tabindex=\"0\"][role=\"button\"]'); if (!feature) return false; feature.focus(); feature.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })); await new Promise((resolve) => setTimeout(resolve, 100)); return document.activeElement === feature && feature.getAttribute('aria-pressed') === 'true'; })()");
  assert(keyboardSelection, "Keyboard activation did not select a map feature");

  await navigate("/war-clock", 1100, 1200);
  const clockText = await evaluate('document.querySelector(".knowledge-lag")?.textContent ?? ""');
  assert(!clockText.includes("Pensacola"), "Ghent-to-Washington knowledge horizon still includes unrelated Pensacola events");
  assert(clockText.includes("Ghent") && clockText.includes("Washington"), "War Clock route readout is incomplete");
  await screenshot("war-clock-1100");

  await navigate("/lake-logistics", 1100, 1200);
  const lakeState = await evaluate("(() => ({ text: document.body.textContent ?? '', readiness: document.querySelector('.lake-readiness b')?.textContent?.trim(), hulls: document.querySelector('.lake-output > div:first-child b')?.textContent?.trim() }))()");
  assert(lakeState.text.includes("480 / 480"), "Lake Logistics default leaves resources unallocated");
  assert(lakeState.hulls === "1", "Lake Logistics default does not demonstrate a plausible launch: " + lakeState.hulls);
  assert(lakeState.readiness === "46", "Unexpected Lake Logistics default readiness: " + lakeState.readiness);
  await screenshot("lake-logistics-1100");

  await navigate("/people", 1100, 1200);
  assert(await evaluate('Boolean(document.querySelector(".record-pagination"))'), "People pagination controls missing");
  await navigate("/explore", 1100, 1200);
  const exploreState = await evaluate("(() => ({ cards: document.querySelectorAll('.explore-card').length, text: document.body.textContent ?? '' }))()");
  assert(exploreState.cards < 100, "Explore gating/pagination regression rendered an excessive initial result set");

  cdp.close();
  console.log("Round 5 browser verification passed for 390, 820, 1100, and 1440 px layouts; map deep links and keyboard semantics; packet heading; War Clock; Lake Logistics; People and Explore.");
} finally {
  chrome.kill("SIGTERM");
}
