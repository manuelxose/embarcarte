# Licence Notice and Distribution Policy — MAREA / EMBARCARTE

| Field | Value |
| --- | --- |
| Document ID | MC-02 / B3 / LICENSE-NOTICE-AND-DISTRIBUTION-POLICY |
| Program | MAREA (EMBARCARTE) |
| Milestone | MC-02 — technology, IP, licensing and commercial-reuse audit |
| Prepared by | Agent B — intellectual property and licensing auditor |
| Date | 2026-10-30 |
| Inventory baseline | `docs/marea/compliance/SOFTWARE-LICENSE-INVENTORY.csv` — 1,034 rows derived from 5 `package-lock.json`, 1 `requirements-copernicus.txt`, 1 `requirements`-by-`pip install`, 2 Docker images, 6 apt components, 4 external binaries, 1 firmware runtime, 3 CI actions, 1 host runtime |
| IP chain baseline | `docs/marea/compliance/INTELLECTUAL-PROPERTY-CHAIN.md` |
| Status | `PARTIAL` — policy defined; controls are **not yet enforced in CI** and several prerequisites are `BLOCKED` on legal/ownership evidence (see section 14, section 15) |
| Legal nature | Operational policy for engineering. Not legal advice. Escalation triggers in section 13 route open questions to qualified counsel. |

This policy is written against the actual OPEN-MARINE findings, not as generic boilerplate. It governs how the MAREA product may use the OPEN-MARINE codebase and its dependency chain in commercial releases.

---

## 1. Purpose and scope

1.1 Define how MAREA releases (hosted service, appliance software, container images, embedded firmware, documentation and mobile/PWA clients) satisfy third-party licence obligations, data-provider terms and ownership constraints.

1.2 In scope:

- software dependencies from the five `package-lock.json` files and the Python requirements/pip installs;
- platform components: container base images, Signal K image, Node.js, Docker tooling;
- externally downloaded binaries (AIS-catcher), host tools (GDAL, tippecanoe), firmware runtime (MicroPython) and CI actions;
- chart, weather and geospatial data providers and their attribution/redistribution terms;
- third-party media assets, AI-generated content and standards-derived material;
- first-party proprietary code handling and contributor provenance.

1.3 Out of scope: trademark clearance, patent opinions, contract drafting, security assessment (separate work streams); legal interpretation of contracts (counsel).

1.4 Normative language: **MUST**, **MUST NOT**, **SHOULD** are used in the operational sense. A release cannot be marked `PASS` if any MUST gate in section 14 fails.

---

## 2. Distribution modes covered

The inventory distinguishes five distribution modes. Obligations differ by mode and the same component can be in several modes.

| Mode | MAREA artefact | Licence consequences |
| --- | --- | --- |
| `SaaS/hosted` | Browser UI served from EMBARCARTE infrastructure | Notice obligations still apply to distributed JS/CSS/asset bundles; AGPL-style network clauses would apply if AGPL code were used (none found in npm tree); data-provider terms apply to server-side fetching and caching |
| `executable/appliance` | Software installed on a Raspberry Pi/onboard computer sold or loaned by MAREA | Full distribution analysis: notices, licence texts, copyleft source-disclosure obligations, firmware notices, data attribution |
| `container image` | `marine-tile-server` image, Signal K image | Image-level SBOM, licence texts, copyleft toolchain exposure in non-multi-stage builds, digest pinning |
| `embedded firmware` | Pico 2 safety bridge (first-party Python on MicroPython) | MicroPython MIT notice + rp2 port BSD-3 component notices with any programmed board |
| `build-only` | tooling (TypeScript, ESLint, Vitest, Vite, esbuild, CI actions, GDAL, tippecanoe, mpremote) | Notices not required in product if not redistributed; if the build image is published, tool licences must be included |

Rule: a component classified `build-only` today MUST be re-reviewed before it is added to any distributed image or appliance snapshot.

---

## 3. Roles and responsibilities

| Role | Responsibility |
| --- | --- |
| Product owner (MAREA) | Owns the outbound licence decision (currently missing), accepts residual risk, approves releases |
| Engineering lead | Runs the gates, produces SBOM/NOTICE artefacts, fixes engineering deviations (Dockerfile, pins, attribution display) |
| Licence/compliance owner (this audit function) | Maintains the inventory, reviews dependency updates, approves or escalates, records evidence |
| Legal counsel | Reviews every `LEGAL_REVIEW_REQUIRED` item, supplier agreements, ownership assignments, data-provider terms, AI policy |
| Release manager | Verifies gating checklist evidence is attached to the release record |
| Data owner | Confirms provider terms and attribution strings for OSM/OpenSeaMap/IHM/EMODnet/GEBCO/NOAA/Copernicus/Open-Meteo/OWM/Puertos/MeteoGalicia/AEMET/ArcGIS/CartoCiudad |

No release may be published on the basis of an individual engineer's assessment of a `LEGAL_REVIEW_REQUIRED` item.

---

## 4. Dependency intake gates

Every change to a manifest, lockfile, Dockerfile, CI workflow, downloaded binary, data provider or media asset triggers the corresponding gate.

### 4.1 New or updated npm dependency

Required evidence before merge:

1. Component identity and version (`name@version`) recorded in the lockfile.
2. Licence from lockfile metadata; if absent, from the npm registry version document (URL + retrieval date); if still absent, from the upstream repository `LICENSE` file.
3. Classification: direct/transitive, runtime/build-only, distribution modes.
4. Copyleft inspection (GPL/AGPL/LGPL/MPL/EUPL/SSPL/Commons Clause).
5. Notice obligation and the exact copyright/licence text needed for the notice bundle.
6. For packages with `UNKNOWN`/`UNLICENSED` metadata: **MUST NOT** ship until resolved in writing.

Intake form fields (minimum): package, version, source URL, licence (SPDX), evidence URL/date, dependency type, distribution modes, obligations, risk, decision, approver, decision date.

### 4.2 Dependency version upgrade

- MUST regenerate the inventory CSV and diff old vs new rows.
- MUST re-check licence if the previous licence differed from the new one; a licence change is a gate event, not a routine update.
- MUST re-check `integrity` fields and registry provenance attestations.

### 4.3 Container base image / Dockerfile change

- MUST record image reference, tag and digest; tags are not acceptable identifiers.
- MUST generate an image-level SBOM (e.g. Syft) before release; the repository currently has no image SBOM.
- MUST keep the build toolchain out of the runtime stage (multi-stage build).
- MUST record Debian package licences introduced by `apt-get install`.

### 4.4 Downloaded binaries (AIS-catcher, release archives)

- MUST pin a specific release version, not `latest`.
- MUST record URL, release tag, SHA-256 and licence text.
- MUST NOT bundle into a proprietary artefact without a source-disclosure decision (GPL-3.0).
- Current deviation: `scripts/init.sh` uses `releases/latest/download/...` and compiles from a moving branch.

### 4.5 Data providers

- MUST record provider, product, endpoint, access method, licence/terms statement, attribution string, caching/redistribution restrictions, evidence URL and date.
- MUST NOT enable a provider in a commercial build until section 10 is complete for it.
- Current high-risk providers: OSM raster tiles (offline/prefetch prohibition), Puertos del Estado (third-party transfer warning), IHM (online-only/caching), Esri ArcGIS imagery (terms), OpenWeatherMap/Open-Meteo (commercial plans), AEMET (not open data).

### 4.6 Media and assets

- MUST record source, author, licence and evidence for every non-code asset (icons, fonts, audio, images, sample data).
- Current gaps: three `.wav` alarm sounds with no provenance; sprite/logo/favicon without provenance records; Google Fonts loaded at runtime; `flagcdn.com` and `i.pravatar.cc` references.

### 4.7 AI-generated code or assets

- MUST record which AI tool/model assisted and whether the output was reviewed by a human.
- MUST NOT ship AI-generated media whose training/provenance cannot be attested, unless counsel clears it.
- Current gaps: 5 Claude-authored commits, AI-agent branches, unprovenanced audio.

---

## 5. Licence review rules

### 5.1 Allow/deny matrix

| Licence family | Internal use | Product distribution | Rule |
| --- | --- | --- | --- |
| MIT, ISC, BSD-2, BSD-3, 0BSD, BlueOak-1.0.0, MIT-0, Unlicense, CC0 | Allowed | Allowed | Include copyright/licence text in notice bundle |
| Apache-2.0 | Allowed | Allowed | Include licence + NOTICE text; mark modified files; no trademark rights |
| Python-2.0 / PSF | Allowed | Allowed | Include licence text |
| CC-BY-4.0 / CC-BY-3.0 (data-like: `caniuse-lite`, `spdx-exceptions`) | Allowed | Build-only: no notice required. Runtime: attribution required | If shipped in product, display attribution |
| MPL-2.0 | Allowed | Allowed with file-level copyleft | Publish source of modified MPL files |
| LGPL-2.1/3.0 | Allowed | Allowed with relinking/source for library | Prefer dynamic linking; disclose library source |
| GPL-2.0/3.0 | Allowed internally | Allowed only via separate-process aggregation or full GPL compliance | Legal review; source offer; installation information for User Products |
| EUPL-1.2 | Allowed | Allowed with copyleft source obligations | Legal review; keep tooling external where possible |
| AGPL / SSPL / Commons Clause / non-commercial | Not allowed without counsel | Not allowed by default | Legal review |
| UNKNOWN / UNLICENSED / NOASSERTION | Not allowed for shipping | Not allowed | Resolve in writing first |

### 5.2 Current inventory reconciliation

| Family | Rows | Representative components | Current gate status |
| --- | ---: | --- | --- |
| Permissive (MIT/ISC/BSD/PSF/WTFPL) | 960 | `@angular/*`, `maplibre-gl`, `express`, `better-sqlite3`, `ws`, `rxjs` | Notice bundle missing (G-03) |
| BlueOak-1.0.0 | 13 | `glob`, `lru-cache`, `minimatch`, `tar` | Notice bundle missing (G-03) |
| Apache-2.0 | 38 | `typescript`, `rxjs`, `playwright`, `xarray`, `requests` | Notice/NOTICE text missing |
| Public-domain dedication | 6 | `tslib` (0BSD), `robust-predicates` (Unlicense), `mdn-data`/`spdx-license-ids` (CC0), `type-fest` (MIT OR CC0) | No action beyond listing |
| Creative Commons attribution | 3 | `caniuse-lite` (CC-BY-4.0, build-only), `spdx-exceptions` (CC-BY-3.0, build-only) | No product notice required at current classification |
| Copyleft (GPL/LGPL/EUPL) | 6 | AIS-catcher (GPL-3.0), make/g++ (GPL-3.0), librtlsdr (GPL-2.0), libusb (LGPL-2.1), copernicusmarine (EUPL-1.2) | Open legal review (G-06) |
| Proprietary / no outbound licence declared | 7 | six first-party workspace packages (`UNLICENSED`) + `marine-tile-server` (declares `ISC` only) | Blocked (G-01) |
| Unknown / uncategorised | 1 | `@mapbox/jsonlint-lines-primitives` (no licence metadata) | Blocked (G-05) |
| **Total** | **1,034** | | |

Family rows sum to the 1,034 CSV rows. Separately, by licence field value: 6 rows carry `UNLICENSED` (first-party) and 1 row carries `UNKNOWN` (`@mapbox/jsonlint-lines-primitives`); the 13 Python rows are `direct`/`transitive` and are included in the family counts above.

### 5.3 Static-bundled JavaScript

The UI ships JavaScript to browsers (static bundling). For permissive licences, bundling is permitted provided notices are retained; `@license`/`@preserve` comments MUST NOT be stripped by minification without an equivalent notice output. The notice bundle is the authoritative retention mechanism.

---

## 6. Third-party notice bundle

### 6.1 Inputs

1. `SOFTWARE-LICENSE-INVENTORY.csv` at the exact release commit.
2. Per-licence full licence texts (SPDX identifiers).
3. Copyright lines for components that declare them (at minimum the licence header of each distinct component family).
4. Data-provider attribution strings (section 10.2).
5. Asset provenance records and AI-content notes.
6. Metadata: product version, repository revision, generation date, inventory SHA-256.

### 6.2 Required outputs per artefact

| Artefact | Bundle form |
| --- | --- |
| Hosted UI (`SaaS/hosted`, `executable/appliance`) | `THIRD-PARTY-NOTICES.txt` served at a stable route (e.g. `/licences`) and linked from an "About / Licences" screen; includes all front-end bundle components plus shared platform notes |
| Appliance software | `THIRD-PARTY-NOTICES.txt` in the install root plus `/usr/share/doc/marea/`; full licence texts |
| Container images | `/licenses/THIRD-PARTY-NOTICES.txt` and `/licenses/<licence>.txt` inside the image; image SBOM alongside |
| Embedded firmware | `FIRMWARE-NOTICES.txt` accompanying each programmed board or download bundle (MicroPython MIT, rp2 port BSD-3 components, first-party licence statement) |
| Documentation / printed material | Data attribution block and open-source acknowledgements |

### 6.3 Generation process

1. Run the deterministic extraction (Appendix A of the IP chain document) against the release commit.
2. Diff against the previous release inventory; every added/removed/licence-changed row requires review.
3. Render notices from the CSV using a committed generator script (to be created by engineering; MUST be deterministic and reproducible).
4. Review for completeness: row count, distinct licence count, zero `UNKNOWN` rows, all copyleft items covered by the section 7 decision.
5. Attach the rendered notices and the generator output hash to the release record.

### 6.4 Current status

- Inventory: complete and reproducible (1,034 rows).
- Notice bundle: **does not exist**; no `NOTICE`, `THIRD-PARTY-NOTICES` or licence screen in the repository.
- Therefore any external distribution today would breach MIT/ISC/BSD/Apache-2.0 attribution terms and the CC-BY/ODbL data attribution terms.

---

## 7. Source-disclosure obligations (copyleft)

### 7.1 Current copyleft inventory

| Component | Licence | How it can reach a MAREA artefact | Decision required |
| --- | --- | --- | --- |
| AIS-catcher | GPL-3.0 | Downloaded or compiled by `scripts/init.sh`; expected at `tools/ais-catcher/AIS-catcher`; started by `scripts/start-ais.sh`/`.ps1` and consumed as NMEA over UDP port 10110 | Keep as a separate executable aggregated at arm's length (separate process, no linking, no combined derivative), or ship with full GPL compliance (source offer, licence text, installation information). `LEGAL_REVIEW_REQUIRED` |
| `make`, `g++` | GPL-3.0-or-later | Installed in `marine-tile-server/Dockerfile` without a multi-stage build, therefore redistributed inside the image | Convert to multi-stage build so the toolchain is not shipped; otherwise GPL source-offer obligations apply. `LEGAL_REVIEW_REQUIRED` |
| `librtlsdr` | GPL-2.0-or-later | AIS-catcher build dependency (`apt-get install librtlsdr-dev`) | Build-only; obligations arise only if the compiled binary or library is distributed with AIS-catcher |
| `libusb-1.0` | LGPL-2.1-or-later | AIS-catcher build dependency | If redistributed, provide library source/relink ability |
| copernicusmarine | EUPL-1.2 | Optional Python operator tooling installed from `requirements-copernicus.txt`, used by `marine-chart-engine` sync scripts | Keep outside the shipped appliance image, or comply with EUPL source/notice obligations. `LEGAL_REVIEW_REQUIRED` |

### 7.2 Rules

1. MUST NOT statically link or bundle GPL/AGPL/EUPL code into proprietary MAREA modules.
2. Where copyleft binaries are distributed, the release MUST include the licence text and a written source offer valid for at least three years (and for as long as the product model is supported), or an equivalent network location.
3. For User Products (sold/loaned hardware), installation information must be provided where GPL-3.0 applies.
4. Any modification of copyleft code MUST be recorded (date, author, purpose) and published under the same licence.
5. A release containing no copyleft artefacts does not require source disclosure, but this MUST be re-verified on every dependency update.

### 7.3 Recommended architecture

Keep AIS-catcher as an isolated, separately installed executable (current design: separate process, UDP NMEA) and keep the Python chart-sync tooling on operator workstations rather than in the shipped image. This preserves the proprietary product surface while allowing the user to install GPL/EUPL tools themselves, subject to counsel confirmation.

---

## 8. Container-image licensing

1. `marine-tile-server/Dockerfile` MUST become multi-stage: build stage with `python3 make g++` and `npm install`, runtime stage with only runtime files and `npm ci --omit=dev`-equivalent installation.
2. The runtime image MUST include `/licenses/THIRD-PARTY-NOTICES.txt` and the SBOM.
3. Base images MUST be referenced by digest (`node:18-slim@sha256:...`); `signalk/signalk-server:v2.22.1` MUST be pinned by digest for release builds.
4. Image SBOM generation (Syft/Trivy or equivalent) is a release gate; it is currently absent.
5. Debian package licences introduced in the runtime stage (if any) must be listed; `python3` currently remains in the image by design of the single-stage build.
6. Any image that includes AIS-catcher MUST follow section 7.

---

## 9. Firmware licensing

1. The Pico 2 safety bridge is first-party Python running on MicroPython; `pico2/install.sh` copies first-party files and installs `mpremote` (MIT) from PyPI.
2. Any board or download shipped by MAREA MUST include `FIRMWARE-NOTICES.txt` containing:
   - MicroPython MIT licence and copyright;
   - the rp2 port third-party component notices identified in the upstream `LICENSE` tree (BSD-3-Clause families);
   - a first-party notice stating authorship and the outbound terms of the MAREA product;
   - `mpremote`/`pyserial`/`platformdirs` notices only if the deployment tooling is redistributed.
3. Do not reproduce vendor datasheets/diagrams (Raspberry Pi, Cytron, TDK InvenSense) in firmware documentation without permission; link instead.
4. Firmware updates distributed by MAREA inherit the same notice obligations; regenerating firmware binaries does not change them.

---

## 10. Proprietary EMBARCARTE code handling

1. The OPEN-MARINE repository has **no outbound licence**. Until the owner records a decision, all first-party code is "all rights reserved" and MUST NOT be represented to customers as open source.
2. The stray `"license": "ISC"` in `marine-tile-server/package.json` MUST be reconciled: either remove it (consistent with the rest of the repository) or make a documented licensing decision covering the whole repository.
3. After ownership clearance, add SPDX headers to first-party files (e.g. `SPDX-FileCopyrightText` and `SPDX-License-Identifier: LicenseRef-Proprietary` pending a final choice). Headers MUST NOT be added before the ownership decision.
4. `README.md` and product documentation MUST NOT describe the project as open source, certified, or licence-cleared while no licence exists.
5. Confidential and unpublished code MUST NOT be committed to a public repository; the current repository is public.
6. Contributions from third parties MUST be covered by a CLA or DCO. The repository currently has neither; this MUST be added before external contributions are accepted.
7. AI-assisted work MUST be recorded (tool/model, date, human reviewer). AI-generated assets without provenance MUST NOT ship.

---

## 11. Supplier and data-provider agreements

### 11.1 Agreements/confirmations required before commercial release

| Provider | Requirement | Current evidence | Status |
| --- | --- | --- | --- |
| IHM via IC-ENC / authorised distributor | S-63 OEM/USERPERMIT supplier agreement; terms for RasterENC display | code supports the workflow; provider disabled; bypass explicitly not implemented (`docs/CHARTS.md`, `README.md`) | `BLOCKED` — no agreement in evidence |
| IHM RasterENC WMTS | Terms of Use confirmation; caching restrictions | attribution and "not valid for navigation" present | `LEGAL_REVIEW_REQUIRED` |
| Puertos del Estado (PORTUS, HF radar) | Written authorisation for third-party transfer/derived redistribution if required by its FAQ | repository docs warn against transfer without authorisation | `LEGAL_REVIEW_REQUIRED` |
| Copernicus Marine | Terms acceptance; attribution/DOI retention; derived-data redistribution review | DOIs and attribution recorded in repository docs | `LEGAL_REVIEW_REQUIRED` |
| EMODnet | Attribution compliance (EU CC BY 4.0); DTM redistribution terms | attribution implemented; docs record requirement | `PASS with attribution` |
| GEBCO | Terms-of-use review for commercial product use | attribution implemented | `LEGAL_REVIEW_REQUIRED` |
| NOAA | Public-domain no-endorsement notice | attribution implemented | `PASS with notice` |
| OpenStreetMap / OpenSeaMap | Tile usage policy compliance or self-hosted/paid alternative | attribution implemented; offline-download feature conflicts with policy | `FAIL` for offline feature |
| Open-Meteo | Confirm free vs commercial plan terms; attribution | attribution recorded | `LEGAL_REVIEW_REQUIRED` |
| OpenWeatherMap | Commercial plan terms; caching/attribution rules; API key handling | key-gated integration; attribution implemented | `LEGAL_REVIEW_REQUIRED` |
| Esri ArcGIS World Imagery | Terms of use; attribution; commercial restrictions | no terms record in code | `LEGAL_REVIEW_REQUIRED` |
| MeteoGalicia (WRF, tides RSS) | Dataset terms | docs: "confirm dataset terms" | `LEGAL_REVIEW_REQUIRED` |
| AEMET | Data request/agreement (not open data) | docs record non-open status | `BLOCKED` if used |
| CartoCiudad (IGN) | Geocoder terms/attribution | no record | `LEGAL_REVIEW_REQUIRED` (low exposure) |
| MapLibre demo tiles (glyphs) | Production-safe glyph hosting | demo endpoint in code and service worker | `FAIL` — replace with self-hosted glyphs |
| Google Fonts | Self-host fonts; OFL notices | runtime `<link>`/`@import` to fonts.googleapis.com | `SHOULD FIX` |
| flagcdn / pravatar | Terms check; remove demo-only references | code references | `SHOULD FIX` |

### 11.2 Attribution matrix (strings already present in code; MUST survive into product UI)

| Provider | Attribution string in code | Where displayed today | Where it MUST be displayed in release |
| --- | --- | --- | --- |
| OpenStreetMap | `© OpenStreetMap contributors` (HTML in chart styles) | map attribution control | Map corner (visible) + notices |
| OpenSeaMap | `© OpenSeaMap contributors` | map attribution control | Map corner + notices |
| IHM | `© Instituto Hidrográfico de la Marina (IHM) — not valid for official navigation` | map attribution / catalog | Map corner + notices + product disclaimer |
| EMODnet | `EMODnet Bathymetry Consortium` (docs require EU CC BY 4.0) | map attribution / sync manifest | Map corner + notices |
| GEBCO | `Imagery reproduced from the GEBCO Compilation / GEBCO Grid` | map attribution | Map corner + notices |
| NOAA | `NOAA Office of Coast Survey` | map attribution | Map corner + notices + no-endorsement note |
| Copernicus Marine | `EU Copernicus Marine Service Information` | environment panels | Data panels + notices |
| Open-Meteo | `Open-Meteo … upstream models` | weather panels | Panels + notices |
| OpenWeatherMap | `© OpenWeatherMap` | overlay layer attribution | Map corner + notices |
| Puertos/Intecmar/IH Portugal | `Puertos del Estado, Intecmar-Xunta de Galicia and Instituto Hidrográfico de Portugal` | provider metadata (`puertos-hf-radar.provider.ts`) | Data panels + notices |
| IHM tides (port 29) | recorded in tide output metadata | tide panel | Tide panel + notices |

Attribution MUST NOT be hidden behind toggles or removed by styling. Data fetched through proxies retains the original provider attribution.

---

## 12. Dependency-update review and SBOM cadence

### 12.1 Triggers (any of these requires a review)

- any `package.json`/`package-lock.json` change;
- any `requirements-copernicus.txt` change or new `pip install` in scripts;
- Dockerfile / compose / base-image change;
- new external binary, download URL or checksum;
- new data provider, endpoint or attribution;
- new media asset or AI-generated asset;
- CI workflow change (actions);

### 12.2 Review steps

1. Regenerate the inventory in a clean checkout at the release commit.
2. Diff row-by-row: added, removed, version-changed, licence-changed, status-changed.
3. Apply section 5 rules and section 4 gate evidence.
4. Update the notice bundle and re-render.
5. Record decision in the release evidence pack.

### 12.3 Regeneration cadence

| Event | Cadence |
| --- | --- |
| Release candidate | At freeze, mandatory |
| `main` without release | Monthly |
| Security advisory on a dependency | Immediately |
| New dependency/version merge | Per merge |
| Container image rebuild | Per image build |

### 12.4 Reproducibility requirements

- Extraction MUST be deterministic: same commit and inputs → identical CSV (sorted, stable quoting, UTF-8 without BOM, 21 fixed columns).
- The current baseline is reproducible: 5 lockfiles → 2,147 packages-map entries (2,133 non-root/non-link, 9 links) → 1,004 unique `name@version` → 997 third-party npm rows; plus 13 Python and 17 platform rows = 1,034 total.
- Any deviation in these counts requires an explicit delta note in the release record.

---

## 13. Escalation to legal counsel (mandatory triggers)

Escalate immediately, and do not publish, when any of the following occurs:

1. A GPL, AGPL, LGPL, MPL, EUPL or other copyleft component is intended to be distributed (currently: AIS-catcher, make/g++, librtlsdr, libusb, copernicusmarine).
2. A component or asset has `UNKNOWN`, `UNLICENSED` or ambiguous licence (currently `@mapbox/jsonlint-lines-primitives`; audio assets).
3. Any CC-BY-NC/ND, proprietary or contractual data terms restrict redistribution or commercial use (OSM tile policy, Puertos, IHM, Esri, OWM, Open-Meteo).
4. Data is to be cached, packaged offline or redistributed beyond on-screen display.
5. AI-generated content is intended to ship in the product or brand assets.
6. A contributor lacks an assignment/CLA, or their employer may own the contribution (current: `mgonzalezv@eservicios.indra.es`).
7. The repository licence, visibility or outbound terms are about to change.
8. A supplier agreement is required (S-63, commercial weather API, chart distributor).
9. A trademark or naming claim ("Open Marine Instrumentation", "OMI", "MAREA") is about to be used in commerce.
10. A third party asserts rights or sends a notice.
11. A checksum/signature verification of a downloaded binary fails.

---

## 14. Release gating checklist

Statuses at MC-02 (2026-10-30). `PASS` means evidence exists in this milestone; `FAIL` means the control is not met; `BLOCKED` means external evidence is required; `N/A` is not allowed for a commercial release.

| ID | Gate | Evidence required | MC-02 status |
| --- | --- | --- | --- |
| G-01 | Outbound licence/terms decision recorded (or explicit proprietary position) | Signed owner decision; no stray `license` fields | `BLOCKED` |
| G-02 | Ownership/assignment chain complete for all contributors and author e-mails | Assignments/waivers; employer confirmations | `BLOCKED` |
| G-03 | Third-party notice bundle generated for the release | NOTICE file + licence texts + generation record | `FAIL` |
| G-04 | Inventory current, complete and reproducible at release commit | CSV + regeneration log + count reconciliation | `PASS` (baseline exists) |
| G-05 | Zero unresolved third-party licences | No `UNKNOWN`/`UNLICENSED` rows for third-party components | `FAIL` (1: `@mapbox/jsonlint-lines-primitives`) |
| G-06 | Copyleft review completed and decided | Legal decision for AIS-catcher, copernicusmarine, make/g++, librtlsdr, libusb | `FAIL` |
| G-07 | Container image SBOM produced; Dockerfile multi-stage | SBOM artefact + Dockerfile diff | `FAIL` |
| G-08 | Container images pinned by digest | Compose/Dockerfile digests; AIS-catcher release pin + SHA-256 | `FAIL` |
| G-09 | Data-provider terms register complete and permissions obtained | Section 11.1 statuses not `LEGAL_REVIEW_REQUIRED`/`BLOCKED` | `FAIL` |
| G-10 | Data attribution implemented and not hideable | UI/notices screenshots or route; attribution matrix sign-off | `PARTIAL` (strings in code; no consolidated UI/notice) |
| G-11 | OSM/OpenSeaMap tile-policy compliance (or replacement provider) | Decision on offline download feature; provider configuration | `FAIL` |
| G-12 | Source-disclosure process defined and executable | Source-offer template/location; licence texts; retention | `FAIL` |
| G-13 | Asset provenance complete | Asset manifest with licences/evidence | `FAIL` (WAV, sprite, favicon) |
| G-14 | AI content policy and per-commit/tool record | AI registry; legal sign-off; asset decisions | `FAIL` |
| G-15 | Dependency-update review process operational | This policy + review log for the release delta | `PASS` (policy) / `FAIL` (no CI enforcement yet) |
| G-16 | Python dependencies pinned with hashes and lockfile | Constraint/lock file; `pip install --require-hashes` | `FAIL` |
| G-17 | CI actions pinned to commit SHAs and reviewed | Workflow diff | `FAIL` |
| G-18 | Third-party data/config in Git history reviewed and disposition recorded | Decision note (history rewrite vs notice) | `FAIL` |
| G-19 | Brand/trademark review for names used in commerce | Clearance record | `BLOCKED` |
| G-20 | Firmware notice bundle for programmed boards | `FIRMWARE-NOTICES.txt` | `FAIL` |

Release rule: a commercial release requires `PASS` on G-01..G-20, or a written, owner-signed risk acceptance for each `FAIL`/`BLOCKED` item with counsel review for legal items. `PARTIAL` is not releasable.

---

## 15. Open issues register (drawn from the MC-02 findings)

| ID | Issue | Source | Owner | Priority | Status |
| --- | --- | --- | --- | --- | --- |
| LR-01 | No outbound licence / stray `ISC` in `marine-tile-server/package.json` | IP chain §2, §8 R-IP-01 | Product owner + counsel | Critical | Open |
| LR-02 | Missing contributor assignment for `mgonzalezv@eservicios.indra.es` (495 current files) | IP chain §3, §7 D-02 | Product owner + counsel | Critical | Open |
| LR-03 | Missing ownership confirmation for `oficina@tecnoriasl.com` identity and company | IP chain §3, §7 D-03 | Product owner + counsel | Critical | Open |
| LR-04 | AI-assisted code/assets with no tool/usage record | IP chain §4, §7 D-05 | Engineering + counsel | High | Open |
| LR-05 | Third-party notice bundle absent | this policy §6 | Engineering | High | Open |
| LR-06 | AIS-catcher GPL-3.0 distribution decision | this policy §7 | Engineering + counsel | High | Open |
| LR-07 | Non-multi-stage Dockerfile ships GPL `make`/`g++` | this policy §8 | Engineering | High | Open |
| LR-08 | copernicusmarine EUPL-1.2 if Python env is bundled | this policy §7 | Engineering + counsel | High | Open |
| LR-09 | OSM tile policy vs offline chart download feature | this policy §11 | Product + engineering | High | Open |
| LR-10 | Puertos del Estado third-party transfer restriction | this policy §11 | Product + counsel | High | Open |
| LR-11 | OpenWeatherMap / Open-Meteo / Esri commercial terms | this policy §11 | Product + counsel | High | Open |
| LR-12 | `@mapbox/jsonlint-lines-primitives` licence unresolved | inventory G-05 | Compliance | High | Open |
| LR-13 | Audio asset provenance (`alarm-*.wav`) | IP chain §4.4 | Design + engineering | High | Open |
| LR-14 | Third-party data/config in public Git history | IP chain §4.8 | Engineering + product | Medium | Open |
| LR-15 | Python dependencies unpinned; no hashes | inventory | Engineering | Medium | Open |
| LR-16 | CI actions not pinned by SHA | inventory | Engineering | Medium | Open |
| LR-17 | Runtime dependency on `demotiles.maplibre.org` glyphs and Google Fonts | inventory / §11 | Engineering | Medium | Open |
| LR-18 | i.pravatar.cc / flagcdn references in shipped code | inventory | Engineering | Low | Open |

---

## 16. Records and audit trail

For every commercial release, retain (in a controlled location, not necessarily in the public repository):

1. Repository revision hash and build manifest.
2. SBOM/inventory CSV for the release and its SHA-256.
3. Rendered notice bundle(s) and generator version.
4. Gating checklist with evidence links and approver names.
5. Legal review decisions for every `LEGAL_REVIEW_REQUIRED` item.
6. Data-provider attribution verification and terms evidence.
7. Container image SBOM and digest list.
8. Firmware notice file and asset provenance manifest.
9. Dependency-update review log (added/removed/licence-changed rows).
10. Risk acceptances signed by the owner.

Retention: at least as long as the product is supported plus six years (to evidence licensing during the support period).

---

## 17. Engineering actions required to make this policy enforceable

| # | Action | Target | Gate |
| ---: | --- | --- | --- |
| 1 | Commit a deterministic notice-generator script plus a `NOTICE`/third-party notices template | `scripts/compliance/` (engineering decision) | G-03 |
| 2 | Convert `marine-tile-server/Dockerfile` to multi-stage; pin digests | Dockerfile | G-07, G-08 |
| 3 | Pin `signalk/signalk-server` and `node` images by digest | compose/Dockerfile | G-08 |
| 4 | Replace `tile.openstreetmap.org` usage with a compliant tile strategy (self-hosted or licensed provider) and decide the offline-download feature | UI/chart engine | G-11 |
| 5 | Replace `demotiles.maplibre.org` glyphs with self-hosted glyphs; self-host fonts; remove demo-only external assets | UI | G-10, LR-17, LR-18 |
| 6 | Add licence + SHA-256 pinning for AIS-catcher download; record source offer if distributed | `scripts/init.sh` | G-08, G-12 |
| 7 | Add Python constraint/lock file with hashes for requirements and runtime pip installs | chart engine, RPi scripts | G-16 |
| 8 | Pin CI actions to commit SHAs | `.github/workflows/ci.yml` | G-17 |
| 9 | Add asset provenance manifest (icons, logos, audio, fonts) | UI assets | G-13 |
| 10 | Record AI tool usage per commit/asset; add CONTRIBUTING/DCO (after counsel) | repo root | G-14, LR-04 |
| 11 | Resolve `@mapbox/jsonlint-lines-primitives` licence | inventory | G-05 |
| 12 | Produce firmware notices | `marine-autopilot-engine/pico2` | G-20 |
| 13 | Create `THIRD-PARTY-NOTICES.txt` and licence screen | UI + appliance | G-03, G-10 |

---

## 18. References

- `docs/marea/compliance/INTELLECTUAL-PROPERTY-CHAIN.md` — ownership/provenance evidence, risk register.
- `docs/marea/compliance/SOFTWARE-LICENSE-INVENTORY.csv` — 1,034-row machine-readable inventory (columns: `component,version,source,workspace,usage,license,license_evidence,distribution_mode,obligations,risk,status,action` + classification columns).
- OpenStreetMap Foundation Tile Usage Policy — `https://operations.osmfoundation.org/policies/tiles/` (retrieved 2026-10-30).
- npm registry version documents, PyPI JSON API and upstream `LICENSE` files listed in the IP chain Appendix D (retrieved 2026-10-30).
- GitHub repository metadata — `https://api.github.com/repos/manuelxose/open-marine` (retrieved 2026-10-30).
- Repository evidence: `README.md`, `docs/CHARTS.md`, `docs/marine-data-sources.md`, `signalk-runtime/docker-compose.yml`, `marine-tile-server/Dockerfile`, `scripts/init.sh`, `marine-sensor-gateway/rpi/**/setup*.sh`, `marine-autopilot-engine/pico2/install.sh`, `.github/workflows/ci.yml`, chart engine provider services.
