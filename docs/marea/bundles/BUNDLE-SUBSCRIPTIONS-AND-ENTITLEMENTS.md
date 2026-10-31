# MAREA — Bundle subscriptions and entitlements (MC-08 / D10)

| Field | Value |
| --- | --- |
| Document ID | MC-08 / D10 / BUNDLE-SUBSCRIPTIONS-AND-ENTITLEMENTS |
| Milestone | MC-08 (Master Prompt 08/36) — complete commercial solution bundles, configuration rules, compatibility, subscriptions and unit economics |
| Deliverable | D10 — one commercial entitlement matrix across the six bundles, plus the fundamental isolation table |
| Owner function | Vessel Monitoring and Sensor Specialist (Agent C) |
| Status | `INTERNAL` / `NOT PUBLISHED` / `NOT FOR SALE` / `DEFINITION ONLY` |
| Lifecycle | All six bundles `DEFINED` internally; `NOT_FOR_SALE`; publication `INTERNAL_ONLY` |
| Brand clearance | `NOT_GRANTED` (MAREA is a proposed brand) |
| Price status | `HYPOTHESIS_UNAPPROVED` / `NOT_ESTABLISHED` / `OPEN` — this is **not** a price list |
| Billing state | **No real billing, billing provider, entitlement server or subscription service is implemented** |
| Base commit | MC-07 HEAD `80c66c70a1bab6f11c5ba5709baa4c1671f1d6da` |
| Branch | `feature/marea-mc08-bundles-commercial-architecture` |
| Date | 2026-10-30 |
| Write scope | This file only |
| Contract authority | `docs/marea/bundles/BUNDLE-ARCHITECTURE.md` §3 (vocabulary), §5 principles 6–7 and 10, §6 (reference compositions), §8 (cross-bundle rules); `docs/marea/products/README.md` §16 rule 7, §17, §19, §25 rule 6–7, §31 |
| Decisions consumed | `DECISION-LOG.md` D-007 (lifecycle/readiness), D-008/D-011 (editions, safety never edition-gated), D-010 (notification + isolation), D-013 (one WEATHER ledger, no double billing), D-014 (FLEET per vessel), D-015 (safety/security/portability never edition features), D-018 (bundle contract type), D-020 (PROTECT sensor counting), D-023 (historical price verdicts), D-024 (bundle asset identity) |
| Is not | A price list; a billing design; a contract; a terms-of-service; a tax or VAT opinion; an availability statement; a licence grant; a sale |

This document fixes **the entitlement model of the six MC-08 bundles**: which recurring or one-off rights each bundle
grants, who holds them, what they never include, how duplicate charging is prevented, and — most importantly — which
independent local safety functions no commercial entitlement may ever disable. It is a specification, not an
implementation. No billing, entitlement server, subscription service or ledger exists in this repository.

## 0. Contents

1. The one rule, and what this document is not
2. Vocabulary and authority
3. One entitlement ledger — the model
4. Commercial entitlement matrix across the six bundles
5. NAV entitlement block
6. WEATHER entitlement block
7. WATCH entitlement block
8. FLEET (and MAREA FLEET package) entitlement block
9. Non-subscription families: HUB, AIS, DISPLAY, SENSE, PILOT
10. The fundamental isolation table
11. Explicit statements required by MC-08
12. Open items
13. Future acceptance criteria
14. Status statement

---

## 1. The one rule, and what this document is not

**No commercial state may disable a safety-relevant local function.** Expiry, non-payment, cancellation, refund,
grace-period exhaustion, an unreachable entitlement server, a cancelled bundle, a lapsed WEATHER entitlement, a
terminated FLEET contract or a locked account may degrade the **remote service and its presentation only**. It may
never disable PILOT manual steering behaviour, independent local steering control, valid local measurement, required
independent local alarms or an approved safety-critical fallback. This is a **design requirement of the
specification, not a tested behaviour**: there is no billing service to test it against
(`WATCH_SUBSCRIPTION_SERVICE = NOT_FOUND`; FLEET `NOT_IMPLEMENTED`; NAV/WEATHER entitlement implementation `BUILD`/absent).

This document is **not** a price list, a billing engine design, a payment-terms document, a tax position or a licence
grant. Amounts appear only as `HYPOTHESIS_UNAPPROVED` figures already permitted by the product contracts, or as
`NOT_ESTABLISHED`/`OPEN`. Nothing here makes a bundle purchasable, quotable or publishable.

---

## 2. Vocabulary and authority

| Term | Meaning in MC-08 |
| --- | --- |
| **Entitlement** | A right held by a customer account to use a defined software/service capability for a defined term, granted by an edition, subscription or bundle line |
| **Entitlement ledger** | The single logical record of what one customer account is entitled to. One account → one ledger; a bundle writes lines into it, it does not create a parallel book of rights |
| **One-off entitlement** | A perpetual hardware ownership plus the licence to use its on-device software inside the published support/update window |
| **Recurring entitlement** | A time-bounded service subscription: NAV subscription, WEATHER subscription, WATCH monitoring subscription, FLEET per-vessel subscription |
| **External entitlement** | A right supplied by a third party (chart licence, telecom/SIM data plan, licensed forecast provider, connectivity), explicitly outside the MAREA subscription |
| **Granted** | The ledger shows an active right. In this milestone no entitlement can be genuinely `GRANTED` in a live service, because no service exists |
| **No double charge** | The same granted entitlement is never billed twice, whether from a bundle, a standalone product or an upgrade |
| **Isolation** | The property that local safety-relevant functions continue regardless of commercial state |

The MC-08 inclusion vocabulary (`INCLUDED`, `REQUIRED_EXTERNAL`, `OPTIONAL`, `CONDITIONAL`, `NOT_INCLUDED`,
`INELIGIBLE`, `QUOTATION_REQUIRED`) is used unchanged from `BUNDLE-ARCHITECTURE.md` §3.3. The four internal
configuration outcomes (`CONFIGURATION_DEFINED_INTERNAL`, `COMPATIBILITY_EVIDENCE_REQUIRED`,
`SPECIALIST_SURVEY_REQUIRED`, `QUOTATION_REQUIRED`, plus `NOT_ELIGIBLE`, `PUBLICATION_BLOCKED`) are used unchanged
from §3.4. `ORDERABLE`, `FOR_SALE`, `APPROVED` and `PUBLISHABLE` are prohibited outcomes.

---

## 3. One entitlement ledger — the model

1. **One account, one ledger.** Every MAREA entitlement a customer holds is recorded in one ledger associated with
   one customer account. A second subscription for the same entitled capability is not created silently; the ledger
   records one right with its source (standalone purchase, bundle grant, upgrade credit).
2. **A bundle writes grants, not a second book.** Buying `START` writes a NAV entitlement line; later buying
   `PROTECT` writes WATCH and device lines and does not duplicate NAV. Buying a bundle does not create a new
   independent subscription for a capability the account already holds.
3. **Source attribution is mandatory.** Each ledger line records whether the entitlement came from a standalone
   product, a bundle composition, a trial (if ever approved) or an upgrade credit. The customer can see the source.
4. **No double charge for a granted entitlement.** If an entitlement is already active, a new bundle or upgrade
   recognises it and does not bill it again (conflict rule `CF-13`: a duplicated NAV/WEATHER entitlement charge is
   `NOT_ELIGIBLE`). The exact credit/proration arithmetic is `OPEN`; the rule is not.
5. **Upgrades are prorated, not stacked.** WEATHER Standard → Pro applies a prorated credit (D-013 hypothesis;
   arithmetic `OPEN`). A bundle upgrade that only adds a not-yet-held entitlement charges only for what is added.
6. **Downgrades/expiry are service-side only.** An expired recurring entitlement stops remote service for that
   capability after the documented grace period; it never removes local measurement, local alarms, local buffering,
   local steering behaviour or an approved safety fallback (conflict rule `CF-18`: any subscription gating steering,
   sensing or alarms is `NOT_ELIGIBLE`, never permitted).
7. **External entitlements are not ledgered as MAREA rights.** Charts, telecom data, licensed forecasts and
   third-party services remain third-party rights. The ledger may record their status for display purposes, but
   MAREA can never grant, transfer or guarantee a third-party right it does not hold.
8. **Nothing is implemented.** There is no billing provider, no dunning, no entitlement server, no proration engine,
   no invoice and no ledger record in this repository. Every statement in this section is a design requirement.

---

## 4. Commercial entitlement matrix across the six bundles

Reference compositions are those of `BUNDLE-ARCHITECTURE.md` §6. All amounts are `HYPOTHESIS_UNAPPROVED`; all
`OPEN`/`NOT_ESTABLISHED` cells are unresolved. **No cell in this table is purchasable.**

| Bundle | Reference composition | One-off hardware ownership | Consumer software subscription | Monitoring subscription | Data / connectivity entitlement | User / organisation entitlement | Retention | Renewal | Cancellation | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `START` | `HUB-STANDARD` + `NAV-PRO` | HUB appliance owned by the customer; no subscription attached to HUB | `NAV-PRO` annual subscription (EUR 149/yr hypothesis, unapproved) | None | Local vessel network only; cellular not required; charts licensed externally; no SIM/data included | One NAV account; NAV Pro multi-device (phone + tablet + desktop) | NAV logbook/history per NAV policy; HUB local retention short window `OPEN` | Annual, stated before charge; price-change notice; auto-renewal rule `OPEN` | Export of own routes/waypoints/log before termination; window `OPEN`; HUB local function continues offline | `DEFINED` / `NOT_FOR_SALE`; compatibility evidence required; charts `D-01` |
| `CRUISE` | `NAV-ESSENTIAL` + `HUB-STANDARD` + `AIS-RECEIVER` + `DISPLAY-7` | HUB, AIS receiver and DISPLAY device owned by the customer; no subscription attached to AIS or DISPLAY base software | `NAV-ESSENTIAL` annual subscription (EUR 99/yr hypothesis, unapproved) | None | Local network; AIS is receive-only and not an entitlement; charts licensed externally; no SIM/data included | One NAV account; Essential is single-device; display presents NAV only when that separate NAV entitlement exists | NAV logbook; DISPLAY/HUB local retention `OPEN`; AIS targets not retained beyond the defined scope (`D-09`) | Annual NAV renewal; device warranties separate; price-change notice | Export of own records; local devices keep base function; NAV access ends per its own term | `DEFINED` / `NOT_FOR_SALE`; AIS/DISPLAY hardware and chart rights `BLOCKED` |
| `SAIL` | `NAV-PRO` + `HUB-STANDARD` + `PILOT-COASTAL` (`QUOTATION_REQUIRED`) + `SENSE-WIND` (`CONDITIONAL`) | HUB, SENSE-WIND and the quoted PILOT installation hardware owned by the customer; PILOT carries **no** subscription | `NAV-PRO` annual subscription (EUR 149/yr hypothesis, unapproved) | None | Local network only; no connectivity required for local steering/measurement; charts licensed externally | One NAV account; Pro multi-device; PILOT has no user-seat entitlement (local control head) | NAV logbook; SENSE local indication; PILOT records per quotation; all windows `OPEN` | NAV annual; PILOT/SENSE/HUB have no renewal; quotation terms `OPEN` | Export of own records; **local steering and measurement continue**; PILOT safety path independent of commerce | **`BLOCKED`** — `PILOT_SAFETY_GATE = BLOCKED`; full installed price `NOT_ESTABLISHED` |
| `PROTECT` | `WATCH-CORE` + `SENSE-ESSENTIALS` kit (expands to `SENSE-POWER` + `SENSE-BILGE`) | WATCH device and the two SENSE modules owned by the customer; on-device software licence inside support window | None | **Required** WATCH monitoring subscription per vessel (from EUR 9.90/month hypothesis; contents `OPEN`) | Cellular SIM/data plan **required external** and separate; coverage/roaming `OPEN`; no SIM/data in hardware price | Owner + family/crew (W07) + time-limited technician/installer (W08) within a small allowance; organisation sharing `NOT_INCLUDED` | Short history window intended for Core; values `OPEN`; data-class schedule `OPEN` | Monthly billing intended (`HYPOTHESIS_UNAPPROVED`); term confirmation, price indexation and grace period `OPEN`; stated before charge | Remote service stops after effective date; **local measurement, local alarms and local buffering continue**; export offered | `DEFINED` / `NOT_FOR_SALE`; `WATCH_*` service components `NOT_FOUND`; historical EUR 399 not cost-justified |
| `COMPLETE` | `NAV-PRO` + `HUB-PRO` + `DISPLAY-7` + `WATCH-CORE` + `SENSE-POWER` + `SENSE-BILGE` + `SENSE-TANKS` + `SENSE-ENV` + `PILOT-COASTAL` (`QUOTATION_REQUIRED`) | HUB-PRO, DISPLAY, WATCH and four SENSE modules owned by the customer; PILOT quoted installation owned by the customer | `NAV-PRO` annual subscription (EUR 149/yr hypothesis, unapproved) | **Required** WATCH monitoring subscription per vessel (from EUR 9.90/month hypothesis; contents `OPEN`) | Cellular SIM/data plan **required external** per connected device; charts licensed externally; no SIM/data included | NAV Pro multi-device; WATCH roles W07/W08; no fleet tenancy; PILOT local only | Combined but separately governed: NAV history, WATCH history `OPEN`, HUB local window `OPEN` | NAV annual; WATCH per its own term; PILOT/SENSE/DISPLAY/HUB no renewal | Export of own records; **all local safety functions continue**; remote WATCH service stops; NAV access per its own term | **`BLOCKED`** — multiple subsystem gates; turnkey price `NOT_ESTABLISHED`; "certified supervised pilot" in the portfolio minimum-content row is `NOT_EVIDENCED` (see §11) |
| `FLEET package` | `FLEET-START`/`FLEET-BUSINESS` subscription + onboarding + registration/migration + training + support; hardware/connectivity/installation optional | **Hardware never included by default**: WATCH/HUB/SENSE/DISPLAY are optional, separately purchased, with their own subscriptions/connectivity | None from the bundle beyond FLEET itself; NAV/WEATHER not included | None included (WATCH is optional and retains its own subscription) | Cellular data **required external** per connected device; no data allowance inside the SaaS fee | Organisation with the eight frozen roles; seats included per hypothesis (`OPEN`); explicit limits, never unlimited | Tenant-scoped data; retention windows `OPEN`; export/deletion included in every edition | Monthly per vessel, VAT excluded; organisation fee hypothesis none (`OPEN`); price change per contract | Contract termination stops read-only telemetry and SaaS access; **local functions and other products' entitlements continue**; export/deletion offered | `DEFINED` / `NOT_FOR_SALE`; FLEET service `NOT_IMPLEMENTED`; no SLA (`NO_SLA_ESTABLISHED`) |

### 4.1 Entitlement object register

| Entitlement object | Granted by | Held by | Term | Can it ever be duplicated? |
| --- | --- | --- | --- | --- |
| `ENT-NAV` | `NAV-ESSENTIAL` or `NAV-PRO` subscription, standalone or bundle | Customer account | Annual (hypothesis); renewal terms `OPEN` | No — one NAV entitlement per account; Essential/Pro are the same product ledger with different capability grants |
| `ENT-WEATHER` | `WEATHER-STANDARD` / `WEATHER-PRO`, standalone, or NAV Pro read access only where provider rights allow | Customer account | Annual (hypothesis) | No — one WEATHER entitlement per account (D-013) |
| `ENT-WATCH` | `WATCH-CORE` monitoring subscription, standalone or `PROTECT`/`COMPLETE`/optional FLEET package | Customer account, per vessel | Monthly intended (`HYPOTHESIS_UNAPPROVED`); term confirmation `OPEN` | No — one monitoring entitlement per device/vessel; a second bundle must recognise it |
| `ENT-DEVICE-WATCH` | `WATCH-CORE` hardware purchase | Customer, bound to one vessel | Perpetual hardware + support window `OPEN` | Not a subscription; a replaced/revoked device is rebound, never double-held |
| `ENT-SENSE-LOCAL` | `SENSE` module purchase (`SENSE-ESSENTIALS` is packaging for its two modules) | Customer | Perpetual hardware | Not a subscription; no connectivity of its own; duplicate module lines are rejected (§6 of the PROTECT spec) |
| `ENT-FLEET` | `FLEET-START` / `FLEET-BUSINESS` / `FLEET-ENTERPRISE` | Customer organisation | Monthly per vessel, VAT excluded | No — one organisation subscription per vessel; hardware is never included |
| `ENT-HUB` | `HUB` product purchase | Customer | Perpetual hardware + on-device software licence | Not a subscription; no recurring entitlement attaches; ownership registration/transfer included |
| `ENT-AIS` | `AIS` product purchase | Customer | Perpetual hardware (receive-only) | Not a subscription; no recurring entitlement attaches; AIS-derived rights remain `NOT_CLEARED` |
| `ENT-DISPLAY` | `DISPLAY` product purchase | Customer | Perpetual hardware + base software included with the device | Not a subscription; charts, NAV, WEATHER and adapters are separate and never included |
| `ENT-PILOT-LOCAL` | Quoted vessel-specific installation (`PILOT-COASTAL`/`SAIL`/`PRO`) | Customer | Perpetual hardware + support; no subscription | No recurring entitlement; no firmware licence check on the control path; safety path identical in every edition |
| `ENT-CHART` | Licensed chart data right (external provider) | Customer account / licensed region | Per provider terms | External licensed data, never a MAREA product feature or owned data; never billed twice with the same chart right |
| `ENT-SIM` | Cellular SIM/data plan (external connectivity provider) | Customer account, per connected device | Per provider terms (hypothesis monthly) | External contract; never included in a hardware or subscription hypothesis; never gates local functions |
| `ENT-CLOUD-MONITORING` | The WATCH monitoring subscription's cloud service component | Customer account, per vessel | Same term as `ENT-WATCH` | Never sold or granted separately from an active WATCH monitoring subscription; no subscription-free cloud monitoring |

---

## 5. NAV entitlement block

| Item | Entitlement decision | Status |
| --- | --- | --- |
| **Included edition** | Reference configurations: `START`, `SAIL` and `COMPLETE` carry `NAV-PRO`; `CRUISE` carries `NAV-ESSENTIAL`; `PROTECT` carries none; the `FLEET package` carries none (an operator may hold their own NAV separately). A bundle may not silently substitute an edition; the edition is justified by the stated outcome (Pro for live instruments/multi-device/offline/traffic interpretation; Essential for planning plus AIS target list/detail and licensed chart display). | `VERIFIED_REPO` (BUNDLE-ARCHITECTURE §6.1–§6.5); editions `DEFINED` |
| **Term** | Annual software subscription; hypothesis EUR 99/yr Essential and EUR 149/yr Pro, VAT-inclusive consumer retail, `HYPOTHESIS_UNAPPROVED`. Term is a hypothesis; no term is approved. | `HYPOTHESIS_UNAPPROVED`; `pricing = HYPOTHESIS_UNAPPROVED` |
| **Renewal** | Renewal date, term and entitlement set are stated before charge; price changes only with the advance notice the law requires; no dark patterns or fake urgency. Auto-renewal rules, grace period and price indexation are `OPEN`. | `OPEN` — no billing service |
| **Chart licensing** | Charts and tides are **licensed data rights**, never owned data and never a free feature of the subscription. Included only within the purchased coverage region and service terms; a wider region is a separate licensed entitlement. Provider rights are `BLOCKED` (`D-01`, `D-02`, `D-03`, `D-10`). No ECDIS, official-chart or global-coverage claim. | `BLOCKED`; `dataRights = NOT_GRANTED` |
| **Cancellation** | Cancellation preserves the customer's access to exportable own route/waypoint/log data before access ends; termination effective date stated; no fabricated continued access after expiry. Cancelling a bundle does not delete user-owned records. | `OPEN` — export implementation absent |
| **Data export** | The owner can export their own routes, waypoints, passage notes and logbook in a documented machine-readable format; the format and export window are `OPEN` (no 30-day default applied to NAV; only WEATHER has the D-013 hypothesis). | `OPEN` |
| **Offline rights** | `NAV-PRO` only, and only where the data licence permits offline storage in that region; `NAV-ESSENTIAL` has no offline regions. Offline storage is not a redistribution right. | `BLOCKED` (`D-01`, `D-03`) |
| **Device limitations** | `NAV-ESSENTIAL` is a single-device planning experience; `NAV-PRO` is the multi-device entitlement (phone + tablet + desktop). Multi-device is a real serving cost and a real Pro benefit, not a service-level guarantee. No device is supplied with NAV. | `TARGET`; no tested multi-device service |
| **Isolation** | NAV expiry/cancellation may never disable local steering, local measurement or local alarms of any MAREA hardware product the customer owns. | Design requirement (see §10) |

---

## 6. WEATHER entitlement block

| Item | Entitlement decision | Status |
| --- | --- | --- |
| **Standalone vs NAV-shared** | WEATHER may be bought **standalone** (`WEATHER-STANDARD` from EUR 49/yr, `WEATHER-PRO` EUR 89/yr, both `HYPOTHESIS_UNAPPROVED`, VAT basis `OPEN`) with no NAV subscription required. `NAV-PRO` may include WEATHER Standard-equivalent **read access only where provider rights allow**; until a provider agreement exists, NAV Pro includes **no** WEATHER entitlement. | `CONDITIONAL` (`D-04`, `D-07`); `BLOCKED` |
| **Bundle treatment** | No MC-08 reference configuration includes WEATHER. It is `OPTIONAL` as a separate licensed subscription in `START`, `CRUISE` and `COMPLETE`; never implied, never included, never discounted into a bundle price. | `OPTIONAL`; `NOT_INCLUDED` in reference compositions |
| **Duplicate-entitlement prevention** | One customer account, one entitlement ledger (D-013). If WEATHER is already active, a NAV surface or a bundle must recognise the entitlement rather than create a second charge. The same forecast entitlement is never billed twice across NAV and WEATHER. A Standard → Pro upgrade applies a prorated credit; the arithmetic is `OPEN`. | Rule frozen; implementation absent (no billing service) |
| **Model / region permissions** | Access is per provider, per variable, per declared area and horizon, per licence. Multiple models are shown **as models**, never blended into a fictional consensus. No redistribution, resale, public sharing or offline right is granted by API access. Attribution is retained. Coverage is limited to licensed sources; no accuracy percentage, "official warning authority" status or exclusivity may be claimed. | `BLOCKED` (`D-04`–`D-07`, `D-10`); `redistributionAllowed = false`; `offlineAllowed = false` |
| **Expiry behaviour** | On expiry (or cancellation after its defined window) the service shows an honest **unavailable** state; last valid data may be shown only with its age and an explicit unavailable marker; a fabricated, frozen or stale forecast is never rendered as current. Cancelling NAV never deletes user-owned WEATHER records (saved locations, preferences); a read-only export window applies (hypothesis 30 days, legal review). | `OPEN`/`CONDITIONAL`; design rule |
| **Provider-licence-change behaviour** | If a provider licence is lost, changed or not renewed, the affected variables become honestly unavailable with attribution retained; the programme never substitutes an unlicensed source and never invents a replacement forecast. The commercial position (refund, substitution, price change) is `OPEN` and must be written before sale. | `OPEN`; `BLOCKED` on provider contracts |
| **Isolation** | WEATHER expiry never affects local navigation-aid behaviour beyond the honest unavailable-state display, and never affects PILOT/SENSE/WATCH local functions. | Design requirement (see §10) |

---

## 7. WATCH entitlement block

| Item | Entitlement decision | Status |
| --- | --- | --- |
| **Hardware ownership** | The customer buys the `WATCH-CORE` device (EUR 299 `HYPOTHESIS_UNAPPROVED`) and owns it; the purchase includes the licence to use its **on-device software** inside the published support/update window. Hardware ownership is not a service licence, and the subscription is not a licence to keep the device working locally. | `BLOCKED` — `hardware = NOT_SELECTED` (`H-11`, `X-05`) |
| **Monitoring subscription** | Remote monitoring requires an **active monitoring subscription per vessel** (`from EUR 9.90/month HYPOTHESIS_UNAPPROVED`; monthly billing is the intended shape, term confirmation `OPEN`). Contents — connectivity cap, device count, included user count, history retention, included notification channels, escalation policy, VAT basis, roaming, activation fee — are `OPEN` and must be published before sale. The subscription does **not** include SIM/data connectivity cost. | `NOT_FOUND` — `WATCH_SUBSCRIPTION_SERVICE = NOT_FOUND` (`P-06`) |
| **Device identity** | Each device has a unique identity, provisioned credentials, ownership proof and a binding to one vessel and one verified owner account. Ownership transfer on sale, revocation on loss/theft and replacement are documented flows. Default/shared/printed credentials are prohibited. | `NOT_FOUND` — `WATCH_DEVICE_IDENTITY = NOT_FOUND` (`P-06`, `X-07`) |
| **Data plan / connectivity** | Cellular SIM/data is a **separate contracted external service**, never included in the hardware hypothesis or in the subscription hypothesis. Allowance, exhaustion order, roaming territories/costs and coverage are `OPEN`. No "unlimited", "worldwide", "included SIM" or "lifetime" claim. | `NOT_FOUND` — `WATCH_CONNECTIVITY_CONTRACT = NOT_FOUND` (`H-12`) |
| **Notification quotas and conditions** | No quota, channel set, attempt cap, evidence window, escalation window or time-to-live is established (all `PROPOSED`/`OPEN`). Hard conditions that are not negotiable: provider acceptance is not delivery; delivery confirmation is not human acknowledgement; an offline device cannot deliver; `DELIVERY_UNKNOWN` is a truthful visible outcome; no immediate/guaranteed/24-7 wording. | `OPEN`/`PROPOSED`; `WATCH_NOTIFICATION_PIPELINE = NOT_FOUND` |
| **Retention** | Core intends a **short** published history window; the value, the per-data-class schedule (monitored values, alert lifecycle, delivery evidence, acknowledgements, audit, support diagnostics) and the DPO sign-off are `OPEN`. No retention value may be invented. Export is offered before cancellation/deletion. | `OPEN` — retention schedule absent (`X-07`) |
| **Renewal** | Renewal date, term, entitlements and any change are stated before charge; renewal confirmed to the owner; failed charge enters a documented grace period and never disables local function; remote notifications resume on payment. Term, grace period and suspension order are `OPEN`. | `OPEN` |
| **Cancellation** | Cancellation is available in-product and by support; it states the effective date, what stops (remote notifications and shore storage) and what continues (local device function); export is offered before termination; no penalty or hidden step; account deletion is a separate verified action. | `BLOCKED` — no service or terms (`P-06`, `X-02`) |
| **Continued local sensor operation** | Local sensing, local alarms, local buffering, stale/unknown display, access revocation, audit and own-data export continue indefinitely without a subscription. A SENSE module never depends on a WATCH subscription for its local measurement. This is a design requirement, not a tested behaviour (`WATCH_SUBSCRIPTION_SERVICE = NOT_FOUND`, `WATCH_NOTIFICATION_PIPELINE = NOT_FOUND`). | `OPEN` — spec only |
| **Isolation** | WATCH subscription expiry, payment failure, cancellation or connectivity loss may never disable local steering (PILOT), local measurement (SENSE), local alarms or local buffering. | Design requirement (see §10) |

---

## 8. FLEET (and MAREA FLEET package) entitlement block

| Item | Entitlement decision | Status |
| --- | --- | --- |
| **Organisation subscription** | FLEET is an organisation SaaS subscribed **per vessel per month**, VAT excluded: `FLEET-START` from EUR 49/vessel/month and `FLEET-BUSINESS` EUR 79/vessel/month (`HYPOTHESIS_UNAPPROVED`); `FLEET-ENTERPRISE` is a `CONTRACTED_TIER` with `NOT_ESTABLISHED` price. | `HYPOTHESIS_UNAPPROVED` / `NOT_ESTABLISHED` |
| **Vessel count** | Every edition states an explicit vessel allowance/limit; **no edition promises unlimited vessels**. Suggested bands (Start 1–10, Business 11–50) are commercial segmentation aids, not enforced technical gates: an organisation must not be blocked from the tier that fits its operation merely because its count falls outside a suggested band. | `OPEN` — limits not frozen |
| **Plan edition** | `FLEET-START` includes tenancy, security, audit, dashboard, maintenance history/tasks, documents, conditional operational alerts, role administration, external-installer and support access, revocation, export/deletion and ownership transfer. `FLEET-BUSINESS` adds configurable permission sets, configurable workflows, reporting and API within explicit allowances. `FLEET-ENTERPRISE` is contracted scope only. | Editions `DEFINED`; platform `NOT_IMPLEMENTED` (`P-09`) |
| **Billing cadence** | Monthly, per vessel, VAT excluded; organisation fee hypothesis is none (`OPEN`, not approved); seats included, not charged per seat (`hypothesis`, `OPEN`); onboarding, installation, connectivity and hardware are separately quoted. | `OPEN` — no billing service |
| **Hardware exclusions** | **The per-vessel SaaS subscription never includes hardware.** WATCH, HUB, SENSE, DISPLAY and AIS are optional, separately purchased, with their own subscriptions and connectivity where applicable. The `MAREA FLEET package` may include them only as itemised optional lines with their own entitlements. | Frozen rule (`D-014`; BUNDLE-ARCHITECTURE §6.6, §8 rule 8) |
| **User / role limits** | The eight frozen roles (`ORGANIZATION_OWNER`, `ORGANIZATION_ADMIN`, `FLEET_MANAGER`, `MAINTENANCE_MANAGER`, `CREW_MEMBER`, `READ_ONLY_VIEWER`, `EXTERNAL_INSTALLER`, `EMBARCARTE_SUPPORT`) apply in every edition; server-side authorisation, revocation, audit, export and deletion are **never edition-gated**. Seats are included per hypothesis (`OPEN`); limits are explicit, never unlimited. | `TARGET`; `OPEN` limits |
| **Onboarding** | Organisation setup, vessel import, role design, training, device enrollment and initial data migration are real work, **quoted separately** (never inside the per-vessel hypothesis); onboarding is a service scope, not an entitlement. | `OPEN` — no onboarding price/scope |
| **Retention** | Tenant-scoped retention per data class; windows `OPEN`. No customer production data may be used for MAREA purposes. Export of organisational data and deletion with an audit record are included in every edition. AIS-derived retention/redistribution is `BLOCKED` (`D-09`). | `OPEN`/`BLOCKED` (`D-09`, `X-07`) |
| **Contract termination** | On termination, read-only telemetry ingestion and SaaS access stop per the contract; the organisation's own data can be exported and is deleted per the stated schedule; **local functions of any owned MAREA hardware and any separately held NAV/WEATHER/WATCH entitlement continue per their own terms**. No SLA is implied unless contracted with measurement evidence (`NO_SLA_ESTABLISHED` otherwise). | `OPEN` — no contract exists |

---

## 9. Non-subscription families: HUB, AIS, DISPLAY, SENSE, PILOT

| Family | Entitlement shape | Recurring subscription? | Notes |
| --- | --- | --- | --- |
| `HUB` | One-off hardware: appliance + on-device software licence inside support/update window; setup, diagnostics and local data use are not subscription-gated | **None** (`subscriptionHypothesis: null`) | Local-first: loss of the website/commercial connection never interrupts onboard functions. Data use remains operational independently. |
| `AIS` | One-off receive-only hardware; no service subscription; AIS data is not an entitlement and is not resold | **None** (`null`) | Receive-only; no transponder; no collision-avoidance claim; AIS-derived retention/redistribution `BLOCKED` (`D-09`). |
| `DISPLAY` | One-off hardware with base software entitlement; NAV/WEATHER/charts are separate subscriptions/licences and are never included | **None for the device** | A lapsed chart/weather entitlement shows an honest unavailable state; it never disables the device, local dashboards or safety-relevant status display. |
| `SENSE` | One-off module hardware; local measurement, calibration and local indication are included and never gated | **None** (`null`) | A module has no connectivity; remote alerts require WATCH + connectivity + an active subscription. |
| `PILOT` | Quoted vessel-specific installation; hardware + local supervised steering; **no subscription, no firmware licence check on the control path**; the safety path is identical in every edition | **None** (`null`) | No remote engage/disengage, no heading change, no remote or cloud steering command may ever depend on or be gated by a commercial entitlement. |

This confirms the MC-06 rule for the bundle layer: PROTECT and COMPLETE carry exactly two recurring MAREA
subscriptions (NAV annual and WATCH monitoring per vessel), one for the whole bundle where applicable; no bundle
invents a third MAREA subscription.

---

## 10. The fundamental isolation table

**Rule: a commercial entitlement event never disables an independent safety-relevant local function.** The table
states this for every relevant commercial event. All rows are **design requirements**, not tested behaviours; there
is no billing/entitlement service to test against.

| Commercial event | PILOT manual steering safety behaviour | Independent local steering control | Valid local measurement (SENSE) | Required independent local alarms | Approved safety-critical fallback | Evidence / status |
| --- | --- | --- | --- | --- | --- | --- |
| WATCH monitoring subscription expires | Not affected — PILOT carries no subscription and no firmware licence check sits on the control path | Not affected — local control head and manual takeover remain | Not affected — modules measure locally | Not affected — local alarms run on the device/uplink-independent logic | Not affected | `OPEN` — spec only; `WATCH_SUBSCRIPTION_SERVICE = NOT_FOUND`; `PILOT_SAFETY_GATE = BLOCKED` |
| WATCH payment failure / grace exhaustion | Not affected | Not affected | Not affected | Not affected | Not affected | `OPEN` — no billing |
| WATCH connectivity loss | Not affected | Not affected | Not affected | Not affected (local alarms independent of uplink) | Not affected | `OPEN` — no service |
| WATCH hardware failure / device replaced | Not affected — unrelated product | Not affected | Not affected | Local alarm behaviour of the replaced device is stated, but PILOT/SENSE remain unaffected | Not affected | `OPEN` |
| NAV subscription expires or is cancelled | Not affected | Not affected | Not affected | Not affected | Not affected | `OPEN` — no entitlement service |
| WEATHER entitlement expires / provider licence lost | Not affected | Not affected | Not affected | Not affected | Not affected | `OPEN`; honest unavailable forecast state only |
| FLEET organisation contract ends | Not affected | Not affected | Not affected | Not affected | Not affected | `OPEN` — FLEET `NOT_IMPLEMENTED` |
| Any bundle cancelled or refunded | Not affected | Not affected | Not affected | Not affected | Not affected | `OPEN` |
| Entitlement/billing server unreachable during a passage | Not affected | Not affected | Not affected | Not affected | Not affected | `OPEN` — failure must be visible and explained, never silently degraded |
| Account lockout / credential loss | Not affected — no local function depends on account login | Not affected | Not affected | Not affected | Not affected | `OPEN` |
| Device ownership transfer on sale of the vessel | Not affected — transfer revokes account access, not local function; stated warranty/subscription position | Not affected | Not affected | Not affected | Not affected | `OPEN` |

**What the isolation does *not* claim.** It does not claim that these behaviours have been demonstrated; it does not
claim that a disconnected device is safe; it does not claim that alerts were delivered; it does not create a safety
certification; and it does not override the PILOT safety gate (`BLOCKED`), the SENSE measurement gap
(`NOT_MEASURED`) or the WATCH service gap (`NOT_FOUND`). It is a frozen boundary that future billing, portal and
device work must implement and then test (`D-010`, `D-011`, `D-015`; README §16 rule 7).

---

## 11. Explicit statements required by MC-08

1. **No real billing is implemented.** There is no payment provider, subscription service, entitlement server,
   dunning process, invoice, proration engine or ledger record in this repository. `WATCH_SUBSCRIPTION_SERVICE =
   NOT_FOUND`; FLEET billing `NOT_IMPLEMENTED`; NAV/WEATHER entitlement mapping absent. Every entitlement here is a
   specification requirement.
2. **No double charge for the same granted entitlement.** One account, one ledger. A capability already granted is
   recognised, not rebilled — whether it arrives from a standalone product, a bundle, an upgrade or a cross-sell
   (conflict rules `CF-13`, `CF-18`). The proration/credit arithmetic is `OPEN`; the rule is frozen.
3. **NAV and WEATHER share one ledger (D-013).** NAV Pro may include WEATHER Standard-equivalent read access only
   where provider rights allow; WEATHER may be bought standalone; Standard → Pro applies a prorated credit; the same
   forecast entitlement is never billed twice; cancelling NAV never deletes user-owned WEATHER records (read-only
   export window hypothesis 30 days, legal review).
4. **FLEET is per-vessel SaaS and never includes hardware.** The per-vessel subscription excludes WATCH, HUB, SENSE,
   DISPLAY and AIS hardware, onboarding, connectivity, installation and any SLA unless separately contracted. The
   `MAREA FLEET package` is a separate itemised commercial solution, not the SaaS subscription.
5. **Entitlements do not make bundles sellable.** This matrix grants nothing and approves nothing. Publication,
   quotation and sale remain blocked by `X-01` (brand), `X-02` (seller identity), `X-05` (price/cost), `H-12`
   (connectivity), `P-06` (WATCH service), `P-09` (FLEET platform), `D-01`–`D-10` (data rights), `X-07`
   (privacy/identity) and `X-03` (images). No bundle is `ORDERABLE`, `FOR_SALE`, `APPROVED` or `PUBLISHABLE`.
6. **The portfolio's COMPLETE minimum-content row says "certified supervised pilot".** No certification exists
   (`H-06`, `PILOT_SAFETY_GATE = BLOCKED`) and none may be claimed. The word "certified" cannot be delivered by this
   programme and must not be published; the portfolio wording is recorded as an authority conflict (`OPEN` for the
   Lead/CPO) rather than silently adopted or edited. The same applies to any bundle text implying a certified or
   guaranteed monitoring service.
7. **Charts, forecasts, AIS-derived data and connectivity are external rights.** They are never represented as MAREA
   entitlements that could be transferred, guaranteed or bundled for free; their providers' terms govern.

---

## 12. Open items

| # | Open item | Why it is open | Owner |
| --- | --- | --- | --- |
| E-27 | WATCH subscription term, renewal, grace period, suspension order and price indexation | `WATCH_SUBSCRIPTION_SERVICE = NOT_FOUND`; no terms (`H-12`, `X-02`) | Commercial strategy + legal |
| E-28 | WATCH subscription contents: connectivity cap, device count, included users, history retention, notification channels | Service not built (`P-06`); connectivity not contracted (`H-12`) | Product + finance |
| E-29 | Retention windows and per-data-class schedule (WATCH, FLEET, NAV, WEATHER) | DPO and storage design pending (`X-07`) | Product + DPO |
| E-30 | NAV renewal/auto-renewal and export-window rules; export format | No billing/entitlement service exists | Commercial + legal |
| E-31 | WEATHER proration arithmetic, provider-rights mapping and licence-change commercial position | Provider agreements absent (`D-04`, `D-07`) | Product + finance + counsel |
| E-32 | FLEET organisation fee, seat allowance, vessel limits and onboarding scope | Platform not implemented (`P-09`); no contracts | Commercial + finance |
| E-33 | Cross-bundle credit/proration when a customer already holds an entitlement | No ledger/billing exists | Finance + product |
| E-34 | AIS-derived data retention/redistribution and any AIS entitlement | `D-09` legal review unresolved | Product + counsel |
| E-35 | Seller legal identity for all subscription terms and privacy notice | `X-02` | Company owner + counsel |

None of these may be filled with an invented value. `OPEN` and `BLOCKED` are legitimate states; the prohibited placeholder token is not used.

---

## 13. Future acceptance criteria

All are `NOT_EXECUTED`. None may be announced as achieved; a documentation review cannot substitute for an executed
test.

| ID | Criterion | Evidence required | Status |
| --- | --- | --- | --- |
| `D10-AC-01` | One account, one ledger: a customer holding NAV who buys a bundle containing NAV is not charged twice and the ledger shows one NAV line with source attribution | Ledger test; invoice test | `NOT_EXECUTED` |
| `D10-AC-02` | NAV/WEATHER no double billing (D-013): WEATHER standalone + NAV Pro read access never produces two charges; upgrade applies a prorated credit | Entitlement and billing test with two-account scenario | `NOT_EXECUTED` |
| `D10-AC-03` | WATCH subscription expiry and payment failure stop the remote service only; local measurement, local alarms and local buffering continue; export is offered | Entitlement-expiry and payment-failure tests; local-function test | `NOT_EXECUTED` |
| `D10-AC-04` | WATCH subscription renewal is stated before charge and confirmed; grace period is documented and enforceable | Billing/renewal test; notice-copy review | `NOT_EXECUTED` |
| `D10-AC-05` | WATCH cancellation states effective date and what stops/continues, offers export, and requires a separate account-deletion action | Cancellation flow test; export test | `NOT_EXECUTED` |
| `D10-AC-06` | FLEET per-vessel subscription never includes hardware; a hardware purchase is a separate line with its own entitlements | Contract/order test; composition review | `NOT_EXECUTED` |
| `D10-AC-07` | FLEET contract termination stops read-only telemetry and SaaS access only; local functions and other MAREA entitlements continue | Termination test; revocation test; local-function test | `NOT_EXECUTED` |
| `D10-AC-08` | Entitlement server unreachable: local safety-relevant functions continue and the failure is visible/explained, never silently degraded | Failure-injection test | `NOT_EXECUTED` |
| `D10-AC-09` | Account lockout does not disable local sensing, local alarms or local steering behaviour | Lockout test | `NOT_EXECUTED` |
| `D10-AC-10` | Ownership transfer updates the registered owner without extending/resetting warranty, and revokes previous access | Transfer/revocation records | `NOT_EXECUTED` |
| `D10-AC-11` | No bundle or entitlement surface presents a price, purchase CTA, availability, certification or guarantee claim | Claims/copy review of every surface | `NOT_EXECUTED` |
| `D10-AC-12` | No entitlement state, including an expired one, enables or disables any remote control path | Security boundary review; no control channel exists | `NOT_EXECUTED` |

---

## 14. Status statement

**Status of this deliverable.** `INTERNAL`, `DEFINITION_ONLY`, `NOT_FOR_SALE`, `NOT_PUBLISHED`. It defines one
commercial entitlement model for the six MC-08 bundles and the isolation boundary between commerce and local safety.
It implements no billing, creates no orderable SKU, approves no price, grants no licence, establishes no
compatibility and authorises no publication.

**This document does not assert:** any implemented subscription, billing, entitlement, ledger, proration or dunning
service; any granted entitlement in a live service; any measured availability, retention, delivery or SLA; any
provider agreement for charts, forecasts, connectivity or notifications; any certification; any trademark clearance;
any approved price, margin or discount; or any relaxation of the product-level gates
(`WATCH_INGESTION = NOT_VERIFIED`; `WATCH_NOTIFICATION_PIPELINE`, `WATCH_DEVICE_IDENTITY`,
`WATCH_SUBSCRIPTION_SERVICE`, `WATCH_CONNECTIVITY_CONTRACT` = `NOT_FOUND`; `SENSE_MEASUREMENT_ACCURACY = NOT_MEASURED`;
`PILOT_SAFETY_GATE = BLOCKED`; FLEET `NOT_IMPLEMENTED`; 0 compatibility rows `SUPPORTED`).

**Related MC-08 documents:** `BUNDLE-ARCHITECTURE.md` (D1); bundle specifications D2–D7 (including
`MAREA-PROTECT-COMMERCIAL-SPEC.md` D5); `BUNDLE-COMPOSITION-AND-EXCLUSIONS.md` (D8);
`BUNDLE-CONFIGURATION-RULES.md` (D9); `BUNDLE-PRICING-AND-UNIT-ECONOMICS.md` (D11);
`BUNDLE-INSTALLATION-AND-QUOTATION-MODEL.md` (D12); `BUNDLE-CUSTOMER-JOURNEYS.md` (D13);
`BUNDLE-CUSTOMER-COMPARISON.md` (D14); `copy/` bundle copy (D15); `BUNDLE-ASSET-REQUIREMENTS.md` (D16);
`bundle-definitions.json` (D17); `scripts/check-marea-bundles.mjs` (D18).
