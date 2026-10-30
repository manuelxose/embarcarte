# =============================================================================
# MC-04 D-16 Rev.4 FROZEN REBIND run (READ-ONLY w.r.t. artwork)
# Owner: Governance. Writes ONLY its own evidence report under
# docs/marea/brand/evidence/governance/**.
#
# WHY THIS RUN EXISTS (delete-and-rebind, logged):
#   The v1 binding (2026-10-30T18:48:48+01:00, evidence archived as
#   MC-04-D16-BINDING-EVIDENCE-v1-2026-10-30T184848.txt) bound the OLD master set
#   which was built on the C construction, while the recorded preference was B.
#   IdentityVector then reissued the whole master set from construction B (corrected
#   arc weight 3.2 units = 10.4% of ink height) and AssetProduction re-rendered
#   everything with `--all`. The Lead instructed a delete-and-rebind.
#   Old hashes are NOT edited in place: they stay in the v1 evidence file and in the
#   D-16 change log; the live table is replaced wholesale by this run's output.
#
# Method: rev2-bind-helper.ps1 per file (SHA-256 via Get-FileHash; refuses paths
# outside docs/marea/brand/). Nothing is typed by hand: a value that the helper did
# not print does not enter the dossier.
#
# Run: pwsh -NoProfile -File docs/marea/brand/evidence/governance/run-d16-binding.ps1
# =============================================================================

$ErrorActionPreference = 'Stop'
$repo = 'C:\Users\Admin\Documents\workspace\embarcarte'
Set-Location $repo
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

$helper = 'docs/marea/brand/evidence/governance/rev2-bind-helper.ps1'
$reportPath = 'docs/marea/brand/evidence/governance/MC-04-D16-BINDING-EVIDENCE.txt'

$targets = [ordered]@{
  # --- shortlisted territory B: reissued from construction B -----------------
  'B construction drawing'                         = 'docs/marea/brand/territories/territory-b-construction.svg'
  'B lockup (primary)'                             = 'docs/marea/brand/territories/territory-b-lockup-primary.svg'
  'B mark compact'                                 = 'docs/marea/brand/territories/territory-b-mark-compact.svg'
  'B mark mono'                                    = 'docs/marea/brand/territories/territory-b-mark-mono.svg'
  'B mark reversed'                                = 'docs/marea/brand/territories/territory-b-mark-reversed.svg'
  # --- shortlisted strategic alternative C (rebound for table consistency) --
  'C construction drawing'                         = 'docs/marea/brand/territories/territory-c-construction.svg'
  'C lockup (primary)'                             = 'docs/marea/brand/territories/territory-c-lockup-primary.svg'
  'C mark compact'                                 = 'docs/marea/brand/territories/territory-c-mark-compact.svg'
  'C mark mono'                                    = 'docs/marea/brand/territories/territory-c-mark-mono.svg'
  'C mark reversed'                                = 'docs/marea/brand/territories/territory-c-mark-reversed.svg'
  # --- MASTER set: reissued from construction B ------------------------------
  'MASTER wordmark'                                = 'docs/marea/brand/assets/logo/marea-wordmark.svg'
  'MASTER lockup primary (B)'                      = 'docs/marea/brand/assets/logo/marea-lockup-primary.svg'
  'MASTER lockup mono (B)'                         = 'docs/marea/brand/assets/logo/marea-lockup-mono.svg'
  'MASTER lockup reversed (B)'                     = 'docs/marea/brand/assets/logo/marea-lockup-reversed.svg'
  'MASTER mark compact (B)'                        = 'docs/marea/brand/assets/logo/marea-mark-compact.svg'
  'MASTER mark reduced-16 (B)'                     = 'docs/marea/brand/assets/logo/marea-mark-reduced-16.svg'
  'MASTER construction grid (B)'                   = 'docs/marea/brand/assets/logo/marea-construction-grid.svg'
  # --- nine family lockups (reissued from B) --------------------------------
  'FAMILY NAV lockup'                              = 'docs/marea/brand/assets/logo/family/marea-family-nav-lockup.svg'
  'FAMILY HUB lockup'                              = 'docs/marea/brand/assets/logo/family/marea-family-hub-lockup.svg'
  'FAMILY AIS lockup'                              = 'docs/marea/brand/assets/logo/family/marea-family-ais-lockup.svg'
  'FAMILY PILOT lockup'                            = 'docs/marea/brand/assets/logo/family/marea-family-pilot-lockup.svg'
  'FAMILY SENSE lockup'                            = 'docs/marea/brand/assets/logo/family/marea-family-sense-lockup.svg'
  'FAMILY WATCH lockup'                            = 'docs/marea/brand/assets/logo/family/marea-family-watch-lockup.svg'
  'FAMILY DISPLAY lockup'                          = 'docs/marea/brand/assets/logo/family/marea-family-display-lockup.svg'
  'FAMILY WEATHER lockup'                          = 'docs/marea/brand/assets/logo/family/marea-family-weather-lockup.svg'
  'FAMILY FLEET lockup'                            = 'docs/marea/brand/assets/logo/family/marea-family-fleet-lockup.svg'
  # --- diagrams + specimens (content may be unchanged; rebound anyway) ------
  'D1 AIS receive-only diagram'                    = 'docs/marea/brand/assets/diagrams/marea-ais-receive-only.svg'
  'D2 ecosystem overview diagram'                  = 'docs/marea/brand/assets/diagrams/marea-ecosystem-overview.svg'
  'D3 PILOT supervised boundary diagram'           = 'docs/marea/brand/assets/diagrams/marea-pilot-supervised-boundary.svg'
  'S1 icon/instrument specimen index'              = 'docs/marea/brand/specimens/index.html'
  'S2 alerts specimen'                             = 'docs/marea/brand/specimens/alerts.html'
  'S3 pilot specimen'                              = 'docs/marea/brand/specimens/pilot.html'
  # --- regenerated territory evidence this dossier relies on ----------------
  'E1 measured geometry report (markdown)'         = 'docs/marea/brand/territories/evidence/svg-geometry-report.md'
  'E2 measured geometry report (json)'             = 'docs/marea/brand/territories/evidence/svg-geometry-report.json'
  'E3 reading-test evidence page'                  = 'docs/marea/brand/territories/evidence/reading-test.html'
}

$log = New-Object System.Collections.Generic.List[string]
function Add-Line([string]$s) { $script:log.Add($s) }

Add-Line '============================================================'
Add-Line 'MC-04 D-16 REV.4 — FROZEN DELETE-AND-REBIND RUN'
Add-Line ('Rebind performed at  : ' + (Get-Date -Format 'yyyy-MM-ddTHH:mm:sszzz'))
Add-Line 'Supersedes           : v1 binding 2026-10-30T18:48:48+01:00 (21 files, OLD C-based master set),'
Add-Line '                       archived as MC-04-D16-BINDING-EVIDENCE-v1-2026-10-30T184848.txt'
Add-Line 'Reason               : IdentityVector reissued the whole master set from construction B after the'
Add-Line '                       Lead recorded preference B; AssetProduction re-rendered everything (--all).'
Add-Line '                       The v1 live table is stale; this run replaces it wholesale.'
Add-Line 'Delete-and-rebind     : YES — old values are NOT edited in place; they remain in the v1 evidence'
Add-Line '                       file and in the D-16 change log. Every value below is helper-printed.'
Add-Line 'Helper               : ' + $helper + ' (SHA-256 via Get-FileHash; refuses paths outside docs/marea/brand/)'
Add-Line ('Files targeted       : ' + $targets.Count)
Add-Line '============================================================'
Add-Line ''

$rows = New-Object System.Collections.Generic.List[string]
$raw = New-Object System.Collections.Generic.List[string]
$count = 0
$failures = New-Object System.Collections.Generic.List[string]

foreach ($role in $targets.Keys) {
  $rel = $targets[$role]
  $raw.Add('################################################################')
  $raw.Add('ROLE: ' + $role)
  $raw.Add('FILE: ' + $rel)
  $out = & pwsh -NoProfile -File $helper -File $rel -Role $role 2>&1
  $exit = $LASTEXITCODE
  foreach ($l in $out) { $raw.Add([string]$l) }
  if ($exit -ne 0) {
    $failures.Add($role + ' -> helper exit ' + $exit)
    $rows.Add('| ' + $role + ' | `' + $rel + '` | **HELPER FAILED (exit ' + $exit + ')** | - | - |')
    continue
  }
  $text = ($out | ForEach-Object { [string]$_ }) -join "`n"
  $mBytes = [regex]::Match($text, 'bytes\s+:\s+(\d+)')
  $mSha = [regex]::Match($text, 'sha256\s+:\s+([0-9a-f]{64})')
  $mView = [regex]::Match($text, 'viewBox\s+:\s+(.+)', 'Multiline')
  $mHyg = [regex]::Match($text, 'hygiene\s+:\s+script=(\w+)\s+externalRefs=(\w+)\s+embeddedRaster=(\w+)')
  if (-not ($mBytes.Success -and $mSha.Success -and $mView.Success -and $mHyg.Success)) {
    $failures.Add($role + ' -> could not parse helper output')
    $rows.Add('| ' + $role + ' | `' + $rel + '` | **PARSE FAILED** | - | - |')
    continue
  }
  $hyg = 'script=' + $mHyg.Groups[1].Value + ' external=' + $mHyg.Groups[2].Value + ' raster=' + $mHyg.Groups[3].Value
  $view = $mView.Groups[1].Value.Trim()
  if ($rel.ToLower().EndsWith('.html')) { $view = 'N/A (HTML document)'; $hyg = 'N/A (HTML document)' }
  $rows.Add('| ' + $role + ' | `' + $rel + '` | ' + $mBytes.Groups[1].Value + ' B | `' + $mSha.Groups[1].Value + '` | `' + $view + '` | ' + $hyg + ' |')
  $count++
}

Add-Line ''
Add-Line '--- BOUND FILE TABLE v2 (paste-ready; every value helper-printed) ---'
Add-Line ''
Add-Line '| Role | Path | Bytes | SHA-256 | viewBox | Hygiene |'
Add-Line '| --- | --- | ---: | --- | --- | --- |'
foreach ($r in $rows) { Add-Line $r }
Add-Line ''
Add-Line ('Bound files: ' + $count + ' of ' + $targets.Count + ' | helper failures: ' + $failures.Count)
foreach ($f in $failures) { Add-Line ('FAILURE: ' + $f) }
Add-Line ''
Add-Line '--- RAW HELPER OUTPUT (one block per file) ---'
Add-Line ''
foreach ($l in $raw) { Add-Line $l }

$log | Out-File -FilePath $reportPath -Encoding utf8
Write-Output ('Report written: ' + $reportPath)
Write-Output ('Bound ' + $count + ' of ' + $targets.Count + ' files; failures=' + $failures.Count)
if ($failures.Count -gt 0) { foreach ($f in $failures) { Write-Output ('  FAIL: ' + $f) }; exit 1 }
exit 0
