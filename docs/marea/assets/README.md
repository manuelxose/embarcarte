# MAREA — visual assets documentation (index)

Status: **CONTRACT ONLY — no asset exists yet.** No `public/assets/` folder, no generated image,
no provider call, no spend. Last updated: 2026-10-30.

| File | What it is | Use it when |
|---|---|---|
| [`ASSET-PIPELINE.md`](ASSET-PIPELINE.md) | The full production contract: provider availability (verified), taxonomy mapped to the real roadmap, naming/IDs, 10-step workflow with acceptance criteria, visual standard, legal/provenance rules, optimization targets, cost/approval policy, open blockers. | Planning, authorizing, producing, reviewing or integrating any MAREA visual asset. |
| [`ASSET-MANIFEST.template.yaml`](ASSET-MANIFEST.template.yaml) | Field-by-field manifest template plus one clearly marked `EXAMPLE` entry (`MR-PRD-014`, no image exists). | Before generating anything; copy the shape, never edit the example in place. |
| [`README.md`](README.md) | This index. | Orientation only. |

Key facts to carry into any asset task:

- **MAREA is a PROPOSED brand pending trademark clearance.** A US vendor `Marea Marine` exists — a
  risk signal, not an infringement finding. No ® , no "certified", no "registered".
- **No native image generation** in the installed Harness runtime (`0.2.1-rc.5`) and **no image API
  credentials** configured (`OPENAI_API_KEY`, `STABILITY_API_KEY`, `REPLICATE_API_TOKEN`, … all
  unset). Generation is **BLOCKED** on credentials + written budget authorization.
- The OpenAI guide documents `gpt-image-2.5-sunburst` and `gpt-image-2.5-flare` as model ids
  (verified 2026-10-30 via read-only HTTP GET because `web_fetch` was unavailable). Identifiers are
  documented; **account entitlement and cost are NOT VERIFIED**.
- **AI images are never evidence** of hardware, installation, certification, stock or approval.
  Every generated image is `CONCEPT` and labelled as such until real product evidence exists.
- Local WebP/AVIF encoding is available (`ffmpeg` 7.1 with `libwebp`/`libaom-av1`); no new
  dependency is needed for optimization.
- Write scope for this folder is `docs/marea/assets/` only. Creating `public/` assets, changing
  code, or calling a paid API requires a separate, explicitly authorized milestone task
  (see `ASSET-PIPELINE.md` §10).

Exact next action to enable real generation is in `ASSET-PIPELINE.md` §10 (written human budget
authorization + credential in the approved secret store, then one pilot asset).
