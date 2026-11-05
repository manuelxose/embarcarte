# MC-22 — Technical facts and limitations (DISPLAY, PILOT, FLEET)

| Field | Value |
| --- | --- |
| Milestone | MC-22/36 — internal catalogue batch 3 |
| Kind | Product-truth documentation |
| Rule | Specified ≠ verified. Nothing in batch 3 is verified, certified, approved or available. |

Across all three families the canonical readiness is `engineering = NOT_VERIFIED`,
`compliance = NOT_STARTED`, `licensing = NOT_CLEARED`, `dataRights = NOT_GRANTED`,
`pricing = HYPOTHESIS_UNAPPROVED`, `availability = NOT_FOR_SALE`. A "specified" statement is a
`COMPLETE_TARGET_SPECIFICATION` intent, never a measured or shipped capability. `VERIFIED_REPO` in the
content contract is reserved for canonical status strings and design-boundary facts, never for an
unverified behaviour.

## 1. DISPLAY — specified vs verified

| Area | Specified (target) | Verified |
| --- | --- | --- |
| Product | Fixed marine multifunction display (panel, compute module, storage, enclosure, mounting, power conversion, base software) | ABSENT — no manufactured unit exists (`SIZE_NOT_FROZEN`, `HARDWARE_NOT_SELECTED`, `BOM_NOT_ESTABLISHED`) |
| Size / diagonal | Working label "DISPLAY 7" (commercial label only); "DISPLAY Large" conditional | ABSENT — no measured dimension, diagonal, resolution or screen format |
| Performance | Base software presents instruments, received AIS, NAV/WEATHER layers | NOT_VERIFIED — `measuredPerformance = false`; no brightness, resolution, IP rating, power, thermal or vibration figure |
| PILOT authority | Read-only PILOT status at most | ABSENT — `pilotControlAuthority = false`; never steering/engagement |
| Data rights | Charts/WEATHER/NAV as separate entitlements | ABSENT — `chartRightsGranted = false`, `dataRightsStatus = NOT_GRANTED` |

**Mandatory limitation set (rendered in `display.ts` limitations):** SIZE_NOT_FROZEN; HARDWARE_NOT_SELECTED;
BOM_NOT_ESTABLISHED; no measured performance; charts licensed separately; no PILOT control authority;
no price/stock/SKU/order.

**Prohibited statement classes for DISPLAY:** any physical dimension, resolution, brightness/nits,
environmental/IP rating, power consumption, thermal or vibration behaviour; any measured performance
figure; any PILOT control/steering authority; any warranty term; any price/stock/SKU.

## 2. PILOT — specified vs verified

| Area | Specified (target) | Verified |
| --- | --- | --- |
| Product | Supervised steering-assist (control head, control computer, independent motor-control electronics) | ABSENT — `safetyGate = BLOCKED`; nothing built or verified |
| Steering modes | HEADING_HOLD, WIND_ANGLE, ROUTE_FOLLOW | NOT_VERIFIED (HEADING_HOLD), CONDITIONAL_ON_VERIFICATION (WIND_ANGLE, ROUTE_FOLLOW) |
| Safety evidence | E-stop, motor isolation, rudder feedback | ABSENT — all `NOT_FOUND`; sea trials `seaTrialsCompleted = false` (NOT_PERFORMED) |
| Remote control | — | `remoteHelmControl = PROHIBITED` |
| Manual takeover | Design requirement (always possible) | NOT_VERIFIED — design requirement, not a tested function |

**Mandatory limitation set (rendered in `pilot.ts` limitations):** supervised-only; PILOT_SAFETY_GATE =
BLOCKED (not sold, not announced as safe, not presented as certified); sea trials not performed; safety
evidence NOT_FOUND; remote command PROHIBITED; steering modes NOT_VERIFIED/CONDITIONAL; not a certified
autopilot; no price/stock/SKU/order.

**Prohibited statement classes for PILOT:** autonomous/automatic/self-steering navigation; unsupervised or
hands-free or unattended operation; certified/homologated autopilot; safety-critical reliability;
regulatory or type approval; verified steering/helm integration; any sale or availability while BLOCKED.

## 3. FLEET — specified vs verified

| Area | Specified (target) | Verified |
| --- | --- | --- |
| Product | Multi-tenant B2B fleet-management SaaS (organisation, vessels, memberships, roles, read-only telemetry, maintenance) | ABSENT — `multiTenantProductionService = false` (NOT_IMPLEMENTED) |
| Tenancy | Server-side authorisation, default role NO_ACCESS, 8 roles, audit log | NOT_VERIFIED — design requirement, not deployed |
| Telemetry | Read-only presentation | ABSENT — `telemetryReadOnly = true`; no vessel-control path (`remoteControlPath = false`) |
| SLA / availability | — | `slaEstablished = false` (`NO_SLA_ESTABLISHED`); no monitoring/availability guarantee |
| Security certification | — | `securityCertificationClaimed = false`; `customerProductionDataUsed = false` |

**Mandatory limitation set (rendered in `fleet.ts` limitations):** NOT_IMPLEMENTED; NO_SLA_ESTABLISHED;
read-only telemetry; default role NO_ACCESS; no hardware included; no security certification; no
price/stock/SKU/order.

**Prohibited statement classes for FLEET:** any availability/uptime percentage or guaranteed availability;
any SLA or service contract; any included hardware; any deployed customer or production fleet; any security
certification (ISO 27001 / SOC 2); any unlimited plan; any vessel-control path.

## 4. Prohibited statement classes shared across all families

The guard (`scripts/mc20-catalog-guards.mjs`, `PROHIBITED_CLAIMS`) rejects, in both ES and EN: currency and
price amounts, price-amount ("precio desde N"), stock quantity, in-stock, add-to-cart/buy-now, checkout,
delivery dates, shipping promises, pre-order, ordering, positive availability, warranties, testimonials,
approved-by, homologated, positive certification, NMEA compatibility/certification, sea-trial completion,
positive guarantee, universal compatibility, collision avoidance, AIS transmission, forecast accuracy,
numeric accuracy percentages, SLA claims, IP ratings, and (batch-3) display dimension/resolution/brightness/
ingress/power, pilot autonomy/certification/unsupervised/regulatory-approval/helm-verified, and fleet
availability/hardware-included/deployed-customer/service-contract/security-certification.

## 5. The prohibited-claim guard is a heuristic backstop, not a proof of absence

`catalogClaimProblems` is an enumerated regex + clause-negation heuristic. Its module header and
`MC22-SECURITY-AND-ISOLATION-EVIDENCE.md` §8 state this explicitly: it rejects an enumerated family of
phrasings plus the tested variants, and it cannot enumerate the unbounded space of natural language. A
clean result is a supporting check, **not a guarantee** that no invented claim exists.

The **primary controls** are therefore:

1. the **typed bilingual content contract** (`src/app/marea-catalog/content/*`) — every block carries an
   evidence class and a canonical source reference, so unverified behaviour cannot silently masquerade as
   fact;
2. the **canonical-data cross-checks** in the validator (MC22-01..07 and MC20-02/06/08 read
   `product-definitions.batch-0{2,3}.json` and `product-families.json` directly and fail closed on
   `BLOCKED`/`NOT_FOR_SALE`/`SIZE_NOT_FROZEN`/`NO_SLA_ESTABLISHED`/`NOT_FOUND`); and
3. **human content review** (the binding independent review read all three family files in full and found
   no invented fact).

The guard plus its 70 unit tests and the accumulated 72-case adversarial matrix are a regression tripwire,
never the sole control. Residual paraphrases not in the enumerated vocabulary (documented as RES-04..06 and
review residuals RES-A..D) are accepted as documented limits of the backstop; none appears in shipped content.
