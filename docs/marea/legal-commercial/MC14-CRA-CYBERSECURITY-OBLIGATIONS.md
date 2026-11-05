# MC-14 — CRA cybersecurity obligations and lifecycle plan

| Field | Value |
|---|---|
| Deliverable | D10 `MC14-CRA-CYBERSECURITY-OBLIGATIONS.md` |
| Milestone | MC-14/36 |
| Date | 2026-11-02 |
| Owner | Programme Lead / Security Lead (role, not a person) |
| Machine data | `data/cybersecurity-obligations.json`; risks `CYB-*` |
| Status | NO CRA CONFORMITY — reporting duties already apply; no certification claimed |

## 1. Current legal position

Regulation (EU) 2024/2847 (Cyber Resilience Act) entered into force on
2024-12-10. **Vulnerability and incident reporting duties apply from
2026-09-11**, and the main obligations apply from 2027-12-11. The support period
must be at least five years under Article 13(8), unless the expected product
lifetime is shorter; security updates are required under Article 13(9). The
Commission's 2026 repeal of the RED cybersecurity delegated regulation
(Delegated Regulation (EU) 2026/339, in force 2026-05-19) takes effect on
2027-12-11, when the CRA carries the requirements for radio equipment.

The 5-year figure is a statutory floor tied to an evidence-based expected
lifetime, not a universal marketing guarantee. The financial model's 5-year
assumption is **not** a decided support period.

## 2. Product classification

The classification of each family as default, important (Annex III) or critical
(Annex IV) is `UNDETERMINED`. PILOT and WATCH may be important depending on
their safety/remote-processing role; the classification determines whether
self-assessment suffices or a notified body is required. No classification memo
exists.

## 3. Essential requirements (Annex I)

Fourteen requirements are mapped: risk-based security, secure-by-default
configuration, unauthorised-access protection, confidentiality/integrity,
attack-surface minimisation, incident-impact reduction, security logging,
secure updates, security-data integrity, vulnerability limitation/update duty,
third-party component due diligence (SBOM), coordinated vulnerability
disclosure, ten-year update rule (Art 13(9)) and incident reporting (Art 14).
**All fourteen are `NOT_MET`; 0 of the 52 inherited device-security
requirements are executed.**

## 4. Lifecycle controls

| Control | Status | Required evidence |
|---|---|---|
| Secure development lifecycle | NOT_IMPLEMENTED | SSDLC, threat models, secure review |
| Vulnerability intake/disclosure | NOT_IMPLEMENTED | CVD policy, security contact, triage |
| Security updates/firmware lifecycle | NOT_IMPLEMENTED | Signed updates, rollback test, end-of-support notice |
| SBOM | NOT_IMPLEMENTED | SPDX/CycloneDX per release |
| Dependency monitoring | NOT_IMPLEMENTED | Dependency register + CVE watch |
| Incident reporting | NOT_IMPLEMENTED | 24h/72h/14d runbook, named contact, exercise |
| Support-period decision | OPEN | Written decision + lifetime justification |
| Risk assessment/documentation | NOT_IMPLEMENTED | CRA risk assessment and technical file |
| Secure configuration/reset | NOT_IMPLEMENTED | Baseline and reset evidence |
| Authentication/access control | NOT_IMPLEMENTED | Auth design and access tests |
| Device provisioning/ownership transfer | NOT_IMPLEMENTED | Design and test |
| End-of-support policy | NOT_IMPLEMENTED | Published policy |

Reporting duties already apply (since 2026-09-11), so the absence of a process is
a present compliance gap, not a future one.

## 5. Conformity and documentation

No competent authority, reporting channel, conformity-assessment route,
notified body, EU declaration of conformity, CE marking for CRA or technical
documentation exists. The reporting channel is not established.

## 6. Cost and support period

The support-period engineering cost and annual security-maintenance cost are
`UNKNOWN` (`MC14-DEP-05`). The EUR 60,000/year figure in the MC-13 stress test is
an illustrative envelope, not a quote, budget or support contract. No security
certification, CRA certificate, guaranteed update period or vulnerability-
response SLA may be claimed.

## 7. Product-specific notes

- **NAV/WEATHER/FLEET (software/services):** scope depends on whether the
  product/service is a "product with digital elements"; remote data processing is
  generally excluded from the CRA itself, but integrated clients and product
  components can be in scope. Scope analysis required.
- **HUB/AIS/DISPLAY/SENSE/PILOT/WATCH:** connected products with digital
  elements are likely in scope; classification and conformity route must be
  decided. PILOT's control plane is currently unauthenticated, which is both a
  CRA and a safety defect.
- **Radio equipment:** the CRA takes over the RED cybersecurity requirements
  from 2027-12-11; the transition must be evidenced, not assumed.

## 8. Next evidence

CRA classification memo, SSDLC, CVD policy, SBOM, dependency monitoring,
support-period decision, incident-reporting runbook and exercise, conformity
assessment and technical documentation. All are `NOT_EXECUTED`; the gate
`GATE-CRA-CYBERSECURITY` stays `BLOCKED`.
