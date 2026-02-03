# Innovation Business - CRM Full Stack

Proyecto CRM (Customer Relationship Management) con backend Node.js/Express/PostgreSQL y frontend React/Vite. Preparado para trabajo en equipo y despliegue en GitHub.

## Requisitos previos

- **Node.js** (v14 o superior)
- **PostgreSQL** (v12 o superior), instalado y con el **servicio en ejecución**
  - "Corriendo" significa que el servicio/daemon de PostgreSQL está activo (no ejecutar `npm run dev` del backend).
  - Windows: suele iniciarse como servicio tras la instalación, o desde "Servicios" (services.msc).
  - Mac/Linux: `brew services start postgresql` o `sudo systemctl start postgresql`.

## Estructura del proyecto

```
Innovation Bussines/
├── backend/    # API REST (Express, PostgreSQL)
└── frontend/   # SPA React (Vite, Tailwind)
```

## Inicio rápido

### 1. Clonar e instalar

```bash
git clone <repo-url>
cd "Innovation Bussines"
```

### 2. Backend

```bash
cd backend
cp .env.example .env
# Editar .env con tu contraseña de PostgreSQL (DB_PASSWORD) si es necesario
npm install
npm run init-db
npm run dev
```

El servidor quedará en `http://localhost:5000`. Usuarios de desarrollo (contraseña: **admin123**):

- admin@crm.com (admin)
- cobranzas@crm.com, contratos@crm.com, atencion@crm.com, postventa@crm.com
- cliente@crm.com (Blue), clienteib1@crm.com (Gold), clienteib2@crm.com (Black)

### 3. Frontend (otra terminal)

```bash
cd frontend
cp .env.local.example .env.local
npm install
npm run dev
```

La app quedará en `http://localhost:5173`. Con `VITE_OFFLINE_MODE=false` usará el backend real.

### Scripts de setup (opcional)

Desde la raíz del proyecto puedes usar los scripts para copiar env, instalar dependencias e inicializar la BD:

- **Windows (PowerShell):**  
  `.\scripts\setup-backend.ps1` y `.\scripts\setup-frontend.ps1`
- **Linux/Mac:**  
  `./scripts/setup-backend.sh` y `./scripts/setup-frontend.sh` (dar permisos de ejecución con `chmod +x` si hace falta)

Después, inicia backend y frontend con `npm run dev` en cada carpeta.

## Documentación específica

- [Backend](backend/README.md): API, base de datos, comandos.
- [Frontend](frontend/README.md): componentes, rutas, modo offline.

## Trabajo en equipo

- **Backend:** trabajar en `backend/` (controllers, models, routes).
- **Frontend:** trabajar en `frontend/` (src/components, src/pages, src/services).
- No commitear `.env` ni `.env.local`; usar `.env.example` y `.env.local.example` como referencia.

## Troubleshooting

- **Error al conectar a PostgreSQL:** comprobar que el servicio de PostgreSQL esté en ejecución y que `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_PORT` en `.env` sean correctos.
- **Frontend no conecta al backend:** verificar que el backend esté en `http://localhost:5000` y que `VITE_API_URL=http://localhost:5000/api` en `.env.local`, con `VITE_OFFLINE_MODE=false`.
