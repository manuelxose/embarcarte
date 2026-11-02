# MC-14 — Privacy and marine telemetry data governance

| Field | Value |
|---|---|
| Deliverable | D09 `MC14-PRIVACY-AND-TELEMETRY-DATA-GOVERNANCE.md` |
| Milestone | MC-14/36 |
| Date | 2026-11-02 |
| Owner | Programme Lead / DPO (role, not appointed) |
| Machine data | `data/privacy-obligations.json`; risks `PRIV-*` |
| Status | NO DPIA, NO DPA, NO PROCESSING INVENTORY — recommended is not completed |

## 1. Why vessel data is sensitive in context

Vessel telemetry, position history, owner identity, account data, alert
destinations, device identifiers and remote status can identify a natural
person, especially when linked to an account, a marina, a booking or a small
crew. The regulation applies to personal data, not to the word "vessel". MC-14
therefore does **not** assume that all coordinates are personal data, nor that
none are; identifiability and context are assessed per purpose.

## 2. Prospective role mapping

| Processing | Role | Basis |
|---|---|---|
| Account, billing, marketing, self-determined telemetry | Controller | GDPR Arts 5, 6, 13-15, 17, 20, 28, 32, 33 |
| FLEET tenant data processed on customer instructions | Processor | Article 28 DPA; Article 33(2) notification |
| Shared purposes with a fleet operator | Possible joint controller | Article 26 arrangement if established |
| Cloud, SMS/email, payment, connectivity providers | Subprocessors | Article 28(2)-(4) authorisation and flow-down |

No role decision has been made; `DEC-MC14-014` is the decision owner. The
current financial treatment excludes DPA/DPIA cost as `UNKNOWN`.

## 3. Processing purposes (14 mapped)

Account and authentication; billing and tax; device registration and
entitlements; vessel telemetry display/history; WATCH location monitoring and
alerting; alert delivery to third parties; FLEET customer-instructed data;
fleet analytics; support and diagnostics; security monitoring and incident
response; marketing; website analytics/cookies; crew/guest incidental data; data
export and portability. Each purpose has data categories, data subjects,
potential legal basis, retention, recipients, transfer risk, security controls,
deletion/export and a DPIA screening result in the machine data.

## 4. DPIA

A DPIA is likely required for systematic location monitoring, FLEET tenant data,
vessel history and crew/guest monitoring. The screening has **not** been
performed; no DPIA, AEPD consultation or filing exists. AEPD guidance was
inaccessible during predecessor research (HTTP 404 recorded), so the DPIA plan
rests on the GDPR text. A recommended DPIA is not a completed DPIA.

## 5. Processor agreements and subprocessors

No Article 28 agreement, subprocessor list or transfer assessment exists. FLEET
cannot be onboarded until the DPA, tenant-isolation test and role map are in
place. International transfers are unassessed; no data-residency claim may be
published.

## 6. Rights, security and breach

| Duty | Status |
|---|---|
| Access, rectification, erasure, restriction, portability, objection | NOT_IMPLEMENTED |
| Article 32 security measures (encryption, access control, logging) | NOT_ASSESSED |
| Article 33 breach notification (72h) | NOT_IMPLEMENTED |
| Article 5 retention/deletion schedule | ABSENT |
| Tenant access segregation test | NOT_PERFORMED |
| Cookie consent and inventory | UNVERIFIED |

## 7. FLEET tenancy

FLEET is multi-tenant B2B SaaS. The customer is expected to be the controller of
tenant data and EMBARCARTE the processor, but this is an assumption recorded in
the product contract, not a signed DPA. Tenant isolation is not tested. No
vessel-control path is allowed. The service must not be presented as
"GDPR-compliant", "secure multi-tenant" or "EU-only data" without evidence.

## 8. Website and cookies

The existing site must obtain prior consent for non-essential cookies and
tracking, publish a cookie policy and maintain a cookie inventory. The read-only
audit (D15) recorded privacy and consent findings; none was remediated in MC-14.
Any tracking claim must match the actual implementation.

## 9. Unknowns and next evidence

Required evidence: role map, ROPA/processing inventory, DPIA screening/report,
privacy notices ES/EN, DPA and subprocessor register, retention schedule,
deletion/export implementation, breach runbook, tenant-isolation test and
transfer assessment. All are `NOT_EXECUTED`. Until they exist,
`GATE-PRIVACY-DPA-DPIA` stays `BLOCKED` and WATCH/FLEET cannot be offered.
