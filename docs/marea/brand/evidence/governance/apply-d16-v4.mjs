// =============================================================================
// MC-04 D-16 Rev.4 — apply the FROZEN v2 delete-and-rebind into the dossier
// Owner: Governance. Writes ONLY:
//   docs/marea/brand/ORIGINALITY-AND-PRIOR-ART-CHECK.md
// It splices the new §9.7 block (read from _d16-9.7-v4.md, itself generated from
// the helper-printed binding table) and updates the status/pointer lines that
// referred to the v1 binding. Idempotent guards: it aborts if markers are absent
// or if the new block is already present.
//
// Run: node docs/marea/brand/evidence/governance/apply-d16-v4.mjs
// =============================================================================

import { readFileSync, writeFileSync } from 'node:fs';

const DOSSIER = 'docs/marea/brand/ORIGINALITY-AND-PRIOR-ART-CHECK.md';
const NEW_BLOCK = 'docs/marea/brand/evidence/governance/_d16-9.7-v4.md';

let text = readFileSync(DOSSIER, 'utf8');
const originalBytes = Buffer.byteLength(text);

function replaceOnce(label, from, to) {
  const count = text.split(from).length - 1;
  if (count !== 1) {
    console.log(`ABORT ${label}: expected exactly 1 occurrence, found ${count}`);
    process.exit(1);
  }
  text = text.split(from).join(to);
  console.log(`ok   ${label}`);
}

const startMarker = '### 9.7 BOUND FILES';
const endMarker = '### 9.8 Binding state after FROZEN';
const start = text.indexOf(startMarker);
const end = text.indexOf(endMarker);
if (start === -1 || end === -1 || end <= start) {
  console.log('ABORT: §9.7/§9.8 markers not found in the expected order');
  process.exit(1);
}
if (text.slice(start, end).includes('(delete-and-rebind, 2026-10-30T19:11:46+01:00)')) {
  console.log('ABORT: v2 binding block already applied');
  process.exit(1);
}
const newBlock = readFileSync(NEW_BLOCK, 'utf8').replace(/\s*$/, '\n\n');
text = text.slice(0, start) + newBlock + text.slice(end);
console.log('ok   spliced §9.7 (v2 block)');

// --- status/pointer lines that referenced v1 --------------------------------
replaceOnce(
  '§0 revision row',
  '| Revision | **Rev. 3 — FROZEN binding executed. Shortlist recorded (B + C, A dropped); internal preference **B — Bearing index** (`PREFERRED_PROVISIONAL` only); 21 files bound with helper-printed SHA-256/bytes/viewBox (§9.7); material finding: the frozen MASTER lockups/mark are built on the **C** symbol, not B — flagged for the Lead, unresolved (§9.7.2). Only the professional check remains open.** |',
  '| Revision | **Rev. 4 — FROZEN v2 delete-and-rebind after the master set was reissued from construction B. Shortlist recorded (B + C, A dropped); internal preference **B — Bearing index** (`PREFERRED_PROVISIONAL` only); **35 files bound** with helper-printed SHA-256/bytes/viewBox (§9.7); the v1 C-based master finding is **CLOSED with evidence** and its history preserved (§9.7.2/§9.7.3). Only the professional check remains open.** |'
);

replaceOnce(
  '§9 bound-files row',
  '| Bound source files (path / bytes / SHA-256 / viewBox) | **BOUND — §9.7** (21 files, helper-printed, bound 2026-10-30T18:48:48+01:00 after the FROZEN signal) |',
  '| Bound source files (path / bytes / SHA-256 / viewBox) | **BOUND v2 — §9.7** (35 files, helper-printed, rebound 2026-10-30T19:11:46+01:00 after the B reissue; the v1 table is archived, not edited) |'
);

replaceOnce(
  '§4.3 B row',
  '| Territory B — Bearing index (**shortlisted; internal preference `PREFERRED_PROVISIONAL` only**) | same | construction prototype exists (`territory-b-construction.svg`); **BOUND after FROZEN** — five B files in §9.7 |',
  '| Territory B — Bearing index (**shortlisted; internal preference `PREFERRED_PROVISIONAL` only**) | same | construction prototype exists (`territory-b-construction.svg`); **BOUND v2 after FROZEN** — five B files in §9.7, and the master set is now reissued from B |'
);

replaceOnce(
  '§4.3 C row',
  '| Territory C — Signal trunk (**shortlisted strategic alternative; not preferred**) | same | construction prototype exists (`territory-c-construction.svg`); **BOUND after FROZEN** — five C files in §9.7; carries the documented bar-chart/equaliser reading failure at app-icon scale (§9.4a) |',
  '| Territory C — Signal trunk (**shortlisted strategic alternative; not preferred**) | same | construction prototype exists (`territory-c-construction.svg`); **BOUND v2** — five C files in §9.7 (hashes byte-identical to v1); carries the documented bar-chart/equaliser reading failure at app-icon scale (§9.4a) |'
);

replaceOnce(
  '§4.3 master row',
  '| Master wordmark / lockups | `docs/marea/brand/assets/logo/` | **exist**: `marea-lockup-primary.svg`, `marea-lockup-mono.svg`, `marea-lockup-reversed.svg`, `marea-wordmark.svg`, `marea-mark-compact.svg`, `marea-mark-reduced-16.svg`, `marea-construction-grid.svg`, six family lockups. Not bound: the lockup alignment fix is part of the C preference conditions (§9) |',
  '| Master wordmark / lockups | `docs/marea/brand/assets/logo/` | **reissued from construction B and bound v2**: `marea-wordmark.svg`, `marea-lockup-primary/mono/reversed.svg`, `marea-mark-compact.svg`, `marea-mark-reduced-16.svg`, `marea-construction-grid.svg`, and the nine `family/marea-family-*-lockup.svg` — see §9.7 |'
);

replaceOnce(
  '§9.8 done paragraph',
  '**Done.** The 21 files in §9.7 were bound at **2026-10-30T18:48:48+01:00**, after the Lead\'s FROZEN signal,\nthrough the read-only helper; the run captured every helper output in\n`evidence/governance/MC-04-D16-BINDING-EVIDENCE.txt` and reports `helper failures: 0`. No hash was typed by\nhand, no file was bound by name before it was confirmed final, and no earlier value had to be deleted.',
  '**Done.** The **v2** binding of the 35 files in §9.7 was performed at **2026-10-30T19:11:46+01:00**, after the\nLead\'s FROZEN signal and after the master set was reissued from construction B. It replaces the v1 binding\n(2026-10-30T18:48:48+01:00, archived) wholesale by **delete-and-rebind**: the old values were not edited in\nplace, they remain in `MC-04-D16-BINDING-EVIDENCE-v1-2026-10-30T184848.txt`. The v2 run captured every helper\noutput in `MC-04-D16-BINDING-EVIDENCE.txt` and reports `helper failures: 0`. No hash was typed by hand and no\nfile was bound by name before it was confirmed final.'
);

// --- change log -------------------------------------------------------------
const changeLogRow = [
  '| 2026-10-30 19:11 | **Rev. 4 — FROZEN v2 delete-and-rebind.** After the Lead recorded preference B, IdentityVector reissued the whole master set from construction B (arc weight 3.2 units = 10.4 % of ink height, new measured geometry, rewritten `<desc>`) and AssetProduction re-rendered with `--all`; all target files changed at ~19:10, after the v1 binding. Governance rebound **35 files** at 2026-10-30T19:11:46+01:00 through the helper (`helper failures: 0`): B ×5, C ×5 (hashes unchanged), master wordmark + 3 lockups + compact mark + reduced-16 + construction grid, the nine family lockups, 3 diagrams, 3 specimens, and 3 regenerated territory evidence files. v1 values were **not edited in place** — archived as `MC-04-D16-BINDING-EVIDENCE-v1-2026-10-30T184848.txt`; the live table was replaced wholesale. **§9.7.2 finding CLOSED with evidence**: the master set is now B-based (lockups 704.83×200, compact 32×32 ink 29.66×30.0, reduced-16 ink 15.47×15.3, family viewBoxes 853.66–1165.32×200; master hashes all differ from v1). Shortlist (B + C), drop (A), preference B, reading-test outcomes and all four status fields unchanged. Final frozen-tree scan re-run: no failure-level prohibited pattern; F-2 remains open/out-of-scope. |',
].join('\n');

const annexMarker = '## Annex A — source retrieval log';
replaceOnce('change log anchor', annexMarker, changeLogRow + '\n\n' + annexMarker);

// --- end line ---------------------------------------------------------------
replaceOnce(
  'end line',
  '*End of Rev. 3. The shortlist, the internal preference and the FROZEN file binding are recorded in §9.\nTwo things remain outside this dossier\'s power: the professional originality/prior-art check (PENDING) and\nthe reissue of the master lockups from the preferred B construction (§9.7.2). This document remains\nPENDING until a professional check is commissioned, received and recorded by the company. No agent of this\nprogramme can close it.*',
  '*End of Rev. 4. The shortlist, the internal preference, the FROZEN v2 binding and the closed master-artwork\nfinding are recorded in §9. This document remains PENDING until a professional originality/prior-art check\nis commissioned, received and recorded by the company. No agent of this programme can close it.*'
);

writeFileSync(DOSSIER, text);
const finalBytes = Buffer.byteLength(text);
const hashes = (text.match(/\b[0-9a-f]{64}\b/gi) || []).length;
console.log(`DONE bytes ${originalBytes} -> ${finalBytes}; sha256 values in dossier: ${hashes}`);
