# =============================================================================
# MC-04 governance compliance scan (read-only)
# Owner: Governance. Write scope: docs/marea/brand/evidence/governance/**
# Purpose: real, reproducible prohibited-pattern / integrity scan of the MC-04
#          brand documents and authored SVG/HTML assets. Read-only with respect to
#          every governed file: it only writes its own report next to itself.
#
# Run:  pwsh -NoProfile -File docs/marea/brand/evidence/governance/run-compliance-scan.ps1
# Output: docs/marea/brand/evidence/governance/MC-04-COMPLIANCE-SCAN-OUTPUT.txt (UTF-8)
#
# Scope note: the evidence directory itself is EXCLUDED from the scan, because
# evidence files quote prohibited strings as data; including them would create
# self-referential hits and inflate counts.
# =============================================================================

$ErrorActionPreference = 'Continue'
$repo = 'C:\Users\Admin\Documents\workspace\embarcarte'
Set-Location $repo

$brandDir = 'docs/marea/brand'
$manifestDir = 'docs/marea/assets/manifest'
$evidenceDir = 'docs/marea/brand/evidence'
$outPath = Join-Path $evidenceDir 'governance\MC-04-COMPLIANCE-SCAN-OUTPUT.txt'

$textExt = @('.md', '.json', '.yaml', '.yml', '.csv', '.txt', '.html')
$brandText = @(
  Get-ChildItem $brandDir -Recurse -File |
    Where-Object { $textExt -contains $_.Extension.ToLower() } |
    Where-Object { -not $_.FullName.Contains($evidenceDir.Replace('/', '\')) }
)
$manifestText = @(
  Get-ChildItem $manifestDir -Recurse -File -ErrorAction SilentlyContinue |
    Where-Object { $textExt -contains $_.Extension.ToLower() }
)
$files = $brandText + $manifestText

$svgs = @(
  Get-ChildItem $brandDir -Recurse -File |
    Where-Object { $_.Extension.ToLower() -eq '.svg' } |
    Where-Object { -not $_.FullName.Contains($evidenceDir.Replace('/', '\')) }
)
$htmls = @(
  Get-ChildItem $brandDir -Recurse -File |
    Where-Object { $_.Extension.ToLower() -eq '.html' } |
    Where-Object { -not $_.FullName.Contains($evidenceDir.Replace('/', '\')) }
)

$log = New-Object System.Collections.Generic.List[string]
function Add-Line([string]$text) { $script:log.Add($text) }

Add-Line '============================================================'
Add-Line 'MC-04 PROHIBITED-PATTERN / INTEGRITY SCAN'
Add-Line ('Exact command      : pwsh -NoProfile -File docs/marea/brand/evidence/governance/run-compliance-scan.ps1')
Add-Line ('Run at             : ' + (Get-Date -Format 'yyyy-MM-ddTHH:mm:sszzz'))
Add-Line ('Host / shell       : ' + $env:COMPUTERNAME + ' / PowerShell ' + $PSVersionTable.PSVersion.ToString())
Add-Line ('Working directory  : ' + (Get-Location).Path)
Add-Line ('Text files in scope: ' + $files.Count)
Add-Line ('SVG files in scope : ' + $svgs.Count)
Add-Line ('HTML files in scope: ' + $htmls.Count)
Add-Line ('Excluded from scope: docs/marea/brand/evidence/** (this report quotes prohibited strings)')
Add-Line '============================================================'
Add-Line ''

function Show-Hits {
  param([string]$Header, [hashtable[]]$Rules, [string[]]$ExcerptDetail)
  Add-Line ('--- ' + $Header + ' ---')
  foreach ($rule in $Rules) {
    $params = @{ Pattern = $rule.Pattern; AllMatches = $true; ErrorAction = 'SilentlyContinue' }
    if ($rule.ContainsKey('CaseSensitive') -and $rule.CaseSensitive) { $params['CaseSensitive'] = $true }
    $hits = @($files + $svgs + $htmls | Select-String @params)
    $fileCount = ($hits | Select-Object -ExpandProperty Path -Unique | Measure-Object).Count
    Add-Line ('PATTERN {0}{1} | files_hit={2} | lines_hit={3}' -f $rule.Name, $(if ($rule.ContainsKey('CaseSensitive') -and $rule.CaseSensitive) { ' [case-sensitive]' } else { '' }), $fileCount, $hits.Count)
    if ($ExcerptDetail -contains $rule.Name) {
      foreach ($h in ($hits | Select-Object -First 40)) {
        $rel = $h.Path.Replace((Get-Location).Path + '\', '')
        $txt = $h.Line.Trim()
        if ($txt.Length -gt 210) { $txt = $txt.Substring(0, 210) + '...' }
        Add-Line ('   {0}:{1}: {2}' -f $rel, $h.LineNumber, $txt)
      }
    }
    else {
      $perFile = $hits | Group-Object Path | Sort-Object Count -Descending
      foreach ($g in ($perFile | Select-Object -First 30)) {
        $rel = $g.Name.Replace((Get-Location).Path + '\', '')
        Add-Line ('   {0}: {1} line(s)' -f $rel, $g.Count)
      }
    }
  }
  Add-Line ''
}

# ---------------------------------------------------------------------------
Show-Hits -Header 'SCAN 1: trademark symbols and registration words' -ExcerptDetail @('registered-trademark-words', 'registered-words-es') -Rules @(
  @{ Name = 'registered-symbol-R'; Pattern = [string][char]0x00AE },
  @{ Name = 'unregistered-symbol-TM'; Pattern = [string][char]0x2122 },
  @{ Name = 'registered-trademark-words'; Pattern = 'marca registrada|registered trademark|registered trade mark' },
  @{ Name = 'registered-words-es'; Pattern = 'registrad[ao] como marca|marca registrada' }
)

# ---------------------------------------------------------------------------
Show-Hits -Header 'SCAN 2: certification / standard / IP-rating claim language' -ExcerptDetail @('CE-mark-word') -Rules @(
  @{ Name = 'CE-mark-word'; Pattern = '\bCE\b' },
  @{ Name = 'certified-or-certification'; Pattern = 'certified|certificaci[oó]n|certificado|type-approved|homologad[oa]' },
  @{ Name = 'NMEA'; Pattern = 'NMEA' },
  @{ Name = 'IP-rating'; Pattern = 'IP[0-9]{2}|IPX[0-9]' },
  @{ Name = 'waterproof'; Pattern = 'waterproof|impermeable|estanco al agua|marine-grade|grado marino' }
)

# ---------------------------------------------------------------------------
Show-Hits -Header 'SCAN 3: availability / price / performance claim language' -ExcerptDetail @('availability', 'price') -Rules @(
  @{ Name = 'availability'; Pattern = 'available now|in stock|buy now|add to cart|immediately available|commercially available|disponible ahora|en stock' },
  @{ Name = 'price'; Pattern = 'price from|precio desde|from €|€[0-9]|EUR [0-9]' },
  @{ Name = 'performance-superlative'; Pattern = 'most accurate|the best|the safest|100% reliable|guaranteed|garantizado' },
  @{ Name = 'collision-avoidance'; Pattern = 'collision avoidance|evitaci[oó]n de colisiones|prevents collisions' }
)

# ---------------------------------------------------------------------------
Show-Hits -Header 'SCAN 4: clearance / approval / adoption / originality language' -ExcerptDetail @('cleared-upper', 'approved-for-use', 'adopted-upper', 'originality-claim') -Rules @(
  @{ Name = 'cleared-upper'; Pattern = 'CLEARED'; CaseSensitive = $true },
  @{ Name = 'approved-for-use'; Pattern = 'APPROVED_FOR_USE'; CaseSensitive = $true },
  @{ Name = 'approved-for-use-lower'; Pattern = 'approved for use|aprobad[oa] para uso' },
  @{ Name = 'identity-adoption-lower'; Pattern = 'identity (has been |is |was )?adopted|identidad adoptada' },
  @{ Name = 'adopted-upper'; Pattern = 'ADOPTED'; CaseSensitive = $true },
  @{ Name = 'originality-claim'; Pattern = 'proven original|confirmed original|original and distinctive|conjunto original|original set|marca original|distintiv[oa] y original' }
)

# ---------------------------------------------------------------------------
Add-Line '--- SCAN 5: fabricated-image / provenance integrity ---'
$raster = @(
  Get-ChildItem 'docs/marea' -Recurse -File -ErrorAction SilentlyContinue |
    Where-Object { @('.png', '.jpg', '.jpeg', '.webp', '.avif', '.gif', '.ico', '.mp4') -contains $_.Extension.ToLower() }
)
Add-Line ('raster_or_video_files_under_docs/marea = {0}' -f $raster.Count)
foreach ($r in $raster) {
  Add-Line ('   FOUND RASTER: ' + $r.FullName.Replace((Get-Location).Path + '\', '') + ' (' + $r.Length + ' B)')
}

$manifestFiles = @(Get-ChildItem $manifestDir -Recurse -File -Filter '*.yaml' -ErrorAction SilentlyContinue)
Add-Line ('manifest_yaml_files = {0}' -f $manifestFiles.Count)
foreach ($m in $manifestFiles) {
  $rel = $m.FullName.Replace((Get-Location).Path + '\', '')
  $aiTrue = @(Select-String -Path $m.FullName -Pattern 'ai_generated:\s*true' -ErrorAction SilentlyContinue)
  $fileEntries = @(Select-String -Path $m.FullName -Pattern '^\s+-\s+path:' -ErrorAction SilentlyContinue)
  $sha = @(Select-String -Path $m.FullName -Pattern 'sha256:\s*[''"]?[0-9a-fA-F]{64}' -ErrorAction SilentlyContinue)
  Add-Line ('   {0}: ai_generated_true_lines={1} file_path_entries={2} real_sha256_values={3}' -f $rel, $aiTrue.Count, $fileEntries.Count, $sha.Count)
}
Add-Line ''

# ---------------------------------------------------------------------------
Add-Line '--- SCAN 6: mandatory disclaimer presence (claims policy §9, brief §7.7) ---'
$disclaimers = @(
  @{ Name = 'NAV-ES'; Needle = 'ayuda a la navegación' },
  @{ Name = 'NAV-EN'; Needle = 'navigational aid' },
  @{ Name = 'AIS-ES'; Needle = 'únicamente de escucha' },
  @{ Name = 'AIS-EN'; Needle = 'receive-only' },
  @{ Name = 'PILOT-ES'; Needle = 'asistido y supervisado' },
  @{ Name = 'PILOT-EN'; Needle = 'assisted and supervised' },
  @{ Name = 'WEATHER-ES'; Needle = 'probabil' },
  @{ Name = 'WEATHER-EN'; Needle = 'probabilistic' }
)
foreach ($d in $disclaimers) {
  $svgHits = @($svgs | Select-String -Pattern ([regex]::Escape($d.Needle)) -ErrorAction SilentlyContinue)
  $htmlHits = @($htmls | Select-String -Pattern ([regex]::Escape($d.Needle)) -ErrorAction SilentlyContinue)
  $svgFiles = ($svgHits | Select-Object -ExpandProperty Path -Unique | Measure-Object).Count
  $htmlFiles = ($htmlHits | Select-Object -ExpandProperty Path -Unique | Measure-Object).Count
  Add-Line ('DISCLAIMER {0} ("{1}") | svg_files_hit={2} | html_files_hit={3}' -f $d.Name, $d.Needle, $svgFiles, $htmlFiles)
}

foreach ($dir in @('docs/marea/brand/assets/diagrams', 'docs/marea/brand/specimens')) {
  if (Test-Path $dir) {
    $n = @(Get-ChildItem $dir -Recurse -File).Count
    Add-Line ('DIR {0} = EXISTS ({1} files)' -f $dir, $n)
    foreach ($f in (Get-ChildItem $dir -Recurse -File)) {
      $rel = $f.FullName.Replace((Get-Location).Path + '\', '')
      $ais = if (Select-String -Path $f.FullName -Pattern 'receive-only|solo escucha|únicamente de escucha' -Quiet) { 'AIS-OK' } else { 'AIS-ABSENT' }
      $pilot = if (Select-String -Path $f.FullName -Pattern 'supervised|supervisad|E-stop|paro de emergencia' -Quiet) { 'PILOT-OK' } else { 'PILOT-ABSENT' }
      $nav = if (Select-String -Path $f.FullName -Pattern 'navigational aid|ayuda a la navegación' -Quiet) { 'NAV-OK' } else { 'NAV-ABSENT' }
      Add-Line ('   {0}: {1} / {2} / {3}' -f $rel, $ais, $pilot, $nav)
    }
  }
  else {
    Add-Line ('DIR {0} = NOT PRESENT at scan time' -f $dir)
  }
}

$policy = Get-Content 'docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md' -Raw
foreach ($needle in @(
    'Este producto es una ayuda a la navegación',
    'This product is a navigational aid',
    'La recepción AIS es únicamente de escucha',
    'AIS reception is receive-only',
    'El sistema de gobierno es asistido y supervisado',
    'The steering system is assisted and supervised',
    'Las previsiones son probabilísticas',
    'Forecasts are probabilistic'
  )) {
  $present = if ($policy.Contains($needle)) { 'PRESENT' } else { 'ABSENT' }
  Add-Line ('POLICY-CLAUSE {0} in COMMERCIAL-BRAND-CLAIMS-POLICY.md' -f $present)
}
Add-Line ''

# ---------------------------------------------------------------------------
Show-Hits -Header 'SCAN 7: ECDIS-equivalence / autonomy / safety-instrument implication' -ExcerptDetail @() -Rules @(
  @{ Name = 'ECDIS'; Pattern = 'ECDIS' },
  @{ Name = 'solas-gmdss-distress'; Pattern = '\bSOLAS\b|\bGMDSS\b|\bdistress\b' },
  @{ Name = 'autonomous-steering'; Pattern = 'fully autonomous|autonomous steering|gobierno aut[oó]nomo|self-steering without supervision' },
  @{ Name = 'remote-helm'; Pattern = 'remote helm|control remoto del tim[oó]n' },
  @{ Name = 'safety-guarantee'; Pattern = 'guarantees safety|garantiza la seguridad|prevents accidents' }
)

# ---------------------------------------------------------------------------
Add-Line '--- SCAN 8: trademark symbol ATTACHED to MAREA / family / bundle (decisive rule) ---'
$attachPattern = '\bmarea(?:\s+(?:NAV|HUB|AIS|PILOT|SENSE|WATCH|DISPLAY|WEATHER|FLEET|START|CRUISE|SAIL|PROTECT|COMPLETE))*\s*[®™]'
$attachHits = @($files + $svgs + $htmls | Select-String -Pattern $attachPattern -ErrorAction SilentlyContinue)
Add-Line ('symbol_attached_to_brand_lines = {0}  (expected 0 while TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED)' -f $attachHits.Count)
foreach ($h in $attachHits) {
  $rel = $h.Path.Replace((Get-Location).Path + '\', '')
  Add-Line ('   ATTACHED-SYMBOL: {0}:{1}: {2}' -f $rel, $h.LineNumber, $h.Line.Trim())
}
Add-Line ''

# ---------------------------------------------------------------------------
Add-Line '--- SCAN 9: SVG/HTML authored-artwork claim context (excerpt level) ---'
$artRules = @(
  'certified|certificaci[oó]n|certificado',
  '\bCE\b',
  'NMEA',
  'collision avoidance|evitaci[oó]n de colisiones',
  'fully autonomous|autonomous steering|gobierno aut[oó]nomo',
  'asistido y supervisado|assisted and supervised',
  'receive-only|solo escucha',
  'probabil',
  '\bECDIS\b|\bSOLAS\b|\bGMDSS\b|\bdistress\b',
  'waterproof|impermeable|marine-grade'
)
foreach ($rule in $artRules) {
  $hits = @($svgs + $htmls | Select-String -Pattern $rule -ErrorAction SilentlyContinue)
  Add-Line ('ARTWORK-PATTERN {0} | lines_hit={1}' -f $rule, $hits.Count)
  foreach ($h in ($hits | Select-Object -First 25)) {
    $rel = $h.Path.Replace((Get-Location).Path + '\', '')
    $txt = $h.Line.Trim()
    if ($txt.Length -gt 240) { $txt = $txt.Substring(0, 240) + '...' }
    Add-Line ('   {0}:{1}: {2}' -f $rel, $h.LineNumber, $txt)
  }
}
Add-Line ''

# ---------------------------------------------------------------------------
Add-Line '--- SCAN 10: SVG hygiene / accessibility of authored icon SVGs ---'
$svgNoTitle = 0
foreach ($s in $svgs) {
  $raw = Get-Content $s.FullName -Raw
  $hasTitle = $raw -match '<title'
  $hasViewBox = $raw -match 'viewBox='
  $hasScript = $raw -match '<script'
  $hasExternal = $raw -match 'href="http|xlink:href="http|@import|url\(http'
  if (-not $hasTitle -or -not $hasViewBox -or $hasScript -or $hasExternal) {
    $svgNoTitle++
    $rel = $s.FullName.Replace((Get-Location).Path + '\', '')
    Add-Line ('   SVG-ISSUE {0}: title={1} viewBox={2} script={3} external={4}' -f $rel, $hasTitle, $hasViewBox, $hasScript, $hasExternal)
  }
}
Add-Line ('svg_files_with_hygiene_issue = {0} of {1}' -f $svgNoTitle, $svgs.Count)
Add-Line ''

# ---------------------------------------------------------------------------
Add-Line '--- SCAN 11: per-file inventory of scanned files ---'
foreach ($f in ($files + $svgs + $htmls | Sort-Object FullName -Unique)) {
  $rel = $f.FullName.Replace((Get-Location).Path + '\', '')
  Add-Line ('   {0} ({1} B)' -f $rel, $f.Length)
}
Add-Line ''
Add-Line '============================================================'
Add-Line 'SCAN COMPLETE'
Add-Line '============================================================'

$log | Out-File -FilePath $outPath -Encoding utf8
Write-Output ('Report written: ' + $outPath)
Write-Output ('Lines: ' + $log.Count)
Write-Output ('Text files: ' + $files.Count + ' | SVG: ' + $svgs.Count + ' | HTML: ' + $htmls.Count)
