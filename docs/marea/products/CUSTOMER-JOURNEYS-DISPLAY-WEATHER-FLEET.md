# MAREA DISPLAY · MAREA WEATHER · MAREA FLEET — End-to-end customer journeys (MC-07 / D7)

| Field | Value |
| --- | --- |
| Document ID | MC-07 / D7-CUSTOMER-JOURNEYS |
| Milestone | MC-07 (Master Prompt 07/36) — product definitions batch 3 |
| Date | 2026-10-30 |
| Owner function | Commercial, UX and Localization Specialist (journey owner), with the DISPLAY hardware owner, the WEATHER data-rights owner and the FLEET tenancy owner |
| Status | INTERNAL ONLY · NOT PUBLISHED · NOT FOR SALE · products `DEFINED`; `PUBLICATION = BLOCKED`; brand clearance `NOT_GRANTED`; image generation `BLOCKED` |
| Governing contract | `docs/marea/products/README.md` §16, §19, §22; MC-07 brief §9–§17; `COMMERCIAL-BRAND-CLAIMS-POLICY.md` §4–§6 and §9 |
| Binding inputs | D4 `PRODUCT-EDITIONS-DISPLAY-WEATHER-FLEET.md` (editions authority); D5 compatibility matrix (batch 03); D6 pricing model (batch 03); D1/D2/D3 product dossiers; `docs/marea/compliance/MC-02-BLOCKERS-AND-DECISIONS.md`; `docs/marea/MARKET-BENCHMARKS.md` (figures checked 2026-10-30) |
| Counterparts | `CUSTOMER-JOURNEYS-NAV-HUB-AIS.md` and `CUSTOMER-JOURNEYS-PILOT-SENSE-WATCH.md` — same 17-stage order, same ownership model and same ten journey columns; never contradicted |
| Nature | Planning artefact for a future implementation. No stage below is live, and no journey may be used to imply availability |

**These are definitions, not availability.** Every stage is `SPECIFIED_ONLY`, `OPEN` or `BLOCKED`; none is
implemented. No display hardware exists, no chart or weather provider is licensed, no multi-tenant service is
deployed and no service level exists. `PUBLICATION = BLOCKED`; trademark clearance is `NOT_GRANTED`;
OPEN-MARINE source rights are `NOT_CLEARED`; image generation is `BLOCKED` (X-03). Every journey in this
document is an **intended target**, not a report of a customer test; no successful customer test has taken
place.

## 1. Reading conventions

### 1.1 Stage status vocabulary

| Label | Meaning |
| --- | --- |
| `SPECIFIED_ONLY` | Defined here; no page, service, entitlement, device or process exists to execute it |
| `OPEN` | Depends on an unresolved internal decision, measurement or policy |
| `BLOCKED` | An external condition (licence, contract, hardware, measurement, clearance) prevents the step |
| `PARTIAL_EVIDENCE` | A related artefact exists in the internal foundation (a browser interface, a partial provider adapter) but is untested, unlicensed and not product-integrated |
| `NOT_APPLICABLE` | The stage does not apply to that product, for the stated reason |

### 1.2 CTA and language rules (binding for every touchpoint)

- All three families are `DEFINED`. The only permitted CTAs are the claims-policy §5 equivalents of **"See the
  specification"** / «Ver la especificación», **"Request a compatibility review"** / «Solicitar estudio de
  compatibilidad», and — for FLEET — **"Request a technical proposal"** / «Solicitar propuesta técnica». A lawful
  interest list may be used only where it exists and is explicitly authorised. **No purchase, cart, reservation,
  pre-order, stock, price, subscription-start or delivery CTA may appear at any stage.**
- The **navigation/instruments disclaimer** (`COMMERCIAL-BRAND-CLAIMS-POLICY.md` §9) is mandatory on every
  surface that shows position, instruments or vessel data — therefore on DISPLAY and FLEET surfaces and wherever
  WEATHER shows position or route context. The **weather disclaimer** is mandatory on every WEATHER surface. The
  three **batch-03 limitation statements** (MC-07 brief §17.2) are mandatory on their product's surfaces and are
  quoted verbatim in D4 §7.1. Copy wording is owned by D8 and is not duplicated here.
- Spanish customer copy uses **tú**; English uses neutral professional "you". Product, edition and family names
  never translate.
- No certification, approval, official status, availability, stock, lead time, installer duration, support SLA,
  warranty length, testimonial, customer count or forecast-accuracy figure may appear in any touchpoint. No
  display figure (size, resolution, brightness, ingress, temperature) may appear. No AIS capability beyond
  receive-only may appear.

### 1.3 Price rule for every stage

No approved price exists. The only figures that may appear anywhere in this journey model are the five frozen
hypotheses — `DISPLAY-7` EUR 699 one-off (VAT-included consumer retail hypothesis, starting price);
`WEATHER-STANDARD` EUR 49/year and `WEATHER-PRO` EUR 89/year (consumer subscription, VAT basis `OPEN`);
`FLEET-START` EUR 49/month per vessel and `FLEET-BUSINESS` EUR 79/month per vessel (VAT excluded) — and only
as internal planning figures labelled `HYPOTHESIS_UNAPPROVED`. **No customer touchpoint may display any of
them.** `DISPLAY-LARGE-CONDITIONAL` and `FLEET-ENTERPRISE` have **no price** and none may be inferred. No
figure may be summed into a bundle and no competitor figure may appear in a customer touchpoint. The
customer-facing state is a specification view, a compatibility review request or a quotation/proposal request.

### 1.4 The control rule that no journey may break

- **No workflow in this document lets DISPLAY, WEATHER, FLEET, NAV, HUB, AIS, SENSE, WATCH, a website, a phone
  app, a cloud service, a support agent or an installer steer the vessel, engage the pilot, adjust the heading,
  move an actuator or command the helm.**
- **DISPLAY** may show PILOT read-only status and alarms at most, on an approved interface boundary; it never
  gains control authority.
- **WEATHER** has no vessel interface of any kind.
- **FLEET** telemetry is read-only; no steering, motor or remote-control path exists anywhere in the platform.
- Support and installer tooling may read diagnostics and commission locally; it can never actuate or steer.

### 1.5 Proposed routes are not implemented

Route paths named below are illustrative placeholders only. The authoritative information architecture is
`docs/marea/WEBSITE-AND-ROADMAP.md` §2; every path must pass route-collision, canonical/hreflang and
localisation validation before any journey step can be built, and none is live today.

## 2. The 17-stage blueprint - MAREA DISPLAY

Product `DISPLAY`; objects `DISPLAY-7` (`DEFINED` as a conditional starting hypothesis) and
`DISPLAY-LARGE-CONDITIONAL` (`CONDITIONAL`; `SIZE_NOT_FROZEN`). It is a physical marine multifunction
display: panel, compute module, storage, enclosure, mounting, power conversion/protection, connectors, harness,
dedicated operating environment and base software. `HARDWARE_NOT_SELECTED`, `BOM_NOT_ESTABLISHED`. Every
stage assumes a selected device and an installer survey; neither exists, so all seventeen stages are
`SPECIFIED_ONLY` and most are `BLOCKED`.

| Stage | User action | Touchpoint | Expected result | Required information | Failure mode | Recovery | Commercial opportunity | Trust / safety requirement | Acceptance evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1. Discovery | Searches for a fixed helm screen for a boat being refitted; arrives from an installer, a yard or a search landing | Proposed `/marea/display` (ES/EN); installer referral; refit-yard conversation | Learns that DISPLAY is a *defined*, not-for-sale device, that its size is not frozen and that charts and data services are licensed separately | Category; that it is a device and not an app; readiness; the size policy; the separation of data entitlements | Assumes a tablet clone; assumes charts or NAV are included; assumes a buyable product | The page states `DEFINED` / not for sale, states the limitation statement verbatim, and routes to a compatibility review | Opens the refit-installer channel and the entitlements discussion early | No measured display figure; the batch-03 DISPLAY limitation statement verbatim | Page shows lifecycle `DEFINED`, no price/stock CTA, limitation statement verbatim, zero measured specification |
| 2. Product understanding | Reads what appears on the screen, what the base software does and what must be bought separately | Capability and boundary blocks; entitlement explainer | Can state: "it is a mounted helm screen; NAV, charts and weather are separate; it shows what I am licensed to see" | Base software; presentation sources; exclusions; entitlement model; read-only PILOT boundary | Believes charts are included; believes the display steers or engages the pilot | Exclusion block above the benefits; read-only PILOT wording; no unlabelled capability | Frames the attach opportunity (NAV, WEATHER, AIS) honestly | Navigation disclaimer and DISPLAY limitation statement present; no control wording | Every capability row carries status and condition; no measured figure; no control implication |
| 3. Compatibility | Answers the vessel questionnaire: helm space, power, cable route, network and intended sources | Compatibility page; installer questionnaire (D5) | Exactly one D5 outcome; for a fixed installation `INSTALLER_ASSESSMENT_REQUIRED` | Vessel and helm data; power arrangement; cable route; network; existing instruments; intended entitlements | Assumes "any boat fits"; assumes ingress protection; assumes a HUB is present | Assessment and refusal rules; no "probably works"; unknown stated as unknown | The survey is the real conversion event and the basis of the quotation | No ingress or environmental claim; no universal-compatibility wording | Outcome recorded in D5 vocabulary; no suitability statement before survey; no rating claimed |
| 4. Editions | Chooses the standard object or asks about a larger screen | Edition block (D4 §2); installer conversation | Understands one standard object and one *conditional* larger object; that size is not frozen; that no larger size is priced | Station format; conditional status; what each object does not include | Assumes a larger screen is available or includes more data | Conditional label visible; `SIZE_NOT_FROZEN` stated; no price surface | Correct station-format selection avoids a mis-specified refit | No measured size and no size comparison; no capability difference implied | Edition copy matches D4 row by row; conditional label present; zero size figure |
| 5. Price comprehension | Learns that the device package is quoted and that installation and data are separate | Pricing-state block; quotation request | Understands the commercial model without seeing an unapproved figure | What the device package covers; exclusions; installation quoting; entitlement separation | Assumes a turnkey helm price; assumes charts included; assumes a "from" price | No price surface; explains that a written quotation is the offer document | Sets a scope that protects both the customer and the installer | EUR 699 never appears customer-facing; no "from" publication before approval | No figure on any surface; quotation template names every inclusion and exclusion |
| 6. Purchase or quote | Requests a survey and receives a written, vessel-specific quotation | Enquiry workflow (future MC-24/MC-26); installer proposal | A documented next step and, later, a quotation — never an order confirmation | Vessel data, survey record, scope, exclusions, installation, terms | Assumes fixed turnkey price; assumes payment is possible now | Quotation is explicitly vessel-specific; pre-contract state until terms exist | Installer-led hardware revenue with a defensible scope | No payment at `DEFINED`; seller identity and terms remain `OPEN`; refusal policy for unsafe or unsuitable installations | Quotation record with scope and exclusions; no order can be created |
| 7. Fulfilment | Receives the device, supplied mount, harness and documentation after an authorised release | Installer ordering; delivery to yard; serial registration | Contents match the quotation; serials recorded; entitlements provisioned; no substitution without consent | Frozen SKU contents, serials, packaging, entitlement provisioning | Missing mount or harness; wrong variant; entitlement not provisioned | Verified kitting; substitution only with written consent; return/replace path | Low return rate protects a thin hardware margin | Included/excluded list repeated at delivery; no substituted part | Serial and contents reconciliation against the quotation; entitlement provisioning record |
| 8. Installation | Attends the yard; the installer mounts, powers, wires and commissions the device | Installer commissioning route; installation record | A mounted, powered device with a documented installation record and a validated data path | Mounting rules; power protection; cable route; network; commissioning checklist | Unsafe mounting; power or grounding fault; cable route damage; no data path | Installation refused and corrected before commissioning continues; re-commissioning | Installation is the quality gate and a quoted revenue line | Physical work by a competent person only; no temporary unsafe installation; no ingress claim | Signed installation record per item; power/grounding check; data path verified and recorded |
| 9. Activation | Powers up, binds entitlements, confirms sources and configures dashboards | Device onboarding; account/entitlement binding | Authenticated device, entitlements bound, sources shown with state, dashboards configured | Firmware version; entitlement state; source list; compatibility result | Entitlement not bound; source silent; duplicate device identity | Re-provisioning; source diagnostics; support case | Activation is the first "it works" moment and the honest upsell moment | A lapsed entitlement never disables base functions; no fabricated data on screen | Activation record with versions, entitlements and per-source states |
| 10. First use | Learns what each screen means, what "stale" looks like and what the display does not do | Onboarding; support article | Can distinguish live, stale, lost and unavailable; knows the display is an aid and PILOT status is read-only | State vocabulary; navigation responsibility; dashboard meaning; alarm meaning | Trusts a stale value; believes the screen is an instrument with certification; expects charts | Onboarding explainer; support article; state examples | Reduces returns and support calls | Navigation disclaimer verbatim; no safety-system framing; no autonomy implication | Comprehension test on stale versus live; disclaimer present on the surface |
| 11. Regular use | Uses the helm screen on passage; monitors instruments, NAV, AIS and weather per entitlement; navigates manually | Device; helm; local dashboards | A daily helm picture with honest states, and no dependence on the display as the sole means of navigation | Freshness; source; alarm meaning; degraded behaviour; entitlement state | Over-reliance; a missing source treated as "fine"; an unverified glare or readability assumption | State display; manual navigation; support; installer visit | Retention and entitlement renewals | The display is never the sole means of navigation; no safety or readability guarantee | Recorded state displays in ES/EN; no fabricated value; navigation disclaimer present |
| 12. Updates | Applies a software/firmware update through the documented route | Update guide; installer; recovery mode | Updated version, configuration preserved, rollback path available and documented | Update method; version policy; rollback; entitlement impact | Bricked device; lost configuration; source mapping lost | Verified rollback/recovery mode; installer visit | Updates are a support and security obligation, not a paid tier | No update silently changes data presentation or safety-relevant states; CRA obligations apply | Version record + rollback test + preserved configuration record |
| 13. Support | Reports a fault, a missing source or an entitlement problem | Support; installer first line; diagnostic export | A recorded case with diagnosis and a next step; no remote control of the device or data | Symptoms; versions; source states; entitlement state; diagnostic export | Blames the boat; cannot prove the data path; expects an SLA that does not exist | Triage: source then entitlement then device then RMA; escalation to product support | Support quality decides refit reputation and referral | Support tooling is read-only; no unpublished SLA; no certification claim | Case recorded end to end with a named owner; diagnostic export attachable |
| 14. Upgrade | Adds a data entitlement, a HUB, an AIS source, or (conditionally) a larger display | Installer; support; edition comparison | Predictable expansion with a separate quotation and a re-validation | What changes; whether it is hardware, entitlement or scope; re-installation needs | Assumes a software unlock; assumes a larger device exchange is free or available | Every upgrade quoted and validated separately | Expansion revenue per vessel | No upgrade bypasses compatibility validation; no entitlement is implied | Upgrade quoted and recorded; compatibility re-checked and attached |
| 15. Renewal or cancellation | Renews or cancels NAV, WEATHER or chart entitlements; the device itself has no subscription | Account; support | The device keeps working with its base functions; licensed data stops with an honest unavailable state; own records exportable | What renews; term; price when approved; what stops; export window | Assumes the device needs a subscription; assumes records are lost on lapse | Export offer; reactivation path; explicit unavailable state | Entitlement retention without holding the device hostage | Subscription isolation: a lapse never disables the device or safety-relevant status display | Cancellation test proving base functions continue and licensed data shows unavailable |
| 16. Ownership transfer | Sells the boat with the display installed | Documented transfer procedure; support; installer | Device identity transferred, entitlements rebound or ended, previous owner's access removed, handover pack delivered | Transfer procedure; entitlement transfer rules; warranty position; privacy | Previous owner keeps account access; new owner cannot activate; warranty assumptions | Support-led transfer with re-verification and revocation | Second-hand boats are a real market and a trust test | Privacy of the previous owner; warranty position stated honestly | Transfer test with two accounts; revocation verified; handover pack recorded |
| 17. End-of-life | Removes or retires the display; disposes of the electronics | Installer/yard; disposal guidance | Safe decommissioning, device deregistered, entitlements closed, data exported or deleted, electronics disposed under WEEE | Removal steps; disposal route; data deletion policy; mount removal | Abandoned device left powered; data retained; a mount removal leaves an ingress path | Documented decommissioning by a competent person; deregistration confirmation | Replacement sale, honestly made | Deletion honoured; no data held hostage; manual navigation unaffected | Deregistration and deletion record; disposal record; integrity check of the helm |

**Critical dependencies for the DISPLAY journey.** (1) No display hardware, enclosure or BOM exists
(`H-11`, `H-05`, `P-07`), so stages 7–11 cannot be accepted. (2) No conformity and no secure update process
(`H-06`, `H-13`), so stages 8, 12 and the required targets in stage 10 cannot be evidenced. (3) No chart,
basemap or weather rights (`D-01`, `D-05`, `D-06`, `D-10`), so stages 2, 9, 11 and 15 cannot be completed for
licensed data. (4) No tested interface matrix (`H-04`), so stage 3 resolves to assessment and stage 9 may not
validate. (5) No installer network, measured installation scope or customer evidence (`X-05`, `X-06`), so
stages 6, 8 and 13 are blocked. (6) No device identity model (`X-07`), so stages 9 and 16 are blocked. (7)
Brand and imagery gates (`X-01`, `X-03`) block every customer-facing stage.

## 3. DISPLAY-specific journeys

Each records the trigger, the intended customer experience, the required display behaviour, the required
behaviour, the recovery path and the evidence that would prove it. **Every one is an intended target; none is
tested.**

### 3.1 DJ-1 — Refit installation

- **Trigger.** An owner or yard decides to fit a permanent helm display into an existing helm.
- **Intended customer experience.** Survey, written quotation, installation, commissioning, handover and a
  documented record; the customer knows who did what and what is not included.
- **Required display behaviour.** Before handover: a commissioning screen or record showing the device identity,
  firmware version, source list, entitlement state and the installed configuration.
- **Required behaviour.** Installer-led; mounting, power protection, cable route and network verified; no
  temporary unsafe installation; the device is never left powered in an undocumented state.
- **Recovery.** If the survey finds an unsuitable helm, the installation is refused rather than improvised; if
  commissioning fails, the previous state is restored and the case is escalated.
- **Evidence to close.** Two reference installations with complete records, measured installation scope and
  handover review. **Journey classification.** Intended target (`SPECIFIED_ONLY`); current evidence: none
  (`H-11`, `H-05`, `X-05`, `X-06`). **Status.** `BLOCKED`.

### 3.2 DJ-2 — DISPLAY without a HUB

- **Trigger.** The customer installs the display without MAREA HUB.
- **Intended customer experience.** The display presents the sources it can reach directly and the software the
  customer has separately entitled; it does not pretend to unify mixed equipment.
- **Required display behaviour.** Each source is shown with its own state; unsupported or absent categories are
  shown as `NOT_AVAILABLE` with a reason, never as a zero or a blank; no aggregated "all data" view is implied.
- **Required behaviour.** The product must not claim HUB-level normalisation without a HUB; the compatibility
  matrix decides what is reachable; no data is fabricated to fill a screen.
- **Recovery.** Add a HUB (separate purchase) or a compatible direct source; support explains the limitation.
- **Evidence to close.** A recorded installation with direct sources only, reviewed screen by screen.
  **Journey classification.** Intended target (`SPECIFIED_ONLY`); current evidence: none (`H-04`, `H-11`).
  **Status.** `BLOCKED`.

### 3.3 DJ-3 — DISPLAY with HUB and NAV

- **Trigger.** The customer runs MAREA NAV on the display and/or integrates a HUB as the vessel data gateway.
- **Intended customer experience.** One helm screen showing navigation from the separately entitled NAV
  subscription and normalised vessel data from the HUB, with provenance and freshness.
- **Required display behaviour.** Distinguish the source of navigation data and of each instrument value; show
  entitlement state; show a degraded state when NAV or the HUB is absent; never imply that NAV or the HUB is
  included in the device price.
- **Required behaviour.** NAV supplies route/waypoint context and read-only status; HUB publishes bounded data;
  neither commands the vessel and the display gains no steering authority.
- **Recovery.** If the HUB is lost, the display falls back to direct sources and states the change; if NAV is
  unentitled, the display shows an honest unavailable state for navigation.
- **Evidence to close.** A recorded integration test proving that a NAV route change cannot move an actuator and
  that HUB loss is displayed as a state. **Journey classification.** Intended target (`SPECIFIED_ONLY`);
  current evidence: none (`H-04`, `D-01`, `D-06`). **Status.** `BLOCKED`.

### 3.4 DJ-4 — Loss of instrument data

- **Trigger.** A source stops transmitting, becomes implausible, or a HUB stops publishing.
- **Intended customer experience.** The screen says what is missing, since when, and what remains valid; the
  customer keeps navigating with official means.
- **Required display behaviour.** `STALE` with the age, `LOST` with the last valid timestamp, `UNKNOWN` when a
  supported source has never produced a value, `NOT_AVAILABLE` with a reason when the configuration cannot
  provide it. Never a zero, a default, an interpolation or a silently held value.
- **Required behaviour.** No automatic substitution of an unlicensed or unvalidated source; alarm/status
  hierarchy preserved; manual navigation always available and always the customer's responsibility.
- **Recovery.** Reconnect the source, check the cable or HUB, refresh; if the loss persists, raise a support case
  with the diagnostic export.
- **Evidence to close.** Recorded source-loss injection on a real installation with screenshots of every state in
  ES and EN. **Journey classification.** Intended target (`SPECIFIED_ONLY`); current evidence: none (`H-04`,
  `H-11`). **Status.** `BLOCKED`.

### 3.5 DJ-5 — Power interruption

- **Trigger.** Vessel DC loss, breaker trip, blown fuse or voltage collapse.
- **Intended customer experience.** The display goes dark without leaving an unsafe state; on restoration it
  boots to a defined state and does not silently resume whatever it was doing.
- **Required display behaviour.** Before loss: a low-voltage warning where the hardware supports it. After
  restoration: a boot state showing that no mode was resumed, the firmware version and the source/entitlement
  state; any licensed-data grace period is stated honestly (the offline grace period is `OPEN`).
- **Required behaviour.** The display has no autonomous function to resume; no retained unsafe state; the device
  must not be the only means by which a safety-relevant state is visible.
- **Recovery.** Restore power, check protection, run the documented post-outage checklist, confirm sources and
  entitlements before relying on the screen.
- **Evidence to close.** Recorded brown-out and full-loss tests with recovery checklist usability review.
  **Journey classification.** Intended target (`SPECIFIED_ONLY`); current evidence: none (`H-11`, `H-13`).
  **Status.** `BLOCKED`.

### 3.6 DJ-6 — Device replacement

- **Trigger.** The display fails or is physically damaged.
- **Intended customer experience.** A replacement is provisioned and bound to the same customer; the old device
  is deregistered; entitlements are moved; the configuration is restored or explicitly not available.
- **Required display behaviour.** Which device is active, which is retired, what configuration was restored and
  what history exists.
- **Required behaviour.** Re-provisioning must not expose the previous device's data to another account; serials
  reconciled; no duplicate entitlement charge during the swap; a support-led, documented procedure.
- **Recovery.** Temporary loss of the helm screen is disclosed; the customer may navigate by other means until the
  replacement is commissioned.
- **Evidence to close.** Full replacement rehearsal with two devices, a restored configuration and a recorded
  entitlement history. **Journey classification.** Intended target (`SPECIFIED_ONLY`); current evidence: none
  (`P-07`, `X-07`). **Status.** `BLOCKED`.

### 3.7 DJ-7 — Software entitlement expiration

- **Trigger.** A NAV, WEATHER or chart entitlement lapses, payment fails, or the customer cancels.
- **Intended customer experience.** The device and its base software keep working; the licensed data stops with an
  honest unavailable state; own records remain exportable.
- **Required display behaviour.** An explicit `ENTITLEMENT_EXPIRED` state naming the affected service and the
  action available; base dashboards and local status continue; no frozen or fabricated licensed data is shown as
  current.
- **Required behaviour.** Subscription isolation is a design requirement: an entitlement may never disable the
  device, local dashboards, local alarms or safety-relevant status display. No dark pattern, no false urgency.
- **Recovery.** Renew or re-purchase the entitlement; export own records; the device remains usable as a display
  for whatever remains entitled.
- **Evidence to close.** A payment-failure/expiry test proving base functions continue and licensed data shows
  unavailable; a record of the customer notice. **Journey classification.** Intended target
  (`SPECIFIED_ONLY`); current evidence: none (`D-01`, `D-05`, `H-13`). **Status.** `BLOCKED`.

## 4. The 17-stage blueprint - MAREA WEATHER

Product `WEATHER`; editions `WEATHER-STANDARD` (`DEFINED`) and `WEATHER-PRO` (`CONDITIONAL` on provider
entitlements). A licensed-data subscription: one account, one entitlement ledger, no double billing with NAV,
no forecast-accuracy guarantee, no official warning service, no redistribution and no offline right. Coverage
is limited to the licensed sources and the declared area and horizon; every data point carries its source and
timestamp.

| Stage | User action | Touchpoint | Expected result | Required information | Failure mode | Recovery | Commercial opportunity | Trust / safety requirement | Acceptance evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1. Discovery | Wants a trustworthy forecast for the Atlantic coast; arrives from search, a NAV page or an installer | Proposed `/marea/weather` (ES/EN); ecosystem cross-link | Learns that WEATHER is a *defined*, not-for-sale licensed forecast subscription and not an official warning service | Category; subscription nature; licence limits; readiness; the separation from NAV | Assumes a guaranteed or official forecast; assumes weather is free with NAV | Weather disclaimer and limitation statement shown; entitlement explainer; no purchase CTA | Top of the subscription funnel and the clearest cross-sell from NAV | Probabilistic framing and source/timestamp rule visible, not footer-only | Page shows lifecycle, no price/stock CTA, weather disclaimer and limitation statement verbatim |
| 2. Product understanding | Reads which forecast variables and areas are offered, what "licensed" means and what is not included | Capability blocks; provenance explainer; coverage statement | Can state: "it is a forecast with visible source and time, within a licensed area and horizon, and it can be wrong" | Variables; area; horizon; freshness; model versus observation; uncertainty; exclusions | Treats a forecast as an observation; assumes global coverage; assumes accuracy | Provenance and validity explainer; explicit coverage statement | Sets expectations that reduce churn and support cost | Never present a forecast as an observation; never imply accuracy | Every capability row names variable, area, horizon and licence status |
| 3. Compatibility | Checks device, coverage area and any existing entitlement before subscribing | Compatibility/coverage check; account page | Exactly one honest outcome: covered, partially covered, or not covered; and whether NAV/DISPLAY consumption applies | Location/area; device; existing NAV/WEATHER entitlements; consumption surface | Assumes coverage because a phone works on the quay; assumes offline access | Coverage statement and out-of-coverage refusal; no "probably works" | Correct scoping prevents refunds and disputes | No implied coverage or resolution beyond the licence | Coverage check record; explicit out-of-coverage path |
| 4. Editions | Chooses Standard or Pro | Edition block (D4 §3); comparison view | Understands Pro as deeper decision support — model comparison, advanced layers, route context, alerts — and that it is conditional and never "more accurate" | Edition difference; conditional status; what Pro does not improve | Assumes Pro is more accurate, faster or wider-covering | Conditional label visible; explicit "not accuracy" statement | The only upgrade path; it must be real | No claim that paying more improves forecast accuracy | Edition copy matches D4 row by row; conditional label present |
| 5. Price comprehension | Learns the subscription is annual, licensed and separate from NAV | Pricing-state block; entitlement explainer | Understands the commercial model without an approved figure, including renewal, cancellation, sharing and no double billing | Term; renewal; cancellation; sharing; no double billing; VAT basis still `OPEN` | Assumes a lifetime or free-forever price; assumes weather is included in NAV | Entitlement explainer; no price surface | Avoids the category's most common billing complaint | No "free forever"; no double billing; exact sharing description | No figure on any surface; sharing statement present and accurate |
| 6. Purchase or quote | Requests interest or, after readiness, purchases a subscription with explicit terms | Enquiry; lawful interest list; future checkout (MC-26) | A documented next step; after readiness, an entitlement with explicit term and conditions — never a silent charge | Contents; term; approved price; consent; cancellation; coverage | Assumes purchase is possible now; assumes a bundle | Interest list and quotation request only at `DEFINED` | Subscription conversion with clean consent | No payment at `DEFINED`; cancellation consequences shown before payment | Entitlement test only after readiness; consent record present |
| 7. Fulfilment and provisioning | Account and entitlement are provisioned | Account; entitlement ledger | Entitlement bound to the account, coverage declared, consumption surfaces enabled, term dates visible | Account identity; entitlement id; coverage; term; sharing state | Entitlement not provisioned; wrong area; duplicate ledger | Re-provisioning; ledger reconciliation; support case | First value moment and the proof of the one-ledger model | One ledger; no duplicate charge | Provisioning record; shared-ledger test with NAV |
| 8. Installation and setup | Not a physical installation: sets up saved locations, units and the consumption surface | Account settings; in-product setup | A configured account showing the first forecast with source and timestamp | Location setup; units; preferences; display surface | Misconfigured units; wrong area; wrong surface | Settings correction; support article | Activation completion | No implied calibration or local measurement | Setup checklist; correct attribution displayed |
| 9. Activation | Confirms access and sees the first forecast | Account; in-product | Valid entitlement, forecast rendered with provider, model run time and validity window | Entitlement state; provider; model; run time; validity | No data; stale data; provider error | Retry; status page; support; honest unavailable state | Activation metric and habit start | Never render a fabricated forecast; stale data is shown as stale | Activation record; provenance fields present |
| 10. First use | Learns to read uncertainty, validity and model meaning; compares with local conditions | Onboarding; help article | Can explain: "this is a model forecast valid until X, with uncertainty; local conditions prevail" | Model meaning; validity window; uncertainty; weather disclaimer | Over-trusts one model; treats the forecast as a warning | Explainer; multi-model comparison where entitled | Habit formation and reduced support | Weather disclaimer verbatim; no safety verdict | Comprehension test on validity and uncertainty |
| 11. Regular use | Plans passages; checks freshness; uses route context and alerts where entitled | Product; route view; notification channel | Faster, better-informed planning with explicit limits and visible provenance | Freshness; run time; model; area; alert meaning; what a notification does and does not prove | Uses a stale forecast as current; misses an alert; assumes continuous update | Freshness display; manual refresh; documented alert behaviour | Renewal depends on perceived usefulness, not on more data | Stale or unavailable is never current; no guaranteed alert delivery | State tests; notification behaviour documented and matched |
| 12. Updates | Service updates, model changes, app updates | Release notes; in-product notice | Changes communicated, entitlements honoured, removed datasets explained honestly | Change policy; notice; what changed and why | Silent model change; dataset removed overnight | Notice and explanation; honest unavailable state; support | Trust through transparency | No silent substitution with an unlicensed source | Change log and a tested customer notice |
| 13. Support | Reports a wrong forecast, a missing area or a billing question | Support; help centre | A case with a diagnosis and an honest statement of what is known and not known | Data point identity; source; run time; location; entitlement state | Support asserts accuracy it cannot evidence; blames the weather | Provenance review; provider escalation; goodwill policy `OPEN` | Retention and referral | No accuracy claim; state the evidence available | Case record; escalation documented |
| 14. Upgrade | Moves from Standard to Pro | Edition comparison; account | Explicit entitlement change with a prorated credit and no double charge | What Pro adds; proration policy; effective date | Double billing; lost records | Billing correction; downgrade at term end | Expansion revenue | No double billing; no promise before policy exists | Upgrade test; billing reconciliation |
| 15. Renewal or cancellation | Renews, cancels or lets the subscription lapse | Renewal notice; account; support | Clear notice, cancellation at term end, read-only export window and explicit statement of what stops | Renewal date; approved price; what stops; export window; deletion policy | Dark patterns; silent auto-renewal; unexplained loss of records | Consent-based renewal; export offer; explicit statements | Retention is the business; trust decides it | No false urgency; own records never deleted on lapse | Cancellation and export test; customer notice recorded |
| 16. Ownership transfer | The boat changes hands; the buyer asks about the forecast service | Account; support | The account stays with the person; boat-related saved locations can be exported or re-created; no implicit transfer of billing | What transfers; privacy; new owner account | Assumes the forecast follows the boat; assumes billing transfers silently | Export and re-import of own records; support-assisted handover | Referral and a clean new account | Privacy of the previous owner; no silent billing transfer | Export/import test; no cross-account data leak |
| 17. End-of-life | Cancels and leaves the service | Account; support | Subscription closed, records exported, deletion confirmed within the stated policy | Deletion policy; retention; confirmation | Data retained indefinitely; silent continuation | Deletion confirmation; export before closure | Clean exit builds referral | Deletion honoured; no data held hostage | Deletion record; confirmation to the customer |

**Critical dependencies for the WEATHER journey.** (1) No provider is licensed for commercial use
(`D-04`, `D-05`, `D-07`, `D-10`), so stages 1–15 cannot be promised. (2) No forecast evaluation exists
(`P-08`), so stage 2 cannot make a coverage or quality statement. (3) No entitlement or billing service exists
in MC-07, so stages 5–8 and 14–15 are blocked. (4) AIS-derived and B2B data use is unresolved (`D-09`), so the
FLEET path in stage 11 and the cross-product journey are conditional. (5) Brand and imagery gates (`X-01`,
`X-03`) block every customer-facing stage. (6) Customer evidence is absent (`X-06`), so stages 1–4 are
hypotheses about demand, not validated.

## 5. WEATHER-specific journeys

All nine are intended targets. None is implemented; none is a customer test.

### 5.1 WJ-1 — Standalone subscriber

- **Trigger.** A skipper buys WEATHER without NAV or any other MAREA product.
- **Intended customer experience.** A complete forecast service on its own: coverage declared, source and time
  visible, own records portable, no other product required.
- **Required behaviour.** The account and ledger stand alone; no navigational prerequisite is invented; no
  cross-product purchase is forced.
- **Recovery.** If coverage is insufficient, an honest out-of-coverage state and a cancellation/export path.
- **Evidence to close.** A standalone activation and coverage test plus an export test. **Journey classification.** Intended target (`SPECIFIED_ONLY`); current evidence: none (`D-04`, `P-08`).
  **Status.** `BLOCKED`.

### 5.2 WJ-2 — NAV subscriber

- **Trigger.** An existing NAV customer wants weather, or asks whether NAV already includes it.
- **Intended customer experience.** One account and one ledger: WEATHER is purchased once, NAV may consume it
  without a second charge, and NAV Pro may include WEATHER Standard-equivalent read access **only where provider
  rights allow**.
- **Required behaviour.** No double billing; the shared entitlement is described exactly as implemented; if the
  sharing is not implemented, it is not promised; a WEATHER purchase from inside NAV is explicit and consented.
- **Recovery.** Ledger reconciliation if a duplicate charge appears; honest downgrade path.
- **Evidence to close.** Shared-ledger test with two products, a billing reconciliation and a no-double-charge
  audit. **Journey classification.** Intended target (`SPECIFIED_ONLY`); current evidence: none (`D-04`,
  `D-07`; entitlement service not built). **Status.** `BLOCKED`.

### 5.3 WJ-3 — Model comparison (Pro)

- **Trigger.** A Pro customer compares forecasts from more than one licensed model before a passage.
- **Intended customer experience.** Each model is shown as a model, with its own run time and validity; the
  differences are visible; the product never declares a "correct" model or a consensus truth.
- **Required behaviour.** No accuracy ranking, no composite "most likely" score invented from unvalidated
  methods, no colour-coded safety verdict; attribution for every model; the comparison is licensed for the
  declared area.
- **Recovery.** If a model is unavailable, it is shown as unavailable rather than silently dropped; the customer
  can plan with the remaining licensed models.
- **Evidence to close.** A licensed multi-model test with recorded attributions and a review that no ranking or
  safety verdict appears. **Journey classification.** Intended target (`SPECIFIED_ONLY`); current evidence:
  none (`D-04`, `P-08`; Pro `CONDITIONAL`). **Status.** `BLOCKED`.

### 5.4 WJ-4 — Forecast becomes stale

- **Trigger.** The model run ages beyond its validity window, the customer leaves the product open, or an update
  fails.
- **Intended customer experience.** The product says the forecast is stale and how old it is; it never shows the
  old forecast as current.
- **Required display behaviour.** `STALE` with the run time and age; `LOST` when the provider has not updated;
  `PROVIDER_UNAVAILABLE` when no valid dataset exists; no frozen rendering presented as live.
- **Required behaviour.** Never fabricate, interpolate or default a value; the last known valid forecast may be
  shown only with its age and a clear visual difference.
- **Recovery.** Refresh; check provider status; use another licensed model where entitled; plan with local
  observations and official sources.
- **Evidence to close.** Controlled staleness test on a real account with screenshots in ES and EN. **Journey classification.** Intended target (`SPECIFIED_ONLY`); current evidence: none. **Status.** `BLOCKED`.

### 5.5 WJ-5 — Provider outage

- **Trigger.** A licensed provider is unavailable, returns errors, or exceeds the agreed service behaviour.
- **Intended customer experience.** An honest unavailable state with the provider attribution retained; the
  customer is not silently moved to an unlicensed or inferior source.
- **Required behaviour.** No fallback to a source the programme is not licensed to use; no cached data presented
  as fresh; status communication; the last valid data may be shown only with its age.
- **Recovery.** Wait for the provider; use another licensed model where entitled; support confirms the state;
  official sources and local observations remain the customer's responsibility.
- **Evidence to close.** A recorded outage simulation with state transitions and a customer notice. **Journey classification.** Intended target (`SPECIFIED_ONLY`); current evidence: none (`D-04`, `D-07`).
  **Status.** `BLOCKED`.

### 5.6 WJ-6 — Licensed dataset removed

- **Trigger.** A provider withdraws a dataset, the rights expire, or the licence is narrowed.
- **Intended customer experience.** The dataset disappears from the product with an honest explanation; the
  entitlement is adjusted; no cached redistribution is used to keep showing it.
- **Required behaviour.** Remove the data rather than continue unlicensed use; notify affected customers; state
  what replaced it, if anything; adjust the entitlement and the price position through the pricing authority;
  the refund or goodwill policy is `OPEN`.
- **Recovery.** Continue with the remaining licensed data; cancellation and export path if the product no longer
  meets the customer's need.
- **Evidence to close.** A process rehearsal of a dataset withdrawal with customer notice, entitlement adjustment
  and a review that no unlicensed data remains. **Journey classification.** Intended target
  (`SPECIFIED_ONLY`); current evidence: none (`D-04`, `D-10`). **Status.** `BLOCKED`.

### 5.7 WJ-7 — Entitlement upgrade (Standard to Pro)

- **Trigger.** A Standard customer wants model comparison, advanced layers, route context or alerts.
- **Intended customer experience.** A clear comparison, an explicit entitlement change with a prorated credit,
  and no duplicate charge for the same entitlement.
- **Required behaviour.** The Pro benefits must already be licensed and built; no uplift invented; no proration
  promise before the policy exists; the same ledger is used and user records are preserved.
- **Recovery.** Downgrade at term end with a stated consequence; a billing correction if a duplicate charge
  occurs.
- **Evidence to close.** Upgrade test after Pro validation plus a billing reconciliation. **Journey classification.** Intended target (`SPECIFIED_ONLY`); current evidence: none (`P-08`). **Status.** `BLOCKED`.

### 5.8 WJ-8 — Renewal or cancellation

- **Trigger.** The renewal date approaches, or the customer cancels.
- **Intended customer experience.** A clear notice, cancellation at term end, a read-only export of own records
  for a defined window (hypothesis 30 days, legal review `OPEN`), and an explicit statement of what stops.
- **Required behaviour.** No dark pattern, no false urgency, no silent auto-renewal, no deletion of user-owned
  records; the export window is stated before cancellation.
- **Recovery.** Reactivate within the stated window where policy allows; export remains available after
  cancellation.
- **Evidence to close.** Cancellation and export test, with the notice text reviewed. **Journey classification.**
  Intended target (`SPECIFIED_ONLY`); current evidence: none (no billing service; policy `OPEN`).
  **Status.** `BLOCKED`.

### 5.9 WJ-9 — Evaluating a weather window

- **Trigger.** The skipper is deciding whether a passage window is acceptable.
- **Intended customer experience.** The product supports the decision: it shows the licensed forecast, the model
  and run time, the validity and the uncertainty, and (on Pro) a comparison and route context. It helps the
  skipper think; it never decides.
- **Required behaviour.** No "safe to sail" verdict, no green/red safety score, no go/no-go recommendation, no
  claim to replace official warnings, port authority notices or the skipper's judgement. The weather disclaimer
  and navigation disclaimer are present; local conditions prevail.
- **Recovery.** If the customer asks for a safety decision, the product states its limits and directs them to
  official sources and their own judgement.
- **Evidence to close.** A review of every surface in this journey confirming that no safety verdict or
  recommendation exists, plus a comprehension test. **Journey classification.** Intended target
  (`SPECIFIED_ONLY`); current evidence: none (`D-04`, `X-06`). **Status.** `BLOCKED`.

## 6. The 17-stage blueprint - MAREA FLEET

Product `FLEET`; editions `FLEET-START` (`DEFINED`), `FLEET-BUSINESS` (`DEFINED`) and
`FLEET-ENTERPRISE` (`CONTRACTED_TIER`, not a checkout SKU). An organisation SaaS subscribed per vessel per
month; onboarding quoted separately; eight frozen roles; server-side tenant isolation; telemetry read-only; no
SLA established. Every stage assumes a deployed multi-tenant platform and a signed data-processing agreement;
neither exists.

| Stage | User action | Touchpoint | Expected result | Required information | Failure mode | Recovery | Commercial opportunity | Trust / safety requirement | Acceptance evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1. Discovery | An operator looks for multi-vessel oversight; arrives from a B2B referral, a marina or a search landing | Proposed `/marea/fleet` (ES/EN); B2B contact; referral | Learns that FLEET is a *defined* internal design with no deployed service, no security certification and no service level | Category; SaaS nature; security honesty; absence of an SLA; read-only telemetry boundary | Assumes remote control; assumes a security certification exists; assumes instant alerts | FLEET limitation statement and the read-only boundary shown; no checkout CTA | B2B pipeline and the honest conversation that qualifies it | No control path; no fabricated SLA; no security certification implied | Page shows lifecycle, no price/checkout CTA, limitation statement verbatim, no control wording |
| 2. Product understanding | Reads what is managed: vessels, roles, maintenance, documents, telemetry | Capability and boundary blocks; tenancy explainer | Can state: "it organises my fleet; it does not steer anything; telemetry depends on my WATCH/HUB systems and a contract" | Scope; the eight roles; telemetry source; explicit limits; onboarding | Assumes FLEET includes WATCH hardware; assumes it can control a vessel | Boundary block above the benefits; role model summary | Correct scoping and correct tier selection | Telemetry read-only; no control; no "unlimited" | Every capability row carries a status and an explicit limit |
| 3. Organisational assessment | Answers questions on vessel count, bases, roles, telemetry sources and procurement needs | Assessment (D5); onboarding scoping | Exactly one honest outcome: fits Start, fits Business, requires a contracted approach, or is outside the current scope | Organisation size; vessel list; telemetry systems; integration needs; procurement requirements | Assumes any fleet fits; hides multi-base complexity; assumes integrations exist | Assessment and refusal rules; no suitability statement before the assessment | Onboarding and proposal opportunity | No universal-compatibility claim; no implied integration | Assessment record; outcome in the agreed vocabulary |

| 4. Editions | Compares Start, Business and Enterprise | Edition block (D4 §4); proposal | Understands governance depth — permissions, workflows, reporting, integrations — and that Enterprise is a contract, not a plan | Edition differences; limits; the fact that security is identical in all tiers | Believes Business is "more secure"; believes Enterprise is a checkout tier with an SLA | Security-is-not-a-tier statement; `CONTRACTED_TIER` explanation | Correct tier selection and a defensible proposal | No security upcharge; no fabricated SLA; no implied checkout | Edition copy matches D4 row by row; `CONTRACTED_TIER` label present |
| 5. Price comprehension | Learns the per-vessel, per-month model and what is separate | Pricing-state block; proposal | Understands every cost component: per-vessel subscription, organisation fee position, seats, onboarding, limits and VAT treatment | Per-vessel model; onboarding separate; explicit limits; VAT excluded; no "unlimited" | Assumes an all-inclusive price; assumes unlimited users or storage | Cost-component explanation; no figure customer-facing | Avoids pricing disputes and hidden-fee accusations | Explicit limits; no hidden fee; no unbounded promise | No figure on any surface; all components listed |
| 6. Purchase or contract | Requests a proposal; receives a quotation or a contract | B2B proposal workflow (future MC-26) | A documented next step; for Enterprise, a contract — never a self-service order at `DEFINED` | Procurement data; contract scope; data-processing agreement; terms | Assumes instant signup; assumes standard terms; assumes an SLA | Proposal workflow; contract review; no order state | B2B revenue with a defensible scope | No payment at `DEFINED`; seller identity and terms `OPEN` | Proposal record; no order entity; contract review evidence for Enterprise |
| 7. Fulfilment and provisioning | Tenant provisioned and onboarding scheduled after signature | Provisioning; onboarding plan | Organisation created, agreement and data-processing terms signed, workspace ready, onboarding scheduled | Legal entity; owner; agreement; DPA; onboarding plan | Tenant misprovisioned; wrong owner; no DPA before data | Re-provisioning; contract review; provisioning approval | Onboarding revenue and a clean tenant birth | Data-processing agreement before any vessel data; least privilege from the first account | Provisioning record with the signed agreement and DPA |
| 8. Installation and setup | Onboarding: vessel import, role design, telemetry binding, integrations | Onboarding session; import tools | Vessels and roles configured, telemetry sources bound, limits visible, no cross-tenant pollution | Vessel data; role design; telemetry credentials; integration list; limits | Import errors; role sprawl; telemetry not bound; wrong tenant | Onboarding support; import rollback; re-binding | Onboarding is a quoted service and the quality gate | Tenant scope enforced during import; least privilege; no test data in production | Onboarding checklist; tenant-scope test during import |
| 9. Activation | First login, owner verification, member invitations, vessel assignments | Account; invitation flow | Organisation active with least-privilege roles, verified owner and audit events | Identity; consent/privacy notice; roles; vessel assignments | Owner cannot activate; an invitation goes to the wrong domain; roles over-permissioned | Identity re-verification; invitation revocation; role correction | Activation metric and the first audit trail | Privacy notice before telemetry processing; every sensitive action audited | Activation test; audit entries for each action |
| 10. First use | Learns the dashboard, maintenance tasks, documents and what a telemetry gap means | Onboarding; help article | Can distinguish "no event" from "no telemetry"; knows alerts are not guarantees and that telemetry is read-only | State vocabulary; freshness; alert meaning; role meaning; read-only boundary | Assumes silence means all is well; assumes instant alerts; assumes control | Telemetry-gap display; support explainer; state examples | Habit formation and reduced support load | No inferred "the vessel is safe"; no guaranteed alert delivery; no control | Comprehension test on gaps and alert semantics |
| 11. Regular use | Runs daily operations, maintenance tasks, documents, reporting and permissions | Platform; work-order views; reports | An operational picture with tenant-scoped data, explicit limits and an audit trail | Freshness; permissions; limits; audit; workflow state | Stale telemetry treated as current; role confusion; report scope errors | State display; role review; report re-scope | Renewal and expansion; the Business upgrade case | Tenant isolation everywhere; read-only telemetry; no cross-tenant leak | Two-organisation usage test with isolation verified |
| 12. Updates | Platform updates, telemetry schema changes, integration changes | Release notice; change log | Changes communicated, no data loss, entitlements honoured, audit and permissions preserved | Change policy; maintenance window; rollback | Workflow breakage; integration break; telemetry gap during update | Rollback; support; change notice | Trust and retention | No silent change to audit, permissions or telemetry scope | Update and rollback record; change notice tested |
| 13. Support | Reports an issue; support access is scoped, audited and time-bound | Support; audited support access | A case with a diagnosis; support cannot bypass tenant scope and the customer can see the access | Symptoms; tenant id; user; time; audit evidence | Support asks for admin credentials; cross-tenant access; no evidence trail | Scoped support access; audit review; access expiry | Retention through trust | Support access documented, scoped, time-bound and audited | Support-access test with audit review |
| 14. Upgrade | Moves Start to Business, or moves to an Enterprise contract | Edition comparison; account; contract | An explicit entitlement change, data preserved, new limits visible, no hidden re-pricing | What changes; proration/term; limits; onboarding for new features | Data loss; double billing; hidden limits | Change order; billing correction; re-onboarding for changed workflows | Expansion revenue | No security upgrade gating; no unbounded promise | Upgrade test; data-preservation check; entitlement comparison |
| 15. Renewal or cancellation | Renews or terminates the subscription | Renewal notice; account; support | Clear notice, cancellation at term end, export window, deletion schedule and device detachment | Term; approved price; export window; deletion; retention position | Dark patterns; data held hostage; silent renewal | Export offer; termination checklist; explicit statement | Retention is the business; trust decides it | Own data portable; deletion scheduled and confirmed | Termination test; export and deletion records |
| 16. Ownership transfer | A vessel changes owner, or the organisation changes hands | Documented transfer procedure; support | Authorised, auditable transfer; previous access removed; records retained per policy; device implications stated | Transfer authority; consent; audit; WATCH/HUB device implications | Previous owner keeps visibility; new owner cannot access | Support-led transfer with re-verification and revocation | B2B continuity and second-hand vessel market | Privacy; audit; no silent billing transfer | Transfer test with two organisations; revocation verified |
| 17. End-of-life | The contract ends or the customer leaves the service | Account; support | Data exported, deletion confirmed, telemetry stopped, devices detached from FLEET, audit retained as required | Deletion policy; retention; confirmation; transition plan | Data retained; silent reporting continues; devices left bound | Deletion confirmation; detach checklist; audit review | Clean exit builds referral | Deletion honoured; no data held hostage; telemetry stops when the contract ends | Deletion and closure record; device-detachment verification |

**Critical dependencies for the FLEET journey.** (1) No multi-tenant platform, tenant isolation, telemetry
ingestion or entitlement service exists (`P-09`), so stages 7–17 cannot be executed. (2) No connectivity
contract or quantified coverage (`H-12`), so stages 8, 10 and 11 cannot be promised. (3) No security or privacy
architecture, device identity or incident-response model (`X-07`), so stages 9, 13 and 16 are blocked. (4) No
CRA-compliant vulnerability handling or secure update lifecycle (`H-13`), so stage 12 is blocked. (5)
AIS/general external data rights are unresolved (`D-09`, `D-10`), so telemetry-derived features are
conditional. (6) No cost, contract or customer evidence (`X-05`, `X-06`), so the proposal pipeline in stages
5–7 is a hypothesis. (7) Brand and imagery gates (`X-01`, `X-03`) block every customer-facing stage.

## 7. FLEET-specific journeys

All twelve are intended targets. None is implemented; none is a customer test. Role names are the frozen eight
of MC-07 brief §11.

### 7.1 FJ-1 — Organisation onboarding

- **Trigger.** A signed operator wants its fleet on the platform.
- **Intended customer experience.** A structured onboarding: organisation created, legal entity and owner
  verified, roles designed, vessels imported, telemetry bound, limits explained and a data-processing agreement
  in force.
- **Required behaviour.** No vessel or personal data processed before the agreement; least privilege from the
  first account; onboarding quoted separately and never hidden inside the per-vessel price; the organisation can
  see exactly what is configured.
- **Recovery.** Import rollback; re-provisioning; onboarding rescheduling; contract review if scope changes.
- **Evidence to close.** A complete onboarding rehearsal with a signed agreement, a tenant-scope test and a
  handover record. **Journey classification.** Intended target (`SPECIFIED_ONLY`); current evidence: none
  (`P-09`, `X-05`, `X-07`). **Status.** `BLOCKED`.

### 7.2 FJ-2 — Vessel addition

- **Trigger.** The operator adds a vessel to the organisation.
- **Intended customer experience.** The vessel is created with its identity, assigned to the right roles, bound
  to a telemetry source where one exists, and the addition is auditable.
- **Required behaviour.** No duplicate vessel identity; tenant-scoped creation; explicit telemetry source and
  consent; the vessel count and limits are visible; nothing is inferred from a similar vessel name.
- **Recovery.** Duplicate merge under authorisation with audit; source re-binding; removal of an erroneous
  vessel without orphaning history.
- **Evidence to close.** Vessel-creation test with duplicate and cross-tenant attempts. **Journey classification.** Intended target (`SPECIFIED_ONLY`); current evidence: none (`P-09`). **Status.** `BLOCKED`.

### 7.3 FJ-3 — Vessel ownership change

- **Trigger.** A vessel is sold, chartered to a new operator, or moved between organisations.
- **Intended customer experience.** An authorised, auditable transfer: the previous organisation loses access,
  the new one gains it, records follow the agreed policy, and any WATCH/HUB device binding is addressed.
- **Required behaviour.** Transfer requires authority from both sides where applicable; no silent transfer of
  billing; the audit trail records who authorised what; personal data of the previous owner is not exposed.
- **Recovery.** Reverse a transfer with authorisation and audit; support-led reconciliation if the device binding
  remains with the old organisation.
- **Evidence to close.** Two-organisation transfer test with revocation and audit verification. **Journey classification.** Intended target (`SPECIFIED_ONLY`); current evidence: none (`P-09`, `X-07`).
  **Status.** `BLOCKED`.

### 7.4 FJ-4 — Work order creation

- **Trigger.** A maintenance manager needs a repair, inspection or service action on a vessel.
- **Intended customer experience.** On Business, a structured work order: description, vessel, assignment,
  approval where configured, evidence (notes/photos), closure and history. On Start, a maintenance task with the
  same record discipline but without configurable approval workflows.
- **Required behaviour.** Tenant-scoped; assignments respect roles (`MAINTENANCE_MANAGER`, `CREW_MEMBER`,
  `EXTERNAL_INSTALLER`); no work order can grant control of a vessel; closure evidence is retained.
- **Recovery.** Reassignment; cancellation with reason; audit of every state change.
- **Evidence to close.** Work-order lifecycle test on Business and task lifecycle on Start, with role checks.
  **Journey classification.** Intended target (`SPECIFIED_ONLY`); current evidence: none (`P-09`).
  **Status.** `BLOCKED`.

### 7.5 FJ-5 — External technician access

- **Trigger.** A yard or technician needs to see a vessel's installation or telemetry to do a job.
- **Intended customer experience.** A scoped, time-bound, vessel-level `EXTERNAL_INSTALLER` grant that the
  organisation can revoke; the technician sees what the grant allows, not the organisation's account.
- **Required behaviour.** Least privilege; expiry by default; **the technician can never become an organisation
  admin and can never steer or control a vessel**; every access is audited.
- **Recovery.** Organisation revokes; support re-grants only with the organisation's consent; audit reviewed.
- **Evidence to close.** Grant, expiry, escalation-refusal and revocation tests with an audit review. **Journey classification.** Intended target (`SPECIFIED_ONLY`); current evidence: none (`X-07`, `P-09`).
  **Status.** `BLOCKED`.

### 7.6 FJ-6 — Admin role change

- **Trigger.** An organisation promotes, demotes or replaces an administrator.
- **Intended customer experience.** A deliberate, audited change: new role applied, old permissions removed,
  sessions invalidated where required, and the organisation is never left without an owner.
- **Required behaviour.** `ORGANIZATION_OWNER` and `ORGANIZATION_ADMIN` changes are audited and restricted to
  authorised actors; the last-owner protection rule is a stated requirement (exact rule `OPEN`); no self-service
  escalation from a lower role.
- **Recovery.** Reversal by the owner; support-assisted recovery only with identity verification and audit.
- **Evidence to close.** Role-change test including an attempted self-escalation and the last-owner case.
  **Journey classification.** Intended target (`SPECIFIED_ONLY`); current evidence: none (`X-07`, `P-09`).
  **Status.** `BLOCKED`.

### 7.7 FJ-7 — User revocation

- **Trigger.** A member leaves the organisation or loses the right to see its vessels.
- **Intended customer experience.** Access ends immediately: the membership is removed, sessions are invalidated,
  and the audit record shows who revoked what and when.
- **Required behaviour.** "Removed" means removed; no residual access through a cached session, export, report or
  background job; no data leakage to the departed user.
- **Recovery.** Re-invitation with a new identity verification; review of any export the user made while
  authorised (the export is a legitimate action, not a leak, if it was permitted at the time).
- **Evidence to close.** Revocation test with a live session and a background job, plus an audit review.
  **Journey classification.** Intended target (`SPECIFIED_ONLY`); current evidence: none (`X-07`, `P-09`).
  **Status.** `BLOCKED`.

### 7.8 FJ-8 — Monitoring outage

- **Trigger.** Telemetry stops: a WATCH/HUB device goes offline, connectivity fails, or an ingestion path breaks.
- **Intended customer experience.** The platform shows a gap with the last-known time; it never suggests that a
  silent vessel is a safe vessel; the alert wording does not promise instant or guaranteed notification.
- **Required display behaviour.** `TELEMETRY_GAP` with the last update age; `STALE` for values; an explicit
  statement of what the platform can and cannot know.
- **Required behaviour.** No inference, no fabricated position, no "everything is fine"; local vessel functions
  are unaffected; the customer keeps responsibility for the vessel.
- **Recovery.** Restore connectivity; investigate the device; use the marina or a person aboard; support can see
  the ingestion state but cannot steer or actuate anything.
- **Evidence to close.** Controlled outage test with the last-known-good display and the alert wording reviewed.
  **Journey classification.** Intended target (`SPECIFIED_ONLY`); current evidence: none (`H-12`, `D-09`).
  **Status.** `BLOCKED`.

### 7.9 FJ-9 — Cross-organisation access attempt

- **Trigger.** A user, an API call, a support action, a report, an export or a background job attempts to reach
  another organisation's data.
- **Intended customer experience.** The attempt is denied server-side, nothing is revealed about the other
  organisation, and the attempt is audited.
- **Required behaviour.** Never trust a client-supplied tenant id; enforce tenant scope on every sensitive
  operation; no enumeration through search, no cache bleed, no cross-tenant report, export or background job; no
  data in error messages.
- **Recovery.** Security review of the attempt; incident process `OPEN`; the customer is informed where required.
- **Evidence to close.** A documented isolation test suite covering direct access, search, export, background
  jobs and support tooling, with an independent security review. **Journey classification.** Intended target
  (`SPECIFIED_ONLY`); current evidence: none (`P-09`, `X-07`). **Status.** `BLOCKED`.

### 7.10 FJ-10 — Subscription upgrade

- **Trigger.** A Start customer needs workflows, reporting, integrations or a larger operation; or an Enterprise
  negotiation begins.
- **Intended customer experience.** An explicit entitlement change, data preserved, new limits visible, and no
  hidden re-pricing; Enterprise remains a contract, not a checkout plan.
- **Required behaviour.** Proration and term policy `OPEN`; no double billing; no loss of history; the new limits
  are published before purchase; security is not part of the upgrade.
- **Recovery.** Downgrade at term end with a stated consequence; billing correction for a duplicate charge.
- **Evidence to close.** Upgrade test with data preservation and billing reconciliation. **Journey classification.** Intended target (`SPECIFIED_ONLY`); current evidence: none (`P-09`). **Status.** `BLOCKED`.

### 7.11 FJ-11 — Export or deletion request

- **Trigger.** The organisation requests a copy of its data, or the deletion of some or all of it.
- **Intended customer experience.** A tenant-scoped export in a usable format, and a deletion that is executed,
  audited and confirmed, subject to stated legal retention.
- **Required behaviour.** Export and deletion are included in every edition, never an upsell; deletion is scoped
  and verified; audit records required for legal retention are kept only as long as required and stated; customer
  production data is never used by MAREA for its own purposes.
- **Recovery.** Re-export; deletion reversal is not promised and must be stated honestly as impossible once
  executed.
- **Evidence to close.** Export and deletion test with an audit review, plus a review of the published retention
  statement. **Journey classification.** Intended target (`SPECIFIED_ONLY`); current evidence: none
  (`P-09`, `X-07`). **Status.** `BLOCKED`.

### 7.12 FJ-12 — Contract termination

- **Trigger.** The subscription or the Enterprise contract reaches term and is not renewed, or is terminated.
- **Intended customer experience.** A clear end: service stops at the agreed date, data is exported, deletion is
  scheduled and confirmed, telemetry ingestion stops, and any WATCH/HUB devices continue under their own
  entitlements.
- **Required behaviour.** No data held hostage; no silent continuation of billing; no deletion before the export
  window closes; the termination checklist is documented and audited.
- **Recovery.** Reactivation within the stated window where policy allows; export remains available during the
  window.
- **Evidence to close.** Termination rehearsal with export, deletion and device-detachment verification.
  **Journey classification.** Intended target (`SPECIFIED_ONLY`); current evidence: none (`P-09`, `X-07`).
  **Status.** `BLOCKED`.

## 8. Cross-product journeys

All are intended end-state experiences and all are `SPECIFIED_ONLY`. No journey implies that a combination is
purchasable, and none transfers steering authority or control.

### 8.1 XJ-1 — DISPLAY + NAV + WEATHER (the helm picture)

- **Data flow.** Licensed charts and NAV software → DISPLAY presentation; licensed WEATHER entitlement → the same
  screen within its coverage; each data point keeps its source, time and validity.
- **Customer result.** One helm screen showing navigation and weather that the customer is actually licensed to
  see, with explicit states when something is missing.
- **Boundary.** Three separate purchases; DISPLAY never includes NAV or weather; no data is redistributed; no
  control path.
- **Blocked today.** `D-01`, `D-05`, `D-06`, `D-10`, `H-11`, `P-07`; no validated integration.
- **Acceptance evidence.** A recorded integration test proving provenance display and honest unavailable states,
  with a review that no control channel exists.

### 8.2 XJ-2 — DISPLAY + HUB + AIS (the integrated helm)

- **Data flow.** AIS receiver (receive-only) → HUB → DISPLAY presentation of targets; HUB normalises instruments;
  DISPLAY presents.
- **Customer result.** A single helm view of traffic and instruments without implying collision avoidance or
  universal compatibility.
- **Boundary.** AIS hardware, HUB and installation are separate purchases; AIS is receive-only; the display is
  never a collision-avoidance system.
- **Blocked today.** `H-04`, `D-10`, `H-11`, `P-07`; no validated path.
- **Acceptance evidence.** An integration test proving AIS targets are labelled with age/source and that a HUB
  loss produces a visible state.

### 8.3 XJ-3 — WEATHER + NAV (one ledger, no double billing)

- **Data flow.** One account, one entitlement ledger; NAV consumes WEATHER data where the provider rights allow;
  WEATHER may be bought standalone.
- **Customer result.** Weather is bought once and appears in both products without a duplicate charge.
- **Boundary.** NAV Pro may include WEATHER Standard-equivalent read access only where provider rights allow
  (`CONDITIONAL`); the sharing is described exactly as implemented.
- **Blocked today.** `D-04`, `D-07`; entitlement and billing service not implemented in MC-07.
- **Acceptance evidence.** A shared-ledger billing test with two products and a no-double-charge audit.

### 8.4 XJ-4 — WEATHER + FLEET (licensed operational use)

- **Data flow.** Licensed forecast data → FLEET views for an organisation, only under a written provider
  agreement permitting B2B operational use.
- **Customer result.** An operator sees licensed forecasts for its fleet without the consumer subscription being
  stretched into a redistribution right.
- **Boundary.** `CONDITIONAL` on provider terms; FLEET does not include WEATHER; no redistribution; no
  operational safety verdict.
- **Blocked today.** `D-10`, `P-09`; no provider agreement.
- **Acceptance evidence.** A provider agreement review plus a data-flow test proving the B2B scope is enforced.

### 8.5 XJ-5 — FLEET + WATCH + HUB (read-only telemetry)

- **Data flow.** Customer-owned WATCH/HUB systems → FLEET read-only ingestion under a written contract; alerts
  and status only; no commands returned.
- **Customer result.** An operator sees vessel state across the fleet without turning WATCH into a fleet
  platform or FLEET into a remote helm.
- **Boundary.** Three separate entitlements; no inclusion either way; telemetry read-only; no steering, motor or
  remote-control path; AIS-derived data retention unresolved.
- **Blocked today.** `D-09`, `H-12`, `P-09`; no contract or platform.
- **Acceptance evidence.** Tenant-isolation test with two organisations and a security review proving no command
  channel exists in either direction.

### 8.6 XJ-6 — The whole nine-product ecosystem

- **Data flow.** Sources → HUB → NAV and DISPLAY presentation; SENSE measured locally; WATCH ashore; WEATHER
  licensed separately; FLEET read-only for organisations; PILOT local and supervised only.
- **Customer result.** A coordinated picture in which steering stays local, supervised and inside the PILOT
  boundary, and everything else is read-only, licensed or advisory.
- **Boundary.** No bundle is decided (MC-08); no product includes another; no cloud path reaches an actuator; no
  double billing for the same entitlement.
- **Blocked today.** The union of every blocker above, plus end-to-end integration evidence; no product in the
  nine is `SUPPORTED` in any integration row.
- **Acceptance evidence.** A recorded whole-vessel test with every safety boundary inspected, once every
  underlying integration row is `SUPPORTED` with named evidence.

## 9. What the product displays when telemetry is stale or missing

Shared state vocabulary. Thresholds, windows and grace periods are `OPEN` engineering requirements and are never
invented here.

| State | Meaning | DISPLAY | WEATHER | FLEET |
| --- | --- | --- | --- | --- |
| `FRESH` | Received or generated within the current validity window | Value with source and timestamp | Data point with source, model run time, validity window | Telemetry value with source and age; last update visible |
| `STALE` | A previously valid value has not updated | Value remains visible, marked stale, with its age; never used as current | Forecast past its validity window, marked stale with its age; never presented as current | Telemetry last-known value with explicit age; a banner that the picture is not current |
| `LOST` | A source has not been heard for longer than its validity window | Source lost; reading unavailable; installation check suggested | Data unavailable; the last valid run may be shown aged | Telemetry gap; last-known time; no inference that the vessel is safe |
| `UNKNOWN` | A supported source is defined but has never produced a value | "Unknown — never received"; not a zero | "No data received yet"; not a default forecast | "No telemetry received yet"; the platform must not show a default position |
| `NOT_AVAILABLE` | The product cannot provide the value in this configuration | "Not available — reason" (no source, no entitlement, unsupported) | "Not available — not licensed, out of coverage, no valid run" | "Not available — no permission, no telemetry source, outside the contract" |
| `ENTITLEMENT_EXPIRED` | A licensed entitlement has lapsed or been cancelled | Licensed data presentation stops; base device functions continue | Forecast access stops; own records remain exportable | Licensed data stops; tenant records remain exportable per policy |
| `PROVIDER_UNAVAILABLE` | The licensed data provider is unavailable or no valid dataset exists | Weather presentation shows unavailable; attribution retained | Forecast unavailable with provider attribution retained; no unlicensed fallback | Provider-sourced data unavailable; other telemetry unaffected |
| `NO_PERMISSION` | The current user or organisation may not see the data | Not applicable (device-local) | Not applicable (account-level) | Server denies; no data leak, no enumeration; the attempt is audited |
| `TELEMETRY_GAP` | No telemetry has arrived for a defined interval | Not applicable | Not applicable | Explicit gap state with the last-known time; never "all clear" |

**Rules that apply everywhere.** (1) Never fabricate, interpolate or default a value. (2) Never present a stale
value as current. (3) Every value carries its source and its timestamp or age. (4) A missing value is a state,
not an error dialog. (5) The last-known-good value may be shown, but always with its age and a visual difference
from a live value. (6) Provider acceptance is never displayed as delivery, and delivery is never displayed as
acknowledgement. (7) A lapsed entitlement may never remove safety-relevant local status display or disable base
device functions. (8) Unlicensed data is removed rather than kept visible. (9) A telemetry gap is never rendered
as a safe state.

## 10. The no-steering and no-remote-control guarantee (applies to every journey above)

| Workflow | What it may do | What it must never do |
| --- | --- | --- |
| DISPLAY | Present navigation, instruments, AIS, weather and read-only PILOT status/alarms | Engage or disengage the pilot, change heading, send any command to an actuator or the helm, or act as a control head |
| WEATHER | Display licensed forecasts, provenance, validity and model comparison | Interact with any vessel system; present a safety verdict, a go/no-go decision or an official warning |
| FLEET | Display read-only telemetry, maintenance records, documents, roles and reports | Steer, actuate, start or stop a motor, change a vessel control, or expose any remote-control path |
| WATCH / NAV / HUB / SENSE (context) | Display status, publish bounded data, deliver alerts, consume validated measurements | Become a steering authority; command an actuator; host a control path |
| Website, shop, account | Sell, document, support, configure entitlements, export data | Provide any control surface for a vessel |
| Support tooling | Read diagnostics (scoped, audited, time-bound); verify entitlements; record a case | Steer, actuate, bypass the tenant scope, or access another organisation's data |
| Installer tooling | Commission locally with authenticated, physically initiated access | Leave a remote command path open; steer from off the vessel; become an organisation admin |

**Explicit statement.** No journey, workflow, app screen, API, support action or commercial process described in
this document lets DISPLAY, WEATHER or FLEET steer a vessel, engage the pilot, command the helm or control any
vessel system. Steering is local, supervised and inside the PILOT boundary only; none of the batch-03 products
touches it.

## 11. Acceptance criteria for later milestones

Numbering continues the D7 series from batch 02 (which ended at AC-14).

| # | Stage / journey | Implementing milestone | Testable acceptance criterion |
| --- | --- | --- | --- |
| AC-15 | Discovery, Edition choice (all three) | MC-20–22 catalog, D4 | Each page states `DEFINED`, not for sale, carries the mandated disclaimers and limitation statement verbatim, and shows no price, stock, order, subscription-start or delivery CTA |
| AC-16 | Product understanding | MC-20–22, D8 | Every capability block maps to a D4 row, carries its condition and limitation, and no unlabelled or unmeasured specification appears |
| AC-17 | DISPLAY compatibility, installation, commissioning | MC-24, MC-34, D5 | Compatibility returns only the agreed outcomes; two reference installations exist with signed installation and commissioning records |
| AC-18 | DISPLAY stale/missing, power interruption | MC-34, D5 | Each state in §9 is rendered and reviewed in ES/EN; a power-loss test shows no auto-resume; no fabricated or defaulted value appears |
| AC-19 | DISPLAY replacement and entitlement expiry | MC-27, MC-34 | Replacement rebinds identity and entitlements without double charging; an expiry test proves base functions continue and licensed data shows unavailable |
| AC-20 | WEATHER coverage and provenance | MC-21, MC-33, D2 | The coverage, horizon and variable list match the licensed provider terms; every data point shows source, run time and validity |
| AC-21 | WEATHER staleness, outage, dataset removal | MC-33, D2 | Stale, unavailable and provider-outage states are rendered; no unlicensed fallback or frozen rendering appears; a withdrawal rehearsal removes the data and notifies customers |
| AC-22 | WEATHER entitlement sharing and upgrade | MC-26, D4 | A shared-ledger test proves no double billing across NAV and WEATHER; a Standard-to-Pro upgrade applies a prorated credit and preserves records |
| AC-23 | WEATHER renewal, cancellation, export | MC-26/27, legal review | Cancellation and export behave as written; the export window is honoured; user-owned records are not deleted on lapse |
| AC-24 | FLEET onboarding and role model | MC-27, MC-35, D10 | Onboarding creates the organisation with the eight roles, least privilege, a signed DPA and an auditable record |
| AC-25 | FLEET tenant isolation and cross-organisation denial | MC-35, security review | A documented isolation suite denies cross-tenant direct access, search, export, reports, cache and background jobs; nothing leaks |
| AC-26 | FLEET external installer and support access | MC-27/28, X-07 | Scoped, time-bound, vessel-level installer access cannot escalate to admin; support access is scoped, audited and time-bound |
| AC-27 | FLEET revocation and admin role change | MC-27, X-07 | A removed member loses access immediately including live sessions and background jobs; the last-owner rule is stated and enforced |
| AC-28 | FLEET work orders and reporting | MC-27, D3 | Work-order lifecycle respects roles and limits on Business; reporting is tenant-scoped and correct |
| AC-29 | FLEET monitoring outage | MC-35, D10 | A telemetry gap is displayed with the last-known time and never rendered as a safe state; alert wording promises neither instant nor guaranteed delivery |
| AC-30 | FLEET export, deletion and contract termination | MC-27, MC-28, legal review | Export and deletion are tenant-scoped, audited and confirmed; termination detaches devices and stops ingestion without holding data hostage |
| AC-31 | No-steering and no-remote-control guarantee | MC-34/35, security review | A security review proves no command channel to any actuator, motor or helm exists from DISPLAY, WEATHER, FLEET, support or installer tooling |
| AC-32 | Price and claim discipline | MC-25/26, D4/D6 | Only the frozen hypotheses exist internally; no customer touchpoint shows a figure; `DISPLAY-LARGE-CONDITIONAL` and `FLEET-ENTERPRISE` have no price; no SLA, certification or measured display figure appears |

## 12. Non-assertions

This document does not assert that any stage is implemented, priced, approved, certified, tested, available or
supported. It creates no offer, stock record, delivery date, support SLA, installation time or price, warranty
period, compatibility result, data entitlement, tenancy capability, forecast coverage or legal clearance. MAREA
DISPLAY, MAREA WEATHER and MAREA FLEET are `DEFINED` and `NOT_FOR_SALE`; no display hardware exists; no
provider is licensed; no multi-tenant service is deployed; no service level exists; `PUBLICATION = BLOCKED`;
trademark clearance is `NOT_GRANTED`; OPEN-MARINE source rights are `NOT_CLEARED`; image generation is
`BLOCKED`. MAREA is a proposed brand and is not presented as a registered trademark. No workflow in this
document lets DISPLAY, WEATHER or FLEET steer a vessel or control any vessel system, and no journey was tested
with a customer.

Related documents: `docs/marea/products/README.md` §16, §19, §22; `PRODUCT-EDITIONS-DISPLAY-WEATHER-FLEET.md`
(D4); the batch-03 compatibility, pricing and asset documents (D5, D6, D9); the batch-03 dossiers
`MAREA-DISPLAY-COMMERCIAL-SPEC.md`, `MAREA-WEATHER-COMMERCIAL-SPEC.md` and
`MAREA-FLEET-COMMERCIAL-SPEC.md` (D1–D3); `CUSTOMER-JOURNEYS-NAV-HUB-AIS.md`;
`CUSTOMER-JOURNEYS-PILOT-SENSE-WATCH.md`; `COMMERCIAL-BRAND-CLAIMS-POLICY.md`;
`MC-02-BLOCKERS-AND-DECISIONS.md`.
