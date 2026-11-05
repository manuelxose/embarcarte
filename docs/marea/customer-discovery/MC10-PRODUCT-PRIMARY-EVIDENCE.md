# MC-10 — Product primary-evidence assessment (nine families)

| Field | Value |
| --- | --- |
| Document ID | MC-10 / D18 / MC10-PRODUCT-PRIMARY-EVIDENCE |
| Status | `NOT_TESTED — NO PRIMARY EVIDENCE COLLECTED` |
| Families assessed | 9 of 9 |
| Families with participant evidence | **0** |
| Interviews | **0** |
| Date | 2026-11-01 |
| Machine-readable mirror | `data/product-evidence.json` |

## 0. Assessment rule

Each family is assessed on the fifteen dimensions required by the MC-10 decision framework. Because
no participant was interviewed, every primary-evidence cell is zero/absent. The allowed primary
recommendation vocabulary does **not** include `ADVANCE_TO_QUANTITATIVE_VALIDATION` for a family with
no evidence: all nine are `NOT_TESTED`. The MC-09 desk-research conclusion is preserved separately as
historical context and is **not** rewritten, confirmed or contradicted.

Absence of evidence is not evidence of absence. A high MC-09 score is not validated demand; a low
score is not a measured rejection.

## 1. Summary

| Rank | Family | MC-09 score | MC-09 conclusion | Primary evidence in MC-10 | Recommendation |
| ---: | --- | ---: | --- | --- | --- |
| 1 | NAV | 4.23 | Validate with customers | None — 0 participants | `NOT_TESTED` |
| 2 | WEATHER | 3.77 | Additional rights research | None — 0 participants | `NOT_TESTED` |
| 3 | WATCH | 3.38 | Validate with customers | None — 0 participants | `NOT_TESTED` |
| 4 | HUB | 3.37 | Additional research | None — 0 participants | `NOT_TESTED` |
| 5 | FLEET | 3.22 | Long-term opportunity | None — 0 participants | `NOT_TESTED` |
| 6 | AIS | 2.90 | Reconsider strategy | None — 0 participants | `NOT_TESTED` |
| 7 | SENSE | 2.84 | Defer | None — 0 participants | `NOT_TESTED` |
| 8 | PILOT | 2.64 | Defer; safety blocked | None — 0 participants | `NOT_TESTED` |
| 9 | DISPLAY | 2.47 | Reconsider strategy | None — 0 participants | `NOT_TESTED` |

`NOT_TESTED` is not a decision to advance, revise, defer or discontinue. It is the absence of a test.

## 2. Fifteen-dimension matrix (all families)

| Dimension | Observed in MC-10 |
| --- | --- |
| 1. MC-09 commercial priority | Preserved unchanged (table above) |
| 2. Real participant evidence collected | None |
| 3. Number and type of relevant participants | 0 (0 owners, 0 installers, 0 retailers, 0 operators) |
| 4. Observed problems | 0 unprompted problems recorded |
| 5. Purchase-history evidence | 0 purchase records, 0 spend bands, 0 currencies |
| 6. Current alternatives | 0 named alternatives recorded from participants |
| 7. Concept comprehension | 0 participants; no comprehension score exists |
| 8. Pricing perception | 0 price responses; WTP `NOT_MEASURED` |
| 9. Installation/channel barriers | 0 professional interviews; no barrier recorded |
| 10. Counterevidence | None collected (and none may be inferred) |
| 11. Evidence quality | `NONE` — no source record exists |
| 12. Remaining unknowns | The MC-09 `criticalUnknowns` remain open in full |
| 13. Recommended next validation step | Run the registered experiment after authorization |
| 14. Commercial investment recommendation | `NOT_TESTED` — no investment approved |
| 15. Release-readiness restrictions | Unchanged from MC-09/governance: `NOT_FOR_SALE`, no certification, no price approval |

## 3. Family-specific notes

### NAV — rank 1, 4.23

- **Why MC-09 prioritised it.** Software family with no manufacturing dependency; direct distribution;
  mature incumbents already sell navigation applications, so the category has observable willingness to
  transact at some level.
- **What MC-10 established.** Nothing. No owner was asked what navigation software they use, what they
  paid, what they rejected or whether NAV's composition and exclusions are understood.
- **Key untested assumptions.** That data fragmentation on board is economically consequential; that
  owners will pay a separate annual subscription; that chart and data licensing constraints permit the
  offering; that NAV is differentiated against mature incumbents.
- **Remaining unknowns.** Actual current spend, switching triggers, cancellation behaviour, comprehension
  of excluded chart rights, perceived value against incumbents.
- **Next step if unblocked.** EXP-MC10-01, 03, 04, 05, 06, 10 in SEG-01/02/03.
- **Restrictions.** No price approved; no chart/data rights granted; no publication.

### WEATHER — rank 2, 3.77

- **What MC-10 established.** Nothing. No forecast-data rights evidence and no customer evidence.
- **Key untested assumptions.** That owners will pay separately for forecast data; that data-provider
  redistribution rights are obtainable; that WEATHER is not already included in an incumbent package.
- **Remaining unknowns.** Rights position, real price tolerance, willingness to rely on a non-certified
  forecast service, perceived differentiation.
- **Next step if unblocked.** Rights research continues (not customer research); then EXP-MC10-03/04/05.
- **Restrictions.** `dataProviderRightsGranted = false`; no forecast-accuracy claim.

### WATCH — rank 3, 3.38

- **What MC-10 established.** Nothing. The unattended-vessel problem was not observed, and no monitoring
  need, alert expectation or price reaction exists.
- **Key untested assumptions.** That owners of unattended vessels will install hardware and pay a
  recurring fee; that marina-provided monitoring is not already considered adequate; that alert delivery
  can be described honestly without a guarantee.
- **Remaining unknowns.** Incident frequency, which alerts trigger action, connectivity reality at the
  berth, subscription tolerance, liability expectations.
- **Next step if unblocked.** EXP-MC10-09 and EXP-MC10-03/04/05 with SEG-03 and SEG-06.
- **Restrictions.** No instant-alert guarantee; no theft-prevention promise; hardware and subscription
  status remain hypotheses.

### HUB — rank 4, 3.37

- **What MC-10 established.** Nothing. Compatibility/installation interest was not tested with installers.
- **Key untested assumptions.** That a multi-brand gateway is needed rather than an incumbent chartplotter
  integration; that installers would accept it; that BOM and conformity are feasible.
- **Remaining unknowns.** Installer requirements, connectivity and power assumptions, RF/electrical
  constraints, price tolerance for hardware, certification path.
- **Next step if unblocked.** EXP-MC10-02 and EXP-MC10-06 with SEG-04.
- **Restrictions.** Hardware not selected; compatibility rows tested = 0; `NMEA 2000 certified = false`.

### FLEET — rank 5, 3.22

- **What MC-10 established.** Nothing. No B2B operator was interviewed.
- **Key untested assumptions.** That multi-vessel operators have a workflow problem worth paying for; that
  data-protection and tenancy requirements are satisfiable; that a trial pathway exists.
- **Remaining unknowns.** Procurement path, budget owner, security review, success metric, per-vessel
  tolerance, existing software replacement cost.
- **Next step if unblocked.** EXP-MC10-07 and operator side of EXP-MC10-09.
- **Restrictions.** FLEET is `NOT_IMPLEMENTED`; no SLA; hardware not included by default; no cross-tenant
  access; no remote control.

### AIS — rank 6, 2.90

- **What MC-10 established.** Nothing. No transponder, receive-only or certification understanding was tested.
- **Key untested assumptions.** That a receive-only or connected AIS concept addresses a real gap; that
  owners understand the difference between receiving and transmitting; that distribution is viable.
- **Remaining unknowns.** Misconception rate about AIS transmission, willingness to add another device,
  certification and conformity cost.
- **Next step if unblocked.** EXP-MC10-06 comprehension (AIS exclusion) and EXP-MC10-02 with installers.
- **Restrictions.** AIS transmission not offered; no certification; no ECDIS claim.

### SENSE — rank 7, 2.84

- **What MC-10 established.** Nothing. No sensor accuracy, installation or calibration reaction was tested.
- **Key untested assumptions.** That owners need additional sensing beyond incumbent systems; that
  calibration is acceptable; that module pricing is tolerable.
- **Remaining unknowns.** Measurement value, calibration burden, compatibility, accuracy expectations.
- **Next step if unblocked.** EXP-MC10-02 and EXP-MC10-06.
- **Restrictions.** `sensorAccuracyClaimed = false`; hardware not selected.

### PILOT — rank 8, 2.64

- **What MC-10 established.** Nothing. No safety, liability or regulatory discussion occurred.
- **Key untested assumptions.** That the safety case can ever be made; that customers would trust
  assisted control; that liability is insurable.
- **Remaining unknowns.** All safety, legal and conformity questions; no customer input is relevant
  until the safety gate exists.
- **Next step.** No customer validation. `PILOT_SAFETY_GATE = BLOCKED` remains the binding constraint.
- **Restrictions.** Remote helm control prohibited; no PILOT customer claim; PILOT never a priced bundle line.

### DISPLAY — rank 9, 2.47

- **What MC-10 established.** Nothing. No display hardware, size, interaction or price reaction was tested.
- **Key untested assumptions.** That a MAREA display is needed against mature incumbents; that the
  hardware cost and certification can be justified.
- **Remaining unknowns.** Size freeze, BOM, installation, sunlight/waterproof requirements, price tolerance.
- **Next step if unblocked.** EXP-MC10-02/06 only if a hardware concept is credible.
- **Restrictions.** Size not frozen; hardware not selected; BOM not established.

## 4. Cross-family conclusion

1. **No family may advance.** The `ADVANCE_TO_QUANTITATIVE_VALIDATION` recommendation requires at least
   one real participant signal; there are zero.
2. **No family may be discontinued.** The `DISCONTINUE_RECOMMENDED` recommendation would require
   negative primary evidence; there is none.
3. **The MC-09 order stands as a desk-research prioritisation only.** MC-10 neither confirms nor
   challenges it, and any future narrative that says otherwise is unsupported by this milestone.
4. **Softwarization sequencing is untested too.** The MC-09 preference for NAV and WATCH/PROTECT before
   hardware is a rational cost-risk argument, not a customer finding.
5. **Governance is unchanged.** All nine families remain `NOT_FOR_SALE`, uncertified, unpriced and
   unvalidated in demand, willingness to pay and profitability.

## 5. Evidence-quality statement

`evidenceQuality = NONE` for all nine families. A future assessment must name, per family: participant
IDs, segment, record IDs, coded units, denominators, the frozen threshold version, and the negative
cases. This document will be replaced by that assessment; it will not be edited to look like it.
