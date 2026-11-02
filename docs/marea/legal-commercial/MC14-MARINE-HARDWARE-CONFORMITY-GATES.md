# MC-14 — Marine hardware conformity gates

| Field | Value |
|---|---|
| Deliverable | D07 `MC14-MARINE-HARDWARE-CONFORMITY-GATES.md` |
| Milestone | MC-14/36 |
| Date | 2026-11-02 |
| Owner | Programme Lead / Product Compliance Engineer (role, not a person) |
| Machine data | `data/regulatory-applicability.json`; `data/release-evidence-gates.json` |
| Status | NO CERTIFICATION EXISTS — `CE_MARKING_CLAIM = PROHIBITED`, `NMEA2000_CERTIFIED = false`, `TESTED_COMPATIBILITY_ROWS = 0` |

## 1. Core rule

A legal requirement being identified is not compliance; a product definition is
not a tested product. No MAREA family has a completed conformity assessment, EU
declaration of conformity, technical file, test report or notified-body outcome.
A design document, a datasheet or a third-party module certificate is not
evidence for the integrated final product.

## 2. Instrument-by-instrument position

| Instrument | Position for MAREA hardware | Key gap |
|---|---|---|
| EMC 2014/30/EU | Applies to non-radio apparatus; radio equipment is covered by the RED's EMC requirement | No EMC test report |
| RED 2014/53/EU | Applies to AIS receiver, WATCH cellular, and any Wi-Fi/BT HUB/DISPLAY variant | No radio assessment, no notified body |
| LVD 2014/35/EU | Generally outside scope for 12/24 V DC marine products; applies to mains variants and supplied power supplies | No voltage-scope analysis |
| GPSR 2023/988 | Applies to all consumer products; safety, traceability, online information and recall duties | No safety assessment, no traceability |
| CRA 2024/2847 | Applies to connected products with digital elements; reporting from 2026-09-11, main duties 2027-12-11 | No CRA process or classification |
| RoHS 2011/65/EU | Applies to EEE | No material declarations |
| WEEE 2012/19/EU | Applies to EEE placed on the Spanish market | No producer registration |
| Batteries 2023/1542 | Applies where a battery is placed on the market with the product | Battery categories not frozen |
| RCD 2013/53/EU | Applies to recreational craft and covered components; add-on electronics are generally outside | RCD component status undetermined for PILOT/DISPLAY |
| MED 2014/90/EU | Applies to shipborne marine equipment; no wheelmark is claimed | No MED determination, no claim |
| PLD 2024/2853 | Applies to hardware, software and updates | No liability assessment |
| Radio spectrum (Ley 11/2022) | Radio transmission requires authorisation; AIS is receive-only | No receive-only/no-transmit evidence |

## 3. Family-specific gates

- **HUB / DISPLAY / SENSE:** system-level EMC, electrical safety, enclosure
  ingress, thermal and (for DISPLAY) sunlight readability evidence. If a radio
  module is integrated, the product is radio equipment and the RED applies to
  the integrated product.
- **AIS:** receive-only radio receiver. RED applies. The antenna/splitter
  integration and no-transmit design must be evidenced. No transmission,
  transponder, DSC or collision-avoidance claim is permissible.
- **WATCH:** cellular radio device plus cloud service. RED, RoHS, WEEE,
  Batteries, GPSR, CRA, PLD and data protection apply. Alert delivery and
  offshore coverage are not guaranteed and must not be claimed.
- **PILOT:** safety-critical supervised steering. `PILOT_SAFETY_GATE = BLOCKED`:
  no safety case, E-stop physical evidence, motor isolation, rudder feedback,
  takeover detection, bench/HIL tests, supervised sea trials or independent
  assessment. PILOT cannot be sold, pre-sold, demonstrated as safe or included
  as a purchasable bundle component.
- **Editions:** every edition inherits its family's gate; a conditional edition
  is not made compliant by the base edition.

## 4. Labels, manuals and traceability

The following must exist before market placement: manufacturer/importer identity
on the product or packaging, model/serial/batch identification, language-
appropriate instructions and safety information (at least Spanish for the
Spanish market where required by the Spanish RED transposition), warnings for
marine installation, and retention of technical documentation. None exists
today.

## 5. Pilot safety restrictions

PILOT is supervised-only by design. No autonomous navigation, unattended
steering, remote helm, collision-avoidance, safety-of-life, SOLAS, GMDSS or
"prevents accidents" claim may be approved. Manual takeover and a physical
E-stop must be described as design boundaries wherever PILOT is mentioned. The
safety case, tests and certification cannot be invented; the gate closes only
with independent verification.

## 6. NMEA and standards boundary

IEC/ISO/NMEA references in design documents are not certifications. NMEA 2000 is
not implemented (stubs only) and no membership, manufacturer/product code or
certificate exists. NMEA 0183 compatibility is untested. No standard-body mark,
certification logo or "certified" wording may be used.

## 7. Conformity evidence package (per family)

1. Final BOM and electrical schematic for the exact SKU.
2. Product-specific risk assessment.
3. Accredited EMC/RF/safety/environmental test reports.
4. EU declaration of conformity signed by the legal manufacturer.
5. Technical documentation file retained for the legal period.
6. Instructions, safety information and traceability.
7. CRA technical documentation, SBOM and support-period decision where in scope.
8. Importer identity and language compliance where EMBARCARTE imports.

No step may be marked complete without the artefact. The release gate
`GATE-MARKET-PLACEMENT` stays `BLOCKED`.

## 8. Honest limitation

This document records obligations and gaps; it does not certify, approve or
authorise any product. Conformity requires an accredited conformity-assessment
process and, where applicable, a notified body. Market surveillance authorities
and courts decide compliance, not this milestone.
