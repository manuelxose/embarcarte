# MAREA FLEET — complete final-product commercial specification (MC-07 / D3-FLEET)

| Field | Value |
| --- | --- |
| Document ID | MC-07 / D3-FLEET |
| Milestone | MC-07 (Master Prompt 07/36) — product definitions batch 3 |
| Product | MAREA FLEET (`FLEET`); editions MAREA FLEET Start (`FLEET-START`), MAREA FLEET Business (`FLEET-BUSINESS`) and MAREA FLEET Enterprise (`FLEET-ENTERPRISE`) |
| Owner function | Product Management — Fleet Product Director (author function for this dossier) |
| Status | `INTERNAL` / `COMPLETE_TARGET_SPECIFICATION` / `NOT_FOR_SALE` / `NOT_PUBLISHED` |
| Lifecycle state | `DEFINED` (binding vocabulary, `docs/marea/products/README.md` §3) |
| Branch | `feature/marea-mc07-display-weather-fleet-products` |
| Date | 2026-10-30 |
| Contract authority | programme brief (external to this repository), binding for MC-07; `docs/marea/products/README.md` §1–§23 (24 fields, evidence classes, claim rules, price hypotheses, cross-product authority); Master Prompt §8 (FLEET capability domains, segments, editions, B2B economics) |
| Companion contract | `docs/marea/products/FLEET-TENANCY-SECURITY-AND-DATA-GOVERNANCE.md` (D4) — organization model, permission matrix, tenant isolation, audit, DPA, retention and security-testing depth. This dossier cross-references it and does not duplicate it |
| Customer copy | `docs/marea/products/copy/fleet.es.md` and `docs/marea/products/copy/fleet.en.md` (D8; both owned by this deliverable in MC-07) |
| Publication / sale | None. No price is approved, no organization is provisioned, no subscription is billable, no page may be published while the brand, data-rights, security and conformity gates remain open |

This dossier defines the **finished commercial product** MAREA FLEET — a multi-vessel organization
SaaS for professional operators — not an admin-console mock-up, not a telemetry prototype and not a
shipping-ERP proposal. It fixes the customer experience, the commercial layers, the edition
boundaries, the buyer and daily-user model, the pricing architecture, the evidence labels and the
gates that must close before any organization can be onboarded.

A complete specification is not readiness, readiness is not availability, and availability is not a
sale. MAREA FLEET is **not** a remote-control product: there is no steering, motor, thruster, bus-command
or cloud-to-actuator path anywhere in the design, and none is planned. Telemetry is **read-only**, a
vessel that has stopped reporting is never shown as online, and a provider's acceptance of a
notification is never presented as human delivery. No uptime SLA exists, no security certification
exists and no customer production data has been used.

## 0. Contents

1. Status block — complete specification, zero commercial readiness
2. Canonical field block (convention)
3. The 24 canonical fields (F01–F24)
4. F04 capability-domain register — the 50 mandatory final SaaS domains and the four commercial layers
5. The commercial layers separated, and what FLEET is not
6. Customer segments — organization size, buyer, daily roles, workflows, retention and willingness-to-pay assumptions
7. Edition architecture — Start, Business and Enterprise
8. Read-only telemetry and notification honesty
9. Acceptance scenarios — FLEET-AC-01 to FLEET-AC-24
10. Traceability annex — MC-02 blockers and the evidence required before any sale
11. Ecosystem, cross-sells and entitlement boundaries
12. Pricing architecture and B2B unit-economics framework
13. Required disclaimers — verbatim, ES and EN
14. Non-assertions and document status

---

## 1. Status block — completely specified, not for sale

### 1.1 Product-level status (README §1 mapping)

| Dimension | Value |
| --- | --- |
| `PRODUCT_DEFINITION` | `COMPLETE_TARGET_SPECIFICATION` |
| `ENGINEERING_READINESS` | `EVIDENCE_BASED` — the MC-02 audit is the only engineering evidence; there is no multi-tenant service, no tenant isolation test, no telemetry ingestion, no billing/entitlement service and no production customer data |
| `COMMERCIAL_AVAILABILITY` | `NOT_FOR_SALE` |
| `BRAND_CLEARANCE` | `NOT_GRANTED` — MAREA is a proposed brand; no trademark clearance exists (X-01) |
| `SOURCE_IP_CLEARANCE` | `NOT_CLEARED` — no reuse right from the source project and no FLEET-specific licence |
| `PUBLICATION_STATE` | `INTERNAL_ONLY` |

### 1.2 Per-dimension readiness (README §4, never collapsed into one flag)

| Dimension | FLEET value at MC-07 | Evidence and scope |
| --- | --- | --- |
| `definition` | `COMPLETE_TARGET_SPECIFICATION` | This dossier: all 24 fields, 50 capability domains, six customer segments, three editions, 24 acceptance scenarios and the companion tenancy contract |
| `engineering` | `NOT_VERIFIED` | `FLEET_MULTI_TENANT_SERVICE = NOT_FOUND`, `FLEET_TELEMETRY_INGESTION = NOT_VERIFIED`, `FLEET_BILLING_AND_ENTITLEMENT_SERVICE = NOT_FOUND` (§1.4, P-09); no FLEET client code exists (`MAREA-COMMERCIAL-ARCHITECTURE.md` §12) |
| `licensing` | `NOT_CLEARED` | Source-IP reuse unresolved (L-01–L-03), no SaaS terms, no data-processing terms, no provider agreement for telemetry or notifications and no connectivity contract (H-12) |
| `hardware` | `NOT_APPLICABLE_SOFTWARE_PRODUCT` | FLEET is software; it still depends on customer devices, on read-only telemetry sources (WATCH/HUB/AIS) and on contracted connectivity that does not exist |
| `dataRights` | `NOT_GRANTED` | Organisation data is the customer's own, but AIS-derived retention/redistribution is `LEGAL_REVIEW_REQUIRED` (D-09), external data depends on provider terms (D-10) and no DPA or controller/processor assessment is executed (X-07) |
| `compliance` | `NOT_STARTED` | No DPIA, no records of processing, no CRA documentation for the network-connected service (H-13), no accessibility conformance statement and no security assessment |
| `pricing` | `HYPOTHESIS_UNAPPROVED` | The three FLEET figures are internal hypotheses only (brief §4); organisation fee, seats, onboarding and all limits remain `OPEN` |
| `brandPublication` | `NOT_GRANTED` | X-01; the ES/EN copy files are internal drafts |
| `availability` | `NOT_FOR_SALE` | No tenancy, no onboarding operation, no support desk, no billing, no contract, no order flow |

### 1.3 Evidence classes used in this dossier (README §5)

| Class | Meaning here |
| --- | --- |
| `VERIFIED_REPO` | Verifiable in this repository; a path is cited |
| `VERIFIED_EXTERNAL` | Verifiable at a cited official public source with a check date; used only for competitor prices retrieved on 2026-10-30 and for published public-sector or provider terms |
| `ASSUMPTION` | An explicit planning assumption, not evidence |
| `HYPOTHESIS` | A commercial or price assumption awaiting approval |
| `OPEN` | Fact not yet established; the intended customer experience is still specified |
| `BLOCKED` | An external condition (licence, contract, certificate, measurement, agreement) prevents closure |

`OPEN` and `BLOCKED` are legitimate field values. The prohibited placeholder token is not used anywhere
in this dossier, and no field is filled with an unlabelled assertion.

### 1.4 Canonical FLEET evidence states (used unchanged in the fields, the copy and the machine contract)

These strings are part of the MC-07 contract. They may not be upgraded, softened or replaced, and a
design document, a diagram or a plan is never evidence for any of them.

| State | Value | What it means for every field below |
| --- | --- | --- |
| `FLEET_MULTI_TENANT_SERVICE` | `NOT_FOUND` | P-09: no multi-tenant SaaS, no organization/tenant model in production and no tenant-isolation implementation exists in EMBARCARTE |
| `FLEET_TENANT_ISOLATION_TEST` | `NOT_EXECUTED` | X-07: no authorization test, no negative cross-tenant read/modify test, no export/search/cache/background-job isolation evidence |
| `FLEET_AUTHORIZATION_MODEL` | `DESIGN_ONLY` | The eight roles and the permission matrix are specified in the companion tenancy contract; nothing is implemented, enforced or tested |
| `FLEET_TELEMETRY_INGESTION` | `NOT_VERIFIED` | P-09, P-06: no production telemetry ingestion exists for WATCH, HUB, AIS or any vessel source |
| `FLEET_BILLING_AND_ENTITLEMENT_SERVICE` | `NOT_FOUND` | P-09: no billing, plan management, per-vessel subscription accounting, renewal or entitlement enforcement exists |
| `FLEET_NOTIFICATION_PIPELINE` | `NOT_FOUND` | P-09: no organization notification, operational-alert routing, escalation or delivery-evidence pipeline exists |
| `FLEET_CONNECTIVITY_CONTRACT` | `NOT_FOUND` | H-12: no SIM, roaming or connectivity terms exist for any vessel or organization |
| `FLEET_SLA` | `NO_SLA_ESTABLISHED` | No contracted commitment, no measurement plan executed and no uptime figure published; no SLA claim of any kind may be made |
| `FLEET_SECURITY_CERTIFICATION` | `NONE` | No ISO/IEC 27001, SOC 2, ENS or any other security certification or attestation exists or is claimed |
| `FLEET_REMOTE_CONTROL_PATH` | `NONE_EXISTS` | No steering, motor, thruster, bus command, firmware command or cloud-to-actuator path exists, and none is planned |
| `FLEET_DPA_AND_SUBPROCESSORS` | `NOT_EXECUTED` | No data-processing agreement, subprocessor register, DPIA, controller/processor assessment or transfer analysis is executed |
| `FLEET_CUSTOMER_PRODUCTION_DATA` | `NONE_USED` | No customer production data exists in this programme and none has been used to define or validate FLEET |

The machine-readable contract also carries the frozen invariant flags of brief §15:
`multiTenantProductionService: false`, `crossTenantAccessAllowed: false`, `remoteSteeringAllowed: false`,
`slaEstablished: false`, `customerProductionDataUsed: false`, `securityCertificationClaimed: false`.

### 1.5 The one-message summary

MAREA FLEET is completely specified and not for sale. There is no multi-tenant service, no tenant
isolation test, no telemetry ingestion, no billing or per-vessel subscription accounting, no
notification or escalation pipeline, no connectivity contract, no SLA, no security certification, no
DPA and no customer production data. Telemetry is read-only and there is no remote-control path of any
kind. The figures of EUR 49 and EUR 79 per vessel per month are unapproved hypotheses, not offers, and
the Enterprise tier is a contracted service with no established price. Those are truthful states, not
defects of this document.

---

## 2. Canonical field block (convention)

Every field F01–F24 uses the binding five-line block of `docs/marea/products/README.md` §6 and the
MC-07 brief §7. `Definition` describes the finished commercial experience; `Evidence` labels it;
`Owner` names a function, never a person; `Blockers / dependencies` cites MC-02 ids from brief §6;
`Commercial readiness` states one readiness dimension and its value.

---

## 3. The 24 canonical fields

#### F01 - Identity
- **Definition.** MAREA FLEET is the multi-vessel organization product of the MAREA family: a business SaaS in which an organization registers its vessels, its people and its operating rules, and runs day-to-day fleet operations from one tenant — fleet overview, authorized position and status, availability, maintenance planning and work orders, service history, equipment inventory, vessel documents with expiry control, technical incidents, operational events, assigned activities, crew and staff access, reporting, exports and audit records — consuming authorised **read-only** telemetry where a compatible WATCH or HUB installation exists. It is bought per vessel per month as a subscription, with an organisation account, an onboarding process and a support relationship; it is not a consumer monitoring app, not a boat-club social product, not a shipping ERP, not a dispatch or distress system and not a control system. Category: business SaaS (`SOFTWARE`). Family: MAREA. Code: `FLEET`. Editions: MAREA FLEET Start (`FLEET-START`), MAREA FLEET Business (`FLEET-BUSINESS`) and the contracted MAREA FLEET Enterprise (`FLEET-ENTERPRISE`). Positioning: the organization-level system of record for small and mid-sized professional fleets — sailing schools, charter and rental operators, marinas, boat-management and maintenance companies and small workboat operators — between a single-vessel consumer app and a deep-sea shipping suite. FLEET never commands a vessel. MAREA FLEET (this document) is the **SaaS product family**; the broader **MAREA FLEET package** — this SaaS plus onboarding, device supply, installation, WATCH, HUB, connectivity and professional support — is a separate commercial object whose definition and pricing belong to MC-08 and are **not** included in any FLEET subscription.
- **Evidence.** `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` §09; `VERIFIED_REPO docs/marea/products/README.md` §2, §19; `VERIFIED_REPO docs/marea/brand/brand-identity.contract.json` products and namingRules; the programme brief (external to this repository) §3–§5; `OPEN` for the implemented service (`FLEET_MULTI_TENANT_SERVICE = NOT_FOUND`).
- **Owner.** Product management (FLEET).
- **Blockers / dependencies.** P-09, P-10, X-01, X-07.
- **Commercial readiness.** `definition = COMPLETE_TARGET_SPECIFICATION`.

#### F02 - Customer segments
- **Definition.** Six intended segments, each defined by organization size, operating problem, buyer and daily users; the full register with buyer, decision-maker, workflows, onboarding cost, retention and willingness-to-pay assumptions is in §6. Primary: (S1) sailing schools and training centres with roughly 4–25 boats and seasonal course calendars; (S2) charter and rental operators with roughly 10–150 vessels, split between owner-managed fleets and managed third-party fleets; (S3) marinas and berth operators that care for or supervise customer vessels and need a scoped, auditable professional view. Secondary: (S4) boat-management, maintenance and refit companies that service 10–200 vessels across several owners; (S5) small professional and workboat fleets (pilot, survey, aquaculture, port services, 3–50 vessels) that need maintenance, compliance documents and document-expiry control but not a deep-sea shipping ERP; (S6) multi-boat private owners and family offices with 2–10 vessels managed by a captain or a small shore office. Explicit non-segments: deep-sea commercial shipping and tanker/offshore ERP buyers, naval and government command-and-control, safety-of-life dispatch, insurers seeking underwriting data, and any buyer seeking remote vessel control.
- **Evidence.** `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` §09 (buyer/problem and editions); `VERIFIED_REPO docs/marea/brand/MAREA-BRAND-STRATEGY.md` FLEET row; `VERIFIED_REPO docs/marea/MARKET-BENCHMARKS.md` FLEET rows (segmentation gap between fleet-priced ship management and per-vessel professional suites); `ASSUMPTION` segment priority and vessel-count bands; `OPEN` — no primary interviews, no validated willingness to pay (X-06); discovery belongs to MC-09/MC-10.
- **Owner.** Product marketing and commercial development.
- **Blockers / dependencies.** X-06, X-05.
- **Commercial readiness.** `availability = NOT_FOR_SALE`.

#### F03 - Customer problems
- **Definition.** The problems FLEET is designed to remove, stated as the organization experiences them: (1) fleet knowledge lives in spreadsheets, chat threads and one person's memory, so nobody can answer "what is due, what is broken, which document expires this month and who is responsible" without asking around; (2) maintenance is reactive because planned tasks and work orders are not linked to equipment, history and documents; (3) certificate and document expiry is discovered late, creating operational and contractual exposure; (4) several vessels, owners and crews share the same shore staff, and access is informal — a shared login or a messaging group is the current permission model; (5) when a vessel is chartered, sold or returned from a yard, its operational history and files are dispersed and the next operator starts from zero; (6) existing professional maritime suites are priced and scoped for shipping companies, while consumer apps cannot represent an organization, roles, cost owners or an audit trail; (7) vessel status is either unknown or reported by phone, and a vessel that is genuinely offline is indistinguishable from one that is fine. Existing alternatives: spreadsheets and shared drives, paper logbooks, WhatsApp groups, a maintenance app used by one person, a charter-booking platform with no operational depth, or a shipping PMS quoted on application. FLEET's answer is one tenant with declared roles, one operational record per vessel, and read-only telemetry shown with its age instead of an optimistic green light.
- **Evidence.** `ASSUMPTION` on the problem framing derived from `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` §09 and `VERIFIED_REPO docs/marea/compliance/MAREA-COMMERCIAL-ARCHITECTURE.md` §11 (FLEET is a B2B system of record with read-only telemetry); `VERIFIED_EXTERNAL` competitor positioning retrieved 2026-10-30 shows professional suites priced per vessel for operations and yacht suites priced per yacht for management (§F16); `OPEN` for interview evidence (X-06).
- **Owner.** Product management.
- **Blockers / dependencies.** X-06, D-10.
- **Commercial readiness.** `dataRights = NOT_GRANTED`.

#### F04 - Complete end-state functionality
- **Definition.** At end state an organization signs a contract, completes a verified onboarding, registers its vessels and people, and operates a single tenant. The finished product provides the fifty capability domains enumerated in §4: organization creation; verified ownership and administrator verification; multi-vessel registry; vessel profiles; fleet overview; authorized location and status; availability and operational state; maintenance tasks and planning; work orders; service history; equipment inventory; vessel documents; expiration reminders; technical incidents; operational event history; activity and task assignment; crew and staff access; multi-user invitations; role-based access; organization-level and vessel-level permissions; optional external installer access; customer/owner access where justified; organization notifications; operational alerts; read-only WATCH telemetry; read-only HUB telemetry where authorized; event and notification history; reporting; export; audit logs; tenant isolation; organization settings; billing contacts; plan management; per-vessel subscription accounting; organization onboarding; service desk and support workflows; retention; deletion; account transfer; API and integration policies; permissioned integrations; service status and SLA reporting without an invented SLA; support escalation; contract and renewal; privacy and data governance; bilingual UI and documentation; enterprise onboarding; enterprise termination and exit; and data-processing terms with subprocessor transparency. FLEET is a system of record and a coordination surface. It never commands, steers or configures a vessel, never substitutes for the organization's safety management system, and never presents a stale or missing telemetry value as current.
- **Evidence.** `OPEN` — the intended end-state experience; per-domain evidence in §4; the canonical states in §1.4; `VERIFIED_REPO docs/marea/compliance/MAREA-COMMERCIAL-ARCHITECTURE.md` §11 (FLEET read-only, separate tenant model); `VERIFIED_REPO docs/marea/products/README.md` §19. The MC-13-FLEET gate will evidence each domain.
- **Owner.** Product management (FLEET) with engineering.
- **Blockers / dependencies.** P-09, P-10, X-07.
- **Commercial readiness.** `engineering = NOT_VERIFIED`.

#### F05 - Differentiation
- **Definition.** FLEET is intended to be relevant for six reasons, each of which is a design intent and not yet evidenced: (1) it models the **organization** — memberships, roles, vessel assignments, invitations, revocation and audit — instead of a single user account with shared passwords; (2) it keeps **one operational record per vessel** — equipment, tasks, work orders, documents with expiry, incidents and events — so a vessel's history survives crew changes, charter hand-overs and yard visits; (3) it treats telemetry as **read-only evidence with an age**, so "offline" is a first-class state and a vessel that stopped reporting is never displayed as online; (4) it is scoped and priced for **small and mid-sized professional fleets**, with per-vessel subscription accounting rather than a shipping-company implementation project; (5) it separates the **professional platform** from consumer monitoring (WATCH) and from the physical install base (HUB/AIS), so an organization can adopt ops software before or without hardware; (6) it is honest about what an operations platform cannot do — no uptime promise, no security certification, no remote control, no guaranteed instant alerts, no unlimited anything. It is not differentiated by claiming superiority over named competitors, by performance or accuracy figures, or by enterprise references that do not exist.
- **Evidence.** `ASSUMPTION` — differentiation hypothesis; `VERIFIED_REPO docs/marea/products/README.md` §19 and `docs/marea/products/MAREA-WATCH-COMMERCIAL-SPEC.md` §5.3 (read-only authority); `VERIFIED_EXTERNAL` competitor segmentation evidence in §F16; `OPEN` — no product, no customer test and no comparative evidence (P-09, X-06).
- **Owner.** Product management and commercial strategy.
- **Blockers / dependencies.** P-09, X-05, X-06.
- **Commercial readiness.** `pricing = HYPOTHESIS_UNAPPROVED`.

#### F06 - Editions
- **Definition.** Exactly three commercial tiers with different outcomes, no cosmetic tiers: **MAREA FLEET Start** (`FLEET-START`, verdict `DEFINED`) — one organization, a small fleet within the published vessel allowance (suggested 1–10 vessels), the complete essential platform: registry and profiles, fleet overview, availability, maintenance tasks and work orders, service history, equipment inventory, documents and expiry reminders, incidents and events, activity assignment, crew/staff access with the standard role set, invitations, notifications, reports, exports, audit log, tenant isolation, onboarding and support within the published service envelope, and read-only WATCH telemetry where present. **MAREA FLEET Business** (`FLEET-BUSINESS`, verdict `DEFINED`) — everything in Start plus richer permission and workflow capability (custom roles within the published model, multi-level approval on work orders, maintenance plans and planned-maintenance scheduling, richer reporting and scheduled report delivery, API access within published limits, permissioned third-party integrations, and read-only HUB telemetry where authorized), for a larger fleet (suggested 11–50 vessels). **MAREA FLEET Enterprise** (`FLEET-ENTERPRISE`, verdict `CONTRACTED_TIER`, `NOT_ESTABLISHED`) — a contracted service tier with scope, volumes, support model, integration work and any SLA defined in a signed contract, never a standard checkout SKU. The exact numeric limits of every tier and the Enterprise scope are `OPEN` (§7); those are parameter decisions still to be fixed, not a condition on the Business edition verdict, which is `DEFINED` as a complete target specification. Tenant isolation, audit, export, data-deletion and the read-only telemetry boundary are identical in all tiers and are never edition-gated. The three editions define the **SaaS product**; none of them is the **MAREA FLEET package**, and neither Start, Business nor Enterprise includes hardware, installation, WATCH, HUB or connectivity — those belong to the package defined and priced by MC-08.
- **Evidence.** the programme brief (external to this repository) §4 (frozen edition ids, amounts, period and state); `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` §09 (editions); `VERIFIED_REPO docs/marea/products/README.md` §14 (edition-verdict vocabulary; the batch-03 addition of `CONTRACTED_TIER` is owned by D4); `HYPOTHESIS` on the value split; `OPEN` — no cost or validation evidence exists (X-05, X-06).
- **Owner.** Product management (FLEET) with commercial strategy.
- **Blockers / dependencies.** P-09, X-05, X-06.
- **Commercial readiness.** `pricing = HYPOTHESIS_UNAPPROVED`.

#### F07 - Included items
- **Definition.** Intended included content: the organization tenant with its configured settings; the published vessel allowance of the edition; the full role model with the published read/acknowledge/configure rights; the capability set of the edition as enumerated in §7; the defined storage, telemetry-history and API limits of the edition, published as numbers rather than "unlimited"; onboarding as defined for the edition (self-guided configuration material and a documented onboarding checklist; assisted onboarding is a separately quoted service); bilingual Spanish/English user interface and documentation; the support entitlement of the edition (channel, hours and response target only once a real contract exists); data export in a usable format; and the audit log. Intended exclusions stated before purchase: hardware (WATCH, HUB, AIS, SENSE, DISPLAY) and its installation; connectivity/SIM and data plans; charts and weather data; professional services beyond the published onboarding; custom development and custom integrations unless contracted; third-party software licences; vessel survey, safety-management or classification work; and any capability not listed in the published plan description. No numeric limit, no storage figure, no API quota and no support level is yet approved, so all of them are `OPEN`. A FLEET subscription includes only the platform entitlement described above. It does **not** include the **MAREA FLEET package** (SaaS plus onboarding plus device supply plus installation plus WATCH plus HUB plus connectivity plus professional support); that package is a separate commercial object governed by MC-08 and nothing in it is implied by buying a subscription.
- **Evidence.** `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` §09 (included/excluded); the programme brief (external to this repository) §4 (organisation fee and seats are hypotheses: no per-seat charge in Start/Business, Enterprise negotiated); `OPEN` — limits, support levels, onboarding scope (P-09, X-05); `BLOCKED` — no terms of service, no hosting, no connectivity.
- **Owner.** Product management with commercial operations.
- **Blockers / dependencies.** P-09, X-05, X-07.
- **Commercial readiness.** `engineering = NOT_VERIFIED`.

#### F08 - Optional accessories
- **Definition.** Intended optional commercial objects, always described by function and never given an invented MAREA product name: additional vessels beyond the plan allowance (billed per vessel at the edition rate); additional professional-service days or assisted onboarding; data migration from an existing spreadsheet or system when scoped; additional storage or telemetry-history retention within a published upgrade; API access above the published edition quota (Business/Enterprise); permissioned integrations requiring configuration work; an external-installer access package where an organization works with a yard network; bilingual support add-ons only if a real service exists; and hardware/connectivity products of other MAREA families (WATCH, HUB, AIS, SENSE, DISPLAY) that are separate purchases and never included. No accessory has an approved name or price; every optional item is `OPEN` and none may be presented as included. Hardware is governed by its own family dossiers, not by FLEET. Optional items are never presented as part of the **MAREA FLEET package** either: the package is defined and priced by MC-08, and this dossier does not define, include or price any part of it.
- **Evidence.** `VERIFIED_REPO docs/marea/brand/PRODUCT-NAMING-SYSTEM.md` (accessories are not families or editions); the programme brief (external to this repository) §4 and §11; `OPEN` — accessory list and prices; `BLOCKED` — P-09, X-05.
- **Owner.** Product management with commercial operations.
- **Blockers / dependencies.** P-09, X-05, X-06.
- **Commercial readiness.** `hardware = NOT_APPLICABLE_SOFTWARE_PRODUCT`.

#### F09 - Integration
- **Definition.** FLEET integration is bounded, permissioned and evidence-based. Data enters from authorized **read-only** sources: WATCH telemetry and alerts where an active WATCH service exists and the organization consents; HUB installation and telemetry health where authorized; AIS-derived positions only within the data-rights position that does not exist yet; NAV passage and position context only with explicit customer permission; WEATHER where the provider terms allow organisational use. Outbound integrations (calendar, email, accounting or third-party operations tools) are permissioned, scoped, revocable and rate-limited, and none is claimed to exist. FLEET does not accept inbound connections to a vessel, does not write to a vessel network, does not publish a command topic and does not exchange control messages with any MAREA or third-party product. The frozen statuses of brief §9 apply: FLEET-WATCH `CONDITIONAL` (read-only); FLEET-HUB `CONDITIONAL` (read-only health); FLEET-SENSE `UNKNOWN`; FLEET-PILOT `BLOCKED` for any control, at most read-only status after engineering and privacy review; FLEET-NAV `PLANNED` only with explicit permission; FLEET-WEATHER `CONDITIONAL`; FLEET-DISPLAY `UNKNOWN`; FLEET-AIS `CONDITIONAL` read-only. No integration is `SUPPORTED` and no protocol compatibility is claimed without a recorded test.
- **Evidence.** the programme brief (external to this repository) §9; `VERIFIED_REPO docs/marea/products/README.md` §19; `VERIFIED_REPO docs/marea/compliance/MAREA-COMMERCIAL-ARCHITECTURE.md` §6 (C-16 telemetry uplink), §10 (AIS receive-only), §11 (read-only FLEET); `VERIFIED_REPO docs/marea/products/MAREA-WATCH-COMMERCIAL-SPEC.md` §11; `OPEN` — no integration exists; `BLOCKED` — D-09, D-10, H-12.
- **Owner.** Integration owner (FLEET Product Director) with engineering.
- **Blockers / dependencies.** D-09, D-10, H-12, P-09.
- **Commercial readiness.** `dataRights = NOT_GRANTED`.

#### F10 - Professional installation
- **Definition.** FLEET itself requires no vessel installation; the professional service around it is **onboarding and data setup**, and it is offered for every organization. The finished onboarding runs from a pre-contract scoping call through an organization and vessel inventory, role and permission design, data migration where scoped, configuration of vessels/equipment/maintenance plans/documents, invitation and role assignment, a test of notifications and reports, a handover session with the daily users and an acceptance record signed by the organization. Where the organization's telemetry depends on hardware, professional installation belongs to WATCH/HUB and is quoted separately. Installation or onboarding labour is never promised as included in the subscription hypothesis; no installation duration, no fixed onboarding price and no installer certification scheme exists. Third-party installers may be granted scoped, time-bound, vessel-level access through the external-installer role; that role never grants organization administration.
- **Evidence.** `VERIFIED_REPO docs/marea/WEBSITE-AND-ROADMAP.md` professional-channel intent; the programme brief (external to this repository) §11 (external installer role scoped and time-bound); `ASSUMPTION` on the onboarding sequence; `OPEN` — no onboarding operation, no scoping template, no migration tooling, no acceptance record (P-09, X-05).
- **Owner.** Customer success with product management.
- **Blockers / dependencies.** P-09, X-05, X-06.
- **Commercial readiness.** `availability = NOT_FOR_SALE`.

#### F11 - Onboarding
- **Definition.** Intended first-use experience, measured in days not months for Start and in a scoped project for Business/Enterprise: the organization owner verifies the organization and their own administrator authority; registers the organization profile, billing contact and operational settings; registers vessels with the profile fields it needs; imports or creates equipment and maintenance baseline; defines roles and invites the daily users; configures notifications and escalation contacts; connects read-only telemetry where a compatible WATCH/HUB exists and explicitly accepts the data-processing terms; runs a test notification and a test report; and receives a record of what is configured and what is not. The product tells the organization what data it holds, who can see it, how long it is retained and how to export or delete it. Onboarding completion is a prerequisite of per-vessel billing and of any support commitment. The configuration screens, manual and acceptance record are `OPEN`; no FLEET UI exists and no screen has been usability-tested.
- **Evidence.** `OPEN` — onboarding UX, material and tools not built; `ASSUMPTION` sequence; `VERIFIED_REPO docs/marea/products/README.md` §6 F11 and `docs/marea/brand/BRAND-VOICE-ES-EN.md` §9 (allowed CTA per readiness).
- **Owner.** UX, content and localisation with customer success.
- **Blockers / dependencies.** P-09, X-07, X-05.
- **Commercial readiness.** `engineering = NOT_VERIFIED`.

#### F12 - Licensing and subscriptions
- **Definition.** FLEET is intended to be sold as a **recurring per-vessel subscription per organization**, with a separate organisation fee decision and no per-seat charge in Start or Business (Enterprise negotiates seats). The subscription grants a time-limited right to use the service for the purchased vessel allowance and capability set; it is not a perpetual licence and it does not transfer ownership of any third-party data. Each vessel is a billable unit with its own subscription record, start date, term, renewal date, state (active, grace, suspended, cancelled) and cost owner, and the organization can see per-vessel accounting and assign vessels to internal cost centres. The organization account remains responsible for the contract, the billing contact and the data-processing terms. Renewal, price indexation, termination, export and deletion are governed by the contract, which does not exist yet. **Data-portability requirement:** cancellation must never delete the customer's own operational records without a documented export window; and **subscription isolation:** an expired or failed subscription must never disable audit-log retention obligations, export or the organization's ability to retrieve its own data — degradation is to the paid service, never to the customer's ability to leave. What the subscription includes (storage, telemetry history, API quota, support level, onboarding) is `OPEN`. The subscription is a **SaaS entitlement only**: it is neither the **MAREA FLEET package** nor a substitute for one, and no device, installation, connectivity or professional support from that package is included in, bundled with or implied by a FLEET subscription.
- **Evidence.** the programme brief (external to this repository) §4 (frozen billing basis and states) and §11; `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` §09; `VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §6; `OPEN`/`BLOCKED` — no subscription service, no terms, no DPA, no billing (`FLEET_BILLING_AND_ENTITLEMENT_SERVICE = NOT_FOUND`; P-09, X-07).
- **Owner.** Commercial strategy with legal and finance.
- **Blockers / dependencies.** P-09, X-05, X-07.
- **Commercial readiness.** `licensing = NOT_CLEARED`.

#### F13 - Retail and partner pricing
- **Definition.** Internal price hypotheses only, recorded for planning and published nowhere: **MAREA FLEET Start EUR 49 per vessel per month, VAT excluded** (starting price; suggested 1–10 vessels); **MAREA FLEET Business EUR 79 per vessel per month, VAT excluded** (suggested 11–50 vessels); **MAREA FLEET Enterprise no amount, contracted, `NOT_ESTABLISHED`**. Both Start and Business figures are `HYPOTHESIS_UNAPPROVED`, not offers, not "from" prices, not launch or discount prices and not orderable amounts. The organisation fee hypothesis is: none in Start and Business, Enterprise negotiated — and it is a hypothesis, not an approved term. User seats are included and not charged per seat in Start and Business; Enterprise seats are negotiated. Onboarding is separately quoted. Telemetry, storage and API limits are explicit per edition and are not "unlimited". No partner, reseller, distributor or volume price exists; no channel margin percentage exists. The pricing architecture, the limits that must be published before sale and the unresolved terms are in §7.4 and §12, and the full commercial model belongs to `docs/marea/products/PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-03.md`.
- **Evidence.** `HYPOTHESIS` — exactly the FLEET figures frozen by the programme brief (external to this repository) §4; `BLOCKED` — X-05 (no costed hosting, telemetry, support or provider quotes); `VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §6.
- **Owner.** Commercial strategy and pricing with finance.
- **Blockers / dependencies.** X-05, X-06.
- **Commercial readiness.** `pricing = HYPOTHESIS_UNAPPROVED`.


#### F14 - Direct and ongoing costs
- **Definition.** A costing framework with named inputs only, because no figure exists. Cost families that must be measured before any price is approved: (1) cloud hosting and environment per organization and per vessel, including database, object storage, search and background-job cost; (2) telemetry ingestion, processing, history storage and egress per vessel and per data class, plus notification-provider fees per channel and per message; (3) mapping/basemap and any AIS or weather provider fees where those layers are enabled; (4) identity, email, SMS and support-desk tooling; (5) payment processing, invoicing, dunning, refunds and tax/VAT handling per organization and per vessel; (6) onboarding labour, data migration, configuration and training per organization, amortised over the expected contract life; (7) support cost per organization and per vessel, including out-of-hours and escalation; (8) customer acquisition (sales, demonstrations, pilots, travel, partner commissions); (9) security operations, vulnerability handling, CRA maintenance, penetration testing, audit and insurance; (10) partner/installer margin; (11) bad debt, credits and contractual penalties where an SLA is ever signed. Contribution margin is deliberately not computed: presenting one would invent hosting, telemetry, support, provider and acquisition data. The framework, its formulas and the sensitivity method are in §12 and in the batch-03 pricing and channel model.
- **Evidence.** `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` "Price and channel decision rule"; the programme brief (external to this repository) §4; `BLOCKED` — X-05, H-12, P-09; `ASSUMPTION` on the cost categories.
- **Owner.** Finance and procurement with product management.
- **Blockers / dependencies.** P-09, H-12, X-05.
- **Commercial readiness.** `pricing = HYPOTHESIS_UNAPPROVED`.

#### F15 - Channel economics
- **Definition.** Intended channel model, all of it `OPEN` and none of it agreed: direct sale by EMBARCARTE to the organization; assisted sale through professional installers and refit yards for organizations that also buy WATCH/HUB; and — only if a real agreement exists — marina and association referral partners. Responsibility split to be contracted: EMBARCARTE owns the platform, the role model, the data-processing terms, the support policy and the service availability statement (never an SLA figure until one is signed); the partner owns the vessel-side work, the customer relationship it introduces and first-line support within a written scope; the organization owns its own data and its own safety-management obligations. FLEET is not sold through consumer app stores and is not bundled into a hardware purchase. Channel economics must state, per partner type, the margin or commission, the activation responsibility, the support boundary, the data-processing position and the termination terms; none of those exists. No reseller, no distributor and no white-label agreement is claimed.
- **Evidence.** `VERIFIED_REPO docs/marea/WEBSITE-AND-ROADMAP.md` institutional and installer routes; `VERIFIED_REPO docs/marea/brand/PRODUCT-NAMING-SYSTEM.md` §11; `ASSUMPTION` responsibility split; `BLOCKED` — X-05, X-06, X-07.
- **Owner.** Commercial development with partner operations.
- **Blockers / dependencies.** X-05, X-06, X-07.
- **Commercial readiness.** `availability = NOT_FOR_SALE`.

#### F16 - Competitor comparison
- **Definition.** No competitor has been tested against MAREA FLEET and no like-for-like comparator of the intended product exists in the evidence gathered. What exists is **category price evidence** retrieved from official pages on **2026-10-30**, segmented by the buyer each product actually serves, so that a shipping-company suite is never presented as a small-charter alternative and no hardware or consumer price is mixed into a B2B comparison. All retrieved amounts are the competitor's published prices, in the stated currency, with the stated tax basis; they are not MAREA costs, not a benchmark, not a cost input and not a price-parity claim. VAT/territory, included scope, contract length and volume terms differ in every row, and several suites are quote-only.

| Segment | Product / edition | Buyer the page addresses | Capabilities as published | Retrieved price | Currency | Tax basis | Official URL | Evidence |
| --- | --- | --- | --- | ---: | --- | --- | --- | --- |
| Professional maritime / ship management | Full Ahead Maritime — Vessel / Ocean / Fleet / Squadron | Technical managers and ship operators | Predictive PMS, statutory certificate register, drills as jobs, audit evidence library, EU ETS/FuelEU reporting; self-configured, no implementation project | €1,490/yr up to 5 ships; €2,990/yr up to 10; €4,990/yr up to 25; €7,990/yr up to 50; "from €149/month" | EUR | VAT basis not stated on the retrieved page | https://fullaheadmaritime.com/pricing | `VERIFIED_EXTERNAL` checked 2026-10-30 |
| Professional maritime / ship operations | UOC International — UOC Core; 2-Vessel Annual | Ship operators and fleet managers | Fleet monitoring, crew management, noon reports, location validation, fuel monitoring, provisioning, role-based access | €259 per vessel/month; 2-vessel annual €4,900/yr (about €204 per vessel/month on the page's own arithmetic); custom development packages €600/€1,350/€2,400 | EUR | VAT basis not stated on the retrieved page | https://uocintl.com/platform/pricing | `VERIFIED_EXTERNAL` checked 2026-10-30 |
| Professional maritime / crew and fleet operations | Seafarers.pro — Starter / Professional / Enterprise | Small to large fleet operators and agencies | Crew management, certificate tracking, rosters, PMS, procurement, QHSE, reporting, API, white-label; published volume discounts 10–25%; page claims a 99.9% SLA on Enterprise (vendor claim, not verified here) | €150 / €240 / €360 per vessel/month by tier; edge add-on €70 per vessel/month | EUR | VAT basis not stated on the retrieved page | https://www.seafarers.pro/pricing | `VERIFIED_EXTERNAL` checked 2026-10-30 |
| Vessel management and compliance | Vessel Vanguard — fleet plans (quoted) | Commercial fleet operators, vessel managers, government programmes | Vessel management, safety, compliance; custom quoting by vessel count and modules; page claims "3,000+ vessels managed" (vendor claim, not verified here) | No published price; custom quote | — | Not applicable (quote) | https://www.vesselvanguard.com/pricing | `VERIFIED_EXTERNAL` checked 2026-10-30; price `OPEN`, not zero |
| Superyacht management | YMS360 — Essentials / Operations / Compliance | Yacht managers and captains of individual larger yachts | Tasks and maintenance history, equipment/inventory, crew, purchasing, logbooks, guest management, hours of rest, SMS/ISPS libraries, certification | $300 / $500 / $650 per month (flat; unlimited users and devices as published) | USD | Tax basis not stated on the retrieved page | https://yms360.com/pricing | `VERIFIED_EXTERNAL` checked 2026-10-30 |
| Superyacht / yacht operating system | YOS Yacht Operating System — Captain / Vessel / Fleet | Captain-managed yachts to management companies | 21–40+ modules, offline-first, RBAC, audit trail, finance, PMS, inventory, safety, crew, documents; fleet portal and API on Fleet | €149 / €249 / €449 per month; Fleet includes 2 vessels plus €199/month per additional vessel; hosted server €59/month; live telemetry €49/month; onboarding €500–€5,000; telemetry onboarding typically €990 | EUR | Excluding VAT (stated) | https://yos.yachts/pricing | `VERIFIED_EXTERNAL` checked 2026-10-30 |
| Yacht management and charter | Scyllastar — one price per yacht, all modules | Yacht owners, managers and charter operators | Accounting, charter, crew and vessel modules in every plan; unlimited users; 24/7 support claimed on page; free data migration | €99 (up to 20 m) / €199 (20–30 m) / €299 (30–40 m) / €399 (40 m and above) per yacht/month | EUR | Excluding VAT; billed annually in advance (stated) | https://scyllastar.com/pricing/ | `VERIFIED_EXTERNAL` checked 2026-10-30 |
| AIS / maritime intelligence (not operations SaaS) | Rynda — Enterprise | Fleet teams needing vessel tracking and market intelligence | Fleet and zones, alert rules, position updates up to 20 minutes, history archive, seats, documents | $5.18 per vessel/month for 50–150 vessels (minimum $259/month); extra seat $69/month | USD | Tax basis not stated on the retrieved page | https://rynda.io/support/knowledge-base/enterprise-plan | `VERIFIED_EXTERNAL` checked 2026-10-30 |
| Land fleet maintenance (explicitly NOT marine) | Fleetio — Essential / Professional / Premium | Land vehicle fleet managers | Asset records, inventory, inspections, maintenance, work orders, reporting, integrations | $4 / $7 / $10 per vehicle/month billed annually; Essential $5 billed monthly | USD | Tax basis not stated on the retrieved page | https://www.fleetio.com/pricing | `VERIFIED_EXTERNAL` checked 2026-10-30; non-marine reference only |

What this evidence establishes: per-vessel monthly pricing is the established shape for professional maritime operations software; published prices span a very wide range by segment and scope; annual billing and volume discounts are normal; onboarding is frequently quoted separately; and some suites are quote-only. What it does **not** establish: MAREA FLEET's willingness to pay, its cost of service, its price position, any performance or capability comparison, or that any retrieved suite is a substitute for FLEET. No direct price parity is claimed and no buyer preference is asserted. The intended FLEET segment (sailing schools, charter/rental, marinas, boat managers, small workboats) sits **between** the retrieved segments — per-yacht management software or per-vessel shipping operations — and no official price page for that exact segment was retrieved; that gap is recorded in the source-acquisition checklist of the batch-03 pricing model. No market-share figure exists and none is inferred from these pages.
- **Evidence.** `VERIFIED_EXTERNAL` — the nine official pages in the table, checked 2026-10-30 (prices, currency, tax basis and contract conditions exactly as retrieved); `VERIFIED_REPO docs/marea/MARKET-BENCHMARKS.md` FLEET rows (earlier retrievals of Full Ahead, UOC and Seafarers.pro, same check date); `VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §2 Class P (no superiority claims); `OPEN` — no comparison test, no customer research and no market share (X-06).
- **Owner.** Commercial strategy.
- **Blockers / dependencies.** X-05, X-06.
- **Commercial readiness.** `pricing = HYPOTHESIS_UNAPPROVED`.

#### F17 - Sales arguments
- **Definition.** Honest buyer arguments and the objection handling that goes with them. Arguments: one tenant instead of spreadsheets and messaging groups, with declared roles and a revocable invitation model; one operational record per vessel that survives crew changes, charter hand-overs and yard visits; maintenance, documents, expiry and incidents linked to the same vessel and equipment; a read-only telemetry view that shows data age instead of a fabricated green light; per-vessel subscription accounting that a finance team can reconcile; exports and audit records the organization can take with it; and a published, bounded scope instead of "unlimited". Objections and answers: "Is this a remote-control platform?" — no, there is no steering, motor, bus or cloud-to-actuator path and none is planned; "Does it guarantee we see an alert instantly?" — no, notifications depend on power, connectivity and provider delivery, and provider acceptance is not human acknowledgement; "Is it certified/secure?" — no security certification exists and none is claimed; the security model is specified in the companion contract and will be tested before any sale; "What uptime do you guarantee?" — no SLA exists; a contracted SLA may exist only with a signed commitment and real measurement; "Can it replace our safety-management system?" — no, FLEET is a system of record and coordination surface, not an SMS and not a compliance certification; "How many vessels/users/API calls are included?" — the limits are explicit and will be published with the approved plan; they are not unlimited; "How much?" — only unapproved internal hypotheses exist and nothing is on sale. No comparative claim against a named competitor is permitted.
- **Evidence.** `ASSUMPTION` — argument ranking; `VERIFIED_REPO docs/marea/products/README.md` §19; the programme brief (external to this repository) §11 and §14; `VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §2–§4; `OPEN` — no sales test, no customer evidence and an empty claims register (X-06).
- **Owner.** Product marketing with sales enablement.
- **Blockers / dependencies.** P-09, X-01, X-06.
- **Commercial readiness.** `brandPublication = NOT_GRANTED`.

#### F18 - FAQ
- **Definition.** The pre-sale and post-sale questions a professional buyer must be able to answer truthfully. What does FLEET actually manage? Vessels, people, roles, maintenance, work orders, history, equipment, documents and expiry, incidents, events, assignments, notifications, reports, exports and audit; telemetry only as read-only authorized input. Is it a control or remote-helm product? No, and no such feature exists or is planned. Does it guarantee an immediate alert? No: notifications depend on power, network coverage and provider delivery, provider acceptance is not delivery, and delivery is not human acknowledgement. What uptime do you promise? No SLA exists; any SLA would have to be contracted and measured. Are you certified? No security certification, no ISO/IEC 27001, no SOC 2 and no classification-society approval exists or is claimed. Where is our data? In the organization's tenant, with a published retention schedule, role-based access, audit and export; the DPA and subprocessor register are not executed yet and no sale can occur without them. Who can see our vessels? Only the members the organization authorizes, by role and assignment, with immediate revocation and an audit trail; organization A cannot read or modify organization B by design, and that isolation will be tested before sale. Can we use it without any MAREA hardware? Yes — the operational platform stands alone; telemetry requires a compatible authorized source. What happens when we leave? A documented export, a termination period and deletion per policy; the terms are not written yet. Can we buy it today? No: FLEET is defined, not for sale, no price is approved and no organization can be provisioned.
- **Evidence.** Derived from this dossier and the companion tenancy contract; `OPEN` for every answer that depends on unbuilt capability, unwritten terms or untested isolation; `VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §4 and §6.
- **Owner.** Product management with content and support.
- **Blockers / dependencies.** P-09, X-05, X-07.
- **Commercial readiness.** `brandPublication = NOT_GRANTED`.

#### F19 - Warranty and support
- **Definition.** Intended after-sales position: a professional support relationship, not a consumer warranty claim. Support covers platform use, configuration, role and permission questions, report and export questions, and telemetry-source troubleshooting within the contracted model; it does not cover the vessel's electrical system, third-party hardware, connectivity coverage or the organization's own procedures. The service-desk workflow, severity model, response targets, support hours, escalation path and any credits are `OPEN` and must exist in a signed contract before any commitment is published. **No uptime SLA, no response-time guarantee and no 24/7 claim may be made**; `FLEET_SLA = NO_SLA_ESTABLISHED`. Support access to a customer tenant is explicit, scoped, time-bound and audited, and the `EMBARCARTE_SUPPORT` role can never become an organization administrator or modify data outside the approved scope. Security-incident handling, vulnerability disclosure and the software-maintenance commitment required for a network-connected product (CRA) are `BLOCKED` until an actual process, SBOM and update policy exist. Legal terms, seller identity and warranty statements are absent.
- **Evidence.** `OPEN` — support model, terms and service desk; `BLOCKED` — H-13 (CRA and secure-update lifecycle), X-02 (seller legal identity), X-07; `VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §2 Class C (support and availability claims).
- **Owner.** Customer support with legal.
- **Blockers / dependencies.** H-13, X-02, X-07.
- **Commercial readiness.** `compliance = NOT_STARTED`.

#### F20 - Bilingual product page copy
- **Definition.** The customer-facing Spanish and English copy lives in `docs/marea/products/copy/fleet.es.md` and `docs/marea/products/copy/fleet.en.md` and is part of this deliverable. Both files use the exact 24 numbered headings of `copy/nav.es.md` and `copy/nav.en.md`, followed by an approved-disclaimers section, with ES/EN parity of sections and facts. The copy must state: that FLEET is an organization SaaS and not a remote-control, distress or certified-security product; the read-only telemetry boundary and the fact that a disconnected vessel is never shown as online; the edition outcome split and the fact that limits are explicit rather than unlimited; the per-vessel subscription model and the separate onboarding; the absence of any published price, SLA or certification; and the approved navigation, FLEET limitation and brand disclaimers verbatim. It must contain no currency amounts, no purchase call to action, no stock or availability statement, no uptime percentage, no security certification, no invented enterprise reference or customer logo, and no comparative superiority. The copy is internal draft while `brandPublication = NOT_GRANTED` and `availability = NOT_FOR_SALE`.
- **Evidence.** `VERIFIED_REPO docs/marea/products/README.md` §22; `VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §2–§6; `VERIFIED_REPO docs/marea/brand/BRAND-VOICE-ES-EN.md` §8–§10; the programme brief (external to this repository) §8 and §17; `OPEN` — publication blocked by X-01 and X-03.
- **Owner.** UX, content and localisation with product review (facts).
- **Blockers / dependencies.** X-01, X-03.
- **Commercial readiness.** `brandPublication = NOT_GRANTED`.

#### F21 - Cross-sells
- **Definition.** Intended commercial path: FLEET is adopted by an organization as its operations system of record and is complemented — never substituted — by other MAREA families. WATCH provides the read-only telemetry and alert source for organizations that also monitor vessels; HUB provides onboard data aggregation for organizations that need richer readings; AIS provides receive-only traffic context where the data-rights position permits; SENSE provides measured inputs through a compatible WATCH/HUB path; NAV and DISPLAY are end-user navigation and presentation products that FLEET does not include; WEATHER is a separately entitled data service. The **MAREA FLEET bundle** (vessel SaaS plus onboarding plus optionally hardware and communications) is defined by `docs/marea/COMMERCIAL-PORTFOLIO.md` as "bespoke" and is governed by MC-08 — it is a bundle, not this SaaS product, and no bundle content, price or publication is decided here. Every cross-sell must state that no product is presumed included in another and that none is purchasable today. In particular, the **MAREA FLEET package** is the broader integrated offer (SaaS + onboarding + device supply + installation + WATCH + HUB + connectivity + professional support) defined and priced by MC-08; it is **not** this SaaS product, it is **not** included in any FLEET subscription, and no reader may infer that a subscription buys any part of it.
- **Evidence.** `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` bundle architecture and `MAREA FLEET` bundle row; `VERIFIED_REPO docs/marea/products/README.md` §2 (bundles are ecosystem context only, MC-08) and §19; the programme brief (external to this repository) §9; `OPEN` — bundle content, price and publication are MC-08.
- **Owner.** Commercial product management.
- **Blockers / dependencies.** X-01, X-05, MC-08 bundle governance.
- **Commercial readiness.** `availability = NOT_FOR_SALE`.

#### F22 - Retention strategy
- **Definition.** Retention is intended to come from operational dependence that the customer controls, never from lock-in: the organization's own operational record accumulates value and is exportable; roles, assignments and audit make the tenant the place where work is coordinated; reports and document-expiry control save the shore office time every week; per-vessel accounting maps to internal cost centres; onboarding and data migration mean switching has a real cost for the vendor, not a hostage cost for the customer. Renewal terms, indexation and notice periods must be published before sale; reminders must state the renewal date and amount before charging; no dark pattern, fake urgency, hidden auto-renewal or "lifetime" language is permitted. The organization can export its data at any time and, on termination, receives a documented export window; deletion follows the policy and the contract, and a lapsed subscription must never disable access to the organization's own records without an export having been offered. Adoption and activation metrics must be measured before retention can be discussed; today it is a design intent, not a validated retention rate.
- **Evidence.** `HYPOTHESIS` — retention design is unvalidated; `VERIFIED_REPO docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §6 and `BRAND-VOICE-ES-EN.md` §10; `OPEN` — no service, no customer-success operation and no churn data (`FLEET_BILLING_AND_ENTITLEMENT_SERVICE = NOT_FOUND`).
- **Owner.** Customer success with product management.
- **Blockers / dependencies.** P-09, X-05, X-07.
- **Commercial readiness.** `availability = NOT_FOR_SALE`.

#### F23 - Success metrics
- **Definition.** A metric framework to be defined and measured, with no invented targets or benchmarks. Commercial: organizations under contract, vessels under subscription, per-vessel MRR, ARPA per organization, gross and net revenue retention on defined cohorts, gross churn by reason, expansion from Start to Business, onboarding conversion and time-to-first-value. Activation: organization verified, vessels registered, roles configured, first maintenance task created, first work order closed, first document-expiry reminder acknowledged, first report exported, telemetry source connected where applicable. Quality and trust: tenant-isolation test results (including negative tests), authorization-defect count, audit-record completeness, export completeness, deletion-request completion time, notification state accuracy (accepted vs delivered vs acknowledged), data-freshness display accuracy, disconnected-vessel display accuracy (never shown online), incident and support ticket rates per hundred vessels. Cost: cost to serve per vessel and per organization, onboarding hours, support minutes per vessel, infrastructure and telemetry cost per vessel, acquisition cost per organization and payback. Every metric is `OPEN`; no baseline, target or benchmark figure is stated because none has been measured.
- **Evidence.** `OPEN` — no service, no billing, no telemetry and no customers; `ASSUMPTION` on the metric set derived from `VERIFIED_REPO docs/marea/COMMERCIAL-PORTFOLIO.md` §09 KPIs and `docs/marea/compliance/MAREA-COMMERCIAL-ARCHITECTURE.md` §13; the programme brief (external to this repository) §11.
- **Owner.** Product operations with finance.
- **Blockers / dependencies.** P-09, X-05, X-06, X-07.
- **Commercial readiness.** `engineering = NOT_VERIFIED`.

#### F24 - End-to-end acceptance
- **Definition.** Acceptance means the complete product demonstrably works end to end: the FLEET-AC scenarios of §9 (FLEET-AC-01 to FLEET-AC-26) are executed and recorded; two real organizations have been created and verified; a positive and a negative cross-tenant test show that organization A cannot read, modify, export or infer organization B; the eight roles and vessel assignments behave as specified, including immediate revocation and scoped, expiring external-installer access; vessels, equipment, tasks, work orders, documents, incidents and events are recorded and reported; read-only telemetry is ingested from an authorized source, displayed with age, and a disconnected vessel is never shown online; notification states, acknowledgement and escalation are recorded with distinct timestamps; per-vessel subscription accounting and plan changes reconcile; export, retention, deletion, account transfer and termination are exercised; audit records are complete; bilingual ES/EN parity is verified; the support access is audited; and a real organization has completed onboarding and handover. Documentation, mock-ups, unit tests or a simulation do not constitute acceptance. No scenario is claimed as passing; every scenario is `NOT_EXECUTED`.
- **Evidence.** `OPEN`/`BLOCKED` — scenarios defined in §9; the canonical states in §1.4; `VERIFIED_REPO docs/marea/compliance/OPEN-MARINE-CAPABILITY-INVENTORY.md` (no FLEET implementation); `VERIFIED_REPO docs/marea/WEBSITE-AND-ROADMAP.md` §6 mandatory milestone evidence; the MC-13-FLEET gate.
- **Owner.** Quality assurance with engineering and compliance; independent verification by a reviewer who is not the author.
- **Blockers / dependencies.** D-09, D-10, H-12, H-13, P-09, P-10, X-01, X-03, X-05, X-06, X-07.
- **Commercial readiness.** `compliance = NOT_STARTED`.

---

## 4. F04 capability-domain register — the 50 mandatory final SaaS domains

This register is the substantive expansion of F04. Each domain is part of the finished commercial
experience; the evidence state says what is actually established today. `OPEN` means the experience is
defined but not evidenced; `BLOCKED` names the external condition. No domain may be dropped from the
final product because it is currently unevidenced, and no domain may be presented as working because it
is specified.

### 4.1 The four commercial layers (binding vocabulary)

| Layer | What it is | What the customer pays for | What it never includes |
| --- | --- | --- | --- |
| `PLATFORM` | The multi-tenant SaaS: organization, membership, roles, vessel registry, operational records, documents, reports, export, audit and settings | The behaviour of the platform for the purchased edition | Data, hardware, connectivity, support levels beyond the published entitlement, third-party software |
| `SUBSCRIPTION` | The recurring per-vessel entitlement: plan, vessel allowance, storage/history limits, API quota, support entitlement, renewal and termination | A time-limited right to use the service for the purchased vessels and edition | A perpetual licence, ownership of data, any guarantee of availability, any SLA unless separately contracted |
| `CONNECTED_TELEMETRY` | Authorized **read-only** inputs from WATCH, HUB, AIS and any future verified source, with source, transport and freshness | A bounded data feed that the organization authorizes and can revoke | Any write path to a vessel, any command, any steering or motor control, any guarantee that data arrives |
| `SERVICES` | Onboarding, data migration, configuration, training, professional services, contracted integrations, support escalation and enterprise scope | Human work with a defined deliverable and acceptance | A product capability, an availability promise, a certification, an SLA unless separately contracted |

Rules that bind every row below: (1) buying one layer never grants another; (2) FLEET never claims
"unlimited" vessels, users, storage, API calls, support or uptime; (3) any telemetry shown is read-only,
carries its source and age, and a vessel that has stopped reporting is shown as offline/unknown, never
online; (4) no entitlement state may prevent an organization from exporting its own data or from
retrieving its records during a documented termination window; (5) tenant isolation, audit, export and
the read-only boundary are identical in all editions.

### 4.2 The register

| ID | Capability domain | Layer | Finished commercial experience | Evidence state | Blocking ids |
| --- | --- | --- | --- | --- | --- |
| CD-01 | Organization creation | `PLATFORM` | A company creates a tenant with a legal identity, operating territory, billing contact and an owner; duplicate or fraudulent organizations are refused, and the tenant id is server-assigned and never trusted from the client | `BLOCKED` — `FLEET_MULTI_TENANT_SERVICE = NOT_FOUND` | P-09, X-07 |
| CD-02 | Verified ownership and administrator verification | `PLATFORM` | Before any vessel or billing right is granted, the organization's ownership/authority and its first administrator are verified; the administrator cannot be impersonated and the verification record is auditable | `BLOCKED` — no identity or verification system | P-09, X-07 |
| CD-03 | Multi-vessel registry | `PLATFORM` | The organization registers any number of vessels within its plan allowance, each with a unique internal id, display name, type, dimensions, home berth and operational status; duplicate or conflicting registrations are prevented | `BLOCKED` — no tenant or registry | P-09, X-07 |
| CD-04 | Vessel profiles | `PLATFORM` | A vessel profile holds the operational facts the organization needs — identifiers, type, dimensions, capacity, engine/propulsion summary, owner/manager relationship, documents and equipment links — and is edited with an audit trail | `OPEN` — design only | P-09 |
| CD-05 | Fleet overview | `PLATFORM` | One screen shows every vessel with its operational state, open work, document expiries, next planned task and telemetry freshness; the overview is filterable and never shows a stale value as current | `BLOCKED` — no application | P-09, P-06 |
| CD-06 | Authorized location and status | `CONNECTED_TELEMETRY` | Position and status are shown only when an authorized read-only source exists, with source, timestamp and age; without a source the field is explicitly empty/unknown, not guessed | `BLOCKED` — `FLEET_TELEMETRY_INGESTION = NOT_VERIFIED`, H-12 | D-09, H-12, P-09 |
| CD-07 | Availability and operational state | `PLATFORM` | The organization records and sees availability (in service, in yard, chartered, laid up, unavailability reason), derived from its own operational input and, where authorized, from telemetry; automatic inference never overrides a human record silently | `OPEN` — design only | P-09 |
| CD-08 | Maintenance tasks and planning | `PLATFORM` | Recurring and one-off maintenance tasks with intervals, due windows, responsible role, vessel and equipment links; planned maintenance generated from a template; overdue state visible; completion requires evidence where the organization configures it | `OPEN` — design only | P-09 |
| CD-09 | Work orders | `PLATFORM` | A work order carries vessel, equipment, fault description, priority, assignee, parts and labour notes, state transitions and approval where the organization configures it; closing a work order writes service history | `OPEN` — design only | P-09 |
| CD-10 | Service history | `PLATFORM` | A permanent, searchable history per vessel and per equipment item: work orders, tasks, interventions, parts, documents and external service providers, with who did what and when | `OPEN` — design only | P-09 |
| CD-11 | Equipment inventory | `PLATFORM` | Equipment and installed components are registered per vessel with model, serial where recorded, installation date and service interval; inventory of spare parts and consumables where the organization uses it | `OPEN` — design only | P-09 |
| CD-12 | Vessel documents | `PLATFORM` | Certificates, insurance, registration, manuals and organization-specific documents are stored per vessel with issuer, number, validity, file and version; access follows role and vessel assignment | `OPEN` — design only | P-09, X-07 |
| CD-13 | Expiration reminders | `PLATFORM` | Expiry dates generate reminders and escalation to the responsible role at configurable lead times; an expired document is displayed as expired, never as valid; the reminder is an internal notification, not a legal or regulatory guarantee | `BLOCKED` — `FLEET_NOTIFICATION_PIPELINE = NOT_FOUND` | P-09 |
| CD-14 | Technical incidents | `PLATFORM` | Incidents are recorded with severity, affected equipment, symptoms, immediate action, owner and resolution; they link to work orders and to history and remain visible after closure | `OPEN` — design only | P-09 |
| CD-15 | Operational event history | `PLATFORM` | A chronological, append-only record of operational events — position/status transitions where telemetry exists, work and document events, membership changes, exports and support access — never silently rewritten | `OPEN` — design only | P-09, X-07 |
| CD-16 | Activity and task assignment | `PLATFORM` | Activities can be assigned to a member or role, with due date, priority, vessel scope and status; assignment respects vessel-level permissions and is visible only to those authorized | `OPEN` — design only | P-09, X-07 |
| CD-17 | Crew and staff access | `PLATFORM` | Crew and shore staff have named accounts with a role and a vessel assignment; access follows their real function and ends when the relationship ends | `OPEN` — design only | P-09, X-07 |
| CD-18 | Multi-user invitations | `PLATFORM` | An authorized administrator invites a person by email with a role and a vessel scope; the invitation expires, is single-use and can be revoked; acceptance requires identity verification | `OPEN` — design only | P-09, X-07 |
| CD-19 | Role-based access | `PLATFORM` | The eight-role model of brief §11 — `ORGANIZATION_OWNER`, `ORGANIZATION_ADMIN`, `FLEET_MANAGER`, `MAINTENANCE_MANAGER`, `CREW_MEMBER`, `READ_ONLY_VIEWER`, `EXTERNAL_INSTALLER`, `EMBARCARTE_SUPPORT` — is enforced server-side on every sensitive operation; custom roles, where offered, can only narrow the published permission set | `BLOCKED` — `FLEET_AUTHORIZATION_MODEL = DESIGN_ONLY` | P-09, X-07 |
| CD-20 | Organization-level and vessel-level permissions | `PLATFORM` | A member can hold a role at organization level and a narrower assignment at vessel level; vessel-level permission never expands organization rights, and a removed assignment loses access immediately | `OPEN` — design only | P-09, X-07 |
| CD-21 | Optional external installer access | `PLATFORM` | A yard or installer can be granted a scoped, time-bound, vessel-level `EXTERNAL_INSTALLER` access for defined work; the role cannot administer the organization, cannot invite, cannot see other vessels and expires automatically | `OPEN` — design only; the scoping rules are specified in the companion contract | P-09, X-07 |
| CD-22 | Customer/owner access where justified | `PLATFORM` | Where an organization manages third-party vessels, a boat owner can be given a limited, read-only or document-scoped view of their own vessel; the organization decides and can revoke; no cross-owner visibility exists | `OPEN` — design only | P-09, X-07 |
| CD-23 | Organization notifications | `SERVICES`/`PLATFORM` | Internal notifications (assignments, due tasks, document expiry, membership changes) reach the authorized members in-product and by the configured channels; the organization controls routing and quiet hours | `BLOCKED` — `FLEET_NOTIFICATION_PIPELINE = NOT_FOUND` | P-09 |
| CD-24 | Operational alerts | `CONNECTED_TELEMETRY` | Alerts derived from authorized read-only telemetry (for example a vessel not reporting, a threshold breach where a source exists) are created with source, freshness and severity, and follow the same notification honesty rules as the rest of the family | `BLOCKED` — no ingestion, no alert pipeline | P-09, P-06, H-12 |
| CD-25 | Read-only WATCH telemetry | `CONNECTED_TELEMETRY` | Where an organization also holds a WATCH service, authorized telemetry is consumed read-only with the WATCH freshness and delivery semantics; FLEET never writes to WATCH and never becomes the WATCH service of record | `BLOCKED` — `FLEET_TELEMETRY_INGESTION = NOT_VERIFIED` | P-09, P-06, H-12 |
| CD-26 | Read-only HUB telemetry where authorized | `CONNECTED_TELEMETRY` | Where an authorized HUB installation exists, installation and telemetry health are consumed read-only; no configuration, firmware or network change is sent from FLEET to the HUB | `BLOCKED` — no integration, no authorization model | P-09, H-12, X-07 |
| CD-27 | Event and notification history | `PLATFORM` | Every event and notification has an immutable record with actor, source, timestamps and state (created, queued, provider-accepted, delivered when confirmed, acknowledged, expired, failed, delivery-unknown) and is visible to authorized members | `BLOCKED` — no pipeline | P-09 |
| CD-28 | Reporting | `PLATFORM` | Operational and management reports — fleet status, maintenance due/overdue, work-order throughput, document expiry, incident trends, cost where captured — generated from the organization's own data with the report's data range and generation time stated | `OPEN` — design only | P-09 |
| CD-29 | Export | `PLATFORM` | An authorized administrator exports the organization's own data (vessels, equipment, tasks, work orders, history, documents where permitted, audit, memberships) in usable formats with a documented scope, and the export is recorded in the audit log | `OPEN` — design only | P-09, X-07 |
| CD-30 | Audit logs | `PLATFORM` | Sensitive actions — membership changes, invitations, role changes, permission changes, vessel transfer, export, deletion, support access, integration authorization — are recorded with actor, time, action and target, readable by the owner and never editable by customers | `BLOCKED` — no implementation | P-09, X-07 |
| CD-31 | Tenant isolation | `PLATFORM` | Server-side authorization on every sensitive operation, tenant identity derived from the authenticated session and never from a client-supplied value, and isolation verified by positive and negative tests across reads, writes, exports, reports, search, caches and background jobs | `BLOCKED` — `FLEET_TENANT_ISOLATION_TEST = NOT_EXECUTED` | P-09, X-07 |
| CD-32 | Organization settings | `PLATFORM` | Administrators manage the organization profile, territories, language, notification defaults, retention options within policy, integrations, API keys and data-processing contacts, with every change audited | `OPEN` — design only | P-09 |
| CD-33 | Billing contacts | `SUBSCRIPTION` | The organization names billing and finance contacts separate from the platform administrators; invoices, renewal notices and payment-failure notices go to them, and no platform-rights escalation follows from a billing role | `BLOCKED` — `FLEET_BILLING_AND_ENTITLEMENT_SERVICE = NOT_FOUND` | P-09, X-05 |
| CD-34 | Plan management | `SUBSCRIPTION` | The organization sees its plan, edition limits, usage against limits and the effect of an upgrade or downgrade with an effective date; plan changes never lose data and never silently reduce the published essential capability set | `BLOCKED` — no billing/entitlement service | P-09, X-05 |
| CD-35 | Per-vessel subscription accounting | `SUBSCRIPTION` | Each vessel has its own subscription record with activation date, term, renewal, state and cost owner; the organization can reconcile per-vessel charges, mid-term additions and removals, and credits | `BLOCKED` — no billing service | P-09, X-05 |
| CD-36 | Organization onboarding | `SERVICES` | A documented onboarding from scoping to handover: organization verification, vessel and equipment inventory, role design, migration where scoped, configuration, invitation, integration authorization and an acceptance record; completion is a prerequisite of billing | `OPEN` — service design only | P-09, X-05, X-06 |
| CD-37 | Service desk and support workflows | `SERVICES` | Members open support requests with category and severity, see status and history, and receive a documented response model; the support desk is staffed by a real operation that does not exist yet | `BLOCKED` — no support operation, no severities agreed | P-09, X-05 |
| CD-38 | Retention | `PLATFORM` | A published retention schedule per data class (operational records, telemetry history, notifications, audit, support, billing, documents) with legal-hold and incident exceptions; retention is applied automatically and is visible to the organization | `OPEN` — design only; values `OPEN` | P-09, X-07 |
| CD-39 | Deletion | `PLATFORM` | Authorized deletion of vessels, members, documents and the organization follows a documented request-and-confirmation flow, honours legal holds, offers an export first and records the deletion in the audit log | `OPEN` — design only | P-09, X-07 |
| CD-40 | Account transfer | `PLATFORM` | When a business, a management contract or a vessel changes hands, a documented transfer moves the tenant or the vessel with verifiable consent from both sides, revokes the previous access and preserves the audit record | `OPEN` — design only | P-09, X-07 |
| CD-41 | API and integration policies | `PLATFORM` | Published API rules: authentication, scopes, rate limits, pagination, versioning, deprecation notice, error semantics, audit and acceptable use; no API may expose another tenant's data or any vessel command | `BLOCKED` — no API exists | P-09, X-07 |
| CD-42 | Permissioned integrations | `PLATFORM` | Third-party integrations are authorized by an administrator, scoped to defined data, revocable at any time and recorded in the audit log; the organization can see what data each integration receives | `BLOCKED` — no integration framework | P-09, X-07 |
| CD-43 | Service status and SLA reporting | `SERVICES` | A service-status surface and, only where a contract defines it, SLA measurement reporting; until then the published statement is `NO_SLA_ESTABLISHED` and no uptime percentage is shown | `BLOCKED` — `FLEET_SLA = NO_SLA_ESTABLISHED` | P-09, X-05 |
| CD-44 | Support escalation | `SERVICES` | A documented escalation path for support cases; where the organization is a Business or Enterprise customer, escalation contacts are named in the contract and the audit trail records who escalated what and when | `BLOCKED` — no support operation | P-09, X-05 |
| CD-45 | Contract and renewal | `SUBSCRIPTION` | Contract term, renewal date, notice period, indexation, termination rights and data-return terms are stated before signature and reflected in the product; renewal never depends on a hidden default | `BLOCKED` — no terms, no billing | P-09, X-05, X-02 |
| CD-46 | Privacy and data governance | `PLATFORM` | A privacy notice, records of processing, role-based data minimisation, consent or contract basis per data class, access and deletion controls, and a controller/processor position that is assessed rather than assumed; telemetry involves vessel positions and must be treated as personal data where it identifies people | `BLOCKED` — `FLEET_DPA_AND_SUBPROCESSORS = NOT_EXECUTED` | X-07 |
| CD-47 | Bilingual UI and documentation | `PLATFORM` | Spanish (Spain) and English user interface, notifications, reports, help content and legal notices, with parity of meaning and no untranslated operational field; language is a user preference, not a data-residency claim | `OPEN` — no UI exists | P-09 |
| CD-48 | Enterprise onboarding | `SERVICES` | A contracted onboarding project for the Enterprise tier: organization and fleet inventory, role and governance design, integration and data-migration scope, acceptance criteria, training and a named delivery owner, all defined in the contract | `BLOCKED` — no Enterprise contract or delivery capacity | P-09, X-05, X-06 |
| CD-49 | Enterprise termination and exit | `SERVICES` | A contracted exit: notice, export of all organization data, transition assistance where agreed, deletion certification and the treatment of any integration or custom work; no exit terms exist | `BLOCKED` — no contract | P-09, X-05, X-02 |
| CD-50 | Data-processing terms and subprocessor transparency | `PLATFORM` | A DPA with roles, subprocessor list with locations and change notice, international-transfer position, security measures, breach notification and audit rights, available before signature; none exists | `BLOCKED` — `FLEET_DPA_AND_SUBPROCESSORS = NOT_EXECUTED` | X-07 |

### 4.3 Coverage check

The register covers every capability mandated for the final product. The Master Prompt §8.3 domain list
is mapped as follows: the forty-eight listed items are all present, the compound item "enterprise
onboarding/termination" is split into CD-48 and CD-49 because the two have different customers,
deliverables and exit obligations, and CD-50 (data-processing terms and subprocessor transparency) is
added because a B2B organization cannot lawfully be sold to without it. That is fifty domains, none
omitted and none claimed as evidenced.


---

## 5. The commercial layers separated, and what FLEET is not

### 5.1 What the customer is buying — in one paragraph per layer

- **PLATFORM.** A multi-tenant business application for one organization: its vessels, people, roles,
  operational records, documents, reports, exports and audit. The platform is the product; it does not
  include hardware, connectivity, charts, weather data or third-party software. It is not a safety
  management system, not a compliance certification and not a control system.
- **SUBSCRIPTION.** A time-limited, per-vessel right to use the platform for the purchased edition and
  allowance, with renewal, plan management and per-vessel accounting. The subscription is not a perpetual
  licence and does not include onboarding, migration, custom work or support beyond the published
  entitlement. Expiry degrades the paid service; it never traps the organization's own data.
- **CONNECTED_TELEMETRY.** Authorized read-only data from WATCH, HUB, AIS or a future verified source,
  with source, transport, timestamp and freshness. The organization authorizes the source and can revoke
  it; FLEET never writes back, never configures a device and never issues a command. No telemetry is
  included by buying FLEET and no vessel is "connected" because a subscription exists.
- **SERVICES.** Human work: onboarding, data migration, configuration, training, contracted integrations,
  Enterprise scope, support escalation. Services have a deliverable and an acceptance, not a feature list;
  no service level is promised unless a contract defines one and measurement exists.

### 5.2 What FLEET is not

FLEET is not: a remote-control, remote-helm or autopilot product; a distress, rescue, SOLAS or GMDSS
service; a certified security product or a security certification of any kind; a safety-management system,
a classification-society tool or a regulatory-compliance certificate; a deep-sea shipping ERP or a
charter-booking engine; an insurer, a broker or an underwriting data product; a consumer monitoring app or
a social boat-sharing network; a public vessel-tracking service; a hardware product; or a promise of
uptime, instant alerts or "unlimited" anything.

### 5.3 FLEET SaaS product versus the MAREA FLEET package

| Object | What it is | Who governs it | Status here |
| --- | --- | --- | --- |
| MAREA FLEET (the SaaS product, this dossier) | The multi-vessel organization platform with its three editions and per-vessel subscription | This dossier (D3-FLEET) and the batch-03 pricing and channel model | `DEFINED`, `NOT_FOR_SALE`, prices `HYPOTHESIS_UNAPPROVED` |
| MAREA FLEET package / bundle | The commercial package defined in `COMMERCIAL-PORTFOLIO.md`: vessel SaaS, onboarding, optionally hardware and communications, priced bespoke | MC-08 bundle governance (the Lead's bundle matrix), not this dossier | Content, price and publication are `OPEN`; the bundle is never a purchasable price and never a sum of this dossier's hypotheses |
| A FLEET subscription alongside WATCH/HUB hardware | Two separate purchases by the same organization | Each family's own dossier and terms | No product is presumed included in another; hardware is never included in a FLEET subscription |

A dossier reader must never conclude that buying the FLEET package includes any hardware, or that
buying a FLEET subscription creates a WATCH service. The bundle matrix is MC-08; this dossier only
fixes the SaaS product.

### 5.4 Cross-product authority and the no-control boundary

| Relationship | Permitted | Prohibited |
| --- | --- | --- |
| FLEET ← WATCH | Read-only telemetry and alert state under an authorized, consented service | Writing to WATCH, changing WATCH rules, acting as the WATCH service of record, any command to the device |
| FLEET ← HUB | Read-only installation and telemetry health where authorized | Configuration, firmware, network or bus changes; republishing HUB local data beyond the consented subset |
| FLEET ← SENSE | Nothing until a verified integration exists; then read-only measured values through WATCH/HUB | Treating a sensor module as network-connected; accepting uncalibrated values as reliable |
| FLEET ← AIS | Read-only receive-only traffic/position context where the data-rights position exists | Any implication of collision avoidance, transmission or full traffic visibility |
| FLEET ← NAV | Position/passage context only with explicit customer permission | Navigation authority, chart substitution, route execution |
| FLEET ← WEATHER | Licensed forecast context where provider terms permit organizational use | Redistribution, offline rights, accuracy guarantees, double billing |
| FLEET ← DISPLAY | Nothing in the defined product (status `UNKNOWN`) | Treating DISPLAY as a FLEET endpoint or a control surface |
| FLEET ↔ PILOT | At most a read-only status view after engineering and privacy review; status `BLOCKED` for any control | Any engage, disengage, heading, throttle, rudder or steering command of any kind, remote or local, from FLEET |
| FLEET ↔ subscription | Plan changes and entitlement states reflected in the platform | Disabling export, audit or retrieval of the organization's own records because of payment state |

Rules: server-side authorization on every sensitive operation; tenant identity from the authenticated
session, never from a client-supplied value; an organization can never read or modify another; removed
members lose access immediately; the external installer can never become an organization administrator;
exports, reports, search, caches and background jobs honour tenant scope; audit logs never leak
cross-tenant data; vessel and device transfer is authorized and auditable; support access is documented
and audited; and **no steering, motor, thruster, bus-command or remote-control path exists anywhere**.
The depth of each of these rules — including the permission matrix, threat model and DPA position — is
owned by `docs/marea/products/FLEET-TENANCY-SECURITY-AND-DATA-GOVERNANCE.md`, which this dossier
cross-references and does not duplicate.

### 5.5 The eight-role organization model — customer-level summary

The full matrix lives in the companion contract. The customer-facing summary is binding here:

| Role | Scope | Typical holder | Can | Cannot |
| --- | --- | --- | --- | --- |
| `ORGANIZATION_OWNER` | Organization | Company owner or director | Everything an administrator can do, plus contract, billing and ownership transfer | Bypass audit; delete audit; grant itself access to another tenant |
| `ORGANIZATION_ADMIN` | Organization | Operations director or shore manager | Manage members, invitations, roles, vessels, settings, integrations and exports | Transfer ownership; change contract without the owner |
| `FLEET_MANAGER` | Organization or assigned vessels | Fleet or operations manager | Manage vessels, availability, assignments, reports and operational data within scope | Manage members or billing; change security settings |
| `MAINTENANCE_MANAGER` | Organization or assigned vessels | Technical manager or chief engineer | Manage equipment, maintenance plans, work orders, service history and incidents within scope | Manage members or billing; access unrelated vessels |
| `CREW_MEMBER` | Assigned vessels | Captain, skipper or crew | Record and complete assigned operational work, see the vessel's operational record within scope, acknowledge notifications | Configure the organization; see other vessels; invite users |
| `READ_ONLY_VIEWER` | Organization or assigned vessels | Owner representative, auditor, insurer representative under NDA | Read the records explicitly shared with the role | Modify, export beyond its scope, invite |
| `EXTERNAL_INSTALLER` | One or more named vessels, time-bound | Yard or installer technician | Perform the defined work on the assigned vessel, record it and see only what the work requires | Administer the organization, invite users, see other vessels, extend its own access |
| `EMBARCARTE_SUPPORT` | Explicitly scoped ticket or incident, time-bound | EMBARCARTE support engineer | Access the minimum data needed to resolve the approved case, with the customer's authorization | Become an organization administrator, browse the tenant freely, act without an audited case reference |

Every role is enforced server-side. Vessel-level assignments narrow a role and never expand it. The
organization can review who holds which role and on which vessel, and revoke any membership immediately.

---

## 6. Customer segments

### 6.1 Segment register

All figures in this section are planning assumptions or hypotheses. **No customer interview, pilot,
testimonial or reference exists** (X-06): the register is the definition of who the finished product is
for and what must be validated before investment, not evidence that these buyers behave as described.

| # | Segment | Typical organization size | Operational problems today | Current alternatives | Buyer / economic decision-maker |
| --- | --- | --- | --- | --- | --- |
| S1 | Sailing schools and training centres | 4–25 boats, 3–20 staff, seasonal calendar | Course scheduling competes with boat availability; instructor hand-overs lose boat state; damage and maintenance history is oral; certificates and insurance for boats and instructors expire unnoticed | Spreadsheets, a booking tool, WhatsApp groups, paper logbooks, a consumer maintenance app | Owner or school director (economic); head instructor or base manager (champion) |
| S2 | Charter and rental operators | 10–150 vessels, mixed owned and managed fleets | Turnaround between charters is under-documented; maintenance found by the next customer; owner reporting is manual; crew changes lose vessel knowledge; deposits and damage are disconnected from the vessel record | Charter-booking platforms plus spreadsheets; a maintenance app used by one person; phone coordination | Managing director or fleet director (economic); operations manager (champion) |
| S3 | Marinas and berth operators | 50–500 berths, some customer-vessel care services | Customer-vessel status, work permissions and insurance documents are managed by phone and paper; a berth-holder's contractor needs scoped access; incident history is hard to reconstruct | Marina management system for billing/berths plus informal records for vessel work; email and phone | Marina director (economic); operations or berth manager (champion) |
| S4 | Boat-management, maintenance and refit companies | 10–200 vessels managed for several owners | Work orders and parts per vessel; owner-specific reporting; technician access to multiple vessels without a shared login; service history that must survive the contract | Spreadsheets, accounting tools, a generic field-service app, email reports | Company owner or operations director (economic); service manager (champion) |
| S5 | Small professional and workboat fleets | 3–50 vessels, pilot/survey/aquaculture/port services | Maintenance and document compliance in a regulated operating context; crew certification and rest requirements; a shipping suite is oversized and quote-only; consumer tools lack roles and audit | Shipping PMS quoted on application, spreadsheets, paper files, classification-society portals for statutory items | Operations director or technical manager (economic); fleet superintendent (champion) |
| S6 | Multi-boat private owners and family offices | 2–10 vessels, captain plus small shore office | Several vessels, one small team; costs and maintenance across vessels; a captain leaves and the history leaves with them | Spreadsheets, a yacht-management app priced per yacht, the family office's accounting system | Principal or family-office manager (economic); captain or yacht manager (champion) |

### 6.2 Daily user roles, required workflows, compliance expectations, onboarding cost and retention

| # | Daily user roles | Required workflows | Compliance expectations (from the organization, not product claims) | Onboarding cost drivers | Retention drivers | Willingness-to-pay assumption |
| --- | --- | --- | --- | --- | --- | --- |
| S1 | Base manager, head instructor, instructors, boatswain | Boat availability, course allocation, defect reporting, turnaround checks, document expiry, instructor certification view | Boat and instructor documentation, insurance validity, internal safety procedures; the school remains responsible for its own SMS | Import of the fleet and instructor list, role design, training a seasonal team, mobile-first usability | Seasonal re-onboarding is painful; history across seasons; low admin time per course | `HYPOTHESIS` — the segment is price-sensitive and seasonal; a per-vessel monthly figure near the low end is plausible only if it replaces real administrative hours; unvalidated |
| S2 | Operations manager, base manager, captains, maintenance technicians, owner-relations staff | Charter turnaround checklist, defect and damage capture, maintenance planning, owner reporting, crew assignment, document expiry | Charter contracts and insurance per vessel, safety procedures, owner reporting obligations; the operator remains responsible for its SMS | Fleet and owner import, owner-view configuration, report templates, crew invitation at scale, integration with an existing booking system | Owner reporting value, turnaround consistency, crew turnover resilience, fleet-wide reporting | `HYPOTHESIS` — the segment can justify a mid-range per-vessel fee if it replaces manual owner reporting and reduces turnaround incidents; unvalidated |
| S3 | Berth manager, customer-service staff, technical/yard coordinator, external contractors | Customer-vessel register, work authorization, scoped contractor access, incident log, document validity, owner communication | Berth-holder insurance and documentation, work-permission rules, incident records; the marina is not the vessel's operator | Vessel register import, contractor access design, owner-communication templates, training seasonal staff | The berth-holder relationship is long; scoped contractor access reduces friction; incident history is valuable | `HYPOTHESIS` — marinas buy software per berth or per site, not per vessel, so a per-vessel FLEET price may not fit; a site/seat model may be needed and is `OPEN` |
| S4 | Service manager, technicians, parts coordinator, owner-relations staff | Work orders, parts, technician assignment, per-owner reporting, service history, warranty tracking, external-installer access | Contractual service obligations to owners, technician competence records, data-processing obligations as a processor for owner data | Migration of open work orders and history, role design for technicians, owner-portal setup, report templates | Open work orders and history are the business record; switching cost is high but so is the value of portability | `HYPOTHESIS` — the segment has the clearest ROI case (billed technician hours and rework), but it may prefer a field-service tool; unvalidated |
| S5 | Technical manager, fleet superintendent, captains, compliance officer | Planned maintenance, statutory-document register, crew certification and rest hours, incidents, work orders, reporting, audit trail | ISM/flag/class obligations may apply to some operators; FLEET is not a compliance certificate and does not replace the operator's SMS | Import of equipment and statutory register, governance and role design, integration scoping, training | Statutory evidence and audit trail; operational continuity; required reporting | `HYPOTHESIS` — this segment pays professional prices (see §F16) and is the most likely Enterprise candidate; a per-vessel fee must be justified against a suite that includes compliance depth FLEET does not yet define; unvalidated |
| S6 | Captain or yacht manager, shore assistant, owner | Multi-vessel overview, maintenance and cost visibility, documents, service history, owner reporting | Insurance, flag-state documentation and owner reporting where applicable; the owner remains responsible | Import of vessels and history, captain training, owner-view setup | Continuity across crew changes, owner visibility, multi-vessel consolidation | `HYPOTHESIS` — the segment currently buys per-yacht management suites; FLEET must be cheaper or broader to displace them; unvalidated |

### 6.3 Buyer and decision map

- **Economic buyer:** owner, managing director, marina director, operations director or family-office
  manager. They approve the recurring per-vessel spend and care about administrative hours saved,
  reporting quality, auditability and risk of losing operational knowledge.
- **Champion:** operations manager, fleet superintendent, head instructor or service manager. They use
  the product daily and care about not chasing information.
- **Blocker:** an incumbent booking, marina or shipping system whose owner sees FLEET as "another tool",
  and an IT/security reviewer who will ask for the DPA, isolation evidence and exit terms that do not yet
  exist. Those are the questions a FLEET pilot must be able to answer.
- **Procurement reality:** most of these organizations are small; purchase decisions are fast but
  budgets are annual and seasonal. Enterprise-like procurement appears only in S5 and large S2/S3 buyers,
  which is why the Enterprise tier is contracted rather than standardised.

### 6.4 Willingness-to-pay assumptions and their limits

Willingness to pay is a `HYPOTHESIS` built from three observable anchors and no customer evidence:
the retrieved competitor price structure (§F16) shows that professional maritime operations software is
priced per vessel per month and that yacht-management software is priced per yacht per month; the
consumer monitoring category prices far lower; and the target segments' alternative is mostly labour and
spreadsheets, not a competing subscription. The hypotheses that must be tested in MC-09/MC-10 are:
whether organizations will pay a per-vessel monthly fee at all in S1/S3, whether S2/S4 compare FLEET
with a field-service tool, whether S5 will accept a platform without deep compliance modules, and
whether annual prepayment is acceptable seasonally. **No interview, survey, pilot or price test exists,
and no willingness-to-pay figure is asserted.**

### 6.5 Non-segments and refused business

FLEET is not offered to: deep-sea shipping, tanker, offshore or cruise operators expecting a full
shipping ERP; navies, coast guards or any command-and-control use; emergency dispatch or safety-of-life
services; insurers seeking underwriting, claims or pricing data; any customer requiring remote control,
autonomous operation or vessel command; and any customer requiring "unlimited" usage, an uncapped API,
an unconditional SLA or a security certification that does not exist. Those are refused rather than
served badly.

---

## 7. Edition architecture — Start, Business and Enterprise

### 7.1 Verdicts

| Edition | Verdict | Commercial meaning | Price |
| --- | --- | --- | --- |
| MAREA FLEET Start (`FLEET-START`) | `DEFINED` | Complete essential platform for a small fleet; customer-facing configuration fully specified and commercially coherent; still not sellable | EUR 49 per vessel/month, VAT excluded; `HYPOTHESIS_UNAPPROVED` starting price; suggested 1–10 vessels |
| MAREA FLEET Business (`FLEET-BUSINESS`) | `DEFINED` | Richer permissions, workflows, reporting, API and integrations for a larger fleet; the edition is a complete defined target specification, with numeric limits and costed validation still `OPEN` as parameters, not as a verdict condition | EUR 79 per vessel/month, VAT excluded; `HYPOTHESIS_UNAPPROVED`; suggested 11–50 vessels |
| MAREA FLEET Enterprise (`FLEET-ENTERPRISE`) | `CONTRACTED_TIER` | Contracted service tier — scope, volumes, integrations, support model and any SLA defined in a signed contract; never a standard checkout SKU | `NOT_ESTABLISHED`; no amount |

The edition-verdict vocabulary is owned by `docs/marea/products/PRODUCT-EDITIONS-DISPLAY-WEATHER-FLEET.md`;
the batch-03 `CONTRACTED_TIER` verdict is recorded there and in the decision log by the Lead. `RELEASED`,
`FOR_SALE`, `APPROVED` and `PUBLISHABLE` are prohibited for every FLEET edition, and
`publicationConditional` is true for all three.

### 7.2 Outcome differentiation

| Dimension | Start (intended outcome) | Business (intended outcome) | Enterprise (contracted outcome) |
| --- | --- | --- | --- |
| Organization and roles | One organization, standard eight-role model, vessel-level assignments | Same model plus narrower custom roles, approval workflows and delegated administration | Governance design agreed in contract, including multi-entity structures where needed |
| Fleet operations | Registry, profiles, overview, availability, maintenance planning, work orders, history, equipment, documents, expiry, incidents, events, assignments, notifications, reports, export, audit | Everything in Start plus richer maintenance plans, approval chains, scheduled reporting and cross-vessel analytics | Everything in Business plus contracted scope, custom workflows and integrations |
| Telemetry | Read-only WATCH telemetry where the organization has WATCH | Plus read-only HUB installation/telemetry health where authorized | Plus contracted integration work, with the same read-only boundary |
| API and integrations | No API; no third-party integration (intentionally excluded) | Published API within limits; permissioned integrations | Contracted integration scope and rate terms |
| Support | Published support model of the edition | Priority support within published hours | Named delivery owner and contracted support model |
| Contracts | Monthly or annual, per vessel | Annual preferred, per vessel, volume terms | Signed contract: term, volumes, service commitments only if measured, exit plan |
| What is identical | Tenant isolation, audit, export, role enforcement, read-only boundary, disclaimer set and data-deletion obligations are the same in every tier | Same | Same |

### 7.3 Explicit boundaries — no "unlimited"

There is no unlimited vessel count, user count, storage, telemetry history, API call volume, support
entitlement, uptime, hosting capacity or custom-integration capacity in any FLEET edition. Every limit
must be published as a number or a named range before sale, and an organization exceeding a limit must
see a stated, predictable behaviour (upgrade path, throttling with notice, or refusal) — never a silent
degradation and never a surprise bill. The numbers and the over-limit behaviour are `OPEN`.

| Boundary | Start | Business | Enterprise | Publication rule |
| --- | --- | --- | --- | --- |
| Vessels per organization | Suggested 1–10; number `OPEN` | Suggested 11–50; number `OPEN` | Contracted volume | Must be a published number, never "unlimited" |
| Named users | Included seats; count `OPEN`; no per-seat charge in Start | Included seats; count `OPEN`; no per-seat charge | Contracted seats | Must be published; extra seats priced only when decided |
| Storage and telemetry history | Versioned retention window; number `OPEN` | Longer window; number `OPEN` | Contracted | Must be published per data class |
| API calls | No API | Published quota; number `OPEN` | Contracted | Must be published with rate limits |
| Integrations | None | Permissioned catalogue; list `OPEN` | Contracted custom scope | No integration is claimed as available |
| Support | Published entitlement; numbers `OPEN` | Priority within published hours | Contracted model | No response-time guarantee until a contract exists |
| Uptime / SLA | `NO_SLA_ESTABLISHED` | `NO_SLA_ESTABLISHED` | Only if contracted and measured | No percentage may be published without measurement |
| Hosting / residency | `OPEN` | `OPEN` | Contracted where offered | No data-residency claim may be made yet |

### 7.4 Pricing hypotheses and unresolved terms

Only these FLEET amounts may appear anywhere, only as `HYPOTHESIS_UNAPPROVED`, VAT excluded, per vessel
per month: **Start EUR 49**, **Business EUR 79**. **Enterprise has no amount** (`NOT_ESTABLISHED`).

| Commercial term | Status at MC-07 | What must be decided before sale |
| --- | --- | --- |
| Per-vessel rate | `HYPOTHESIS_UNAPPROVED` | Costed unit economics, segment price tests, approval |
| Organisation fee | `HYPOTHESIS`: none in Start and Business; Enterprise negotiated | Formal decision and publication |
| User seats | Included, not charged per seat in Start and Business | Included count and additional-seat terms |
| Onboarding | Separately quoted | Scope, duration, price basis and acceptance |
| Data migration | `OPEN` | Whether included, scoped or a paid service |
| Telemetry/storage/API limits | `OPEN` | Published numbers per edition and over-limit behaviour |
| Billing period | Monthly or annual (annual preferred) | Discount, notice and indexation |
| VAT and territory | VAT excluded (frozen) | Territorial tax treatment and invoicing entity |
| Minimum term | `OPEN` | Term, notice, cancellation and refund |
| Price indexation | `OPEN` | Index and cap, stated before signature |
| Volume discount | `OPEN` | Bands and eligibility |
| Partner/reseller margin | `OPEN` | Channel agreement |
| Support level | `OPEN` | Hours, channels, severities, escalation |
| SLA | `NO_SLA_ESTABLISHED` | Contracted commitment plus measurement, or none |
| Data processing terms | `NOT_EXECUTED` | DPA, subprocessors, transfers, breach notice |
| Exit and deletion | `OPEN` | Export window, transition, deletion certification |

### 7.5 The Enterprise tier is contracted, not a checkout SKU

Enterprise is not a bigger button on a pricing page. It exists because some organizations need a
multi-entity governance design, contracted volumes, agreed integrations, a named delivery owner, custom
reporting or a formally measured service commitment. Every one of those is defined in a signed contract
with a scope, an acceptance, a price and an exit plan. Until such a contract exists, the only truthful
statements about Enterprise are: the tier exists as a **service concept**, its price is
`NOT_ESTABLISHED`, no SLA exists, no custom integration exists and no Enterprise customer exists. The
Enterprise tier must never be used to imply extra security, certification or availability that the
platform does not have.

---

## 8. Read-only telemetry and notification honesty

### 8.1 The four telemetry states

Every telemetry-derived value in FLEET carries one of four states, derived from a published freshness
policy per data class: **live** (received within the freshness window), **delayed** (received but older
than the live window), **stale** (older than the stale window, shown as last-known with its age) and
**unknown** (no value, no source or authorization revoked). Only *live* may be displayed as a current
value. A vessel with no data is shown as **offline/unknown** — it is never shown as online, healthy or
compliant, and the absence of an alert is never presented as evidence that nothing is wrong.

### 8.2 Data classes and their sources

| Data class | Possible source (read-only) | Freshness/state shown | Authorization | Current status |
| --- | --- | --- | --- | --- |
| Vessel position | WATCH, HUB (where authorized), AIS-derived where rights exist | Source, timestamp, age, live/delayed/stale/unknown | Organization authorization plus source service contract | `BLOCKED` — no ingestion (P-09, H-12) |
| Device/installation health | WATCH, HUB | Last contact, state, age | Organization authorization | `BLOCKED` — no integration |
| Alerts and events from WATCH | WATCH | Full lifecycle with distinct timestamps | Organization authorization | `BLOCKED` — no ingestion |
| Fuel/engine/tank readings | HUB, SENSE through HUB/WATCH where verified | Source, calibration requirement, age | Organization authorization plus verified compatibility | `BLOCKED` — SENSE status `UNKNOWN`, HUB status `CONDITIONAL` |
| Traffic context | AIS receive-only | Source, age, receive-only limitations | Data-rights decision required | `BLOCKED` — D-09 `LEGAL_REVIEW_REQUIRED` |
| Weather context | WEATHER licensed service | Source, model, timestamp, freshness | Provider terms plus entitlement | `BLOCKED` — D-10, `NOT_GRANTED` |
| Organization operational data | The organization itself | Author/user/time | Role and vessel assignment | `OPEN` — platform not built |

### 8.3 Frozen integration statuses (brief §9)

| Integration | Status | Reason and evidence |
| --- | --- | --- |
| FLEET-WATCH | `CONDITIONAL` | Read-only telemetry and alerts only; there is no WATCH telemetry service (`WATCH_INGESTION = NOT_VERIFIED`) and no FLEET ingestion; condition: a contracted, consented, tested read-only feed |
| FLEET-HUB | `CONDITIONAL` | Read-only installation and telemetry health; no HUB production integration; condition: authorized installation with a recorded test and no write path |
| FLEET-SENSE | `UNKNOWN` | No verified integration path; SENSE has no connectivity of its own and its measurement accuracy is `NOT_MEASURED` |
| FLEET-PILOT | `BLOCKED` | `BLOCKED` for any control; at most a read-only status view after engineering and privacy review; no remote command path may ever exist |
| FLEET-NAV | `PLANNED` | Only with explicit customer permission and an approved interface; no implementation exists |
| FLEET-WEATHER | `CONDITIONAL` | Only where provider terms permit organizational operational use; no right is granted (D-10) |
| FLEET-DISPLAY | `UNKNOWN` | No DISPLAY hardware and no interface; nothing may be assumed |
| FLEET-AIS | `CONDITIONAL` | Read-only, receive-only, subject to the AIS data-rights decision (D-09); no collision-avoidance or transponder implication |

No integration is `SUPPORTED`. `UNKNOWN` never means "probably works". The full matrix with ten canonical
columns is `docs/marea/products/PRODUCT-COMPATIBILITY-DISPLAY-WEATHER-FLEET.md` (owned by the
compatibility workstream, D5).

### 8.4 No remote control path — the hard boundary

There is no steering, rudder, throttle, motor, thruster, autopilot engagement, firmware-flash, bus-command
or cloud-to-actuator path in FLEET, in any edition, on any plan, including Enterprise. This is not a
limitation of the current version: it is a permanent design boundary. The organization's users can read,
record, plan and report; they cannot command the vessel. Any future status display of PILOT is read-only
and requires a separate safety, security and privacy review; any control capability would require a new
product definition, a new safety case and a new legal assessment, and is not planned. FLEET also cannot
be used to bypass a local control: it never carries a message that a vessel device would interpret as a
command.

### 8.5 Provider notification is not human delivery

FLEET reuses the family's canonical notification state model (README §20):
`EVENT_OBSERVED` → `RULE_MATCHED` → `ALERT_CREATED` → `QUEUED` → `PROVIDER_ACCEPTED` →
`DELIVERED_WHEN_CONFIRMED` → `ACKNOWLEDGED`; terminal states `EXPIRED`, `FAILED`, `DELIVERY_UNKNOWN`.
The eight timestamps are never conflated (`eventTime`, `deviceClockTime`, `serverReceiptTime`,
`alertCreationTime`, `notificationHandoffTime`, `providerAcceptanceTime`, `deliveryConfirmationTime`,
`userAcknowledgementTime`). Three rules bind every FLEET surface: provider acceptance never sets
delivered; delivery confirmation never sets acknowledged; and an event observed while a vessel was
offline may reach the organization only when connectivity returns, marked as recorded-while-offline and
with its original time. FLEET makes **no guarantee of instant or immediate alerts**, and no alert is ever
described as delivered to a human without an explicit acknowledgement.

### 8.6 Degraded conditions the organization must see

| Condition | What FLEET shows | What it must never show |
| --- | --- | --- |
| Telemetry source offline | Offline/unknown state, last contact time, last-known values with age | A green "online" tick, a fabricated current value, or "all normal" |
| Telemetry source authorization revoked | Source disconnected by the organization, with the revocation recorded in the audit log | An error implying the vessel failed |
| Provider accepts but does not confirm | `PROVIDER_ACCEPTED` with no delivery evidence; `DELIVERY_UNKNOWN` where no confirmation is available | "Delivered" or "seen" |
| Nobody acknowledges an alert | Escalation state and its history; final state reported honestly | "Handled", "resolved" or "seen by the team" |
| Subscription lapsed | Paid features unavailable after the documented grace period; export and retrieval of the organization's own records still offered | Any claim that the organization's data would be deleted immediately or held hostage |
| Support access | Customer-authorized, scoped, time-bound, audited access recorded in the tenant | Silent or open-ended vendor access |


---

## 9. Acceptance scenarios — FLEET-AC-01 to FLEET-AC-26

All scenarios are `NOT_EXECUTED`. None is claimed to pass. Each requires a recorded result naming the
environment, the test data, the operator and the date before any behaviour may be described as working.
Classification vocabulary: `NOT_EXECUTED` only; no other value is used in this milestone.

| ID | Scenario | Expected end-state behaviour | Classification | Evidence required |
| --- | --- | --- | --- | --- |
| FLEET-AC-01 | Organization creation and verified administration | A company creates a tenant, its legal identity and authority are verified, the first `ORGANIZATION_OWNER` is established, and no duplicate or fraudulent organization is created | `NOT_EXECUTED` | Tenant record, verification record, duplicate/refusal test |
| FLEET-AC-02 | Invitations, expiry and revocation | An administrator invites a member with a role and vessel scope; the invitation is single-use and expires; acceptance verifies identity; revocation ends access immediately | `NOT_EXECUTED` | Invitation log, expiry test, revocation timing test |
| FLEET-AC-03 | Eight-role enforcement and organization/vessel-level permissions | Each of the eight roles can do exactly what the matrix permits and nothing else; a vessel-level assignment never expands organization rights; permission changes take effect on the next request | `NOT_EXECUTED` | Positive and negative authorization test per role; permission-change test |
| FLEET-AC-04 | External installer access scope and expiry | An `EXTERNAL_INSTALLER` sees only the assigned vessel for the assigned work and time window, cannot invite or administer, and loses access automatically | `NOT_EXECUTED` | Scoping test, expiry test, attempted-escalation negative test |
| FLEET-AC-05 | Customer/owner limited access where justified | A boat owner receives a limited view of their own vessel only, cannot see other owners' vessels or the whole tenant, and can be revoked | `NOT_EXECUTED` | Access matrix test, cross-owner negative test |
| FLEET-AC-06 | Tenant isolation — positive | Organization A reads, modifies, exports and reports on its own data with full fidelity | `NOT_EXECUTED` | Functional test per data class |
| FLEET-AC-07 | Tenant isolation — negative (cross-tenant) | Organization A cannot read, modify, delete, export, search, infer from caches or background jobs, or enumerate any resource of organization B; a client-supplied tenant id is ignored or rejected | `NOT_EXECUTED` | Negative test suite across reads/writes/exports/reports/search/caches/jobs; tenant-id tampering test |
| FLEET-AC-08 | Fleet overview and vessel profiles | Every vessel appears with its state, open work, expiries and telemetry freshness; profile edits are audited; no stale telemetry is displayed as current | `NOT_EXECUTED` | Screen evidence per field, audit record, stale-value test |
| FLEET-AC-09 | Maintenance tasks and planning | Recurring and one-off tasks are created, planned, rescheduled and completed with an audit trail; due and overdue states are correct | `NOT_EXECUTED` | Task lifecycle records; due-state test |
| FLEET-AC-10 | Work orders and service history | A work order moves through its states, records parts and labour, closes into service history and remains searchable by vessel and equipment | `NOT_EXECUTED` | Work-order record; history query evidence |
| FLEET-AC-11 | Equipment inventory | Equipment and installed components are registered per vessel with service intervals; inventory records are correct and access-controlled | `NOT_EXECUTED` | Inventory record; role-visibility test |
| FLEET-AC-12 | Documents, versions and expiry reminders | Documents are stored with issuer, number, validity and version; expiry reminders reach the responsible role; an expired document is shown as expired | `NOT_EXECUTED` | Document record; reminder record; expired-state evidence |
| FLEET-AC-13 | Incidents and operational event history | An incident is recorded, linked to a work order and preserved after closure; the event history is chronological, append-only and complete | `NOT_EXECUTED` | Incident record; append-only test; event query evidence |
| FLEET-AC-14 | Activity assignment and organization notifications | An activity is assigned to a member or role within the permitted scope; the notification reaches the intended recipient and not others | `NOT_EXECUTED` | Assignment record; delivery record; over-recipient negative test |
| FLEET-AC-15 | Read-only WATCH telemetry with freshness | Authorized WATCH data appears with source, timestamp, freshness state and age; no write-back occurs; revoking authorization stops the feed | `NOT_EXECUTED` | Ingestion record; freshness display; write-back negative test; revocation test |
| FLEET-AC-16 | Read-only HUB telemetry where authorized | Authorized HUB installation/telemetry health appears read-only; no configuration, firmware or network change is sent to the HUB | `NOT_EXECUTED` | Integration record; outbound-traffic audit showing no write path |
| FLEET-AC-17 | Disconnected vessel never shown online | A vessel that stops reporting moves to offline/unknown after the published threshold and is displayed with last contact and last-known values with age | `NOT_EXECUTED` | Controlled disconnect test; state-transition evidence; screenshot at each threshold |
| FLEET-AC-18 | Alert lifecycle honesty | An alert records event, creation, handoff, provider acceptance, delivery (when confirmed) and acknowledgement as distinct states; no state implies more than the evidence | `NOT_EXECUTED` | State-transition log with all eight timestamps; acceptance-without-delivery test |
| FLEET-AC-19 | Reporting and scheduled reports | Reports are generated from the organization's own data with stated range and generation time; scheduled reports reach the right recipients; no cross-tenant data appears | `NOT_EXECUTED` | Report file; schedule record; cross-tenant negative test |
| FLEET-AC-20 | Export and audit completeness | An authorized administrator exports all organization data in usable formats; the export is complete against a defined data inventory and is recorded in the audit log | `NOT_EXECUTED` | Export file opened independently; completeness comparison; audit record |
| FLEET-AC-21 | Retention and deletion | The published retention schedule is applied per data class; deletion requests execute within the documented period, offer export first and honour legal hold | `NOT_EXECUTED` | Retention configuration; deletion record; legal-hold test |
| FLEET-AC-22 | Vessel/account transfer and access removal | A vessel or tenant transfer requires verifiable consent from both sides, moves the record, revokes the previous access and preserves the audit trail | `NOT_EXECUTED` | Transfer record; old-access negative test; audit record |
| FLEET-AC-23 | Per-vessel subscription accounting, plan change and renewal | Each vessel has its own subscription record; additions/removals and plan changes reconcile; renewal terms are shown before charge; a lapsed subscription does not block export | `NOT_EXECUTED` | Billing records; reconciliation test; expiry/export test |
| FLEET-AC-24 | Support access, escalation and service status | Support access requires customer authorization, is scoped and audited; escalation follows the documented path; the status surface states `NO_SLA_ESTABLISHED` and publishes no uptime figure | `NOT_EXECUTED` | Support-access audit; escalation record; status-surface evidence |
| FLEET-AC-25 | Enterprise onboarding, termination and exit | A contracted onboarding produces the agreed deliverables and acceptance; termination follows the exit plan with full export and deletion certification | `NOT_EXECUTED` | Contract, onboarding acceptance, exit record, deletion certificate |
| FLEET-AC-26 | Bilingual UI and documentation parity | Every user-facing string, notification, report and legal notice exists in Spanish and English with the same meaning; no untranslated operational field remains | `NOT_EXECUTED` | String inventory comparison; screenshots in both languages; reviewer sign-off |

---

## 10. Traceability annex — MC-02 blockers and the evidence required before sale

### 10.1 Mandatory FLEET blocker mapping

| Blocker | What it means for MAREA FLEET | Closed only by |
| --- | --- | --- |
| D-09 | AIS-derived traffic history and fleet sharing are not established; AIS reception is receive-only and may not be presented as collision avoidance or transponder capability | Written data-rights and retention/redistribution decision; FLEET keeps AIS out of any shipped feature until it exists |
| D-10 | External data rights generally (11 of 28 provider rows `LEGAL_REVIEW_REQUIRED`, including AEMET NWP, MeteoGalicia, Puertos, Esri, official ENC and AIS-derived data) | Provider-by-provider clearance register with written terms or removal of the dependency |
| H-12 | No connectivity hardware or SIM/roaming contract; recurring data cost and coverage unquantified | Connectivity model decision, MVNO/roaming quotes, coverage validation and a written cost model |
| H-13 | CRA obligations: reporting from 2026-09-11 and main obligations from 2027-12-11; no vulnerability handling, secure update, SBOM or incident reporting | Security-by-design process, coordinated vulnerability disclosure, SBOM, update policy, incident reporting and conformity route |
| P-09 | No multi-tenant SaaS, tenant isolation, telemetry ingestion or billing/entitlement service in EMBARCARTE | New SaaS domain model, server-side authorization, tenant isolation tests, telemetry ingestion, billing and data-processing terms |
| P-10 | Engineering reuse is inventory-level; Node/TypeScript suites unexecuted | Reproducible build/test environment and executed test reports for every reused module |
| X-01 | MAREA is a proposed brand; no trademark clearance; "Marea Marine" is a risk signal, not an infringement finding | EUIPO/OEPM clearance and filing before any brand publication |
| X-03 | No image-generation capability; all FLEET visuals remain `BLOCKED_ON_IMAGE_GENERATION` and `CONCEPT` | Written budget authorisation, provider credential, commercial-use confirmation and one pilot asset |
| X-05 | No real BOM, supplier quotes, hosting costs, provider prices, connectivity costs or channel terms; no approved price | Real quotes, bottom-up costing, approved price list and channel terms |
| X-06 | No primary customer interviews, no installer/distributor terms, no validated willingness to pay | Structured discovery, pilot customers and price testing before committing investment |
| X-07 | No tenant/authorization implementation, no privacy or incident-response model; FLEET would process vessel positions, crew data and commercial information | Threat model, DPIA, DPA and subprocessor register, server-side authorization and tenant-isolation tests, audit design |

Supplementary references: L-01–L-03 and S-06 (source-IP and notice position for any reused component);
X-02 (seller legal identity, required for the contract, DPA and invoices); H-02 (the unauthenticated
control plane must never become a FLEET path); X-04 (release governance).

### 10.2 Exact evidence required before any FLEET sale

- A deployed multi-tenant service with server-side authorization on every sensitive operation, tenant
  identity derived from the authenticated session, and executed positive and negative isolation tests
  across reads, writes, exports, reports, search, caches and background jobs (P-09, X-07).
- A tested eight-role permission matrix, including vessel-level narrowing, immediate revocation and
  scoped, expiring external-installer access (P-09, X-07).
- Real telemetry ingestion from at least one authorized source, with freshness states, the
  disconnected-vessel behaviour and the no-write-back proof (P-09, H-12, D-10).
- A billing and entitlement service with per-vessel accounting, plan changes, renewal, grace, payment
  failure, cancellation and export; tested proof that a lapsed subscription never blocks export (P-09).
- A notification and escalation pipeline with the canonical states and timestamps, and no delivery claim
  where evidence is missing (P-09).
- Written contract terms, DPA, subprocessor register, DPIA, records of processing, retention schedule and
  the controller/processor assessment signed by the responsible functions (X-07, X-02).
- CRA readiness: vulnerability handling, coordinated disclosure, SBOM, signed update path and incident
  reporting for the platform (H-13).
- Onboarding operation with a scoping template, migration tooling, acceptance record and measured
  onboarding hours (X-05, X-06).
- Connectivity and provider terms for every enabled telemetry source (H-12, D-10, D-09).
- Real competitor and willingness-to-pay evidence for the target segments, plus approved pricing and
  channel terms (X-05, X-06).
- Brand clearance before any customer-facing publication (X-01) and asset provenance before any visual is
  published (X-03).
- Written support model, severities, escalation and — only if contracted and measured — an SLA; otherwise
  the published statement stays `NO_SLA_ESTABLISHED` (X-05).

No FLEET subscription may be orderable while these are missing. The lifecycle gate for sale is
`REGULATORY_READY` then `OPERATIONS_READY` with an approved SKU — not merely a published specification.

---

## 11. Ecosystem, cross-sells and entitlement boundaries

| Product | Relationship to FLEET | Binding boundary |
| --- | --- | --- |
| MAREA WATCH | Read-only telemetry and alert source where the organization also holds WATCH | WATCH is not included; buying FLEET creates no WATCH service; FLEET never becomes the WATCH service of record or writes to it |
| MAREA HUB | Read-only installation/telemetry health where authorized | No configuration, firmware or network write path; HUB is not included |
| MAREA AIS | Receive-only position/traffic context where the data-rights position exists | No collision-avoidance or transponder implication; AIS remains receive-only |
| MAREA SENSE | Measured inputs through a compatible WATCH/HUB path where verified | SENSE has no connectivity of its own; `UNKNOWN` integration status; no unmeasured value is presented as reliable |
| MAREA NAV | Optional passage/position context with explicit customer permission | FLEET has no navigation authority and does not include charts |
| MAREA DISPLAY | No defined relationship (`UNKNOWN`) | DISPLAY is not a FLEET endpoint and FLEET is not a DISPLAY control surface |
| MAREA WEATHER | Licensed forecast context where provider terms permit | No redistribution, no offline right, no accuracy guarantee; WEATHER entitlement is never billed twice across NAV and WEATHER (README §10) |
| MAREA PILOT | At most a read-only status view after review; `BLOCKED` for any control | No engage, disengage, heading, throttle, rudder or steering command from FLEET under any condition |
| MAREA FLEET package | The commercial bundle (SaaS, onboarding, optionally hardware/communications) | Bundle content, price and publication are MC-08; a bundle is never a purchasable price and never a sum of these hypotheses |

Entitlement rules that bind every cross-sell: one customer account and one entitlement ledger; a FLEET
subscription never includes hardware; a WATCH subscription never creates a FLEET tenancy; a FLEET
subscription never includes WEATHER or charts; and the same entitlement is never billed twice across
MAREA products. The organization's operational data belongs to the organization and is exportable
regardless of the state of any adjacent product.

---

## 12. Pricing architecture and B2B unit-economics framework

### 12.1 Price architecture

FLEET is priced **per vessel per month, VAT excluded**, with the vessel as the billable unit because the
value and the cost both scale with vessels. The architecture that must be defined before sale:

| Component | Intended basis | Status |
| --- | --- | --- |
| Platform access | Included in the per-vessel rate; no separate organisation fee in Start and Business (`HYPOTHESIS`) | `HYPOTHESIS_UNAPPROVED` |
| Per-vessel subscription | EUR 49 (Start) / EUR 79 (Business) per vessel per month, VAT excluded | `HYPOTHESIS_UNAPPROVED` |
| User seats | Included, not charged per seat in Start and Business; Enterprise negotiated | `OPEN` (included count) |
| Onboarding | Separately quoted per organization and configuration | `OPEN` |
| Data migration | Included for a defined baseline or quoted; not decided | `OPEN` |
| Telemetry/storage/API overage | None defined; must be a published number or a stated refusal | `OPEN` |
| Enterprise | Contracted scope, volumes, services, support and any measured SLA | `NOT_ESTABLISHED` |
| Volume discount | Bands and eligibility not defined | `OPEN` |
| Annual prepayment | Preferred, with the discount not defined | `OPEN` |
| Partner margin | Not defined | `OPEN` |

Rules: no price may be published until the underlying costs are quoted (X-05) and the segments have been
tested (X-06); the per-vessel rate must never be described as including hardware, connectivity, charts,
weather, onboarding or support beyond the published entitlement; and any discount must be a decision with
a recorded rationale, not a sales improvisation.

### 12.2 Unit-economics definitions

| Metric | Definition used in this programme |
| --- | --- |
| MRR | Sum of active per-vessel subscription amounts in a month, VAT excluded |
| ARR | MRR × 12, stated as a run-rate, never as a forecast |
| ARPA | MRR divided by the number of active organizations |
| Per-vessel revenue | MRR divided by active vessels, before any service revenue |
| Service revenue | Onboarding, migration, training, contracted integration and Enterprise work, recognised when delivered |
| Cost to serve per vessel | Hosting share, telemetry/storage/egress, notification, payment fees, support minutes and partner margin attributable to one vessel |
| Gross margin per vessel | Per-vessel revenue minus cost to serve per vessel; not computed until every input is quoted |
| Onboarding cost | Delivery hours + migration + training per organization, amortised over expected contract life |
| CAC per organization | Sales, marketing, demonstrations, pilots and partner commission divided by new organizations |
| CAC payback | CAC per organization divided by monthly gross margin per organization |
| GRR / NRR | Cohort-based retention of recurring revenue excluding / including expansion, measured on defined cohorts |
| Gross churn | Organizations or vessels cancelled in a period divided by the opening base, by reason |
| NRR expansion | Start→Business upgrades and vessel additions within existing organizations |
| Support cost per vessel | Support minutes × loaded hourly cost, measured per ticket category |
| Telemetry unit cost | Cost per vessel per month of ingestion, processing, storage and egress for the authorized subset |

### 12.3 Formulas (symbolic only — no values are asserted)

- `MRR = Σ(active vessels × per-vessel rate)`
- `ARR_run_rate = MRR × 12`
- `ARPA = MRR / active organizations`
- `per_vessel_gross_margin = per_vessel_revenue − (hosting_share + telemetry_cost + storage_cost +
  notification_cost + payment_fee + support_cost + partner_margin)`
- `CAC_payback_months = CAC_per_organization / monthly_gross_margin_per_organization`
- `GRR = (opening_MRR − churn_MRR − contraction_MRR) / opening_MRR`
- `NRR = (opening_MRR − churn_MRR − contraction_MRR + expansion_MRR) / opening_MRR`
- `organization_contribution = Σ(per-vessel gross margin) + service revenue − onboarding_cost_amortised
  − organization_support_cost − allocated_CAC`

Every symbol is an unmeasured input. No margin, payback, LTV/CAC ratio, churn rate or forecast figure is
asserted anywhere in this dossier; presenting one would invent hosting, telemetry, support, acquisition
and churn data.

### 12.4 Sensitivity dimensions that must be modelled

The batch-03 pricing and channel model must show how the per-vessel contribution moves with: vessel
count per organization; the included storage/telemetry volume; support minutes per vessel; onboarding
hours per organization; the annual discount and volume bands; partner margin; payment-fee rate; telemetry
ingestion cost per data class; and churn. **Sensitivity is a method, not a result**: no scenario number in
this dossier is a forecast, and no forecast accuracy is claimed.

### 12.5 What is deliberately not computed

BOM, cost of goods, per-vessel infrastructure cost, onboarding cost, support cost, CAC, churn, gross
margin, contribution margin, ARR forecast, break-even, payback and market size are **not computed** in
this dossier because every input is missing (X-05, X-06, P-09). The batch-03 pricing document records the
framework, the required inputs and the source-acquisition checklist; it does not fill the gaps with
invented numbers.

---

## 13. Required disclaimers — verbatim, ES and EN

### 13.1 Navigation / instruments disclaimer

Required in this dossier and in both FLEET copy files because FLEET displays position and vessel data.
Approved wording of `docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §9, used verbatim:

- ES: «Este producto es una ayuda a la navegación y no sustituye a la carta náutica oficial, al equipo reglamentario de la embarcación, a la vigilancia continuada ni al buen hacer marinero. La responsabilidad de la navegación corresponde siempre al patrón.»
- EN: "This product is a navigational aid. It does not replace official nautical charts, the vessel's required equipment, continuous watchkeeping or good seamanship. Responsibility for navigation always rests with the skipper."

### 13.2 FLEET limitation statement (brief §17, verbatim; INTERNAL DRAFT wording)

The statement below is the MC-07 internal-draft wording pending claims-register approval. It is **not**
claimed as approved policy text; its placement here is required by the programme brief (external to this repository) §17.2.

- ES: «MAREA FLEET es un diseño interno: no existe un servicio multiempresa desplegado ni una certificación de seguridad, y no se garantiza ningún nivel de servicio. La telemetría es de solo lectura y nunca permite gobernar la embarcación.»
- EN: "MAREA FLEET is an internal design: no deployed multi-tenant service and no security certification exist, and no service level is guaranteed. Telemetry is read-only and never allows steering the vessel."

### 13.3 AIS receive-only disclaimer — conditional

FLEET shows AIS-derived context only where the data-rights position exists (currently `BLOCKED`, D-09).
Wherever AIS targets or AIS-derived positions are displayed, the approved verbatim disclaimer of
`COMMERCIAL-BRAND-CLAIMS-POLICY.md` §9 must appear:

- ES: «La recepción AIS es únicamente de escucha: no todos los buques emiten AIS. No constituye un sistema de evitación de colisiones ni un transpondedor.»
- EN: "AIS reception is receive-only: not every vessel transmits AIS. It is not a collision-avoidance system and not a transponder."

### 13.4 Brand attribution

- ES: «MAREA es una marca de producto de EMBARCARTE.»
- EN: "MAREA is a product brand of EMBARCARTE."

No customer-facing surface may present MAREA FLEET as certified, approved, available, priced, secure,
compliant, navigation-grade, a control system or a guaranteed service while
`brandPublication = NOT_GRANTED`, `availability = NOT_FOR_SALE` and `FLEET_SLA = NO_SLA_ESTABLISHED`.

---

## 14. Non-assertions and document status

This dossier does **not** assert, and must not be read as asserting: a deployed multi-tenant service, a
tenant-isolation test result, a permission implementation, a billing or entitlement service, a telemetry
ingestion capability, an alert-delivery or escalation pipeline, a connectivity or SIM contract, a
service-status measurement or any uptime figure, an SLA of any kind, an ISO/IEC 27001, SOC 2, ENS or other
security certification or attestation, a DPIA, a DPA, a subprocessor register or any controller/processor
determination, a classification-society, flag-state, ISM or regulatory approval, an accessibility
conformance statement, any customer, reference, logo, testimonial, interview, pilot, market share or
revenue figure, any BOM, cost, margin or approved price, any customer production data, any remote-control,
steering, autopilot, motor, thruster or bus-command capability, any vessel or sea-trial result, and any
image asset — all visuals remain `BLOCKED_ON_IMAGE_GENERATION` (X-03) and `CONCEPT`, not `REAL_PRODUCT`.

Status of this deliverable: `INTERNAL`, `COMPLETE_TARGET_SPECIFICATION`, `NOT_FOR_SALE`,
`NOT_PUBLISHED`. It defines the finished commercial product and the evidence that would prove it. It does
not make MAREA FLEET orderable, publishable, certified, priced or supported, and it does not replace the
MC-13-FLEET verification gate, the DPIA, the DPA or any conformity assessment. The companion contract
`docs/marea/products/FLEET-TENANCY-SECURITY-AND-DATA-GOVERNANCE.md` owns the implementation depth of
authorization, isolation, audit and privacy; this dossier owns the commercial definition.
