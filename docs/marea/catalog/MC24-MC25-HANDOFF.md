# MC-24 → MC-25 handoff

**From:** MC-24 — Compatibility configurator and quotation triage
**To:** MC-25 — SKU readiness and catalog governance in admin/commerce
**Branch handed over:** `feature/marea-mc24-configurator`
**Base:** `7ed6ae6` (MC-23 integration), not merged
**MC-25 started:** **NO**

## 1. What MC-24 hands over

| Surface              | State                                                                                               | Reuse guidance for MC-25                                                                                                                                                           |
| -------------------- | --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Configuration engine | `src/app/marea-catalog/data/configurator-engine.ts`                                                 | Deterministic, pure, no I/O. Reuse; do **not** fork. If MC-25 needs SKU eligibility, extend the outcome vocabulary **through the contract**, never by adding an `ORDERABLE` value. |
| Triage               | `src/app/marea-catalog/data/configurator-triage.ts`                                                 | Internal queue classification with `quotationProvided/priceProvided/orderable` typed `false`. MC-25 must keep these false until a lifecycle/price/stock gate actually closes.      |
| Rule projection      | `src/app/marea-catalog/data/configurator.generated.ts` + `scripts/build-mc24-configurator-data.mjs` | Generated from MC-08 with a `--check` drift gate. Any MC-25 rule comes from a contract field, never hand-written.                                                                  |
| Content contract     | `src/app/marea-catalog/content/configurator.ts`                                                     | `Localized` pattern, 70 pairs, parity-checked.                                                                                                                                     |
| Preview routes       | `internal/catalog/configurator`, `en/internal/catalog/configurator`                                 | Registered in **both** `app.routes.ts` and `app.routes.server.ts`. **Any new route MUST also be added to `app.routes.server.ts` or it returns 404** — MC-24 hit exactly this.      |
| Build gate           | `scripts/check-mc24-build.mjs`                                                                      | Reuse as the model for every milestone that touches Angular templates. It proves the gate can fail.                                                                                |

## 2. Mandatory carry-overs (do not drop)

1. **`ELIGIBLE_SELF_INSTALL` stays unreachable** while zero MC-05 D5 rows are
   `TESTED`. Promoting it requires a real tested matrix row, a validated rule entry,
   and its own regression test. Fabricating a rule is an invented compatibility claim.
2. **F-2** (upgrade-path compares ids without validating the full family↔edition↔
   inclusion relationship) and **F-15** (`inclusionFor` returns `NOT_INCLUDED` for a
   non-existent edition) are assigned to MC-25. Both are reproducible at
   `8a4b5e0`; see `MC24-RISK-AND-INHERITED-DEBT-REGISTER.md` §2.
3. **Six MC-23 files are unformatted** at the inherited HEAD (`bundle-comparison-table.ts`,
   `bundle-upgrade-selector.ts`, `bundle-comparison.ts`, `bundle-upgrade-paths.ts`,
   `section-bundles.ts`, `bundle-preview.ts`). Verified pre-existing in the MC-23
   worktree. MC-25 should either own the reformat as a standalone commit or leave it
   declared — but must not silently absorb it into a feature diff.
4. **Heuristic guard stays a backstop.** F-01, F-02 and F-16 are closed, but the
   guard still cannot enumerate natural language. Do not describe a green run as
   proof that no invented claim exists.

## 3. Suggested MC-25 scope boundaries

MC-25's registry criteria are: _"No orderable SKU without complete
lifecycle/price/stock/compliance; MC-02 blockers referenced per SKU."_

Inherited constraints MC-25 cannot bypass:

```text
PRICE_APPROVED          = NONE      -> no approved price exists to attach to a SKU
COMMERCIAL_AVAILABILITY = NOT_FOR_SALE
verified stock rows     = 0
merchant SKU codes      = 0
PILOT_SAFETY_GATE       = BLOCKED
```

Consequently MC-25 must be expected to deliver **governance that refuses**, not a
working purchase path. An admin screen that can set a SKU to orderable without a
closing lifecycle/price/stock/compliance gate would violate the milestone.

## 4. Verification baseline MC-25 inherits

| Gate                                              | Baseline at `8a4b5e0`              |
| ------------------------------------------------- | ---------------------------------- |
| `node scripts/run-tsc.mjs`                        | PASS                               |
| `node scripts/test.mjs`                           | 5/5 stages (56/56, 15/15, 16/16)   |
| `npm run test:mc24`                               | 13/13                              |
| `npm run test:mc24:unit`                          | 23/23                              |
| `node scripts/check-mc24-build.mjs`               | PASS (incl. negative binding)      |
| `playwright test -c playwright.catalog.config.ts` | 101 passed                         |
| `test:i18n` / `test:seo` / `test:commerce`        | PASS                               |
| production bundle                                 | 0 catalogue identifiers, 96 routes |

Any MC-25 change that lowers one of these is a regression.

## 5. Open items MC-25 should not assume solved

- Screen-reader / assistive-technology testing: **NOT_RUN** in MC-24.
- Professional English copy review: **NOT DONE**.
- Real quotation/survey workflow: **ABSENT** (no seller identity, no terms, no DPA/DPIA).
- External gates: unchanged and blocking.

## 6. Explicit instruction

MC-24 **does not start MC-25**. Starting it requires a separate explicit instruction.
