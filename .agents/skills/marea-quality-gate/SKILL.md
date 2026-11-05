---
name: marea-quality-gate
description: "Run independent, evidence-backed verification before merge, milestone sign-off or release, and issue a PASS/PARTIAL/BLOCKED/FAIL verdict. Trigger when asked to review, audit, verify or gate a branch, diff, PR, milestone, UI, security posture or commercial claim in this repository."
whenToUse: "Use for independent review (the reviewer must not be the author), pre-merge or milestone acceptance, release readiness, accessibility/SEO/security audits, or whenever a verdict must be backed by actual command output."
metadata:
  version: "1.0.0"
  source: "docs/marea/execution/AGENT-OPERATING-MODEL.md"
---

# MAREA Quality Gate

Independent, evidence-backed verification. The reviewer must never be the author of
what it reviews, and a summary is never evidence.

## Non-negotiable method

1. Inspect the ACTUAL diff and configuration (`git status`, `git diff`, file reads) — never the delivery summary.
2. Re-run the repository's real gates. Records exact commands and outputs (tail), see `references/COMMANDS.md`.
3. Check every claim against files/commands and classify each as VERIFIED / PARTIAL / NOT VERIFIED / BLOCKED.
4. Look for secrets, unsafe defaults, new dependencies/scripts, permission changes, card-data storage
   and unverified commercial claims.
5. Report defects as blocking / non-blocking with `file:line` or command evidence.

## Gates to run (details and coverage in references/COMMANDS.md)

- `npm run build` — Angular SSR/prerender build: catches template, route and render-mode errors.
- `npm run test:i18n` — dictionary parity and localized-route integrity (ES/EN).
- `npm run test:commerce` — server-authoritative price/stock/order integrity.
- `npm run test:seo` — metadata, canonical/hreflang and sitemap checks.
- `npm run test:backup` — backup/restore verification.
- `npm run test:performance` — lab LCP/CLS measurement; it does NOT enforce thresholds and is
  not a CI gate (per `AGENTS.md`): compare before/after manually, never report it as PASS/FAIL.
- `npm run test:e2e` — Playwright 1.64 (Chromium must be installed).
- `npm run format:check` — Prettier formatting.
- Accessibility: axe via `@axe-core/playwright` in `e2e/accessibility.spec.ts`.
- `npm test` is NOT defined in `package.json`: never report a result for it.

## Review checklist

- Angular 21 SSR/prerender/hydration preserved; typed `LOCALIZED_ROUTES` used; no duplicated ES/EN components.
- ES/EN dictionary parity, no untranslated strings, canonical/hreflang reciprocity, unpublished
  translations not advertised as alternates.
- Mobile-first responsive layout, keyboard navigation, visible focus, WCAG 2.2 AA, reduced motion.
- Security: no secrets in the tree, sessions/authz intact, rate limits, hosted/tokenized payments only,
  no raw card data, no vessel operational controls through commerce endpoints.
- Truthfulness: no invented stock, certifications, purchasable hypothetical prices, sea trials,
  testimonials or brand approvals; lifecycle labels honest.
- Broken internal links, missing assets, 404/500 behaviour, error and failure states.
- Visual regression: screenshots for changed views; no generic-SaaS drift from the MAREA visual direction.

## Verdict rules

- PASS — every criterion verified with evidence in the working tree.
- PARTIAL — verified work committed, but at least one criterion is blocked by a concrete external condition.
- BLOCKED — work cannot proceed without an external unblock (credentials, legal clearance, hardware, network).
- FAIL — a required behaviour or quality gate is violated.
- Documentation alone never PASSes a functionality, physical, financial or legal milestone.

## Hard rules

- Never fabricate command output, screenshots or PASS verdicts.
- Never run write Git commands (`add`, `commit`, `checkout`, `push`); no deploy, no secrets, no chargeable APIs.
- Distinguish pre-existing failures from new regressions and report both.
- If a gate is not runnable (missing Chromium, credentials, network), mark that criterion BLOCKED with the exact cause.

## Input/output contract

- Input: branch/commit/base, review scope, acceptance criteria, relevant docs.
- Output: verdict + per-criterion evidence table (claim | status | evidence) + blocking/non-blocking
  defects + residual risks + exact next action.
