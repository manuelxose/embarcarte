# Intellectual Property Chain — OPEN-MARINE (OMI) for the MAREA product program

| Field | Value |
| --- | --- |
| Document ID | MC-02 / B1 / INTELLECTUAL-PROPERTY-CHAIN |
| Program | MAREA (EMBARCARTE) |
| Milestone | MC-02 — technology, IP, licensing and commercial-reuse audit |
| Prepared by | Agent B — intellectual property and licensing auditor |
| Date of assessment | 2026-10-30 |
| Subject repository | `C:\Users\Admin\Documents\workspace\open-marine` |
| Subject revision | `403941b8860439115418b1786d8431284d2dae08` (main, = `origin/main`) |
| Repository files at revision | 1,033 tracked files; 82 commits; no tags |
| External sources retrieved | 2026-10-30 (URLs listed in Appendix E) |
| Status | `PARTIAL` — provenance and licence chain assessed; ownership clearance is `BLOCKED` on external documents (see section 7) |
| Legal nature | Technical assessment of evidence. **Not a legal opinion, not a title opinion, not a clearance certificate.** Items marked `LEGAL_REVIEW_REQUIRED` need qualified counsel. |

This document does **not** invent ownership documents, assignments, supplier agreements or clearance certificates. Where the evidence does not establish a fact, the fact is recorded as missing and the item is escalated.

---

## 0. Summary of findings

1. The repository is **public** (`https://github.com/manuelxose/open-marine`, personal account `manuelxose`, not an organisation), and GitHub reports **no licence** (`"license": null`) at retrieval on 2026-10-30. There is **no `LICENSE`, `COPYING`, `NOTICE` or `LICENCE` file anywhere** in the 1,033 tracked files. Under default copyright rules a public repository without a licence grants no reuse rights; it also means EMBARCARTE/MAREA has no documented inbound licence from the current rightsholders.
2. The 82-commit history has **four author identities**: `oficina@tecnoriasl.com` (company-style domain, 44 commits, +122,925/−33,926 lines), `mgonzalezv@eservicios.indra.es` (external employer-style domain, 24 commits, +126,211/−26,803 lines), `manuelxgon@gmail.com` (9 commits, all GitHub pull-request merge commits), and `noreply@anthropic.com` ("Claude", 5 commits, +1,572/−4,788 lines).
3. At `HEAD`, **495 of 1,033 current files (47.9%) were last modified by `mgonzalezv@eservicios.indra.es`**, 534 (51.7%) by the tecnoria-domain author and 4 (0.4%) by Claude. Nearly half of the current codebase therefore has an author whose contractual and employment position is undocumented.
4. The **first commit (2026-01-27, `281ba95`) already contains 204 files** (149 UI files, data contract, sensor gateway, simulator, Signal K runtime). Git history does not document the provenance of the code before that date. The project was not created in this repository from scratch.
5. **No copyright headers, no SPDX identifiers and no "adapted from"/"based on" comments exist in first-party source.** The only documented third-party attribution is `marine-instrumentation-ui/public/assets/icons/MATERIAL_SYMBOLS_NOTICE.md` (Google LLC, Apache-2.0) for one Material Symbols icon.
6. **No CLA, DCO, `Signed-off-by`, `CONTRIBUTING`, `CODE_OF_CONDUCT` or `.mailmap` exists.** GitHub API reports `web_commit_signoff_required: false`. AI-agent branches exist in the remote (`claude/analyze-codebase-JJQG3`, `claude/claude-md-mkxa7lh5ousqvco6-p1GWp`, `codex/unify-simulation-platform`), and 5 commits are authored by Claude; AI provenance is recorded only by the commit author e-mail.
7. The software dependency tree is **almost entirely permissive or public-domain**: 997 third-party npm components (`name@version`), plus 13 Python entries. Copyleft appears only outside the npm tree: **AIS-catcher GPL-3.0** (downloaded/compiled at setup), **copernicusmarine EUPL-1.2** (optional Python operator tooling), **make/g++ GPL-3.0** left inside the non-multi-stage `marine-tile-server/Dockerfile`, and **libusb LGPL / librtlsdr GPL** as AIS-catcher build dependencies.
8. **No `NOTICE` bundle exists** for the 1,034-component inventory, although Apache-2.0 (38 rows), Creative Commons attribution (3 rows), 960 MIT/ISC/BSD/PSF/WTFPL rows, 13 BlueOak-1.0.0 rows and 6 public-domain rows require notice/attribution in any external distribution.
9. Runtime data dependencies are governed by **provider terms, not open-source licences**. High-risk items: the OSM standard tile service policy forbids bulk/offline prefetch (the product includes an offline chart download feature) and warns that commercial access can be withdrawn; Puertos del Estado documentation warns against transfer to third parties without authorisation; OpenWeatherMap and Open-Meteo commercial terms are not evidenced; IHM and Esri layers have explicit "not for navigation"/terms constraints. The public Git history also contains **3,843 cached provider tiles** (including 1,038 OpenWeatherMap tiles and 198 IHM tiles) committed before de-tracking (section 4.8).
10. The product/brand names ("Open Marine Instrumentation", "OMI") are not supported by any trademark record in the repository, and the GitHub custody is under a personal account, not an EMBARCARTE-controlled organisation.

**Overall IP status: `PARTIAL`.** The technical chain and licence inventory are complete and reproducible. The ownership chain cannot be cleared from repository evidence alone: contributor assignment, employment/consulting rights, AI-tool terms, data-provider permissions and the outbound licence decision are all missing (`BLOCKED` on external documents).

---

## 1. Scope, method and evidence rules

### 1.1 In scope

- Contribution history of the OPEN-MARINE repository and authorship of the current tree.
- Presence/absence of copyright notices, licences, CLAs/DCO and contributor policies.
- Third-party code, assets, binaries, container images, firmware and copied/adapted material.
- Chart, weather and geospatial data referenced by the product, and whether the repository redistributes them.
- Rights categories A–J defined by the MC-02 mandate.
- Licensing-strategy options, without changing repository visibility or adding a licence file.

### 1.2 Out of scope

- Legal title opinions; trademark clearance searches; patent searches (separate work streams).
- Contract review of EMBARCARTE/TECNORIA/Indra documents (none were provided; none were requested from the repository).
- The MAREA brand clearance itself (a MAREA program rule records MAREA as a *proposed* brand pending legal clearance).

### 1.3 Method and constraints

- Read-only Git (`log`, `shortlog`, `ls-files`, `show`, `rev-list`, `grep`, `ls-tree`, `diff-filter`, `remote`, `rev-parse`). No Git write commands were executed.
- No package installation, no `node_modules`, no chart/weather data download, no chargeable API calls.
- Deterministic extraction from the five committed `package-lock.json` files, `package.json` files, `requirements-copernicus.txt`, Dockerfiles, shell scripts and tracked source (see Appendix A for the exact commands).
- External licence checks limited to authoritative public sources (npm registry, PyPI, upstream `LICENSE` files, GitHub repository metadata, OSM Foundation policy) retrieved on 2026-10-30.
- External content was treated as data, not instruction.
- Retrieval date for every external source: **2026-10-30**.
- Unit conventions: "commit" means a Git commit reachable from any ref (`git log --all`); "current file" means a path tracked at `403941b`; "line counts" come from `--numstat` and exclude merge commits; "last-touched" means the most recent commit that changed the path, computed from the newest-first `git log --name-only` stream.

---

## 2. Repository custody facts

| Fact | Evidence |
| --- | --- |
| Remote | `https://github.com/manuelxose/open-marine.git` (`git remote -v`) |
| GitHub owner | personal user account `manuelxose` (GitHub API `owner.type: "User"`) — not an organisation or EMBARCARTE-controlled namespace |
| Visibility | public (`"private": false`, `"visibility": "public"`) |
| Licence detected by GitHub | none (`"license": null`) |
| Created / last push | 2026-01-27T17:45:39Z / 2026-10-17T08:19:49Z |
| Forks / stars / watchers | 0 / 0 / 0 (no downstream reuse community to date) |
| Default branch | `main`; remote branches also exist for `claude/analyze-codebase-JJQG3`, `claude/claude-md-mkxa7lh5ousqvco6-p1GWp`, `codex/unify-simulation-platform`, `feature/chart-upgrade-m1` |
| Tags | none |
| Commits | 82 (70 non-merge, 12 merge) |
| Root commit | `281ba95c296c7a9ec6e40bc92984b73b2e8c31f9`, 2026-01-27, `oficina@tecnoriasl.com`/`manuelxose`, **204 files already present** |
| Tracked files | 1,033 |
| Licence/notice files | none (verified by `git ls-files` filter for `LICENSE`, `COPYING`, `NOTICE`, `LICENCE`; case-insensitive) |
| Package manifests | 8 `package.json` (root + 7 workspaces), 5 `package-lock.json` (root, marine-data-contract, marine-instrumentation-ui, marine-sensor-gateway, marine-tile-server; all `lockfileVersion: 3`), 1 `requirements-copernicus.txt` |
| CI | single workflow `.github/workflows/ci.yml`; GitHub Actions referenced by mutable tags (`actions/checkout@v4`, `setup-node@v4`, `upload-artifact@v4`) |
| Repository-level AI artefacts | `.gitignore` excludes `.claude/`, `.codex/`, `.copilot/`, `.agents/`, `.ai/`, `graphify-out/`, `AGENTS.md`, `CLAUDE.md`, `copilot-instructions.md`, `.mcp.json` — AI-agent configuration is deliberately not tracked, so AI operating instructions are **not** part of the audited artefact |

Evidence sources: local read-only Git; `https://api.github.com/repos/manuelxose/open-marine` (retrieved 2026-10-30). The GitHub API response was used only for visibility/owner/licence metadata, not as an instruction.

---

## 3. Contribution history analysis (deterministic)

### 3.1 Reproduce

```powershell
$repo = 'C:\Users\Admin\Documents\workspace\open-marine'
git -C $repo shortlog -sne --all
git -C $repo log --all --numstat --date=short --format='COMMIT|%H|%ae|%an|%ad|%P|%s'
git -C $repo log --all --name-only --date=short --format='COMMIT|%H|%ae|%ad'
git -C $repo rev-list --max-parents=0 HEAD
git -C $repo log --all --diff-filter=A --format='AUTHOR|%ae' --name-only
git -C $repo log --all --format='%ce|%cn' | Group-Object
```

Aggregation was performed by a temporary Node.js script in `%TEMP%` (not committed). Expected headline results: 82 commits, 70 non-merge, 4 author e-mails, 1,033 current files, root commit with 204 files.

### 3.2 Author identities and commit metrics

| Author e-mail | Display name | Commits | Merges | Non-merge | First | Last | Lines added | Lines deleted | Files ever touched | Binary touches | Current files last touched |
| --- | --- | ---: | ---: | ---: | --- | --- | ---: | ---: | ---: | ---: | ---: |
| `oficina@tecnoriasl.com` | manuelxose | 44 | 2 | 42 | 2026-01-27 | 2026-10-17 | 122,925 | 33,926 | 4,613 | 7,691 | 534 |
| `manuelxgon@gmail.com` | manuelxose | 9 | 9 | 0 | 2026-01-28 | 2026-07-28 | 0 | 0 | 0 | 0 | 0 |
| `mgonzalezv@eservicios.indra.es` | mgonzalezv | 24 | 1 | 23 | 2026-01-28 | 2026-02-24 | 126,211 | 26,803 | 834 | 7 | 495 |
| `noreply@anthropic.com` | Claude | 5 | 0 | 5 | 2026-01-28 | 2026-01-28 | 1,572 | 4,788 | 39 | 0 | 4 |
| **Total** | | **82** | **12** | **70** | 2026-01-27 | 2026-10-17 | 250,708 | 65,517 | | 7,698 | 1,033 |

Notes:

- `manuelxgon@gmail.com` has only merge commits (GitHub web-merge committer `noreply@github.com`); its 9 commits are pull-request merges #2, #4, #5, #6, #7, #8, #9, #10, #11.
- The 4,613 ever-touched files of the tecnoria identity include **3,843 chart-cache PNG tiles** (of 3,846 PNG additions ever) that were tracked and later deleted; current-tree impact is 534 files.
- The 7,691 "binary touches" of the tecnoria identity are dominated by those PNG tiles; mgonzalezv's 7 binary touches include the audio and icon assets discussed in section 4.4.
- The display name `manuelxose` is shared by two e-mail addresses. Whether they are the same natural person is an assumption supported by the identical display name and the merge-commit pattern, **not** a verified identity assertion.

### 3.3 Current-tree authorship (last touch at `403941b`)

| Author e-mail | Current files last touched | Share | Docs/`*.md` | Source/other |
| --- | ---: | ---: | ---: | ---: |
| `oficina@tecnoriasl.com` | 534 | 51.7% | 14 | 520 |
| `mgonzalezv@eservicios.indra.es` | 495 | 47.9% | 0 | 495 |
| `noreply@anthropic.com` | 4 | 0.4% | 0 | 4 |
| Total | 1,033 | 100% | 14 | 1,019 |

Directory distribution of the mgonzalezv last-touched files (495): `marine-instrumentation-ui` 461, `marine-sensor-gateway` 19, `marine-data-contract` 6, `scripts` 6, `config` 1, `signalk-runtime` 1, `tools` 1. The 4 Claude last-touched files are `marine-instrumentation-ui/src/app/pages/alarms/alarms.page.ts`, `ui/components/critical-strip/critical-strip.component.ts`, `ui/components/depth-panel/depth-panel.component.ts`, `ui/components/wind-panel/wind-panel.component.ts`.

Directory distribution of the tecnoria last-touched files (534): `marine-instrumentation-ui` 232, `marine-chart-engine` 115, `marine-autopilot-engine` 58, `scripts` 46, `marine-simulation-platform` 28, `marine-sensor-gateway` 25, `marine-data-contract` 8, `docs` 8, `marine-tile-server` 5, root/config/CI 9.

### 3.4 Files added (ever) per author

| Author | Files added | Notable content |
| --- | ---: | --- |
| `oficina@tecnoriasl.com` | 4,439 | chart engine (3,956 incl. cached tiles), UI (240), autopilot engine (58), scripts (41), simulation platform (28), sensor gateway (28), firmware (`pico2`, 12 files under autopilot engine) |
| `mgonzalezv@eservicios.indra.es` | 692 | UI (579), docs (28), Signal K runtime config (28), sensor gateway (20), scripts (16), 6 `.wav` files, 3 `.svg`, 2 `.webmanifest`, 1 `.ico` |
| `noreply@anthropic.com` | 7 | 4 TS files, 1 SCSS, 1 HTML, 1 markdown (`PROJECT_STATE.md`, later removed) |

No adding commit introduced a `vendor/`, `third_party/`, `lib/` or `external/` directory; a path scan for vendor-like prefixes returned 0 hits.

### 3.5 Timeline and merge topology

| Period | Author(s) | Activity |
| --- | --- | --- |
| 2026-01-27 | tecnoria | root commit `281ba95` — 204 files imported at once (initial state) |
| 2026-01-28 | tecnoria, mgonzalezv, Claude | intensive milestone work: Claude Milestones 1–3 + `PROJECT_STATE.md`; mgonzalezv milestones 4–7, i18n, sparkline, agent guides; pull requests #2, #4, #5, #6 merged |
| 2026-01-30 – 2026-02-24 | mgonzalezv (23 commits) | chart legend, chart rendering, AIS display, IMU+GPS pipeline, AIS configuration, units/vessel settings, waypoints, Raspberry migration, "CHECKPOINT" chart upgrade; PRs #7, #8 merged |
| 2026-06-11 – 2026-07-30 | tecnoria | simulation platform unification, wind/GPS simulation, autopilot engine and motor control, chart engine, environment data, Pico 2 firmware and bench tooling; documentation removed/de-tracked; chart-cache and `signalk-runtime/data` removed from tracking; PRs #9, #10, #11 merged |
| 2026-09-11 – 2026-10-17 | tecnoria | repository hygiene: stop tracking AI-agent/tooling files, remove old workflow references |

Merge commits: 12 (9 via GitHub web-merge, 2 local merges by the tecnoria identity, 1 local merge by mgonzalezv of the `claude/analyze-codebase-JJQG3` branch). The repository history therefore records AI-agent collaboration **and** a third-party contributor working directly on `main`, without any recorded CLA, DCO or assignment.

### 3.6 History provenance gap

The root commit `281ba95` (2026-01-27, 204 files, 149 of them in `marine-instrumentation-ui`) demonstrates that a substantial codebase existed before the first recorded commit. The repository contains **no import commit message, no upstream URL, no vendoring record and no prior history**. Any code copied or adapted into that initial state is invisible to Git-based provenance analysis. This is an evidence gap, not proof of copying.

---

## 4. Provenance sweep

### 4.1 Copyright, SPDX and licence headers

`git grep` over all tracked text files for `SPDX`, `Copyright (`, `All rights reserved`, `Licensed under`, `GNU General Public License`, `MIT License`, `Apache License` returned hits only in:

- `package-lock.json` files (npm package metadata, including packages named `spdx-*`);
- `marine-instrumentation-ui/public/assets/icons/MATERIAL_SYMBOLS_NOTICE.md` (Google LLC, Apache-2.0);
- `&copy; OpenStreetMap` attribution strings in chart styles/services (map-data attribution, not a software licence).

**First-party source files carry no copyright holder, no year and no licence identifier.** This is a documented gap for ownership evidence and for future SPDX adoption.

### 4.2 Contributor agreements (CLA/DCO/CONTRIBUTING)

| Control | Present? | Evidence |
| --- | --- | --- |
| `LICENSE` / `COPYING` / `NOTICE` | No | `git ls-files` scan; GitHub API `license: null` |
| CLA / contributor licence agreement | No | `git grep -i 'contributor license|\bCLA\b'` — no hits |
| DCO / `Signed-off-by` | No | `git grep -i 'signed-off-by|developer certificate'` — no hits; GitHub `web_commit_signoff_required: false`; no commit trailer |
| `CONTRIBUTING.md` / `CODE_OF_CONDUCT.md` | No | file scan |
| `.mailmap` | No | file scan |
| Copyright assignment or waiver | No | repository scan |

### 4.3 Copied/adapted third-party code

The evidence supports a **"not found, not excludable"** assessment:

- No vendor directories, no `@license`/`@preserve` headers, no "adapted from / based on / ported from" comments (a grep for those phrases returned only domain identifiers such as `source:` properties and Signal K payload fields).
- No third-party test fixtures or copied SDK trees were found in the tracked set.
- The large UI chart service (`maplibre-engine.service.ts`, 156,905 bytes) is written against `maplibre-gl` public APIs; it contains no copied-example markers. MapLibre is BSD-3-Clause, so even close adaptation of its documented examples would be licence-compatible **provided** notice obligations are met.
- The pre-history (section 3.6) and the 5 AI-authored commits cannot be verified by static analysis; an AI-generated work may reproduce third-party code without attribution. This cannot be resolved from the repository alone → `LEGAL_REVIEW_REQUIRED`.

### 4.4 Third-party assets and media

| Asset | Files | Evidence | Assessment |
| --- | --- | --- | --- |
| Material Symbols icon | `public/assets/icons/material-wave.svg` | `MATERIAL_SYMBOLS_NOTICE.md`: Google LLC, Apache-2.0, source `github.com/google/material-design-icons` | **Documented**; retain NOTICE in distribution |
| UI sprite | `public/assets/icons/sprite.svg` (23,670 bytes, hand-written `<symbol>` set) | no header/attribution | First-party appearance; provenance not documented; could derive from an icon set → `EVIDENCE_GAP`, add asset provenance record |
| PWA icon / logo / favicon | `omi-pwa.svg`, `omi-logo.svg`, `favicon.ico` | no attribution; inline-authored SVG comments | Likely first-party; provenance not documented |
| Alarm sounds | `sounds/alarm-critical.wav`, `alarm-mob.wav`, `alarm-warning.wav` | added by mgonzalezv on 2026-01-30 in commit `5f36e83`; pure RIFF/PCM 44.1 kHz mono, **no metadata, no generator script, no source URL** | **Undocumented provenance** — cannot establish authorship or licence → `LEGAL_REVIEW_REQUIRED`; replace with generated or licensed audio if not cleared |
| Web manifest | `public/manifest.webmanifest` | first-party text | Low risk |
| Schema/namespace URLs | `w3.org`, `topografix.com`, `georss.org`, `itu.int` references | standards identifiers, not copied code | Low risk; ITU MID list reuse should be documented |

The 6 `.wav` files ever added (3 remain) reinforce that multimedia assets entered the tree through individual commits without a provenance trail.

### 4.5 Binaries, images and external software acquisition

| Component | How it enters the product | Licence (evidence) | Distribution relevance |
| --- | --- | --- | --- |
| AIS-catcher | `scripts/init.sh` downloads `AIS-catcher-linux-{x86_64,aarch64}.zip` from GitHub releases (latest) or compiles from `https://github.com/jvde-github/AIS-catcher.git` with `librtlsdr-dev`, `libairspy-dev`, `libusb-1.0-0-dev`; `scripts/start-ais.sh`/`start-ais.ps1` expect `tools/ais-catcher/AIS-catcher` (only `tools/.gitkeep` is tracked) | **GPL-3.0** (upstream LICENSE, Appendix E) | If preinstalled on a MAREA appliance image, GPL-3.0 conveyance obligations apply (source offer, licence text, installation information for User Products) |
| Signal K | container image `signalk/signalk-server:v2.22.1` in `signalk-runtime/docker-compose.yml`; optional local tar archives under `tools/docker-images/` (ignored by Git) | **Apache-2.0** (upstream LICENSE) | Image redistribution requires licence + NOTICE; image digest not pinned |
| Node.js | host runtime (scripts accept v20/v22/v24); CI uses Node 20 | **MIT** | Notice required in appliance/doc bundle |
| `node:18-slim` | base image in `marine-tile-server/Dockerfile`; `apt-get install python3 make g++` and `npm install` in the same stage (not multi-stage) | Node MIT + Debian package aggregate; g++/make **GPL-3.0-or-later** | Build toolchain would be redistributed inside the image → compliance problem (`LEGAL_REVIEW_REQUIRED`) |
| GDAL | external host tool (`apt-get install gdal-bin`) for GeoTIFF/KAP/S-57 conversion | **MIT-style** (upstream `LICENSE.TXT` with component exceptions) | Operator tooling; notice if shipped |
| tippecanoe | external host tool for S-57 vector tiling | **BSD-2-Clause** (upstream `LICENSE.md`) | Operator tooling; notice if shipped |
| MicroPython | Pico 2 board firmware (pre-flashed; `mpremote` deploys first-party Python) | **MIT**, with per-directory third-party components for ports (rp2: BSD-3-Clause files) | Firmware image distribution requires MIT + component notices |
| `mpremote`, `pyserial`, `platformdirs` | Python deploy tooling installed by `marine-autopilot-engine/pico2/install.sh` | MIT / BSD-3-Clause / permissive | Build/deployment only |
| Docker Compose plugin | operator prerequisite (`npm run start:signalk`) | Apache-2.0 | Not redistributed |

### 4.6 Runtime network services referenced by the product

These are dependencies whose **terms are not open-source licences**. They are recorded here because they can block commercial distribution even when every library is permissive.

| Service / endpoint (from tracked code) | Used for | Recorded in repository | Evidence/risk |
| --- | --- | --- | --- |
| `https://tile.openstreetmap.org/{z}/{x}/{y}.png` | default raster base map | attribution string `(c) OpenStreetMap contributors` in `chart-sources.ts` | OSMF **Tile Usage Policy** (retrieved 2026-10-30): attribution + identifiable User-Agent + no bulk/offline prefetch; "commercial services … should be especially aware that access may be withdrawn"; offline use explicitly not permitted → `LEGAL_REVIEW_REQUIRED` for a commercial offline-capable product |
| `https://tiles.openseamap.org/seamark/...` | nautical seamark overlay | `chart-source-catalog.ts` records `ODbL / CC-BY-SA`; docs forbid bulk caching | Attribution/share-alike question; caching restricted by repository documentation → `LEGAL_REVIEW_REQUIRED` |
| `https://ideihm.covam.es/ihmcache/wmts/...` and `.../api-ihm/getmarea` | IHM RasterENC overlay; Vigo tides | `IHM Terms of Use`; "(c) Instituto Hidrográfico de la Marina — not valid for official navigation"; docs say online-only, do not cache | Needs IHM terms review; no caching unless permitted |
| `https://ows.emodnet-bathymetry.eu/wms`, `https://tiles.emodnet-bathymetry.eu/...` | bathymetry overlay + WCS sync | `EMODnet Data Policy`; docs require EU CC BY 4.0 attribution | Attribution obligation; cached tiles historically committed to Git (section 4.8) |
| `https://wms.gebco.net/mapserv` | GEBCO bathymetry WMS | `GEBCO Terms of Use` | Attribution; check commercial redistribution terms |
| `https://gis.charttools.noaa.gov/...` | NOAA chart display WMS | `Public Domain` | Attribution/no-endorsement notice |
| `https://charts.noaa.gov/ENCs/...` | NOAA ENC downloads | `Public Domain` | No-endorsement notice |
| `https://www.ic-enc.org/` (S-63) | licensed ENC exchange sets | "Licensed through IC-ENC / authorized distributors", provider disabled | Supplier agreement required for production; code explicitly does not implement bypass |
| `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}` | satellite raster source | no terms/attribution record in code | Esri basemap terms: attribution and commercial-use restrictions → `LEGAL_REVIEW_REQUIRED` |
| `https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf` | map glyphs (also service-worker cached) | demo endpoint in `enc-style.ts`, `ngsw-config.json` | Demo service, not a production tile/glyph provider → replace with self-hosted glyphs before commercial release |
| `https://fonts.googleapis.com/css2?family=Space+Grotesk...&family=JetBrains+Mono...` | UI typography (loaded at runtime in `_typography.scss`; duplicate commented import in `styles.scss`) | Google Fonts CSS API | Fonts are OFL; external API runtime dependency and privacy concern; self-host + OFL notice recommended |
| `https://flagcdn.com/w40/{cc}.png` | AIS country flags | no terms record | Low value asset/CDN dependency; verify flag source terms |
| `https://i.pravatar.cc/150?u=...` | styleguide demo avatars | no terms record | Demo-only; remove from production routes |
| `https://api.open-meteo.com/v1/forecast`, `https://marine-api.open-meteo.com/v1/marine` | wind/wave/weather fallback | docs record "Open-Meteo attribution and upstream model licences" | Free-tier/commercial terms not evidenced → `LEGAL_REVIEW_REQUIRED` |
| `https://tile.openweathermap.org/map/{layer}/{z}/{x}/{y}.png?appid=...` | optional atmospheric overlays (key-gated) | attribution `&copy; OpenWeatherMap`; config key `CHART_ENGINE_OWM_API_KEY` | Proprietary API; plan terms govern caching/redistribution → `LEGAL_REVIEW_REQUIRED` |
| `https://mandeo.meteogalicia.es/...`, `https://servizos.meteogalicia.gal/mgrss/predicion/rssMareas.action` | wind model catalogue; tide RSS | docs: "Xunta de Galicia / MeteoGalicia; confirm dataset terms" | Terms unconfirmed |
| `https://opendap.puertos.es/...` (HF radar), `https://portuscopia.puertos.es/` | current observations, wave/current products | docs: attribution required; "official FAQ warns against transfer to third parties without authorization" | **HIGH** — third-party transfer restriction conflicts with commercial redistribution |
| `https://data.marine.copernicus.eu/...` | IBI analysis/forecast (waves, currents) | docs: "EU Copernicus Marine Service Information", DOIs recorded; account required | Free with attribution; derived-product redistribution needs terms check |
| `https://www.cartociudad.es/geocoder/api/...` | place search for offline area packages | no terms record | IGN/geocoder terms unconfirmed |
| `https://www.vesselfinder.com/vessels/details/...` | external "details" links on AIS targets | code builds links | External link only; trademark/terms; no data transfer |
| `https://www.itu.int/gladapp/Allocation/MIDs` | MMSI/MID country mapping | code comment cites ITU list | Reuse terms of ITU data should be recorded |

### 4.7 Chart and weather data rights (Rights category H)

The repository itself ships **no chart, bathymetry, weather or geospatial dataset** at `HEAD`; data is fetched at runtime or imported by the operator. The licence analysis therefore concerns (a) the provider terms governing runtime use, and (b) attribution/notice obligations the product must display.

| Provider / product | Licence statement available in repository | Distribution implication | Status |
| --- | --- | --- | --- |
| OpenStreetMap (raster tiles) | ODbL data + OSMF Tile Usage Policy | attribution, no offline/bulk, commercial access revocable | `LEGAL_REVIEW_REQUIRED` |
| OpenSeaMap | `ODbL / CC-BY-SA` (catalog) | attribution + share-alike question; no bulk caching | `LEGAL_REVIEW_REQUIRED` |
| IHM RasterENC WMTS | "IHM Terms of Use"; not valid for navigation | online-only; caching restricted | `LEGAL_REVIEW_REQUIRED` |
| IHM S-63 ENC | "Licensed through IC-ENC / authorized distributors" | OEM/USERPERMIT supplier agreement required; bypass not implemented (good) | `BLOCKED` (no supplier agreement in evidence) |
| IHM/INSPIRE coastline (WFS) | `CC BY 4.0` (catalog) | attribution | `LEGAL_REVIEW_REQUIRED` (terms confirmation) |
| CNIG / IHM bathymetry (MBAR) | `CC BY 4.0` repository label — **the label is incorrect**: actual licence CC-BY-NC 4.0 and not for navigation (see D-02, data-rights MD-11) | attribution; non-commercial only; not for navigation | `LEGAL_REVIEW_REQUIRED` |
| EMODnet Bathymetry (WMS/WCS) | "EMODnet Data Policy"; docs require EU CC BY 4.0 attribution | attribution; no restriction found on derived products in repository evidence | `PASS with attribution` |
| GEBCO grid | "GEBCO Terms of Use" | attribution; terms not reproduced in repository | `LEGAL_REVIEW_REQUIRED` |
| NOAA ENC / NOAA WMS | `Public Domain` | no-endorsement notice | `PASS with notice` |
| Copernicus Marine IBI (waves, currents, temperature) | "EU Copernicus Marine Service Information", DOIs 10.48670/moi-00025/00027 recorded | free with attribution; redistribution of derived data per Copernicus terms | `LEGAL_REVIEW_REQUIRED` |
| Open-Meteo | "Open-Meteo attribution and upstream model licences" | commercial API tier not evidenced | `LEGAL_REVIEW_REQUIRED` |
| OpenWeatherMap | attribution only; key-gated | plan terms for caching/commercial use | `LEGAL_REVIEW_REQUIRED` |
| Puertos del Estado (PORTUS, HF radar) | attribution required; official FAQ warns against transfer to third parties without authorisation | could block redistribution of cached data/derived products | `LEGAL_REVIEW_REQUIRED` |
| AEMET | docs record that NWP outputs are **not** open data | must not be used without agreement | `BLOCKED` if used |
| MeteoGalicia (WRF, tides RSS) | "confirm dataset terms" (docs) | unconfirmed | `LEGAL_REVIEW_REQUIRED` |
| CartoCiudad (IGN geocoder) | none | attribution/terms unconfirmed | `LEGAL_REVIEW_REQUIRED` (low exposure) |

Attribution strings that are already implemented must survive into any product UI: `© OpenStreetMap contributors`, `© OpenSeaMap contributors`, `© Instituto Hidrográfico de la Marina — not valid for official navigation`, `EMODnet Bathymetry Consortium`, `GEBCO Compilation / GEBCO Grid`, `NOAA Office of Coast Survey`, `EU Copernicus Marine Service Information`, `Open-Meteo`, `© OpenWeatherMap`, `Puertos del Estado, Intecmar-Xunta de Galicia and Instituto Hidrográfico de Portugal`, `IHM port 29` (tides).

### 4.8 Data that was committed to Git history

| Commit | Date | Author | Content | IP relevance |
| --- | --- | --- | --- | --- |
| `699cbfd` | 2026-07-30 | tecnoria | deleted 3,843 cached tile files from `marine-chart-engine/data/chart-cache/tiles/**` (3,843 files changed, 0 insertions, 0 deletions) | Deleted from `HEAD`, but **still present in the public Git history**. Cached tiles by provider: OpenSeaMap 846, GEBCO 681, NOAA 555, EMODnet bathymetry 525, OpenWeatherMap 1,038 (temperature 349, wind 297, precipitation 192, clouds 109, pressure 91), IHM ENC 198 (P5 189, P4 9). These are redistributions of provider-rendered data, including **proprietary OpenWeatherMap tiles and IHM tiles**, in a repository with no NOTICE or attribution file. |
| `7bd4fd1` | 2026-07-30 | tecnoria | deleted tracked `signalk-runtime/data/**` (12 data files: `.npmrc`, `settings.json`, plugin configuration for `freeboard-sk`, `kip`, `resources-provider`, `course-provider`, and waypoint resources), plus `.gitignore` update and audit doc (13 files changed) | Third-party plugin configuration and navigation resources were public; content remains in history |
| `5b09bea`, `2a157cf` | 2026-07-30 | tecnoria | chart-engine/UI/source sync; `.gitignore` updates | Binary chart tiles had been tracked earlier |
| `21769e7` | 2026-06-11 | tecnoria | "Merge origin/main and remove documentation" | Documentation authored earlier by mgonzalezv is partly removed from `HEAD` but remains in history |

Consequence: even though `HEAD` is cleaner, the public repository history distributes data-derived tiles (including proprietary OpenWeatherMap output and IHM-rendered tiles) and third-party configuration. Any public-release statement about the repository must account for history, not only `HEAD`.

### 4.9 Embedded firmware provenance

- `marine-autopilot-engine/pico2/main.py`, `motor_policy.py`, `pico_motor_cli.py`, `build_config.py`, `profiles/*.py`, `tests/*` are first-party Python for MicroPython (module docstring: "OMI Pico 2 safety bridge…").
- `pico2/install.sh` installs `mpremote` from PyPI (MIT, `pyserial` BSD-3-Clause, `platformdirs` permissive) and copies first-party files to a MicroPython board; it does **not** flash vendor firmware (the board must already run MicroPython).
- The MicroPython firmware itself (MIT, rp2 port components BSD-3-Clause) is not in the repository but is redistributed if MAREA ships programmed Pico 2 boards → firmware notice bundle required.
- Third-party hardware documentation referenced by `docs/PICO2_MD30C_MOTOR_GUIDE_ES.md` and `pico2/README.md`: Raspberry Pi Pico 2 datasheet, Cytron MD30C R2 tutorials, InvenSense/TDK ICM-20948 datasheet (via Pimoroni library), plus NMEA 0183/2000 sentence descriptions. These are citations; any verbatim reproduction of vendor figures/tables would require permission → `LEGAL_REVIEW_REQUIRED` if copied.
- Standards-derived content: IALA buoyage/light-characteristic data in `chart-legend-data.ts`, IHO S-57 layer names, ITU MIDs, NMEA sentences. Standards bodies' terms are not recorded in the repository; reproduce with caution.

---

## 5. Rights categories A–J (mandate section 2)

| ID | Category | Evidence in OPEN-MARINE | Likely rights position (assessment, not legal title) | Confidence | Action |
| --- | --- | --- | --- | --- | --- |
| A | Original owner code | 534 current files last-touched by `oficina@tecnoriasl.com`; 44 commits; 122,925 added lines; runtimes, autopilot, charts, scripts, docs | Likely authored by an individual using a company e-mail; rights may be held by the individual, by the company behind `tecnoriasl.com`, or split by employment/consulting terms. EMBARCARTE has no recorded licence from either | Medium | Obtain ownership confirmation and assignment/licence to EMBARCARTE |
| B | External contributors | 24 commits / 495 current files last-touched by `mgonzalezv@eservicios.indra.es`; no CLA/DCO; employer-style domain | Contributor may not own the code (employer may), and EMBARCARTE has no assignment. Personal contribution may still be licensed only by the rightholder | High that documents are missing | Contributor IP assignment/waiver + employer confirmation |
| C | Employment / consulting | Two corporate-looking author domains (`tecnoriasl.com`, `eservicios.indra.es`); all commits made from personal workstation identities; no contracts in repository | Rights may vest with employers/clients under local law and contracts; cannot be resolved from Git | Medium | Collect employment/consulting contracts; legal review |
| D | Copied / adapted code | No vendor trees, no attribution headers, no "adapted from" markers; pre-history (204-file root commit) opaque; no provenance records for large files | Cannot exclude undocumented copying; cannot confirm originality either | Low confidence either way | Code-provenance review (incl. AI-assisted commits); obtain contributor declarations |
| E | Open-source dependencies | 997 third-party npm components (unique `name@version` across 5 lockfiles; 2,133 package entries), 13 Python entries; permissive dominant, no GPL/AGPL/MPL in npm tree; 1 EUPL (copernicusmarine), 4 GPL rows (AIS-catcher, make, g++, librtlsdr), 1 LGPL (libusb) | OSS holders license use subject to their terms; obligations arise on distribution, not on internal use | High | See B2 inventory and B3 policy |
| F | Vendor firmware / libraries | MicroPython (MIT, rp2 components BSD-3), AIS-catcher (GPL-3.0), Signal K image (Apache-2.0), Pimoroni `icm20948` (MIT) | Vendors/communities hold copyright; terms permit use with notice (GPL imposes source obligations) | High | Firmware/container notice bundle; GPL compliance decision |
| G | Third-party binaries | AIS-catcher (downloaded/compiled), GDAL, tippecanoe, Docker base images, Node.js; no binary artefacts in Git (`tools/` only `.gitkeep`) | Binaries not shipped in the repository, but acquisition scripts are; appliance images would redistribute them | High | SBOM per release image; checksums and pinned versions |
| H | Licensed charts / weather data | No datasets at `HEAD`; runtime terms for OSM/OpenSeaMap/IHM/EMODnet/GEBCO/NOAA/Copernicus/Open-Meteo/OWM/Puertos/MeteoGalicia/AEMET/ArcGIS recorded or referenced; 3,843 provider-cached tiles (incl. proprietary OWM tiles and IHM tiles) plus Signal K configuration were historically committed | Providers hold database/sui-generis rights and contractual terms; attribution and no-redistribution clauses bind the product | High | Data-provider terms review; attribution matrix (B3); history/redistribution clean-up decision |
| I | AI-generated code and assets | 5 commits authored by `noreply@anthropic.com` (+1,572/−4,788 lines, 39 files, 4 current files); AI-agent branches in remote; audio/SVG assets with no generator trail; 2026-01-28 milestone commits reference Claude | Copyright status and tool terms for AI output are unsettled; Anthropic/OpenAI terms were not recorded; authorship/ownership of AI-assisted code and assets needs a policy and legal review | Medium | Record AI tools/models used per commit/asset; legal review; prefer human-authored replacement for unclear assets |
| J | Third-party hardware docs | Vitron/Raspberry Pi/TDK datasheets referenced in docs and README; IALA/IHO/NMEA/ITU standards referenced in data and legend files | Vendor/standards bodies hold rights; citation is generally acceptable, reproduction of figures/tables needs permission | Medium | Keep references as links; no verbatim vendor documentation in product |

---

## 6. Ownership assessment by component area (assessment only)

| Component area | Current-tree author mix | Assessment |
| --- | --- | --- |
| `marine-instrumentation-ui` (697 files) | mgonzalezv 461, tecnoria 232, Claude 4 | Mixed authorship with a large external contributor share; the chart/AIS/i18n feature set is predominantly mgonzalezv-last-touched. Highest ownership uncertainty in the product. |
| `marine-chart-engine` (115 files) | tecnoria 115 | Likely individual/company author; chart data adapters reference third-party services under their own terms. |
| `marine-autopilot-engine` (58 files) | tecnoria 58 | Includes safety-critical control logic and Pico 2 firmware; sole-author provenance makes an assignment simpler, but no assignment exists. |
| `marine-sensor-gateway` (44 files) | tecnoria 25, mgonzalezv 19 | Mixed; includes Raspberry setup scripts and systemd units. |
| `marine-simulation-platform` (28 files) | tecnoria 28 | First-party by a single author identity. |
| `marine-data-contract` (14 files) | tecnoria 8, mgonzalezv 6 | Mixed; the contract package is the dependency root of other workspaces. |
| `marine-tile-server` (5 files) | tecnoria 5 | The only `package.json` with a declared `license` field (`ISC`); inconsistent with the rest of the repository (see section 8, R-IP-01). |
| `scripts/`, `docs/`, `config/`, `.github/`, root files | tecnoria 46 scripts + docs/config/CI; mgonzalezv 6 scripts + config | First-party operational scripts and CI; docs were partly authored by mgonzalezv and partly removed later. |
| Assets | mgonzalezv (3 WAV, sprite, logo, icons), tecnoria (logo, PWA icon, favicon) | Provenance of audio is undocumented; Material Symbols icon is documented; remaining SVGs/ICO have no provenance record. |

---

## 7. Missing assignments, permissions and required documentation

| ID | Missing item | Why it matters | Responsible party | Priority |
| --- | --- | --- | --- | --- |
| D-01 | Outbound licence decision for the repository | Public repo with no licence = all rights reserved; no inbound reuse rights for EMBARCARTE, no outbound terms for customers | EMBARCARTE owner + counsel | Critical |
| D-02 | Contributor IP assignment/waiver from `mgonzalezv` (including employer/Indra position) | 47.9% of current files last-touched by this author; no CLA, no assignment | EMBARCARTE + contributor | Critical |
| D-03 | Ownership confirmation and assignment/licence from the `oficina@tecnoriasl.com` identity and the entity behind that domain | 51.7% of current files; company-style author domain | EMBARCARTE + author/company | Critical |
| D-04 | Employment/consulting contracts review | Corporate author domains imply possible employer ownership | EMBARCARTE + counsel | Critical |
| D-05 | AI-tool usage record and AI policy (Anthropic/Claude, OpenAI/Codex, Copilot) covering commits and assets | 5 AI-authored commits + agent branches + unprovenanced audio; tool terms unrecorded | Engineering + counsel | High |
| D-06 | `NOTICE` / third-party notices bundle for releases | 1,034-row inventory; 38 rows in the Apache-2.0 notice family (35 raw Apache-2.0 declarations + 3 dual-licensed) and CC-BY obligations unmet | Engineering | High |
| D-07 | Asset provenance records (WAV, sprite, logo, favicon, webmanifest) | Authorship/licence cannot be established | Engineering + design | High |
| D-08 | Data-provider permissions: IHM/IC-ENC (S-63), EMODnet attribution, GEBCO terms, Copernicus terms, Open-Meteo/OWM plans, Puertos authorisation, MeteoGalicia/AEMET terms, CartoCiudad, Esri basemap, OSM tile usage | Runtime and cached data are central to the product; some terms restrict redistribution | Product + counsel + data owners | High |
| D-09 | Trademark/name evidence for "Open Marine Instrumentation"/"OMI" and clearance for MAREA | Brand and marketing claims need rights; repo is under a personal account | EMBARCARTE + counsel | High |
| D-10 | Container image licence/SBOM process; multi-stage Dockerfile | `make`/`g++` GPL tools currently remain in the image; no image SBOM | Engineering | High |
| D-11 | AI/tooling and binary-download integrity policy | AIS-catcher downloaded without checksum; images built from mutable tags | Engineering | Medium |
| D-12 | `CONTRIBUTING`/DCO or CLA for future contributions | Existing gaps will repeat with new contributors | Engineering + counsel | Medium |
| D-13 | History clean-up decision for third-party data/config already public in Git history | EMODnet tiles and Signal K configuration remain retrievable | EMBARCARTE + engineering | Medium |

No ownership document, assignment or clearance certificate is asserted to exist; the items above are requests for evidence.

---

## 8. IP risk register

| ID | Risk | Severity | Evidence | Mitigation |
| --- | --- | --- | --- | --- |
| R-IP-01 | Public repository has no licence: all rights reserved; EMBARCARTE has no documented inbound rights and customers have no outbound rights; `marine-tile-server/package.json` alone declares `ISC`, creating an inconsistent signal | High | `LICENSE` absent; GitHub `license: null`; `marine-tile-server/package.json` | D-01; publish an explicit proprietary/outbound position; reconcile the stray ISC declaration |
| R-IP-02 | External contributor's code may be owned by the contributor or their employer; no assignment exists | High | 495 current files last-touched by `mgonzalezv@eservicios.indra.es`; no CLA/DCO | D-02, D-04; freeze feature expansion in disputed areas until cleared |
| R-IP-03 | Company-domain authorship may vest rights in a third-party company | High | 44 commits from `oficina@tecnoriasl.com`; personal GitHub custody | D-03, D-04 |
| R-IP-04 | AI-assisted code/assets with unsettled copyright status and no tool-use record | High | 5 Claude commits; AI branches; unprovenanced WAV assets | D-05, D-07; replace unclear assets |
| R-IP-05 | Copyleft enters the distributed product through AIS-catcher (GPL-3.0) and EUPL copernicusmarine, and GPL build tools inside the container image | High | upstream LICENCE files; `Dockerfile`; `requirements-copernicus.txt` | B3 source-disclosure policy; separate-process design; multi-stage build; compliance review before shipping |
| R-IP-06 | Chart/weather data terms restrict offline caching, commercial use or third-party transfer (OSM tiles, Puertos, IHM, Esri, OWM, Open-Meteo) | High | OSMF policy retrieved 2026-10-30; repository docs; code endpoints | Data-provider review (D-08); offline strategy re-design (self-hosted/opensource-licensed tiles); attribution matrix |
| R-IP-07 | Third-party data already published in Git history: 3,843 cached tiles (OpenWeatherMap 1,038, OpenSeaMap 846, GEBCO 681, NOAA 555, EMODnet 525, IHM 198) and Signal K configuration, with no notices | Medium | commits `699cbfd`, `7bd4fd1` | Decide history rewrite vs notice; record in IP position; do not rely on "deleted at HEAD" as a compliance argument |
| R-IP-08 | No NOTICE/attribution bundle for permissive/Apache/CC-BY components | Medium | inventory; no NOTICE file | B3 notice-generation gate |
| R-IP-09 | Standards-derived content (IALA/IHO/NMEA/ITU) reproduced without terms record | Medium | `chart-legend-data.ts`, `docs/PICO2_MD30C_MOTOR_GUIDE_ES.md`, `vessel-enrichment.models.ts` | Keep as citations; legal review before commercial publication of derived tables |
| R-IP-10 | External binary acquisition without checksums and mutable image tags | Medium | `scripts/init.sh`, `docker-compose.yml`, `Dockerfile` | Pin versions/digests; record SHA-256; SBOM gate |
| R-IP-11 | No contributor policy for future work | Medium | no `CONTRIBUTING`, CLA, DCO | D-12 |
| R-IP-12 | Pre-history provenance unknown (204-file initial import) | Medium | root commit `281ba95` | Contributor declarations; code-scan review |

---

## 9. Licensing-strategy options (no licence added in this milestone; no repository-visibility change)

The mandate explicitly excludes adding a licence file and changing repository visibility in MC-02. The options below are decision inputs for the owner and counsel.

| Option | Description | Prerequisites | Effect on MAREA | Risk |
| --- | --- | --- | --- | --- |
| **A. Retain "all rights reserved" + proprietary outbound terms (recommended baseline)** | Keep the repository public and unlicensed; add an explicit internal copyright/NOTICE file and an outbound proprietary EULA for products | D-01..D-05 complete; NOTICE bundle; compliance fixes for R-IP-05/06 | Preserves exclusivity and pricing power; no community reuse | Without assignments, EMBARCARTE still lacks rights to ~48% of the tree |
| **B. Permissive open-source licence on the OMI stack (e.g. Apache-2.0)** | Add a standard licence to enable external reuse, while MAREA differentiates on hardware/product | All assignments (D-02..D-05); patent/trademark review; contributor consent | Strong ecosystem signal; forfeits exclusivity of the core code | The current tree cannot be relicensed until every rightholder agrees |
| **C. Source-available / dual licensing** | Publish source under a non-OSI licence with commercial licence sales | Same assignments; custom licence drafting (counsel) | Balances transparency and monetisation | Custom licences add compliance complexity; EUPL/GPL interplay must be reviewed |

Recommendation: proceed with **Option A** for MC-02 and MC-03, complete the assignment chain (D-02..D-05), and revisit Options B/C only after ownership is consolidated. Do not add a `LICENSE` file now: a licence grant without complete ownership would create a warranty/estoppel risk.

---

## 10. Limitations and evidence gaps

1. No interviews, contracts or correspondence were available; ownership statements are evidence-based assessments.
2. Git history begins with an already-populated repository; provenance before 2026-01-27 is verifiable only through contributor declarations.
3. AI-assisted content cannot be reliably detected by static analysis; the assessment relies on commit authorship and branches.
4. Third-party data terms were not all retrievable within this audit's evidence rules (only public sources and repository documentation were used); several remain `LEGAL_REVIEW_REQUIRED`.
5. No package installations or network fetches of lockfile tarballs were performed; npm/PyPI metadata and upstream `LICENSE` files were used instead.
6. Line-level ownership (blame) is not presented; file-level last-touch is a coarser but reproducible metric.
7. The assessment is not legal advice; all `LEGAL_REVIEW_REQUIRED` items must be reviewed by qualified counsel.

---

## Appendix A — Reproducible command log (read-only)

```powershell
$repo = 'C:\Users\Admin\Documents\workspace\open-marine'

# 1. Custody and history
git -C $repo rev-parse HEAD                             # 403941b8860439115418b1786d8431284d2dae08
git -C $repo rev-list --count --all                     # 82
git -C $repo shortlog -sne --all                        # 4 author e-mails
git -C $repo remote -v                                  # github.com/manuelxose/open-marine.git
git -C $repo branch -a                                  # main + claude/*, codex/*, feature/chart-upgrade-m1
git -C $repo ls-files | Measure-Object                  # 1033
git -C $repo rev-list --max-parents=0 HEAD              # 281ba95
git -C $repo show -s --format='%h|%ad|%ae|%s' --date=short 281ba95
git -C $repo ls-tree -r --name-only 281ba95 | Measure-Object   # 204

# 2. Licence/notice/CLA scan
git -C $repo ls-files | Where-Object { $_ -match '(?i)licen[cs]e|copying|notice' }
git -C $repo grep -n -i -E 'SPDX|Copyright \(|All rights reserved|Licensed under|GNU General Public License|MIT License|Apache License' -- .
git -C $repo grep -n -i -E 'signed-off-by|developer certificate|contributor license|\bCLA\b|DCO' -- .
git -C $repo log --all --format='%ce|%cn' | Group-Object      # committer identities

# 3. Authorship metrics
git -C $repo log --all --numstat --date=short --format='COMMIT|%H|%ae|%an|%ad|%P|%s'
git -C $repo log --all --name-only --date=short --format='COMMIT|%H|%ae|%ad'
git -C $repo log --all --diff-filter=A --format='AUTHOR|%ae' --name-only
git -C $repo log --all --format='%ae' | Group-Object

# 4. Data/binaries provenance
git -C $repo log --all --oneline -- '*npmrc*'
git -C $repo log --all --diff-filter=RD --format='%h %ad %ae %s' --date=short --name-status
git -C $repo log --all --oneline --follow -- marine-instrumentation-ui/public/assets/sounds/alarm-critical.wav
git -C $repo grep -n -E 'pip install|pip3 install|https?://' -- 'scripts/*' '*.sh' '*.ps1' '*.py' '*.mjs' 'docs/*' '*.yml'
```

Expected headline numbers: 82 commits / 70 non-merge / 12 merge; 1,033 files; 4 authors; 534/495/4 last-touch split; root commit 204 files; 5 lockfiles; 2,133 package entries; 1,004 unique `name@version`; 997 third-party npm components; 13 Python entries; 1,034 CSV rows.

## Appendix B — Deterministic SBOM extraction approach (supports B2)

- Parsed all five `package-lock.json` files with a JSON parser (Node.js), not `package.json` declarations. Each lockfile is `lockfileVersion: 3` with a `packages` map and an empty-string root key; the extraction script reads the map, skips the root entry and `link` entries, and normalises workspace paths.
- Deduplication unit: `name@version`, aggregated across lockfiles with the set of lockfiles that contain it (1,004 unique components from 2,133 package entries).
- Runtime/build classification: dependency-graph traversal from each workspace's `dependencies`/`devDependencies` using npm's ancestor resolution over the lockfile path tree; `dev` flags from lockfile entries are used as a corroborating signal. Two unresolved edges remain (`fdir` via `tinyglobby`/`vite` in `marine-data-contract/package-lock.json`; the package exists in the root lockfile and is inventoried there).
- No script was committed to either repository; the extraction script lived in `%TEMP%` only.

## Appendix C — AI-provenance detail

Commits authored by `Claude <noreply@anthropic.com>` (all 2026-01-28):

| Commit | Subject |
| --- | --- |
| `00841d2` | Milestone 3: Architectural alignment - feature-facade pattern for all routes |
| `b0aaa82` | Milestone 2: Remove ~1,800 lines of dead code |
| `1a64fee` | Update package-lock.json after dependency install |
| `92b6d85` | Milestone 1: Critical fixes for alarm/diagnostics and unit consistency |
| `af3955d` | Add comprehensive PROJECT_STATE.md with architectural analysis |

Additional AI-agent traces: remote branches `claude/analyze-codebase-JJQG3` and `claude/claude-md-mkxa7lh5ousqvco6-p1GWp` (merged into `main`), and `codex/unify-simulation-platform`; `.gitignore` excludes local AI-agent configuration from tracking. The only record of AI involvement is the commit author identity; no tool, model version or prompt/usage record is stored.

## Appendix D — Manual licence verification (B2 representative sample, retrieval date 2026-10-30)

All URLs were retrieved on 2026-10-30. "npm registry" means the version-specific document at `https://registry.npmjs.org/<package>/<version>`; "upstream" means the project's own licence file.

| # | Component | Version | Licence found | Source URL |
| ---: | --- | --- | --- | --- |
| 1 | `maplibre-gl` | 5.17.0 | BSD-3-Clause | `https://registry.npmjs.org/maplibre-gl/5.17.0` |
| 2 | `@angular/core` | 21.2.17 | MIT | `https://registry.npmjs.org/@angular%2Fcore/21.2.17` |
| 3 | `better-sqlite3` | 12.11.1 | MIT | `https://registry.npmjs.org/better-sqlite3/12.11.1` |
| 4 | `caniuse-lite` | 1.0.30001806 | CC-BY-4.0 | `https://registry.npmjs.org/caniuse-lite/1.0.30001806` |
| 5 | `world-atlas` | 2.0.2 | ISC (Natural Earth public-domain source) | `https://registry.npmjs.org/world-atlas/2.0.2` |
| 6 | `busboy` | 1.6.0 | MIT (lockfile metadata missing; registry legacy `licenses` field) | `https://registry.npmjs.org/busboy/1.6.0` |
| 7 | `streamsearch` | 1.1.0 | MIT (lockfile metadata missing; registry legacy `licenses` field) | `https://registry.npmjs.org/streamsearch/1.1.0` |
| 8 | `typescript` | 5.9.3 | Apache-2.0 | `https://registry.npmjs.org/typescript/5.9.3` |
| 9 | AIS-catcher | upstream `main` | GPL-3.0 | `https://raw.githubusercontent.com/jvde-github/AIS-catcher/main/LICENSE` |
| 10 | Signal K server | upstream `master` | Apache-2.0 | `https://raw.githubusercontent.com/SignalK/signalk-server/master/LICENSE` |
| 11 | MicroPython | upstream `master` | MIT (ports include BSD-3-Clause components) | `https://raw.githubusercontent.com/micropython/micropython/master/LICENSE` |
| 12 | numpy | upstream `main` | BSD-3-Clause | `https://raw.githubusercontent.com/numpy/numpy/main/LICENSE.txt` |
| 13 | xarray | upstream `main` | Apache-2.0 | `https://raw.githubusercontent.com/pydata/xarray/main/LICENSE` |
| 14 | netCDF4-python | upstream `master` | MIT | `https://raw.githubusercontent.com/Unidata/netcdf4-python/master/LICENSE` |
| 15 | shapely | upstream `main` | BSD-3-Clause | `https://raw.githubusercontent.com/shapely/shapely/main/LICENSE.txt` |
| 16 | rasterio | upstream `master` | BSD-3-Clause | `https://raw.githubusercontent.com/rasterio/rasterio/master/LICENSE.txt` |
| 17 | requests | PyPI (latest) | Apache-2.0 | `https://pypi.org/pypi/requests/json` |
| 18 | pynmea2 | PyPI 1.19.0 | MIT | `https://pypi.org/pypi/pynmea2/json` |
| 19 | pyserial | upstream `master` | BSD-3-Clause (SPDX tag in file) | `https://raw.githubusercontent.com/pyserial/pyserial/master/LICENSE.txt` |
| 20 | mpremote | PyPI (latest) | MIT | `https://pypi.org/pypi/mpremote/json` |
| 21 | copernicusmarine | PyPI 2.5.0 | EUPL (EUPL-1.2 family) | `https://pypi.org/pypi/copernicusmarine/json` |
| 22 | icm20948 | PyPI 1.0.0 | MIT | `https://pypi.org/pypi/icm20948/json` |
| 23 | websocket-client | upstream `master` | Apache-2.0 | `https://raw.githubusercontent.com/websocket-client/websocket-client/master/LICENSE` |
| 24 | GDAL | upstream `master` | MIT-style with component exceptions | `https://raw.githubusercontent.com/OSGeo/gdal/master/LICENSE.TXT` |
| 25 | tippecanoe | upstream `master` | BSD-2-Clause | `https://raw.githubusercontent.com/mapbox/tippecanoe/master/LICENSE.md` |
| 26 | OpenStreetMap tile service | policy page | ODbL data + restrictive tile usage policy | `https://operations.osmfoundation.org/policies/tiles/` |
| 27 | GitHub repository metadata | n/a | `license: null`, `private: false`, `visibility: public` | `https://api.github.com/repos/manuelxose/open-marine` |

Not verified upstream in this audit (recorded as evidence gaps in the CSV): `@mapbox/jsonlint-lines-primitives@2.0.2` (no licence field in the lockfile or npm registry document; upstream repository licence must be obtained), `smbus2` (transitive PyPI package; licence file not retrieved), and the aggregate licence set of the `node:18-slim` base image (needs an image SBOM).

## Appendix E — External sources consulted (retrieval date 2026-10-30)

- npm registry version documents (URLs in Appendix D).
- PyPI JSON API (URLs in Appendix D).
- Upstream `LICENSE` files (URLs in Appendix D).
- GitHub REST API repository metadata: `https://api.github.com/repos/manuelxose/open-marine`.
- OpenStreetMap Foundation Tile Usage Policy: `https://operations.osmfoundation.org/policies/tiles/`.
- Repository-internal documentation used as evidence: `README.md`, `docs/CHARTS.md`, `docs/marine-data-sources.md`, `signalk-runtime/docker-compose.yml`, `marine-tile-server/Dockerfile`, `scripts/init.sh`, `marine-chart-engine/scripts/requirements-copernicus.txt`, `.github/workflows/ci.yml`, `chart-source-catalog.ts`, `marine-environment`/`tide`/`area-search` services.

---

## Appendix F — Cross-references

- Component-level licence inventory and classification: `docs/marea/compliance/SOFTWARE-LICENSE-INVENTORY.csv` (1,034 rows).
- Operational policy, notice generation, disclosure rules and gating checklist: `docs/marea/compliance/LICENSE-NOTICE-AND-DISTRIBUTION-POLICY.md`.
