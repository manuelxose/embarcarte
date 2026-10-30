# =============================================================================
# MC-04 governance — governedPaths trial (READ-ONLY w.r.t. the real contract)
# Owner: Governance. Writes ONLY under docs/marea/brand/evidence/governance/**
#
# Two isolated scenarios, each with its own trial root and its own copy of the
# contract (the REAL contract is never modified):
#   A — full proposed MC-04 addition list (12 documents)
#   B — minimal, highest-value addition only (D-16 + D-12)
#
# Run: pwsh -NoProfile -File docs/marea/brand/evidence/governance/run-governedpaths-trial.ps1
# =============================================================================

$ErrorActionPreference = 'Continue'
$repo = 'C:\Users\Admin\Documents\workspace\embarcarte'
Set-Location $repo
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

$report = 'docs/marea/brand/evidence/governance/MC-04-GOVERNEDPATHS-TRIAL.txt'
$realContract = 'docs/marea/brand/brand-identity.contract.json'

$scenarioA = @(
  'docs/marea/brand/ORIGINALITY-AND-PRIOR-ART-CHECK.md',
  'docs/marea/brand/PHOTOGRAPHY-AND-CGI-ART-DIRECTION.md',
  'docs/marea/brand/IDENTITY-SYSTEM.md',
  'docs/marea/brand/TERRITORY-COMPARISON.md',
  'docs/marea/brand/TYPOGRAPHY-SYSTEM.md',
  'docs/marea/brand/COLOUR-SYSTEM.md',
  'docs/marea/brand/MC-04-ACCESSIBILITY-EVIDENCE.md',
  'docs/marea/brand/ICONOGRAPHY-SYSTEM.md',
  'docs/marea/brand/ILLUSTRATION-STANDARDS.md',
  'docs/marea/brand/HARDWARE-CMF-DIRECTION.md',
  'docs/marea/brand/PACKAGING-DIRECTION.md',
  'docs/marea/brand/BRAND-GOVERNANCE-IMPLEMENTATION.md'
)
$scenarioB = @(
  'docs/marea/brand/ORIGINALITY-AND-PRIOR-ART-CHECK.md',
  'docs/marea/brand/PHOTOGRAPHY-AND-CGI-ART-DIRECTION.md'
)

$out = New-Object System.Collections.Generic.List[string]
$out.Add('============================================================')
$out.Add('MC-04 GOVERNEDPATHS TRIAL — would the proposed contract expansion keep test:brand passing?')
$out.Add('Exact command : pwsh -NoProfile -File docs/marea/brand/evidence/governance/run-governedpaths-trial.ps1')
$out.Add('Run at        : ' + (Get-Date -Format 'yyyy-MM-ddTHH:mm:sszzz'))
$out.Add('Host          : ' + $env:COMPUTERNAME + ' / PowerShell ' + $PSVersionTable.PSVersion.ToString())
$out.Add('Real contract : NEVER modified (a copy is written under each trial root); verified after the run')
$out.Add('')
$out.Add('Why a trial root: scripts/check-brand.mjs exempts the contract named by --contract from text')
$out.Add('scanning. A trial copy at the canonical path inside an isolated root reproduces the real run')
$out.Add('exactly, including how new governed documents are scanned.')
$out.Add('')
$out.Add('NOT governable by this validator at all: docs/marea/assets/manifest/MC-04-BRIEFS.yaml')
$out.Add('  (scripts/check-brand.mjs rejects governedPaths outside docs/marea/brand/).')
$out.Add('KNOWN FAILURE RISK: docs/marea/brand/MC-03-REVIEW.md must NOT be added (quoted MAREA® fixtures).')
$out.Add('============================================================')
$out.Add('')

function Run-Scenario {
  param([string]$Name, [string[]]$Proposed)
  $trialRoot = "docs/marea/brand/evidence/governance/trial-root-$Name"
  $trialBrand = Join-Path $trialRoot 'docs/marea/brand'
  if (Test-Path $trialRoot) { Remove-Item $trialRoot -Recurse -Force }
  New-Item -ItemType Directory -Path $trialBrand -Force | Out-Null

  $contract = Get-Content $realContract -Raw | ConvertFrom-Json
  foreach ($p in $Proposed) {
    if ($contract.governedPaths -notcontains $p) { $contract.governedPaths += $p }
  }
  $contract | ConvertTo-Json -Depth 30 | Set-Content -Path (Join-Path $trialBrand 'brand-identity.contract.json') -Encoding utf8

  $copied = @(); $missing = @()
  foreach ($rel in $contract.governedPaths) {
    if ($rel -eq 'docs/marea/brand/brand-identity.contract.json') { continue }
    $src = Join-Path $repo $rel
    if (Test-Path $src) {
      $dest = Join-Path $trialBrand ($rel -replace '^docs/marea/brand/', '')
      New-Item -ItemType Directory -Path (Split-Path $dest -Parent) -Force | Out-Null
      Copy-Item $src $dest -Force
      $copied += $rel
    }
    else { $missing += $rel }
  }

  $script:out.Add('################################################################')
  $script:out.Add('SCENARIO ' + $Name + ' — ' + $Proposed.Count + ' proposed addition(s)')
  $script:out.Add('Trial root    : ' + $trialRoot)
  $script:out.Add('Command       : node scripts/check-brand.mjs --root ' + $trialRoot)
  $script:out.Add('Additions     :')
  foreach ($p in $Proposed) { $script:out.Add('   + ' + $p) }
  $script:out.Add('Copied into trial root: ' + $copied.Count + ' existing governed file(s); not-yet-produced (skipped, not a failure): ' + $missing.Count)
  foreach ($m in $missing) { $script:out.Add('   skipped (does not exist yet): ' + $m) }
  $script:out.Add('')

  $validatorOut = & node scripts/check-brand.mjs --root $trialRoot 2>&1
  $validatorExit = $LASTEXITCODE
  $script:out.Add('--- validator output (verbatim) ---')
  foreach ($line in $validatorOut) { $script:out.Add([string]$line) }
  $script:out.Add('--- end validator output ---')
  $script:out.Add('')
  $script:out.Add('SCENARIO ' + $Name + ' RESULT: exit code = ' + $validatorExit + ' (0 = PASS, 1 = FAIL)')
  $script:out.Add('################################################################')
  $script:out.Add('')
  return $validatorExit
}

$exitA = Run-Scenario -Name 'A-full' -Proposed $scenarioA
$exitB = Run-Scenario -Name 'B-minimal' -Proposed $scenarioB

$realCount = (Get-Content $realContract -Raw | ConvertFrom-Json).governedPaths.Count
$out.Add('SUMMARY')
$out.Add('  Scenario A (full proposed list of 12) : exit ' + $exitA + ' -> ' + $(if ($exitA -eq 0) { 'PASS' } else { 'FAIL' }))
$out.Add('  Scenario B (D-16 + D-12 only)         : exit ' + $exitB + ' -> ' + $(if ($exitB -eq 0) { 'PASS' } else { 'FAIL' }))
$out.Add('  Real contract governedPaths after trial: ' + $realCount + ' (unchanged by this script)')
$out.Add('')
$out.Add('If Scenario A fails, read the FAIL lines: they name the exact document and line that must be')
$out.Add('reworded before that document can be governed. The Lead fixes the wording, never the validator.')

$out | Out-File -FilePath $report -Encoding utf8
Write-Output ('Report written: ' + $report)
Write-Output ('Scenario A exit = ' + $exitA + ' | Scenario B exit = ' + $exitB + ' | real governedPaths = ' + $realCount)
