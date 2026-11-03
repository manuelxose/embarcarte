# MC-16 D09 — Inventory and stock provenance

| Field | Value |
|---|---|
| Document ID | MC-16 / D09 / MC16-INVENTORY-AND-STOCK-PROVENANCE |
| Milestone | MC-16/36 — commerce and product data model |
| Owner | commerce-docs (pricing, inventory, subscription and integration architect) |
| Date | 2026-11-03 |
| Base commit | `99212a41f5942a6fef4ede75815132c11fa4de50` |
| Branch | `feature/marea-mc16-commerce-product-data-model` |
| Status | `INTERNAL_ONLY` — 0 verified MAREA inventory items, 0 movements, no live shop activation |
| Evidence class | `ENGINEERING_DESIGN` + `REPOSITORY_VERIFIED` |
| Authority | `data/inventory-governance.json`; `src/server/marea-commerce/schema.ts`; `src/server/marea-commerce/domain.ts`; legacy `src/server/api.ts` and `src/server/db.ts` |
| Downstream owner | Future warehousing/fulfilment milestone — `NOT_AUTHORIZED` |

## 1. Purpose and boundary

This document defines what counts as MAREA stock, what does not, how stock
quantities are protected and how a reservation must behave so that a future shop
cannot oversell. It also fixes the boundary between the existing generic shop's
admin-entered stock and MAREA's verified inventory.

Current state:

- **0** `marea_inventory_items` rows; **0** `marea_inventory_movements`;
  **0** warehoused items; **0** serialised items.
- `verifiedMareaStock = NONE`; `verifiedQuantity = null`;
  `availableQuantity = null`; `mareaStockAvailableForSale = false`.
- No MAREA product is in the public shop, no MAREA route is published, no
  checkout path is enabled and no admin activation can create stock.
- The existing generic shop keeps its own products and stock on its existing
  code path; it is not migrated, relabelled or repurposed as MAREA stock.

The null quantities mean "no verified inventory exists", not "zero units in a
warehouse". A real verified item with `quantity_on_hand = 0` would be a **real,
evidence-backed zero** and would block sale; MC-16 has no such item.

## 2. Two stock concepts that must never be conflated

| Concept | Legacy admin stock | MAREA verified inventory |
|---|---|---|
| Physical source | `products.stock` in the legacy SQLite database | `marea_inventory_items.quantity_on_hand` |
| Who sets it | An administrator typing a number in the admin product form (`src/server/api.ts:522-584`) | A recorded receipt/movement backed by evidence (`marea_inventory_movements`) |
| Provenance | `NONE` | `REQUIRED` (`stock_evidence_id`) |
| Usable as MAREA stock | **No** | Only after verification and evidence checks |
| Usable as fulfilment evidence | **No** | Yes, subject to order, payment and gate checks |
| Can be migrated into MAREA inventory | **No** — `no legacy sample stock may be migrated into MAREA stock` | — |
| Current MAREA rows | Legacy products only; none mapped | 0 |

`inventory-governance.json#sources` states both facts plainly:
`ADMIN_ENTERED_STOCK.provenance = NONE`, `usableAsMareaStock = false`,
`usableAsFulfilmentEvidence = false`; `VERIFIED_INVENTORY.provenance = REQUIRED`,
`usableAsMareaStock = false` because no verified inventory exists.

The legacy seed products `open-marine-hub`, `open-marine-autopilot` and
`kit-ais-sdr` are sample catalogue entries with `mareaMapping = NONE` and
treatment `LEGACY_SAMPLE_NON_SALE_NOINDEX`
(`data/legacy-commerce-mapping.json:59-75`). They are not MAREA editions and
their stock numbers are not MAREA inventory.

## 3. Verified inventory record

`marea_inventory_items` (`schema.ts:223-244`) stores:

| Field | Contract |
|---|---|
| `inventory_item_id` | Stable opaque identity |
| `edition_id` | FK to `marea_product_editions`; stock belongs to an edition, not to a family or a bundle |
| `sku_code` | Optional; `NULL` while no merchant SKU exists. It is not a substitute edition id. |
| `warehouse_id` | Non-empty physical/logical location |
| `lot_code`, `serial_number` | Optional; no serialised item exists today |
| `quantity_on_hand` | Integer `>= 0` |
| `quantity_reserved` | Integer `>= 0`, `<= quantity_on_hand` |
| `quantity_available` | Generated stored column = `quantity_on_hand - quantity_reserved` |
| `status` | `AVAILABLE`, `QUARANTINED`, `DISPATCHED`, `RETURNED` |
| `verified` | `0`/`1`; a row is not usable stock merely because it exists |
| `stock_evidence_id` | FK to verified evidence; required when `verified = 1` |
| `source` | `PURCHASE_RECEIPT`, `SUPPLIER_CONTRACT`, `PRODUCTION_RECEIPT`, `RETURN` |

Database checks enforce the arithmetic and the verification coupling:

- `quantity_on_hand >= 0`
- `quantity_reserved >= 0`
- `quantity_reserved <= quantity_on_hand`
- `status = 'AVAILABLE'` requires `verified = 1`
- `verified = 1` requires a non-null `stock_evidence_id`

These are necessary but not sufficient: the future service must also verify that
the evidence record is usable (`VALID`, verified, not expired/revoked), that the
edition is in a lawful state and that no release gate blocks fulfilment.

## 4. Invariants

| ID | Invariant | Enforcement | Current status |
|---|---|---|---|
| INV-01 | `quantity_on_hand >= 0` | DB `CHECK` + domain evaluator | Schema present; 0 rows |
| INV-02 | `quantity_reserved >= 0` | DB `CHECK` + domain evaluator | Schema present |
| INV-03 | `quantity_reserved <= quantity_on_hand` | DB `CHECK` + conditional update + domain evaluator | Schema present |
| INV-04 | A reservation is atomic and must not oversell | `BEGIN IMMEDIATE` + conditional `UPDATE`; one winner per unit | Policy/specification; no reservation service exists |
| INV-05 | A movement requires actor, reason and evidence reference | Movement columns; DB enforces evidence only for `ADJUSTMENT` (gap D09-GAP-02) | Partial |
| INV-06 | Quarantined stock is not available for sale | Domain accepts only `status = 'AVAILABLE'` | Enforced in evaluator |
| INV-07 | Quantity alone does not authorise fulfilment | Purchasability, gates, order and payment must also pass (`SEC-MC16-09`) | Enforced by design; no sale path |
| INV-08 | No legacy sample stock may be migrated into MAREA stock | Dataset rule + no migration script | Enforced by absence |
| INV-09 | Unknown quantity is `null`, never `0` | Aggregate/inventory domain representation; no `DEFAULT 0` for "unknown" | Enforced by no rows / null aggregate |
| INV-10 | A reservation without verified inventory is impossible | Conditional update requires `verified = 1`, `status = 'AVAILABLE'`; evaluator requires evidence | Policy/specification |

## 5. Atomic reservation protocol

The following transaction is the required future implementation shape. It is a
specification, not executed code in MC-16.

```sql
BEGIN IMMEDIATE;

-- 1. Conditionally reserve; the predicate makes oversell impossible.
UPDATE marea_inventory_items
SET quantity_reserved = quantity_reserved + :qty,
    updated_at = :now
WHERE inventory_item_id = :item
  AND verified = 1
  AND status = 'AVAILABLE'
  AND quantity_reserved + :qty <= quantity_on_hand;

-- Caller must observe changes = 1. changes = 0 means OUT_OF_STOCK.

-- 2. Record the movement in the same transaction.
INSERT INTO marea_inventory_movements
  (movement_id, inventory_item_id, movement_type, quantity_delta,
   reason, actor_id, actor_role, occurred_at, evidence_id, correlation_id)
VALUES
  (:movement, :item, 'RESERVATION', :qty,
   :reason, :actor, :role, :now, :evidence, :correlation);

COMMIT;
```

Rules:

1. `BEGIN IMMEDIATE` is required so the write lock is taken before the read
   decision; a deferred transaction can race.
2. The conditional `UPDATE` is the oversell guard. Checking stock in one
   statement and updating in another is prohibited.
3. `changes = 0` is a normal out-of-stock outcome, not a system error; it rolls
   back and returns a documented denial.
4. Reservation and movement are one transaction. A reservation without a
   movement is an audit defect; a movement without the counter change is a
   data defect.
5. Release uses the inverse conditional update and records
   `RELEASE_RESERVATION`; it must never drive `quantity_reserved` below zero.
6. Dispatch records `DISPATCH` and reduces on-hand; it does not rely on the
   reservation alone.
7. `correlation_id` makes retries idempotent at the service layer. The schema
   does not enforce idempotency by itself.
8. No reservation is created from an admin-entered number, a legacy order or a
   client claim.

## 6. Movement types

`marea_inventory_movements` (`schema.ts:246-260`) requires a non-zero
`quantity_delta`, a non-empty reason, actor id, actor role, timestamp and
correlation id. `ADJUSTMENT` additionally requires evidence and a reason of at
least eight characters.

| Movement type | Intended counter affected | Delta | Evidence | Meaning |
|---|---|---|---|---|
| `RECEIPT` | `quantity_on_hand` | `+` | Receipt/contract/production evidence | Goods physically received and accepted |
| `RESERVATION` | `quantity_reserved` | `+` | Reservation/order reference (policy) | Units held for an order |
| `RELEASE_RESERVATION` | `quantity_reserved` | `-` | Cancellation/expiry reference (policy) | Hold released |
| `DISPATCH` | `quantity_on_hand` | `-` | Dispatch record (policy) | Units left the warehouse |
| `RETURN` | `quantity_on_hand` | `+` | Return receipt (policy) | Units returned and accepted |
| `QUARANTINE` | `quantity_on_hand` (or status change) | signed per procedure | Quarantine record (policy) | Units withheld from sale |
| `ADJUSTMENT` | `quantity_on_hand` | signed | **Required by DB** | Correction with a documented cause |

**Gap D09-GAP-01.** The schema has a single `quantity_delta` column but two
counters. It does not encode which counter a movement changes. The mapping above
is binding on the future implementation; a migration should add an explicit
counter/target column or split the deltas before any live stock is recorded.

**Gap D09-GAP-02.** The database enforces an evidence reference only for
`ADJUSTMENT`. The governing policy requires actor, reason and evidence for every
movement; the future implementation must enforce that in the movement service
and the schema should be tightened before activation.

**Gap D09-GAP-03.** No database trigger recalculates `quantity_reserved` from the
movement log. The invariant is maintained by the transaction protocol above and
must be proven by concurrency tests, not assumed from the table shape.

## 7. Domain evaluator (`validateInventoryAvailability`)

The evaluator (`domain.ts:490-556`) applies, in order:

1. Missing `editionId` → `EDITION_ID_MISSING`, quantity `null`.
2. No inventory rows for the edition → `VERIFIED_INVENTORY_MISSING`, quantity
   `null`.
3. For each row: unverified → `INVENTORY_UNVERIFIED`; not `AVAILABLE` →
   `INVENTORY_NOT_AVAILABLE`; missing evidence id →
   `INVENTORY_EVIDENCE_MISSING`; evidence missing, expired, revoked or wrong
   class → `INVENTORY_EVIDENCE_INVALID`; null quantity →
   `INVENTORY_QUANTITY_UNKNOWN`; non-integer or negative/inverted quantity →
   `INVENTORY_QUANTITY_INVALID` / `INVENTORY_QUANTITY_INVARIANT_VIOLATED`.
4. If no usable row remains, quantity is `null` and the reasons are returned.
5. If usable rows exist but the available sum is `<= 0`, quantity is `0` and
   `NO_AVAILABLE_QUANTITY` is added. This is a real zero, not unknown.
6. If any row produced a reason code, the aggregate is denied with quantity
   `null`; a partially verified inventory is never presented as a smaller
   positive number.
7. Only a clean all-usable inventory returns `available = true` with the summed
   `quantity_on_hand - quantity_reserved`.

`evaluatePurchasability()` then sets `effectiveStock` to the returned quantity
only when the overall decision is allowed; otherwise `effectiveStock = null`
(`domain.ts:626-645`). `null` is the published state of "stock unknown"; `0` is
a real out-of-stock state.

## 8. Provenance and evidence

Stock evidence is a `marea_release_gate_evidence` row with a type such as
`INVENTORY_RECEIPT`, a class of `VERIFIED_EXTERNAL` or `REPOSITORY_VERIFIED`, an
issuer, issue date, optional expiry, content hash and `verified = 1`. The
evidence is linked from the item via `stock_evidence_id`. It is not a free-text
note, a screenshot without issuer, a supplier email claim or an admin checkbox.

Rules:

- A self-declared "in stock" is not evidence.
- A legacy order line, a sample product row or a planned purchase order is not
  evidence.
- Expired or revoked evidence makes the item unusable; the evaluator returns
  `INVENTORY_EVIDENCE_INVALID` and the missing evidence id.
- Evidence is never inferred from a price approval, a quotation or a scenario.
- A device serial number alone does not prove ownership or availability; it must
  be tied to a verified receipt/return.

## 9. Legacy shop behaviour and non-activation

The existing shop is **not** the MC-16 shop. Its relevant behaviour is recorded
so that no future reader mistakes it for MAREA inventory:

- `products` has `price_cents >= 0` and `stock >= 0`, both admin-editable
  (`src/server/db.ts:36-44`).
- Public product reads filter `active = 1` (`src/server/api.ts:313-321`); the
  admin flag is not a readiness, price-approval, stock-provenance or publication
  authorisation (`data/legacy-commerce-mapping.json:77-82`).
- Order creation re-reads the product and price server-side, rejects a changed
  price, checks `stock < qty`, then decrements stock immediately
  (`src/server/api.ts:357-383`). That is a check-then-decrement flow, not the
  atomic reservation protocol above.
- Cancellation restocks (`src/server/api.ts:79-103, 656-672`), including an
  `out_of_stock` failure when reactivating an order cannot restore stock.
- No MAREA edition is mapped to a legacy product; `mareaSkusMappedFromLegacy` is
  empty.

MC-16 does not import the schema into the running server, does not migrate these
rows, does not change the admin product form and does not change checkout or
Stripe. No MAREA stock is visible, reservable, published or sold.

## 10. Current proof and verification

| Check | Method | Result |
|---|---|---|
| 0 verified MAREA items | `inventory-governance.json#currentState` | `inventoryItemCount = 0` |
| 0 movements | same | `movementCount = 0` |
| Unknown quantities not zero | same | `verifiedQuantity = null`, `availableQuantity = null` |
| Admin stock not MAREA stock | `sources.ADMIN_ENTERED_STOCK` | `usableAsMareaStock = false` |
| No legacy-to-MAREA mapping | `legacy-commerce-mapping.json` | `mareaSkusMappedFromLegacy = []` |
| Legacy shop untouched | file hashes in `legacy-commerce-mapping.json` | `UNCHANGED` required; MC-16 edits no shop file |
| Data validator | `node scripts/check-marea-commerce-data.mjs` | 1,730/1,730 checks passed |

## 11. Acceptance criteria

| ID | Criterion | Current status |
|---|---|---|
| D09-AC-01 | Zero verified MAREA inventory items and zero movements; quantities are null, not zero | **PASS (current state)** |
| D09-AC-02 | Admin-entered legacy stock is never treated as MAREA stock or fulfilment evidence | **PASS (contract + data)** |
| D09-AC-03 | No legacy sample stock is migrated into MAREA inventory | **PASS (no mapping, no migration)** |
| D09-AC-04 | Non-negative quantities, `reserved <= on-hand`, available = on-hand − reserved | **PASS (schema)**; no live rows |
| D09-AC-05 | Reservation is atomic and cannot oversell | **SPECIFIED**; implementation `NOT_AUTHORIZED` — future concurrency test required |
| D09-AC-06 | Movement types are closed and audit fields mandatory; `ADJUSTMENT` requires evidence | **PASS (schema)**; full evidence rule is a gap (D09-GAP-02) |
| D09-AC-07 | No live shop activation, no MAREA stock display, no checkout change | **PASS (current state)** |
| D09-AC-08 | Quantity alone never authorises fulfilment | **PASS (design)**; `evaluatePurchasability` requires all other conditions |

## 12. Open items

- No verified inventory, warehouse, receipt, serial, supplier or lot exists.
- Reservation and movement services are not implemented; the atomic protocol is
  a specification only.
- Movement delta/counter ambiguity and evidence coverage gaps must be fixed
  before live stock (D09-GAP-01, D09-GAP-02, D09-GAP-03).
- `GATE-MARKET-PLACEMENT`, `GATE-PRICING`, `GATE-PAYMENTS`, `GATE-INSURANCE` and
  `GATE-WEBSITE-REMEDIATION` remain open; no hardware may be offered.
- A future fulfilment design must also cover quarantine, RMA, warranty
  replacement, serialised device identity and loss/theft revocation.

## 13. References

- `data/inventory-governance.json` — current state, source distinction,
  invariants, reservation policy.
- `src/server/marea-commerce/schema.ts:223-260` — inventory items, generated
  available column, movements.
- `src/server/marea-commerce/domain.ts:185-194, 490-556` — inventory model and
  availability evaluator.
- `src/server/db.ts:36-44, 110-136` — legacy admin stock and sample products.
- `src/server/api.ts:79-103, 313-321, 357-383, 505-593, 656-672` — legacy
  catalogue reads, order stock handling and admin product editing.
- `data/legacy-commerce-mapping.json` — preserved legacy files, no MAREA mapping.
- `MC16-SQLITE-SCHEMA-AND-MIGRATION-PLAN.md` (D13) — schema and trigger context.
- `MC16-PRICE-APPROVAL-VAT-AND-TERRITORY-MODEL.md` (D08) — price is a separate
  approval; stock alone does not make an offer.

**Status statement.** This document is an internal persistence contract. It
creates no stock, reservation, warehouse record or sale path, and it does not
activate any MAREA shop surface.
