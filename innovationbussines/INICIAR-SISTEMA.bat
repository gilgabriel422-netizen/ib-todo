@echo off
echo ============================================
echo   INNOVATION BUSINESS - CRM FUSIONADO
echo ============================================
echo.
echo Iniciando Backend en puerto 5000...
echo.

cd /d "%~dp0backend"
start "Backend - Innovation Business" cmd /k "npm run dev"

timeout /t 3 /nobreak >nul

echo.
echo Backend iniciado! Iniciando Frontend en puerto 3000...
echo.

cd /d "%~dp0frontend"
start "Frontend - Innovation Business" cmd /k "npm run dev"

echo.
echo ============================================
echo   Sistema iniciado correctamente!
echo ============================================
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Presiona cualquier tecla para cerrar esta ventana...
pause >nul
