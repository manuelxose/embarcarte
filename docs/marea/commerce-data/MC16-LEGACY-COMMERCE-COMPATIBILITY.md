# MC-16 — Legacy commerce compatibility (D14)

| Field | Value |
|---|---|
| Deliverable | D14 `MC16-LEGACY-COMMERCE-COMPATIBILITY.md` |
| Milestone | MC-16/36 — MAREA commerce and product data model |
| Date | 2026-11-03 |
| Owner | governance-docs |
| Baseline | `99212a41f5942a6fef4ede75815132c11fa4de50` |
| Compatibility verdict | **LEGACY_COMMERCE_PRESERVED — ZERO MAREA MAPPING** |
| Evidence class | `REPOSITORY_VERIFIED` + `LOCAL_SCRATCH_VERIFIED` |

## 1. Principle

The existing shop is a **separate system with its own identity, price and stock
semantics**. It is not the MAREA catalogue, it supplies no MAREA product, and it must
continue to work exactly as it does today. MC-16 adds a parallel model; it does not
migrate, map, rename, reprice, restock or republish anything in the legacy shop.

`data/legacy-commerce-mapping.json` is the machine contract. Its summary sentence is
normative: *“Existing generic commerce remains separate and functionally unchanged. A
legacy `products.active = 1` row never authorizes MAREA commerce.”*

## 2. Legacy inventory under protection

Six tables: `users`, `sessions`, `products`, `orders`, `order_items`, `messages`
(schema in `src/server/db.ts:15-85`).

Eight code files define the legacy commerce behaviour:

| File | Frozen SHA-256 (expected = verified) |
|---|---|
| `src/server/db.ts` | `27be6c2a536d709efd49d9231f90d934e13dab3cad300ab7163490d7e706e4a4` |
| `src/server/api.ts` | `41c3ea13c2cfdcd6fb62d5e60e12bf4fedca04bb5c369bee12869622ce163ed1` |
| `src/server/stripe.ts` | `849d56613df69ff25dd3832429a7713ea73dbbe4b6f46465cc5d586e42736ad8` |
| `src/app/core/models.ts` | `143d4f8c99a419e5d6710f1db748443fe1a24b0e34529b5df9459415a1d65776` |
| `src/app/core/cart.service.ts` | `1f8f5f7d96b0c53339fb208aedddb8dc0404de007f0917cbe09fafa8bd648b1f` |
| `src/app/features/shop/shop-list.ts` | `45e7ccf091de6fb1bbf6db8366c37c5cec94a77e6e8a9433d5725063b985e578` |
| `src/app/features/shop/shop-detail.ts` | `7f1496d5f4638b8082a137686c4eb9747564392065b339e37b0d3a9aa05df0c2` |
| `src/app/features/shop/cart.ts` | `744dbbbcb4d5f896f5a641086334fcf773dfdb76c667ae127ee887cb7976d142` |

All eight hashes are computed over LF-normalized content (`CRLF` replaced by `LF`) and
match the mapping exactly. `scripts/marea-commerce-validator.mjs` enforces the same
normalized rule (`LEG-001` file exists, `LEG-002` hash unchanged), so a clean checkout
with different line endings still reproduces the result.

## 3. `products.active` semantics

| Claimed meaning | Actual | Rule |
|---|---|---|
| MAREA readiness | `false` | The flag is a generic catalogue switch; no readiness field exists |
| Price approval | `false` | `price_cents` is unapproved admin input |
| Stock provenance | `false` | `stock` is an editable integer with no receipt or ledger |
| Publication authorization | `false` | No gate, claims, legal or market evidence is consulted |

The flag is used by the public product list/detail endpoints (`src/server/api.ts:315-326`)
and by the sitemap (`src/server.ts:183-201`). It is not a security control: inactive
rows are still readable by the admin API and by anyone with database access.

MC-16 never reads or writes `products.active`, never maps it to a MAREA field and
never derives readiness, price approval, stock or publication from it.

## 4. Zero MAREA mapping

| Item | Count | Mapping to MAREA |
|---|---|---|
| Legacy tables | 6 | none |
| Legacy code files | 8 | unchanged |
| Seed sample products (`open-marine-hub`, `open-marine-autopilot`, `kit-ais-sdr`) | 3 | `mareaMapping: "NONE"`, treatment `LEGACY_SAMPLE_NON_SALE_NOINDEX` |
| MAREA SKUs mapped from legacy | **0** | `mareaSkusMappedFromLegacy: []` |
| MAREA editions with `merchantSkuCode` | 0 of 26 | all `null`; no edition derives from a legacy slug |
| MAREA prices derived from `price_cents` | 0 | no conversion, no currency mapping |
| MAREA stock derived from `stock` | 0 | no quantity mapping |

Rules enforced by the validator:

- `LEG-003` — no legacy product is mapped to a MAREA SKU;
- `LEG-006` — `active` never claims MAREA readiness;
- `LEG-007` — every sample product has `mareaMapping: "NONE"`.

The seed rows are created at `price_cents = 0`, `stock = 0`, `active = 0`
(`src/server/db.ts:110-139`), so they are neither saleable nor published by default.
The legacy samples are not MAREA products and must not be presented as MAREA products.

## 5. Order and customer data preservation

`data/legacy-commerce-mapping.json` records the preservation obligations:

```text
existingOrdersModified      = false
existingProductsDeleted     = false
existingCheckoutChanged     = false
existingStripeIntegrationChanged = false
existingCartSemanticsChanged = false
```

MC-16 enforces these by construction:

- no MC-16 DDL or DML targets a legacy table;
- no `marea_*` table has a foreign key into a legacy table;
- no migration, backfill, seed or back-office job touches `orders`, `order_items`,
  `users`, `sessions`, `messages`, `products` or `data/embarcarte.sqlite`;
- no order status, total, line item, shipping record, Stripe session id or customer
  row is read into a MAREA dataset;
- the legacy database file is git-ignored and must be refused by MC-16 tooling.

`LEG-004` and `LEG-005` assert that orders and checkout are not marked changed.

## 6. Legacy behaviour unchanged

Verified at the baseline:

| Check | Result |
|---|---|
| `git diff --name-only` against HEAD for the 8 files | empty |
| SHA-256 of the 8 files | all match the frozen mapping |
| Legacy database file | present at `data/embarcarte.sqlite` (git-ignored); not opened by MC-16 work |
| Public list/detail/sitemap logic | untouched |
| Checkout, Stripe and webhook code | untouched |
| Cart `localStorage` key and semantics | untouched |
| Existing tests | not modified; `test:commerce` remains the legacy gate |

One working-tree change exists outside the legacy set: `package.json` gained internal
MC-16 script and formatter entries from a parallel workstream. It adds no dependency
and changes no legacy behaviour; it is not a legacy commerce file. The final candidate
must record this explicitly so the change is not mistaken for scope drift.

## 7. Compatibility rules for any future integration

A later, separately authorized milestone may integrate MAREA commerce only if it
respects all of the following:

1. **Read-only adapter.** Legacy rows may be read only through an explicit adapter
   that never writes, and the adapter may never be the authority for MAREA price,
   stock or readiness.
2. **No identity reuse.** A legacy `products.slug` / `products.id` is never a MAREA
   family, edition, SKU or bundle identity. No name or slug similarity creates a
   mapping.
3. **Separate order space.** MAREA orders must not reuse the legacy `orders` table
   without an explicit schema and legal decision; existing orders stay immutable.
4. **No price or stock conversion.** `price_cents` and `stock` are not migration
   sources for MAREA prices or inventory; zero and null are not interchangeable.
5. **Additive migration only.** Any migration is isolated, reversible, tested on a
   disposable database, and must not run on server startup.
6. **Publication independence.** Legacy `active` rows stay governed by the legacy
   shop; MAREA publication is governed by gates and evidence, never by `active`.
7. **URL preservation.** `/tienda`, `/tienda/:slug`, `/en/shop/:slug`, the sample
   routes and all legacy redirects keep their current behaviour.
8. **Rollback first.** The integration must be removable without touching legacy
   data (D17).

## 8. Residual compatibility risks

| Risk | Severity | Note |
|---|---|---|
| Legacy admin can still publish unapproved price/stock through `active` | BLOCKING (existing) | `CIT-01`; unrelated to MC-16, but means the legacy shop cannot be used for MAREA |
| Product/Offer JSON-LD derives from admin data | MAJOR | `CIT-02`/`WEB-014`; legacy behaviour must be remediated by its own milestone, not MC-16 |
| Seed samples could be mislabelled as MAREA | MINOR | Prevented by `mareaMapping = NONE` and `LEGACY_SAMPLE_NON_SALE_NOINDEX` |
| Parallel edits could touch a legacy file unnoticed | MINOR | Hash re-verification required at the final candidate and in review |
| Legacy test suite not run by this workstream | MINOR | `test:commerce` needs a build; the reviewer must run it at the final candidate |

## 9. Verification log

| Command / check | Result |
|---|---|
| LF-normalized SHA-256 × 8 legacy files | 8/8 match the frozen mapping |
| `git diff --name-only HEAD` for the legacy set | empty |
| `node scripts/check-marea-commerce-data.mjs` (snapshot) | `LEG-001..007` pass within 1730/1730; `mareaSkusMappedFromLegacy` empty |
| `data/legacy-commerce-mapping.json` parse | valid; preservation flags all `false` |
| Import scan `marea-commerce` | no legacy module imports the MC-16 schema |

## 10. Conclusion

Legacy commerce compatibility is **preserved**:

- the eight defining files are byte-identical to their frozen hashes;
- no legacy row, table, order or customer datum is modified;
- no legacy product maps to a MAREA SKU, price or stock quantity;
- no MAREA artefact can activate through `products.active`;
- the shop, checkout, Stripe integration, cart, URLs and sitemap keep their current
  behaviour.

Verdict: **LEGACY_COMMERCE_PRESERVED — ZERO MAREA MAPPING**. This verdict is a
preservation statement, not an approval of the legacy shop for MAREA use.
