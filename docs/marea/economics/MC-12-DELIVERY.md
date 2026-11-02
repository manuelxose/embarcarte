# MC-12 — Delivery record (D19)

| Field | Value |
|---|---|
| Milestone | MC-12/36 — Recurring/data licensing and per-SKU contribution economics (ex-VAT) |
| Date | 2026-11-02 |
| Branch | `feature/marea-mc12-recurring-data-unit-economics` |
| Verified base | MC-11 `5b47a3d51fa875a08ed6f4ad8448a3e51a0f0499` (local = remote = prompt-preparation SHA) |
| Predecessor PR | #18 `OPEN`, draft, not merged, head `5b47a3d` |
| Implementation commit | `e6e181a` |
| Correction commit | `8f819c1` |
| Record-refresh commit | `05883ac` |
| Draft PR | [#19](https://github.com/manuelxose/embarcarte/pull/19), stacked on `feature/marea-mc11-hardware-sourcing-conformity`, not merged |
| Verdict | `MC12_VERDICT = PARTIAL`; `PASS_INTERNAL_ECONOMICS_SCOPE`; `BLOCKED_OR_NOT_OBTAINED` for external commercial evidence |

## 1. Scope delivered

A complete internal economics package for the nine MAREA families, their editions
and the six commercial bundles: baseline and governance, a machine-readable data
contract, licensing and data-rights landscape, provider and price register, cloud/
cellular recurring model, hardware cost reconciliation, per-SKU contribution model,
subscription model, channel economics, bundle economics, sensitivity and stress,
commercial prioritisation, blocker register, MC-13 handoff, machine-readable
datasets, deterministic validator and adversarial tests, independent review and a
Spanish executive report.

No commercial lifecycle state was changed. No price was approved. No licensing right
was granted. No provider, supplier or customer was contacted.

## 2. Deliverable inventory

| ID | Deliverable | Path |
|---|---|---|
| D01 | Baseline and scope governance | `MC-12-BASELINE-AND-GOVERNANCE.md` |
| D02 | Economic data contract | `data/MC12-DATA-CONTRACT.md` |
| D03 | Licensing and rights landscape | `MC12-LICENSING-AND-RIGHTS-LANDSCAPE.md` |
| D04 | Provider research and price register | `MC12-PROVIDER-RESEARCH-AND-PRICE-REGISTER.md` |
| D05 | Cloud and cellular operating cost model | `MC12-CLOUD-AND-CELLULAR-COST-MODEL.md` |
| D06 | Hardware cost reconciliation | `MC12-HARDWARE-COST-RECONCILIATION.md` |
| D07 | Per-SKU contribution model | `MC12-PER-SKU-CONTRIBUTION-MODEL.md` |
| D08 | Subscription and recurring revenue model | `MC12-SUBSCRIPTION-AND-RECURRING-REVENUE-MODEL.md` |
| D09 | Commercial channel economics | `MC12-COMMERCIAL-CHANNEL-ECONOMICS.md` |
| D10 | Bundle economics | `MC12-BUNDLE-ECONOMICS.md` |
| D11 | Sensitivity and stress analysis | `MC12-SENSITIVITY-AND-STRESS-ANALYSIS.md` |
| D12 | Commercial prioritisation | `MC12-COMMERCIAL-PRIORITIZATION.md` |
| D13 | Blocker register | `MC12-BLOCKER-REGISTER.md` |
| D14 | MC-13 financial-model handoff | `MC12-MC13-HANDOFF.md` |
| D15 | Machine-readable datasets | `data/*.json` (16 files) |
| D16 | Deterministic validator and adversarial tests | `scripts/check-marea-unit-economics.mjs`, `scripts/check-marea-unit-economics.test.mjs` |
| D17 | Independent review report | `review/MC-12-REVIEW.md` |
| D18 | Executive report (ES) | `MC12-EXECUTIVE-REPORT.md` |
| D19 | This delivery record | `MC-12-DELIVERY.md` |

Supporting research notes: `research/MC12-RESEARCH-CHARTS-WEATHER-NMEA.md`,
`research/MC12-RESEARCH-CONNECTIVITY-CLOUD.md`,
`research/MC12-LEGAL-TAX-RESEARCH.md`.

## 3. Evidence classification

| Class | Count |
|---|---|
| `FORMAL_PROVIDER_QUOTATION` | 0 |
| `EXECUTED_CONTRACT` | 0 |
| `PUBLISHED_PROVIDER_TARIFF` | 21 |
| `PUBLIC_PRICE_OBSERVATION` | 2 |
| `OFFICIAL_LICENSING_DOCUMENT` | 15 |
| `INACCESSIBLE` | 9 |
| `ENGINEERING_ASSUMPTION` | 1 |
| `UNKNOWN` | 5 |
| RFQ packages | `NOT_SENT` |

53 provider records across eight dependencies. One ECB euro reference rate was
observed (USD 1.1216 per EUR) and recorded for MC-12 conversions; inherited MC-11
BOM lines keep their original conversion (decision D-051).

## 4. Economic-model coverage

- 50 unit-economics records: hardware (5 volumes × 5 families, LOW/HIGH at 100,
  installer configuration), HUB-PRO, AIS-CONNECTED, PILOT, seven subscription SKUs.
- 6 bundle records, 5 channel records, 70 sensitivity scenarios, 4 stress cases.
- 90 MC-11 scenarios reconciled; `COST-16` invariant PASS (max delta 0.00 EUR).
- 9 families classified; 0 `ECONOMICS_EVIDENCED`.
- 23 blockers (14 `BLOCKING`, 8 `MAJOR`, 1 `MINOR`); 11 licensing rights
  (9 blocking): 7 `NOT_GRANTED`, 3 `REQUIRES_CONTRACT`, 1 `PERMITTED`
  (public-domain context layer only).

Key conditional results (not prices, not margins): DISPLAY +274.37 at 100 units and
the only hardware case positive under combined stress; HUB +7.30 and negative under
+20 % cost; AIS −75.56; PROTECT −50.74; NAV Essential +71.39 and NAV Pro +110.72
before a data licence whose right does not exist; FLEET +550.92/+905.52 per
vessel-year conditional.

## 5. Automated test results

| Command | Result |
|---|---|
| `npm run test:economics` | exit 0 — 49/49 checks |
| `npm run test:economics:unit` | exit 0 — 64/64 tests |
| `npm run test:hardware` / `:unit` | exit 0 — 54/54 / 59/59 |
| `npm run test:products` / `:unit` | exit 0 — 52/52 / 106/106 |
| `npm run test:bundles` / `:unit` | exit 0 — 35/35 / 60/60 |
| `npm run test:brand` / `:unit` | exit 0 — 21/21 / 13/13 |
| `npm run test:market` / `:unit` | exit 0 — 40/40 / 43/43 |
| `npm run test:customer-research` / `:unit` | exit 0 — 62/62 / 111/111 |
| `npm run test:customer-recovery` / `:unit` | exit 0 — 32/32 / 82/82 |
| `npm run test:i18n` | exit 0 |
| `npm run test:commerce` | exit 0 |
| `npm run test:seo` | exit 0 |
| `npm run test:backup` | exit 0 |
| `npm run format:check` | exit 0 |
| `npm run build` | exit 0 |
| `npm run test:e2e` | exit 0 — 15/15 |
| `npm audit --omit=dev --audit-level=high` | exit 0 — 0 vulnerabilities |
| `git diff --check` | clean |

Environment note: the default DSH sandbox blocks child-process spawn (`EPERM`), which
affects `node --test` workers, `ng build` (esbuild service) and Playwright. The
declared unit, build and e2e commands were executed successfully with full access;
without it they are `BLOCKED_BY_ENVIRONMENT`, not `FAIL`, and no code defect is
implied.

## 6. Independent audit

The independent auditor (a different agent from the author) reviewed the frozen
commit `fe97062`, found 16 issues (0 BLOCKING, 2 MAJOR, 7 MINOR, 7 INFORMATIONAL)
and withheld internal-scope sign-off. The corrections were committed at `8f819c1`
and independently re-verified: 50/50 unit-economics records, 90/90 MC-11 scenarios,
70/70 sensitivities, 4/4 stress cases, 6/6 bundles and 9/9 decision scores
recomputed with 0 mismatches, and the new negative controls each failed exactly the
intended check. Verdict: `PASS_INTERNAL_ECONOMICS_SCOPE`; the original MAJOR/MINOR
findings are `CLOSED_VERIFIED` and the remaining documentation/record items are
closed in the record-refresh commit. `review/MC-12-REVIEW.md` and
`data/review-findings.json` hold the evidence.

## 7. Prohibited actions asserted absent

No merge, deploy, publication, public price/catalogue/checkout/SEO/payment change,
customer/provider/supplier contact, RFQ, account registration, purchase, paid API,
certification, AIS transmission offer, PILOT commercial availability, FLEET default
hardware, safety gating, MC-13 start.

## 8. Known risks and limitations

- 0.8–4.7 % observed-price coverage of the modelled hardware subtotal; certification
  `UNKNOWN` in every scenario.
- Recurring costs are public tariffs, not contracts, and are a floor rather than an
  SLA; 9 provider sources are inaccessible.
- Inerted MC-11 FX assumption on BOM lines; an observed ECB rate exists for new
  conversions only.
- No customer evidence, no WTP, no churn, no CAC.
- Minor rounding/documentation nits are recorded in D11 (WATCH returns 2.94 vs 2.95;
  `INSTALLER_MARGIN` added to the contract lever list).

## 9. MC-13 handoff status

Ready with named gaps (`data/mc13-handoff-inputs.json`, `MC12-MC13-HANDOFF.md`).
`mc13Started: false`; no multi-period forecast, no break-even claim, no approved
price.

## 10. Status block

```
MC12_VERDICT = PARTIAL
MC12_INTERNAL_ECONOMICS_SCOPE = PASS_INTERNAL_ECONOMICS_SCOPE
MC12_EXTERNAL_COMMERCIAL_EVIDENCE = BLOCKED_OR_NOT_OBTAINED
CUSTOMER_WTP_VALIDATED = false
PRICE_APPROVED = NONE
LICENSING_RIGHTS_GRANTED = false
COMMERCIAL_AVAILABILITY = NOT_FOR_SALE
INDEPENDENT_REVIEW = PASS_INTERNAL_ECONOMICS_SCOPE
PR_CREATED = true
MERGED = false
DEPLOYED = false
MC13_STARTED = false
```
