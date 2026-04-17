# Lighthouse Audit — CalcVault

Date: 2026-04-17

Source JSON: [calc-vault-lighthouse.json](calc-vault-lighthouse.json)

## Overview
- URL audited: http://localhost:3000/calc-vault
- Lighthouse version: 13.1.0
- Form factor: mobile (simulated)

## Category Scores
- Performance: 76
- Accessibility: 94
- SEO: 100

## Key Metrics (high level)
- First Contentful Paint (FCP): 2.6 s
- Largest Contentful Paint (LCP): 3.5 s
- Speed Index: 2.6 s
- Time to Interactive (TTI): 5.5 s
- Total JS execution / Bootup time: 1.2 s
- Main-thread work (sum shown in diagnostics): ~1.9 s

Notes: full numeric values and trace data are available in the linked JSON file.

## Performance Diagnostics (notable findings)
- Main thread work breakdown shows ~1.9 s of main-thread time (script evaluation and layout dominate).
- `bootup-time` total scripting shows large contributions from:
  - `/calc-vault/_next/static/chunks/69be39811437728d.js` (~417 ms total CPU)
  - Google Tag Manager script (~329 ms total CPU)
  - Ads script (`show_ads_impl_fy2021.js`) (~283 ms total CPU)

## Network / Resource Highlights
- Total transfer weight: ~657,655 bytes (~642 KB).
- Main document transfer size: 8,056 bytes (~7.9 KB).
- Largest transfer entries (transferSize):
  - `https://www.googletagmanager.com/gtag/js` — 162,025 bytes (~158.3 KB)
  - `show_ads_impl_fy2021.js` (Ads) — 181,562 bytes (~177.3 KB)
  - `pagead2.googlesyndication` script(s) — 55,505 bytes (~54.2 KB)
  - Local chunk `_next/static/chunks/69be39811437728d.js` — 70,291 bytes (~68.6 KB)

Third-party scripts (GTM / Ads) contribute a large portion of CPU and bytes; consider deferring or lazy-loading ad/tracking scripts where appropriate.

## Accessibility — notable failures
- `color-contrast` (impact: serious) — multiple elements fail contrast checks (examples show contrast ratios ~2.3–2.5 where 4.5:1 is expected). See details in the JSON under `audits.color-contrast` for affected selectors and suggested fixes.
- `heading-order` — a couple of headings are out-of-order (e.g., H3/H4 sequence issues). See `audits.heading-order` details in JSON.

Accessibility score is high (94) but these issues should be fixed to reach 100.

## SEO
- SEO score: 100 — no automated SEO failures detected by Lighthouse in this run.

## Suggestions / Actionable Next Steps
1. Reduce or defer third‑party scripts (GTM / ads). Try async/defer, load on interaction, or use consent-driven loading.
2. Audit the large local chunk (`69be...js`) — identify unused code and consider splitting or code‑splitting to reduce initial parse/eval cost.
3. Fix color contrast issues (adjust foreground/background colors or increase font weight/size where appropriate).
4. Correct heading order to improve semantics and a11y.
5. If aiming for higher Performance score: target LCP < 2.5s and TTI < 3.8s by reducing render-blocking JS and optimizing critical render path.

## Where to find raw data
- Full JSON report: [calc-vault-lighthouse.json](calc-vault-lighthouse.json)
- Final screenshot and filmstrip: included inside the JSON (`audits.screenshot-thumbnails` and `audits.full-page-screenshot`)

---
Generated programmatically from the CLI Lighthouse run saved at `calc-vault-lighthouse.json`.
