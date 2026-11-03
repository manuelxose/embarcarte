# MC-16 — Integration and rollback plan (D17)

| Field | Value |
|---|---|
| Deliverable | D17 `MC16-INTEGRATION-AND-ROLLBACK-PLAN.md` |
| Milestone | MC-16/36 — MAREA commerce and product data model |
| Date | 2026-11-03 |
| Owner | governance-docs |
| Status | **PLAN ONLY — NOT EXECUTED** |
| Current production impact | **ZERO** |
| Production migration | **NOT_AUTHORIZED** |

## 1. Authority and purpose

This document defines how a *future, separately authorized* milestone may integrate
the MC-16 commerce model, and how to roll it back. It is a plan, not an execution
record. Nothing here authorizes a merge, deploy, schema install on production, data
migration, feature flag change, price publication or sale.

MC-16 has no production integration. Its deliverables are additive files under
`docs/marea/commerce-data/`, `src/server/marea-commerce/`, `scripts/` and minimal
internal `package.json` script entries.

## 2. Zero-impact proof at MC-16

| Check | Evidence |
|---|---|
| Server does not import MC-16 code | `grep 'marea-commerce' src/` returns only files inside `src/server/marea-commerce/`; `src/server.ts`, `src/server/api.ts`, `src/server/db.ts` import none |
| No startup migration | `installMareaCommerceSchema` / `dropMareaCommerceSchema` are explicit exports; no server module calls them |
| No route or UI change | no file under `src/app/` or `src/server/` outside `src/server/marea-commerce/` is modified |
| No legacy FK | no `marea_*` table references `products`, `orders`, `users`, `sessions`, `messages` |
| Legacy files unchanged | 8/8 SHA-256 match (D14) |
| Legacy DB untouched | `data/embarcarte.sqlite` is git-ignored and never opened by MC-16 work |
| Publication unchanged | no route, sitemap entry, metadata, robots rule or JSON-LD node added |
| MC-17 not started | `mc17Started = false`, `mc17ImplementationAuthorized = false` |
| Public flags | `NOT_FOR_SALE`, 0 approved prices, 0 merchant SKUs, 0 verified inventory, 0 published routes |

The only reachable effect of MC-16 is on an explicitly supplied disposable SQLite
file. Even there, every activation guard aborts.

## 3. Integration preconditions (all unmet)

Integration cannot start until:

1. a written authorization exists for the integration milestone, separate from
   MC-16;
2. MC-16 has passed independent review with 0 open BLOCKING/MAJOR findings;
3. the 13 release gates relevant to the integrated scope are `CLOSED_VERIFIED` with
   usable external evidence;
4. the 24 required documents are executed;
5. legal identity, consumer/B2B/subscription terms, privacy/DPIA and the PILOT safety
   case are approved as applicable;
6. prices are approved with VAT basis and territory/channel;
7. verified inventory exists with receipts and a reservation ledger;
8. payment/merchant and insurance evidence exists;
9. the MC-17 presentation contract is accepted and its blocked states are proven;
10. a rollback rehearsal has passed on a disposable database and a staging copy.

At MC-16 every item above is absent (D16). The plan below is therefore conditional.

## 4. Target integration architecture (design)

- **Separate storage.** A dedicated SQLite file (for example
  `data/marea-commerce.sqlite`) or a separately attached database — never the legacy
  `embarcarte.sqlite` tables. No cross-database foreign keys.
- **Repository/service boundary.** MC-16 domain functions are called by an explicit
  MAREA service layer; the public shop and Stripe handlers remain on the legacy path
  and never import the MC-16 evaluator (SEC-MC16-04).
- **Explicit migration runner.** A CLI with `--install`, `--verify`, `--drop`,
  `--print-version`, requiring an explicit path, refusing the repository data
  directory and the legacy file. No migration on application startup
  (SEC-MC16-20).
- **Versioned schema.** `marea_schema_meta.schema_version` must match the code before
  use; mismatch aborts rather than migrates silently.
- **Fail-closed purchase path.** Any future quote/reserve/charge path calls
  `evaluatePurchasability` and refuses when `allowed = false`. It must not consult
  `products.active`, admin stock, legacy prices or client claims.
- **Audit in the same transaction.** Every state change writes the audit event and
  its hash-chain link before commit; a failed audit write aborts the change.
- **Publication gate.** No route, markup or sitemap entry is emitted from MC-16
  data; a future publisher must call `evaluatePublicationEligibility` and remains
  disabled while any blocking gate is open.

## 5. Phased integration plan

| Phase | Work | Exit criteria | Rollback trigger |
|---|---|---|---|
| P0 | Authorization, review, scope freeze | Written authorization; independent PASS; no open BLOCKING | Any missing authorization → stop |
| P1 | Data and schema freeze | Validator clean at candidate commit; D01–D18 accepted; legacy hashes verified | Drift in hashes/counts → stop |
| P2 | Disposable install/verify/drop | Install twice idempotent; all guards abort; drop leaves no tables; no legacy access | Any legacy open or guard bypass → stop |
| P3 | Shadow evaluation | Synthetic scenarios only; `evaluatePurchasability` denies all current MAREA entities; no runtime writes | Any `allowed = true` for a current entity → stop |
| P4 | Isolated staging service | Separate DB; feature flag default **off**; repository layer enforces scope; audit chain verified | Legacy behaviour change or flag default on → revert |
| P5 | Back-office workflows | Authorized roles can propose prices/evidence; approval still blocked without external evidence; audit complete | Any approval without evidence → revert |
| P6 | Commercial evidence closure | 13 gates closed by owners; prices approved; inventory verified; terms/insurance live | Any gate reopens → revert |
| P7 | Canary and cutover | Separately authorized; canary metrics and rollback rehearsed; MAREA CTA enabled only for eligible entities | Any consumer harm, price/stock mismatch or audit gap → revert |

MC-16 ends at P1. P2 is prepared by the persistence workstream on disposable
databases. P3–P7 are future milestones and are not authorized here.

## 6. Rollback plan

Rollback is designed to be **additive-removal**, never a legacy restore:

| Level | Trigger | Action | Legacy impact |
|---|---|---|---|
| R0 | Normal MC-16 state | Do nothing; MC-16 is dormant | none |
| R1 | A future import/flag must be withdrawn | Remove the MC-16 import/service wiring and set the feature flag off; restart the server | none |
| R2 | MC-16 data must be discarded | Export audit events for the record, then run the explicit `--drop` (triggers and tables) against the **MC-16 database only** | none |
| R3 | MC-16 database corrupted | Restore the MC-16 database from its own verified backup; never restore over the legacy database | none |
| R4 | Release must be aborted | Revert the release decision; keep the legacy shop serving | none |

Rules:

- the `--drop` path must refuse `data/embarcarte.sqlite` and any repository data path;
- drop order is triggers first, then tables (see `MAREA_COMMERCE_DROP_SQL`), so FK
  restrictions never block removal;
- audit export happens **before** drop; audit deletion is prohibited in normal
  operation and permitted only through this explicit, recorded rollback;
- no rollback step runs a destructive statement against a legacy table;
- a rollback is recorded with actor, reason and evidence, and is re-verified with the
  same hash check used for legacy preservation.

## 7. Rollback rehearsal matrix (required before P4)

| Rehearsal | Pass condition | Status at MC-16 |
|---|---|---|
| Fresh install | 19 MC-16 tables + meta, 14 triggers | PASS on disposable DB (this workstream) |
| Idempotent install | second install leaves one schema version row | PASS on disposable DB |
| Guard probes | activation, approval, grant, audit mutation and publication attempts abort | PASS on disposable DB |
| Drop | 0 remaining `marea_%` tables | PASS on disposable DB |
| Reinstall after drop | schema usable again | NOT EXECUTED |
| Legacy hash check after every step | 8/8 unchanged | PASS at baseline; must repeat |
| Legacy commerce regression | `npm run test:commerce` passes with MC-16 files present | NOT EXECUTED in this workstream |
| Sitemap/route regression | `npm run test:seo` unchanged | NOT EXECUTED in this workstream |
| Audit chain verification | recomputed chain matches and head anchored | NOT IMPLEMENTED (SEC-GAP-01) |

The unimplemented/absent items are prerequisites for P4, not claims of success.

## 8. Migration safety rules

1. Explicit path and explicit command; no environment-driven auto-install.
2. Refuse the legacy database, the repository `data/` directory and any path that is
   not clearly temporary/test.
3. Version check before use; unknown version aborts.
4. All DDL in a transaction where SQLite permits; never leave a half-installed
   schema.
5. Backup before any future production-shaped migration, with a verified restore
   (`npm run test:backup` remains the legacy gate).
6. No `ALTER`/`DROP`/`DELETE` against legacy tables.
7. No dual-write into the legacy `products`/`orders` tables; integration must not
   make the legacy shop a second source of truth.
8. Least-privilege database access; the application account must not own the file
   directory in production.
9. Logs must not contain secrets, card data, customer PII or full audit payloads.
10. Every activation guard removal is a separate, reviewed migration with its own
    authorization and rollback.

## 9. Stop conditions

Stop and escalate if any of the following occurs:

- a legacy hash changes or a legacy test fails;
- any MC-16 file is imported by a public route, checkout or Stripe handler;
- a guard can be bypassed, or an approval is recorded without usable external
  evidence;
- a MAREA entity evaluates `allowed = true` before P6 is complete;
- a route, price, availability statement or Product/Offer markup appears publicly;
- the audit chain cannot be verified or an event can be mutated;
- a rollback step would touch legacy data;
- production deployment, merge or publication is attempted without written
  authorization.

## 10. Authorization record (to be filled by the Lead, not by MC-16)

```text
Integration milestone:        <not assigned>
Authorization reference:      <none>
Authorized by:                <none>
Date:                         <none>
Scope:                        <none>
Rollback rehearsal evidence:  <none>
Review verdict:               <pending>
Production migration:         NOT_AUTHORIZED
```

## 11. Conclusion

MC-16 is **dormant by construction**. It has no runtime path, no production database,
no legacy write, no public surface and no approval. The integration plan is staged,
evidence-gated and reversible; the rollback plan removes only MC-16 artefacts and
never touches legacy commerce. Until the preconditions in §3 are met, the correct
action is to keep the package internal and inactive.
