# MC-14 — Required external decisions

| Field | Value |
|---|---|
| Deliverable | D17 `MC14-REQUIRED-EXTERNAL-DECISIONS.md` |
| Milestone | MC-14/36 |
| Date | 2026-11-02 |
| Owner | Programme Lead |
| Machine data | `data/external-decisions.json` |
| Decisions | 20 |
| Status | PENDING_HUMAN_AND_EXTERNAL_AUTHORITY |


## 1. Rule

No decision in this register may be taken by an autonomous agent. Each is owned
by a named human authority, has explicit options and a recommended direction,
names the risks it unblocks and the evidence required to close it. A decision is
closed only when the external artefact exists.

## 2. Decision register

| Decision | Subject | Recommendation | Status | Owner | Due | Blocks risks |
|---|---|---|---|---|---|---|
| DEC-MC14-001 | Appoint qualified Spanish/EU counsel for market placement, liability and consumer law | Retain one accountable counsel for the market-placement and liability workstream before any product is offered. | PENDING | PROGRAMME_LEAD | 2026-12-09 | LEG-01, LEG-03, LEG-05, LEG-07 |
| DEC-MC14-002 | Choose the economic-operator model per supply scenario | Mixed model, decided per SKU and recorded in the economic-operator matrix and supplier contracts. | PENDING | PROGRAMME_LEAD | 2027-01-31 | LEG-02, LEG-06, LEG-10 |
| DEC-MC14-003 | Resolve OPEN-MARINE ownership chain and contributor rights | Full assignment or exclusive licence before any distribution; do not rely on repository custody. | PENDING | LEGAL_COUNSEL | 2027-01-31 | IPR-01, IPR-02, IPR-03, IPR-04, IPR-05, IPR-07, IPR-08 |
| DEC-MC14-004 | Choose the OPEN-MARINE outbound licence and distribution position | Proprietary baseline for MAREA products, with a documented third-party notice and compliance pack. | PENDING | LEGAL_COUNSEL | 2027-01-31 | IPR-01, IPR-06, IPR-10, IPR-11, IPR-12 |
| DEC-MC14-005 | Commission MAREA trademark clearance and decide public brand use | Commission clearance; keep MAREA_PUBLIC_USE = NO_GO until a registration or written clearance exists. | PENDING | LEGAL_COUNSEL | 2027-02-28 | IPR-13, IPR-14, CLM-01 |
| DEC-MC14-006 | Choose the chart/ENC licensing strategy | User-supplied charts initially, with explicit navigation-aid disclaimers, unless an ENC agreement is funded. | PENDING | DATA_RIGHTS_OWNER | 2027-02-28 | DATA-01, DATA-03, DATA-04, LIA-06 |
| DEC-MC14-007 | Choose the weather data provider strategy | Paid commercial provider with explicit display, cache and offline terms. | PENDING | DATA_RIGHTS_OWNER | 2027-02-28 | DATA-02, DATA-05, LIA-07 |
| DEC-MC14-008 | Choose the AIS decoder and receiver strategy | Replace or user-install the decoder; select a receiver module with existing conformity evidence. | PENDING | ENGINEERING_LEAD | 2027-02-28 | IPR-10, PRD-03, LEG-08, LIA-05 |
| DEC-MC14-009 | Decide NMEA 2000 participation | NMEA 0183/Signal K only until a business case and licence exist. | PENDING | ENGINEERING_LEAD | 2027-02-28 | PRD-04, PRD-05, IPR-13 |
| DEC-MC14-010 | Fund or defer the PILOT safety programme | Defer PILOT and keep the safety gate BLOCKED until the programme is funded. | PENDING | HARDWARE_LEAD | 2027-02-28 | PRD-01, PRD-02, LIA-10 |
| DEC-MC14-011 | Choose the hardware manufacturing and supply model | Per-family decision documented with the supplier contract and the economic-operator matrix. | PENDING | HARDWARE_LEAD | 2027-02-28 | PRD-06, PRD-08, PRD-09, LEG-02 |
| DEC-MC14-012 | Obtain product liability, cyber and professional-indemnity insurance | Obtain a broker indication before any launch decision; keep the premium UNKNOWN until quoted. | PENDING | FINANCE_LEAD | 2027-02-01 | LIA-13, LIA-01, LIA-02, LIA-03, LIA-04, LIA-05, LIA-06, LIA-07, LIA-08, LIA-09, LIA-10, LIA-11, LIA-12 |
| DEC-MC14-013 | Authorize the payment, merchant and tax model | Defer commerce; when authorized, use one hosted/tokenised provider and obtain professional tax confirmation. | PENDING | FINANCE_LEAD | 2027-02-28 | PAY-01, PAY-02, PAY-03, PAY-04, PAY-05 |
| DEC-MC14-014 | Decide the privacy operating model, DPIA and processor agreements | Appoint an accountable privacy lead, run the DPIA and contract processors before any WATCH/FLEET processing. | PENDING | DPO | 2027-01-31 | PRIV-01, PRIV-02, PRIV-03, PRIV-04, PRIV-05, PRIV-06, CYB-07 |
| DEC-MC14-015 | Decide CRA classification, support period and conformity route | Classify per family with counsel/notified body; adopt an explicit support-period policy. | PENDING | SECURITY_LEAD | 2027-06-30 | CYB-01, CYB-02, CYB-03, CYB-04, CYB-05, CYB-06, IPR-11, LIA-11 |
| DEC-MC14-016 | Approve the consumer, B2B, subscription and installer contract set | Separate consumer and B2B sets with installer and subscription annexes, approved before any sale. | PENDING | LEGAL_COUNSEL | 2027-02-28 | CONS-01, CONS-02, CONS-03, CONS-04, CONS-05, CONS-06, CONS-07, CONS-08, CONS-09 |
| DEC-MC14-017 | Provide legal identity and authorize website commerce remediation | Complete identity and disable or clearly label non-MAREA sample commerce before any publication. | PENDING | COMMERCIAL_DIRECTOR | 2026-12-31 | OPS-01, OPS-02, PRIV-07, LEG-09 |
| DEC-MC14-018 | Authorize claims-policy publication and website/SEO remediation | Programme Lead approves internal governance; public copy waits for evidence and MC-15 gate. | PENDING | COMMERCIAL_DIRECTOR | 2027-01-31 | CLM-01, CLM-02, CLM-03, CLM-04, CLM-05, CLM-06, CLM-07, OPS-03, OPS-04 |
| DEC-MC14-019 | Register as a producer and evidence environmental compliance | Register before first placement and collect supplier RoHS/material declarations. | PENDING | PRODUCT_COMPLIANCE_ENGINEER | 2027-02-28 | LEG-10 |
| DEC-MC14-020 | Authorize any future commercial launch (outside MC-14 scope) | No launch decision is taken in MC-14. The decision belongs to the future release milestone and requires all gates CLOSED_VERIFIED. | OUT_OF_SCOPE_FOR_MC14 | PROGRAMME_LEAD | NOT_SCHEDULED | LEG-01, LEG-05, IPR-13, CONS-01, PRIV-02, CYB-01, PAY-01, LIA-13, OPS-01 |

## 3. Escalation questions for qualified counsel

1. CRA product classification and conformity route for each family.
2. Spanish PLD transposition and the operative application date after the May
   2026 corrigendum.
3. Radio-equipment scope/freeze and the RED/CRA transition.
4. Whether PILOT or DISPLAY is an RCD component or an add-on.
5. Whether the existing chart/weather/tile uses require licences and on what
   terms.
6. Whether NMEA 2000 participation is required for the intended claims.
7. MAREA trademark availability, classes and filing strategy.
8. Consumer, B2B, subscription and installer contract architecture.
9. GDPR controller/processor roles, DPIA need and international transfers.
10. Insurance structure, limits and exclusions for software and safety products.

## 4. What MC-14 can and cannot do

MC-14 can document the question, options, evidence and accountable owner. It
cannot select an option, sign a contract, file a trademark, contact a provider,
approve a price, bind insurance or grant clearance. The milestone remains
`PARTIAL` at the programme level while these decisions are pending.
