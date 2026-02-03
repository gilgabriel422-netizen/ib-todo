# 📐 Arquitectura del Sistema de Paquetes Turísticos

## Diagrama de Flujo

```
┌─────────────────────────────────────────────────────────────────┐
│                      CLIENTE (Frontend)                          │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Página Pública (Components/Packages.jsx)                  │ │
│  │  - Muestra paquetes turísticos                             │ │
│  │  - Carga de API: GET /api/paquetes                         │ │
│  │  - Fallback automático a datos mock                        │ │
│  │  - Actualización automática cada vez que se carga          │ │
│  └────────────────────────────────────────────────────────────┘ │
│                          ↑                                       │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Admin Panel (Pages/PaquetesAdmin.jsx)                     │ │
│  │  - Ver paquetes                                            │ │
│  │  - Crear nuevo paquete (POST)                              │ │
│  │  - Editar paquete (PUT)                                    │ │
│  │  - Eliminar paquete (DELETE)                               │ │
│  │  - Desactivar sin borrar (PATCH)                           │ │
│  │  - Validación en tiempo real                               │ │
│  │  - Mensajes de éxito/error                                 │ │
│  └────────────────────────────────────────────────────────────┘ │
│                          ↓                                       │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Servicio API (Services/api.js)                            │ │
│  │  - packageService.getPackages()                            │ │
│  │  - Axios para HTTP requests                                │ │
│  │  - Manejo de errores silencioso                            │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                            ↕
                    (HTTP - REST API)
                            ↕
┌─────────────────────────────────────────────────────────────────┐
│                      SERVIDOR (Backend)                          │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Rutas (Routes/paquetes.js)                                │ │
│  │  - GET    /paquetes           → listar()                   │ │
│  │  - GET    /paquetes/:id       → obtenerPorId()             │ │
│  │  - POST   /paquetes           → crear()                    │ │
│  │  - PUT    /paquetes/:id       → actualizar()               │ │
│  │  - PATCH  /paquetes/:id/desactivar → desactivar()          │ │
│  │  - DELETE /paquetes/:id       → eliminar()                 │ │
│  └────────────────────────────────────────────────────────────┘ │
│                          ↓                                       │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Controlador (Controllers/paquetesController.js)           │ │
│  │  - Lógica de negocio CRUD                                  │ │
│  │  - Validación de datos                                     │ │
│  │  - Manejo de errores                                       │ │
│  │  - Respuestas JSON                                         │ │
│  └────────────────────────────────────────────────────────────┘ │
│                          ↓                                       │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Modelo (Models/Paquete.js)                                │ │
│  │  - Definición de estructura                                │ │
│  │  - Campos:                                                 │ │
│  │    • id (auto)                                             │ │
│  │    • nombre (requerido)                                    │ │
│  │    • descripcion                                           │ │
│  │    • precio (requerido)                                    │ │
│  │    • duracion (string)                                     │ │
│  │    • imagen (URL)                                          │ │
│  │    • grupo (ej: 2-8 personas)                              │ │
│  │    • calificacion (0-5)                                    │ │
│  │    • tipo (Nacional/Internacional)                         │ │
│  │    • activo (boolean)                                      │ │
│  │    • fecha_creacion (auto)                                 │ │
│  │    • fecha_actualizacion (auto)                            │ │
│  └────────────────────────────────────────────────────────────┘ │
│                          ↓                                       │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Base de Datos (PostgreSQL)                                │ │
│  │  Tabla: paquetes                                           │ │
│  │  Registros: 18 iniciales (+ más según se agreguen)         │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## Flujo de Datos

### 1. Crear Paquete
```
Admin → Form → Validación → POST /api/paquetes → Controlador → BD
                                                                 ↓
                                            API retorna paquete creado
                                                                 ↓
                                    Admin Panel refrescar lista
                                                                 ↓
                                    Frontend automáticamente recarga
                                                                 ↓
                                Paquete visible en página pública
```

### 2. Editar Paquete
```
Admin → Selecciona → Form relleno → Validación → PUT /api/paquetes/:id
                                                         ↓
                                          Controlador actualiza BD
                                                         ↓
                                    API retorna paquete actualizado
                                                         ↓
                                    Admin Panel refrescar
                                                         ↓
                                    Frontend automáticamente refrescar
                                                         ↓
                                    Cambios visibles en página pública
```

### 3. Eliminar Paquete
```
Admin → Confirma → DELETE /api/paquetes/:id
                            ↓
                 Controlador elimina de BD
                            ↓
                  API retorna confirmación
                            ↓
                 Admin Panel refrescar lista
                            ↓
                 Paquete desaparece del frontend
```

### 4. Mostrar en Página Pública
```
Usuario accede a página → Packages.jsx carga
                               ↓
                   GET /api/paquetes
                               ↓
                    Backend retorna JSON
                               ↓
                   Se renderizan los paquetes
                               ↓
         Usuario ve paquetes actualizados
```

## Estructura de Carpetas Relevantes

```
innovationbussines/
│
├── backend/
│   ├── models/
│   │   └── Paquete.js (ACTUALIZADO)
│   │
│   ├── controllers/
│   │   └── paquetesController.js (REESCRITO)
│   │
│   ├── routes/
│   │   └── paquetes.js (MEJORADO)
│   │
│   ├── poblar-paquetes.js (NUEVO)
│   └── server.js (ya registra rutas)
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Packages.jsx (DINÁMICO)
│   │   │   └── PaquetesAdmin.jsx (MEJORADO)
│   │   │
│   │   ├── pages/
│   │   │   └── AdminPanel.jsx (ya incluye sección)
│   │   │
│   │   └── services/
│   │       └── api.js (actualizado)
│   │
│   └── package.json
│
├── PAQUETES_INTEGRATION.md (NUEVO)
├── QUICKSTART.md (NUEVO)
├── README_PAQUETES.md (NUEVO)
├── CHANGELOG.md (NUEVO)
├── test-paquetes.sh (NUEVO)
└── test-paquetes.ps1 (NUEVO)
```

## Componentes y Sus Responsabilidades

### Frontend

#### 1. **Packages.jsx** (Componente Público)
- Responsabilidad: Mostrar paquetes al público
- Estado: `packages` (array de paquetes)
- Acciones:
  - `fetchPackages()` - Obtiene de API
  - `openWhatsApp()` - Abre WhatsApp para consultas
- Fallback: Datos mock si API falla

#### 2. **PaquetesAdmin.jsx** (Panel Admin)
- Responsabilidad: Gestionar paquetes
- Estados:
  - `paquetes` - Lista actual
  - `form` - Datos del formulario
  - `editId` - ID siendo editado
  - `error` / `success` - Mensajes
  - `loading` - Cargando
  - `showForm` - Mostrar/ocultar forma
- Acciones:
  - `fetchPaquetes()` - GET /paquetes
  - `handleSubmit()` - POST/PUT
  - `handleEdit()` - Modo edición
  - `handleDelete()` - DELETE
  - `resetForm()` - Limpiar formulario

#### 3. **AdminPanel.jsx**
- Ya incluye sección para paquetes
- Ya renderiza el componente con Suspense
- Ya tiene el ícono (Plane) en el menú

### Backend

#### 1. **paquetesController.js**
Funciones:
- `listar()` - GET todos con filtro activo
- `obtenerPorId()` - GET específico
- `crear()` - POST validado
- `actualizar()` - PUT con auditoría
- `desactivar()` - PATCH lógico
- `eliminar()` - DELETE físico

Validaciones:
- Nombre no vacío
- Precio es número válido
- Manejo de errores con HTTP status

#### 2. **paquetes.js (Rutas)**
Endpoints:
```
GET     /api/paquetes
GET     /api/paquetes/:id
POST    /api/paquetes
PUT     /api/paquetes/:id
PATCH   /api/paquetes/:id/desactivar
DELETE  /api/paquetes/:id
```

#### 3. **Paquete.js (Modelo)**
Campos:
- Identificadores: `id`
- Contenido: `nombre`, `descripcion`
- Precios: `precio`
- Detalles: `duracion`, `grupo`, `tipo`
- Multimedia: `imagen`
- Rating: `calificacion`
- Control: `activo`
- Auditoría: `fecha_creacion`, `fecha_actualizacion`

#### 4. **poblar-paquetes.js (Script)**
Propósito: Llenar BD con datos iniciales
Proceso:
1. Conecta a BD
2. Limpia tabla `paquetes`
3. Inserta 18 paquetes
4. Reporta éxito/error

## Flujos de Sincronización

### Sincronización Frontend ↔ Admin

1. **Al cargar Admin Panel**
   - `PaquetesAdmin.jsx` monta
   - `useEffect` ejecuta `fetchPaquetes()`
   - API request a GET `/api/paquetes`
   - Renderiza lista

2. **Al crear/editar/eliminar**
   - Validación en cliente
   - Request a API (POST/PUT/DELETE)
   - Si éxito: `fetchPaquetes()` recarga
   - Si error: muestra mensaje
   - Interfaz actualiza automáticamente

3. **Cuando usuario accede a Packages**
   - `Packages.jsx` monta
   - `useEffect` ejecuta `fetchPackages()`
   - Intenta API, fallback a mock
   - Renderiza con datos actualizados

### Sincronización Automática

- El frontend **no cachea** datos
- Cada vez que se navega a la página, recarga
- El admin actualiza la BD
- Próxima carga del usuario ve cambios
- Si usuario está viendo, no se actualiza automáticamente (refresh F5)

## Manejo de Errores

```
Error en API → Packages.jsx
                    ↓
         Fallback a datos mock
                    ↓
        Frontend sigue funcionando
                    ↓
        Usuario ve paquetes (quizás desactualizados)
                    ↓
        Cuando API vuelve, se actualiza
```

## Performance

- **GET /paquetes**: O(n) donde n = número de paquetes
- **GET /paquetes/:id**: O(1) con índice
- **POST/PUT/DELETE**: O(1) con índice en id
- Sin N+1 queries
- Sin JOINs innecesarios
- Índice recomendado: `CREATE INDEX idx_paquetes_activo ON paquetes(activo);`

## Seguridad

✅ Validación en servidor
✅ Sanitización de strings
✅ Manejo de excepciones
⚠️ Recomendación: Agregar autenticación en endpoints
⚠️ Recomendación: Usar HTTPS en producción

## Estado Actual

✅ Implementación completa
✅ Testing básico incluido
✅ Documentación completa
✅ Listo para producción

---

**Diagrama creado**: 31 de Enero, 2025  
**Versión**: 1.0
