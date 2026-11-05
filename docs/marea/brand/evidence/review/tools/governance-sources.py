#!/usr/bin/env python3
"""Extract external URLs and section-9 (shortlist) status from the governance docs,
so the reviewer can judge whether cited sources are declared and whether the shortlist
section is filled. Network verification is not possible in this session (web fetch
endpoint failing), so the report records what is cited, not that it resolves."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[6]
OUT = Path(__file__).resolve().parent.parent / "raw" / "governance-sources.json"
DOCS = [
    "docs/marea/brand/ORIGINALITY-AND-PRIOR-ART-CHECK.md",
    "docs/marea/brand/PHOTOGRAPHY-AND-CGI-ART-DIRECTION.md",
    "docs/marea/brand/MC-04-ACCESSIBILITY-EVIDENCE.md",
]
out = {}
for rel in DOCS:
    t = (ROOT / rel).read_text(encoding="utf-8")
    urls = sorted(set(re.findall(r"https?://[^\s\)\]`\"<>]+", t)))
    domains = {}
    for u in urls:
        d = re.sub(r"^https?://", "", u).split("/")[0]
        domains[d] = domains.get(d, 0) + 1
    marks = {
        "OFFICIAL_REGISTRY": len(re.findall(r"OFFICIAL_REGISTRY", t)),
        "PUBLIC_EDITORIAL": len(re.findall(r"PUBLIC_EDITORIAL", t)),
        "SEARCH_ENGINE_SNIPPET": len(re.findall(r"SEARCH_ENGINE_SNIPPET", t)),
        "retrieval_dates": len(re.findall(r"20\d\d-\d\d-\d\d", t)),
    }
    shortlist = [m.group(0)[:160] for m in re.finditer(r"[^\n]*[Ss]hortlist[^\n]*", t)][:20]
    out[rel] = {
        "bytes": len(t.encode("utf-8")),
        "uniqueUrls": len(urls),
        "domains": domains,
        "urls": urls,
        "evidenceClassMentions": marks,
        "shortlistMentions": shortlist,
    }
OUT.write_text(json.dumps(out, indent=2, ensure_ascii=False), encoding="utf-8")
for rel, v in out.items():
    print("===", rel, "bytes", v["bytes"], "urls", v["uniqueUrls"])
    print("  domains:", v["domains"])
    print("  classes:", v["evidenceClassMentions"])
    print("  shortlist lines:", len(v["shortlistMentions"]))
    for s in v["shortlistMentions"][:8]:
        print("    ", s.strip()[:150])
