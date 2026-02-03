#!/bin/bash
# Setup del frontend - Innovation Business CRM
# Ejecutar desde la raíz del proyecto: ./scripts/setup-frontend.sh

set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
FRONTEND_PATH="$ROOT/frontend"

if [ ! -d "$FRONTEND_PATH" ]; then
  echo "Error: No se encontró frontend en: $FRONTEND_PATH"
  exit 1
fi

cd "$FRONTEND_PATH"

if [ -f .env.local.example ] && [ ! -f .env.local ]; then
  cp .env.local.example .env.local
  echo "[OK] Creado .env.local desde .env.local.example."
elif [ -f .env.local ]; then
  echo "[INFO] Ya existe .env.local. No se sobrescribe."
else
  echo "[AVISO] No existe .env.local.example. Crea .env.local con VITE_API_URL y VITE_OFFLINE_MODE."
fi

echo "Instalando dependencias..."
npm install

echo ""
echo "=== Frontend listo ==="
echo "Asegúrate de que el backend esté en http://localhost:5000"
echo "Para iniciar: cd frontend && npm run dev"
echo "La app quedará en http://localhost:5173"
