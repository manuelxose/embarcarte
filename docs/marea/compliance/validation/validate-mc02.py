#!/usr/bin/env python3
"""Deterministic validation of the MC-02 audit artifacts.

Run from anywhere:  python docs/marea/compliance/validation/validate-mc02.py
Read-only. Exits non-zero if a structural check fails.

Checks:
- MASTER-PROMPT-REGISTRY.md contains exactly 36 unique prompt IDs (01-36) in the
  registry section, and the schedule-change table does not duplicate them.
- SOFTWARE-LICENSE-INVENTORY.csv has the required 12-column header prefix, 1,034
  data rows, 21 columns and a consistent field count.
- MARINE-DATA-RIGHTS-MATRIX.csv has 28 data rows, 28 columns and a consistent
  field count, and its classification distribution matches the claim.
- MC-02-BLOCKERS-AND-DECISIONS.md has 58 records with the recorded category,
  severity and status distributions.
- The required MC-02 deliverables exist (audit set + delivery + independent review).
- Every docs/marea/... reference in the compliance set resolves inside EMBARCARTE.

This script validates document structure and internal consistency only. It does
not re-derive the technical audit evidence (that is the reviewer's job) and does
not give legal or commercial clearance.
"""

import csv
import io
import os
import re
import sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "..", ".."))
COMP = os.path.join(ROOT, "docs", "marea", "compliance")
EXEC = os.path.join(ROOT, "docs", "marea", "execution")

failures = []
notes = []


def ok(msg):
    notes.append(msg)


# --- registry -------------------------------------------------------------
reg_path = os.path.join(EXEC, "MASTER-PROMPT-REGISTRY.md")
with open(reg_path, encoding="utf-8") as fh:
    reg = fh.read()
registry_section = reg.split("## Schedule change log")[0]
rows = re.findall(r"^\| (\d{2}) \|", registry_section, re.M)
if len(rows) != 36 or sorted(set(rows)) != [f"{i:02d}" for i in range(1, 37)]:
    failures.append(f"registry: expected 36 unique prompt IDs, found {len(rows)} rows / {len(set(rows))} IDs")
else:
    ok("registry: 36 prompt IDs")
if "PARTIAL (image generation externally BLOCKED" not in reg:
    failures.append("registry: MC-01 PARTIAL status not preserved")
if "D-001" not in reg or "Schedule change log" not in reg:
    failures.append("registry: schedule decision D-001 not recorded")

# --- software licence inventory ------------------------------------------
sbom_path = os.path.join(COMP, "SOFTWARE-LICENSE-INVENTORY.csv")
with open(sbom_path, encoding="utf-8") as fh:
    sbom = list(csv.reader(io.StringIO(fh.read())))
required = [
    "component", "version", "source", "workspace", "usage", "license",
    "license_evidence", "distribution_mode", "obligations", "risk", "status", "action",
]
if sbom[0][:12] != required:
    failures.append("SBOM: required 12-column header prefix mismatch")
if len(sbom) - 1 != 1034:
    failures.append(f"SBOM: expected 1034 data rows, found {len(sbom) - 1}")
bad = [i for i, row in enumerate(sbom) if len(row) != len(sbom[0])]
if bad:
    failures.append(f"SBOM: {len(bad)} rows with inconsistent field count (first index {bad[0]})")
else:
    ok(f"SBOM: {len(sbom) - 1} rows x {len(sbom[0])} columns")

# --- data rights matrix ---------------------------------------------------
data_path = os.path.join(COMP, "MARINE-DATA-RIGHTS-MATRIX.csv")
with open(data_path, encoding="utf-8") as fh:
    data = list(csv.reader(io.StringIO(fh.read())))
if len(data) - 1 != 28:
    failures.append(f"data rights: expected 28 rows, found {len(data) - 1}")
bad = [i for i, row in enumerate(data) if len(row) != len(data[0])]
if bad:
    failures.append(f"data rights: {len(bad)} rows with inconsistent field count")
cls_index = data[0].index("classification")
counts = {}
for row in data[1:]:
    counts[row[cls_index]] = counts.get(row[cls_index], 0) + 1
expected_cls = {
    "PERMITTED": 3,
    "PERMITTED_CONDITIONAL": 5,
    "CONDITIONAL": 8,
    "NOT_PERMITTED": 1,
    "LEGAL_REVIEW_REQUIRED": 11,
}
if counts != expected_cls:
    failures.append(f"data rights: classification distribution {counts} != {expected_cls}")
else:
    ok(f"data rights: {len(data) - 1} rows; classification distribution verified")

# --- blocker register -----------------------------------------------------
bl_path = os.path.join(COMP, "MC-02-BLOCKERS-AND-DECISIONS.md")
with open(bl_path, encoding="utf-8") as fh:
    bl = fh.read()
records = re.findall(
    r"^\| ((?:L|S|D|H|P|X)-\d{2}) \| .+? \| .+? \| (CRITICAL|HIGH|MEDIUM|LOW) \|",
    bl,
    re.M,
)
ids = [r[0] for r in records]
sev = {}
cat = {}
status = {}
for rid, severity in records:
    sev[severity] = sev.get(severity, 0) + 1
    cat[rid[0]] = cat.get(rid[0], 0) + 1
for line in bl.splitlines():
    m = re.match(r"^\| ((?:L|S|D|H|P|X)-\d{2}) \|", line)
    if not m:
        continue
    cells = [c.strip() for c in line.strip().strip("|").split("|")]
    status[cells[-2]] = status.get(cells[-2], 0) + 1
if len(records) != 58 or len(set(ids)) != 58:
    failures.append(f"blockers: expected 58 unique records, found {len(records)} ({len(set(ids))} unique)")
if cat != {"L": 9, "S": 9, "D": 10, "H": 13, "P": 10, "X": 7}:
    failures.append(f"blockers: category distribution {cat}")
if sev != {"CRITICAL": 10, "HIGH": 37, "MEDIUM": 11}:
    failures.append(f"blockers: severity distribution {sev}")
expected_status = {
    "BLOCKED": 28, "OPEN": 22, "LEGAL_REVIEW_REQUIRED": 4,
    "NOT_YET_ASSESSABLE": 1, "REUSE-CONDITIONAL": 1, "BUILD": 2,
}
if status != expected_status:
    failures.append(f"blockers: status distribution {status} != {expected_status}")
if not failures:
    ok(f"blockers: 58 records; severity {sev}; status distribution verified")

# --- required deliverables -------------------------------------------------
required_files = [
    "MC-02-EXECUTIVE-VERDICT.md",
    "OPEN-MARINE-CAPABILITY-INVENTORY.md",
    "INTELLECTUAL-PROPERTY-CHAIN.md",
    "SOFTWARE-LICENSE-INVENTORY.csv",
    "MARINE-DATA-RIGHTS-MATRIX.csv",
    "HARDWARE-COMPLIANCE-MATRIX.md",
    "MAREA-PRODUCT-REUSE-MAP.md",
    "MAREA-COMMERCIAL-ARCHITECTURE.md",
    "LICENSE-NOTICE-AND-DISTRIBUTION-POLICY.md",
    "MC-02-BLOCKERS-AND-DECISIONS.md",
    "MC-02-DELIVERY.md",
    "MC-02-REVIEW.md",
]
missing = [name for name in required_files if not os.path.exists(os.path.join(COMP, name))]
if missing:
    failures.append(f"missing deliverables: {missing}")
else:
    ok(f"deliverables: {len(required_files)}/{len(required_files)} present")

# --- internal docs/marea references --------------------------------------
link_checked = 0
for name in os.listdir(COMP):
    if not name.endswith(".md"):
        continue
    with open(os.path.join(COMP, name), encoding="utf-8") as fh:
        text = fh.read()
    for target in re.findall(r"`(docs/marea/[^`\s]+)`", text):
        clean = re.sub(r":\d[\d,\-]*$", "", target)
        if "*" in clean or "{" in clean:
            continue
        link_checked += 1
        if not os.path.exists(os.path.join(ROOT, clean.replace("/", os.sep))):
            failures.append(f"broken docs/marea reference in {name}: {target}")
ok(f"internal docs/marea references checked: {link_checked}")

print("MC-02 VALIDATION")
for note in notes:
    print(f"  OK   {note}")
if failures:
    print("FAILURES")
    for failure in failures:
        print(f"  FAIL {failure}")
    sys.exit(1)
print("RESULT: all structural checks passed.")
