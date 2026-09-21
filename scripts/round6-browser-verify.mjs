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
  "--remote-debugging-port=9223",
  "--user-data-dir=/tmp/war1812-round6-chrome",
  "about:blank",
], { stdio:["ignore","pipe","pipe"] });

try {
  let version;
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      const response = await fetch("http://127.0.0.1:9223/json/version");
      if (response.ok) { version = await response.json(); break; }
    } catch {}
    await sleep(200);
  }
  assert(version, "Chrome DevTools endpoint did not start");

  const create = await fetch("http://127.0.0.1:9223/json/new?" + encodeURIComponent("about:blank"), { method:"PUT" });
  assert(create.ok, "Could not create Chrome target");
  const target = await create.json();
  const cdp = new Cdp(target.webSocketDebuggerUrl);
  await cdp.open();
  await cdp.send("Page.enable");
  await cdp.send("Runtime.enable");
  await mkdir("round6-screenshots", { recursive:true });

  const evaluate = async (expression) => {
    const result = await cdp.send("Runtime.evaluate", { expression, returnByValue:true, awaitPromise:true });
    if (result.exceptionDetails) throw new Error("Browser evaluation failed: " + result.exceptionDetails.text);
    return result.result.value;
  };

  const navigate = async (path, width = 1100, height = 1000, settle = 20) => {
    await cdp.send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor:1, mobile:false });
    const loaded = cdp.once("Page.loadEventFired");
    await cdp.send("Page.navigate", { url:new URL(path, baseUrl).toString() });
    await loaded;
    if (settle) await sleep(settle);
  };

  const screenshot = async (name) => {
    const result = await cdp.send("Page.captureScreenshot", { format:"png", captureBeyondViewport:false });
    await writeFile("round6-screenshots/" + name + ".png", Buffer.from(result.data, "base64"));
  };

  const sitemapText = await (await fetch(new URL("/sitemap.xml", baseUrl))).text();
  const canonicalPaths = [...sitemapText.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
  assert(canonicalPaths.length > 100, "Sitemap unexpectedly small for contrast audit");

  const contrastExpression = "(() => {" +
    "const parse=(value)=>{" +
      "const rgb=value.match(/^rgba?\\(([^)]+)\\)$/);if(rgb){const parts=rgb[1].split(/[ ,/]+/).filter(Boolean).map(Number);return [parts[0],parts[1],parts[2],parts[3]??1];}" +
      "const srgb=value.match(/^color\\(srgb\\s+([^)]+)\\)$/);if(srgb){const raw=srgb[1].split(/[ /]+/).filter(Boolean).map(Number);return [raw[0]*255,raw[1]*255,raw[2]*255,raw[3]??1];}" +
      "return [0,0,0,0];" +
    "};" +
    "const over=(fg,bg)=>{const a=fg[3]+bg[3]*(1-fg[3]);if(a===0)return [0,0,0,0];return [(fg[0]*fg[3]+bg[0]*bg[3]*(1-fg[3]))/a,(fg[1]*fg[3]+bg[1]*bg[3]*(1-fg[3]))/a,(fg[2]*fg[3]+bg[2]*bg[3]*(1-fg[3]))/a,a];};" +
    "const background=(el)=>{const layers=[];for(let node=el;node;node=node.parentElement){const bg=parse(getComputedStyle(node).backgroundColor);if(bg[3]>0){layers.push(bg);if(bg[3]>=.999)break;}}let result=[255,255,255,1];for(let i=layers.length-1;i>=0;i--)result=over(layers[i],result);return result;};" +
    "const linear=(v)=>{v/=255;return v<=.04045?v/12.92:Math.pow((v+.055)/1.055,2.4);};" +
    "const lum=(rgb)=>.2126*linear(rgb[0])+.7152*linear(rgb[1])+.0722*linear(rgb[2]);" +
    "const ratio=(a,b)=>{const x=lum(a),y=lum(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);};" +
    "return [...document.querySelectorAll('.section-kicker')].map((el)=>{const bg=background(el);const raw=parse(getComputedStyle(el).color);const fg=raw[3]<1?over(raw,bg):raw;return {text:(el.textContent||'').trim(),foreground:getComputedStyle(el).color,background:bg.slice(0,3).map(Math.round).join(','),ratio:ratio(fg,bg)};});" +
  "})()";

  let kickerCount = 0;
  let worst = { ratio:Infinity, path:"", text:"", foreground:"", background:"" };
  const contrastFailures = [];
  for (const path of canonicalPaths) {
    await navigate(path, 1100, 900, 0);
    const kickers = await evaluate(contrastExpression);
    for (const kicker of kickers) {
      kickerCount += 1;
      if (kicker.ratio < worst.ratio) worst = { ...kicker, path };
      if (kicker.ratio < 4.5) contrastFailures.push({ ...kicker, path });
    }
  }
  assert(kickerCount > 100, "Contrast audit found too few section kickers");
  assert(contrastFailures.length === 0, "Section-kicker contrast failures: " + JSON.stringify(contrastFailures.slice(0,20)));

  const packetPaths = canonicalPaths.filter((path) => path.startsWith("/edition/"));
  assert(packetPaths.length === 19, "Expected 19 standalone documentary packets, found " + packetPaths.length);
  const headingFailures = [];
  for (const path of packetPaths) {
    await navigate(path, 1100, 1000, 0);
    const outline = await evaluate("([...document.querySelectorAll('main h1, main h2, main h3, main h4, main h5, main h6')].map((h)=>({level:Number(h.tagName.slice(1)),text:(h.textContent||'').trim()})))");
    const h1s = outline.filter((item) => item.level === 1);
    let previous = 0;
    let jump = false;
    for (const item of outline) {
      if (previous && item.level > previous + 1) jump = true;
      previous = item.level;
    }
    if (h1s.length !== 1 || outline[0]?.level !== 1 || jump) headingFailures.push({ path, outline });
  }
  assert(headingFailures.length === 0, "Documentary heading hierarchy failures: " + JSON.stringify(headingFailures));

  const expectedExcerptLengths = {
    "cochrane-proclamation":480,
    "treaty-fort-jackson":375,
    "jackson-free-men-color":338,
    "baltimore-riot-narrative":328,
    "madison-war-message":319,
    "porter-madisons-island":265,
    "treaty-ghent-article-one":229,
    "british-war-aims-1814":218,
    "brown-chippawa-report":211,
    "rush-bagot-notes":194,
    "lawrence-last-command":183,
    "mclure-newark-report":171,
    "macdonough-victory-report":154,
    "embargo-act-1807":142,
    "defence-fort-mhenry":108,
    "lake-ontario-return":102,
    "perry-dispatch":90,
    "hull-proclamation":79,
    "dolley-madison-letter":75,
  };

  let longFont = 0;
  let shortFont = 0;
  let longestHeight = 0;
  for (const width of [390, 1440]) {
    for (const [slug, expectedLength] of Object.entries(expectedExcerptLengths)) {
      await navigate("/edition/" + slug, width, 1200, 0);
      const state = await evaluate("(() => {const pair=document.querySelector('.transcription-pair');const quote=pair?.querySelector('article:first-child blockquote');return {docWidth:Math.max(document.documentElement.scrollWidth,document.body.scrollWidth),clientWidth:document.documentElement.clientWidth,textLength:(quote?.textContent||'').length,pairClass:pair?.className||'',fontSize:quote?parseFloat(getComputedStyle(quote).fontSize):0,height:quote?.getBoundingClientRect().height||0};})()");
      assert(state.docWidth <= state.clientWidth + 1, "Documentary overflow on " + slug + " at " + width + "px");
      assert(state.textLength === expectedLength, "Excerpt text changed or truncated for " + slug + ": " + state.textLength + " != " + expectedLength);
      if (slug === "cochrane-proclamation" && width === 1440) {
        assert(state.pairClass.includes("excerpt-long"), "Longest packet is not using long-excerpt typography");
        longFont = state.fontSize;
        longestHeight = state.height;
        assert(state.height < 800, "Cochrane excerpt remains billboard-height: " + state.height);
      }
      if (slug === "dolley-madison-letter" && width === 1440) {
        assert(state.pairClass.includes("excerpt-short"), "Shortest packet lost short-excerpt treatment");
        shortFont = state.fontSize;
      }
    }
  }
  assert(shortFont > longFont, "Short and long excerpts do not have meaningfully different typography");

  for (const id of ["nuku-hiva","treaty-ghent"]) {
    await navigate("/map?event=" + id, 390, 900, 150);
    const state = await evaluate("(() => {const target=document.querySelector('[data-selected-event-record=\"" + id + "\"]');const rect=target?.getBoundingClientRect();const style=target?getComputedStyle(target):null;return {focused:document.activeElement===target,top:rect?.top??9999,bottom:rect?.bottom??9999,outline:style?.outlineStyle||'none',outlineWidth:style?.outlineWidth||'0px'};})()");
    assert(state.focused, "Deep-linked off-frame event did not receive focus: " + id);
    assert(state.top >= 0 && state.top < 220, "Deep-linked off-frame event is not immediately visible on mobile: " + id + " top=" + state.top);
    assert(state.outline !== "none" && state.outlineWidth !== "0px", "Focused off-frame event lacks visible focus: " + id);
    await screenshot("map-" + id + "-390");
  }

  await navigate("/map", 390, 900, 50);
  const pointerReady = await evaluate("(() => {const button=[...document.querySelectorAll('.gis-off-frame button')].find((el)=>(el.textContent||'').includes('Nuku Hiva'));if(!button)return false;button.scrollIntoView({block:'center'});button.click();return true;})()");
  assert(pointerReady, "Could not locate Pacific off-frame event button");
  await sleep(100);
  assert(await evaluate("document.activeElement?.getAttribute('data-selected-event-record') === 'nuku-hiva'"), "Pointer selection did not move focus to Pacific event record");

  await navigate("/map", 390, 900, 50);
  const ghentButton = await evaluate("(() => {const button=[...document.querySelectorAll('.gis-off-frame button')].find((el)=>(el.textContent||'').includes('Treaty of Ghent'));if(!button)return false;button.scrollIntoView({block:'center'});button.focus();return document.activeElement===button;})()");
  assert(ghentButton, "Could not focus Ghent off-frame event button");
  await cdp.send("Input.dispatchKeyEvent", { type:"keyDown", key:"Enter", code:"Enter", windowsVirtualKeyCode:13 });
  await cdp.send("Input.dispatchKeyEvent", { type:"keyUp", key:"Enter", code:"Enter", windowsVirtualKeyCode:13 });
  await sleep(100);
  assert(await evaluate("document.activeElement?.getAttribute('data-selected-event-record') === 'treaty-ghent'"), "Keyboard selection did not move focus to Ghent event record");

  await navigate("/story/everything-changes", 1100, 1200, 0);
  const chapterWords = await evaluate("(() => {const article=document.querySelector('.chapter-body');const paras=[...article.querySelectorAll(':scope > section > div:last-child > p')].filter((p)=>!p.classList.contains('section-source-route'));return paras.map((p)=>p.textContent||'').join(' ').trim().split(/\\s+/).filter(Boolean).length;})()");
  assert(chapterWords >= 1450, "Rendered everything-changes remains too thin: " + chapterWords + " words");

  const visualRoutes = [
    "/",
    "/interactives",
    "/lake-logistics",
    "/edition",
    "/edition/cochrane-proclamation",
    "/map?event=nuku-hiva",
    "/map?event=treaty-ghent",
  ];
  for (const width of [390,820,1100,1440]) {
    for (const path of visualRoutes) {
      await navigate(path, width, 1100, 100);
      const dimensions = await evaluate("({scroll:Math.max(document.documentElement.scrollWidth,document.body.scrollWidth),client:document.documentElement.clientWidth})");
      assert(dimensions.scroll <= dimensions.client + 1, "Horizontal overflow on " + path + " at " + width + "px");
      const name = path.replace(/^\//,"").replaceAll("/","-").replaceAll("?","-").replaceAll("=","-") || "home";
      await screenshot(name + "-" + width);
    }
  }

  console.log(JSON.stringify({
    canonicalRoutesAudited:canonicalPaths.length,
    kickerInstances:kickerCount,
    worstKickerContrast:worst,
    documentaryPackets:packetPaths.length,
    longestExcerpt:{slug:"cochrane-proclamation",fontSizePx:longFont,heightPx:longestHeight},
    shortestExcerpt:{slug:"dolley-madison-letter",fontSizePx:shortFont},
    everythingChangesRenderedParagraphWords:chapterWords,
    offFrameMobile:["nuku-hiva","treaty-ghent"],
    widths:[390,820,1100,1440],
  }, null, 2));

  cdp.close();
} finally {
  chrome.kill("SIGTERM");
}
