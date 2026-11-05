#!/usr/bin/env python3
"""Verify ORIGINALITY Rev.4 §9.7 v2 binding: all 35 rows (any file type), hashes/bytes/viewBox,
and that the C->B v1 finding is closed with history preserved. Also checks regenerated territory
evidence text for the final decision and absence of stale old scores/preference."""
import hashlib
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[6]
OUT = Path(__file__).resolve().parent.parent / "raw" / "recheck-binding-and-evidence.json"
issues = []

# --- 1. binding rows: any line with a 64-hex hash and a backticked path ---
orig = (ROOT / "docs/marea/brand/ORIGINALITY-AND-PRIOR-ART-CHECK.md").read_text(encoding="utf-8")
rows = []
for line in orig.splitlines():
    m = re.search(r"`([^`]+)`\s*\|\s*([\d,]+)\s*\|\s*`([a-f0-9]{64})`\s*\|\s*(`[^`]*`|N/A[^|]*)", line)
    if m:
        rows.append({"path": m.group(1), "bytes": int(m.group(2).replace(",", "")), "sha256": m.group(3), "viewBox": m.group(4).strip().strip("`")})
print("binding rows found:", len(rows))
verified = 0
for r in rows:
    p = ROOT / r["path"]
    if not p.exists():
        issues.append({"path": r["path"], "issue": "missing file"})
        continue
    b = p.read_bytes()
    ok_bytes = len(b) == r["bytes"]
    ok_sha = hashlib.sha256(b).hexdigest() == r["sha256"]
    ok_vb = True
    if r["viewBox"] not in ("N/A (HTML document)", "N/A"):
        m = re.search(r'viewBox="([^"]+)"', b.decode("utf-8", "replace"))
        norm = lambda s: re.sub(r"\s+", " ", str(s).replace(",", " ")).strip()
        ok_vb = bool(m) and norm(m.group(1)) == norm(r["viewBox"])
    if not (ok_bytes and ok_sha and ok_vb):
        issues.append({"path": r["path"], "bytes": ok_bytes, "sha": ok_sha, "viewBox": ok_vb})
    else:
        verified += 1
binding = {
    "rows": len(rows),
    "verified": verified,
    "declared35": bool(re.search(r"35 files bound", orig)),
    "v1Closed": bool(re.search(r"v1 C-based master finding is \*\*CLOSED with evidence\*\*", orig)),
    "historyPreserved": bool(re.search(r"§9\.7\.2/§9\.7\.3", orig)) and bool(re.search(r"v1 evidence", orig, re.I)),
    "preferenceB": bool(re.search(r"PREFERRED_PROVISIONAL`? only\)?;?[^\n]*B — Bearing index|internal preference \*\*B", orig, re.I)),
}

# --- 2. regenerated territory evidence ---
def read(rel):
    return (ROOT / rel).read_text(encoding="utf-8")

comp = read("docs/marea/brand/territories/territory-comparison.html")
reading = read("docs/marea/brand/territories/evidence/reading-test.html")
proofs = {
    n: read(f"docs/marea/brand/territories/proof/territory-{n}-proof-sheet.html")
    for n in ("a", "b", "c")
}
text_of = lambda h: re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", re.sub(r"<script.*?</script>|<style.*?</style>", " ", h, flags=re.S)))
comp_t, reading_t = text_of(comp), text_of(reading)
territory_evidence = {
    "comparison_has_B_preferred": bool(re.search(r"B — BEARING INDEX[^\n]{0,80}PREFERRED_PROVISIONAL", comp_t)),
    "comparison_has_old_C_preference": bool(re.search(r"C — SIGNAL TRUNK \(PREFERRED_PROVISIONAL", comp_t)),
    "comparison_scores_3_48": "3.48" in comp_t,
    "comparison_scores_3_68": "3.68" in comp_t,
    "comparison_scores_3_58": "3.58" in comp_t,
    "comparison_old_scores": any(s in comp_t for s in ("3.55", "3.85")),
    "reading_master_B": bool(re.search(r"MASTER — Territory B", reading_t)),
    "reading_has_C_preferred": bool(re.search(r"Territory C[^.]{0,60}PREFERRED_PROVISIONAL", reading_t)),
    "reading_old_scores": any(s in reading_t for s in ("3.55", "3.85")),
    "proofs_regenerated_timestamp": None,
}
for n, h in proofs.items():
    t = text_of(h)
    if re.search(r"PREFERRED_PROVISIONAL", t) and re.search(r"C — SIGNAL TRUNK \(PREFERRED", t):
        issues.append({"file": f"territory-{n}-proof-sheet.html", "issue": "still states C preferred"})
    if any(s in t for s in ("3.55", "3.85")):
        issues.append({"file": f"territory-{n}-proof-sheet.html", "issue": "stale old weighted score"})

# old score strings must not exist in the delivered generated territory HTMLs
stale = []
for rel in [
    "docs/marea/brand/territories/territory-comparison.html",
    "docs/marea/brand/territories/evidence/reading-test.html",
]:
    t = text_of(read(rel))
    for s in ("3.55", "3.85", "C — SIGNAL TRUNK (PREFERRED_PROVISIONAL"):
        if s in t:
            stale.append({"file": rel, "stale": s})

report = {
    "generatedBy": "docs/marea/brand/evidence/review/tools/recheck-binding-and-evidence.py",
    "binding": binding,
    "territoryEvidence": territory_evidence,
    "staleArtifacts": stale,
    "issues": issues,
}
OUT.write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")
print(json.dumps(report, indent=1)[:4000])
