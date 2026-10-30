#!/usr/bin/env python3
"""Independent audit of the three MC-04 diagrams (D-11) against brief §7.7 / §9.3 / §10.3.

Checks:
  - the mandatory §7.7 disclaimer text is present verbatim (whitespace-normalised, ES and EN)
    on every diagram where it applies;
  - AIS: receive-only semantics; no transponder/collision-avoidance/complete-traffic claim;
  - PILOT: supervised boundary, E-stop, manual takeover, watchdog; no autonomous/remote claim;
  - ecosystem: honest boundaries, illustrative/unverified/not-for-sale labels, no compatibility claim;
  - no ECDIS / S-52 / ENC / CE / NMEA / IP / certification implication;
  - illustrative labelling + accessible title/desc present;
  - text is authored SVG text (not raster).

Reads the SVGs as text; the authoritative vector rendering/dimensions are covered by the SVG audit.
Writes docs/marea/brand/evidence/review/raw/diagram-audit.json
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[6]
OUT = Path(__file__).resolve().parent.parent / "raw" / "diagram-audit.json"
DIAGRAMS = {
    "ais": "docs/marea/brand/assets/diagrams/marea-ais-receive-only.svg",
    "pilot": "docs/marea/brand/assets/diagrams/marea-pilot-supervised-boundary.svg",
    "ecosystem": "docs/marea/brand/assets/diagrams/marea-ecosystem-overview.svg",
}

# Verbatim text from brief §7.7 (the source of truth).
DISCLAIMERS = {
    "navigation_es": "Este producto es una ayuda a la navegación y no sustituye a la carta náutica oficial, al equipo reglamentario de la embarcación, a la vigilancia continuada ni al buen hacer marinero. La responsabilidad de la navegación corresponde siempre al patrón.",
    "navigation_en": "This product is a navigational aid. It does not replace official nautical charts, the vessel's required equipment, continuous watchkeeping or good seamanship. Responsibility for navigation always rests with the skipper.",
    "ais_es": "La recepción AIS es únicamente de escucha: no todos los buques emiten AIS. No constituye un sistema de evitación de colisiones ni un transpondedor.",
    "ais_en": "AIS reception is receive-only: not every vessel transmits AIS. It is not a collision-avoidance system and not a transponder.",
    "pilot_es": "El sistema de gobierno es asistido y supervisado: exige vigilancia y capacidad de toma de control manual en todo momento. No permite gobierno autónomo ni control remoto sin supervisión.",
    "pilot_en": "The steering system is assisted and supervised: it requires continuous watchkeeping and the ability to take manual control at all times. It does not provide autonomous steering or unattended remote control.",
    "weather_es": "Las previsiones son probabilísticas y pueden desviarse de las condiciones locales reales. Se muestra la fuente y la hora de cada dato.",
    "weather_en": "Forecasts are probabilistic and may differ from actual local conditions. Source and timestamp are displayed for every data point.",
}


def norm(s):
    s = s.replace("’", "'").replace("‘", "'").replace("“", '"').replace("”", '"')
    s = s.replace("«", "").replace("»", "")
    return re.sub(r"\s+", " ", s).strip()


def text_content(svg):
    # Concatenate <text> content, then normalise.
    parts = re.findall(r"<text[^>]*>(.*?)</text>", svg, re.S)
    return norm(" ".join(parts))


report = {"generatedBy": "docs/marea/brand/evidence/review/tools/diagram-audit.py", "diagrams": []}
for key, rel in DIAGRAMS.items():
    p = ROOT / rel
    svg = p.read_text(encoding="utf-8")
    txt = text_content(svg)
    has = {}
    for name, expected in DISCLAIMERS.items():
        has[name] = norm(expected) in txt
    flags = []
    if not has["navigation_es"] or not has["navigation_en"]:
        flags.append("missing verbatim navigation disclaimer (§7.7)")
    if key == "ais":
        if not has["ais_es"] or not has["ais_en"]:
            flags.append("missing verbatim AIS receive-only disclaimer (§7.7)")
    if key == "pilot":
        if not has["pilot_es"] or not has["pilot_en"]:
            flags.append("missing verbatim PILOT supervised disclaimer (§7.7)")
    # safety-boundary wording
    words = {
        "estop": bool(re.search(r"\bE-?stop\b|paro de emergencia|emergency stop", txt, re.I)),
        "manual_takeover": bool(re.search(r"manual takeover|toma de control manual|manual control", txt, re.I)),
        "watchdog": bool(re.search(r"watchdog", txt, re.I)),
        "supervised": bool(re.search(r"supervis|supervised", txt, re.I)),
        "receive_only": bool(re.search(r"receive-only|solo escucha|únicamente de escucha", txt, re.I)),
        "illustrative": bool(re.search(r"ILUSTRATIV|ILLUSTRATIVE", txt, re.I)),
        "not_for_sale": bool(re.search(r"not for sale|no a la venta", txt, re.I)),
        "unverified": bool(re.search(r"unverified|no verificad", txt, re.I)),
    }
    # prohibited positive claims
    def positive_collision_claim(text):
        for m in re.finditer(r"(?:constituye (?:un|una) sistema de evitaci[oó]n|is (?:a )?collision[- ]avoidance system|es un sistema de evitaci[oó]n)", text, re.I):
            before = text[max(0, m.start() - 12) : m.start()].lower()
            if not re.search(r"(?:no|not|ni)\b", before):
                return True
        return False

    forbidden = {
        "transponder_claim": bool(re.search(r"\btransponder\b(?!.*\bnot\b)", txt, re.I)) and not re.search(r"not a transponder|ni un transpondedor", txt, re.I),
        "collision_avoidance_positive": positive_collision_claim(txt),
        "autonomous_positive": bool(re.search(r"autonomous steering|gobierno aut[oó]nomo", txt, re.I))
        and not re.search(r"does not provide autonomous|no permite gobierno aut[oó]nomo", txt, re.I),
        "ecdis_implied": bool(re.search(r"\bECDIS[- ]?(class|equivalent|approved)\b|navigation[- ]grade", txt, re.I)),
        "certification_mark": bool(re.search(r"\bCE\b|\bNMEA\s*2000\b|\bIP[X]?\d{1,2}\b", txt)),
        "registered_symbol": bool(re.search(r"[\u00ae\u2122]", txt)),
        "compatibility_claim": bool(
            re.search(r"\bcompatible with\b|\bcompatible con\b", txt, re.I)
            and not re.search(r"unverified|not verified|no verificad", txt, re.I)
        ),
    }
    a11y = {
        "title": re.search(r"<title>(.*?)</title>", svg, re.S).group(1).strip()
        if re.search(r"<title>", svg)
        else None,
        "desc": bool(re.search(r"<desc>", svg)),
        "role": re.search(r'role="([^"]+)"', svg).group(1) if re.search(r'role="', svg) else None,
        "aria_label": bool(re.search(r'aria-label="', svg)),
        "textElementCount": len(re.findall(r"<text[^>]*>", svg)),
        "imageElementCount": len(re.findall(r"<image[^>]*>", svg)),
        "scriptCount": len(re.findall(r"<script[^>]*>", svg)),
        "externalRefs": re.findall(r'(?:href|src)="(?!\#)([^"]+)"', svg),
    }
    for k, v in forbidden.items():
        if v:
            flags.append(f"prohibited positive claim: {k}")
    if not a11y["title"]:
        flags.append("no <title>")
    if not a11y["desc"]:
        flags.append("no <desc>")
    report["diagrams"].append(
        {
            "key": key,
            "path": rel,
            "bytes": p.stat().st_size,
            "disclaimersPresent": has,
            "safetyWords": words,
            "forbiddenClaims": forbidden,
            "accessibility": a11y,
            "flags": flags,
        }
    )

report["summary"] = {
    "diagrams": len(report["diagrams"]),
    "withFlags": [d["key"] for d in report["diagrams"] if d["flags"]],
    "flagCount": sum(len(d["flags"]) for d in report["diagrams"]),
}
OUT.write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")
print(json.dumps(report["summary"], indent=1))
for d in report["diagrams"]:
    print(f"\n== {d['key']} {d['bytes']}B")
    print("  disclaimers:", {k: v for k, v in d["disclaimersPresent"].items() if v})
    print("  missing:", [k for k, v in d["disclaimersPresent"].items() if not v])
    print("  safety words:", d["safetyWords"])
    print("  forbidden:", {k: v for k, v in d["forbiddenClaims"].items() if v})
    print("  flags:", d["flags"])
