@echo off
chcp 65001 >nul
cd /d "%~dp0"
title BUSY BOOK - PUBLICAR

echo.
echo  ================================================
echo    BUSY BOOK DIGITAL - PUBLICAR LOS CAMBIOS
echo  ================================================
echo.

git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
  echo  [X] Esta carpeta no es un repositorio de git.
  echo      Avisale a Claude para que la prepare de nuevo.
  echo.
  pause
  exit /b 1
)

git remote get-url origin >nul 2>&1
if errorlevel 1 (
  echo  [!] Todavia no esta conectada a GitHub.
  echo.
  echo      NO hace falta descargar ningun programa.
  echo      Falta hacer esto UNA sola vez, desde el navegador:
  echo.
  echo      1. En github.com: boton + arriba a la derecha
  echo      2. New repository  -  nombre: busybook  -  Public
  echo      3. Boton Create repository
  echo      4. Copia la direccion que te queda, algo tipo
  echo         https://github.com/TU-USUARIO/busybook.git
  echo      5. Pegasela a Claude y el conecta la carpeta
  echo.
  echo      Cuando se conecte, se va a abrir una ventanita del
  echo      navegador pidiendo autorizar. Toca Authorize y listo.
  echo      Tu contrasena no se la das a nadie: la guarda Windows.
  echo.
  echo      El paso a paso completo esta en COMO-PUBLICAR.md
  echo.
  pause
  exit /b 1
)

echo  Buscando cambios...
git add -A

git diff --cached --quiet
if not errorlevel 1 (
  echo.
  echo  [OK] No hay nada nuevo para publicar. Ya esta todo al dia.
  echo.
  pause
  exit /b 0
)

echo.
echo  Cambios encontrados:
git diff --cached --name-status
echo.

for /f "tokens=1-3 delims=/ " %%a in ("%DATE%") do set F=%%a-%%b-%%c
git -c commit.gpgsign=false commit -q -m "Actualizacion del %F% %TIME:~0,5%"
if errorlevel 1 (
  echo  [X] No se pudo guardar el cambio.
  pause
  exit /b 1
)

echo  Subiendo a GitHub...
git push -q origin main
if errorlevel 1 (
  echo.
  echo  [X] No se pudo subir.
  echo      Lo mas probable: falta iniciar sesion.
  echo      Abri GitHub Desktop, inicia sesion, y proba de nuevo.
  echo.
  pause
  exit /b 1
)

echo.
echo  ================================================
echo    [OK] LISTO. Publicado.
echo.
echo    En 1 o 2 minutos ya se ve en tu link.
echo    Si en el celular sigue apareciendo la version
echo    vieja, recarga tirando la pantalla hacia abajo.
echo  ================================================
echo.
pause
