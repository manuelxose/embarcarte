# =============================================================================
# MC-04 D-16 Rev.2 FROZEN binding run (READ-ONLY w.r.t. artwork)
# Owner: Governance. Writes ONLY its own evidence report under
# docs/marea/brand/evidence/governance/**.
#
# Trigger: the Lead's FROZEN signal of 2026-10-30 ("IdentityVector declares the
# logo/mark geometry final", 12 SVGs in assets/logo/ + measured report
# territories/evidence/svg-geometry-report.{md,json}).
#
# Method: for every file below it invokes rev2-bind-helper.ps1 and copies the
# helper-printed path / bytes / SHA-256 / viewBox / hygiene data. Nothing is
# hand-typed: a value that the helper did not print does not enter the dossier.
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

# role -> repo-relative path. Roles are honest: the master lockups are labelled
# as "built on the C symbol" because their own <desc> says so; do not relabel
# them as the B lockup.
$targets = [ordered]@{
  'C1 Territory B - construction drawing'        = 'docs/marea/brand/territories/territory-b-construction.svg'
  'C1 Territory B - lockup (primary)'            = 'docs/marea/brand/territories/territory-b-lockup-primary.svg'
  'C1 Territory B - mark compact'                = 'docs/marea/brand/territories/territory-b-mark-compact.svg'
  'C1 Territory B - mark mono'                   = 'docs/marea/brand/territories/territory-b-mark-mono.svg'
  'C1 Territory B - mark reversed'               = 'docs/marea/brand/territories/territory-b-mark-reversed.svg'
  'C2 Territory C - construction drawing'        = 'docs/marea/brand/territories/territory-c-construction.svg'
  'C2 Territory C - lockup (primary)'            = 'docs/marea/brand/territories/territory-c-lockup-primary.svg'
  'C2 Territory C - mark compact'                = 'docs/marea/brand/territories/territory-c-mark-compact.svg'
  'C2 Territory C - mark mono'                   = 'docs/marea/brand/territories/territory-c-mark-mono.svg'
  'C2 Territory C - mark reversed'               = 'docs/marea/brand/territories/territory-c-mark-reversed.svg'
  'MASTER wordmark (symbol-free)'                = 'docs/marea/brand/assets/logo/marea-wordmark.svg'
  'MASTER lockup primary (built on C symbol)'    = 'docs/marea/brand/assets/logo/marea-lockup-primary.svg'
  'MASTER lockup mono (built on C symbol)'       = 'docs/marea/brand/assets/logo/marea-lockup-mono.svg'
  'MASTER lockup reversed (built on C symbol)'   = 'docs/marea/brand/assets/logo/marea-lockup-reversed.svg'
  'MASTER mark compact (built on C symbol)'      = 'docs/marea/brand/assets/logo/marea-mark-compact.svg'
  'D1 AIS receive-only diagram'                  = 'docs/marea/brand/assets/diagrams/marea-ais-receive-only.svg'
  'D2 ecosystem overview diagram'                = 'docs/marea/brand/assets/diagrams/marea-ecosystem-overview.svg'
  'D3 PILOT supervised boundary diagram'         = 'docs/marea/brand/assets/diagrams/marea-pilot-supervised-boundary.svg'
  'S1 icon/instrument specimen index'            = 'docs/marea/brand/specimens/index.html'
  'S2 alerts specimen'                           = 'docs/marea/brand/specimens/alerts.html'
  'S3 pilot specimen'                            = 'docs/marea/brand/specimens/pilot.html'
}

$log = New-Object System.Collections.Generic.List[string]
function Add-Line([string]$s) { $script:log.Add($s) }

Add-Line '============================================================'
Add-Line 'MC-04 D-16 REV.2 — FROZEN BINDING RUN'
Add-Line ('Binding performed at : ' + (Get-Date -Format 'yyyy-MM-ddTHH:mm:sszzz'))
Add-Line 'FROZEN signal          : Lead, 2026-10-30 — "IdentityVector declares the logo/mark geometry final"'
Add-Line '                        (12 SVGs in docs/marea/brand/assets/logo/; measured report'
Add-Line '                        territories/evidence/svg-geometry-report.{md,json})'
Add-Line 'Binding happened after : the Lead FROZEN signal. No value below was typed by hand:'
Add-Line '                        every hash/bytes/viewBox line is copied from rev2-bind-helper.ps1 output.'
Add-Line ('Helper                 : ' + $helper + ' (SHA-256 via Get-FileHash; refuses paths outside docs/marea/brand/)')
Add-Line ('Files targeted         : ' + $targets.Count)
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
Add-Line '--- BOUND FILE TABLE (paste-ready; every value helper-printed) ---'
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
