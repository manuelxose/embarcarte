# MC-11 D14 — RFQ package prepared, NOT SENT

Status: `INTERNAL_ENGINEERING_RESEARCH` — **TEN RFQ DRAFTS PREPARED; NONE WAS SENT.**

```
RFQ_STATE_PER_DRAFT              = RFQ_DRAFT_PREPARED
APPROVAL_STATE                   = RFQ_APPROVAL_REQUIRED
TRANSMISSION_STATE               = RFQ_NOT_SENT
SUPPLIER_STATE                   = SUPPLIER_NOT_CONTACTED
COMMERCIAL_EVIDENCE_STATE        = FORMAL_QUOTE_NOT_OBTAINED
RESPONSES_RECEIVED               = 0
QUOTATIONS_OBTAINED              = 0
```

No e-mail, web form, portal, phone call, messaging service, account or marketplace was used. No
document in this file was delivered to any supplier. Where a target supplier **type** is named, no
company and no individual is addressed; the same draft can later be issued only after explicit,
separate supplier-engagement authorisation (gate **G2**) and procurement authorisation (gate **G3**).
Any future transmission would be a new, separately authorised action; MC-11 grants nothing.

Milestone MC-11, session date **2026-11-02**.

---

## 1. Common question set (asked in every one of the ten RFQs)

Every RFQ below requires the supplier to answer all of the following. A response missing any of these
is not considered a comparable quotation.

| # | Requirement | Wording used in the RFQ |
|---|---|---|
| Q01 | Revision + quantity | "State the exact revision/date of the drawing, Gerber, BOM and assembly data you quote against, and the quantity tier(s) for which your price applies (MOQ, 10, 100, 500, 1 000)." |
| Q02 | Available data | "Confirm which drawings, schematics, Gerber/ODB++, BOM, CPL/pick-and-place, 3-D and mechanical data you require and which of them we must still supply." |
| Q03 | Substitution policy | "State whether you may substitute any component/part without written approval, and describe your change-notification process." |
| Q04 | Unit price | "Quote the unit price for each tier and the price basis (per piece, per panel, per assembly, per hour)." |
| Q05 | Currency | "State the quote currency and the FX basis if not EUR." |
| Q06 | Incoterms | "State the Incoterms 2020 rule and named place, plus packing, freight and insurance treatment." |
| Q07 | MOQ | "State the minimum order quantity and any minimum order value." |
| Q08 | Setup / tooling | "State all setup, tooling, stencil, programming, fixture and one-time charges separately from unit price." |
| Q09 | NRE | "State separately every non-recurring engineering charge (design, DFM, tooling, qualification, test development)." |
| Q10 | Lead time | "State prototype and production lead times from receipt of approved data and PO, at each tier." |
| Q11 | Payment terms | "State payment terms, deposit required, and validity of the quote." |
| Q12 | Test / quality requirements | "State what inspection and test you perform (AOI, X-ray, ICT/FCT, sampling plan, IPC class, first article) and what you require from us." |
| Q13 | Warranty / RMA | "State warranty period, RMA process, turnaround, failure-analysis policy and liability terms." |
| Q14 | Regulatory documentation | "State which declarations you provide (RoHS, REACH, material content, CE/RED module approvals, UL data, conflict minerals) and in what form." |
| Q15 | Traceability | "State lot/date-code traceability, serialisation support, certificate-of-conformance and record-retention policy." |
| Q16 | Alternate sourcing | "State your second-source/subcontracting practice, any China/EU split, and obsolescence notification (PCN/EOL) commitment." |
| Q17 | Validity + assumptions/exclusions | "State the quote validity period and **every assumption and exclusion**; an unqualified total will not be accepted." |

---

## 2. The ten drafts

### RFQ-MC11-01 — Component sourcing

| Field | Content |
|---|---|
| **Scope** | Supply of the MAREA MC-11 candidate electronic BOM: MCU/SoM, CAN transceiver and controller, RS-422/isolated interfaces, Ethernet, Wi-Fi/BLE, cellular module, GNSS, secure element, memory, DC-DC/protection, sensors, display module. |
| **Addressed to** | A franchised/authorised distributor or manufacturer sales channel (no company named, no individual, no contact details held). |
| **Revision / qty** | Engineering BOM revision `NOT_APPROVED`; quantities: 1 / 10 / 100 / 500 / 1 000 (scenarios, not commitments). |
| **Data we would provide** | MPN list, target reference designators, required temperature grade, approved-alternate list. |
| **Draft covering text** | "We are preparing an engineering feasibility study for marine instrumentation. Please quote the attached candidate MPN list under questions Q01–Q17, identifying: orderable MPN and manufacturer, lifecycle status (ACTIVE/NRND/EOL) with PCN reference, package and temperature grade, MOQ, price breaks, lead time, country of origin, and any export-control classification. Identify explicitly where no price or lifecycle information can be provided rather than estimating." |
| **Status** | `RFQ_DRAFT_PREPARED` / `RFQ_APPROVAL_REQUIRED` / `RFQ_NOT_SENT` / `SUPPLIER_NOT_CONTACTED` / `FORMAL_QUOTE_NOT_OBTAINED` |

### RFQ-MC11-02 — PCB fabrication

| Field | Content |
|---|---|
| **Scope** | Fabrication of candidate HUB, WATCH, SENSE and DISPLAY carrier/motherboard PCBs: 4–6 layer, FR-4, ENIG, controlled impedance (CAN/RS-422/USB/Ethernet), IPC class 2 target, masked/silkscreened, electrical test. |
| **Addressed to** | An EU, Spanish, Portuguese or international PCB fabrication service (no company named). |
| **Revision / qty** | Gerber revision to be issued after architecture freeze (`NOT_APPROVED`); prototype 5–10 pcs, series 100 / 500 / 1 000. |
| **Data we would provide** | Gerber/ODB++, stack-up, impedance requirements, drill, solder mask/silkscreen, surface finish, panelisation preference, IPC class. |
| **Draft covering text** | "Please quote prototype and series quantities per Q01–Q17. State your capability against our requested stack-up and IPC class, the fabrication location/EU-origin status, the electrical-test method, and whether you can deliver with a certificate of conformance and material declarations. State tooling/test charges separately and all exclusions." |
| **Status** | `RFQ_DRAFT_PREPARED` / `RFQ_APPROVAL_REQUIRED` / `RFQ_NOT_SENT` / `SUPPLIER_NOT_CONTACTED` / `FORMAL_QUOTE_NOT_OBTAINED` |

### RFQ-MC11-03 — PCB assembly (PCBA)

| Field | Content |
|---|---|
| **Scope** | Turnkey SMT/THT assembly of the candidate PCBs, including component procurement or consignment option, stencil, AOI, programming of MCU/secure element, functional test support. |
| **Addressed to** | A contract electronics manufacturer / EMS (no company named). |
| **Revision / qty** | BOM revision `NOT_APPROVED`; prototype 5, series 100 / 500 / 1 000. |
| **Data we would provide** | BOM, CPL, Gerber, approved-alternate policy, test specification, firmware image (later, under NDA). |
| **Draft covering text** | "Please quote both (a) turnkey with components and (b) consigned components, under Q01–Q17. Separate component cost, assembly cost, stencil, programming, test, tooling/NRE and logistics. State your component-buying channel and counterfeit-avoidance policy, your ESD control and IPC class, and your test coverage proposal. Identify any part in our BOM for which you would propose a substitute." |
| **Status** | `RFQ_DRAFT_PREPARED` / `RFQ_APPROVAL_REQUIRED` / `RFQ_NOT_SENT` / `SUPPLIER_NOT_CONTACTED` / `FORMAL_QUOTE_NOT_OBTAINED` |

### RFQ-MC11-04 — Electronics integration / box build

| Field | Content |
|---|---|
| **Scope** | System integration: PCB into enclosure, internal harness, connectors (M12 / NMEA 2000 / NMEA 0183 / Ethernet), antenna feed-through, labelling, final functional test, packaging for shipment. |
| **Addressed to** | An EMS / box-build integrator (no company named). |
| **Revision / qty** | Assembly drawing revision `NOT_APPROVED`; 10 / 100 / 500 units. |
| **Data we would provide** | Assembly drawings, harness drawing (to be created), enclosure drawing, torque/spec instructions, test procedure. |
| **Draft covering text** | "Please quote box-build under Q01–Q17. State what assembly documentation you require, your control of torque/fastener and gasket processes, your ability to handle stainless hardware and IP-rated cable entries, your final test capability, and what NRE you would charge to industrialise the build. State assumptions and exclusions explicitly." |
| **Status** | `RFQ_DRAFT_PREPARED` / `RFQ_APPROVAL_REQUIRED` / `RFQ_NOT_SENT` / `SUPPLIER_NOT_CONTACTED` / `FORMAL_QUOTE_NOT_OBTAINED` |

### RFQ-MC11-05 — Enclosure manufacturing

| Field | Content |
|---|---|
| **Scope** | IP-rated enclosure for HUB / WATCH / SENSE: polycarbonate or ABS, UV-stabilised, gasket, pressure-equalisation vent, M12/connector cut-outs, mounting, optional clear lid, stainless fasteners. |
| **Addressed to** | An enclosure manufacturer / injection moulder (no company named). |
| **Revision / qty** | Mechanical drawing `NOT_APPROVED`; prototype (machined or 3-D-printed) 3–5, series 100 / 500 / 1 000. |
| **Data we would provide** | 3-D model, cut-out schedule, gasket and vent specification, material requirement, marking requirements. |
| **Draft covering text** | "Please quote the enclosure and any tooling under Q01–Q17. State: available standard sizes with published IP/IK ratings, material options and UV/flammability data, whether you will tool a custom part or machine/modify a standard part, tooling cost and lead time, minimum order, and what IP/ingress verification you can supply with the parts. Do not state a product IP rating for our assembled unit; that is our responsibility and untested." |
| **Status** | `RFQ_DRAFT_PREPARED` / `RFQ_APPROVAL_REQUIRED` / `RFQ_NOT_SENT` / `SUPPLIER_NOT_CONTACTED` / `FORMAL_QUOTE_NOT_OBTAINED` |

### RFQ-MC11-06 — Environmental / ingress testing

| Field | Content |
|---|---|
| **Scope** | Qualification testing of prototype MAREA hardware: IP ingress (target IPX6/IPX7 class to be defined with the lab), damp-heat, salt-mist/corrosion, thermal cycling and operating temperature, vibration/shock (marine), and UV exposure. Every test is currently `NOT_EXECUTED`. |
| **Addressed to** | An accredited environmental test laboratory (no company named). |
| **Revision / qty** | Test plan revision `NOT_APPROVED`; 3–5 prototype units per test campaign. |
| **Data we would provide** | Test plan, DUT description, power/operating states, acceptance criteria (to be defined). |
| **Draft covering text** | "Please quote the test campaign under Q01–Q17. State: applicable standards and editions you would test to, your accreditation scope and certificate, chamber capacity, sample conditioning, in-test monitoring capability, duration, lead time and reporting format. Identify tests you cannot perform and any prerequisite you require from us. State every assumption and exclusion." |
| **Status** | `RFQ_DRAFT_PREPARED` / `RFQ_APPROVAL_REQUIRED` / `RFQ_NOT_SENT` / `SUPPLIER_NOT_CONTACTED` / `FORMAL_QUOTE_NOT_OBTAINED` |

### RFQ-MC11-07 — EMC / RED laboratory services

| Field | Content |
|---|---|
| **Scope** | EMC testing and radio assessment for the radio-equipped MAREA configurations (Wi-Fi/BLE, LTE, GNSS receive-only): emissions/immunity, radio spectrum tests, SAR/health assessment if triggered, RED documentation review support. No CE marking is claimed and none would be certified by this enquiry. |
| **Addressed to** | An EMC/RED laboratory or notified body (no company named). |
| **Revision / qty** | Configuration `NOT_APPROVED`; 2–3 representative prototypes. |
| **Data we would provide** | Intended functions, radio modules and antenna plan, power supply, enclosure, intended use/installation, draft technical file index. |
| **Draft covering text** | "Please quote a pre-assessment and test campaign under Q01–Q17. State: your accreditation and notified-body status for RED, which harmonised standards you would apply and their editions, the test matrix for our radio set, the documentation deliverables (test report, opinion), lead time and prerequisites. Identify where our design data is insufficient. State assumptions and exclusions; we are not asking you to certify a product in this enquiry." |
| **Status** | `RFQ_DRAFT_PREPARED` / `RFQ_APPROVAL_REQUIRED` / `RFQ_NOT_SENT` / `SUPPLIER_NOT_CONTACTED` / `FORMAL_QUOTE_NOT_OBTAINED` |

### RFQ-MC11-08 — Manufacturing test fixtures

| Field | Content |
|---|---|
| **Scope** | Design and build of manufacturing test fixtures: PCB functional test (FCT) bed-of-nails or pogo fixture, programming fixture for MCU/secure element, end-of-line test station with simulated NMEA 2000 / NMEA 0183 signals, pass/fail logging. |
| **Addressed to** | A test-engineering / fixture house (no company named). |
| **Revision / qty** | Test specification `NOT_APPROVED`; 1–2 fixtures per product plus spares. |
| **Data we would provide** | Schematic, test points, test specification, connector access, expected test time, logging format. |
| **Draft covering text** | "Please quote fixture design and build under Q01–Q17. Separate NRE (design, software, documentation), fixture unit price, consumables, spares, calibration and lead time. State your experience with CAN/NMEA and RF test access, and the acceptance/verification process for the fixture itself. State assumptions and exclusions." |
| **Status** | `RFQ_DRAFT_PREPARED` / `RFQ_APPROVAL_REQUIRED` / `RFQ_NOT_SENT` / `SUPPLIER_NOT_CONTACTED` / `FORMAL_QUOTE_NOT_OBTAINED` |

### RFQ-MC11-09 — Packaging

| Field | Content |
|---|---|
| **Scope** | Retail/transit packaging for marine electronics: printed carton (EU languages to be decided), ESD-safe bag, foam/insert protection, accessory box, labels (CE/RoHS/UKCA/EAN to be decided later), drop-test-qualified transit pack. |
| **Addressed to** | A packaging manufacturer (no company named). |
| **Revision / qty** | Artwork `NOT_APPROVED`; 500 / 1 000 / 5 000 units. |
| **Data we would provide** | Unit dimensions/weight, fragility, branding artwork, barcode/EAN data, required recycling marks. |
| **Draft covering text** | "Please quote packaging under Q01–Q17. Separate structural design/NRE, print tooling/die-cut, unit price per tier, MOQ, lead time and delivery terms. State which FSC/recyclability declarations you can provide, what drop/transit testing you recommend (and whether you perform it), and what artwork format you require. State assumptions and exclusions." |
| **Status** | `RFQ_DRAFT_PREPARED` / `RFQ_APPROVAL_REQUIRED` / `RFQ_NOT_SENT` / `SUPPLIER_NOT_CONTACTED` / `FORMAL_QUOTE_NOT_OBTAINED` |

### RFQ-MC11-10 — Logistics

| Field | Content |
|---|---|
| **Scope** | Inbound components, outbound finished units and RMA reverse logistics between EU suppliers, the assembly site and Spanish/Portuguese distribution; customs formalities and any EU responsible-person support. |
| **Addressed to** | A freight forwarder / logistics provider (no company named). |
| **Revision / qty** | Shipment scenarios `NOT_APPROVED`: 10 kg prototype shipments, 100–500 units series, RMA returns. |
| **Data we would provide** | Origin/destination, HS codes (to be determined), weight/volume, Incoterms preference, dangerous-goods status (batteries — to be determined), insurance requirement. |
| **Draft covering text** | "Please quote logistics under Q01–Q17: per-shipment and per-unit freight for the scenarios, fuel/security surcharges, customs clearance fees, duty/VAT handling, transit times, tracking/insurance, and reverse-logistics cost for RMA. State what customs documentation you prepare and whether you can act as importer of record or EU responsible person. State assumptions and exclusions." |
| **Status** | `RFQ_DRAFT_PREPARED` / `RFQ_APPROVAL_REQUIRED` / `RFQ_NOT_SENT` / `SUPPLIER_NOT_CONTACTED` / `FORMAL_QUOTE_NOT_OBTAINED` |

---

## 3. Transmission control record

| Control | State | Evidence |
|---|---|---|
| Suppliers contacted | **NONE** | No outbound message, call, form submission or account exists |
| Contact details / named individuals held | **NONE** | No contactName/contactEvidence fields exist in the supplier register |
| RFQs transmitted | **NONE** | All ten drafts remain internal text only |
| Approvals to transmit | **NONE GRANTED** | Each draft carries `RFQ_APPROVAL_REQUIRED` |
| Responses received | **0** | Nothing was sent, therefore no response can exist |
| Formal quotations | **0** | `FORMAL_QUOTE_NOT_OBTAINED` |
| Purchases / samples / accounts | **NONE** | `PURCHASES = NOT_AUTHORIZED`, `PROTOTYPE_PROCUREMENT = NOT_AUTHORIZED` |

**If a future authorised action is taken**, it must have: a named supplier, a named approver, a defined
scope, a recorded transmission date and channel, and its responses recorded against this file. None of
that exists today, and nothing in MC-11 should be read as if it did.

## 4. Consequence for the milestone

The ten drafts prove the RFQ process is designable and the questions are complete; they do **not**
produce commercial evidence. Therefore:

```
MC11_FORMAL_PROCUREMENT_EVIDENCE = BLOCKED_OR_NOT_OBTAINED
SUPPLIER_QUOTATION_EVIDENCE      = NONE
COSTING_BASIS_IN_MC11            = PUBLIC_CATALOGUE_OBSERVATION + ENGINEERING_ESTIMATE ONLY
```
