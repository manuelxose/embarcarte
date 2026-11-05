# MC-09 — Decision and risk register

Status: `INTERNAL_DESK_RESEARCH`. Every business recommendation in this milestone
is traced to the evidence claims that support it. Machine-readable authority:
`data/decision-links.json` (19 decisions) and `data/product-assessments.json` /
`data/bundle-assessments.json` (rankings).

This register records **commercial-investment decisions for validation**. It does
not approve prices, does not clear brand, IP, data or safety blockers, and does
not make anything orderable.

## 1. Decision register

| ID | Decision | Subject | Category | Evidence claims | Confidence |
|---|---|---|---|---|---|
| DEC-MC09-01 | Validate MAREA NAV as the software-first entry point | NAV | PRIORITIZE_FOR_CUSTOMER_VALIDATION | CLM-BUY-001, CLM-BUY-009, CLM-CMP-001, CLM-CMP-022, CLM-CHN-019 | MEDIUM |
| DEC-MC09-02 | Validate unattended-vessel monitoring and its recurring model | WATCH | PRIORITIZE_FOR_CUSTOMER_VALIDATION | CLM-BUY-015, CLM-CMP-004, CLM-CMP-007, CLM-CMP-021, CLM-ECO-007 | MEDIUM |
| DEC-MC09-03 | Test the PROTECT concept before rebuilding its price | PROTECT | PRIORITIZE_FOR_CUSTOMER_VALIDATION | CLM-CMP-021, CLM-CMP-002, CLM-CMP-004, CLM-ECO-007 | MEDIUM |
| DEC-MC09-04 | Test START as a consolidation concept, not an orderable kit | START | PRIORITIZE_FOR_CUSTOMER_VALIDATION | CLM-CMP-027, CLM-CMP-024, CLM-CMP-001, CLM-CHN-019 | LOW |
| DEC-MC09-05 | Research HUB orchestration before committing hardware | HUB | FURTHER_RESEARCH_REQUIRED | CLM-CMP-008, CLM-CMP-011, CLM-CMP-019, CLM-BUY-002 | LOW |
| DEC-MC09-06 | Do not sell WEATHER standalone before provider rights exist | WEATHER | FURTHER_RESEARCH_REQUIRED | CLM-CMP-005, CLM-CMP-006, CLM-CMP-023, CLM-BUY-009 | MEDIUM |
| DEC-MC09-07 | Treat FLEET as the post-beachhead recurring expansion | FLEET | LONG_TERM_OPPORTUNITY | CLM-CMP-012, CLM-CMP-013, CLM-CMP-026, CLM-CHN-018 | LOW |
| DEC-MC09-08 | Replace AIS hardware with AIS integration | AIS | RECONSIDER_PRODUCT_STRATEGY | CLM-CMP-009, CLM-CMP-010, CLM-CMP-031, CLM-BUY-004 | MEDIUM |
| DEC-MC09-09 | Use the customer's device instead of a proprietary display | DISPLAY | RECONSIDER_PRODUCT_STRATEGY | CLM-CMP-015, CLM-CMP-002, CLM-BUY-018 | MEDIUM |
| DEC-MC09-10 | Defer standalone SENSE modules | SENSE | DEFER | CLM-CMP-018, CLM-CMP-020, CLM-CMP-006, CLM-BUY-003 | MEDIUM |
| DEC-MC09-11 | Defer PILOT beyond concept comprehension | PILOT | DEFER | CLM-CMP-016, CLM-CMP-017, CLM-BUY-011, CLM-BUY-007 | MEDIUM |
| DEC-MC09-12 | Hold CRUISE until the integration outcome is demonstrable | CRUISE | FURTHER_RESEARCH_REQUIRED | CLM-CMP-028, CLM-CMP-008, CLM-CMP-015, CLM-CMP-024 | LOW |
| DEC-MC09-13 | Defer SAIL as a complete offer | SAIL | DEFER | CLM-CMP-029, CLM-CMP-016, CLM-CMP-017, CLM-CMP-020 | MEDIUM |
| DEC-MC09-14 | Decouple the integrated outcome from a single-supplier stack | COMPLETE | RECONSIDER_PRODUCT_STRATEGY | CLM-CMP-030, CLM-CMP-025, CLM-CMP-024 | MEDIUM |
| DEC-MC09-15 | Test software-first before funding hardware-first | GENERAL | FURTHER_RESEARCH_REQUIRED | CLM-CMP-001, CLM-CMP-003, CLM-BUY-001, CLM-ECO-001, CLM-CHN-001 | MEDIUM |
| DEC-MC09-16 | Concentrate MC-10 recruitment in Rías Baixas | GEO:RIAS_BAIXAS | FURTHER_RESEARCH_REQUIRED | CLM-MKT-011, CLM-MKT-013, CLM-MKT-014, CLM-MKT-029, CLM-MKT-030 | MEDIUM |
| DEC-MC09-17 | Do not approve any bundle or family price | GENERAL | INSUFFICIENT_EVIDENCE | CLM-CMP-032, CLM-CMP-024, CLM-CMP-025, CLM-ECO-002, CLM-ECO-010 | MEDIUM |
| DEC-MC09-18 | Keep profitability NOT ESTABLISHED across the portfolio | GENERAL | INSUFFICIENT_EVIDENCE | CLM-ECO-001, CLM-ECO-003, CLM-ECO-010, CLM-ECO-011, CLM-CHN-005, CLM-CHN-036 | MEDIUM |
| DEC-MC09-19 | Treat installer/distributor economics as an open question | GENERAL | FURTHER_RESEARCH_REQUIRED | CLM-CHN-001, CLM-CHN-002, CLM-CHN-011, CLM-CHN-036, CLM-CHN-017 | MEDIUM |

## 2. Risk register

| ID | Risk | Likelihood | Impact | Evidence | Mitigation | Owner |
|---|---|---|---|---|---|---|
| R-01 | Owners reject recurring fees and prefer one-off devices | HIGH | HIGH | WTP `NOT_MEASURED`; only competitor subscription existence is observed (CLM-CMP-001, CLM-CMP-021) | MC-10 subscription-acceptance and WTP instruments (EXP-MC10-03/04/05) | Commercial |
| R-02 | Chart/weather/data rights cannot be obtained at a viable cost | HIGH | HIGH | Provider rights `NOT_GRANTED`; MAREA cannot use free non-commercial tiers | Resolve MC-02 D-blockers before pricing any data product | Legal/Commercial |
| R-03 | Hardware BOM and conformity exceed the observed price anchors | HIGH | HIGH | Gateways EUR 240-300; receivers EUR 360; displays EUR 659-3,083; no BOM | MC-11 supplier quotations; no hardware commitment before quotes | Engineering/Finance |
| R-04 | Installer channel refuses or demands unviable margins | MEDIUM | HIGH | No public ES/PT dealer margin (CLM-CHN-036); only process is observable | MC-10 installer interviews; written trade terms required | Commercial |
| R-05 | Integrated value does not exceed the sum of established parts | HIGH | HIGH | All bundle benchmark compositions already purchasable (CLM-CMP-025) | Test concept value and switching friction in MC-10 | Product |
| R-06 | PILOT safety failure creates liability | LOW before launch | CRITICAL | Safety gate BLOCKED; accident-report failure mode (CLM-BUY-011) | Do not progress PILOT; maintain prohibition on unattended/remote claims | Engineering/Safety |
| R-07 | Monitoring alerting fails when it matters | MEDIUM | HIGH | Ingestion pipeline `NOT_VERIFIED`; no guaranteed delivery | Do not promise guaranteed alerts; verify pipeline in a later hardware milestone | Engineering |
| R-08 | Brand/IP clearance blocks publication | MEDIUM | CRITICAL | Trademark `NOT_GRANTED`; source IP `NOT_CLEARED` | Keep internal-only; resolve before any public page or sale | Legal |
| R-09 | Beachhead market too small to sustain the business | HIGH | MEDIUM | Rías Baixas EUR 0.12-0.62M/year addressable; SOM 24-144 installs | Treat as validation market; FLEET/wider geography for scaling | Strategy |
| R-10 | Competitor price repricing invalidates positioning | MEDIUM | MEDIUM | Subscription and hardware prices are volatile (CLM-CMP-032) | Re-verify prices before any commercial decision; record dates | Research |
| R-11 | Public customer-signal evidence is not representative | HIGH | MEDIUM | No independent survey found; signals are anecdotes/repeated observations | Do not generalise; MC-10 must recruit independent participants | Research |
| R-12 | Data-quality error in a claim propagates to a decision | MEDIUM | HIGH | Mixed evidence quality; some sources only partially accessible | Validator gate, independent audit, source register with dates | Lead/Auditor |
| R-13 | Over-investment in hardware before demand validation | MEDIUM | HIGH | Hardware families rank low on readiness; capital intensity high | Software-first sequencing (DEC-MC09-15) | Finance/Strategy |
| R-14 | Scope creep into publishing/selling while restricted | LOW | CRITICAL | Commercial publication and sales remain BLOCKED | Governance invariant + validator checks; no public page/checkout changes | Lead |

## 3. Status distinctions (unchanged by this milestone)

| Status | Value |
|---|---|
| CUSTOMER_DEMAND_EMPIRICALLY_VALIDATED | NO |
| WILLINGNESS_TO_PAY_EMPIRICALLY_VALIDATED | NO |
| PRODUCT_PROFITABILITY_ESTABLISHED | NO |
| TRADEMARK_LEGAL_CLEARANCE | NOT_GRANTED |
| SOURCE_IP_CLEARANCE | NOT_CLEARED |
| COMMERCIAL_PUBLICATION | BLOCKED |
| PRODUCT_SALES | BLOCKED |
| PRODUCTION_DEPLOYMENT | NOT_AUTHORIZED |
| CUSTOMER_OUTREACH | NOT_AUTHORIZED (MC-09) |
| PAID_RESEARCH | NOT_AUTHORIZED |
| COMPATIBILITY_ROWS_TESTED | 0 |
| PRODUCTS_FOR_SALE | 0 |

## 4. Evidence gaps that constrain the decisions

1. No Spanish registered-fleet stock table was verifiable; berth capacity is used
   as a proxy and the spend-per-vessel band is `ASSUMED`.
2. No independent buyer survey was accessible, so problem prevalence is
   unmeasured; public signals are anecdotes or repeated observations.
3. No supplier BOM or quotation exists, so no cost or margin can be computed.
4. No ES/PT dealer or distributor margin is public; channel economics are
   unknown.
5. No Spanish installation labour rate specific to marine electronics was
   published that could be verified; only yard tariffs and a foreign rate card.
6. Competitor prices are heterogeneous in currency, VAT and inclusion, and no
   installed complete-solution price exists in the market.
7. Chart, weather and data redistribution rights remain unresolved.

These gaps are why several decisions are `FURTHER_RESEARCH_REQUIRED`,
`INSUFFICIENT_EVIDENCE` or `DEFER` rather than approvals.
