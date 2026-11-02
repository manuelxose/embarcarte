# MC-12 D13 — Licensing and economic blocker register

| Field | Value |
|---|---|
| Deliverable | D13 `MC12-BLOCKER-REGISTER.md` |
| Owner / date | `programme-lead`, 2026-11-02 |
| Status | `OPEN` blockers; nothing is closed by inference |
| Machine companion | [blocker-register.json](data/blocker-register.json) |
| Summary | 22 blockers: 12 `BLOCKING`, 9 `MAJOR`, 1 `MINOR`; 17 external |

## 1. Rule

A blocker is closed only when the named evidence exists in the repository or an
authorised system. An economic model cannot close a licensing, safety, regulatory or
customer blocker. MC-12 introduces no closure: every blocker below is `OPEN`.

## 2. Register

| ID | Domain | Blocker | Severity | Owner | Approval / evidence required | External |
|---|---|---|---|---|---|---|
| BLK-LIC-01 | Licensing | Official ENC redistribution right for Spanish/Portuguese waters not granted | BLOCKING | Commercial/Legal | Hydrographic-office or OEM chart agreement | yes |
| BLK-LIC-02 | Licensing | Third-party commercial chart product cannot be redistributed under current terms | MAJOR | Commercial/Legal | OEM/developer agreement (Garmin/Navionics, C-MAP) | yes |
| BLK-LIC-03 | Licensing | Commercial marine-weather re-display right not granted | BLOCKING | Commercial/Legal | Weather data licence with display/caching rights | yes |
| BLK-LIC-04 | Licensing | NMEA 0183 licence and NMEA 2000 certification not held | BLOCKING | Engineering/Legal | NMEA licence certificate; certification record | yes |
| BLK-LIC-05 | Connectivity | Cellular IoT contract and SIM/eSIM supply not established | BLOCKING | Operations | Operator/MVNO agreement or formal quotation | yes |
| BLK-LIC-06 | Cloud | Cloud agreement, DPA and data-residency decision not established | BLOCKING | Engineering/Legal | Signed cloud agreement and DPA | yes |
| BLK-LIC-07 | Licensing | Production map-tile right or self-hosted tile stack not established | MAJOR | Engineering/Commercial | Tile agreement or costed self-hosted stack | yes |
| BLK-LIC-08 | IP | Source IP clearance not cleared (inherited) | BLOCKING | Legal | Signed clearance opinion | yes |
| BLK-LIC-09 | Trademark | MAREA trademark legal clearance not granted (inherited) | BLOCKING | Legal | Clearance opinion with territory/classes | yes |
| BLK-COST-01 | Cost | Certification/conformity cost `UNKNOWN` in all 90 MC-11 scenarios | BLOCKING | Conformity lead | EMC/RED/environmental/CRA quotations | yes |
| BLK-COST-02 | Cost | No supplier quotation, MOQ, lead time or Incoterms | BLOCKING | Procurement | Formal supplier quotations for every material line | yes |
| BLK-COST-03 | Cost | Tooling/NRE quotation absent; only an engineering envelope | MAJOR | Engineering/Procurement | Tooling and NRE quotations | yes |
| BLK-COST-04 | Tax | VAT status of input prices unresolved (37/42 `VAT_UNKNOWN`) | MAJOR | Finance | Documented VAT treatment per input and purchase route | yes |
| BLK-COST-05 | FX | Observed EUR/USD rate not retrieved at MC-11 time; now observed for MC-12 | MINOR | Finance | ECB rate recorded; MC-11 lines still use the old assumption | no |
| BLK-COMM-01 | Customer | Customer evidence `NONE`; willingness to pay unvalidated | BLOCKING | Customer Research | `AUTH-MC10-001` fieldwork and pricing responses | yes |
| BLK-COMM-02 | Channel | Installer/distributor margins and service prices not established | MAJOR | Channel Management | Signed partner terms or formal quotations | yes |
| BLK-SAFE-01 | Safety | PILOT safety gate `BLOCKED` | BLOCKING | PILOT Product Director | Safety case, independent assessment, supervised trials | yes |
| BLK-REG-01 | Regulatory | CE/EMC/RED conformity not started | BLOCKING | Conformity lead | Test reports, DoC, technical file | yes |
| BLK-REG-02 | Regulatory | CRA security obligations make maintenance recurring | MAJOR | Engineering/Security | Support-period policy, SBOM/CVD, update budget | no |
| BLK-DATA-01 | Data protection | GDPR roles, DPIA and processor agreements not established | MAJOR | Data Protection | DPIA, records of processing, DPAs, retention schedule | no |
| BLK-INS-01 | Insurance | Product liability insurance premium `UNKNOWN` | MAJOR | Finance/Legal | Broker quotation | yes |
| BLK-PRICE-01 | Pricing | No price approved; every price is an unapproved hypothesis | BLOCKING | Commercial Lead | Pricing decision after cost/rights/customer evidence | no |
| BLK-AIS-01 | Regulatory | AIS transmission is not an authorised offering | BLOCKING | Regulatory/Product | None in MC-12; must remain out of scope | yes |

## 3. Blocker families and their economic effect

### Licensing rights (9)
Chart, weather, NMEA, connectivity, cloud, tiles, source IP and trademark. These
block revenue recognition, not just cost: a product cannot be sold without the right.
They are the dominant reason NAV and WEATHER are classified `LICENSING_BLOCKED` and
why the consumer bundles START and CRUISE inherit that classification.

### Cost evidence (5)
Certification, supplier quotations, tooling, input VAT and FX. These block
`ECONOMICS_EVIDENCED` for every hardware SKU. Observed public-price coverage of the
modelled hardware subtotal is only 0.8–4.7 %, and certification is unknown in every
scenario.

### Customer and channel (2)
No interviews, no price responses, no partner terms. Every revenue figure is a
hypothesis. This is the cheapest blocker to attack and the most decisive.

### Safety and regulatory (5)
PILOT safety, CE/EMC/RED, CRA maintenance, GDPR operations, product liability
insurance. None can be cleared by analysis.

### Commercial governance (2)
No approved price; AIS transmission prohibited. Both are hard boundaries.

## 4. What MC-12 did to reduce uncertainty without closing blockers

- Reclassified tooling/certification as fixed, removed the double-count risk and
  proved the `COST-16` invariant across 90 scenarios.
- Replaced "recurring cost unknown" with a modelled, sourced floor
  (EUR 0.155/device-month cloud, EUR 0.05-0.375 cellular, EUR 0.070714 alerts).
- Established the conditional headroom for each data licence, so the licence
  negotiation has a ceiling target.
- Recorded one observed ECB rate for MC-12 conversions (not applied retroactively to
  MC-11 BOM lines).
- Built a machine-readable register and a validator that fails if a blocker is
  silently cleared.

## 5. Escalation path

The external blockers require authorisations that MC-12 does not hold. The next
decision point is not an engineering decision: it is whether to authorise
(a) hydrographic-office/OEM chart engagement, (b) connectivity and cloud
procurement, (c) supplier RFQs and certification quotations, and (d) the
`AUTH-MC10-001` customer fieldwork. Until then, the correct status remains
`PARTIAL` for the milestone and `BLOCKED_OR_NOT_OBTAINED` for external commercial
evidence.
