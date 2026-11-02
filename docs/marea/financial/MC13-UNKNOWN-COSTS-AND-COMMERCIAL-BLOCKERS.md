# MC-13 D15 — Unknown costs and commercial blockers

| Field | Value |
|---|---|
| Deliverable | D15 `MC13-UNKNOWN-COSTS-AND-COMMERCIAL-BLOCKERS.md` |
| Status | `INTERNAL_FINANCIAL_ANALYSIS` |
| Milestone | MC-13/36 — 60-month financial model, cash flow, investment requirements, scenario economics and conditional break-even |
| Date / owner | 2026-11-02 — Compliance and Financial Risk (`compliance-risk`) |
| Machine sources | `data/blocker-register.json`, `data/assumptions.json`, `data/operating-costs.json`, `data/mc14-handoff-inputs.json`, `data/mc13-handoff-consumption.json`, `data/break-even-thresholds.json`, `data/working-capital.json`, `data/manifest.json`; inherited `docs/marea/economics/data/blocker-register.json`, `legal-tax-inputs.json`, `MC12-MC13-HANDOFF.md` |
| Governing contract | `MC13-FINANCIAL-DATA-CONTRACT.md` (checks U-11, V-08, V-10, V-12, V-20, D-05, A-21) |
| Review status | `PENDING_INDEPENDENT_REVIEW` |
| Boundary | Analysis only. No invented amount, premium, rate or approval; no price approval; no commercial availability; no break-even claim; no MC-14 start. |

## 1. Purpose and boundary

This deliverable records every material financial unknown behind MC-13, the fourteen
financial blockers that prevent a defensible commercial conclusion, the model output
each one blocks, and the evidence that would close it. It also explains why NAV/WEATHER
break-even is `NOT_DETERMINABLE` and states the financial consequence of a blocked
launch.

The register references inherited MC-12 blockers and never removes or reclassifies
them. Fourteen financial blockers are `OPEN`; none is closed by inference, by an
illustrative envelope or by a zero substitution. No price, launch, availability,
financing or insurance conclusion is approved here.

## 2. How unknowns are represented

`null` means unknown; it is never `0`. Every `UNKNOWN`/`BLOCKED` assumption carries
`value: null` and a non-empty `unknownReason`; every cost input carries an
`evidenceClass` and `behaviour`; a missing cost is never converted to zero by
aggregation. A cost input may be `null`, a labelled `SCENARIO_ASSUMPTION` envelope or
an explicit illustrative range — never a quotation, budget or contract. The manifest
records `formalQuotations: 0`, `executedContracts: 0` and no `CONTRACTED` evidence.
The `RESTRICTED_CURRENT` case keeps monetary columns `null` with a suppression reason.

## 3. Material unknown costs

| ID | Unknown | Blocker | Amount status | Owner | Model output blocked | Evidence required |
|---|---|---|---|---|---|---|
| `UNK-01` | Chart/weather data licence (shared NAV/WEATHER entitlement) | `BLK-FIN-01` | `UNKNOWN`, `null` EUR per account-year (`ASM-MC13-049`) | legal-licensing | `softwareDirectCosts`; NAV/WEATHER subscription contribution; `BE-*-SUB-NAV-*`, `BE-*-SUB-WEATHER-*`, `BE-BASE-SUBSCRIBERS` | Executed licence terms with territory, caching, per-device and price conditions |
| `UNK-02` | Certification and conformity programme | `BLK-FIN-02` | `ILLUSTRATIVE_ENVELOPE_ONLY`: `INV-02` EUR 60 000.00, range EUR 36 000.00–EUR 96 000.00 | conformity-engineering | `capexCash`, `amortizationNonCash`, `financingRequirement`, true operating break-even | Laboratory quotations for EMC/RED/environmental/CRA scope |
| `UNK-03` | Supplier quotations, MOQ, lead time and payment terms | `BLK-FIN-03`, `BLK-FIN-12` | `UNKNOWN`; working-capital policy is a `SCENARIO_ASSUMPTION` (MOQ 25 units, 2-month lead, 30 percent deposit/30-day balance, none contracted) | hardware-sourcing | `cogsHardware`, `inventoryPurchasesCash`, `workingCapitalMovement`, `tradeReceivablesEnd` | Formal supplier quotations with MOQ, Incoterms and payment terms; credit and returns terms |
| `UNK-04` | Product liability insurance premium | `BLK-FIN-04` | `UNKNOWN`, `null` EUR per year (`ASM-MC13-047`) | legal-risk | `fixedOpexEnvelope` completeness, `ebitdaLikeConditional`, operating break-even, `financingRequirement` | Broker indication or quotation with territory and product scope |
| `UNK-05` | CRA support-period engineering and update cost | `BLK-FIN-05` | `PARTIALLY_MODELLED_UNKNOWN`: `OPEX-CYBER` illustrative; `OPEX-CRA` `null` (`ASM-MC13-048`) | security-engineering | Multi-year `ebitdaLikeConditional` and `financingRequirement`; stress `ST-18` tests EUR 60 000.00/year | Maintenance scope, support-period plan and cost rate |
| `UNK-06` | Company cash, funding and existing expenses | `BLK-FIN-07`, `BLK-FIN-13` | `UNKNOWN`, `null` (`ASM-MC13-045`); `ASM-MC13-046` EUR 2 000 000.00 is an illustrative analytical envelope, not an offer | programme-lead | `RESTRICTED_CURRENT` cash, burn and `financingRequirement`; opening-cash convention is EUR 0.00 (`ASM-MC13-044`) | Company accounts, bank statement and written funding authorization or term sheet |
| `UNK-07` | EUR/USD exposure and inherited BOM conversion | `BLK-FIN-08` | Engineering assumption, no hedge (`fxHedgeExists: false`); stress `ST-05` tests +10% | hardware-sourcing | `cogsHardware` in EUR, `hardwareRevenueSharePct`, unit contribution | Supplier currency terms and a single disclosed re-conversion pass as recorded in `BLK-FIN-08` |
| `UNK-08` | Cross-border VAT/OSS, input VAT and customs duty | `BLK-FIN-09` | VAT 21% Spanish rate confirmed from official guidance; cross-border treatment not professionally confirmed; customs duty per SKU `UNKNOWN` | finance-tax | `netRecognizedRevenue` conversion, `vatOutput`, `vatPaid`, landed cost, `netVatCash` | Spanish tax adviser confirmation per supply and channel; CN-code classification and duty rates |
| `UNK-09` | FLEET onboarding, DPA, SLA and tenancy cost | `BLK-FIN-10` | `UNKNOWN`, excluded from the conditional result | saas-operations | `softwareDirectCosts`; FLEET contribution and `BE-*-FLEET-VESSELS` | Tenancy design, DPA, SLA and support-cost plan |
| `UNK-10` | PILOT cost, revenue and safety case | `BLK-FIN-11` | `NOT_QUANTIFIABLE`; PILOT excluded from every financial scenario | safety-engineering | Excluded by design: zero units, zero revenue and `null` cost, never a zero-cost fiction | PILOT safety case, hardware scope and quotation |
| `UNK-11` | Approved price | `BLK-FIN-14` | `HYPOTHESIS_UNAPPROVED` / `NOT_ESTABLISHED`; `PRICE_APPROVED = NONE` | programme-lead | Every revenue, contribution and break-even output; check V-01 | Approved price policy with channel, tax and willingness-to-pay evidence |
| `UNK-12` | Customer evidence: CAC, conversion, churn, renewal and willingness to pay | `BLK-FIN-06` | `UNKNOWN` (`ASM-MC13-050`, `-051`, `-052`); all rates are `SCENARIO_ASSUMPTION` | commercial-research | Demand profiles, retention, subscription revenue, subscriber break-even | Executed interviews and pricing responses under `AUTH-MC10-001` |

Payment processing is modelled on a published tariff (1.5 percent plus EUR 0.25 per
transaction); chargeback, fraud and merchant terms remain unmodelled and no merchant
agreement exists. The 3 percent refund/withdrawal allowance is an engineering
assumption (`ASM-MC13-003`), not a measured return rate.

## 4. Financial blocker register (fourteen `OPEN` blockers)

| ID | Domain | Title (abbreviated) | Severity | Inherited MC-12 reference | Owner | Evidence required | Blocked output |
|---|---|---|---|---|---|---|---|
| `BLK-FIN-01` | LICENSING | Chart/weather licence cost `UNKNOWN`; rights `NOT_GRANTED` | `BLOCKING` | `BLK-LIC-01`, `BLK-LIC-03` | legal-licensing | Executed licence terms (territory, caching, per-device, price) | NAV/WEATHER unit contribution and subscription break-even |
| `BLK-FIN-02` | CERTIFICATION | Conformity/certification programme cost `UNKNOWN` | `BLOCKING` | `BLK-COST-01`, `BLK-REG-01` | conformity-engineering | EMC/RED/environmental/CRA laboratory quotations | Capex, financing requirement, true break-even |
| `BLK-FIN-03` | PROCUREMENT | No supplier quotation, MOQ, lead time or payment term | `BLOCKING` | `BLK-COST-02` | hardware-sourcing | Formal quotations with MOQ, Incoterms, payment terms | Hardware COGS, inventory cash, working capital |
| `BLK-FIN-04` | INSURANCE | Product liability insurance premium `UNKNOWN` | `BLOCKING` | `BLK-INS-01` | legal-risk | Broker indication or quotation | Fixed-opex completeness, EBITDA-like, operating break-even |
| `BLK-FIN-05` | SECURITY_LIFECYCLE | CRA support-period engineering/update cost `UNKNOWN` | `MAJOR` | `BLK-REG-02` | security-engineering | Maintenance scope, support-period plan, cost rate | Multi-year EBITDA-like, financing requirement |
| `BLK-FIN-06` | CUSTOMER | No customer evidence, CAC, conversion, churn, renewal or WTP | `BLOCKING` | `BLK-COMM-01` | commercial-research | Executed interviews and pricing responses under `AUTH-MC10-001` | Every demand figure and retention rate |
| `BLK-FIN-07` | COMPANY_CASH | Current cash, funding and existing expenses `UNKNOWN` | `BLOCKING` | None (registered in MC-13) | programme-lead | Company accounts, bank statement, funding authorization | Restricted-case cash, burn and financing need |
| `BLK-FIN-08` | FX | EUR/USD exposure unhedged; inherited conversion is an engineering assumption | `MAJOR` | `BLK-COST-05` | hardware-sourcing | Supplier currency terms and disclosed re-conversion pass | EUR hardware cost and unit contribution |
| `BLK-FIN-09` | TAX | Cross-border VAT/OSS and input-VAT treatment not professionally confirmed | `MAJOR` | `BLK-COST-04` | finance-tax | Tax adviser confirmation per supply and channel | Net revenue conversion and VAT cash timing |
| `BLK-FIN-10` | FLEET | FLEET onboarding, DPA, SLA and tenancy cost not established | `MAJOR` | `BLK-DATA-01` | saas-operations | Tenancy design, DPA, SLA and support-cost plan | FLEET contribution and per-vessel break-even |
| `BLK-FIN-11` | SAFETY | PILOT has no cost, revenue or safety case and cannot be modelled | `BLOCKING` | `BLK-SAFE-01` | safety-engineering | PILOT safety case, hardware scope and quotation | PILOT is excluded from every scenario |
| `BLK-FIN-12` | WORKING_CAPITAL | No inventory, credit, return or obsolescence agreement | `MAJOR` | `BLK-COST-02` | hardware-sourcing | Supplier credit terms, return agreement, demand evidence | Inventory cash and stranded-stock exposure |
| `BLK-FIN-13` | FINANCING | No financing authorization, term sheet or investor commitment | `BLOCKING` | None (registered in MC-13) | programme-lead | Written funding authorization or signed term sheet | Financing requirement is conditional and unfunded |
| `BLK-FIN-14` | PRICE | No price is approved | `BLOCKING` | `BLK-PRICE-01` | programme-lead | Approved price policy with channel, tax and WTP evidence | All revenue and price-dependent output |

## 5. Severity, status and reconciliation

All fourteen records are `OPEN`. Per-record severity is nine `BLOCKING`
(`BLK-FIN-01`, `-02`, `-03`, `-04`, `-06`, `-07`, `-11`, `-13`, `-14`) and five
`MAJOR` (`BLK-FIN-05`, `-08`, `-09`, `-10`, `-12`); the register `summary` now agrees
(9 blocking, 5 major, 14 open).

No blocker is marked resolved by a price hypothesis, a scenario switch, a demand
assumption or an illustrative cost envelope. `LICENSING_RIGHTS_GRANTED = false`,
`CUSTOMER_WTP_VALIDATED = false` and `PRICE_APPROVED = NONE` remain frozen.

## 6. Why NAV/WEATHER break-even is `NOT_DETERMINABLE`

The chart/weather data-licence cost sits directly in the contribution of every NAV and
WEATHER subscription. Because the amount is `UNKNOWN` and the rights are
`NOT_GRANTED`, no break-even subscriber count, break-even price or break-even month
can be computed. `data/break-even-thresholds.json` states `NOT_DETERMINABLE` for every
NAV/WEATHER subscription threshold and for the portfolio subscriber threshold:

| Threshold | Reported value | Status | Missing input |
|---|---|---|---|
| `BE-BASE_HYPOTHETICAL-SUB-NAV-ESSENTIAL` | `UNKNOWN` | `NOT_DETERMINABLE` | Chart/weather data-licence cost |
| `BE-BASE_HYPOTHETICAL-SUB-NAV-PRO` | `UNKNOWN` | `NOT_DETERMINABLE` | Chart/weather data-licence cost |
| `BE-BASE_HYPOTHETICAL-SUB-WEATHER-STANDARD` | `UNKNOWN` | `NOT_DETERMINABLE` | Chart/weather data-licence cost |
| `BE-BASE_HYPOTHETICAL-SUB-WEATHER-PRO` | `UNKNOWN` | `NOT_DETERMINABLE` | Chart/weather data-licence cost |
| `BE-BASE-SUBSCRIBERS` | `UNKNOWN` | `NOT_DETERMINABLE` | Data-licence cost, validated subscription mix, validated churn/renewal |

The `DOWNSIDE` and `UPSIDE_HYPOTHETICAL` equivalents carry the same status.

The four NAV/WEATHER thresholds carry `value: null` because the unknown licence cost
enters their derivation; no numeric unit threshold is published and none may be quoted
as a break-even figure. NAV and WEATHER share one entitlement ledger
(`ENT-NAV-WEATHER`), so the licence cost may be charged and costed at most once per
licensed account; the shared treatment does not remove the unknown. The portfolio
subscriber break-even is reported as not determinable rather than inventing a number.

## 7. What evidence closes each blocker and who must provide it

- **legal-licensing:** executed chart and weather data licences with territory,
  caching, update, per-device rights, price and SLA; `BLK-FIN-01`.
- **conformity-engineering:** laboratory quotations for EMC, RED, environmental and
  CRA scope, and the conformity budget; `BLK-FIN-02`.
- **hardware-sourcing:** formal supplier quotations with MOQ, Incoterms, lead times
  and payment terms, plus credit and return terms; `BLK-FIN-03`, `BLK-FIN-12`.
- **legal-risk:** broker indication or quotation for product liability cover with
  territory and product scope; `BLK-FIN-04`. Also the IP and trademark clearance
  opinions behind `BLK-LIC-08` and `BLK-LIC-09`.
- **security-engineering:** maintenance scope, support-period plan, update cadence and
  cost rate for the CRA lifecycle; `BLK-FIN-05`.
- **commercial-research:** executed interviews and pricing responses under
  `AUTH-MC10-001`; `BLK-FIN-06`.
- **finance-tax:** Spanish tax adviser confirmation for each supply and channel, plus
  CN-code duty classification; `BLK-FIN-09`.
- **saas-operations:** FLEET tenancy design, DPA, SLA and support-cost plan;
  `BLK-FIN-10`.
- **safety-engineering:** PILOT safety case, hardware scope and quotation; `BLK-FIN-11`.
- **programme-lead:** company accounts, bank statement, written funding authorization
  or signed term sheet, and approved price policy; `BLK-FIN-07`, `BLK-FIN-13`,
  `BLK-FIN-14`.

External authorization or evidence is required for twelve of the fourteen records;
`BLK-FIN-05` and `BLK-FIN-10` are recorded as internal owner tasks (`external: false`),
but their artefacts still do not exist. No evidence item in this list has been
obtained as of 2026-11-02.

## 8. Financial consequence of blocked launches

In the `RESTRICTED_CURRENT` case every product is `NOT_FOR_SALE`, so authorised revenue
is EUR 0.00, no sale can be recognised, and monetary cost, cash, burn and financing
columns are `null` with a suppression reason. The restricted operating break-even
threshold `BE-RESTRICTED-OPERATING` is `NOT_DETERMINABLE`, and the scenario summary
records status `CONDITIONAL_RESTRICTED_ZERO` with no break-even month. In the
hypothetical scenarios the blocked inputs above make the financing requirement
conditional and unfunded: the `BASE_HYPOTHETICAL` financing requirement is
EUR 995 185.23, the `DOWNSIDE` figure is EUR 3 081 802.04 and the
`UPSIDE_HYPOTHETICAL` figure is EUR 621 240.91 — all
`CONDITIONAL_HYPOTHETICAL_THRESHOLD`, all excluding the unknown costs, and none a
funding offer or a launch commitment.

## 9. Substitutions this register forbids

- No `null` cost may be replaced by zero, by a percentage of revenue, or by an
  "industry benchmark" without a source and an owner.
- No licence, insurance premium, certification fee or MOQ may be estimated from a
  competitor price, a public average or a scenario envelope.
- No blocked launch may be described as delayed to a date, funded, insured, certified
  or approved.
- No conditional threshold may be promoted to a verified break-even, profitability or
  investment-return claim; check V-20 applies.

## 10. Sources and cross-references

- `docs/marea/financial/data/blocker-register.json` — fourteen records and summary.
- `docs/marea/financial/data/assumptions.json` — `ASM-MC13-001`, `-003`, `-042` to
  `-052`, `-142` to `-152`.
- `docs/marea/financial/data/break-even-thresholds.json` — NAV/WEATHER and portfolio
  `NOT_DETERMINABLE` records.
- `docs/marea/financial/data/working-capital.json`, `recurring-revenue.json`,
  `mc13-handoff-consumption.json`, `manifest.json`.
- `docs/marea/economics/data/blocker-register.json` — inherited `BLK-LIC`, `BLK-COST`,
  `BLK-COMM`, `BLK-SAFE`, `BLK-REG`, `BLK-DATA`, `BLK-INS`, `BLK-PRICE`, `BLK-AIS`.
- `docs/marea/economics/data/legal-tax-inputs.json` — VAT/OSS, consumer guarantee, CRA,
  GDPR, insurance and the three hard boundaries `HB-01`, `HB-02`, `HB-03`.
- `docs/marea/economics/MC12-MC13-HANDOFF.md` — inherited gaps and uncertainty ranges.
- D08 `MC13-OPEX-AND-SECURITY-LIFECYCLE-COSTS.md`; D16 `MC13-MC14-HANDOFF.md`.

This deliverable invents no amount, premium, rate or approval, and it does not start
MC-14.
