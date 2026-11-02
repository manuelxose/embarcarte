# MC-13 — Delivery record (D21)

| Field | Value |
|---|---|
| Milestone | MC-13/36 — 60-month financial model, cash flow, investment requirements, scenario economics and conditional break-even |
| Date | 2026-11-02 |
| Branch | `feature/marea-mc13-financial-model-cashflow-break-even` |
| Base | `e59a8b9b3916d979d8eaeff78acd3795fd26c125` (verified MC-12 head; local = remote) |
| Predecessor PR | [#19](https://github.com/manuelxose/embarcarte/pull/19), open, draft, unmerged |
| Draft PR | [#20](https://github.com/manuelxose/embarcarte/pull/20), stacked on `feature/marea-mc12-recurring-data-unit-economics`, open, draft, unmerged |
| Initial audited commit | `7dfb56dddfa20939605129d51c1a203d3e325cc6` (`7dfb56d`) |
| Corrected audited commit | `573d65a4e1f3c3799350691a6e698e97f5e483c1` (`573d65a`) |
| Final record commit | recorded in `data/review-findings.json` `finalRecordCommit` and in PR #20 |
| Verdict | `MC13_VERDICT = PARTIAL`; `MC13_INTERNAL_FINANCIAL_SCOPE = PASS_INTERNAL_FINANCIAL_SCOPE`; external commercial validation `BLOCKED_OR_NOT_OBTAINED` |

## 1. Scope delivered

A complete internal financial planning package for the nine MAREA families, their
editions and the six bundles: one integrated 60-period model with 12/36/60 views, a
restricted current case plus three hypothetical post-clearance scenarios, monthly cash
flow and working capital, VAT and deferred revenue, hardware inventory and production
financing, capex and non-cash amortisation, operating-cost envelopes, conditional
contribution and EBITDA-like results, conditional break-even thresholds, 24 stress
cases, a portfolio prioritisation with six separate rankings, a financial blocker
register, an MC-14 handoff, machine-readable datasets, a deterministic engine and
builder, a 77-check validator, a 29-test adversarial suite, an independent audit and a
Spanish executive report.

No commercial lifecycle state was changed. No price was approved. No licensing right
was granted. No provider, supplier or customer was contacted. No merge, deployment,
publication or MC-14 execution occurred.

## 2. Deliverable inventory

| ID | Deliverable | Path |
|---|---|---|
| D01 | Baseline and governance | `MC-13-BASELINE-AND-GOVERNANCE.md` |
| D02 | Financial data contract | `MC13-FINANCIAL-DATA-CONTRACT.md` |
| D03 | Assumptions and evidence register (generated) | `MC13-ASSUMPTIONS-AND-EVIDENCE-REGISTER.md` |
| D04 | 60-month integrated financial model | `MC13-60-MONTH-INTEGRATED-FINANCIAL-MODEL.md` |
| D05 | Revenue and cohort forecasts | `MC13-REVENUE-AND-COHORT-FORECASTS.md` |
| D06 | Hardware production and inventory cash flow | `MC13-HARDWARE-PRODUCTION-AND-INVENTORY-CASHFLOW.md` |
| D07 | Recurring revenue and SaaS economics | `MC13-RECURRING-REVENUE-AND-SAAS-ECONOMICS.md` |
| D08 | Opex and security lifecycle costs | `MC13-OPEX-AND-SECURITY-LIFECYCLE-COSTS.md` |
| D09 | Capex and funding requirements | `MC13-CAPEX-AND-FUNDING-REQUIREMENTS.md` |
| D10 | Working capital and cash flow | `MC13-WORKING-CAPITAL-AND-CASHFLOW.md` |
| D11 | Scenarios 12/36/60 | `MC13-SCENARIOS-12-36-60.md` |
| D12 | Conditional break-even analysis | `MC13-CONDITIONAL-BREAK-EVEN-ANALYSIS.md` |
| D13 | Sensitivity and stress tests | `MC13-SENSITIVITY-AND-STRESS-TESTS.md` |
| D14 | Portfolio and capital prioritization | `MC13-PORTFOLIO-AND-CAPITAL-PRIORITIZATION.md` |
| D15 | Unknown costs and commercial blockers | `MC13-UNKNOWN-COSTS-AND-COMMERCIAL-BLOCKERS.md` |
| D16 | MC-14 handoff | `MC13-MC14-HANDOFF.md` |
| D17 | Machine data + engine + builder | `data/*.json`, `scripts/marea-financial-engine.mjs`, `scripts/build-marea-financial-model.mjs` |
| D18 | Validator and adversarial suite | `scripts/check-marea-financial-model.mjs`, `scripts/check-marea-financial-model.test.mjs` |
| D19 | Independent audit | `review/MC-13-REVIEW.md`, `data/review-findings.json` |
| D20 | Spanish executive financial report | `MC13-EXECUTIVE-REPORT.md` |
| D21 | This delivery record | `MC-13-DELIVERY.md` |

Generated reconciliation registers: `MC13-GENERATED-FIGURES.md` and
`MC13-ASSUMPTIONS-AND-EVIDENCE-REGISTER.md`, both reproduced byte-for-byte by the
builder and re-checked by the validator.

## 3. Model coverage

- 60 periods per scenario: `RESTRICTED_CURRENT`, `DOWNSIDE`, `BASE_HYPOTHETICAL`,
  `UPSIDE_HYPOTHETICAL`.
- Nine families, 17 contractual editions/SKUs plus one labelled symbolic SENSE entry
  record, six bundles, seven subscription price hypotheses.
- 153 assumptions: 125 `SCENARIO_ASSUMPTION`, 11 `ENGINEERING_ASSUMPTION`,
  7 `PUBLISHED_TARIFF`, 1 `INHERITED_ASSUMPTION`, 1 `VERIFIED_OBSERVED`,
  1 `OFFICIAL_LICENSING_DOCUMENT`, 7 `UNKNOWN`; 0 formal quotations, 0 executed
  contracts.
- 70 break-even thresholds: 0 verified, 56 conditional hypothetical, 14
  `NOT_DETERMINABLE`.
- 24 stress cases, including compound adverse cases; 32 individual override
  applications, all effective.
- 14 financial blockers: 9 `BLOCKING`, 5 `MAJOR`, all open.
- 45-file predecessor SHA-256 baseline unchanged.

## 4. Key conditional results (EUR)

| Scenario | Net revenue M60 | Contribution M60 | EBITDA-like M60 | Cumulative cash M60 | Financing requirement |
|---|---:|---:|---:|---:|---:|
| `RESTRICTED_CURRENT` | 0.00 (authorized) | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN |
| `DOWNSIDE` | 367,050.26 | 150,666.06 | −2,630,259.30 | −3,081,802.04 | 3,081,802.04 |
| `BASE_HYPOTHETICAL` | 3,426,647.12 | 1,688,226.86 | −618,061.78 | −464,878.15 | 995,185.23 |
| `UPSIDE_HYPOTHETICAL` | 10,148,301.82 | 5,475,105.86 | 3,963,913.46 | +5,311,017.86 | 621,240.91 |

Break-even: BASE operating M39 / cash-flow M23 / cumulative recovery not within 60;
UPSIDE M15 / M11 / M23; DOWNSIDE none. All thresholds are conditional or not
determinable; none is a verified company break-even, profitability or investment
return.

## 5. Automated results

| Command | Result |
|---|---|
| `npm run test:financial` | 77 checks — **77/77 PASS** |
| `npm run test:financial:unit` | 29 tests — 29/29 (decoupled positive control) |
| `npm run test:economics` / `:unit` | PASS |
| `npm run test:hardware` / `:unit` | PASS |
| `npm run test:products` / `:unit` | PASS |
| `npm run test:bundles` / `:unit` | PASS |
| `npm run test:brand` / `:unit` | PASS |
| `npm run test:market` / `:unit` | PASS |
| `npm run test:customer-research` / `:unit` | PASS |
| `npm run test:customer-recovery` / `:unit` | PASS |
| `npm run test:i18n` / `test:commerce` / `test:seo` / `test:backup` | PASS |
| `npm run format:check` | PASS |
| `npm run build` | PASS |
| `npm run test:e2e` | PASS (15/15) |
| `npm audit --omit=dev --audit-level=high` | PASS (0 vulnerabilities) |
| `git diff --check` | clean |

Environment: Windows 11 Home, Node.js v24.18.0, npm 12.0.1, git 2.38.0, gh 2.96.0.
No command was sandbox-blocked; no unexecuted test is reported as PASS.

## 6. Independent audit and correction loop

The independent financial auditor (a different agent from every author) audited the
frozen commit `7dfb56d` and withheld sign-off with `PARTIAL` and 16 findings:
2 `BLOCKING`, 3 `MAJOR`, 8 `MINOR`, 3 `INFORMATIONAL`. The blocking findings were the
missing delivery record/registry update and a premature independent-review PASS in
D20; the major findings were the refund allowance not settled in cash, the distributor
invoice basis (VAT added twice and the 35 % margin ignored) and the adversarial suite
being coupled to the live review state.

Corrections applied before re-freezing:
- refunds/withdrawal allowances are paid in cash and `ST-07` is adverse again;
- distributor invoicing uses the channel-adjusted VAT-inclusive trade price and the
  validator recomputes it (`A-28`);
- refund cash and ST-07 direction are machine-checked (`A-27`);
- the adversarial suite's positive control is a synthetic final record and test 27 no
  longer depends on the live verdict (29/29 reproducible);
- scenario and portfolio-threshold lineage is populated (`S-12`);
- the data contract was synchronised with the implemented gate (77 checks, A-15,
  A-27/A-28, D-11, restricted zero-vs-null wording);
- evidence counts cover all 153 assumptions (`F-13`);
- the executive report no longer asserts an unawarded PASS and the gate now rejects a
  document-level false PASS (`D-11`);
- documentation copies of blocker severity, subscription headroom and stress semantics
  were corrected.

The auditor re-verified corrected commit `573d65a` independently (61 series × 60
periods, 12/36/60 views, 24/24 stress cases, 70 thresholds, 197/197 document claims,
19/19 own mutations, 90/90 MC-11 scenarios and 13/13 inherited unit costs): 0
mismatches, builder current, unit suite 29/29 and validator 77/77 with the regenerated
manifest. Verdict: `PASS_INTERNAL_FINANCIAL_SCOPE`; 13 of 16 findings closed, 0
BLOCKING/MAJOR open, 3 non-blocking open (F-05 MINOR contract/id mapping, F-11 MINOR
per-unit average/D13 wording, F-14 INFORMATIONAL CI not running the financial gate).
The PASS covers the internal analytical scope only; external commercial evidence
remains `BLOCKED_OR_NOT_OBTAINED`.

## 7. Prohibited actions asserted absent

No merge, deployment, publication, public price/catalogue/checkout/SEO/payment change,
customer/provider/supplier contact, RFQ, account registration, purchase, paid API,
certification, AIS transmission offer, PILOT commercial availability, FLEET default
hardware, safety gating, trademark filing or MC-14 execution.

## 8. Known risks and limitations

- External commercial evidence remains `BLOCKED_OR_NOT_OBTAINED`: 0 quotations,
  0 contracts, 0 granted rights, 0 customer evidence, `CUSTOMER_WTP_VALIDATED = false`.
- Data-licence, insurance, CRA, FLEET onboarding/DPA/SLA, CAC, churn/renewal and
  company-cash inputs remain `UNKNOWN`; every reported financing requirement is
  therefore a conditional floor, not the full external need.
- Opening cash is a declared zero analysis convention, not the company position.
- VAT treatment is a documented illustration; the M60 VAT balance is paid after the
  horizon; input VAT is recovered on inventory receipts only.
- Demand, churn, renewal, activation and channel inputs are illustrative scenario
  assumptions with no probability.
- The 60-month horizon truncates the last distributor collections; the effect is
  allocated, not lost.
- CI does not yet run `test:financial`; the PR check does not evidence the financial
  gate (recorded as INFORMATIONAL in the audit).

## 9. Status block

```text
MC13_VERDICT = PARTIAL
MC13_INTERNAL_FINANCIAL_SCOPE = PASS_INTERNAL_FINANCIAL_SCOPE
MC13_60_MONTH_MODEL = IMPLEMENTED
MC13_12_36_60_RECONCILIATION = PASS
MC13_CASHFLOW_VALIDATED = PASS_INTERNAL_SCOPE
MC13_FINANCING_REQUIREMENT_MODEL = CONDITIONAL_HYPOTHETICAL
MC13_BREAK_EVEN_STATUS = CONDITIONAL_HYPOTHETICAL_ONLY
MC13_CUSTOMER_DEMAND_EVIDENCE = NONE
MC13_EXTERNAL_COMMERCIAL_VALIDATION = BLOCKED_OR_NOT_OBTAINED
MC13_INDEPENDENT_REVIEW = PASS_INTERNAL_FINANCIAL_SCOPE

MC12_VERDICT = PARTIAL
MC12_INTERNAL_ECONOMICS_SCOPE = PASS_INTERNAL_ECONOMICS_SCOPE

PRICE_APPROVED = NONE
LICENSING_RIGHTS_GRANTED = false
CUSTOMER_WTP_VALIDATED = false
COMMERCIAL_AVAILABILITY = NOT_FOR_SALE

PR_CREATED = true
MERGED = false
DEPLOYED = false
MC14_STARTED = false
```
