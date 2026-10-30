#!/usr/bin/env python3
"""Verify the §9.7 source-file binding table in ORIGINALITY-AND-PRIOR-ART-CHECK.md (Rev.3).

Every row claims a real path, byte size, SHA-256 and (for SVG) viewBox. This recomputes all
four from disk, so an invented hash or a stale binding is caught. Also verifies the declared
"all 21 files" count and prints the summary.
"""
import hashlib
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[6]
DOC = ROOT / "docs/marea/brand/ORIGINALITY-AND-PRIOR-ART-CHECK.md"
OUT = Path(__file__).resolve().parent.parent / "raw" / "originality-binding-audit.json"

text = DOC.read_text(encoding="utf-8")
rows = []
# Row shape (note the leading empty first column): | | label | `path` | 3,677 | `sha256` | `0 0 41 42.5` |
for line in text.splitlines():
    m = re.search(
        r"`([^`]+\.(?:svg|html))`\s*\|\s*([\d,]+)\s*\|\s*`([a-f0-9]{64})`\s*\|\s*(`[^`]*`|N/A[^|]*)",
        line,
    )
    if not m:
        continue
    label = line.split("|")[2].strip() if line.count("|") > 3 else ""
    path, bytes_s, sha, vb = m.groups()
    rows.append({"label": label, "path": path.strip(), "bytes": int(bytes_s.replace(",", "")), "sha256": sha, "viewBox": vb.strip().strip("`")})

verified = []
issues = []
for row in rows:
    p = ROOT / row["path"]
    rec = dict(row)
    rec["exists"] = p.exists()
    if p.exists():
        b = p.read_bytes()
        rec["bytesReal"] = len(b)
        rec["shaReal"] = hashlib.sha256(b).hexdigest()
        rec["bytesMatch"] = rec["bytesReal"] == row["bytes"]
        rec["shaMatch"] = rec["shaReal"] == row["sha256"]
        if row["viewBox"] not in ("N/A (HTML document)", "N/A"):
            vb_m = re.search(r'viewBox="([^"]+)"', b.decode("utf-8", "replace"))
            rec["viewBoxReal"] = vb_m.group(1) if vb_m else None
            # Normalise whitespace/commas
            norm = lambda s: re.sub(r"\s+", " ", str(s).replace(",", " ")).strip()
            rec["viewBoxMatch"] = rec["viewBoxReal"] is not None and norm(rec["viewBoxReal"]) == norm(row["viewBox"])
        else:
            rec["viewBoxMatch"] = None
        if not rec["bytesMatch"]:
            issues.append({"path": row["path"], "issue": "bytes mismatch", "claimed": row["bytes"], "real": rec["bytesReal"]})
        if not rec["shaMatch"]:
            issues.append({"path": row["path"], "issue": "sha256 mismatch", "claimed": row["sha256"], "real": rec["shaReal"]})
        if rec["viewBoxMatch"] is False:
            issues.append({"path": row["path"], "issue": "viewBox mismatch", "claimed": row["viewBox"], "real": rec["viewBoxReal"]})
    else:
        issues.append({"path": row["path"], "issue": "file does not exist"})
    verified.append(rec)

declared_count = re.search(r"All (\d+) files", text)
report = {
    "generatedBy": "docs/marea/brand/evidence/review/tools/originality-binding-audit.py",
    "rowsFound": len(rows),
    "declaredCount": int(declared_count.group(1)) if declared_count else None,
    "countMatches": declared_count is not None and int(declared_count.group(1)) == len(rows),
    "filesVerified": sum(1 for r in verified if r["exists"]),
    "issues": issues,
    "rows": verified,
}
OUT.write_text(json.dumps(report, indent=2), encoding="utf-8")
print("rows:", len(rows), "declared:", report["declaredCount"], "countMatches:", report["countMatches"])
print("files exist:", report["filesVerified"])
print("issues:", len(issues))
for i in issues:
    print("  ", i)
# Show any hash mismatch context
for r in verified:
    if r.get("exists") and (not r.get("shaMatch") or not r.get("bytesMatch")):
        print("STALE:", r["path"], r["label"][:80])
