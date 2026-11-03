# MC-16 — Baseline and governance (D01)

| Field | Value |
|---|---|
| Deliverable | D01 `MC-16-BASELINE-AND-GOVERNANCE.md` |
| Milestone | MC-16/36 — MAREA commerce and product data model |
| Date | 2026-11-03 |
| Owner | governance-docs |
| Status | INTERNAL_ONLY |
| Publication | NOT_AUTHORIZED |
| Commercial availability | NOT_FOR_SALE |
| Deployment / merge | NOT_AUTHORIZED |
| Production migration | NOT_AUTHORIZED |
| `MC16_STARTED` | `true` (internal design, schema and evidence work only) |
| `MC17_STARTED` | `false` |

## 1. Purpose and boundary

MC-16 defines an **isolated, testable** MAREA commerce and product data domain model:
the canonical data contract, product family / edition / SKU identities, bundle
composition, lifecycle and readiness states, release-gate and purchasability policy,
price and inventory governance, subscription/entitlement modelling, FLEET tenancy,
the security and audit contract, the legacy-commerce compatibility boundary, the
integration/rollback plan, and the MC-17 handoff.

This milestone **does not**:

- merge, deploy, publish, index or sell anything;
- change the live shop, checkout, prices, stock, orders, routes, redirects, sitemap,
  robots.txt, metadata, customer-facing copy or the legacy database;
- create a merchant SKU, an approved price, verified MAREA inventory, a real
  subscription, a real entitlement grant or a billable contract;
- execute a production schema migration or install the MC-16 schema anywhere except
  an explicitly disposable test database;
- contact customers, suppliers, certifiers, registrars or payment providers;
- authorize MAREA public brand use or start MC-17.

A defined product is not a purchasable product. A passing test is not an approval.
An internal decision record is not external evidence. Those distinctions are
normative for every MC-16 artefact.

## 2. Verified baseline (git preflight)

Preflight was performed read-only on 2026-11-03 at approximately 01:12 CET, before
authoring the governance package. Commands and observed values:

| Check | Command | Result |
|---|---|---|
| Working branch | `git rev-parse --abbrev-ref HEAD` | `feature/marea-mc16-commerce-product-data-model` |
| Local HEAD | `git rev-parse HEAD` | `99212a41f5942a6fef4ede75815132c11fa4de50` |
| Predecessor MC-15 HEAD | `git log -1 --oneline` | `99212a4 docs(mc15): record Search Console PASS and final delivery` |
| Remote MC-15 branch | `git ls-remote origin refs/heads/feature/marea-mc15-bilingual-ia-seo-migration` | `99212a41f5942a6fef4ede75815132c11fa4de50` |
| Remote `main` | `git ls-remote origin refs/heads/main` | `092ae74c904cc9aa04766ff565bacd422394fa45` |
| PR #22 | `gh pr view 22 --json ...` | `OPEN`, draft, `MERGEABLE`, `mergedAt: null`, head `99212a4…`, base `feature/marea-mc14-legal-commercial-risk-claims-policy`, <https://github.com/manuelxose/embarcarte/pull/22> |
| PR for the MC-16 branch | `gh pr list --head feature/marea-mc16-commerce-product-data-model --state all` | `[]` — no PR exists |
| MC-16 branch on the remote | `git ls-remote origin` (queried refs) | no MC-16 ref — the branch is local only |
| Node runtime | `node --version` | `v24.18.0` (needed for `node:sqlite` and TypeScript type stripping) |

Working-tree state at the same moment (this is the authoring state, not a clean
checkout):

| Path | State | Meaning |
|---|---|---|
| `package.json` | modified (`6 insertions, 3 deletions`) | Internal MC-16 script/format entries added by a parallel MC-16 workstream. No dependency, version or runtime change. |
| `.agent-teams/` | untracked | Agent-team runtime state; never part of the deliverable. |
| `docs/marea/commerce-data/` | untracked | This milestone's package (documents and data). |
| `scripts/check-marea-commerce-data.mjs`, `scripts/check-marea-commerce-data.test.mjs`, `scripts/marea-commerce-validator.mjs` | untracked | MC-16 package validator and tests, authored by a parallel workstream. |
| `src/server/marea-commerce/` | untracked | MC-16 `schema.ts` and `domain.ts`. |

No reset, rebase, force-push, merge or history rewrite was performed. No tracked
legacy commerce file is modified: the eight frozen legacy files match their
SHA-256 values exactly (see D14).

## 3. Frozen governance (must not be modified)

The predecessor milestones are closed for MC-16 purposes. Their verdicts, flags and
restrictions are inherited verbatim and **must not** be re-scored, re-worded or
promoted by any MC-16 document, dataset, test or commit.

```text
MC14_VERDICT = PARTIAL
MC14_INTERNAL_LEGAL_GOVERNANCE_SCOPE = PASS_INTERNAL_LEGAL_GOVERNANCE_SCOPE
MC14_EXTERNAL_LEGAL_CLEARANCE = NOT_GRANTED
MC14_CERTIFICATION_APPROVAL = NONE
MC14_COMMERCIAL_CLAIMS_PUBLICATION = NOT_AUTHORIZED

MC15_VERDICT = PARTIAL
MC15_INTERNAL_IA_SEO_SCOPE = PASS_INTERNAL_IA_SEO_SCOPE
MC15_INDEXATION_EVIDENCE = SEARCH_CONSOLE_VERIFIED_PARTIAL
MC15_PUBLICATION_AUTHORIZED = false
MC15_REDIRECTS_ACTIVATED = false
```

Inherited commercial restrictions (non-negotiable; source MC-15 §3 and the MC-14
gate register):

```text
TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED
MAREA_PUBLIC_USE = NO_GO
SOURCE_IP_CLEARANCE = NOT_CLEARED
COMMERCIAL_AVAILABILITY = NOT_FOR_SALE
PRICE_APPROVED = NONE
LICENSING_RIGHTS_GRANTED = false
CUSTOMER_WTP_VALIDATED = false
CUSTOMER_EVIDENCE = NONE
PILOT_SAFETY_GATE = BLOCKED
AIS_TRANSMISSION_OFFERED = false
FLEET_DEFAULT_HARDWARE = false
CE_MARKING_CLAIM = PROHIBITED
NMEA2000_CERTIFIED = false
TESTED_COMPATIBILITY_ROWS = 0
PRODUCTION_DEPLOYMENT = NOT_AUTHORIZED
```

Inherited counts, carried without closure (D16 records the detail):

| Inherited item | Count | Closed |
|---|---|---|
| Release gates | 13 | 0 |
| Required legal/commercial documents | 24 | 0 |
| Website findings | 34 | 0 |
| MC-16 preconditions | 10 | 0 |
| Approved MAREA prices | 0 | — |
| Verified MAREA stock records | 0 | — |
| Real subscriptions / entitlement grants | 0 / 0 | — |
| Published MAREA routes | 0 | — |

The MC-16 package may **describe** these items. It may not close them. Only verified
external evidence owned by the named closure role can close a gate, and no such
evidence exists at this baseline.

## 4. Milestone deliverables and ownership

| ID | File | Content |
|---|---|---|
| D01 | `MC-16-BASELINE-AND-GOVERNANCE.md` | This document: baseline, boundary, evidence policy, change control |
| D02 | `MC16-EXISTING-COMMERCE-ARCHITECTURE-AUDIT.md` | Real legacy shop architecture audit and CIT risks |
| D03 | `MC16-CANONICAL-DOMAIN-DATA-CONTRACT.md` | Evidence classes, identities, null-not-zero, seven entities |
| D04 | `MC16-PRODUCT-FAMILY-EDITION-SKU-MODEL.md` | 9 families, 26 editions, edition vs merchant SKU |
| D05 | `MC16-BUNDLE-COMPOSITION-AND-COMPATIBILITY.md` | 6 bundles, resolution, exclusions, compatibility |
| D06 | `MC16-LIFECYCLE-AND-READINESS-STATE-MACHINE.md` | 7 lifecycle states, 11 readiness dimensions, fail-closed transitions |
| D07 | `MC16-RELEASE-GATE-AND-PURCHASABILITY-POLICY.md` | 13 gates, `evaluatePurchasability`, denial reasons |
| D08 | `MC16-PRICE-APPROVAL-VAT-AND-TERRITORY-MODEL.md` | Minor units, currency, VAT basis, territory/channel, approval |
| D09 | `MC16-INVENTORY-AND-STOCK-PROVENANCE.md` | Admin stock vs verified inventory, atomic reservations |
| D10 | `MC16-SUBSCRIPTION-AND-ENTITLEMENT-MODEL.md` | Plan vs billing contract vs grant, shared ledgers |
| D11 | `MC16-FLEET-TENANCY-AND-VESSEL-SCOPING.md` | Organization/tenant/vessel scope, roles, isolation |
| D12 | `MC16-SECURITY-AND-AUDIT-TRAIL.md` | Authorization, append-only hash-chained audit, tenant isolation |
| D13 | `MC16-SQLITE-SCHEMA-AND-MIGRATION-PLAN.md` | Schema, constraints, triggers, install/rollback plan |
| D14 | `MC16-LEGACY-COMMERCE-COMPATIBILITY.md` | Hash-bound legacy mapping, zero MAREA mapping, preservation |
| D15 | `MC16-SEO-AND-PUBLICATION-DATA-CONTRACT.md` | 23 proposed routes non-deployable, no Product/Offer markup |
| D16 | `MC16-EXTERNAL-EVIDENCE-AND-BLOCKERS.md` | Gates, documents, findings, preconditions, inherited debt |
| D17 | `MC16-INTEGRATION-AND-ROLLBACK-PLAN.md` | Future integration steps, rollback, zero impact now |
| D18 | `MC16-MC17-HANDOFF.md` | Presentation contract, blocked CTA states, accessibility, ES/EN identity |

Supporting machine artefacts (parallel workstreams, not separate documents):
`docs/marea/commerce-data/data/*.json` (21 datasets, manifest
`MC16-COMMERCE-DATA-CONTRACT`), `src/server/marea-commerce/schema.ts`,
`src/server/marea-commerce/domain.ts`, `scripts/marea-commerce-validator.mjs`,
`scripts/check-marea-commerce-data.mjs`, and the internal disposable-database
tooling and persistence suite under `scripts/`.

D01 is a governance document. D19–D23 are supporting artefacts (datasets and
persistence, deterministic and adversarial testing, independent review, Spanish
executive report and the delivery record). They are recorded when they exist and
none of them is an approval.

## 5. Governing principles

1. **Server authority.** Price, stock, readiness, publication, purchasability and
   entitlement scope are decided server-side. Client-supplied price, stock, role,
   tenant, readiness or approval claims are ignored, never trusted.
2. **Definition is not availability.** Nine families and 26 editions are
   `DEFINED`/`CONDITIONAL`/`INSTALLATION_PACKAGE`; none is merchantable, approved,
   stocked, published or for sale.
3. **`products.active` is not readiness.** The legacy shop's active flag is a
   generic-catalogue switch. It authorises no MAREA activity of any kind (D14).
4. **Null is not zero.** Unknown price, stock, quantity, date or evidence is `null`
   / `UNKNOWN` / `NOT_ESTABLISHED`. Zero is a real value and must not be substituted
   for an unknown.
5. **No fabricated evidence.** Test output, a document draft, an internal decision,
   an admin click, a passing validator or the existence of this baseline closes
   nothing and proves no external fact.
6. **Fail closed.** A missing gate, missing evidence, expired evidence, missing
   actor/role, missing territory/channel, missing approval or missing inventory
   yields `allowed = false` and `effectivePrice = null`, `effectiveStock = null`.
7. **Isolation.** MC-16 tables have no foreign keys into legacy tables; the schema is
   installed only by explicit internal tooling into a disposable database; the web
   server does not import it; no startup migration runs it.
8. **Preservation.** Existing products, orders, order items, customers, sessions,
   messages, checkout, Stripe integration, cart semantics, URLs and sitemap remain
   unchanged.
9. **Reversibility.** Every MC-16 artefact is additive and removable. Rollback is a
   no-op for the legacy system (D17).
10. **No public surface.** No proposed MAREA route, price, availability, Product /
    Offer JSON-LD node or CTA is deployed, indexed or emitted.

## 6. Evidence policy

Allowed evidence classes in this package:

| Class | Meaning | Allowed use |
|---|---|---|
| `REPOSITORY_VERIFIED` | Inspected in this working tree at the frozen baseline (`99212a4…`). | Source-of-truth for legacy architecture, files, hashes, schema text |
| `LOCAL_SCRATCH_VERIFIED` | Observed in this session against a disposable temporary SQLite file or by running a read-only local validator. | Schema-guard behaviour, validator snapshot, inherited gate status |
| `ENGINEERING_DESIGN` | Design statement or policy that has not been executed. | Proposed integration, rollback, MC-17 contract |
| `VERIFIED_EXTERNAL` | Third-party document with issuer, date, scope and verification. | **None exists at MC-16.** |

Rules:

- A dataset value is evidence-linked or explicitly `null`/`UNKNOWN`; there are no
  inferred approvals.
- A command result is quoted with the command and its real output. Unrun commands
  are labelled "not executed".
- An inherited status is copied, not recomputed. Where a copied status is stale or
  contradictory (e.g. the inherited V-18 validator failure), it is recorded as debt,
  not silently repaired.
- The parallel MC-16 workstream's validator run is a **snapshot**. It is not an
  independent review, it does not approve the package, and it must be re-run at the
  final candidate commit by the independent reviewer.

## 7. Verification log (this workstream)

| Command | Observed result | Class |
|---|---|---|
| `git rev-parse HEAD` | `99212a41f5942a6fef4ede75815132c11fa4de50` | REPOSITORY_VERIFIED |
| `git rev-parse --abbrev-ref HEAD` | `feature/marea-mc16-commerce-product-data-model` | REPOSITORY_VERIFIED |
| `git ls-remote origin …mc15…` | `99212a4…` | REPOSITORY_VERIFIED (remote) |
| `gh pr view 22 --json …` | `OPEN`, `isDraft: true`, `MERGEABLE`, `mergedAt: null` | REPOSITORY_VERIFIED (read-only API) |
| `gh pr list --head feature/marea-mc16-commerce-product-data-model` | `[]` | REPOSITORY_VERIFIED |
| `Get-FileHash` on the 8 legacy files | all 8 match the frozen mapping | LOCAL_SCRATCH_VERIFIED |
| `node scripts/check-marea-commerce-data.mjs` | `MC-16 commerce data: 1730/1730 checks passed`; `files: 21; families: 9; editions: 26; bundles: 6; routes: 23; gates: 13; approved prices: 0; merchant SKUs: 0; verified inventory: 0` (snapshot, parallel workstream) | LOCAL_SCRATCH_VERIFIED |
| Disposable schema install / guard probe | 20 tables (19 MC-16 + `sqlite_sequence`), 19 triggers, idempotent double install, all six activation probes blocked (`MC16_COMMERCIAL_ACTIVATION_PROHIBITED`, `MC16_MERCHANTABLE_EDITION_PROHIBITED`, `MC16_AUDIT_APPEND_ONLY` ×2, `MC16_REAL_ENTITLEMENT_GRANT_PROHIBITED`, publication CHECK), drop leaves 0 `marea_%` tables | LOCAL_SCRATCH_VERIFIED |
| `npm run test:financial` | `77 checks - 76 PASS / 1 FAIL`; `FAIL V-18 - No MC-14 execution`; exit 1 | LOCAL_SCRATCH_VERIFIED |
| `git diff --stat HEAD` | `package.json` only (parallel workstream script entries) | REPOSITORY_VERIFIED |
| Import scan `marea-commerce` under `src/` | 0 matches outside `src/server/marea-commerce/` | REPOSITORY_VERIFIED |

The V-18 failure is inherited debt, documented in D16. It is not caused by MC-16 and
must not be "fixed" by editing the financial milestone's frozen data.

## 8. Change control

Within MC-16, only the following may change:

- new files under `docs/marea/commerce-data/` (21 data files and this document set);
- new files under `src/server/marea-commerce/` (schema and domain code);
- new internal scripts and tests under `scripts/` for validation, adversarial tests
  and disposable persistence, plus the minimal `package.json` script/format entries
  required to run them;
- MC-16 records in execution governance when the Lead explicitly records them.

The following must **not** change in this milestone:

- any file under `src/app/` (components, routes, i18n, styles) or `src/server/`
  outside `src/server/marea-commerce/`;
- `data/embarcarte.sqlite`, uploads, orders, products or customer rows;
- MC-01…MC-15 packages, frozen verdicts, gate statuses or findings;
- `.agent-teams/` state through direct file edits;
- dependencies, lockfile, Angular/Express/Node versions;
- public URLs, redirects, sitemap, robots or metadata.

A change outside this boundary is a scope violation regardless of how small it looks.
No merge, push, tag, release, publication or deployment is authorized by MC-16.

## 9. Status vocabulary

| Term | Meaning in MC-16 |
|---|---|
| `DEFINED` | Target specification exists internally; not built, certified or sold |
| `CONDITIONAL` | Depends on an unresolved engineering, measurement or commercial condition |
| `INSTALLATION_PACKAGE` | Service/installation scope; never a priced SKU, bundle line or checkout item |
| `NOT_FOR_SALE` | No commercial availability; no price, stock or CTA may be published |
| `INTERNAL_ONLY` | Internal artefact; not a public claim |
| `BLOCKED` | A gate cannot close with current evidence |
| `EVIDENCE_REQUIRED` | A gate could close only with named external evidence that is absent |
| `CLOSED_VERIFIED` | Gate closed by usable, verified external evidence — **0 at MC-16** |
| `PENDING` | Work not yet independently reviewed |
| `PARTIAL` | Scope completed internally, external evidence absent |
| `FAIL` / `BLOCKED` | Delivery status when a prerequisite or validation fails |

## 10. Milestone exit criteria (not met by this document)

MC-16 can be declared complete only when all of the following hold and are recorded
by the Lead after independent review:

1. D01–D18 exist and their cross-references resolve.
2. All 21 datasets parse and the package validator passes at the final candidate
   commit (record the exact command and count).
3. The disposable schema install/verify/rollback suite passes and never touches
   `data/embarcarte.sqlite`.
4. All eight legacy hashes still match and no legacy behaviour changed.
5. No secret, customer datum, live price, live stock or fabricated external evidence
   appears anywhere in the package.
6. An independent reviewer (not an author) records `PASS` with 0 open
   BLOCKING/MAJOR findings; review verdicts are not self-issued.
7. `MC17_STARTED = false`, no route published, no price approved, no SKU created, no
   order changed, no deployment performed.
8. `docs/marea/execution/` records the MC-16 evidence and decision entries only if
   the Lead explicitly authorizes that write.

Until then the package status is `INTERNAL_ONLY` / `PENDING_INDEPENDENT_REVIEW` and
nothing in it may be used as a commercial approval.
