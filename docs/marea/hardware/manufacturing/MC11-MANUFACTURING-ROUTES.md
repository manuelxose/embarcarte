# MC-11 — D15 Manufacturing routes

| Field | Value |
|---|---|
| Document | D15 `MC11-MANUFACTURING-ROUTES.md` |
| Status | `PROPOSED_NOT_APPROVED` — `INTERNAL_ENGINEERING_RESEARCH` |
| Milestone | MC-11 (deliverable 15) |
| Branch / base | `feature/marea-mc11-hardware-sourcing-conformity` / MC-10R HEAD `6713178` |
| Date | 2026-11-02 (Europe/Madrid) |
| Owner | `manufacturing-engineer` |
| Machine records | `data/qualification-plan.json`, `data/evidence/manufacturing.json` |

## 0. Status and control block (binding)

```
SUPPLIER_CONTACT          = NOT_CONTACTED (all; no enquiry, account or RFQ)
RFQ_TRANSMISSION          = NOT_AUTHORIZED / NONE SENT
SAMPLE_ORDER              = NONE
PURCHASE                  = NONE
LABORATORY_ENGAGED        = NONE
PHYSICAL_TEST             = NOT_EXECUTED (all)
PROTOTYPE                 = NONE EXISTS
PRODUCTION                = NOT_AUTHORIZED
CERTIFICATION             = NOT_ESTABLISHED (none)
CE_MARKING_CLAIM          = PROHIBITED
ENVIRONMENTAL_RATING_CLAIM= PROHIBITED
PILOT_SAFETY_GATE         = BLOCKED
```

**Nothing in this document was tested, built, quoted, audited or contacted.** No factory was visited,
no capability audit was performed, no tooling was designed, no prototype exists and no supplier has
been contacted. Every supplier named below is a **public-source candidate identity** from
`data/supplier-register.json`, not an approved vendor. The register records `contactStatus =
NOT_CONTACTED` for all of them. Naming a company is not an endorsement, a capability claim or a
commercial relationship.

Capital, tooling, MOQ and cost figures in this document are either **public catalogue observations**
(class and date recorded) or `UNKNOWN`. An `UNKNOWN` amount is never rendered as zero.

---

## 1. What a manufacturing-route decision actually decides

The route decision is not "who assembles the board". It decides, for a given volume band:

1. **Who owns the process** — MAREA (in-house), a contract manufacturer (CEM/EMS), or an
   ODM/OEM partner whose design MAREA re-badges.
2. **Who owns the evidence** — schematic/layout control, DFM review, test coverage, traceability,
   calibration, firmware provenance and the technical file.
3. **Who carries the fixed cost** — stencils, fixtures, programming jigs, enclosure tooling, test
   equipment, audits, certification.
4. **Who is the legal economic operator** — the manufacturer named on the EU declaration of
   conformity, the importer, the WEEE producer and the CRA responsible entity. This is **not** a
   logistics detail: an ODM that supplies MAREA-branded hardware does not transfer MAREA's
   obligations as the party placing the product on the market.
5. **What can be repaired** — a potted, glued, single-PCBA ODM product is a replacement-only product;
   a connectorised, service-opened, module-level product can be repaired. That choice must be made
   before enclosure tooling, not after.

MC-11 does not authorise any of these choices. This document is a comparative framework and a
decision logic, not a procurement decision.

---

## 2. The six candidate routes

| # | Route | Definition used here |
|---|---|---|
| R1 | **In-house prototype assembly** | MAREA assembles hand-soldered / reflowed boards and the enclosure in a small ESD-controlled bench area; buys PCBs and stencils from a fab service |
| R2 | **Local contract electronics manufacturing (Spain / Portugal / Galicia)** | A nearby CEM/EMS performs SMT, test and box build; MAREA owns design and quality plan |
| R3 | **Regional EU contract manufacturing** | A CEM/EMS elsewhere in the EU (e.g. DE/BE/PL); same commercial model as R2 with longer logistics |
| R4 | **ODM / OEM partnership** | A partner designs and manufactures a product to a requirement; MAREA re-badges and sells it (with or without MAREA software) |
| R5 | **Custom PCB with outsourced assembly** | MAREA owns the design; a PCB-fab/assembly service fabricates and assembles the boards; MAREA or a third party does box build and test |
| R6 | **Hybrid assembly + final QC** | PCBA outsourced (R5/R3), final assembly, programming, calibration and end-of-line test retained by MAREA (or a local partner) with a documented quality plan |

These are not mutually exclusive steps; they are positions on a control/capital continuum. R6 is the
**reference route** proposed at the end of this document (§12), not an approved plan.

### 2.1 What each route buys and costs (qualitative)

| Route | Buys | Costs / exposes |
|---|---|---|
| R1 in-house prototype | Speed of learning, lowest coordination overhead, direct visibility of failures | Bench-grade quality, no AOI/ICT, no production traceability, operator-dependence, ESD/process risk, not scalable |
| R2 local CEM | Short logistics, same-language quality dialogue, easier factory visits and audits, lower freight/customs friction | Local marine-electronics capability in ES/PT/Galicia is **UNVERIFIED**; small-volume CEMs may not offer AOI/X-ray/ICT; MOQ and NRE unknown |
| R3 regional EU CEM | Broader capability, EU customs and CRA supply-chain story, established quality systems | Higher freight and travel, longer feedback loop, MOQ/NRE unknown, no company contacted |
| R4 ODM/OEM | Fastest to a sellable-looking product, partner absorbs design and tooling | MAREA loses design control and much of the failure surface; DoC/CRA/GPSR/WEEE operator role and product-liability position must be re-examined; differentiation collapses; no test evidence owned by MAREA |
| R5 custom PCB + outsourced assembly | MAREA keeps schematic/layout/firmware ownership; verified public fab services exist; low entry cost at prototype volume | Board-level only: no box build, no system test, no enclosure; assembly quality depends on service class; component sourcing and counterfeit risk shift to MAREA |
| R6 hybrid + final QC | MAREA keeps the quality gate, serialisation, calibration, EOL test and traceability while outsourcing capital-intensive SMT | Requires MAREA (or a partner) to own a real test/QC process and the fixtures; still needs an audited PCBA supplier; two-party quality interface |

---

## 3. Comparison across the mandated criteria

Rating scale is ordinal and explicit: **LOW / MEDIUM / HIGH** where the heading says which direction
is favourable. These are engineering judgements (`ENGINEERING_ASSUMPTION`), not measurements.

| Criterion | R1 in-house | R2 local CEM | R3 regional EU CEM | R4 ODM/OEM | R5 PCB + outsourced assembly | R6 hybrid + final QC |
|---|---|---|---|---|---|---|
| Capital requirement (lower is better) | **LOW–MEDIUM**: bench ESD, reflow/hot-air, microscope, PSU, DMM, scope; no line | **MEDIUM**: NRE, stencils, test fixtures, audit effort, MOQ prepayment | **MEDIUM–HIGH**: as R2 plus travel/freight and larger MOQ exposure | **LOW** for MAREA (partner capitalises), but commercial commitment high | **LOW**: tooling is the fab service's advertised price band | **MEDIUM**: PCBA outsourced + MAREA-owned fixtures, jigs, test station |
| Minimum production volume (lower is better) | 1 | Unknown; small CEMs may accept tens | Unknown; usually higher than local | Partner MOQ likely high and unknown | Advertised from 5–10 PCB pcs; assembly from 1 pc advertised | Practical from tens; fixture amortisation needs ~100 |
| Tooling | Hand tools, stencil | Stencil, solder paste, fixtures, possibly panel tooling | As R2 | Partner-owned; MAREA has no visibility | Stencil and fab tooling only | Stencil + test fixtures + programming jig + enclosure tooling |
| Quality control | Visual + operator judgement | Process-dependent; needs audit | Process-dependent; needs audit | Partner's system; MAREA must still verify | Board-level AOI/visual; no system test | **MAREA-owned gate**: IQC, FCT, EOL, batch record |
| Supply risk | High (single person, no second source) | Medium (one local partner) | Medium (one partner, longer chain) | High (partner controls BOM and lifecycle) | Medium–high (China-based options; component authenticity) | Medium: split responsibility must be contractually explicit |
| Production consistency | LOW | MEDIUM (if process controlled) | MEDIUM–HIGH | Depends entirely on partner | MEDIUM for the board only | MEDIUM–HIGH with documented test limits |
| Testing | Bench only | ICT/FCT if offered — unknown | ICT/FCT if offered — unknown | Partner test, evidence may not transfer | AOI/visual only unless ordered | **Full EOL test owned by MAREA** |
| Serviceability | High (everything accessible) | Design-dependent | Design-dependent | Usually low (replacement-only) | Bare board serviceable | High if design-for-service is enforced |
| Logistics | Trivial | Short | EU freight/customs | Partner-controlled | Parcel + customs | Two flows (PCBA + final assembly) |
| Certification implications | MAREA is manufacturer and operator; must build the technical file alone | MAREA is manufacturer; CEM is a supplier, not the operator | Same as R2 | Operator/manufacturer role and evidence ownership must be re-examined; ODM test reports do not become MAREA's DoC | MAREA is manufacturer; board supplier is a component/service supplier | MAREA is manufacturer; the split must be documented in the technical file |
| Engineering effort (lower is better) | **HIGH** per unit but low process engineering | **MEDIUM**: DFM liaison, test spec, audit | **MEDIUM–HIGH**: as R2 + coordination | **LOW** engineering, **HIGH** integration/verification and commercial risk | **LOW–MEDIUM**: design + DFM + incoming inspection | **MEDIUM–HIGH**: design, test engineering, fixtures, QC system |

### 3.1 What the table must not be read as

- "LOW capital" does not mean "cheap": R4 and R5 move cost to unit price, MOQ, dependency and lost
  control, none of which is quantified here.
- "HIGH quality" for a CEM is a hypothesis until an audit and a first-article inspection exist. No
  audit was performed and no CEM was contacted.
- The register records **no verified Spanish, Portuguese or Galician PCB-fab or EMS capability**.
  The local route (R2) is therefore a **hypothesis**, not an evidenced option (§11).

---

## 4. Capital requirement and tooling — what must be bought, with evidence state

No supplier NRE, tooling or MOQ was published on any retrieved page, and no quotation exists
(`MC11_FORMAL_PROCUREMENT_EVIDENCE = BLOCKED_OR_NOT_OBTAINED`). The only real capital-adjacent
observations are the **advertised "from" prices of PCB/PCBA services** catalogued by the sourcing
workstream. These are public catalogue observations, not quotations, and they exclude most of the
cost that matters:

| Observed public price (source register) | Value as observed | What it excludes |
|---|---|---|
| `PO-PCB-001` JLCPCB FR-4 1–2 layer, 5 pcs, "from" | USD 2.00 | Shipping, stencil, test, VAT, multi-layer/ENIG/impedance options |
| `PO-PCB-002` JLCPCB SMT stencil, "from" | USD 3.00 | Shipping, frame, fine-pitch options |
| `PO-PCB-003` PCBWay 1–2 layer, 10 pcs, "from" | USD 5.00 | Shipping, stencil, test, VAT |
| `PO-PCB-004` AISLER PCB "starting at" | EUR 14.20 | Shipping, VAT, assembly |
| `PO-PCBA-001` JLCPCB PCB assembly, "from" | USD 8.00 | **All component cost**, stencil, programming, functional test, tooling, shipping, VAT |
| `PO-PCBA-002` PCBWay assembly headline incl. free shipping 1–20 pcs | USD 29.00 | **All component cost**, stencil, programming, functional test, tooling, VAT |

Sources and classification: `sourcing/MC11-PUBLIC-PRICE-EVIDENCE.md` §2.6–2.7 and
`data/price-observations.json`. They are `MANUFACTURER_PUBLIC_LIST_PRICE` observations, **not**
quotations, and are **not usable as a unit manufacturing cost**.

### 4.1 Capital categories that must be costed before a route is chosen

| Cost category | R1 | R2/R3 | R5 | R6 | Evidence state |
|---|---|---|---|---|---|
| PCB fabrication NRE / engineering | no | no | no | no | `UNKNOWN` |
| Stencil(s) | yes | yes | yes | yes | Advertised "from" only (`PO-PCB-002`) |
| SMT line / reflow capability | bench reflow | partner-owned | partner-owned | partner-owned | `UNKNOWN` (partner capex, not MAREA capex) |
| AOI / X-ray / ICT | no | partner-dependent | partner-dependent | partner-dependent | `UNKNOWN` |
| Flying-probe / bed-of-nails fixture | no | maybe | no | yes (design) | `UNKNOWN` |
| Programming / provisioning jig | manual | maybe | no | yes | `UNKNOWN` |
| Functional test station (PSU, DMM, scope, loads, current meter) | bench | maybe | no | yes | `UNKNOWN` (equipment class named in D16 §17) |
| ESD-controlled area / bench | basic | partner-owned | n/a | yes | `UNKNOWN` |
| Enclosure tooling (injection mould / CNC / cut-outs / gaskets / optical bonding) | none (off-the-shelf / 3D print) | partner or toolmaker | none | yes | `UNKNOWN`; Fibox CAB dimensions/IP **unverified** (register risk) |
| Test-lab qualification (D17) | no | no | no | no | `UNKNOWN`; no lab contacted |
| Certification / notified body / technical file | MAREA | MAREA | MAREA | MAREA | `UNKNOWN`; see D24 §9 |
| Warranty reserve / RMA logistics | not modelled | not modelled | not modelled | not modelled | `UNKNOWN`; see D18 |

**Rule:** no capital table may present a total while any category is `UNKNOWN`. The cost workstream
must carry tooling, test, certification and warranty as **separate categories**, never folded into a
unit price and never silently zeroed.

---

## 5. Minimum production volume — what is known and what is not

| Route | Volume evidence | Verdict |
|---|---|---|
| R1 | Practically 1; no external minimum | Suitable for 1, maybe 10 with effort |
| R2 | No Spanish/Portuguese CEM was contacted; MOQ unpublished | `UNKNOWN` |
| R3 | No regional CEM was contacted; MOQ unpublished | `UNKNOWN` |
| R4 | No ODM was contacted; typical ODM MOQ is commercially large but **not evidenced here** | `UNKNOWN`; do not assume a number |
| R5 | PCB services advertise minimums of 5 pcs (JLCPCB) and 10 pcs (PCBWay); AISLER does not publish a minimum on the retrieved page | **Observed advertised minimum**, not a contractual MOQ |
| R6 | Fixture amortisation is an engineering judgement (`ENGINEERING_ASSUMPTION`): a bespoke bed-of-nails/programming fixture only makes sense when its NRE can be spread over a batch; no fixture price exists | `ENGINEERING_ASSUMPTION` |

An advertised "from" price on a service page is **not** a minimum order quantity commitment, and a
web price tier is **not** a wholesale volume break. The sourcing register records `moqObserved = null`
for component MOQ everywhere.

---

## 6. Route-by-volume decision logic (1 / 10 / 100 / 1 000 units)

This is the core requested output. It is a **logic**, not an authorisation. Every branch is gated by
G1–G7 (`MC11-BASELINE-AND-GOVERNANCE.md` §9), all currently `NOT_AUTHORIZED`/`CANDIDATE_ONLY`.

### 6.1 1 unit — engineering prototype

- **Route:** R1 (in-house prototype assembly) + R5 for the bare PCB/PCBA. Bench ESD discipline,
  hand assembly or a small reflow, off-the-shelf or 3D-printed enclosure.
- **Why:** the purpose is to create a measurable article, not a product. Any tooling spend at this
  stage is speculation because the design will change.
- **What must be true before spending:** G1 architecture candidate selected; G3 prototype budget,
  BOM revision and purchasing authority; a safe test plan and a D17 pre-scan plan. All are absent.
- **Certification:** none. The article is a test object, not a product and must never be shown as
  one. No CE mark, no IP/temperature/EMC claim.
- **Risk:** bench builds hide process defects. A single hand-built unit says nothing about yield.

### 6.2 10 units — pilot batch / first-article and qualification samples

- **Route:** R5 (custom PCB + outsourced assembly) + R6 (final assembly and EOL test retained by
  MAREA). Optionally R2 for board assembly **only after a supplier audit**.
- **Why:** 10 units is the smallest batch that can supply a qualification programme and a
  reproducibility check. Board fabrication and SMT are better outsourced than hand-built; the
  system-level test and serialisation must be MAREA's because they generate the evidence.
- **Additional requirements:** a written PCBA specification, an incoming inspection plan for the
  boards, a functional test procedure, a serial-number scheme, and a batch record. These do not
  exist yet (D16).
- **Not justified at 10:** injection-moulded enclosure tooling, automated test fixtures, ODM
  engagement, certification.
- **Decision rule:** outsource the process you cannot control; never outsource the evidence.

### 6.3 100 units — small series

- **Route:** R2 or R3 for PCBA **and** box build, with R6-style MAREA final QC and EOL test; or R6
  with a PCBA-only supplier. Choose R2 vs R3 on audit outcome and logistics, not on price alone.
- **Why:** at ~100 units a test fixture, a programming jig, a documented assembly instruction and an
  audited CEM start to pay back. Enclosure tooling may become justified if the enclosure is frozen.
- **Prerequisites:** completed D17 qualification (or a documented risk acceptance for tests not yet
  run), a frozen BOM revision, an approved supplier audit, and a CEM quality agreement covering
  change notification, traceability and non-conforming product.
- **Certification:** the conformity route (D24) must be funded and started; a CEM cannot supply
  MAREA's DoC, CRA process or WEEE registration.
- **Serviceability:** freeze the service strategy now. A 100-unit batch built as replacement-only
  forecloses repair economics.

### 6.4 1 000 units — low-volume series production

- **Route:** R6 with a qualified EU CEM (R2/R3) or a controlled ODM (R4) **only if** the operator,
  technical-file and product-liability questions are resolved. R5-only is no longer credible: board
  supply without system test and traceability fails the quality and CRA obligations at this volume.
- **Why:** at 1 000 units the fixed cost of fixtures, tooling, audits, certification and warranty
  operations is spread thin enough to be worth doing properly; conversely a quality escape is
  expensive and reputationally serious.
- **Prerequisites:** production-approved BOM (none exists — `PRODUCTION_APPROVED` is forbidden in
  MC-11 evidence), audited supplier with capacity evidence, capacity/lead-time commitments, second
  source for critical parts, warranty and RMA process (D18), and a funded conformity programme.
- **What remains true:** volume does not create a quotation by itself. Without a negotiated
  contract, price and lead time stay `UNKNOWN`.

### 6.5 Summary decision table

| Volume | Primary route | Secondary | Key gate | Evidence that must exist |
|---|---|---|---|---|
| 1 | R1 + R5 | — | G3 | Safe test plan, prototype budget, named BOM revision |
| 10 | R5 + R6 | R2 (post-audit) | G2/G3 | PCBA spec, IQC plan, serialisation, batch record |
| 100 | R2/R3 + R6 | R6 + R5 | G2/G4 | Audited supplier, D17 evidence or documented risk acceptance, quality agreement |
| 1 000 | R6 + audited CEM | R4 (only with operator/liability resolution) | G6/G7 | Production-approved BOM, capacity, second sources, warranty operations, conformity file |

**Invariant:** the route never upgrades an evidence class. A CEM's process capability does not create
MAREA's test evidence; an ODM's CE declaration does not create MAREA's declaration of conformity.

---

## 7. Quality control, testing and production consistency

| Control | R1 | R2/R3 | R4 | R5 | R6 |
|---|---|---|---|---|---|
| Incoming inspection (components/boards) | visual | should exist — audit | partner | MAREA must define | MAREA-owned IQC |
| Solder joint inspection | visual | AOI/visual | partner | AOI/visual per service | specified in PCBA spec |
| In-circuit test | no | if offered | partner | no | design for ICT or flying probe |
| Functional test | bench | possible | partner | no | **MAREA EOL test** |
| Programming / key injection | manual | maybe | partner | no | MAREA programming jig |
| Calibration | no | no | partner (unverified) | no | MAREA record (SENSE/WATCH/DISPLAY) |
| Batch record / traceability | notebook | should exist | partner-controlled | board serial only | full device record |
| First-article inspection | n/a | required | partner | per order | required |
| ESD control | basic | audit | partner | n/a | documented ESD area |

**Consistency statement.** There is **no measured yield, no DPMO, no first-pass-yield figure and no
process capability** for any route, because no batch was built. Any document presenting a yield or a
scrap rate would be inventing evidence. The only defensible statement is the control design above.

---

## 8. Supply risk and resilience

| Risk | Route exposure | Mitigation required (not implemented) |
|---|---|---|
| Single-source critical component (display panel; secure element family unresolved because ATECC608B is NRND; MAX-M10 listed unavailable) | All routes | Second-source qualification; lifecycle screen before BOM freeze (`sourcing/MC11-SUPPLIER-REGISTER.md` §6) |
| China-based PCB/PCBA supply chain | R5 | EU-customs and CRA supply-chain due diligence; IP protection; EU representative; not assessed |
| Unverified EU/PT EMS capability | R2 | Supplier audit before shortlist; do not plan around Efacec until verified |
| Unverified Spanish/Portuguese PCB fab | R2 | None verified in this session; a fab search remains an open G2 task |
| Quality claims are self-declared (JLCPCB ISO statements; Fibox group statements) | All | Certificates, scope and entity must be verified; self-declaration is not an audit |
| No lead time or MOQ evidence | All | `UNKNOWN`; must be obtained under an authorised enquiry |
| Component authenticity / counterfeit | R5, R1 | Buy through authorised channels where verifiable; incoming inspection; no broker market |
| Obsolescence during a long-life marine product | All | PCN monitoring, last-time-buy policy, second source, lifecycle clause in supplier agreement |

No mitigation in this table is implemented. `SUPPLIER_QUALITY_AUDIT = NOT_PERFORMED`.

---

## 9. Serviceability and logistics

**Serviceability is designed, not procured.** The route determines whether repair is even possible:

| Design decision | Repairable outcome | Replacement-only outcome |
|---|---|---|
| Enclosure | screws + gasket + service opening | ultrasonic weld / glued / potted |
| PCBA mounting | connectors + standoffs | direct solder / press-fit |
| Firmware recovery | accessible service port / recovery mode | sealed, no recovery path |
| Spares | module-level spares stocked | whole-unit swap only |
| Calibration | field-recalibratable | factory-only return |

R1/R6 can preserve serviceability if the design is specified for it; R4 typically does not. The
service strategy must be frozen **before** enclosure tooling (R6, 100+ units). See D18 for the RMA and
spares model — no warranty duration, reliability figure or support period is offered.

**Logistics.** None of the following is established: Incoterms, freight cost, customs handling, EU
responsible-person arrangement, packaging specification, reverse-logistics cost. The sourcing
register records zero PACKAGING/LOGISTICS suppliers in its data file (websites listed, pages not
fetched). No logistics supplier was contacted.

---

## 10. Certification implications per route (no certification is claimed)

| Question | R1/R5/R6 (MAREA manufacturer) | R4 (ODM/OEM, MAREA brand) |
|---|---|---|
| Who signs the EU declaration of conformity? | MAREA | MAREA, but it must be able to substantiate it |
| Who owns the technical file? | MAREA | MAREA — the ODM's file is not automatically transferable |
| Who is the CRA manufacturer with update/support duties? | MAREA | MAREA; the ODM's update capability must be contractually guaranteed |
| Who registers as WEEE producer? | MAREA | MAREA |
| Can the partner's CE/test reports be reused? | Yes only if they cover the exact configuration and are held as evidence | Only if the exact configuration is documented and the reports are ceded |
| MED / wheel mark | Not applicable to recreational craft on the recorded market position (`HARDWARE-COMPLIANCE-MATRIX.md` C-09); re-assess if selling to professional vessels | Same, plus the ODM's claims must not be imported blindly |
| NMEA certification | Not certified, not claimed | Same |
| IP/temperature/EMC rating | Not claimed until D17 tests exist and pass | Same; an ODM datasheet is not MAREA's test evidence |

**Hard rule from D24 and the compliance matrix:** CE marking can only be affixed after testing and
the prescribed conformity assessment (EMC Directive guidance, `EVD-MC11-415`); voluntary
certificates are not recognised proof of compliance. No route changes that.

---

## 11. Candidate companies from the sourcing supplier register

Only suppliers actually present in `data/supplier-register.json` are listed. All carry
`contactStatus = NOT_CONTACTED` and `rfqStatus = RFQ_NOT_SENT`. Capability is **not** verified for any
of them; where the register records a risk, it is reproduced.

| Supplier ID | Trading name | Country | Roles in register | What was observed | What is NOT verified |
|---|---|---|---|---|---|
| `SUP-jlcpcb-01` | JLCPCB | CN | `PCB_FAB`, `EMS` | Own service page: FR-4 1–32 layers, SMT/THT assembly, stencils; self-declared ISO 27001/27701/PCI DSS for privacy processes | Legal entity, EU representative, origin documentation, quality certification scope, capacity, MOQ, lead time, IP protection |
| `SUP-pcbway-01` | PCBWay | CN | `PCB_FAB`, `EMS` | Own service page: 1–64 layers, SMT/THT, turnkey components; advertised USD 5.00/10 pcs and USD 29 assembly headline | Legal entity, certification, capacity, MOQ, lead time |
| `SUP-aisler-01` | AISLER | DE | `PCB_FAB`, `EMS` | Own service page: "made in Europe", prototype assembly ~6 business days, from EUR 14.20 | Manufacturing country, VAT/shipping terms, capacity, series capability, quality certification |
| `SUP-efacec-01` | Efacec | PT | `EMS` (capability unverified) | Portuguese industrial/electrical group homepage retrieved | **EMS role not stated on the page; quality system, marine-electronics experience and capacity UNVERIFIED.** Register risk says: do not present as a qualified EMS |
| `SUP-fibox-01` | Fibox | FI | `ENCLOSURE` | Corporate page: CAB PC/ABS range, injection moulding and custom plastic mechanics; group states ISO 9001/14001/45001 and UL 508A for named entities (self-declared) | CAB product page **inaccessible**: dimensions, IP/IK rating and temperature range unverified; enclosure IP rating does not establish the assembled unit's rating; tooling/NRE unknown |

**No Spanish, Portuguese or Galician PCB-fab or EMS capability is verified in the register.** D12 §4
lists further real companies whose pages were **not fetched** (e.g. Eurocircuits, Würth, LeitOn,
FICOSA, DEKRA, TÜV SÜD, Bureau Veritas, Element) — they are candidates for a future authorised
supplier-engagement gate, **not current facts and not registered suppliers**. This document does not
treat them as options.

**Naming rule.** No company above is described as "approved", "qualified", "partner", "selected" or
"contacted". MAREA has no approved-vendor list (`APPROVED_VENDOR_LIST = NOT ESTABLISHED`).

---

## 12. Reference route recommendation (a proposal, not an approval)

**Recommendation: adopt R6 — hybrid assembly with MAREA-owned final QC — as the reference route for
10–1 000 units, with R5 for the PCBA and R1 for the single prototype.**

Reasons, stated as engineering judgement:

1. **It is the only route that creates owned evidence.** A qualification programme (D17) and an RMA
   operation (D18) need serialised, tested, traceable units. R4 and R5 alone do not produce them.
2. **It matches the capital profile of a pre-industrial programme.** SMT is the capital-intensive
   step and is outsourced; test, programming and traceability are comparatively cheap to own and are
   exactly the evidence that certification and CRA require.
3. **It keeps design control with MAREA**, which the canonical product definitions assume (a MAREA
   appliance, not an integration reseller).
4. **It is compatible with the observed price evidence** (public PCB/PCBA service prices exist) while
   being honest that enclosure tooling, fixtures, certification and warranty costs are `UNKNOWN`.
5. **It preserves the option to move local later**: if a Spanish/Portuguese CEM is verified under an
   authorised G2 audit, R2 can replace the PCBA supplier without changing MAREA's QC model.

**What this recommendation does not authorise:** no supplier contact, no RFQ, no tooling spend, no
prototype purchase, no production, no certification claim. It is a planning posture for a future
authorised milestone, and `G1` remains `CANDIDATE_ONLY`.

**What would change it:** (a) a verified, affordable Galician/Portuguese CEM with marine experience;
(b) a commercial decision to be an integration business rather than an appliance business (making
option E / R4 rational); (c) volumes below ~10 where R1 is sufficient; (d) volumes above ~1 000 where
a contract manufacturer with full box-build and automated test becomes the only defensible model.

---

## 13. Open questions that block a route decision

| # | Question | Why it is open |
|---|---|---|
| M1 | Build an appliance at all (R6) or integrate third-party hardware (D4 option E)? | Commercial-strategy decision above engineering; option E scores highest on the frozen criteria |
| M2 | Is any Spanish/Portuguese CEM credible? | No audit, no contact, no capability evidence |
| M3 | Is the enclosure tooled or bought off-the-shelf? | Enclosure not designed; Fibox dimensions/IP unverified |
| M4 | Is the product repairable or replacement-only? | Service strategy not decided; must precede tooling |
| M5 | Who signs the DoC and owns the technical file? | Manufacturer identity `UNDETERMINED` |
| M6 | What is the qualification budget? | No lab quote; all D17 costs `UNKNOWN` |
| M7 | What is the expected first-year volume? | No customer evidence (`CUSTOMER_EVIDENCE = NONE`) |

---

## 14. Explicit control statements

```
APPROVED_VENDOR_LIST     = NOT ESTABLISHED
SUPPLIER_QUALITY_AUDIT   = NOT PERFORMED
SUPPLIER_CONTACT         = NOT_CONTACTED
RFQ_TRANSMISSION         = NOT_AUTHORIZED / NONE SENT
TOOLING_ORDERED          = NONE
PROTOTYPE_PROCURED       = NONE
MANUFACTURING_ROUTE      = PROPOSED_NOT_APPROVED
PRODUCTION_AUTHORISATION = NOT_AUTHORIZED
```

Every cost, yield, capacity, MOQ and lead-time statement in this document is either a classified
public observation (with its observation ID) or `UNKNOWN`. None is a quotation.
