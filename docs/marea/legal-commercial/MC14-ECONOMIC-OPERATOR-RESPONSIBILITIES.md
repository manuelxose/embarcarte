# MC-14 — Economic-operator responsibilities

| Field | Value |
|---|---|
| Deliverable | D04 `MC14-ECONOMIC-OPERATOR-RESPONSIBILITIES.md` |
| Milestone | MC-14/36 |
| Date | 2026-11-02 |
| Owner | Programme Lead |
| Machine data | `data/economic-operator-roles.json` |
| Scope | 11 potential roles × 9 supply scenarios |
| Status | POTENTIAL RESPONSIBILITIES ONLY — no role is legally held yet |

## 1. Why this matters

Under EU product law the same company can be manufacturer, importer,
distributor, seller, installer, SaaS provider and data controller at the same
time — or none of them. Obligations, evidence and liability change with the
role. Assuming a role because a company sells a product, or assuming that a
supplier's certificate covers the new integrated product, is one of the most
common and most expensive errors in hardware commercialisation.

MC-14 therefore separates **who does what** from **what the product is**. The
economic-operator decision is a named external decision (`DEC-MC14-002`), not an
inference.

## 2. Role map

| Role | Core potential obligations | Key evidence | Accountable role |
|---|---|---|---|
| Brand owner | Trademark clearance, accurate brand attribution, licence/assignment, withdrawal of misleading statements | Clearance search, counsel opinion, brand licence | Brand owner |
| Manufacturer | Conformity assessment and DoC, technical file, instructions, GPSR safety, CRA lifecycle, PLD liability | DoC, test reports, technical file, risk assessment, serial traceability, SBOM | Product compliance engineer |
| OEM assembler | System-level assessment of the integrated product; module certificates do not transfer | Module certificate scope + system-level tests + final-product DoC | Hardware lead |
| Importer | Verify manufacturer conformity, importer identity, language, storage/transport, market-surveillance cooperation | Supplier DoC, importer name/address, import records | Programme lead |
| Distributor | Verify CE/traceability, do not alter, cooperate, stop supply on non-conformity | Supplier evidence, distribution agreement, due-diligence checklist | Commercial director |
| Seller | Precontractual information, total price, withdrawal, guarantee, refunds, invoice, LSSI identity | Consumer terms, legal notice, price/tax rules, withdrawal form | Commercial director |
| Installer | Install per instructions, commission and record, warn about limits, carry competence/insurance | Installer agreement, commissioning record, competence evidence, PI insurance | Commercial director |
| SaaS provider | Digital-content conformity, CRA security, GDPR, accurate availability/SLA, incident handling | Subscription terms, CRA documentation, DPA, measured availability | Security lead |
| Data controller | Lawful basis, transparency, rights, ROPA, DPIA, security, breach notification, processor oversight | Purpose matrix, notices, DPIA, retention schedule, DPAs | DPO |
| Data processor | Article 28 instructions, confidentiality, security, rights assistance, subprocessor flow-down | DPA, subprocessor register, security description | DPO |
| Service operator | Accurate service descriptions, complaints/remedies, field-issue escalation | Support/RMA policy, runbook, staffing evidence | Commercial director |

## 3. Supply scenarios

| Scenario | Likely roles | Critical distinction |
|---|---|---|
| `SCN-01` Own-branded finished product | Manufacturer, brand owner, seller, controller, service operator | EMBARCARTE is legal manufacturer for the whole product |
| `SCN-02` Imported white-label hardware | Importer, distributor, seller, brand owner | Supplier remains manufacturer; importer identity and language duties apply |
| `SCN-03` Third-party certified receiver | OEM assembler, manufacturer, importer, seller | Module certificate ≠ final-product certificate |
| `SCN-04` Raspberry Pi-based appliance | OEM assembler, manufacturer, importer, seller, SaaS provider | System-level EMC/safety and open-source/CRA duties |
| `SCN-05` Pico-based embedded controller | Manufacturer, OEM assembler, installer, seller | Safety-critical firmware and fail-safe design |
| `SCN-06` Installer-supplied system | Installer, distributor, seller, manufacturer | Two contracts: installer-to-owner and EMBARCARTE-to-installer |
| `SCN-07` Hosted software service | SaaS provider, controller, seller, service operator | Digital-content conformity and CRA service duties |
| `SCN-08` Licensed marine-data service | Controller, SaaS provider, distributor, seller | Display/cache/offline rights are per-provider and per-region |
| `SCN-09` Fleet SaaS | SaaS provider, processor, controller, service operator | Customer is controller of tenant data; DPA and isolation required |

## 4. Role-by-role release restrictions

- **Manufacturer / OEM assembler:** no market placement before
  `GATE-MARKET-PLACEMENT` and `GATE-CRA-CYBERSECURITY`; a third-party module
  certificate never closes the gate.
- **Importer / distributor:** no import or supply until supplier conformity
  evidence is verified and the importer identity is on product/packaging.
- **Seller:** no purchasable CTA without `GATE-LEGAL-ENTITY`,
  `GATE-CONSUMER-TERMS`, `GATE-PAYMENTS` and `GATE-PRICING`.
- **Installer:** no "certified installer" claim until a real certification
  scheme exists; commissioning record mandatory.
- **SaaS provider:** no SLA, uptime, security or certification claim without
  measurement and contract.
- **Data controller / processor:** no FLEET onboarding before the DPIA and DPA.
- **Brand owner:** no public MAREA use while `MAREA_PUBLIC_USE = NO_GO`.

## 5. What EMBARCARTE must decide

1. For each supply model, is EMBARCARTE manufacturer, importer, distributor,
   seller, installer, SaaS provider, controller or processor?
2. Which entity signs the supplier, distribution and installer contracts?
3. Which entity appears on the product, packaging and declaration of
   conformity?
4. Who bears recall, warranty and liability obligations, and how are they
   allocated by contract?

Until `DEC-MC14-002` is decided and the supporting contracts exist, every
scenario remains potential and every product remains `NOT_FOR_SALE`.

## 6. Honest limitation

This matrix is an internal planning instrument. It is not a legal opinion on
EMBARCARTE's status and does not assert that EMBARCARTE already holds any role.
The classification must be confirmed by counsel against the actual supply
contracts, corporate structure and product facts.
