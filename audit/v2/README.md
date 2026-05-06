# Integrity Electric site audit. Pass v2.

Design seat: read this file first. Findings live in [findings.md](findings.md). Screenshots and machine-readable index follow.

## Audit scope (v2)

Live URL: https://integrity-electric-grm.vercel.app

- Visual captures at desktop 1440×900 and mobile 375×812 across 4 routes (/, /reviews, /thanks, /opengraph-image).
- Section screenshots: hero, trust (5-cell), services (photo cards), proof (6 quotes + 4 photos), about, faq, contact, contact form, footer.
- Anchor walks with smooth-scroll override (v1 instrumentation race fixed).
- Asset integrity: every `<img>` element probed, including next/image-served photos.
- Console errors across all 4 routes.
- Network 4xx/5xx across all 4 routes.
- Meta + JSON-LD dump (now includes og:image, identifier field).
- Heading hierarchy walk.
- Computed-style probes on 7 CTAs (added trust-license cell + form-submit button).
- FAQ accordion expand/collapse.
- Contact form structural probe (action, hidden fields, honeypot, field schema).
- License presence verification (trust band + footer + schema).
- /reviews route: card counts, positive/negative split, section labels, outbound links.
- /thanks route: title, h1, robots noindex, phone + back link.
- /opengraph-image route: edge-served PNG capture.

This pass is audit-only. Findings are categorized so Design can review and direct v3 if needed.

## Headlines

- **0 BLOCKERS.** Every v2 Fix Now item shipped and verified clean.
- **3 POLISH items** (new). Anchor padding double-up, logo density at nav scale, service-card photo mapping variance.
- **3 OPTIONAL items.** Two new (Vanessa review staleness, owner-name spelling drift), one persisting (Friday asterisk).
- **2 DESIGN RE-REVIEW items** (new). iOS Safari mix-blend verification, service-card photo curation.

## v1 closure

All 8 v1 findings closed. See [findings.md § v1 closure verification](findings.md#v1-closure-verification) for the matrix.

## Pack reversals shipped

D-08 (reviews page), D-18 (contact form), O1 (logo in nav). All verified live. See [findings.md § Pack reversals shipped](findings.md#pack-reversals-shipped).

## Walkthrough resolutions from logo image

D-21 (phone) and D-22 (license) shipped. See [findings.md § Bonus walkthrough resolutions](findings.md#bonus-walkthrough-resolutions-d-21-d-22).

## Reading order

1. [findings.md](findings.md) — full categorized findings + v1-closure matrix + pack-reversal status.
2. [manifest.json](manifest.json) — machine-readable index.
3. [findings.json](findings.json) — raw Playwright probe data (meta, schema, anchors, contrast, headings, asset integrity, form probe, route walks).
4. [screenshots/](screenshots/) — 19 Playwright captures.

## Triage status

Pending. Design seat reviews findings, decides Fix Now / Defer / Accept on each finding, returns triage. Operator (or Code via copy-paste) writes triage to `audit/v2/triage.md` and pushes. Code v3 build implements Fix Now items if any.

## Verified clean

See [findings.md § Verified clean](findings.md#verified-clean-24-checks) for the 24-item green-check list. Highlights: 0 console errors across 4 routes, 0 network failures, 12 images all loading via next/image with WebP/AVIF transformation, contact form structurally correct end-to-end, trust band carries license, footer license un-hidden, schema includes EC license identifier.

## Stock seat prompt for Design (v2 review)

```
You are the Design seat reviewing the v2 audit of integrity-electric-grm.

Read these in order:
1. https://raw.githubusercontent.com/ron841/integrity-electric-grm/main/audit/v2/README.md
2. https://raw.githubusercontent.com/ron841/integrity-electric-grm/main/audit/v2/findings.md
3. https://raw.githubusercontent.com/ron841/integrity-electric-grm/main/audit/v2/manifest.json

Standing docs are in your project knowledge (grm-pipeline pinned at adc87d1).

For each finding, return Fix Now / Defer / Accept and the slot-id patch (or build-location patch) for Code to apply in v3 if any. Bundle into a single triage.md decision.
```

## Reproduce

```
cd site
npm install
node audit/v2/run-audit.mjs
```
