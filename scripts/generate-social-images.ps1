# Regenerate social / favicon assets from public/marketing.png
# Run: npm run social-images

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$srcPath = Join-Path $root "public\marketing.png"

if (-not (Test-Path $srcPath)) {
  Write-Error "Missing public/marketing.png"
}

Add-Type -AssemblyName System.Drawing

function Save-CroppedImage($outName, $targetW, $targetH) {
  $outPath = Join-Path $root "public\$outName"
  $src = [System.Drawing.Image]::FromFile($srcPath)
  $bmp = New-Object System.Drawing.Bitmap $targetW, $targetH
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $tgtRatio = $targetW / $targetH
  $srcRatio = $src.Width / $src.Height
  if ($srcRatio -gt $tgtRatio) {
    $cropW = [int]($src.Height * $tgtRatio)
    $cropH = $src.Height
    $x = [int](($src.Width - $cropW) / 2)
    $y = 0
  } else {
    $cropW = $src.Width
    $cropH = [int]($src.Width / $tgtRatio)
    $x = 0
    $y = [int](($src.Height - $cropH) / 2)
  }
  $srcRect = New-Object System.Drawing.Rectangle $x, $y, $cropW, $cropH
  $destRect = New-Object System.Drawing.Rectangle 0, 0, $targetW, $targetH
  $g.DrawImage($src, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
  $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose()
  $bmp.Dispose()
  $src.Dispose()
  Write-Host "Wrote public/$outName (${targetW}x${targetH})"
}

Save-CroppedImage "og-image.png" 1200 630
Save-CroppedImage "twitter-card.png" 1200 675
# Tab + Apple icons: src/app/icon.tsx and src/app/apple-icon.tsx (not marketing.png)
