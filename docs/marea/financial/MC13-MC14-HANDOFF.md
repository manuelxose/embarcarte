# MC-13 D16 — MC-14 handoff package

| Field | Value |
|---|---|
| Deliverable | D16 `MC13-MC14-HANDOFF.md` |
| Status | `READY_FOR_MC14_WITH_NAMED_GAPS` |
| Milestone | MC-13/36 — 60-month financial model, cash flow, investment requirements, scenario economics and conditional break-even |
| Date / owner | 2026-11-02 — Compliance and Financial Risk (`compliance-risk`) |
| Source register | `docs/marea/financial/data/mc14-handoff-inputs.json` (ten dependencies) |
| Machine data | `docs/marea/financial/data/mc14-handoff-inputs.json`; `docs/marea/financial/data/blocker-register.json`; `docs/marea/financial/data/manifest.json` |
| `mc14Started` | `false` |
| `mc14StartedByAnyAgent` | `false` |
| Boundary | Handoff package only. MC-14 (legal/commercial risk register and claims policy) is not started, not enumerated and not executed here. |

## 1. Purpose and hard boundary

This deliverable transfers the financial dependencies that MC-14 must consume when it
builds the legal/commercial risk register and claims policy. It is a handoff package,
not MC-14 work. `data/mc14-handoff-inputs.json` records `mc14Started: false` and
`mc14StartedByAnyAgent: false`; `data/manifest.json` records `MC14_STARTED: false`.

No MC-14 deliverable is created, started, modified or listed as executed by this
document. Nothing here authorises a legal opinion, an insurance contract, a supplier
contract, a price, a launch or a commercial claim. The legal-tax inputs remain
`INTERNAL_RESEARCH_INPUT_NOT_LEGAL_ADVICE` with `noLegalClearance: true`,
`noInsuranceContract: true` and `noProviderContract: true`.

## 2. MC-14 planned scope and status

`docs/marea/execution/MASTER-PROMPT-REGISTRY.md` row 14 defines MC-14 as
"Legal/commercial risk register and claims policy (CRA, warranty, returns, privacy,
payment)", depending on prompts 02 and 11–13, with outputs "Risk register + copy
rules" and acceptance "Owner and status per risk; prohibited claims enumerated;
consumes MC-02 blockers L/D/H/X". Its registry status is `PLANNED` and it has no
evidence cell. This handoff does not change that row.

Decision `D-050` applies to the handoff: tooling and certification are fixed programme
costs, excluded from variable unit cost and never counted twice. MC-14 must not turn
the illustrative certification envelope into a per-unit cost or a second line.

## 3. Financial status at handoff

The values below are copied from `financialStatusAtHandoff` in
`data/mc14-handoff-inputs.json`:

| Flag | Value |
|---|---|
| `MC13_VERDICT` | `PARTIAL` |
| `MC13_INTERNAL_FINANCIAL_SCOPE` | `PASS_INTERNAL_FINANCIAL_SCOPE` |
| `MC13_EXTERNAL_COMMERCIAL_VALIDATION` | `BLOCKED_OR_NOT_OBTAINED` |
| `COMMERCIAL_AVAILABILITY` | `NOT_FOR_SALE` |
| `PRICE_APPROVED` | `NONE` |
| `LICENSING_RIGHTS_GRANTED` | `false` |
| `CUSTOMER_WTP_VALIDATED` | `false` |
| `MC14_STARTED` | `false` |

Both the handoff JSON and `data/manifest.json` record
`MC13_INTERNAL_FINANCIAL_SCOPE: "PASS_INTERNAL_FINANCIAL_SCOPE"` after the independent
re-verification of corrected commit `573d65a`; the external commercial validation
remains `BLOCKED_OR_NOT_OBTAINED`. The PASS covers the internal analytical scope only:
no price, availability, financing or launch is approved, and MC-14 consumers must not
treat it as commercial validation.

## 4. The ten financial dependencies

| ID | Area | Financial inputs | Amount status | Recorded amount or rate | Evidence gap |
|---|---|---|---|---|---|
| `MC14-DEP-01` | COMPLIANCE_COST | `INV-02`, `BLK-FIN-02`, `BLK-REG-01` | `ILLUSTRATIVE_ENVELOPE_ONLY` | EUR 60 000.00 (envelope, not a quote) | No laboratory engaged; no quotation |
| `MC14-DEP-02` | INSURANCE_EXPOSURE | `OPEX-INSURANCE`, `BLK-FIN-04` | `UNKNOWN` | `null` | No broker indication or quotation |
| `MC14-DEP-03` | PRODUCT_LIABILITY | `BLK-FIN-11`, `BLK-SAFE-01` | `NOT_QUANTIFIABLE` | `null` | No safety case, E-stop, motor-isolation evidence or sea trials |
| `MC14-DEP-04` | WARRANTY_RETURNS | `ASM-MC13-003`, `OPEX-WARRANTY` | `PERCENTAGE_ASSUMPTION` | `amountPct` 3 percent; `amountEur` `null` | No measured return or failure rate |
| `MC14-DEP-05` | CYBERSECURITY_MAINTENANCE | `OPEX-CRA`, `OPEX-CYBER`, `BLK-FIN-05`, `BLK-REG-02` | `PARTIALLY_MODELLED_UNKNOWN` | `null`; stress case EUR 60 000.00/year | No scope, rate or support contract |
| `MC14-DEP-06` | PRIVACY_DATA_PROCESSING | `BLK-FIN-10`, `ASM-MC13-033` | `UNKNOWN` | `null` | No controller/processor mapping, DPIA or processor agreement |
| `MC14-DEP-07` | PAYMENT_OBLIGATIONS | `ASM-MC13-004`, `ASM-MC13-005`, `ASM-MC13-006` | `PUBLISHED_PERCENTAGE_TARIFF` | `amountPct` 1.5 percent card fee, `amountEur` `null`; 30 percent app-store commission | No merchant agreement; chargeback exposure unknown |
| `MC14-DEP-08` | COMMERCIAL_CLAIMS | `ASM-MC13-046`, `ASM-MC13-055` | `NOT_APPLICABLE` | `null` | None of the required commercial evidence exists |
| `MC14-DEP-09` | UNRESOLVED_LICENSING | `BLK-FIN-01`, `BLK-LIC-01`, `BLK-LIC-03`, `BLK-LIC-04`, `BLK-LIC-07`, `BLK-LIC-08`, `BLK-LIC-09` | `UNKNOWN` | `null` | Eleven rights recorded, nine blocking, no granted right |
| `MC14-DEP-10` | BLOCKED_LAUNCH_CONSEQUENCE | `ASM-MC13-045`, `ASM-MC13-046`, `BLK-FIN-07`, `BLK-FIN-13` | `CONDITIONAL` | `null` | Company accounts, funding authorization, customer evidence |

Unit note: percentages are stored separately as `amountPct` with `amountEur: null`;
the warranty allowance is `amountPct: 3` and the card fee is `amountPct: 1.5`. The
certification figure (EUR 60 000.00) is an illustrative capex envelope, not the price
of a compliance programme, and is not an annual cost. The `ASM-MC13-046` funding
envelope of EUR 2 000 000.00 is an analytical assumption, not an investor commitment or
a term sheet.

## 5. What MC-14 must do with each dependency

- `MC14-DEP-01` compliance cost: register the certification cost as `UNKNOWN` until a
  laboratory quotation exists; treat the EUR 60 000.00 only as an analytical envelope.
  No CE marking, RED, EMC or NMEA claim may be published before conformity evidence.
- `MC14-DEP-02` insurance exposure: register the premium as a named unknown fixed cost;
  no premium estimate may be invented as a revenue percentage. State liability,
  capped/uncapped regimes and territorial scope truthfully.
- `MC14-DEP-03` product liability: record PILOT as a blocked safety-critical product;
  no financial value may be attached to an uncertified control product, PILOT must not
  be offered, and no remote-control or safety claim is permitted.
- `MC14-DEP-04` warranty and returns: the 3 percent refund/withdrawal allowance is
  illustrative and the real return rate is unknown. Consumer guarantee and withdrawal
  rights must be stated accurately; no reliability claim may be published.
- `MC14-DEP-05` cybersecurity maintenance and CRA: support-period engineering is a
  named unknown and the EUR 60 000.00/year stress figure is not an estimate. No
  security certification, guaranteed update period or vulnerability-response SLA may
  be claimed before it exists.
- `MC14-DEP-06` privacy and data processing: FLEET tenancy and DPA cost are excluded
  from the conditional result. No data-protection claim, retention statement or
  processor statement may be published without the corresponding agreements.
- `MC14-DEP-07` payment obligations: published card fees and app-store commission are
  modelled; chargeback and fraud cost are not. Checkout and refund terms must match
  the hosted/tokenised payment policy, and no card data may be stored.
- `MC14-DEP-08` commercial claims restrictions: the risk register and copy rules must
  prohibit presenting a hypothetical financial result as profitability, investment
  return, demand evidence, market share or certified status.
- `MC14-DEP-09` unresolved licensing: NAV/WEATHER break-even and unit contribution
  remain `NOT_DETERMINABLE` while the licence cost is unknown. No chart, weather, NMEA
  certification or registered-trademark claim is permitted.
- `MC14-DEP-10` blocked-launch consequence: the restricted current case produces zero
  authorised revenue and cannot compute cash. No launch date, availability or
  investment commitment may be represented.

## 6. Prohibited claims the handoff requires MC-14 to adopt

MC-14's claims policy must prohibit at least the following, each traceable to a
dependency above: profitability; break-even; investment return; market share;
certified or CE/RED/EMC/NMEA status; validated demand; customer willingness to pay;
launch date or availability; insurance cover or premium; security certification,
guaranteed update period or vulnerability-response SLA; registered-trademark or
brand-clearance status; and any statement that an illustrative envelope is a budget,
quotation or approval.

Additional frozen facts MC-14 must keep: `COMMERCIAL_AVAILABILITY = NOT_FOR_SALE`,
`PRICE_APPROVED = NONE`, `LICENSING_RIGHTS_GRANTED = false`,
`CUSTOMER_WTP_VALIDATED = false`, `CUSTOMER_EVIDENCE = NONE`, PILOT safety gate
`BLOCKED`, AIS receive-only (`HB-01`), and MAREA trademark clearance `NOT_GRANTED`
(`HB-03`).

## 7. Consumption rules for the financial data

- `null` is unknown, never zero; no missing cost may be dropped, aggregated away or
  replaced by a benchmark without a source and an owner.
- An illustrative envelope is not a quotation, budget, approval or contract, and must
  not be converted into a price, premium, reserve or per-unit cost.
- Fixed programme costs follow `D-050`: capitalised or fixed, never added to variable
  cost, and never counted twice as both capex and per-unit cost.
- Derived results remain conditional and hypothetical; no result may be promoted to a
  verified break-even or a funding commitment.
- No MC-14 action may change MC-13 data, prices, governance flags or any inherited
  MC-12 record, and no external evidence may be inferred from absence of evidence.

## 8. Handoff state, named gaps and readiness

The handoff is `READY_FOR_MC14_WITH_NAMED_GAPS`: ten dependencies are documented, all
with explicit amount status and evidence gap, and none is closed. The certification,
insurance, product-liability, CRA, privacy, payment, licensing and blocked-launch gaps
cannot be closed by MC-14 alone; each needs an external artefact (laboratory quotation,
broker indication, safety case, support contract, DPA/DPIA, merchant agreement,
executed licence) or an authorization held by the programme Lead. Until those exist,
MC-14 may register risks and draft copy rules but may not certify, insure, price,
launch or approve anything.

This document closes the MC-13 to MC-14 handoff only. It does not start MC-14 and does
not authorise any later milestone.

## 9. Sources and cross-references

Machine-data reference: every amount status and dependency in this handoff is read
from `docs/marea/financial/data/mc14-handoff-inputs.json`, with blockers resolved
against `docs/marea/financial/data/blocker-register.json` and governance flags from
`docs/marea/financial/data/manifest.json`.

- `docs/marea/financial/data/mc14-handoff-inputs.json` — ten dependencies, amount
  statuses, evidence gaps and `financialStatusAtHandoff`.
- `docs/marea/financial/data/blocker-register.json` — `BLK-FIN-01` to `BLK-FIN-14`.
- `docs/marea/financial/data/manifest.json` — `MC14_STARTED: false`, status block,
  commercial availability and price status.
- `docs/marea/financial/data/mc13-handoff-consumption.json` — MC-12 input treatment.
- `docs/marea/economics/data/legal-tax-inputs.json` — VAT, consumer guarantee, CRA,
  GDPR, insurance and hard boundaries `HB-01` to `HB-03`.
- `docs/marea/execution/MASTER-PROMPT-REGISTRY.md` row 14 — MC-14 planned scope and
  `PLANNED` status; `docs/marea/execution/DECISION-LOG.md` `D-050`.
- D08 `MC13-OPEX-AND-SECURITY-LIFECYCLE-COSTS.md`; D15
  `MC13-UNKNOWN-COSTS-AND-COMMERCIAL-BLOCKERS.md`.

Recorded state: `mc14Started = false`, `mc14StartedByAnyAgent = false`, registry row 14
`PLANNED`, no MC-14 deliverable produced, executed or modified.
