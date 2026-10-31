# MAREA — Bundle customer journeys (MC-08 / D13)

| Field | Value |
| --- | --- |
| Document ID | MC-08 / D13 / BUNDLE-CUSTOMER-JOURNEYS |
| Milestone | MC-08 (Master Prompt 08/36) |
| Deliverable | D13 — six complete 17-stage customer journeys and the mandatory cross-sell journeys |
| Owner | Lead (Chief Commercial Product Officer) |
| Status | INTERNAL. Journey designs only. None of the flows, pages, checkout, payment, installation or support operations described here exists |
| Lifecycle | All six bundles `DEFINED` internally; all `NOT_FOR_SALE`; `INTERNAL_ONLY` |
| Price status | `HYPOTHESIS_UNAPPROVED` / `NOT ESTABLISHED`; no journey step exposes a purchasable price |
| Brand / source IP | `NOT_GRANTED` / `NOT_CLEARED` |
| Base | MC-07 HEAD `80c66c70a1bab6f11c5ba5709baa4c1671f1d6da` |
| Branch | `feature/marea-mc08-bundles-commercial-architecture` |
| Date | 2026-10-30 |
| Write scope | This file only |
| Is not | A live funnel, a website flow, a quotation, a contract, an order, a warranty or a support commitment |

A journey here is a **design requirement for a future milestone**, not evidence that a flow exists. Every
"expected outcome" is intended end-state behaviour; every "future acceptance test" names the evidence that
would prove it. No journey enables a purchase CTA, exposes a price, promises an availability date or
describes a store, portal or installer network that does not exist.

---

## 1. The 17-stage model (reconciled, binding for MC-08)

The established journey model of `docs/marea/products/README.md` §22 is canonical. The MC-08 prompt uses
equivalent labels; the mapping is recorded as decision D-024 so no second journey model is created.

| # | Canonical stage (README §22) | MC-08 brief label (mapped) |
| --- | --- | --- |
| 1 | Discovery | Discovery |
| 2 | Product understanding | Product understanding |
| 3 | Compatibility | Eligibility |
| 4 | Editions | Configuration |
| 5 | Price comprehension | Price or quotation |
| 6 | Purchase or quote | Purchase intent |
| 7 | Fulfilment | Order / contract |
| 8 | Installation | Delivery / installation |
| 9 | Activation | Activation |
| 10 | First use | First use |
| 11 | Regular use | Regular use |
| 12 | Updates | Updates |
| 13 | Support | Support |
| 14 | Upgrade | Expansion |
| 15 | Renewal or cancellation | Renewal / cancellation |
| 16 | Ownership transfer | Transfer |
| 17 | End-of-life | End-of-life |

Every stage records ten columns: **Stage | Customer action | Touchpoint | Expected outcome | Preconditions |
Failure / recovery | Required commercial data | Technical evidence | Trust / legal status | Future acceptance
test.** The "Required commercial data" column names what a future commerce system must hold, not data
collected today. No customer data is processed in MC-08.

### 1.1 Global preconditions for all six journeys

- MAREA is a **proposed** brand: `TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED`. No journey may present it as
  registered or cleared.
- All bundles `NOT_FOR_SALE`; no price approved; no stock; no lead time; no certification.
- Compatibility is per device/firmware/direction; **0 rows are tested**. Any "works with" statement is
  prohibited until a recorded device test exists.
- No public CTA is activated. Future CTA intentions only: verify compatibility, request a vessel survey,
  request a professional quotation, explore configuration, ask about installation.
- Installation and quotation flows do not exist; no installer network is established.
- Subscription expiry never disables local steering, valid local measurement, local alarms or safety
  fallback (design requirement).

---

## 2. MAREA START — journey

Reference configuration: `HUB-STANDARD` + `NAV-PRO`; `NAV-ESSENTIAL` is a documented lower-cost variant.

| Stage | Customer action | Touchpoint | Expected outcome | Preconditions | Failure / recovery | Required commercial data | Technical evidence | Trust / legal status | Future acceptance test |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 Discovery | Owner searches for a way to bring an older boat's data into modern navigation | Future solution page / installer conversation; no page exists | Customer understands START connects existing equipment instead of replacing it | Brand disclosure and non-public state respected | If no page exists, enquiry routed to manual assessment only after publication authorisation | Audience segment, vessel type, source of enquiry | None | INTERNAL_ONLY; no claim published | Signed-off discovery content in a later authorized milestone |
| 2 Product understanding | Reads what HUB and NAV each do and do not do | Future bundle page + NAV/HUB product pages | Customer can repeat the composition and exclusions | Products `DEFINED`; pages not built | Misunderstanding HUB-as-navigation or NAV-includes-HUB; correct with explicit exclusions | Bundle id, edition ids, exclusions | Dossier F07/F09 definitions | No availability claim | Comprehension test with real users; copy accuracy review |
| 3 Compatibility (eligibility) | Lists existing instruments, network, power, device and internet situation | Questionnaire (future) + installer assessment | Deterministic outcome: assessment required, not a promise | Questionnaire design and human technical assessment available | Unknown device → specialist assessment; incompatible → NOT_ELIGIBLE for the promised outcome | Vessel profile, equipment inventory, firmware where known | 0 tested rows (A-02, B-03, B-08 `UNKNOWN`) | No compatibility claim | Recorded assessment procedure + device/firmware tests |
| 4 Editions (configuration) | Chooses NAV Pro reference or documented Essential variant; HUB Standard or Pro | Configurator (future) / installer | Customer sees exactly which edition delivers live instrument overlays and which does not | Edition authority D-007; no edition renamed | Customer expects Pro automatically; show outcome difference and price status | Selected editions, quantities, dependencies | Capability register N10/N23 | No price approval | Configurator rule tests (MC-24) |
| 5 Price comprehension | Requests pricing information | Future quotation request; no price displayed | Customer receives a labelled hypothesis or a quote-required outcome, never a purchasable figure | Pricing not approved; installed price not established | Customer assumes EUR 499 is an installed price; correct explicitly | Price status, VAT basis, list of excluded items | Component hypothesis sum 149+349=498 | `HYPOTHESIS_UNAPPROVED`; no offer | Price-disclosure review; label checks in validator |
| 6 Purchase or quote | Requests a professional quotation or pre-registration expression of interest | Future enquiry form; no enabled buy action | A quotation request is recorded; nothing is ordered | Human authorised process; legal seller identity X-02 | No purchase path → explain and capture interest only | Enquiry record, consent, vessel data | — | No checkout; no order | Legal/seller identity and quotation process evidence |
| 7 Fulfilment (order/contract) | Accepts an itemised quotation and contract terms (future) | Human-issued quotation/contract; no system exists | Customer knows equipment, accessories, labour, subscription and taxes separately | Approved prices, stock, seller identity, terms | Price/stock change or cancellation; documented recovery | Contract, VAT, payment milestones, cancellation rights | BOM/cost evidence (none) | No contract issued in MC-08 | Signed contract process + consumer-law review |
| 8 Installation (delivery/installation) | Books compatibility assessment and installation | Installer-assisted service (future) | HUB installed/commissioned, NAV account and chart licence activated, handover record | Verified compatibility envelope; installer competence | Device not compatible; refit changes scope; survey recovery | Work order, labour, accessories, installation record | Installation procedure + commissioning checklist | Insurance/liability/warranty terms OPEN | Recorded installation and handover evidence |
| 9 Activation | Logs in, licenses charts, pairs HUB/NAV | App/account and HUB local interface | Account and entitlement active; local data path selected | Chart licence purchased; device compatible | Activation fails; fallback support path and manual configuration | Entitlement ledger, chart region, device id | Entitlement implementation (not built) | Data-processing notice | Activation test with real account |
| 10 First use | Opens navigation and sees own data | NAV app + HUB dashboard | Customer sees position, charts, logged data and (Pro) live instrument overlays | Compatible data source; GNSS fix | Missing/stale data shown honestly, never fabricated | Supported-device list | A-02/B-08 tests (none) | Navigation disclaimer shown | Recorded first-use acceptance test |
| 11 Regular use | Plans passages, monitors instruments, logs trips | Same surfaces | Reliable local operation without internet; honouring degraded states | Local-first design | Internet loss or HUB offline → local data continues, state visible | Entitlement renewal date | Offline/degraded-state tests (future) | No availability/SLA claim | Field observation + failure-state test |
| 12 Updates | Receives app/HUB firmware updates | Update channel (future) | Safe update with rollback and visible version | Secure update process H-13 | Update failure → recovery/rollback; no bricking | Installed versions | CRA/secure-update plan (not built) | Security obligation | Update/rollback process evidence |
| 13 Support | Reports issue or asks a question | Support channel (future) | Issue triaged; compatibility question handled as assessment | Support process, RMA and warranty terms OPEN | No process yet → record enquiry; no fabricated SLA | Ticket, device ids, entitlement state | Support model OPEN | Warranty terms OPEN | Documented support/RMA workflow |
| 14 Upgrade (expansion) | Adds AIS, DISPLAY or Pro only where genuinely missing | Future upgrade path | Customer keeps valid entitlements; no duplicate charge; no unnecessary hardware replacement | Selected upgrade adds capability not already present | Customer already has entitlement → recognise it, no rebill | Entitlement ledger, installed hardware | Compatibility assessment | No forced-sale practice | Upgrade/double-billing test |
| 15 Renewal / cancellation | Renews NAV or cancels | Account/billing (future) | Renewal or cancellation honoured; own route/log export preserved; local HUB functions unaffected | Entitlement service and export (not built) | Payment failure → grace/state shown; local data continues | Renewal date, cancellation reason, export request | Entitlement service (not built) | Consumer-law refund rules OPEN | Renewal/cancellation/export test |
| 16 Ownership transfer | Sells the vessel and transfers HUB/NAV account | Account transfer flow (future) | Device/account ownership transferred cleanly; old owner access revoked | Device identity and proof of ownership | Disputed ownership → support escalation | Transfer record, device identity | HUB ownership transfer design (not built) | Data-protection and revocation review | Ownership-transfer test |
| 17 End-of-life | Stops using product; disposes of hardware | Account closure / WEEE information (future) | Data export offered; account closed; hardware disposal guidance | Export window and deletion policy | Missing export → support recovery | Deletion/export record | End-of-life process (not built) | Data-retention policy OPEN | Export/delete/WEEE evidence |

---

## 3. MAREA CRUISE — journey

Reference configuration: `NAV-ESSENTIAL` + `HUB-STANDARD` + `AIS-RECEIVER` + `DISPLAY-7`.

| Stage | Customer action | Touchpoint | Expected outcome | Preconditions | Failure / recovery | Required commercial data | Technical evidence | Trust / legal status | Future acceptance test |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 Discovery | Cruiser wants one helm screen with charts and traffic | Future solution page / boat show / installer | Customer understands this is an installed cruising solution, not a box of gadgets | Internal-only content rules | No page → manual qualification only | Enquiry source, vessel type | None | No published claim | Authorised discovery content |
| 2 Product understanding | Distinguishes NAV, DISPLAY, AIS and HUB roles | Future page + four product pages | Customer can state which component provides what | AIS receive-only rule; DISPLAY is a device | Conflates DISPLAY with NAV or AIS with transponder; explicit corrections | Bundle/edition ids, exclusions | Dossiers F07/F09; AIS disclaimer | AIS not a transponder | Comprehension test |
| 3 Compatibility (eligibility) | Provides equipment, antenna location, power, helm space, network | Questionnaire + physical assessment | Outcome: assessment required with named antenna/mounting dependencies | Installer assessment; no tested row | Antenna route impossible → NOT_ELIGIBLE for promised outcome | Vessel profile, equipment, mount/antenna constraints | A-04/B-07/C-01/N-01–N-03 statuses | No compatibility claim | Recorded assessment + device tests |
| 4 Editions (configuration) | Chooses reference configuration; Pro or AIS Connected only if justified | Configurator/installer | Conditional and ineligible editions are visibly unavailable | D-012; AIS Connected `NOT_YET_JUSTIFIED` | Customer expects AIS Connected or Large display; explicit NOT selectable | Selected editions, external items | Edition verdicts | No availability claim | Rule tests |
| 5 Price comprehension | Asks what the solution costs installed | Future quotation request | Customer sees product-only hypothesis vs installed quotation; accessories/installation itemised | Price unapproved; installed price not established | Assumes EUR 1,399 is installed; correct explicitly | Price status, excluded accessories/labour | Sum 99+349+249+699=1,396 product-only | `HYPOTHESIS_UNAPPROVED` | Price-label review |
| 6 Purchase or quote | Requests professional quotation | Future enquiry | Itemised quote request recorded, nothing ordered | Human quotation process | No checkout → capture interest | Enquiry, consent | — | No order | Quotation process evidence |
| 7 Fulfilment | Accepts quote and work schedule | Human contract | Equipment, antenna, mounts, labour, subscriptions separated | Prices/stock/terms approved | Schedule/stock change recovery | Contract, VAT, milestones | BOM absent | No contract in MC-08 | Contract process + consumer law |
| 8 Installation | Installs AIS antenna/splitter, DISPLAY mount, HUB, cabling | Professional installer | System installed, commissioned and handed over with record | Verified compatibility, competent installer | Antenna/RF or mounting failure → remediation path | Work order, accessories, commissioning record | Installation and RF procedures (future) | Liability/warranty terms OPEN | Installation and handover evidence |
| 9 Activation | Licenses charts, activates NAV, pairs AIS/HUB/DISPLAY | Account + local interfaces | Entitlements active; target list visible; own-vessel data available | Chart licence, GNSS | Partial activation → staged recovery; no fake data | Entitlement ledger, devices | Entitlement integration (not built) | Data notices | Activation test |
| 10 First use | Confirms charts, traffic, display readability | Helm | Customer sees licensed charts, received targets and instrument data as available | Installed and configured | Stale/missing AIS shown honestly; legibility unverified | Supported configurations | N-01–N-03 tests (none) | AIS and navigation disclaimers | First-use acceptance test |
| 11 Regular use | Cruises, reads targets, uses display day/night | Helm | Stable local operation; target age and data validity visible | Local-first design | Loss of GNSS/AIS/display → degraded state shown; not collision avoidance | Entitlement renewal | Degraded-state tests (future) | No collision-avoidance claim | Failure-state test |
| 12 Updates | Updates DISPLAY/HUB/NAV | Update channel (future) | Safe update, rollback, visible versions | Secure update process H-13 | Failed update → rollback recovery | Versions | Update plan | CRA obligation | Update/rollback evidence |
| 13 Support | Reports installation or data issue | Support channel | Triage; AIS/RF or compatibility issue routed to installer | Support/RMA OPEN | No process → log; no invented SLA | Ticket, device ids | — | Warranty OPEN | Support workflow |
| 14 Upgrade (expansion) | Adds NAV Pro, WEATHER, AIS Connected if later justified | Future upgrade path | Added capability without duplicate entitlement or unnecessary replacement | Evidence for conditional edition | Customer already entitled → recognise, no rebill | Entitlement ledger | Compatibility assessment | No forced sale | Upgrade/double-billing test |
| 15 Renewal / cancellation | Renews NAV/WEATHER; cancels | Account/billing (future) | Renewal or cancellation; local HUB/DISPLAY functions unaffected; charts become unavailable honestly | Entitlement/export service | Expiry → unavailable state not fabricated charts | Renewal/cancellation, export | Entitlement service (not built) | Consumer-law review OPEN | Renewal/expiry test |
| 16 Ownership transfer | Sells vessel with installed system | Transfer flow (future) | Hardware remains with vessel; account/device ownership transfers; old access revoked | Device identity, proof of ownership | Dispute → escalation | Transfer record | Transfer design (not built) | Privacy/revocation review | Transfer test |
| 17 End-of-life | Removes/disposes equipment; closes account | Account closure + disposal guidance | Data export, account closure, hardware removal guidance | Export/deletion policy | Missing export → recovery | Deletion record | Process not built | Retention policy OPEN | Export/delete evidence |

---

## 4. MAREA SAIL — journey (quotation-based, safety-gated)

Reference configuration: `NAV-PRO` + `HUB-STANDARD` + `PILOT-COASTAL` (quoted) + `SENSE-WIND`. Status:
`BLOCKED`; `FULL_BUNDLE_PRICE_NOT_ESTABLISHED`; `VESSEL_SURVEY_REQUIRED`;
`INSTALLER_QUOTATION_REQUIRED`; `PILOT_SAFETY_GATE_BLOCKED`.

| Stage | Customer action | Touchpoint | Expected outcome | Preconditions | Failure / recovery | Required commercial data | Technical evidence | Trust / legal status | Future acceptance test |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 Discovery | Sailor wants an integrated helm and supervised steering | Future solution page / rigger / installer | Customer understands SAIL is a surveyed, professionally installed solution, not a product box | No autonomy/remote-steering claim | No page → manual qualification only | Enquiry, vessel type, sailing profile | None | INTERNAL_ONLY; PILOT disclaimer | Authorised discovery content |
| 2 Product understanding | Learns PILOT is supervised, not autonomous; NAV/HUB give context not authority | Future page + PILOT dossier | Customer can state supervision, manual takeover and local-only control | PILOT definition; safety case outline | Customer expects unattended/remote steering; correct firmly | Bundle id, edition ids, exclusions | Safety-case outline; I-01/I-02 | PILOT not autonomous | Comprehension test |
| 3 Compatibility (eligibility) | Completes vessel and steering survey inputs | Survey form + physical inspection | Deterministic outcome: SPECIALIST_SURVEY_REQUIRED; not a certification | Qualified surveyor/installer | Incompatible or unsafe drive → NOT_ELIGIBLE; no sales pressure | Vessel data, steering system, drive type, feedback, loads | H-01/H-03/H-10 `NOT_FOUND`/`BLOCKED` | Safety boundary; no remote path | Documented survey procedure and eligibility rules |
| 4 Editions (configuration) | Discusses Coastal/Sail/Pro scope with installer | Installer-led configuration | Coastal quoted; Sail conditional; Pro quoted service scope only | D-008; H-01 unverified | Customer expects Sail wind mode or Pro SKU; explicit correction | Configuration record, selected scope | Edition verdicts | No SNEAKY SKU | Configuration rule tests |
| 5 Price comprehension | Requests an inclusive quotation | Human quotation process | Itemised equipment, actuator/drive, feedback, cabling, E-stop, labour, commissioning, sea trial, training, conformity, warranty; no fixed package price | Survey complete; legal/operational permission | No quote possible → explain and stop; historical EUR 1,990 explicitly not a valid price | Quote line items, VAT, exclusions | No BOM/cost evidence | `FULL_BUNDLE_PRICE_NOT_ESTABLISHED` | Quote-template review |
| 6 Purchase or quote | Decides whether to proceed to a quotation/contract | Human process | Customer proceeds only with a complete, reviewed quotation; nothing is ordered via checkout | Approved process, safety prerequisites | Quote withdrawn if vessel not eligible | Quote/contract version | — | No fixed-price checkout | Legal review of quotation process |
| 7 Fulfilment (order/contract) | Signs contract and schedules installation | Human contract | Scope, safety responsibilities, payment milestones and exclusions explicit | Contract review; insurance/liability terms | Scope change → re-quote; cancellation terms | Contract, milestones | — | No contract in MC-08 | Contract and milestone process evidence |
| 8 Installation | Professional installation and commissioning | Installer/shipyard | Steering system installed with independent safeguards, E-stop, feedback, commissioning record | Safety gate closure; competent installer; supervised sea trial plan | Unsafe result → installation refused/stopped; no sale | Work order, commissioning record, sea-trial plan | PILOT safety evidence `BLOCKED` | Safety-critical; no remote steering | Independent commissioning and sea-trial evidence |
| 9 Activation | System configures wind mode only if qualified; owner training | Local control head + training | Modes available only within validated envelope; manual takeover always available | Verified configuration; wind qualification if claimed | Wind mode fails qualification → unavailable; manual steering unaffected | Configuration record, training record | H-01 evidence (none) | No unverified wind-steering claim | Recorded wind-mode trial and training sign-off |
| 10 First use | Supervised sea trial with handover | Onboard trial | Owner demonstrates manual takeover, supervision and safe use | Commissioning passed; supervision | Any safety concern → stop, remediate | Trial record | Sea trials `NOT_PERFORMED` | Operator responsibility stated | Supervised trial record |
| 11 Regular use | Uses supervised steering with watchkeeping | Helm | Assisted steering within documented envelope; manual takeover immediate | Watchkeeping; no autonomy | Degraded state → manual control; no remote fallback | Service plan | Continued local safety isolation | No unattended navigation | Field safety/observation plan |
| 12 Updates | Updates PILOT software | Controlled service channel | Updated only with documented safety review; local safety behaviour never disabled | Secure update and change control | Update rejected/rolled back if safety case not met | Version inventory | Update safety process (not built) | CRA/conformity | Update and change-control evidence |
| 13 Support | Reports steering behaviour issue | Specialist support | Immediate triage, possible safe-mode guidance and onsite service | Safety-aware support process | Ambiguous issue → advise manual control; escalate | Ticket, logs | Support process OPEN | Safety escalation | Support/incident process evidence |
| 14 Upgrade (expansion) | Considers Sail wind mode, sails instrumentation, route context | Survey-led upgrade | Upgrade only after evidence; no remote control; no unnecessary replacement | H-01 closure; quote | Not eligible → decline honestly | Upgrade quote | — | No autonomy claim | Upgrade eligibility test |
| 15 Renewal / cancellation | There is no steering subscription to renew | — | Local steering and safety behaviour are never gated by a commercial entitlement | Design requirement | If a future service exists, expiry leaves steering/safety intact | None | Integration isolation (design) | Consumer protection | Subscription-isolation test |
| 16 Ownership transfer | Sells vessel with installed PILOT | Survey + service transfer | New owner receives documented configuration, training and safety limits | Transfer inspection; configuration record | Unqualified new owner → retraining required | Transfer record | — | Safety responsibility | Transfer and retraining process |
| 17 End-of-life | Decommissions steering system | Specialist removal/disposal | System safely removed/deactivated; documentation retained | Safe decommissioning procedure | Unsafe removal → blocked until competent service | Decommission record | — | Safety/liability | Decommissioning procedure evidence |

---

## 5. MAREA PROTECT — journey

Reference configuration: `WATCH-CORE` + `SENSE-ESSENTIALS` (expands to `SENSE-POWER` + `SENSE-BILGE`).
Price verdict: `HISTORIC_PRICE_NOT_COST_JUSTIFIED`; final price OPEN.

| Stage | Customer action | Touchpoint | Expected outcome | Preconditions | Failure / recovery | Required commercial data | Technical evidence | Trust / legal status | Future acceptance test |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 Discovery | Absent owner worries about bilge and battery | Future solution page / marina / installer | Customer understands PROTECT is a monitored solution with conditional alerting, not a security guarantee | No guarantee/instant-alert claim | No page → manual qualification | Enquiry, vessel, berth type | None | No certified distress claim | Authorised discovery content |
| 2 Product understanding | Distinguishes WATCH device/service, sensors, SIM/data and subscription | Future page + WATCH/SENSE pages | Customer can list exactly what hardware, sensors, connectivity and subscription they receive | WATCH service `NOT_FOUND` disclosed | Customer assumes WATCH includes all sensors; explicit correction | Bundle id, kit expansion, subscription | Dossiers F07/F09/F12 | No theft-prevention claim | Comprehension test |
| 3 Compatibility (eligibility) | Provides berth coverage, power, sensor points, mounting | Questionnaire + site check | Outcome: assessment required; named coverage/installation risks | No tested row | No coverage/power → NOT_ELIGIBLE for promised outcome; propose alternative honestly | Coverage check, power, mounting | H-12 connectivity `NOT_FOUND` | No permanent-connectivity claim | Coverage/installation assessment evidence |
| 4 Editions (configuration) | Chooses Core; Plus not offered unless validated | Configurator/installer | Customer sees one kit line (power+bilge) and is not double-counted; Plus unavailable | D-008; CF-03 | Customer wants loose modules plus kit → reject duplicate, explain | Selected lines, subscription | Kit composition authority | No unvalidated edition | Rule tests |
| 5 Price comprehension | Asks for price and monthly subscription | Future quotation request | Customer sees hardware, kit, SIM/data, installation and subscription separately; no EUR 399 promise | Price not established | Assumes 399 covers everything; correct explicitly; final price OPEN | Price status, subscription hypothesis | Component floor 299+198=497 | `HISTORIC_PRICE_NOT_COST_JUSTIFIED` | Price-label review |
| 6 Purchase or quote | Requests installation/activation quotation | Future enquiry | Request recorded; nothing ordered | Human process | No checkout → interest only | Enquiry, consent | — | No order | Quotation process evidence |
| 7 Fulfilment | Accepts quote, data plan and subscription terms | Human contract + provider terms | Hardware, installation, data plan, subscription, exclusions explicit | Terms, SIM/provider contract | Coverage/provider change → re-quote/cancel per terms | Contract, provider terms, VAT | Connectivity contract absent | Data-plan terms | Contract/provider process evidence |
| 8 Installation | Installs WATCH and sensors, commissions account | Installer-assisted | Device registered, sensors calibrated, notification recipients configured | Installation assessment, connectivity | Sensor or registration failure → remediation; local alarms unaffected | Commissioning record, device identity | P-06 `NOT_FOUND` | Device identity/revocation | Installation and commission evidence |
| 9 Activation | Creates account, confirms recipients, tests alert path | App + provider | Account active; alert path tested with honest delivery state | Subscription active; connectivity | Delivery not confirmed → show DELIVERY_UNKNOWN, not success | Recipients, consent, retention | Pipeline `NOT_FOUND` | Privacy consent | End-to-end alert test |
| 10 First use | Checks live readings and a test event | App | Customer sees readings with units/source/freshness and alert states | Calibrated sensors | Stale reading → shown invalid/stale, not current | Entitlement, device ids | SENSE accuracy `NOT_MEASURED` | Measurement-validity statement | First-use acceptance test |
| 11 Regular use | Monitors ashore; receives alerts | App/notifications | Alerts with honest state; no guaranteed immediacy; local alarms independent | Power/coverage/provider | Offline/queued/unknown states explained; no false certainty | Retention settings | Notification state model | Not a distress service | Failure-scenario tests (offline/stale/queued/accepted/unknown/ack) |
| 12 Updates | Updates device/app; sensors recalibrated | Update + service | Safe update; calibration state preserved | Secure update; calibration procedure | Failed update → rollback; invalid readings shown | Version/calibration records | Update plan | CRA obligation | Update/calibration evidence |
| 13 Support | Reports false/missing alert or sensor issue | Support | Triage with alert-state evidence; sensor/connection diagnosis | Support/RMA OPEN | No process → log; no SLA promise | Ticket, event ids | — | Warranty OPEN | Support workflow evidence |
| 14 Upgrade (expansion) | Adds tanks/environment monitoring | Future upgrade | Additional modules with explicit installation and no double count | Validated modules/inputs | Not supported → decline; no generic-sensor claim | Upgrade composition | I-27 `CONDITIONAL` | No generic compatibility | Upgrade rule tests |
| 15 Renewal / cancellation | Renews/cancels monitoring subscription | Account/billing (future) | Renewal or cancellation; remote alerts stop, local measurement/alarms continue | Entitlement service | Payment failure → remote stops; local safety unaffected | Renewal/cancellation, data plan | Isolation design (not tested) | Consumer protection | Subscription-isolation test |
| 16 Ownership transfer | Sells vessel with WATCH/sensors | Transfer flow (future) | Device ownership and subscription transfer; old access revoked | Device identity | Dispute → escalation; data retention rules | Transfer record | Device identity `NOT_FOUND` | Privacy/revocation | Transfer test |
| 17 End-of-life | Removes device/sensors; closes account | Account closure + disposal | Data export/deletion; hardware removal guidance; local alarms no longer monitored | Export policy | Missing export → recovery | Deletion record | Process not built | Retention policy OPEN | Export/delete evidence |

---

## 6. MAREA COMPLETE — journey (vessel-specific quotation, multiple subsystem gates)

Reference configuration: `NAV-PRO` + `HUB-PRO` + `DISPLAY-7` + `WATCH-CORE` + four SENSE modules +
`PILOT-COASTAL` (quoted). Status: `BLOCKED`; `FIXED_TURNKEY_PRICE = NOT_ESTABLISHED`.

| Stage | Customer action | Touchpoint | Expected outcome | Preconditions | Failure / recovery | Required commercial data | Technical evidence | Trust / legal status | Future acceptance test |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 Discovery | Owner/refit customer wants one coordinated boat system | Future solution page / yard / broker | Customer understands COMPLETE is an integrated project with separate subsystem gates, not "everything in a box" | Premium ≠ unlimited | No page → manual qualification | Enquiry, vessel, refit scope | None | INTERNAL_ONLY | Authorised discovery content |
| 2 Product understanding | Learns which domains are included and which are optional | Future page + domain pages | Customer can distinguish navigation, instruments, monitoring, display and supervised steering, and optional AIS/WEATHER | Product dossier distinctions | Conflates DISPLAY/NAV, WATCH/FLEET or COMPLETE with autonomy; correct | Bundle id, editions, exclusions | Dossiers; nine distinctions D-015 | No autonomy/remote control | Comprehension test |
| 3 Compatibility (eligibility) | Provides full vessel survey | Survey + inspection | Outcome: SPECIALIST_SURVEY_REQUIRED; each subsystem assessed separately | Qualified survey; safety prerequisites | Any failed safety prerequisite → configuration blocked; no sale | Complete vessel/equipment inventory | H-01/H-05/H-11/P-06 blocks | Safety and privacy boundaries | Documented survey and eligibility rules |
| 4 Editions (configuration) | Agrees reference editions and optional modules with integrator | Integrator-led configuration | Coherent architecture with no duplicate sensors, no ineligible display size, no priced PILOT-Pro | D-008/D-012; CF rules | Customer requests Large display or PILOT-Pro SKU → decline, explain | Configuration record | Edition verdicts | No SNEAKY SKU | Rule tests |
| 5 Price comprehension | Requests an inclusive project quotation | Human quotation process | Itemised hardware, survey, vessel-specific components, labour, commissioning, training, support/maintenance, subscriptions; no EUR 3,490 turnkey | Survey complete; legal/operational permission | No quote possible → stop honestly; historical 3,490 not a price | Quote lines, VAT, exclusions | Component floor 3,332 before labour | `FIXED_TURNKEY_PRICE = NOT_ESTABLISHED` | Quote-template review |
| 6 Purchase or quote | Decides whether to proceed | Human process | Only a complete reviewed quotation proceeds; no checkout | Safety prerequisites | Withdraw if any subsystem ineligible | Quote/contract | — | No fixed turnkey | Legal review |
| 7 Fulfilment (order/contract) | Signs project contract with milestones | Human contract | Scope, subsystem acceptance, safety responsibilities, payment milestones explicit | Contract/insurance review | Scope change → re-quote | Contract, milestones | — | No contract in MC-08 | Contract process evidence |
| 8 Installation (delivery/installation) | Multi-system professional installation | Integrator/yard | Systems installed and commissioned per subsystem, with records | All subsystem prerequisites | One subsystem fails → project cannot be handed over as COMPLETE | Work orders, records | All subsystem evidence BLOCKED/NOT_FOUND | Safety-critical | Per-subsystem commissioning evidence |
| 9 Activation | Activates NAV/WEATHER/WATCH accounts and pairs devices | Accounts + local interfaces | Entitlements active; one ledger; no double billing | Subscriptions/connectivity | Partial activation → staged recovery; no fabricated data | Entitlement ledger | Entitlement service not built | Data notices | Activation/double-billing test |
| 10 First use | Owner handover and training | Onboard + app | Owner can use each subsystem, knows limitations and emergency/manual procedures | Commissioning passed; training | Owner not competent → more training; no handover | Training record | Training process | Operator responsibility | Handover/training sign-off |
| 11 Regular use | Uses navigation, instruments, monitoring and supervised steering | Boat + app | Coherent operation; each subsystem's degraded state visible; no safety guarantee | Watchkeeping; subscriptions active | Any subsystem offline → honest state; local safety functions continue | Service plan | Isolation design | No combined certification | Field acceptance plan |
| 12 Updates | Coordinated firmware/app updates | Service channel | Updates coordinated, rollback available, safety behaviour preserved | Change control | Failed update → rollback; manual control available | Version inventory | Update plan | CRA/conformity | Update evidence |
| 13 Support | Reports issue across subsystems | Specialist support | Triage to correct subsystem; no combined diagnosis invented | Support/RMA plan | No process → log; escalate safety issues | Ticket, logs | — | Warranty OPEN | Support workflow evidence |
| 14 Upgrade (expansion) | Adds AIS, WEATHER, wind, future capabilities | Survey-led upgrade | Upgrade only where defined and supported; no unlimited future upgrades; no unnecessary replacement | Evidence/quote | Not eligible → decline | Upgrade quote | — | No unlimited-upgrade claim | Upgrade rule tests |
| 15 Renewal / cancellation | Renews NAV/WEATHER/WATCH; cancels some | Account/billing (future) | Renewal/cancellation per entitlement; local safety functions unaffected | Entitlement service/export | Expiry → honest unavailable data; steering/local sensing unaffected | Renewal/cancellation, export | Isolation design (not tested) | Consumer protection | Isolation/renewal test |
| 16 Ownership transfer | Sells integrated vessel | Survey + transfer | Systems transferred with documentation; steering handover/retraining required | Documented configuration | Unqualified buyer → training/refusal | Transfer record | — | Safety responsibility | Transfer process evidence |
| 17 End-of-life | Decommissions integrated systems | Specialist service | Safe decommissioning, data export/deletion, disposal guidance | Procedure | Unsafe removal → blocked | Decommission record | — | Safety/liability | Decommissioning evidence |

---

## 7. MAREA FLEET package — journey (B2B contracted)

Reference offer: `FLEET-START`/`FLEET-BUSINESS` subscription + onboarding + registration/migration +
training + support; hardware/connectivity/installation optional or quoted; `FLEET-ENTERPRISE` contracted.
Flags: `contractedSolution = true`; `hardwareIncludedByDefault = false`;
`onboardingPricingEstablished = false`.

| Stage | Customer action | Touchpoint | Expected outcome | Preconditions | Failure / recovery | Required commercial data | Technical evidence | Trust / legal status | Future acceptance test |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 Discovery | Operator needs multi-vessel visibility and governance | Future B2B page / direct sales / partner | Operator understands FLEET package vs FLEET SaaS vs equipment | No deployed service claim | No page → direct qualification | Organisation type, fleet size | None | No customer reference | Authorised B2B content |
| 2 Product understanding | Learns SaaS scope, onboarding, optional hardware/connectivity and support boundaries | Future page + dossier | Operator can separate software subscription from hardware, data, installation and professional services | FLEET product vs package disambiguation | Conflates SaaS fee with hardware; correct explicitly | Edition, vessel count | FLEET dossier; tenancy contract | No security certification claim | Comprehension test |
| 3 Binding (eligibility) | Provides organisation type, vessel ownership, users/roles, devices, workflows, retention needs | Discovery questionnaire + assessment | Outcome: contracted assessment; no automatic eligibility | B2B qualification | Unsupported integration → NOT_ELIGIBLE for that integration; package scoped down | Org profile, vessels, roles, integrations | FLEET service `NOT_IMPLEMENTED` | Tenant/roles design only | Qualification and scoping evidence |
| 4 Editions (configuration) | Selects Start/Business/Enterprise and optional equipment/connectivity | Contracted configuration | Edition chosen on governance depth and contract scope, never on "more security"; hardware optional | D-014; no unlimited | Operator assumes Enterprise is a checkout tier → explain contracted | Edition, vessel count, users, limits | Edition capability register | No invented SLA | Configuration/contract tests |
| 5 Price comprehension | Requests itemised commercial proposal | Human proposal | Software per vessel/month (VAT excluded), onboarding, hardware, connectivity, installation, support and integrations separated | No approved prices; no package price | Operator expects hardware included in SaaS fee; correct explicitly | Price status, VAT, exclusions | Cost evidence absent | `BESPOKE`; no invented contract | Proposal review |
| 6 Purchase or quote | Negotiates and signs contract (future) | Human contract | Contract states scope, limits, retention, termination, data processing and any contracted SLA with measurement basis | Legal review; DPA | No agreement on SLA → `NO_SLA_ESTABLISHED`, no promise | Contract, DPA, SLA terms | — | No contract in MC-08 | Contract/DPA/SLA review |
| 7 Fulfilment (order/contract) | Onboarding begins: organisation setup, vessel import, role design, training | Human onboarding service | Organisation operational with correct roles, vessels and data mappings | Contract signed; onboarding scoped | Data quality issues → migration remediation; scope change → re-quote | Onboarding record, migration mapping | Onboarding process not built | Data-processing roles | Onboarding acceptance record |
| 8 Installation (delivery) | Optional equipment installed and enrolled | Installer/service partner | Devices enrolled, connectivity working, telemetry visible read-only | Site/vessel assessment; WATCH/HUB purchased separately | Device/installation failure → remediation; telemetry shows offline honestly | Work orders, device ids | WATCH/HUB integration `CONDITIONAL`/not found | Read-only telemetry boundary | Device enrollment and telemetry test |
| 9 Activation | Users log in; roles and vessel assignments verified | FLEET app (future) | Users see only their organisation and assigned vessels; audit active | Server-side authorization; contracts | Cross-tenant or role error → immediate escalation, fail closed | Role matrix, vessel assignments | Tenancy design not tested | Tenant isolation requirement | Authorization/isolation test |
| 10 First use | Runs first operational workflows | FLEET app | Location/status, maintenance history, documents, alerts work within understood limits | Onboarded, telemetry or manual data | Missing telemetry → shows offline/unknown, never online | Limits, retention | Service not built | No guaranteed alert claim | First-use acceptance test |
| 11 Regular use | Manages fleet, roles, maintenance, reporting | FLEET app | Operational governance; revocation immediate; audit complete; read-only telemetry | Active contract | Incident/outage → documented recovery; local vessel functions unaffected | Renewal date, usage limits | Service not built | Privacy/DPA | Operational and audit evidence |
| 12 Updates | Receives platform updates and change notices | Service communications | Updates deployed with notice; contract commitments respected | Change process | Regression → rollback/communication | Change record | Release process not built | Contractual notice | Release/change process evidence |
| 13 Support | Raises support request or incident | Support channel | Scoped support; external installer access time-bound and audited | Support terms; role model | No SLA unless contracted → state `NO_SLA_ESTABLISHED` | Ticket, contract | — | Support access audit | Support/incident evidence |
| 14 Upgrade (expansion) | Adds vessels, users, integrations or Business/Enterprise scope | Account/contract addendum | Upgrade priced per contract; no unlimited; no cross-tenant | Contract amendment | Volume/scope change → re-quote | Contract amendment | — | No unlimited terms | Upgrade/billing test |
| 15 Renewal / cancellation | Renews or terminates contract | Account/billing (future) | Export of organisation data; deletion with audit and legal-retention position; WATCH/HUB ownership unaffected | Export/deletion policy | Missing export → recovery; contract termination terms | Renewal/termination, export | Service not built | Consumer/contract law; DPA | Termination/export/deletion test |
| 16 Ownership transfer | Vessel changes owner or leaves organisation | Transfer flow (future) | Vessel/device transfer authorised and auditable; old tenant loses access, no history leakage | Device ownership proof | Dispute → escalation | Transfer record | Ownership/transfer design | Privacy/tenant isolation | Transfer/revocation test |
| 17 End-of-life | Organisation exits service; devices decommissioned | Account closure + service | Data deletion per contract, hardware disposal guidance, telemetry stop confirmed | Contract end; retention policy | Retention obligation → documented limited hold | Deletion record | Service not built | Retention/DPA | Deletion and decommission evidence |

---

## 8. Mandatory cross-sell journeys

Cross-sell is designed so that a customer never pays twice for an already granted entitlement, never replaces
functional hardware without a benefit, and never receives a promise beyond the evidence. All cross-sell flows
are future designs; no upsell CTA is enabled.

### 8.1 START → CRUISE

- **Trigger:** START customer keeps a tablet at the helm and asks for a fixed display and traffic awareness.
- **Adds:** `AIS-RECEIVER` + `DISPLAY-7` + AIS antenna/splitter + mounts + professional installation; optional
  `NAV-PRO` if live instruments/CPA-TCPA/multi-device are wanted.
- **Retained:** existing `HUB-STANDARD` and `NAV` licence, if it still meets the outcome (Essential may need
  Pro for live overlays).
- **Commercial rule:** the existing NAV/HUB entitlement is recognised; no re-purchase of identical
  entitlement; new hardware is priced separately; installation re-assessed.
- **Outcome:** `CONFIGURATION_DEFINED_INTERNAL` internally, with `COMPATIBILITY_EVIDENCE_REQUIRED` and
  professional installation; never presented as a bundle upgrade price.

### 8.2 START → SAIL (survey required)

- **Trigger:** the owner wants supervised steering.
- **Adds:** PILOT quoted configuration + vessel/steering survey + `SENSE-WIND` (conditional) + drive/actuator,
  feedback, cabling, E-stop, commissioning, sea trial, training.
- **Retained:** `NAV-PRO` (route context) and `HUB-STANDARD` (bounded data) may be reused; if the START
  configuration used `NAV-ESSENTIAL`, an upgrade to Pro is required for the route-context role.
- **Commercial rule:** no fixed upgrade price; the PILOT scope is quotation-only; safety gate `BLOCKED`
  blocks the cross-sell until closed; the customer is told the survey may end in refusal.
- **Outcome:** `SPECIALIST_SURVEY_REQUIRED` → `QUOTATION_REQUIRED`; never `ORDERABLE`.

### 8.3 CRUISE → COMPLETE (survey required)

- **Trigger:** a cruising customer wants instruments, monitoring and supervised steering integrated.
- **Adds:** `HUB-PRO`, `WATCH-CORE` + subscription, four SENSE modules, PILOT quoted scope, optional AIS
  (already present may be retained) and WEATHER; full survey and project quotation.
- **Retained:** `NAV` subscription (upgrade to Pro if not already), `AIS-RECEIVER` and `DISPLAY-7` if
  functional and compatible; the existing `HUB-STANDARD` may be upgraded to Pro only if the integration
  envelope requires it.
- **Commercial rule:** no unnecessary replacement of functional hardware; no duplicate subscription; the new
  project is quoted per subsystem with its own acceptance.
- **Outcome:** `SPECIALIST_SURVEY_REQUIRED`; COMPLETE remains quotation-only.

### 8.4 PROTECT → expanded SENSE monitoring

- **Trigger:** the owner wants tank or environmental visibility in addition to power/bilge.
- **Adds:** `SENSE-TANKS` and/or `SENSE-ENV` (or a future validated kit/input mapping), installation and
  calibration; the existing WATCH subscription may need an input/limit check.
- **Retained:** `WATCH-CORE` and the `SENSE-ESSENTIALS` modules already installed; no duplicate sensor.
- **Commercial rule:** the existing kit's modules are never repurchased; additional modules are quoted
  separately; if the WATCH plan cannot support the input, the limitation is stated instead of selling it.
- **Outcome:** `CONFIGURATION_DEFINED_INTERNAL` only after compatibility/measurement evidence; otherwise
  `COMPATIBILITY_EVIDENCE_REQUIRED`.

### 8.5 PROTECT → FLEET package (eligible professional operators)

- **Trigger:** the customer turns out to operate several vessels professionally (charter, school, marina,
  maintenance, management).
- **Adds:** FLEET package — FLEET subscription per vessel, onboarding, roles, reporting, optional hardware
  and connectivity.
- **Retained:** the customer's WATCH devices remain theirs; the WATCH subscription continues independently;
  FLEET consumes read-only telemetry only under a written contract.
- **Commercial rule:** FLEET SaaS is not a WATCH upgrade and its fee does not include hardware; the
  PROTECT consumer offer is not silently converted into a fleet contract.
- **Outcome:** `QUOTATION_REQUIRED` / contracted assessment; no cross-tenant access.

### 8.6 NAV subscription → integrated START offer

- **Trigger:** an existing NAV subscriber buys a compatible HUB and wants onboard data in navigation.
- **Adds:** `HUB-STANDARD`, required external cabling/adapters and installation assessment.
- **Retained:** the active NAV subscription — the customer must not be charged again for the same NAV
  entitlement. If the customer has `NAV-ESSENTIAL` and needs live overlays, the difference to `NAV-PRO` is a
  prorated upgrade, not a second subscription.
- **Commercial rule:** one entitlement ledger; START is not sold as a second NAV licence.
- **Outcome:** `COMPATIBILITY_EVIDENCE_REQUIRED` until the data path is assessed.

### 8.7 WEATHER standalone → NAV integration without duplicate billing

- **Trigger:** a WEATHER subscriber buys NAV (or a NAV subscriber wants richer weather).
- **Adds:** NAV licence; NAV Pro may include WEATHER Standard-equivalent read access only where provider
  rights allow (D-013, `CONDITIONAL`).
- **Retained:** the existing WEATHER entitlement is recognised; the customer is never billed twice for the
  same forecast entitlement.
- **Commercial rule:** one entitlement ledger; upgrade from Standard to Pro applies a prorated credit;
  cancelling NAV does not delete user-owned weather records (export window hypothesis 30 days, legal review).
- **Outcome:** `CONDITIONAL` on provider rights; `COMPATIBILITY_EVIDENCE_REQUIRED` until entitlement sharing
  is implemented and tested.

### 8.8 Cross-sell prohibitions (all paths)

- No cross-sell may present a blocked product as available.
- No cross-sell may convert a consumer hardware purchase into a fleet contract without explicit consent.
- No cross-sell may charge again for an identical active entitlement.
- No cross-sell may describe an upgrade as a discount that hides mandatory accessories, installation, survey
  or subscription costs.
- No cross-sell may imply that new hardware replaces functional hardware without a stated benefit.
- No cross-sell may bypass the PILOT survey/safety gate, the WATCH delivery limits or the FLEET
  tenancy boundaries.

---

## 9. Journey evidence status

| Journey aspect | Current status | Evidence that would close it |
| --- | --- | --- |
| Website/funnel | Does not exist; `INTERNAL_ONLY` | MC-19/MC-23 page delivery and publication authorisation |
| Compatibility questionnaires | Specified in D9; no interactive implementation | MC-24 configurator implementation and rule tests |
| Quotation workflow | Process model only | Authorised sales process, price approval, legal review |
| Order/contract/checkout | Does not exist | MC-25/MC-26 with lifecycle, price, stock, payment gates |
| Installation service | No installer network established | MC-12/MC-28 channel and service evidence |
| Account/entitlement/billing | Does not exist | MC-16/MC-26/MC-27 |
| Device identity/ownership transfer | `NOT_FOUND` | X-07, WATCH device identity, FLEET design |
| Alert delivery | `WATCH_NOTIFICATION_PIPELINE = NOT_FOUND` | MC-13/MC-34 delivery tests under network loss |
| Tenant isolation | Design requirement only; service `NOT_IMPLEMENTED` | MC-35 security/isolation verification |
| PILOT safety | `BLOCKED`, sea trials `NOT_PERFORMED`, E-stop/motor-isolation/feedback `NOT_FOUND` | MC-35 safety validation and independent review |
| Support/RMA/warranty | Terms `OPEN` | MC-14/MC-28 |

**Status statement.** These journeys are complete as definitions and empty as operations. No customer can
currently discover, configure, price, buy, install, activate, support, transfer or retire a MAREA bundle.
Every bundle remains `NOT_FOR_SALE`.
