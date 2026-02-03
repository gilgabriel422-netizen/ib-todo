#!/bin/bash

# Script de prueba rápida para la integración de paquetes turísticos
# Uso: bash test-paquetes.sh

echo "========================================"
echo "🧪 Prueba de Integración de Paquetes"
echo "========================================"
echo ""

API_BASE="http://localhost:5000/api"

# Color para salida
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}1. Verificando conexión a la API...${NC}"
curl -s "${API_BASE}/paquetes" > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ API disponible${NC}"
else
    echo -e "${RED}✗ API no disponible. Asegúrate de que el backend esté corriendo.${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}2. Obteniendo lista de paquetes...${NC}"
RESPONSE=$(curl -s "${API_BASE}/paquetes")
COUNT=$(echo "$RESPONSE" | grep -o '"id"' | wc -l)
echo -e "${GREEN}✓ Se encontraron $COUNT paquetes${NC}"

echo ""
echo -e "${YELLOW}3. Probando creación de paquete de prueba...${NC}"
TEST_PACKAGE='{
  "nombre": "Test Package",
  "descripcion": "Paquete de prueba",
  "precio": 999.99,
  "duracion": "3 días / 2 noches",
  "imagen": "/images/test.jpg",
  "grupo": "2-4 personas",
  "calificacion": 4.5,
  "tipo": "Internacional",
  "activo": true
}'

CREATE_RESPONSE=$(curl -s -X POST \
  -H "Content-Type: application/json" \
  -d "$TEST_PACKAGE" \
  "${API_BASE}/paquetes")

TEST_ID=$(echo "$CREATE_RESPONSE" | grep -o '"id":[0-9]*' | head -1 | cut -d: -f2)
if [ ! -z "$TEST_ID" ]; then
    echo -e "${GREEN}✓ Paquete creado exitosamente (ID: $TEST_ID)${NC}"
    
    echo ""
    echo -e "${YELLOW}4. Probando actualización del paquete...${NC}"
    UPDATE_PACKAGE='{
      "nombre": "Test Package - Updated",
      "descripcion": "Paquete actualizado",
      "precio": 1099.99,
      "duracion": "4 días / 3 noches",
      "imagen": "/images/test-updated.jpg",
      "grupo": "2-6 personas",
      "calificacion": 4.8,
      "tipo": "Internacional",
      "activo": true
    }'
    
    UPDATE_RESPONSE=$(curl -s -X PUT \
      -H "Content-Type: application/json" \
      -d "$UPDATE_PACKAGE" \
      "${API_BASE}/paquetes/${TEST_ID}")
    
    if echo "$UPDATE_RESPONSE" | grep -q "Test Package - Updated"; then
        echo -e "${GREEN}✓ Paquete actualizado exitosamente${NC}"
    else
        echo -e "${RED}✗ Error al actualizar${NC}"
    fi
    
    echo ""
    echo -e "${YELLOW}5. Probando obtención individual...${NC}"
    GET_RESPONSE=$(curl -s "${API_BASE}/paquetes/${TEST_ID}")
    if echo "$GET_RESPONSE" | grep -q "Test Package"; then
        echo -e "${GREEN}✓ Paquete obtenido exitosamente${NC}"
    fi
    
    echo ""
    echo -e "${YELLOW}6. Limpiando (eliminando paquete de prueba)...${NC}"
    DELETE_RESPONSE=$(curl -s -X DELETE "${API_BASE}/paquetes/${TEST_ID}")
    if echo "$DELETE_RESPONSE" | grep -q "eliminado"; then
        echo -e "${GREEN}✓ Paquete eliminado exitosamente${NC}"
    fi
else
    echo -e "${RED}✗ Error al crear el paquete de prueba${NC}"
    echo "Respuesta: $CREATE_RESPONSE"
fi

echo ""
echo "========================================"
echo -e "${GREEN}✓ Pruebas completadas${NC}"
echo "========================================"
echo ""
echo "Próximos pasos:"
echo "1. Inicia el backend: cd backend && npm start"
echo "2. Inicia el frontend: cd frontend && npm run dev"
echo "3. Accede al Admin Panel para gestionar paquetes"
