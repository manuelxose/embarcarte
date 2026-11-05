#!/usr/bin/env python3
"""Independent QA-27 broken-reference check across the landed MC-04 documents.

Extracts every repository path the documents cite in backticks (or as relative Markdown
links) and checks it exists on disk. Also lists Markdown links whose target is missing.
This catches invented files/paths and stale references, which is a Phase-1/Phase-2 gate.
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[6]
OUT = Path(__file__).resolve().parent.parent / "raw" / "reference-check.json"

DOCS = [
    "docs/marea/brand/ICONOGRAPHY-SYSTEM.md",
    "docs/marea/brand/TYPOGRAPHY-SYSTEM.md",
    "docs/marea/brand/COLOUR-SYSTEM.md",
    "docs/marea/brand/MC-04-ACCESSIBILITY-EVIDENCE.md",
    "docs/marea/brand/ORIGINALITY-AND-PRIOR-ART-CHECK.md",
    "docs/marea/brand/PHOTOGRAPHY-AND-CGI-ART-DIRECTION.md",
    "docs/marea/brand/ILLUSTRATION-STANDARDS.md",
    "docs/marea/brand/HARDWARE-CMF-DIRECTION.md",
    "docs/marea/brand/PACKAGING-DIRECTION.md",
    "docs/marea/assets/manifest/MC-04-BRIEFS.yaml",
]

PATH_RE = re.compile(r"`((?:docs|scripts|src|public|node_modules|e2e)/[^`\s]+|package-lock\.json|package\.json)`")
MD_LINK_RE = re.compile(r"\[[^\]]*\]\(([^)\s]+)\)")

report = {"generatedBy": "docs/marea/brand/evidence/review/tools/reference-check.py", "documents": []}
total = 0
missing = 0
for rel in DOCS:
    p = ROOT / rel
    if not p.exists():
        report["documents"].append({"file": rel, "exists": False})
        missing += 1
        continue
    text = p.read_text(encoding="utf-8")
    refs = sorted(set(PATH_RE.findall(text)))
    bad = [r for r in refs if not (ROOT / r).exists()]
    # Relative markdown links (only those that look like repo files, not URLs / anchors)
    links = [
        l
        for l in MD_LINK_RE.findall(text)
        if not re.match(r"^(https?:|mailto:|#)", l) and not l.startswith("<<")
    ]
    bad_links = []
    for link in links:
        target = link.split("#")[0]
        if not target or target.startswith("/"):
            continue
        if not (p.parent / target).exists() and not (ROOT / target).exists():
            bad_links.append(link)
    total += len(refs)
    missing += len(bad)
    report["documents"].append(
        {
            "file": rel,
            "exists": True,
            "backtickRefs": len(refs),
            "missingBacktickRefs": bad,
            "relativeLinks": len(links),
            "missingRelativeLinks": bad_links,
        }
    )

report["summary"] = {
    "documents": len(DOCS),
    "backtickRefs": total,
    "missingBacktickRefs": missing,
    "documentsWithMissingRefs": [
        d["file"] for d in report["documents"] if d.get("missingBacktickRefs") or d.get("missingRelativeLinks") or not d.get("exists")
    ],
}
OUT.write_text(json.dumps(report, indent=2), encoding="utf-8")
print(json.dumps(report["summary"], indent=1))
for d in report["documents"]:
    if d.get("missingBacktickRefs") or d.get("missingRelativeLinks") or not d.get("exists"):
        print("MISSING in", d["file"], ":")
        for m in d.get("missingBacktickRefs", []):
            print("   ref ", m)
        for m in d.get("missingRelativeLinks", []):
            print("   link", m)
print("\nper-document:", {d["file"].split("/")[-1]: d.get("backtickRefs") for d in report["documents"]})
