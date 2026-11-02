# MC-14 — Primary-source legal research dossier (EU / Spain)

**Document ID:** MC14-LEGAL-RESEARCH-DOSSIER · **Programme:** EMBARCARTE / MAREA · **Milestone:** MC-14 of 36
**Owner role:** EU/Spain regulatory research lead (Agent A) · **Retrieved / recorded on:** 2026-11-02 (Europe/Madrid)
**Branch:** `feature/marea-mc14-legal-commercial-risk-claims-policy` · **Baseline commit:** `f80c0f02ac14803e9e1539393abbb225d7f49e16` (MC-13 HEAD)
**Status:** `INTERNAL_PRIMARY_SOURCE_RESEARCH — NOT LEGAL ADVICE — NO CLEARANCE OF ANY KIND`
**Machine-readable companion:** [`mc14-legal-sources.csv`](mc14-legal-sources.csv) (48 governed rows; 4 considered-only records are marked in the dossier text)

## Scope

This dossier records, for 50 research records (48 governed sources plus 4 considered-only records and 2 governed-only additions), what the **official primary sources** actually say on 2026-11-02 about: publication, entry into force, application/transposition, the provisions examined, and their applicability to the nine proposed MAREA product lines (NAV, HUB, AIS, PILOT, SENSE, WATCH, DISPLAY, WEATHER, FLEET). It is the research input from which the Lead compiles `docs/marea/legal-commercial/data/legal-sources.json`. It does **not** approve a price, a claim, a certification route, a market placement, a trademark or a legal position.

## Method

1. **Official sources first.** EUR-Lex (OJ text and EUR-Lex summaries), the European Commission, BOE, Agencia Tributaria, AEPD, EUIPO/OEPM/WIPO and NMEA are the only authorities relied on. Predecessor evidence records (MC-11/MC-12/MC-03, retrieved 2026-11-02 or 2026-10-30 from the same official sources) are consumed where they already recorded a verified fact, and are cited by evidence ID.
2. **No dates invented.** Where a fetched page did not render a date, the date is `NOT_RETRIEVED`, never inferred from a neighbouring field or from entry into force. A predecessor date that was already flagged is carried forward **with the flag intact**.
3. **Applicability is scoped, not certified.** "Applicable" means the act would govern the configuration *if placed on the market*; no MAREA product is placed on the market (`COMMERCIAL_AVAILABILITY = NOT_FOR_SALE`) and no conformity exists.
4. **Uncertainty stays open.** Every reading that needs a lawyer or a frozen design is labelled `LEGAL_REVIEW_REQUIRED` with an owner; the dossier never resolves ambiguity by assertion.

## Retrieval result (counts)

| Metric | Count |
|---|---|
| Governed source rows in `legal-sources.json` / CSV | **48** |
| `VERIFIED_THIS_SESSION` (official page fetched 2026-11-02) | **4** |
| `CONSUMED_FROM_PREDECESSOR_EVIDENCE` (cited by evidence ID, not re-fetched) | **32** |
| `PARTIALLY_VERIFIED` (identified/partial) | **2** |
| `NOT_RETRIEVED` (recorded, not quoted, date fields left blank) | **6** |
| `INACCESSIBLE` (fetch attempted and failed / blocked) | **4** |
| Governed rows with an official URL | 48 / 48 |
| Research records naming a specific article/provision examined | 40 / 50 (the other 10 are marked "none retrieved" or "identification only" in §2) |
| Legal clearances, certifications or approvals established | **0** |


**Membership and status reconciliation (correction A-01, 2026-11-02).** The governed register is authoritative: 48 sources with one status per source, adopted by `data/legal-sources.json`, this dossier and `mc14-legal-sources.csv`. The research vocabulary contains 50 records: the 48 governed rows, minus two governed-only additions made during compilation (`SRC-EU-DB-96-9`, `SRC-ES-AEMET-TERMS`), plus four considered-only records that the governed register excludes because they are non-law authority portals or standards catalogues rather than instruments relied on for a requirement (`SRC-ES-AUTORIDAD-CONSUMIDOR`, `SRC-WIPO-GLOBAL-BRAND-DB`, `SRC-IEC-60945`, `SRC-ISO-16315`). Those four are marked `NOT_IN_GOVERNED_REGISTER` here and are not used as legal requirements. Counts above are the governed counts; no source carries two verification statuses. The dossier's earlier `RE_VERIFIED_THIS_SESSION` label is renamed `VERIFIED_THIS_SESSION` to match the governed vocabulary.

**Key-currency corrections found this session (detail in §4):** (a) the RED cybersecurity delegated regulation 2022/30 applied from **2025-08-01**, not 2025-02-01; (b) Delegated Regulation (EU) **2026/339** exists and repeals 2022/30 **with effect from 2027-12-11**; (c) a **May 2026 corrigendum** to the PLD (OJ L 2026/90364, 7.5.2026) corrects Article 2(1) so that the PLD applies to products placed on the market **after 2026-12-08**; (d) Spanish RD 188/2016 Art 9(8) **does** impose a Spanish-language instructions duty, closing MC-11 open question L2.

---

## §1 Key-date summary table

| sourceId | Instrument (short) | Publication | Entry into force | Application / transposition | Verification |
|---|---|---|---|---|---|
| SRC-EU-CRA-2024-2847 | Cyber Resilience Act | 2024-11-20 | 2024-12-10 | 2027-12-11 (reporting 2026-09-11) | RE_VERIFIED |
| SRC-EU-PLD-2024-2853 | Product Liability Directive | 2024-11-18 | 2024-12-08 | transposition 2026-12-09; applies to products placed after 2026-12-08 (corrigendum) | RE_VERIFIED |
| SRC-EU-RED-2014-53 | Radio Equipment Directive | 2014-05-22 | 2014-06-11 | 2016-06-13 (transitional to 2017-06-12) | CONSUMED |
| SRC-EU-DELREG-2022-30 | RED Art 3(3)(d)(e)(f) delegated act | 2022-01-12 | 2022-02-01 | 2025-08-01 (as amended) | RE_VERIFIED |
| SRC-EU-DELREG-2026-339 | Repeal of 2022/30 | 2026-04-29 | 2026-05-19 | repeal effective 2027-12-11 | RE_VERIFIED |
| SRC-EU-EMC-2014-30 | EMC Directive | 2014-03-29 | 2014-04-18 | 2016-04-20 | CONSUMED |
| SRC-EU-LVD-2014-35 | Low Voltage Directive | 2014-03-29 | 2014-04-18 | 2016-04-20 | CONSUMED |
| SRC-EU-GPSR-2023-988 | General Product Safety Regulation | 2023-05-23 | 2023-06-12 | 2024-12-13 | RE_VERIFIED |
| SRC-EU-ROHS-2011-65 | RoHS Directive | 2011-07-01 | 2011-07-21 | 2013-01-02 (catch-all 2019-07-22) | CONSUMED |
| SRC-EU-WEEE-2012-19 | WEEE Directive | 2012-07-24 | 2012-08-13 | 2014-02-14 | CONSUMED |
| SRC-EU-BATTERIES-2023-1542 | Batteries Regulation | 2023-07-28 | 2023-08-17 | 2024-02-18 | CONSUMED |
| SRC-EU-PACKAGING-2025-40 | Packaging and Packaging Waste Regulation | 2025-01-22 | 2025-02-11 | 2026-08-12 (FLAGGED — not rendered) | CONSUMED |
| SRC-EU-RCD-2013-53 | Recreational Craft Directive | 2013-12-28 | NOT_RETRIEVED | NOT_RETRIEVED | CONSUMED |
| SRC-EU-MED-2014-90 | Marine Equipment Directive | 2014-08-28 | NOT_RETRIEVED | NOT_RETRIEVED | CONSUMED |
| SRC-EU-GDPR-2016-679 | GDPR | 2016-05-04 | 2016-05-24 | 2018-05-25 | CONSUMED |
| SRC-EU-EPRIVACY-2002-58 | ePrivacy Directive | 2002-07-31 | 2002-08-20 | 2003-10-31 | CONSUMED |
| SRC-EU-CRD-2011-83 | Consumer Rights Directive | 2011-11-22 | 2011-12-12 | transposition 2013-12-13; applies 2014-06-13 | CONSUMED |
| SRC-EU-CSD-2019-771 | Sale of Goods Directive | 2019-05-22 | 2019-06-11 | 2022-01-01 (not stated in predecessor evidence) | CONSUMED |
| SRC-EU-DCD-2019-770 | Digital Content Directive | 2019-05-22 | 2019-06-11 | NOT_RETRIEVED | RE_VERIFIED |
| SRC-EU-UCPD-2005-29 | Unfair Commercial Practices Directive | 2005-06-11 | 2005-07-01 | NOT_RETRIEVED | RE_VERIFIED |
| SRC-EU-PRICE-98-6 | Price Indication Directive | 1998-03-18 | 1998-04-07 | 2000-03-18 | CONSUMED |
| SRC-EU-ECOMMERCE-2000-31 | eCommerce Directive | 2000-07-17 | 2000-08-06 | NOT_RETRIEVED | RE_VERIFIED |
| SRC-EU-PSD2-2015-2366 | PSD2 | 2015-12-23 | 2016-01-12 | 2018-01-13 | CONSUMED |
| SRC-EU-SCA-2018-389 | PSD2 SCA RTS | 2018-03-13 | 2018-03-14 | 2019-09-14 | CONSUMED |
| SRC-EU-VAT-2006-112 | VAT Directive (consolidated 2025-04-14) | 2006-12-11 | 2007-01-01 | 2007-01-01 | CONSUMED |
| SRC-EU-OSS-282-2011 | VAT implementing measures / OSS | 2011-03-23 | 2011-04-12 | OSS from 2021-07-01 | CONSUMED |
| SRC-EU-EUTMR-2017-1001 | EU Trade Mark Regulation | 2017-06-16 | 2017-07-06 | 2017-10-01 | CONSUMED |
| SRC-EU-CE-MARKING-GUIDANCE | Commission CE marking guidance | N/A | N/A | N/A (guidance) | CONSUMED |
| SRC-EU-BLUE-GUIDE-2022 | Blue Guide 2022 | 2022-06-29 | N/A | N/A (guidance) | NOT_RETRIEVED |
| SRC-ES-TRLGDCU-RDL-1-2007 | TRLGDCU | 2007-11-30 | 2007-12-01 | 3-year guarantee / 24-month presumption from 2022-01-01 | CONSUMED |
| SRC-ES-LSSI-34-2002 | LSSI 34/2002 | 2002-07-12 | 2002-10-12 | 2002-10-12 | CONSUMED |
| SRC-ES-LOPDGDD-3-2018 | LOPDGDD 3/2018 | 2018-12-06 | 2018-12-07 | 2018-12-07 | NOT_RETRIEVED |
| SRC-ES-LGT-11-2022 | Ley 11/2022 General de Telecomunicaciones | 2022-06-29 | NOT_RETRIEVED | NOT_RETRIEVED | CONSUMED |
| SRC-ES-RD-188-2016 | Spanish RED transposition | 2016-05-10 | 2016-06-13 | 2016-06-13 | RE_VERIFIED |
| SRC-ES-RD-186-2016 | Spanish EMC transposition | 2016-05-10 | NOT_RETRIEVED | NOT_RETRIEVED | RE_VERIFIED |
| SRC-ES-RD-187-2016 | Spanish LVD transposition | 2016-05-10 | NOT_RETRIEVED | NOT_RETRIEVED | RE_VERIFIED |
| SRC-ES-LCD-3-1991 | Unfair Competition Law | NOT_RETRIEVED | NOT_RETRIEVED | NOT_RETRIEVED | NOT_RETRIEVED |
| SRC-ES-LGP-34-1988 | General Advertising Law | NOT_RETRIEVED | NOT_RETRIEVED | NOT_RETRIEVED | NOT_RETRIEVED |
| SRC-ES-PRODUCER-REGISTER | MITECO producer register (RPP) | N/A | N/A | annual window 2026-01-02 to 2026-04-02 | CONSUMED |
| SRC-ES-AEPD-DPIA | AEPD DPIA guidance | N/A | N/A | N/A | INACCESSIBLE |
| SRC-ES-IHM-CHART-LICENSING | IHM chart/ENC licensing | N/A | N/A | N/A | INACCESSIBLE |
| SRC-ES-AUTORIDAD-CONSUMIDOR | Spanish consumer authority (CEC) | N/A | N/A | N/A | CONSUMED |
| SRC-NMEA-2000-LICENSING | NMEA 2000 licence | N/A | N/A | N/A (contractual) | RE_VERIFIED |
| SRC-NMEA-0183 | NMEA 0183 standard | N/A | N/A | N/A (contractual) | RE_VERIFIED |
| SRC-NMEA-CERTIFICATION | NMEA 2000 certification | N/A | N/A | N/A (contractual) | RE_VERIFIED |
| SRC-EUIPO-MAREA-SEARCH | EUIPO MAREA search | N/A | N/A | N/A | INACCESSIBLE |
| SRC-OEPM-MAREA-SEARCH | OEPM MAREA search | N/A | N/A | N/A | INACCESSIBLE |
| SRC-WIPO-GLOBAL-BRAND-DB | WIPO Brand DB | N/A | N/A | N/A | INACCESSIBLE |
| SRC-IEC-60945 | IEC 60945 (candidate standard) | 2002-08-13 | N/A | N/A | NOT_RETRIEVED |
| SRC-ISO-16315 | ISO 16315 (considered, excluded) | 2026-02-06 | N/A | N/A | NOT_RETRIEVED |

---

## §2 Instrument-by-instrument records

Legend — **Product applicability** uses NAV / HUB / AIS / PILOT / SENSE / WATCH / DISPLAY / WEATHER / FLEET. `A` = applicable in principle if placed on the market; `A?` = applicable conditional on an unfrozen design choice; `N` = not applicable with reason; `N/A` = no product placed on the market in that configuration. **reviewOwner** values: `counsel` (qualified external legal review), `conformity` (conformity-specialist), `dpo` (data protection), `tax` (tax counsel), `ip` (trade-mark counsel), `commercial` (Lead/commercial owner).

### EU instruments

#### SRC-EU-CRA-2024-2847 — Regulation (EU) 2024/2847 (Cyber Resilience Act)
- **Instrument / provision examined:** CRA; Art 13(8) support period, Art 13(9) update availability, Art 14 reporting, Art 7/8 and Annex III/IV classification; Article 71 (dossier correction 2026-11-02) (phased application). | **Jurisdiction:** EU | **retrievedOn:** 2026-11-02
- **officialUrl:** https://eur-lex.europa.eu/eli/reg/2024/2847/oj
- **Dates (publication / entry into force / application):** 2024-11-20 / 2024-12-10 / 2027-12-11 main obligations; reporting obligations Art 14 from 2026-09-11.
- **Transposition status:** Directly applicable regulation; CE-marking act. No transposition. Spanish market-surveillance context not separately retrieved.
- **Product applicability:** NAV **A** (software product); HUB **A**; AIS **A**; WATCH **A**; DISPLAY **A**; PILOT **A**; SENSE **A** (connected modules); WEATHER **N/A today** (hosted service; lapses if a client application is placed on the market); FLEET **N/A today** (B2B SaaS; lapses if a client application or edge device is placed on the market).
- **Obligation:** manufacturer cybersecurity risk assessment, secure-by-default design, vulnerability handling for the support period, technical documentation, EU declaration of conformity, CE marking, user information and single point of contact. **Support period exact rule (Art 13(8)):** manufacturer determines a period reflecting expected use; **"the support period shall be at least five years. Where the product with digital elements is expected to be in use for less than five years, the support period shall correspond to the expected use time."** Art 13(9): each security update remains available for **at least 10 years or the remainder of the support period, whichever is longer**.
- **Reporting mechanics (Art 14, verified):** early warning within 24 h of awareness, vulnerability/incident notification within 72 h, final report within 14 days after a corrective measure (actively exploited vulnerability) or within one month of the 72-h notification (severe incident). Reporting is already in force at 2026-11-02 for products placed on the market.
- **Evidence required:** documented risk assessment, SBOM/dependency inventory, vulnerability-handling and CVD process, support-period statement, update-integrity evidence, DoC, CE mark.
- **Uncertainty / reviewOwner:** Art 69 transitional provision was **not retrieved** in the fetched OJ excerpt (recorded NOT_RETRIEVED; do not quote it). Whether HUB/AIS/WATCH/DISPLAY fall in Annex III classes I/II or Annex IV critical classes is **not determined**; Implementing Regulation (EU) 2025/2392 is referenced in predecessor evidence EVD-MC11-302 but not re-read. Open-source treatment: FOSS supplied in the course of a commercial activity is in scope; non-monetised FOSS and open-source stewards have a lighter regime (recitals 17–19), and Art 13(5)–(6) impose component due diligence — a legal reading is required for MAREA's own dependencies. **reviewOwner:** counsel + conformity.
- **verificationStatus:** `CONSUMED_FROM_PREDECESSOR_EVIDENCE`

#### SRC-EU-PLD-2024-2853 — Directive (EU) 2024/2853 (Product Liability Directive)
- **Instrument / provision examined:** PLD; Art 2(1) as corrected, Art 4 scope (software, digital manufacturing files, related services), Art 6 defectiveness, Art 8 liable economic operators, Art 10 burden of proof, Art 11 exemptions, Arts 16–17 limitation/expiry, Arts 21–22 repeal/transposition. | **Jurisdiction:** EU | **retrievedOn:** 2026-11-02
- **officialUrl:** https://eur-lex.europa.eu/eli/dir/2024/2853/oj
- **Dates (publication / entry into force / application):** 2024-11-18 / 2024-12-08 / transposition by 2026-12-09; **Art 2(1) as corrected: the Directive applies to products placed on the market or put into service after 2026-12-08**; Directive 85/374/EEC repealed with effect from 2026-12-09 (Art 21), continuing to apply to products placed before that date.
- **Transposition status:** Harmonisation directive, transposition due 2026-12-09 (Art 22). **Spanish transposition instrument NOT_RETRIEVED** — no BOE act implementing 2024/2853 was located or verified on 2026-11-02. Spanish interaction with TRLGDCU Book III (arts 128–149, which implemented Directive 85/374/EEC) is therefore a mandatory counsel question.
- **Product applicability:** NAV **A** (software is a product; standalone or SaaS); HUB **A**; AIS **A**; PILOT **A** (safety-critical steering; uncappable no-fault exposure); SENSE **A**; WATCH **A**; DISPLAY **A**; WEATHER **A?** (related digital service within the manufacturer's control can be a component); FLEET **A?** (related service only where within the manufacturer's control).
- **Obligation:** no-fault liability of manufacturer, component manufacturer, importer, authorised representative, fulfilment service provider and substantial modifier; distributors liable as fallback where the EU operator cannot be identified (Art 8(3)); defectiveness assessed against expected safety, including cybersecurity vulnerabilities and failure to provide safety updates; destruction/corruption of data compensable; exemptions include development risk; liability cannot be capped contractually against the injured person (Art 15).
- **Evidence required:** design and risk files, software/update lifecycle records, cybersecurity evidence, incident and complaint records, DoC/technical file showing compliance with mandatory product-safety requirements (presumption under Art 10(2)(b)), recall/corrective action records.
- **Uncertainty / reviewOwner:** **the May 2026 corrigendum exists and was verified** (OJ L 2026/90364, 7.5.2026, CELEX 32024L2853R(01)); it changes the application-date wording only. Whether MAREA's app/cloud functions are "related services" within its control, and the scope of "digital manufacturing files", require counsel. **reviewOwner:** counsel (product liability) + DPO.
- **verificationStatus:** `VERIFIED_THIS_SESSION`

#### SRC-EU-RED-2014-53 — Directive 2014/53/EU (Radio Equipment Directive)
- **Instrument / provision examined:** RED; Art 1(2) exclusions (marine equipment within MED scope), Art 2 definition, Art 3(3)(d)(e)(f), Art 10/12/13 operator duties, Art 48 transitional. | **Jurisdiction:** EU | **retrievedOn:** 2026-11-02
- **officialUrl:** https://eur-lex.europa.eu/eli/dir/2014/53/oj
- **Dates (publication / entry into force / application):** 2014-05-22 / 2014-06-11 / 2016-06-13; transitional period ended 2017-06-12 (Art 48).
- **Transposition status:** Transposed in Spain by **RD 188/2016** (in force 2016-06-13). Portuguese transposition (DL 57/2017) used by MC-11 only as corroboration, not as Spanish law.
- **Product applicability:** HUB **A?** (if Wi-Fi/BLE frozen); AIS **A** (intentional VHF receiver — receive-only does **not** remove RED); WATCH **A** (cellular/Wi-Fi/BLE/GNSS); DISPLAY **A?** (radio variant); SENSE **A?** (wireless modules); PILOT **N** unless a radio interface is frozen; NAV **N** (software only); WEATHER/FLEET **N** (no radio apparatus placed on the market).
- **Obligation:** essential requirements on safety/health, EMC and efficient spectrum use, plus activated Art 3(3)(d)(e)(f) cybersecurity/privacy/fraud requirements (see 2022/30 and 2026/339); technical documentation (Annex V), EU declaration of conformity (Annex VI), CE marking with notified-body number where involved, instructions and safety information, frequency bands and max RF power, 10-year retention.
- **Evidence required:** radio test reports per interface, EMC/safety/RF-exposure evidence, DoC, technical file, language-specific instructions (Spanish per RD 188/2016 Art 9(8)).
- **Uncertainty / reviewOwner:** whether any MAREA family carries a frozen radio interface remains undecided (MC-11). Where RED applies, the EMC Directive does not additionally apply. **reviewOwner:** conformity.
- **verificationStatus:** `CONSUMED_FROM_PREDECESSOR_EVIDENCE`

#### SRC-EU-DELREG-2022-30 — Commission Delegated Regulation (EU) 2022/30
- **Instrument / provision examined:** Del Reg 2022/30; Art 1 (categories: internet-connected, childcare/toys, wearables), Art 2 exclusions, Art 3 entry into force/application. | **Jurisdiction:** EU | **retrievedOn:** 2026-11-02
- **officialUrl:** https://eur-lex.europa.eu/eli/reg_del/2022/30/oj
- **Dates (publication / entry into force / application):** 2022-01-12 / 2022-02-01 / **2025-08-01** (consolidated version 27/10/2023 postponing the original 2024-08-01; confirmed by Delegated Regulation (EU) 2026/339 recital 2, which records application "from 1 August 2025" until 2027-12-10).
- **Transposition status:** Directly applicable delegated regulation; no transposition. Repealed with effect from 2027-12-11 by 2026/339.
- **Product applicability:** HUB **A?** (internet-connected radio equipment); AIS **A?** (if it includes an internet-connectable radio interface); WATCH **A** (internet-connected and wearable); DISPLAY **A?**; SENSE **A?** (wireless internet-connected modules); others **N** or not radio equipment.
- **Obligation:** activates RED Art 3(3)(d) (no harm to network), (e) (personal data/privacy protection) and (f) (fraud protection) for the listed equipment, with conformity assessed under the RED.
- **Evidence required:** RED conformity evidence covering those essential requirements during the period 2025-08-01 to 2027-12-10; after that date the CRA regime applies.
- **Uncertainty / reviewOwner:** **the MC-14 prompt's date "2025-02-01" is not supported by the OJ text.** The verified position is an original application date of 2024-08-01 in the published 2022/30 text, postponed to 2025-08-01 by the 2023 amendment and confirmed at 2025-08-01 by 2026/339. Any predecessor artefact stating 2025-02-01 must be corrected. **reviewOwner:** conformity + Lead (data correction).
- **verificationStatus:** `VERIFIED_THIS_SESSION`

#### SRC-EU-DELREG-2026-339 — Commission Delegated Regulation (EU) 2026/339
- **Instrument / provision examined:** Del Reg 2026/339; Art 1 (repeal with effect from 2027-12-11), Art 2 (entry into force), recitals 2–5 (2022/30 history and CRA handover). | **Jurisdiction:** EU | **retrievedOn:** 2026-11-02
- **officialUrl:** https://eur-lex.europa.eu/legal-content/en/TXT/?uri=CELEX%3A32026R0339
- **Dates (publication / entry into force / application):** 2026-04-29 / 2026-05-19 (20th day after publication) / repeal effective **2027-12-11**; the 2022/30 requirements remain applicable to equipment placed on the market between 2025-08-01 and 2027-12-10, and market surveillance for that equipment is unaffected.
- **Transposition status:** Directly applicable delegated regulation.
- **Product applicability:** all radio equipment previously in 2022/30 scope — HUB, AIS (connected variant), WATCH, DISPLAY, wireless SENSE modules; after 2027-12-11 the CRA cybersecurity regime replaces the RED Art 3(3)(d)(e)(f) activation.
- **Obligation:** no new obligation; it removes the overlap between 2022/30 and the CRA by repealing 2022/30 from the date the CRA applies in full.
- **Evidence required:** none in itself; planning must show which regime governs a unit placed on the market before vs after 2027-12-11.
- **Uncertainty / reviewOwner:** none material; the instrument was verified in full. **reviewOwner:** conformity.
- **verificationStatus:** `VERIFIED_THIS_SESSION`

#### SRC-EU-EMC-2014-30 — Directive 2014/30/EU (EMC)
- **Instrument / provision examined:** EMC Directive; scope, exclusions for RED equipment, essential requirements, conformity/CE. | **Jurisdiction:** EU | **retrievedOn:** 2026-11-02
- **officialUrl:** https://eur-lex.europa.eu/eli/dir/2014/30/oj
- **Dates:** 2014-03-29 / 2014-04-18 / 2016-04-20.
- **Transposition status:** Transposed in Spain by **RD 186/2016**; radio equipment covered by RED is excluded (national transpositions confirm the boundary).
- **Product applicability:** PILOT **A** (PWM motor drive, no radio frozen); wired SENSE modules **A**; HUB/DISPLAY/AIS/WATCH/SENSE-wireless **N** where RED applies; NAV/WEATHER/FLEET **N** (no apparatus).
- **Obligation:** emissions and immunity essential requirements; technical documentation; EU DoC; CE marking.
- **Evidence required:** EMC test campaign, technical file, DoC.
- **Uncertainty / reviewOwner:** the RED/EMC boundary must be re-run when the radio interface set is frozen. **reviewOwner:** conformity.
- **verificationStatus:** `CONSUMED_FROM_PREDECESSOR_EVIDENCE`

#### SRC-EU-LVD-2014-35 — Directive 2014/35/EU (LVD)
- **Instrument / provision examined:** LVD; voltage limits 50–1000 V AC / 75–1500 V DC, scope and CE duties. | **Jurisdiction:** EU | **retrievedOn:** 2026-11-02
- **officialUrl:** https://eur-lex.europa.eu/eli/dir/2014/35/oj
- **Dates:** 2014-03-29 / 2014-04-18 / 2016-04-20.
- **Transposition status:** Transposed in Spain by **RD 187/2016**.
- **Product applicability:** all nine **N** in the assessed configurations (12 V DC nominal; no mains circuit). Flips to **A** only if a 230 V AC PSU/charger is bundled under the MAREA brand.
- **Obligation:** safety objectives for equipment within the voltage limits; technical documentation; CE marking.
- **Evidence required:** PSU safety evidence only if a mains unit is placed on the market under MAREA's name.
- **Uncertainty / reviewOwner:** bundled-PSU commercial decision. **reviewOwner:** conformity + commercial.
- **verificationStatus:** `CONSUMED_FROM_PREDECESSOR_EVIDENCE`

#### SRC-EU-GPSR-2023-988 — Regulation (EU) 2023/988 (GPSR)
- **Instrument / provision examined:** GPSR; Art 5 general safety, Art 9 manufacturer risk analysis/documentation, Art 11 traceability, Art 14 complaints, Art 16 recalls, **Art 19 distance sales information**, Art 22 online marketplaces, Art 52 application. | **Jurisdiction:** EU | **retrievedOn:** 2026-11-02
- **officialUrl:** https://eur-lex.europa.eu/eli/reg/2023/988/oj
- **Dates:** 2023-05-23 / 2023-06-12 / **2024-12-13** (OJ Art 52 verified; the EUR-Lex summary's date field was blank, which is a rendering artefact, not an absence of the rule). Consolidated version current at 2026-05-29.
- **Transposition status:** Directly applicable regulation; repeals Directive 2001/95/EC and 87/357/EEC from 2024-12-13.
- **Product applicability:** HUB **A**; AIS **A**; PILOT **A** (residual product-safety framework — not a safety case); SENSE **A**; WATCH **A**; DISPLAY **A**; NAV **N?** (downloadable app not a "product" for GPSR; revisit if bundled); WEATHER **N/A**; FLEET **N/A**.
- **Obligation:** only safe products; internal risk analysis and technical documentation; responsible EU economic operator; product safety and traceability information; complaints register; accident/incident reporting via Safety Business Gateway; corrective action/withdrawal/recall with at least two remedies; **Art 19**: online/distance offers must clearly and visibly indicate the manufacturer's identity/contact details (or importer/responsible person), a clear product description, and warnings/safety information.
- **Evidence required:** GPSR risk analysis, warnings/instructions in ES/PT, traceability records, complaints register, recall plan, online listing information.
- **Uncertainty / reviewOwner:** interaction with product-specific harmonised law must be reasoned per SKU (GPSR applies to residual risks/aspects). **reviewOwner:** conformity + counsel.
- **verificationStatus:** `CONSUMED_FROM_PREDECESSOR_EVIDENCE`

#### SRC-EU-ROHS-2011-65 — Directive 2011/65/EU (RoHS)
- **Instrument / provision examined:** RoHS; substance restrictions, open EEE category, CE-marking duties. | **Jurisdiction:** EU | **retrievedOn:** 2026-11-02
- **officialUrl:** https://eur-lex.europa.eu/eli/dir/2011/65/oj
- **Dates:** 2011-07-01 / 2011-07-21 / 2013-01-02 (open catch-all category from 2019-07-22).
- **Transposition status:** Transposed in Spain; Spanish RoHS instrument **NOT_RETRIEVED**.
- **Product applicability:** all hardware families **A** (HUB, AIS, PILOT, SENSE, WATCH, DISPLAY); NAV/WEATHER/FLEET **N** (no EEE placed on the market).
- **Obligation:** restrict lead, mercury, cadmium, hexavalent chromium, PBB, PBDE and restricted phthalates; technical documentation; CE marking; supplier declarations.
- **Evidence required:** material declarations per homogeneous material, XRF/analytical verification, RoHS technical file.
- **Uncertainty / reviewOwner:** supplier declarations do not exist; exemptions to be tracked. **reviewOwner:** conformity.
- **verificationStatus:** `CONSUMED_FROM_PREDECESSOR_EVIDENCE`

#### SRC-EU-WEEE-2012-19 — Directive 2012/19/EU (WEEE)
- **Instrument / provision examined:** WEEE; scope, producer responsibility, registration, take-back, financing, marking. | **Jurisdiction:** EU | **retrievedOn:** 2026-11-02
- **officialUrl:** https://eur-lex.europa.eu/eli/dir/2012/19/oj
- **Dates:** 2012-07-24 / 2012-08-13 / 2014-02-14.
- **Transposition status:** Transposed in Spain; Spanish producer-registration instrument (RII-AEE) **NOT_RETRIEVED**.
- **Product applicability:** hardware families **A** (EEE placed on the market); NAV/WEATHER/FLEET **N**.
- **Obligation:** producer registration in each Member State, free take-back, collection/treatment/recycling targets, financing, crossed-out-wheeled-bin marking and user information. Not a CE-marking act.
- **Evidence required:** registration number, put-on-market reporting, take-back/financing evidence, design-for-dismantling data.
- **Uncertainty / reviewOwner:** Spanish register mechanics not retrieved (MC-11 CON-09 remains open). **reviewOwner:** conformity + commercial.
- **verificationStatus:** `CONSUMED_FROM_PREDECESSOR_EVIDENCE`

#### SRC-EU-BATTERIES-2023-1542 — Regulation (EU) 2023/1542 (Batteries)
- **Instrument / provision examined:** Batteries Regulation; scope (all batteries incl. incorporated), substance/safety/labelling, removability/replaceability, producer obligations. | **Jurisdiction:** EU | **retrievedOn:** 2026-11-02
- **officialUrl:** https://eur-lex.europa.eu/eli/reg/2023/1542/oj
- **Dates:** 2023-07-28 / 2023-08-17 / 2024-02-18 (application; verified in predecessor evidence and consistent with the current EUR-Lex summary). Portable batteries incorporated in appliances must be removable and replaceable by the end user **by 2027**; labelling requirements apply from **2026**; QR code from **2027**; portable-battery collection target 63 % by end-2027.
- **Transposition status:** Directly applicable regulation; repeals Directive 2006/66/EC.
- **Product applicability:** WATCH **A** (battery present); SENSE **A?**; HUB/AIS/DISPLAY/PILOT **A?** where any cell (including a real-time-clock coin cell) is present; NAV/WEATHER/FLEET **N**.
- **Obligation:** substance restrictions, safety/durability criteria, carbon-footprint and recycled-content rules, labelling/QR, producer registration and collection/recycling, end-user removability/replaceability.
- **Evidence required:** battery documentation, safety testing, removability design evidence, labelling artwork, producer registration.
- **Uncertainty / reviewOwner:** BOM not frozen; exact date in 2027 not asserted. **reviewOwner:** conformity.
- **verificationStatus:** `CONSUMED_FROM_PREDECESSOR_EVIDENCE`

#### SRC-EU-PACKAGING-2025-40 — Regulation (EU) 2025/40 (PPWR)
- **Instrument / provision examined:** PPWR; scope, EPR, packaging conformity assessment, EU declaration of conformity, labelling, application dates. | **Jurisdiction:** EU | **retrievedOn:** 2026-11-02
- **officialUrl:** https://eur-lex.europa.eu/eli/reg/2025/40/oj
- **Dates:** 2025-01-22 / 2025-02-11 / **2026-08-12 — FLAGGED, NOT VERIFIED.** The EUR-Lex summary title reads "(from 2026)" but the application date field was not rendered; the predecessor data file carries 2026-08-12 with the same flag. It must not be treated as confirmed.
- **Transposition status:** Directly applicable regulation; repeals Directive 94/62/EC.
- **Product applicability:** every hardware SKU sold as a packaged good **A**; NAV/WEATHER/FLEET **N** (no packaging).
- **Obligation:** packaging sustainability/recyclability, EPR financing, packaging technical documentation (5 years; 10 for reusable), EU declaration of conformity for packaging, labelling, corrective action. Not a product CE mark.
- **Evidence required:** packaging specification and material composition, recyclability assessment, packaging DoC, producer registration, labelling.
- **Uncertainty / reviewOwner:** exact application date and the Spanish packaging EPR registration route remain unverified. **reviewOwner:** conformity + commercial.
- **verificationStatus:** `CONSUMED_FROM_PREDECESSOR_EVIDENCE`

#### SRC-EU-RCD-2013-53 — Directive 2013/53/EU (Recreational Craft)
- **Instrument / provision examined:** RCD; scope (watercraft, designated components, propulsion engines), CE marking on the craft. | **Jurisdiction:** EU | **retrievedOn:** 2026-11-02
- **officialUrl:** https://eur-lex.europa.eu/eli/dir/2013/53/oj
- **Dates:** publication 2013-12-28; entry into force **NOT_RETRIEVED**; application **NOT_RETRIEVED** (the retrieved summary did not render them; no date is inferred).
- **Transposition status:** Transposed in Spain; national instrument not assessed in MC-14.
- **Product applicability:** all nine **N** as aftermarket electronics: not watercraft, not a designated component identified in the retrieved summary, not a propulsion engine. Re-assessment triggers: a MAREA steering system supplied pre-installed as part of a craft's equipment, or a PILOT installation that materially changes the craft's steering such that the craft's conformity could be affected.
- **Obligation:** none for an aftermarket accessory as such; the craft builder's CE obligations are unaffected.
- **Evidence required:** only if a re-assessment trigger fires.
- **Uncertainty / reviewOwner:** designated-components list not retrieved. **reviewOwner:** conformity + counsel.
- **verificationStatus:** `CONSUMED_FROM_PREDECESSOR_EVIDENCE`

#### SRC-EU-MED-2014-90 — Directive 2014/90/EU (Marine Equipment)
- **Instrument / provision examined:** MED; scope (equipment on EU-flag ships subject to international conventions), wheel-mark, notified-body modules. | **Jurisdiction:** EU | **retrievedOn:** 2026-11-02
- **officialUrl:** https://eur-lex.europa.eu/eli/dir/2014/90/oj
- **Dates:** publication 2014-08-28; entry into force **NOT_RETRIEVED**; application/transposition **NOT_RETRIEVED** (summary did not render them).
- **Transposition status:** Transposed in Spain by **RD 701/2016** (EVD-MC11-312); supplemented by RD 1837/2000 and Orden FOM/2258/2015 Annex A.1 (equipment list NOT_RETRIEVED).
- **Product applicability:** all nine **N** in the recreational-craft channel. Re-assessment triggers: professional/commercial vessel channel; installation on a ship to which the conventions apply; an item appearing on the Spanish Annex A.1 list; a pre-installed system supplied with a craft.
- **Obligation:** none today. Note: MED non-application does **not** approve the product; for PILOT it means there is no type-approval regime at all and the product-safety/liability burden is higher.
- **Evidence required:** none today.
- **Uncertainty / reviewOwner:** national equipment list not retrieved. **reviewOwner:** conformity + counsel.
- **verificationStatus:** `CONSUMED_FROM_PREDECESSOR_EVIDENCE`

#### SRC-EU-GDPR-2016-679 — Regulation (EU) 2016/679 (GDPR)
- **Instrument / provision examined:** GDPR; Arts 4 (roles), 6 (lawfulness), 13/14 (information), 28 (processor), 30 (records), 32 (security), 33/34 (breach), 35 (DPIA), 44+ (transfers). | **Jurisdiction:** EU | **retrievedOn:** 2026-11-02
- **officialUrl:** https://eur-lex.europa.eu/eli/reg/2016/679/oj
- **Dates:** 2016-05-04 / 2016-05-24 / 2018-05-25.
- **Transposition status:** Directly applicable; Spanish implementing/organic law LOPDGDD 3/2018.
- **Product applicability:** HUB **A**; WATCH **A**; FLEET **A**; NAV **A**; WEATHER **A?** (location/account data); AIS **A?**; PILOT **A?** (if vessel/crew data processed); SENSE/DISPLAY **A?**.
- **Obligation:** lawful basis, transparency, Art 28 processor agreements, records, security of processing, 72-hour breach notification, DPIA before high-risk processing, transfer safeguards; EU data residency is a design choice, not a GDPR guarantee.
- **Evidence required:** controller/processor mapping, DPAs with all processors, records of processing, DPIA, breach runbook, retention schedule, transfer assessment.
- **Uncertainty / reviewOwner:** roles for WATCH/FLEET telemetry and vessel/crew data are undecided; no Art 28 DPA exists. **reviewOwner:** dpo + counsel.
- **verificationStatus:** `CONSUMED_FROM_PREDECESSOR_EVIDENCE`

#### SRC-EU-EPRIVACY-2002-58 — Directive 2002/58/EC (ePrivacy)
- **Instrument / provision examined:** ePrivacy; Art 5(3) storage/access on terminal equipment, cookie consent rule. | **Jurisdiction:** EU | **retrievedOn:** 2026-11-02
- **officialUrl:** https://eur-lex.europa.eu/eli/dir/2002/58/oj
- **Dates:** 2002-07-31 / 2002-08-20 / 2003-10-31.
- **Transposition status:** Transposed in Spain, including LSSI 34/2002 art 22.2 for cookies.
- **Product applicability:** NAV, WEATHER, FLEET, HUB **A?** (website/app analytics, account cookies); WATCH **A?** (app/cloud); others **N?**.
- **Obligation:** prior consent after clear information for non-essential storage/access; limited strictly-necessary exemption.
- **Evidence required:** consent banner with logged choices, cookie inventory, blocking of non-essential scripts before consent.
- **Uncertainty / reviewOwner:** current site consent implementation is assessed separately by the website inventory task. **reviewOwner:** dpo.
- **verificationStatus:** `CONSUMED_FROM_PREDECESSOR_EVIDENCE`

#### SRC-EU-CRD-2011-83 — Directive 2011/83/EU (Consumer Rights)
- **Instrument / provision examined:** CRD; Arts 6/8 (pre-contract information), 9–14 (14-day withdrawal and reimbursement), 16(m) (digital content exception). | **Jurisdiction:** EU | **retrievedOn:** 2026-11-02
- **officialUrl:** https://eur-lex.europa.eu/eli/dir/2011/83/oj
- **Dates:** 2011-11-22 / 2011-12-12 / transposition 2013-12-13, applies 2014-06-13.
- **Transposition status:** Transposed in Spain in the TRLGDCU (RDL 1/2007), as amended.
- **Product applicability:** **A** for every B2C distance sale: NAV, WEATHER, HUB, AIS, SENSE, WATCH, DISPLAY, PILOT (if ever sold); FLEET **N** (B2B).
- **Obligation:** 14-day withdrawal without reason; refund all payments including standard delivery within 14 days of withdrawal; digital content exception only with express prior consent and acknowledgement of loss of the right (Art 16(m)); pre-contractual information before the order becomes binding.
- **Evidence required:** checkout consent/acknowledgement screen, withdrawal policy, refund process, pre-contract information block.
- **Uncertainty / reviewOwner:** whether the checkout flow meets Art 16(m) is not verified. **reviewOwner:** counsel + commercial.
- **verificationStatus:** `CONSUMED_FROM_PREDECESSOR_EVIDENCE`

#### SRC-EU-CSD-2019-771 — Directive (EU) 2019/771 (Sale of Goods)
- **Instrument / provision examined:** CSD; conformity, remedies, liability periods, updates obligation. | **Jurisdiction:** EU | **retrievedOn:** 2026-11-02
- **officialUrl:** https://eur-lex.europa.eu/eli/dir/2019/771/oj
- **Dates:** 2019-05-22 / 2019-06-11 / 2022-01-01 (application date **not stated in the MC-12 evidence**; recorded from the Directive's final provisions, flagged as consumed rather than re-verified).
- **Transposition status:** Transposed in Spain in the TRLGDCU; Spain applies a **3-year** legal guarantee with a **24-month** presumption that the lack of conformity existed at delivery (RDL 7/2021 changes, effective 2022-01-01).
- **Product applicability:** hardware families **A** (goods with digital elements); NAV **A?** (digital content/goods interaction); WEATHER **A?**; FLEET **N** (B2B).
- **Obligation:** conformity with the contract, remedies (repair, replacement, price reduction, termination), seller liability, duty to supply updates including security updates.
- **Evidence required:** conformity documentation, firmware/update policy, warranty process, evidence of the 3-year/24-month regime in consumer terms.
- **Uncertainty / reviewOwner:** interaction with CRA support period and with the Spanish 3-year regime needs one coherent consumer-warranty policy. **reviewOwner:** counsel + commercial.
- **verificationStatus:** `CONSUMED_FROM_PREDECESSOR_EVIDENCE`

#### SRC-EU-DCD-2019-770 — Directive (EU) 2019/770 (Digital Content and Services)
- **Instrument / provision examined:** DCD; scope (digital content/services for a price or personal data), conformity, updates, remedies, termination. | **Jurisdiction:** EU | **retrievedOn:** 2026-11-02
- **officialUrl:** https://eur-lex.europa.eu/eli/dir/2019/770/oj
- **Dates:** 2019-05-22 / 2019-06-11 / **NOT_RETRIEVED** (the retrieved EUR-Lex summary did not render the transposition/application dates; they are not asserted).
- **Transposition status:** Transposed in Spain; national instrument **NOT_RETRIEVED**.
- **Product applicability:** NAV **A** (app/subscription), WEATHER **A** (service), FLEET **A?** (B2B customers are outside consumer scope), WATCH **A?** (companion service).
- **Obligation:** conformity of digital content/services, supply of updates including security updates, remedies and termination, return/retrieval of user content, data-protection obligations on termination.
- **Evidence required:** service description and conformity criteria, update policy, termination/refund process.
- **Uncertainty / reviewOwner:** B2B/B2C classification per channel. **reviewOwner:** counsel + commercial.
- **verificationStatus:** `CONSUMED_FROM_PREDECESSOR_EVIDENCE`

#### SRC-EU-UCPD-2005-29 — Directive 2005/29/EC (Unfair Commercial Practices)
- **Instrument / provision examined:** UCPD; Arts 5–9 (unfair, misleading actions/omissions, aggressive practices), Annex I blacklist, amendments by (EU) 2019/2161 and (EU) 2024/825. | **Jurisdiction:** EU | **retrievedOn:** 2026-11-02
- **officialUrl:** https://eur-lex.europa.eu/eli/dir/2005/29/oj
- **Dates:** publication 2005-06-11; entry into force 2005-07-01; application **NOT_RETRIEVED** (summary did not render the transposition/application dates).
- **Transposition status:** Transposed in Spain by Ley 3/1991 (competencia desleal) and Ley 34/1988 (publicidad); Spanish acts **NOT_RETRIEVED**.
- **Product applicability:** all commercial communications **A**: NAV, HUB, AIS, PILOT, SENSE, WATCH, DISPLAY, WEATHER, FLEET.
- **Obligation:** no misleading actions/omissions about product characteristics, availability, benefits, price or trader commitments; no aggressive practices; green claims must meet the (EU) 2024/825 rules (generic environmental claims prohibited without recognised excellent performance; sustainability labels require certification; carbon-offset neutrality claims prohibited).
- **Evidence required:** claim substantiation file per public statement; pricing/availability evidence; review of "certified"/"approved"/"tested" wording; green-claim review.
- **Uncertainty / reviewOwner:** any claim that a product is "certified", "approved", "compliant" or "tested" without evidence is a misleading-practice risk. **reviewOwner:** counsel + commercial.
- **verificationStatus:** `CONSUMED_FROM_PREDECESSOR_EVIDENCE`

#### SRC-EU-PRICE-98-6 — Directive 98/6/EC (Price Indication)
- **Instrument / provision examined:** Price Indication Directive; selling price and unit price indication to consumers. | **Jurisdiction:** EU | **retrievedOn:** 2026-11-02
- **officialUrl:** https://eur-lex.europa.eu/eli/dir/1998/6/oj
- **Dates:** 1998-03-18 / 1998-04-07 / transposition 2000-03-18.
- **Transposition status:** Transposed in Spain; selling price to consumers is the final price including VAT and other taxes.
- **Product applicability:** every B2C price **A** (all nine lines, any consumer-facing price).
- **Obligation:** indicate the selling price (final, VAT-inclusive) and unit price where required; no misleading price reductions.
- **Evidence required:** price display incl. VAT, price history for reductions, gross-to-net model (net = gross / 1.21 at 21 %).
- **Uncertainty / reviewOwner:** reduced VAT rate treatment (10 %/4 %) is not applicable without tax counsel confirmation. **reviewOwner:** tax.
- **verificationStatus:** `CONSUMED_FROM_PREDECESSOR_EVIDENCE`

#### SRC-EU-ECOMMERCE-2000-31 — Directive 2000/31/EC (eCommerce)
- **Instrument / provision examined:** eCommerce Directive; information duties, electronic contracts, order acknowledgement, intermediary liability, country-of-origin. | **Jurisdiction:** EU | **retrievedOn:** 2026-11-02
- **officialUrl:** https://eur-lex.europa.eu/eli/dir/2000/31/oj
- **Dates:** 2000-07-17 / 2000-08-06 / application **NOT_RETRIEVED** (summary did not render it).
- **Transposition status:** Transposed in Spain by LSSI 34/2002.
- **Product applicability:** the online shop and any information-society service **A** (all product lines sold online; FLEET B2B portal as applicable).
- **Obligation:** service-provider identification, clear advertising, electronic contract steps and error correction, order acknowledgement, information on contract storage/languages, intermediary liability conditions where applicable.
- **Evidence required:** legal notice/imprint, terms and conditions, order confirmation, contract-language information.
- **Uncertainty / reviewOwner:** consumer-facing site review is the website inventory task's scope. **reviewOwner:** counsel + commercial.
- **verificationStatus:** `CONSUMED_FROM_PREDECESSOR_EVIDENCE`

#### SRC-EU-PSD2-2015-2366 — Directive (EU) 2015/2366 (PSD2)
- **Instrument / provision examined:** PSD2; strong customer authentication for remote electronic payments, limited exemptions. | **Jurisdiction:** EU | **retrievedOn:** 2026-11-02
- **officialUrl:** https://eur-lex.europa.eu/eli/dir/2015/2366/oj
- **Dates:** 2015-12-23 / 2016-01-12 / transposition 2018-01-13.
- **Transposition status:** Transposed in Spain; payment services supervised regime.
- **Product applicability:** every card payment in the shop **A** (all B2C lines); hosted/tokenised model keeps card data out of MAREA scope.
- **Obligation:** SCA for electronic remote payment transactions with limited risk-based exemptions; payment provider must host/tokenise; merchant must not store card data.
- **Evidence required:** payment-provider written schedule (does not exist), SCA flow evidence, refund/chargeback process.
- **Uncertainty / reviewOwner:** no provider schedule; SCA abandonment is unmodelled. **reviewOwner:** commercial + counsel.
- **verificationStatus:** `CONSUMED_FROM_PREDECESSOR_EVIDENCE`

#### SRC-EU-SCA-2018-389 — Commission Delegated Regulation (EU) 2018/389 (SCA RTS)
- **Instrument / provision examined:** SCA RTS; requirements for SCA, exemptions and transaction monitoring. | **Jurisdiction:** EU | **retrievedOn:** 2026-11-02
- **officialUrl:** https://eur-lex.europa.eu/eli/reg_del/2018/389/oj
- **Dates:** 2018-03-13 / 2018-03-14 / 2019-09-14.
- **Transposition status:** Directly applicable delegated regulation.
- **Product applicability:** all remote card payments **A**.
- **Obligation:** apply SCA, or a monitored risk-based exemption; secure authentication elements.
- **Evidence required:** provider integration evidence; no card data stored.
- **Uncertainty / reviewOwner:** provider schedule missing (BLK-COMM-02). **reviewOwner:** commercial.
- **verificationStatus:** `CONSUMED_FROM_PREDECESSOR_EVIDENCE`

#### SRC-EU-VAT-2006-112 — Council Directive 2006/112/EC (VAT)
- **Instrument / provision examined:** VAT Directive; place of supply (B2C/B2B), reverse charge, deduction, importation (Arts 70–71), rates. | **Jurisdiction:** EU | **retrievedOn:** 2026-11-02
- **officialUrl:** https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02006L0112-20250414
- **Dates:** 2006-12-11 / 2007-01-01 / 2007-01-01 (consolidated version used: 2025-04-14).
- **Transposition status:** Transposed in Spain (Ley 37/1992); Agencia Tributaria guidance used for the Spanish rate and OSS.
- **Product applicability:** all sales **A** (goods and services); B2C gross prices at 21 % for Spanish consumers; B2B net with reverse charge; imports need CN classification.
- **Obligation:** charge VAT at the place of supply, issue compliant invoices, deduct input VAT, account for import VAT; customs duty under the UCC remains unclassified.
- **Evidence required:** VAT registration, invoice fields, OSS registration before cross-border B2C, import/customs classification, margin model ex-VAT.
- **Uncertainty / reviewOwner:** customs duty rate per SKU is UNKNOWN; Spanish invoice regulation (RD 1619/2012, referenced in the mission but outside the sourceId vocabulary) was not retrieved. **reviewOwner:** tax + customs.
- **verificationStatus:** `CONSUMED_FROM_PREDECESSOR_EVIDENCE`

#### SRC-EU-OSS-282-2011 — Council Implementing Regulation (EU) No 282/2011 (VAT implementing measures / OSS)
- **Instrument / provision examined:** implementing measures for the VAT Directive; OSS single-return mechanics. | **Jurisdiction:** EU | **retrievedOn:** 2026-11-02
- **officialUrl:** https://eur-lex.europa.eu/eli/reg/2011/282/oj
- **Dates:** 2011-03-23 / 2011-04-12 / OSS regime from 2021-07-01.
- **Transposition status:** Directly applicable.
- **Product applicability:** cross-border B2C digital services **A** (NAV, WEATHER, FLEET where B2C, WATCH companion service).
- **Obligation:** declare and pay VAT in the Member State of consumption through OSS; a single 21 % assumption holds only for Spanish consumers.
- **Evidence required:** OSS registration, destination-rate table, per-country reporting.
- **Uncertainty / reviewOwner:** OSS not registered; no cross-border selling yet. **reviewOwner:** tax.
- **verificationStatus:** `CONSUMED_FROM_PREDECESSOR_EVIDENCE`

#### SRC-EU-EUTMR-2017-1001 — Regulation (EU) 2017/1001 (EU Trade Mark)
- **Instrument / provision examined:** EUTMR; acquisition of rights by registration, exclusive rights, relative grounds. | **Jurisdiction:** EU | **retrievedOn:** 2026-11-02
- **officialUrl:** https://eur-lex.europa.eu/eli/reg/2017/1001/oj
- **Dates:** 2017-06-16 / 2017-07-06 / 2017-10-01.
- **Transposition status:** Directly applicable; national Spanish trade-mark law coexists.
- **Product applicability:** the MAREA brand on all nine lines **A** (brand use); no right exists.
- **Obligation:** no exclusive right without registration; use of an identical/similar sign for identical/similar goods may be prohibited; clearance is a pre-publication condition.
- **Evidence required:** clearance search (EUIPO/OEPM/WIPO), filing/registration, watching; **MAREA clearance = NOT_GRANTED**.
- **Uncertainty / reviewOwner:** MC-03 verified live EUTM 018135609 "M MAREA" class 9 (apps) plus other live rights in classes 35/37; a material-conflict indication exists. No filing, no clearance. **reviewOwner:** ip (counsel).
- **verificationStatus:** `CONSUMED_FROM_PREDECESSOR_EVIDENCE`

#### SRC-EU-CE-MARKING-GUIDANCE — Commission CE marking guidance
- **Instrument / provision examined:** Commission guidance on manufacturer/importer CE-marking duties, DoC and affixing. | **Jurisdiction:** EU | **retrievedOn:** 2026-11-02
- **officialUrl:** https://single-market-economy.ec.europa.eu/sectors/electrical-and-electronic-engineering-industries-eei/ce-marking_en
- **Dates:** NOT_APPLICABLE (non-legislative guidance).
- **Transposition status:** N/A — guidance only.
- **Product applicability:** hardware families that are CE-marking acts (RED/EMC/RoHS/CRA) **A**; software products under CRA **A**; services **N**.
- **Obligation:** guidance explains DoC content, CE affixing, importer duties and market-surveillance cooperation; it does not create or discharge conformity.
- **Evidence required:** none from guidance; actual DoC, technical file and test evidence are required by the acts themselves.
- **Uncertainty / reviewOwner:** none material; guidance cannot substitute for the Acts. **reviewOwner:** conformity.
- **verificationStatus:** `CONSUMED_FROM_PREDECESSOR_EVIDENCE`

#### SRC-EU-BLUE-GUIDE-2022 — Commission Notice "Blue Guide" 2022 (2022/C 247/01)
- **Instrument / provision examined:** Commission guidance on the implementation of EU product rules (scope not re-read; no rule quoted). | **Jurisdiction:** EU | **retrievedOn:** 2026-11-02
- **officialUrl:** https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52022XC0629(04)
- **Dates:** publication 2022-06-29; entry into force/application NOT_APPLICABLE (guidance).
- **Transposition status:** N/A — guidance only.
- **Product applicability:** would inform the CE-marking framework for HUB/AIS/WATCH/DISPLAY/SENSE/PILOT and the CRA software product; **not relied on** in this dossier.
- **Obligation:** none directly; guidance.
- **Evidence required:** none.
- **Uncertainty / reviewOwner:** **NOT_RETRIEVED** — the full text was not fetched this session; the official OJ reference was confirmed only via a search index. Do not cite Blue Guide passages until retrieved. **reviewOwner:** conformity.
- **verificationStatus:** `NOT_RETRIEVED`

### Spanish instruments

#### SRC-ES-TRLGDCU-RDL-1-2007 — Real Decreto Legislativo 1/2007 (TRLGDCU)
- **Instrument / provision examined:** TRLGDCU; Book II Title V (guarantees and after-sales), the distance-contract rules and Book III (liability for defective products). Article numbers of the RDL 7/2021 amendment were **not re-read**; no article number is quoted for the 3-year/24-month parameters. | **Jurisdiction:** Spain | **retrievedOn:** 2026-11-02
- **officialUrl:** https://www.boe.es/buscar/act.php?id=BOE-A-2007-20555
- **Dates:** publication 2007-11-30 / entry into force 2007-12-01 / **3-year legal guarantee and 24-month presumption since 2022-01-01** (RDL 7/2021; consumed from MC-12 LT-008).
- **Transposition status:** Spanish consumer code; transposes CRD 2011/83 and CSD 2019/771 and implements Directive 85/374/EEC (to be replaced by 2024/2853 transposition, not retrieved).
- **Product applicability:** **A** for every B2C sale (NAV, WEATHER, HUB, AIS, SENSE, WATCH, DISPLAY, PILOT); **N** for B2B/FLEET contracts, where consumer law does not apply.
- **Obligation:** legal guarantee of conformity for 3 years; presumption that a lack of conformity existed at delivery for 24 months; repair/replacement/price reduction/refund; pre-contractual information; unfair terms control.
- **Evidence required:** consumer terms stating the 3-year guarantee and 24-month presumption, remedy process, warranty records, compliant pre-contract information.
- **Uncertainty / reviewOwner:** consolidated BOE text and the exact RDL 7/2021 article numbers were not re-read this session; the 36-month warranty reserve in MC-12 remains an assumption, not a measured reserve. **reviewOwner:** counsel + commercial.
- **verificationStatus:** `PARTIALLY_VERIFIED`

#### SRC-ES-LSSI-34-2002 — Ley 34/2002 (LSSI)
- **Instrument / provision examined:** LSSI; information-society service duties, electronic contracting, **art 22.2 cookie consent**. | **Jurisdiction:** Spain | **retrievedOn:** 2026-11-02
- **officialUrl:** https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758
- **Dates:** 2002-07-12 / 2002-10-12 / 2002-10-12.
- **Transposition status:** Spanish transposition of Directive 2000/31/EC and of ePrivacy art 5(3) for cookies.
- **Product applicability:** the public website and any information-society service **A**; online shop **A**.
- **Obligation:** provider identification, information duties, electronic contract rules, cookie consent (art 22.2) with information and prior consent for non-essential cookies.
- **Evidence required:** legal notice, cookie banner and consent log, terms.
- **Uncertainty / reviewOwner:** current site implementation is audited by the website inventory task. **reviewOwner:** dpo + counsel.
- **verificationStatus:** `PARTIALLY_VERIFIED`

#### SRC-ES-LOPDGDD-3-2018 — Ley Orgánica 3/2018 (LOPDGDD)
- **Instrument / provision examined:** none retrieved — no article examined. | **Jurisdiction:** Spain | **retrievedOn:** 2026-11-02
- **officialUrl:** https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673
- **Dates:** publication 2018-12-06 / entry into force 2018-12-07 / application 2018-12-07 — **these date fields were NOT re-read from the BOE consolidated text** and are carried only as the official BOE identifier confirms the act; treat as provisional until the text is read.
- **Transposition status:** Spanish organic law implementing/adapting GDPR matters and digital-rights guarantees.
- **Product applicability:** **A?** for the same processing as GDPR (HUB, WATCH, NAV, FLEET, WEATHER account/telemetry); articles not assessed.
- **Obligation:** not quoted.
- **Evidence required:** not established from this source.
- **Uncertainty / reviewOwner:** **NOT_RETRIEVED** — the consolidated text was not fetched; no Spanish-specific digital-rights obligation is asserted. **reviewOwner:** dpo + counsel.
- **verificationStatus:** `NOT_RETRIEVED`

#### SRC-ES-LGT-11-2022 — Ley 11/2022, General de Telecomunicaciones
- **Instrument / provision examined:** LGT; spectrum use and radio authorisation framework (as recorded in MC-12 LT-022). Specific articles were **not re-read**. | **Jurisdiction:** Spain | **retrievedOn:** 2026-11-02
- **officialUrl:** https://www.boe.es/buscar/act.php?id=BOE-A-2022-10757
- **Dates:** publication 2022-06-29 / entry into force **NOT_RETRIEVED** / application **NOT_RETRIEVED**.
- **Transposition status:** Spanish general telecommunications law (framework for spectrum and radio equipment use).
- **Product applicability:** AIS **A** (as a constraint: reception only; transmission not authorised); WATCH **A?** (if sold with its own connectivity service); HUB **A?** (cellular option); NAV/WEATHER/FLEET **N** (no radio use).
- **Obligation:** use of radio spectrum requires a legal title; AIS transmission is not an authorised MAREA offering; AIS receive-only wording must not imply transmission.
- **Evidence required:** none for receive-only operation; any transmission feature is BLOCKED (HB-01).
- **Uncertainty / reviewOwner:** specific LGT articles/authorisation routes not retrieved. **reviewOwner:** counsel + commercial.
- **verificationStatus:** `CONSUMED_FROM_PREDECESSOR_EVIDENCE`

#### SRC-ES-RD-188-2016 — Real Decreto 188/2016 (Spanish RED transposition)
- **Instrument / provision examined:** RD 188/2016, Art 1(2) definition of radio equipment, Art 9(7) manufacturer identification, **Art 9(8) instructions and safety information in Spanish**, Art 11 importer duties, Annexes V–VI (technical file and DoC). | **Jurisdiction:** Spain | **retrievedOn:** 2026-11-02
- **officialUrl:** https://www.boe.es/buscar/act.php?id=BOE-A-2016-4444
- **Dates:** publication 2016-05-10 / entry into force 2016-06-13 (chapters IV–V the day after publication) / application 2016-06-13. Consolidated text last updated **2026-03-13** (a 2026 amending instrument exists; it was **not identified or retrieved** in this session).
- **Transposition status:** Transposes Directive 2014/53/EU and, for EMC enforcement/notification/market-surveillance parts, Directive 2014/30/EU.
- **Product applicability:** HUB **A?**, AIS **A**, WATCH **A**, DISPLAY **A?**, SENSE **A?** (radio variants); PILOT/NAV/WEATHER/FLEET **N**.
- **Obligation (verified wording):** Art 9(8) requires the instructions and safety information to be drawn up **"en una lengua fácilmente comprensible para los consumidores y otros usuarios finales y, al menos en castellano, si se pone el equipo en el mercado español"**. Manufacturers must also provide name/address contact details in an easily understood language (Art 9(7)); importers must ensure instructions and safety information in Spanish or an easily understood language (Art 11(4)); the EU DoC must be in Spanish when the equipment is placed on the Spanish market.
- **Evidence required:** Spanish-language instructions and safety information as a conformity input (not a marketing preference); Spanish DoC; technical file; CE marking with notified-body number where involved.
- **Uncertainty / reviewOwner:** the 2026 amendment to RD 188/2016 was not retrieved; the consolidated text may have changed after 2026-03-13. **reviewOwner:** conformity + counsel.
- **verificationStatus:** `VERIFIED_THIS_SESSION`

#### SRC-ES-RD-186-2016 — Real Decreto 186/2016 (Spanish EMC transposition)
- **Instrument / provision examined:** identification, title and subject only (via the official cross-reference in RD 188/2016 Art 1(4) and the BOE ELI locator); no article read. | **Jurisdiction:** Spain | **retrievedOn:** 2026-11-02
- **officialUrl:** https://www.boe.es/eli/es/rd/2016/05/06/186
- **Dates:** publication 2016-05-10 / entry into force **NOT_RETRIEVED** / application **NOT_RETRIEVED**.
- **Transposition status:** Spanish transposition of Directive 2014/30/EU (EMC).
- **Product applicability:** PILOT and wired SENSE **A**; radio variants **N** (RED governs).
- **Obligation:** EMC essential requirements for apparatus; no article quoted.
- **Evidence required:** EMC test evidence and DoC if the product is governed by EMC.
- **Uncertainty / reviewOwner:** standalone consolidated text not read; BOE-A identifier `BOE-A-2016-4442` is inferred from the ELI locator and should be confirmed before citation. **reviewOwner:** conformity.
- **verificationStatus:** `NOT_RETRIEVED`

#### SRC-ES-RD-187-2016 — Real Decreto 187/2016 (Spanish LVD transposition)
- **Instrument / provision examined:** identification, title and subject only; confirmed to transpose Directive 2014/35/EU (BOE-A-2016-4443). | **Jurisdiction:** Spain | **retrievedOn:** 2026-11-02
- **officialUrl:** https://www.boe.es/eli/es/rd/2016/05/06/187
- **Dates:** publication 2016-05-10 / entry into force **NOT_RETRIEVED** / application **NOT_RETRIEVED**.
- **Transposition status:** Spanish transposition of Directive 2014/35/EU (LVD).
- **Product applicability:** all nine **N** today (12 V DC); flips only if a mains PSU/charger is placed on the market under MAREA's name.
- **Obligation:** LVD safety objectives for equipment within 50–1000 V AC / 75–1500 V DC; no article quoted.
- **Evidence required:** PSU safety evidence only in the bundled-PSU scenario.
- **Uncertainty / reviewOwner:** standalone text not read; article numbers not asserted. **reviewOwner:** conformity.
- **verificationStatus:** `CONSUMED_FROM_PREDECESSOR_EVIDENCE`

#### SRC-ES-LCD-3-1991 — Ley 3/1991 (Competencia Desleal)
- **Instrument / provision examined:** none retrieved. | **Jurisdiction:** Spain | **retrievedOn:** 2026-11-02
- **officialUrl:** https://www.boe.es/eli/es/l/1991/01/10/3
- **Dates:** NOT_RETRIEVED / NOT_RETRIEVED / NOT_RETRIEVED.
- **Transposition status:** Spanish unfair-competition law (B2B and B2C); it also transposes part of the UCPD field.
- **Product applicability:** commercial conduct and comparative claims **A?** (all lines); not assessed.
- **Obligation:** not quoted.
- **Evidence required:** not established.
- **Uncertainty / reviewOwner:** **NOT_RETRIEVED** — consolidated text not fetched. **reviewOwner:** counsel.
- **verificationStatus:** `NOT_RETRIEVED`

#### SRC-ES-LGP-34-1988 — Ley 34/1988 (General de Publicidad)
- **Instrument / provision examined:** none retrieved. | **Jurisdiction:** Spain | **retrievedOn:** 2026-11-02
- **officialUrl:** https://www.boe.es/eli/es/l/1988/11/11/34
- **Dates:** NOT_RETRIEVED / NOT_RETRIEVED / NOT_RETRIEVED.
- **Transposition status:** Spanish advertising law; unlawful advertising and claim rules.
- **Product applicability:** advertising and claims **A?** (all lines); not assessed.
- **Obligation:** not quoted.
- **Evidence required:** not established.
- **Uncertainty / reviewOwner:** **NOT_RETRIEVED** — consolidated text not fetched. **reviewOwner:** counsel.
- **verificationStatus:** `NOT_RETRIEVED`

#### SRC-ES-PRODUCER-REGISTER — MITECO Registro de Productores de Producto (RPP)
- **Instrument / provision examined:** RPP registration mechanics and annual reporting window (as recorded in MC-11 EVD-MC11-318). | **Jurisdiction:** Spain | **retrievedOn:** 2026-11-02
- **officialUrl:** https://www.miteco.gob.es/es/calidad-y-evaluacion-ambiental/temas/prevencion-y-gestion-residuos/flujos/productos/
- **Dates:** NOT_APPLICABLE (administrative register); annual reporting window for the preceding year's placed products **2 January – 2 April** (2026 window verified in predecessor evidence).
- **Transposition status:** Spanish producer-responsibility register covering packaging and other flows.
- **Product applicability:** every packaged hardware SKU **A**; software/services **N**.
- **Obligation:** register as producer before placing products on the market; declare put-on-market quantities annually; finance collection/recycling; registration number format `SEC/AÑO REGISTRO/XXXXXXXXX`.
- **Evidence required:** RPP registration number, annual declarations, EPR scheme participation.
- **Uncertainty / reviewOwner:** **no EMBARCARTE/MAREA registration exists**; the WEEE-specific register (RII-AEE) was not retrieved. **reviewOwner:** conformity + commercial.
- **verificationStatus:** `CONSUMED_FROM_PREDECESSOR_EVIDENCE`

#### SRC-ES-AEPD-DPIA — AEPD DPIA guidance
- **Instrument / provision examined:** none retrieved. | **Jurisdiction:** Spain | **retrievedOn:** 2026-11-02
- **officialUrl:** https://www.aepd.es/derechos-y-deberes/cumple-tus-deberes/medidas-de-cumplimiento/realizacion-de-evaluaciones-de-impacto-de-proteccion-de-datos
- **Dates:** NOT_APPLICABLE (guidance).
- **Transposition status:** supervisory-authority guidance, not law.
- **Product applicability:** WATCH, FLEET, NAV, HUB **A?** (DPIA likely; prior consultation possible).
- **Obligation:** none quoted; DPIA conclusions in this dossier rest on GDPR Art 35 only.
- **Evidence required:** DPIA before processing; AEPD prior consultation if residual risk remains high.
- **Uncertainty / reviewOwner:** **INACCESSIBLE** — page failed to load on 2026-11-02 (HTTP 404 recorded in MC-12). AEPD consultation remains outstanding. **reviewOwner:** dpo + counsel.
- **verificationStatus:** `INACCESSIBLE`

#### SRC-ES-IHM-CHART-LICENSING — Instituto Hidrográfico de la Marina (IHM) chart/ENC licensing
- **Instrument / provision examined:** none retrieved. | **Jurisdiction:** Spain | **retrievedOn:** 2026-11-02
- **officialUrl:** https://www.armada.mde.es/ihm/ (attempted; HTTP 404)
- **Dates:** NOT_APPLICABLE.
- **Transposition status:** official hydrographic office; licensing of official nautical charts/ENC data (S-57/S-63 and S-100 family context) is contractual.
- **Product applicability:** NAV **A?** (charts), HUB/DISPLAY **A?** (chart display), WEATHER **A?** (if chart overlays); none holds a licence today.
- **Obligation:** none established; chart redistribution requires a licence from the data owner; ENC S-63 distribution is protected by IHO scheme membership and user permits.
- **Evidence required:** written licence(s) for any chart/ENC data; no such licence exists.
- **Uncertainty / reviewOwner:** **INACCESSIBLE** — the IHM portal returned HTTP 404 this session; no official IHM licensing page was retrieved. Chart-data rights remain **NOT_VERIFIED** and no clearance is claimed. **reviewOwner:** counsel + commercial.
- **verificationStatus:** `INACCESSIBLE`

#### SRC-ES-AUTORIDAD-CONSUMIDOR — Spanish consumer authority / Centro Europeo del Consumidor España
- **Instrument / provision examined:** official consumer information on guarantees (as recorded in MC-12 LT-008). | **Jurisdiction:** Spain | **retrievedOn:** 2026-11-02
- **officialUrl:** https://portal-cec.consumo.gob.es/
- **Dates:** NOT_APPLICABLE (institutional information).
- **Transposition status:** official consumer-information and enforcement context; not a source of obligations itself.
- **Product applicability:** B2C sales **A** (all lines).
- **Obligation:** none directly; confirms the 3-year guarantee and 24-month presumption published by the official consumer body.
- **Evidence required:** none beyond consumer-law compliance evidence.
- **Uncertainty / reviewOwner:** no complaint, inspection or authority action exists. **reviewOwner:** commercial + counsel.
- **verificationStatus:** `NOT_IN_GOVERNED_REGISTER` (considered only; see membership note)

### Private / standards-body records

#### SRC-NMEA-2000-LICENSING — NMEA 2000 licensing
- **Instrument / provision examined:** official NMEA 2000 page — trademark notice, licence tiers, manufacturer code, no online sale. | **Jurisdiction:** private standards body (US) | **retrievedOn:** 2026-11-02
- **officialUrl:** https://www.nmea.org/nmea-2000.html
- **Dates:** NOT_APPLICABLE (contractual licensing).
- **Transposition status:** private licence, not law and not a regulatory approval.
- **Product applicability:** HUB, AIS, DISPLAY, SENSE, PILOT, WATCH **A?** where NMEA 2000 connectivity is a product claim; NAV **N?** (software may use licensed protocol data only under a licence).
- **Obligation:** a licence is required to use the NMEA 2000 standard and marks; every manufacturer must purchase a Manufacturer Code (assignment up to 60 days) and product codes; the standard is copyrighted and not sold via an online store; tiered fees apply by industry group (fees not reproduced here).
- **Evidence required:** signed NMEA licence, manufacturer code, product code, certification file.
- **Uncertainty / reviewOwner:** **MAREA holds no NMEA licence, no manufacturer code and no product code.** Whether a receive-only/decoder product must license NMEA 2000 depends on whether it reads NMEA 2000 data — counsel/standards review required. **reviewOwner:** ip + commercial.
- **verificationStatus:** `CONSUMED_FROM_PREDECESSOR_EVIDENCE`

#### SRC-NMEA-0183 — NMEA 0183 standard
- **Instrument / provision examined:** official NMEA 0183 page — copyright, purchase process, version 4.30, manufacturer mnemonic code. | **Jurisdiction:** private standards body (US) | **retrievedOn:** 2026-11-02
- **officialUrl:** https://www.nmea.org/nmea-0183.html
- **Dates:** NOT_APPLICABLE (contractual licensing); latest version 4.30 published December 2023.
- **Transposition status:** private standard, not law.
- **Product applicability:** HUB, AIS, DISPLAY, SENSE **A?** where NMEA 0183 sentences are read/parsed; PILOT/NAV **N?**.
- **Obligation:** NMEA 0183 is a copyrighted document available only from NMEA; use of the standard and manufacturer mnemonic codes requires purchase/administrative fee; no certification programme for 0183 is stated on the page (unlike NMEA 2000).
- **Evidence required:** purchase record for the standard, manufacturer mnemonic code USD 200 + standard purchase (price as published on 2026-11-02).
- **Uncertainty / reviewOwner:** parsing public NMEA 0183 sentences from third-party equipment is a separate IP question that requires counsel. **reviewOwner:** ip + counsel.
- **verificationStatus:** `CONSUMED_FROM_PREDECESSOR_EVIDENCE`

#### SRC-NMEA-CERTIFICATION — NMEA 2000 product certification
- **Instrument / provision examined:** official NMEA 2000 certification and logo rules. | **Jurisdiction:** private standards body (US) | **retrievedOn:** 2026-11-02
- **officialUrl:** https://www.nmea.org/nmea-2000.html
- **Dates:** NOT_APPLICABLE (contractual certification).
- **Transposition status:** private certification scheme; **not** a CE mark, type approval or regulatory approval.
- **Product applicability:** HUB, AIS, DISPLAY, SENSE, PILOT, WATCH **A?** where an "NMEA 2000 Certified" claim is desired.
- **Obligation:** all products that read or transmit NMEA 2000 information must be certified based on the NMEA 2000 License Agreement; certification file validated by NMEA; only then may the logo and the term "NMEA 2000 Certified" be used.
- **Evidence required:** NMEA certification grant, logo approval; **NMEA2000_CERTIFIED = false** today.
- **Uncertainty / reviewOwner:** no MAREA product has been submitted, so no certification exists and no claim is permitted. **reviewOwner:** conformity + commercial.
- **verificationStatus:** `CONSUMED_FROM_PREDECESSOR_EVIDENCE`

#### SRC-EUIPO-MAREA-SEARCH — EUIPO MAREA search
- **Instrument / provision examined:** EUIPO register search interfaces; MC-03 verified records by record number. | **Jurisdiction:** EU | **retrievedOn:** 2026-11-02 (record evidence dated 2026-10-30)
- **officialUrl:** https://euipo.europa.eu/eSearch/
- **Dates:** NOT_APPLICABLE.
- **Transposition status:** official register; **no clearance granted**.
- **Product applicability:** MAREA brand on all nine lines **A** (clearance question).
- **Obligation:** none directly; registration creates the right.
- **Evidence required:** name-search clearance; live EUTM 018135609 "M MAREA" class 9 (mobile apps) and EUTM 015190655 classes 35/37 verified in MC-03; material-conflict indication.
- **Uncertainty / reviewOwner:** **INACCESSIBLE** for automated name search (SPA/bot challenge); only record-number lookups worked. **MAREA clearance = NOT_GRANTED.** **reviewOwner:** ip.
- **verificationStatus:** `INACCESSIBLE`

#### SRC-OEPM-MAREA-SEARCH — OEPM MAREA search
- **Instrument / provision examined:** none retrieved (register unreachable). | **Jurisdiction:** Spain | **retrievedOn:** 2026-11-02 (MC-03 date 2026-10-30)
- **officialUrl:** https://www.oepm.es/es/
- **Dates:** NOT_APPLICABLE.
- **Transposition status:** official Spanish register; **no clearance granted**.
- **Product applicability:** MAREA brand in Spain **A** (clearance question).
- **Obligation:** none directly.
- **Evidence required:** Spanish name search before filing/use; not obtained.
- **Uncertainty / reviewOwner:** **INACCESSIBLE** — every OEPM Localizador/BOPI route returned HTTP 404 in MC-03; the Spanish register was **not** name-searched. No availability conclusion is possible. **reviewOwner:** ip.
- **verificationStatus:** `INACCESSIBLE`

#### SRC-WIPO-GLOBAL-BRAND-DB — WIPO Global Brand Database / Madrid Monitor
- **Instrument / provision examined:** official international register search. | **Jurisdiction:** International | **retrievedOn:** 2026-11-02 (MC-03 date 2026-10-30)
- **officialUrl:** https://branddb.wipo.int/
- **Dates:** NOT_APPLICABLE.
- **Transposition status:** official register; **no clearance granted**.
- **Product applicability:** MAREA international **A?** (clearance question; target markets are ES/PT/EU).
- **Obligation:** none directly.
- **Evidence required:** name search; not obtained. MC-03 verified IR 1632684 and IR 1847368 by IRN (no EU/ES/PT designation).
- **Uncertainty / reviewOwner:** **INACCESSIBLE** — bot verification and terms prohibiting automated querying. **reviewOwner:** ip.
- **verificationStatus:** `NOT_IN_GOVERNED_REGISTER` (considered only; see membership note)

#### SRC-IEC-60945 — IEC 60945 (maritime navigation and radiocommunication equipment)
- **Instrument / provision examined:** scope only (via standards index, not the official text). | **Jurisdiction:** private international standard | **retrievedOn:** 2026-11-02
- **officialUrl:** https://webstore.iec.ch/en/search?query=IEC%2060945
- **Dates:** publication 2002-08-13 (edition 4) / entry into force NOT_APPLICABLE / application NOT_APPLICABLE.
- **Transposition status:** private standard; not law; no harmonised-standard citation verified in the OJEU.
- **Product applicability:** HUB, AIS, DISPLAY, WATCH, SENSE **A?** as a candidate technical standard for maritime environmental/EMC requirements; not a legal obligation.
- **Obligation:** none by itself; would become relevant if cited as a harmonised standard or imposed contractually.
- **Evidence required:** standard purchase, test laboratory campaign (NOT_EXECUTED).
- **Uncertainty / reviewOwner:** **NOT_RETRIEVED** — the official IEC text was not purchased or fetched; the scope statement comes from a standards index and is not quoted as IEC text. Whether IEC 60945 is the applicable harmonised standard for any MAREA SKU is unresolved. **reviewOwner:** conformity.
- **verificationStatus:** `NOT_IN_GOVERNED_REGISTER` (considered only; see membership note)

#### SRC-ISO-16315 — ISO 16315 (small craft electrical systems) — considered and excluded
- **Instrument / provision examined:** scope checked to decide relevance. | **Jurisdiction:** private international standard | **retrievedOn:** 2026-11-02
- **officialUrl:** https://www.iso.org/search.html?q=ISO%2016315
- **Dates:** ISO 16315:2026 publication 2026-02-06 / entry into force NOT_APPLICABLE / application NOT_APPLICABLE.
- **Transposition status:** private standard; not law.
- **Product applicability:** all nine **N** — **excluded as not relevant**. ISO 16315:2026 covers electrical systems used for electrical propulsion in small craft (DC < 1500 V, single-phase AC ≤ 1000 V, craft up to 24 m LH). It does not govern marine electronics data, NMEA, chart or AIS functions. It would only become relevant if MAREA supplied an electric-propulsion system, which it does not.
- **Obligation:** none for the current portfolio.
- **Evidence required:** none.
- **Uncertainty / reviewOwner:** **NOT_RETRIEVED** (official ISO text not fetched); exclusion is documented so that no future artefact cites ISO 16315 as a MAREA requirement. **reviewOwner:** conformity.
- **verificationStatus:** `NOT_IN_GOVERNED_REGISTER` (considered only; see membership note)

---

## §3 Spanish transposition / implementation matrix

| Union act / topic | Spanish transposition or implementation | Instrument / BOE reference | Status in this dossier | MAREA consequence |
|---|---|---|---|---|
| RED 2014/53/EU | Real Decreto 188/2016 | BOE-A-2016-4444; in force 2016-06-13 | RE_VERIFIED (Art 9(8) Spanish-language duty) | ES instructions/DoC must be in Spanish; radio variants need RED conformity |
| EMC 2014/30/EU | Real Decreto 186/2016 | BOE-A-2016-4442 (ELI locator); 2016-05-10 | RE_VERIFIED (identification only) | PILOT and wired SENSE are EMC apparatus |
| LVD 2014/35/EU | Real Decreto 187/2016 | BOE-A-2016-4443; 2016-05-10 | RE_VERIFIED (identification only) | Only a bundled mains PSU would trigger LVD |
| GPSR 2023/988 | Directly applicable; no transposition | — | RE_VERIFIED (EU) | Residual safety duties, Art 19 online listing duties |
| RoHS 2011/65/EU | Spanish RoHS instrument | **NOT_RETRIEVED** | NOT_RETRIEVED | Material declarations still required for CE |
| WEEE 2012/19/EU | RII-AEE producer register | **NOT_RETRIEVED** | NOT_RETRIEVED (MC-11 CON-09) | Producer registration/take-back financing |
| Batteries 2023/1542 | Directly applicable + producer register | RPP (MITECO) | CONSUMED (EVD-MC11-318) | Removability by 2027; labelling 2026; QR 2027 |
| Packaging 2025/40 | Directly applicable + producer register | RPP (MITECO) | CONSUMED (EVD-MC11-318) | Packaging EPR and packaging DoC |
| RCD 2013/53/EU | Spanish recreational-craft regime | **NOT_RETRIEVED** | CONSUMED (EU scope only) | Aftermarket electronics outside scope |
| MED 2014/90/EU | Real Decreto 701/2016 (+ RD 1837/2000, Orden FOM/2258/2015) | EVD-MC11-312; equipment list NOT_RETRIEVED | CONSUMED | Not applicable to recreational-craft aftermarket |
| GDPR 2016/679 | LOPDGDD 3/2018; AEPD | BOE-A-2018-16673 (text NOT_RETRIEVED); AEPD DPIA page INACCESSIBLE | PARTIAL | Controller/processor roles and DPIA still open |
| ePrivacy 2002/58 | LSSI 34/2002 art 22.2 (+ other rules) | BOE-A-2002-13758 | CONSUMED | Cookie consent on the site |
| CRD 2011/83 | TRLGDCU (RDL 1/2007) | BOE-A-2007-20555 | CONSUMED | 14-day withdrawal, refunds, consent screen |
| CSD 2019/771 | TRLGDCU (as amended by RDL 7/2021) | BOE-A-2007-20555 | CONSUMED | 3-year guarantee + 24-month presumption |
| DCD 2019/770 | Spanish transposition | **NOT_RETRIEVED** | PARTIAL (EU summary only) | Digital content/service conformity and updates |
| UCPD 2005/29 | Ley 3/1991 + Ley 34/1988 | BOE ELI locators (texts NOT_RETRIEVED) | PARTIAL | Claims must be substantiated; green claims restricted |
| Price Indication 98/6 | Spanish price-indication rules; AEAT | MC-12 LT-002 | CONSUMED | VAT-inclusive final prices |
| eCommerce 2000/31 | LSSI 34/2002 | BOE-A-2002-13758 | CONSUMED | Legal notice, electronic contracting |
| PSD2 / SCA | Spanish payment-services transposition | **NOT_RETRIEVED** (provider schedule missing) | CONSUMED (EU rules only) | Hosted/tokenised checkout; SCA flow |
| VAT 2006/112 + OSS | Ley 37/1992; Agencia Tributaria OSS | MC-12 LT-001/003/004/006 | CONSUMED | 21 %; OSS; import VAT; duty UNKNOWN |
| EUTMR 2017/1001 | EUIPO; Spanish trade-mark law | MC-03 / MC-12 LT-024 | CONSUMED | MAREA clearance NOT_GRANTED |
| CRA 2024/2847 | Directly applicable; no transposition | — | RE_VERIFIED (EU) | Reporting live; main obligations 2027-12-11 |
| PLD 2024/2853 | Spanish transposition due 2026-12-09 | **NOT_RETRIEVED** | NOT_RETRIEVED | No-fault liability from products placed after 2026-12-08 |
| AIS / spectrum | Ley 11/2022 (LGT) | BOE-A-2022-10757 | CONSUMED (MC-12 LT-022) | Receive-only only; no transmission authorised |
| NMEA licensing/certification | Private contract (NMEA) | nmea.org pages | RE_VERIFIED | No licence, no manufacturer/product code, no certification |

---

## §4 Mandatory-currency findings

### 4.1 CRA 2024/2847
- Entry into force **2024-12-10**; **reporting from 2026-09-11** (Art 14; 24 h early warning, 72 h notification, final report 14 days after a corrective measure or one month after the 72-h notification); **main obligations from 2027-12-11** (Article 71 (dossier correction 2026-11-02) + predecessor EVD-MC11-301/303).
- **Support period (Art 13(8), exact wording verified):** the manufacturer determines a support period reflecting expected use; **"the support period shall be at least five years"**; where the product is expected to be in use for less than five years, the support period corresponds to that expected use time. Art 13(9): security updates remain available **at least 10 years or the remainder of the support period, whichever is longer**. The MC-12 summary ("shorter only if expected use is shorter") is correct.
- **Classification:** Annex III holds "important" products in **classes I and II**; Annex IV holds "critical" products; conformity assessment route depends on class (internal control for default products; third-party modules B+C or H for important/critical). Recital 256 gives firewalls and intrusion detection/prevention systems as class II examples. Whether HUB (gateway/router-like) is class II is **not determined** and requires Implementing Regulation (EU) 2025/2392 plus counsel.
- **CE marking / DoC:** CRA is a CE-marking act (Art 13(12)); DoC per Art 28, CE per Art 30. No DoC or CE mark exists.
- **Open source / software:** FOSS supplied in the course of a commercial activity is in scope; non-monetised FOSS and open-source stewards have a lighter regime (recitals 17–19); Art 13(5) requires due diligence on third-party components (including FOSS) and Art 13(6) requires reporting vulnerabilities upstream. A software-only product (NAV) is in scope.
- **Transitional provision (Art 69):** **NOT_RETRIEVED** in the fetched OJ excerpt; it is not quoted. Predecessor evidence records the phased dates, which are independently corroborated by Article 71 (dossier correction 2026-11-02).
- **Correction to carry forward:** the mission brief says "reporting obligations from 2026-09-11". As at 2026-11-02 those obligations are **already applicable** to products placed on the market; MAREA has placed none, so no report is due, but readiness is immediate.

### 4.2 PLD 2024/2853
- **Verified corrigendum:** *Corrigendum to Directive (EU) 2024/2853*, OJ L, 2026/90364, **2026-05-07**, CELEX `32024L2853R(01)`. It replaces Art 2(1): the Directive applies to products placed on the market or put into service **after 8 December 2026** (the original OJ text said after 9 December 2026). This is the "May 2026 corrigendum" the mission asked to identify — **it exists and is verified**.
- **Dates:** publication 2024-11-18; entry into force 2024-12-08; **transposition by 2026-12-09** (Art 22); repeal of Directive 85/374/EEC with effect from 2026-12-09 (Art 21), which continues to apply to products placed before that date. There is no separate "application date" other than the Art 2(1) rule as corrected.
- **Scope:** products include **software** and **digital manufacturing files**; related digital services within the manufacturer's control can be components; destruction/corruption of data is compensable; pure economic loss, privacy infringements and discrimination do not by themselves trigger liability.
- **Liable operators (Art 8):** manufacturer; component manufacturer; importer; authorised representative; fulfilment service provider where no EU importer/representative; substantial modifiers; distributors as fallback if they fail to identify an EU operator within one month; online platforms in the Art 6(3) DSA conditions.
- **No-fault / defect rules:** defectiveness measured against the safety the public is entitled to expect (including cybersecurity vulnerabilities and failure to provide safety updates); exemptions include development risk, compliance with legal requirements and non-placement; 3-year limitation (Art 16) and 10-year expiry (Art 17; 25 years for latent personal injury).
- **Spanish interaction:** TRLGDCU Book III implemented Directive 85/374/EEC; the Spanish transposition of 2024/2853 is **NOT_RETRIEVED** and due by 2026-12-09. This is a hard gap: no Spanish-language implementing text can be cited today.

### 4.3 RED 2014/53/EU and the cybersecurity regime change
- RED published 2014-05-22, in force 2014-06-11, applies 2016-06-13; transitional ended 2017-06-12 (Art 48).
- **Delegated Regulation (EU) 2022/30** (OJ L 7, 12.1.2022) activates RED Art 3(3)(d)(e)(f) for internet-connected radio equipment, childcare/toys and wearables. **Verified application history:** the published 2022/30 text states application from **2024-08-01**; the consolidated version (27/10/2023) postpones it to **2025-08-01**; Delegated Regulation (EU) 2026/339 recital 2 confirms the requirements **applied from 1 August 2025**.
- **Correction to carry forward:** the mission brief's "from 2025-02-01" is **not supported** by the OJ text. Any artefact stating 2025-02-01 must be corrected to 2025-08-01.
- **Delegated Regulation (EU) 2026/339** (adopted 2026-02-16; OJ L 2026/339, **2026-04-29**) repeals 2022/30 **with effect from 2027-12-11**; it entered into force 2026-05-19. From 2027-12-11 the CRA carries the cybersecurity requirements; equipment placed on the market between 2025-08-01 and 2027-12-10 remains subject to RED market surveillance for Art 3(3)(d)(e)(f).
- **AIS:** receive-only AIS equipment is still radio equipment under the RED (intentional receiver), so RED conformity applies; AIS **transmission** is not authorised for MAREA (HB-01).
- **Spanish transposition:** RD 188/2016 Art 9(8) requires instructions and safety information **at least in Spanish (castellano)** when placed on the Spanish market — MC-11 open question L2 is now **closed in the affirmative** (subject to the 2026-03-13 consolidated-text update not being read).

### 4.4 GPSR 2023/988
- Published 2023-05-23; in force 2023-06-12; **applies from 2024-12-13** (Art 52, verified in the OJ text; the EUR-Lex summary's blank date field is a rendering artefact).
- Consolidated version current as at **2026-05-29** (the OJ page states "In force: This act has been changed. Current consolidated version: 29/05/2026").
- Complements product-specific harmonised law for residual risks and aspects; **Art 19** verified: distance/online offers must clearly and visibly indicate at least the manufacturer's or responsible person's identity and contact details, a clear product description, and warnings/safety information.
- Manufacturer duties: risk analysis, technical documentation, traceability, complaints register, accident notification, corrective action/recall with at least two remedies; responsible EU economic operator required.
- GPSR does **not** require CE marking and does not certify; it is the residual product-safety framework (decisive for PILOT, where no type-approval regime exists).

### 4.5 Consumer law
- **CRD 2011/83:** 14-day withdrawal, refund within 14 days including standard delivery; digital-content exception only with express consent and acknowledgement (Art 16(m)) — predecessor evidence MC-12 LT-009/010.
- **CSD 2019/771:** conformity, remedies, updates; EU floor 2 years; Spain applies a **3-year legal guarantee** with a **24-month presumption** since **2022-01-01** (RDL 7/2021; MC-12 LT-008/011). The 24-month figure is the Spanish presumption of pre-existing non-conformity, not the EU liability floor.
- **DCD 2019/770:** digital content/services conformity, updates, remedies and termination; transposition/application date fields not rendered on the retrieved summary and **not asserted**.
- **B2B exclusion:** consumer rules (TRLGDCU, CRD, CSD, DCD, UCPD as B2C practice) do not apply to FLEET B2B contracts; B2B relationships are governed by contract, the Commercial Code and unfair-competition law (LCD 3/1991, text NOT_RETRIEVED).

### 4.6 AIS / receive-only
- ITU-R M.1371 defines AIS technical characteristics in the maritime mobile service (MC-12 LT-022). AIS transmission requires type-approved radio equipment under the RED and a legal title for spectrum use under **Ley 11/2022** (LGT).
- **MAREA scope is receive-only.** A receive-only receiver may receive AIS messages; it **may not transmit**, may not be marketed as an AIS transmitter or as a certified AIS station, and copy must not imply transmission capability. Reception depends on other parties' transmitting equipment.
- No AIS-transmit revenue, hardware, subscription or margin is authorised (**HB-01**).

### 4.7 NMEA
- **NMEA 2000 (verified):** registered trademark; copyright licensing; every manufacturer must purchase a **Manufacturer Code** and a **Product Code** per certified product; all products that read or transmit NMEA 2000 information must be **certified** under the NMEA 2000 License Agreement; only certified products may use the logo/term "NMEA 2000 Certified".
- **NMEA 0183 (verified):** copyrighted standard, v4.30 (December 2023), available only from NMEA; 4800-baud single-talker/multi-listener; manufacturer mnemonic code (USD 200 + standard purchase). No certification programme for 0183 is stated on the page — a different regime from NMEA 2000.
- **Status:** **no NMEA licence, no manufacturer/product code and no certification exists**; `NMEA2000_CERTIFIED = false`. Any compatibility claim must be worded as interoperability with documented interfaces, not as NMEA certification.

### 4.8 Trademark
- EUTMR 2017/1001 is registration-based (MC-12 LT-024). MC-03 verified live EUTM **018135609 "M MAREA" class 9** (wording includes mobile apps and mobile-device software), EUTM **015190655** classes 35/37, and EUTM **018395967** classes 3/14/18/25, all owned by BRANDS 2020, S.L.; the material-conflict indication stands.
- **MAREA clearance = NOT_GRANTED.** No EUIPO, OEPM or WIPO name search could be executed; only record-number lookups worked. The brand must not be presented as registered, cleared or enforceable, and no brand-derived premium may enter the model (**HB-03**).

### 4.9 Data, charts and weather
- GDPR/ePrivacy: controller/processor roles undecided; no Art 28 processor agreement exists; DPIA expected for vessel/crew monitoring; 72-hour breach notification; records/retention/transfers. AEPD DPIA guidance **INACCESSIBLE**.
- **Charts:** official ENC/chart licensing (IHM, S-57/S-63 and IHO scheme) is **INACCESSIBLE/NOT_VERIFIED**; no chart licence exists. Weather/provider rights (Open-Meteo non-commercial, AEMET NWP restrictions, MeteoGalicia), OSM tile policy and Esri terms are recorded in MC-12 provider research and are **not re-verified here**; no licence is claimed.
- Provider terms must be treated as contractual constraints, not as legal clearance.

### 4.10 Payments, VAT and environmental
- **Payments:** PSD2/SCA apply to remote card payments; hosted/tokenised checkout keeps card data out of scope; no payment-provider schedule exists (BLK-COMM-02).
- **VAT:** Spanish general rate **21 %**; consumer prices VAT-inclusive (net = gross / 1.21); OSS for cross-border B2C; B2B reverse charge; import VAT recoverable while customs duty remains **UNKNOWN** (no CN classification). Spanish invoice rules (RD 1619/2012, referenced in the mission but outside the sourceId vocabulary) were **not retrieved**.
- **Environmental:** RoHS, WEEE producer registration, Batteries (applies 2024-02-18; removability by 2027; labelling 2026; QR 2027), Packaging (application **flagged 2026-08-12**, not verified). None of the registrations exists.

---

## §5 Legal uncertainties and escalation package for qualified counsel

| # | Question | Why it cannot be closed by desk research | reviewOwner | Consequence if answered adversely |
|---|---|---|---|---|
| U1 | CRA classification of HUB (router/gateway-like) and WATCH under Annex III classes I/II or Annex IV | Requires Implementing Regulation (EU) 2025/2392 text (not re-read) and a legal opinion | counsel + conformity | Third-party notified-body assessment, cost and timetable |
| U2 | CRA treatment of NAV as a software product and of WEATHER/FLEET client applications | Depends on distribution model and whether a product is placed on the market | counsel | CE marking, DoC, reporting duties attach |
| U3 | CRA transitional regime (Art 69) and what applies to products placed on the market before 2027-12-11 | Art 69 not retrieved; must be read in the OJ | counsel | Which regime governs early units |
| U4 | Spanish transposition of PLD 2024/2853 (due 2026-12-09) | No BOE instrument located; deadline may not yet be met | counsel | Which liability regime applies from 2026-12-09 |
| U5 | Whether MAREA app/cloud functions are "related services" within the manufacturer's control under the PLD | Fact-specific and legal | counsel + dpo | Liability exposure beyond the device |
| U6 | Whether HUB/AIS/DISPLAY/SENSE/WATCH carry a frozen intentional radio interface (RED vs EMC vs neither) | Design not frozen (MC-11) | conformity | Conformity route and test programme |
| U7 | Whether the 2026 amendment to RD 188/2016 (consolidated text updated 2026-03-13) changes the Spanish instruction rule | Amending instrument not identified/retrieved | conformity + counsel | Spanish documentation redesign |
| U8 | WEEE (RII-AEE), RoHS and packaging registration mechanics in Spain | Spanish instruments not retrieved | conformity + commercial | Producer registration blocked; sale blocked |
| U9 | Packaging Regulation exact application date and packaging EPR registration route | Date field not rendered; predecessor flag remains | conformity + commercial | First packaged SKU timing and fees |
| U10 | Chart/ENC licensing from IHM and S-63/S-100 distribution rights | IHM portal returned HTTP 404; no licence retrieved | counsel + commercial | NAV/HUB/DISPLAY chart features blocked |
| U11 | Weather/data provider rights (Open-Meteo non-commercial, AEMET NWP, MeteoGalicia, OSM, Esri) | Contractual terms, not re-verified in MC-14 | counsel + commercial | WEATHER/NAV data features blocked |
| U12 | Whether NMEA 2000 licensing/certification is required for a receive-only decoder or for NMEA 0183 parsing | Contractual scope and IP question | ip + counsel | Certification cost/claim restrictions |
| U13 | Whether any MAREA product can carry an "NMEA 2000 Certified", "CE", "AIS" or "MED" claim | No certification, DoC, CE mark, type approval or clearance exists | conformity + commercial | Misleading-practice and consumer-law exposure (UCPD) |
| U14 | Spanish transposition of DCD 2019/770 and exact digital-content consumer regime | National instrument not retrieved | counsel | Digital subscription refund/conformity exposure |
| U15 | Spanish invoice regulation (RD 1619/2012) and e-invoicing obligations | Not in the sourceId vocabulary; not retrieved | tax | Invoice non-compliance |
| U16 | Trademark clearance and filing strategy for MAREA | Registers not name-searchable; material-conflict indication | ip (counsel) | Forced rebrand after launch spend |

**Escalation package.** The Lead should send counsel: (i) this dossier and the CSV; (ii) the MC-11 conformity applicability file; (iii) the MC-12 legal/tax inputs; (iv) the MC-03 trademark research; and (v) the specific questions U1–U16 with the requested output being written advice per product family, not a verbal view. No authority, provider, supplier or lawyer has been contacted in MC-14.

---

## §6 Source URL list

**EU acts and guidance**
1. CRA — https://eur-lex.europa.eu/eli/reg/2024/2847/oj
2. PLD — https://eur-lex.europa.eu/eli/dir/2024/2853/oj
3. PLD corrigendum — https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024L2853R(01)
4. RED — https://eur-lex.europa.eu/eli/dir/2014/53/oj
5. Del Reg 2022/30 — https://eur-lex.europa.eu/eli/reg_del/2022/30/oj
6. Del Reg 2026/339 — https://eur-lex.europa.eu/legal-content/en/TXT/?uri=CELEX%3A32026R0339
7. EMC — https://eur-lex.europa.eu/eli/dir/2014/30/oj
8. LVD — https://eur-lex.europa.eu/eli/dir/2014/35/oj
9. GPSR — https://eur-lex.europa.eu/eli/reg/2023/988/oj
10. RoHS — https://eur-lex.europa.eu/eli/dir/2011/65/oj
11. WEEE — https://eur-lex.europa.eu/eli/dir/2012/19/oj
12. Batteries — https://eur-lex.europa.eu/eli/reg/2023/1542/oj
13. Packaging — https://eur-lex.europa.eu/eli/reg/2025/40/oj
14. RCD — https://eur-lex.europa.eu/eli/dir/2013/53/oj
15. MED — https://eur-lex.europa.eu/eli/dir/2014/90/oj
16. GDPR — https://eur-lex.europa.eu/eli/reg/2016/679/oj
17. ePrivacy — https://eur-lex.europa.eu/eli/dir/2002/58/oj
18. CRD — https://eur-lex.europa.eu/eli/dir/2011/83/oj
19. CSD — https://eur-lex.europa.eu/eli/dir/2019/771/oj
20. DCD — https://eur-lex.europa.eu/eli/dir/2019/770/oj
21. UCPD — https://eur-lex.europa.eu/eli/dir/2005/29/oj
22. Price Indication — https://eur-lex.europa.eu/eli/dir/1998/6/oj
23. eCommerce — https://eur-lex.europa.eu/eli/dir/2000/31/oj
24. PSD2 — https://eur-lex.europa.eu/eli/dir/2015/2366/oj
25. SCA RTS — https://eur-lex.europa.eu/eli/reg_del/2018/389/oj
26. VAT Directive (consolidated) — https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02006L0112-20250414
27. OSS implementing regulation — https://eur-lex.europa.eu/eli/reg/2011/282/oj
28. EUTMR — https://eur-lex.europa.eu/eli/reg/2017/1001/oj
29. Commission CE marking guidance — https://single-market-economy.ec.europa.eu/sectors/electrical-and-electronic-engineering-industries-eei/ce-marking_en
30. Blue Guide 2022 (NOT_RETRIEVED) — https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52022XC0629(04)

**Spain**
31. TRLGDCU — https://www.boe.es/buscar/act.php?id=BOE-A-2007-20555
32. LSSI — https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758
33. LOPDGDD — https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673
34. LGT 11/2022 — https://www.boe.es/buscar/act.php?id=BOE-A-2022-10757
35. RD 188/2016 (RED) — https://www.boe.es/buscar/act.php?id=BOE-A-2016-4444
36. RD 186/2016 (EMC) — https://www.boe.es/eli/es/rd/2016/05/06/186
37. RD 187/2016 (LVD) — https://www.boe.es/eli/es/rd/2016/05/06/187
38. LCD 3/1991 — https://www.boe.es/eli/es/l/1991/01/10/3
39. LGP 34/1988 — https://www.boe.es/eli/es/l/1988/11/11/34
40. MITECO producer register — https://www.miteco.gob.es/es/calidad-y-evaluacion-ambiental/temas/prevencion-y-gestion-residuos/flujos/productos/
41. AEPD DPIA guidance (INACCESSIBLE) — https://www.aepd.es/derechos-y-deberes/cumple-tus-deberes/medidas-de-cumplimiento/realizacion-de-evaluaciones-de-impacto-de-proteccion-de-datos
42. IHM portal (INACCESSIBLE) — https://www.armada.mde.es/ihm/
43. Spanish consumer authority (CEC) — https://portal-cec.consumo.gob.es/

**Private / standards / registers**
44. NMEA 2000 — https://www.nmea.org/nmea-2000.html
45. NMEA 0183 — https://www.nmea.org/nmea-0183.html
46. NMEA certification (same page as 44) — https://www.nmea.org/nmea-2000.html
47. EUIPO eSearch (INACCESSIBLE) — https://euipo.europa.eu/eSearch/
48. OEPM (INACCESSIBLE) — https://www.oepm.es/es/
49. WIPO Brand DB (INACCESSIBLE) — https://branddb.wipo.int/
50. IEC 60945 (NOT_RETRIEVED) — https://webstore.iec.ch/en/search?query=IEC%2060945
51. ISO 16315 (NOT_RETRIEVED, excluded) — https://www.iso.org/search.html?q=ISO%2016315

---

## §7 Honesty statement

This document is **research, not legal advice, not a legal opinion, not a clearance, not a conformity assessment, not a certification and not an approval**. It records what official primary sources said on **2026-11-02** and what could not be retrieved. It does not establish that any MAREA product complies with any act, standard or licensing scheme; it does not establish that the MAREA name is available, registrable or free of conflict; it does not authorise publication, sale, CE marking, NMEA certification, chart distribution, weather-data use or any regulated claim. No authority, notified body, laboratory, provider, supplier, customer or lawyer was contacted in the production of this dossier.

In the governed register six sources are `NOT_RETRIEVED` and four are `INACCESSIBLE`; where a date was not rendered by the official page it is marked `NOT_RETRIEVED` rather than inferred. Where predecessor evidence was consumed, it is cited by evidence ID and its original flags are preserved (notably the Packaging Regulation application date `2026-08-12`, which remains **flagged and unverified**, and the Packaging/RCD/MED date fields that were never rendered). The RED cybersecurity applicability date is corrected to **2025-08-01** against the mission brief's 2025-02-01. The PLD May 2026 corrigendum is identified and verified.

Any downstream artefact that needs a legal conclusion must route the open questions in §5 to qualified counsel; this dossier deliberately leaves them open. **MAREA remains a proposed brand, all products remain `NOT_FOR_SALE`, and no certification, approval or clearance of any kind is claimed.**

