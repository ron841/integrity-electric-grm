# Integrity Electric site audit — findings (v2)

Audit run: 2026-05-05. Live URL: https://integrity-electric-grm.vercel.app

Categories: BLOCKERS, POLISH, OPTIONAL, DESIGN RE-REVIEW.

This pass verifies v1 triage closure (0 BLOCKERS / 3 POLISH / 3 OPTIONAL / 2 DESIGN RE-REVIEW from v1 plus the four pack-decision reversals authored by Design at v2 triage) and surfaces v2-specific findings against the larger surface area.

---

## Headlines

- **0 BLOCKERS.** Every v2 Fix Now item shipped and verified.
- **3 POLISH items** (new). Anchor landing offset double-up (low risk), logo density at nav scale, service-card photo composition variance.
- **3 OPTIONAL items.** Two new (review date staleness, owner-name spelling), one persisting from pack (Friday asterisk).
- **2 DESIGN RE-REVIEW items** (new). Mix-blend logo on iOS verification, service-card photo mapping.

The remaining pack Open Decisions (#1, #2, #3 insurance side, #6, #7, #11, #14, #16) stay in walkthrough. Decisions #5 and #15 closed by D-21/D-22. #12 and #13 closed by Design's v2 triage Accept calls. #3 license side closed by D-22.

---

## v1 closure verification

Every v1 finding triaged for v2 has been verified on the live site:

| v1 # | v1 Cat | v1 Title | v2 Disposition | Verified |
|---|---|---|---|---|
| P1 | POLISH | og:image missing | Fix Now | ✓ /opengraph-image serves 1200×630 PNG; `og:image`+`twitter:image` meta present, dimensions declared |
| P2 | POLISH | Hero JPG unoptimized | Fix Now | ✓ next/image with fill+priority; served via `/_next/image` (WebP/AVIF transformation, sized variants per device) |
| P3 | POLISH | No scroll-padding-top | Fix Now | ✓ `html { scroll-padding-top: 80px }` added (introduces small new finding, see v2 P1) |
| O1 | OPTIONAL | Logo not in nav wordmark | Fix Now (REVERSED) | ✓ Logo image swapped into nav at 56px desktop / 44px mobile; footer keeps text mark |
| O2 | OPTIONAL | Truck-door phone discrepancy | Defer | ✓ Closed by D-21 (logo confirms manifest 6335 correct); truck-door 6535 was wrong |
| O3 | OPTIONAL | Friday asterisk | Accept | ✓ Persists per pack D-12, walkthrough resolves |
| D1 | DESIGN | schema.image substitution | Accept | ✓ `image: ${SITE_URL}/assets/hero-truck.jpg` |
| D2 | DESIGN | schema.logo addition | Accept | ✓ `logo: ${SITE_URL}/assets/integritylogo.jpg` |

## Pack reversals shipped

| Pack ID | Original | v2 Build | Verified |
|---|---|---|---|
| D-08 | No /reviews page | /reviews route ships | ✓ 10 cards (8 positive + 2 negative); back link + Google outbound present |
| D-18 | No contact form | Form ships in dedicated section | ✓ Static Forms action, accessKey injected, Integrity-specific subject, honeypot offscreen, /thanks redirect |
| O1 (v1 reversal) | Text wordmark only | Logo image in nav | ✓ Nav `<img>` wired, alt text correct |

## Bonus walkthrough resolutions (D-21, D-22)

| ID | Item | Source | Verified |
|---|---|---|---|
| D-21 | Phone (352) 307-6335 confirmed | Logo image inspection | ✓ Already correct on all six surfaces; truck-door reading retroactively classified as wrong |
| D-22 | License EC13006493 | Logo image inspection | ✓ Trust band cell 5 renders `EC13006493`; footer slot un-hidden as `FL EC# EC13006493`; schema `identifier` field added; areaServed expanded to 6 cities |

---

## BLOCKERS

None.

---

## POLISH

### P1 (v2). Anchor jumps land at ~160px below viewport top instead of ~80px (scroll padding/margin double-up).

- **Description:** Both `html { scroll-padding-top: 80px }` (added per v1 P3) AND `section[id] { scroll-margin-top: 80px }` (from pack iter-1) are active. They compound — clicking `#services` lands the section's `rect.top` at ~160px instead of the intended 80px. Sections still render visibly clear of the 68px sticky nav, but vertical content drops further than expected. Five of six anchors landed at `elementTop=160` in the audit; `#top` lands at 81 (correct, single-padding-only because `<section id="top">` is the hero which doesn't have the same padding interaction in practice).
- **Screenshots:** N/A — Playwright-instrumented anchor walks in `findings.json` `anchors`.
- **Build location:** [src/app/globals.css:22](../../src/app/globals.css) (`html { scroll-padding-top: 80px }`) and [src/app/globals.css:305](../../src/app/globals.css) (`section[id] { scroll-margin-top: 80px }`).
- **Suggested approach:** Keep one, drop the other. `scroll-padding-top` on `html` is the preferred modern pattern (single global declaration, defense-in-depth) — remove `scroll-margin-top: 80px` from sections.

### P2 (v2). Logo content density too high for nav scale; phone/license/tagline unreadable at 56px height.

- **Description:** The supplied logo image (818×827 JPG) contains six distinct text/graphic elements stacked vertically: tagline, wordmark, cable graphic, subtitle, phone, license. At nav-bar height 56px (44px mobile), only the wordmark + cable graphic read clearly. Phone, license, and small subtitle become illegible noise. Brand-recognition still works, but the dense logo doesn't earn its size budget at this scale.
- **Screenshot:** [01-desktop-above-fold.png](screenshots/01-desktop-above-fold.png) — logo visible top-left, illegible inner text.
- **Build location:** [src/app/page.tsx:9-13](../../src/app/page.tsx) — `<img src="/assets/integritylogo.jpg" />` with `.nav-mark img { height: 56px }`.
- **Suggested approach:** Pre-crop a nav-specific variant — top half of the logo (tagline + wordmark + cable graphic, drop phone + subtitle + license). Phone is already in the nav-CTA; license already in the trust band + footer; subtitle is a duplicate of the legal name in footer. The cropped logo would render the brand at 56px without redundant illegible text.

### P3 (v2). Service-card photo composition variance; some assignments don't fit the service-card title.

- **Description:** Six GBP photos populate the service cards in numerical order (gbp-01 → "Residential electrical", gbp-02 → "Panels, poles, and service work", gbp-03 → "Generator inlet switches", gbp-04 → "Pool and heat-pump wiring", gbp-05 → "Barns and outbuildings", gbp-06 → "Shops and small commercial"). Visual review: gbp-03 (a barn-interior shot) under "Generator inlet switches" doesn't fit the card title; gbp-04 (a truck shot) under "Pool and heat-pump wiring" is brand-context but not service-context. Other four mappings read reasonably. 4:3 aspect cropping is clean across all photos.
- **Screenshot:** [05-desktop-services.png](screenshots/05-desktop-services.png) — all 6 cards visible.
- **Build location:** [src/app/page.tsx:124-149](../../src/app/page.tsx) — service-card array with `photo` URLs.
- **Suggested approach:** Walkthrough item — operator vets each photo-to-card mapping. May require swapping in FB photos (51 available, broader job-context coverage). Or accept current mapping and document as iter-1 best-effort awaiting walkthrough curation.

---

## OPTIONAL

### O1 (v2). Vanessa S. review (proof.review_3) dated "2 years ago" reads stale alongside fresher proof.

- **Description:** Of the 6 quotes on homepage, 5 are dated within the last 10 months. Vanessa's review (used as the third curated lead) is dated 2024-05-05 — "2 years ago" rendering. Audit data is correct; the review itself is strong content. Question is editorial: leading with a 2-year-old quote alongside fresh ones may dilute the "active business" signal.
- **Screenshot:** [06-desktop-proof.png](screenshots/06-desktop-proof.png) — third card in first row.
- **Build location:** [src/app/page.tsx:283](../../src/app/page.tsx).
- **Suggested approach:** Walkthrough — either re-capture the GBP review corpus (audit skill v0.4 backlog) for fresher quotes, or rotate Vanessa down into the second row of quotes and promote a fresher one (e.g., review #5 Zach Smallridge — also strong, also dated).

### O2 (v2). Owner-name spelling drift across review corpus: "Matthew" vs "Mathew" vs "Matt".

- **Description:** Five of the 10 captured reviews mention the owner by name — three say "Matthew" (Kaliway, Vanessa, Shawn), one says "Mathew" (J. Winnett — review_4 on homepage), one says "Matt" (Zach Smallridge — on /reviews page). Site renders each review verbatim, so all three spellings are visible. Pack D-06 left owner identity at "the Integrity team" / "the lead electrician" pending walkthrough; review-text spellings now sit in conflict on the rendered page.
- **Screenshots:** [06-desktop-proof.png](screenshots/06-desktop-proof.png) (homepage proof — "Mathew" in J. Winnett quote), [21-reviews-full.png](screenshots/21-reviews-full.png) (/reviews — all three spellings present).
- **Build location:** [src/app/page.tsx:281](../../src/app/page.tsx) (homepage Winnett quote), [src/app/reviews/page.tsx](../../src/app/reviews/page.tsx) (full review array).
- **Suggested approach:** Walkthrough — operator confirms canonical spelling. Reviews carrying the wrong spelling can either stay verbatim (Google reviews are immutable evidence; spelling drift in third-party content is honest) or normalize to canonical with `[sic]` notation. Operator's call.

### O3 (persisting). Friday hours asterisk + footnote rendered per pack D-12.

- **Description:** Same as v1 O3. Walkthrough resolves underlying data; on confirmation, asterisk and footnote slot drop via slot-id patch.
- **Screenshot:** [09-desktop-contact.png](screenshots/09-desktop-contact.png).
- **Build location:** [src/app/page.tsx:439-449](../../src/app/page.tsx).

---

## DESIGN RE-REVIEW

### D1 (v2). Logo `mix-blend-mode: multiply` for white-bg integration — verify on Safari iOS.

- **Description:** Nav logo uses `mix-blend-mode: multiply` to blend the white-bg JPG into the cream `rgba(247,244,240,0.96)` nav background. Renders cleanly in headless Chromium (Playwright capture). Safari iOS historically had partial support for `mix-blend-mode` in some versions; iOS 14+ should be fine but worth verifying on a real device before walkthrough.
- **Screenshot:** [01-desktop-above-fold.png](screenshots/01-desktop-above-fold.png) — logo edges blend smoothly into nav background.
- **Build location:** [src/app/globals.css:91-92](../../src/app/globals.css) — `.nav-mark img { mix-blend-mode: multiply }`.
- **Suggested approach:** Cross-browser spot-check on iOS Safari before walkthrough. Fallback strategy if iOS misrenders: ship a pre-composited PNG with cream background baked in, drop the blend mode.

### D2 (v2). Service-card photo mapping was numeric, not curated.

- **Description:** I assigned `gbp-01` → card 1, `gbp-02` → card 2, etc. without curating which photo best fits which service title. Two mismatches visible (P3 above). The 51 FB photos in the audit pack offer a broader pool of job-context shots; some would map better. Iter-1 best-effort selection that warrants Design's eye.
- **Screenshot:** [05-desktop-services.png](screenshots/05-desktop-services.png).
- **Build location:** [src/app/page.tsx:124-149](../../src/app/page.tsx).
- **Suggested approach:** Walkthrough — operator picks 6 photos that match the 6 service titles. Code applies via slot-id patches `services.card_N.photo`. Or Design audits the 51 FB photos and proposes a curated set.

---

## Verified clean (24 checks)

- 0 console errors across 4 routes (homepage desktop + mobile, /reviews, /thanks)
- 0 network 4xx/5xx across all routes
- 102 data-slot attributes preserved (up from 87 in v1; new slots: trust.item_5, form fields, proof.review_4-6, services.card_N.photo, proof.cta_to_reviews_page)
- JSON-LD Electrician schema parses; aggregateRating 4.8/106 correct; openingHoursSpecification correct; areaServed expanded to 6 cities (added The Villages, Summerfield, Dunnellon); serviceType lists 10; identifier field carries EC13006493
- Heading hierarchy correct: 1× H1, 6× H2 (+1 from v1 for the form section), 6× H3
- All 6 anchor links resolve (smooth-scroll override yielded deterministic measurements; one finding above re landing offset, but resolution itself works)
- FAQ accordion functional (q1 open verified, all-open captured)
- 12 images probed, 0 failures: 1× nav logo, 1× hero (next/image), 6× service photos (next/image), 4× proof photos (next/image)
- Hero image served via `/_next/image?url=%2Fassets%2Fhero-truck.jpg&w=384` with WebP/AVIF transformation
- All meta tags present including `og:image` + `og:image:width=1200` + `og:image:height=630` + `twitter:image`
- Favicon + apple-touch-icon both wired to `/assets/integritylogo.jpg`
- Trust band: 5 cells render correctly; cell 5 value `EC13006493`, label "Florida-licensed electrical contractor"
- Footer license: `<span data-slot="footer.fl_license">FL EC# EC13006493</span>` un-hidden, visible
- Mobile sticky call bar visible; nav-links hidden at <761px
- Verifier fixes still preserved (hero overlay + text-shadow on h1, nav-CTA white-space:nowrap)
- Drop cap on About para 1 renders
- /reviews route: 10 cards (8 positive in "Five-star reviews", 2 negative in "Where things didn't go right"), back link to home, Google outbound link
- /thanks route: title set, h1 "Message received.", phone CTA + back link, robots noindex
- Contact form structural probe:
  - action=`https://api.staticforms.xyz/submit`, method=`post`
  - hidden accessKey=`sf_e0e200934d4f36c17a10d00c` (reused per single-account convention)
  - hidden subject=`Integrity Electric · Contact form` (Integrity-specific differentiator)
  - hidden redirectTo=`https://integrity-electric-grm.vercel.app/thanks`
  - hidden replyTo=`@` (Static Forms convention to use submitter email)
  - honeypot `$gotcha` field present, offscreen at left:-9999px
  - 4 visible required fields: name, email, phone (optional), message
  - Submit button "Send to Integrity"
- /opengraph-image: 1200×630 PNG generated on demand at edge runtime, brand-correct (charcoal bg, red accent dot, headline + tagline + 4.8★/106 + phone/license footer)
- Sitemap.xml includes both `/` and `/reviews`
- Robots.txt allows all, points at sitemap
- Skip-link still wired

## Audit instrumentation note

v2 script overrode `html { scroll-behavior: auto !important }` via `addStyleTag` before anchor walks, eliminating the v1 smooth-scroll race. Anchor measurements are now deterministic — they revealed the scroll-padding+scroll-margin double-up (P1 above), which v1's racing measurements masked. Test improvement that surfaced a real finding.

## Reproduce

```
cd site
npm install
node audit/v2/run-audit.mjs
```

Form submission was probed structurally only (hidden field values + honeypot offscreen + field requirements) — no live submission was made. Live form submit will land in `ron@getrootedmedia.com` inbox under subject "Integrity Electric · Contact form" if/when operator wants to test end-to-end.
