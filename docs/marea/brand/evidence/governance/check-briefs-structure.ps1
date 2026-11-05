# =============================================================================
# MC-04 MC-04-BRIEFS.yaml structural + Spanish-quality check (READ-ONLY)
# Owner: Governance. Write scope: docs/marea/brand/evidence/governance/**
#
# Reproduces the acceptance checks for the brief manifest after the IR-09 accent
# fix:
#   1. every blocked entry carries all 20 brief fields
#   2. invariant status/provider/files/generated_at values
#   3. Spanish caption/alt strings: guillemets « », accents present, no
#      accent-stripped forms, ES/EN pairs non-empty
#   4. no invented file path, sha256, generated_at date
#
# Run: pwsh -NoProfile -File docs/marea/brand/evidence/governance/check-briefs-structure.ps1
# Exit 0 = PASS, 1 = FAIL.
# =============================================================================

$ErrorActionPreference = 'Continue'
$repo = 'C:\Users\Admin\Documents\workspace\embarcarte'
Set-Location $repo
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$p = 'docs/marea/assets/manifest/MC-04-BRIEFS.yaml'
$raw = Get-Content $p -Raw
$utf8Bytes = [System.IO.File]::ReadAllBytes((Join-Path $repo $p))
$failures = New-Object System.Collections.Generic.List[string]

Write-Output '============================================================'
Write-Output 'MC-04-BRIEFS.yaml structural + Spanish-quality check'
Write-Output ('Command : pwsh -NoProfile -File docs/marea/brand/evidence/governance/check-briefs-structure.ps1')
Write-Output ('Run at  : ' + (Get-Date -Format 'yyyy-MM-ddTHH:mm:sszzz'))
Write-Output ('File    : ' + $p + ' (' + $utf8Bytes.Length + ' B, ' + ($raw -split "`n").Count + ' lines)')
Write-Output '============================================================'

# --- 1. entry structure -----------------------------------------------------
$keys = @('asset_id','destination','subject','composition','camera_position','lens_perspective',
  'lighting','marine_environment','background','brand_colour_constraints','hardware_realism',
  'classification','aspect_ratio','target_pixel_dimensions','mobile_crop','negative_constraints',
  'html_copy_safe_areas','caption_alt_es_en','usage_rights','provider_status_actual')

$chunks = $raw -split "(?m)^\s*-\s*id:\s*'"
$n = $chunks.Count - 1
Write-Output ('entries found: ' + $n + ' (expected 17)')
if ($n -ne 17) { $failures.Add("expected 17 entries, found $n") }

$blocked = 0
for ($i = 1; $i -lt $chunks.Count; $i++) {
  $c = $chunks[$i]
  $id = ($c -split "'", 2)[0]
  $missing = @()
  foreach ($k in $keys) {
    if ($c -notmatch ("(?m)^\s+" + [regex]::Escape($k) + ":\s")) { $missing += $k }
  }
  $status = if ($c -match '(?m)^\s+status:\s*(BLOCKED_ON_IMAGE_GENERATION|PRODUCIBLE_WITHOUT_GENERATION)') { $Matches[1] } else { 'MISSING' }
  if ($status -eq 'BLOCKED_ON_IMAGE_GENERATION') { $blocked++ }
  $filesEmpty = $c -match '(?m)^\s+files:\s*\[\]'
  $genNull = $c -match '(?m)^\s+generated_at:\s*null'
  $fields20 = $c -match 'brief_fields_complete:\s*20'

  if ($missing.Count) { $failures.Add("$id missing fields: " + ($missing -join ', ')) }
  if ($status -eq 'MISSING') { $failures.Add("$id has no recognised status") }
  if (-not $filesEmpty) { $failures.Add("$id files list is not empty") }
  if (-not $genNull) { $failures.Add("$id generated_at is not null") }
  if (-not $fields20) { $failures.Add("$id brief_fields_complete is not 20") }

  Write-Output ('  {0,-12} status={1,-28} fields={2} files_empty={3} generated_at_null={4}' -f $id, $status, $(if ($missing.Count) { 'MISSING' } else { '20/20' }), $filesEmpty, $genNull)
}
Write-Output ('blocked entries: ' + $blocked + ' (expected 16)')
if ($blocked -ne 16) { $failures.Add("expected 16 blocked entries, found $blocked") }

# --- 2. no invented file/provenance ----------------------------------------
$pathEntries = ([regex]::Matches($raw, '(?m)^\s+-\s+path:')).Count
$shaValues = ([regex]::Matches($raw, "sha256:\s*['`"]?[0-9a-fA-F]{64}")).Count
$dateValues = ([regex]::Matches($raw, 'generated_at:\s*20[0-9]{2}-')).Count
Write-Output ("invented file paths: $pathEntries (expected 0) | real sha256 values: $shaValues (expected 0) | generated_at dates: $dateValues (expected 0)")
if ($pathEntries -ne 0) { $failures.Add('file path entry found') }
if ($shaValues -ne 0) { $failures.Add('sha256 value found') }
if ($dateValues -ne 0) { $failures.Add('generated_at date found') }

# --- 3. Spanish caption/alt quality ----------------------------------------
$es = @([regex]::Matches($raw, "(?:caption_es|alt_es|^\s+es)\s*:\s*'([^']*)'", 'Multiline') | ForEach-Object { $_.Groups[1].Value })
$nonAscii = 0
foreach ($v in $es) { foreach ($ch in $v.ToCharArray()) { if ([int][char]$ch -gt 127) { $nonAscii++ } } }
$withGuillemets = ($es | Where-Object { $_ -match '«' -and $_ -match '»' }).Count
$strippedPattern = '\b(fotografia|instalacion|Rias Baixas|navegacion|timon|Tripulacion|anonima|condicion|imagenes|cebida|composicion|autonomo|traccion|mastil|recepcion|deposito|plastico|embarcacion|telefono|notificacion|Planificacion|travesia|prevision|probabilisticas|Operacion|ponton|Ilustracion|tecnica|ortograficas|isometrica|bilingue|indicacion)\b'
$stripped = @($es | Where-Object { [regex]::IsMatch($_, $strippedPattern) })

Write-Output ('ES strings: ' + $es.Count + ' (expected 68) | with guillemets: ' + $withGuillemets + ' | non-ASCII chars: ' + $nonAscii + ' | accent-stripped forms: ' + $stripped.Count)
if ($es.Count -ne 68) { $failures.Add("expected 68 ES strings, found " + $es.Count) }
if ($withGuillemets -ne $es.Count) { $failures.Add('some ES strings lack « »') }
if ($nonAscii -lt 200) { $failures.Add('too few accented characters in ES strings: ' + $nonAscii) }
foreach ($s in $stripped) { $failures.Add('accent-stripped ES string: ' + $s) }

# ES/EN pairs must both be present. Quote style is deliberately tolerant: YAML may
# use double quotes when a value contains an apostrophe (e.g. "Installer's hands…").
$esCount = ([regex]::Matches($raw, "caption_es:\s*['`"]")).Count + ([regex]::Matches($raw, "alt_es:\s*['`"]")).Count + ([regex]::Matches($raw, "(?m)^\s+es:\s*['`"]")).Count
$enCount = ([regex]::Matches($raw, "caption_en:\s*['`"]")).Count + ([regex]::Matches($raw, "alt_en:\s*['`"]")).Count + ([regex]::Matches($raw, "(?m)^\s+en:\s*['`"]")).Count
Write-Output ('ES/EN key counts: ' + $esCount + ' / ' + $enCount)
if ($esCount -ne $enCount) { $failures.Add('ES/EN key counts differ') }

# --- 4. verdict -------------------------------------------------------------
Write-Output ''
if ($failures.Count -eq 0) {
  Write-Output 'RESULT: PASS'
  exit 0
}
Write-Output ('RESULT: FAIL (' + $failures.Count + ')')
foreach ($f in $failures) { Write-Output ('  - ' + $f) }
exit 1
