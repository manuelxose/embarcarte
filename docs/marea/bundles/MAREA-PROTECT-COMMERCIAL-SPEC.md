# MAREA PROTECT — complete bundle commercial specification (MC-08 / D5)

| Field | Value |
| --- | --- |
| Document ID | MC-08 / D5 / MAREA-PROTECT-COMMERCIAL-SPEC |
| Milestone | MC-08 (Master Prompt 08/36) — complete commercial solution bundles, configuration rules, compatibility, subscriptions and unit economics |
| Deliverable | D5 — fourth bundle specification of six |
| Bundle | `MAREA PROTECT`; bundle id `PROTECT`; #4 of six (`START`, `CRUISE`, `SAIL`, `PROTECT`, `COMPLETE`, `FLEET package`) |
| Owner function | Vessel Monitoring and Sensor Specialist |
| Status | `INTERNAL` / `NOT PUBLISHED` / `NOT FOR SALE` / `BUNDLE DEFINITION ONLY` |
| Lifecycle | `DEFINED` internally; `NOT_FOR_SALE`; publication `INTERNAL_ONLY` |
| Brand clearance | `NOT_GRANTED` (MAREA is a proposed brand) |
| Source IP clearance | `NOT_CLEARED` (OPEN-MARINE is a read-only reference) |
| Price status | `HYPOTHESIS_UNAPPROVED` / `NOT_ESTABLISHED` / `OPEN` — no bundle price is approved or cost-justified |
| Image generation | `BLOCKED` (`X-03`) — no visual is produced or requested by this milestone |
| Base commit | MC-07 HEAD `80c66c70a1bab6f11c5ba5709baa4c1671f1d6da` |
| Branch | `feature/marea-mc08-bundles-commercial-architecture` |
| Date | 2026-10-30 |
| Write scope | This file only |
| Contract authority | `docs/marea/bundles/BUNDLE-ARCHITECTURE.md` §3–§8 (inclusion vocabulary, canonical reference configurations, cross-bundle rules); `docs/marea/products/README.md` §1–§32 (evidence classes, claim rules, price rules, notification model) |
| Decisions consumed | `docs/marea/execution/DECISION-LOG.md` D-007–D-024, especially D-008 (edition structure), D-010 (notification semantics), D-011 (safety never edition-gated), D-013 (one NAV/WEATHER ledger), D-015 (safety/security/portability never edition features), D-018 (bundle contract type), D-020 (PROTECT counts sensors once; HUB not required), D-023 (historical price verdicts) |
| Gates used unchanged | `WATCH_INGESTION = NOT_VERIFIED`; `WATCH_NOTIFICATION_PIPELINE = NOT_FOUND`; `WATCH_DEVICE_IDENTITY = NOT_FOUND`; `WATCH_SUBSCRIPTION_SERVICE = NOT_FOUND`; `WATCH_CONNECTIVITY_CONTRACT = NOT_FOUND`; `SENSE_MEASUREMENT_ACCURACY = NOT_MEASURED`; `SENSE_INGRESS_PROTECTION = NOT_VERIFIED`; `SENSE_NMEA2000 = NOT_IMPLEMENTED`; `HUB hardware = NOT_SELECTED`; 0 compatibility rows `SUPPORTED` |
| Is not | A product definition; a SENSE kit page; a WATCH product page; a quotation; a contract; a price list; a compatibility certification; a stock or availability statement; a warranty statement; a rescue, distress, security or theft-prevention service; a release |

This dossier defines the **finished commercial bundle** MAREA PROTECT: what the bundle contains, which edition and
module ids compose it, what the customer must still obtain externally, what the bundle explicitly excludes, how the
configuration behaves when it fails, and the evidence that would have to exist before any publication or sale. A
complete specification is not readiness, readiness is not availability, and a bundle definition is not an order.

MAREA PROTECT is the **unattended-vessel monitoring solution**: one WATCH Core monitoring unit with its required
monitoring subscription, plus the SENSE Essentials kit (battery/DC and bilge measurement), plus the installation,
connectivity and commissioning work required to make it real. It is not a SENSE kit with an app, not a WATCH page
with sensors added, not a certified alarm, not a distress service, not a theft-prevention guarantee and not a
remote control of any kind.

## 0. Contents

1. Scope and status statement
2. Canonical composition table
3. Mandatory configuration rules
4. Compatibility and eligibility criteria
5. Installation and commissioning
6. Sensor-not-double-counted rule
7. Failure experience table (canonical notification model)
8. Entitlements
9. Configuration outcomes
10. Journey, copy and asset pointers
11. Future acceptance criteria
12. The 24 canonical bundle fields (B01–B24)
13. Status statement and non-assertions

---

## 1. Scope and status statement

### 1.1 What this document decides

- the **fixed reference configuration** of MAREA PROTECT: `WATCH-CORE` + `SENSE-ESSENTIALS` kit + the mandatory
  monitoring subscription, with HUB explicitly not required;
- the **inclusion classes** and dependency rules of every line, using the exact MC-08 vocabulary
  (`INCLUDED`, `REQUIRED_EXTERNAL`, `OPTIONAL`, `CONDITIONAL`, `NOT_INCLUDED`, `INELIGIBLE`, `QUOTATION_REQUIRED`);
- what the bundle **excludes**, including every assumption that would misdescribe SENSE or WATCH;
- the **failure experience**, reusing the canonical WATCH notification state model and the eight distinct
  timestamps without inventing a second vocabulary;
- the **entitlements**, including the fundamental isolation of local safety from commercial state;
- the **configuration outcomes**, all internal, none orderable;
- the 24 mandatory bundle fields with evidence, owner, references and release readiness.

### 1.2 What this document does not decide

No price, no stock, no lead time, no availability, no certification, no compatibility support status, no subscription
inclusion value, no retention window, no installation price or duration, no warranty term and no channel margin is
decided here. Those are `OPEN` or `BLOCKED` and are stated as such. No product dossier is edited by this document.

### 1.3 The one-message summary

MAREA PROTECT is completely specified as a bundle and not for sale. Its WATCH service does not exist
(`WATCH_INGESTION = NOT_VERIFIED`; notification pipeline, device identity, subscription service and connectivity
contract `NOT_FOUND`), its SENSE modules have no measured accuracy (`SENSE_MEASUREMENT_ACCURACY = NOT_MEASURED`) and
no tested input path (`I-08 PLANNED`, 0 `SUPPORTED` rows). The historical EUR 399 hypothesis is **not cost-justified**
(§12 B19) and is not presented as a price. The monitoring subscription is required for remote monitoring, its contents
are `OPEN`, and connectivity/SIM/data is not included in any WATCH hardware figure.

---

## 2. Canonical composition table

The reference configuration is fixed by `BUNDLE-ARCHITECTURE.md` §6.4. A bundle is a **composition**, not a
super-product: every line resolves to an existing product family and edition/module/kit id, or to a named external
service. No invented SKU id appears below.

**Counting rule:** the composition has **three MAREA commercial objects** — one `WATCH-CORE` unit (hardware plus its
required subscription entitlement), one `SENSE-ESSENTIALS` kit line, and the recurring monitoring subscription that is
part of the WATCH-CORE entitlement. The kit line expands exactly to the two module ids `SENSE-POWER` and
`SENSE-BILGE`; those two ids are **not** separate lines.

Lines `PR-06` and `PR-08` are the canonical **groups** of external requirements; `PR-06` covers the cellular/SIM/data
plan and `PR-08` covers installation materials, installation labour, commissioning/registration and the
consent/privacy notice. Each group is expanded below into its constituent items, which share that canonical line id.

| Line | Family id | Edition / module id | Qty | Role in the bundle | Inclusion class | Dependencies | Subscriptions | Compatibility status + source row | Evidence class | Price status | Cost status | Installation class | Release blockers |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `PR-01` | `WATCH` | `WATCH-CORE` | 1 | Onboard monitoring hardware: device, mounting/power items, device identity, firmware/account software, declared essential inputs (position, battery/DC with shore-power context, bilge, temperature context, connectivity status) | `INCLUDED` | Vessel power; berth coverage; device provisioning; consented privacy notice; active subscription for remote functions | Required monitoring subscription (see `PR-07`) | SENSE inputs via `I-08` `PLANNED`; no `SUPPORTED` row; WATCH service `NOT_FOUND` | `VERIFIED_REPO` (D3, D4, D-008, D-011); `BLOCKED` on hardware and service | Hardware EUR 299 `HYPOTHESIS_UNAPPROVED`; connectivity/SIM/data **not included** | `BLOCKED` — no BOM, no supplier quote (`X-05`) | `INSTALLER_ASSISTED` (owner-install only within a documented low-risk configuration; none validated) | `P-06`, `H-11`, `H-12`, `H-13`, `H-06`, `X-07`, `X-01` |
| `PR-02` | `SENSE` | `SENSE-ESSENTIALS` (kit) | 1 | Preconfigured kit that expands **exactly** to `SENSE-POWER` + `SENSE-BILGE`: DC/battery measurement and bilge water presence/level, with calibration, local indication and freshness display | `INCLUDED` | Module prerequisites: shunt/fuse arrangement and bilge mounting; installer electrical work; calibration at installation | None for the kit (module has no connectivity and no subscription) | Modules feed WATCH via `I-08` `PLANNED`; HUB path `I-06` `PLANNED`; no `SUPPORTED` row | `VERIFIED_REPO` (D4 §3.3, D-008, README §16 rule 6); `OPEN`/`BLOCKED` on measurement | `NOT_ESTABLISHED` — kits require an independent price/cost sheet and are never the sum of module hypotheses | `BLOCKED` — no BOM (`X-05`); `SENSE_MEASUREMENT_ACCURACY = NOT_MEASURED` | `PROFESSIONAL_REQUIRED` (electrical/bilge work); no validated self-install rule | `P-05`, `H-05`, `H-06` |
| `PR-03` | `SENSE` | `SENSE-POWER` and/or `SENSE-BILGE` as loose lines | 0 | Nothing: adding either module as a separate line while the kit is present double-counts the same physical sensors (conflict rule `CF-03`) | `INELIGIBLE` | — | — | — | `VERIFIED_REPO` (BUNDLE-ARCHITECTURE §6.4, §8 rule 1; BUNDLE-COMPOSITION-AND-EXCLUSIONS `CF-03`) | Not applicable | Not applicable | Not applicable | — |
| `PR-04` | `HUB` | `HUB-STANDARD` | 0 | Optional local combined dashboard on board; not required by WATCH and not part of the reference configuration | `OPTIONAL` | Separate purchase; local network; HUB compatibility matrix unbuilt | None (HUB is a one-off appliance, no subscription) | WATCH←HUB `I-11` `CONDITIONAL`; HUB→WATCH `I-29` `UNKNOWN`; no `SUPPORTED` row | `VERIFIED_REPO` (batch-01 D4; D5 `I-11`) | EUR 349 `HYPOTHESIS_UNAPPROVED` (standalone product price, not a bundle line) | `BLOCKED` — no BOM (`X-05`) | `INSTALLER_ASSISTED` | `P-02`, `H-04`, `H-05` |
| `PR-05` | `WATCH` | `WATCH-PLUS` | 0 | Conditional expansion of inputs/rules/history/seats; not selectable in this bundle today | `CONDITIONAL` | Requires validated additional inputs, rule engine, retention rights and costed seats | Would require its own monitoring subscription terms | `I-27` `CONDITIONAL`; `W11` organisation sharing `OPTIONAL` only | `VERIFIED_REPO` (D4 §4.3, D-008, D-011) | `NOT_ESTABLISHED` (prohibited to state) | `BLOCKED` — unvalidated, uncosted | Not applicable until validated | `P-06`, `X-05` |
| `PR-06` | external | Cellular connectivity / SIM / data plan | 1 required | The outbound data service that makes remote monitoring possible; price and terms do not exist | `REQUIRED_EXTERNAL` | Operator coverage at the berth; roaming position; data allowance | Contracted data plan, separate from the monitoring subscription | `WATCH_CONNECTIVITY_CONTRACT = NOT_FOUND` (`H-12`) | `BLOCKED` (`H-12`) | `NOT_ESTABLISHED` | `BLOCKED` — no operator quote | `NOT_APPLICABLE` | `H-12`, `X-05` |
| `PR-07` | `WATCH` | Monitoring subscription (WATCH-CORE entitlement) | 1 required | Recurring remote-monitoring service (required): contracted connectivity administration, shore ingestion/storage of the authorised subset, service-side rule evaluation, notification delivery through external providers, escalation, included history window and user seats, service support | `INCLUDED` | Active payment; contracted connectivity; notification providers; service build | It **is** the subscription; from EUR 9.90/month `HYPOTHESIS_UNAPPROVED`, contents `OPEN` | `WATCH_SUBSCRIPTION_SERVICE = NOT_FOUND` (`P-06`) | `VERIFIED_REPO` (D3 F12, D4 §4.2, README §17); `OPEN` on contents | From EUR 9.90/month `HYPOTHESIS_UNAPPROVED`; inclusions `OPEN` | `BLOCKED` — no billing/entitlement service (`X-05`) | `NOT_APPLICABLE` | `P-06`, `H-12`, `X-02`, `X-05` |
| `PR-08` | external | Installation materials (cabling, connectors, glands, mounts, fuses/power items, bilge mounting hardware) | 1 set | The real materials that make the sensors and the WATCH device installable | `REQUIRED_EXTERNAL` | Selected by the installation assessment; module-specific | None | Compatibility per module and per configuration, untested | `OPEN` — list not frozen; no tested configuration | `NOT_ESTABLISHED` | `BLOCKED` — no BOM (`X-05`) | `PROFESSIONAL_REQUIRED` | `H-05`, `X-05` |
| `PR-08` | external | Installation labour (electrical and bilge work, mounting, cable routing, calibration, commissioning) | 1 scope | The professional work required outside a documented low-risk self-install configuration | `REQUIRED_EXTERNAL` | Installer network does not exist; vessel assessment required | None | No validated self-install rule exists for any MC-06 product | `OPEN` — no installer network, no measured labour (`X-05`, `X-06`) | `NOT_ESTABLISHED` | `BLOCKED` — no labour rate | `PROFESSIONAL_REQUIRED` | `X-05`, `X-06` |
| `PR-08` | external | Device commissioning / registration / ownership proof | 1 scope | Binding the device to one vessel and one verified owner account, naming inputs, creating the first rules and running an end-to-end test alert | `REQUIRED_EXTERNAL` | Account system, device identity and ownership-proof flow `NOT_FOUND` | Requires active subscription | `WATCH_DEVICE_IDENTITY = NOT_FOUND` (`P-06`, `X-07`) | `BLOCKED` (`P-06`, `X-07`) | `NOT_ESTABLISHED` | `BLOCKED` | `INSTALLER_ASSISTED` | `P-06`, `X-07` |
| `PR-08` | external | Consent / privacy notice (position processing, roles, retention) | 1 required | Lawful processing of vessel position and monitored data; DPIA not performed | `REQUIRED_EXTERNAL` | Privacy notice and DPIA (`X-07`, `X-02` legal identity) | Included in the service terms (not yet written) | `BLOCKED` (`X-07`, `X-02`) | `BLOCKED` (`X-07`) | Not applicable | `BLOCKED` | `NOT_APPLICABLE` | `X-07`, `X-02` |

**Lines deliberately absent from the reference configuration** (all `NOT_INCLUDED`): `NAV` (any edition), `AIS`
(any edition), `DISPLAY` (any edition), `PILOT` (any edition), `WEATHER` (any entitlement), `FLEET` (any tenancy),
`SENSE` modules other than the kit's two, `SENSE-SAIL`, `SENSE-SYSTEMS`, and any `WATCH-PLUS` selection.

---

## 3. Mandatory configuration rules

These rules are binding on every page, quotation, configurator, catalogue entry and support script that ever
describes MAREA PROTECT. They are the reason the bundle can be specified without becoming a misleading offer.

1. **Fixed reference composition.** The canonical configuration is `WATCH-CORE` + `SENSE-ESSENTIALS` kit + the
   required monitoring subscription, with `HUB-STANDARD` optional. No substitute edition, module or kit may be
   silently selected.
2. **Kit expansion, not kit invention.** `SENSE-ESSENTIALS` expands **exactly** to `SENSE-POWER` + `SENSE-BILGE`.
   A kit never adds a capability its modules lack (README §18; D4 §3.3).
3. **Sensor double counting is rejected.** The kit is one line and counts as its two module ids. Adding a loose
   `SENSE-POWER` or `SENSE-BILGE` line as well is a **duplicate**, and a deterministic configurator must return
   `NOT_ELIGIBLE` for that configuration (conflict rule `CF-03`; §6).
4. **WATCH hardware and subscription are separate claims.** EUR 299 is a hardware-purchase hypothesis only;
   connectivity/SIM/data is **not included**; the monitoring subscription from EUR 9.90/month is a separate recurring
   hypothesis whose contents (data cap, device count, user count, retention) are `OPEN`.
5. **HUB is not required.** The batch-02 row `I-11` defines no required HUB relationship for WATCH; `HUB-STANDARD` is
   `OPTIONAL` only as a local combined dashboard (`I-06`/`I-11`). No bundle surface may imply that HUB is included,
   necessary or purchased by default.
6. **No direct sensor-to-shore assumption.** A SENSE module has no connectivity of its own and never delivers remote
   alerts. The connection between SENSE sensors and WATCH is the compatibility row `I-08`, which is `PLANNED` with no
   `SUPPORTED` evidence. No customer may be told that a module "works with WATCH" until a `SUPPORTED` row exists.
7. **No remote alert without all four layers.** Remote delivery exists only where WATCH hardware + WATCH software +
   an active monitoring subscription + contracted external connectivity are all present and working (conflict rules
   `CF-10`/`CF-11`: WATCH without a monitoring entitlement, or subscription-free cloud monitoring, is `NOT_ELIGIBLE`).
8. **`WATCH-PLUS` is not selectable now.** It is `CONDITIONAL` on additional inputs, configurable rules, retention
   and sharing benefits being separately validated and costed. It may never be priced by uplift from Core.
9. **No AIS, NAV, PILOT, DISPLAY, WEATHER or FLEET content.** PROTECT displays no AIS traffic, provides no charts or
   navigation, has no steering or helm function, includes no display, weather entitlement or fleet tenancy.
10. **Installation assessment is mandatory.** Professional installation is the expected route for the electrical and
    bilge work in the kit. Self-install is permitted only where a questionnaire deterministically confirms a
    documented low-risk configuration; no such validated rule exists today, so the default outcome is a specialist
    assessment or an installer proposal — never an asserted compatibility.
11. **Subscription isolation is a design requirement.** No entitlement state, payment failure or subscription expiry
    may disable valid local measurement, local alarms, local buffering or any safety-relevant independent function.
    Only the remote service and its presentation degrade.
12. **No prices, no stock, no CTA.** No bundle price, subscription inclusion value or installation price may be
    presented; no purchase call to action may be enabled; only future CTA intentions are permitted (§9).
13. **No certification, no distress, no theft prevention, no remote control.** PROTECT is not a certified alarm, not
    a SOLAS/GMDSS or distress service, not a theft-prevention guarantee, and has no remote switching, helm or
    steering path.
14. **No NMEA 2000 claim.** `SENSE_NMEA2000 = NOT_IMPLEMENTED`: no NMEA 2000 compatibility, licence or certification
    may be claimed, planned or implied in PROTECT.
15. **One entitlement ledger.** Where a customer already holds a granted NAV, WEATHER or WATCH entitlement, the
    bundle recognises it instead of rebilling it (D-013; `BUNDLE-SUBSCRIPTIONS-AND-ENTITLEMENTS.md` D10).

---

## 4. Compatibility and eligibility criteria

No row in any compatibility contract is `SUPPORTED` (MC-06 D5: 31 rows, 0 `SUPPORTED`). PROTECT therefore cannot
confirm compatibility in advance. The following criteria decide which **internal** configuration outcome applies.

| # | Criterion | Required evidence | Current status | Effect if unmet |
| --- | --- | --- | --- | --- |
| C-01 | Vessel has a suitable DC supply and a mounting location for the WATCH device | Installation assessment; electrical measurements at survey | `OPEN` — no validated assessment flow (`X-05`, `X-06`) | `SPECIALIST_SURVEY_REQUIRED` |
| C-02 | Berth has mobile coverage sufficient for the contracted data service | Operator, technology and measured signal at the actual berth | `BLOCKED` — `WATCH_CONNECTIVITY_CONTRACT = NOT_FOUND` (`H-12`) | `COMPATIBILITY_EVIDENCE_REQUIRED`; `NOT_ELIGIBLE` if the customer requires a coverage guarantee |
| C-03 | `SENSE-POWER` compatible with the vessel's shunt/fuse arrangement | Module compatibility row with model/firmware/direction; electrical safety review | `PLANNED`; `SENSE_MEASUREMENT_ACCURACY = NOT_MEASURED` | `SPECIALIST_SURVEY_REQUIRED` |
| C-04 | `SENSE-BILGE` mounting position, access and false-trigger behaviour | Detection test matrix, failure-mode analysis, ingress evidence | `NOT_MEASURED` / `NOT_VERIFIED` (`P-05`, `H-05`) | `SPECIALIST_SURVEY_REQUIRED` |
| C-05 | SENSE reading reaches WATCH with source, units, calibration state and freshness | `I-08` promoted to `SUPPORTED` with device/firmware test record | `PLANNED`; no test (`P-05`, `P-06`) | `COMPATIBILITY_EVIDENCE_REQUIRED` — never "supported" |
| C-06 | Optional HUB local dashboard path | `I-06` SENSE→HUB and `I-11` HUB→WATCH tested; HUB hardware selected | `PLANNED` / `CONDITIONAL`; HUB `NOT_SELECTED` | HUB remains `OPTIONAL`; not offered as verified |
| C-07 | Device identity, ownership proof and account binding | Provisioning, ownership proof, transfer and revocation executed end to end | `WATCH_DEVICE_IDENTITY = NOT_FOUND` (`P-06`, `X-07`) | `COMPATIBILITY_EVIDENCE_REQUIRED` |
| C-08 | Consent and privacy basis for position processing | Privacy notice, DPIA, lawful-basis confirmation by DPO; seller legal identity | `BLOCKED` (`X-07`, `X-02`) | `PUBLICATION_BLOCKED`; no processing may begin |
| C-09 | The vessel does not require a certified alarm, distress service, theft prevention or remote control | Recorded customer expectation; refusal boundary | By design — never supplied | `NOT_ELIGIBLE` |
| C-10 | The configuration does not assume NMEA 2000 or a universal sensor compatibility | Equipment inventory; no NMEA 2000 assumption | `SENSE_NMEA2000 = NOT_IMPLEMENTED` | `NOT_ELIGIBLE` |
| C-11 | The installation scope is known and quotable | Vessel survey, coverage assessment, written proposal naming inclusions/exclusions | `OPEN` — no installer network (`X-05`, `X-06`) | `QUOTATION_REQUIRED` |
| C-12 | The customer is not buying a duplicate set of sensors | Configuration review against the kit expansion | Rule enforced | `NOT_ELIGIBLE` if a loose module is added to the kit |

Eligibility outcomes are mapped to the six internal configuration outcomes in §9. No eligibility assessment may end
in an order, a reservation, a delivery date or a price.

---

## 5. Installation and commissioning

**Intended installation shape.** WATCH device mounting and fused power with a tidy cable route; `SENSE-POWER`
installation in the DC distribution (shunt/fuse arrangement per the module design); `SENSE-BILGE` mounting at a
plausible bilge location with access for inspection; glands and service loops; calibration of each module; module
verification; WATCH device provisioning; vessel registration and ownership proof; account linking; naming of each
monitored input and its normal range; first rule and geofence creation; one end-to-end test notification;
handover and training; a permanent installation/commissioning record.

**Who performs it.** Professional installation is offered for every configuration and is expected for the electrical
and bilge work. A documented low-risk self-install path is permitted only if a validated deterministic rule exists
for that exact configuration; **no MC-06 or MC-08 self-install rule is validated today**, so the default outcome is
`SPECIALIST_SURVEY_REQUIRED` or `QUOTATION_REQUIRED`. WATCH device installation may be owner-completed only inside a
documented configuration, and the service still requires commissioning and an active subscription.

**What is not included in the bundle price (which does not exist).** Installation labour, installation materials,
survey, connectivity/data plan, monitoring subscription contents beyond what the approved offer will state, spare
parts, and any vessel electrical work beyond the documented steps. No installation duration, price or technician
certification exists; none is stated or invented.

**Commissioning record.** The intended handover artefact is an installer commissioning record covering the monitored
input list, the calibration state of each module, the connectivity/coverage check, the ownership binding and the
test-alert result. The MC-04 blank record is an internal design reference only
(`docs/marea/brand/assets/print/marea-installer-commissioning-record-es.html` /
`docs/marea/brand/assets/print/marea-installer-commissioning-record-en.html`); it is not a certificate, is never
depicted as filled or signed, and no commissioning record exists for any vessel.

**Calibration.** Every SENSE reading is valid only within the module's verified range and calibration. Calibration is
performed at installation and its state is stored; an uncalibrated, stale or out-of-range value is displayed as
invalid, never as data (`SENSE_MEASUREMENT_ACCURACY = NOT_MEASURED` until measurement evidence exists).

**Acceptance of the installation.** The installation is accepted only when the owner can state which inputs are
monitored, which are not, what happens when power or connectivity is lost, how to revoke access, and when a test
notification has traversed observation → rule → alert → queue → provider acceptance/unknown/delivery evidence →
acknowledgement with its distinct timestamps recorded.

---

## 6. Sensor-not-double-counted rule

This rule is deterministic and testable; a future configurator, quotation engine or validator must implement it.

1. The bundle has **one** SENSE commercial line: `SENSE-ESSENTIALS`. It expands to exactly two module ids:
   `SENSE-POWER` and `SENSE-BILGE`. The expansion is a **view of the same physical units**, not a second purchase.
2. The expanded module count for the reference configuration is exactly **2** (power, bilge). The SENSE line count
   remains exactly **1** (the kit).
3. If a configuration adds `SENSE-POWER` or `SENSE-BILGE` as a loose line while `SENSE-ESSENTIALS` is present, the
   configuration contains the same module twice. It is a **duplicate** and the only permitted outcome is
   `NOT_ELIGIBLE`, with the explanation "the kit already contains this module".
4. Adding a **different** module (for example `SENSE-TANKS` or `SENSE-ENV`) is not a duplicate, but those modules are
   **not** part of the PROTECT reference configuration. They are `OPTIONAL` only through a future validated
   kit/input path (`I-27` `CONDITIONAL`; WATCH Plus benefits unvalidated), and no expansion may be presented as
   included, compatible or priced.
5. The same rule applies across bundles: `COMPLETE` lists `SENSE-POWER` and `SENSE-BILGE` as explicit module lines
   (no kit), and that is a different composition — it is not a PROTECT configuration and creates no duplication.
6. A quotation or order that contains both the kit and a loose duplicate module must be rejected, not discounted. The
   duplicate is not a commercial option and no "spare sensor" framing may be used to sell it.
7. No SENSE module, kit or bundle line may add a capability its modules lack, an accuracy figure, an ingress rating,
   a connectivity claim or a certified-alarm claim.

---

## 7. Failure experience table (canonical notification model)

The canonical MC-06 vocabulary is used exactly and is not extended: `EVENT_OBSERVED` → `RULE_MATCHED` →
`ALERT_CREATED` → `QUEUED` → `PROVIDER_ACCEPTED` → `DELIVERED_WHEN_CONFIRMED` → `ACKNOWLEDGED`; exceptional/terminal
states `EXPIRED`, `FAILED`, `DELIVERY_UNKNOWN`. The eight distinct timestamps are never conflated: `eventTime`,
`deviceClockTime`, `serverReceiptTime`, `alertCreationTime`, `notificationHandoffTime`, `providerAcceptanceTime`,
`deliveryConfirmationTime`, `userAcknowledgementTime`. Two rules bind every row: **provider acceptance is not
delivery**; **delivery confirmation is not human acknowledgement**. All behaviour below is a design requirement,
not a tested behaviour (`WATCH_NOTIFICATION_PIPELINE = NOT_FOUND`; every acceptance scenario is `NOT_EXECUTED`).

| # | Failure scenario | Canonical state(s) | Local behaviour (device / SENSE) | Remote / service behaviour | What the customer must see | Distinct timestamps involved | Future acceptance |
| --- | --- | --- | --- | --- | --- | --- | --- |
| FX-01 | **Device offline** (device reachable? no — no uplink or no power to the uplink) | No remote state is created; the service marks the device unreachable after the published threshold. No `DELIVERED_WHEN_CONFIRMED` may be claimed while offline | Local sensing, local alarms and local buffering continue with `eventTime` and `deviceClockTime`; values and events are queued with the device's own monotonic sequence | No new alert creation or delivery; queued data replays after reconnection in order, deduplicated, with the gap recorded | "No contact since …"; last-known-good values with their age and freshness state; gap duration; explicitly **not current** | `eventTime`, `deviceClockTime`, `serverReceiptTime` (only after reconnection) | `PROTECT-AC-07`; WATCH-AC-12/13 |
| FX-02 | **Sensor stale** (a SENSE module stops reporting or its value exceeds the freshness window) | Value state `STALE` (internal value model, not the alert enum). A rule may be **not evaluated** on stale data; a rule evaluated on stale input must say so. No alert may be created from a fabricated value | Other inputs continue; the affected module's last value is retained as last-known-good; local indication of that module follows its documented behaviour | Rule evaluation records "stale input" and the outcome; no alert pretends the reading is current | Affected input in stale/unknown state with age; last-known value; effect on rules stated; never a green "normal" | `eventTime`, `deviceClockTime`, `serverReceiptTime` | `PROTECT-AC-08`; WATCH-AC-15 |
| FX-03 | **No network coverage** at the vessel | Same as FX-01. The device cannot distinguish "no coverage" from another uplink cause and must not guess it | Local sensing, alarms and buffering continue; the buffer is bounded with a published drop policy (`OPEN`) | Service shows the device unreachable; no delivery claim while offline; on recovery the gap is recorded and buffered records replay | Coverage assumption not asserted as fact; last contact, gap, last-known-good; on recovery what was missed and for how long | `eventTime`, `serverReceiptTime` (post-recovery) | `PROTECT-AC-09`; WATCH-AC-13 |
| FX-04 | **Alert queued** (rule matched, alert created, attempts pending) | `ALERT_CREATED` → `QUEUED` | Observation already captured with its device timestamps | The service holds the alert and schedules an attempt per channel; no acceptance yet | "Queued" — not sent, not delivered; the alert timeline is visible | `eventTime`, `serverReceiptTime`, `alertCreationTime`, `notificationHandoffTime` (when handed off) | `PROTECT-AC-10`; WATCH-AC-06 |
| FX-05 | **Provider acceptance** (the provider took the handoff) | `QUEUED` → `PROVIDER_ACCEPTED` | No local change | Provider acceptance recorded as its own state and timestamp; escalation policy may continue; acceptance never sets delivered | "Accepted by the provider" — explicitly **not delivered**, and never proof that a person saw it | `notificationHandoffTime`, `providerAcceptanceTime` | `PROTECT-AC-11`; WATCH-AC-07 |
| FX-06 | **Delivery unknown** (provider accepted, no verifiable delivery evidence within the evidence window) | `PROVIDER_ACCEPTED` → `DELIVERY_UNKNOWN` (may later resolve to delivered on late evidence, or end `EXPIRED`) | Local functions unaffected | The alert stays visibly unknown; escalation continues per policy if unacknowledged; it is never collapsed into "delivered" | "Accepted, delivery not confirmed"; the limitation is explained in plain language; escalation status shown | `providerAcceptanceTime`, evidence-window expiry, `deliveryConfirmationTime` only if late evidence arrives | `PROTECT-AC-12`; WATCH-AC-08 |
| FX-07 | **Alert acknowledged** (an authorised person confirms and takes responsibility) | `DELIVERED_WHEN_CONFIRMED` or `DELIVERY_UNKNOWN` → `ACKNOWLEDGED` | No local change; local condition remains as measured | Acknowledgement recorded with actor, channel, time and optional note; escalation for that alert stops; all authorised viewers see it | Who acknowledged and when; acknowledgement is a human act, never inferred from a push tap, read receipt or silence | `userAcknowledgementTime` (after `alertCreationTime`) | `PROTECT-AC-13`; WATCH-AC-09 |
| FX-08 | **Subscription expired** (period end, no renewal) | No notification state is created for the commercial event; the remote service stops after the documented grace period | **Local sensing, local alarms, local buffering, local state and the disclaimers continue indefinitely.** No device bricking; no safety-relevant function disabled | Remote ingestion, storage of new history, notifications, escalation and history access beyond exported data stop after grace | "Subscription expired" with effective date; what stopped remotely; what still works locally; export offered before data limits apply | Not a notification timestamp; entitlement effective date (service record) | `PROTECT-AC-14`; WATCH-AC-16 |
| FX-09 | **Device power failed** (vessel supply lost or device supply lost) | If the design includes backup energy, the device reports power loss while it can; if not, it stops transmitting and its **silence is not normal** | Where backup energy exists, local sensing/buffering continue for the measured duration (never promised before measurement); power-loss reporting only where the design supports it | The service raises "device not reporting / power suspected" after the threshold where the design supports it; otherwise it shows an unreachable device | Power-loss or unreachable state; last-known-good; backup duration only if measured and published; "no report is not the same as normal" | `eventTime`, `deviceClockTime`, `serverReceiptTime` (last contact) | `PROTECT-AC-15`; WATCH-AC-14 |

**Implied exclusions of the failure experience.** WATCH cannot report a power loss without backup energy and a
reachable uplink; it cannot raise a geofence or condition alert without a valid measurement; it cannot prove delivery
or human acknowledgement; and it cannot keep the remote service alive without an active subscription and contracted
connectivity. It also cannot distinguish the cause of an uplink loss. These are stated limitations of a
conditional-awareness product, not defects to be hidden.

---

## 8. Entitlements

| Entitlement | Holder | Scope | Term | Renewal | Isolation / fallback | Status |
| --- | --- | --- | --- | --- | --- | --- |
| WATCH hardware ownership (`WATCH-CORE`) | Customer | Perpetual ownership of the monitoring device and the licence to use its on-device software inside the published support/update window | Perpetual hardware; support window `OPEN` | Not applicable to hardware; warranty terms `OPEN` | Local device function is not gated by any subscription | `BLOCKED` — `hardware = NOT_SELECTED`, no BOM (`H-11`, `X-05`) |
| WATCH monitoring subscription (`WATCH-CORE`, `PR-07`) | Customer account, per vessel | Remote ingestion/storage of the authorised subset, rule evaluation in the service, notification delivery through providers, escalation, included history window and user seats, service support | Term `OPEN` (monthly or annual stated at purchase; hypothesis only) | Renewal date, term and entitlements stated before charge; price indexation `OPEN`; grace period `OPEN` | Never disables local sensing, local alarms, local buffering or safety-relevant local function; only remote service degrades | `BLOCKED` — `WATCH_SUBSCRIPTION_SERVICE = NOT_FOUND` (`P-06`) |
| WATCH device identity and ownership (`CD-05`–`CD-07`) | Customer; device bound to one vessel and one verified owner | Provisioning, ownership proof, binding, transfer on sale, revocation, replacement | Device lifetime; replacement process `OPEN` | Not applicable | Identity and revocation are not monetisable and never edition-gated | `BLOCKED` — `WATCH_DEVICE_IDENTITY = NOT_FOUND` (`P-06`, `X-07`) |
| External connectivity / SIM / data plan (`PR-06`) | Customer (contracted with the operator) | Outbound data service; allowance, roaming and exhaustion behaviour | Contracted term `OPEN` | Operator terms `OPEN` | Connectivity loss degrades remote service only; local function continues | `BLOCKED` — `WATCH_CONNECTIVITY_CONTRACT = NOT_FOUND` (`H-12`) |
| SENSE module ownership (`SENSE-POWER`, `SENSE-BILGE` inside the kit) | Customer | Perpetual ownership of the physical modules; local measurement, calibration state, local indication and freshness display | Perpetual hardware | None | **No subscription exists for SENSE**; full local measurement survives any commercial state; a module never delivers remote alerts | `OPEN` — `hardware = NOT_SELECTED`, `SENSE_MEASUREMENT_ACCURACY = NOT_MEASURED` |
| Multi-user access (`W07`, `W08`) | Owner + invited users within the subscription | Owner, family/crew (W07) and time-limited technician/installer access (W08), role-scoped, revocable and audited | Duration of the subscription; invites expire | Included in the subscription at an `OPEN` user allowance | Access revocation is immediate and audited; not a paid upgrade | `NOT_FOUND` — no account/role system (`P-06`, `X-07`) |
| Organisation sharing (`W11`) | Not included | Marina-service/professional-fleet sharing beyond one owner's vessel | — | — | Not part of PROTECT; only an `OPTIONAL` WATCH-PLUS capability if separately validated; WATCH must not become a fleet platform | `NOT_INCLUDED` (Plus `OPTIONAL` only after validation) |
| History retention (`W09`) | Customer, inside the subscription | Published base history window for Core; values per data class | `OPEN` — short window intended, values to be set with the DPO | Retained per published schedule | Export offered before cancellation/deletion; local buffering independent of retention | `NOT_FOUND` — no service storage (`P-06`) |
| Warranty / statutory guarantee | Customer | Statutory consumer guarantee plus a contractual warranty whose duration and conditions are not defined | `OPEN`; seller legal identity `BLOCKED` (`X-02`) | Not applicable | Warranty does not depend on subscription state; support never implies monitoring | `BLOCKED` (`X-02`, `H-13`) |

**User count (canonical statement).** PROTECT includes **multi-user monitoring access through the WATCH subscription**:
the owner, family/crew (`W07`) and time-limited technician/installer access (`W08`) within a small named-user
allowance. **Organisation sharing is not included** (`W11` `NOT_INCLUDED` in Core; `OPTIONAL` only in a validated
WATCH-PLUS). The exact seats, retention window and notification channels are `OPEN` and must be published before sale.

**Renewal and cancellation (canonical statement).** The monitoring subscription is the only recurring MAREA
entitlement in PROTECT. Its term, renewal date, price-change notice, grace period and suspension order are `OPEN`.
Cancellation stops renewal and the remote service on the stated effective date; local measurement, local alarms and
local buffering continue; export is offered before remote data limits apply. Account deletion is a separate verified
action. No dark pattern, hidden renewal, fake urgency or "lifetime"/"free forever" language is permitted.

**Ownership transfer (canonical statement).** Sale of the vessel requires a documented transfer: the current owner
initiates the release, the new owner completes the binding, previous access is revoked, the installation record
stays with the vessel, and the subscription/warranty position is stated in the terms. The transfer flow does not
exist today (`WATCH_DEVICE_IDENTITY = NOT_FOUND`). The hardware warranty is not extended or reset by a transfer.

**Privacy / consent / identity.** Position and monitored data may leave the vessel only within the published uplink
allow-list; access is role-based and revocable; position is not public by default; no public sharing link exists in
the defined product; the privacy notice, DPIA and lawful-basis confirmation are `BLOCKED` pending DPO/counsel and the
seller's legal identity (`X-07`, `X-02`).

---

## 9. Configuration outcomes

Exactly these internal outcomes are permitted. **`ORDERABLE`, `FOR_SALE`, `APPROVED`, `PUBLISHABLE` and `READY` are
prohibited at every point of MC-08.**

| Outcome | When it applies to MAREA PROTECT | What it means |
| --- | --- | --- |
| `CONFIGURATION_DEFINED_INTERNAL` | The composition matches the canonical reference configuration (WATCH-CORE + SENSE-ESSENTIALS + required subscription; optional HUB; external connectivity/installation), and the customer has no requirement outside the declared envelope | The configuration is fully specified internally; it is **not** orderable, priced, compatible or available |
| `COMPATIBILITY_EVIDENCE_REQUIRED` | Any input path, module/model/firmware, ownership flow or connectivity assumption lacks a `SUPPORTED` row; for example `I-08`, `I-06`, `I-11`, `C-02`, C-05, C-07 | A compatibility assessment or future test evidence is required before the configuration can be described; never assumed |
| `SPECIALIST_SURVEY_REQUIRED` | The vessel power, mounting, bilge access, sensor installation or coverage cannot be assessed from the questionnaire (the default for most enquiries) | An installation/coverage survey is required before any quotation or plan |
| `QUOTATION_REQUIRED` | Installation labour/materials, connectivity terms or any vessel-specific scope must be priced by an installer/operator | A written, itemised quotation is the only commercial document; no fixed price exists |
| `NOT_ELIGIBLE` | The request needs an excluded capability or a prohibited composition: duplicate loose module with the kit, HUB treated as required/included, SENSE-direct-to-cloud alerts, NMEA 2000 dependency, certified alarm/distress/theft-prevention service, remote switching/helm/steering, or a coverage guarantee | The configuration is refused with the reason; no workaround that hides the excluded capability may be offered |
| `PUBLICATION_BLOCKED` | Always, at MC-08: brand `NOT_GRANTED` (X-01), image generation `BLOCKED` (X-03), no approved price (X-05), no subscription/connectivity terms (H-12/P-06), no privacy/DPIA (X-07), seller identity absent (X-02) | No page, catalogue entry, advertisement, quotation or CTA may be published; only internal definitions and future CTA intentions exist |

No configuration outcome permits a customer to buy, reserve, pre-order or schedule MAREA PROTECT.

---

## 10. Journey, copy and asset pointers

| Deliverable | Path | What PROTECT takes from it |
| --- | --- | --- |
| Bundle architecture | `docs/marea/bundles/BUNDLE-ARCHITECTURE.md` | Identity boundaries, inclusion vocabulary, canonical PR lines, cross-bundle rules |
| Composition and exclusions (D8) | `docs/marea/bundles/BUNDLE-COMPOSITION-AND-EXCLUSIONS.md` | Canonical line-item comparison across the six bundles |
| Configuration rules (D9) | `docs/marea/bundles/BUNDLE-CONFIGURATION-RULES.md` | Deterministic inclusion, dependency, duplicate-rejection and outcome rules |
| Subscriptions and entitlements (D10) | `docs/marea/bundles/BUNDLE-SUBSCRIPTIONS-AND-ENTITLEMENTS.md` | One ledger, NAV/WEATHER no-double-billing, WATCH and FLEET blocks, isolation table |
| Pricing and unit economics (D11) | `docs/marea/bundles/BUNDLE-PRICING-AND-UNIT-ECONOMICS.md` | EUR 399 challenge, hypothesis/cost framework, quotation model |
| Installation and quotation model (D12) | `docs/marea/bundles/BUNDLE-INSTALLATION-AND-QUOTATION-MODEL.md` | Assessment, installer scope, quotation triggers, commissioning record |
| Customer journeys (D13) | `docs/marea/bundles/BUNDLE-CUSTOMER-JOURNEYS.md` | 17-stage PROTECT journey and cross-sell path |
| Customer comparison (D14) | `docs/marea/bundles/BUNDLE-CUSTOMER-COMPARISON.md` | PROTECT vs START/CRUISE/SAIL/COMPLETE/FLEET package |
| Copy (D15) | `docs/marea/bundles/copy/protect.es.md`, `docs/marea/bundles/copy/protect.en.md` | 24-section ES/EN customer copy, no prices, no purchase CTA |
| Asset requirements (D16) | `docs/marea/bundles/BUNDLE-ASSET-REQUIREMENTS.md` | `PROTECT-HERO-01` … `PROTECT-TEC-10` (10 planned assets, truthful statuses) |
| Machine contract (D17) | `docs/marea/bundles/bundle-definitions.json` | Machine-readable PROTECT composition and flags |
| Product authorities | `docs/marea/products/MAREA-WATCH-COMMERCIAL-SPEC.md`, `MAREA-SENSE-COMMERCIAL-SPEC.md`, `WATCH-ALERT-DELIVERY-AND-PRIVACY-CONTRACT.md`, `SENSE-MEASUREMENT-AND-CALIBRATION-PLAN.md` | Capability detail, canonical states, notification model, measurement validity |
| Compatibility authority | `docs/marea/products/PRODUCT-COMPATIBILITY-PILOT-SENSE-WATCH.md` (`I-06`, `I-08`, `I-11`, `I-12`, `I-24`, `I-27`, `I-29`) | Per-path statuses; 0 `SUPPORTED` rows |
| Edition authority | `docs/marea/products/PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md` | `WATCH-CORE` `DEFINED`; `WATCH-PLUS` `CONDITIONAL`; `SENSE-ESSENTIALS` `DEFINED` = POWER + BILGE |

**Journey gate.** Every PROTECT journey stage must state the lifecycle (`DEFINED`, `NOT_FOR_SALE`), carry the
navigation and WATCH limitation statements, and never offer a purchase, reservation or price. Asset use is governed by
`BUNDLE-ASSET-REQUIREMENTS.md`: no PROTECT visual exists, all ten are planned, and four are
`BLOCKED_ON_IMAGE_GENERATION`.

---

## 11. Future acceptance criteria

All criteria are `NOT_EXECUTED` today; none may be announced as achieved. They are the evidence that would let a
future authorised milestone describe PROTECT as working — not as defined.

| ID | Criterion | Evidence required | Status |
| --- | --- | --- | --- |
| `PROTECT-AC-01` | Reference composition is configurable and the kit expands deterministically to `SENSE-POWER` + `SENSE-BILGE`; a loose duplicate module returns `NOT_ELIGIBLE` | Configuration engine test; negative duplicate test; no order path | `NOT_EXECUTED` |
| `PROTECT-AC-02` | A real WATCH device is installed, provisioned, bound to one vessel and one verified owner on a test vessel | Installation record, provisioning log, ownership-proof record | `NOT_EXECUTED` |
| `PROTECT-AC-03` | `SENSE-POWER` and `SENSE-BILGE` are installed, calibrated and verified, with measured accuracy evidence for each module | Calibration records, measurement test report, ingress evidence | `NOT_EXECUTED` |
| `PROTECT-AC-04` | A SENSE reading reaches WATCH with source, units, calibration state and freshness, and the `I-08` row is promoted to `SUPPORTED` with device/firmware evidence | Recorded device/firmware test; independent reviewer; published limitations | `NOT_EXECUTED` |
| `PROTECT-AC-05` | A rule fires end to end and every canonical state and timestamp is recorded distinctly | Alert ledger with `eventTime` … `userAcknowledgementTime`; provider handoff/acceptance records | `NOT_EXECUTED` |
| `PROTECT-AC-06` | Provider acceptance is recorded without setting delivered; delivery is recorded only with verifiable evidence; delivery unknown is a visible outcome | State-transition evidence for `PROVIDER_ACCEPTED`, `DELIVERED_WHEN_CONFIRMED` and `DELIVERY_UNKNOWN` | `NOT_EXECUTED` |
| `PROTECT-AC-07` | Device offline: local buffering and replay work across a real connectivity gap and the gap/last-known-good are shown | Controlled network-loss test; replay log; gap display evidence | `NOT_EXECUTED` |
| `PROTECT-AC-08` | Sensor stale: a stale module is shown as stale with its age and never presented as data; the rule outcome records the stale input | Fault-injection test; UI/state evidence | `NOT_EXECUTED` |
| `PROTECT-AC-09` | No coverage: the device is reported unreachable, no delivery is claimed while offline, and recovery resynchronises with a recorded gap | Coverage-loss test; unreachable-state evidence | `NOT_EXECUTED` |
| `PROTECT-AC-10` | Provider acceptance is distinguishable from delivery and acknowledgement in the customer surface | UI/report evidence; negative conflation test | `NOT_EXECUTED` |
| `PROTECT-AC-11` | Acknowledgement is recorded for an authorised user and stops escalation; it is never inferred from a push tap or read receipt | Acknowledgement record; escalation-stop evidence; negative inference test | `NOT_EXECUTED` |
| `PROTECT-AC-12` | Subscription expiry and payment failure never disable local measurement, local alarms or local buffering; export is offered | Entitlement-expiry and payment-failure tests; local-function test; export evidence | `NOT_EXECUTED` |
| `PROTECT-AC-13` | Power failure is reported where the design supports it, backup duration is measured and not promised, and silence is never treated as normal | Power-cut test; backup-duration measurement; buffer integrity evidence | `NOT_EXECUTED` |
| `PROTECT-AC-14` | Optional HUB dashboard, when present, is shown only within its tested path and never as a requirement | `I-06`/`I-11` test evidence; no-requirement assertion review | `NOT_EXECUTED` |
| `PROTECT-AC-15` | Privacy: consent, uplink allow-list, role revocation, audit and export are exercised on a real service | DPIA sign-off, consent records, revocation/audit tests | `NOT_EXECUTED` |
| `PROTECT-AC-16` | Ownership transfer and device replacement revoke the previous owner and rebind the device | Transfer/replacement records; revocation evidence | `NOT_EXECUTED` |
| `PROTECT-AC-17` | No PROTECT surface claims a price, availability, certification, distress service, theft prevention or remote control | Claims/policy review of every surface and asset | `NOT_EXECUTED` |

---

## 12. The 24 canonical bundle fields (B01–B24)

Each field carries exactly five bullet lines: **Definition**, **Evidence**, **Owner**, **References**, **Release
readiness**. `OPEN` and `BLOCKED` are legitimate values; the prohibited placeholder token is not used.

#### B01 — Identity
- **Definition.** MAREA PROTECT is the fourth of the six MAREA commercial solution bundles. It is the unattended-vessel monitoring solution: one `WATCH-CORE` monitoring unit with its required monitoring subscription, the `SENSE-ESSENTIALS` kit (which expands exactly to `SENSE-POWER` + `SENSE-BILGE`), and the installation, connectivity and commissioning work required to make it real. Bundle id `PROTECT`; customer-facing name `MAREA PROTECT`; type: bundle/composition, never a product family and never an SKU. It is defined to answer one concrete question for an absent owner — what is happening on the boat, and since when have I not known? — without exaggerating the answer: it is not a certified alarm, not a distress or rescue service, not a theft-prevention guarantee and it has no remote steering, helm or switching capability.
- **Evidence.** `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` bundle table (PROTECT: WATCH + essential sensors, EUR 399 plus subscription — unapproved); `VERIFIED_REPO docs/marea/bundles/BUNDLE-ARCHITECTURE.md` §4, §6.4; `VERIFIED_REPO docs/marea/products/README.md` §2, §12, §14, §18; `DEFINED` internally and `NOT_FOR_SALE`.
- **Owner.** Vessel Monitoring and Sensor Specialist (author); Lead as bundle architecture authority.
- **References.** `BUNDLE-ARCHITECTURE.md`; `MAREA-WATCH-COMMERCIAL-SPEC.md`; `MAREA-SENSE-COMMERCIAL-SPEC.md`; `PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md`; D-008, D-011, D-020.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`.

#### B02 — Commercial purpose
- **Definition.** Convert the two most universal unattended-boat anxieties — a dead battery bank and water in the bilge — into a defined, installable monitoring configuration with honest data states and a conditional remote alert service. The bundle exists so that a customer does not have to assemble a monitoring device, two measurement modules, connectivity, installation and a subscription by guesswork, and so that the delivery uncertainty of remote alerting is visible from the first page rather than discovered after purchase.
- **Evidence.** `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` §05–§06 and bundle table; `ASSUMPTION` on buyer motivation ranking; `OPEN` — no customer interviews or validated willingness to pay (`X-06`).
- **Owner.** Commercial product management (bundles).
- **References.** `CUSTOMER-JOURNEYS-PILOT-SENSE-WATCH.md` WATCH/SENSE journeys; `BUNDLE-CUSTOMER-JOURNEYS.md` (D13).
- **Release readiness.** `availability = NOT_FOR_SALE`.

#### B03 — Ideal customer
- **Definition.** Primary: the owner of a recreational sailing or motor vessel roughly 8–15 m left unattended for days or weeks in a marina, mooring or yard in Galicia and northern Portugal, who wants to know from ashore when battery state or bilge water needs attention and accepts that alerts depend on power, coverage and provider delivery. Secondary: the owner in winter lay-up or after a refit that exposes battery/bilge risk, and the second-hand buyer inheriting an old alarm or tracker. Not the ideal customer: anyone seeking a certified distress or security service, insurance-mandated monitoring, a theft-recovery guarantee, remote control of the vessel, or a commercial-shipping monitoring system.
- **Evidence.** `VERIFIED_REPO docs/marea/products/MAREA-WATCH-COMMERCIAL-SPEC.md` F02; `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` §05–§06; `ASSUMPTION` on segment priority; `OPEN` — no primary interviews or validated demand (`X-06`).
- **Owner.** Product marketing and commercial development.
- **References.** `MAREA-BRAND-STRATEGY.md` WATCH/SENSE rows; `PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md` §3–§4.
- **Release readiness.** `availability = NOT_FOR_SALE`.

#### B04 — Vessel or organization applicability
- **Definition.** Applicable to a single recreational vessel with a suitable DC supply, a mounting location for the WATCH device, a bilge location with access, and mobile coverage at the berth that the contracted data service supports (unquantified today). Not applicable to commercial shipping, to vessels requiring certified alarm or class-approved monitoring, to vessels whose steering/helm the customer expects to control remotely, or to organisations wanting multi-vessel tenancy — that is MAREA FLEET, a separate product. The kit's two modules must be installable within their documented prerequisite envelope (shunt/fuse arrangement for power; mounting/access for bilge); no universal vessel compatibility is claimed.
- **Evidence.** `VERIFIED_REPO docs/marea/products/MAREA-WATCH-COMMERCIAL-SPEC.md` F02/F07/F09; `VERIFIED_REPO docs/marea/products/PRODUCT-COMPATIBILITY-PILOT-SENSE-WATCH.md` §5 (survey/inventory requirements); `BLOCKED` — `WATCH_CONNECTIVITY_CONTRACT = NOT_FOUND` (`H-12`), no validated self-install rule.
- **Owner.** Service operations with the installer network.
- **References.** `PRODUCT-COMPATIBILITY-PILOT-SENSE-WATCH.md` §5.1–§5.3; `BUNDLE-CONFIGURATION-RULES.md` (D9).
- **Release readiness.** `engineering = NOT_VERIFIED`.

#### B05 — Main customer outcome
- **Definition.** The owner can see, from ashore, the declared monitored conditions (position/geofence context, DC/battery state with shore-power context, bilge water, temperature context and connection health) with source, time, freshness and last-known-good values; is alerted under the canonical notification lifecycle when a condition crosses a configured threshold, with provider acceptance, delivery and human acknowledgement kept distinct; sees connectivity gaps instead of a false green state; controls who can see the vessel by role; and can cancel without losing local monitoring. The outcome explicitly does **not** include guaranteed or immediate alert delivery, rescue, theft prevention, damage prevention, or any remote control.
- **Evidence.** `VERIFIED_REPO docs/marea/products/MAREA-WATCH-COMMERCIAL-SPEC.md` F04 and §5; `VERIFIED_REPO docs/marea/products/README.md` §16 rules 5–7, §20; `OPEN` — the entire service is unbuilt (`P-06`).
- **Owner.** Product management (WATCH + SENSE).
- **References.** `WATCH-ALERT-DELIVERY-AND-PRIVACY-CONTRACT.md`; `SENSE-MEASUREMENT-AND-CALIBRATION-PLAN.md`.
- **Release readiness.** `engineering = NOT_VERIFIED`.

#### B06 — Mandatory base components
- **Definition.** The canonical base configuration has three MAREA commercial objects and one recurring entitlement: (1) `WATCH-CORE` hardware with its declared essential inputs and device identity; (2) the `SENSE-ESSENTIALS` kit, which expands exactly to `SENSE-POWER` + `SENSE-BILGE`; (3) the required WATCH monitoring subscription that makes remote monitoring work; and (4) the external work without which nothing is delivered — cellular connectivity/SIM/data plan, installation materials, installation labour, device commissioning/registration, ownership proof and consent/privacy notice. The complete line list, quantities and inclusion classes are in §2 (lines `PR-01`–`PR-08`).
- **Evidence.** `VERIFIED_REPO docs/marea/bundles/BUNDLE-ARCHITECTURE.md` §6.4 (PR-01–PR-07 groups); `VERIFIED_REPO docs/marea/bundles/BUNDLE-COMPOSITION-AND-EXCLUSIONS.md` §3.4 (resolved lines PR-01–PR-08); `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md` §3.3 and §4.2; `BLOCKED` — no hardware, no BOM (`H-05`, `H-11`, `X-05`).
- **Owner.** Commercial product management with hardware procurement.
- **References.** `BUNDLE-COMPOSITION-AND-EXCLUSIONS.md` (D8); `bundle-definitions.json` (D17).
- **Release readiness.** `hardware = NOT_SELECTED`.

#### B07 — Optional components
- **Definition.** Optional items, always described by function and never by an invented name: `HUB-STANDARD` as a local combined dashboard on board (not required by WATCH; `I-11` `CONDITIONAL`; no tested path); additional compatible SENSE modules beyond the kit (`SENSE-TANKS`, `SENSE-ENV`) only through a future validated kit/input path (`I-27` `CONDITIONAL`, WATCH Plus unvalidated); a WATCH-PLUS upgrade only when its benefits are validated and costed; an external antenna or extension where the installation/coverage assessment requires one; backup-energy accessory where the final design supports one; professional installation, extended support and spare/replacement items as separate services. No optional item is included by default and none may add a capability the base configuration lacks.
- **Evidence.** `VERIFIED_REPO docs/marea/products/MAREA-WATCH-COMMERCIAL-SPEC.md` F08; `VERIFIED_REPO docs/marea/products/PRODUCT-COMPATIBILITY-PILOT-SENSE-WATCH.md` `I-11`, `I-27`; `VERIFIED_REPO docs/marea/bundles/BUNDLE-ARCHITECTURE.md` §6.4 PR-04/PR-05; `OPEN` — exact accessory list and compatibility.
- **Owner.** Product management with procurement.
- **References.** `MAREA-WATCH-COMMERCIAL-SPEC.md` F06/F08; `BUNDLE-CONFIGURATION-RULES.md` (D9).
- **Release readiness.** `hardware = NOT_SELECTED`.

#### B08 — Required product editions
- **Definition.** Exactly two MAREA editions/modules compose PROTECT: `WATCH-CORE` (verdict `DEFINED`; essential monitoring hardware + required subscription) and `SENSE-ESSENTIALS` (verdict `DEFINED`; kit of `SENSE-POWER` + `SENSE-BILGE`). `WATCH-PLUS` is `CONDITIONAL` and not selected. `HUB-STANDARD` is `OPTIONAL`, not required. No other edition, module, kit or product family is part of the reference configuration. Edition ids and verdicts come from the MC-06 edition authority and may not be renamed, added to or re-verdicted by MC-08.
- **Evidence.** `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md` §1.4, §3.3, §4.2–§4.3; `VERIFIED_REPO docs/marea/products/README.md` §14, §18; decision D-008, D-011; `VERIFIED_REPO docs/marea/bundles/BUNDLE-ARCHITECTURE.md` §6.4.
- **Owner.** Lead (CPO) as edition authority; Vessel Monitoring and Sensor Specialist for this bundle.
- **References.** `BUNDLE-ARCHITECTURE.md` §3.3, §6.4; `PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md`.
- **Release readiness.** `definition = COMPLETE_TARGET_SPECIFICATION` (edition structure); `availability = NOT_FOR_SALE`.

#### B09 — Explicit exclusions
- **Definition.** PROTECT excludes, explicitly and permanently: any assumption that WATCH comes with all sensors or that adding a SENSE module gives remote alerts by itself; guaranteed, immediate or acknowledged-by-a-human alert delivery; permanent or unlimited connectivity; theft prevention, theft recovery or a security-system guarantee; a certified distress, rescue, SOLAS or GMDSS service; remote switching, relay actuation, helm, steering, throttle or engine control; MAREA FLEET multi-tenant platform use or any fleet tenancy; SENSE direct-to-cloud alerts; NMEA 2000 compatibility (not implemented, not licensed, not certified); duplicate sensors beyond the kit composition; charts, navigation, AIS traffic, display or plotter functionality; installation labour, materials, connectivity/data plan or subscription contents inside any bundle price; and any certification, approval or availability claim.
- **Evidence.** `VERIFIED_REPO docs/marea/products/README.md` §16 rules 1, 5–7, 9; `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md` §6; `VERIFIED_REPO docs/marea/products/PRODUCT-COMPATIBILITY-PILOT-SENSE-WATCH.md` §7 (prohibited assertions); `VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §2, §4.
- **Owner.** Product management with claims/legal review.
- **References.** `BUNDLE-COMPOSITION-AND-EXCLUSIONS.md` (D8); `copy/protect.es.md` / `copy/protect.en.md` §9 and §23.
- **Release readiness.** `brandPublication = NOT_GRANTED`.

#### B10 — Dependency rules
- **Definition.** `WATCH-CORE` depends on a suitable DC supply, a mounting location, provisioning and ownership proof, consented privacy processing, an active monitoring subscription for any remote function, and contracted cellular connectivity. `SENSE-ESSENTIALS` depends on the installation electrical/bilge scope and per-module calibration. The kit's modules reach WATCH only through the `I-08` path (`PLANNED`); HUB is never a dependency; `I-11`/`I-29` are not required relationships. Remote delivery exists only where hardware + software + subscription + external connectivity are all present and working. No dependency may be satisfied by assumption: an untested input path is `COMPATIBILITY_EVIDENCE_REQUIRED`, not satisfied.
- **Evidence.** `VERIFIED_REPO docs/marea/products/MAREA-WATCH-COMMERCIAL-SPEC.md` §4.1 rules and §5.3; `VERIFIED_REPO docs/marea/products/PRODUCT-COMPATIBILITY-PILOT-SENSE-WATCH.md` `I-06`, `I-08`, `I-11`, `I-12`, `I-29`; `VERIFIED_REPO docs/marea/products/README.md` §16 rule 6; `BLOCKED` on `H-12`, `P-06`.
- **Owner.** Integration owner (WATCH service owner) with engineering.
- **References.** `PRODUCT-COMPATIBILITY-PILOT-SENSE-WATCH.md` §2; `BUNDLE-CONFIGURATION-RULES.md` (D9).
- **Release readiness.** `engineering = NOT_VERIFIED`.

#### B11 — Compatibility criteria
- **Definition.** Compatibility is per input, per module model, per firmware version, per direction and per installation — never by brand, connector, boat length or photograph. The SENSE→WATCH path `I-08` is `PLANNED`; SENSE→HUB `I-06` is `PLANNED`; WATCH←HUB `I-11` is `CONDITIONAL`; WATCH→HUB `I-12` is `UNKNOWN`; HUB→WATCH `I-29` is `UNKNOWN`; SENSE→FLEET direct `I-24` is `UNKNOWN` and PROTECT has no FLEET content. Zero rows are `SUPPORTED`, so no compatibility statement may be issued. Eligibility is assessed by a vessel/coverage/sensor questionnaire ending in one of four outcomes (`ELIGIBLE_SELF_INSTALL` — currently unreachable, `INSTALLER_ASSESSMENT_REQUIRED` — the default today, `NOT_SUPPORTED`, `INSUFFICIENT_INFORMATION`).
- **Evidence.** `VERIFIED_REPO docs/marea/products/PRODUCT-COMPATIBILITY-PILOT-SENSE-WATCH.md` §1.3 (31 rows: 0 `SUPPORTED`), §2, §5; `VERIFIED_REPO docs/marea/products/MAREA-SENSE-COMMERCIAL-SPEC.md` F09; `BLOCKED` — `SENSE_MEASUREMENT_ACCURACY = NOT_MEASURED`, `WATCH_INGESTION = NOT_VERIFIED`.
- **Owner.** Integration owner with SENSE product management.
- **References.** `PRODUCT-COMPATIBILITY-PILOT-SENSE-WATCH.md` §2–§6; `SENSE-MEASUREMENT-AND-CALIBRATION-PLAN.md`.
- **Release readiness.** `engineering = NOT_VERIFIED`; `COMPATIBILITY_EVIDENCE_REQUIRED`.

#### B12 — Installation requirements
- **Definition.** The intended installation includes WATCH device mounting and fused power with a tidy route; `SENSE-POWER` installation in the DC distribution; `SENSE-BILGE` mounting with inspection access; glands, service loops and mounting hardware; calibration and verification of both modules; device provisioning, vessel registration, ownership proof and account binding; naming of monitored inputs and their normal ranges; first rule and geofence; one end-to-end test notification; handover and training; and a permanent installation/commissioning record. Professional installation is expected for the electrical and bilge work, and is the default outcome because no validated low-risk self-install rule exists. No installation duration, price or technician certification exists; none may be stated.
- **Evidence.** `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md` §3.3 (`SENSE-ESSENTIALS`), §4.2 (`WATCH-CORE`); `VERIFIED_REPO docs/marea/products/MAREA-WATCH-COMMERCIAL-SPEC.md` F10; `OPEN` — no installer network, no measured labour, no assessment flow (`X-05`, `X-06`).
- **Owner.** Service operations with the installer network.
- **References.** `BUNDLE-INSTALLATION-AND-QUOTATION-MODEL.md` (D12); `docs/marea/brand/assets/print/marea-installer-commissioning-record-es.html`.
- **Release readiness.** `availability = NOT_FOR_SALE`; `SPECIALIST_SURVEY_REQUIRED` / `QUOTATION_REQUIRED`.

#### B13 — Software entitlements
- **Definition.** The WATCH device software entitlement (firmware, account, vessel registration, provisioning, rules, geofence, dashboard, history, sharing, privacy, audit, updates and support) is part of the purchased hardware and is not a subscription. The customer owns the hardware and holds a licence to use its on-device software inside the published support and update window (`OPEN`). Local software functions — sensing, local alarms, local buffering, stale/unknown display, access revocation, audit of who could see the vessel and export of the owner's own data — are never entitlement-gated. SENSE modules carry no software subscription at all. No entitlement may disable local steering behaviour, valid local measurement, local alarms or an approved safety-critical fallback.
- **Evidence.** `VERIFIED_REPO docs/marea/products/MAREA-WATCH-COMMERCIAL-SPEC.md` F12, §6.3; `VERIFIED_REPO docs/marea/products/README.md` §16 rule 7; `VERIFIED_REPO docs/marea/bundles/BUNDLE-ARCHITECTURE.md` §5 principle 7; decision D-010, D-011, D-015; `OPEN` — support/update window not defined (`H-13`).
- **Owner.** Commercial strategy with legal.
- **References.** `BUNDLE-SUBSCRIPTIONS-AND-ENTITLEMENTS.md` (D10); `WATCH-ALERT-DELIVERY-AND-PRIVACY-CONTRACT.md` §17.
- **Release readiness.** `licensing = NOT_CLEARED`.

#### B14 — Recurring subscriptions
- **Definition.** PROTECT carries exactly one MAREA recurring entitlement: the required `WATCH-CORE` monitoring subscription per vessel (from EUR 9.90/month `HYPOTHESIS_UNAPPROVED`, contents `OPEN`). It pays for the remote service — contracted connectivity administration, shore ingestion/storage of the authorised subset, service-side rule evaluation, notification delivery through external providers, escalation, the included history window and user seats, and service support. It does **not** include hardware ownership, connectivity/SIM/data cost, a delivery guarantee, any third-party data right or the kit. Term, renewal, price indexation, grace period, suspension order, retention window and seat count are `OPEN` and must be published before any sale. The subscription may never gate local safety-relevant function; downgrade is remote-service-only.
- **Evidence.** `VERIFIED_REPO docs/marea/products/README.md` §17 (only allowed WATCH figures); `VERIFIED_REPO docs/marea/products/MAREA-WATCH-COMMERCIAL-SPEC.md` F12, §6.4; `VERIFIED_REPO docs/marea/bundles/BUNDLE-ARCHITECTURE.md` §6.4 PR-07; `BLOCKED` — `WATCH_SUBSCRIPTION_SERVICE = NOT_FOUND`, `WATCH_CONNECTIVITY_CONTRACT = NOT_FOUND`.
- **Owner.** Commercial strategy with finance and legal.
- **References.** `BUNDLE-SUBSCRIPTIONS-AND-ENTITLEMENTS.md` (D10) WATCH block; `PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-02.md` §9.
- **Release readiness.** `pricing = HYPOTHESIS_UNAPPROVED`.

#### B15 — External data and connectivity
- **Definition.** Remote monitoring requires contracted outbound cellular connectivity (SIM/data plan) bought separately from the monitoring subscription. There is no telecom agreement, no coverage guarantee, no "unlimited worldwide" claim and no roaming position today; allowance, exhaustion behaviour, roaming territories and cost are `OPEN`. Position, monitored values and states, device health, alert lifecycle data and account/access data are the only classes that may leave the vessel (the uplink allow-list); AIS-derived traffic, audio/video, browsing data and commercial profiling are prohibited. Charts, weather, tides and AIS data rights are not part of PROTECT; AIS is not displayed. Data must never be presented as current when it is stale, and a connectivity gap must be shown, never interpolated.
- **Evidence.** `VERIFIED_REPO docs/marea/products/MAREA-WATCH-COMMERCIAL-SPEC.md` F09, §4.1 (`EXTERNAL_CONNECTIVITY` layer); `VERIFIED_REPO docs/marea/products/WATCH-ALERT-DELIVERY-AND-PRIVACY-CONTRACT.md` §17.1; `BLOCKED` — `WATCH_CONNECTIVITY_CONTRACT = NOT_FOUND` (`H-12`), `dataRights = NOT_GRANTED`.
- **Owner.** Procurement and finance with the WATCH service owner.
- **References.** `WATCH-ALERT-DELIVERY-AND-PRIVACY-CONTRACT.md` §17; `BUNDLE-SUBSCRIPTIONS-AND-ENTITLEMENTS.md` (D10).
- **Release readiness.** `dataRights = NOT_GRANTED`; `BLOCKED` on `H-12`.

#### B16 — Commissioning and onboarding
- **Definition.** Onboarding is a guided, verified setup: pre-purchase installation/coverage assessment; power-up provisioning that establishes device identity and binds it to one vessel and one verified owner; vessel registration; ownership proof; declaration of each monitored input and its normal range; first rule and geofence; one end-to-end test notification; a record of what is monitored and what is not; and owner training on what happens in an outage and how to revoke access. For professionally installed configurations the installer completes the sequence and hands over. Manuals, UI and training material are `OPEN`; no UI exists and no screen has been usability-tested.
- **Evidence.** `VERIFIED_REPO docs/marea/products/MAREA-WATCH-COMMERCIAL-SPEC.md` F11; `VERIFIED_REPO docs/marea/products/WATCH-ALERT-DELIVERY-AND-PRIVACY-CONTRACT.md` §17.6; `OPEN` — no onboarding UX (`P-06`); `BLOCKED` — `WATCH_DEVICE_IDENTITY = NOT_FOUND`.
- **Owner.** UX, content and localisation with support engineering.
- **References.** `BUNDLE-CUSTOMER-JOURNEYS.md` (D13); `copy/protect.es.md` / `copy/protect.en.md` §14.
- **Release readiness.** `engineering = NOT_VERIFIED`.

#### B17 — Warranty and support
- **Definition.** Intended after-sales position: the statutory consumer guarantee (when a sale exists) plus a contractual warranty whose duration and conditions are not defined and must be written before sale; support for the device, provisioning, monitored-input interpretation, notification-channel diagnosis, connectivity questions inside the contracted service, update assistance and the fault-return/replacement process. The owner can export a diagnostic record without granting remote control of the vessel. A sale-of-vessel transfer updates the registered owner but does not extend or reset the hardware warranty. Response time, service hours, spares, out-of-warranty repair and the seller's legal identity are `OPEN`/`BLOCKED`. No support statement may imply that support monitors the vessel or guarantees an alert.
- **Evidence.** `VERIFIED_REPO docs/marea/products/MAREA-WATCH-COMMERCIAL-SPEC.md` F19; `VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §2 Class C; `BLOCKED` — `X-02` (legal identity), `H-13` (secure update lifecycle), `X-05`.
- **Owner.** Customer support with legal.
- **References.** `BUNDLE-SUBSCRIPTIONS-AND-ENTITLEMENTS.md` (D10) warranty/isolation rows.
- **Release readiness.** `availability = NOT_FOR_SALE`.

#### B18 — Channel and fulfilment
- **Definition.** Intended route: direct sale by EMBARCARTE plus authorised professional installers, refit yards and marinas, starting in Galicia and northern Portugal. Responsibility split: EMBARCARTE owns the product definition, the monitored-input and compatibility authority, the subscription service, the connectivity relationship, warranty and support policy; the installer owns the vessel and coverage assessment, electrical and bilge work, provisioning, function checks, handover and first-line support, and is accountable for workmanship. Entry is through an assisted coverage/monitored-input assessment ending in a written quotation request, never an automatically asserted compatible order. Installer margin, activation fee and volume terms are `OPEN`; no commission or margin percentage exists.
- **Evidence.** `VERIFIED_REPO docs/marea/products/MAREA-WATCH-COMMERCIAL-SPEC.md` F15; `VERIFIED_REPO docs/marea/WEBSITE-AND-ROADMAP.md` installer programme; `ASSUMPTION` responsibility split; `BLOCKED` — `X-05`, `X-06`, `H-12`.
- **Owner.** Commercial development with service operations.
- **References.** `BUNDLE-INSTALLATION-AND-QUOTATION-MODEL.md` (D12); `PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-02.md` §8.
- **Release readiness.** `availability = NOT_FOR_SALE`.

#### B19 — Price hypothesis and quotation model
- **Definition.** The historical portfolio hypothesis for PROTECT is **EUR 399 plus subscription**; it is `HYPOTHESIS_UNAPPROVED` and **not cost-justified**. Challenge: the only named figures are WATCH Core hardware EUR 299 and the SENSE single-module entry hypothesis "from EUR 99", which is not attributable to a named module. Using two modules at that entry hypothesis symbolically: 299 + 99 + 99 = **497 > 399**. EUR 399 is only arithmetically compatible with 299 + one module 99 = **398**, which contradicts the promised power + bilge composition; it also leaves nothing for cabling, installation, commissioning, warranty accrual or channel margin, and it excludes the required subscription entirely. Verdict: **`HISTORIC_PRICE_NOT_COST_JUSTIFIED`**. The final selling price is `OPEN`; the kit price is `NOT_ESTABLISHED`; the subscription from EUR 9.90/month is a separate hypothesis and does not include SIM/data; connectivity, materials and labour are `NOT_ESTABLISHED`. The commercial model is itemised: hardware + kit + subscription + external connectivity + installation quotation. No figure may be published, summed into a checkout value or used as a "from" offer.
- **Evidence.** `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` bundle table and price/channel rule; `VERIFIED_REPO docs/marea/products/README.md` §17; `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md` §1.4, §3.3, §4.2; `VERIFIED_REPO docs/marea/execution/DECISION-LOG.md` D-020 (sensor counted once), D-023 (price verdicts); `HYPOTHESIS` — all amounts; `BLOCKED` — no BOM, no kit price/cost sheet, no connectivity or labour quote (`X-05`, `H-12`).
- **Owner.** Commercial strategy and pricing with finance.
- **References.** `BUNDLE-PRICING-AND-UNIT-ECONOMICS.md` (D11); `PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-02.md` §6–§9.
- **Release readiness.** `pricing = HYPOTHESIS_UNAPPROVED`; `PUBLICATION_BLOCKED`.

#### B20 — Cost and margin assumptions
- **Definition.** A costing framework with named inputs only, because no figure exists: WATCH device BOM, assembly, factory test, enclosure, labelling and serialisation; SENSE module BOM and calibration cost; conformity programme (EMC/RED/GPSR/RoHS/WEEE/CRA for the WATCH device; relevant assessment for the modules); packaging, freight and fulfilment; payment and subscription-billing fees; warranty accrual; returns/replacement allowance; installer labour and installer margin; customer acquisition; churn; recurring shore service (hosting, telemetry storage, rule evaluation, notification-provider fees, basemap where applicable); connected data cost per device per month including roaming; provider/connectivity minimum commitments; and support load. Contribution margin is deliberately **not** computed: presenting one would invent BOM, connectivity, provider, labour and support data. No supplier quote, kit cost sheet, installer rate or provider price exists.
- **Evidence.** `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` price/channel decision rule; `VERIFIED_REPO docs/marea/products/PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-02.md` §7 (symbolic cost framework); `BLOCKED` — `X-05`, `H-11`, `H-12`, `H-13`.
- **Owner.** Finance and procurement with product management.
- **References.** `BUNDLE-PRICING-AND-UNIT-ECONOMICS.md` (D11).
- **Release readiness.** `pricing = HYPOTHESIS_UNAPPROVED`.

#### B21 — Upgrade and migration
- **Definition.** Intended upgrade paths: Core → Plus only if Plus is validated and costed (never a price uplift by default); kit modules → additional SENSE modules only through a validated input path (`I-27` `CONDITIONAL`); optional HUB for a local dashboard; WATCH device replacement with revocation of the old identity and rebinding to the same vessel; ownership transfer on sale of the vessel. No upgrade may add remote alerts to a SENSE module or a control path of any kind. Upgrades do not replace functional hardware unnecessarily; already-granted entitlements are recognised, not rebilled. Migration from an existing third-party alarm/tracker is a customer decision; no data migration from a third-party system is promised.
- **Evidence.** `VERIFIED_REPO docs/marea/products/PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md` §4.3–§4.4; `VERIFIED_REPO docs/marea/products/MAREA-WATCH-COMMERCIAL-SPEC.md` F21; `VERIFIED_REPO docs/marea/bundles/BUNDLE-ARCHITECTURE.md` §8 rules 6–7; `OPEN` — no upgrade/transfer system.
- **Owner.** Commercial product management.
- **References.** `BUNDLE-CUSTOMER-JOURNEYS.md` (D13) upgrade stage; `BUNDLE-SUBSCRIPTIONS-AND-ENTITLEMENTS.md` (D10).
- **Release readiness.** `availability = NOT_FOR_SALE`.

#### B22 — Customer acceptance criteria
- **Definition.** A customer-facing acceptance definition (to be evidenced by `PROTECT-AC-*` in §11, all `NOT_EXECUTED` today): the owner can state the exact monitored inputs and their removal; sees source, time, freshness and last-known-good for every value and a connectivity-gap record; can distinguish "accepted by the provider", "delivered", "delivery unknown" and "acknowledged by a person"; has received and acknowledged one end-to-end test alert with its distinct timestamps recorded; can revoke access immediately and audit it; can cancel and export their data; and has proof that local monitoring and local alarms continue without a subscription. Acceptance is evidence-based: documentation, unit tests, mock-ups or simulations never constitute it.
- **Evidence.** `VERIFIED_REPO docs/marea/products/MAREA-WATCH-COMMERCIAL-SPEC.md` F24 and §9 (WATCH-AC-01–20, all `NOT_EXECUTED`); `VERIFIED_REPO` §11 of this document; `OPEN` — no device, service or measurement exists.
- **Owner.** Quality assurance with product management; independent verification by a non-author reviewer.
- **References.** `WATCH-ALERT-DELIVERY-AND-PRIVACY-CONTRACT.md` §16; `SENSE-MEASUREMENT-AND-CALIBRATION-PLAN.md`.
- **Release readiness.** `compliance = NOT_STARTED`.

#### B23 — Release readiness and blockers
- **Definition.** Release readiness is dimensioned, never a single flag. At MC-08 PROTECT is `DEFINED` internally and `NOT_FOR_SALE`: `engineering = NOT_VERIFIED`; `hardware = NOT_SELECTED`; `licensing = NOT_CLEARED`; `dataRights = NOT_GRANTED`; `compliance = NOT_STARTED`; `pricing = HYPOTHESIS_UNAPPROVED`; `brandPublication = NOT_GRANTED`; `availability = NOT_FOR_SALE`. Blockers: `P-06` (WATCH ingestion/identity/notification/subscription `NOT_FOUND`); `H-12` (no connectivity contract); `H-11`/`H-05` (no monitoring/module hardware or BOM); `H-06` (no conformity); `H-13` (secure update/CRA); `P-05` (`SENSE_MEASUREMENT_ACCURACY = NOT_MEASURED`, ingress `NOT_VERIFIED`); `H-04` (NMEA 2000 not implemented); `X-01` (brand), `X-02` (seller identity), `X-03` (images), `X-05` (prices/costs), `X-06` (customer/installer evidence), `X-07` (device identity/privacy/DPIA); 0 compatibility rows `SUPPORTED`. No PROTECT SKU may be orderable while these remain open.
- **Evidence.** `VERIFIED_REPO docs/marea/products/README.md` §4, §15; `VERIFIED_REPO docs/marea/products/MAREA-WATCH-COMMERCIAL-SPEC.md` §1.2, §1.4, §10; `VERIFIED_REPO docs/marea/products/MAREA-SENSE-COMMERCIAL-SPEC.md` §1 (canonical SENSE states); `VERIFIED_REPO docs/marea/bundles/BUNDLE-ARCHITECTURE.md` §10; `BLOCKED` as listed.
- **Owner.** Lead (bundle authority) with the Vessel Monitoring and Sensor Specialist.
- **References.** `BUNDLE-CONFIGURATION-RULES.md` (D9); `PUBLICATION_BLOCKED` outcome in §9.
- **Release readiness.** `availability = NOT_FOR_SALE`.

#### B24 — ES/EN content and visual references
- **Definition.** Customer-facing Spanish and English copy lives in `docs/marea/bundles/copy/protect.es.md` and `docs/marea/bundles/copy/protect.en.md`, exactly 24 numbered sections plus the unnumbered approved-disclaimers section and the internal status line. The copy states the hardware/subscription split, the dependence on power, coverage and provider delivery, the notification conditions (accepted ≠ delivered ≠ acknowledged), the privacy model, the Core/Plus boundary, the kit composition and the WATCH limitation statement verbatim, with the navigation disclaimer and brand attribution. It contains no price, no purchase CTA, no stock or availability statement, no theft-prevention, rescue, distress, remote-control or certification claim, and no AIS content. Visual references are the ten planned PROTECT assets in `BUNDLE-ASSET-REQUIREMENTS.md` (D16): `PROTECT-HERO-01` … `PROTECT-TEC-10`, of which four are `BLOCKED_ON_IMAGE_GENERATION`, five reuse MC-04 internal vectors/briefs as `CONCEPT` and one is an authored specification; zero are produced and zero are publicly approved.
- **Evidence.** `VERIFIED_REPO docs/marea/bundles/copy/protect.es.md`, `copy/protect.en.md`; `VERIFIED_REPO docs/marea/bundles/BUNDLE-ASSET-REQUIREMENTS.md`; `VERIFIED_REPO docs/marea/execution/DECISION-LOG.md` D-024 (bundle asset identity); `VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §9; `VERIFIED_REPO docs/marea/products/README.md` §16 rules 8–10, §22; `BLOCKED` — `X-01`, `X-03`, claims-register approval pending (`D-010`).
- **Owner.** UX, content and localisation with product review (facts) and claims review.
- **References.** `copy/protect.es.md`; `copy/protect.en.md`; `BUNDLE-ASSET-REQUIREMENTS.md` (D16); `MAREA-WATCH-COMMERCIAL-SPEC.md` §12; SENSE limitation wording in `docs/marea/products/README.md` §16 rule 8.
- **Release readiness.** `brandPublication = NOT_GRANTED`; `PUBLICATION_BLOCKED`.

---

## 13. Status statement and non-assertions

**Status of this deliverable.** `INTERNAL`, `COMPLETE_TARGET_SPECIFICATION` (bundle definition), `NOT_FOR_SALE`,
`NOT_PUBLISHED`. It defines a finished commercial bundle and the evidence that would prove it; it does not make
MAREA PROTECT orderable, priced, compatible, available, certified, installable through an existing installer network
or publishable.

**This document does not assert, and must not be read as asserting:** any approved bundle, hardware or subscription
price; the cost-justification of EUR 399; any stock, lead time or availability; any CE marking, declaration of
conformity, EMC/RED/LVD/GPSR/RoHS/WEEE/CRA assessment; any telecom, SIM, roaming, MVNO or coverage agreement; any
notification-provider agreement, delivery measurement, delivery-time guarantee or delivery-rate figure; any device
identity, provisioning, ownership-transfer or revocation system; any subscription, billing or entitlement service;
any SENSE measurement accuracy, resolution, ingress rating or certified alarm; any theft-prevention, security,
rescue, distress, SOLAS or GMDSS capability; any remote switching, helm, steering, throttle or engine control; any
vessel, bench or sea-trial result; any certification, insurance acceptance, customer count, review or testimonial;
any trademark clearance; any supplier quote, BOM, margin or approved price; and any image asset — all PROTECT visuals
remain planned, `BLOCKED_ON_IMAGE_GENERATION` or `CONCEPT`, never real-product evidence.

**Related MC-08 documents:** `BUNDLE-ARCHITECTURE.md` (D1); the six bundle specifications (D2–D7);
`BUNDLE-COMPOSITION-AND-EXCLUSIONS.md` (D8); `BUNDLE-CONFIGURATION-RULES.md` (D9);
`BUNDLE-SUBSCRIPTIONS-AND-ENTITLEMENTS.md` (D10); `BUNDLE-PRICING-AND-UNIT-ECONOMICS.md` (D11);
`BUNDLE-INSTALLATION-AND-QUOTATION-MODEL.md` (D12); `BUNDLE-CUSTOMER-JOURNEYS.md` (D13);
`BUNDLE-CUSTOMER-COMPARISON.md` (D14); `copy/protect.es.md` and `copy/protect.en.md` (D15);
`BUNDLE-ASSET-REQUIREMENTS.md` (D16); `bundle-definitions.json` (D17); `scripts/check-marea-bundles.mjs` (D18).
