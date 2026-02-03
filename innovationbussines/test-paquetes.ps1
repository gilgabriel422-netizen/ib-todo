# Script de prueba rápida para la integración de paquetes turísticos
# Uso: powershell -ExecutionPolicy Bypass -File test-paquetes.ps1

Write-Host "========================================" -ForegroundColor Yellow
Write-Host "🧪 Prueba de Integración de Paquetes" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Yellow
Write-Host ""

$API_BASE = "http://localhost:5000/api"

Write-Host "1. Verificando conexión a la API..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$API_BASE/paquetes" -Method Get -ErrorAction Stop
    Write-Host "✓ API disponible" -ForegroundColor Green
} catch {
    Write-Host "✗ API no disponible. Asegúrate de que el backend esté corriendo." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "2. Obteniendo lista de paquetes..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$API_BASE/paquetes" -Method Get
    $data = $response.Content | ConvertFrom-Json
    $count = ($data | Measure-Object).Count
    Write-Host "✓ Se encontraron $count paquetes" -ForegroundColor Green
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "3. Probando creación de paquete de prueba..." -ForegroundColor Yellow
$testPackage = @{
    nombre = "Test Package"
    descripcion = "Paquete de prueba"
    precio = 999.99
    duracion = "3 días / 2 noches"
    imagen = "/images/test.jpg"
    grupo = "2-4 personas"
    calificacion = 4.5
    tipo = "Internacional"
    activo = $true
} | ConvertTo-Json

try {
    $createResponse = Invoke-WebRequest -Uri "$API_BASE/paquetes" `
        -Method Post `
        -Headers @{"Content-Type"="application/json"} `
        -Body $testPackage
    
    $testData = $createResponse.Content | ConvertFrom-Json
    $testId = $testData.id
    
    if ($testId) {
        Write-Host "✓ Paquete creado exitosamente (ID: $testId)" -ForegroundColor Green
        
        Write-Host ""
        Write-Host "4. Probando actualización del paquete..." -ForegroundColor Yellow
        $updatePackage = @{
            nombre = "Test Package - Updated"
            descripcion = "Paquete actualizado"
            precio = 1099.99
            duracion = "4 días / 3 noches"
            imagen = "/images/test-updated.jpg"
            grupo = "2-6 personas"
            calificacion = 4.8
            tipo = "Internacional"
            activo = $true
        } | ConvertTo-Json
        
        $updateResponse = Invoke-WebRequest -Uri "$API_BASE/paquetes/$testId" `
            -Method Put `
            -Headers @{"Content-Type"="application/json"} `
            -Body $updatePackage
        
        $updateData = $updateResponse.Content | ConvertFrom-Json
        if ($updateData.nombre -like "*Updated*") {
            Write-Host "✓ Paquete actualizado exitosamente" -ForegroundColor Green
        }
        
        Write-Host ""
        Write-Host "5. Probando obtención individual..." -ForegroundColor Yellow
        $getResponse = Invoke-WebRequest -Uri "$API_BASE/paquetes/$testId" -Method Get
        $getData = $getResponse.Content | ConvertFrom-Json
        Write-Host "✓ Paquete obtenido exitosamente" -ForegroundColor Green
        
        Write-Host ""
        Write-Host "6. Limpiando (eliminando paquete de prueba)..." -ForegroundColor Yellow
        $deleteResponse = Invoke-WebRequest -Uri "$API_BASE/paquetes/$testId" -Method Delete
        Write-Host "✓ Paquete eliminado exitosamente" -ForegroundColor Green
    } else {
        Write-Host "✗ Error al crear el paquete de prueba" -ForegroundColor Red
    }
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "✓ Pruebas completadas" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Próximos pasos:" -ForegroundColor Yellow
Write-Host "1. Inicia el backend: cd backend && npm start"
Write-Host "2. Inicia el frontend: cd frontend && npm run dev"
Write-Host "3. Accede al Admin Panel para gestionar paquetes"
