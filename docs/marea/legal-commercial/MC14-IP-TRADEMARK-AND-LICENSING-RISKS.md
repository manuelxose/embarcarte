# MC-14 — IP, trademark and licensing risks

| Field | Value |
|---|---|
| Deliverable | D06 `MC14-IP-TRADEMARK-AND-LICENSING-RISKS.md` |
| Milestone | MC-14/36 |
| Date | 2026-11-02 |
| Owner | Programme Lead / Legal Counsel (external, not engaged) |
| Machine data | `data/licensing-rights.json`; `data/risk-register.json` (`IPR-*`) |
| Boundary | Read-only risk analysis. No OPEN-MARINE change, no licence grant, no trademark filing |
| Status | `SOURCE_IP_CLEARANCE = NOT_CLEARED`; `TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED` |

## 1. Ownership chain (OPEN-MARINE)

The following is evidence-based and deliberately conservative:

- OPEN-MARINE has **no licence file** in the repository (`LICENSE`, `COPYING`,
  `NOTICE` absent); GitHub reports no licence. Default copyright gives
  EMBARCARTE no proven inbound right to reuse or redistribute the code and gives
  customers no outbound right.
- Roughly half of the files were last touched by a corporate-domain contributor
  without a documented contributor assignment, CLA, DCO or employer waiver.
- Custody sits with a personal account; the relationship between the
  individual, TECNORIA and EMBARCARTE is undocumented.
- The root commit already contained files and pre-history provenance is
  undocumented.
- AI-assisted commits and media assets lack a recorded tool-usage/provenance
  policy.
- Repository custody and Git author emails are **not** ownership evidence.

Required documentary chain: contributor agreements/waivers, employer
confirmation, corporate IP schedule, assignment or exclusive licence to
EMBARCARTE, outbound licence decision, and a repository transfer or custody
agreement. Until then `SOURCE_IP_CLEARANCE = NOT_CLEARED` and no MAREA product
may distribute OPEN-MARINE-derived software, firmware or SaaS.

## 2. Software supply chain

| Item | Finding | Risk | Required evidence |
|---|---|---|---|
| AIS-catcher (GPL-3.0) | Downloaded/compiled at setup; possibly shipped inside the appliance | `IPR-10` | GPL compliance decision, source bundle/written offer, pinned version and hash |
| Third-party notices | No NOTICE bundle for the 1,034-row inventory; Apache-2.0/CC-BY/BlueOak notices required | `IPR-06` | Generated notices per release artefact |
| SBOM and licence gate | No SBOM, no licence allowlist, no CI gate | `IPR-11` | SPDX/CycloneDX SBOM, allowlist, CI check |
| Unknown-licence dependency | One dependency has no identifiable licence | `IPR-12` | Replacement or written clarification |
| Firmware/container pinning | Mutable tags, no digest pinning, no hash verification | `IPR-11` | Pinned digests, reproducible build, firmware manifest |
| First-party manifests | Inconsistent/absent licence metadata | `IPR-12` | Consistent metadata matching the outbound position |

The legal audit distinguishes **findings** from **permission to distribute**:
inventorying a component is not a licence, and a permissive licence still
carries notice obligations.

## 3. Marine data rights

Every chart, weather, bathymetry, tile, geographic and AIS-derived dependency is
mapped in `licensing-rights.json` (17 rights, 0 granted). Public access to an API
or dataset is never a commercial redistribution right. Critical findings:

- **Official ENC/charts:** no IHM/IC-ENC distributor or OEM agreement, no S-63
  status, no end-user EULA. NAV cannot claim official charts, offline official
  regions or ECDIS-like status (`DATA-01`).
- **Weather:** Open-Meteo free API is non-commercial; a paid plan or self-hosted
  AGPL analysis is required. AEMET NWP outputs are not open data and
  MeteoGalicia terms were unreachable (`DATA-02`).
- **Tiles:** OSM tile policy prohibits bulk/offline prefetch; Esri imagery is
  fetched without an account; OpenWeather tile endpoints are a separate paid SKU
  (`DATA-03`).
- **Bathymetry:** GEBCO explicitly forbids navigation use; EMODnet is not a
  nautical chart; one repository source is mislabelled (`DATA-04`).
- **Attribution/provenance/freshness** display is required wherever data is
  shown (`DATA-05`).
- **AIS-derived history/redistribution** is undecided (`DATA-06`).

## 4. NMEA and protocol rights

NMEA 2000 is implemented only as type stubs. NMEA's rules require membership,
licence, manufacturer/product codes and certification for products that read or
transmit NMEA 2000. Read-only interoperability is not certification. No MAREA
product is NMEA-certified; no NMEA trademark or certification mark may be used.
NMEA 0183 compatibility requires tested sentence-level interoperability; the
tested compatibility matrix currently has zero rows.

## 5. Trademark and the MC-03 conflict

`TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED` and `MAREA_PUBLIC_USE = NO_GO`. No
registration, clearance search or filing exists; a prior-user signal ("Marea
Marine") was recorded as a risk indicator, not as an infringement finding.
No `®` or `™` may accompany MAREA, and no statement may present it as
registered or officially cleared.

**Inherited conflict (`MC14-BRAND-CONFLICT-01`).** MC-03's claims policy lists
"MAREA is a product brand of EMBARCARTE" and naming/edition statements among
Class A claims allowed today, while the active restriction is
`MAREA_PUBLIC_USE = NO_GO`. The inherited policy does not distinguish internal
naming from public trademark use sharply enough. MC-14's resolution:

1. The stricter gate prevails: no public MAREA brand use in MC-14.
2. MC-03 evidence is **not** edited or silently replaced.
3. A formal supersession proposal is recorded in the decision log and delivery
   record; it requires brand-owner and counsel approval before the brand
   contract changes.

## 6. Media, AI and asset provenance

Some asset files have a manifest, but there is no AI-tool usage policy or asset
provenance record for several media files. Commercial use of unprovenanced
assets is blocked until the provenance register exists (`IPR-05`).

## 7. Release restrictions

| Right | Status | Consequence |
|---|---|---|
| Source IP / firmware distribution | `NOT_GRANTED` | No distribution of derived software/firmware |
| Third-party notices/SBOM | `NOT_GRANTED` | No release artefact until notices exist |
| Official charts/ENC | `NOT_GRANTED` | No official-chart or navigation-grade claim |
| Weather/tile/basemap rights | `NOT_GRANTED` | No paid data-backed feature |
| NMEA 2000 | `NOT_GRANTED` | No NMEA certification/interoperability claim |
| MAREA trademark | `NOT_GRANTED` | No public brand use |
| Media/AI assets | `NOT_GRANTED` | No commercial use of unprovenanced assets |

All rights are \`NOT_GRANTED\`, 0 contracts exist, and no provider has been
contacted. Closing them is an external decision (`DEC-MC14-003`,
`DEC-MC14-004`, `DEC-MC14-005`, `DEC-MC14-008`, `DEC-MC14-009`).

## 8. Honest limitation

This is an internal risk register, not an IP opinion or freedom-to-operate
analysis. It records what is missing, not what a court would decide. Counsel must
confirm ownership, licence compatibility, notice sufficiency and trademark
availability before any distribution.
