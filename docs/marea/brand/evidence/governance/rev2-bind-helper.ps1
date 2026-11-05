# =============================================================================
# MC-04 D-16 Rev.2 binding helper (READ-ONLY)
# Owner: Governance. Write scope: docs/marea/brand/evidence/governance/**
#
# Purpose: produce the exact, real values that Rev.2 of
#   docs/marea/brand/ORIGINALITY-AND-PRIOR-ART-CHECK.md
# must record for each SHORTLISTED construction: path, bytes, SHA-256, viewBox,
# dimensions, title/role, geometry inventory, and a paste-ready markdown table.
#
# RULE: a SHA-256 may only enter the dossier if this script printed it from the
# real file. The Lead's instruction is explicit: never add a hash you have not
# computed from the real file.
#
# Usage (one or two files):
#   pwsh -NoProfile -File docs/marea/brand/evidence/governance/rev2-bind-helper.ps1 `
#        -File docs/marea/brand/territories/territory-a-construction.svg `
#        -Role "Candidate 1 - shortlisted construction"
#   pwsh -NoProfile -File .../rev2-bind-helper.ps1 -File <path2> -Role "Candidate 2 ..."
#
# It does NOT edit the dossier, does NOT write any file, and rejects paths outside
# docs/marea/brand/ (the D-16 dossier may only bind brand-directory artwork).
# =============================================================================

param(
  [Parameter(Mandatory = $true)][string]$File,
  [string]$Role = 'UNSPECIFIED'
)

$ErrorActionPreference = 'Stop'
$repo = 'C:\Users\Admin\Documents\workspace\embarcarte'
Set-Location $repo
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

$allowedPrefix = (Join-Path $repo 'docs\marea\brand')
$full = [System.IO.Path]::GetFullPath((Join-Path $repo $File))

function Fail([string]$msg) {
  Write-Output ('BIND-REFUSED: ' + $msg)
  exit 1
}

if (-not $full.StartsWith($allowedPrefix)) { Fail ('path is outside docs/marea/brand/: ' + $full) }
if (-not (Test-Path $full)) { Fail ('file does not exist: ' + $full) }
$item = Get-Item $full
if ($item.Length -le 0) { Fail 'file is empty (0 bytes)' }

$raw = Get-Content $full -Raw
$rel = $full.Replace($repo + '\', '').Replace('\', '/')

# --- integrity + identity --------------------------------------------------
$sha = (Get-FileHash -Path $full -Algorithm SHA256).Hash.ToLowerInvariant()

# --- SVG facts -------------------------------------------------------------
$viewBox = ''
$m = [regex]::Match($raw, 'viewBox\s*=\s*"([^"]+)"')
if ($m.Success) { $viewBox = $m.Groups[1].Value }
else { $viewBox = 'MISSING' }

$widthAttr = ''
$mw = [regex]::Match($raw, '<svg[^>]*\swidth\s*=\s*"([^"]+)"')
if ($mw.Success) { $widthAttr = $mw.Groups[1].Value }

$heightAttr = ''
$mh = [regex]::Match($raw, '<svg[^>]*\sheight\s*=\s*"([^"]+)"')
if ($mh.Success) { $heightAttr = $mh.Groups[1].Value }

$title = ''
$mt = [regex]::Match($raw, '<title[^>]*>([\s\S]*?)</title>')
if ($mt.Success) { $title = ($mt.Groups[1].Value -replace '\s+', ' ').Trim() }

$svgRole = ''
$mr = [regex]::Match($raw, '<svg[^>]*\srole\s*=\s*"([^"]+)"')
if ($mr.Success) { $svgRole = $mr.Groups[1].Value }

$hasScript = [bool]([regex]::IsMatch($raw, '<script'))
$hasExternal = [bool]([regex]::IsMatch($raw, 'href\s*=\s*"http|xlink:href\s*=\s*"http|@import|url\(http'))
$hasRaster = [bool]([regex]::IsMatch($raw, '<image\s'))

# --- geometry inventory (facts read from the file, not from prose) ---------
function Count-Tags([string]$tag) {
  return ([regex]::Matches($raw, '<' + $tag + '[\s>/]')).Count
}
$strokes = @()
foreach ($sm in [regex]::Matches($raw, 'stroke-width\s*=\s*"([0-9.]+)"')) {
  $strokes += $sm.Groups[1].Value
}
$strokes = @($strokes | Sort-Object -Unique)
$fills = @()
foreach ($fm in [regex]::Matches($raw, 'fill\s*=\s*"([^"]+)"')) { $fills += $fm.Groups[1].Value }
$fills = @($fills | Sort-Object -Unique)
$textCount = Count-Tags 'text'
$pathCount = Count-Tags 'path'
$lineCount = Count-Tags 'line'
$rectCount = Count-Tags 'rect'
$circleCount = Count-Tags 'circle'
$groupCount = Count-Tags 'g'

# --- paste-ready markdown --------------------------------------------------
Write-Output '============================================================'
Write-Output 'MC-04 D-16 REV.2 BINDING RECORD — generated from the real file'
Write-Output ('Generated at : ' + (Get-Date -Format 'yyyy-MM-ddTHH:mm:sszzz'))
Write-Output ('Role label   : ' + $Role)
Write-Output ('Command      : pwsh -NoProfile -File docs/marea/brand/evidence/governance/rev2-bind-helper.ps1 -File ' + $rel + ' -Role "' + $Role + '"')
Write-Output '============================================================'
Write-Output ('path        : ' + $rel)
Write-Output ('bytes       : ' + $item.Length)
Write-Output ('sha256      : ' + $sha)
Write-Output ('viewBox     : ' + $viewBox)
Write-Output ('width/height: ' + $(if ($widthAttr -or $heightAttr) { $widthAttr + ' / ' + $heightAttr } else { 'not set (viewBox-only file)' }))
Write-Output ('role        : ' + $(if ($svgRole) { $svgRole } else { 'not set' }))
Write-Output ('title       : ' + $(if ($title) { $title } else { 'MISSING <title>' }))
Write-Output ('hygiene     : script=' + $hasScript + ' externalRefs=' + $hasExternal + ' embeddedRaster=' + $hasRaster)
Write-Output ('elements    : g=' + $groupCount + ' path=' + $pathCount + ' line=' + $lineCount + ' rect=' + $rectCount + ' circle=' + $circleCount + ' text=' + $textCount)
Write-Output ('stroke-w    : ' + $(if ($strokes.Count) { $strokes -join ', ' } else { 'none declared' }))
Write-Output ('fill tokens : ' + $(if ($fills.Count) { $fills -join ', ' } else { 'none declared' }))
Write-Output ''
Write-Output '--- paste-ready row for D-16 §5 (replace TBD after human verification of geometry) ---'
Write-Output ('| ' + $Role + ' | `' + $rel + '` | ' + $item.Length + ' B | `' + $sha + '` | `' + $viewBox + '` | TBD: verify geometry against this file before writing the description |')
Write-Output ''
Write-Output 'NOTE: the hash above is valid for THIS file content at THIS moment. If the artwork is'
Write-Output 'revised again, the dossier must be rebound and the old hash deleted, not "updated silently".'
