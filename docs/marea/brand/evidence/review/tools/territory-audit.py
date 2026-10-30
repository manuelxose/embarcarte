#!/usr/bin/env python3
"""Independent audit of the MC-04 scored shortlist and the identity decision record.

- Recomputes the weighted arithmetic from the scores/weights printed in TERRITORY-COMPARISON.md
  and compares term-by-term with the document (catches arithmetic or copy errors).
- Cross-checks the generated territory-comparison.html against the Markdown authority.
- Verifies the kill-criteria application, the shortlist/preference statements, the human-test
  NOT_TESTED status and the absence of clearance claims.
- Checks ORIGINALITY-AND-PRIOR-ART-CHECK.md Rev.2 status fields and that its preference is B,
  and that it contains no invented SHA-256 hashes.
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[6]
OUT = Path(__file__).resolve().parent.parent / "raw" / "territory-audit.json"

TC = (ROOT / "docs/marea/brand/TERRITORY-COMPARISON.md").read_text(encoding="utf-8")
IDENT = (ROOT / "docs/marea/brand/IDENTITY-SYSTEM.md").read_text(encoding="utf-8")
ORIG = (ROOT / "docs/marea/brand/ORIGINALITY-AND-PRIOR-ART-CHECK.md").read_text(encoding="utf-8")
HTML = (ROOT / "docs/marea/brand/territories/territory-comparison.html").read_text(encoding="utf-8")

issues = []


def num(s):
    return float(str(s).replace(",", ".").strip())


# ---- 1. weighted arithmetic from the Markdown §4 tables ----
territories = {}
for key, marker in [("A", "### A — ISOBATH"), ("B", "### B — BEARING INDEX"), ("C", "### C — SIGNAL TRUNK")]:
    i = TC.find(marker)
    if i < 0:
        issues.append({"issue": f"{key}: section not found"})
        continue
    nxt = TC.find("### ", i + len(marker))
    block = TC[i : nxt if nxt > 0 else i + 2200]
    rows = re.findall(r"^\|\s*([^|]+?)\s*\|\s*([\d.]+)\s*\|\s*([\d.]+)\s*\|\s*([\d.]+)\s*\|\s*$", block, re.MULTILINE)
    total = re.search(r"Weighted total[^|]*\|[^|]*\|\s*\*\*([\d.]+)\*\*\s*\|\s*\*\*([\d.]+)", block)
    terms = []
    weighted = 0.0
    for name, score, weight, term in rows:
        s, w, t = num(score), num(weight), num(term)
        terms.append({"criterion": name.strip(), "score": s, "weight": w, "term": t, "termRecomputed": round(s * w, 3), "termMatches": abs(round(s * w, 3) - t) < 0.0005})
        weighted += s * w
    weight_sum = round(sum(t["weight"] for t in terms), 4)
    stated = num(total.group(2)) if total else None
    territories[key] = {
        "terms": terms,
        "weightSum": weight_sum,
        "weightedRecomputed": round(weighted, 4),
        "stated": stated,
        "statedMatches": stated is not None and abs(round(weighted, 2) - stated) < 0.006,
        "termErrors": [t for t in terms if not t["termMatches"]],
    }
    issues.extend({"issue": f"{key}: term error", "detail": t} for t in territories[key]["termErrors"])
    if not territories[key]["statedMatches"]:
        issues.append({"issue": f"{key}: weighted total mismatch", "recomputed": round(weighted, 4), "stated": stated})
    if abs(weight_sum - 1.0) > 1e-9:
        issues.append({"issue": f"{key}: weights sum {weight_sum}"})

ranking = sorted(territories, key=lambda k: territories[k]["weightedRecomputed"], reverse=True)

# ---- 2. HTML vs Markdown consistency ----
def text_of(html):
    t = re.sub(r"<script.*?</script>|<style.*?</style>", " ", html, flags=re.S)
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", t))


html_txt = text_of(HTML)
html_scores = re.findall(r"\| ([\d.]+) \| ([\d.]+) \| ([\d.]+) \| ([\d.]+) \|", html_txt)
html_weighted = re.findall(r"\*\*Weighted \(of 5\)\*\* \| 100% \| \*\*([\d.]+)\*\* \| \*\*([\d.]+)\*\* \| \*\*([\d.]+)\*\*", html_txt)
html_summary = {
    "weightedFound": html_weighted[0] if html_weighted else None,
    "mdWeighted": {k: territories[k]["stated"] for k in territories},
    "consistent": bool(html_weighted) and all(
        abs(num(html_weighted[0][i]) - territories[k]["stated"]) < 0.011 for i, k in enumerate(["A", "B", "C"])
    ),
}

# ---- 3. decision statements ----
checks = {
    "shortlistExactlyTwo": bool(re.search(r"Shortlist \(exactly two\)", TC)),
    "A_dropped": bool(re.search(r"\*\*Dropped:\*\* \*\*`IVA-24-A1`", TC)),
    "B_preferred": bool(re.search(r"PREFERRED_PROVISIONAL = B — BEARING INDEX", TC)),
    "C_not_adopted": bool(re.search(r"C is \*\*not\*\* adopted", TC)),
    "C_fails_reading_test": bool(re.search(r"C — SIGNAL TRUNK.*?MET \(fails\) on reading", TC, re.S)),
    "A_fails_wave_kill": bool(re.search(r"A — ISOBATH.*?MET \(fails\)", TC, re.S)),
    "B_residual_risk": bool(re.search(r"letter-\"C\"/gauge-app reading is a real residual risk", TC)),
    "human_sort_not_tested": bool(re.search(r"NOT_TESTED \(human\)", TC)) and bool(re.search(r"no human 5-second sort", TC, re.I)),
    "physical_samples_not_tested": bool(re.search(r"NOT_TESTED \(physical\)", TC)),
    "no_clearance_claim": not re.search(r"cleared for use|originality (?:confirmed|cleared)|freedom to use granted", TC, re.I),
    "has_registered_symbols": bool(re.search(r"[\u00ae\u2122]", TC)),
    "identity_system_discloses_C_construction": bool(re.search(r"frozen D-02/D-03 files.*built on the Territory C", IDENT, re.S)),
    "identity_system_states_not_adopted": bool(re.search(r"Not adopted\. Not cleared\. Not published", IDENT)),
    "identity_system_LayerA_LayerB": bool(re.search(r"Layer A", IDENT)) and bool(re.search(r"Layer B", IDENT)),
    "identity_system_preference_B": bool(re.search(r"PREFERRED_PROVISIONAL = B \(BEARING INDEX\)", IDENT)),
}

# ---- 4. originality Rev.2 ----
orig_status = {
    "ORIGINALITY_PROFESSIONAL_CHECK": re.search(r"ORIGINALITY_PROFESSIONAL_CHECK`? \| \*\*(PENDING|BLOCKED|CLEARED)\*\*", ORIG),
    "TRADEMARK_LEGAL_CLEARANCE": re.search(r"TRADEMARK_LEGAL_CLEARANCE`? \| \*\*(NOT_GRANTED|GRANTED)\*\*", ORIG),
    "FINAL_IDENTITY_ADOPTION": re.search(r"FINAL_IDENTITY_ADOPTION`? \| \*\*(BLOCKED|APPROVED|DECIDED)\*\*", ORIG),
    "PUBLICATION": re.search(r"PUBLICATION`? \| \*\*(BLOCKED|READY)\*\*", ORIG),
}
orig = {
    "statusFieldsFound": {k: (m.group(1) if m else None) for k, m in orig_status.items()},
    "allFourExact": all(
        [
            orig_status["ORIGINALITY_PROFESSIONAL_CHECK"] and orig_status["ORIGINALITY_PROFESSIONAL_CHECK"].group(1) == "PENDING",
            orig_status["TRADEMARK_LEGAL_CLEARANCE"] and orig_status["TRADEMARK_LEGAL_CLEARANCE"].group(1) == "NOT_GRANTED",
            orig_status["FINAL_IDENTITY_ADOPTION"] and orig_status["FINAL_IDENTITY_ADOPTION"].group(1) == "BLOCKED",
            orig_status["PUBLICATION"] and orig_status["PUBLICATION"].group(1) == "BLOCKED",
        ]
    ),
    "preferenceIsB": bool(re.search(r"preference[^.\n]{0,120}B\b", ORIG, re.I)) and not bool(re.search(r"preference[^.\n]{0,40}\bC\b", ORIG, re.I)),
    "mentionsPreferenceB": bool(re.search(r"PREFERRED_PROVISIONAL[^\n]{0,80}B\b", ORIG)),
    "sha256HexPresent": bool(re.search(r"\b[a-f0-9]{64}\b", ORIG)),
    "registeredSymbols": len(re.findall(r"[\u00ae\u2122]", ORIG)),
    "revisionLine": (re.search(r"\| Revision \| \*\*([^*]+)\*\*", ORIG) or [None, None])[1],
}

report = {
    "generatedBy": "docs/marea/brand/evidence/review/tools/territory-audit.py",
    "territories": territories,
    "rankingRecomputed": ranking,
    "rankingMatchesDoc": ranking == ["B", "C", "A"],
    "htmlVsMd": html_summary,
    "decisionChecks": checks,
    "originality": orig,
    "issues": issues,
}
OUT.write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")
print("weighted:", {k: (v["weightedRecomputed"], v["stated"], v["statedMatches"]) for k, v in territories.items()})
print("ranking:", ranking)
print("htmlVsMd:", json.dumps(html_summary))
print("decisionChecks:", json.dumps(checks, indent=1))
print("originality:", json.dumps(orig, indent=1))
print("issues:", json.dumps(issues, indent=1))
