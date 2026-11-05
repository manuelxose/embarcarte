# MC18 — Risk and Blocker Register (D17)

| Field                      | Value                                                                                                 |
| -------------------------- | ----------------------------------------------------------------------------------------------------- |
| Deliverable                | D17 — `MC18-RISK-AND-BLOCKER-REGISTER.md`                                                             |
| Milestone                  | MC-18/36 — EMBARCARTE / MAREA internal bilingual corporate landing                                    |
| Owner                      | docs-b                                                                                                |
| Date                       | 2026-11-03                                                                                            |
| Status                     | INTERNAL_PROPOSED (documentation deliverable; not a milestone verdict)                                |
| Publication                | NOT_AUTHORIZED                                                                                        |
| Indexation                 | DISABLED — `noindex, nofollow, noarchive`                                                             |
| Machine-readable companion | `docs/marea/landing/data/blocker-register.json` (contractId `MC18-BLOCKER-REGISTER`, version `1.0.0`) |
| Repository state           | HEAD `6002c49f898e755154c1b65c97781177719ce11c`, uncommitted MC-18 changes                            |

## 1. Purpose and method

This register records the external approvals that block publication of the
proposed MAREA landing, the cross-cutting risks of the MC-18 internal-preview
approach, and the debt inherited from earlier milestones. Each entry has an id,
severity, owner, status, closure condition and evidence. The Markdown register
and the JSON companion carry the same entries; when they disagree, the JSON file
is the machine-readable record and the repository evidence wins.

Method: authored by docs-b from verified repository evidence (models, generated
datasets, validator output, local preview probe). It is **not** an independent
audit and it does not assign a milestone verdict. Severities and owners are
author judgement; external approval statuses were read from the MC-14
legal-commercial datasets and were not re-confirmed with the named owners.

Observed starting point (2026-11-03):

| Indicator                     | Value                                                                             |
| ----------------------------- | --------------------------------------------------------------------------------- |
| MC-14 release gates           | 13 gates, 0 closed, 12 blocked, 1 evidence required                               |
| Required documents            | 24 required, 0 executed, 0 signed, 0 certified, 0 approved                        |
| Catalogued claims             | 42, 0 public-authorized, 35 public-prohibited, 30 mandatory prohibited categories |
| Page publishable              | `false`                                                                           |
| Release authorization record  | `null`                                                                            |
| Production route registration | none; production route files unchanged                                            |
| Validator                     | 55/60 PASS, 5 FAIL, exit 1 (pending artefacts only)                               |
| Unit suite                    | 45/45 PASS                                                                        |
| Preview                       | loopback only, noindex, no CSP bypass claimed                                     |

## 2. Blockers — external approvals

All 12 blockers are `OPEN`; none can be closed by code or by an MC-18 document.
They map to the facts that must change before D16's publication sequence can
start.

| ID  | Blocker                                                 | Severity | Owner                                            | Status | Closure condition                                                                                                                                        | Evidence                                                                                                                                                                       |
| --- | ------------------------------------------------------- | -------- | ------------------------------------------------ | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| B01 | Trademark legal clearance not granted                   | BLOCKER  | brand owner + legal counsel                      | OPEN   | Written clearance `GRANTED` recorded and reflected in `brandState.trademarkLegalClearance`                                                               | `claims-policy.json` `brandState.trademarkLegalClearance = NOT_GRANTED`; `publication-gates.ts` `trademarkCleared = false`                                                     |
| B02 | MAREA public use is `NO_GO`                             | BLOCKER  | brand owner + legal counsel                      | OPEN   | `MAREA_PUBLIC_USE` authorized and `MC14-BRAND-CONFLICT-01` supersession recorded                                                                         | `claims-policy.json` `brandState.mareaPublicUse = NO_GO`, `inheritedPolicyConflict.conflictId = MC14-BRAND-CONFLICT-01`                                                        |
| B03 | Source IP and licensing clearance not granted           | BLOCKER  | legal + data licensors                           | OPEN   | Source IP clearance and licensing rights granted; `LICENSING_NOT_CLEARED` lifted where licensed data is presented                                        | `publication-gates.ts` `sourceIpCleared = false`; `product-family-presentation.json` NAV/AIS/WEATHER/FLEET restrictions; open gates `GATE-IP-CLEARANCE`, `GATE-DATA-LICENSING` |
| B04 | Legal identity not verified                             | BLOCKER  | company legal owner                              | OPEN   | `GATE-LEGAL-ENTITY` closed with verifiable evidence; `legalIdentityVerified = true`                                                                      | `publication-gates.json` `legalIdentityVerified = false`; open gate `GATE-LEGAL-ENTITY`                                                                                        |
| B05 | Public copy not approved                                | BLOCKER  | copy owner + legal                               | OPEN   | ES/EN public copy approved with provenance; approval status leaves `INTERNAL_DRAFT_NOT_APPROVED`/`NOT_APPROVED`                                          | `content.types.ts` `PUBLICATION_STATUS = INTERNAL_DRAFT_NOT_APPROVED`, `APPROVAL_STATUS = NOT_APPROVED`; `publicCopyApproved = false`                                          |
| B06 | No claim is public-authorized                           | BLOCKER  | claims owner + legal                             | OPEN   | Each public claim individually approved; `publicationAuthorization` no longer `NONE`; 30 prohibited categories respected                                 | `claims-policy.json` summary: 42 catalogued, 0 public-authorized, `NONE`, 30 mandatory prohibited categories; `claimsApproved = false`                                         |
| B07 | Privacy, DPA and DPIA not approved                      | BLOCKER  | privacy owner + legal                            | OPEN   | Privacy approval, DPA and DPIA executed, including the design of any future enquiry/lead flow                                                            | `privacyApproved = false`; open gate `GATE-PRIVACY-DPA-DPIA`; 24 required documents, 0 executed                                                                                |
| B08 | Commercial data and pricing not approved                | BLOCKER  | commercial owner                                 | OPEN   | Approved price list **or** explicit no-price/no-offer publication decision; `commercialDataApproved = true`                                              | `product-family-presentation.json` all families `NOT_FOR_SALE`, `priceVisible:false`; `commercialDataApproved = false`; open gate `GATE-PRICING`                               |
| B09 | Publication, indexation and deployment approvals absent | BLOCKER  | accountable release owner                        | OPEN   | Approvals recorded **and** a real `ReleaseAuthorization` (`scope: PUBLICATION`) exists; both activation locks open                                       | `publicationApproved`/`indexationApproved`/`deploymentApproved = false`; `LANDING_RELEASE_AUTHORIZATION = null`; `releaseAuthorizationMissing`                                 |
| B10 | MC-14 release-gate programme not closed                 | BLOCKER  | legal/commercial gate owners + independent audit | OPEN   | 13 gates closed with evidence; 24 documents executed/signed/certified/approved as applicable                                                             | `release-evidence-gates.json` summary 13/0, 24/0; `publication-gates.json` `recordedReleaseGates`                                                                              |
| B11 | PILOT safety gate blocked                               | BLOCKER  | safety owner                                     | OPEN   | PILOT safety gate closed with evidence; `SAFETY_GATE_BLOCKED` lifted where PILOT is presented                                                            | `product-family-presentation.json` MAREA PILOT restrictions include `SAFETY_GATE_BLOCKED`; open gate `GATE-SAFETY-PILOT`                                                       |
| B12 | Hardware conformity and compatibility evidence absent   | BLOCKER  | hardware/compliance owner                        | OPEN   | Selected hardware, conformity evidence and any authorized CE/NMEA statement exist; tested compatibility rows > 0 or the copy keeps the no-claim position | `conformity-applicability.json` statusNote (applicability only; no conformity/CE/NMEA); `EV-MC11-HARDWARE` (no selected hardware, no CE claim, 0 tested rows)                  |

## 3. Risks

| ID  | Risk                                                                      | Severity | Owner                                             | Status    | Closure condition                                                                                                                                                      | Evidence                                                                                                                                                                                                                                  |
| --- | ------------------------------------------------------------------------- | -------- | ------------------------------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| R01 | Preview leakage through hosting, tunnel or port-forward                   | HIGH     | MC-18 lead + preview operators                    | MITIGATED | Loopback-only retained; no tunnel/proxy/hosting for 4302; runbook forbids publishing the preview                                                                       | `server.ts` binds `127.0.0.1`, rejects non-loopback Host (403); probe verified; MC18-46 PASS; no deploy manifest references the preview                                                                                                   |
| R02 | Copy drift between approved copy, canonical datasets and rendered content | HIGH     | content architect + docs-b + independent reviewer | OPEN      | Every block keeps evidence ids and approval state; validator/parity green; approved copy replaces draft only through a recorded change                                 | `landing-content.ts` every block cites evidence; MC18-20/21/58 PASS; 348 resolved records in `bilingual-content.json`                                                                                                                     |
| R03 | Design-system fork or duplicate component implementation                  | MEDIUM   | art director + implementation                     | MITIGATED | Landing imports only the canonical MC-17 library; no duplicate primitives; reuse checks green                                                                          | MC18-35 and MC18-49 PASS; adversarial test `duplicating a design-system component is rejected` PASS; `design-system-dependencies.json`                                                                                                    |
| R04 | Future route collision when `/marea` and `/en/marea` are registered       | HIGH     | architecture owner + MC-19 team                   | MONITORED | Future milestone re-runs the collision check; `NO_COLLISION` confirmed; 21 existing public route ids preserved                                                         | `proposed-routes.json` `collisionStatus: NO_COLLISION`, `collidesWith: []`; `existingPublicRouteIdsRetained = 21`; MC18-28 PASS                                                                                                           |
| R05 | Metadata or indexation activated by accident                              | HIGH     | SEO owner + independent reviewer                  | MITIGATED | Two-lock activation preserved and hardened: all 12 publication gates plus the authorization record are required; tests prove a single boolean cannot activate          | `LANDING_RELEASE_AUTHORIZATION = null`; MC18-43 PASS; `evaluateSeoActivation` now requires all 12 gates and emits `<gate>Unsatisfied` blocking reasons. Activation is impossible because 10 gates are false and the authorization is null |
| R06 | Evidence staleness or inflated claims                                     | MEDIUM   | lead + QA + docs owners                           | OPEN      | Every evidence file records real command/date/commit; validator green at delivery; delivery record quotes only observed results; pending artefacts present before PASS | Observed validator 52/60 at first run and 55/60 after reconciliation, 5 FAIL, exit 1; missing D10-D12 docs, performance/legacy/review evidence, independent review, Spanish report and delivery record                                    |
| R07 | Inherited debt from previous milestones                                   | MEDIUM   | programme lead                                    | MONITORED | Items tracked in §4 and in their milestone records; none silently rewritten or closed by MC-18                                                                         | `data.inherited`; MC-17 verdict `PARTIAL`; MC14 brand conflict; MC-15 indexation unverified; 13 gates 0 closed; 0/42 public claims                                                                                                        |

## 4. Inherited debt

| ID  | Item                                                                     | Severity      | Owner                               | Status        | Closure condition                                                                                                                                      | Evidence                                                                                                                                                                                                                                                                                        |
| --- | ------------------------------------------------------------------------ | ------------- | ----------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| I01 | MC-17 `playwrightTests` index discrepancy (28 vs 37)                     | INFORMATIONAL | MC-18 validator owner + MC-17 docs  | RESOLVED      | Fixed: MC18-55 reads `implementationCounts?.playwrightTests ?? completeness?.playwrightTests` and requires 28; D01 keeps the historical classification | `docs/marea/design-system/data/manifest.json` `implementationCounts.playwrightTests = 28` (unchanged; MC18-39 PASS); MC18-55 PASS after the validator fix                                                                                                                                       |
| I02 | MC-14 brand policy conflict                                              | BLOCKER       | brand owner + counsel               | OPEN          | Formal supersession approved by brand owner and counsel; MC-03 evidence not edited                                                                     | `claims-policy.json` `brandState.inheritedPolicyConflict.conflictId = MC14-BRAND-CONFLICT-01`                                                                                                                                                                                                   |
| I03 | Release-gate and required-document debt                                  | BLOCKER       | legal/commercial gate owners        | OPEN          | 13 gates closed; 24 documents executed with evidence                                                                                                   | `release-evidence-gates.json` summary 13/0, 24/0                                                                                                                                                                                                                                                |
| I04 | Claim-authorization debt (0 of 42)                                       | BLOCKER       | claims owner + legal                | OPEN          | Public-use claims individually approved; `publicationAuthorization` not `NONE`                                                                         | `claims-policy.json` summary 42/0/NONE                                                                                                                                                                                                                                                          |
| I05 | Indexation unverified (no Search Console)                                | INFORMATIONAL | SEO owner                           | INFORMATIONAL | Search Console access exists and a verified submitted-URL/error record is captured                                                                     | `indexation-policy.json` `INDEXATION_UNVERIFIED` evidence note                                                                                                                                                                                                                                  |
| I06 | Public sitemap generated at runtime; no static `public/sitemap.xml`      | INFORMATIONAL | SEO owner                           | RESOLVED      | Fixed: `PRODUCTION_ROUTE_FILES` guards the four real route surfaces and no longer names a non-existent static sitemap                                  | `page-identity.ts` `PRODUCTION_ROUTE_FILES` = `app.routes.ts`, `app.routes.server.ts`, `locale-routes.ts`, `server.ts`; `public/` contains no sitemap file; MC18-29 PASS                                                                                                                        |
| I07 | `design-system-dependencies.json` reported stale by the generator        | MEDIUM        | art director + implementation owner | RESOLVED      | Fixed: datasets regenerated after the visual pass; `npm run check:landing:data` and MC18-41 are green                                                  | MC18-41 PASS after regeneration; generator `scripts/build-marea-landing-data.mjs`                                                                                                                                                                                                               |
| I08 | Page-type label discrepancy (`PAGE_MAREA_OVERVIEW` vs `HUB_OVERVIEW`)    | INFORMATIONAL | MC-15 dataset owner + docs-b        | INFORMATIONAL | Align human-readable evidence text with the canonical dataset in a future change; dataset remains authority                                            | `proposed-routes.json` `pageType: HUB_OVERVIEW`; `evidence.ts` `EV-MC15-ROUTES` says `PAGE_MAREA_OVERVIEW`; `page-identity.ts` `HUB_OVERVIEW`                                                                                                                                                   |
| I09 | Pending QA evidence, independent review, Spanish report, delivery record | BLOCKER       | lead + QA + independent auditor     | PENDING       | All required artefacts exist, validator green, independent audit verdict issued                                                                        | Missing in final observed run: D10, D11, D12, independent review, Spanish report and delivery record; `performance-evidence.json`, `legacy-baseline.json`, `review-findings.json`; validator 55/60, 5 FAIL. Accessibility/responsive/visual/ssr-hydration evidence, D01 and D03 are now present |

## 5. Severity and status vocabulary

| Value                    | Meaning in this register                                                                           |
| ------------------------ | -------------------------------------------------------------------------------------------------- |
| `BLOCKER`                | Prevents publication (blockers, inherited legal items) or prevents a truthful milestone PASS (I09) |
| `HIGH`                   | Material risk to isolation, copy integrity or future activation                                    |
| `MEDIUM`                 | Process/quality risk requiring tracking and closure evidence                                       |
| `INFORMATIONAL`          | Recorded discrepancy or inherited fact; no MC-18 action required                                   |
| `OPEN`                   | Not closed; no approved mitigation in place                                                        |
| `MITIGATED`              | A technical/process control exists and was observed; residual risk remains                         |
| `MONITORED`              | Managed by an explicit future check                                                                |
| `PENDING`                | Waiting on another deliverable; not assessed                                                       |
| `RESOLVED`               | Fixed during reconciliation with observed verification                                             |
| `INFORMATIONAL` (status) | Recorded, not blocking, not closed                                                                 |

## 6. What MC-18 does _not_ do with this register

- It does not close any blocker; all external approvals remain `OPEN`.
- It does not publish, index, deploy or authorize the landing.
- It does not rewrite previous milestone datasets, verdicts or manifests.
- It does not issue the milestone verdict; the independent audit decides whether
  the milestone is PASS / PARTIAL / BLOCKED / FAIL.
- It does not convert a pending evidence item into a PASS; the validator's 5 FAILs
  in the final observed run are recorded as PENDING work.

## 7. Observed verification at authoring

| Command / probe                         | Observed                                                |
| --------------------------------------- | ------------------------------------------------------- |
| `git rev-parse HEAD`                    | `6002c49f898e755154c1b65c97781177719ce11c`              |
| `npx tsc -p tsconfig.app.json --noEmit` | exit 0                                                  |
| `npm run test:landing:unit`             | 45/45 PASS, exit 0                                      |
| `npm run test:landing`                  | 55/60 PASS, 5 FAIL, exit 1                              |
| `npm run build:landing:preview`         | exit 0                                                  |
| Preview HTTP probe                      | ES/EN 200, 404 unknown, 403 forged Host, headers as D13 |
| `package-lock.json` change vs base      | none (MC18-57 PASS)                                     |

## 8. Known limitations / non-claims

- Statuses and counts are a snapshot at 2026-11-03; some deliverables were still
  in flight when this register was authored (performance evidence, legacy
  baseline, review findings, independent review, Spanish report, delivery record,
  D10-D12) and may change the register.
- Owners named here are the roles that must supply the approval, not people who
  have confirmed the entry.
- Severity and closure conditions are this document's judgement, not a legal
  opinion.
- No external approval has been solicited, verified or implied by this register.
- No security certification or penetration test is claimed (see D15).
- No independent audit has reviewed this register; the final milestone verdict
  belongs to the independent auditor. This document does not claim MC18 PASS and
  records `MC18_PUBLICATION = NOT_AUTHORIZED`.
