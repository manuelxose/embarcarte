Set-Location 'C:\Users\Admin\Documents\workspace\embarcarte'
$raw = 'docs/marea/brand/evidence/review/raw'
function Run-Gate($name, $command) {
  $out = Join-Path $raw ("gate-" + $name + ".txt")
  $cmd = "npm run " + $command + " *> '" + $out + "'"
  Invoke-Expression $cmd
  $code = $LASTEXITCODE
  Add-Content -Path $out -Value ("EXIT=" + $code)
  Write-Output ($name + " EXIT=" + $code)
}
Run-Gate 'build' 'build'
Run-Gate 'i18n' 'test:i18n'
Run-Gate 'commerce' 'test:commerce'
Run-Gate 'seo' 'test:seo'
Run-Gate 'backup' 'test:backup'
Run-Gate 'e2e' 'test:e2e'
