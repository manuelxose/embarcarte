# MAREA DISPLAY · MAREA WEATHER · MAREA FLEET — Edition authority (MC-07 / D4)

| Field | Value |
| --- | --- |
| Document ID | MC-07 / D4-PRODUCT-EDITIONS |
| Milestone | MC-07 (Master Prompt 07/36) — product definitions batch 3 |
| Date | 2026-10-30 |
| Owner function | Commercial, UX and Localization Specialist, with the Lead (Chief Product Officer) |
| Status | INTERNAL ONLY · NOT PUBLISHED · NOT FOR SALE · products `DEFINED`; brand clearance `NOT_GRANTED`; `PUBLICATION = BLOCKED` |
| Lifecycle | `DEFINED` for `DISPLAY`, `WEATHER` and `FLEET` (README §3; no other lifecycle state may be claimed) |
| Governing contract | `docs/marea/products/README.md` §1–§11 (MC-05) and §12–§23 (MC-06 addendum); MC-07 shared conventions brief §3–§15; `docs/marea/execution/DECISION-LOG.md` D-007, D-008, D-009, D-010, D-011 |
| Binding inputs | `docs/marea/COMMERCIAL-PORTFOLIO.md` §07–§09 and the bundle table; `docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §4–§6 and §9; `docs/marea/compliance/MC-02-BLOCKERS-AND-DECISIONS.md`; `docs/marea/MARKET-BENCHMARKS.md` (figures checked 2026-10-30); the MC-07 brief |
| Product dossiers (other functions) | D1 `MAREA-DISPLAY-COMMERCIAL-SPEC.md`, D2 `MAREA-WEATHER-COMMERCIAL-SPEC.md`, D3 `MAREA-FLEET-COMMERCIAL-SPEC.md` — authoritative on product capability detail; this document is authoritative on **which customer configuration contains which capability and why** |
| Nature | Internal pre-contractual definition. Not a catalogue, not a product page, not a quotation, not a certification, not an availability statement |

**These are definitions, not availability.** Nothing in this document may be read as an offer, a stock
statement, a delivery date, an approved price, an installation promise or a claim that any capability is
implemented. All three products are `DEFINED` and `NOT_FOR_SALE`; `availability = NOT_FOR_SALE`,
`brandPublication = NOT_GRANTED` and `pricing = HYPOTHESIS_UNAPPROVED` for every edition below. No edition
carries a release, sale, approval or publication status: those states are prohibited for batch-03 editions
(README §14). Every price is a hypothesis awaiting approval and validation, never a purchasable figure.

## 1. Purpose, and the question this document answers

MC-07 has to answer the same question for the third batch that MC-05 and MC-06 answered for the first two:
**is each edition a real customer configuration with a repeatable value difference, or is it a label?** For
DISPLAY the answer is constrained by a hardware programme that has selected no panel, no enclosure and no
BOM; for WEATHER by data rights that are `NOT_GRANTED`; for FLEET by a multi-tenant platform that does not
exist and by a contracted enterprise tier that is not a checkout product. This document therefore does four
things:

1. fixes every edition-level object, its exact id, its display name and its **verdict** in the edition
   vocabulary (§1.4), including the two batch-03 additions this batch needs: a `CONDITIONAL` size/hardware
   object and a `CONTRACTED_TIER` that is not a standard SKU;
2. records, for **every** edition, all fifteen required fields (§1.2), including the honest engineering
   readiness and the condition that would justify the edition before launch;
3. states what each family actually does for the customer, and what it explicitly does not do;
4. keeps every price at `HYPOTHESIS_UNAPPROVED` or `NOT_ESTABLISHED`, never at an approved value.

### 1.1 Inclusion status vocabulary (binding for this document and for D5–D9)

| Status | Meaning for the customer |
| --- | --- |
| `INCLUDED` | Part of the edition, inside the quoted scope, at no additional product cost |
| `INCLUDED_LICENSED` | Part of the edition **only** while the named licensed data entitlement is valid for the covered area, horizon and period; the data is never owned by the customer |
| `INCLUDED_CONDITIONAL` | Part of the edition **only** if the named verification condition has been met for that device, dataset, vessel or organisation; the condition is stated in the row |
| `INSTALLATION_SCOPE` | Not an edition feature: selected by the survey or onboarding scope and named in the written quotation |
| `CONTRACTED_SCOPE` | Not an edition feature: defined only in a negotiated contract, never on a price list or a checkout page |
| `OPTIONAL` | Available only as a separately purchased MAREA product, accessory, service or data entitlement — never free, never implied |
| `NOT_INCLUDED` | Explicitly outside the edition; the customer must obtain it elsewhere |
| `TARGET_ONLY` | Intended final capability, not verified and not built; may not be sold, quoted as delivered or advertised |
| `NONE_BY_DESIGN` | Excluded permanently by the product boundary or the claims policy; no future edition may add it |

### 1.2 The fifteen required edition fields

Every edition record below carries exactly these labels, in this order: (1) **Edition ID**; (2) **Customer-facing
name**; (3) **Product family**; (4) **Target segment**; (5) **Capabilities included**; (6) **Capabilities
excluded**; (7) **Optional features**; (8) **Prerequisites**; (9) **Installation expectation**; (10)
**Subscription entitlement**; (11) **Price hypothesis**; (12) **Current engineering readiness**; (13) **Current
evidence**; (14) **Conditional edition viability**; (15) **Criteria that justify the edition before launch**.

### 1.3 Evidence status vocabulary (the honest engineering column)

| Status | Meaning |
| --- | --- |
| `NONE_BEYOND_AUDIT` | The only evidence is the MC-02 code/configuration audit; nothing is product-verified |
| `PARTIAL_BROWSER_UI` | A browser interface and design evidence exist (MC-04 contrast measurements), but no embedded device runtime, no enclosure and no physical display; design evidence is not product evidence |
| `PARTIAL_ADAPTER` | A provider adapter exists in partial form in the internal foundation; no licensed entitlement, no product integration, no forecast evaluation |
| `TARGET` | Intended capability with no verified implementation; a product-engineering requirement |
| `BLOCKED` | Cannot be offered or claimed until a named external condition closes (right, measurement, contract, certificate) |
| `NOT_FOUND` | The capability or service is absent from the evidence base |

**No edition in MC-07 is `VERIFIED`.** That sentence is the difference between a specification and a launch.

### 1.4 Edition identity table (authoritative ids)

Seven edition-level objects exist. No other edition id may be used, no generation label, size figure, version
number or certification suffix may be attached, and no `®`/`™` may appear (X-01). The verdict vocabulary is
the README §14 set extended by exactly one batch-03 value, `CONTRACTED_TIER`, because FLEET Enterprise is a
negotiated contract and cannot be modelled as a checkout SKU.

| Edition id | Display name | Family | Type | Verdict | Price hypothesis (status) |
| --- | --- | --- | --- | --- | --- |
| `DISPLAY-7` | MAREA DISPLAY 7 | DISPLAY | hardware+software device, 7-inch-class working designation | `DEFINED` (conditional starting hypothesis) | EUR 699 — `HYPOTHESIS_UNAPPROVED`, `ONE_OFF`, VAT-included consumer retail hypothesis, starting price only, never an inclusive quotation |
| `DISPLAY-LARGE-CONDITIONAL` | MAREA DISPLAY Large (conditional) | DISPLAY | future 10/12-inch family object | `CONDITIONAL` | `NOT_ESTABLISHED` — `SIZE_NOT_FROZEN`, `HARDWARE_NOT_SELECTED` |
| `WEATHER-STANDARD` | MAREA WEATHER Standard | WEATHER | software subscription | `DEFINED` | EUR 49 / year — `HYPOTHESIS_UNAPPROVED`, consumer subscription, starting price only |
| `WEATHER-PRO` | MAREA WEATHER Pro | WEATHER | software subscription | `CONDITIONAL` | EUR 89 / year — `HYPOTHESIS_UNAPPROVED` |
| `FLEET-START` | MAREA FLEET Start | FLEET | software subscription, per vessel | `DEFINED` | EUR 49 / month per vessel — `HYPOTHESIS_UNAPPROVED`, VAT excluded, starting price only |
| `FLEET-BUSINESS` | MAREA FLEET Business | FLEET | software subscription, per vessel | `DEFINED` | EUR 79 / month per vessel — `HYPOTHESIS_UNAPPROVED`, VAT excluded |
| `FLEET-ENTERPRISE` | MAREA FLEET Enterprise | FLEET | contracted service tier, **not a standard checkout SKU** | `CONTRACTED_TIER` | `NOT_ESTABLISHED` (contracted) |

The 7-inch-class designation is a **working commercial designation, not a measurement**: `SIZE_NOT_FROZEN`.
No published surface may state a measured screen size, resolution, brightness, ingress rating or temperature
range for any DISPLAY object. DISPLAY Large may never be published with a measured size or a price, and may
disappear entirely if hardware selection does not support a second size class (E-29).

### 1.5 Machine-facing contract hand-off (input to D11)

The batch-03 machine contract must carry these values exactly; they are frozen by the MC-07 brief §4 and
restated here so the contract, the validator and this document cannot drift.

| Edition id | `editionVerdict.status` | `priceState` | amount | currency | period | `vatBasis` | startingPrice | blocked by |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- |
| `DISPLAY-7` | `DEFINED` | `HYPOTHESIS_UNAPPROVED` | 699 | EUR | `ONE_OFF` | `VAT_INCLUDED_CONSUMER_RETAIL_HYPOTHESIS` | true | `H-11`, `H-05`, `P-07`, `X-05` |
| `DISPLAY-LARGE-CONDITIONAL` | `CONDITIONAL` | `NOT_ESTABLISHED` | — | — | — | — | false | `H-11`, `H-05` |
| `WEATHER-STANDARD` | `DEFINED` | `HYPOTHESIS_UNAPPROVED` | 49 | EUR | `YEAR` | `OPEN` (see E-23) | true | `D-04`, `D-05`, `D-07`, `X-05` |
| `WEATHER-PRO` | `CONDITIONAL` | `HYPOTHESIS_UNAPPROVED` | 89 | EUR | `YEAR` | `OPEN` (see E-23) | false | `D-04`, `D-05`, `D-07`, `P-08` |
| `FLEET-START` | `DEFINED` | `HYPOTHESIS_UNAPPROVED` | 49 | EUR | `MONTH` per vessel | `VAT_EXCLUDED` | true | `H-12`, `P-09`, `X-05` |
| `FLEET-BUSINESS` | `DEFINED` | `HYPOTHESIS_UNAPPROVED` | 79 | EUR | `MONTH` per vessel | `VAT_EXCLUDED` | false | `H-12`, `P-09`, `X-05` |
| `FLEET-ENTERPRISE` | `CONTRACTED_TIER` | `NOT_ESTABLISHED` | — | — (negotiated) | `CONTRACTED` | `OPEN` (negotiated) | false | `H-12`, `P-09`, `X-05` |

`publicationConditional = true` for all seven objects. The WEATHER VAT basis is deliberately `OPEN`: the
brief fixes the period and the consumer-subscription basis but not the VAT treatment, and the programme
convention of "retail VAT-inclusive where stated" cannot be converted into a stated basis without the pricing
authority of D6/MC-12.

---

## 2. MAREA DISPLAY — two edition objects, one device family

**What the family does for the customer.** MAREA DISPLAY is intended to be a dedicated marine multifunction
display at the helm: a panel, compute module, storage, enclosure, mounting, power conversion/protection,
connectors and harness, a dedicated operating environment and the base software that presents navigation,
instruments, AIS, weather and read-only pilot status. It exists because a fixed, installed cockpit screen is a
different object from a portable tablet: it is mounted, powered, wired, commissioned and supported as vessel
equipment. It is **not** navigation software, not a chart service, not a weather service, not an autopilot
control head and not a certified marine instrument. `SIZE_NOT_FROZEN`, `HARDWARE_NOT_SELECTED`,
`BOM_NOT_ESTABLISHED`.

**Buyer and outcome differentiation.** The buyer is an owner or a refit yard fitting a permanent helm display,
usually as part of a wider electronics refit, who wants the boat's data visible where the boat is actually
steered. The outcome difference between the two objects is **not** "bigger is better": DISPLAY 7 is the
standard single-station working designation; DISPLAY Large is a future, conditional object that exists only if
a second size class is selected, costed and validated. No customer may be offered a size or price that has not
been frozen, and no edition buys readability, performance or certification as an add-on.

### 2.1 DISPLAY capability register (capability × edition)

| # | Capability | DISPLAY-7 | DISPLAY-LARGE-CONDITIONAL | Commercial rationale | Evidence |
| --- | --- | --- | --- | --- | --- |
| DSP01 | Physical marine display: panel, compute module, storage, enclosure, mounting, power conversion/protection, connectors, harness | `INCLUDED` | `INCLUDED_CONDITIONAL` (only if a second size class is selected) | The product is the device; without it there is no DISPLAY to sell | `BLOCKED` (`H-11`, `H-05`, `P-07`; no display or enclosure exists) |
| DSP02 | Dedicated operating environment and base software: boot, local dashboards, configuration, backup, updates during warranty | `INCLUDED` | `INCLUDED_CONDITIONAL` | Base software is part of the device, never a subscription; a device that cannot boot, be configured or be recovered is not deliverable | `TARGET` (`P-07`; the existing UI is a browser application, not an embedded runtime) |
| DSP03 | Local instrument presentation from directly connected or HUB-normalised compatible sources | `INCLUDED` (within a published compatibility matrix) | `INCLUDED_CONDITIONAL` | The core helm outcome: see the boat's own data where you steer | `BLOCKED` (`H-04`; no tested interface matrix) |
| DSP04 | NAV presentation where a NAV subscription and licensed charts are separately entitled | `INCLUDED_CONDITIONAL` | `INCLUDED_CONDITIONAL` | DISPLAY is a device and NAV is software; the customer may run MAREA NAV on it, but the DISPLAY price never includes NAV or charts | `PLANNED` integration (`D-01`, `D-06`; no validated NAV-on-DISPLAY integration) |
| DSP05 | AIS target presentation where a separately purchased receive-only AIS source exists | `INCLUDED_CONDITIONAL` | `INCLUDED_CONDITIONAL` | Traffic awareness at the helm without implying that AIS hardware or collision avoidance is included | `CONDITIONAL` integration (`H-04`, `D-10`; receive-only disclaimer mandatory) |
| DSP06 | WEATHER presentation where a separate WEATHER entitlement exists | `INCLUDED_CONDITIONAL` | `INCLUDED_CONDITIONAL` | Weather on the helm screen is an entitlement display, never a bundled data right | `CONDITIONAL` integration (`D-05`, `D-10`) |
| DSP07 | PILOT read-only status and alarms on an approved interface boundary | `INCLUDED_CONDITIONAL` (status display only) | `INCLUDED_CONDITIONAL` (status display only) | The most a helm screen may ever do with PILOT is show its state and alarms; it never gains control authority | `UNKNOWN` integration; never a control path (README §19) |
| DSP08 | SENSE readings presentation | `INCLUDED_CONDITIONAL` | `INCLUDED_CONDITIONAL` | Sensor values belong on the helm screen when a compatible source exists | `CONDITIONAL` integration (`H-04`, `H-05`) |
| DSP09 | WATCH status presentation | `INCLUDED_CONDITIONAL` | `INCLUDED_CONDITIONAL` | Useful only if the integration is established; no claim is made today | `UNKNOWN` integration |
| DSP10 | Required engineering targets: sunlight legibility, night mode, thermal behaviour, ingress, vibration, EMC/RED applicability — all `REQUIRED_TARGET`, never measured | `TARGET_ONLY` as claims; engineering requirements apply | `TARGET_ONLY` as claims; engineering requirements apply | These are the design gates that make a helm display credible; none may be stated as achieved | `BLOCKED` (`H-06`, `H-11`, `H-13`; `compliance = NOT_STARTED`; no test evidence) |
| DSP11 | Wet or glove input | `TARGET_ONLY` (only if physically verified) | `TARGET_ONLY` (only if physically verified) | A useful helm requirement that becomes a claim only after physical testing | `BLOCKED` (`H-11`) |
| DSP12 | Physical installation and standard mount; additional or specialist mounts are separate | `INSTALLATION_SCOPE` | `INSTALLATION_SCOPE` | Installation is quoted per vessel after a survey; it is never included in the device hypothesis | `OPEN` (`X-05`, `X-06`; no measured scope or price) |
| DSP13 | Power interruption and restart behaviour: safe boot, no retained unsafe state, no auto-resume of a previous mode | `INCLUDED` | `INCLUDED` | Honest recovery after a breaker trip is a design requirement, not a premium feature | `TARGET` |
| DSP14 | Stale, missing, lost and unavailable source states (`FRESH`, `STALE`, `LOST`, `UNKNOWN`, `NOT_AVAILABLE`) | `INCLUDED` | `INCLUDED` | A helm screen that fabricates or ages silently is a safety-of-understanding defect; state honesty is included in every edition | `TARGET` |
| DSP15 | Device identity, ownership registration and ownership transfer | `INCLUDED` | `INCLUDED` | Second-hand boats are normal; support, warranty and entitlement rebinding require identity | `TARGET` (device identity model `X-07`) |
| DSP16 | Configuration backup, restore and customer data export | `INCLUDED` | `INCLUDED` | Recovery and portability are fairness requirements, never an upsell | `TARGET` |
| DSP17 | Device replacement and repair path | `INCLUDED` | `INCLUDED` | Failed units are normal; the replacement path must exist before a device is sold | `OPEN` (no RMA process) |
| DSP18 | Software entitlement expiry behaviour: base local functions continue, licensed data presentation shows an honest unavailable state | `INCLUDED` | `INCLUDED` | A lapsed chart or weather entitlement must never disable the device, the local dashboards or safety-relevant status display | `TARGET` (design rule; subscription isolation) |
| DSP19 | Software and firmware updates during the warranty period | `INCLUDED` | `INCLUDED` | Updates are a support and security obligation, not a tier | `BLOCKED` (`H-13`; no secure update process) |
| DSP20 | A measured screen size, resolution, brightness or nit figure, ingress rating or temperature range as a product claim | `NOT_INCLUDED` | `NOT_INCLUDED` | No figure exists and none may appear while `SIZE_NOT_FROZEN` and hardware is `NOT_SELECTED` | `BLOCKED` (`H-11`; `H-06`) |
| DSP21 | Chart data included in the device price | `NONE_BY_DESIGN` | `NONE_BY_DESIGN` | Charts are a licensed data entitlement (`D-01`); including them in a hardware hypothesis would misdescribe both | `BLOCKED` (`D-01`, `D-06`) |
| DSP22 | Any steering, pilot engagement or remote helm control | `NONE_BY_DESIGN` | `NONE_BY_DESIGN` | No display may become a control head (README §16 rule 1, §19) | by design |
| DSP23 | Unlimited charts, instruments, storage or software entitlements | `NONE_BY_DESIGN` | `NONE_BY_DESIGN` | Every entitlement has an explicit scope and cost; "unlimited" is prohibited | by design (claims policy §3) |
| DSP24 | Certification, type-approval or official-instrument status | `NONE_BY_DESIGN` | `NONE_BY_DESIGN` | No certification exists or is claimed; no conformity assessment has started | by design (`H-06`) |

### 2.2 DISPLAY integration status (frozen vocabulary)

Integration statuses use only `SUPPORTED`, `CONDITIONAL`, `PLANNED`, `UNKNOWN`, `BLOCKED`. No DISPLAY
integration is `SUPPORTED`: there is no selected hardware and no validated interface.

| Relationship | Status | Evidence class and condition | Customer consequence |
| --- | --- | --- | --- |
| DISPLAY–HUB | `CONDITIONAL` | `BLOCKED` (`H-04`, `P-10`); condition: a validated HUB-to-DISPLAY data path | Instrument presentation improves only if the path is validated for the named devices |
| DISPLAY–NAV | `PLANNED` | `BLOCKED` (`D-01`, `D-06`); NAV is software, DISPLAY is a device | Running NAV on the display requires a separate NAV subscription and licensed charts |
| DISPLAY–AIS | `CONDITIONAL` | `BLOCKED` (`H-04`, `D-10`); condition: a receive-only source and validated presentation | Targets appear only with separate AIS hardware; never collision avoidance |
| DISPLAY–WEATHER | `CONDITIONAL` | `BLOCKED` (`D-05`, `D-10`); condition: a licensed WEATHER entitlement | Forecasts appear only within the licensed entitlement |
| DISPLAY–SENSE | `CONDITIONAL` | `BLOCKED` (`H-04`, `H-05`); condition: a validated measurement source | Readings appear only where a compatible source is validated |
| DISPLAY–PILOT | `UNKNOWN` | `BLOCKED`; status/monitoring display only, never steering authority | At most read-only status and alarms; the display can never engage or steer |
| DISPLAY–WATCH | `UNKNOWN` | `BLOCKED`; no integration evidence | No claim is made; monitoring remains a WATCH app function |

### 2.3 Edition record — `DISPLAY-7` (MAREA DISPLAY 7)

- **Edition ID.** `DISPLAY-7`.
- **Customer-facing name.** MAREA DISPLAY 7. The "7" is a 7-inch-class **working designation**, not a measured
  screen size (`SIZE_NOT_FROZEN`).
- **Product family.** `DISPLAY` (`HARDWARE_SOFTWARE`), installed marine multifunction display.
- **Target segment.** Owners refitting a sailing yacht or motor cruiser who want a permanent, mounted helm
  display for navigation, instruments, traffic and weather, and who already own (or are prepared to buy) the
  data and software entitlements; secondary: refit yards and installers specifying a documented display as part
  of a wider electronics package. Not for a buyer who wants a portable tablet experience, and not for a buyer
  seeking a chart plotter with bundled charts.
- **Capabilities included.** DSP01–DSP09 within their stated conditions, DSP13–DSP19, plus DSP10/DSP11 as
  unmeasured engineering requirements that may never be stated as achieved. The base included software is the
  device operating environment, local dashboards, instrument/AIS/NAV presentation, configuration, backup and
  updates during warranty.
- **Capabilities excluded.** Charts (`D-01`); the NAV subscription; the WEATHER entitlement; HUB; AIS receiver;
  adapters and cabling beyond the supplied harness; extra or specialist mounts; installation labour; any
  measured display figure; PILOT control; WATCH presentation claims; certification.
- **Optional features.** HUB, AIS receiver, SENSE modules, WATCH, additional mounts, installer commissioning,
  extended service arrangements — each a separate purchase or quotation.
- **Prerequisites.** A surveyed mounting position and cable route; a power arrangement with appropriate
  protection; a compatible data source or the decision to run NAV on the device; the separately purchased
  entitlements the customer intends to use; an authorised installer for the physical work; a signed quotation
  naming inclusions and exclusions.
- **Installation expectation.** Professional, installer-led and mandatory for a fixed vessel installation.
  Quoted per vessel after a survey; no installation price, duration or lead time exists (`X-05`, `X-06`).
- **Subscription entitlement.** None required for the device or its base software. NAV, WEATHER and chart
  entitlements are separate subscriptions or licences and are never included.
- **Price hypothesis.** **EUR 699 — `HYPOTHESIS_UNAPPROVED`**, `ONE_OFF`, VAT-included consumer retail
  hypothesis, starting price only. It is **not** an inclusive quotation, not turnkey, and installation is quoted
  separately. It must never be summed into a bundle, published as a purchasable price, or used to imply that
  charts, NAV, WEATHER, HUB, AIS or a mount are included.
- **Current engineering readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`, `engineering = NOT_VERIFIED`,
  `licensing = NOT_CLEARED`, `hardware = NOT_SELECTED`, `dataRights = NOT_GRANTED`, `compliance = NOT_STARTED`,
  `pricing = HYPOTHESIS_UNAPPROVED`, `brandPublication = NOT_GRANTED`, `availability = NOT_FOR_SALE`.
- **Current evidence.** `H-11` (no display or enclosure exists), `P-07` (no display hardware; the UI is a
  browser application, not an embedded MFD runtime), `H-05` (no physical build or measurement), `H-06`
  (conformity not started), `H-04` (NMEA 2000 not implemented), `D-01`/`D-06` (no chart rights or basemap
  licence), `D-05`/`D-10` (weather layer and provider rights), `H-13` (CRA obligations, no secure
  update), `X-03` (no product imagery), `X-05`/`X-06` (no BOM, quotes, installer or customer evidence),
  `X-07` (device identity). MC-04 browser contrast measurements are **design evidence only** and are not
  display-product evidence. Evidence class: `BLOCKED`.
- **Conditional edition viability.** Defined as the standard single-station object; **not viable for sale** until
  a panel, enclosure and BOM are selected, the required engineering targets are measured, conformity has
  started, and entitlement/runtime integration is validated. It carries the qualifier "conditional starting
  hypothesis": the object may exist while the exact size, contents and price remain unconfirmed.
- **Criteria that justify the edition before launch.** (1) Selected panel, compute module, enclosure and frozen
  BOM; (2) measured sunlight, night, thermal, ingress and vibration evidence against the stated targets;
  (3) EMC/RED and applicable conformity assessment started with a test plan; (4) an embedded runtime with a
  secure, recoverable update path; (5) a validated compatibility matrix for the declared sources; (6) a
  measured installation scope and a written installer agreement; (7) written terms, warranty and seller
  identity; (8) a costed basis that survives the EUR 699 starting hypothesis or replaces it with a quotation
  model.

### 2.4 Edition record — `DISPLAY-LARGE-CONDITIONAL` (MAREA DISPLAY Large, conditional)

- **Edition ID.** `DISPLAY-LARGE-CONDITIONAL`.
- **Customer-facing name.** MAREA DISPLAY Large (conditional). **Verdict `CONDITIONAL`: a future object, not a
  sellable size.** `SIZE_NOT_FROZEN`, `HARDWARE_NOT_SELECTED`.
- **Product family.** `DISPLAY` (`HARDWARE_SOFTWARE`), future larger-format device family (nominally a 10/12-inch
  class — **a working range, never a published measurement**).
- **Target segment.** Owners of larger motor cruisers, professional skippers and refit projects in which a
  single larger helm station is preferred to several small ones. The segment is a **planning hypothesis**; no
  customer evidence exists (`X-06`).
- **Capabilities included.** Only what the selected hardware supports, within the same DSP register and the
  same conditions. Nothing is included by implication from `DISPLAY-7` and no larger size buys extra software
  entitlement.
- **Capabilities excluded.** Everything excluded from `DISPLAY-7`, plus any measured size, resolution,
  brightness or price, and any claim that a larger display is more readable, faster or more capable until
  measured.
- **Optional features.** Defined by the future frozen configuration only; no option may be published today.
- **Prerequisites.** A selected hardware platform; a frozen size class; a validated enclosure, mounting and
  thermal design; the same entitlement and installation prerequisites as `DISPLAY-7`.
- **Installation expectation.** As `DISPLAY-7`: installer-led and quoted per vessel; a larger panel may
  require additional structural or mounting work, which must be surveyed and quoted.
- **Subscription entitlement.** None. Identical boundary to `DISPLAY-7`.
- **Price hypothesis.** **`NOT_ESTABLISHED`.** No figure exists and none may be stated. A future price may never
  be derived by scaling the EUR 699 hypothesis.
- **Current engineering readiness.** `definition = COMPLETE_TARGET_SPECIFICATION` for the **object**,
  `engineering = NOT_VERIFIED`, `hardware = NOT_SELECTED`, `compliance = NOT_STARTED`,
  `pricing = HYPOTHESIS_UNAPPROVED` with no amount.
- **Current evidence.** `H-11` (no display hardware), `H-05` (no BOM), `H-06` (no conformity), `X-05` (no
  costing), `X-06` (no customer evidence for a larger format). Evidence class: `BLOCKED`.
- **Conditional edition viability.** `CONDITIONAL` on a selected hardware family that supports a second size
  class at a defensible cost. If hardware selection does not support it, the object is withdrawn; the
  programme must not keep a label with no product behind it (E-29).
- **Criteria that justify the edition before launch.** (1) A frozen size class from a selected, costed
  platform; (2) measured readability, thermal and mounting evidence; (3) a validated larger-enclosure design;
  (4) a costed basis and a price hypothesis that survives bottom-up costing; (5) evidence that a distinct
  customer buys it instead of two `DISPLAY-7` units or a competitor plotter.

### 2.5 DISPLAY edition verdicts

- **One real device object, one conditional future object.** `DISPLAY-7` is `DEFINED` as a **conditional
  starting hypothesis**: the customer-facing configuration is fully specified, the size is a working
  designation, and the price is unapproved. `DISPLAY-LARGE-CONDITIONAL` exists to stop a size label from
  becoming a promise; it may never appear on a price list.
- **The edition split is about station format, not capability.** No DISPLAY edition buys readability,
  performance, certification, charts, NAV, WEATHER, HUB or AIS. A customer who believes a larger screen
  includes more data has been misled.
- **The price is a hypothesis about a minimum configuration.** EUR 699 can only describe the minimum display
  package with its supplied mount, harness and base software; any publication must name every inclusion and
  exclusion, and installation is separate.
- **Comparator context, honestly stated.** A recorded consumer anchor is the Raymarine Element 7 HV at
  EUR 659.45 incl. VAT (official page https://www.raymarine.com/es-es/nuestros-productos/chartplotters/element/element-hv,
  `VERIFIED_EXTERNAL`, checked 2026-10-30; EUR, VAT included). It shows that a mature dedicated plotter sits in
  the same consumer band as the EUR 699 hypothesis. It does **not** validate a MAREA BOM, margin, feature
  parity or bundled chart rights, and it may never be cited as a comparison of capability.
- **Risk — the "tablet with a mount" misreading.** The product is credible only if the enclosure, power,
  mounting and support are real. Until they are, the edition is a specification, not a device.

---

## 3. MAREA WEATHER — two subscription editions, one entitlement ledger

**What the family does for the customer.** MAREA WEATHER is intended to be a marine forecast service for
coastal and offshore planning: wind, waves, currents and tides within a declared area and horizon, with the
source, timestamp, freshness and uncertainty of every data point visible, and with model comparison where the
licences permit it. It is a **licensed-data subscription**: the customer buys access to declared data coverage,
never ownership of the data, never a meteorological guarantee, and never a redistribution right. Forecasts are
probabilistic; the product helps the skipper decide, it does not decide for them.

**Buyer and outcome differentiation.** The buyer is a skipper who plans passages and wants a readable,
provenance-carrying forecast that works without adopting the whole MAREA ecosystem. Standard serves the
customer who needs the key forecast picture in the declared area; Pro serves the customer who plans with model
comparison, advanced layers, route context and forecast alerts, and only where the provider entitlements
actually allow it. The difference is **decision support depth**, not accuracy, not coverage beyond the licence,
and not speed.

### 3.1 WEATHER capability register (capability × edition)

| # | Capability | WEATHER-STANDARD | WEATHER-PRO | Commercial rationale | Evidence |
| --- | --- | --- | --- | --- | --- |
| WX01 | Licensed forecast access within the declared area, horizon and variable list | `INCLUDED_LICENSED` | `INCLUDED_LICENSED` | The subscription exists to pay for licensed data; coverage is a right, not a feature | `BLOCKED` (`D-04`, `D-05`, `D-07`, `D-10`; `DEC-03`) |
| WX02 | Source, timestamp, freshness/validity window and attribution on every data point | `INCLUDED` | `INCLUDED` | Data without provenance is not a usable forecast and may not be presented (claims policy §4.5) | `TARGET` |
| WX03 | Probabilistic framing, uncertainty and the verbatim weather disclaimer | `INCLUDED` | `INCLUDED` | The mandatory trust boundary of the family; never an upsell | by design (claims policy §9) |
| WX04 | Forecast presented as forecast, never as observation | `INCLUDED` | `INCLUDED` | A forecast shown as an observation is a false claim, in every edition | by design |
| WX05 | Standalone account and entitlement usable without MAREA NAV | `INCLUDED` | `INCLUDED` | WEATHER must be independently useful; requiring NAV would misdescribe the product | `TARGET` (no billing/entitlement service in MC-07) |
| WX06 | Declared coverage area and forecast horizon, published per provider | `INCLUDED` | `INCLUDED` | The honest substitute for an accuracy claim: state what is covered, for how long | `BLOCKED` (licence-dependent; `D-04`, `D-07`) |
| WX07 | Key forecast variables of the standard edition (the exact variable list is provider-dependent and `OPEN`) | `INCLUDED_CONDITIONAL` | `INCLUDED_CONDITIONAL` | No variable may be advertised before its licence and product mapping are confirmed | `BLOCKED` (`D-04`, `D-05`; see E-21) |
| WX08 | Multi-model comparison (each model shown as a model, never as a consensus truth) | `NOT_INCLUDED` | `INCLUDED_CONDITIONAL` | The clearest Pro difference: comparison changes a planning decision, but only with licensed model entitlements | `BLOCKED` (`D-04`, `D-05`, `P-08`) |
| WX09 | Advanced layers and timeline beyond the standard variable list (explicit, provider-dependent, never invented here) | `NOT_INCLUDED` | `INCLUDED_CONDITIONAL` | Pro depth in how the forecast is explored; every extra layer is a separate licensed entitlement | `BLOCKED` (`D-05`, `D-07`) |
| WX10 | Route context and route weather assessment (advisory only, never a go/no-go safety verdict) | `NOT_INCLUDED` | `INCLUDED_CONDITIONAL` | Turns a forecast into a passage-planning tool; must never become a safety clearance | `BLOCKED` (`D-04`) |
| WX11 | Forecast alerts and configurable thresholds (in-product or notification, never a guaranteed delivery service) | `NOT_INCLUDED` | `INCLUDED_CONDITIONAL` | A genuine Pro workflow, conditional on a notification capability and provider terms; not a WATCH alert service | `BLOCKED` (`D-04`, `D-10`; no notification pipeline) |
| WX12 | Saved locations, saved routes, preferences and own records | `INCLUDED` | `INCLUDED` | Portability and continuity of the customer's own data are fairness requirements, never an upsell | `TARGET` |
| WX13 | Export of own records; a read-only export window after cancellation (hypothesis 30 days, subject to legal review) | `INCLUDED` | `INCLUDED` | A cancelling customer keeps access to their own data for a defined window; the window is `OPEN` | `OPEN` (E-24) |
| WX14 | Shared entitlement with NAV: one account, one ledger, no double billing; NAV Pro may include WEATHER Standard-equivalent read access only where provider rights allow | `INCLUDED_CONDITIONAL` | `INCLUDED_CONDITIONAL` | The programme's entitlement promise; it must be described exactly as implemented, not as intended | `CONDITIONAL` (`D-04`, `D-07`; billing not implemented) |
| WX15 | Standard → Pro upgrade path with a prorated credit and no duplicate charge for the same entitlement | `INCLUDED` (upgrade path) | `INCLUDED` (upgrade path) | Upgrading must not bill the same entitlement twice; the proration policy is `OPEN` | `OPEN` (no billing service) |
| WX16 | Presentation inside NAV, DISPLAY or HUB | `OPTIONAL` | `OPTIONAL` | The data service is independent; consumption surfaces are separate products with their own statuses | `PLANNED`/`CONDITIONAL` integrations |
| WX17 | Offline access to forecast data | `NOT_INCLUDED` | `NOT_INCLUDED` | No offline right is granted by the current provider position; storing data offline requires a right the programme does not hold | `BLOCKED` (no offline right; `offlineAllowed = false`) |
| WX18 | Redistribution, resale or public sharing of forecast data | `NONE_BY_DESIGN` | `NONE_BY_DESIGN` | No redistribution right is granted and none may be implied (`redistributionAllowed = false`) | by design |
| WX19 | B2B operational use inside FLEET | `NOT_INCLUDED` | `NOT_INCLUDED` | Permitted only under a written provider agreement and only for the named operational scope (WEATHER–FLEET `CONDITIONAL`) | `BLOCKED` (`D-04`, `D-07`) |
| WX20 | Accuracy percentages, "official" warning-service status, exclusive data rights, a free-tier commercial right | `NONE_BY_DESIGN` | `NONE_BY_DESIGN` | None of these is true or licensable today; the family's credibility depends on never implying them | by design (claims policy §2 Class P/X) |
| WX21 | Provider-licence loss and expired-entitlement behaviour: honest unavailable state, attribution retained, no fabricated or frozen forecast rendered as current | `INCLUDED` | `INCLUDED` | The difference between a data service and a fake one; included in every edition | `TARGET` (design rule) |

### 3.2 Entitlement, billing and sharing boundaries (frozen model)

- **One customer account, one entitlement ledger.** A customer's WEATHER entitlement is a single record; NAV and
  WEATHER may consume it but may never bill it twice.
- **WEATHER may be bought standalone.** No NAV subscription is required to use WEATHER, and buying WEATHER
  never includes NAV.
- **NAV Pro may include WEATHER Standard-equivalent read access only where provider rights allow.** That
  inclusion is `CONDITIONAL` and must be described exactly as implemented. Until a provider agreement exists,
  NAV Pro includes no WEATHER entitlement.
- **Upgrading Standard → Pro applies a prorated credit**, and the same entitlement is never billed twice across
  NAV and WEATHER.
- **Cancelling NAV never deletes user-owned WEATHER records** (saved locations, preferences, own routes): the
  customer keeps a read-only export for a defined window (hypothesis 30 days, subject to legal review).
- **Provider-licence loss produces an honest "unavailable" state with attribution retained**; it never produces
  a substitute source the programme is not licensed to use.
- **An expired entitlement never renders a fabricated or frozen forecast as current.** The last valid data may
  be shown only with its age and an explicit unavailable state.
- **Billing and entitlement services are not implemented in MC-07.** Every statement above is a specification
  requirement, not a tested behaviour, and no subscription can be purchased.

### 3.3 WEATHER integration status (frozen vocabulary)

| Relationship | Status | Evidence class and condition | Customer consequence |
| --- | --- | --- | --- |
| WEATHER–NAV | `PLANNED` | `BLOCKED` (`D-04`, `D-07`); condition: shared ledger and provider rights | Weather layers inside NAV when the entitlement and rights exist; no double billing |
| WEATHER–FLEET | `CONDITIONAL` | `BLOCKED` (`D-04`, `D-07`); condition: a written provider agreement permitting B2B operational use | An operator may see licensed forecasts in FLEET only under that agreement |
| WEATHER–DISPLAY | `CONDITIONAL` | `BLOCKED` (`D-05`, `D-07`); condition: a licensed entitlement and a validated display path | Forecasts on the helm screen only within the entitlement |
| WEATHER–HUB | `CONDITIONAL` | `BLOCKED` (`D-10`); condition: a validated data path and entitlement mapping | No claim is made until validated |

### 3.4 Edition record — `WEATHER-STANDARD` (MAREA WEATHER Standard)

- **Edition ID.** `WEATHER-STANDARD`.
- **Customer-facing name.** MAREA WEATHER Standard.
- **Product family.** `WEATHER` (`SOFTWARE`), consumer forecast subscription.
- **Target segment.** Coastal and offshore skippers in the priority geography (Atlantic Galicia and northern
  Portugal first) who plan passages and want a readable forecast with visible source and freshness; owners who
  are not ready to adopt NAV or a hardware ecosystem. Not for a professional operator needing contractual
  operational data terms.
- **Capabilities included.** WX01, WX02, WX03, WX04, WX05, WX06, WX07 (within the published provider variable
  list), WX12–WX16, WX21.
- **Capabilities excluded.** Multi-model comparison; advanced layers; route weather assessment; forecast alerts;
  B2B operational use; offline access; redistribution; any accuracy, official-warning or exclusive-data claim;
  any guarantee of coverage beyond the licensed area and horizon.
- **Optional features.** WEATHER Pro upgrade; consumption inside NAV, DISPLAY or HUB where those products and
  integrations exist; saved-location management is included, not optional.
- **Prerequisites.** A customer account; a licensed provider entitlement for the declared area and horizon; a
  supported consumption surface; acceptance of the forecast limitations and the attribution requirement.
- **Installation expectation.** `NOT_APPLICABLE` — a software service, no physical installation. Consumption on
  DISPLAY or HUB may require a separately quoted installation of that device.
- **Subscription entitlement.** **Required**, annual, consumer subscription. One entitlement per account; no
  double billing; export window on cancellation `OPEN` (hypothesis 30 days, legal review).
- **Price hypothesis.** **EUR 49 / year — `HYPOTHESIS_UNAPPROVED`**, consumer subscription, starting price only.
  VAT basis is `OPEN` (E-23). Coverage is limited to the licensed sources and the declared area and horizon;
  the price never buys coverage, accuracy or rights the programme does not hold.
- **Current engineering readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`, `engineering = NOT_VERIFIED`,
  `licensing = NOT_CLEARED`, `hardware = NOT_APPLICABLE_SOFTWARE_PRODUCT`, `dataRights = NOT_GRANTED`,
  `compliance = NOT_STARTED`, `pricing = HYPOTHESIS_UNAPPROVED`, `brandPublication = NOT_GRANTED`,
  `availability = NOT_FOR_SALE`.
- **Current evidence.** `PARTIAL_ADAPTER`-class only: provider adapters for Open-Meteo/Copernicus/EMODnet exist
  in partial form in the internal foundation (`P-08`), but no provider is licensed for commercial use
  (`D-04`, `D-05`, `D-07`, `D-10`), no forecast evaluation has been performed, and no billing/entitlement
  service exists. Evidence class: `BLOCKED`.
- **Conditional edition viability.** `DEFINED` as a structure; **not viable for sale** until at least one
  licensed provider, one declared area and horizon, and one evaluated forecast scope exist. The condition is a
  contract and an evaluation, not a design change.
- **Criteria that justify the edition before launch.** (1) A signed provider agreement covering the product,
  territory, variables, horizon and attribution; (2) a published coverage and horizon statement; (3) a genuine
  forecast evaluation in the pilot geography against a stated method; (4) a working entitlement and billing
  service with no double billing; (5) a stale/unavailable state review; (6) a costed basis that survives the
  EUR 49 hypothesis or replaces it.

### 3.5 Edition record — `WEATHER-PRO` (MAREA WEATHER Pro)

- **Edition ID.** `WEATHER-PRO`.
- **Customer-facing name.** MAREA WEATHER Pro.
- **Product family.** `WEATHER` (`SOFTWARE`), consumer forecast subscription, **conditional on provider
  entitlements**.
- **Target segment.** Skippers planning longer or more demanding passages who want to compare models, explore
  advanced layers, assess a route and receive forecast alerts; secondary: small professional operators only
  where a provider agreement permits B2B operational use (that use is a FLEET matter, never implied by Pro).
- **Capabilities included.** Everything in Standard, plus WX08, WX09, WX10 and WX11 — **only** where the
  corresponding provider entitlements and notification capability exist.
- **Capabilities excluded.** Any claim that Pro is more accurate, has wider coverage, updates faster or is
  "official"; B2B redistribution; offline access; anything not named in the licensed entitlement.
- **Optional features.** Consumption inside NAV Pro, DISPLAY or HUB where those integrations exist; extended
  saved-record retention only if costed and lawful (not included today).
- **Prerequisites.** As Standard, plus licensed multi-model and extra-layer entitlements, a notification
  capability if alerts are offered, and a support model for the more complex configuration.
- **Installation expectation.** `NOT_APPLICABLE` — software only.
- **Subscription entitlement.** **Required**, annual, consumer subscription at a **`HYPOTHESIS_UNAPPROVED`**
  figure; upgrade from Standard uses a prorated credit; the same entitlement is never billed twice.
- **Price hypothesis.** **EUR 89 / year — `HYPOTHESIS_UNAPPROVED`**. It may never be presented as a sum of
  provider costs, as an accuracy upgrade or as a guaranteed-coverage upgrade, and VAT basis is `OPEN` (E-23).
- **Current engineering readiness.** `engineering = NOT_VERIFIED`; `dataRights = NOT_GRANTED`;
  `pricing = HYPOTHESIS_UNAPPROVED`; `compliance = NOT_STARTED`.
- **Current evidence.** No multi-model, advanced-layer, route-assessment or alert entitlement exists (`D-04`,
  `D-05`, `P-08`); `WEATHER–FLEET` B2B use is `CONDITIONAL` on a provider agreement (`D-07`). Evidence
  class: `BLOCKED`.
- **Conditional edition viability.** `CONDITIONAL` on provider entitlements for multi-model comparison,
  advanced layers and route context. If those entitlements cannot be obtained, `WEATHER-PRO` must not ship:
  the family collapses to Standard plus an honest statement of what the licence does not include, and this
  document must be revised rather than the label retained.
- **Criteria that justify the edition before launch.** (1) Provider entitlements for at least model comparison
  and one advanced layer; (2) a published variable, area and horizon difference from Standard that a customer
  can repeat in one sentence; (3) a verified route-assessment method that never becomes a go/no-go verdict;
  (4) a notification capability with tested behaviour if alerts are offered; (5) all Standard criteria;
  (6) a costed basis for the EUR 89 hypothesis.

### 3.6 WEATHER edition verdicts

- **One honest product, one conditional depth layer.** Standard is the sellable shape; Pro is a depth of
  decision support that exists only if the provider grants the rights. A customer must never be able to buy
  "more accuracy", because none is on sale.
- **The subscription is a licence, not a guarantee.** Every commercial surface must state the source, the
  freshness, the declared area and horizon, and that forecasts are probabilistic.
- **The entitlement ledger is the commercial architecture, not a feature.** One account, one ledger, no double
  billing; NAV and WEATHER may share read access only where the provider allows it.
- **Risk — the "official forecast" misreading.** Adding a model comparison must never look like a warning
  service; no colour-coded "safe/danger" verdict may be invented.
- **Risk — price anchoring without rights.** EUR 49 and EUR 89 are means-nothing numbers until a provider
  contract exists; they may appear only as internal hypotheses.

---

## 4. MAREA FLEET — two standard tiers and one contracted tier

**What the family does for the customer.** MAREA FLEET is intended to be organisation-oriented SaaS for small
and professional fleets: a multi-vessel dashboard with location and status, access controls, maintenance
history and tasks, documents, operational alerts, reporting and service planning, plus compatible telemetry
ingestion from WATCH/HUB systems. It is **not** a consumer monitoring app, not a remote helm, not a
ship-management ERP and not a certified security service. Telemetry is read-only; there is no steering, motor
or remote-control path anywhere in the product.

**Buyer and outcome differentiation.** The buyer is an organisation — a sailing school, charter firm, marina,
rental operator or boat manager — that needs to see several vessels and control who may see or change what.
Start serves the small operator who needs the operational basics with the full security model; Business serves
the operator who needs richer permissions, workflows, reporting and integrations; Enterprise serves an
organisation whose terms are negotiated (audited account administration, custom integrations, volume terms and
a possible contracted service commitment). The difference is **operational governance depth and contract
scope**, never "more security": tenant isolation, revocation, audit and export are identical in every edition.

### 4.1 FLEET capability register (capability × edition)

| # | Capability | START | BUSINESS | ENTERPRISE | Commercial rationale | Evidence |
| --- | --- | --- | --- | --- | --- | --- |
| FL01 | Organization → memberships → roles → vessel assignments, with the eight frozen roles | `INCLUDED` | `INCLUDED` | `INCLUDED` | The tenancy model is the product's foundation and cannot be edition-gated | `TARGET` (no multi-tenant SaaS; `P-09`) |
| FL02 | Server-side authorisation on every sensitive operation; a client-supplied tenant id is never trusted | `INCLUDED` | `INCLUDED` | `INCLUDED` | Security is a precondition of selling any organisation software | `TARGET` (`P-09`, `X-07`) |
| FL03 | Cross-tenant read or modification | `NONE_BY_DESIGN` | `NONE_BY_DESIGN` | `NONE_BY_DESIGN` | Organization A can never read or modify B, in any edition or under any support action | by design |
| FL04 | Multi-vessel dashboard: location and status | `INCLUDED` | `INCLUDED` | `INCLUDED` | The base reason an operator buys the platform | `TARGET` (`P-09`, `H-12`) |
| FL05 | Maintenance history and maintenance tasks | `INCLUDED` | `INCLUDED` | `INCLUDED` | The operational record that turns a dashboard into a management tool | `TARGET` |
| FL06 | Documents attached to vessels and operations | `INCLUDED` | `INCLUDED` | `INCLUDED` | Documents are part of the operational record and a retention cost that must be explicit | `TARGET` |
| FL07 | Operational alerts on telemetry state (never a guaranteed instant-notification service) | `INCLUDED_CONDITIONAL` | `INCLUDED_CONDITIONAL` | `INCLUDED_CONDITIONAL` | Alerts depend on a telemetry source and connectivity; the wording must never imply guaranteed delivery | `CONDITIONAL` (`D-09`, `H-12`) |
| FL08 | Compatible telemetry ingestion, read-only, from the customer's WATCH/HUB systems | `INCLUDED_CONDITIONAL` | `INCLUDED_CONDITIONAL` | `INCLUDED_CONDITIONAL` | Telemetry is supplied by separate products under a separate entitlement and a written agreement | `CONDITIONAL` (`D-09`, `H-12`) |
| FL09 | AIS-derived fleet data, read-only | `INCLUDED_CONDITIONAL` | `INCLUDED_CONDITIONAL` | `INCLUDED_CONDITIONAL` | Retention and redistribution of AIS-derived traffic are not established; receive-only claims apply | `CONDITIONAL` (`D-09`) |
| FL10 | Standard role-assignment matrix and permission administration | `INCLUDED` | `INCLUDED` | `INCLUDED` | Every edition must be administrable on day one | `TARGET` |
| FL11 | Configurable permission sets and delegated multi-scope administration | `NOT_INCLUDED` | `INCLUDED_CONDITIONAL` | `CONTRACTED_SCOPE` | The genuine Business difference: operators with several bases or departments need finer delegation | `TARGET` (`P-09`; design not built) |
| FL12 | Configurable maintenance workflows: approvals, assignment and closure | `NOT_INCLUDED` | `INCLUDED_CONDITIONAL` | `CONTRACTED_SCOPE` | Work-order discipline is the clearest operational upgrade and the reason Business exists | `TARGET` |
| FL13 | Standard reporting and service planning | `NOT_INCLUDED` | `INCLUDED_CONDITIONAL` | `CONTRACTED_SCOPE` | Reporting converts records into decisions and is a real serving and support cost | `TARGET` |
| FL14 | Integration and API access with explicit, published limits | `NOT_INCLUDED` | `INCLUDED_CONDITIONAL` (defined allowance) | `CONTRACTED_SCOPE` (negotiated) | The boundary that keeps an "integration" promise finite and supportable | `TARGET` (`P-09`; no API exists) |
| FL15 | Audit log of administrative and access events, tenant-scoped | `INCLUDED` | `INCLUDED` | `INCLUDED` | Audit is a security and accountability requirement, never a paid feature | `TARGET` (`X-07`) |
| FL16 | Account and access-review reporting with contractual evidence requirements | `NOT_INCLUDED` | `NOT_INCLUDED` | `CONTRACTED_SCOPE` | The "audited accounts" difference belongs to a negotiated contract, not to a public tier | `TARGET` |
| FL17 | External installer access: `EXTERNAL_INSTALLER`, scoped, time-bound, vessel-level | `INCLUDED` | `INCLUDED` | `INCLUDED` | Contractors are normal in the segment; the access must be bounded and revocable | `TARGET` (`X-07`) |
| FL18 | `EMBARCARTE_SUPPORT` access: explicitly scoped, audited, time-bound | `INCLUDED` | `INCLUDED` | `INCLUDED` | Support access must be documented and audited, never a silent back door | `TARGET` (`X-07`) |
| FL19 | Immediate revocation of removed members and invalidation of their sessions | `INCLUDED` | `INCLUDED` | `INCLUDED` | "Removed" must mean removed; this is a security requirement in every edition | `TARGET` (`X-07`) |
| FL20 | Tenant-scoped export of organizational data | `INCLUDED` | `INCLUDED` | `INCLUDED` | Data portability is a fairness and legal requirement, never an upsell | `TARGET` |
| FL21 | Deletion of organizational data with an audit record and a stated legal-retention position | `INCLUDED` | `INCLUDED` | `INCLUDED` | A customer must be able to leave; retention must be stated, not hidden | `TARGET` |
| FL22 | Vessel and device ownership change and transfer, authorised and auditable | `INCLUDED` | `INCLUDED` | `INCLUDED` | Boats change hands; the platform must transfer them without leaking history | `TARGET` |
| FL23 | Onboarding: organisation setup, vessel import, role design and training | `INSTALLATION_SCOPE` | `INSTALLATION_SCOPE` | `CONTRACTED_SCOPE` | Onboarding is real work and is quoted separately; it is never included in the per-vessel hypothesis | `OPEN` (`X-05`, `X-06`) |
| FL24 | Subscription entitlement and billing: organization fee, vessel count, user seats | `INCLUDED` (required) | `INCLUDED` (required) | `CONTRACTED_SCOPE` | A service without an entitlement model is not a product; billing is not implemented in MC-07 | `TARGET`; `OPEN` (E-26) |
| FL25 | Explicit limits on vessels, users, telemetry retention, storage and API — never "unlimited" | `INCLUDED` | `INCLUDED` | `INCLUDED` | Every limit is published; an unbounded promise is unsupportable and is prohibited | `OPEN` (limits not frozen) |
| FL26 | Uptime/availability SLA figure | `NOT_INCLUDED` (`NO_SLA_ESTABLISHED`) | `NOT_INCLUDED` (`NO_SLA_ESTABLISHED`) | `CONTRACTED_SCOPE` (only as a contracted commitment with measurement evidence) | No SLA exists today; an SLA may only exist as a measured, contracted commitment | `BLOCKED` (no measurement or contract) |
| FL27 | Remote vessel control, steering, motor command or any control path | `NONE_BY_DESIGN` | `NONE_BY_DESIGN` | `NONE_BY_DESIGN` | Telemetry is read-only; the platform must never become a remote helm | by design (`remoteSteeringAllowed = false`) |
| FL28 | Cross-tenant leakage through search, cache, reports, exports or background jobs | `NONE_BY_DESIGN` | `NONE_BY_DESIGN` | `NONE_BY_DESIGN` | Tenant scope must be honoured everywhere; an audit log must never leak cross-tenant data | by design |
| FL29 | Use of customer production data for MAREA purposes | `NONE_BY_DESIGN` | `NONE_BY_DESIGN` | `NONE_BY_DESIGN` | No customer production data is used; the invariant is frozen in the batch-03 contract | by design |
| FL30 | Unlimited vessels, users, storage or API calls | `NONE_BY_DESIGN` | `NONE_BY_DESIGN` | `NONE_BY_DESIGN` | Never promised, in any tier or contract | by design (claims policy §3) |

### 4.2 Tenancy, role and authorisation boundaries (frozen model)

- **Structure.** Organization → memberships → roles → vessel assignments. Authorisation is enforced
  server-side on every sensitive operation; a client-supplied tenant id is never trusted.
- **The eight roles.** `ORGANIZATION_OWNER`, `ORGANIZATION_ADMIN`, `FLEET_MANAGER`, `MAINTENANCE_MANAGER`,
  `CREW_MEMBER`, `READ_ONLY_VIEWER`, `EXTERNAL_INSTALLER` (scoped, time-bound, vessel-level),
  `EMBARCARTE_SUPPORT` (explicitly scoped, audited, time-bound).
- **Non-negotiable invariants.** Organization A can never read or modify B; removed members lose access
  immediately; an external installer can never become an organisation admin; exports, reports, search, cache
  and background jobs honour tenant scope; audit logs never leak cross-tenant data; vessel/device transfer is
  authorised and auditable; support access is documented and audited.
- **Telemetry is read-only.** No steering, no motor and no remote-control path exists anywhere, in any edition
  or contract.
- **No fabricated SLA.** SLA figures may only exist as contracted commitments with measurement evidence;
  otherwise the state is `NO_SLA_ESTABLISHED`.

### 4.3 Pricing model components (what the per-vessel hypothesis does and does not cover)

| Component | START | BUSINESS | ENTERPRISE |
| --- | --- | --- | --- |
| Vessel subscription | EUR 49 / month per vessel, `HYPOTHESIS_UNAPPROVED`, VAT excluded, starting price | EUR 79 / month per vessel, `HYPOTHESIS_UNAPPROVED`, VAT excluded | Contracted; `NOT_ESTABLISHED` |
| Organisation fee | Hypothesis: none (`OPEN`, not approved) | Hypothesis: none (`OPEN`, not approved) | Negotiated |
| User seats | Included, not charged per seat (`OPEN`) | Included, not charged per seat (`OPEN`) | Negotiated |
| Onboarding | Quoted separately, never included | Quoted separately, never included | Contracted scope |
| Telemetry, storage and API limits | Explicit, published; no "unlimited" | Explicit, published; no "unlimited" | Contracted, explicit |
| Suggested vessel band | 1–10 vessels (suggested, not an enforced technical limit) | 11–50 vessels (suggested, not an enforced technical limit) | Contracted |
| SLA | `NO_SLA_ESTABLISHED` | `NO_SLA_ESTABLISHED` | Only as a contracted, measured commitment if one exists |

The vessel bands are commercial segmentation aids, not technical gates: an organisation must never be blocked
from buying the tier that fits its operation merely because a suggested band differs. No price in this table is
approved, costed or publishable; the full pricing authority is D6 (batch 03 pricing model) and MC-12.

### 4.4 FLEET integration status (frozen vocabulary)

| Relationship | Status | Evidence class and condition | Customer consequence |
| --- | --- | --- | --- |
| FLEET–WATCH | `CONDITIONAL` | `BLOCKED` (`D-09`, `H-12`); read-only telemetry and alerts under a written contract | An operator sees vessel state only where a WATCH system and an agreement exist |
| FLEET–HUB | `CONDITIONAL` | `BLOCKED` (`H-12`, `P-09`); read-only installation and telemetry health | Installation health may be visible when a HUB is contracted |
| FLEET–SENSE | `UNKNOWN` | `BLOCKED`; no verified integration | No claim is made |
| FLEET–PILOT | `BLOCKED` for any control; at most read-only status after engineering and privacy review | `BLOCKED` (`P-10`, `X-07`) | No control path exists; even read-only status is not available today |
| FLEET–NAV | `PLANNED` only with explicit customer permission | `BLOCKED` (`P-09`); condition: consent and a validated data path | Route/position context only where the customer authorises it |
| FLEET–WEATHER | `CONDITIONAL` per provider terms | `BLOCKED` (`D-10`) | Licensed forecasts only under a provider agreement |
| FLEET–DISPLAY | `UNKNOWN` | `BLOCKED`; no integration evidence | No claim is made |
| FLEET–AIS | `CONDITIONAL` read-only | `BLOCKED` (`D-09`) | Traffic context only; receive-only and never collision avoidance |

### 4.5 Edition record — `FLEET-START` (MAREA FLEET Start)

- **Edition ID.** `FLEET-START`.
- **Customer-facing name.** MAREA FLEET Start.
- **Product family.** `FLEET` (`SOFTWARE`), organisation SaaS subscribed per vessel per month.
- **Target segment.** Small operators — sailing schools, small charter fleets, marinas and boat managers — with
  roughly 1–10 vessels (suggested band, not an enforced limit) who need the operational basics and the full
  security model without workflow complexity.
- **Capabilities included.** FL01–FL10, FL15, FL17–FL22, FL24, FL25. In other words: the complete tenancy,
  security, audit, revocation, export, deletion and ownership-transfer model, the multi-vessel dashboard,
  maintenance history and tasks, documents, operational alerts and compatible read-only telemetry.
- **Capabilities excluded.** Configurable permission sets and delegated multi-scope administration; configurable
  maintenance workflows; standard reporting and service planning; integration/API access; account and
  access-review reporting; onboarding included in the price; any SLA; any control path.
- **Optional features.** Onboarding (quoted separately); WATCH/HUB systems that supply telemetry (separate
  products with their own subscriptions); WEATHER for the organisation only under a provider agreement.
- **Prerequisites.** A verified organisation and owner; acceptance of the data-processing terms; the customer's
  own telemetry sources if telemetry is to be ingested; onboarding (quoted); a documented role design.
- **Installation expectation.** `NOT_APPLICABLE` for the software; onboarding and any device installation are
  separately quoted scopes.
- **Subscription entitlement.** **Required**, monthly, per vessel, VAT excluded. Includes the standard seats and
  the published limits; onboarding is not included.
- **Price hypothesis.** **EUR 49 / month per vessel — `HYPOTHESIS_UNAPPROVED`**, VAT excluded, starting price
  only. No organisation fee is approved (hypothesis: none); seats are included, not charged per seat
  (hypothesis, `OPEN`); onboarding is quoted separately; limits are explicit and never "unlimited".
- **Current engineering readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`, `engineering = NOT_VERIFIED`,
  `licensing = NOT_CLEARED`, `hardware = NOT_APPLICABLE_SOFTWARE_PRODUCT`, `dataRights = NOT_GRANTED`,
  `compliance = NOT_STARTED`, `pricing = HYPOTHESIS_UNAPPROVED`, `brandPublication = NOT_GRANTED`,
  `availability = NOT_FOR_SALE`.
- **Current evidence.** `P-09` (no multi-tenant SaaS, no tenant isolation, no telemetry ingestion, no
  billing/entitlements); `D-09` (AIS-derived data retention/redistribution unresolved); `H-12` (no connectivity
  contract); `H-13` (CRA obligations, no secure update lifecycle); `X-07` (no identity, privacy or
  incident-response architecture). Evidence class: `BLOCKED`.
- **Conditional edition viability.** `DEFINED` as a structure; **not viable for sale** until the platform, the
  tenant-isolation evidence, the entitlement service and the data-processing terms exist. A small operator
  cannot be sold a promise of isolation; the isolation must be testable.
- **Criteria that justify the edition before launch.** (1) A working multi-tenant platform with tested tenant
  isolation, revocation and audit; (2) a documented and audited support-access model; (3) an entitlement and
  billing service with explicit limits; (4) a data-processing agreement and a privacy assessment; (5) a
  costed onboarding scope; (6) a costed basis that survives the EUR 49 hypothesis.

### 4.6 Edition record — `FLEET-BUSINESS` (MAREA FLEET Business)

- **Edition ID.** `FLEET-BUSINESS`.
- **Customer-facing name.** MAREA FLEET Business.
- **Product family.** `FLEET` (`SOFTWARE`), organisation SaaS subscribed per vessel per month.
- **Target segment.** Mid-sized operators — charter companies, larger schools and professional managers — with
  roughly 11–50 vessels (suggested band, not an enforced limit) who need finer permissions, operational
  workflows, reporting and controlled integrations across bases or departments.
- **Capabilities included.** Everything in Start, plus FL11, FL12, FL13 and FL14 within their published,
  explicit allowances.
- **Capabilities excluded.** Account/access-review reporting with contractual evidence; custom integrations;
  volume terms; any SLA; onboarding included in the price; any control path; anything beyond the published API
  and storage limits.
- **Optional features.** Onboarding (quoted); additional integrations within the published allowance; WATCH, HUB
  and WEATHER per their own terms.
- **Prerequisites.** As Start, plus a role and delegation design validated with the organisation, a workflow
  design for its maintenance process, and a defined integration list.
- **Installation expectation.** `NOT_APPLICABLE` for the software; onboarding and integration work are
  separately quoted.
- **Subscription entitlement.** **Required**, monthly, per vessel, VAT excluded. Includes the standard seats
  and the published Business limits; onboarding is not included.
- **Price hypothesis.** **EUR 79 / month per vessel — `HYPOTHESIS_UNAPPROVED`**, VAT excluded. The step from
  Start must be justified by workflow, reporting, permission and integration value — never by access to
  security features, which are identical in both tiers.
- **Current engineering readiness.** `engineering = NOT_VERIFIED`; `dataRights = NOT_GRANTED`;
  `pricing = HYPOTHESIS_UNAPPROVED`; `compliance = NOT_STARTED`.
- **Current evidence.** As Start, plus no workflow engine, no reporting layer and no API exist (`P-09`).
  Evidence class: `BLOCKED`.
- **Conditional edition viability.** `DEFINED` as a structure; **not viable for sale** until the workflow,
  reporting and integration capabilities are built, costed and restrictable to explicit limits. Without them,
  Business is a higher price for the same platform, which is exactly the label trap this document exists to
  prevent.
- **Criteria that justify the edition before launch.** (1) A workflow engine with tested approval/assignment
  behaviour; (2) a reporting layer with tenant-scoped correctness; (3) a published integration/API allowance
  with enforced limits; (4) evidence that an organisation buys Business for workflow value, not security;
  (5) all Start criteria; (6) a costed basis for the EUR 79 hypothesis.

### 4.7 Edition record — `FLEET-ENTERPRISE` (MAREA FLEET Enterprise)

- **Edition ID.** `FLEET-ENTERPRISE`.
- **Customer-facing name.** MAREA FLEET Enterprise. **Verdict `CONTRACTED_TIER`: a negotiated service contract,
  never a standard checkout SKU.**
- **Product family.** `FLEET` (`SOFTWARE`), contracted service tier.
- **Target segment.** Larger or multi-base operators, marinas groups and professional managers with procurement,
  audit, integration or volume requirements that cannot be satisfied by a self-service tier. Buyer is usually a
  procurement or operations director, not an individual skipper.
- **Capabilities included.** The negotiated scope only. It may draw on FL01–FL25 but nothing is included by
  implication from Start or Business; identity, tenant isolation, audit, revocation, export and deletion remain
  the same non-negotiable baseline.
- **Capabilities excluded.** Any capability not written in the contract; an "unlimited" anything; a guaranteed
  instant-alert service; any control or steering path; any claim of security certification; any SLA figure
  that is not measured and contracted.
- **Optional features.** Defined by the contract only.
- **Prerequisites.** A written contract; a data-processing agreement; an access and support model; an
  audit-evidence specification; a volume and payment model; a defined integration scope; a named
  EMBARCARTE contract owner.
- **Installation expectation.** Onboarding and any integration work are contracted scopes, quoted and scheduled;
  no fixed onboarding price exists.
- **Subscription entitlement.** **Contracted**: organisation fee, vessel count, seats, limits and term are
  negotiated. There is no standard list price and no checkout path.
- **Price hypothesis.** **`NOT_ESTABLISHED`.** Contracted; no figure may be published, and no "from" price may
  be inferred from Start or Business. Volume terms are a negotiation, not a discount promise.
- **Current engineering readiness.** `engineering = NOT_VERIFIED`; `compliance = NOT_STARTED`;
  `pricing = HYPOTHESIS_UNAPPROVED` with no amount; no service-level measurement capability exists.
- **Current evidence.** `P-09` (no platform), `H-12` (no connectivity), `H-13` (CRA), `X-07` (security and
  privacy architecture), `X-05` (no cost or contract basis). Evidence class: `BLOCKED`.
- **Conditional edition viability.** Viable **only** as a contract, and only after the Start/Business platform
  and its security evidence exist: an enterprise contract inherits every platform gap and adds procurement and
  audit obligations.
- **Criteria that justify the edition before launch.** (1) All Start criteria plus measurable service
  instrumentation; (2) an audit-evidence specification that the platform can actually produce; (3) a contract
  template reviewed by counsel; (4) a documented support-access and incident process; (5) a costed volume and
  onboarding model; (6) a stated position on service commitments that does not fabricate an SLA.

### 4.8 FLEET edition verdicts

- **Two standard tiers and one contract.** Start and Business are defined structures; Enterprise is a
  `CONTRACTED_TIER` and must never be rendered as a checkout plan, a "contact us for price" SKU with implied
  standard terms, or a source of invented SLA figures.
- **Security is never an edition feature.** Tenant isolation, audit, revocation, installer/support scoping,
  export and deletion are identical in every tier. A vendor that charges more for "security" invites the
  question of what the cheaper tier lacks; MAREA must never be that vendor.
- **The price is per vessel per month, VAT excluded.** Every other component (organisation fee, seats,
  onboarding, limits, volume terms) is explicit and separately stated; none may be hidden inside the per-vessel
  number.
- **Risk — the label trap.** If Business cannot evidence workflow, reporting and integration value, it is a
  higher price for the same platform. The verdict vocabulary exists to prevent that, and this document keeps it
  explicit.
- **Risk — the "fleet platform by stealth" drift.** Start must not absorb workflow and reporting "temporarily";
  if it does, Business has no reason to exist and the edition structure must be revised rather than the labels
  retained.

---

## 5. Cross-family comparison — what each family does for the customer

| Question the customer asks | MAREA DISPLAY | MAREA WEATHER | MAREA FLEET |
| --- | --- | --- | --- |
| What do I actually buy? | A physical, installed helm display device with base software | A licensed forecast subscription | An organisation SaaS subscription per vessel |
| Does it work on its own? | Yes as a device, but the data it shows depends on separately entitled software and data | Yes, standalone; NAV is not required | Yes, as a platform — but telemetry depends on separate WATCH/HUB systems |
| Does it need a subscription? | Not for the device; yes for NAV, WEATHER or charts if the customer wants them | **Yes**, annual | **Yes**, monthly per vessel |
| What is the edition choice about? | Station format only: the standard 7-inch-class object or a conditional larger one | Decision-support depth: standard forecast or model comparison/advanced layers/route context | Operational governance depth and contract scope: Start, Business, Enterprise |
| What must I still buy separately? | Charts, NAV, WEATHER, HUB, AIS, SENSE, WATCH, mounts, installation | Nothing required, but consumption in NAV/DISPLAY/HUB needs those products; B2B use needs FLEET and a provider agreement | Onboarding, WATCH/HUB telemetry sources, WEATHER under provider terms, integrations beyond the allowance |
| Is a survey or assessment required? | **Yes** — mounting, power, cabling and compatibility | No; only a coverage/entitlement check | Yes — onboarding and a role/tenant design; integration assessment for Business |
| Can I install it myself? | No for a fixed vessel installation; installer-led | Not applicable | Not applicable (software); devices installed by the customer's channel |
| What happens when data is missing? | The value is shown stale/lost with its age; never fabricated | The data point is shown stale or unavailable with its source and age; never a frozen forecast presented as current | Missing telemetry is shown as a gap; no inference that a vessel is "fine" |
| What claim is never made? | Measured size/brightness/ingress, certification, PILOT control | Accuracy, official warnings, exclusive data, offline rights, redistribution | SLA, certified security, unlimited limits, instant alerts, remote control |
| Can it steer the vessel? | No — read-only PILOT status at most | Never | Never — telemetry is read-only |

Nine-product context: DISPLAY is the **device**, NAV is the **navigation software**, WEATHER is the **licensed
data service**, HUB is the **onboard gateway**, AIS is the **receive-only radio**, SENSE is the **sensor
family**, WATCH is the **consumer monitoring service**, PILOT is the **supervised steering system** and FLEET is
the **organisation platform**. Each is a separate purchase; no family includes another.

---

## 6. Common customer misunderstandings (the five that must be engineered out)

These are not marketing risks; they are defects of the commercial definition. Every customer surface, quotation
and installer script must pre-empt them in plain language.

### 6.1 DISPLAY vs NAV

**What the customer may think:** "The display includes the navigation app and the charts."
**What is true:** DISPLAY is a device; NAV is software with its own subscription; charts are a licensed data
entitlement that neither includes by default. The device price includes the device, its base software and the
supplied mounting/harness. NAV and charts are separate purchases, and chart rights are `NOT_GRANTED`.
**Rule:** every DISPLAY quotation and page states, next to the price, that NAV, charts, WEATHER, HUB, AIS and
installation are not included.

### 6.2 WEATHER vs NAV

**What the customer may think:** "I already pay for NAV, so weather is free," or "weather is only a NAV
feature."
**What is true:** WEATHER is a standalone licensed-data subscription; NAV Pro may include WEATHER
Standard-equivalent read access **only where provider rights allow** (`CONDITIONAL`). One account, one ledger,
no double billing. Buying NAV never automatically includes weather rights, and buying WEATHER never includes
NAV.
**Rule:** describe the entitlement exactly as implemented; if the sharing is not implemented, it is not
promised.

### 6.3 FLEET SaaS vs the MAREA FLEET bundle/package

**What the customer may think:** "FLEET is the bundle, so it includes the hardware, the WATCH systems and the
installation."
**What is true:** the FLEET **product** is an organisation SaaS subscription per vessel. The MAREA FLEET
**bundle/package** is a bespoke commercial package whose contents (vessel SaaS, onboarding, optionally hardware
and communications) are quoted and governed by MC-08; bundle contents and prices are not decided here. Buying
the SaaS never includes hardware, onboarding or connectivity.
**Rule:** the words "MAREA FLEET" must always be accompanied by the object being discussed — product
subscription or quoted package — and no bundle price may be inferred.

### 6.4 WATCH vs FLEET

**What the customer may think:** "WATCH already shows several boats, so it is a fleet product," or "FLEET
includes WATCH."
**What is true:** WATCH is a single-boat consumer monitoring service; FLEET is an organisation platform for many
vessels with roles, permissions and governance. FLEET may consume authorised WATCH/HUB telemetry **read-only**
under a written contract (`CONDITIONAL`); neither product includes the other, and WATCH Plus must not become a
fleet platform by stealth.
**Rule:** state the boundary in both products' copy; no multi-tenant promise in WATCH, no implied WATCH
hardware in FLEET.

### 6.5 DISPLAY vs a tablet

**What the customer may think:** "This is a tablet in a waterproof case — I can use my own tablet instead."
**What is true:** DISPLAY is intended to be a mounted, powered, wired, commissioned and supported piece of
vessel equipment with a dedicated operating environment and a defined support path. A tablet is a valid
alternative for some customers, and saying so honestly is part of the product's credibility. What DISPLAY must
never claim is a measured readability, ingress or thermal performance it has not evidenced.
**Rule:** compare on integration, mounting, power and support — never on unmeasured screen performance; and never
disparage a tablet with unverified claims.

---

## 7. Cross-product inclusion boundaries (what no edition includes)

| Boundary | Rule (never deviate in copy, quotation or catalogue) |
| --- | --- |
| Buying DISPLAY does **not** include | Charts; NAV; WEATHER; HUB; AIS receiver; SENSE modules; WATCH; extra or specialist mounts; adapters and cabling beyond the supplied harness; installation; any measured display figure; PILOT control |
| Buying WEATHER does **not** include | NAV; DISPLAY; HUB; charts; offline data; redistribution rights; accuracy or coverage beyond the licensed area and horizon; B2B operational rights; any guarantee of forecast outcome |
| Buying FLEET does **not** include | WATCH or HUB hardware; telemetry entitlements; WEATHER beyond provider terms; onboarding; integrations beyond the published allowance; any SLA; any control path; any "unlimited" quantity |
| Buying any edition does **not** include | An approved price, a delivery date, a certification, a support SLA, an installation time or price, or a compatibility result |
| No edition includes | Another MAREA product, a bundle entitlement, charts, HUB, AIS hardware, PILOT authority, unlimited storage/users/vessels/API calls, or a guaranteed service level |
| No price may be summed | Bundle pricing is governed by MC-08; no edition hypothesis may be added together to imply a bundle price |

The five absolute exclusions, restated because they are the most likely commercial misreading: **charts are
never included; HUB is never included; AIS hardware is never included; PILOT authority is never included; and
no edition promises unlimited anything or a guaranteed SLA.**

### 7.1 The batch-03 limitation statements that must accompany these editions

These are the INTERNAL DRAFT limitation statements frozen by the MC-07 brief §17.2 (pending claims-register
approval; not claimed as approved policy text). They must appear verbatim, in the product's language, in each
product dossier's disclaimers section and in both product copy files; they are repeated here so that no
edition description can drift from the words the customer will read.

- **DISPLAY** — ES: «La pantalla es un concepto interno: no existe una unidad fabricada ni se han verificado tamaño, brillo, legibilidad solar ni resistencia ambiental. Las cartas y los servicios de datos se licencian por separado.»
  EN: "The display is an internal concept: no manufactured unit exists and its size, brightness, sunlight legibility and environmental resistance have not been verified. Charts and data services are licensed separately."
- **WEATHER** — ES: «La cobertura depende de proveedores con licencia y no se garantiza la exactitud de la previsión. Una previsión caducada o no disponible nunca se presenta como actual.»
  EN: "Coverage depends on licensed providers and forecast accuracy is not guaranteed. A stale or unavailable forecast is never presented as current."
- **FLEET** — ES: «MAREA FLEET es un diseño interno: no existe un servicio multiempresa desplegado ni una certificación de seguridad, y no se garantiza ningún nivel de servicio. La telemetría es de solo lectura y nunca permite gobernar la embarcación.»
  EN: "MAREA FLEET is an internal design: no deployed multi-tenant service and no security certification exist, and no service level is guaranteed. Telemetry is read-only and never allows steering the vessel."

---

## 8. Candidate decisions for the Lead to record in `DECISION-LOG.md`

The Lead owns the decision log. The following candidates are proposed for MC-07; identifiers are provisional
(CD = candidate decision) and must be renumbered by the Lead as D-012 onwards. They are not decisions until
recorded.

| # | Candidate decision | Why it must be recorded | Affects |
| --- | --- | --- | --- |
| CD-01 | **Batch-03 edition set frozen at seven objects**: DISPLAY-7, DISPLAY-LARGE-CONDITIONAL, WEATHER-STANDARD, WEATHER-PRO, FLEET-START, FLEET-BUSINESS, FLEET-ENTERPRISE. No eighth object; no generation label, measured size or version suffix. | Prevents the size label and the enterprise tier from drifting into SKUs | D4, D8, D9, D11 |
| CD-02 | **DISPLAY-7 is a conditional starting hypothesis**: the 7-inch-class designation is a working commercial designation, `SIZE_NOT_FROZEN`, and EUR 699 describes the minimum display package only. Installation is quoted separately; NAV, charts, WEATHER, HUB, AIS and mounts are never included. | The most likely misreading is a turnkey helm price with charts | D4, D6, D8 |
| CD-03 | **DISPLAY-LARGE-CONDITIONAL may be withdrawn without commercial consequence** if hardware selection does not support a second size class at a defensible cost; it is never published with a measured size or a price. | A conditional object must have an exit, not a label | D4, D8, D11 |
| CD-04 | **WEATHER is one product with one entitlement ledger and two consumer editions**; NAV Pro may include WEATHER Standard-equivalent read access only where provider rights allow; upgrading applies a prorated credit; the same entitlement is never billed twice. | Freezes the no-double-billing model before any subscription UI is designed | D4, D6, D8, D11 |
| CD-05 | **FLEET pricing is per vessel per month, VAT excluded**, with organisation fee, seats, onboarding, limits, telemetry and API allowances stated explicitly; no "unlimited" component and no organisation fee approved in Start/Business. | Stops an unbounded promise and a hidden fee from entering the catalogue | D4, D6, D11 |
| CD-06 | **FLEET-ENTERPRISE is a `CONTRACTED_TIER`, not a checkout SKU**, with no standard price, no invented SLA and no unlimited terms; any SLA exists only as a contracted commitment with measurement evidence, otherwise `NO_SLA_ESTABLISHED`. | Enterprise is where invented SLA and "custom everything" language enters | D4, D6, D8, D11 |
| CD-07 | **Security, safety and data portability are never edition features.** Tenant isolation, role scoping, audit, revocation, export/deletion, stale/lost state honesty, subscription isolation and device ownership transfer are included in every edition of every batch-03 product. | Restates the batch-02 principle for the new three | D4, D5, D8, D9 |
| CD-08 | **The five misunderstandings of §6 are treated as engineering requirements**, not copy preferences: DISPLAY≠NAV, WEATHER≠NAV, FLEET SaaS≠bundle, WATCH≠FLEET, DISPLAY≠tablet. Each must be pre-empted at the point of price, edition choice and quotation. | The commercial definition is only as good as the customer's understanding | D4, D8, D9 |
| CD-09 | **The edition-level register codes `DSP`, `WX` and `FL` are this document's authority**; the D1–D3 dossiers' capability codes are reconciled by mapping, never by reusing these ids for a different capability. | Prevents an id collision between the editions authority and the dossiers | D4, D11 |

## 9. Open edition questions (explicitly unresolved)

| # | Question | Why it is open | Owner |
| --- | --- | --- | --- |
| E-17 | Exact panel size/class, resolution and whether a 7-inch-class device is manufacturable at a defensible cost | `SIZE_NOT_FROZEN`, `HARDWARE_NOT_SELECTED` (`H-11`, `H-05`, `X-05`) | Hardware + procurement |
| E-18 | Whether the display hardware, enclosure and BOM can be selected and frozen at all | No display or enclosure exists (`H-11`, `P-07`) | Hardware + engineering |
| E-19 | How the sunlight/night/thermal/ingress/vibration targets will be measured and by whom | `compliance = NOT_STARTED` (`H-06`, `H-11`) | Engineering + compliance |
| E-20 | Embedded runtime, secure boot and update/recovery mechanism for the device | No embedded runtime or secure update (`H-13`, `P-07`) | Engineering |
| E-21 | Which licensed provider(s), variables, area and horizon WEATHER may actually offer per edition | `D-04`, `D-05`, `D-07`, `D-10`; `DEC-03` | Product + finance + counsel |
| E-22 | Whether NAV Pro includes WEATHER Standard-equivalent access, and on what terms | Provider rights and bundle governance (`D-04`, `D-07`, MC-08) | Product + finance |
| E-23 | VAT basis and consumer-subscription terms for WEATHER | Not frozen in the brief; pricing authority not yet exercised (`X-05`) | Finance |
| E-24 | Cancellation and read-only export window for WEATHER records | 30-day hypothesis requires legal review | Product + counsel |
| E-25 | Whether FLEET vessel bands are commercial guidance or enforced limits, and how they are stated | No platform or pricing authority; would become a customer-visible constraint | Product + finance + engineering |
| E-26 | FLEET organisation fee, seat model, onboarding price and limit values | `X-05`; no costed model | Finance + procurement |
| E-27 | Whether FLEET telemetry ingestion changes any WATCH/HUB entitlement or billing | Separate products, separate entitlements, no contract exists (`D-09`, `H-12`) | Product + finance |
| E-28 | Enterprise contract scope, audit evidence and service-commitment measurement capability | `NO_SLA_ESTABLISHED`; no instrumentation | Product + counsel + engineering |
| E-29 | Whether `DISPLAY-LARGE-CONDITIONAL` survives hardware selection | Depends on selected platform and cost (`H-11`, `X-05`) | Hardware + product |

None of these changes the edition *structure*; each changes the *contents, the limits or the price* of an
edition and must be closed before any product page, quotation or catalogue entry is published.

## 10. Status statement

This document defines editions for products that are **completely specified and not for sale**. It approves no
price, creates no purchasable SKU, certifies nothing and asserts that no capability above is implemented.
MAREA DISPLAY, MAREA WEATHER and MAREA FLEET are `DEFINED`; engineering readiness is `NOT_VERIFIED`; hardware
is `NOT_SELECTED` for DISPLAY and `NOT_APPLICABLE_SOFTWARE_PRODUCT` for WEATHER and FLEET; licensing is
`NOT_CLEARED`; data rights are `NOT_GRANTED`; conformity is `NOT_STARTED`; brand publication is
`NOT_GRANTED`; availability is `NOT_FOR_SALE`. No display hardware exists, no provider is licensed, no
multi-tenant platform exists and no SLA exists. Publication is `BLOCKED`; trademark clearance is
`NOT_GRANTED`; OPEN-MARINE source rights are `NOT_CLEARED`; image generation is `BLOCKED` (X-03). No edition
includes charts, HUB, AIS hardware, PILOT authority, unlimited anything or a guaranteed service level. Every
price in this document is `HYPOTHESIS_UNAPPROVED` or `NOT_ESTABLISHED`, and no product in this batch may be
merged, deployed, published or sold on the basis of this document.

Related documents: `docs/marea/products/README.md`; `COMMERCIAL-PORTFOLIO.md` §07–§09; the batch-03 dossiers
`MAREA-DISPLAY-COMMERCIAL-SPEC.md` (D1), `MAREA-WEATHER-COMMERCIAL-SPEC.md` (D2) and
`MAREA-FLEET-COMMERCIAL-SPEC.md` (D3); `CUSTOMER-JOURNEYS-DISPLAY-WEATHER-FLEET.md` (D7); the batch-02
precedent `PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md`; `MC-02-BLOCKERS-AND-DECISIONS.md`;
`COMMERCIAL-BRAND-CLAIMS-POLICY.md`.
