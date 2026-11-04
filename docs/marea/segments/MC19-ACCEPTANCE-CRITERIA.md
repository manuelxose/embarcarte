# MC-19/36 — Proposed acceptance-criteria matrix (D04)

| Field       | Value                                                                                          |
| ----------- | ---------------------------------------------------------------------------------------------- |
| Deliverable | D04 — `MC19-ACCEPTANCE-CRITERIA.md`                                                            |
| Milestone   | MC-19/36                                                                                       |
| Status      | `PROPOSED` — no criterion is verified; implementation has not started                          |
| Baseline    | `3490c0f71eb6eaa89588b7a6d75bb3b6066cd094`                                                     |
| Companion   | D01 scope proposal · D03 dependencies · D05 risk register                                      |

## 1. Status vocabulary used here

- `PROPOSED` — defined in this proposal, not approved and not verifiable yet.
- `VERIFIED` — measured against the frozen implementation by a command or a content-bound
  artifact. **No MC-19 criterion is `VERIFIED` in this document.**
- `BLOCKED` — cannot be verified because an external prerequisite is absent.

## 2. Acceptance matrix (Option A, the recommended scope)

| ID    | Criterion                                                                                                                                              | Verification method                                                                                                              | Required evidence                                                                                          | Status    |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | --------- |
| AC-01 | The accountable owner has issued the MC-19 Master Prompt and approved this scope revision (P01, P10).                                                  | Written approval record bound to the scope revision.                                                                             | Approval id, owner, date, scope hash/revision.                                                             | PROPOSED  |
| AC-02 | The IA/route decision records every MC-19 route, entity, page type and ES/EN path, including the owners and professional-fleets segments, with a collision check against the 21 existing public routes and the 23 MC-15 proposed routes (P02). | Route decision record plus deterministic collision check; no public registration.                                                 | Route table, entity ids, collision result, no `LOCALIZED_ROUTES` change.                                   | PROPOSED  |
| AC-03 | Each approved page exists once as a locale-aware component tree with one bilingual content source; every rendered block carries `contentId`, `sectionId`, `copyClass`, `evidenceIds`, `publicationStatus=INTERNAL_DRAFT_NOT_APPROVED` and `approvalStatus=NOT_APPROVED`. | TypeScript build plus content validator and ES/EN parity check.                                                                   | Validator counts, parity counts, evidence-resolution counts.                                               | PROPOSED  |
| AC-04 | MC-17 design-system components are reused without fork or duplicate implementation.                                                                     | Import-graph and selector-collision check; `git diff` empty for `src/app/marea-design-system`.                                    | Dependency dataset and empty diff.                                                                          | PROPOSED  |
| AC-05 | No public route, sitemap entry, canonical, hreflang, Open Graph, Twitter card or JSON-LD is emitted; pages are loopback-preview only with noindex and Host allowlist; the production server returns 404 for every MC-19 path. | SSR header probes, production build scan and production 404 probes.                                                               | Raw HTML/header evidence, zero-identifier build scan, 404 probes.                                          | PROPOSED  |
| AC-06 | No enquiry form, input, contact endpoint, lead storage, installer registration, quote request or pre-registration exists while P03 is blocked; CTAs are informational and fail-closed, with no price, stock, purchase, certification or availability claim. | Form/input/endpoint scan, claim guard scan and adversarial mutations.                                                            | 0 forms/inputs/endpoints; mutation rejection list.                                                         | PROPOSED  |
| AC-07 | SSR and hydration agree in both locales; keyboard navigation, visible focus, reduced motion and responsive layout 320–1440 pass the agreed automated checks, with manual accessibility limits disclosed. | Playwright SSR/hydration, responsive and keyboard runs; axe results with limits.                                                 | Playwright counts, axe counts, disclosed manual gaps.                                                       | PROPOSED  |
| AC-08 | All relevant gates run with exact counts: typecheck, deterministic validator, unit/adversarial suite, Playwright, public build, i18n/commerce/SEO/backup regressions and production isolation. | Commands recorded with exit codes and counts; no PASS is prefixed.                                                               | Exact command list and observed output.                                                                     | PROPOSED  |
| AC-09 | An independent reviewer who did not implement the pages reviews the real diff and evidence; 0 BLOCKING and 0 MAJOR findings remain open.                 | Independent review record plus review-findings dataset.                                                                          | Reviewer identity, reviewed SHA, findings with statuses.                                                   | PROPOSED  |
| AC-10 | Delivery stays in a draft PR stacked on the verified MC-18 branch; no merge, deployment, publication, sitemap submission or public MAREA activation; every governance flag and inherited-debt item remains visible. | PR state, git history, public build scan, governance flag check and inherited-debt register.                                      | PR number/base/head, flags, debt list.                                                                      | PROPOSED  |

## 3. Why no criterion is verified now

- AC-01 and AC-02 depend on owner/IA decisions that do not exist.
- AC-03–AC-08 depend on an implementation that has not started.
- AC-09 depends on a frozen implementation.
- AC-10 is partly observable now (no merge/deploy/publication) but the delivery itself has
  not happened, so it remains `PROPOSED` for MC-19.

## 4. Additional criteria if Option B or C is approved

| Scope    | Additional acceptance criteria                                                                                                         |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Option B | Page-ownership boundary against MC-20–23; solutions overview and six bundle pages; no duplicate bundle comparison with MC-23.          |
| Option C | Lawful basis and privacy notice per locale; DPA/DPIA; consent/withdrawal/retention; server-authoritative validation and anti-abuse; security review; no card or vessel data; lead retention and export rules. |

## 5. Verification commands proposed for a future execution

These are **proposals**; they must be bound in the approved plan, not treated as already
run:

```text
npx tsc -p tsconfig.app.json --noEmit
npx tsc -p preview/landing/tsconfig.json --noEmit
npm run test:segments              # new deterministic validator (to be created)
npm run test:segments:unit         # new unit/adversarial suite (to be created)
npm run build:landing:preview
npx playwright test -c playwright.landing.config.ts
npm run build
npm run test:i18n
npm run test:commerce
npm run test:seo
npm run test:design-system
npm run check:landing:data
npm run format:check
```

The exact names and counts are deliberately not invented; they become contractual only when
the approved execution plan creates them.

## 6. Matrix statement

```text
MC19_ACCEPTANCE_CRITERIA_DEFINED = 10 (proposed)
MC19_ACCEPTANCE_CRITERIA_VERIFIED = 0
MC19_ACCEPTANCE_CRITERIA_BLOCKED = 10
```

A milestone cannot PASS on a proposal. The matrix becomes an acceptance gate only after
P01, P02 and P10 close.
