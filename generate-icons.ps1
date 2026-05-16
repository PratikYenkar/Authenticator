Add-Type -AssemblyName System.Drawing

$src = Join-Path $PSScriptRoot "icon.png"
$base = Join-Path $PSScriptRoot "android\app\src\main\res"

$sizes = @(
  @{ dir = "mipmap-mdpi";    px = 48  },
  @{ dir = "mipmap-hdpi";    px = 72  },
  @{ dir = "mipmap-xhdpi";   px = 96  },
  @{ dir = "mipmap-xxhdpi";  px = 144 },
  @{ dir = "mipmap-xxxhdpi"; px = 192 }
)

$original = [System.Drawing.Image]::FromFile($src)

foreach ($s in $sizes) {
  $bmp = New-Object System.Drawing.Bitmap($s.px, $s.px)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.DrawImage($original, 0, 0, $s.px, $s.px)
  $g.Dispose()

  $dir = Join-Path $base $s.dir
  $bmp.Save((Join-Path $dir "ic_launcher.png"), [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Save((Join-Path $dir "ic_launcher_round.png"), [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()

  Write-Host "OK $($s.dir) ($($s.px)x$($s.px))"
}

$original.Dispose()
Write-Host "Done! Rebuild the app to see the new icon."
