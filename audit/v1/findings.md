# Integrity Electric site audit — findings

Audit run: 2026-05-05. Live URL: https://integrity-electric-grm.vercel.app

Categories: BLOCKERS, POLISH, OPTIONAL, DESIGN RE-REVIEW.

Each finding cites a screenshot in `screenshots/` and a build location for Code's reference. Suggested approach is direction only; no fixes applied in this audit pass.

---

## Headlines

- **0 BLOCKERS.** Build ships visually clean against the iter-1 pack. All 87 `data-slot` hooks preserved verbatim. Verifier fixes (hero overlay + text-shadow, nav-CTA `white-space: nowrap`) are intact.
- **3 POLISH items.** None block ship; incremental wins.
- **3 OPTIONAL items.** Design judgment calls + walkthrough material the pack already routed there.
- **2 DESIGN RE-REVIEW items.** Implementation choices Code made where the pack didn't fully prescribe; Design ratifies or requests adjustment.

The 16 Open Decisions from `pack-README.md` remain in the state the pack authored (walkthrough / hidden / asterisk-noted) — Code did not resolve any of them. They are walkthrough items, not findings.

---

## BLOCKERS

None.

---

## POLISH

### P1. Open Graph image missing — social previews render with no card.

- **Description:** The page's `<head>` declares `og:title`, `og:description`, `og:url`, `og:type`, and `twitter:card="summary_large_image"`, but no `og:image` or `twitter:image` meta tag is emitted. Live DOM probe returns `og:image: null`. Result: when the URL is shared on Facebook, iMessage, LinkedIn, Twitter, Slack, etc., the preview card has no image — only title + description text. Social cards with no image have measurably lower CTR than cards with one.
- **Screenshot:** N/A — confirmed via Playwright DOM probe in `findings.json` `meta.og_image: null`.
- **Build location:** [src/app/layout.tsx](../../src/app/layout.tsx) — `metadata.openGraph` has no `images` field; no file-based `opengraph-image.tsx` exists in `src/app/`.
- **Suggested approach:** Two paths. (a) Add a file-based `opengraph-image.tsx` per Next.js convention that renders a 1200×630 card with brand mark + tagline + 4.8 ★ / 106 reviews badge. (b) Simpler — add `metadata.openGraph.images: ["/assets/hero-truck.jpg"]` and a Twitter equivalent. The hero photo is 1179×882, not the canonical 1200×630, so it'll center-crop on FB and Twitter, but most platforms handle it. Design decides whether the hero photo is the right share-card image or whether a custom card serves better.

### P2. Hero image ships at full source resolution (~400KB JPG, plain `<img>`).

- **Description:** `assets/hero-truck.jpg` is the operator-supplied photo at native 400,441 bytes, served via plain `<img>` (not `next/image`). Browser receives it raw at 1179×882 rendered. There's no `srcset` / `sizes` / format negotiation. On a fast home connection it's a non-issue; on mid-tier mobile or slow connections the hero image dominates LCP.
- **Screenshot:** [03-desktop-hero.png](screenshots/03-desktop-hero.png) — image renders correctly; this is a perf-budget note.
- **Build location:** [src/app/page.tsx:14-19](../../src/app/page.tsx) — `<img className="hero-img" src="/assets/hero-truck.jpg" ... />`.
- **Suggested approach:** Either convert to `next/image` with `priority` and `sizes="100vw"` (auto WebP/AVIF + responsive srcset), or pre-optimize the source JPG to ~120-150KB via `sips -Z 1920 -s formatOptions 75 hero-truck.jpg`. `next/image` is the more durable choice; the operator's photo should travel through it.

### P3. No `scroll-padding-top` defense; section padding currently absorbs sticky-nav overlap but no insurance.

- **Description:** Anchor jumps to `#services`, `#proof`, etc. land cleanly because each section carries `scroll-margin-top: 80px` (set on `section[id]` in globals.css line 305) and section padding clears the 68px sticky nav. If the section padding ever shrinks below nav height in a future iter, anchor landings will hide section headings behind the sticky nav. `html { scroll-padding-top: 72px; }` would be defense-in-depth.
- **Screenshots:** [03-desktop-hero.png](screenshots/03-desktop-hero.png), [05-desktop-services.png](screenshots/05-desktop-services.png) — current state is fine.
- **Build location:** [src/app/globals.css:30-31](../../src/app/globals.css) — `html { scroll-behavior: smooth; }` only.
- **Suggested approach:** Add `html { scroll-padding-top: 72px; }` to globals.css. Two-line change.

---

## OPTIONAL

### O1. Logo asset received from operator — not yet wired into rendered nav/footer wordmarks.

- **Description:** `integritylogo.JPG` was supplied mid-build and copied into `public/assets/integritylogo.jpg`. Code wired it as the favicon, apple-touch-icon, and JSON-LD `schema.logo` — but did NOT swap it into the nav `.nav-mark` or footer `.footer-mark` text wordmarks, which the pack's `Home.html` authored as text marks (red dot + "Integrity *Electric*" with the italic). Per the operator directive "preserve, don't paper over," the rendered text marks were left as Design authored them.
- **Screenshots:** [01-desktop-above-fold.png](screenshots/01-desktop-above-fold.png) (nav text mark visible), [10-desktop-footer.png](screenshots/10-desktop-footer.png) (footer text mark visible).
- **Build location:** [src/app/layout.tsx:43-47](../../src/app/layout.tsx) (favicon wiring), [src/app/page.tsx:8-10](../../src/app/page.tsx) (nav text mark), [src/app/page.tsx:539-541](../../src/app/page.tsx) (footer text mark).
- **Suggested approach:** Walkthrough item. Design's call to keep the typographic mark, swap to the logo image, or do a hybrid (image + wordmark together). Logo file is ready in `public/assets/integritylogo.jpg`.

### O2. Truck-door phone discrepancy still visible in hero photo (D-13 walkthrough item).

- **Description:** Per BUILD-DECISIONS D-13, manifest phone `(352) 307-6335` won authority over the truck-door visible number `(352) 307-6535`. Site renders the manifest number in all six call-to-action surfaces (nav-CTA, hero-CTA, hero-trust, contact phone-block, footer, mobile sticky). Hero image still shows the truck-door number — at the rendered scale it's not crisply legible to the casual viewer, but a careful look will catch the conflict.
- **Screenshot:** [03-desktop-hero.png](screenshots/03-desktop-hero.png) — inspect truck door at right.
- **Build location:** N/A. The pack documented this as a walkthrough item; no Code action.
- **Suggested approach:** Walkthrough resolves which number actually routes. If the pack's `(352) 307-6335` is correct, the photo conflict is acceptable (low legibility at hero scale). If the truck-door number is correct, walkthrough patches the manifest number across the six surfaces.

### O3. Friday hours asterisk + footnote calls visual attention in the contact section.

- **Description:** Per BUILD-DECISIONS D-12, Friday cell renders `7:30 AM – 5:00 PM*` with a footnote "*Friday hours pending walkthrough confirmation — captured data shows 5:00 AM, PM intended." Rendered correctly. The asterisk + italic footnote sits inside the cream contact-card and reads as a small caveat, not a confidence-eroding warning. But it's the only asterisked field on the page; some operators will want it gone before they share the link.
- **Screenshot:** [09-desktop-contact.png](screenshots/09-desktop-contact.png) — see hours table + note below.
- **Build location:** [src/app/page.tsx:439-449](../../src/app/page.tsx) — slots `contact.hours.fri` + `contact.hours.fri_note`.
- **Suggested approach:** Walkthrough resolves the underlying data. Once Friday's actual hours are confirmed, both the asterisk and the footnote drop — slot-id-keyed patch.

---

## DESIGN RE-REVIEW

### D1. JSON-LD `image` field set to hero-truck.jpg URL (pack content-inventory left as `[FB cover URL after image-asset routing]`).

- **Description:** Pack content-inventory's schema row reads `image: (FB cover URL after image-asset routing)`. The pack didn't ship an FB cover image (FB content was scraped into `audit/photos/fb/` but not promoted into the design pack's assets/). Code substituted `https://integrity-electric-grm.vercel.app/assets/hero-truck.jpg` so the schema's `image` resolves. Design ratifies or specifies alternate.
- **Screenshot:** N/A — confirmed via Playwright JSON-LD probe in `findings.json` `schema.image`.
- **Build location:** [src/app/layout.tsx:60](../../src/app/layout.tsx) — `image: ${SITE_URL}/assets/hero-truck.jpg`.
- **Suggested approach:** If the FB cover is the intended schema image, walkthrough patches it in (Code copies `audit/photos/fb/fb-cover-*.jpg` into `public/assets/` and updates the URL). Otherwise, hero-truck.jpg is a sensible default — strong Marion-County context, brand-visible.

### D2. Logo also added as JSON-LD `schema.logo` (not in pack content-inventory).

- **Description:** Code added `logo: ${SITE_URL}/assets/integritylogo.jpg` to the JSON-LD as a separate field from `image`. Pack content-inventory only specified `image`. The `logo` field is structurally correct schema.org Organization data and helps Google Knowledge Panel rendering, but it's an addition Code made, not a pack-prescribed slot.
- **Screenshot:** N/A — confirmed via Playwright JSON-LD probe in `findings.json` `schema.logo`.
- **Build location:** [src/app/layout.tsx:61](../../src/app/layout.tsx) — `logo: ${SITE_URL}/assets/integritylogo.jpg`.
- **Suggested approach:** Design ratifies or removes. Schema-org-correct field; harmless if kept.

---

## Verified clean

- 0 console errors (desktop + mobile passes)
- 0 network 4xx/5xx requests
- All 87 pack `data-slot` attributes present in rendered DOM (matches pack `slots.md` exactly)
- JSON-LD `Electrician` schema parses cleanly; `aggregateRating 4.8 / 106` correct, `openingHoursSpecification` correct, `areaServed` includes Marion County / Belleview / Ocala, `serviceType` lists 10 entries, `sameAs` includes FB
- Heading hierarchy correct: 1× H1 (hero headline), 5× H2 (services / proof / about / faq / contact section titles), 6× H3 (services cards). No skips.
- All anchor links resolve to existing IDs (`#services`, `#proof`, `#about`, `#faq`, `#contact`, `#top`). Smooth-scroll racing made the audit script's `scrollY` numerical measurements unreliable; visual screenshots confirm correct landings.
- FAQ accordion works (q1 open verified, all-open screenshot in `13-desktop-faq-all-open.png`).
- Mobile sticky call bar renders red-on-red-on-cream contrast, visible at all scroll positions, hidden on desktop ≥ 761px.
- Mobile nav-links correctly hidden at < 761px; only nav-mark + nav-CTA visible.
- Verifier fixes preserved: hero overlay (`linear-gradient` 4-stop), `text-shadow: 0 2px 28px rgba(0,0,0,0.55)` on `.hero h1`, `.nav-cta { white-space: nowrap; flex-shrink: 0 }`.
- Drop cap on About paragraph 1 renders (red, 4.2em, float-left) per D-20.
- Friday hours asterisk + footnote rendered as authored.
- `footer.fl_license` correctly hidden (per pack: walkthrough resolves before unhiding).
- All meta tags present: title, description, canonical, og:title, og:description, og:url, og:type, twitter:card, twitter:title, viewport, lang.
- Favicon + apple-touch-icon both wired to `/assets/integritylogo.jpg`.
- Sitemap.xml HTTP 200, robots.txt HTTP 200, hero asset HTTP 200.
- Hero image loaded at 1179×882 with full alt text rendered.
- Tailwind not used; pack CSS shipped verbatim into `globals.css` with the only addition being a `.skip-link` style for the accessibility skip-to-content link.

## Audit instrumentation note

The Playwright script tests anchor walks by calling `window.scrollTo(0, 0)` then clicking the anchor and reading `scrollY` after 500ms. With `html { scroll-behavior: smooth }`, the reset scroll and the anchor scroll race; numerical `scrollY` after 500ms is mid-animation. Visual screenshots confirm correct landings. v2 audit script should either temporarily set `scroll-behavior: auto` for the test or wait for `scrollend` event before reading position.
