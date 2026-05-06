// Playwright audit v1 — Integrity Electric site
// Runs against live Vercel URL. Captures screenshots, anchor walks, asset
// integrity, console errors, network failures, meta/schema dumps. Emits
// findings.json + screenshots/. findings.md is hand-authored from the JSON.

import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const URL = "https://integrity-electric-grm.vercel.app";
const SHOTS = path.join(__dirname, "screenshots");
fs.mkdirSync(SHOTS, { recursive: true });

const findings = {
  url: URL,
  ran_at: new Date().toISOString(),
  desktop: {},
  mobile: {},
  meta: {},
  schema: {},
  console: { desktop: [], mobile: [] },
  network: { desktop: [], mobile: [] },
  anchors: {},
  assets: {},
  faq: {},
  contrast: {},
};

const browser = await chromium.launch();

// =========================================================================
// DESKTOP PASS (1440x900)
// =========================================================================
{
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();

  page.on("console", (m) => {
    if (["error", "warning"].includes(m.type())) {
      findings.console.desktop.push({ type: m.type(), text: m.text() });
    }
  });
  page.on("response", (r) => {
    const status = r.status();
    if (status >= 400) {
      findings.network.desktop.push({ url: r.url(), status });
    }
  });

  await page.goto(URL, { waitUntil: "networkidle" });

  // Meta + schema dump
  findings.meta = await page.evaluate(() => {
    const grab = (sel, attr = "content") =>
      document.querySelector(sel)?.getAttribute(attr) ?? null;
    return {
      title: document.title,
      description: grab('meta[name="description"]'),
      canonical: grab('link[rel="canonical"]', "href"),
      og_title: grab('meta[property="og:title"]'),
      og_description: grab('meta[property="og:description"]'),
      og_image: grab('meta[property="og:image"]'),
      og_url: grab('meta[property="og:url"]'),
      og_type: grab('meta[property="og:type"]'),
      twitter_card: grab('meta[name="twitter:card"]'),
      twitter_title: grab('meta[name="twitter:title"]'),
      favicon: grab('link[rel="icon"]', "href"),
      apple_touch: grab('link[rel="apple-touch-icon"]', "href"),
      viewport: grab('meta[name="viewport"]'),
      lang: document.documentElement.lang,
    };
  });

  const ld = await page.evaluate(() => {
    const s = document.querySelector('script[type="application/ld+json"]');
    if (!s) return null;
    try {
      return JSON.parse(s.textContent);
    } catch (e) {
      return { parse_error: String(e), raw: s.textContent?.slice(0, 200) };
    }
  });
  findings.schema = ld;

  // Heading hierarchy
  findings.desktop.headings = await page.$$eval(
    "h1,h2,h3,h4,h5,h6",
    (hs) => hs.map((h) => ({ tag: h.tagName, text: h.textContent?.trim().slice(0, 100) }))
  );

  // Asset integrity: every img element loaded
  findings.assets.images = await page.$$eval("img", (imgs) =>
    imgs.map((i) => ({
      src: i.src,
      alt: i.alt,
      naturalWidth: i.naturalWidth,
      naturalHeight: i.naturalHeight,
      loaded: i.complete && i.naturalWidth > 0,
    }))
  );

  // Data-slot inventory (verify pack slots all present)
  findings.desktop.data_slots = await page.$$eval(
    "[data-slot]",
    (els) => els.map((e) => e.getAttribute("data-slot"))
  );

  // Computed contrast probe on key CTAs
  findings.contrast.desktop = await page.evaluate(() => {
    const probe = (sel, label) => {
      const el = document.querySelector(sel);
      if (!el) return { label, found: false };
      const cs = getComputedStyle(el);
      return {
        label,
        found: true,
        color: cs.color,
        backgroundColor: cs.backgroundColor,
        fontSize: cs.fontSize,
        fontFamily: cs.fontFamily,
      };
    };
    return [
      probe(".nav-cta", "nav-cta"),
      probe(".btn-primary", "hero-cta-primary"),
      probe(".btn-secondary", "hero-cta-secondary"),
      probe(".sticky-call", "sticky-call (hidden on desktop)"),
      probe(".phone-num", "contact-phone-num"),
    ];
  });

  // Above-fold screenshot
  await page.screenshot({
    path: path.join(SHOTS, "01-desktop-above-fold.png"),
    fullPage: false,
  });

  // Full-page screenshot
  await page.screenshot({
    path: path.join(SHOTS, "02-desktop-full.png"),
    fullPage: true,
  });

  // Per-section screenshots
  for (const [n, sel] of [
    ["03-desktop-hero", ".hero"],
    ["04-desktop-trust", ".trust"],
    ["05-desktop-services", "#services"],
    ["06-desktop-proof", "#proof"],
    ["07-desktop-about", "#about"],
    ["08-desktop-faq", "#faq"],
    ["09-desktop-contact", "#contact"],
    ["10-desktop-footer", "footer.footer"],
  ]) {
    const el = await page.$(sel);
    if (el) {
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(150);
      await el.screenshot({ path: path.join(SHOTS, `${n}.png`) });
    }
  }

  // Anchor walks
  for (const id of ["services", "proof", "about", "faq", "contact", "top"]) {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(100);
    await page.click(`a[href="#${id}"]`);
    await page.waitForTimeout(500);
    findings.anchors[`#${id}`] = await page.evaluate((id) => {
      const t = document.getElementById(id);
      const rect = t?.getBoundingClientRect();
      return {
        scrollY: window.scrollY,
        targetTop: rect?.top ?? null,
        targetVisibleY: rect ? rect.top + window.scrollY : null,
        delta: rect ? Math.round(window.scrollY - (rect.top + window.scrollY - rect.top)) : null,
      };
    }, id);
  }

  // FAQ accordion test
  await page.evaluate(() =>
    document.querySelector(".faq-item summary")?.scrollIntoView({ block: "center" })
  );
  await page.waitForTimeout(150);
  await page.screenshot({
    path: path.join(SHOTS, "11-desktop-faq-collapsed.png"),
    fullPage: false,
  });
  await page.click(".faq-item summary");
  await page.waitForTimeout(300);
  findings.faq.desktop_q1_open = await page.$eval(
    ".faq-item",
    (el) => el.hasAttribute("open")
  );
  await page.screenshot({
    path: path.join(SHOTS, "12-desktop-faq-q1-open.png"),
    fullPage: false,
  });

  // Open all FAQs
  for (const sel of [
    ".faq-list .faq-item:nth-child(2) summary",
    ".faq-list .faq-item:nth-child(3) summary",
    ".faq-list .faq-item:nth-child(4) summary",
  ]) {
    await page.click(sel).catch(() => {});
    await page.waitForTimeout(150);
  }
  await page.screenshot({
    path: path.join(SHOTS, "13-desktop-faq-all-open.png"),
    fullPage: false,
  });

  // Skip-link focus
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.keyboard.press("Tab");
  await page.waitForTimeout(150);
  await page.screenshot({
    path: path.join(SHOTS, "14-desktop-skiplink-focused.png"),
    fullPage: false,
  });

  await ctx.close();
}

// =========================================================================
// MOBILE PASS (375x812 — iPhone X-ish)
// =========================================================================
{
  const ctx = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
  });
  const page = await ctx.newPage();

  page.on("console", (m) => {
    if (["error", "warning"].includes(m.type())) {
      findings.console.mobile.push({ type: m.type(), text: m.text() });
    }
  });
  page.on("response", (r) => {
    const status = r.status();
    if (status >= 400) {
      findings.network.mobile.push({ url: r.url(), status });
    }
  });

  await page.goto(URL, { waitUntil: "networkidle" });

  findings.mobile.headings = await page.$$eval(
    "h1,h2,h3,h4,h5,h6",
    (hs) => hs.map((h) => ({ tag: h.tagName, text: h.textContent?.trim().slice(0, 100) }))
  );

  findings.contrast.mobile = await page.evaluate(() => {
    const probe = (sel, label) => {
      const el = document.querySelector(sel);
      if (!el) return { label, found: false };
      const cs = getComputedStyle(el);
      return {
        label,
        found: true,
        color: cs.color,
        backgroundColor: cs.backgroundColor,
        display: cs.display,
        fontSize: cs.fontSize,
      };
    };
    return [
      probe(".nav-cta", "nav-cta"),
      probe(".sticky-call", "sticky-call (must be visible on mobile)"),
      probe(".nav-links", "nav-links (should be hidden on mobile)"),
    ];
  });

  await page.screenshot({
    path: path.join(SHOTS, "20-mobile-above-fold.png"),
    fullPage: false,
  });
  await page.screenshot({
    path: path.join(SHOTS, "21-mobile-full.png"),
    fullPage: true,
  });

  for (const [n, sel] of [
    ["22-mobile-hero", ".hero"],
    ["23-mobile-trust", ".trust"],
    ["24-mobile-services", "#services"],
    ["25-mobile-proof", "#proof"],
    ["26-mobile-about", "#about"],
    ["27-mobile-faq", "#faq"],
    ["28-mobile-contact", "#contact"],
    ["29-mobile-footer", "footer.footer"],
  ]) {
    const el = await page.$(sel);
    if (el) {
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(150);
      await el.screenshot({ path: path.join(SHOTS, `${n}.png`) });
    }
  }

  // Verify sticky call bar is visible
  await page.evaluate(() => window.scrollTo(0, 800));
  await page.waitForTimeout(200);
  await page.screenshot({
    path: path.join(SHOTS, "30-mobile-sticky-call-visible.png"),
    fullPage: false,
  });

  await ctx.close();
}

await browser.close();

// =========================================================================
// EMIT
// =========================================================================
fs.writeFileSync(
  path.join(__dirname, "findings.json"),
  JSON.stringify(findings, null, 2)
);

console.log("Audit complete.");
console.log("Console errors (desktop):", findings.console.desktop.length);
console.log("Console errors (mobile):", findings.console.mobile.length);
console.log("Network 4xx/5xx (desktop):", findings.network.desktop.length);
console.log("Network 4xx/5xx (mobile):", findings.network.mobile.length);
console.log("Anchor walks:", Object.keys(findings.anchors).length);
console.log("Images probed:", findings.assets.images?.length ?? 0);
console.log(
  "Images failing to load:",
  findings.assets.images?.filter((i) => !i.loaded).length ?? 0
);
console.log("data-slot count:", findings.desktop.data_slots?.length);
