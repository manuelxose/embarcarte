# MC-13 D08 — Fixed operating costs and security lifecycle costs

| Field | Value |
|---|---|
| Deliverable | D08 `MC13-OPEX-AND-SECURITY-LIFECYCLE-COSTS.md` |
| Status | `INTERNAL_FINANCIAL_ANALYSIS` |
| Milestone | MC-13/36 — 60-month financial model, cash flow, investment requirements, scenario economics and conditional break-even |
| Date / owner | 2026-11-02 — Compliance and Financial Risk (`compliance-risk`) |
| Machine sources | `data/operating-costs.json`, `assumptions.json`, `scenario-results.json`, `monthly-financial-model.json`, `stress-tests.json`, `capital-investments.json`, `blocker-register.json` |
| Governing contract | `MC13-FINANCIAL-DATA-CONTRACT.md` (checks V-10, V-12, V-20, A-18, A-19, A-20, D-04) |
| Review status | `PENDING_INDEPENDENT_REVIEW` |
| Boundary | Analysis only. No payroll, no actual expenditure, no approved budget, no insurance contract, no price approval, no availability, no break-even claim, no MC-14 start. |

## 1. Purpose and boundary

This deliverable states the fixed operating-cost schedule used by the MC-13 model,
identifies every line as an illustrative envelope rather than current payroll or
expenditure, records the conditional EBITDA-like result, states why a full profit
figure cannot be produced, and fixes the claims that must not be made about service
levels or security certification.

Every monetary value below is read from the JSON sources. No amount is a quotation,
supplier budget, insurance premium, salary, committed spend or approval:
`data/manifest.json` records `formalQuotations: 0` and `executedContracts: 0`, and no
`CONTRACTED` evidence class occurs in MC-13. Availability remains `NOT_FOR_SALE`;
every price status remains `HYPOTHESIS_UNAPPROVED`, `NOT_ESTABLISHED` or
`NOT_FOR_SALE`.

## 2. What the data contains and what it proves

`data/operating-costs.json` declares thirteen fixed cost lines: eleven `FIXED` lines
with scenario-specific monthly amounts plus two `ANNUAL_FIXED` unknown lines with
`monthlyAmountEur: null`, `scenarioValues: null`, `evidenceClass: "UNKNOWN"` and
`status: "UNKNOWN"`. Ten known lines are `SCENARIO_ASSUMPTION` with confidence
`NONE` — illustrative planning inputs with no external basis. The eleventh,
`OPEX-CLOUD-FLOOR`, is derived from `PUBLISHED_TARIFF` provider minimum/step floors
inherited from MC-12: a public tariff observation, not a contract and not a committed
spend.

Each known line declares `inflationPctPerYear: 3`, `appliesFromMonth: 1`,
`appliesToMonth: 60` and one `assumptionId`; each unknown line declares
`inflationPctPerYear: null`, a non-empty `unknownReason` and no dependencies.

## 3. Fixed operating-cost schedule (illustrative envelopes, EUR per month)

These are declared `scenarioValues` monthly amounts — illustrative capacity envelopes
for analysis, not payroll, headcount plans or supplier budgets.

| Line ID | Category | DOWNSIDE | BASE_HYPOTHETICAL | UPSIDE_HYPOTHETICAL | Behaviour | Evidence class | Assumption |
|---|---|---|---|---|---|---|---|
| `OPEX-ENG` | Engineering | 19 000.00 | 16 000.00 | 10 500.00 | `FIXED` | `SCENARIO_ASSUMPTION` | `ASM-MC13-142` |
| `OPEX-SUPPORT` | Customer support | 4 400.00 | 3 500.00 | 2 300.00 | `FIXED` | `SCENARIO_ASSUMPTION` | `ASM-MC13-143` |
| `OPEX-OPS` | Operations | 2 500.00 | 2 000.00 | 1 300.00 | `FIXED` | `SCENARIO_ASSUMPTION` | `ASM-MC13-144` |
| `OPEX-INFRA` | Infrastructure management | 1 800.00 | 1 500.00 | 1 000.00 | `FIXED` | `SCENARIO_ASSUMPTION` | `ASM-MC13-145` |
| `OPEX-SM` | Sales and marketing | 4 800.00 | 4 000.00 | 2 600.00 | `FIXED` | `SCENARIO_ASSUMPTION` | `ASM-MC13-146` |
| `OPEX-LEGAL` | Legal and accounting | 2 200.00 | 1 800.00 | 1 200.00 | `FIXED` | `SCENARIO_ASSUMPTION` | `ASM-MC13-147` |
| `OPEX-PRODUCT` | Product management | 2 400.00 | 2 000.00 | 1 300.00 | `FIXED` | `SCENARIO_ASSUMPTION` | `ASM-MC13-148` |
| `OPEX-CYBER` | Cybersecurity/updates | 3 000.00 | 2 500.00 | 1 600.00 | `FIXED` | `SCENARIO_ASSUMPTION` | `ASM-MC13-149` |
| `OPEX-WARRANTY` | Warranty administration | 1 000.00 | 800.00 | 520.00 | `FIXED` | `SCENARIO_ASSUMPTION` | `ASM-MC13-150` |
| `OPEX-COMPLIANCE` | Compliance | 1 800.00 | 1 500.00 | 1 000.00 | `FIXED` | `SCENARIO_ASSUMPTION` | `ASM-MC13-151` |
| `OPEX-CLOUD-FLOOR` | Cloud minimum floor | 750.00 | 600.00 | 400.00 | `FIXED` | `PUBLISHED_TARIFF` | `ASM-MC13-152` |
| **Known envelope total** | — | **43 650.00** | **36 200.00** | **23 720.00** | — | — | — |
| `OPEX-INSURANCE` | Business insurance (product liability premium) | `null` | `null` | `null` | `ANNUAL_FIXED` | `UNKNOWN` | `ASM-MC13-047` |
| `OPEX-CRA` | CRA lifecycle (support-period engineering and updates) | `null` | `null` | `null` | `ANNUAL_FIXED` | `UNKNOWN` | `ASM-MC13-048` |

The `null` lines are not zero: they are absent from the conditional result by explicit
`unknownCostsExcluded` declarations in `data/scenario-results.json`. When a real CRA
amount exists, it must be reconciled against `OPEX-CYBER` first so security operations
are not counted twice.

## 4. Envelope totals over the 60-month model

The known envelope is constant inside each 12-month block and steps by the declared
inflation assumption at `M13`, `M25`, `M37` and `M49`. Cumulative values are the
`fixedOpexEnvelope` totals at the `M12`, `M36` and `M60` views of
`data/scenario-results.json`.

| Scenario | Monthly envelope at `M01` | Cumulative `M12` | Cumulative `M36` | Cumulative `M60` |
|---|---|---|---|---|
| `DOWNSIDE` | EUR 43 650.00 | EUR 523 800.00 | EUR 1 619 013.48 | EUR 2 780 925.36 |
| `BASE_HYPOTHETICAL` | EUR 36 200.00 | EUR 434 400.00 | EUR 1 342 686.96 | EUR 2 306 288.64 |
| `UPSIDE_HYPOTHETICAL` | EUR 23 720.00 | EUR 284 640.00 | EUR 879 793.80 | EUR 1 511 192.40 |
| `RESTRICTED_CURRENT` | `UNKNOWN` (suppressed) | `UNKNOWN` | `UNKNOWN` | `UNKNOWN` |

`RESTRICTED_CURRENT` suppresses every monetary cost column, including `fixedOpexEnvelope`,
because current company expenses are unknown; the model stores `null`, not `0`. The
envelope direction is as declared in the data, not a forecast: `UPSIDE_HYPOTHETICAL` is
lower than `BASE_HYPOTHETICAL` and `DOWNSIDE`, matching the D01 definition of lower
operating-cost intensity. Inflation (`ASM-MC13-042`) is a `SCENARIO_ASSUMPTION`
(confidence `MEDIUM`) of 3 percent per year on every known line from `M01` to `M60`,
with no wage, provider or country index; `BASE_HYPOTHETICAL.fixedOpexEnvelope` is
EUR 36 200.00 for `M01`–`M12` and EUR 37 286.00 from `M13`, while unknown lines carry
`null`.

## 5. Conditional EBITDA-like result

`data/scenario-results.json` reports `ebitdaLikeConditional`, recomputed as
`knownVariableContribution - fixedOpexEnvelope` (reported as `contribution`); it is
conditional, hypothetical and pre-revenue, excluding unknown insurance and CRA cost.

| Scenario | View | Contribution | Fixed envelope | EBITDA-like | Amortisation (non-cash) | Accounting operating result |
|---|---|---|---|---|---|---|
| `DOWNSIDE` | `M12` | EUR 0.00 | EUR 523 800.00 | -EUR 523 800.00 | EUR 155 555.56 | -EUR 679 355.56 |
| `DOWNSIDE` | `M36` | EUR 34 147.79 | EUR 1 619 013.48 | -EUR 1 584 865.69 | EUR 487 586.87 | -EUR 2 072 452.56 |
| `DOWNSIDE` | `M60` | EUR 150 666.06 | EUR 2 780 925.36 | -EUR 2 630 259.30 | EUR 503 125.07 | -EUR 3 133 384.37 |
| `BASE_HYPOTHETICAL` | `M12` | EUR 15 294.95 | EUR 434 400.00 | -EUR 419 105.05 | EUR 124 444.44 | -EUR 543 549.49 |
| `BASE_HYPOTHETICAL` | `M36` | EUR 523 430.13 | EUR 1 342 686.96 | -EUR 819 256.83 | EUR 390 069.38 | -EUR 1 209 326.21 |
| `BASE_HYPOTHETICAL` | `M60` | EUR 1 688 226.86 | EUR 2 306 288.64 | -EUR 618 061.78 | EUR 402 499.93 | -EUR 1 020 561.71 |
| `UPSIDE_HYPOTHETICAL` | `M12` | EUR 53 940.35 | EUR 284 640.00 | -EUR 230 699.65 | EUR 105 777.74 | -EUR 336 477.39 |
| `UPSIDE_HYPOTHETICAL` | `M36` | EUR 1 706 337.08 | EUR 879 793.80 | EUR 826 543.28 | EUR 331 558.95 | EUR 494 984.33 |
| `UPSIDE_HYPOTHETICAL` | `M60` | EUR 5 475 105.86 | EUR 1 511 192.40 | EUR 3 963 913.46 | EUR 342 124.92 | EUR 3 621 788.54 |
| `RESTRICTED_CURRENT` | all views | `UNKNOWN` | `UNKNOWN` | `UNKNOWN` | `UNKNOWN` | `UNKNOWN` |

The measure is EBITDA-like, not statutory EBITDA: contribution after the illustrative
fixed envelope, before non-cash amortisation, interest and tax. It must never be
labelled profit, net result, margin, return or break-even.

## 6. Why a full profit figure cannot be produced

A full profit figure requires every operating cost, D&A, financing interest and
corporate income tax. MC-13 cannot complete that chain:

1. The product liability insurance premium (`OPEX-INSURANCE`, `ASM-MC13-047`) is
   `UNKNOWN` and excluded, not zero.
2. The CRA support-period engineering and update obligation (`OPEX-CRA`,
   `ASM-MC13-048`) is `UNKNOWN` and excluded, not zero.
3. The chart/weather data-licence cost is `UNKNOWN`, so NAV/WEATHER contribution and
   any downstream operating result are incomplete.
4. The capital schedule is incomplete: `INV-02` certification is an illustrative
   EUR 60 000.00 envelope (range EUR 36 000.00–EUR 96 000.00) and `INV-09`, `INV-10`
   and `INV-11` are `null`; amortisation and financing are conditional.
5. Company cash, existing expenses and funding authorization are `UNKNOWN`
   (`BLK-FIN-07`, `BLK-FIN-13`); opening cash uses analysis convention
   `ASM-MC13-044` of EUR 0.00.
6. No corporate income tax rate, interest rate, debt term or equity term is modelled;
   `accountingOperatingResult` stops before financing and tax.
7. No price is approved (`BLK-FIN-14`) and customer evidence is `NONE`
   (`BLK-FIN-06`); demand, CAC, churn and renewal are illustrative scenario inputs.
8. Chargeback, fraud, bad-debt and measured return or failure rates do not exist; the
   3 percent refund/withdrawal allowance `ASM-MC13-003` is an engineering assumption.

MC-13 therefore produces a conditional EBITDA-like result, never profit or verified
break-even; check V-20 forbids the claim while a material input is unknown.

## 7. Unknown fixed costs kept outside the conditional result

| Unknown | Declared amount | Evidence class | Owner | Blocker | Why excluded |
|---|---|---|---|---|---|
| Product liability insurance premium | `UNKNOWN` (`null` EUR per year) | `UNKNOWN` | legal-risk | `BLK-FIN-04` (`BLK-INS-01`) | No quotation, broker indication or public tariff exists; estimating it as a revenue percentage is prohibited. |
| CRA support-period engineering and update obligation | `UNKNOWN` (`null` EUR per year) | `UNKNOWN` | security-engineering | `BLK-FIN-05` (`BLK-REG-02`) | No scope, rate or support contract exists for the 5-year support and update period. |

`data/operating-costs.json` states both lines are "explicit unknown. Never treated as
zero and excluded"; `data/scenario-results.json` repeats this in `unknownCostsExcluded`.
True operating break-even and financing requirement are therefore higher.

## 8. Security lifecycle: CRA obligation and recurring engineering burden

The legal-tax inputs (`docs/marea/economics/data/legal-tax-inputs.json`, `LT-011`,
`LT-012`, `LT-013` and the `cra` block) record the following as
`OFFICIAL_LICENSING_DOCUMENT` evidence, not legal advice:

| Item | Recorded requirement |
|---|---|
| Reporting obligations from | 2026-09-11 (vulnerability and severe-incident reporting) |
| Main obligations from | 2027-12-11 (Regulation (EU) 2024/2847) |
| Support period / security updates | Support period of at least 5 years; security updates available for at least 10 years or the support period |
| Recurring obligations | Cybersecurity risk assessment, technical documentation, vulnerability handling, SBOM-type record |
| Conformity route | Not established for HUB, WATCH, AIS, DISPLAY or PILOT; third-party assessment not excluded |

The consumer update duty under Directive (EU) 2019/771 overlaps this obligation and
runs with the 3-year Spanish guarantee, so security maintenance is a recurring
engineering burden of `UNKNOWN` scope and amount, not a one-off certification cost.
`OPEX-CYBER` (EUR 2 500.00/month `BASE_HYPOTHETICAL`, EUR 3 000.00 `DOWNSIDE`,
EUR 1 600.00 `UPSIDE_HYPOTHETICAL`) is an illustrative planning envelope inside
`fixedOpexEnvelope`, not a CRA scope or compliance evidence. `OPEX-CRA` stays
`UNKNOWN`; any future rate must be reconciled against `OPEX-CYBER` to avoid double
counting. The CRA classification of MAREA devices is not established, so neither the
internal-control nor the notified-body route may be claimed.

## 9. Stress case: cybersecurity maintenance at EUR 60 000 per year

`data/stress-tests.json` case `ST-18` ("Unexpected cybersecurity maintenance
EUR 60k/year", override `cybersecurityMaintenanceEurPerYear: 60000`) applies a
declared CRA/security lifecycle cost on top of the `BASE_HYPOTHETICAL` envelope.

| View | Fixed envelope | EBITDA-like | Cumulative cash | Financing requirement | Break-even |
|---|---|---|---|---|---|
| `M12` | EUR 434 400.00 | -EUR 479 105.05 | -EUR 918 503.42 | EUR 918 503.42 | — |
| `M36` | EUR 1 342 686.96 | -EUR 999 256.83 | -EUR 1 104 705.28 | EUR 1 122 326.73 | — |
| `M60` | EUR 2 306 288.64 | -EUR 918 061.78 | -EUR 715 478.92 | EUR 1 122 326.73 | operating 44, cash flow 28 |

Against `BASE_HYPOTHETICAL` the case reduces the EBITDA-like result by EUR 60 000.00
at `M12`, EUR 180 000.00 at `M36` and EUR 300 000.00 at `M60`, and raises the conditional
financing requirement to EUR 1 122 326.73 (+EUR 135 000.00). It records
`viabilityCollapsed: true`, `unitContributionStillPositive: true`,
`cashRecoveryWithinHorizon: false` and `insolventWithoutFunding: false`, staying within
the EUR 2 000 000.00 analytical envelope; this is a stress override, not an estimate.

## 10. Claims that must not be made

- No service-level agreement, uptime commitment, support-response time or
  vulnerability-response SLA exists or may be published.
- No security certification (CRA conformity, notified-body assessment, ISO/IEC 27001
  or equivalent) is held or claimed.
- No guaranteed update period, minimum support window or end-of-support date may be
  published; the 5-year support period and 10-year update availability are statutory
  manufacturer obligations in the legal-tax inputs, not a MAREA service commitment.
- No CE marking, RED, EMC, NMEA 2000 certification or maritime approval may be claimed
  (`BLK-REG-01`, `BLK-LIC-04`), and no price, availability, launch date, profitability,
  margin, break-even, investment return or demand validation may be claimed
  (`BLK-FIN-06`, `BLK-FIN-14`); no "zero cost" or "included in price" statement may be
  derived from a `null` line.

## 11. Capitalised items and sources

Certification and tooling are fixed programme costs treated as capital expenditure,
not operating expenditure, following decision `D-050` (fixed costs, no double counting).
`data/capital-investments.json` declares `knownCapexEnvelopeEur` of EUR 402 500.00 with
`INV-09`, `INV-10` and `INV-11` unknown. `OPEX-COMPLIANCE` is administrative compliance
capacity only; it does not contain the certification programme cost.

Sources: `MC13-FINANCIAL-DATA-CONTRACT.md` §4.6 and checks `V-10`, `V-12`, `V-20`,
`A-18`, `A-19`; `data/operating-costs.json`; `data/assumptions.json`
(`ASM-MC13-042`, `ASM-MC13-142`–`ASM-MC13-152`, `ASM-MC13-047`, `ASM-MC13-048`);
`data/scenario-results.json`; `data/stress-tests.json`
(`ST-18`); `data/capital-investments.json`; `docs/marea/economics/data/legal-tax-inputs.json`;
D15 `MC13-UNKNOWN-COSTS-AND-COMMERCIAL-BLOCKERS.md`; D16 `MC13-MC14-HANDOFF.md`.

This deliverable approves no cost, price, supplier, premium, service level or
certification, and it does not start MC-14.
