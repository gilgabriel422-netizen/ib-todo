#!/bin/bash
# Setup del backend - Innovation Business CRM
# Ejecutar desde la raíz del proyecto: ./scripts/setup-backend.sh

set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BACKEND_PATH="$ROOT/backend"

if [ ! -d "$BACKEND_PATH" ]; then
  echo "Error: No se encontró backend en: $BACKEND_PATH"
  exit 1
fi

cd "$BACKEND_PATH"

if [ -f .env.example ] && [ ! -f .env ]; then
  cp .env.example .env
  echo "[OK] Creado .env desde .env.example. Revisa DB_PASSWORD si es necesario."
elif [ -f .env ]; then
  echo "[INFO] Ya existe .env. No se sobrescribe."
else
  echo "[AVISO] No existe .env.example. Crea .env manualmente."
fi

echo "Instalando dependencias..."
npm install

echo "Inicializando base de datos (asegúrate de que PostgreSQL esté en ejecución)..."
npm run init-db

echo ""
echo "=== Backend listo ==="
echo "Para iniciar el servidor: cd backend && npm run dev"
echo "El API quedará en http://localhost:5000"
