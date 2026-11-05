#!/usr/bin/env python3
"""Independent prohibited-pattern / honesty scan of the MC-04 delivered artifacts.

Reviewer-authored: does not reuse the author's run-compliance-scan.ps1. Scans the MC-04
authored artifacts (docs + HTML/SVG proofs + manifests + tokens) for claims that would
violate the claims policy: registered symbols attached to the brand, certification /
IP / standards marks, availability/price/performance claims, ECDIS or collision-avoidance
implication, invented user research, and positive safety guarantees.

Every hit is printed with surrounding context so negation can be judged by a human, and
the JSON records the context to allow re-checking. This is a screening aid, not a legal
opinion and not a substitute for the professional originality/clearance gate.
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[6]
OUT = Path(__file__).resolve().parent.parent / "raw" / "prohibited-pattern-scan.json"

TARGETS = [
    "docs/marea/brand/ICONOGRAPHY-SYSTEM.md",
    "docs/marea/brand/ORIGINALITY-AND-PRIOR-ART-CHECK.md",
    "docs/marea/brand/PHOTOGRAPHY-AND-CGI-ART-DIRECTION.md",
    "docs/marea/brand/HARDWARE-CMF-DIRECTION.md",
    "docs/marea/brand/PACKAGING-DIRECTION.md",
    "docs/marea/brand/tokens/marea-instrument-tokens.proposed.json",
    "docs/marea/assets/manifest/MC-04-BRIEFS.yaml",
]
for sub in [
    "docs/marea/brand/assets",
    "docs/marea/brand/territories",
]:
    p = ROOT / sub
    if p.exists():
        for f in p.rglob("*"):
            if f.is_file() and f.suffix.lower() in {".svg", ".html", ".css", ".js", ".mjs", ".json", ".yaml", ".yml", ".md"}:
                rel = f.relative_to(ROOT).as_posix()
                if "/evidence/" not in rel:
                    TARGETS.append(rel)

PATTERNS = {
    "registered_symbol_attached": r"(?:MAREA|NAV|HUB|AIS|PILOT|SENSE|WATCH|DISPLAY|WEATHER|FLEET)\s*[\u00ae\u2122]",
    "any_registered_symbol": r"[\u00ae\u2122]",
    "ce_mark": r"(?<![\w-])\bCE\b(?!\s*(?:marking|declaration|conformity))",
    "nmea_mark": r"\bNMEA\s*2000\b|\bNMEA\s*0183\b",
    "ip_rating_claim": r"\bIP[0-9]{2}\b|\bIPX[0-9]\b",
    "certification_words": r"\b(?:certified|certificad[ao]s?|certification|homologad[ao]|type[- ]approved)\b",
    "approval_words": r"\b(?:approved|aprobad[ao]|CLEARED|cleared for use|approved for use)\b",
    "availability_words": r"\b(?:available now|buy now|in stock|en stock|disponible ahora|comprar ahora|for sale|a la venta)\b",
    "price_words": r"(?:\b\d+[.,]\d{2}\s*(?:EUR|USD|GBP|€|\$)|€\s*\d|\bprecio\b|\bprice\b)",
    "performance_figures": r"(?:±\s?\d+[.,]\d+|\baccuracy\b|\bprecisi[oó]n\b|\btolerancia\b|\b0\.1\s*kn\b)",
    "ecdis_implication": r"\bECDIS\b|\bS-52\b|\bENC\b|\bECDIS[- ]class\b|\bECDIS[- ]equivalent\b|\bnavigation[- ]grade\b",
    "collision_avoidance_positive": r"(?:collision[- ]avoidance system|sistema de evitaci[oó]n de colisiones|avoid collisions|evita colisiones)",
    "safety_guarantee": r"\b(?:guaranteed|garantizad[ao]|guarantees safety|navegaci[oó]n segura|safe route|ruta segura|never miss|nunca falla)\b",
    "user_research_claim": r"\b(?:user testing|usability test|user research|prueba de usuario|probado con usuarios|tested with users|5-second test passed)\b",
    "sea_trial_claim": r"\b(?:sea trial|prueba de mar|tested at sea|probado en el mar)\b",
    "made_in": r"\b(?:made in|fabricado en|hecho en)\b",
    "waterproof": r"\b(?:waterproof|impermeable|sumergible|resistant to water)\b",
    "marine_grade": r"\bmarine[- ]grade\b",
    "heritage": r"\b(?:since\s+20\d\d|desde\s+20\d\d|est\.\s*(?:19|20)\d\d)\b",
    "award_badge": r"\b(?:award[- ]winning|premiad[ao]|best in class)\b",
}

hits = []
files_scanned = 0
for rel in TARGETS:
    p = ROOT / rel
    if not p.exists():
        hits.append({"file": rel, "pattern": "MISSING_FILE", "line": None, "match": None})
        continue
    files_scanned += 1
    try:
        text = p.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        text = p.read_text(encoding="utf-8", errors="replace")
    lines = text.splitlines()
    for name, rx in PATTERNS.items():
        for i, line in enumerate(lines, 1):
            for m in re.finditer(rx, line, re.IGNORECASE):
                start = max(0, m.start() - 160)
                end = min(len(line), m.end() + 160)
                hits.append(
                    {
                        "file": rel,
                        "pattern": name,
                        "line": i,
                        "match": m.group(0),
                        "context": line[start:end].strip(),
                    }
                )

# Group summary
by_pattern = {}
for h in hits:
    by_pattern.setdefault(h["pattern"], []).append(h)

report = {
    "generatedBy": "docs/marea/brand/evidence/review/tools/prohibited-pattern-scan.py",
    "note": "Screening aid only; contexts must be read to distinguish negations/prohibitions from claims.",
    "filesScanned": files_scanned,
    "fileCount": len(TARGETS),
    "hitCount": len(hits),
    "hitsByPattern": {k: len(v) for k, v in sorted(by_pattern.items())},
    "hits": hits,
}
OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")

print("files scanned:", files_scanned, "of", len(TARGETS))
print("hits by pattern:", json.dumps(report["hitsByPattern"], indent=1))
print()
# Print non-negation-looking contexts for the dangerous patterns
for name in [
    "registered_symbol_attached",
    "ce_mark",
    "nmea_mark",
    "ip_rating_claim",
    "certification_words",
    "availability_words",
    "price_words",
    "ecdis_implication",
    "safety_guarantee",
    "user_research_claim",
    "sea_trial_claim",
    "waterproof",
    "marine_grade",
    "award_badge",
]:
    if name in by_pattern:
        print(f"### {name} ({len(by_pattern[name])})")
        for h in by_pattern[name][:40]:
            print(f"  {h['file']}:{h['line']} [{h['match']}] :: {h['context'][:230]}")
        print()
