# MC-11 — Engineering feasibility assessment (D29)

Status: `INTERNAL_ENGINEERING_FEASIBILITY`. Milestone MC-11 of 36.
Branch: `feature/marea-mc11-hardware-sourcing-conformity`. Base: MC-10R HEAD
`67131782edaf8f3f8327ba79e5c5b4c554b137b0`. Date: 2026-11-02.
Owner: Lead (Chief Hardware Program Architect).

This assessment authorises **no** architecture freeze, no purchase, no supplier contact, no test, no
certification, no price approval and no publication. Its recommendations are engineering judgements
over the evidence committed in this milestone, not an approval to manufacture or sell anything.

## 1. Method

Six questions are answered separately and never collapsed into one score:

| Axis | Source in MC-11 | What it can and cannot say |
|---|---|---|
| Commercial attractiveness | MC-09 desk research (inherited, not re-run) | Hypotheses only; not demand evidence |
| Customer validation | **NONE** — MC-10 executed 0 interviews | Cannot rank hardware requirements |
| Technical feasibility | D3–D10 architecture analysis | Whether a credible candidate architecture exists |
| Manufacturing feasibility | D15–D18, D19–D22 | Whether a plausible route and cost structure exist, with unknowns |
| Legal readiness | D23–D26, D27–D28 | Which obligations apply; **no** conformity exists |
| Financial viability | Not established (MC-12/MC-13 own it) | Cannot be concluded from MC-11 |

Portfolio dimensions and weights were frozen in D2 §6 **before** scoring (hardware development
complexity 10, critical external dependencies 10, component availability 8, engineering cost exposure
10, conformity complexity 12, safety severity 12, maintenance burden 8, shared-platform benefit 8,
evidence quality 8, vendor dependency 6, time to physical validation 8; sum 100). Scores are integers
1–5 where 5 is most favourable, and a weighted score **never** overrides a hard gate.

## 2. Weighted portfolio scores (computed, not asserted)

| Family | HdW | Dep | Avail | Cost | Conf | Safety | Maint | Shared | Evid | Vendor | Time | **Weighted /5** | Hard gate |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| NAV | 5 | 2 | 5 | 4 | 4 | 4 | 3 | 2 | 3 | 3 | 5 | **3.68** | none |
| WEATHER | 5 | 1 | 5 | 4 | 4 | 4 | 3 | 2 | 3 | 1 | 5 | **3.46** | data rights NOT_GRANTED |
| FLEET | 4 | 2 | 5 | 3 | 3 | 4 | 2 | 2 | 3 | 2 | 4 | **3.14** | not implemented; no SLA |
| SENSE | 2 | 3 | 3 | 3 | 3 | 4 | 3 | 4 | 2 | 3 | 2 | **2.94** | accuracy unmeasured |
| HUB | 2 | 3 | 3 | 2 | 2 | 4 | 2 | 5 | 3 | 2 | 2 | **2.74** | RED/EMC, NMEA, lifecycle |
| WATCH | 2 | 1 | 3 | 2 | 2 | 3 | 2 | 4 | 2 | 1 | 2 | **2.20** | cellular/cloud dependency |
| DISPLAY | 1 | 2 | 2 | 1 | 2 | 3 | 2 | 4 | 2 | 2 | 1 | **2.00** | single panel source; size unfrozen |
| AIS | 1 | 1 | 2 | 1 | 1 | 2 | 2 | 3 | 2 | 2 | 1 | **1.58** | radio/type approval; transmit prohibited |
| PILOT | 1 | 1 | 2 | 1 | 1 | 1 | 1 | 2 | 1 | 2 | 1 | **1.22** | `PILOT_SAFETY_GATE = BLOCKED` |

Interpretation rules fixed in advance:

- A high score is **not** a launch decision. NAV (3.68) and WEATHER (3.46) score highest partly
  because they have no proprietary hardware — and both are blocked by data rights, not by tooling.
- PILOT's 1.22 is irrelevant to its disposition: the safety gate closes it regardless of any score.
- SENSE (2.94) scores above HUB because a module is simpler than a gateway; that does not make SENSE
  marketable — sensor accuracy is unmeasured and value is unvalidated.
- AIS (1.58) reflects radio/approval complexity, not impossibility of a receive-only integration.

## 3. Six-axis readiness (never one flag)

| Family | Commercial hypothesis | Customer validation | Technical feasibility | Manufacturing feasibility | Legal readiness | Financial viability |
|---|---|---|---|---|---|---|
| NAV | MC-09 hypothesis | NOT_VALIDATED | SOFTWARE_FEASIBLE | N/A (no hardware) | NOT_READY (chart rights) | NOT_ESTABLISHED |
| HUB | MC-09 hypothesis | NOT_VALIDATED | CREDIBLE_CANDIDATE (unfrozen) | PLAUSIBLE (incomplete cost) | NOT_READY | NOT_ESTABLISHED |
| AIS | MC-09 hypothesis | NOT_VALIDATED | RECEIVE-ONLY INTEGRATION CREDIBLE; hardware deferred | PARTIAL (integration only) | NOT_READY (RED/type approval) | NOT_ESTABLISHED |
| PILOT | quotation-based commercial model | NOT_VALIDATED | **BLOCKED** (safety gate) | NOT_AUTHORISED | NOT_READY | NOT_ESTABLISHED |
| SENSE | MC-09 hypothesis | NOT_VALIDATED | CREDIBLE_CANDIDATE (modules unfrozen) | PLAUSIBLE (incomplete cost) | NOT_READY | NOT_ESTABLISHED |
| WATCH | MC-09 hypothesis | NOT_VALIDATED | CREDIBLE_CANDIDATE (unfrozen) | PLAUSIBLE (incomplete cost) | NOT_READY (RED/CRA) | NOT_ESTABLISHED |
| DISPLAY | MC-09 hypothesis | NOT_VALIDATED | CREDIBLE_ONLY_WITH_SELECTED_PANEL | HARD (tooling, single source) | NOT_READY | NOT_ESTABLISHED |
| WEATHER | MC-09 hypothesis | NOT_VALIDATED | SOFTWARE_FEASIBLE | N/A | NOT_READY (provider rights) | NOT_ESTABLISHED |
| FLEET | MC-09 hypothesis | NOT_VALIDATED | SOFTWARE_FEASIBLE | N/A (no default hardware) | NOT_READY (CRA/GDPR role) | NOT_ESTABLISHED |

`NOT_READY` on the legal axis means *obligations identified, nothing obtained*: it is not a statement
that a product is illegal, it is a statement that no technical file, no test evidence and no
operator identity exist.

## 4. Family conclusions

1. **NAV — software-first, hardware-optional.** No proprietary hardware required. Remaining
   dependencies are licensed chart data (rights NOT_GRANTED) and a compatible local data source (HUB or
   third-party gateway). Do not build hardware for NAV.
2. **HUB — the only credible platform anchor, but unfrozen.** Engineering preference is the hybrid
   `ARCH-HUB-D` (MCU supervision + application processor, isolated NMEA 0183, optional isolated CAN),
   not the highest-scoring option: `ARCH-HUB-E` (software/service-first on third-party certified
   gateways) scores higher and is a **commercial strategy decision**, not a hidden discard. NMEA 2000
   is excluded from both editions; where the edition boundary does not specify an interface the record
   says `EDITION_INTERFACE_UNSPECIFIED` rather than assuming it.
3. **AIS — defer hardware, prohibit transmission.** Four products are separated. The admissible path is
   receive-only integration of third-party certified equipment plus software visualisation. MAREA
   receiver hardware is deferred; any transmitter is permanently out of scope in this programme stage.
4. **PILOT — not a hardware-cost question.** Disposition: `DEFER_SAFETY_CRITICAL_DEVELOPMENT` +
   `REQUIRES_QUALIFIED_SAFETY_ENGINEERING` + `BLOCKED_PENDING_FUNDING_AND_TEST_PLAN`. No actuator,
   motor driver, E-stop or steering output is designed, and no BOM is authorised for actuation.
5. **SENSE — credible modules, unproven measurements.** Five module candidates and three kits; the
   architecture is feasible, but no accuracy, calibration or ingress evidence exists. Publish no
   measurement claim. Prefer wired modules on a documented interface over a new radio per sensor.
6. **WATCH — credible, but the recurring chain is the risk.** A hybrid low-power device is feasible;
   the business risk is the cellular/cloud/alert chain, and a monitoring device that drains the
   monitored battery is a product-defeating failure mode. No guaranteed delivery exists.
7. **DISPLAY — the weakest hardware case.** Sunlight readability, optical bonding, sealing, thermal
   path and gloved/wet input are all unproven, the panel was single-source in this session, and size is
   not frozen. A tablet or an existing industrial HMI is a legitimate interim path; a custom display is
   a later, funded decision.
8. **WEATHER — licensed data, not hardware.** No proprietary sensor is necessary; provider rights are
   NOT_GRANTED, so no redistribution may be assumed.
9. **FLEET — software/service only.** No hardware by default; hardware remains a separate purchase.
   Tenancy, SLA and operational maturity are not implemented and must not be implied.

## 5. Portfolio decisions (engineering recommendations, not approvals)

**Candidate architectures worth a funded feasibility step (G3–G4 still unauthorised):**
`ARCH-HUB-D` hybrid gateway (with `ARCH-HUB-B` industrial SOM as fallback); WATCH hybrid monitoring
device; SENSE wired module family on a shared interface; DISPLAY integrated industrial HMI module.

**Could be software-only:** NAV, WEATHER, FLEET, and the software layers of HUB and AIS.

**Should integrate third-party certified hardware rather than build it:** AIS receive-only data,
GNSS where the module choice is not yet lifecycle-verified, wind/environment sensing, chart and
forecast data.

**Requires a custom PCB / carrier design:** HUB (carrier for a SOM or custom gateway), WATCH, SENSE
modules, DISPLAY carrier, and any future AIS receiver board. No schematic, stack-up, layout, tooling or
supplier engagement is authorised by this document.

**High conformity burden:** HUB, WATCH, DISPLAY (RED + EMC + CRA + radio/antenna integration) and AIS
(RED plus possible maritime equipment approval if a transmitter were ever proposed). Every one of the
22 assessed configurations is `APPLICABILITY_ASSESSED_NOT_CERTIFIED`.

**Unacceptable unresolved technical risk at this stage:** AIS transmitter development (prohibited);
custom marine display (single source, unproven optics/ingress); PILOT (safety gate); MAREA-branded AIS
receiver hardware (radio approval unresolved); any design that freezes a secure element or GNSS module
before a lifecycle-verified replacement exists.

**Specifications that must stay unfrozen until real customer research exists:** all nine families'
requirement sets, HUB edition interface boundaries, DISPLAY size, SENSE measurement set and accuracy
targets, WATCH sensor set and installation method, AIS product boundary, and every price.

**Should remain deferred:** PILOT development, AIS transmission, custom display tooling, MAREA AIS
receiver board, any second hardware platform that does not reuse the gateway compute/power/enclosure
stack.

## 6. Why the score cannot become a launch decision

1. The strongest commercial ranking (MC-09) is desk research; the customer ranking is **empty**.
2. The manufacturing feasibility rests on a cost model whose observed component evidence is
   **0.8 %–4.7 %** of the modelled subtotal; the rest is labelled assumption.
3. Legal readiness is zero for every family: no technical file, no test evidence, no operator identity.
4. Every architecture is a candidate, every test is `NOT_EXECUTED`, every certification is absent.

## 7. What would change this assessment (explicit triggers)

| Trigger | Effect |
|---|---|
| Customer discovery unblocked (AUTH-MC10-001) | Can rank hardware requirements; may reduce or expand the portfolio |
| A real supplier quotation set (G2/G3) | Replaces assumption-based cost; may invalidate a family's economics |
| A prototype measured (G4) | Converts power/thermal/EMC/ingress from candidate to evidence |
| A lifecycle-verified GNSS/secure element/panel second source | Removes a blocking sourcing risk |
| Configuration frozen | Enables technical-file work (G6) and NMEA decision |
| Conformity test evidence | Enables the first honest CE route discussion |
| Qualified safety engineering and funding | The only path that could ever revisit PILOT |

## 8. Non-assertions

No architecture is approved. No product is available, priceable, orderable or publishable. No
compatibility, accuracy, ingress, temperature, EMC, NMEA or CE claim is made or implied. No test,
certification, quotation, MOQ, lead time or warranty term exists. The MAREA brand remains
`NOT_GRANTED`; OPEN-MARINE source IP remains `NOT_CLEARED`; `PILOT_SAFETY_GATE = BLOCKED`.
