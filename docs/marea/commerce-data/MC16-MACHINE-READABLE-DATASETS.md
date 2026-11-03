# MC16 — Machine-readable datasets and isolated persistence implementation (D19)

| Field | Value |
|---|---|
| Milestone | MC-16/36 — enterprise commerce and product data architecture |
| Status | `INTERNAL_ONLY` |
| Contract | `MC16-COMMERCE-DATA-CONTRACT` v1.0.0 |
| Canonical data | `docs/marea/commerce-data/data/` |
| Engine | `src/server/marea-commerce/` |
| Schema version | `mc16-commerce-schema-1.0.0` |
| Production migration | `NOT_EXECUTED` |
| Merchantable MAREA SKUs | `0` |
| Approved prices | `0` |
| Verified sellable stock | `0` |
| Real subscriptions / grants | `0 / 0` |

## 1. Canonical dataset inventory

`data/manifest.json` is the single inventory of the machine-readable contract. The
validator fails if the manifest and the directory diverge.

| File | Purpose | Current cardinality |
|---|---|---|
| `manifest.json` | Inventory, counts, status flags and canonical rules | 21 files |
| `product-families.json` | Nine family identities, readiness and gate dependencies | 9 |
| `product-editions.json` | Inherited edition identities and multidimensional readiness | 26 |
| `sku-candidates.json` | Future merchant-SKU candidates, all non-merchantable | 26 |
| `bundle-compositions.json` | Six bundles and resolved component composition | 6 |
| `lifecycle-policy.json` | Lifecycle states, transitions, fail-closed authorisation | 7 states / 6 transitions |
| `readiness-dimensions.json` | Eleven independent readiness dimensions | 11 |
| `release-gate-mapping.json` | Thirteen inherited release gates and 24 documents | 13 / 24 |
| `price-governance.json` | Price statuses, hypotheses, approval policy | 26 records, 0 approved |
| `inventory-governance.json` | Stock provenance, invariants and reservation policy | 0 items |
| `subscription-plans.json` | Recurring plan definitions, inactive | 13 |
| `entitlement-definitions.json` | Capability and licence definitions | 12 |
| `entitlement-mappings.json` | Bundle-to-entitlement maps and shared ledgers | 6 bundles |
| `publication-eligibility.json` | 23 proposed routes, all non-deployable | 23 |
| `source-lineage.json` | Immutable source paths and SHA-256 hashes | 16 sources |
| `legacy-commerce-mapping.json` | Legacy shop file hashes and zero MAREA mapping | 8 files |
| `security-invariants.json` | Server authority, tenant and audit invariants | 25 |
| `audit-event-contract.json` | Append-only event fields, types and rules | 12 event types |
| `blocker-register.json` | Gates, documents, findings, preconditions and inherited debt | 13 / 24 / 34 / 10 |
| `mc17-handoff-inputs.json` | Presentation and data contract for MC-17 | `MC17_STARTED=false` |
| `review-findings.json` | Independent audit findings and verdict | set after audit |

All records carry stable identifiers and source references. Unknown monetary amounts,
stock quantities, currency, territory, VAT basis, effective dates and merchant SKU codes
are `null`; they are never zero. The source lineage records immutable source hashes and
is verified by the validator.

## 2. Persistence implementation

The executable internal schema lives in `src/server/marea-commerce/schema.ts` and exports:

- `MAREA_COMMERCE_SCHEMA_VERSION`
- `MAREA_COMMERCE_TABLES`
- `MAREA_COMMERCE_SCHEMA_SQL`
- `installMareaCommerceSchema(db, appliedAt?)`
- `dropMareaCommerceSchema(db)`

It implements nineteen tables, including all tables required by the milestone:

`marea_product_families`, `marea_product_editions`, `marea_merchant_skus`,
`marea_bundles`, `marea_bundle_components`, `marea_readiness_snapshots`,
`marea_release_gate_evidence`, `marea_price_versions`, `marea_inventory_items`,
`marea_inventory_movements`, `marea_subscription_plans`,
`marea_entitlement_definitions`, `marea_entitlement_dependencies` and
`marea_audit_events`, plus `marea_schema_meta`, `marea_release_gates`,
`marea_price_approval_evidence`, `marea_entitlement_grants` and
`marea_publication_eligibility`.

Every table is `STRICT`; foreign keys are enabled; enums, quantities, unique identities
and approval evidence are checked. Triggers enforce the MC-16 guards:

- no family, edition or bundle may become commercially available or published;
- no edition may become merchantable or price-approved;
- no merchant SKU may be approved or active;
- an approved price needs linked, valid, verified external evidence and an authorised
  approver role;
- inventory cannot be negative or reserved above quantity on hand;
- real entitlement grants and checkout-enabled subscriptions are rejected;
- audit events cannot be updated or deleted;
- the fixed FLEET hardware-default and SLA claims are rejected.

These guards are deliberate MC-16 constraints. A later milestone must migrate them by an
explicit, reviewed, versioned change; a test pass cannot remove them.

## 3. Runnable local-only path

`scripts/marea-commerce-schema.mjs` is the explicit installer/verifier/dropper. It:

1. requires an explicit `--db` path;
2. refuses `data/embarcarte.sqlite`, the repository `data/` directory and paths that are
   not clearly temporary/test;
3. enables `PRAGMA foreign_keys=ON`;
4. installs idempotently;
5. supports `--verify`, `--drop` and `--print-version`;
6. never runs on server startup and is never imported by the public server.

Persistence tests use a temporary directory and synthetic rows only. No customer,
vessel, order, stock or payment data is read or written. No production migration is
executed.

## 4. Non-duplication and identity rules

- A family is not an edition and not a SKU.
- An edition is not automatically a merchantable SKU.
- `merchantSkuCode` is `null` for all 26 editions.
- A bundle is not a SKU and has no fixed package price.
- PILOT-PRO is an installation package and is never a bundle line.
- SENSE-ESSENTIALS expands exactly to SENSE-POWER + SENSE-BILGE and is not counted twice.
- A page, route, price or hypothesis never creates a product or SKU identity.
- ES and EN content reference the same entity; no locale-specific SKU exists.

## 5. Change control

The canonical datasets are read-only inputs for implementation and must not be updated to
make a test pass. Any future change requires a new contract version, source-lineage update,
validator regression and independent review. Historical evidence and audit records cannot
be rewritten.
