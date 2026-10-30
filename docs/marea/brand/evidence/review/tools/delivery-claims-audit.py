#!/usr/bin/env python3
"""Audit remaining D-18 delivery-record claims and cross-artifact structural facts."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[6]
OUT = Path(__file__).resolve().parent.parent / "raw" / "delivery-claims-audit.json"
DELIVERY = ROOT / "docs/marea/brand/MC-04-DELIVERY.md"
text = DELIVERY.read_text(encoding="utf-8")

issues = []

# 1. Section structure: expect ## 1..## 16 present.
headings = re.findall(r"^## (\d+)\.", text, re.MULTILINE)
expected = [str(i) for i in range(1, 17)]
missing_sections = [s for s in expected if s not in headings]
if missing_sections:
    issues.append({"issue": "missing numbered sections", "sections": missing_sections, "found": headings})

# 2. Referenced paths in backticks exist.
refs = sorted(set(re.findall(r"`((?:docs|scripts|assets)/[^`\s]+|[A-Za-z0-9_./-]+\.(?:md|json|yaml|mjs|svg|png|jpg|ico|pdf|html))`", text)))
missing_paths = []
for r in refs:
    cand = r.split(" ")[0]
    if "/" not in cand and not cand.startswith(("MC-04", "marea")):
        continue
    if not (ROOT / cand).exists() and not (ROOT / "docs/marea/brand" / cand).exists() and not (ROOT / "docs/marea/brand/assets" / cand).exists():
        missing_paths.append(r)
# Only keep things that look like concrete files (skip globs/dirs)
missing_paths = [m for m in missing_paths if any(m.endswith(e) for e in (".md", ".json", ".yaml", ".mjs", ".svg", ".png", ".jpg", ".ico", ".pdf", ".html"))]

# 3. Count claims vs reality.
manifest = json.loads((Path(__file__).resolve().parent.parent / "raw" / "manifest-audit.json").read_text(encoding="utf-8"))
# recompute from yaml directly
import yaml

d = yaml.safe_load((ROOT / "docs/marea/assets/manifest/MC-04-ASSETS.yaml").read_text(encoding="utf-8"))
file_records = [f for a in d["assets"] for f in (a.get("files") or [])]
ext = {}
for f in file_records:
    e = Path(f["path"]).suffix.lower()
    ext[e] = ext.get(e, 0) + 1
counts = {
    "entries": len(d["assets"]),
    "fileRecords": len(file_records),
    "sumBytes": sum(f["bytes"] for f in file_records),
    "ext": ext,
}
claims = {
    "120 records": counts["fileRecords"] == 120,
    "5 275 487 B": counts["sumBytes"] == 5275487,
    "88 SVG": ext.get(".svg") == 88,
    "21 PNG": ext.get(".png") == 21,
    "2 JPEG": ext.get(".jpg") == 2,
    "2 PDF": ext.get(".pdf") == 2,
    "1 ICO": ext.get(".ico") == 1,
    "6 HTML": ext.get(".html") == 6,
}
for name, ok in claims.items():
    if not ok:
        issues.append({"issue": f"count claim mismatch: {name}", "counts": counts})

# 4. D-01..D-19 register paths.
d_paths = {
    "D-01": "docs/marea/brand/IDENTITY-SYSTEM.md",
    "D-02": "docs/marea/brand/assets/logo/marea-lockup-primary.svg",
    "D-03": "docs/marea/brand/assets/logo/family/marea-family-nav-lockup.svg",
    "D-04": "docs/marea/brand/assets/icons/marea-app-icon-1024.png",
    "D-05": "docs/marea/brand/assets/social/og-marea-es-1200x630.jpg",
    "D-06": "docs/marea/brand/TYPOGRAPHY-SYSTEM.md",
    "D-07": "docs/marea/brand/COLOUR-SYSTEM.md",
    "D-08": "docs/marea/brand/tokens/marea-instrument-tokens.proposed.json",
    "D-09": "docs/marea/brand/ICONOGRAPHY-SYSTEM.md",
    "D-10": "docs/marea/brand/ILLUSTRATION-STANDARDS.md",
    "D-11": "docs/marea/brand/assets/diagrams/marea-ais-receive-only.svg",
    "D-12": "docs/marea/brand/PHOTOGRAPHY-AND-CGI-ART-DIRECTION.md",
    "D-13": "docs/marea/brand/HARDWARE-CMF-DIRECTION.md",
    "D-14": "docs/marea/brand/assets/packaging/marea-packaging-dieline-hub.svg",
    "D-15": "docs/marea/brand/assets/print/marea-installer-commissioning-record-en.html",
    "D-16": "docs/marea/brand/ORIGINALITY-AND-PRIOR-ART-CHECK.md",
    "D-17": "docs/marea/brand/MC-04-ACCESSIBILITY-EVIDENCE.md",
    "D-18": "docs/marea/brand/MC-04-DELIVERY.md",
    "D-19": "docs/marea/brand/MC-04-REVIEW.md",
}
missing_d = [k for k, v in d_paths.items() if not (ROOT / v).exists()]

# 5. Packaging dieline labels.
pack = {}
for p in sorted((ROOT / "docs/marea/brand/assets/packaging").glob("*.svg")):
    t = p.read_text(encoding="utf-8")
    pack[p.name] = {
        "viewBox": (re.search(r'viewBox="([^"]+)"', t) or [None, None])[1],
        "hasProposedLabel": bool(re.search(r"PROPUEST|PROPOSED", t)),
        "hasNoMarksStatement": bool(re.search(r"Sin marcas CE|No contiene marcas CE|sin certificaci", t)),
        "hasBleedOrSafe": bool(re.search(r"sangrado|bleed|zona segura|safe area", t, re.I)),
        "hasRegisteredSymbol": bool(re.search(r"[\u00ae\u2122]", t)),
    }
    if not pack[p.name]["hasProposedLabel"]:
        issues.append({"issue": "packaging dieline lacks PROPOSED label", "file": p.name})
    if pack[p.name]["hasRegisteredSymbol"]:
        issues.append({"issue": "packaging dieline contains registered symbol", "file": p.name})

# 6. Photography doc brief count.
photo = (ROOT / "docs/marea/brand/PHOTOGRAPHY-AND-CGI-ART-DIRECTION.md").read_text(encoding="utf-8")
photo_ids = sorted(set(re.findall(r"MR-(?:COR|PRD|MKT)-\d{3}", photo)))

# 7. IDENTITY-SYSTEM "All 32 SVG files ... no <text>" claim vs the 32 measured files.
geom = json.loads((ROOT / "docs/marea/brand/territories/evidence/svg-geometry-report.json").read_text(encoding="utf-8"))
geom_files = [f["file"] if isinstance(f, dict) and "file" in f else None for f in geom.get("files", [])]
text_svg = []
for f in geom.get("files", []):
    path = f.get("file") if isinstance(f, dict) else None
    if not path:
        continue
    abs_p = ROOT / path
    if abs_p.exists() and "<text" in abs_p.read_text(encoding="utf-8"):
        text_svg.append(path)
identity_claim = {
    "sentencePresent": bool(re.search(r"All 32 SVG files pass:.*?no `<text>`", (ROOT / "docs/marea/brand/IDENTITY-SYSTEM.md").read_text(encoding="utf-8"), re.S)),
    "geometryFileCount": len(geom.get("files", [])),
    "geometryFailed": geom.get("failed"),
    "filesWithText": text_svg,
}

report = {
    "generatedBy": "docs/marea/brand/evidence/review/tools/delivery-claims-audit.py",
    "missingSections": missing_sections,
    "headingsFound": headings,
    "missingReferencedPaths": missing_paths,
    "countsRecomputed": counts,
    "countClaimsOk": claims,
    "missingDeliverables": missing_d,
    "packaging": pack,
    "photographyBriefIds": photo_ids,
    "photographyBriefCount": len(photo_ids),
    "identitySystemTextClaim": identity_claim,
    "issues": issues,
}
OUT.write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")
print("missing sections:", missing_sections, "| found:", headings)
print("missing referenced paths:", missing_paths[:12])
print("counts:", json.dumps(counts))
print("count claims:", json.dumps(claims))
print("missing deliverables:", missing_d)
print("photography brief ids:", len(photo_ids), photo_ids)
print("packaging:", json.dumps(pack, indent=1)[:1200])
print("identity text claim:", json.dumps(identity_claim, indent=1))
print("issues:", json.dumps(issues, indent=1))
