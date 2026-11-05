#!/usr/bin/env python3
"""Independent structural audit of MC-04-BRIEFS.yaml (D-12 companion).

Parses the YAML with PyYAML (independent of the author's tooling) and checks the
claims that matter for the gate:
  - every blocked asset has the 20 required brief fields;
  - provider is NONE_YET, files is empty, status is BLOCKED_ON_IMAGE_GENERATION;
  - no invented file path, byte count, sha256, URL, generation date or provider/model;
  - no clearance/certification/availability status value.

Writes docs/marea/brand/evidence/review/raw/briefs-audit.json
"""
import json
import re
import sys
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[6]
YAML_PATH = ROOT / "docs/marea/assets/manifest/MC-04-BRIEFS.yaml"
OUT = Path(__file__).resolve().parent.parent / "raw" / "briefs-audit.json"

text = YAML_PATH.read_text(encoding="utf-8")
data = yaml.safe_load(text)

REQUIRED_20 = [
    "asset_id",
    "destination",
    "subject",
    "composition",
    "camera_position",
    "lens_perspective",
    "lighting",
    "marine_environment",
    "background",
    "brand_colour_constraints",
    "hardware_realism",
    "classification",
    "aspect_ratio",
    "target_pixel_dimensions",
    "mobile_crop",
    "negative_constraints",
    "html_copy_safe_areas",
    "caption_alt_es_en",
    "usage_rights",
    "provider_status_actual",
]

# Find the asset list(s) no matter what the author called them.
def find_asset_lists(node, path=""):
    found = []
    if isinstance(node, dict):
        for k, v in node.items():
            if isinstance(v, list) and v and isinstance(v[0], dict):
                has_id = any("id" in item or "asset_id" in item for item in v[:3])
                if has_id:
                    found.append((path + "/" + k, v))
            found.extend(find_asset_lists(v, path + "/" + k))
    elif isinstance(node, list):
        for i, v in enumerate(node):
            found.extend(find_asset_lists(v, f"{path}[{i}]"))
    return found

asset_lists = find_asset_lists(data)
print("top-level keys:", list(data.keys()))
print("asset lists found:", [(p, len(v)) for p, v in asset_lists])

records = []
issues = []
for list_path, items in asset_lists:
    for item in items:
        ident = item.get("id") or item.get("asset_id") or "(no id)"
        brief = item.get("brief") if isinstance(item.get("brief"), dict) else {}
        provider = item.get("provider") or {}
        rights = item.get("rights") or {}
        files = item.get("files")
        # Flatten nested provider keys used as defaults
        prov_name = provider.get("name") if isinstance(provider, dict) else provider
        rec = {
            "list": list_path,
            "id": ident,
            "status": item.get("status"),
            "classification": item.get("classification"),
            "providerName": prov_name,
            "provider": provider,
            "files": files,
            "filesIsEmptyList": files == [],
            "hasBrief": bool(brief),
            "briefFieldCount": len(brief),
            "briefFieldsMissing": [f for f in REQUIRED_20 if f not in brief],
            "briefFieldsExtra": [f for f in brief if f not in REQUIRED_20],
            "generatedAt": item.get("generated_at", item.get("generatedAt")),
            "sha256Present": bool(re.search(r"[a-f0-9]{64}", json.dumps(item))),
            "pathsInEntry": re.findall(r'(?:public|docs)/[\w./-]+\.(?:png|jpe?g|webp|avif|gif)', json.dumps(item)),
            "urlsInEntry": re.findall(r"https?://[^\s\"']+", json.dumps(item)),
            "rightsAiGenerated": rights.get("ai_generated") if isinstance(rights, dict) else None,
            "rightsDisclosure": rights.get("synthetic_content_disclosure") if isinstance(rights, dict) else None,
        }
        records.append(rec)
        if rec["providerName"] != "NONE_YET":
            issues.append({"id": ident, "issue": "provider.name is not NONE_YET", "value": rec["providerName"]})
        if not rec["filesIsEmptyList"]:
            issues.append({"id": ident, "issue": "files is not []", "value": files})
        if rec["status"] != "BLOCKED_ON_IMAGE_GENERATION":
            # MR-PRD-003 is explicitly recorded as PRODUCIBLE_WITHOUT_GENERATION; allow it.
            if rec["status"] != "PRODUCIBLE_WITHOUT_GENERATION":
                issues.append({"id": ident, "issue": "unexpected status", "value": rec["status"]})
        if rec["generatedAt"] is not None:
            issues.append({"id": ident, "issue": "generated_at is not null while generation is blocked", "value": rec["generatedAt"]})
        if rec["pathsInEntry"]:
            issues.append({"id": ident, "issue": "invented file path in blocked entry", "value": rec["pathsInEntry"]})
        if rec["sha256Present"]:
            issues.append({"id": ident, "issue": "sha256 hex present in a blocked entry"})
        if not rec["hasBrief"]:
            issues.append({"id": ident, "issue": "missing brief block"})
        elif rec["briefFieldCount"] != 20 or rec["briefFieldsMissing"]:
            issues.append(
                {
                    "id": ident,
                    "issue": "brief field completeness",
                    "fieldCount": rec["briefFieldCount"],
                    "missing": rec["briefFieldsMissing"],
                }
            )

# Status vocabulary + forbidden wording across the whole file
forbidden = {
    "registered_symbols": len(re.findall(r"[\u00ae\u2122]", text)),
    "clearance_positive": len(re.findall(r"\bCLEARED\b|APPROVED_FOR_USE|APPROVED FOR USE", text)),
    "certified": len(re.findall(r"\bCERTIFIED\b(?!\s*[-\u2014]?\s*not)|\bcertificad[ao]s?\b", text)),
    "provider_model_set": len(re.findall(r"model:\s*(?!NONE_YET)[A-Za-z0-9]", text)),
    "ai_attestation": len(re.findall(r"attested_by:\s*[A-Za-z]", text)),
}

report = {
    "generatedBy": "docs/marea/brand/evidence/review/tools/briefs-audit.py",
    "file": "docs/marea/assets/manifest/MC-04-BRIEFS.yaml",
    "bytes": len(text.encode("utf-8")),
    "topLevelKeys": list(data.keys()),
    "assetLists": [{"path": p, "count": len(v)} for p, v in asset_lists],
    "recordCount": len(records),
    "ids": [r["id"] for r in records],
    "records": records,
    "issues": issues,
    "forbidden": forbidden,
}
OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")

print("records:", len(records))
print("ids:", [r["id"] for r in records])
print("issues:", json.dumps(issues, indent=1))
print("forbidden:", forbidden)
print("sample entry keys:", json.dumps(records[0] if records else None, indent=1)[:2500])

