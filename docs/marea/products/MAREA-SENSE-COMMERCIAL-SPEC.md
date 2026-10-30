# MAREA SENSE — complete commercial specification (MC-06 / D2-SENSE)

| Field | Value |
| --- | --- |
| Document ID | MC-06 / D2-SENSE |
| Milestone | MC-06 (Master Prompt 06/36) |
| Owner | MAREA SENSE Product Director (Product function) |
| Document status | INTERNAL · COMPLETE_TARGET_SPECIFICATION · NOT_FOR_SALE |
| Product id | `SENSE` |
| Customer-facing names | MAREA SENSE · MAREA SENSE Wind · MAREA SENSE Power · MAREA SENSE Bilge · MAREA SENSE Tanks · MAREA SENSE Environment · MAREA SENSE Essentials · MAREA SENSE Sail · MAREA SENSE Systems |
| Lifecycle state | `DEFINED` (binding vocabulary, `docs/marea/COMMERCIAL-PORTFOLIO.md` §Lifecycle) |
| Branch | `feature/marea-mc06-pilot-sense-watch-products` |
| Date | 2026-10-30 |
| Contract authority | `docs/marea/products/README.md` (MC-05 conventions + MC-06 addendum §12–§23) |
| Classification | Internal pre-contractual dossier. Not a catalogue, not a product page, not a quotation, not a commercial offer |

This dossier defines the **finished commercial product family** MAREA SENSE, not an MVP, not a hardware
implementation plan and not a code audit. Engineering will decide the final hardware implementation; this
document fixes the customer experience, the module and kit architecture, the commercial vocabulary, the
measurement-and-calibration obligations, the evidence labels and the gates that must close before anything
may be sold. A complete specification is not readiness, and readiness is not availability.

The SENSE family is defined by one rule that governs every line of this document: **a reading is only a
measurement when its range, calibration state, units, source and freshness are known**. Every capability
described here is `OPEN` unless an evidence line says otherwise, and no accuracy figure, ingress rating or
certified-alarm claim exists anywhere in the programme.

---

## 1. Status block — completely specified, not for sale

### 1.1 Product-level status (contract §1 mapping)

| Dimension | Value |
| --- | --- |
| `PRODUCT_DEFINITION` | `COMPLETE_TARGET_SPECIFICATION` |
| `ENGINEERING_READINESS` | `EVIDENCE_BASED` — the MC-02 audit and its executed parser/IMU unit tests are the only engineering evidence; no SENSE product hardware, sensor, calibration or field measurement exists |
| `COMMERCIAL_AVAILABILITY` | `NOT_FOR_SALE` |
| `BRAND_CLEARANCE` | `NOT_GRANTED` — MAREA is a proposed brand; no trademark clearance exists (`X-01`) |
| `SOURCE_IP_CLEARANCE` | `NOT_CLEARED` — OPEN-MARINE grants no reuse right; no root licence, no assignment (`L-01`–`L-03`) |
| `PUBLICATION_STATE` | `INTERNAL_ONLY` |

### 1.2 Per-dimension readiness (contract §4, never collapsed into one flag)

| Dimension | SENSE value at MC-06 | Evidence and scope |
| --- | --- | --- |
| `definition` | `COMPLETE_TARGET_SPECIFICATION` | This dossier: 24 fields, module architecture, 21-line module attribute model, kit architecture, calibration obligations, acceptance scenarios |
| `engineering` | `PARTIALLY_VERIFIED` | Only with the exact MC-06 scope: executed unit tests for NMEA 0183 wind parsing and IMU fusion exist; no sensor hardware, calibration or field accuracy evidence exists. A unit-tested parser is never evidence of sensor accuracy (README §15) |
| `licensing` | `NOT_CLEARED` | `L-01`–`L-03`: no inbound grant from the source project; `S-06` Signal K image pinning; no sensor firmware licence inventory exists yet |
| `hardware` | `NOT_SELECTED` | No sensor element, BOM, enclosure, harness, connector system or bench article (`H-05`, `H-07`, `H-11`); one exact part number exists in the whole audited stack and none with a board revision |
| `dataRights` | `NOT_GRANTED` | Own-vessel measured data is permitted for on-board use; redistribution, aggregation or resale is not granted (`MARINE-DATA-RIGHTS-MATRIX.csv` MD-25; `X-07`) |
| `compliance` | `NOT_STARTED` | No EU declaration of conformity, EMC/RED/GPSR/RoHS/WEEE/CRA evidence (`H-06`); no environmental or ingress evidence (`H-05`) |
| `pricing` | `HYPOTHESIS_UNAPPROVED` | Only the entry hypothesis "individual module, from EUR 99"; kit and other module prices `OPEN` |
| `brandPublication` | `NOT_GRANTED` | `X-01`; no customer copy in this milestone is publishable |
| `availability` | `NOT_FOR_SALE` | No SKU, no stock, no order flow, no fulfilment, no support contract, no installer network |

### 1.3 Evidence classes used in this dossier (contract §5)

| Class | Meaning here |
| --- | --- |
| `VERIFIED_REPO` | Verifiable in this repository; a path is cited |
| `VERIFIED_EXTERNAL` | Verifiable at a cited public source with a check date |
| `ASSUMPTION` | An explicit planning assumption, not evidence |
| `HYPOTHESIS` | A commercial or price assumption awaiting approval |
| `OPEN` | Fact not yet established; the intended customer experience is still specified |
| `BLOCKED` | An external condition (licence, certificate, quote, measurement) prevents closure |

`OPEN` and `BLOCKED` are legitimate values. The prohibited placeholder token is not used anywhere in this
dossier, and no field is filled with an unlabelled assertion.

### 1.4 Product-specific evidence states (README §15, never upgraded)

| State | Value | Where it appears |
| --- | --- | --- |
| `SENSE_MEASUREMENT_ACCURACY` | `NOT_MEASURED` | Every module attribute model (A09), every accuracy statement, calibration plan §4–§5 |
| `SENSE_INGRESS_PROTECTION` | `NOT_VERIFIED` | Every module attribute model (A13); no ingress-protection class is stated, promised or implied |
| `SENSE_NMEA2000` | `NOT_IMPLEMENTED` | §8.2; no NMEA 2000 compatibility, licence or certification claim is made anywhere |

### 1.5 The one-message summary

MAREA SENSE is completely specified and not for sale. It measures nothing today: there is no sensor
hardware, no calibration, no field accuracy, no ingress evidence, no conformity assessment, no price list
for kits and no support organisation. Five modules and three kits describe what the family is intended to
measure, how each measurement must be calibrated and verified, what a HUB or WATCH is required for and what
is expressly not included. Those are truthful states, not defects of this document.

---

## 2. Canonical field block (convention)

Every field F01–F24 uses the contract block exactly as defined in `docs/marea/products/README.md` §6.
`Definition` describes the finished commercial experience; `Evidence` labels it; `Owner` names a function;
`Blockers / dependencies` cites MC-02 ids; `Commercial readiness` states one readiness dimension with its
value from README §4.

---

## 3. The 24 canonical fields

#### F01 — Identity
- **Definition.** MAREA SENSE is the onboard **measurement and monitoring family** of the MAREA product system: five individually purchasable sensor modules — MAREA SENSE Wind, MAREA SENSE Power, MAREA SENSE Bilge, MAREA SENSE Tanks and MAREA SENSE Environment — grouped into three preconfigured kits (MAREA SENSE Essentials, MAREA SENSE Sail, MAREA SENSE Systems). Each module measures or monitors a defined physical quantity, or converts a documented third-party measurement source into the same published data model, and exposes it with units, source, quality and freshness to compatible consumers through a MAREA HUB or a tested direct interface. Category: marine sensing and monitoring modules (HARDWARE). Family: MAREA. Code: SENSE. Positioning: honest measurement — what is measured, within what range, under what calibration, how old the value is and what is not measured are part of the product, not fine print. A SENSE module has no connectivity of its own and is not a navigation system, a certified alarm, a steering input or the vessel's required equipment.
- **Evidence.** `VERIFIED_REPO docs/marea/products/README.md` §12 (canonical SENSE ids and kit structure), `docs/marea/COMMERCIAL-PORTFOLIO.md` §05 (family intent); `VERIFIED_REPO docs/marea/compliance/MC-02-BLOCKERS-AND-DECISIONS.md` P-05; product hardware is `OPEN`/`BLOCKED` (`H-05`, `H-11`).
- **Owner.** Product management (SENSE) with hardware engineering.
- **Blockers / dependencies.** `H-05`, `H-11`, `P-05`, `X-01`.
- **Commercial readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`

#### F02 — Customer segments
- **Definition.** Primary segment: owners of recreational sailing and motor vessels roughly 6–15 m who already have a working helm but want reliable information about wind, battery, bilge, tanks or cabin environment without buying a complete new instrument ecosystem, with the pilot go-to-market in Galicia and northern Portugal. Secondary segment: independent marine electronics installers and refit yards who need documented, calibratable modules with a repeatable commissioning procedure. Tertiary segment: small charter schools, marinas and maintenance companies monitoring several boats, and second-hand buyers inheriting an undocumented installation. Buying contexts: replacement of a failed single instrument, pre-season readiness checks, refit or upgrade, winter maintenance, monitoring an unattended boat (remote path requires WATCH), and progressive expansion module by module. Explicitly not a segment: commercial shipping, classed or safety-of-life installations, any buyer seeking a certified alarm, required navigation equipment or a substitute for a bilge alarm solution, and any buyer expecting a cloud service from a module.
- **Evidence.** `VERIFIED_REPO docs/marea/WEBSITE-AND-ROADMAP.md` §1, §5 Phase A; `ASSUMPTION` segment priority and buying-context ranking; `OPEN` no primary customer interviews exist (`X-06`, milestone 09–10).
- **Owner.** Product marketing and commercial development.
- **Blockers / dependencies.** `X-06`.
- **Commercial readiness.** `availability = NOT_FOR_SALE`

#### F03 — Customer problems
- **Definition.** The problems SENSE is designed to remove: (1) working instruments that show a number but give no way to know whether it is calibrated, current or plausible; (2) a helm where wind, battery, bilge, tank and environment information lives on unrelated devices; (3) replacement pressure — a failed single sensor becomes a proposal to replace the whole instrument system; (4) retrofit uncertainty, because nobody can say in advance which sensor, sender or cable will work; (5) unattended-boat worry, which a sensor cannot solve alone; (6) no record of what was installed, calibrated and replaced, so the next owner or installer starts from zero. Existing alternatives: single-function marine instruments and gauges, battery monitors, tank gauges and bilge alarms from established brands, DIY single-board-computer or Signal K builds, and professional monitoring systems. SENSE's intended answer is modular measurement with explicit calibration, provenance and limits — not more numbers.
- **Evidence.** `ASSUMPTION` problem framing; `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` §05; `BLOCKED` `X-06` (no discovery) and `H-05` (no articles to validate the retrofit claim).
- **Owner.** Product management.
- **Blockers / dependencies.** `X-06`, `H-05`.
- **Commercial readiness.** `availability = NOT_FOR_SALE`

#### F04 — Final functionality
- **Definition.** At end state a customer receives a documented, installed, calibrated and supported measurement family that: measures the specific quantities defined for each module within a stated range; publishes every value with units, source identity, quality state, calibration state and timestamp; marks uncalibrated, out-of-range, stale and invalid values explicitly instead of displaying them as data; exposes that data to MAREA NAV, MAREA DISPLAY and MAREA WATCH **through a compatible MAREA HUB or another tested consumer**; supports commissioning, calibration records, diagnostics, firmware update with rollback and field replacement; and is delivered either through a documented low-risk self-install configuration or through the EMBARCARTE professional installation and commissioning service, according to the assessed configuration. Five modules and three kits are defined in §5–§7; each module's 21-line attribute model is in §6. The finished product deliberately does **not** include: remote connectivity in any module, a cloud service, a certified alarm function, the vessel's required equipment, steering control, NMEA 2000 capability, or any accuracy, ingress or certification claim not evidenced by test.
- **Evidence.** `OPEN` — intended end-state experience; `VERIFIED_REPO docs/marea/products/README.md` §16 rules 4–6; capability register in §4; hardware `BLOCKED` (`H-05`, `H-11`), engineering `PARTIALLY_VERIFIED` with parser-only scope (README §15).
- **Owner.** Product management (SENSE) with engineering.
- **Blockers / dependencies.** `H-05`, `H-11`, `P-02`, `P-05`, `P-10`.
- **Commercial readiness.** `engineering = PARTIALLY_VERIFIED`

#### F05 — Differentiation
- **Definition.** SENSE is relevant because it treats measurement as an accountable process rather than a number on a screen: (1) every module declares its measurement, units, intended range and calibration requirement before purchase; (2) every reading carries source, quality, freshness and calibration state, so a stale or uncalibrated value cannot masquerade as a reliable one; (3) the family is modular, so a customer can start with one module instead of replacing a working helm; (4) original MAREA measurement devices and adapters for other manufacturers' data are explicitly distinguished, so no third-party accuracy is presented as a MAREA claim; (5) installation and calibration are part of the offer, with a written commissioning record. It is not differentiated by superior accuracy, superior reliability, certified alarms, universal compatibility or remote capability; none of those is evidenced. The commercial claim is measurement transparency and ownership experience, testable through calibration records and installer outcomes once real installations exist.
- **Evidence.** `ASSUMPTION` — differentiation hypothesis; `VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §2–§4; `OPEN` no comparative test or installed base exists (`X-06`).
- **Owner.** Product management and commercial strategy.
- **Blockers / dependencies.** `P-05`, `X-05`, `X-06`.
- **Commercial readiness.** `pricing = HYPOTHESIS_UNAPPROVED`

#### F06 — Editions
- **Definition.** Three structural levels. (1) Five individual module SKUs — `SENSE-WIND`, `SENSE-POWER`, `SENSE-BILGE`, `SENSE-TANKS`, `SENSE-ENV` — each separately purchasable, each specified with the full attribute model in §6. (2) Three preconfigured kits that are bundles of modules, never a new capability: `SENSE-ESSENTIALS` (Power + Bilge starter; verdict `DEFINED`), `SENSE-SAIL` (Wind + Environment sailing instrumentation; verdict `CONDITIONAL` on verified wind measurement and HUB publishing), `SENSE-SYSTEMS` (Power + Bilge + Tanks + Environment expanded utility/environment; verdict `CONDITIONAL` on tank-sender compatibility and calibration evidence, and on four simultaneous module claims). (3) No generation label, size, version number or certification suffix is attached to any module or kit. Kit composition is fixed in §7; a kit never includes a capability its modules do not have, and no kit implies a HUB, WATCH, display or subscription. Kit-level pricing does not exist (`OPEN`); only the individual-module entry hypothesis of §17 is permitted.
- **Evidence.** `VERIFIED_REPO docs/marea/products/README.md` §12 and §18 (`SENSE-ESSENTIALS` `DEFINED`; `SENSE-SAIL`/`SENSE-SYSTEMS` `CONDITIONAL`); `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` §05; `OPEN` — module envelope, sensing elements and kit contents beyond modules (`H-11`, `H-07`).
- **Owner.** Product management (SENSE).
- **Blockers / dependencies.** `H-07`, `H-11`, `P-05`, `X-05`.
- **Commercial readiness.** `pricing = HYPOTHESIS_UNAPPROVED`

#### F07 — Included items
- **Definition.** Intended included content per module SKU: the module with its selected sensing element or input interface for that SKU; the mounting and electrical items specified for that module (exact list `OPEN` until a BOM exists); the installation, commissioning and calibration guide with a calibration record template; the licence to use the module's on-device firmware and local services for the published support window; a defined support entitlement; and professional installation and commissioning only when purchased as such. Intended exclusions, stated before purchase: MAREA HUB, MAREA WATCH, MAREA DISPLAY, MAREA NAV and any subscription; any third-party tank sender, wind sensor, cable, connector or adapter not on the documented list; the vessel's required equipment including any required bilge-alarm arrangement; a certified alarm function; cloud storage, remote alerts and connectivity hardware; installation labour when self-installed; calibration by a third party; and any compatibility not published in the matrix. No bill of materials exists, so contents beyond the module and documentation are `OPEN`.
- **Evidence.** `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` §05 (included/excluded); `OPEN` SKU content (no BOM); `BLOCKED` `H-07`, `H-11`.
- **Owner.** Product management with hardware engineering.
- **Blockers / dependencies.** `H-07`, `H-11`, `X-05`.
- **Commercial readiness.** `hardware = NOT_SELECTED`

#### F08 — Optional accessories
- **Definition.** Intended optional items, always described by function and never given an invented MAREA product name: documented cable, connector and adapter items required by specific installations; a tank sender selected for the tank and fluid where the module reads an external sender; a masthead cable or connector item where a wind sensor is fitted; replacement sensing elements; MAREA HUB where the owner wants consolidated local data and MAREA NAV/DISPLAY integration; MAREA WATCH where remote monitoring is wanted; a MAREA DISPLAY for a fixed helm view; installation, commissioning and calibration service; extended support. Every optional item is compatible only within its tested range, and no accessory name or price is approved. Unsupported third-party combinations receive a specialist assessment, not a claimed compatibility.
- **Evidence.** `VERIFIED_REPO docs/marea/brand/PRODUCT-NAMING-SYSTEM.md` §9 (accessories are not families or editions); `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` §05; `OPEN` exact accessory list; `BLOCKED` `H-07`, `H-11`, `X-05`.
- **Owner.** Product management with procurement.
- **Blockers / dependencies.** `H-07`, `H-11`, `X-05`.
- **Commercial readiness.** `hardware = NOT_SELECTED`

#### F09 — Integration
- **Definition.** Integration is governed by a published compatibility matrix, not by protocol names. The intended integration paths are: (1) direct electrical measurement by an original MAREA module of its own sensing chain; (2) documented NMEA 0183 sentence input where the module acts as an adapter (the audited wind parser accepts MWV/MWD only, and parsing is stated as sentence parsing, never as NMEA 0183 conformity); (3) documented Signal K paths where tested; (4) publication through a compatible MAREA HUB over the local vessel network, with units, source, quality, calibration state and freshness. NMEA 2000 is **not implemented and not certified** (`SENSE_NMEA2000 = NOT_IMPLEMENTED`); no NMEA 2000 compatibility of any kind is claimed. Signal K is not a blanket guarantee; compatibility is per module, per firmware version, per path and per direction, only with recorded evidence. No steering, autopilot or actuator control path is exposed or implied. A module with no compatible consumer produces no user-facing data, and a module never communicates with a shore service by itself.
- **Evidence.** `VERIFIED_REPO docs/marea/compliance/HARDWARE-COMPLIANCE-MATRIX.md` §4.1–§4.6 (NMEA 2000 stubs only; NMEA licensing; Signal K licensing); `VERIFIED_REPO docs/marea/compliance/OPEN-MARINE-CAPABILITY-INVENTORY.md` §3.2, §6.1 (wind parser and IMU tests executed; adapter catalogue type-only); `OPEN` HUB contract (`P-02`).
- **Owner.** SENSE Product Director with the HUB integration owner.
- **Blockers / dependencies.** `H-04`, `H-07`, `P-02`, `P-10`.
- **Commercial readiness.** `dataRights = NOT_GRANTED`

#### F10 — Professional installation
- **Definition.** Professional installation, commissioning and calibration is the intended route for every configuration outside a documented low-risk self-install set. The service runs from a pre-sale vessel questionnaire through equipment and tank inventory, compatibility assessment, written proposal, required materials, scheduled installation, electrical and mechanical checks, sensor calibration, function checks, handover with the calibration record, user training, support and warranty responsibility, and later module additions or replacement. Categories that are intended to require professional work regardless of the vendor decision: any work on the vessel's DC distribution or battery shunt, any tank sender work, any masthead sensor and cable run, and any installation in a fuel or engine space. A module replaced one-for-one in a documented configuration may be a self-install where the calibration can be repeated and recorded by the owner. The owner receives a permanent record (module identity, firmware version, calibration dates, reference used, checks performed, uncalibrated items, unsupported items). No installation duration, calibration duration or installation price is stated: all require measurement or quotation and are `OPEN`/`BLOCKED`.
- **Evidence.** `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` §05 buying path and quality gates; `VERIFIED_REPO docs/marea/WEBSITE-AND-ROADMAP.md` configurator rules; `ASSUMPTION` service design; `BLOCKED` no installer network, no measured installations (`X-05`, `X-06`).
- **Owner.** Service operations with the installer network.
- **Blockers / dependencies.** `H-05`, `P-02`, `X-05`, `X-06`.
- **Commercial readiness.** `availability = NOT_FOR_SALE`

#### F11 — Onboarding
- **Definition.** The first-use experience is a documented commissioning sequence, not a manual and a hope. Before purchase: a compatibility questionnaire identifies the vessel, the compartment or tank, the existing sender or sensor and the intended consumer. On delivery: the module is mounted, identified and registered in the local installation record; power and signal checks are completed; the calibration step establishes the reference and produces a dated record; the consumer (HUB, tested direct interface) shows the value with units, source, quality and freshness; the bilge and tank states are tested against a physical condition; and the owner or installer is shown the invalid, stale and fault states on purpose so a missing value is not mistaken for a normal one. The handover includes a printed or exported calibration and installation record, a list of items not recognised, and the support route. No setup screen, manual, calibration wizard or training material exists yet; the onboarding experience is `OPEN`.
- **Evidence.** `OPEN` — onboarding UX, manuals and calibration tooling not built; `ASSUMPTION` sequence; `VERIFIED_REPO docs/marea/products/README.md` §16 rules 4–6.
- **Owner.** UX and content with support engineering.
- **Blockers / dependencies.** `H-05`, `P-02`, `P-05`.
- **Commercial readiness.** `engineering = PARTIALLY_VERIFIED`

#### F12 — Licensing and subscriptions
- **Definition.** MAREA SENSE is intended as a perpetual hardware purchase under commercial terms that are not yet approved: owning a module includes the licence to use its on-device firmware and local services, with security and corrective updates inside a published support window. **No subscription is required for local measurement.** A failed, expired or absent commercial entitlement must never disable local sensing, local indication, local alarms, calibration records or diagnostics — this is a design requirement of the specification, not a tested behaviour (README §16 rule 7). MAREA WATCH is a separate hardware-plus-subscription offer; buying a SENSE module never includes connectivity, remote alerting, cloud history or a WATCH subscription. Own-vessel measured data is for on-board use; redistribution, aggregation or resale is not granted. The update support window, the treatment of a failed module outside warranty and any paid-service terms are `OPEN`; source-IP licensing is `NOT_CLEARED` (`L-01`–`L-03`, `S-06`).
- **Evidence.** `VERIFIED_REPO docs/marea/products/README.md` §16 rule 7; `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` pricing and channel decision rule; `VERIFIED_REPO docs/marea/compliance/MC-02-BLOCKERS-AND-DECISIONS.md` `L-01`–`L-03`, `S-06`; commercial terms `OPEN`.
- **Owner.** Product management with legal.
- **Blockers / dependencies.** `L-01`, `L-02`, `L-03`, `S-06`, `X-05`.
- **Commercial readiness.** `licensing = NOT_CLEARED`

#### F13 — Retail and partner pricing
- **Definition.** The only consumer price statement permitted in this milestone is a single hypothesis for the cheapest entry configuration: **individual module, from EUR 99**, VAT-inclusive retail where stated, labelled `HYPOTHESIS_UNAPPROVED` and subject to real BOM, conformity and channel cost. It is the cheapest single-module starting hypothesis only: prices for the other four modules are not established (`OPEN`), and it must not be presented as a price applicable to all modules. There is **no kit price**: `SENSE-ESSENTIALS`, `SENSE-SAIL` and `SENSE-SYSTEMS` have no figure, no "from" price and no sum of module hypotheses (`OPEN`, requires costed evidence). No partner, distributor, installer or volume price exists; B2B structure is `OPEN`.  Installation, commissioning and calibration are quoted per vessel, never bundled into a hardware hypothesis. No price may appear in checkout, catalogue or a live page before an approved price list, bottom-up costing and the readiness gates exist.
- **Evidence.** `HYPOTHESIS` — the only permitted SENSE figure and its binding qualification, `docs/marea/products/README.md` §17; `BLOCKED` `X-05` (no BOM, no quotes, no kit costing).
- **Owner.** Commercial strategy and pricing with finance.
- **Blockers / dependencies.** `X-05`, `H-07`.
- **Commercial readiness.** `pricing = HYPOTHESIS_UNAPPROVED`

#### F14 — Direct and ongoing costs
- **Definition.** A costing framework with named inputs only, because no figure exists: sensing element and its calibration at source; interface electronics, printed circuit board, enclosure, cable, connector and labelling; factory test and factory calibration fixture; conformity programme (EMC, RED where a radio is present, GPSR, RoHS, WEEE, CRA for network-connected modules, technical file, accredited laboratory); calibration equipment and reference maintenance; freight, packaging and fulfilment; payment fees; warranty accrual and returns allowance; technical and installer support including calibration questions; firmware maintenance and vulnerability handling; documentation, localisation and post-sale communication; stock financing; channel discount or installer commission. Recurring connectivity or cloud cost does not apply to any module; it belongs only to a WATCH offer. Contribution margin is deliberately not computed: presenting one would invent BOM, quote and support data.
- **Evidence.** `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` price and channel decision rule; `VERIFIED_REPO docs/marea/compliance/MC-02-BLOCKERS-AND-DECISIONS.md` `H-06`, `H-07`, `X-05`; `BLOCKED` no costed evidence exists.
- **Owner.** Finance and procurement with product management.
- **Blockers / dependencies.** `H-06`, `H-07`, `X-05`.
- **Commercial readiness.** `pricing = HYPOTHESIS_UNAPPROVED`

#### F15 — Channel economics
- **Definition.** Intended channel model: direct sale by EMBARCARTE plus authorised professional installers and refit yards, starting in Galicia and northern Portugal. Responsibility split: EMBARCARTE owns the product definition, module calibration policy, firmware, warranty and support policy; the installer owns the vessel survey, mechanical and electrical work, sensor and sender installation, calibration against the documented reference class, function checks, calibration record, handover and first-line support, and is accountable for workmanship. The path is a compatibility questionnaire that ends in an assessment or a quote request, not in an automatically asserted compatible order. Installer calibration competence, margin, discount, rebate and loyalty terms are `OPEN`; no commission, margin percentage or channel price exists. An installer agreement set, competence scheme and service-level expectations must be written before any partner is announced.
- **Evidence.** `VERIFIED_REPO docs/marea/WEBSITE-AND-ROADMAP.md` §2 installer program; `ASSUMPTION` responsibility split; `BLOCKED` `X-05`, `X-06`.
- **Owner.** Commercial development with service operations.
- **Blockers / dependencies.** `X-05`, `X-06`.
- **Commercial readiness.** `availability = NOT_FOR_SALE`

#### F16 — Competitor comparison
- **Definition.** Verifiable indirect comparables used as context and never as a superiority claim: established single-function marine instruments (wind, depth, speed), dedicated battery monitors, tank gauges and bilge-alarm products, integrated instrument systems from major marine brands, and DIY single-board-computer plus Signal K builds. These establish that the categories exist and that buyers have alternatives; they do not establish any MAREA advantage. SENSE's intended comparison points are modular entry, calibration transparency, provenance and freshness display, and the MAREA upgrade path — none of which is measured yet. No comparative accuracy, reliability, ingress or longevity test exists, and no competitor performance figure may be implied. No competitor price is cited in this dossier because no verified benchmark study for the SENSE categories exists.
- **Evidence.** `ASSUMPTION` — comparison framing; `VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §2 Class P (no performance comparisons without test evidence); `OPEN` — no benchmark study (`X-06`).
- **Owner.** Commercial strategy.
- **Blockers / dependencies.** `X-05`, `X-06`.
- **Commercial readiness.** `pricing = HYPOTHESIS_UNAPPROVED`

#### F17 — Sales arguments
- **Definition.** Honest buyer arguments and the objection handling that goes with them. Arguments: each module states what it measures and what it does not; every reading shows source, quality and freshness; uncalibrated or out-of-range values are shown as invalid, not as data; start with the measurement that fails first and add modules later; installation and calibration are documented; the boat keeps measuring locally without any subscription. Objections and answers: "do I need a HUB?" — for consolidated local data and MAREA NAV/DISPLAY integration, yes; a tested direct consumer may be possible for some modules, otherwise a module produces no user-facing data; "can it alert me at home?" — no, a SENSE module has no connectivity; remote alerts need MAREA WATCH plus connectivity plus an active subscription; "is it accurate?" — accuracy is not measured and no figure is claimed; each module states its intended range and calibration requirement, and readings outside the verified state are shown as invalid; "is it an alarm?" — no, it is not a certified alarm and does not replace the vessel's required bilge-alarm or safety arrangement; "does it work with my instruments?" — only per the published matrix, per device, firmware and direction, otherwise an assessment; "why that entry price?" — a single hypothesis for the cheapest module, not an approved or typical price; "is it NMEA 2000?" — no, NMEA 2000 is not implemented or certified.
- **Evidence.** `ASSUMPTION` — argument ranking; `VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §2–§4; no sales test exists (`X-06`).
- **Owner.** Product marketing with sales enablement.
- **Blockers / dependencies.** `X-06`, `H-04`, `P-06`.
- **Commercial readiness.** `brandPublication = NOT_GRANTED`

#### F18 — FAQ
- **Definition.** The pre-sale and post-sale questions this family must answer truthfully. What is in the box? — the module with the documented items for that SKU, the installation and calibration guide and a support entitlement; nothing else. What does each module measure? — Wind: apparent wind speed and angle (true wind only with valid vessel inputs); Power: battery/system voltage and charge/discharge current; Bilge: water presence at a switch (not continuous level); Tanks: contents level from a compatible sender; Environment: temperature, relative humidity and barometric pressure. Does it need a HUB? — for MAREA NAV/DISPLAY/WATCH integration and consolidated local data, yes; a compatible third-party consumer may be possible for some modules only where the matrix says so. Does it need WATCH? — only for remote alerts; WATCH is separate hardware plus connectivity plus subscription. Does it measure accurately? — accuracy is `NOT_MEASURED`; no figure is claimed, and each reading shows calibration and validity state. Can I install it? — only in a documented low-risk configuration; electrical, tank, masthead and engine-space work requires professional installation. Can I calibrate it myself? — only where the documented procedure and reference class are available and the record is kept; otherwise it is a professional calibration. What happens if a sensor fails? — the value is shown invalid or stale with its age; the system must not display a reassuring value it cannot support. Is it a certified alarm? — no. Is it NMEA 2000? — no. Does it need internet? — no; local measurement works without any connection. Can I sell the boat with it? — through a documented ownership transfer of the installation record and any registered device. What does it cost? — one internal hypothesis only; nothing is on sale. How long does calibration take? — not measured.
- **Evidence.** Derived from this dossier; `OPEN` where the answer depends on unbuilt capability; `VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §4–§5.
- **Owner.** Product management with content and support.
- **Blockers / dependencies.** `H-04`, `P-05`, `P-06`, `X-05`.
- **Commercial readiness.** `brandPublication = NOT_GRANTED`

#### F19 — Warranty and support
- **Definition.** Intended after-sales position: the statutory consumer guarantee under Spanish and EU law plus a contractual warranty whose duration and conditions are not yet defined and must be written before sale. Support covers module compatibility questions, installation and calibration interpretation, diagnostics, update assistance, replacement and the fault-return process; support can interpret an owner-exported diagnostic bundle without remote control of the vessel. Calibration support is part of the service boundary and must state who is responsible for the reference equipment and the record. Ownership transfer updates the registered installation without extending or resetting warranty. Response time, 24/7 service, spare-module policy, calibration turnaround and out-of-warranty repair terms must not be promised until a real service contract, calibration capability and staffing exist. The seller's legal identity is required for any warranty text and is currently absent.
- **Evidence.** `OPEN` — warranty terms, support levels, RMA and calibration service policy; `BLOCKED` `X-02` (legal identity), `H-06` (secure update lifecycle), `X-05`.
- **Owner.** Customer support with legal.
- **Blockers / dependencies.** `X-02`, `H-06`, `X-05`.
- **Commercial readiness.** `availability = NOT_FOR_SALE`

#### F20 — Bilingual product page copy
- **Definition.** The customer-facing Spanish and English copy lives in `docs/marea/products/copy/sense.es.md` and `docs/marea/products/copy/sense.en.md` (D8). This dossier fixes the facts the copy may use and the claims it may not make. The two files carry the exact 24 numbered headings of `copy/nav.es.md`/`nav.en.md`, followed by an approved-disclaimer section containing the verbatim navigation disclaimer in the matching language, the verbatim SENSE limitation statement of README §16 and the brand attribution. They must state what each module measures, when a HUB or WATCH is required, that a module alone provides no remote alerting or connectivity, that calibration is required and that no accuracy figure, ingress class, certified-alarm claim, price, stock or availability status exists. No numeric accuracy value, no ingress-protection class, no purchase call to action and no certification claim may appear. The copy is internal draft while `brandPublication = NOT_GRANTED`; visual assets remain `BLOCKED_ON_IMAGE_GENERATION` (`X-03`).
- **Evidence.** `VERIFIED_REPO docs/marea/products/README.md` §16 and §22; `VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §2–§5; `OPEN` copy review by an independent reviewer; `BLOCKED` `X-01`, `X-03`.
- **Owner.** UX, content and localisation (copy) with SENSE product review (facts).
- **Blockers / dependencies.** `X-01`, `X-03`, `H-04`.
- **Commercial readiness.** `brandPublication = NOT_GRANTED`

#### F21 — Cross-sells
- **Definition.** Intended commercial path: any module as the entry point, then MAREA HUB for consolidated local data and for MAREA NAV/DISPLAY consumption; MAREA WATCH where remote monitoring and alerting are wanted (separate hardware, connectivity and subscription); MAREA NAV to see measurement data inside navigation context; MAREA DISPLAY for a fixed helm view; MAREA SENSE kits as a preconfigured next step, never as a new capability; MAREA WEATHER as a separate forecast service that is not measurement data. MAREA PILOT boundary: validated, calibrated measurements may be consumed by a future authorised PILOT integration only after safety qualification, and no generic SENSE module is automatically acceptable as a steering input; no SENSE or PILOT document may imply a steering path. Bundle content and pricing belong to MC-08 and are not decided here; no bundle price exists, and no SENSE kit price exists. The upgrade path must be a documented addition or replacement, not an artificial barrier.
- **Evidence.** `VERIFIED_REPO docs/marea/products/README.md` §19 cross-product matrix; `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` bundle architecture; `VERIFIED_REPO docs/marea/brand/PRODUCT-NAMING-SYSTEM.md` §11.1; `OPEN` upgrade mechanics.
- **Owner.** Commercial product management.
- **Blockers / dependencies.** `P-02`, `P-06`, `X-05`, MC-08 bundle governance.
- **Commercial readiness.** `availability = NOT_FOR_SALE`

#### F22 — Retention strategy
- **Definition.** Retention is earned by usefulness and by the installation record, not by lock-in: a maintained firmware and calibration-document cadence, a growing compatibility matrix, responsive support, calibration history the owner values at resale, and a clear expansion path into further modules, HUB, WATCH, NAV or DISPLAY. The owner can export the installation record, calibration records and measured history for the vessel and can leave without losing essential local measurement. Recurring revenue exists only where a real service is delivered (WATCH subscription, installation/calibration service, extended support) and no entitlement is constructed to degrade a purchased module. Retention is measured through calibration compliance, support incidence, expansion attachment and ownership-transfer survival, not through asserted loyalty.
- **Evidence.** `ASSUMPTION` — retention hypothesis; `OPEN` — no installed base exists; `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` product-system logic and KPIs.
- **Owner.** Customer success with product management.
- **Blockers / dependencies.** `X-06`, `P-02`.
- **Commercial readiness.** `availability = NOT_FOR_SALE`

#### F23 — Success metrics
- **Definition.** Metrics to be defined and measured, with no invented targets: activation rate per module and per kit; share of installed modules with a valid calibration record before first use; calibration compliance at twelve months; measured commissioning and calibration hours per configuration (only once measured); share of readings shown invalid/stale during a defined test window; support tickets per hundred modules; sensor and calibration-related fault rate; RMA and warranty incidence; replacement and re-calibration completion rate; compatibility-matrix coverage and freshness; firmware update uptake and recovery success; kit completion and attachment into HUB, WATCH, NAV and DISPLAY; ownership-transfer completion; owner satisfaction and comprehension of "not measured / not calibrated" states. Baselines and targets are `OPEN`; stating a number now would be invented.
- **Evidence.** `OPEN` — no installation, instrumented product or sales data; `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` §05 KPIs; `VERIFIED_REPO docs/marea/products/README.md` §16 rule 4.
- **Owner.** Product operations with finance.
- **Blockers / dependencies.** `X-05`, `X-06`, `P-05`.
- **Commercial readiness.** `engineering = NOT_VERIFIED`

#### F24 — End-to-end acceptance
- **Definition.** Acceptance means the complete family demonstrably works end to end: the SENSE acceptance scenarios `SENSE-AC-01`–`SENSE-AC-14` in §11 are executed and recorded; every module's measurement chain is verified against the reference equipment class of the calibration plan with a dated calibration record; invalid, stale, out-of-range and fault states are demonstrated; measured data reaches the intended consumer (HUB or tested direct interface) with units, source, quality, calibration state and freshness; field replacement and re-calibration are exercised; environmental, ingress, electrical and EMC behaviour is measured on a physical article; the applicable conformity route is evidenced for the actual SKU; the installer and calibration service has been validated on real vessels; and a real owner has completed handover with the calibration record. Documentation alone, unit tests or simulation do not constitute acceptance. The MC-02 executed NMEA 0183 wind parsing and IMU fusion tests are parser-level evidence only (`P-10`); no scenario or gate is claimed as passing in this dossier, and all are `NOT_EXECUTED`.
- **Evidence.** `OPEN`/`BLOCKED` — scenarios in §11, gates in §12; `VERIFIED_REPO docs/marea/compliance/OPEN-MARINE-CAPABILITY-INVENTORY.md` §6.1; `VERIFIED_REPO docs/marea/products/SENSE-MEASUREMENT-AND-CALIBRATION-PLAN.md` (D10b).
- **Owner.** Quality assurance with engineering and compliance.
- **Blockers / dependencies.** `H-04`, `H-05`, `H-06`, `H-07`, `H-11`, `P-02`, `P-05`, `P-06`, `P-10`.
- **Commercial readiness.** `compliance = NOT_STARTED`

---

## 4. F04 capability-domain register — 24 mandatory final domains

This register is the substantive expansion of F04. Each domain is part of the finished commercial
experience; the evidence state says what is actually established today. `OPEN` means the experience is
defined but not evidenced; `BLOCKED` names the external condition. No domain may be dropped from the final
product because it is currently unevidenced.

| ID | Capability domain | Finished commercial experience | Evidence state | Blocking ids |
| --- | --- | --- | --- | --- |
| CD-01 | Measurement purpose per module | Each module has exactly one primary measurement purpose, stated before purchase; no module claims a quantity outside its attribute model (§6). | `OPEN` — hardware not selected | H-11, P-05 |
| CD-02 | Original device versus adapter | The customer can tell whether MAREA supplies the sensing element (original measurement device) or converts another manufacturer's documented data (adapter); adapter mode makes no MAREA accuracy claim. | `OPEN` — design decision pending | H-11, P-05 |
| CD-03 | Physical hardware package | One installed module per SKU with documented mounting and electrical items. Enclosure, harness, connector and sensing element are engineering decisions; no manufactured article exists. | `BLOCKED` — no article or BOM | H-05, H-07, H-11 |
| CD-04 | Measurement range and units | Every published value names units in the data contract and is rejected or marked invalid outside the stated range; intended ranges are `PROPOSED` targets, not achieved specifications. | `OPEN` | P-05, H-05 |
| CD-05 | Calibration state and record | Every reading carries whether the module has a valid current calibration for its configuration; a dated calibration record exists per installation and is exportable. | `OPEN` — no calibration exists | P-05, H-05 |
| CD-06 | Accuracy honesty | No numeric accuracy figure is claimed. The intended accuracy target is a `PROPOSED` validation criterion; `SENSE_MEASUREMENT_ACCURACY = NOT_MEASURED` is the canonical state. | `OPEN` — not measured | P-05, H-05, P-10 |
| CD-07 | Invalid and out-of-range handling | Uncalibrated, implausible or out-of-range values are shown as invalid or unknown, never as data; consumers receive the state, not just a number. | `OPEN` — must be designed and tested | P-02, P-05 |
| CD-08 | Stale-data handling | Each value carries age; after a defined age it becomes stale, then unavailable; no held or interpolated value is presented as current. | `OPEN` — must be designed and tested | P-02 |
| CD-09 | Failure detection | Missing source, broken sensor, open/short wiring, invalid status, checksum error and implausible jump are detected where the design supports detection; undetectable single-point failures are documented. | `OPEN` | H-05, P-05 |
| CD-10 | Sampling and timestamps | Sampling rate, averaging and timestamp behaviour are documented per module and published in the compatibility matrix; no rate is claimed before measurement. | `OPEN` | P-05 |
| CD-11 | Power and electrical requirement | Each module states its supply, fuse/breaker requirement, polarity and consumption; installation categories that require professional electrical work are identified. | `OPEN` | H-05, H-07 |
| CD-12 | Physical connection | Each module states its proposed connection to sensing elements, senders, consumers and power; exact connectors and cables remain `OPEN` until the BOM exists. | `OPEN` | H-07, H-11 |
| CD-13 | Installation environment | Each module states where it may and may not be installed (compartment, fluid, temperature, vibration, fuel/engine space caveats) without claiming an ingress class. | `OPEN` — no test evidence | H-05 |
| CD-14 | Marine protection honesty | The intended requirement is a defined marine exposure class to be evidenced by test; `SENSE_INGRESS_PROTECTION = NOT_VERIFIED`, and no ingress-protection class is stated, promised or implied anywhere. | `OPEN` — no environmental test | H-05 |
| CD-15 | Calibration procedure | Each module has a documented calibration procedure, reference class, acceptance method and record template before any sale (D10b). | `OPEN` — plan defined, not executed | P-05, H-05 |
| CD-16 | Field maintenance | Inspection and cleaning requirements and the basis for any service interval are documented; no interval is promised before evidence. | `OPEN` | P-05 |
| CD-17 | Replacement and re-calibration | A documented field replacement procedure exists per module, including re-calibration, record update and the consumer's stale/invalid behaviour during the outage. | `OPEN` | P-02, P-05 |
| CD-18 | Compatible consumers | A published compatibility matrix states, per module, firmware, consumer and direction, what is supported; no universal compatibility is claimed. | `BLOCKED` — HUB contract and tests absent | P-02, H-04 |
| CD-19 | HUB dependency | For MAREA NAV, DISPLAY and WATCH consumption, a compatible HUB is required; the customer is told this before purchase. | `OPEN` — HUB contract not frozen | P-02 |
| CD-20 | WATCH dependency | Remote alerting requires MAREA WATCH plus connectivity plus an active subscription; no SENSE module has connectivity and none pushes to shore. | `BLOCKED` — WATCH not built | P-06 |
| CD-21 | Local-only operation | Local measurement, local indication (where designed) and calibration work with no internet connection and no entitlement check on the critical path. | `OPEN` — design requirement | P-02 |
| CD-22 | Firmware update and rollback | A signed update path with recovery is defined, versioned and published before sale; vulnerability handling and support window are stated. | `BLOCKED` — CRA-compliant update absent | H-06 |
| CD-23 | Diagnostics | Per-module status, last-valid time, error counters, calibration state and a support-exportable bundle, usable by owner and installer. | `OPEN` | P-02, P-05 |
| CD-24 | Ownership transfer and end-of-life | A documented procedure transfers the installation and calibration record with the vessel, states warranty position and supports module replacement or retirement at end of support. | `BLOCKED` — no device identity or transfer system | X-07 |

---

## 5. Family architecture — five modules, three kits, one dependency rule

### 5.1 The two roles a SENSE module can have (never blurred)

| Role | What MAREA is responsible for | What it is not |
| --- | --- | --- |
| **ORIGINAL MEASUREMENT DEVICE** | The sensing element (or the sender input), the measurement chain, the calibration procedure, the published range and the quality/freshness behaviour of that chain. | It is not a certified instrument, not required navigation equipment and not a calibration authority outside its own record. |
| **ADAPTER** | Consuming a documented third-party source (for example NMEA 0183 wind sentences, a Signal K path or a tank sender) and republishing it with source identity, units, quality and freshness, plus the connection and configuration rules. | It does not acquire the third party's measurement, does not re-calibrate the source, does not validate the source's accuracy and never presents the third party's data as a MAREA measurement claim. |

The distinction appears in the module role table below, in every module attribute model (§6 A02/A07/A08/A09)
and in the copy. A module may be `DUAL` only where both roles are defined; the customer must be told which
role is active in their configuration, because the calibration obligation is different.

| Module | Intended role | Sensing element owner | Adapter input (only where tested) |
| --- | --- | --- | --- |
| `SENSE-WIND` | `DUAL` — original sensor preferred, documented adapter path | MAREA (preferred) | NMEA 0183 MWV/MWD wind sentences, or a documented Signal K wind path; current executed evidence is parser-level only |
| `SENSE-POWER` | `DUAL` — original measurement chain preferred | MAREA | Documented third-party battery-monitor data where the matrix records it |
| `SENSE-BILGE` | `ORIGINAL` — module owns the switch input and state chain | MAREA | A documented dry-contact switch input where tested; never presented as continuous level |
| `SENSE-TANKS` | `DUAL` — module is the measuring interface; the sender may be third-party | MAREA owns the module chain; the sender is not a MAREA accurate-measurement claim | Existing tank sender input classes documented per matrix; sender accuracy is not a MAREA claim |
| `SENSE-ENV` | `ORIGINAL` — on-module environmental sensing | MAREA | Documented third-party environment source where tested |

### 5.2 The five module SKUs

| SKU | Display name | Primary measurement purpose | Kit membership |
| --- | --- | --- | --- |
| `SENSE-WIND` | MAREA SENSE Wind | Apparent wind speed and angle at the masthead; true wind derived only with valid vessel inputs | `SENSE-SAIL` |
| `SENSE-POWER` | MAREA SENSE Power | Battery/system voltage and charge/discharge current; derived power and energy counting | `SENSE-ESSENTIALS`, `SENSE-SYSTEMS` |
| `SENSE-BILGE` | MAREA SENSE Bilge | Water presence / high-water state in a bilge compartment (discrete state, not continuous level) | `SENSE-ESSENTIALS`, `SENSE-SYSTEMS` |
| `SENSE-TANKS` | MAREA SENSE Tanks | Contents level of fresh-water, fuel and waste tanks from a documented sender input and tank table | `SENSE-SYSTEMS` |
| `SENSE-ENV` | MAREA SENSE Environment | Ambient temperature, relative humidity and barometric pressure; derived dew point | `SENSE-SAIL`, `SENSE-SYSTEMS` |

No module measures depth, speed through water, heading, radar, AIS traffic, engine diagnostics, exhaust gas
or any quantity not listed here. A quantity that is not listed is not measured by SENSE, and a module must
not be specified or sold as if it did.

### 5.3 The dependency rule — HUB, WATCH and local display

The rule is stated once and applies to every module and kit:

1. **A SENSE module alone provides no remote alerting and no connectivity.** It has no SIM, no Wi-Fi
   uplink to a commercial service, no cloud account and no notification path. A module may carry a local
   indication where the design includes one, but that indication is limited to the module itself, is not a
   consolidated display, is not a certified alarm and provides no history or remote data; without a consumer
   the module produces no consolidated view and no alerting path.
2. **A HUB is required for MAREA ecosystem consumption.** MAREA NAV, MAREA DISPLAY and MAREA WATCH receive
   SENSE measurements through a compatible MAREA HUB and its published local data contract. A HUB is not
   required where a module is bought solely as a source for a tested third-party consumer, and even then the
   result is only what the matrix records. A HUB is **insufficient by itself to obtain a measurement**: it
   has no sensing element for wind, power, bilge, tanks or environment.
3. **A WATCH is required for remote alerts.** Remote delivery also requires connectivity and an active
   WATCH subscription, and remains conditional on power, network coverage and notification-provider
   delivery (README §16 rule 5). A WATCH is **insufficient as a substitute for a SENSE module** and does not
   make a module calibrated.
4. **A local display is optional and never a measurement authority.** A MAREA DISPLAY (with HUB) or a
   tested third-party display can show data; the calibration state and freshness must be shown with the
   value. A display cannot make an uncalibrated reading valid.
5. **A HUB, a WATCH and a display each require their own power, installation and support** and are separate
   products, never included in a SENSE SKU.

| Unit | HUB | WATCH | Local display | Unit alone |
| --- | --- | --- | --- | --- |
| `SENSE-WIND` | `REQUIRED` for MAREA NAV/DISPLAY/WATCH; `OPTIONAL` only for a tested third-party consumer | `REQUIRED` for remote alerts; `INSUFFICIENT` for local measurement | `OPTIONAL` (MAREA DISPLAY via HUB, or tested third-party display) | `INSUFFICIENT` for a consolidated view, history or remote alerting; local indication only where designed |
| `SENSE-POWER` | `REQUIRED` for MAREA NAV/DISPLAY/WATCH; `OPTIONAL` only for a tested third-party consumer | `REQUIRED` for remote alerts; `INSUFFICIENT` for local measurement | `OPTIONAL` | `INSUFFICIENT` for a consolidated view, history or remote alerting; local indication only where designed |
| `SENSE-BILGE` | `OPTIONAL` for local MAREA history and display; `REQUIRED` if WATCH remote monitoring is wanted | `REQUIRED` for remote notification; `INSUFFICIENT` for local indication | `OPTIONAL`; any local indication is not a certified alarm | `INSUFFICIENT` for a consolidated view or remote alerting; local indication only where designed, not a certified alarm |
| `SENSE-TANKS` | `REQUIRED` for MAREA NAV/DISPLAY/WATCH; `OPTIONAL` only for a tested third-party consumer | `REQUIRED` for remote low-level notification; `INSUFFICIENT` for measurement | `OPTIONAL` | `INSUFFICIENT` for a consolidated view, history or remote alerting; local indication only where designed |
| `SENSE-ENV` | `REQUIRED` for MAREA NAV/DISPLAY/WATCH; `OPTIONAL` only for a tested third-party consumer | `REQUIRED` for remote threshold alerts; `INSUFFICIENT` for measurement | `OPTIONAL` | `INSUFFICIENT` for a consolidated view, history or remote alerting; local indication only where designed |
| `SENSE-ESSENTIALS` | `OPTIONAL` (local view/history); `REQUIRED` for WATCH remote monitoring | `REQUIRED` for remote alerts | `OPTIONAL` (MAREA DISPLAY via HUB, or tested third-party) | `INSUFFICIENT` for monitoring, history or remote alerting; local indication only where designed |
| `SENSE-SAIL` | `REQUIRED` for the MAREA sailing view (NAV/DISPLAY/WATCH); third-party display `CONDITIONAL` on tested output | `OPTIONAL` for remote view; `INSUFFICIENT` for local measurement | `OPTIONAL` with HUB + DISPLAY, or tested third-party display | `INSUFFICIENT` for a sailing instrument view, history or remote alerting; local indication only where designed |
| `SENSE-SYSTEMS` | `REQUIRED` for consolidated view and WATCH | `OPTIONAL` for remote monitored thresholds | `OPTIONAL` | `INSUFFICIENT` for a consolidated view, history or remote alerting; local indication only where designed |

### 5.4 What the family does not contain

No module, kit, HUB, WATCH or display in this dossier contains or implies: a navigation function, an ECDIS
function, AIS transmission, radar, an autopilot or steering output, a certified alarm or safety system, the
vessel's required equipment, an emergency or distress service, a guaranteed detection or prevention
function, cloud storage, a monthly subscription, cartography, weather forecasts, a mobile app, or a legal
record. These are boundaries of the product, not missing features.

---

## 6. Per-module specification — the 20-attribute model plus the canonical accuracy-evidence line

The MC-06 mandate requires **twenty attributes** for every module: measurement purpose; intended measurement
range (`PROPOSED` where unverified); units; power/supply requirement; proposed physical connection; sampling
behaviour; calibration requirement; intended accuracy requirement (`PROPOSED` target, no achieved figure);
failure detection; stale-data handling; installation environment; marine protection requirement;
maintenance; replacement; compatible consumers; HUB/WATCH dependency; firmware update requirement;
lifecycle; cost inputs (named only); and regulatory evidence. Those twenty attributes are recorded as
**A01–A08 and A10–A21** in every table below.

One further line is mandatory and is recorded separately as **A09**: the canonical accuracy evidence state
`SENSE_MEASUREMENT_ACCURACY = NOT_MEASURED`. README §15 requires that state to appear where accuracy is
discussed and it must never be merged with the A08 target, because **a target is not a measurement**. Each
table therefore carries twenty-one numbered lines — the twenty mandated attributes plus the canonical
state — and no line may be omitted. No line may contain an accuracy figure presented as achieved.

Ranges and targets marked `PROPOSED` are engineering acceptance targets for future validation, not product
specifications, not measured values and not performance claims. They may not appear in customer copy.

### 6.1 `SENSE-WIND` — MAREA SENSE Wind

| # | Attribute | Specification |
| --- | --- | --- |
| A01 | Measurement purpose | Apparent wind speed and apparent wind angle at the masthead; true wind direction/speed only when valid vessel speed and heading inputs are available, otherwise true wind is shown as unavailable. Not a navigation instrument, not a certified wind sensor and not a racing measurement system. |
| A02 | Intended measurement range | `PROPOSED`: wind speed 0–60 kn (0–30 m/s), wind angle 0–359°; adapter mode accepts only values inside the documented source envelope and rejects or marks out-of-range values. Envelope not verified (`H-11`). |
| A03 | Units | Knots and metres per second (m/s, the SI value in the data contract); degrees for angle; timestamps in UTC. No other unit is advertised before the unit-conversion tests exist. |
| A04 | Power / supply requirement | 12 V DC nominal vessel supply (24 V support `OPEN`), fused/breakered, reverse-polarity and transient protection as design requirements; own consumption `OPEN` until the sensing element is selected. |
| A05 | Proposed physical connection | Masthead sensing element and mast cable to a below-deck interface; documented connector `OPEN`; local network to HUB; optional documented NMEA 0183 serial adapter in adapter mode. No wireless wind link is specified. |
| A06 | Sampling behaviour | `PROPOSED` 1 Hz sampling of apparent wind with documented smoothing/averaging; masthead-motion compensation `OPEN`; adapter mode passes the source rate and timestamp with source age. No sampling-rate claim before measurement. |
| A07 | Calibration requirement | Required before the value is treated as valid: masthead alignment offset to the vessel centreline, verified against a reference direction; speed verification against a reference. The offset is stored and applied, and the calibration record is dated. Adapter mode does not re-calibrate the third-party source but still applies and records the vessel alignment offset where wind angle is derived. |
| A08 | Intended accuracy requirement | `PROPOSED` acceptance targets for future validation only, no achieved figure: wind speed ±1 kn or ±5% of reading (whichever is greater) over 5–40 kn after calibration; wind angle ±5° after alignment. `SENSE_MEASUREMENT_ACCURACY = NOT_MEASURED`; these targets are validation criteria, not specifications. |
| A09 | Accuracy evidence state | `SENSE_MEASUREMENT_ACCURACY = NOT_MEASURED` (`P-05`). The MC-02 executed NMEA 0183 MWV/MWD parser tests are parser-level only and are not sensor-accuracy evidence (README §15). |
| A10 | Failure detection | Missing sentences, timeout, checksum failure, NMEA status not valid, open/short cable where the interface supports detection, implausible jump, and adapter source loss. Undetectable mechanical failure of a single anemometer bearing is documented as not detectable without redundancy. |
| A11 | Stale-data handling | Each value has an age; after the documented staleness threshold it is marked stale and then unavailable; the last value is never held as current. Consumers receive `stale`/`unavailable`, not just a number. |
| A12 | Installation environment | Masthead: wind, spray, sun, vibration, cable flex; below-deck interface in a protected space. Lightning/surge and grounding design `OPEN`; installation category intended to require professional work (§9.2). |
| A13 | Marine protection requirement | `SENSE_INGRESS_PROTECTION = NOT_VERIFIED` (`H-05`). No ingress-protection class is stated, promised or implied; the intended requirement is a declared marine exposure class evidenced by test. |
| A14 | Maintenance | Visual inspection of the sensing element, cable and connector; functional check and calibration verification; the basis for any interval is `OPEN` and no service interval is promised before evidence. |
| A15 | Replacement | Field-replaceable sensing element and/or interface as designed; after replacement the alignment and speed check are repeated and the calibration record is updated; the consumer shows stale/unavailable during the outage. |
| A16 | Compatible consumers | MAREA HUB (primary, for NAV/DISPLAY/WATCH); documented NMEA 0183 consumer in adapter/source mode where the matrix records it; documented Signal K path where tested. No cloud consumer. |
| A17 | HUB / WATCH dependency | HUB `REQUIRED` for MAREA consumption and `OPTIONAL` only for a tested third-party consumer; WATCH `REQUIRED` for remote alerts and never part of the measurement; module alone `INSUFFICIENT` for a consolidated view or remote alerting; local indication only where designed. |
| A18 | Firmware update requirement | Versioned, signed firmware update with rollback and a published support window; vulnerability handling as a design requirement; no update mechanism exists today (`H-06`). |
| A19 | Lifecycle | `DEFINED` at module level; not for sale; repair, spare-sensing-element and end-of-support policy `OPEN`; ownership transfer through the installation record (`X-07`). |
| A20 | Cost inputs (named only) | Sensing element; mast cable and connector; interface electronics; enclosure/labelling; factory test and calibration fixture; conformity (EMC, GPSR, RoHS, WEEE, CRA); freight; warranty; calibration and support; channel. No figure exists (`X-05`). |
| A21 | Regulatory evidence | EMC Directive and GPSR/RoHS/WEEE/CRA applicability to be confirmed; RED only if a radio is later selected; no declaration of conformity, test report or technical file exists (`H-06`, `NOT_STARTED`). |

### 6.2 `SENSE-POWER` — MAREA SENSE Power

| # | Attribute | Specification |
| --- | --- | --- |
| A01 | Measurement purpose | Battery/system DC voltage and charge/discharge current for the monitored circuit; derived power and energy counting. State of charge is not claimed unless a verified battery model is configured and evidenced (`OPEN`). Not a battery-management system, not a charger and not a certified battery monitor. |
| A02 | Intended measurement range | `PROPOSED`: 8–32 V DC and ±100 A class current (final class depends on the selected shunt/current sensor, `OPEN`); adapter mode accepts only the documented third-party source envelope. No range is verified. |
| A03 | Units | Volts (V), amperes (A), watts (W), ampere-hours (Ah) and watt-hours (Wh) for energy counters; SI values in the data contract; sign convention for charge/discharge documented. |
| A04 | Power / supply requirement | Powered from the monitored battery/system through a fused feed, or a separate fused feed where the design requires it; own consumption `OPEN`; reverse-polarity and transient protection are design requirements. |
| A05 | Proposed physical connection | Fused supply leads and a shunt or current-sensing element in the documented circuit position; temperature sensor optional; local network to HUB. Exact wiring, fuse coordination and isolation `OPEN` (`H-11`); intended to require professional electrical installation. |
| A06 | Sampling behaviour | `PROPOSED` 1 Hz averaged voltage/current with documented averaging; peak capture and energy integration method `OPEN`; timestamps in UTC; no rate claim before test. |
| A07 | Calibration requirement | Required: voltage zero/span check against a reference meter; current zero (no load) and span against a reference load and meter; entry of the actual shunt/scale value; commissioning record dated. Adapter mode does not re-calibrate the third-party source. |
| A08 | Intended accuracy requirement | `PROPOSED` acceptance targets only: voltage ±0.1 V or ±1% of reading; current ±1% of reading or ±0.1 A; energy ±2% after calibration. `SENSE_MEASUREMENT_ACCURACY = NOT_MEASURED`; targets are validation criteria, not specifications. |
| A09 | Accuracy evidence state | `SENSE_MEASUREMENT_ACCURACY = NOT_MEASURED` (`P-05`); no bench or field measurement exists. Parser/IMU unit tests are unrelated to this module. |
| A10 | Failure detection | Open/shorted sensing path where detectable, reversed polarity, out-of-range voltage/current, implausible current step, missing adapter source, energy-counter inconsistency; fuse state is reported only where the design senses it. |
| A11 | Stale-data handling | Voltage/current aged and marked stale then unavailable; energy counters are frozen with a state flag rather than silently reset on source loss; a reset is an explicit event in the record. |
| A12 | Installation environment | Battery or electrical compartment: heat, vibration, fuel/oil vapour, possible hydrogen from lead-acid charging. Flammable-atmosphere suitability is `OPEN`; no claim of suitability inside a petrol engine space is made until assessed. |
| A13 | Marine protection requirement | `SENSE_INGRESS_PROTECTION = NOT_VERIFIED`; no ingress-protection class is stated, promised or implied; intended marine exposure class to be evidenced by test. |
| A14 | Maintenance | Fuse/breaker and terminal inspection, corrosion and torque check, calibration verification; interval basis `OPEN`; no interval promised. |
| A15 | Replacement | Module replacement retains calibration only through the documented configuration export/import once verified (`OPEN`); shunt/current-sensor replacement always requires re-calibration and a new record. |
| A16 | Compatible consumers | MAREA HUB (primary); documented third-party consumer where tested; documented Signal K path where tested. No cloud consumer. |
| A17 | HUB / WATCH dependency | HUB `REQUIRED` for MAREA consumption and `OPTIONAL` only for a tested third-party consumer; WATCH `REQUIRED` for remote alerts (and for a low-voltage notification to reach the owner); module alone `INSUFFICIENT` for a consolidated view or remote alerting; local indication only where designed. |
| A18 | Firmware update requirement | Versioned, signed update with rollback and a published support window; vulnerability handling as a design requirement; no mechanism exists today (`H-06`). |
| A19 | Lifecycle | `DEFINED`; not for sale; spare/fuse/spare-module policy `OPEN`; ownership transfer through the installation record (`X-07`). |
| A20 | Cost inputs (named only) | Voltage/current sensing chain and shunt; interface electronics; enclosure and fusing; factory test and calibration fixture; conformity; freight; warranty; calibration and support; channel. No figure exists (`X-05`). |
| A21 | Regulatory evidence | EMC, GPSR, RoHS, WEEE and CRA applicability to be confirmed; LVD re-assessed at BOM freeze (a low-voltage DC module may fall outside scope, but this is `OPEN`); no conformity evidence exists (`H-06`). |

### 6.3 `SENSE-BILGE` — MAREA SENSE Bilge

| # | Attribute | Specification |
| --- | --- | --- |
| A01 | Measurement purpose | Water presence and high-water state in a bilge compartment through a switch or contact input; optionally pump-run detection through a current-sensing input where the design supports it. It is a discrete state, not a continuous level measurement, **not a certified bilge alarm and not a substitute for the vessel's required bilge-alarm arrangement**. |
| A02 | Intended measurement range | Not a metrological range: discrete states `DRY`, `WATER_DETECTED`, `FAULT`, `UNKNOWN`; optional pump-run current range `OPEN`. The switch actuation threshold is mechanical and is verified at commissioning, not calibrated numerically. |
| A03 | Units | State enumeration (no physical unit for water presence); optional pump current in amperes and run-time in hours (`PROPOSED`). No level in mm or litres is claimed. |
| A04 | Power / supply requirement | 12 V DC nominal (24 V support `OPEN`), fused, reverse-polarity and transient protection as design requirements; low quiescent consumption is a design requirement with the value `OPEN`. |
| A05 | Proposed physical connection | Documented switch/contact input on a dedicated channel; optional pump current-sense input; local network to HUB; isolation and separation from pump motor wiring are design requirements (`OPEN`). Not a through-hull device. |
| A06 | Sampling behaviour | `PROPOSED` state sampling with debounce (order of 0.5 s, `PROPOSED`) and event timestamps; pump-run sampling `OPEN`; no sampling-rate claim before measurement. |
| A07 | Calibration requirement | No metrological calibration. Commissioning verification is mandatory: actuation test of the switch (wet/dry), wiring continuity, channel labelling, and confirmation of the displayed state and (where configured) the remote notification path. The verification is recorded and dated; periodic function testing follows the basis in the calibration plan (`OPEN`). |
| A08 | Intended accuracy requirement | `PROPOSED` acceptance criterion only: the displayed state must follow the physical switch state in the documented test, and must show `FAULT`/`UNKNOWN` — never `DRY` — when the input is unavailable or out of expected range. No numeric accuracy figure applies. `SENSE_MEASUREMENT_ACCURACY = NOT_MEASURED`. |
| A09 | Accuracy evidence state | `SENSE_MEASUREMENT_ACCURACY = NOT_MEASURED` (`P-05`); no bench or field test exists. |
| A10 | Failure detection | Open circuit, short, invalid state, missing heartbeat and implausible transitions where detectable. A **stuck switch that remains dry is not detectable without redundancy**, and this limitation is documented rather than hidden; no redundant-sensing or certified-alarm claim is made. |
| A11 | Stale-data handling | Freshness per state; if the module or input is unavailable the state becomes `UNKNOWN` with its age and is never presented as `DRY`; consumers and any configured notification see the state, not an assumed value. |
| A12 | Installation environment | Bilge: water, oil/fuel, salt, vibration, occasional immersion risk; mounting and cable routing are part of the installation. Not for explosive atmospheres; suitability in a petrol engine space is `OPEN`. |
| A13 | Marine protection requirement | `SENSE_INGRESS_PROTECTION = NOT_VERIFIED`; no ingress-protection class is stated, promised or implied; the bilge location is a stated use case, not a verified capability. |
| A14 | Maintenance | Periodic function test by actuating the switch or lifting the float, visual inspection, cable and connector check; the function-test interval basis is `OPEN` and no interval is promised. |
| A15 | Replacement | Field-replaceable switch and/or module; after replacement the commissioning verification is repeated, the channel is re-tested and the record updated; stale/unknown behaviour during the outage is demonstrated. |
| A16 | Compatible consumers | MAREA HUB (local history/display); MAREA WATCH (remote notification, separate product); a documented dry-contact or data consumer where tested. No cloud consumer. |
| A17 | HUB / WATCH dependency | WATCH `REQUIRED` for any remote notification; HUB `OPTIONAL` for local MAREA display/history and `REQUIRED` for the WATCH path; module alone `INSUFFICIENT` for a consolidated view or remote alerting; local indication only where designed, and any local indicator is not a certified alarm. |
| A18 | Firmware update requirement | Versioned, signed update with rollback and a published support window; vulnerability handling as a design requirement; no mechanism exists today (`H-06`). |
| A19 | Lifecycle | `DEFINED`; not for sale; switch/module spare policy and function-test service `OPEN`; ownership transfer through the installation record (`X-07`). |
| A20 | Cost inputs (named only) | Switch/contact input hardware and optional current sensing; interface electronics; enclosure and cable; factory test; conformity; freight; warranty; support/function-test service; channel. No figure exists (`X-05`). |
| A21 | Regulatory evidence | EMC, GPSR, RoHS, WEEE and CRA applicability to be confirmed; no declaration of conformity, test report or technical file exists (`H-06`, `NOT_STARTED`). The product is not a certified alarm or safety device and no such conformity route is claimed. |

### 6.4 `SENSE-TANKS` — MAREA SENSE Tanks

| # | Attribute | Specification |
| --- | --- | --- |
| A01 | Measurement purpose | Contents level of a fresh-water, fuel or waste tank read from a documented sender input and converted into percentage of usable capacity and, where the tank table is configured, volume. Not a certified fuel-management system, not a legal metering device and not a navigation or stability input. |
| A02 | Intended measurement range | `PROPOSED` supported sender input classes (design not selected, `OPEN`): variable-resistance senders in a documented range, voltage-output senders and current-loop senders; level 0–100% of usable capacity; volume per configured tank table. Actual classes and ranges are `OPEN` (`H-11`). |
| A03 | Units | Percent (%) of usable capacity; litres (L) or cubic metres (m³) for volume; raw sender value for diagnostics; SI values in the data contract. |
| A04 | Power / supply requirement | 12 V DC nominal (24 V support `OPEN`), fused; sender excitation from the module where required; own consumption and sender excitation limits `OPEN`. |
| A05 | Proposed physical connection | Documented sender wiring (two/three-wire as applicable), tank bonding/grounding where required, and local network to HUB. No through-hull work is implied by the module. Exact connector and cable `OPEN`; sender and tank electrical work is intended to require professional installation. |
| A06 | Sampling behaviour | `PROPOSED` low-rate sampling (order of 0.2–1 Hz) with damping for vessel motion; fuel-slosh filtering `OPEN`; per-tank timestamps in UTC; no rate claim before measurement. |
| A07 | Calibration requirement | Required per tank: empty and full reference points, a tank-shape/volume table with intermediate points, and sender-type configuration; verification against a physical reference at commissioning (sight glass, dip, known fill or weighing, as applicable). Re-calibration after sender replacement, tank work or geometry change. The calibration record states the reference used and the tank table version. |
| A08 | Intended accuracy requirement | `PROPOSED` acceptance targets only: ±5% of usable capacity after commissioning calibration for a tank with a defined geometry; ±10% for an irregular tank; level trend and low-level warning must not be presented as a measurement where the sender is out of range. `SENSE_MEASUREMENT_ACCURACY = NOT_MEASURED`; no achieved figure exists. |
| A09 | Accuracy evidence state | `SENSE_MEASUREMENT_ACCURACY = NOT_MEASURED` (`P-05`); sender accuracy and tank geometry dominate the result and are not a MAREA measurement claim. |
| A10 | Failure detection | Sender open/short, out-of-range resistance or voltage, implausible step, missing tank table, per-tank source loss, and adapter source loss. A stuck sender that reads a plausible value is not detectable without a reference and is documented as a limitation. |
| A11 | Stale-data handling | Level aged and marked stale then unavailable; no full/empty value is displayed from a lost sender; percentage always shown with quality state; a low-level notification depends on WATCH and is not generated by the module alone. |
| A12 | Installation environment | Tank space: fuel vapour, water, waste, corrosion, limited access; sender and cabling material compatibility with the fluid is `OPEN` (not selected); no combustible-atmosphere suitability claim is made. |
| A13 | Marine protection requirement | `SENSE_INGRESS_PROTECTION = NOT_VERIFIED`; no ingress-protection class is stated, promised or implied; the tank-space location is a stated use case, not a verified capability. |
| A14 | Maintenance | Sender cleaning/inspection, calibration verification against a physical reference, cable and grounding check; interval basis `OPEN`; no interval promised. |
| A15 | Replacement | Sender replacement requires re-calibration and a new record; module replacement retains the tank table and calibration only through the documented configuration export/import once verified (`OPEN`); the consumer shows stale/unknown during the outage. |
| A16 | Compatible consumers | MAREA HUB (primary, for NAV/DISPLAY/WATCH); documented third-party consumer where tested; documented Signal K path where tested. No cloud consumer. |
| A17 | HUB / WATCH dependency | HUB `REQUIRED` for MAREA consumption and `OPTIONAL` only for a tested third-party consumer; WATCH `REQUIRED` for a remote low-level notification; module alone `INSUFFICIENT` for a consolidated view or remote alerting; local indication only where designed. |
| A18 | Firmware update requirement | Versioned, signed update with rollback and a published support window; sender compatibility is version-pinned per module; vulnerability handling as a design requirement; no mechanism exists today (`H-06`). |
| A19 | Lifecycle | `DEFINED`; not for sale; sender/tank-table compatibility list and end-of-support policy `OPEN`; ownership transfer through the installation record (`X-07`). |
| A20 | Cost inputs (named only) | Sender interface electronics; connector/cable; enclosure; factory test and calibration fixture; conformity; freight; warranty; calibration and support; channel. No figure exists (`X-05`). |
| A21 | Regulatory evidence | EMC, GPSR, RoHS, WEEE and CRA applicability to be confirmed; no conformity evidence exists (`H-06`). No legal-metrology or fuel-management certification is claimed and none is planned for this module. |

### 6.5 `SENSE-ENV` — MAREA SENSE Environment

| # | Attribute | Specification |
| --- | --- | --- |
| A01 | Measurement purpose | Ambient temperature, relative humidity and barometric pressure in a cabin, locker or protected compartment; derived dew point. Not a weather forecast, not a certified fire/gas/CO detector, not a cabin-air-quality monitor and not a substitute for any required safety device. |
| A02 | Intended measurement range | `PROPOSED`: temperature −20…+60 °C; relative humidity 0–100% RH; pressure 300–1100 hPa; a higher-temperature engine-space variant is `OPEN`. Ranges are not verified (`H-11`). |
| A03 | Units | Degrees Celsius (°C), percent relative humidity (%RH), hectopascals (hPa); dew point in °C; SI values in the data contract. |
| A04 | Power / supply requirement | Intended low-power module; supply from 12 V DC nominal with fuse/breaker, or a documented bus supply where the design permits; own consumption `OPEN`. |
| A05 | Proposed physical connection | Wired sensing element at the monitored location, documented cable to the interface and local network to HUB; placement guidance (away from heat sources, sunlight, bilge water and direct spray) is part of the installation. Connector/cable `OPEN`. |
| A06 | Sampling behaviour | `PROPOSED` 5–30 s sampling interval for environmental values with documented averaging; derived dew point computed from temperature and relative humidity; no rate claim before test. |
| A07 | Calibration requirement | Field calibration of the sensing element is assumed to be factory-set for the selected element; field verification against a reference thermometer/hygrometer/barometer is required at commissioning and after replacement; no field span adjustment is claimed unless the design supports it. Adapter mode does not re-calibrate the third-party source. |
| A08 | Intended accuracy requirement | `PROPOSED` acceptance targets only: temperature ±0.5 °C; relative humidity ±3–5% RH; pressure ±2 hPa over the stated range. `SENSE_MEASUREMENT_ACCURACY = NOT_MEASURED`; no achieved figure exists. |
| A09 | Accuracy evidence state | `SENSE_MEASUREMENT_ACCURACY = NOT_MEASURED` (`P-05`); no bench, chamber or field measurement exists. |
| A10 | Failure detection | Missing sensor, communication error, out-of-range value, implausible rate of change, condensation/soaking indication where the element supports it, adapter source loss. |
| A11 | Stale-data handling | Values aged and marked stale then unavailable; derived dew point invalidated when temperature or humidity is stale; last value never held as current. |
| A12 | Installation environment | Cabin, locker or protected compartment; condensation, salt air and heat exposure depend on location; engine-space use `OPEN`; sensor placement is part of the installation. |
| A13 | Marine protection requirement | `SENSE_INGRESS_PROTECTION = NOT_VERIFIED`; no ingress-protection class is stated, promised or implied. |
| A14 | Maintenance | Sensor inspection and cleaning, placement check, verification against a reference; interval basis `OPEN`; no interval promised. |
| A15 | Replacement | Field-replaceable sensing element/module; after replacement the verification against the reference is repeated and the record updated; no field re-calibration is claimed unless supported and evidenced. |
| A16 | Compatible consumers | MAREA HUB (primary, for NAV/DISPLAY/WATCH threshold views); documented third-party consumer where tested; documented Signal K path where tested. No cloud consumer. |
| A17 | HUB / WATCH dependency | HUB `REQUIRED` for MAREA consumption and `OPTIONAL` only for a tested third-party consumer; WATCH `REQUIRED` for remote threshold alerts; module alone `INSUFFICIENT` for a consolidated view or remote alerting; local indication only where designed. |
| A18 | Firmware update requirement | Versioned, signed update with rollback and a published support window; vulnerability handling as a design requirement; no mechanism exists today (`H-06`). |
| A19 | Lifecycle | `DEFINED`; not for sale; sensing-element spare policy and end-of-support policy `OPEN`; ownership transfer through the installation record (`X-07`). |
| A20 | Cost inputs (named only) | Environmental sensing element; interface electronics; enclosure and cable; factory test and reference verification; conformity; freight; warranty; support; channel. No figure exists (`X-05`). |
| A21 | Regulatory evidence | EMC, GPSR, RoHS, WEEE and CRA applicability to be confirmed; no radio is intended, so RED is `OPEN` pending design; no conformity evidence exists (`H-06`, `NOT_STARTED`). Not a detector for fire, gas, carbon monoxide or any safety hazard, and no such certification is claimed. |

---

## 7. Kit specifications — bundles of modules, never new capability

A kit is a **preconfigured bundle of module SKUs plus documented installation items**. It never invents a
measurement, never adds connectivity and never includes a HUB, WATCH, DISPLAY, NAV subscription or
installation service. Every kit is covered by the individual module specifications of §6; where a kit
includes a module, that module's attribute model applies unchanged. Kit verdicts are the batch-02 edition
verdicts: `DEFINED` or `CONDITIONAL` only (README §14); `RELEASED`/`AVAILABLE`/`APPROVED`/`PUBLISHABLE` are
prohibited. No kit price exists.

### 7.1 `SENSE-ESSENTIALS` — MAREA SENSE Essentials (verdict `DEFINED`)

| Aspect | Specification |
| --- | --- |
| Composition | `SENSE-POWER` + `SENSE-BILGE`; documented power/bilge installation items (`OPEN` until BOM). |
| Customer outcome | A battery and bilge starter set: know the monitored battery's voltage/current state and whether water is present in the monitored bilge compartment, with the provenance and limits of both. |
| Capability source | Every capability comes from the two modules; the kit adds no sensing, no alarm certification and no connectivity. |
| Excluded | HUB, WATCH, DISPLAY, NAV, subscription, installation and calibration labour, any third-party switch/sender/cabling not on the list, a certified alarm, cloud history. |
| HUB dependence | `OPTIONAL` for local display/history in the MAREA ecosystem and `REQUIRED` for the WATCH remote path; without a consumer the kit produces no user-facing data. |
| WATCH dependence | `REQUIRED` for any remote alert; the kit itself cannot notify anyone. |
| Local display | `OPTIONAL` via a HUB plus a MAREA DISPLAY or a tested third-party display; any module-level indicator is not a certified alarm. |
| Why `DEFINED` | The customer-facing configuration is fully coherent and does not depend on an unverified differentiation claim beyond the standard product gates; power and bilge are the simplest measurement envelopes in the family. This verdict is not readiness and not availability. |
| Condition to remain valid | No condition beyond the common gates in §12. If a module's measurement purpose changes, the kit reverts to `CONDITIONAL` and is re-reviewed. |

### 7.2 `SENSE-SAIL` — MAREA SENSE Sail (verdict `CONDITIONAL`)

| Aspect | Specification |
| --- | --- |
| Composition | `SENSE-WIND` + `SENSE-ENV`; documented masthead cable/connector items (`OPEN` until BOM). |
| Customer outcome | Sailing instrumentation: apparent wind and environment readings with calibration state and provenance, available to a compatible consumer. |
| Capability source | Wind measurement from `SENSE-WIND`, environment from `SENSE-ENV`; the kit invents nothing. |
| Excluded | HUB, WATCH, DISPLAY, NAV, PILOT, subscription, installation/calibration labour, a third-party wind instrument unless the matrix records it, a certified instrument claim. |
| HUB dependence | `REQUIRED` for the MAREA NAV/DISPLAY/WATCH view and for the intended installation; a tested third-party display is `CONDITIONAL` on the published matrix. |
| WATCH dependence | `OPTIONAL` for remote viewing of the same values; `INSUFFICIENT` to perform the measurement. |
| Local display | `OPTIONAL` with HUB + DISPLAY, or a tested third-party display; without a consumer the kit shows nothing. |
| Why `CONDITIONAL` | The kit's value depends on wind measurement that is not yet verified: no wind sensor hardware, no calibration and no field accuracy evidence exist (`P-05`, `H-11`). The executed NMEA 0183 wind parser tests are parser-level only. |
| Condition that closes it | A selected wind sensing element; executed calibration against the reference class; documented accuracy validation within the `PROPOSED` targets; a verified HUB publishing path; and an installer-validated installation. Until then the kit is not sold as sailing instrumentation. |

### 7.3 `SENSE-SYSTEMS` — MAREA SENSE Systems (verdict `CONDITIONAL`)

| Aspect | Specification |
| --- | --- |
| Composition | `SENSE-POWER` + `SENSE-BILGE` + `SENSE-TANKS` + `SENSE-ENV`; documented installation items (`OPEN` until BOM). |
| Customer outcome | Expanded utility and environment monitoring: battery state, bilge water presence, tank contents and compartment environment in one purchased configuration, each with its own calibration state and limits. |
| Capability source | All capabilities come from the four modules; the kit adds no capability of its own. |
| Excluded | HUB, WATCH, DISPLAY, NAV, subscription, tank senders not on the documented list, installation/calibration labour, a fuel-management or legal-metrology claim, a certified alarm. |
| HUB dependence | `REQUIRED` for the consolidated view and for WATCH; without a consumer the kit produces no user-facing data. |
| WATCH dependence | `OPTIONAL` for remote monitored thresholds; `INSUFFICIENT` to perform the measurements. |
| Local display | `OPTIONAL` via HUB + DISPLAY or a tested third-party display. |
| Why `CONDITIONAL` | Tank measurement depends on sender classes and tank geometry that are not yet validated; tank accuracy is dominated by the sender and the tank table (`P-05`, `H-11`), and no per-sender test matrix or reference-tank calibration exists. The kit also depends on four simultaneous module claims (power, bilge, tanks, environment) and a multi-module installation, so a failure in any one measurement makes the whole kit conditional. |
| Condition that closes it | A documented per-sender compatibility list; a completed reference-tank calibration procedure with recorded acceptance results; verified tank-table behaviour; bilge function-test and fail-visible evidence; power and environment measurement evidence; a verified HUB publishing path; and installer validation on real tanks (including fuel) and on a multi-module installation. Until then the kit is not sold as expanded utility monitoring. |

### 7.4 Kit rules that may never be relaxed

1. A kit never includes a capability absent from its modules, and never a measurement absent from §6.
2. A kit never includes a HUB, WATCH, DISPLAY, NAV, subscription or professional service; those are
   separate products and separate purchases.
3. A kit price does not exist (`OPEN`); no sum of module hypotheses may be presented as a kit price and no
   kit may be described as "from" a figure.
4. A `CONDITIONAL` kit must state its closing condition in customer-facing material; it may not be presented
   as a complete, validated system.
5. A `DEFINED` kit is a coherent configuration, not availability: it remains `NOT_FOR_SALE` until the gates
   in §12 close.

---

## 8. Integration and compatibility policy

### 8.1 Principles

1. Compatibility is a claim about a **module, a firmware version, a consumer, a data type and a direction**,
   backed by a recorded test — never about a protocol name or a brand.
2. The published compatibility matrix is the single authority. A device not in the matrix is "not assessed",
   not "probably works".
3. No universal-compatibility claim is made: nothing is implied by a connector, a protocol name or a
   category.
4. A SENSE module publishes **measurement data only**; it does not publish control commands, does not accept
   steering commands and has no actuator output.
5. Own-vessel measured data is for on-board use; redistribution, aggregation or resale is not granted and no
   shore service may receive it from a SENSE module.

### 8.2 Protocol statements that must appear exactly this way

- **NMEA 2000 is not implemented and not certified in MAREA SENSE.** The audited source contains type
  declarations and disabled stubs only (`H-04`, `SENSE_NMEA2000 = NOT_IMPLEMENTED`). No NMEA 2000
  compatibility, licence or certification is claimed, and the matrix will not list NMEA 2000 while `H-04`
  and `DEC-05` are open.
- **NMEA 0183 sentence parsing is not conformance to the NMEA 0183 standard.** The executed evidence is a
  bespoke MWV/MWD parser with checksum validation; copy may say "reads documented NMEA 0183 wind sentences"
  only after a recorded device test, and must never say "NMEA 0183 compliant" or "certified".
- **Signal K is not a blanket compatibility guarantee.** Consumption and publication are per source, per
  version, per path and per direction; no product test exists.
- **No steering or autopilot control path** exists or is planned in SENSE.

### 8.3 Data contract expectations for a compatible consumer

Every published measurement must carry, at minimum: module identity and SKU; sensor or source identity;
quantity and units; value; quality state (`VALID` / `INVALID` / `UNKNOWN`); calibration state and
calibration record reference; timestamp and age; freshness state (current / stale / unavailable); and the
firmware version of the module. A consumer that cannot render the quality, calibration and freshness state
must not display the value as reliable. This table is a requirement for the D5 compatibility contract and
the HUB owner, and it is not yet implemented (`P-02`).

---

## 9. Installation, commissioning, calibration, diagnostics and replacement

### 9.1 The intended service chain

| Step | What happens | Customer-visible outcome | Status |
| --- | --- | --- | --- |
| 1. Pre-sale questionnaire | Owner describes the vessel, compartment/tank, existing sender or sensor, consumer and goal | A clear starting point and expected next step | `OPEN` — configurator not built |
| 2. Equipment and sender inventory | Existing instruments, senders, tank geometry, cabling and power context recorded | The vessel's actual measurement inventory, in writing | `OPEN` |
| 3. Compatibility assessment | Each item mapped to the published matrix; unsupported items named | Supported / conditional / not supported verdict | `BLOCKED` — matrix not evidenced (`P-02`) |
| 4. Installation proposal | Scope, materials, responsibilities and quotation for that vessel | A written, vessel-specific proposal | `OPEN` — no installer agreements |
| 5. Required materials | Documented modules, cables, connectors, senders and accessories identified | Exact list, no improvisation later | `OPEN` — accessory list not frozen (`H-07`) |
| 6. Scheduled installation | Installer performs the physical installation and electrical work | Appointment and installation record | `BLOCKED` — no installer network |
| 7. Commissioning | Power, signal and identity checks; consumer discovery; labels recorded | A configured, documented installation | `OPEN` |
| 8. Calibration | Each module calibrated against its reference class per the calibration plan; calibration record written | A dated calibration record with reference, method and result | `OPEN` — plan defined in D10b, not executed |
| 9. Function checks | Each measurement, invalid state, stale state and fault state demonstrated on the vessel | A signed checks list | `OPEN` |
| 10. Customer handover | What is measured, what is not, HUB/WATCH dependency, limitations, support route | Owner understands the real system | `OPEN` |
| 11. Training | Short structured training on reading quality/calibration state, calibration records, replacement and support | Owner able to use and diagnose basic issues | `OPEN` |
| 12. Support and warranty responsibility | Named boundary between installer, EMBARCARTE support and warranty | One accountable route | `BLOCKED` — terms and legal identity absent (`X-02`, `X-05`) |
| 13. Later additions and replacement | Documented path to add modules, HUB, WATCH, DISPLAY or replace a sensor, with re-calibration | Predictable expansion, not a dead end | `OPEN` — upgrade mechanics |

### 9.2 Self-install boundary

| Aspect | Self-install configuration | Professionally installed configuration |
| --- | --- | --- |
| When permitted | Only when the questionnaire deterministically confirms a documented low-risk configuration with no tank, masthead, engine-space or DC-distribution work, and where the documented calibration can be performed by the owner and recorded | Every other configuration: DC distribution, shunt, tank sender, masthead sensor/cable, fuel or engine space, or any installation the owner delegates |
| Who does the work | Owner, following the published guide | EMBARCARTE-authorised installer/refit yard |
| What the owner receives | Module, guide, calibration record template, diagnostic export route | The full chain in §9.1 plus calibration record and handover |
| Support boundary | EMBARCARTE supports the product and documented steps; vessel wiring, tanks and third-party devices remain the owner's responsibility | EMBARCARTE and the installer share a defined boundary; workmanship is the installer's responsibility |
| Claimed duration or price | None — not measured | None — quotation per vessel, not measured |
| Current availability | `NOT_FOR_SALE` | `NOT_FOR_SALE`; installer and calibration network does not exist |

No installer certification scheme, calibration competence register, service-level agreement or measured
installation time exists. No technician-certification claim and no installation/calibration time or price
figure may be made until those artefacts exist.

### 9.3 Diagnostics

At end state, per module: identity and firmware version; power and communication status; last-valid time and
current age; quality and calibration state; error counters; the configured range and tank table version;
the last calibration record reference; and a support-exportable bundle that contains no remote-control
capability. Diagnostics are intended for owner and installer and must not require a cloud connection. None
of this is built. Diagnostics are a product requirement derived from CD-23 and the calibration plan §4.9.

### 9.4 Replacement procedure (intended, not executed)

1. Record the affected module identity, firmware version and current calibration record.
2. Put the consumer into a documented maintenance state; the module's values become stale, then unavailable.
3. Isolate power using the vessel's documented procedure; for power-module work, isolate the monitored DC
   circuit and follow the installation safety rules.
4. Remove and replace the module or sensing element with a documented compatible item.
5. Restore power and verify identity, version and communication.
6. Re-run the module's calibration procedure and write a new dated record (bilge: repeat the actuation
   verification; tanks: repeat empty/full and tank-table verification; wind: repeat alignment/speed check;
   power: repeat zero/span; environment: repeat reference verification).
7. Demonstrate valid, invalid, stale and fault states to the owner; update the installation record and
   support case.
8. Dispose of the old module according to WEEE obligations once the producer registration exists (`H-06`).

### 9.5 Ownership transfer and end-of-life

A documented transfer moves the installation record, module identities and calibration records with the
vessel, revokes prior account access where any account exists, and states the warranty position. Warranty
does not reset on transfer; support terms transfer only as published. End-of-life is defined per module when
the support window closes: no further firmware updates, documented replacement path, WEEE disposition and a
truthful statement that the module is at end of support. This is `BLOCKED` because no device identity,
registration or transfer system exists (`X-07`), and it is a requirement, not a current capability.

---

## 10. Customer journeys

### J1 — Owner replacing a failed single instrument
**Situation.** A 10–12 m sailing yacht with a working plotter and instruments, one failed wind display or a
battery monitor that no longer agrees with reality. **Finished experience.** The owner completes the
questionnaire, receives a compatibility verdict, buys one assessed module, gets it installed and calibrated,
and sees one value with its source, quality and freshness in the MAREA HUB view; the rest of the helm stays
as it was. **Boundary.** HUB is required for the MAREA view; third-party consumption only per matrix.
**Status.** `OPEN`; no reference installation exists.

### J2 — Owner monitoring an unattended boat
**Situation.** Owner leaves the boat in a marina and wants to know about water in the bilge or a low battery.
**Finished experience.** Bilge and power modules are installed and calibrated; a WATCH (separate hardware,
connectivity and subscription) delivers a notification when a defined condition is met. The owner is told,
before purchase, that delivery depends on power, network coverage and provider delivery and that it is not a
certified alarm. **Boundary.** SENSE alone cannot alert; WATCH cannot measure. **Status.** `BLOCKED` — WATCH
ingestion and notification pipeline do not exist (`P-06`).

### J3 — Installer commissioning a SENSE kit
**Situation.** A refit yard installs SENSE-SYSTEMS or SENSE-SAIL on a vessel with existing tanks and a
working helm. **Finished experience.** The installer uses the compatibility assessment, documented materials
and calibration procedures, writes the calibration records, demonstrates invalid/stale/fault states and hands
over a signed installation record. **Boundary.** Workmanship is the installer's; product definition,
calibration policy and firmware are EMBARCARTE's. **Status.** `OPEN` — service design; `BLOCKED` no installer
network or calibration capability.

### J4 — Owner replacing a tank sender or a wind sensor
**Situation.** A sensor fails after several seasons. **Finished experience.** A documented replacement item is
fitted, the calibration procedure is repeated and a new record is written; the previous calibration history
stays with the vessel. **Boundary.** Sender/third-party component accuracy is not a MAREA claim. **Status.**
`OPEN` — replacement procedure defined, not executed.

### J5 — Ownership transfer on sale of the vessel
**Situation.** The vessel is sold with a SENSE installation. **Finished experience.** The installation and
calibration records transfer with the vessel, prior registered access is revoked, and the new owner is told
what remains under warranty and what is due for re-calibration. **Boundary.** No identity or transfer system
exists. **Status.** `BLOCKED` — `X-07`.

---

## 11. Acceptance scenarios — `SENSE-AC-01` to `SENSE-AC-14`

No scenario has been executed. Classification uses `BLOCKED`, `OPEN` or `NOT_EXECUTED`; `PASS` is not
available at this milestone and must not be recorded. Executed parser/IMU unit tests are not acceptance of
any scenario below.

| ID | Scenario | Expected intended behaviour | Classification | Evidence needed before any pass |
| --- | --- | --- | --- | --- |
| SENSE-AC-01 | Module power-up and identification | Module powers from a fused supply, reports identity, SKU and firmware version, and enters a safe state with no fabricated values | `BLOCKED` | Built article, bench power test, startup log (`H-05`, `H-11`) |
| SENSE-AC-02 | Bench measurement check against reference class | Each module's value tracks a reference (anemometer, reference meter, thermometer/hygrometer, level reference) within the `PROPOSED` targets after calibration | `BLOCKED` | Calibration rig, reference equipment, recorded results (D10b) |
| SENSE-AC-03 | Calibration record created and stored | A dated record with reference, method, points, result and operator is written, exportable and associated with the module identity | `OPEN` | Calibration tooling and record format implemented |
| SENSE-AC-04 | Uncalibrated module never presented as reliable | Before calibration, values show `INVALID`/`UNCALIBRATED`; consumers receive the state, not just a number | `OPEN` | UI and data-contract test (`P-02`) |
| SENSE-AC-05 | Out-of-range value rejected | A value outside the documented range is rejected or marked invalid and never displayed as a valid measurement | `OPEN` | Fault-injection test |
| SENSE-AC-06 | Source loss produces stale then unavailable | On source loss, the value becomes stale with age and then unavailable; last value is not held as current | `OPEN` | Fault-injection test with timestamps |
| SENSE-AC-07 | Wiring/sensor fault detected where supported | Open/shorted input or missing sensor is reported as `FAULT`; undetectable single-point failures are documented | `OPEN` | Fault-injection matrix per module (`H-05`) |
| SENSE-AC-08 | Bilge never reads `DRY` when unavailable | With the input removed or the module offline, the state is `UNKNOWN`/`FAULT`, never `DRY`; a stuck-dry switch limitation is documented | `OPEN` | Fault-injection and comprehension test |
| SENSE-AC-09 | Tank empty/full calibration against a physical reference | Empty and full points and the tank table are verified against a physical reference; the record states the reference used | `BLOCKED` | Reference tank/vehicle and calibration procedure |
| SENSE-AC-10 | HUB integration and provenance | Measurements reach a compatible HUB with units, source, quality, calibration state and freshness; NAV/DISPLAY show the state | `BLOCKED` | HUB contract implemented and tested (`P-02`) |
| SENSE-AC-11 | Air-gapped local operation | With no internet connection, local measurement, local display (where designed) and calibration continue; no entitlement check blocks them | `OPEN` | Controlled network-loss test (`P-02`) |
| SENSE-AC-12 | Firmware update fails safely | An interrupted or rejected update returns the module to the last working version and preserves the calibration record | `BLOCKED` | Signed update and rollback implementation (`H-06`) |
| SENSE-AC-13 | Field replacement and re-calibration | A replaced module/sensor is re-calibrated, the new record is written and the consumer shows stale/unavailable during the outage | `OPEN` | Replacement procedure executed on a real installation |
| SENSE-AC-14 | Environmental and ingress evidence on the article | The actual module enclosure is tested for the declared marine exposure class; no class is claimed before the result | `BLOCKED` | Environmental/ingress test on the article (`H-05`) |

**Acceptance verdict: 0 of 14 scenarios passed; overall `NOT_EXECUTED` / `BLOCKED`.** The scenario count is
evidence of definition completeness, not of product readiness. The MC-02 executed NMEA 0183 wind parsing and
IMU fusion tests are parser-level only and do not pass any scenario above (README §15; `P-10`).

---

## 12. Traceability annex — blockers and evidence required before sale

### 12.1 Mandatory blocker mapping

| Blocker | What it prevents for MAREA SENSE | Closed only by |
| --- | --- | --- |
| `H-04` | NMEA 2000 is not implemented (type stubs only); NMEA requires licence, manufacturer/product codes and certification for products reading or transmitting NMEA 2000 | DEC-05 decision: licence/certify or scope reduction to NMEA 0183/Signal K with NMEA 2000 language retired |
| `H-05` | No physical build, measurement, environmental or EMC evidence; no ingress or thermal evidence | Prototype BOM, bench measurements, thermal/ingress/vibration tests, EMC pre-scan on the actual article |
| `H-06` | CE/EMC/GPSR/RoHS/WEEE/CRA obligations are not started; no declaration of conformity or test report; RED applicability unknown for any radio that might be added | Applicability review, harmonised standards, accredited laboratory results, technical file, EU declaration of conformity, producer registrations, CRA vulnerability handling |
| `H-07` | No BOM, supplier quotes, manufacturing or traceability evidence; no connector/cable specification | Real RFQs, approved vendor list, part numbers/revisions, serial traceability |
| `H-11` | No sensor, sender or enclosure hardware exists; all selection is conceptual | Hardware selection, prototype, bench and environmental validation |
| `P-02` | Architecture and data contract are reusable but there is no product hardware, no certified interface and the HUB contract is not frozen; SENSE consumption depends on it | Frozen HUB interface contract with units/quality/freshness, supported protocol matrix and test evidence |
| `P-05` | No sensor product exists; only generic adapters and wind/IMU publishing | Sensor selection, calibration and measurement validation per module |
| `P-06` | Remote monitoring foundation is NOT_FOUND: no telemetry ingestion, device identity, notification pipeline or subscription service; the WATCH dependency cannot be evidenced | WATCH build with secure identity, ingestion, notification pipeline and billing |
| `P-10` | Engineering reuse is inventory-level; Node/TypeScript suites are unexecuted; only wind parser and IMU unit tests were executed | Reproducible test environment and executed test report per reused module |
| `X-01` | MAREA is a proposed brand; no trademark clearance; nothing may be published as registered | EUIPO/OEPM clearance before any brand publication |
| `X-03` | No image generation capability or budget; all visuals remain blocked | Written budget authorisation, provider credential and commercial-use confirmation |
| `X-05` | No BOM, supplier quotes, calibration equipment cost or channel terms; no approved price; no kit cost | Real quotes, bottom-up costing, calibration service costing and an approved price list |
| `X-06` | No customer interviews, no installer terms, no validated willingness to pay | Structured discovery with recorded findings |

Supplementary references: `X-02` (seller legal identity absent — required for warranty text), `X-07`
(device identity, ownership transfer and privacy model absent), `L-01`–`L-03` (no inbound licence/assignment),
`S-06` (Signal K image pinning).

### 12.2 Exact evidence required before any SENSE sale

- Frozen BOM per module with manufacturer part numbers, revisions, suppliers and a serial/traceability scheme
  (`H-05`, `H-07`, `H-11`).
- Sensor/sender selection with datasheet provenance, and a documented measurement-chain description per
  module (D10b).
- Executed calibration records against the reference equipment class for every module, with the measured
  result expressed only as evidence, never as a published accuracy claim (`P-05`).
- Bench, electrical, thermal, ingress and EMC evidence on the actual articles, plus pre-compliance
  measurement before formal testing (`H-05`, `H-06`).
- Conformity route and EU declaration of conformity per SKU, with RED applicability decided for any radio
  (`H-06`); LVD position re-assessed at BOM freeze.
- GPSR safety case, risk analysis, technical documentation and economic-operator identification (`H-06`);
  RoHS material declarations and WEEE producer registration.
- CRA conformity: vulnerability handling, secure update with rollback, SBOM, incident reporting, secure
  default configuration (`H-06`).
- HUB integration contract and tested consumption with units, quality, calibration and freshness (`P-02`).
- WATCH evidence for any remote claim: device identity, ingestion, notification pipeline, subscription
  service and connectivity terms (`P-06`, `X-07`).
- Installer and calibration validation: reference installations, measured installation/calibration time,
  documented self-install set and calibration records (`X-05`, `X-06`).
- Real supplier quotes, bottom-up costing, approved price list and channel terms, including a separate kit
  costing (`X-05`).
- Written warranty and support terms, seller legal identity and a calibration service policy (`X-02`,
  `X-05`).
- Brand clearance before any customer-facing publication (`X-01`); source-IP clearance and notice bundle
  before distribution (`L-01`–`L-03`, `S-06`).

No SENSE SKU or kit may be orderable while these are missing. The lifecycle gate for sale is
`REGULATORY_READY` then `OPERATIONS_READY` with an approved SKU — not merely a published specification.

---

## 13. Required disclaimers — verbatim ES and EN

Use verbatim, localised and never paraphrased, on every surface that shows depth, position, navigation data
or measurement data (product page, packaging, manual, installer material, quotations, presentations).

**Navigation / instruments disclaimer (required because measurement and HUB surfaces may display position or navigation context):**

- ES: «Este producto es una ayuda a la navegación y no sustituye a la carta náutica oficial, al equipo reglamentario de la embarcación, a la vigilancia continuada ni al buen hacer marinero. La responsabilidad de la navegación corresponde siempre al patrón.»
- EN: "This product is a navigational aid. It does not replace official nautical charts, the vessel's required equipment, continuous watchkeeping or good seamanship. Responsibility for navigation always rests with the skipper."

**SENSE draft limitation statement (README §16, internal draft wording; not approved policy text):**

- ES: «Las lecturas solo son válidas dentro del rango y la calibración verificados de cada módulo. Un valor sin calibrar, caducado o fuera de rango no se presenta como una medición fiable.»
- EN: "Readings are only valid within each module's verified range and calibration. An uncalibrated, stale or out-of-range value is not presented as a reliable measurement."

**Brand attribution (footer):**

- ES: «MAREA es una marca de producto de EMBARCARTE.»
- EN: "MAREA is a product brand of EMBARCARTE."

---

## 14. Cross-product reconciliation

| Product | What must match this dossier | Reconciliation status |
| --- | --- | --- |
| MAREA HUB | HUB receives and publishes SENSE measurements with source, units, quality, calibration state and freshness; HUB adds no sensor accuracy and does not invent a measurement; HUB failure leaves SENSE modules measuring locally but not visible through the MAREA view | `OPEN` — contract to be frozen in D5 (`P-02`) |
| MAREA WATCH | WATCH consumes approved readings and sends remote notifications; SENSE never claims connectivity or push by itself; delivery remains conditional on power, coverage and provider | `OPEN`/`BLOCKED` — WATCH not built (`P-06`) |
| MAREA NAV | NAV may display SENSE data via HUB in navigation context; NAV is standalone and does not require SENSE; NAV must show provenance and freshness; no SENSE measurement is a navigation input by default | `OPEN` — NAV dossier and D5 |
| MAREA DISPLAY | DISPLAY may render SENSE values with their state; DISPLAY is not a measurement authority | `OPEN` — DISPLAY dossier |
| MAREA PILOT | Validated, calibrated measurements may be consumed only after safety qualification; no generic SENSE module is automatically acceptable as a steering input; no SENSE document implies a steering path | `DECIDED` as a product boundary; `P-05` and PILOT gates remain open |
| MAREA WEATHER | WEATHER is forecast data, not measurement; no double billing between SENSE (one-off hardware) and WEATHER (subscription) | `DECIDED` as a boundary; commercial model belongs to MC-08 |
| MAREA FLEET | FLEET may consume authorised read-only telemetry under a future contract; SENSE does not make a fleet platform | `OPEN` — no telemetry contract, `X-07` |

Every compatibility statement in D5 must be `SUPPORTED` only with recorded evidence, `PLANNED` with a named
milestone, `CONDITIONAL` with the exact condition, or `UNKNOWN`. `UNKNOWN` is never `SUPPORTED`.

---

## 15. Non-assertions and document status

This dossier does **not** assert, and must not be read as asserting: CE marking, an EU declaration of
conformity, EMC/RED/GPSR/RoHS/WEEE/CRA compliance or assessment; NMEA 2000 certification, licence,
implementation or operational compatibility; NMEA 0183 conformance; Signal K compatibility certification; any
measured accuracy, resolution or repeatability figure; any ingress-protection rating; any environmental,
thermal, vibration or salt-fog result; any certified alarm, safety, distress or life-saving function; any
detection or prevention guarantee; any battery-management or legal-metrology function; any navigation
function, AIS, radar or steering capability; any cloud service, connectivity, remote alerting or subscription
included in a SENSE SKU; any test report, bench measurement or sea trial; any supplier quote, BOM, cost or
approved price (including a kit price); any installation or calibration duration; any stock, lead time or
availability; any sales, customer count, review or testimonial; any trademark clearance; any certification of
installers; any ownership-transfer system; and any certification or approval of a third-party sensor, sender
or device.

Status of this deliverable: `INTERNAL`, `COMPLETE_TARGET_SPECIFICATION`, `NOT_FOR_SALE`. It defines the
finished commercial family and the evidence that would prove it. It does not make MAREA SENSE orderable,
publishable, certified, priced or supported, and it does not replace the MC-06 verification gate, the D10b
calibration plan or any conformity assessment.
