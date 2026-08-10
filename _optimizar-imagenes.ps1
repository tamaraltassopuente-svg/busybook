# ==================================================================
#  BUSY BOOK · OPTIMIZAR LAS IMÁGENES DE IA
#  Las imágenes que salen de Gemini pesan entre 3 y 13 MB cada una.
#  Para un celular eso es imposible. Este script las deja en
#  512x512 PNG con fondo transparente, alrededor de 200 KB.
#
#  Los originales NO se borran: se mueven a originales-ia\ (que no
#  se publica en GitHub), por si alguna vez querés rehacerlas.
#
#  Uso:  click derecho -> Ejecutar con PowerShell
#        o desde una terminal:  .\_optimizar-imagenes.ps1
# ==================================================================
Add-Type -AssemblyName System.Drawing

$raiz      = Split-Path -Parent $MyInvocation.MyCommand.Path
$propias   = Join-Path $raiz 'img\propias'
$originales= Join-Path $raiz 'originales-ia'
$LADO      = 512

if (-not (Test-Path $originales)) { New-Item -ItemType Directory -Path $originales | Out-Null }

$archivos = Get-ChildItem -Path $propias -Filter *.png -File
if ($archivos.Count -eq 0) { Write-Host "No hay PNG en img\propias"; exit }

Write-Host ""
Write-Host "Optimizando $($archivos.Count) imagenes a ${LADO}x${LADO}..."
Write-Host ""

$pesoAntes = 0; $pesoDespues = 0; $hechas = 0

foreach ($a in $archivos) {
  $pesoAntes += $a.Length
  try {
    $img = [System.Drawing.Image]::FromFile($a.FullName)

    # Lienzo cuadrado y transparente
    $bmp = New-Object System.Drawing.Bitmap($LADO, $LADO, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g   = [System.Drawing.Graphics]::FromImage($bmp)
    $g.Clear([System.Drawing.Color]::Transparent)
    $g.InterpolationMode  = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode      = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode    = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    # Centrada, respetando la proporcion
    $esc = [Math]::Min($LADO / $img.Width, $LADO / $img.Height)
    $an  = [int]($img.Width  * $esc)
    $al  = [int]($img.Height * $esc)
    $g.DrawImage($img, [int](($LADO - $an) / 2), [int](($LADO - $al) / 2), $an, $al)

    $g.Dispose()
    $anchoOriginal = $img.Width
    $altoOriginal  = $img.Height
    $img.Dispose()

    # Guardamos primero a un temporal, porque el original y el destino
    # tienen el mismo nombre
    $tmp = Join-Path $env:TEMP ("bb_" + $a.Name)
    $bmp.Save($tmp, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()

    # El original se guarda, no se pierde
    Move-Item -Path $a.FullName -Destination (Join-Path $originales $a.Name) -Force
    Move-Item -Path $tmp -Destination $a.FullName -Force

    $nuevo = (Get-Item $a.FullName).Length
    $pesoDespues += $nuevo
    $hechas++
    $antesKB = [Math]::Round($a.Length / 1KB)
    $ahoraKB = [Math]::Round($nuevo / 1KB)
    Write-Host ("  {0,-46} {1,5} KB -> {2,4} KB   ({3}x{4})" -f $a.Name, $antesKB, $ahoraKB, $anchoOriginal, $altoOriginal)
  }
  catch {
    Write-Host ("  [ERROR] {0}: {1}" -f $a.Name, $_.Exception.Message)
  }
}

Write-Host ""
Write-Host "==============================================="
Write-Host ("  Optimizadas    : {0} de {1}" -f $hechas, $archivos.Count)
Write-Host ("  Peso antes     : {0} MB" -f [Math]::Round($pesoAntes / 1MB, 1))
Write-Host ("  Peso ahora     : {0} MB" -f [Math]::Round($pesoDespues / 1MB, 1))
if ($pesoAntes -gt 0) {
  Write-Host ("  Ahorro         : {0}%" -f [Math]::Round(100 - ($pesoDespues / $pesoAntes * 100)))
}
Write-Host ""
Write-Host "  Los originales quedaron en originales-ia\"
Write-Host "  (esa carpeta no se publica en GitHub)"
Write-Host "==============================================="
Write-Host ""
