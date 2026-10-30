# MAREA — AI visual asset production pipeline (MC-01)

Date: 2026-10-30
Status: **CONTRACT PROPOSED — NO IMAGE GENERATED, NO ASSET COMMITTED, NO PUBLIC FOLDER CREATED**
Owner: EMBARCARTE / MAREA program (Visual & Brand Systems Specialist, Agent C).
Repository: `embarcarte` — Angular 21 SSR, branch `feature/marea-mc01-agent-foundation`, base `092ae74`.
Related: `docs/marea/COMMERCIAL-PORTFOLIO.md`, `docs/marea/WEBSITE-AND-ROADMAP.md`,
`docs/marea/M00-DISCOVERY-BASELINE.md`, `docs/marea/execution/AGENT-OPERATING-MODEL.md`,
operational checklist in `.agents/skills/marea-asset-production/SKILL.md`.

Evidence labels used in this document:

| Label | Meaning |
|---|---|
| **VERIFIED** | Checked in this repository or by a command run on this machine on 2026-10-30. |
| **DOCUMENTED (external)** | Stated on an official provider page consulted on 2026-10-30. It describes the provider, not our entitlement. |
| **PROPOSED** | Design decision in this contract, not implemented. |
| **NOT VERIFIED** | Not confirmed; do not treat as true. |
| **BLOCKED** | Requires an external authorization, credential or decision that this milestone does not have. |

Hard rules for this milestone (inherited from the program):

- MAREA is a **PROPOSED** brand pending trademark clearance. An existing US vendor
  (`Marea Marine`, https://mareamarine.com/collections/electronics) is a **risk signal, not an
  infringement finding**. Nothing here is legal advice or a clearance result.
- No image API was called, no money was spent, no `public/` folder or file was created by this
  milestone, no model name, price, certification or brand approval is invented.
- This document is a production contract for a **future, separately authorized** milestone. MC-01
  does not promise that generation will happen; it defines exactly what must be true before it may.

---

## 1. Purpose and scope

### 1.1 Why this pipeline exists

The MAREA website roadmap (MC-05 → MC-09 in `docs/marea/WEBSITE-AND-ROADMAP.md`) requires a
consistent visual system: corporate pages, nine product families, bundles, install scenarios,
professional program pages and technical diagrams. The current repository has only seven small
photographs in `public/images/` plus its identity files. There is no photographic library of
real MAREA hardware — because MAREA hardware does not yet exist as a certified product. Any
"product photo" produced now is, necessarily, a **concept render**.

This pipeline therefore does two jobs:

1. It defines how credible, legally safe, performance-budgeted **concept imagery** can be produced
   and labelled honestly while products remain at lifecycle status CONCEPT / DEFINED.
2. It defines the acceptance gate that keeps unlabeled synthetic imagery, fake screenshots and
   invented certifications out of a commercial site that sells marine safety-adjacent equipment.

### 1.2 Relationship to the existing Angular 21 SSR project

| Repository fact (VERIFIED 2026-10-30) | Consequence for assets |
|---|---|
| `angular.json` → `build.options.assets: [{ "glob": "**/*", "input": "public" }]` | Everything under `public/` is copied verbatim to the deployed root and served from `/`. No build-time image optimization happens. Optimization must occur **before** commit. |
| `build.options.outputMode: "server"`, `ssr.entry: src/server.ts`, prerender routes in `src/app/app.routes.server.ts` | Pages are server-rendered/prerendered HTML. The image bytes are the visitor's first cost; asset budgets are release budgets, not decorations. |
| `production` budgets: `initial` 500 kB warning / 1 MB error; `anyComponentStyle` 6 kB / 8 kB | These budgets count JS/CSS only, **not** `public/` images. Image weight is currently untracked by the Angular build → it must be tracked by the manifest + performance check (Section 8). |
| Existing image convention: `/images/home-hero.webp` etc. referenced as root-absolute URLs (`src/app/core/images.ts`, `src/app/features/home/content/home.content.ts`, `src/app/core/sample-products.ts`) | New assets follow a root-absolute `/assets/marea/...` convention (Section 4), never relative paths. |
| `src/app/core/images.ts` currently points at remote Unsplash URLs | Third-party hotlinks are the current fallback. MAREA assets must be first-party files under `public/`, with recorded rights. |
| `src/app/shared/ui/product-image.ts` renders `<img [src] [alt] loading="lazy">`, or an inline SVG placeholder when `src` is empty | There is already a "no photo" state. Broken paths are never acceptable: a missing asset must fall back to this placeholder pattern, not to a broken URL. |
| Hero imagery on inner pages is a CSS background with `role="img"` + `[attr.aria-label]` (`delivery.ts`, `experiences.ts`); the home hero is a CSS background layered with a gradient (`src/styles.scss` `.home-hero-image`) | Backgrounds cannot carry `srcset`/`sizes` and bypass `<img>` budgets. New MAREA hero artwork should prefer real `<img>`/`<picture>` elements; where a CSS background is unavoidable, the same budget and alt contract applies. |
| `SeoService.set()` (`src/app/core/seo.service.ts`) always emits `og:image:width=1200`, `og:image:height=630`, and defaults to `/og-image.png` | Any per-page OG image override **must be exactly 1200×630**, otherwise the emitted metadata lies. |
| `scripts/check-performance.mjs` records `image_transfer_bytes` with regex `\.(png\|jpe?g\|webp\|svg\|ico)` | AVIF is **not counted** (gap — Section 8.6). |
| `e2e/accessibility.spec.ts` runs axe (`wcag2a/aa`, `wcag21aa`, `wcag22aa`) on key pages; axe's `image-alt` rule is therefore a live gate | Every content image needs correct `alt`; decorative images use `alt=""`. |
| Design tokens in `src/styles.scss`: navy `#17365d`, sea `#1776ad`, mist `#f2f9fd`, paper `#fff`, ink `#17365d`; fonts Manrope (display) and DM Sans (body) | The visual standard (Section 6) is anchored to these tokens. New assets must work with them, not introduce a parallel palette. |

### 1.3 In scope / out of scope

**In scope:** taxonomy, locations, naming/IDs, manifest format, 10-step workflow, acceptance
criteria, visual standard, legal/provenance rules, optimization targets, cost/approval policy and
blockers.

**Out of scope (this milestone):** any API call, any generated file, creating `public/assets/`,
purchasing tools, choosing the final logo, trademark clearance, pricing, HTML/CSS implementation of
MAREA pages, and any claim that MAREA products exist physically.

---

## 2. Provider availability — verified findings

### 2.1 Native image generation in the installed Harness

| Capability | Status | Evidence (2026-10-30) |
|---|---|---|
| Native image-generation tool or plugin | **NOT AVAILABLE** | Runtime `0.2.1-rc.5`, profile `desktop`. Package inventory of the runtime: **307** packages under `@deepseek-ai`; the only entries matching image/media/render/browser patterns are `dsh-client-ui-renderer`, `dsh-client-ui-sidebar-browser`, `dsh-compaction-image-offload` — UI/context-compaction packages, none of which generates images. The agent tool surface in this session contains no image-generation tool. |
| Installed profile bundles | base + web app + agent team + auto review | `C:\Users\Admin\.dsh\profiles\desktop\package.json` → `@deepseek-ai/dsh-base`, `@deepseek-ai/dsh-web-app`, `@deepseek-ai/dsh-experimental-agent-team-profile`, `@deepseek-ai/dsh-experimental-auto-review`. No imaging bundle. |
| Local image *conversion* (not generation) | **AVAILABLE** | `C:\ffmpeg\bin\ffmpeg.exe` 7.1 (gyan.dev essentials) with `libwebp` and `libaom-av1` encoders. Test run: `favicon.ico` → WebP (1,144 bytes) and `.avif` (1,272 bytes), both exit code 0. ImageMagick, `cwebp`, `avifenc`, `squoosh-cli` and the npm `sharp` package are **not** present (i.e. not a *project* dependency; the Harness runtime vendors its own `sharp` for attachment handling, not usable from repo scripts). This satisfies Section 8 optimization without adding dependencies; browser decode of the produced AVIF was **NOT VERIFIED**. |

### 2.2 Credentials present on this machine (variable names only, values never read into this document)

Checked process, user and machine scopes on 2026-10-30:

| Variable name | Status |
|---|---|
| `OPENAI_API_KEY` | NOT SET (process, user, machine) |
| `STABILITY_API_KEY` | NOT SET |
| `REPLICATE_API_TOKEN` | NOT SET |
| `AZURE_OPENAI_API_KEY` | NOT SET |
| `GEMINI_API_KEY` | NOT SET |
| `ANTHROPIC_API_KEY` | NOT SET |
| `HF_TOKEN` | NOT SET |
| `IMAGE_API_KEY` | NOT SET |

The user-scope registry contains **`DEEPSEEK_API_KEY`** (name only; not read, not printed, not
usable for image generation and not to be repurposed). No `.env` file exists in the repository; the
only environment template is `deploy/.env.example` (deployment variables, not image providers).

**Consequence:** no provider call can be made from this environment today. Generation is **BLOCKED**
on credentials and on budget authorization (Sections 2.5, 9, 10).

### 2.3 External provider candidate: OpenAI Images API — verification method

The task required verifying model identifiers against the official guide
<https://developers.openai.com/api/docs/guides/image-generation>.

Method actually used, in order:

1. `web_fetch` on the guide → **FAILED**: `HTTP 404` from the tool's configured fetch endpoint
   (`https://api.deepseek.com/v1/tools/fetch`). `web_fetch` on `https://example.com` returned
   HTTP 200 in the same session, so the failure is specific to the fetch backend/URL, not a general
   outage. The tool also failed on the same page via a second URL variant.
2. Fallback: direct HTTPS GET with PowerShell `Invoke-WebRequest` (read-only GET, no credentials,
   no chargeable endpoint) → **HTTP 200**, 1,257,955 bytes of page content. Findings below are
   extracted from that response.

> Provenance note: the page was retrieved by the agent's own read-only HTTP GET because the
> dedicated fetch tool was unavailable. This is weaker than a first-party archival record; it must
> be re-checked on the day real generation is authorized.

### 2.4 What the official page actually documents (2026-10-30)

Quoted/paraphrased from the retrieved page:

- "The API lets you **generate and edit images from text prompts using `gpt-image-2.5-sunburst`
  and `gpt-image-2.5-flare`**. Choose **Sunburst** for workflows where editing precision matters
  most, and **Flare** for fast, high-quality everyday image generation."
- Model identifiers present on the page: `gpt-image-2.5-sunburst`, `gpt-image-2.5-flare`, plus
  earlier models `gpt-image-2` and `gpt-image-1`.
- Interface: generation and editing are exposed through the **Images API** and the **Responses API**
  (image-generation tool); both allow customizing quality, size, format and compression.
- Recommended sizes for the 2.5 models: `1024x1024` (square), `1536x1024` (landscape),
  `1024x1536` (portrait). Custom `WIDTHxHEIGHT` allowed when edges are multiples of 16, aspect ratio
  is between 1:3 and 3:1, no edge exceeds 3840 px, and total pixels are between 655,360 and
  8,294,400; resolutions above 2560x1440 are labelled experimental.
- Quality parameter: `low`, `medium`, `high`, `xhigh`, `max`, `auto` for the 2.5 models (earlier
  models stop at `high`).
- Output formats documented: `png`, `jpeg`, `webp`. Transparent background is supported.
- The page does **not** mention C2PA, SynthID or a visible watermark (searched: 0 occurrences).
  Content-provenance handling is linked out (`/api/docs/guides/your-data`), not specified on this
  page. Do not claim embedded provenance metadata.
- The page documents a cost/usage estimator for the models. **No price is copied into this document**
  (Section 9): cost figures must be read from the official page at authorization time, for the exact
  model/quality/size.

**Verification verdict for the candidate identifiers**

| Candidate id | Verdict |
|---|---|
| `gpt-image-2.5-sunburst` | **VERIFIED AS A DOCUMENTED MODEL IDENTIFIER** on the official OpenAI image-generation guide, 2026-10-30. |
| `gpt-image-2.5-flare` | **VERIFIED AS A DOCUMENTED MODEL IDENTIFIER** on the official OpenAI image-generation guide, 2026-10-30. |

Scope of that verdict, stated precisely: the identifiers are **documented in official provider
documentation**. What is **NOT VERIFIED**: that this account, organisation or machine has access to
them; their effective availability/rate limits; their output quality for our briefs; their cost for
our sizes; and their terms applying to commercial use of the produced images. The two 2.5 models
(`gpt-image-2.5-sunburst`, `gpt-image-2.5-flare`; earlier ids `gpt-image-2` and `gpt-image-1` are
listed separately in §2.4) must be re-verified on the first authorized call and recorded in the
manifest.

No other model name may be used in a brief or manifest. A model that appears in a search snippet but
not in the guide is **NOT VERIFIED** and must not be written into a brief.

### 2.5 Provider decision

- **Primary external candidate:** OpenAI Images API (`gpt-image-2.5-sunburst` for precision /
  iterative edit work, `gpt-image-2.5-flare` for fast first-draft volume), **only** after
  credentials and a written budget authorization exist.
- **Alternative providers:** `STABILITY_API_KEY` / `REPLICATE_API_TOKEN` are named here solely as
  recognized adapters (Section 4 manifest has a `provider` field). Their capabilities are
  **NOT VERIFIED** on this machine and no alternative provider is selected or promised.
- **Self-hosted / local models:** not evaluated; no GPU/model runtime is verified on this machine.
  Not recommended for MC-02 without a separate audit.

---

## 3. Asset taxonomy mapped to the real site roadmap

The categories below exist **because a page in the roadmap needs them**, not as a generic stock
library. Paths are **PROPOSED**; `public/assets/` does **not** exist in the repository and must not
be created by this milestone.

| # | Category | Concrete need (roadmap) | Proposed location | Class | Priority |
|---|---|---|---|---|---|
| 1 | **Brand** | Logo/wordmark, favicons, social/OG identity for the MAREA launch pages (MC-01B identity system → MC-07A) | `public/assets/brand/` (identity files may stay at `public/` root if they replace favicons) | CONCEPT (until clearance) | P0 |
| 2 | **Corporate** | Corporate home `/`, `/en`; company/why pages; "integration and ownership" story (MC-07A) | `public/assets/corporate/` | CONCEPT | P1 |
| 3 | **Ecosystem** | The one picture that explains "one vessel, several systems": NAV/HUB/AIS/SENSE/WATCH interacting (MC-07A, MC-07B) | `public/assets/ecosystem/` | CONCEPT / illustrative diagram | P0 |
| 4 | **Product families** | Grid/card imagery for `/marea/productos` (MC-08A/B/C) | `public/assets/products/families/` | CONCEPT | P1 |
| 5 | **Product details** | Hero + detail imagery for the nine product pages (`/marea/hub`, `/marea/nav`, …) (MC-08A/B/C) | `public/assets/products/{nav,hub,ais,pilot,sense,watch,display,weather,fleet}/` | CONCEPT (never REAL_PRODUCT until hardware evidence exists) | P1 |
| 6 | **Bundles** | Bundle/solution selector and detail (`/marea/soluciones`) (MC-09A) | `public/assets/solutions/` | CONCEPT; no fake box shots of unpurchasable bundles | P2 |
| 7 | **Install scenarios** | Installer/quote flows, compatibility narrative (`/marea/configurador`, `/instaladores`) (MC-09B, MC-14A) | `public/assets/install/` | CONCEPT; must not depict a real customer vessel | P2 |
| 8 | **Professional solutions** | Installer program, partner/B2B pages (`/profesionales`, `/en/professionals`, B2B FLEET demo) (MC-14A) | `public/assets/professionals/` | CONCEPT | P2 |
| 9 | **Technical diagrams** | Wiring/network/protocol/architecture figures that must be accurate; PILOT safety boundary diagrams | `public/assets/diagrams/` (SVG preferred) | `DIAGRAM` (illustrative until engineering-verified) | P1 |
| 10 | **Campaigns** | Launch/press/seasonal banners, partner one-pagers, only after launch approval (MC-15A, MC-17A) | `public/assets/campaigns/` | CONCEPT + dated campaign record | P3 (do not produce before approval) |

Rules that keep the taxonomy honest:

- **No category is filled speculatively.** An asset is produced only when its page exists in an
  approved MC deliverable and its copy is frozen enough to know what the image must say.
- **Priority** P0 = needed by the first public MAREA page; P1 = product catalog wave; P2 = sales
  motion; P3 = post-launch. Nothing above P0 is promised in MC-01.
- **Minimum viable set** for the first legal MAREA landing page: brand mark, one corporate hero, one
  ecosystem diagram, one illustrative "refit vessel" scene clearly labelled CONCEPT. Four assets,
  not forty.
- **Technical diagrams are not decorative.** They are the one category where AI image generation is
  usually the wrong tool (Section 6.4): use SVG authored from the real architecture, not a generative
  model, because invented wiring is a safety and liability problem.
- Depicting a **real competitor's device, chart plotter, chart licence, or certification logo** is
  prohibited (Section 7).

### 3.1 Location decision (one tree, no parallel system)

Two conventions exist and they must not both be used:

- The **existing repository convention** is `public/images/<name>.webp` referenced as
  `/images/<name>.webp` (`src/app/core/images.ts`, `home.content.ts`, `sample-products.ts`).
- The **proposed namespaced convention** for new brand content is `public/assets/marea/...`
  referenced as `/assets/marea/...`, as suggested by the MC-01 brief and used throughout this
  document.

Decision rule for the owning milestone (decided by the Lead at MC-01 integration):

1. **DECIDED — default applies:** use **`public/assets/marea/<category>/...`** so MAREA assets are
   isolated from legacy EMBARCARTE photos and can be moved/retired as one unit. The
   `.agents/skills/marea-asset-production` skill was updated to match this decision.
2. If a future Lead prefers **zero new top-level folders**, use **`public/images/marea/<category>/...`**
   instead. Then update this section, the manifest example and the taxonomy table in the same change.
3. Never split a category across both trees, never duplicate a file in both, and never reference
   files that do not exist. The `integration.angular_path` value in the manifest is authoritative.

`public/assets/` does not exist today and is **not created by this milestone** (Section 10, B6).

---

## 4. Naming, stable IDs and manifest schema

### 4.1 File naming

```
<category>/<product-or-subject>-<purpose>-<variant>-<width>w[-<height>h].<ext>
```

- lowercase ASCII kebab-case; no spaces, accents, `ñ`, uppercase or dates in the filename;
- parts: `category` = folder from Section 3; `product-or-subject` = `nav|hub|ais|pilot|sense|watch|display|weather|fleet|ecosystem|corporate|install|…`; `purpose` = `hero|card|detail|ambient|diagram|og`; `variant` = short descriptor (`installed|rendered|deck|night|concept`) or `v1`, `v2` for resubmissions; `width` in pixels with `w`, optional height;
- one file per width × format; the manifest lists them all.

Examples (illustrative, none exist):

```
products/hub/hub-hero-installed-concept-1920w.avif
products/hub/hub-hero-installed-concept-1280w.webp
corporate/corporate-hero-marina-dawn-concept-1920w.avif
diagrams/diagram-hub-dataflow-signalk.svg
```

### 4.2 Stable registry ID

Two identifiers per asset, both required:

- **`id`** — immutable registry key: `MR-<CATEGORY>-<NNN>` where category is a 3-letter code
  (`BRD`, `COR`, `ECO`, `FAM`, `PRD`, `BUN`, `INS`, `PRO`, `DIA`, `CAM`) and `NNN` is a zero-padded
  counter that is never reused, never renumbered, never deleted (retire it instead). Example:
  `MR-PRD-014`.
- **`slug`** — human-readable, unique: `<product>-<purpose>-<variant>`, e.g. `hub-hero-installed-concept`.
  Used in the file path and in the manifest; changing a slug is a breaking change and requires a new
  ID.

The ID is what copy, tickets, reviews and legal attestations refer to. The filename can be
regenerated; the ID cannot.

### 4.3 Manifest schema (machine-readable contract)

Manifest files: one YAML document per asset in `docs/marea/assets/manifest/` (PROPOSED) or a single
`docs/marea/assets/ASSET-MANIFEST.yaml` aggregated list; template is
`docs/marea/assets/ASSET-MANIFEST.template.yaml`. Required fields:

| Field | Type | Rule |
|---|---|---|
| `id` | string | `MR-XXX-NNN`, immutable |
| `slug` | string | unique kebab-case |
| `category` | enum | one of the 10 Section 3 categories |
| `purpose` | string | what the asset must communicate, 1 sentence |
| `classification` | enum | `CONCEPT` \| `REAL_PRODUCT` \| `DIAGRAM` \| `BRAND` |
| `status` | enum | `DRAFT` \| `BRIEF_APPROVED` \| `GENERATED` \| `REVIEW_PENDING` \| `ACCEPTED` \| `REJECTED` \| `QUARANTINED` \| `RETIRED` |
| `target.pages` | list | routeIds or roadmap page identities from `WEBSITE-AND-ROADMAP.md` |
| `target.section` | string | e.g. `hero`, `card grid`, `detail aside` |
| `brief` | object | `summary`, `subject`, `composition`, `lighting`, `palette`, `must_include`, `must_avoid`, `negative_prompt` |
| `prompt` | object | `text` (the exact prompt used), `input_images` (if editing), `seed` (if supported) |
| `provider` | object | `name`, `api`, `endpoint`, `model` (must be a documented id), `params` (`size`, `quality`, `format`, `background`), `terms_version` |
| `created_at` / `generated_at` | ISO-8601 date | `created_at` = brief date; `generated_at` only after a real call |
| `author` / `reviewer` | string | agent/human identities; reviewer ≠ author |
| `dimensions` | object | `width`, `height`, `aspect_ratio` (e.g. `16:9`) of the master |
| `files` | list | per derivative: `path`, `format`, `width`, `height`, `bytes`, `sha256` |
| `optimization` | object | `formats`, `responsive_widths`, `compression`, `target_bytes`, `lcp` (bool) |
| `rights` | object | `classification`, `license`, `provenance`, `ai_generated` (bool), `model_provider`, `account_entitlement`, `attested_by`, `attested_at`, `synthetic_content_disclosure` |
| `alt.es` / `alt.en` | string | localized alt text; `""` only if strictly decorative (with `decorative: true`) |
| `caption.es` / `caption.en` | string | optional visible caption; same provenance rules |
| `seo` | object | `og_image` (bool), must be 1200×630 if true |
| `checks` | object | `visual_review`, `alt_review`, `perf_budget`, `axe_alt`, `ssr_safe`, `rights_check` — values `PASS`/`FAIL`/`PENDING` |
| `integration` | object | `angular_path` (e.g. `/assets/marea/products/hub/...`), `component`, `last_build_verified_at` |
| `history` | list | append-only status transitions: `{at, by, from, to, reason}` |

Manifest rules:

- The manifest is the **only** source of truth; a file without a manifest entry is unreferenced and
  must not ship.
- `provider.model` must be a documented identifier (Section 2.4) **or** the string `NONE_YET` for
  briefs created before a provider is authorized.
- `files` must be empty until a real generation happened. A manifest may not describe a file that
  does not exist.
- `checks.*` cannot be `PASS` without recorded evidence (command, screenshot path, reviewer).
- When reality changes (model renamed, provider unavailable, asset rejected) append to `history` and
  change only `status`; never rewrite past entries.

### 4.4 Where Angular consumes the values

- `integration.angular_path` is a **root-absolute public URL** (`/assets/marea/...`), matching the
  existing `/images/...` convention consumed by `src` bindings and by
  `src/app/core/sample-products.ts`-style data.
- `alt.es` / `alt.en` feed the existing localized content objects (`imageAlt` fields already used in
  `technology-page.content.ts`, `delivery.content.ts`, `experiences.content.ts`). Do **not** hard-code
  Spanish alt text in a template.
- `seo.og_image = true` may only be used with a 1200×630 derivative, because
  `SeoService` hard-codes those dimensions.
- A future `docs/marea/assets` consumer (script or build check) may read the manifest; none exists
  today. This is a PROPOSED integration, not implemented.

---

## 5. Production workflow — 10 steps

Each step has an owner, an output and acceptance criteria. A step that cannot meet its criteria
stops the asset; it never proceeds "to see if it looks fine".

| # | Step | Output | Acceptance criteria | Failure handling |
|---|---|---|---|---|
| 1 | **Brief** | `status: DRAFT` manifest entry with full `brief` + `prompt` | Page/section identified against `WEBSITE-AND-ROADMAP.md`; classification set; aspect ratio and budget chosen from Section 8; subject described in one unambiguous sentence; `must_avoid` lists fake UI, fake logos, wrong vessel geometry; model = documented id or `NONE_YET` | Missing page/route ⇒ do not create the asset. Ambiguous subject ⇒ split into two briefs. |
| 2 | **Authorize** | Human approval record (`rights.attested_by`, budget line) | Credentials exist in the approved secret store (not in repo); budget cap in USD and max assets for the batch written down; legal/provenance class agreed; for BRAND assets, trademark status acknowledged as pending | Not authorized ⇒ `BLOCKED`; stop the whole batch, do not generate a "draft". |
| 3 | **Generate** | Provider response + master file saved **outside** `public/` first (e.g. `docs/marea/assets/_raw/`, git-ignored or temp) | Exact prompt and params recorded verbatim; `generated_at` set; response id/cost note saved; output format requested per Section 8 | 2 consecutive provider errors ⇒ stop and escalate; never retry in a loop against a charged endpoint |
| 4 | **Inspect** | Visual review notes | Reviewer (≠ author) checks: marine realism (Section 6), no text artifact passing as real UI, no certification/logo, no brand-mark confusion, composition works cropped to the target breakpoints | Any realism or legal defect ⇒ `REJECTED` with reason; regenerate with an adjusted prompt, not by post-editing around the defect |
| 5 | **Reject / retry** | `history` entry | Rejections recorded (count, reason). Retry limit: **3 generations per asset brief**, then stop and revise the brief or the provider choice | Limit reached ⇒ status `QUARANTINED`, escalate; do not silently spend more |
| 6 | **Variants** | Named variants (`v1`, `v2`, `deck`, `night`) with separate files or derivative entries | Only genuine alternatives (composition/light); every variant carries the same ID family and is individually listed; exactly one is `ACCEPTED` for production | More than one "winner" ⇒ decide explicitly; do not let pages pick implicitly |
| 7 | **Optimize** | AVIF + WebP derivatives, responsive widths, JPEG fallback only if a consumer needs it | Encoded locally with the verified toolchain (ffmpeg/libwebp/libaom — Section 2.1); each file within Section 8 budget; dimensions integral; no upscaling; metadata stripped | Over budget after 2 compression attempts ⇒ change master size/aspect, not only quality; if still over, reject the composition |
| 8 | **Metadata** | Manifest updated: all `files` with `sha256`, `bytes`, dimensions; `alt.es`/`alt.en`; `rights` complete; checks recorded | alt text describes the image content, not keywords; decorative ⇒ `decorative: true` + `alt: ""`; rights fields attested; `checks` values backed by evidence | Missing alt ⇒ `FAIL`, asset cannot be accepted |
| 9 | **Angular integration** | Content entry + template binding (done by the owner of the page scope, not by this asset milestone) | Root-absolute `/assets/marea/...` path; explicit `width`/`height` or CSS aspect-ratio to prevent CLS; `loading="lazy"` below the fold, eager + `fetchpriority="high"` only for the LCP hero; SSR/prerender builds clean (`npm run build`); no external hotlink | Build error or broken path ⇒ revert the binding; ship the existing `app-product-image` placeholder instead of a broken URL |
| 10 | **Verification** | Evidence bundle | `npm run build`; `npm run test:performance` measured and compared against the recorded baseline (it **measures** image bytes/LCP/CLS; it applies no thresholds and is not a CI gate — the comparison is reviewed by a human/Lead); `npm run test:e2e` accessibility spec passes (axe `image-alt`); page screenshots reviewed at 390/768/1440 widths; manifest `checks` all `PASS` | Any gate fails ⇒ asset not accepted; document the failure, keep previous asset |

Cross-step rules:

- **A partially completed asset is not a shipped asset.** If any file is missing, the page must use
  the placeholder (existing white/sea gradient card or SVG in `product-image.ts`) — never a broken
  request, never a random colored rectangle pretending to be content, never unrelated stock.
- **Author ≠ reviewer** for steps 4 and 10 (program rule in `AGENT-OPERATING-MODEL.md`).
- **No round trip beyond 3 generations** per brief without a new written authorization line.
- Any step that would require writing outside the assigned write scope is escalated to the Lead,
  not performed.

---

## 6. Premium maritime visual standard

Direction from `WEBSITE-AND-ROADMAP.md` §2: "Naval instrument credibility over generic SaaS. Deep
navy and restrained turquoise, warm off-white backgrounds, generous hierarchy, precise data
visualization, verified product photography or clearly labelled concept renders."

### 6.1 Do

- **Realistic vessel geometry.** Monohulls/keelboats with a believable hull sheer, freeboard,
  coachroof and deck hardware; helm position and instrument placement where a sailor would put them;
  rig proportions consistent (mast height ≈ 1.3–1.5× hull length for a cruising monohull); no
  physically impossible sail shapes, floating winches or duplicated hardware.
- **Believable environment.** Galicia/Rías Baixas conditions: 8–18 kn wind, 0.3–1.2 m chop, overcast
  Atlantic light or low golden sun, salt haze, wet teak, grey-green water. Horizon level unless
  intentional. Reflections and wake consistent with speed.
- **Palette anchored to the design tokens:** deep navy `#17365d`, sea `#1776ad`, mist `#f2f9fd`,
  warm off-white galley/cabin surfaces. A restrained turquoise accent, never neon.
- **Instrument realism:** screens rendered as plausible marine UIs (large numerals, day/night
  contrast, bearing/speed fields), but see 6.3 for the typographic-accuracy rule.
- **Material honesty:** anodised aluminium, marine-grade plastics, matte grippy surfaces, exposed
  cable glands and labelled connectors where the story is installation.
- **Crop-first composition:** subject readable at 16:9 hero, 4:3 card, 1:1 avatar/thumbnail; safe
  margins so the mobile crop never cuts the product.
- **One idea per image.** A hero sells "confidence at the helm", not eight features at once.
- **Label every concept render visibly** in the page (small "Concept render — not a photograph of a
  certified product" note) and consistently across all pages.

### 6.2 Don't

- Don't generate **fake screenshots of a real product**, fake app store listings, fake reviews,
  fake testimonials, fake dashboard analytics, fake certifications (CE, NMEA, ISO, RED), fake award
  badges, fake partner logos, or fake customer vessels with readable names.
- Don't put **invented text** in an image and present it as a real interface. Text in generated
  images is unreliable and, if it looks like product UI, it is a factual claim.
- Don't depict a **real competitor device** (chart plotter brand, autopilot head, AIS transponder) or
  a recognizable licensed chart.
- Don't generate **people identified as customers/testimonials**. Generic crew/installer figures are
  acceptable only as clearly anonymous illustrative scenes, and never with a quote attached.
- Don't add watermarks, stock-photo IDs, provider signatures or "AI generated" garish badges inside
  the image; disclosure belongs in the page/alt/manifest, not burned into pixels (unless a future
  legal decision requires visible disclosure — then it is a separate approved decision).
- Don't use dramatic disaster imagery (storm damage, sinking, man overboard) to sell safety-adjacent
  equipment; it implies safety guarantees MAREA cannot make.
- Don't invent a vessel interior that implies a product installation is complete and certified.
- Don't use dark/neon "cyber" grading, lens flares over the sea, or generic SaaS gradients that
  contradict the existing light, navy/sea visual system.
- Don't crop so aggressively that an installed unit becomes unidentifiable, or so wide that it is
  just "generic boat stock".

### 6.3 Typography, UI and numbers: use HTML/CSS/SVG, not generation

Any text that a visitor reads as **information** — product names, prices, edition names, safety
notice text, labels in a diagram, instrument values in a UI mock — must be **real DOM text or SVG
text authored by us**. Reasons: generated lettering is inaccurate, untranslatable, inaccessible to
screen readers, and becomes an unverified factual claim. The pipeline therefore splits assets:

- **Photographic/render layer:** mood, vessel, installation scene (AI image).
- **Information layer:** headings, plaques, screen UIs, specs, numbers (HTML/CSS/SVG).
- If a brief needs a UI inside the photo (e.g. a helm display), generate the device/scene **without**
  legible UI and composite the real HTML/CSS UI in the page or in a vector layer reviewed by design.

### 6.4 Technical diagrams

Diagrams (hub data flow, sensor topology, PILOT safety boundary) are **SVG authored from the real
architecture**, not generated images: correct connector names, correct protocol labels
(Signal K / NMEA 2000 statements only if verified), explicit "not to scale" and "illustrative"
where needed, and no implied certification. AI-generated diagrams are rejected by default.

---

## 7. Legal, provenance and licensing

### 7.1 Classification is a factual claim

| Class | Meaning | Allowed use |
|---|---|---|
| `CONCEPT` | Illustration of an intended product/experience. No physical counterpart verified. | Marketing pages, always with a visible "concept render" label. Never in a buying flow as if it were the shipped item. |
| `REAL_PRODUCT` | Depicts an actually existing, tested unit/installation with recorded evidence. | Only after MC-13 verification evidence exists and the Lead/product owner approves. Requires photo provenance, date, place, unit ID. |
| `DIAGRAM` | Authored vector explanation of the real architecture. | Technical/professional pages; must carry "illustrative" if not engineering-verified. |
| `BRAND` | Logo/wordmark/identity assets. | Usable only as **proposed** MAREA identity; no ® symbol, no "registered trademark" wording until clearance. |

### 7.2 AI images are not evidence

- An AI-generated image is **never** evidence that hardware exists, that an installation has been
  performed, that a test passed, that a certification was obtained, or that a partner approved
  anything. It must not be placed next to a claim in a way that implies verification.
- AI images may not be used in: legal pages, warranty terms, price/SKU galleries for purchasable
  products, support/manual diagrams presented as instructions, or any "verified installation"
  claim.
- `M00-DISCOVERY-BASELINE.md` requires evidence classes not to be collapsed. A synthetic image is
  its own class: **illustrative synthesis**, not photographic evidence.

### 7.3 Rights, provenance and terms checklist (per asset)

- [ ] Provider account terms reviewed for **commercial use and output ownership**; `terms_version`
      and the date recorded in the manifest.
- [ ] Human authorization for the batch recorded (`rights.attested_by`, `attested_at`).
- [ ] Input images (if editing) are owned/licensed by EMBARCARTE; no third-party photo uploaded to a
      provider without a compatible licence.
- [ ] No third-party trademark, trade dress, chart, music cue, person's likeness or registered
      certification mark appears in the output.
- [ ] EU synthetic-content transparency question verified with counsel: whether publishing
      AI-generated marketing imagery requires disclosure (EU AI Act transparency provisions), and in
      what form. **Open legal question — do not assert an answer here.**
- [ ] Trademark status of MAREA acknowledged as pending; brand assets marked PROPOSED.
- [ ] Existing third-party images in the repository: `src/app/core/images.ts` uses remote Unsplash
      URLs under the Unsplash licence (hotlinked). They are **not** MAREA assets and must be replaced
      by first-party licensed files before any page claims them as our own.
- [ ] File provenance: `sha256` recorded; asset stored only in the repo (or the approved asset store),
      not in a personal cloud folder.

### 7.4 Licensing of tooling

The verified local encoder path (ffmpeg with libwebp/libaom-av1) is used as an installed system
tool, not redistributed. If a future script is added to the repository, its licence and supply-chain
review belongs to the Lead (new-dependency policy in `AGENTS.md`).

---

## 8. Optimization targets and CSS/SSR integration

### 8.1 Formats

| Format | Role | Notes |
|---|---|---|
| **AVIF** | Primary modern format for photographic assets | Smallest; supported by current evergreen browsers. Encoder verified locally (libaom-av1). AVIF support means `<picture>` with an `<img>` fallback is mandatory. |
| **WebP** | Universal contemporary fallback (also the repository's existing format) | Verified local encoder (libwebp). Existing `public/images/*.webp` files stay as-is. |
| **JPEG** | Only for consumers that cannot take WebP/AVIF (e.g. some OG/email flows) | OG images are shared by `SeoService` and must be 1200×630. |
| **SVG** | Diagrams, icons, brand marks | Hand-authored; never a generated raster. |

Provider output formats documented by the provider are `png`/`jpeg`/`webp` (Section 2.4). AVIF is
therefore a **local post-processing step**, never requested from the API.

### 8.2 Responsive widths (PROPOSED, aligned to layout)

| Usage | Master | Derived widths | Notes |
|---|---|---|---|
| Full-bleed hero (LCP) | 2048w or 1536×1024-class | 960, 1280, 1600, 1920 | eager + `fetchpriority="high"`, no lazy loading, poster-sized budget |
| Section/editorial image | 1600w | 640, 960, 1280 | lazy |
| Card / family tile (`.card-image`, `.home-product img`) | 1024w | 400, 640, 960 | fixed aspect ratio; CSS aspect-ratio or width/height |
| Detail gallery image (`.product-photo`) | 1600w | 640, 960, 1280 | 4:3 or 3:2 |
| Thumbnail/admin (`.thumb`) | 320w | 160, 320 | tiny |
| OG/social | 1200×630 exactly | — | `SeoService` hard-codes these dimensions |
| Diagram (SVG) | vector | — | no raster fallback unless a provider requires it |

`srcset`/`sizes` must reflect the real layout (`1160px` shell, `min(1160px, 100% - 48px)`); do not
emit a 5-width srcset for a 320 px card.

### 8.3 Byte budgets (release targets, per delivered file)

| Asset role | Target | Hard limit |
|---|---|---|
| LCP hero AVIF/WebP | ≤ 120 kB @1920w | ≤ 200 kB |
| Section image | ≤ 80 kB @1280w | ≤ 140 kB |
| Card image | ≤ 45 kB @960w | ≤ 80 kB |
| Thumbnail | ≤ 15 kB @320w | ≤ 25 kB |
| Product detail | ≤ 120 kB @1280w | ≤ 180 kB |
| OG image | ≤ 120 kB (JPEG/WebP) | ≤ 200 kB |
| Total images per page | ≤ 400 kB | ≤ 600 kB |

Current repository baselines (VERIFIED, for comparison): `home-hero.webp` 52 kB,
`home-tech.webp` 5 kB, `home-experiences.webp` 8 kB, `home-transfers.webp` 7 kB,
`home-anemometro.webp` 2 kB, `home-veleta.webp` 1 kB, `home-piloto.webp` 2 kB.
**`og-image.png` is 274 kB — already above the proposed 120 kB target**; it is a pre-existing
condition to flag (fixing it is a `public/` change outside this milestone's write scope).

### 8.4 SSR / CLS / LCP rules

- Always declare intrinsic dimensions (`width`/`height` attributes or CSS `aspect-ratio`) so the
  server-rendered HTML reserves space; the existing styles already reserve card heights
  (`.card-image { height: 215px }`, `.home-product img { aspect-ratio: 1.94 }`).
- LCP candidate: one hero per page, eager, `fetchpriority="high"`, preloaded only if truly the LCP
  element. Everything below the fold: `loading="lazy"` + `decoding="async"`.
- Angular SSR: images are plain `<img>`; do not add client-only JS lazyloaders. `NgOptimizedImage`
  (`ngSrc`) is **not** used in this repository today — adopting it would be a separate, reviewed
  change, so the pipeline assumes manual `srcset`/`<picture>` markup.
- CSS background images (used by `.home-hero-image`, `.hero-image`, `.card-image`) cannot carry
  `srcset`; for MAREA prefer `<img>`/`<picture>` markup. If a background must remain, it must meet the
  same byte budget and accessible-name contract (`role="img"` + `aria-label`, as in `delivery.ts`).

### 8.5 Alt text contract

- Content image: localized, descriptive, ≤ 125 characters, no "image of", no keyword stuffing,
  no claims ("certified", "best") that the image does not prove.
- Purely decorative duplicate (the existing home pattern `alt=""`): `decorative: true` in the
  manifest and `alt=""` in markup, so axe's `image-alt` rule still passes.
- Hero-as-background: `role="img"` + `[attr.aria-label]` with the localized `imageAlt` value.
- ES and EN alt text are both mandatory; missing translation is a `FAIL` (i18n dictionaries and
  `npm run test:i18n` enforce parity elsewhere, but alt text lives in content objects and must be
  reviewed manually).

### 8.6 Existing checks and the gaps this pipeline must close

| Check | What it proves | Asset gap |
|---|---|---|
| `npm run build` | Angular SSR/prerender compiles; `public/**` copied | Does not validate that referenced asset paths exist |
| `npm run test:performance` (`scripts/check-performance.mjs`) | Lab LCP/CLS/image/font transfer bytes on `/`, `/en/shop`, `/en/shop/e2e-hub`, desktop + throttled mobile. **Measures only: no thresholds, not a CI gate** — budget compliance is a reviewed comparison against the recorded baseline | `image_transfer_bytes` regex is `\.(png\|jpe?g\|webp\|svg\|ico)` — **AVIF bytes are not counted**; adding AVIF without extending the regex would silently under-report. Also records LCP element (`lcp_element`) so the hero choice is auditable |
| `npm run test:e2e` (`e2e/accessibility.spec.ts`) | axe WCAG A/AA on 7 public pages + account, incl. `image-alt` | Assumes pages exist; new MAREA routes must be added to that page list when implemented |
| `e2e/responsive.spec.ts` | No horizontal overflow at representative viewports | Image aspect/cropping regressions surface here |
| `npm run test:seo` | canonical/hreflang/JSON-LD/sitemap | Does not verify OG image dimensions/bytes |
| Manifest (this pipeline) | Provenance, rights, alt, budget, checks per asset | **PROPOSED — not implemented** |

Two concrete follow-ups this creates for the page owners (not this milestone): extend the
performance script's image regex to include `avif`, and add `og:image` dimension/byte sanity to the
SEO check. Both are code changes outside `docs/marea/assets/`.

---

## 9. Cost and approval policy

### 9.1 Preconditions before the first chargeable call

1. **Written human authorization** naming: approver, date, maximum spend in USD for the batch,
   maximum number of assets, and the allowed model(s).
2. **Credentials** placed in the approved secret store (never in the repository, docs, chat, or
   shell history). Only the variable name may be referenced (`OPENAI_API_KEY`).
3. **Cost estimate recorded** from the official provider cost documentation for the exact
   model + quality + size + count, attached to the task. This document deliberately contains **no
   price figures** — they would be stale or invented.
4. **Asset count frozen** (briefs approved in the manifest) so spend cannot drift.
5. **Legal checks** from Section 7.3 acknowledged; brand assets additionally blocked until
   trademark clearance status is known.

### 9.2 Operating rules

- One batch at a time; reconcile actual spend against the estimate before starting a second batch.
- Retry cap: 3 generations per brief (Section 5, step 5). Retries are a cost event, not a free loop.
- No "exploratory" generation outside an approved brief.
- Record real usage/cost per asset in the manifest `provider` block when the provider returns it.
- A failed or rejected image is still spend. Rejections must be logged, not silently regenerated.

### 9.3 Stop conditions (fail closed)

Stop the batch immediately and escalate if any of these is true:

- estimated or observed cost would exceed the authorized cap;
- an API key is missing, rotated, or exposed (rotate + incident note, do not proceed);
- the provider returns an error indicating account entitlement for the chosen model is missing;
- the provider's terms, output formats or model availability differ from Section 2.4 on the day of
  use;
- a generated image contains a certification mark, a real brand, a recognizable person, or text that
  looks like a factual/legal claim;
- someone requests "a photo of the real product" for a product that is still CONCEPT;
- trademark clearance is required for the framing (e.g. logo lockup used as if registered) and is not
  available.

---

## 10. Open blockers and exact next action

| ID | Blocker | Status | Owner of the unblock | Exact next action |
|---|---|---|---|---|
| B1 | No image-generation capability in the installed Harness runtime (0.2.1-rc.5) | BLOCKED (external tooling decision) | Human + Lead | Decide: (a) authorized local script calling the OpenAI Images API from an approved environment, with its own write scope (`scripts/`) and supply-chain review, or (b) a future Harness plugin — plugin route requires an explicit install/audit task. Do not install anything in MC-01. |
| B2 | No provider credentials (`OPENAI_API_KEY` absent; all other image keys absent) | BLOCKED (credentials) | Human (account owner) | Add the key to the approved secret store; never to the repo. Confirm which account owns commercial-use rights. |
| B3 | No budget authorization | BLOCKED (authorization) | Human (budget owner) | Provide a written authorization: approver, date, USD cap, asset count, allowed models. |
| B4 | Account entitlement to `gpt-image-2.5-sunburst` / `gpt-image-2.5-flare` unverified | NOT VERIFIED (only the identifiers are documented) | Human + Lead | On the first authorized call, record actual model acceptance/errors and the returned usage in the manifest. |
| B5 | MAREA trademark clearance pending (existing US `Marea Marine` risk signal) | BLOCKED (legal) | Human + counsel | No brand asset is produced or published as registered until clearance advice exists. Marketing imagery may proceed only as clearly labelled PROPOSED/CONCEPT. |
| B6 | `public/assets/` does not exist and this milestone may not create it | NOT STARTED (write scope) | Lead | When a page needs its first real asset, create a task with exclusive write scope `public/assets/marea/**` plus the page's own scope; never let the asset owner create it implicitly. |
| B7 | Performance check does not count AVIF bytes; `og-image.png` (274 kB) exceeds the proposed OG budget | NOT STARTED (code/data change outside scope) | Lead / page owner | Schedule a small change to `scripts/check-performance.mjs` (add `avif` to the image regex) and an OG image re-export at ≤120 kB 1200×630. |
| B8 | No manifest validator/consumer exists | PROPOSED | Lead | Optional small Node script (future task) that validates manifest fields and referenced file existence; not needed to start generating. |

**Single exact next action to enable real generation:**

> The human owner issues a written authorization that (i) names the approver and date, (ii) states a
> USD cap and a maximum asset count for one pilot batch, (iii) confirms commercial-use rights under
> the provider account, and (iv) confirms the pilot is **CONCEPT imagery only, no brand-registration
> claims**; and places `OPENAI_API_KEY` in the approved secret store. The Lead then opens one
> implementation task with write scopes `public/assets/marea/**` + `scripts/` (or a dedicated asset
> tool), and generation starts with exactly **one pilot asset** (`MR-COR-001`, corporate hero,
> 1536×1024 master → AVIF/WebP derivatives) so cost, quality and the whole manifest → integration →
> budget loop are proven before any batch.

---

## Appendix A — Evidence log (2026-10-30)

| Claim | Status | Evidence |
|---|---|---|
| Runtime has no image-generation package | VERIFIED | Electron-as-Node `fs.readdirSync` over the installed `@deepseek-ai` package set in `resources/app.asar/dsh/node_modules`: 307 packages; only `dsh-client-ui-renderer`, `dsh-client-ui-sidebar-browser`, `dsh-compaction-image-offload` match an image/media/render/browser filter |
| No image API credentials configured | VERIFIED | Environment inspection (process/user/machine) for `OPENAI_API_KEY`, `STABILITY_API_KEY`, `REPLICATE_API_TOKEN`, `AZURE_OPENAI_API_KEY`, `GEMINI_API_KEY`, `ANTHROPIC_API_KEY`, `HF_TOKEN`, `IMAGE_API_KEY`: all unset. User registry contains `DEEPSEEK_API_KEY` (name only) |
| `web_fetch` could not retrieve the OpenAI guide | VERIFIED (failure) | `web_fetch` → `HTTP 404` from `https://api.deepseek.com/v1/tools/fetch` for both guide URLs; `web_fetch` on `https://example.com` → HTTP 200 in the same session |
| OpenAI guide retrieved by fallback HTTP GET | VERIFIED | PowerShell `Invoke-WebRequest` GET, HTTP 200, 1,257,955 bytes, no credentials sent |
| `gpt-image-2.5-sunburst` / `gpt-image-2.5-flare` documented | DOCUMENTED (external) | Page states the API generates/edits images "using `gpt-image-2.5-sunburst` and `gpt-image-2.5-flare`"; quality `low..max`; sizes `1024x1024`, `1536x1024`, `1024x1536`; formats `png/jpeg/webp` |
| Account entitlement to those models | NOT VERIFIED | No credential, no call |
| Prices | NOT RECORDED (deliberate) | Page documents a cost estimator; no figure copied |
| Local WebP/AVIF encoding works | VERIFIED | ffmpeg 7.1 (libwebp, libaom-av1): favicon.ico → `.webp` 1,144 B and `.avif` 1,272 B, exit 0; ImageMagick/cwebp/avifenc/sharp absent |
| Existing image conventions | VERIFIED | `angular.json` assets glob; `public/images/*.webp`; `src/app/core/images.ts`; `home.content.ts`; `product-image.ts`; `styles.scss` tokens; `seo.service.ts` OG 1200×630; `scripts/check-performance.mjs` regex |
| `public/assets/` exists | VERIFIED ABSENT | Repository file listing: `public/` contains only favicons/icons/OG/robots/manifest and `images/` |
| Branch/base | VERIFIED | `git rev-parse --abbrev-ref HEAD` → `feature/marea-mc01-agent-foundation`; HEAD `092ae74` at audit time (base commit) |
| Graphify map update after docs change | PENDING (Lead) | Policy requires `graphify update .` after documentation changes; `graphify-out/graph.json` exists and the binary is at `C:\Users\Admin\.local\bin\graphify.exe`. This milestone's write scope is `docs/marea/assets/` only, so the graph refresh is left to the Lead's integration step |

## Appendix B — Deferred decisions (recorded, not decided here)

1. Whether to adopt a visible on-page "concept render" badge label versus a per-image caption.
2. Whether the first batch uses Sunburst, Flare, or splits by asset class (documented guidance:
   Sunburst for editing precision, Flare for fast everyday generation).
3. Whether AVIF becomes primary across the site or only for new MAREA assets.
4. Whether to introduce `NgOptimizedImage` (`ngSrc`) site-wide instead of manual `<picture>`.
5. Whether a small asset-manifest validator script should be added to standard gates.
