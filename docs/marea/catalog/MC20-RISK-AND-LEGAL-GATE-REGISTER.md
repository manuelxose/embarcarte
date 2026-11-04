# MC-20 — Risk and legal gate register

## 1. Legal and commercial gates (unchanged)

| Gate | State | Effect on MC-20 |
| --- | --- | --- |
| `TRADEMARK_LEGAL_CLEARANCE` | `NOT_GRANTED` | MAREA remains a proposed brand; no public use |
| `MAREA_PUBLIC_USE` | `NO_GO` | no public route or page |
| `SOURCE_IP_CLEARANCE` | `NOT_CLEARED` | no source-IP claim; the AIS decoder licence is declared blocked |
| `LICENSING_RIGHTS_GRANTED` | `false` | no chart, weather, tide or NMEA right is assumed |
| `PRICE_APPROVED` | `NONE` | 0 prices rendered, including MC-05 hypotheses |
| `COMMERCIAL_AVAILABILITY` | `NOT_FOR_SALE` | every family and edition is not for sale |
| `PUBLICATION_AUTHORIZED` | `false` | no publication |
| `INDEXATION_AUTHORIZED` | `false` | noindex only, no sitemap/canonical/hreflang |
| `PRODUCTION_DEPLOYMENT` | `NOT_AUTHORIZED` | no deploy, no merge |
| `GATE-PRIVACY-DPA-DPIA` | `BLOCKED` | no form, no lead capture, no personal data |

13 MC-14 release gates remain registered and 0 are closed; 42 claims remain catalogued and 0 are
publicly authorised.

## 2. Risk register

| ID | Risk | Severity | Mitigation | Status |
| --- | --- | --- | --- | --- |
| R-01 | External legal/commercial gates are unresolved; an internal PASS could be misread as publication clearance | HIGH | explicit gate block on every page and in every delivery document; verdict kept `PARTIAL` | OPEN (external) |
| R-02 | The external AIS decoder (AIS-catcher, GPL-3.0) cannot be distributed before DEC-04 | HIGH | declared in the AIS composition and limitations; no licence terms stated | OPEN (external) |
| R-03 | HUB hardware is not selected; the BOM is not frozen | MEDIUM | `NOT_SELECTED` rendered; no port, radio, processor, power or dimension published | OPEN (external) |
| R-04 | Compatibility matrix has 0 measured rows | HIGH | compatibility notice fails closed; no interoperability claim; matrix referenced | OPEN (external) |
| R-05 | The loopback preview exposes unpublished internal content to any local process | LOW | loopback bind, host allowlist, noindex, no external access; accepted for internal preview | ACCEPTED |
| R-06 | English copy has no professional review | MEDIUM | structural parity + cluster scan; gap recorded as `OUTSTANDING` | OPEN |
| R-07 | Inherited failing gates (`FINANCIAL_V18`, `MC16_FINAL_02`, MC-13 F-05/F-11/F-14, MC-15 GSC-01/GSC-02) | MEDIUM | preserved as explicit failures, no test weakened | OPEN (inherited) |
| R-08 | Automated axe is not WCAG 2.2 AA conformance | MEDIUM | stated as a limitation; manual AT review outstanding (MC19 AC08) | OPEN |

## 3. What MC-20 does not authorise

No merge, no deployment, no publication, no indexation, no price, no stock, no SKU, no order, no
quote, no lead capture, no certification claim and no MC-21 start.
