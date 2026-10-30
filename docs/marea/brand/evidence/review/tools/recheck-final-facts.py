#!/usr/bin/env python3
"""Final recheck facts: icon/territory counts, delivery-count claims, app-icon/OG B-construction,
IDENTITY-SYSTEM measured-number consistency."""
import os
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[6]
ICONS = ROOT / "docs/marea/brand/assets/icons/ui"
icon_files = sorted(p for p in ICONS.glob("*.svg"))
icon_total = sum(p.stat().st_size for p in icon_files)
icon_max = max(p.stat().st_size for p in icon_files)
terr = [p for p in (ROOT / "docs/marea/brand/territories").rglob("*") if p.is_file()]
ident = (ROOT / "docs/marea/brand/IDENTITY-SYSTEM.md").read_text(encoding="utf-8")
delivery = (ROOT / "docs/marea/brand/MC-04-DELIVERY.md").read_text(encoding="utf-8")
app = (ROOT / "docs/marea/brand/assets/icons/app/marea-app-icon-master.svg").read_text(encoding="utf-8")
favicon = (ROOT / "docs/marea/brand/assets/icons/favicon.svg").read_text(encoding="utf-8")
og_es_html = (ROOT / "docs/marea/brand/assets/social/og-marea-es-1200x630.html").read_text(encoding="utf-8")

def nums(t):
    return [float(x) for x in re.findall(r"-?\d+(?:\.\d+)?", t)]

out = {
    "icons": {"count": len(icon_files), "totalBytes": icon_total, "maxBytes": icon_max},
    "territoryFiles": len(terr),
    "deliveryIconClaim": bool(re.search(r"24 648 B total, max 845 B", delivery)),
    "deliveryTerritoryClaim": bool(re.search(r"Territory prototypes \| \*\*46 files\*\*", delivery)),
    "deliveryGovernedFilesClaim": (re.search(r"(\d+) governed files scanned", delivery) or [None, None])[1],
    "appIcon": {
        "bytes": len(app.encode()),
        "hasArcCommand": bool(re.search(r'd="[^"]*A', app)),
        "mentionsB": "B" in app or "territory B" in app.lower(),
        "desc": (re.search(r"<desc>([^<]*)", app) or [None, None])[1],
    },
    "favicon": {
        "bytes": len(favicon.encode()),
        "viewBox": (re.search(r'viewBox="([^"]+)"', favicon) or [None, None])[1],
        "hasArcCommand": bool(re.search(r'd="[^"]*A', favicon)),
    },
    "ogEsUsesLockup": "lockup" in og_es_html.lower(),
    "identityKeyNumbers": {
        "704.83": "704.83" in ident,
        "98.87": "98.87" in ident,
        "75.00": "75.00" in ident,
        "3.2": "3.2" in ident,
        "10.4": "10.4" in ident,
        "29.66": "29.66" in ident,
        "15.47": "15.47" in ident,
        "27 artwork files": bool(re.search(r"27 artwork files", ident)),
        "5 exempt": bool(re.search(r"remaining \*\*5 files\*\*|5 files are working", ident)),
        "scale(3.333)": "scale(3.333)" in ident,
    },
    "territorySection8": {
        "mentionsBmaster": bool(re.search(r"master|Master", (ROOT / "docs/marea/brand/TERRITORY-COMPARISON.md").read_text(encoding="utf-8"))),
    },
}
print(__import__("json").dumps(out, indent=1, ensure_ascii=False)[:3500])
