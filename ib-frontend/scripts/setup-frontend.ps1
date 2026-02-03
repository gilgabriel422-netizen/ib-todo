# Setup del frontend - Innovation Business CRM
# Ejecutar desde la raíz del proyecto: .\scripts\setup-frontend.ps1

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$frontendPath = Join-Path $root "frontend"

if (-not (Test-Path $frontendPath)) {
    Write-Error "No se encontró frontend en: $frontendPath"
    exit 1
}

Set-Location $frontendPath

$envExample = Join-Path $frontendPath ".env.local.example"
$envFile = Join-Path $frontendPath ".env.local"

if (Test-Path $envExample) {
    if (-not (Test-Path $envFile)) {
        Copy-Item $envExample $envFile
        Write-Host "[OK] Creado .env.local desde .env.local.example."
    } else {
        Write-Host "[INFO] Ya existe .env.local. No se sobrescribe."
    }
} else {
    Write-Host "[AVISO] No existe .env.local.example. Crea .env.local con VITE_API_URL y VITE_OFFLINE_MODE."
}

Write-Host "Instalando dependencias..."
npm install
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host ""
Write-Host "=== Frontend listo ==="
Write-Host "Asegurate de que el backend este en http://localhost:5000"
Write-Host "Para iniciar: cd frontend ; npm run dev"
Write-Host "La app quedara en http://localhost:5173"
