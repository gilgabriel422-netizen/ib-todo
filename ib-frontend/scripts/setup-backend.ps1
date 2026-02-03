# Setup del backend - Innovation Business CRM
# Ejecutar desde la raíz del proyecto: .\scripts\setup-backend.ps1

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$backendPath = Join-Path $root "backend"

if (-not (Test-Path $backendPath)) {
    Write-Error "No se encontró backend en: $backendPath"
    exit 1
}

Set-Location $backendPath

$envExample = Join-Path $backendPath ".env.example"
$envFile = Join-Path $backendPath ".env"

if (Test-Path $envExample) {
    if (-not (Test-Path $envFile)) {
        Copy-Item $envExample $envFile
        Write-Host "[OK] Creado .env desde .env.example. Revisa DB_PASSWORD si es necesario."
    } else {
        Write-Host "[INFO] Ya existe .env. No se sobrescribe."
    }
} else {
    Write-Host "[AVISO] No existe .env.example. Crea .env manualmente con DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT, JWT_SECRET."
}

Write-Host "Instalando dependencias..."
npm install
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "Inicializando base de datos (asegurate de que PostgreSQL este en ejecucion)..."
npm run init-db
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host ""
Write-Host "=== Backend listo ==="
Write-Host "Para iniciar el servidor: cd backend ; npm run dev"
Write-Host "El API quedara en http://localhost:5000"
