# MC-11 D12 — Supplier register (public-source supplier intelligence, no contact)

Status: `INTERNAL_ENGINEERING_RESEARCH` — **NO SUPPLIER HAS BEEN CONTACTED.** No account, no enquiry, no
RFQ, no sample order, no price negotiation, no purchase. Every supplier record carries
`contactStatus = NOT_CONTACTED` and `rfqStatus = RFQ_NOT_SENT`. Milestone MC-11, session date
**2026-11-02**. `MC11_FORMAL_PROCUREMENT_EVIDENCE = BLOCKED_OR_NOT_OBTAINED`.

Machine-readable companion: `docs/marea/hardware/data/supplier-register.json` (19 supplier records) and
`docs/marea/hardware/data/evidence/sourcing.json` (EVD-MC11-101…143).

---

## 1. Method and what a "supplier record" means here

A supplier is registered only if at least one of these was actually observed on 2026-11-02:

- its own public website page (fetched), and/or
- a distributor product page that names it as the manufacturer (fetched).

The register records **identity and public claims only**. It is **not** an approved-vendor list, not a
qualified-supplier list, and not evidence of capability, capacity, quality system, financial standing,
export compliance or willingness to quote. Where the retrieved page did not state something, the record
says `UNKNOWN`; nothing was inferred from brand reputation.

**Authorisation.** Authorised-distributor / franchise status was **not** stated on any retrieved
distributor page. RS Components is therefore recorded as `AUTHORIZED_DISTRIBUTOR` in role taxonomy only
with `manufacturerAuthorizationEvidence: UNKNOWN` — the role label describes what the company is, not a
verified franchise relationship for the parts in this study.

---

## 2. Registered suppliers (19)

| Supplier ID | Legal name (as observed) | Trading name | Country | Roles | Evidence | Authorisation evidence | Quality statements (published by them) |
|---|---|---|---|---|---|---|---|
| SUP-texasinstruments-01 | Texas Instruments Incorporated | Texas Instruments | US | MANUFACTURER | EVD-101…108 (own pages) | Manufacturer-direct | none observed |
| SUP-microchip-01 | Microchip Technology Inc. | Microchip | US | MANUFACTURER | EVD-112, 113, 114, 132 | Manufacturer-direct | none observed |
| SUP-stmicroelectronics-01 | STMicroelectronics N.V. | STMicroelectronics | CH | MANUFACTURER | EVD-111 | Manufacturer-direct | none observed |
| SUP-espressif-01 | Espressif Systems (Shanghai) Co., Ltd. | Espressif Systems | CN | MANUFACTURER | EVD-123 | Manufacturer-direct | none observed |
| SUP-ublox-01 | u-blox AG | u-blox | CH | MANUFACTURER | EVD-116, 117 | Manufacturer-direct | none observed |
| SUP-quectel-01 | Quectel Wireless Solutions Co., Ltd. | Quectel | CN | MANUFACTURER | EVD-118 | Manufacturer-direct | none observed |
| SUP-sensirion-01 | Sensirion AG | Sensirion | CH | MANUFACTURER | EVD-115 | Manufacturer-direct | none observed |
| SUP-bosch-sensortec-01 | Bosch Sensortec GmbH | Bosch Sensortec | DE | MANUFACTURER | EVD-122 | Manufacturer-direct | none observed |
| SUP-toradex-01 | Toradex AG | Toradex | CH | MANUFACTURER | EVD-119 | Manufacturer-direct | none observed |
| SUP-variscite-01 | Variscite Ltd. | Variscite | IL | MANUFACTURER | EVD-120 | Manufacturer-direct | ISO 9001, ISO 13485 (self-declared on own page) |
| SUP-riverdi-01 | Riverdi Sp. z o.o. | Riverdi | PL | MANUFACTURER | EVD-121 | Manufacturer-direct | none observed |
| SUP-nordicsemiconductor-01 | Nordic Semiconductor ASA | Nordic Semiconductor | NO | MANUFACTURER | EVD-110 (named on RS page) | UNKNOWN (own site unreachable) | none observed |
| SUP-rscomponents-01 | RS Components, Ltd. | RS Components | GB | AUTHORIZED_DISTRIBUTOR | EVD-109, 110 | UNKNOWN — not stated on retrieved pages | none observed |
| SUP-jlcpcb-01 | UNKNOWN — JLCPCB brand (legal entity not published) | JLCPCB | CN | PCB_FAB, EMS | EVD-124 | n/a (fabrication service) | ISO 27001, ISO 27701, PCI DSS (self-declared) |
| SUP-pcbway-01 | UNKNOWN — PCBWay brand (legal entity not published) | PCBWay | CN | PCB_FAB, EMS | EVD-125 | n/a (fabrication service) | none observed |
| SUP-aisler-01 | UNKNOWN — AISLER brand (legal entity not published) | AISLER | DE | PCB_FAB, EMS | EVD-126 | n/a (fabrication service) | none observed |
| SUP-efacec-01 | UNKNOWN — Efacec brand (legal entity not confirmed) | Efacec | PT | EMS (capability unverified) | EVD-127 | UNKNOWN | none observed |
| SUP-applus-01 | UNKNOWN — Applus+ brand (legal entity not confirmed) | Applus+ | ES | TEST_LAB (scope unverified) | EVD-128 | UNKNOWN | none observed |
| SUP-fibox-01 | Fibox Oy Ab | Fibox | FI | ENCLOSURE | EVD-129, 139 | Manufacturer-direct | ISO 9001 / 14001 / 45001, UL 508A for named group entities (self-declared) |

Distinct legal/trading names: all 19 normalise uniquely (a deliberate V06-safe construction; four
records state a brand with an explicit "legal entity not published" qualifier rather than duplicating
an `UNKNOWN` string).

### 2.1 Role coverage

| Role | Count | Records |
|---|---|---|
| MANUFACTURER | 12 | TI, Microchip, ST, Espressif, u-blox, Quectel, Sensirion, Bosch Sensortec, Toradex, Variscite, Riverdi, Nordic |
| AUTHORIZED_DISTRIBUTOR | 1 | RS Components |
| PCB_FAB | 3 | JLCPCB, PCBWay, AISLER |
| EMS | 4 | JLCPCB, PCBWay, AISLER, Efacec (unverified) |
| ENCLOSURE | 1 | Fibox |
| TEST_LAB | 1 | Applus+ (scope unverified) |
| PACKAGING / LOGISTICS | **0 in the data file** — see §4 (websites listed, pages NOT fetched) |

---

## 3. Distributor observation — what the catalogue actually gave us

| Distributor | Storefront observed | Result | Consequence |
|---|---|---|---|
| RS Components (es.rs-online.com) | TCAN1042HGVDR page, nRF52840 page | Price tiers VAT-excluded, pack of 5, 4 435 units stated in stock (TCAN1042); nRF52840 unavailable and being withdrawn | Usable for **one** public price series; not a supply channel commitment |
| Mouser (es / EU) | attempted TCAN1042HGVDR page | **INACCESSIBLE** (EVD-141/143) | no Mouser price used |
| Digi-Key | attempted TCAN1042HGVDR page | **INACCESSIBLE** (EVD-142) | no Digi-Key price used |
| TME | attempted ESP32-C6-MINI-1-H4 page | **INACCESSIBLE** (EVD-135) | no TME price used |
| Farnell / Newark | attempted search / connector page | **INACCESSIBLE** | no Farnell/Newark price used |
| Reichelt | search page rendered without results | no product page obtained | not used |

So the public-price evidence in D13 is narrower than planned: **Texas Instruments' own web prices,
u-blox's own published module prices, one RS price series, and three PCB-service advertised prices**.
That narrowness is recorded, not compensated by invention.

---

## 4. EU / Spanish / Portuguese service-supplier candidates

The mission asks for EU, Spanish and Portuguese PCB-fab, EMS and EMC-lab candidates relevant to a small
Spanish/Portuguese marine-electronics venture, each with a real website. Three supplier pages were
fetched (AISLER, Efacec, Applus+). The remaining candidates below are **real, well-known companies whose
websites are listed, but whose pages were NOT fetched in this session**: they are therefore **not**
entered in `supplier-register.json` and no claim about them (accreditation, capability, pricing) is
made beyond "a public website exists at this address". They are candidates for a future authorised
supplier-engagement gate (G2), not current facts. **All remain NOT_CONTACTED.**

### 4.1 PCB fabrication

| Candidate | Country | Website | Status |
|---|---|---|---|
| AISLER | DE (manufacturing in Europe per own page) | https://aisler.net | **PAGE FETCHED** — from €14.20, ~1 business day claim (EVD-126) |
| JLCPCB | CN | https://jlcpcb.com | **PAGE FETCHED** — from $2.00/5 pcs (EVD-124) |
| PCBWay | CN | https://www.pcbway.com | **PAGE FETCHED** — $5.00/10 pcs (EVD-125) |
| Eurocircuits | BE | https://www.eurocircuits.com | NOT FETCHED (site unreachable/blocked 2026-11-02) — candidate only |
| Beta LAYOUT | DE | https://www.beta-layout.com | NOT FETCHED — candidate only |
| Würth Elektronik Circuit Board Technology | DE | https://www.we-online.com/en/cbt | NOT FETCHED — candidate only |
| LeitOn | DE | https://www.leiton.de | NOT FETCHED — candidate only |

Spanish/Portuguese PCB fabrication: no Spanish or Portuguese PCB-fab website was retrieved in this
session. The register must not invent one. A Spanish/Portuguese fab search remains an open research
task for the G2 supplier-engagement gate (and may not be necessary: EU fabs in BE/DE/PL are plausible
for a Spanish venture).

### 4.2 EMS / box build

| Candidate | Country | Website | Status |
|---|---|---|---|
| Efacec | PT | https://www.efacec.pt | **PAGE FETCHED** — identity only; EMS role/capability UNVERIFIED (EVD-127) |
| AISLER (assembly) | DE/EU | https://aisler.net | **PAGE FETCHED** — prototype assembly claim (EVD-126) |
| JLCPCB (assembly) | CN | https://jlcpcb.com | **PAGE FETCHED** — from $8.00 assembly claim (EVD-124) |
| PCBWay (assembly) | CN | https://www.pcbway.com | **PAGE FETCHED** — $29 assembly headline (EVD-125) |
| FICOSA | ES | https://www.ficosa.com | NOT FETCHED — automotive-tier industrial group; EMS-for-hire capability NOT established |
| Eurocircuits (EMS arm) | BE | https://www.eurocircuits.com | NOT FETCHED — candidate only |

No Portuguese or Spanish EMS capability, quality system, IPC class, ESD control, conformal-coat
capability or marine experience was verified. Treat "Portuguese EMS" as **unproven** and require an
audit before any supplier is shortlisted (G2).

### 4.3 EMC / RED / environmental test laboratories

| Candidate | Country | Website | Status |
|---|---|---|---|
| Applus+ | ES | https://www.applus.com | **PAGE FETCHED** — identity only; EMC/RED scope & 17025 accreditation UNVERIFIED (EVD-128) |
| Eurofins | LU/EU | https://www.eurofins.com | NOT FETCHED — candidate only |
| DEKRA | DE (ES presence via DEKRA España) | https://www.dekra.com | NOT FETCHED — candidate only |
| TÜV SÜD | DE | https://www.tuvsud.com | NOT FETCHED (site unreachable 2026-11-02) — candidate only |
| Bureau Veritas | FR | https://www.bureauveritas.com | NOT FETCHED — candidate only |
| Element Materials Technology | UK/EU | https://www.element.com | NOT FETCHED — candidate only |
| CETECOM | DE/ES | https://www.cetecom.com | NOT FETCHED — candidate only |

**No laboratory scope, accreditation, RED notified-body status, price, lead time or capacity was
verified.** Radio (RED), EMC and environmental testing remain unquoted and unplanned in cost terms.

### 4.4 Packaging and logistics candidates (websites only; none fetched)

| Candidate | Country | Role | Website | Status |
|---|---|---|---|---|
| Smurfit Kappa | IE | PACKAGING (corrugated/consumer packaging) | https://www.smurfitkappa.com | NOT FETCHED |
| DS Smith | UK | PACKAGING | https://www.dssmith.com | NOT FETCHED |
| Nefab | SE | PACKAGING (industrial/protective) | https://www.nefab.com | NOT FETCHED |
| DHL Express | DE | LOGISTICS | https://www.dhl.com | NOT FETCHED |
| DSV | DK | LOGISTICS | https://www.dsv.com | NOT FETCHED |
| SEUR | ES | LOGISTICS (Spain) | https://www.seur.com | NOT FETCHED |
| CTT | PT | LOGISTICS (Portugal) | https://www.ctt.pt | NOT FETCHED |

Packaging design, packaging cost, Incoterms, freight, customs handling and EU responsible-person
arrangements are entirely `UNKNOWN`. None of these companies was contacted.

---

## 5. Authorisation, MOQ, lifecycle and quality evidence — status

| Question | Status | Basis |
|---|---|---|
| Is any distributor an authorised/franchise distributor for these parts? | `UNKNOWN` | Not stated on retrieved pages; no supplier contacted |
| Manufacturer MOQ per component | `UNKNOWN` | Only three PCB services publish an advertised minimum (5 / 10 pcs); component MOQ not published on any retrieved manufacturer page |
| Component lead time | `UNKNOWN` | No manufacturer page retrieved published a lead time; only advertised *build times* for PCB services |
| Volume price breaks | Partially observed | TI and u-blox publish tiered/list prices; RS publishes quantity tiers; no negotiated tier exists |
| Tooling / NRE (enclosure cut-outs, stencils, test fixtures, optical bonding) | `UNKNOWN` | No supplier NRE published |
| Warranty / RMA terms | `UNKNOWN` | Not published on any retrieved page |
| Supplier quality certification | Only where self-published | Variscite (ISO 9001/13485), Fibox entities (ISO 9001/14001/45001/UL 508A), JLCPCB (ISO 27001/27701, PCI DSS). Certificates not retrieved; scope/entity-specific |
| Export control / dual-use | `UNKNOWN` | Not assessed; TI part-details pages show US ECCN EAR99 for the observed orderables only |
| Production capacity / factory audit | `UNKNOWN` | Marketing claims only (e.g. JLCPCB acreage/orders) are not evidence of capacity for MAREA |
| EU representative / importer obligations | `UNKNOWN` | Not addressed by any supplier page; required before EU placement |

---

## 6. Supplier risks (recorded, not mitigated)

| Risk | Affected suppliers | Severity | Note |
|---|---|---|---|
| Manufacturer lifecycle not verifiable for key parts (NRND/EOL) | Microchip (ATECC608B, AT24CS32), u-blox (MAX-M10) | HIGH | See D11 §17 |
| Distributor line withdrawal during a long-life product design | RS / Nordic (nRF52840) | MEDIUM | Second authorised distributor required |
| No verified second source for the display | Riverdi | HIGH | Single verified supplier; no panel second source |
| China-based PCB/PCBA supply chain | JLCPCB, PCBWay | MEDIUM | Customs, CRA supply-chain due diligence, IP protection, EU representative; not assessed |
| Unverified EU/PT EMS and Spanish EMC-lab capability | Efacec, Applus+ | HIGH for planning | Do not plan around them until G2 engagement verifies scope |
| Quality claims are self-declared | Variscite, Fibox, JLCPCB | MEDIUM | No certificate, audit report or scope statement retrieved |
| No supplier contact means no commercial terms exist at all | all | HIGH | No MOQ, no Incoterms, no payment terms, no warranty, no capacity commitment |
| Public prices are not wholesale | TI, u-blox, RS | HIGH | See D13; any manufacturing BOM built on them inherits `COST_UNVERIFIED` for volume economics |

---

## 7. Explicit control statements

```
SUPPLIER_CONTACT                = NOT_CONTACTED (all 19 registered suppliers + all §4 candidates)
RFQ_TRANSMISSION                = NOT_AUTHORIZED / NONE SENT
ACCOUNT_CREATION                = NONE
SAMPLE_ORDERS                   = NONE
PURCHASES                       = NONE
PRICE_NEGOTIATION               = NONE
APPROVED_VENDOR_LIST           = NOT ESTABLISHED
SUPPLIER_QUALITY_AUDIT          = NOT PERFORMED
FORMAL_QUOTATION                = NOT OBTAINED (none exists)
```

D14 contains the ten RFQ packages that are **drafted but deliberately not sent**.
