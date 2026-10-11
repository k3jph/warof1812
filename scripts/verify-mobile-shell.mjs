import { mkdir, writeFile } from "node:fs/promises";

// Called by the consent suite on both the running app and the Pages export.
// Real mobile emulation matters: overflow can enlarge its layout viewport and
// move a fixed banner beyond the visual viewport without affecting desktop tests.
export async function verifyMobileShell({ cdp, evaluate, navigate, sleep, assert }) {
  const output = "news-screenshots/mobile-shell";
  await mkdir(output, { recursive: true });
  const cases = [
    { name: "phone-320", width: 320, height: 560 },
    { name: "phone-360", width: 360, height: 640 },
    { name: "phone-390", width: 390, height: 700 },
    { name: "phone-430", width: 430, height: 740 },
    { name: "landscape", width: 667, height: 320 },
    { name: "short-viewport", width: 390, height: 240 },
    // A portable wider face catches the unbreakable footer-domain regression
    // without assuming the runner has the same Georgia font as an iPhone.
    { name: "wide-font-300", width: 300, height: 600, wideFont: true },
    { name: "wide-font-320", width: 320, height: 560, wideFont: true },
    { name: "large-consent-text", width: 320, height: 480, largeText: true },
    { name: "desktop", width: 1440, height: 900, mobile: false },
  ];
  const report = [];
  const screenshot = async (name) => {
    const shot = await cdp.send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
    await writeFile(`${output}/${name}.png`, Buffer.from(shot.data, "base64"));
  };
  const pageWidth = () => evaluate("Math.max(document.documentElement.scrollWidth, document.body.scrollWidth)");

  for (const test of cases) {
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: test.width, height: test.height, deviceScaleFactor: 1,
      mobile: test.mobile !== false,
    });
    await cdp.send("Network.clearBrowserCookies");
    await navigate("/");
    let css = "";
    if (test.wideFont) css += ":root { --serif: monospace; }";
    if (test.largeText) css += `
      .gdpr-cookie__eyebrow { font-size: 1.3rem; }
      .gdpr-cookie .gdpr-cookie__title { font-size: 2.8rem; }
      .gdpr-cookie .gdpr-cookie__description { font-size: 1.8rem; }
      .gdpr-cookie .gdpr-cookie__more { font-size: 1.56rem; }
      .gdpr-cookie .gdpr-cookie__button { font-size: 1.36rem; }
    `;
    if (css) await evaluate(`(() => {
      const style = document.createElement('style');
      style.textContent = ${JSON.stringify(css)};
      document.head.append(style);
    })()`);
    await evaluate("document.fonts.ready.then(() => true)");
    await sleep(250);

    const state = await evaluate(`(() => {
      const banner = document.querySelector('#gdpr-cookie');
      const box = banner.getBoundingClientRect();
      const mark = document.querySelector('.publisher-mark').getBoundingClientRect();
      const hero = document.querySelector('.hero-copy');
      const digit = hero.querySelector('h1 span:last-child').getBoundingClientRect();
      return {
        width: document.documentElement.clientWidth, innerWidth: window.innerWidth,
        visualWidth: window.visualViewport.width, visualHeight: window.visualViewport.height,
        scrollWidth: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
        banner: { left: box.left, top: box.top, right: box.right, bottom: box.bottom,
          scrollWidth: banner.scrollWidth, clientWidth: banner.clientWidth,
          scrollHeight: banner.scrollHeight, clientHeight: banner.clientHeight },
        footerRight: mark.right,
        digitsFit: digit.right <= hero.getBoundingClientRect().right - parseFloat(getComputedStyle(hero).paddingRight) + 1,
        visible: !banner.hidden && banner.getAttribute('aria-hidden') === 'false',
        googleScripts: [...document.scripts].filter(script => script.src.includes('googletagmanager.com/gtag/js')).length,
        analyticsLoaded: window.cookieStatus().analyticsLoaded,
        overflowMasked: ['hidden', 'clip'].includes(getComputedStyle(document.documentElement).overflowX)
          || ['hidden', 'clip'].includes(getComputedStyle(document.body).overflowX),
      };
    })()`);
    const label = `${test.name}: ${JSON.stringify(state)}`;
    if (test.mobile !== false) {
      assert(state.width === test.width && Math.abs(state.visualWidth - test.width) < 1, `Unexpected mobile viewport: ${label}`);
    } else {
      // Desktop scrollbars consume layout width; mobile uses overlay scrollbars.
      assert(state.width > 0 && state.width <= test.width && state.innerWidth === test.width
        && Math.abs(state.visualWidth - state.width) < 1, `Unexpected desktop viewport: ${label}`);
    }
    assert(state.innerWidth <= test.width + 1 && state.scrollWidth <= state.width + 1, `Page overflows horizontally: ${label}`);
    assert(!state.overflowMasked, "Do not hide page-wide overflow instead of fixing its source");
    assert(state.footerRight <= state.width + 1, `Footer expands viewport: ${label}`);
    if (test.width <= 620) assert(state.digitsFit, `Hero digits are clipped: ${label}`);
    assert(state.visible && !state.analyticsLoaded && state.googleScripts === 0, `Initial consent state changed: ${label}`);
    assert(state.banner.left >= -1 && state.banner.right <= state.width + 1, `Consent is wider than screen: ${label}`);
    assert(state.banner.top >= 0 && state.banner.bottom <= state.visualHeight + 1, `Consent is outside visible screen: ${label}`);
    assert(state.banner.scrollWidth <= state.banner.clientWidth + 1, `Consent content overflows sideways: ${label}`);
    await screenshot(`${test.name}-notice`);

    // Keyboard focus must reveal each complete button inside the scroll panel.
    // Hit testing also catches an overlay or browser edge covering the target.
    for (const choice of ["reject", "accept"]) {
      await evaluate(`document.querySelector('[data-cookie-${choice}]').focus()`);
      await sleep(50);
      const button = await evaluate(`(() => {
        const button = document.querySelector('[data-cookie-${choice}]');
        const box = button.getBoundingClientRect();
        const banner = document.querySelector('#gdpr-cookie').getBoundingClientRect();
        return { left: box.left, top: box.top, right: box.right, bottom: box.bottom,
          focused: document.activeElement === button,
          insidePanel: box.top >= banner.top + 5 && box.bottom <= banner.bottom,
          hit: document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2) === button };
      })()`);
      assert(button.focused && button.insidePanel && button.hit, `Unreachable ${choice} button on ${test.name}: ${JSON.stringify(button)}`);
      assert(button.left >= 0 && button.right <= state.width && button.top >= 0 && button.bottom <= test.height, `Clipped ${choice} button on ${test.name}`);
    }
    await screenshot(`${test.name}-choices`);
    await evaluate("document.querySelector('[data-cookie-reject]').click()");
    await sleep(250);
    assert(await evaluate("document.querySelector('#gdpr-cookie').hidden && window.cookieStatus().decision === 'rejected' && !window.cookieStatus().analyticsLoaded"), `Rejection failed on ${test.name}`);
    assert(await pageWidth() <= state.width + 1, `Overflow remains with consent dismissed on ${test.name}`);
    await screenshot(`${test.name}-dismissed`);
    await evaluate("document.querySelector('[data-cookie-preferences]').focus(); document.querySelector('[data-cookie-preferences]').click()");
    await sleep(250);
    assert(await evaluate("!document.querySelector('#gdpr-cookie').hidden && document.activeElement === document.querySelector('[data-cookie-reject]')"), `Reopened consent lost keyboard focus on ${test.name}`);
    report.push({ name: test.name, width: test.width, height: test.height, ...state, choicesReachable: true, rejection: true, reopen: true });
  }
  await writeFile(`${output}/verification.json`, JSON.stringify(report, null, 2));
  return report;
}
