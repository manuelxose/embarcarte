# =============================================================================
# MC-04 IR-09 verification run (READ-ONLY except its own report file)
# Owner: Governance. Write scope: docs/marea/brand/evidence/governance/**
#
# Runs the three acceptance checks for the IR-09 accent fix and stores their real
# output, UTF-8, next to this script:
#   MC-04-BRIEFS-IR09-OUTPUT.txt
#
# Run: pwsh -NoProfile -File docs/marea/brand/evidence/governance/run-ir09-verification.ps1
# =============================================================================

$ErrorActionPreference = 'Continue'
$repo = 'C:\Users\Admin\Documents\workspace\embarcarte'
Set-Location $repo
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

$outPath = 'docs/marea/brand/evidence/governance/MC-04-BRIEFS-IR09-OUTPUT.txt'
$log = New-Object System.Collections.Generic.List[string]
function Add-Line([string]$s) { $script:log.Add($s) }

Add-Line '============================================================'
Add-Line 'MC-04 IR-09 VERIFICATION — Spanish accents in MC-04-BRIEFS.yaml'
Add-Line ('Run at  : ' + (Get-Date -Format 'yyyy-MM-ddTHH:mm:sszzz'))
Add-Line ('Host    : ' + $env:COMPUTERNAME + ' / PowerShell ' + $PSVersionTable.PSVersion.ToString())
Add-Line '============================================================'
Add-Line ''

$fileInfo = Get-Item 'docs/marea/assets/manifest/MC-04-BRIEFS.yaml'
Add-Line ('FILE: docs/marea/assets/manifest/MC-04-BRIEFS.yaml — ' + $fileInfo.Length + ' B')
$bytes = [System.IO.File]::ReadAllBytes($fileInfo.FullName)
$utf8 = New-Object System.Text.UTF8Encoding($false)
$text = $utf8.GetString($bytes)
Add-Line ('lines: ' + ($text -split "`n").Count)
Add-Line ''

# --- CHECK 1: idempotent accent audit --------------------------------------
Add-Line '--- CHECK 1: node docs/marea/brand/evidence/governance/ir09-fix-accents.mjs --check-only ---'
$check1 = & node docs/marea/brand/evidence/governance/ir09-fix-accents.mjs --check-only 2>&1
$exit1 = $LASTEXITCODE
foreach ($l in $check1) { Add-Line ([string]$l) }
Add-Line ('CHECK 1 exit = ' + $exit1 + ' (0 expected; 0 pending replacements)')
Add-Line ''

# --- CHECK 2: structural + Spanish-quality gate ----------------------------
Add-Line '--- CHECK 2: pwsh -NoProfile -File docs/marea/brand/evidence/governance/check-briefs-structure.ps1 ---'
$check2 = & pwsh -NoProfile -File docs/marea/brand/evidence/governance/check-briefs-structure.ps1 2>&1
$exit2 = $LASTEXITCODE
foreach ($l in $check2) { Add-Line ([string]$l) }
Add-Line ('CHECK 2 exit = ' + $exit2 + ' (0 expected = PASS)')
Add-Line ''

# --- CHECK 3: prettier YAML parse/format ----------------------------------
Add-Line '--- CHECK 3: npx prettier --check docs/marea/assets/manifest/MC-04-BRIEFS.yaml ---'
$check3 = & npx prettier --check docs/marea/assets/manifest/MC-04-BRIEFS.yaml 2>&1
$exit3 = $LASTEXITCODE
foreach ($l in $check3) { Add-Line ([string]$l) }
Add-Line ('CHECK 3 exit = ' + $exit3 + ' (0 expected)')
Add-Line ''

Add-Line '============================================================'
Add-Line ('SUMMARY: check1=' + $exit1 + ' check2=' + $exit2 + ' check3=' + $exit3 + ' | ' +
  $(if (($exit1 -eq 0) -and ($exit2 -eq 0) -and ($exit3 -eq 0)) { 'ALL PASS' } else { 'AT LEAST ONE FAIL' }))
Add-Line '============================================================'

$log | Out-File -FilePath $outPath -Encoding utf8
Write-Output ('Report written: ' + $outPath + ' (' + $log.Count + ' lines)')
Write-Output ('check1=' + $exit1 + ' check2=' + $exit2 + ' check3=' + $exit3)
