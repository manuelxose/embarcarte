# MC-12 — Legal, tax and compliance risk and cost-driver research

Status: `INTERNAL_RESEARCH_INPUT` · not legal advice · date 2026-11-02 · owner: legal-tax-risk-analyst · jurisdiction ES/EU.
Companion data: `docs/marea/economics/data/legal-tax-inputs.json` (24 items, contract `MAREA-MC12-LEGAL-TAX-INPUTS` v1.0.0).
**No legal clearance, no insurance policy or quotation, no provider contract and no payment-provider schedule exists.** This
note registers rules that change the MC-12 model; it approves no price, margin, certification route or legal position, and
sets `costEur = null` wherever a cost is not publicly published.

## 1. Method
Scope: VAT, consumer law, Cyber Resilience Act, GDPR/ePrivacy, payments, product liability, radio/AIS, trademark. Official
sources only where they exist — EUR-Lex, BOE, Agencia Tributaria, Centro Europeo del Consumidor España, ITU, European
Commission — each URL fetched on 2026-11-02. Verified facts are stated with the instrument named; consequences are marked as
impact; no price is inferred. A failed URL is recorded as `INACCESSIBLE` in the JSON, not silently replaced. Each item
carries one effect: `NET_REVENUE_DERIVATION`, `COST_DRIVER`, `REVENUE_DEDUCTION`, `DISCLOSURE` or `BLOCKER`.

## 2. VAT (the net-revenue rule)
Spain's general VAT rate is **21%**; reduced rates (10%, 4%) apply only to specific listed supplies and do not generally
cover software subscriptions, telemetry or digital services. Consumer prices are legally VAT-inclusive, so:

```
net = gross / 1.21         99.00 EUR gross -> 81.82 EUR net + 17.18 EUR VAT
```
- **B2C cross-border**: VAT is due where the consumer is located; OSS allows one registration and one return for EU B2C supplies, so a single 21% figure holds only for Spanish consumers.
- **B2B intra-EU**: reverse charge — the supplier invoices net and the customer accounts for VAT; B2B lines are not gross.
- **Input VAT**: recoverable for a taxable activity, so provider tariffs are modelled ex-VAT; recoverable VAT is cash-flow timing, not a cost.
- **Imports**: import VAT arises at importation and is recoverable; customs duty is a cost set by CN classification under the Union Customs Code, which does not exist yet, so the duty rate is `UNKNOWN`.
- **Caveat**: any reduced-rate claim for NAV/WEATHER/FLEET needs counsel confirmation before it enters the model.

## 3. Consumer guarantee, returns and warranties
Goods: **3-year legal guarantee** in Spain since 2022-01-01 with a **24-month presumption** that a lack of conformity existed
at delivery (EU floor 2 years; Spain applies the longer rule). Distance selling: **14-day withdrawal** with full refund
including standard delivery; digital content can be excluded only with express consent and acknowledgement of losing the
right. Goods with digital elements carry an ongoing **update duty** overlapping CRA support obligations. Model impact: a
36-month warranty reserve, no-reason return allowance and refund window are revenue deductions. No failure-rate or
return-rate evidence exists, so MC-11 warranty assumptions (1.5%/3%/6%) stay labelled assumptions.

## 4. Cyber Resilience Act — recurring, not one-off
- **Reporting applies from 2026-09-11**: 24-hour early warning, 72-hour vulnerability/incident notification and a final report after remediation (CSIRT/ENISA via the single reporting platform).
- **Main obligations from 2027-12-11**: cybersecurity risk assessment, technical documentation, vulnerability handling, CE marking and EU declaration of conformity.
- **Support period at least 5 years** (shorter only if expected use is shorter); each security update must stay available for **10 years or the support period, whichever is longer**.
- Conformity: internal control (module A) is available for products not classified important/critical; the CRA classification of HUB/WATCH/AIS/DISPLAY is **not established**, so a third-party route remains possible.
- Model impact: firmware/security engineering, SBOM and documentation upkeep are permanent recurring cost, and reporting starts over a year before the main obligations. No public price exists: cost stays `UNKNOWN`.

## 5. GDPR, ePrivacy and data residency — recurring operations cost
Roles: controller for account/billing/self-determined telemetry; processor for customer-instructed FLEET data. No role
decision and **no Article 28 processor agreement exists** with any hosting, connectivity or notification provider. A **DPIA
is likely** for vessel monitoring, crew identification and behavioural analytics and must precede processing; high residual
risk triggers prior AEPD consultation (the AEPD guidance page failed to load on 2026-11-02 and is recorded as `INACCESSIBLE`;
the DPIA conclusion rests on the GDPR text). Breach notification: without undue delay and where feasible within **72 hours**,
plus documentation of all breaches. Retention limits, records of processing and transfers outside the EEA are recurring
obligations; "EU data residency" is a design choice supporting compliance, not a GDPR guarantee. Cookies need prior consent
for non-essential storage (ePrivacy art. 5(3), Spanish LSSI art. 22.2), so consent-dependent analytics cannot supply
conversion or CAC benchmarks for the model.

## 6. Payments and distance selling
Strong customer authentication is required for remote electronic card payments, with limited risk-based exemptions. A
hosted/tokenised provider keeps card data out of MAREA's scope but requires a written provider schedule, which does not
exist. SCA adds an authentication step that suppresses conversion; refunds and chargebacks follow the section 3 duties. No
fee percentage is invented here.

## 7. Product liability and insurance
Directive (EU) 2024/2853 repeals Directive 85/374/EEC with effect from **2026-12-09** (transposition due the same date),
treats software and updates as products, makes destruction or corruption of data compensable, and sets a 3-year limitation
and 10-year expiry. Liability cannot be capped against consumers. **The product liability premium is not publicly published:
`productLiabilityPremium = null`, status `UNKNOWN`.** The Directive itself asks the Commission to monitor insurance
availability — a public signal that no market rate can be assumed.

## 8. Hard commercial boundaries

| ID | Boundary | Consequence |
|---|---|---|
| HB-01 | **AIS transmission is not an authorised MAREA offering.** AIS is a regulated maritime VHF system (ITU-R M.1371); transmitting equipment needs radio approval (Directive 2014/53/EU) and spectrum title (Ley 11/2022). | No AIS-transmit revenue, hardware, subscription or margin may enter the model; receive-only wording must not imply transmission. |
| HB-02 | **PILOT safety gate is BLOCKED.** No safety case, bench programme or sea-trial evidence; Directive 2024/2853 liability is uncappable. | PILOT contributes zero authorised revenue and zero modelled cost. No economic model may clear the gate. |
| HB-03 | **MAREA trademark clearance is NOT_GRANTED.** EU rights arise only by registration (Regulation (EU) 2017/1001). | No brand premium, licence revenue or trademark valuation is admissible. |

## 9. Item register (source and economic effect)

| ID | Topic | Requirement (short) | Source (fetched 2026-11-02) | Economic effect |
|---|---|---|---|---|
| LT-001 | VAT | Spain general rate 21%; digital services at 21% | sede.agenciatributaria.gob.es (Manual IVA 2025) | NET_REVENUE_DERIVATION |
| LT-002 | VAT | Prices are VAT-inclusive; net = gross/1.21 | eur-lex.europa.eu/eli/dir/1998/6/oj | NET_REVENUE_DERIVATION |
| LT-003 | VAT | B2C place of supply; OSS registration | sede.agenciatributaria.gob.es (OSS) | NET_REVENUE_DERIVATION |
| LT-004 | VAT | B2B intra-EU reverse charge | eur-lex.europa.eu (VAT Dir. 2006/112 consolidated) | NET_REVENUE_DERIVATION |
| LT-005 | VAT | Input VAT recoverable; costs modelled ex-VAT | eur-lex.europa.eu (VAT Dir., Title X) | COST_DRIVER |
| LT-006 | VAT | Import VAT recoverable; duty is a cost | eur-lex.europa.eu (VAT Dir., arts 70-71) | COST_DRIVER |
| LT-007 | Customs | Duty per CN code not classified | eur-lex.europa.eu/eli/reg/2013/952/oj (UCC) | COST_DRIVER (UNKNOWN) |
| LT-008 | Consumer | 3-year guarantee; 24-month presumption | portal-cec.consumo.gob.es (Garantías) | REVENUE_DEDUCTION |
| LT-009 | Consumer | 14-day withdrawal; refunds within 14 days | eur-lex.europa.eu/eli/dir/2011/83/oj | REVENUE_DEDUCTION |
| LT-010 | Consumer | Digital withdrawal only with express consent | eur-lex.europa.eu (Dir. 2011/83, art. 16(m)) | REVENUE_DEDUCTION |
| LT-011 | Consumer | Update duty; 2-year EU floor, Spain 3-year | eur-lex.europa.eu/eli/dir/2019/771/oj | COST_DRIVER |
| LT-012 | CRA | Reporting 2026-09-11; main 2027-12-11; support ≥5 y | eur-lex.europa.eu/eli/reg/2024/2847/oj | COST_DRIVER (recurring) |
| LT-013 | CRA | Module A vs third-party route; classification open | eur-lex.europa.eu/eli/reg/2024/2847/oj | DISCLOSURE |
| LT-014 | GDPR | Controller/processor roles; Article 28 DPAs missing | eur-lex.europa.eu/eli/reg/2016/679/oj | COST_DRIVER |
| LT-015 | GDPR | DPIA likely for vessel monitoring | eur-lex.europa.eu/eli/reg/2016/679/oj | DISCLOSURE |
| LT-016 | GDPR | 72-hour breach notification and incident readiness | eur-lex.europa.eu/eli/reg/2016/679/oj | COST_DRIVER |
| LT-017 | GDPR | Records, retention, transfers; residency is a choice | eur-lex.europa.eu/eli/reg/2016/679/oj | COST_DRIVER |
| LT-018 | ePrivacy | Cookie consent (ePrivacy 5(3); LSSI art. 22.2) | boe.es/buscar/act.php?id=BOE-A-2002-13758 | DISCLOSURE |
| LT-019 | Payments | PSD2 SCA; hosted/tokenised checkout; refunds | eur-lex.europa.eu/eli/reg_del/2018/389/oj | COST_DRIVER (UNKNOWN) |
| LT-020 | Liability | PLD 2024/2853, transposition 2026-12-09 | eur-lex.europa.eu/eli/dir/2024/2853/oj | COST_DRIVER |
| LT-021 | Insurance | Product liability premium not public | eur-lex.europa.eu (Dir. 2024/2853, art. 20) | COST_DRIVER (UNKNOWN) |
| LT-022 | Radio/AIS | AIS transmission not authorised; receive-only scope | itu.int/rec/R-REC-M.1371/en; boe.es (Ley 11/2022) | BLOCKER |
| LT-023 | Safety | PILOT safety gate BLOCKED | Internal safety case + Dir. 2024/2853 | BLOCKER |
| LT-024 | Trademark | MAREA clearance NOT_GRANTED; rights by registration | eur-lex.europa.eu/eli/reg/2017/1001/oj | BLOCKER |

## 10. What MC-12 may and may not use
May use: the 21% rate and `gross/1.21`; the 3-year/24-month/14-day parameters; the CRA dates and support period as recurrence
drivers; the GDPR, payments, liability and insurance obligations as unpriced cost drivers; the three hard boundaries as
exclusions. May not use: a reduced VAT rate without counsel; a duty, insurance, hosting, payment or certification price
without a published source; any AIS-transmission revenue; any PILOT revenue or bundle; any brand-derived value; and any
statement implying legal clearance, certification or regulatory approval. All remain `BLOCKED` or `UNKNOWN` until a real quotation, contract or administrative act exists.
