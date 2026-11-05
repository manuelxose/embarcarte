#!/usr/bin/env python3
"""Independent arithmetic / quoted-value audit of MC-04 D-06/D-07/D-17 claims.

Every number is recomputed from the real files or the real command output captured by the
reviewer (raw/typography-run2-full.txt, raw/typography-json.json) and compared with the
value printed in the author document. Catches pasted/expected-output and count errors.
"""
import hashlib
import json
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[6]
RAW = Path(__file__).resolve().parent.parent / "raw"
OUT = RAW / "claims-audit.json"


def ratio(hex1, hex2):
    def ch(c):
        s = c / 255
        return s / 12.92 if s <= 0.03928 else ((s + 0.055) / 1.055) ** 2.4

    def lum(h):
        h = h.lstrip("#")
        r, g, b = (int(h[i : i + 2], 16) for i in (0, 2, 4))
        return 0.2126 * ch(r) + 0.7152 * ch(g) + 0.0722 * ch(b)

    a, b = lum(hex1), lum(hex2)
    hi, lo = max(a, b), min(a, b)
    return round((hi + 0.05) / (lo + 0.05), 4)


checks = []


def check(id, claim_desc, claimed, computed, tolerance=0.005, source=""):
    ok = None
    if isinstance(claimed, (int, float)) and isinstance(computed, (int, float)):
        ok = abs(claimed - computed) <= tolerance
    else:
        ok = claimed == computed
    checks.append(
        {
            "id": id,
            "claim": claim_desc,
            "claimed": claimed,
            "computed": computed,
            "match": ok,
            "source": source,
        }
    )


# ---- D-07 COLOUR-SYSTEM numeric claims ----
colour_doc = (ROOT / "docs/marea/brand/COLOUR-SYSTEM.md").read_text(encoding="utf-8")
# Focus ring F-1 resolution: #0f5f8c on #ffffff / #f2f9fd / #eaf7ff = 6.92 / 6.50 / 6.34
check("C-01", "focus #0f5f8c on #ffffff", 6.92, ratio("#0f5f8c", "#ffffff"))
check("C-02", "focus #0f5f8c on #f2f9fd", 6.50, ratio("#0f5f8c", "#f2f9fd"))
check("C-03", "focus #0f5f8c on #eaf7ff", 6.34, ratio("#0f5f8c", "#eaf7ff"))
check("C-04", "F-1 old focus #8fd2f5 on #ffffff", 1.6529, ratio("#8fd2f5", "#ffffff"))
check("C-05", "F-1 old focus #8fd2f5 on #eaf7ff", 1.5149, ratio("#8fd2f5", "#eaf7ff"))
check("C-06", "F-5 sea #1776ad on #ffffff", 4.9631, ratio("#1776ad", "#ffffff"))
check("C-07", "F-5 sea #1776ad on #f2f9fd", 4.6663, ratio("#1776ad", "#f2f9fd"))
check("C-08", "F-6 muted #57708a on #f2f9fd", 4.8275, ratio("#57708a", "#f2f9fd"))
check("C-09", "F-6 muted #57708a on #eaf7ff", 4.7059, ratio("#57708a", "#eaf7ff"))
check("C-10", "F-7 badge ok #27775c on #e2f5ee", 4.7762, ratio("#27775c", "#e2f5ee"))
check("C-11", "F-7 badge danger #b4423a on #fbe9e7", 4.7371, ratio("#b4423a", "#fbe9e7"))
check("C-12", "day textSecondary #4a6579 on raised #eaf7ff", 5.61, ratio("#4a6579", "#eaf7ff"))
check("C-13", "day textMeta #52697f on raised #eaf7ff", 5.22, ratio("#52697f", "#eaf7ff"))
check("C-14", "day dataPrimary #17365d on raised #eaf7ff", 11.18, ratio("#17365d", "#eaf7ff"))
check("C-15", "day stateCritical #a32b22 on raised #eaf7ff", 6.58, ratio("#a32b22", "#eaf7ff"))
check("C-16", "day stateSafe #1f5f49 on raised #eaf7ff", 6.90, ratio("#1f5f49", "#eaf7ff"))
check("C-17", "day stateStale #55646f on raised #eaf7ff", 5.60, ratio("#55646f", "#eaf7ff"))
check("C-18", "day chartGrid #748d9f on raised #eaf7ff", 3.18, ratio("#748d9f", "#eaf7ff"))
check("C-19", "night textPrimary #8fd3f5 on raised #1a3343", 8.01, ratio("#8fd3f5", "#1a3343"))
check("C-20", "night stateCritical #ff9b8f on raised #1a3343", 6.47, ratio("#ff9b8f", "#1a3343"))
check("C-21", "night stateWarning #ffc46b on raised #1a3343", 8.36, ratio("#ffc46b", "#1a3343"))
check("C-22", "night disabled #7d8f9d on raised #1a3343", 3.93, ratio("#7d8f9d", "#1a3343"))
check("C-23", "sunlight textPrimary #0b2440 on raised #eaf7ff", 14.36, ratio("#0b2440", "#eaf7ff"))
check("C-24", "sunlight chartGrid #5f7a8e on raised #eaf7ff", 4.13, ratio("#5f7a8e", "#eaf7ff"))

# token sha256 printed in the doc output
token_bytes = (ROOT / "docs/marea/brand/tokens/marea-instrument-tokens.proposed.json").read_bytes()
token_sha = hashlib.sha256(token_bytes).hexdigest()
doc_sha = re.search(r"Token sha256: ([0-9a-f]{64})", colour_doc)
check(
    "C-25",
    "token sha256 printed in COLOUR-SYSTEM §10 output",
    doc_sha.group(1) if doc_sha else "(absent)",
    token_sha,
    source="sha256 of the token file now",
)

# ---- D-06 TYPOGRAPHY quoted values ----
typo_doc = (ROOT / "docs/marea/brand/TYPOGRAPHY-SYSTEM.md").read_text(encoding="utf-8")
run_txt = (RAW / "typography-run2-full.txt").read_text(encoding="utf-8")
json_txt = run_txt[run_txt.find("JSON (machine-readable):") + len("JSON (machine-readable):") :]
report = json.loads(json_txt)

minus = report["browserMeasurements"]["minus"]
check("T-01", "DM Sans minus U+2212 px (doc 57.906)", 57.906, round(minus["MareaDMProbe"]["minusU2212"], 3))
check("T-02", "DM Sans hyphen px (doc 57.609)", 57.609, round(minus["MareaDMProbe"]["hyphenU002D"], 3))
check("T-03", "Manrope minus U+2212 px (doc 54.000)", 54.0, round(minus["MareaManropeProbe"]["minusU2212"], 3))
check("T-04", "Manrope hyphen px (doc 42.000)", 42.0, round(minus["MareaManropeProbe"]["hyphenU002D"], 3))
check("T-05", "Manrope zero px (doc 65.813; raw width 65.8125 -> half-up 3 dp)", 65.813, round(minus["MareaManropeProbe"]["zero"], 4), tolerance=0.001)

# doc §2 table: unitsPerEm, builds, tnum counts, woff2 bytes/sha prefixes
for pkg in report["packages"]:
    doc_units = 1000 if pkg["id"] == "dm-sans" else 2000
    latin = next(f for f in pkg["fontFaces"] if "latin-wght-normal" in f["file"] and "latin-ext" not in f["file"])
    check(f"T-06-{pkg['id']}", f"{pkg['id']} latin unitsPerEm", doc_units, latin["unitsPerEm"])
    check(
        f"T-07-{pkg['id']}",
        f"{pkg['id']} woff2 bytes printed in §2",
        36932 if pkg["id"] == "dm-sans" else 24836,
        latin["bytes"],
    )
    check(
        f"T-08-{pkg['id']}",
        f"{pkg['id']} wo2 sha256 prefix printed in §2",
        "9fea608a947e6702" if pkg["id"] == "dm-sans" else "a30ddcd349703aff",
        latin["sha256"][:16],
    )
    with_tnum = [b for b in pkg["builds"] if b["hasTnum"]]
    check(
        f"T-09-{pkg['id']}",
        f"{pkg['id']} builds with tnum (doc {'0 of 12' if pkg['id']=='dm-sans' else '1 of 6'})",
        0 if pkg["id"] == "dm-sans" else 1,
        len(with_tnum),
    )

# LICENSE line counts (doc claims 93 lines each)
for f in [
    ROOT / "node_modules/@fontsource-variable/dm-sans/LICENSE",
    ROOT / "node_modules/@fontsource-variable/manrope/LICENSE",
]:
    n = len(f.read_text(encoding="utf-8").splitlines())
    check(f"T-10-{f.parent.name}", f"{f.parent.name} LICENSE line count (doc claims 93)", 93, n)

# ---- D-17 disposition count ----
acc = (ROOT / "docs/marea/brand/MC-04-ACCESSIBILITY-EVIDENCE.md").read_text(encoding="utf-8")
qa_rows = re.findall(r"^\| \*\*QA-(\d\d)\*\* \|[^|]*\| `([A-Z_() ]+?)(?: \([^`]*\))?`", acc, re.MULTILINE)
statuses = {}
for num, status in qa_rows:
    statuses.setdefault(status.strip(), []).append(num)
stated = re.search(r"Disposition count:\*\* `PASS` (\d+) \S+ `PARTIAL` (\d+) \S+ `NOT_TESTED` (\d+) \S+ `BLOCKED` (\d+)", acc)
computed_counts = {
    "PASS": len(statuses.get("PASS", [])),
    "PARTIAL": len(statuses.get("PARTIAL", [])),
    "NOT_TESTED": len(statuses.get("NOT_TESTED", [])),
    "BLOCKED": len(statuses.get("BLOCKED", [])),
}
check("A-01", "QA rows found", 28, len(qa_rows))
if stated:
    for idx, key in enumerate(["PASS", "PARTIAL", "NOT_TESTED", "BLOCKED"]):
        check(f"A-0{idx+2}", f"disposition count {key} (doc vs actual rows)", int(stated.group(idx + 1)), computed_counts[key])

report_out = {
    "generatedBy": "docs/marea/brand/evidence/review/tools/claims-audit.py",
    "checks": checks,
    "qaStatusActual": {k: v for k, v in statuses.items()},
    "mismatches": [c for c in checks if not c["match"]],
}
OUT.write_text(json.dumps(report_out, indent=2), encoding="utf-8")
print("checks:", len(checks), "mismatches:", len(report_out["mismatches"]))
for m in report_out["mismatches"]:
    print("  MISMATCH", m)
print("QA statuses:", {k: len(v) for k, v in statuses.items()})
print("QA ids:", [n for _, n in qa_rows])
