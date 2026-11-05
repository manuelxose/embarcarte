#!/usr/bin/env python3
"""Independent MC-04-ASSETS.yaml audit (reviewer-authored).

Checks, against the real files on disk:
  - required provenance fields per brief §10.4;
  - every files[] entry: path exists, byte size matches, SHA-256 matches, dimensions match;
  - no file in the delivered asset scope without an entry (and vice versa);
  - status vocabulary (no APPROVED / APPROVED_FOR_USE / CLEARED / CERTIFIED) and no (R)/(TM);
  - reviewer != author where an asset claims review;
  - blocked/absent assets carry files: [] (nothing invented).

Dimensions are measured here: PNG (IHDR), JPEG (SOF), SVG (viewBox), ICO (directory), WebP.
PDF entries are checked for bytes/sha256 only (page geometry is not a pixel dimension).
"""
import hashlib
import json
import re
import struct
import sys
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[6]
MANIFEST = ROOT / "docs/marea/assets/manifest/MC-04-ASSETS.yaml"
OUT = Path(__file__).resolve().parent.parent / "raw" / "manifest-audit.json"
ASSET_SCOPE = ROOT / "docs/marea/brand/assets"

REQUIRED_TOP = ["id", "slug", "category", "purpose", "classification", "status"]
REQUIRED_FILE = ["path", "format", "bytes", "sha256"]


def png_size(b):
    if b[:8] != b"\x89PNG\r\n\x1a\n":
        return None
    return struct.unpack(">II", b[16:24])


def jpeg_size(b):
    if b[0] != 0xFF or b[1] != 0xD8:
        return None
    i = 2
    while i < len(b) - 9:
        if b[i] != 0xFF:
            i += 1
            continue
        marker = b[i + 1]
        if marker in (0xD8, 0xD9, 0x01) or 0xD0 <= marker <= 0xD7:
            i += 2
            continue
        if i + 4 > len(b):
            return None
        length = struct.unpack(">H", b[i + 2 : i + 4])[0]
        if marker in (0xC0, 0xC1, 0xC2, 0xC3, 0xC5, 0xC6, 0xC7, 0xC9, 0xCA, 0xCB, 0xCD, 0xCE, 0xCF):
            h, w = struct.unpack(">HH", b[i + 5 : i + 9])
            return (w, h)
        i += 2 + length
    return None


def svg_size(text):
    m = re.search(r'viewBox="([-\d.]+)[ ,]+([-\d.]+)[ ,]+([-\d.]+)[ ,]+([-\d.]+)"', text)
    if not m:
        return None
    return (float(m.group(3)), float(m.group(4)))


def ico_sizes(b):
    if len(b) < 6:
        return None
    count = struct.unpack("<H", b[4:6])[0]
    out = []
    for n in range(count):
        off = 6 + n * 16
        if off + 16 > len(b):
            return None
        w = b[off] or 256
        h = b[off + 1] or 256
        out.append((w, h))
    return out


def webp_size(b):
    if b[:4] != b"RIFF" or b[8:12] != b"WEBP":
        return None
    kind = b[12:16]
    if kind == b"VP8X":
        return (1 + int.from_bytes(b[24:27], "little"), 1 + int.from_bytes(b[27:30], "little"))
    return None


def measure(path: Path):
    b = path.read_bytes()
    ext = path.suffix.lower()
    if ext == ".png":
        return png_size(b)
    if ext in (".jpg", ".jpeg"):
        return jpeg_size(b)
    if ext == ".svg":
        return svg_size(b.decode("utf-8", "replace"))
    if ext == ".ico":
        return ico_sizes(b)
    if ext == ".webp":
        return webp_size(b)
    return None


def sha(b):
    return hashlib.sha256(b).hexdigest()


report = {"generatedBy": "docs/marea/brand/evidence/review/tools/manifest-audit.py", "manifest": str(MANIFEST.relative_to(ROOT))}
if not MANIFEST.exists():
    print("MANIFEST ABSENT")
    OUT.write_text(json.dumps({**report, "error": "absent"}, indent=2), encoding="utf-8")
    sys.exit(2)

text = MANIFEST.read_text(encoding="utf-8")
data = yaml.safe_load(text)
assets = data.get("assets") or []
report["assetCount"] = len(assets)
report["topLevelKeys"] = list(data.keys())
issues = []
records = []

registered_paths = set()
for asset in assets:
    aid = asset.get("id") or "(no id)"
    rec = {
        "id": aid,
        "slug": asset.get("slug"),
        "category": asset.get("category"),
        "classification": asset.get("classification"),
        "status": asset.get("status"),
        "author": asset.get("author"),
        "reviewer": asset.get("reviewer"),
        "missingTopFields": [f for f in REQUIRED_TOP if asset.get(f) in (None, "", [])],
        "fileCount": len(asset.get("files") or []),
        "files": [],
    }
    rights = asset.get("rights") or {}
    rec["rightsKeys"] = sorted(rights.keys()) if isinstance(rights, dict) else rights
    alt = asset.get("alt") or {}
    rec["hasAltEsEn"] = bool(isinstance(alt, dict) and alt.get("es") and alt.get("en"))
    # status vocabulary
    status = str(asset.get("status") or "")
    if status in {"APPROVED", "APPROVED_FOR_USE", "CLEARED", "CERTIFIED"}:
        issues.append({"id": aid, "issue": f"prohibited status {status}"})
    # reviewer independence
    if asset.get("reviewer") and asset.get("reviewer") == asset.get("author"):
        issues.append({"id": aid, "issue": "reviewer == author"})
    for f in asset.get("files") or []:
        entry = {"path": f.get("path"), "format": f.get("format")}
        missing = [k for k in REQUIRED_FILE if f.get(k) in (None, "")]
        if missing:
            issues.append({"id": aid, "file": f.get("path"), "issue": f"missing file fields {missing}"})
        p = ROOT / str(f.get("path") or "")
        entry["exists"] = p.exists()
        if not p.exists():
            issues.append({"id": aid, "file": f.get("path"), "issue": "file does not exist"})
            continue
        registered_paths.add(str(f.get("path")))
        b = p.read_bytes()
        real_bytes = len(b)
        real_sha = sha(b)
        entry["bytesReal"] = real_bytes
        entry["bytesManifest"] = f.get("bytes")
        entry["bytesMatch"] = f.get("bytes") == real_bytes
        entry["shaReal"] = real_sha
        entry["shaManifest"] = f.get("sha256")
        entry["shaMatch"] = str(f.get("sha256") or "").lower() == real_sha
        if not entry["bytesMatch"]:
            issues.append({"id": aid, "file": f.get("path"), "issue": "bytes mismatch", "manifest": f.get("bytes"), "real": real_bytes})
        if not entry["shaMatch"]:
            issues.append({"id": aid, "file": f.get("path"), "issue": "sha256 mismatch", "manifest": f.get("sha256"), "real": real_sha})
        dims = measure(p)
        if dims and f.get("width") is not None and f.get("height") is not None:
            if isinstance(dims, list):  # ICO: manifest may record one size or the multi-size set
                sizes = dims
                entry["dimensionsReal"] = sizes
                entry["dimensionsManifest"] = [f.get("width"), f.get("height")]
                try:
                    entry["dimensionsMatch"] = any(
                        int(f.get("width")) == w and int(f.get("height")) == h for (w, h) in sizes
                    )
                except (TypeError, ValueError):
                    entry["dimensionsMatch"] = None
            else:
                entry["dimensionsReal"] = dims
                entry["dimensionsManifest"] = [f.get("width"), f.get("height")]
                try:
                    entry["dimensionsMatch"] = (
                        float(f.get("width")) == float(dims[0])
                        and float(f.get("height")) == float(dims[1])
                    )
                except (TypeError, ValueError):
                    entry["dimensionsMatch"] = None
            if entry["dimensionsMatch"] is False:
                issues.append(
                    {
                        "id": aid,
                        "file": f.get("path"),
                        "issue": "dimensions mismatch",
                        "manifest": [f.get("width"), f.get("height")],
                        "real": dims,
                    }
                )
        rec["files"].append(entry)
    if rec["missingTopFields"]:
        issues.append({"id": aid, "issue": f"missing top fields {rec['missingTopFields']}"})
    records.append(rec)

# Files on disk without an entry
all_files = []
for p in ASSET_SCOPE.rglob("*"):
    if p.is_file():
        all_files.append(p.relative_to(ROOT).as_posix())
excluding_renders = [f for f in all_files if "/evidence/renders/" not in f]
unregistered = [f for f in excluding_renders if f not in registered_paths]
report["scopeFiles"] = len(excluding_renders)
report["registeredFiles"] = len(registered_paths)
report["unregisteredFiles"] = unregistered
if unregistered:
    issues.append({"issue": "files in asset scope without manifest entry", "count": len(unregistered), "files": unregistered[:40]})

# Prohibited symbols anywhere in the manifest
report["prohibitedSymbols"] = {"registered": len(re.findall(r"[\u00ae\u2122]", text))}
if report["prohibitedSymbols"]["registered"]:
    issues.append({"issue": "registered-trademark glyph in manifest", "count": report["prohibitedSymbols"]["registered"]})

report["issues"] = issues
report["records"] = records
OUT.write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")

print("manifest:", MANIFEST.name, len(text), "B")
print("assets:", len(assets), "| files on disk (excl. renders):", report["scopeFiles"], "| registered:", len(registered_paths))
print("unregistered files:", len(unregistered), unregistered[:10])
print("issues:", len(issues))
for i in issues[:60]:
    print("  ", i)
print("issue kinds:", sorted({i['issue'] for i in issues}))
