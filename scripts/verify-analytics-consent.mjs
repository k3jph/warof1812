import { spawn } from "node:child_process";

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
      this.ws.addEventListener("open", resolve, { once:true });
      this.ws.addEventListener("error", reject, { once:true });
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
      waiters.shift()(message.params);
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
  "--remote-debugging-port=9225",
  "--user-data-dir=/tmp/war1812-consent-chrome",
  "about:blank",
], { stdio:["ignore","pipe","pipe"] });

try {
  let version;
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      const response = await fetch("http://127.0.0.1:9225/json/version");
      if (response.ok) { version = await response.json(); break; }
    } catch {}
    await sleep(200);
  }
  assert(version, "Chrome DevTools endpoint did not start");

  const create = await fetch("http://127.0.0.1:9225/json/new?" + encodeURIComponent("about:blank"), { method:"PUT" });
  assert(create.ok, "Could not create Chrome target");
  const target = await create.json();
  const cdp = new Cdp(target.webSocketDebuggerUrl);
  await cdp.open();
  await cdp.send("Page.enable");
  await cdp.send("Runtime.enable");
  await cdp.send("Network.enable");

  const evaluate = async (expression) => {
    const result = await cdp.send("Runtime.evaluate", { expression, returnByValue:true, awaitPromise:true });
    if (result.exceptionDetails) throw new Error("Browser evaluation failed: " + result.exceptionDetails.text);
    return result.result.value;
  };

  const navigate = async (path) => {
    const loaded = cdp.once("Page.loadEventFired");
    await cdp.send("Page.navigate", { url:new URL(path, baseUrl).toString() });
    await loaded;
    for (let attempt = 0; attempt < 30; attempt += 1) {
      const ready = await evaluate("typeof window.cookieStatus === 'function'");
      if (ready) break;
      await sleep(50);
    }
    assert(await evaluate("typeof window.cookieStatus === 'function'"), "Consent manager did not initialize on " + path);
  };

  await cdp.send("Network.clearBrowserCookies");
  await navigate("/");

  const initial = await evaluate(`(() => ({
    bannerVisible: !document.querySelector("#gdpr-cookie")?.hidden && document.querySelector("#gdpr-cookie")?.getAttribute("aria-hidden") === "false",
    googleScripts: [...document.scripts].filter((script) => script.src.includes("googletagmanager.com/gtag/js")).length,
    status: window.cookieStatus(),
    privacyLink: Boolean(document.querySelector('#gdpr-cookie a[href="/privacy"]')),
    footerSettings: Boolean(document.querySelector('[data-cookie-preferences]')),
    cookie: decodeURIComponent(document.cookie),
  }))()`);
  assert(initial.bannerVisible, "Consent banner is not visible before a choice");
  assert(initial.googleScripts === 0, "Google Analytics loaded before consent");
  assert(initial.status.decision === null && initial.status.analyticsLoaded === false, "Initial consent state is not undecided");
  assert(initial.privacyLink && initial.footerSettings, "Privacy or Cookie settings controls are missing");

  await evaluate("document.querySelector('[data-cookie-reject]').click()");
  await sleep(50);
  const rejected = await evaluate(`(() => ({
    hidden: document.querySelector("#gdpr-cookie")?.hidden,
    googleScripts: [...document.scripts].filter((script) => script.src.includes("googletagmanager.com/gtag/js")).length,
    status: window.cookieStatus(),
    cookie: decodeURIComponent(document.cookie),
  }))()`);
  assert(rejected.status.decision === "rejected", "Reject did not persist");
  assert(rejected.googleScripts === 0 && rejected.status.analyticsLoaded === false, "Reject loaded Analytics");
  assert(rejected.cookie.includes("cookieConsent=rejected:1"), "Rejected consent cookie is missing");

  await evaluate("document.querySelector('[data-cookie-preferences]').click()");
  await sleep(30);
  assert(await evaluate("!document.querySelector('#gdpr-cookie').hidden"), "Cookie settings did not reopen the banner");

  await evaluate("document.querySelector('[data-cookie-accept]').click()");
  await sleep(100);
  const accepted = await evaluate(`(() => ({
    googleScripts: [...document.scripts].filter((script) => script.src.includes("googletagmanager.com/gtag/js?id=G-FSDET4HG4L")).length,
    status: window.cookieStatus(),
    cookie: decodeURIComponent(document.cookie),
    gaDisabled: window["ga-disable-G-FSDET4HG4L"],
  }))()`);
  assert(accepted.status.decision === "accepted" && accepted.status.analyticsLoaded === true, "Accept did not enable Analytics");
  assert(accepted.googleScripts === 1, "Expected one GA4 loader for G-FSDET4HG4L");
  assert(accepted.cookie.includes("cookieConsent=accepted:1"), "Accepted consent cookie is missing");
  assert(accepted.gaDisabled === false, "GA disable flag remained set after acceptance");

  await navigate("/privacy");
  const privacy = await evaluate(`(() => ({
    h1: document.querySelector("main h1")?.textContent?.trim(),
    hasId: document.body.textContent?.includes("G-FSDET4HG4L"),
    status: window.cookieStatus(),
    googleScripts: [...document.scripts].filter((script) => script.src.includes("googletagmanager.com/gtag/js?id=G-FSDET4HG4L")).length,
  }))()`);
  assert(privacy.h1 === "Privacy & Cookie Notice", "Privacy notice route is missing");
  assert(privacy.hasId, "Privacy notice does not identify the Analytics property");
  assert(privacy.status.decision === "accepted" && privacy.googleScripts === 1, "Accepted consent did not persist across navigation");

  await evaluate("document.querySelector('[data-cookie-preferences]').click()");
  await sleep(30);
  await evaluate("document.querySelector('[data-cookie-reject]').click()");
  await sleep(50);
  const withdrawn = await evaluate(`(() => ({
    status: window.cookieStatus(),
    gaDisabled: window["ga-disable-G-FSDET4HG4L"],
    analyticsCookies: document.cookie.split(";").map((entry) => entry.trim().split("=")[0]).filter((name) => name === "_ga" || name.startsWith("_ga_")),
  }))()`);
  assert(withdrawn.status.decision === "rejected", "Withdrawal did not change consent to rejected");
  assert(withdrawn.gaDisabled === true, "Withdrawal did not disable GA");
  assert(withdrawn.analyticsCookies.length === 0, "Withdrawal left Analytics cookies behind");

  console.log(JSON.stringify({
    measurementId:"G-FSDET4HG4L",
    beforeConsent:{analyticsLoaded:false,googleScriptRequests:0},
    reject:{decision:"rejected",analyticsLoaded:false},
    accept:{decision:"accepted",analyticsLoaded:true,googleLoaderCount:1},
    persistence:"passed",
    withdrawal:"passed",
    privacyRoute:"passed",
  }, null, 2));

  cdp.close();
} finally {
  chrome.kill("SIGTERM");
}
