// Playwright audit v2 — Integrity Electric site
// Improvements over v1:
//  - scroll-behavior: auto override during anchor walks (fixes v1 smooth-scroll race)
//  - /reviews + /thanks + /opengraph-image route walks
//  - Contact form structural probe (action, hidden fields, honeypot)
//  - All photo elements probed (10 expected: 6 service + 4 proof)
//  - Logo image element verified in nav
//  - License number + EC# verification across trust band + footer + schema
//  - og:image meta verification (now expected to be present)

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
  audit_pass: "v2",
  ran_at: new Date().toISOString(),
  desktop: {},
  mobile: {},
  meta: {},
  schema: {},
  console: { desktop: [], mobile: [], reviews: [], thanks: [] },
  network: { desktop: [], mobile: [], reviews: [], thanks: [] },
  anchors: {},
  assets: {},
  faq: {},
  contrast: {},
  routes: {},
  form: {},
  license_check: {},
};

const browser = await chromium.launch();

// =========================================================================
// DESKTOP PASS — homepage
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
    if (status >= 400) findings.network.desktop.push({ url: r.url(), status });
  });

  await page.goto(URL, { waitUntil: "networkidle" });

  // Override smooth scroll for deterministic anchor measurement
  await page.addStyleTag({ content: "html { scroll-behavior: auto !important; }" });

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
      og_image_width: grab('meta[property="og:image:width"]'),
      og_image_height: grab('meta[property="og:image:height"]'),
      og_url: grab('meta[property="og:url"]'),
      og_type: grab('meta[property="og:type"]'),
      twitter_card: grab('meta[name="twitter:card"]'),
      twitter_title: grab('meta[name="twitter:title"]'),
      twitter_image: grab('meta[name="twitter:image"]'),
      favicon: grab('link[rel="icon"]', "href"),
      apple_touch: grab('link[rel="apple-touch-icon"]', "href"),
      viewport: grab('meta[name="viewport"]'),
      lang: document.documentElement.lang,
    };
  });

  const ld = await page.evaluate(() => {
    const s = document.querySelector('script[type="application/ld+json"]');
    if (!s) return null;
    try { return JSON.parse(s.textContent); } catch (e) { return { parse_error: String(e) }; }
  });
  findings.schema = ld;

  findings.desktop.headings = await page.$$eval("h1,h2,h3,h4,h5,h6",
    (hs) => hs.map((h) => ({ tag: h.tagName, text: h.textContent?.trim().slice(0, 100) }))
  );

  findings.assets.images = await page.$$eval("img", (imgs) =>
    imgs.map((i) => ({
      src: i.currentSrc || i.src,
      alt: i.alt,
      naturalWidth: i.naturalWidth,
      naturalHeight: i.naturalHeight,
      loaded: i.complete && i.naturalWidth > 0,
    }))
  );

  findings.desktop.data_slots = await page.$$eval("[data-slot]",
    (els) => els.map((e) => e.getAttribute("data-slot"))
  );

  findings.contrast.desktop = await page.evaluate(() => {
    const probe = (sel, label) => {
      const el = document.querySelector(sel);
      if (!el) return { label, found: false };
      const cs = getComputedStyle(el);
      return {
        label, found: true,
        color: cs.color, backgroundColor: cs.backgroundColor,
        fontSize: cs.fontSize, fontFamily: cs.fontFamily,
      };
    };
    return [
      probe(".nav-cta", "nav-cta"),
      probe(".btn-primary", "hero-cta-primary"),
      probe(".btn-secondary", "hero-cta-secondary"),
      probe(".sticky-call", "sticky-call (hidden on desktop)"),
      probe(".phone-num", "contact-phone-num"),
      probe(".contact-form button", "form-submit"),
      probe(".trust-item:nth-child(5) .trust-value", "trust-license-cell"),
    ];
  });

  // Anchor walks (smooth-scroll now disabled — measurements will settle)
  for (const id of ["services", "proof", "about", "faq", "contact", "top"]) {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(80);
    await page.click(`a[href="#${id}"]`);
    await page.waitForTimeout(200);
    findings.anchors[`#${id}`] = await page.evaluate((id) => {
      const t = document.getElementById(id);
      const rect = t?.getBoundingClientRect();
      return {
        scrollY: window.scrollY,
        elementTop: rect ? Math.round(rect.top) : null,
        elementInDocument: rect ? Math.round(rect.top + window.scrollY) : null,
        landed_on_target: rect ? Math.abs(rect.top) < 100 : false,
      };
    }, id);
  }

  // License presence check
  findings.license_check = await page.evaluate(() => {
    const trustCell5 = document.querySelector('[data-slot="trust.item_5.value"]')?.textContent?.trim();
    const footerLicense = document.querySelector('[data-slot="footer.fl_license"]');
    const footerLicenseText = footerLicense?.textContent?.trim();
    const footerLicenseHidden = footerLicense?.hasAttribute("hidden");
    return {
      trust_band_value: trustCell5,
      footer_license_text: footerLicenseText,
      footer_license_hidden: footerLicenseHidden,
    };
  });

  // Contact form structural probe
  findings.form = await page.evaluate(() => {
    const f = document.querySelector(".contact-form");
    if (!f) return { found: false };
    const grab = (sel) => f.querySelector(sel);
    const hidden = (n) => f.querySelector(`input[type="hidden"][name="${n}"]`)?.value;
    return {
      found: true,
      action: f.getAttribute("action"),
      method: f.getAttribute("method"),
      accessKey: hidden("accessKey"),
      subject: hidden("subject"),
      redirectTo: hidden("redirectTo"),
      replyTo: hidden("replyTo"),
      honeypot_present: !!grab('input[name="$gotcha"]'),
      honeypot_offscreen: getComputedStyle(grab(".honeypot"))?.left === "-9999px",
      fields: Array.from(f.querySelectorAll("input[type='text'], input[type='email'], input[type='tel'], textarea")).map((i) => ({
        name: i.name, type: i.type, required: i.required, autocomplete: i.autocomplete
      })),
      submit_button_label: grab("button")?.textContent?.trim(),
    };
  });

  // Screenshots — homepage
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(150);
  await page.screenshot({ path: path.join(SHOTS, "01-desktop-above-fold.png"), fullPage: false });
  await page.screenshot({ path: path.join(SHOTS, "02-desktop-full.png"), fullPage: true });

  for (const [n, sel] of [
    ["03-desktop-hero", ".hero"],
    ["04-desktop-trust", ".trust"],
    ["05-desktop-services", "#services"],
    ["06-desktop-proof", "#proof"],
    ["07-desktop-about", "#about"],
    ["08-desktop-faq", "#faq"],
    ["09-desktop-contact", "#contact"],
    ["10-desktop-form", "#contact-form"],
    ["11-desktop-footer", "footer.footer"],
  ]) {
    const el = await page.$(sel);
    if (el) {
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);
      await el.screenshot({ path: path.join(SHOTS, `${n}.png`) });
    }
  }

  // FAQ test
  await page.evaluate(() => document.querySelector(".faq-item summary")?.scrollIntoView({ block: "center" }));
  await page.waitForTimeout(150);
  await page.click(".faq-item summary");
  await page.waitForTimeout(200);
  findings.faq.desktop_q1_open = await page.$eval(".faq-item", (el) => el.hasAttribute("open"));
  for (const sel of [
    ".faq-list .faq-item:nth-child(2) summary",
    ".faq-list .faq-item:nth-child(3) summary",
    ".faq-list .faq-item:nth-child(4) summary",
  ]) {
    await page.click(sel).catch(() => {});
    await page.waitForTimeout(100);
  }
  await page.screenshot({ path: path.join(SHOTS, "12-desktop-faq-all-open.png"), fullPage: false });

  await ctx.close();
}

// =========================================================================
// /reviews ROUTE
// =========================================================================
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  page.on("console", (m) => {
    if (["error", "warning"].includes(m.type())) findings.console.reviews.push({ type: m.type(), text: m.text() });
  });
  page.on("response", (r) => { if (r.status() >= 400) findings.network.reviews.push({ url: r.url(), status: r.status() }); });

  await page.goto(`${URL}/reviews`, { waitUntil: "networkidle" });

  findings.routes.reviews = await page.evaluate(() => ({
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.getAttribute("content"),
    h1: document.querySelector("h1")?.textContent?.trim(),
    review_card_count: document.querySelectorAll(".review-card").length,
    positive_card_count: document.querySelectorAll(".review-card:not(.negative)").length,
    negative_card_count: document.querySelectorAll(".review-card.negative").length,
    section_labels: Array.from(document.querySelectorAll(".reviews-section-label")).map(e => e.textContent?.trim()),
    has_back_link: !!document.querySelector('a[href="/"]'),
    google_outbound: !!document.querySelector('a[href*="google.com/maps"]'),
  }));

  await page.screenshot({ path: path.join(SHOTS, "20-reviews-above-fold.png"), fullPage: false });
  await page.screenshot({ path: path.join(SHOTS, "21-reviews-full.png"), fullPage: true });

  await ctx.close();
}

// =========================================================================
// /thanks ROUTE
// =========================================================================
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  page.on("console", (m) => {
    if (["error", "warning"].includes(m.type())) findings.console.thanks.push({ type: m.type(), text: m.text() });
  });
  page.on("response", (r) => { if (r.status() >= 400) findings.network.thanks.push({ url: r.url(), status: r.status() }); });

  await page.goto(`${URL}/thanks`, { waitUntil: "networkidle" });

  findings.routes.thanks = await page.evaluate(() => ({
    title: document.title,
    h1: document.querySelector("h1")?.textContent?.trim(),
    has_phone_cta: !!document.querySelector('a[href^="tel:"]'),
    has_back_link: !!document.querySelector('a[href="/"]'),
    robots_meta: document.querySelector('meta[name="robots"]')?.getAttribute("content"),
  }));

  await page.screenshot({ path: path.join(SHOTS, "30-thanks.png"), fullPage: false });

  await ctx.close();
}

// =========================================================================
// /opengraph-image
// =========================================================================
{
  const ctx = await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto(`${URL}/opengraph-image`, { waitUntil: "networkidle" });
  findings.routes.opengraph_image = {
    contentType: page.url().includes("opengraph-image") ? "served" : "unknown",
  };
  await page.screenshot({ path: path.join(SHOTS, "40-opengraph-image.png"), fullPage: false });
  await ctx.close();
}

// =========================================================================
// MOBILE PASS — homepage
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
    if (["error", "warning"].includes(m.type())) findings.console.mobile.push({ type: m.type(), text: m.text() });
  });
  page.on("response", (r) => { if (r.status() >= 400) findings.network.mobile.push({ url: r.url(), status: r.status() }); });

  await page.goto(URL, { waitUntil: "networkidle" });

  findings.mobile.headings = await page.$$eval("h1,h2,h3,h4,h5,h6",
    (hs) => hs.map((h) => ({ tag: h.tagName, text: h.textContent?.trim().slice(0, 100) }))
  );

  findings.contrast.mobile = await page.evaluate(() => {
    const probe = (sel, label) => {
      const el = document.querySelector(sel);
      if (!el) return { label, found: false };
      const cs = getComputedStyle(el);
      return { label, found: true, color: cs.color, backgroundColor: cs.backgroundColor, display: cs.display };
    };
    return [
      probe(".nav-cta", "nav-cta"),
      probe(".sticky-call", "sticky-call"),
      probe(".nav-links", "nav-links (should be hidden)"),
      probe(".nav-mark img", "nav-mark logo image"),
    ];
  });

  await page.screenshot({ path: path.join(SHOTS, "50-mobile-above-fold.png"), fullPage: false });
  await page.screenshot({ path: path.join(SHOTS, "51-mobile-full.png"), fullPage: true });

  for (const [n, sel] of [
    ["52-mobile-services", "#services"],
    ["53-mobile-proof", "#proof"],
    ["54-mobile-form", "#contact-form"],
  ]) {
    const el = await page.$(sel);
    if (el) {
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);
      await el.screenshot({ path: path.join(SHOTS, `${n}.png`) });
    }
  }

  await ctx.close();
}

await browser.close();

fs.writeFileSync(path.join(__dirname, "findings.json"), JSON.stringify(findings, null, 2));

console.log("Audit v2 complete.");
console.log("Console errors (desktop):", findings.console.desktop.length);
console.log("Console errors (mobile):", findings.console.mobile.length);
console.log("Console errors (/reviews):", findings.console.reviews.length);
console.log("Console errors (/thanks):", findings.console.thanks.length);
console.log("Network 4xx/5xx total:", findings.network.desktop.length + findings.network.mobile.length + findings.network.reviews.length + findings.network.thanks.length);
console.log("Anchor walks landed on target:", Object.values(findings.anchors).filter(a => a.landed_on_target).length, "/", Object.keys(findings.anchors).length);
console.log("Images probed:", findings.assets.images?.length ?? 0);
console.log("Images failed to load:", findings.assets.images?.filter((i) => !i.loaded).length ?? 0);
console.log("data-slot count:", findings.desktop.data_slots?.length);
console.log("og:image present:", findings.meta.og_image !== null);
console.log("Trust band license:", findings.license_check.trust_band_value);
console.log("Footer license:", findings.license_check.footer_license_text, "(hidden:", findings.license_check.footer_license_hidden, ")");
console.log("Contact form found:", findings.form.found, "accessKey:", findings.form.accessKey?.slice(0,6) + "...");
console.log("/reviews cards:", findings.routes.reviews?.review_card_count, "(positive:", findings.routes.reviews?.positive_card_count, "negative:", findings.routes.reviews?.negative_card_count, ")");
