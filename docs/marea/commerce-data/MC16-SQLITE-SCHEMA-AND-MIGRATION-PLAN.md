# MC-16 D13 — SQLite schema and migration plan

| Field | Value |
|---|---|
| Document ID | MC-16 / D13 / MC16-SQLITE-SCHEMA-AND-MIGRATION-PLAN |
| Milestone | MC-16/36 — commerce and product data model |
| Owner | commerce-docs (pricing, inventory, subscription and integration architect) |
| Date | 2026-11-03 |
| Base commit | `99212a41f5942a6fef4ede75815132c11fa4de50` |
| Branch | `feature/marea-mc16-commerce-product-data-model` |
| Schema version | `mc16-commerce-schema-1.0.0` |
| Status | `INTERNAL_ONLY` — isolated disposable schema; no production migration |
| Evidence class | `ENGINEERING_DESIGN` + `REPOSITORY_VERIFIED` |
| Source | `src/server/marea-commerce/schema.ts`; `scripts/marea-commerce-schema.mjs`; `scripts/check-marea-commerce-persistence.test.mjs` |
| Production isolation | Schema is not imported by the running server; no startup migration exists |

## 1. Purpose and boundary

This document specifies the MC-16 relational schema, its constraints and guards,
the idempotent install/rollback tooling and the migration/isolation rules. The
schema is installed only into an explicitly supplied disposable SQLite database
by internal tooling. It is never attached to the application database
`data/embarcarte.sqlite`, never imported by a route, checkout or Stripe handler
and never executed on server startup.

The schema is deliberately fail-closed: every current MAREA entity is
non-merchantable, every publication flag is `0`, every subscription checkout flag
is `0`, and every activation path raises an abort. A future milestone must
migrate the guards deliberately; a passing test cannot remove them.

## 2. Table inventory (19 tables)

All tables are `STRICT`. `PRAGMA foreign_keys = ON` is issued before install.
`IF NOT EXISTS` makes every object idempotent.

| # | Table | Purpose | Primary key | Foreign keys | Key constraints | Indexes |
|---:|---|---|---|---|---|---|
| 1 | `marea_schema_meta` | Installed version/date | `schema_version` | — | `applied_at` NOT NULL; `notes` default `''` | — |
| 2 | `marea_product_families` | Nine product families | `family_id` | — | product type/lifecycle/publication/availability enums; JSON validity; `edition_ids_json` length ≥ 1 | — |
| 3 | `marea_product_editions` | 26 editions | `edition_id` | `family_id → families` RESTRICT | definition/edition/lifecycle/price/commercial enums; `merchant_sku_code UNIQUE`; `merchant_sku_code NULL → merchantable 0`; boolean checks | `(family_id)`, `(commercial_availability, merchantable)` |
| 4 | `marea_merchant_skus` | Future merchant SKU identity | `sku_code` | `edition_id → editions UNIQUE` RESTRICT | state enum; `sku_code <> edition_id`; approved/active requires evidence and approver | — (unique edition) |
| 5 | `marea_release_gates` | 13 inherited gates | `gate_id` | — | status enum; `CLOSED_VERIFIED` requires evidence ids | — |
| 6 | `marea_release_gate_evidence` | External/repository evidence | `evidence_id` | `gate_id → gates` RESTRICT | type/class/status enums; `VALID` requires `verified = 1`; `expires_at > issued_at`; hash ≥ 32 chars | `(gate_id, status)` |
| 7 | `marea_bundles` | Six bundles | `bundle_id` | — | lifecycle/availability/publication/price enums; `hardware_included_by_default = 0`; `sla_established = 0`; fixed price flag | — |
| 8 | `marea_bundle_components` | Bundle lines | `(bundle_id, line_id)` | `bundle_id → bundles`, `edition_id → editions` RESTRICT | `quantity > 0`; inclusion enum; `is_priced_line = 0`; unique `(bundle_id, edition_id, inclusion)` | `(edition_id)` |
| 9 | `marea_readiness_snapshots` | Evaluation history | `snapshot_id` | — (polymorphic entity) | entity type enum; JSON dimensions; `ready` 0/1; unique `(entity_type, entity_id, evaluated_at, policy_version)` | — |
| 10 | `marea_price_versions` | Price governance records | `price_version_id` | `edition_id → editions`; `superseded_by_price_version_id → self` RESTRICT | price status enum; integer amount ≥ 0; approved requires amount/currency/territory/channel/VAT/effective/approver/evidence; effective window | `(edition_id, status)` |
| 11 | `marea_price_approval_evidence` | Price↔evidence link | `(price_version_id, evidence_id)` | both → price versions / gate evidence RESTRICT | — | — |
| 12 | `marea_inventory_items` | Verified physical stock | `inventory_item_id` | `edition_id → editions`; `stock_evidence_id → evidence` RESTRICT | non-negative on-hand/reserved; `reserved <= on-hand`; generated available; status enum; `AVAILABLE` requires verified; verified requires evidence; source enum | `(edition_id, status, verified)` |
| 13 | `marea_inventory_movements` | Append-style stock journal | `movement_id` | `inventory_item_id → items`; `evidence_id → evidence` RESTRICT | type enum; `quantity_delta <> 0`; reason/actor/role/time/correlation required; `ADJUSTMENT` requires evidence and reason ≥ 8 chars | `(inventory_item_id, occurred_at)` |
| 14 | `marea_subscription_plans` | 13 plan definitions | `plan_id` | `family_id → families` RESTRICT, nullable | billing period/status/billing-mode/price enums; `checkout_allowed = 0`; `auto_renew = 0`; unique `(plan_key, family_id)` | — |
| 15 | `marea_entitlement_definitions` | 12 capability definitions | `entitlement_id` | `family_id → families` RESTRICT, nullable | capability key UNIQUE; term enum; ledger key non-empty; status enum; `double_billing_allowed = 0`; `gates_local_safety = 0`; licensed-data boolean | — |
| 16 | `marea_entitlement_dependencies` | Entitlement graph | `(entitlement_id, depends_on_entitlement_id, relationship)` | both → definitions RESTRICT | relationship/billing-scope enums; no self-dependency | — |
| 17 | `marea_entitlement_grants` | Actual rights (synthetic only) | `grant_id` | `entitlement_id → definitions` RESTRICT | scope/state/basis enums; `scope_id` non-empty; `synthetic = 1`; active end > start; `CONTRACT` basis impossible | `(scope_type, scope_id, state)` |
| 18 | `marea_audit_events` | Append-only hash chain | `sequence AUTOINCREMENT` | — | `event_id UNIQUE`, `event_hash UNIQUE` ≥ 32; result enum; reason/correlation/actor required; update/delete blocked by triggers | `(entity_type, entity_id, timestamp)` |
| 19 | `marea_publication_eligibility` | Per-route publication state | `route_id` | — | publication/index/sitemap/commercial/offer flags all `CHECK = 0`; blocking-gate JSON; policy version required | — |

Index count: **9** (`idx_marea_editions_family`,
`idx_marea_editions_availability`, `idx_marea_gate_evidence_gate`,
`idx_marea_bundle_components_edition`, `idx_marea_price_edition`,
`idx_marea_inventory_edition`, `idx_marea_movements_item`,
`idx_marea_grants_scope`, `idx_marea_audit_entity`).

## 3. Foreign keys and referential rules

- Every declared FK uses `ON DELETE RESTRICT`. Deleting a referenced family,
  edition, gate, evidence record, inventory item or entitlement definition is
  rejected rather than cascading. This preserves provenance.
- `marea_merchant_skus.edition_id` is `UNIQUE`: at most one merchant SKU per
  edition.
- `marea_price_approval_evidence` is a composite link; evidence cannot be
  attached to a non-existent price or gate record.
- `marea_readiness_snapshots` and `marea_publication_eligibility` are
  intentionally polymorphic/route-keyed and have no FK to a product table; their
  referential integrity is a service/validator rule. This is a known limit, not
  a claim of complete relational enforcement.
- `marea_subscription_plans.entitlement_id` is a text reference, not a declared
  FK. A future migration should add the FK after the plan/definition loading
  order is fixed. Current data is validated by the data validator.
- `marea_entitlement_grants.audit_event_id` is a text reference, not a declared
  FK (audit rows may be inserted in the same transaction); the grant validator
  requires it.

## 4. Constraints that carry policy

| Area | Binding checks |
|---|---|
| Lifecycle | Seven-state enum on families, editions, bundles and readiness snapshots |
| Commercial state | `commercial_availability` and `publication_state` enums; current rows must be `NOT_FOR_SALE` / `INTERNAL_ONLY` |
| Price | Status enum; integer minor units; non-negative; approved completeness; effective window; territory/channel/VAT presence |
| Inventory | Non-negative quantities; `reserved <= on-hand`; generated available; `AVAILABLE` requires verification; verified requires evidence; adjustment evidence |
| Subscription | `checkout_allowed = 0`; `auto_renew = 0`; plan status limited; real grants rejected |
| Publication | Five flags are hard-coded `0`; no update can set them to `1` without a schema migration |
| Audit | Append-only; unique event/hash; actor, role, reason, correlation, result, evidence JSON |

`STRICT` tables reject values outside the declared column types; JSON columns
also have `json_valid(...)` checks. `marea_inventory_items.quantity_available` is
a stored generated column, so callers cannot forge it.

## 5. Triggers (15)

| Trigger | Event | Effect |
|---|---|---|
| `trg_marea_family_mc16_guard` | INSERT families | Abort `MC16_COMMERCIAL_ACTIVATION_PROHIBITED` on `FOR_SALE` or readiness lifecycle |
| `trg_marea_family_mc16_guard_update` | UPDATE families | Same |
| `trg_marea_edition_mc16_guard` | INSERT editions | Abort `MC16_MERCHANTABLE_EDITION_PROHIBITED` on merchantable/price/published/availability/readiness |
| `trg_marea_edition_mc16_guard_update` | UPDATE editions | Same |
| `trg_marea_sku_mc16_guard` | INSERT merchant SKUs | Abort `MC16_MERCHANT_SKU_ACTIVATION_PROHIBITED` on approved/active/merchantable/priced |
| `trg_marea_sku_mc16_guard_update` | UPDATE merchant SKUs | Same |
| `trg_marea_bundle_mc16_guard` | INSERT bundles | Abort `MC16_BUNDLE_ACTIVATION_PROHIBITED` on sale/published/readiness/fixed price |
| `trg_marea_bundle_mc16_guard_update` | UPDATE bundles | Same |
| `trg_marea_price_approval_guard` | UPDATE price status | Abort `MC16_PRICE_APPROVAL_EVIDENCE_REQUIRED` unless valid verified external `PRICE_APPROVAL`/`EXTERNAL_PRICE_LIST` evidence is linked |
| `trg_marea_price_approval_guard_insert` | INSERT price | Same; a price cannot be born `APPROVED` |
| `trg_marea_entitlement_real_grant_guard` | INSERT grants | Abort `MC16_REAL_ENTITLEMENT_GRANT_PROHIBITED` on non-synthetic or contract/purchase/migration basis |
| `trg_marea_subscription_activation_guard` | INSERT plans | Abort `MC16_SUBSCRIPTION_ACTIVATION_PROHIBITED` on checkout or non-definition state |
| `trg_marea_audit_no_update` | UPDATE audit | Abort `MC16_AUDIT_APPEND_ONLY` |
| `trg_marea_audit_no_delete` | DELETE audit | Abort `MC16_AUDIT_APPEND_ONLY` |
| `trg_marea_audit_no_replace` | INSERT audit | Abort `MC16_AUDIT_DUPLICATE` on duplicate event id or hash |

The activation guards are not security theatre around a live product: they are
the reason a future migration, not a UI toggle, is required to activate MAREA
commerce.

## 6. Idempotent install

`installMareaCommerceSchema(db, appliedAt)`:

1. executes `PRAGMA foreign_keys = ON`;
2. executes the full `CREATE TABLE/INDEX/TRIGGER IF NOT EXISTS` script;
3. inserts `('mc16-commerce-schema-1.0.0', appliedAt, 'MC-16 isolated internal schema')`
   with `INSERT OR IGNORE`.

Re-running install on the same database is a no-op for schema objects and leaves
exactly one `marea_schema_meta` row for the version. The SQL is deterministic and
contains no `DROP`, no data mutation and no external dependency.

CLI (`scripts/marea-commerce-schema.mjs`):

```text
node scripts/marea-commerce-schema.mjs --install --db <disposable.sqlite>
node scripts/marea-commerce-schema.mjs --verify  --db <disposable.sqlite>
node scripts/marea-commerce-schema.mjs --drop    --db <disposable.sqlite>
node scripts/marea-commerce-schema.mjs --print-version
```

## 7. Rollback

`dropMareaCommerceSchema(db)` executes `MAREA_COMMERCE_DROP_SQL`: drop all 15
triggers first, then all 19 tables in reverse dependency order, using
`IF EXISTS`. The result is a clean database with zero `marea_*` tables; a
subsequent install restores the full schema. This is a full disposable-database
rollback, not a production down-migration.

Verified evidence (2026-11-03): two installs produced **19/19 tables**, **15
triggers**, **1** schema-meta row, `foreign_keys = 1`; `--drop` left **0**
`marea_*` tables. The persistence suite additionally passes 16/16 tests,
including idempotency, FK failure rollback and full drop/reinstall reversibility.

## 8. Isolation from production

| Control | Contract |
|---|---|
| Not imported by the app | The only imports of `schema.ts` are the CLI, the validator and the persistence test; no server route, checkout, Stripe handler or startup file imports it |
| No startup migration | `installMareaCommerceSchema` is never called by the running server; there is no migration runner in `src/server` |
| Production path refused | CLI refuses `data/embarcarte.sqlite` and every path inside the repository `data` directory |
| Disposable-only path | CLI requires an absolute path inside the OS temp directory or clearly marked test/tmp/scratch/disposable |
| No production data | Schema creates only `marea_*` tables; it does not read or migrate legacy `products`, `orders`, `users` or `sessions` |
| No secrets | Schema stores no card data, tokens, passwords or provider secrets; audit text rejects payment-secret tokens |
| Separate connection | The caller supplies the `SqliteExecutor`; the schema never opens the application database itself |
| Explicit activation | Removing a guard or flipping a publication flag requires a reviewed migration and release-gate evidence, not runtime configuration |

Current production database `data/embarcarte.sqlite` and the legacy shop are
unchanged. The MC-16 validator and persistence tests run only against temp
databases.

## 9. Migration plan

| Step | Change | Preconditions | Status |
|---|---|---|---|
| M0 | Current `1.0.0` schema installed in disposable DBs only | This document and tests | **DONE (isolated)** |
| M1 | Add FKs/composite scope identified in D09/D11 and add missing FK for plan entitlement | Reviewed migration + negative tests | **NOT_AUTHORIZED** |
| M2 | Wire an authorized account/entitlement service to a non-production environment with synthetic fixtures | Security/privacy gates, DPA/DPIA | **NOT_AUTHORIZED** |
| M3 | Remove or relax an activation guard for a specific entity | All applicable release gates closed with verified evidence; finance/legal/commercial approval; independent review; explicit rollback | **NOT_AUTHORIZED** |
| M4 | Production migration | Separate change authorization, backup/restore proof, maintenance window, post-migration verification | **NOT_AUTHORIZED** |

Rules: migrations are forward-only and versioned; no destructive rewrite; no
data is inferred to fill an unknown; every migration has a tested rollback; a
production migration requires human authorization and is explicitly outside
MC-16. A test pass cannot substitute for external evidence or gate closure.

## 10. Known schema limits (deferred, no current impact)

1. `marea_subscription_plans.entitlement_id` is not a declared FK.
2. `marea_entitlement_grants` stores one scope pair; FLEET needs composite
   organisation+vessel scope (D11-GAP-01).
3. `marea_inventory_movements.quantity_delta` does not encode which counter it
   changes (D09-GAP-01); evidence is enforced only for `ADJUSTMENT`
   (D09-GAP-02).
4. `marea_audit_events` stores and uniquely constrains hashes, but the database
   does not compute the SHA-256 chain; the service must compute it and the test
   suite must verify it.
5. Readiness snapshots and publication eligibility are polymorphic/keyed without
   FKs.
6. No table exists for organisations, vessels, telemetry, contracts, invoices or
   payments; those are future milestones, not MC-16 omissions.

## 11. Verification

| Command | Result |
|---|---|
| `node scripts/marea-commerce-schema.mjs --print-version` | `mc16-commerce-schema-1.0.0` |
| `node --test --test-isolation=none scripts/check-marea-commerce-persistence.test.mjs` | **16/16 passed**, 0 failed |
| `node scripts/check-marea-commerce-data.mjs` | **1,727/1,727 checks passed** |
| Two-install probe | 19 tables, 15 triggers, 1 meta row, FK on |
| Drop probe | 0 `marea_*` tables after drop |

## 12. References

- `src/server/marea-commerce/schema.ts` — schema SQL, version, install/drop
  functions.
- `scripts/marea-commerce-schema.mjs` — disposable-path CLI and production
  refusal.
- `scripts/check-marea-commerce-persistence.test.mjs` — 16 persistence tests.
- `scripts/marea-commerce-validator.mjs` — data validator and schema import.
- `MC16-INVENTORY-AND-STOCK-PROVENANCE.md` (D09), `MC16-FLEET-TENANCY-AND-VESSEL-SCOPING.md`
  (D11), `MC16-SUBSCRIPTION-AND-ENTITLEMENT-MODEL.md` (D10) — table semantics.
- `MC16-INTEGRATION-AND-ROLLBACK-PLAN.md` (D17) — future integration and
  production rollback ownership.

**Status statement.** The schema is an isolated, disposable persistence
artefact. No production migration, deployment or activation is authorised.
