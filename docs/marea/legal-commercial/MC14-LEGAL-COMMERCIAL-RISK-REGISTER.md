# MC-14 — Legal and commercial risk register

| Field | Value |
|---|---|
| Deliverable | D05 `MC14-LEGAL-COMMERCIAL-RISK-REGISTER.md` |
| Milestone | MC-14/36 |
| Date | 2026-11-02 |
| Owner | Programme Lead |
| Machine data | `data/risk-register.json`; `data/predecessor-blocker-mapping.json` |
| Risks | 95 canonical risks |
| Inherited mapping | 134 records (58 MC-02, 39 MC-11, 23 MC-12, 14 MC-13) |
| Status | INTERNAL_RISK_REGISTER — no risk is closed by MC-14 |


## 1. Purpose and rules

The register is the authoritative list of legal/commercial risks. Every risk has
a source, an accountable role, required evidence, a release gate and a decision
dependency. No numerical probability is used: likelihood is qualitative or
`NOT_ASSESSED`. An identified obligation is not compliance; no inherited
blocker is closed without new evidence; MC-14 closes 0 blockers and deletes 0
records.

Domain counts: REGULATORY=11, PRODUCT_CONFORMITY=10, INTELLECTUAL_PROPERTY=15, MARINE_DATA=6, CONSUMER_CONTRACTS=10, PRIVACY=7, CYBERSECURITY=7, PAYMENTS_TAX=5, PRODUCT_LIABILITY=13, COMMERCIAL_CLAIMS=7, WEBSITE_COMMERCE=4.

Severity counts: CRITICAL=29, HIGH=62, MEDIUM=4, LOW=0.

## 2. Register

| Risk | Title | Severity | Status | Owner | Gate | Evidence items |
|---|---|---|---|---|---|---|
| LEG-01 | No per-SKU conformity assessment, declaration of conformity or technical file | CRITICAL | BLOCKED | PRODUCT_COMPLIANCE_ENGINEER | GATE-MARKET-PLACEMENT | 6 |
| LEG-02 | Traceability and market-surveillance duties of importer/distributor are undefined | HIGH | OPEN | PROGRAMME_LEAD | GATE-MARKET-PLACEMENT | 4 |
| LEG-03 | Spanish transposition and instruction-language obligations are unverified | HIGH | LEGAL_REVIEW_REQUIRED | LEGAL_COUNSEL | GATE-MARKET-PLACEMENT | 3 |
| LEG-04 | GPSR online-offer and traceability information duties are not implemented | HIGH | EVIDENCE_REQUIRED | PRODUCT_COMPLIANCE_ENGINEER | GATE-MARKET-PLACEMENT | 4 |
| LEG-05 | Product liability exposure under Directive (EU) 2024/2853 is not assessed | CRITICAL | LEGAL_REVIEW_REQUIRED | LEGAL_COUNSEL | GATE-INSURANCE | 4 |
| LEG-06 | CE marking is claimed or implied without a conformity route | CRITICAL | BLOCKED | PRODUCT_COMPLIANCE_ENGINEER | GATE-MARKET-PLACEMENT | 3 |
| LEG-07 | Radio Equipment Directive applicability and radio conformity are not established | HIGH | LEGAL_REVIEW_REQUIRED | PRODUCT_COMPLIANCE_ENGINEER | GATE-MARKET-PLACEMENT | 4 |
| LEG-08 | AIS receive-only scope and spectrum authorisation boundary | CRITICAL | BLOCKED | PRODUCT_COMPLIANCE_ENGINEER | GATE-MARKET-PLACEMENT | 4 |
| LEG-09 | Website and distance-selling information duties are incomplete | CRITICAL | EVIDENCE_REQUIRED | COMMERCIAL_DIRECTOR | GATE-LEGAL-ENTITY | 4 |
| LEG-10 | Environmental producer responsibility (WEEE, RoHS, Batteries, Packaging) is not registered or evidenced | HIGH | EVIDENCE_REQUIRED | PRODUCT_COMPLIANCE_ENGINEER | GATE-MARKET-PLACEMENT | 4 |
| PRD-01 | PILOT safety gate remains blocked with no safety case, bench evidence or sea trials | CRITICAL | BLOCKED | HARDWARE_LEAD | GATE-SAFETY-PILOT | 5 |
| PRD-02 | PILOT/HUB control plane is unauthenticated and unhardened | CRITICAL | BLOCKED | SECURITY_LEAD | GATE-CRA-CYBERSECURITY | 5 |
| PRD-03 | AIS receiver RF/EMC conformity, antenna integration and performance evidence absent | HIGH | BLOCKED | HARDWARE_LEAD | GATE-MARKET-PLACEMENT | 4 |
| PRD-04 | NMEA 2000 is not implemented and no NMEA certification or licence is held | HIGH | BLOCKED | ENGINEERING_LEAD | GATE-IP-CLEARANCE | 4 |
| PRD-05 | NMEA 0183 interoperability is untested | HIGH | EVIDENCE_REQUIRED | ENGINEERING_LEAD | GATE-COMMERCIAL-CLAIMS | 3 |
| PRD-06 | No physical prototype, EMC pre-scan, environmental or electrical evidence | CRITICAL | BLOCKED | HARDWARE_LEAD | GATE-MARKET-PLACEMENT | 6 |
| PRD-07 | WATCH alert delivery, offshore coverage and monitoring availability are not demonstrated | CRITICAL | BLOCKED | ENGINEERING_LEAD | GATE-CRA-CYBERSECURITY | 5 |
| PRD-08 | SENSE measurement accuracy and calibration are not measured | HIGH | EVIDENCE_REQUIRED | HARDWARE_LEAD | GATE-COMMERCIAL-CLAIMS | 5 |
| PRD-09 | DISPLAY hardware, enclosure, sunlight readability and embedded runtime are not selected | HIGH | BLOCKED | HARDWARE_LEAD | GATE-MARKET-PLACEMENT | 5 |
| PRD-10 | FLEET SaaS, tenant isolation, billing and SLA are not demonstrated | HIGH | BLOCKED | SECURITY_LEAD | GATE-PRIVACY-DPA-DPIA | 5 |
| IPR-01 | OPEN-MARINE ownership chain is undocumented and licence is absent | CRITICAL | BLOCKED | LEGAL_COUNSEL | GATE-IP-CLEARANCE | 4 |
| IPR-02 | Contributor IP assignments and employer rights are missing | CRITICAL | BLOCKED | LEGAL_COUNSEL | GATE-IP-CLEARANCE | 4 |
| IPR-03 | Entity ownership between individual, TECNORIA and EMBARCARTE is undocumented | CRITICAL | BLOCKED | LEGAL_COUNSEL | GATE-IP-CLEARANCE | 3 |
| IPR-04 | Pre-history provenance of the root commit is undocumented | HIGH | OPEN | LEGAL_COUNSEL | GATE-IP-CLEARANCE | 3 |
| IPR-05 | AI-assisted code and asset provenance is unrecorded | HIGH | OPEN | LEGAL_COUNSEL | GATE-IP-CLEARANCE | 3 |
| IPR-06 | Third-party notices bundle is absent for software distribution | HIGH | EVIDENCE_REQUIRED | ENGINEERING_LEAD | GATE-IP-CLEARANCE | 3 |
| IPR-07 | Provider tiles and configuration remain in public Git history | MEDIUM | LEGAL_REVIEW_REQUIRED | LEGAL_COUNSEL | GATE-IP-CLEARANCE | 3 |
| IPR-08 | Contributor governance (CLA/DCO, CONTRIBUTING) is absent | MEDIUM | OPEN | LEGAL_COUNSEL | GATE-IP-CLEARANCE | 3 |
| IPR-09 | OPEN-MARINE/OMI naming rights are undecided | MEDIUM | OPEN | BRAND_OWNER | GATE-IP-CLEARANCE | 3 |
| IPR-10 | GPL-3.0 AIS-catcher distribution and combined-work analysis | HIGH | LEGAL_REVIEW_REQUIRED | LEGAL_COUNSEL | GATE-IP-CLEARANCE | 4 |
| IPR-11 | Firmware/dependency pinning, digest integrity and SBOM are absent | HIGH | EVIDENCE_REQUIRED | SECURITY_LEAD | GATE-CRA-CYBERSECURITY | 4 |
| IPR-12 | Unknown-licence dependency and first-party licence inconsistency | MEDIUM | EVIDENCE_REQUIRED | ENGINEERING_LEAD | GATE-IP-CLEARANCE | 3 |
| IPR-13 | MAREA trademark legal clearance is not granted | CRITICAL | BLOCKED | LEGAL_COUNSEL | GATE-IP-CLEARANCE | 4 |
| IPR-14 | Inherited MC-03 class-A claim conflicts with MAREA public-use NO-GO | HIGH | LEGAL_REVIEW_REQUIRED | LEGAL_COUNSEL | GATE-COMMERCIAL-CLAIMS | 3 |
| DATA-01 | Official chart/ENC distribution rights are not granted | CRITICAL | BLOCKED | DATA_RIGHTS_OWNER | GATE-DATA-LICENSING | 3 |
| DATA-02 | Weather data commercial rights are not granted | CRITICAL | BLOCKED | DATA_RIGHTS_OWNER | GATE-DATA-LICENSING | 4 |
| DATA-03 | Basemap and tile rights (OSM, Esri, OpenWeather) are unresolved | HIGH | BLOCKED | DATA_RIGHTS_OWNER | GATE-DATA-LICENSING | 3 |
| DATA-04 | Bathymetry and contextual layers are restricted to informational use | HIGH | OPEN | DATA_RIGHTS_OWNER | GATE-DATA-LICENSING | 3 |
| DATA-05 | Marine-data attribution, provenance and freshness display obligations are not implemented | HIGH | EVIDENCE_REQUIRED | ENGINEERING_LEAD | GATE-COMMERCIAL-CLAIMS | 4 |
| DATA-06 | AIS-derived data retention and redistribution policy is undecided | HIGH | LEGAL_REVIEW_REQUIRED | LEGAL_COUNSEL | GATE-PRIVACY-DPA-DPIA | 3 |
| CONS-01 | B2C precontractual information and terms are incomplete | HIGH | EVIDENCE_REQUIRED | COMMERCIAL_DIRECTOR | GATE-CONSUMER-TERMS | 4 |
| CONS-02 | Commercial warranty could be presented as replacing mandatory legal guarantee | HIGH | EVIDENCE_REQUIRED | LEGAL_COUNSEL | GATE-CONSUMER-TERMS | 3 |
| CONS-03 | Withdrawal-right information and digital-content exceptions are undocumented | HIGH | EVIDENCE_REQUIRED | LEGAL_COUNSEL | GATE-CONSUMER-TERMS | 3 |
| CONS-04 | Digital content/service conformity, updates and portability duties are not mapped | HIGH | EVIDENCE_REQUIRED | LEGAL_COUNSEL | GATE-CONSUMER-TERMS | 4 |
| CONS-05 | B2B sales terms are absent | HIGH | EVIDENCE_REQUIRED | LEGAL_COUNSEL | GATE-CONSUMER-TERMS | 3 |
| CONS-06 | Installer and distributor agreements are absent | HIGH | EVIDENCE_REQUIRED | COMMERCIAL_DIRECTOR | GATE-CONSUMER-TERMS | 4 |
| CONS-07 | Subscription renewal, cancellation and refund mechanics are absent | HIGH | EVIDENCE_REQUIRED | COMMERCIAL_DIRECTOR | GATE-CONSUMER-TERMS | 4 |
| CONS-08 | Returns, RMA and repair workflow are absent | HIGH | EVIDENCE_REQUIRED | COMMERCIAL_DIRECTOR | GATE-CONSUMER-TERMS | 4 |
| CONS-09 | Mixed hardware-plus-service bundle characterisation is undecided | HIGH | EVIDENCE_REQUIRED | LEGAL_COUNSEL | GATE-CONSUMER-TERMS | 3 |
| PRIV-01 | Controller/processor roles for telemetry and FLEET are undecided | HIGH | LEGAL_REVIEW_REQUIRED | DPO | GATE-PRIVACY-DPA-DPIA | 3 |
| PRIV-02 | DPIA for vessel location tracking and monitoring is not performed | CRITICAL | BLOCKED | DPO | GATE-PRIVACY-DPA-DPIA | 3 |
| PRIV-03 | Processor agreements and subprocessor chain are absent | HIGH | BLOCKED | DPO | GATE-PRIVACY-DPA-DPIA | 4 |
| PRIV-04 | Lawful basis and transparency for telemetry and location are unassigned | HIGH | EVIDENCE_REQUIRED | DPO | GATE-PRIVACY-DPA-DPIA | 4 |
| PRIV-05 | Retention, deletion and export schedule for marine data is absent | HIGH | EVIDENCE_REQUIRED | DPO | GATE-PRIVACY-DPA-DPIA | 4 |
| PRIV-06 | Data-subject rights, access segregation and breach management are not implemented | HIGH | EVIDENCE_REQUIRED | DPO | GATE-PRIVACY-DPA-DPIA | 4 |
| PRIV-07 | Cookie/ePrivacy consent and analytics are unassessed on the existing site | HIGH | EVIDENCE_REQUIRED | DPO | GATE-LEGAL-ENTITY | 4 |
| CYB-01 | CRA applicability and product classification are unconfirmed | CRITICAL | LEGAL_REVIEW_REQUIRED | SECURITY_LEAD | GATE-CRA-CYBERSECURITY | 4 |
| CYB-02 | Secure development lifecycle is not established | HIGH | EVIDENCE_REQUIRED | SECURITY_LEAD | GATE-CRA-CYBERSECURITY | 4 |
| CYB-03 | Vulnerability intake, disclosure and remediation process is absent | HIGH | EVIDENCE_REQUIRED | SECURITY_LEAD | GATE-CRA-CYBERSECURITY | 4 |
| CYB-04 | Security update and support period are undecided | HIGH | EVIDENCE_REQUIRED | SECURITY_LEAD | GATE-CRA-CYBERSECURITY | 4 |
| CYB-05 | SBOM, dependency maintenance and firmware controls are absent | HIGH | EVIDENCE_REQUIRED | SECURITY_LEAD | GATE-CRA-CYBERSECURITY | 4 |
| CYB-06 | CRA incident-reporting process is absent although reporting duties already apply | CRITICAL | BLOCKED | SECURITY_LEAD | GATE-CRA-CYBERSECURITY | 4 |
| CYB-07 | Device identity, provisioning, authentication and access control are absent | HIGH | EVIDENCE_REQUIRED | SECURITY_LEAD | GATE-CRA-CYBERSECURITY | 4 |
| PAY-01 | No merchant/payment-provider agreement or approved checkout exists | CRITICAL | BLOCKED | FINANCE_LEAD | GATE-PAYMENTS | 4 |
| PAY-02 | PSD2/SCA applicability and payment-provider roles are unassessed | HIGH | LEGAL_REVIEW_REQUIRED | LEGAL_COUNSEL | GATE-PAYMENTS | 3 |
| PAY-03 | Refund, chargeback and fraud exposure is undefined | HIGH | EVIDENCE_REQUIRED | FINANCE_LEAD | GATE-PAYMENTS | 4 |
| PAY-04 | Subscription billing disclosures and renewal notices are not implemented | HIGH | EVIDENCE_REQUIRED | COMMERCIAL_DIRECTOR | GATE-PAYMENTS | 4 |
| PAY-05 | VAT, OSS, import VAT and customs treatment are unconfirmed | HIGH | LEGAL_REVIEW_REQUIRED | FINANCE_LEAD | GATE-PRICING | 5 |
| LIA-01 | Electrical fault, overheating or fire liability | CRITICAL | EVIDENCE_REQUIRED | PRODUCT_COMPLIANCE_ENGINEER | GATE-INSURANCE | 4 |
| LIA-02 | Installation defect liability | HIGH | EVIDENCE_REQUIRED | COMMERCIAL_DIRECTOR | GATE-INSURANCE | 4 |
| LIA-03 | Product malfunction liability | HIGH | EVIDENCE_REQUIRED | HARDWARE_LEAD | GATE-INSURANCE | 4 |
| LIA-04 | Incorrect sensor measurement liability | HIGH | EVIDENCE_REQUIRED | HARDWARE_LEAD | GATE-INSURANCE | 4 |
| LIA-05 | AIS reception limitation liability | HIGH | EVIDENCE_REQUIRED | PRODUCT_COMPLIANCE_ENGINEER | GATE-INSURANCE | 4 |
| LIA-06 | Chart and navigation data error liability | CRITICAL | BLOCKED | DATA_RIGHTS_OWNER | GATE-DATA-LICENSING | 4 |
| LIA-07 | Weather data error liability | HIGH | EVIDENCE_REQUIRED | DATA_RIGHTS_OWNER | GATE-DATA-LICENSING | 4 |
| LIA-08 | Remote monitoring and missed/delayed alert liability | CRITICAL | BLOCKED | ENGINEERING_LEAD | GATE-INSURANCE | 4 |
| LIA-09 | Cybersecurity failure liability | CRITICAL | BLOCKED | SECURITY_LEAD | GATE-CRA-CYBERSECURITY | 4 |
| LIA-10 | Unsafe steering behaviour liability (PILOT) | CRITICAL | BLOCKED | HARDWARE_LEAD | GATE-SAFETY-PILOT | 5 |
| LIA-11 | Software-update regression liability | HIGH | EVIDENCE_REQUIRED | ENGINEERING_LEAD | GATE-CRA-CYBERSECURITY | 4 |
| LIA-12 | Defective connected-product liability | HIGH | EVIDENCE_REQUIRED | PRODUCT_COMPLIANCE_ENGINEER | GATE-INSURANCE | 4 |
| LIA-13 | Product liability insurance does not exist and premium is unknown | CRITICAL | BLOCKED | FINANCE_LEAD | GATE-INSURANCE | 4 |
| CLM-01 | Public brand-use conflict between MC-03 class-A allowance and MAREA NO-GO | HIGH | LEGAL_REVIEW_REQUIRED | LEGAL_COUNSEL | GATE-COMMERCIAL-CLAIMS | 4 |
| CLM-02 | Availability, stock, delivery and price claims are unsupported | CRITICAL | BLOCKED | COMMERCIAL_DIRECTOR | GATE-COMMERCIAL-CLAIMS | 4 |
| CLM-03 | Certification and approval claims (CE, RED, EMC, NMEA, marine) are unsupported | CRITICAL | BLOCKED | PRODUCT_COMPLIANCE_ENGINEER | GATE-COMMERCIAL-CLAIMS | 3 |
| CLM-04 | Performance, safety and interoperability claims are unsupported | CRITICAL | BLOCKED | COMMERCIAL_DIRECTOR | GATE-COMMERCIAL-CLAIMS | 4 |
| CLM-05 | Financial, profitability and investment claims are unsupported | HIGH | BLOCKED | FINANCE_LEAD | GATE-COMMERCIAL-CLAIMS | 3 |
| CLM-06 | Customer counts, testimonials and market-share claims would be fabricated | HIGH | BLOCKED | COMMERCIAL_DIRECTOR | GATE-COMMERCIAL-CLAIMS | 3 |
| CLM-07 | Bilingual claim drift and channel leakage | HIGH | EVIDENCE_REQUIRED | COMMERCIAL_DIRECTOR | GATE-COMMERCIAL-CLAIMS | 3 |
| OPS-01 | Company legal identity is missing from the site and legal pages | CRITICAL | BLOCKED | COMMERCIAL_DIRECTOR | GATE-LEGAL-ENTITY | 3 |
| OPS-02 | Existing shop/checkout presents sample purchasable commerce | HIGH | EVIDENCE_REQUIRED | COMMERCIAL_DIRECTOR | GATE-LEGAL-ENTITY | 4 |
| OPS-03 | Website brand and product claims are not governed by MC-14 gates | HIGH | EVIDENCE_REQUIRED | COMMERCIAL_DIRECTOR | GATE-WEBSITE-REMEDIATION | 3 |
| OPS-04 | Structured data, SEO metadata and app-store listings could assert availability or price | HIGH | EVIDENCE_REQUIRED | COMMERCIAL_DIRECTOR | GATE-WEBSITE-REMEDIATION | 3 |
| CONS-10 | Unfair contract terms could waive or shorten mandatory consumer rights | HIGH | EVIDENCE_REQUIRED | LEGAL_COUNSEL | GATE-CONSUMER-TERMS | 3 |
| IPR-15 | Website and marketing assert unproven ownership of the underlying technology | HIGH | BLOCKED | LEGAL_COUNSEL | GATE-IP-CLEARANCE | 3 |
| LEG-11 | Recreational Craft and Marine Equipment Directive boundaries are unassessed | HIGH | LEGAL_REVIEW_REQUIRED | LEGAL_COUNSEL | GATE-MARKET-PLACEMENT | 3 |

## 3. MC-02 inherited blockers (L/D/H/X and the rest)

The full 58-record mapping is in `predecessor-blocker-mapping.json`. MC-14
records each inherited status unchanged, maps it to one or more MC-14 risks and
never rewrites the predecessor. Required categories: L=9,
D=10,
H=13,
X=7;
S=9,
P=10.

| Inherited | Severity | Predecessor status | MC-14 risks | Treatment |
|---|---|---|---|---|
| L-01 | CRITICAL | BLOCKED | IPR-01 | CARRIED_FORWARD |
| L-02 | CRITICAL | BLOCKED | IPR-02 | CARRIED_FORWARD |
| L-03 | CRITICAL | BLOCKED | IPR-03 | CARRIED_FORWARD |
| L-04 | HIGH | OPEN | IPR-04 | CARRIED_FORWARD |
| L-05 | HIGH | OPEN | IPR-05 | CARRIED_FORWARD |
| L-06 | HIGH | OPEN | IPR-06 | CARRIED_FORWARD |
| L-07 | MEDIUM | LEGAL_REVIEW_REQUIRED | IPR-07 | CARRIED_FORWARD |
| L-08 | MEDIUM | OPEN | IPR-08 | CARRIED_FORWARD |
| L-09 | MEDIUM | OPEN | IPR-09 | CARRIED_FORWARD |
| S-01 | HIGH | LEGAL_REVIEW_REQUIRED | IPR-10, PRD-03 | CARRIED_FORWARD |
| S-02 | MEDIUM | OPEN | IPR-11 | CARRIED_FORWARD |
| S-03 | MEDIUM | OPEN | IPR-11 | CARRIED_FORWARD |
| S-04 | MEDIUM | OPEN | IPR-12 | CARRIED_FORWARD |
| S-05 | HIGH | OPEN | IPR-06, IPR-11 | CARRIED_FORWARD |
| S-06 | MEDIUM | OPEN | IPR-11 | CARRIED_FORWARD |
| S-07 | MEDIUM | OPEN | IPR-11 | CARRIED_FORWARD |
| S-08 | HIGH | OPEN | IPR-12 | CARRIED_FORWARD |
| S-09 | MEDIUM | OPEN | IPR-11 | CARRIED_FORWARD |
| D-01 | CRITICAL | BLOCKED | DATA-01, LIA-06 | CARRIED_FORWARD |
| D-02 | HIGH | OPEN | DATA-04, DATA-01 | CARRIED_FORWARD |
| D-03 | HIGH | OPEN | DATA-03 | CARRIED_FORWARD |
| D-04 | CRITICAL | BLOCKED | DATA-02, LIA-07 | CARRIED_FORWARD |
| D-05 | HIGH | BLOCKED | DATA-03 | CARRIED_FORWARD |
| D-06 | HIGH | LEGAL_REVIEW_REQUIRED | DATA-03 | CARRIED_FORWARD |
| D-07 | HIGH | BLOCKED | DATA-02 | CARRIED_FORWARD |
| D-08 | HIGH | OPEN | DATA-04 | CARRIED_FORWARD |
| D-09 | HIGH | LEGAL_REVIEW_REQUIRED | DATA-06, LEG-08, LIA-05 | CARRIED_FORWARD |
| D-10 | HIGH | BLOCKED | DATA-01, DATA-02, DATA-03, DATA-04, DATA-05 | CARRIED_FORWARD |
| H-01 | CRITICAL | BLOCKED | PRD-01, LIA-10 | CARRIED_FORWARD |
| H-02 | CRITICAL | OPEN | PRD-02, LIA-09 | CARRIED_FORWARD |
| H-03 | HIGH | OPEN | PRD-01 | CARRIED_FORWARD |
| H-04 | HIGH | BLOCKED | PRD-04, PRD-05 | CARRIED_FORWARD |
| H-05 | CRITICAL | BLOCKED | PRD-06, LEG-01 | CARRIED_FORWARD |
| H-06 | HIGH | NOT_YET_ASSESSABLE | LEG-01, LEG-06, CYB-01 | CARRIED_FORWARD |
| H-07 | HIGH | BLOCKED | LEG-02, PRD-06 | CARRIED_FORWARD |
| H-08 | HIGH | BLOCKED | PRD-03, LEG-08 | CARRIED_FORWARD |
| H-09 | HIGH | OPEN | PRD-01, CYB-02 | CARRIED_FORWARD |
| H-10 | CRITICAL | BLOCKED | PRD-01, LIA-03 | CARRIED_FORWARD |
| H-11 | HIGH | BLOCKED | PRD-06, PRD-09, PRD-07 | CARRIED_FORWARD |
| H-12 | MEDIUM | BLOCKED | PRD-07, LIA-08 | CARRIED_FORWARD |
| H-13 | HIGH | BLOCKED | CYB-01, CYB-06, LIA-09 | CARRIED_FORWARD |
| P-01 | HIGH | REUSE-CONDITIONAL | DATA-01 | CARRIED_FORWARD |
| P-02 | HIGH | BLOCKED | PRD-04 | CARRIED_FORWARD |
| P-03 | HIGH | BLOCKED | PRD-03, IPR-10 | CARRIED_FORWARD |
| P-04 | CRITICAL | BLOCKED | PRD-01, LIA-10 | CARRIED_FORWARD |
| P-05 | HIGH | BLOCKED | PRD-08, LIA-04 | CARRIED_FORWARD |
| P-06 | HIGH | BUILD | PRD-07, LIA-08 | CARRIED_FORWARD |
| P-07 | HIGH | BLOCKED | PRD-09 | CARRIED_FORWARD |
| P-08 | HIGH | BLOCKED | DATA-02 | CARRIED_FORWARD |
| P-09 | HIGH | BUILD | PRD-10, PRIV-01 | CARRIED_FORWARD |
| P-10 | HIGH | OPEN | PRD-06 | CARRIED_FORWARD |
| X-01 | HIGH | BLOCKED | IPR-13, IPR-14, CLM-01 | CARRIED_FORWARD |
| X-02 | HIGH | BLOCKED | OPS-01, LEG-09 | CARRIED_FORWARD |
| X-03 | HIGH | BLOCKED | IPR-05 | CARRIED_FORWARD |
| X-04 | HIGH | OPEN | OPS-02, LEG-09 | CARRIED_FORWARD |
| X-05 | HIGH | BLOCKED | PAY-01, CLM-02 | CARRIED_FORWARD |
| X-06 | MEDIUM | BLOCKED | CLM-06 | CARRIED_FORWARD |
| X-07 | HIGH | OPEN | PRIV-01, PRIV-02, CYB-07 | CARRIED_FORWARD |

## 4. MC-13 handoff dependencies

All ten `MC14-DEP-01`…`MC14-DEP-10` dependencies are consumed and cross-mapped
in `predecessor-blocker-mapping.json` (mc13HandoffConsumption). The
compliance-cost envelope remains an illustrative envelope; insurance premium
remains `UNKNOWN`; PILOT liability remains `NOT_QUANTIFIABLE`; the 3% returns
allowance remains an illustrative percentage; the CRA cost remains `UNKNOWN`;
privacy/DPA cost remains `UNKNOWN`; the payment tariff remains a published
tariff, not a contract; unresolved licensing remains `NOT_GRANTED`; and the
blocked launch continues to produce zero authorised revenue.

## 5. Reading a risk entry

Each machine record contains: description, jurisdiction, legal sources, product
families/SKUs/bundles, economic-operator roles, severity, likelihood status,
current status, compliance status, commercial impact, financial dependency,
predecessor blockers, owner, required evidence, release gate, customer-claim
impact, potential remediation, counsel requirement, authorization requirement,
verification date, review date and decision ID. Blocking risks name the exact
document, test, permission or decision required to close them.

## 6. Honest limitations

The register is an internal accountability tool. It does not quantify legal
exposure, does not replace counsel and does not certify any product. Several
items depend on facts not yet decided (economic-operator model, CRA
classification, insurance, price approval) and are recorded as such.
