# MC-25 → MC-26 handoff inputs

**From:** MC-25 — SKU readiness and catalogue governance
**To:** MC-26 — Checkout, payments, invoices and subscription test flows (hosted/tokenized only)
**Branch handed over:** `feature/marea-mc25-sku-governance`
**Base:** `c4d9d76` (verified MC-24 head), not merged
**MC-26 started:** **NO**

## 1. What MC-25 hands over

| Surface | State | Reuse guidance |
| --- | --- | --- |
| Readiness engine | `src/app/marea-catalog/governance/sku-readiness.ts`, version `mc25-readiness/1.0.0` | MC-26 must call `evaluateSkuReadiness(editionId)` before any order path and refuse when `commercialOrderability !== 'ORDERABLE'`. Today it is `NOT_ORDERABLE` for every object. Do not reimplement the prerequisites. |
| Identity model | `governance/sku-identity.ts` | An edition is not a SKU. A checkout line must reference an **approved merchant SKU**, which does not exist (empty frozen registry). MC-26 must not mint one. |
| Lifecycle | `governance/sku-lifecycle.ts` | `READY_FOR_REVIEW` is terminal: no approval backend. MC-26 needs an explicit, authorized transition + persistence contract before any orderable state may exist. |
| Authorization boundary | `governance/admin-authorization.ts` | Reuse the pattern: business-logic refusal, prohibited actions, `applied/persisted = false`. MC-26 must not rely on disabled buttons. |
| Fact snapshot | `governance/governance-facts.ts` + generated projection | Read-only. Never mutate. Regenerate with `build:mc25:data`; `check:mc25:data` is a drift gate. |
| Governance screen | `internal/catalog/sku-governance` (loopback preview) | Reference implementation for an internal review surface; not a production admin app. |
| MC-02 mapping | `MC25-MC02-BLOCKER-MAPPING.md` | Every open gate is inherited; MC-26 cannot close one by code. |

## 2. Hard preconditions MC-26 cannot bypass

Orderability requires all ten prerequisites. At handover:

| Prerequisite | State |
| --- | --- |
| Canonical identity | PASSED for 26/26 editions |
| Lifecycle approved | FAILED (DEFINED, not COMMERCIALLY_AVAILABLE) |
| Price approved | FAILED (0 approved price records; PRICE_APPROVED = NONE) |
| Inventory verified | FAILED (0 verified stock rows; admin stock is not MAREA stock) |
| Compliance verified | FAILED |
| Licensing/IP cleared | FAILED |
| Safety approved | FAILED (PILOT gate BLOCKED) |
| Hardware certified | N/A permitted for software only |
| MC-02 blockers resolved | FAILED (13/13 open) |
| Release authorized | FAILED (publication NOT_AUTHORIZED) |

MC-26 must fail closed for all of these. A checkout flow that can be reached
while the engine says `NOT_ORDERABLE` is a defect, not a demo.

## 3. Missing infrastructure MC-26 will need

1. **Approval backend + audit store** — append-only, authorized principal,
   content-bound evidence. MC-25 deliberately did not invent one.
2. **Merchant SKU registry** — approved codes with approval records. None exist.
3. **Verified inventory** — `marea_inventory_items` with provenance, reservations
   (`BEGIN IMMEDIATE`, no oversell) and movement audit. No rows exist.
4. **Approved price list** — currency, territory, channel, VAT basis, evidence.
   No records exist.
5. **Terms / privacy / DPA / DPIA** — `GATE-CONSUMER-TERMS`,
   `GATE-PRIVACY-DPA-DPIA` are open; no controller/processor map exists.
6. **Payment merchant agreement** — `GATE-PAYMENTS` open; no PCI scope decision.

## 4. Invariants MC-26 must preserve

- `MC25_READINESS` is the only source of orderability. No parallel flag.
- The frozen snapshot is read-only; no runtime mutation of contract facts.
- A canonical edition is never an approved SKU.
- `NOT_APPLICABLE` is not approval.
- Every refusal names prerequisite, blockers and evidence.
- No public route, indexation or publication without explicit authorization.
- No customer/personal data store without an approved privacy basis.

## 5. Reusable verification commands

```text
node scripts/run-tsc.mjs
npm run test:mc25
npm run test:mc25:unit
node scripts/test.mjs
node scripts/check-mc20-catalog.mjs
node scripts/check-mc24-configurator.mjs
npx playwright test -c playwright.catalog.config.ts --grep "@mc25"
```

## 6. Open items MC-26 should not assume solved

- Screen-reader/AT testing NOT_RUN; WCAG conformance not claimed.
- Professional English copy review NOT DONE.
- Six inherited MC-23 files unformatted.
- Prose upgrade additions unverifiable (`RES-MC25-01`).
- No durable approval trail (`RES-MC25-06`).
- External legal/commercial gates unchanged and blocking.

## 7. Explicit instruction

MC-25 does not start MC-26. Starting it requires a separate explicit
instruction, and MC-26 must not merge, deploy or publish.
