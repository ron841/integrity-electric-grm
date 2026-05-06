# Integrity Electric site audit. Pass v1.

Design seat: read this file first. Findings live in [findings.md](findings.md). Screenshots and machine-readable index follow.

## Audit scope

Live URL: https://integrity-electric-grm.vercel.app

- Visual captures at desktop 1440×900 and mobile 375×812.
- Section screenshots: hero, trust, services, proof, about, faq, contact, footer.
- Anchor walks for every nav target (smooth-scroll racing made `scrollY` numerical reads unreliable; visual screenshots are the source of truth).
- Asset integrity: every `<img>` element probed for `complete + naturalWidth > 0`.
- Console error + warning capture across both viewports.
- Network 4xx / 5xx capture across both viewports.
- Meta + JSON-LD dump (title, description, OG, Twitter, schema.org Electrician).
- Heading hierarchy walk.
- Computed-style probes on all five primary CTAs (nav-cta, hero-primary, hero-secondary, sticky-call, contact-phone).
- FAQ accordion expand/collapse + screenshot per state.
- Skip-link focus capture.
- Mobile-only checks: sticky call bar visibility at scroll, nav-links collapse.

This pass is audit-only. No fixes applied. Findings are categorized so Design can review, then a separate Code pass implements fixes.

## Headlines

- **0 BLOCKERS.** Build ships visually clean against the iter-1 pack. All 87 `data-slot` hooks preserved. Verifier fixes intact.
- **3 POLISH items.** og:image missing, hero JPG unoptimized, no `scroll-padding-top` defense.
- **3 OPTIONAL items.** Logo wiring, truck-door phone discrepancy, Friday asterisk — all walkthrough material the pack already routed there.
- **2 DESIGN RE-REVIEW items.** JSON-LD `image` substitution and `logo` addition — Code's calls where the pack didn't fully prescribe.

The 16 Open Decisions from `pack-README.md` remain in the state the pack authored. Code did not resolve any. They are walkthrough items, not findings.

## Reading order

1. [findings.md](findings.md) — full categorized findings with screenshots and build locations.
2. [manifest.json](manifest.json) — machine-readable index.
3. [findings.json](findings.json) — raw Playwright probe data (meta dump, schema dump, anchor walks, contrast probes, headings, asset integrity).
4. [screenshots/](screenshots/) — 25 Playwright captures referenced from findings.

## Triage status

Pending. Design seat reviews `findings.md`, decides Fix Now / Defer / Accept on each finding, and returns triage to chat. Operator (or Code via copy-paste) writes triage to `audit/v1/triage.md` and pushes. Code v2 build implements Fix Now items.

## Verified clean

See [findings.md § Verified clean](findings.md#verified-clean) for the full green-check list (16 items).

## Stock seat prompt for Design (v1 review)

```
You are the Design seat reviewing the v1 audit of integrity-electric-grm.

Read these in order:
1. https://raw.githubusercontent.com/ron841/integrity-electric-grm/main/audit/v1/README.md
2. https://raw.githubusercontent.com/ron841/integrity-electric-grm/main/audit/v1/findings.md
3. https://raw.githubusercontent.com/ron841/integrity-electric-grm/main/audit/v1/manifest.json

Standing docs are in your project knowledge (grm-pipeline pinned at adc87d1). Pack reference at:
https://github.com/ron841/grm-prospect-integrity-electrical-contracting-of-florida-inc/blob/main/audit/manifest.json

For each finding, return Fix Now / Defer / Accept and the slot-id patch (or build-location patch) for Code to apply in v2. Bundle into a single triage.md decision per Joe's pattern.
```

## Reproduce

```
cd site
npm install
node audit/v1/run-audit.mjs
```

Requires a network connection (audits the live URL, not localhost) and Playwright's bundled Chromium (installed via `npx playwright install chromium`).
