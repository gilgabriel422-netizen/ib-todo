-- CRM Database Schema
-- PostgreSQL

-- Eliminar tablas existentes si existen
DROP TABLE IF EXISTS actividades CASCADE;
DROP TABLE IF EXISTS contactos CASCADE;
DROP TABLE IF EXISTS clientes CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;

-- Tabla de usuarios
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  rol VARCHAR(20) DEFAULT 'vendedor' CHECK (rol IN ('admin', 'gerente', 'vendedor', 'cobranzas', 'servicio', 'contracto', 'contratos', 'atencion', 'postventa', 'blue', 'gold', 'black')),
  activo BOOLEAN DEFAULT TRUE,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de clientes
CREATE TABLE clientes (
  id SERIAL PRIMARY KEY,
  -- Información personal
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  nombre VARCHAR(200) GENERATED ALWAYS AS (first_name || ' ' || last_name) STORED,
  document_number VARCHAR(20),
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(20),
  
  -- Información del contrato
  contract_number VARCHAR(50) UNIQUE NOT NULL,
  fecha_registro DATE DEFAULT CURRENT_DATE,
  status VARCHAR(20) DEFAULT 'activo' CHECK (status IN ('activo', 'inactivo', 'moroso', 'prospecto', 'contactado', 'calificado', 'propuesta', 'negociacion', 'ganado', 'perdido')),
  
  -- Información de paquete
  total_nights INTEGER DEFAULT 0,
  remaining_nights INTEGER DEFAULT 0,
  años INTEGER DEFAULT 0,
  años_indefinido BOOLEAN DEFAULT FALSE,
  international_bonus VARCHAR(10) DEFAULT 'No' CHECK (international_bonus IN ('Si', 'No')),
  
  -- Información financiera
  total_amount DECIMAL(10, 2) DEFAULT 0,
  iva DECIMAL(10, 2) DEFAULT 0,
  neto DECIMAL(10, 2) DEFAULT 0,
  payment_status VARCHAR(20) DEFAULT 'sin_pago' CHECK (payment_status IN ('sin_pago', 'pago_parcial', 'pagado', 'moroso')),
  categoria_cliente VARCHAR(10) CHECK (categoria_cliente IS NULL OR categoria_cliente IN ('blue', 'gold', 'black')),
  
  -- Información de pago
  pago_mixto VARCHAR(10) DEFAULT 'No' CHECK (pago_mixto IN ('Si', 'No')),
  cantidad_tarjetas INTEGER DEFAULT 1,
  tarjetas JSONB,
  datafast VARCHAR(50),
  tipo_tarjeta VARCHAR(50),
  forma_pago VARCHAR(20),
  tiempo_meses VARCHAR(10),
  
  -- Información de pagaré
  pagare VARCHAR(10) DEFAULT 'No' CHECK (pagare IN ('Si', 'No')),
  fecha_pagare DATE,
  monto_pagare DECIMAL(10, 2),
  pagare_cuotas INTEGER,
  pagare_cuotas_asumidas INTEGER,
  pagare_valor_cuota DECIMAL(10, 2),
  pagare_total DECIMAL(10, 2),
  
  -- Personal de ventas
  linner VARCHAR(100),
  closer VARCHAR(100),
  
  -- Información de ubicación y contacto
  empresa VARCHAR(100),
  telefono VARCHAR(20),
  direccion TEXT,
  ciudad VARCHAR(100),
  pais VARCHAR(100),
  
  -- Gestión interna
  usuario_asignado_id INTEGER REFERENCES usuarios(id) ON DELETE SET NULL,
  notas TEXT,
  
  -- Timestamps
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de contactos
CREATE TABLE contactos (
  id SERIAL PRIMARY KEY,
  cliente_id INTEGER NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,
  nombre VARCHAR(100) NOT NULL,
  cargo VARCHAR(100),
  email VARCHAR(100),
  telefono VARCHAR(20),
  es_principal BOOLEAN DEFAULT FALSE,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de actividades
CREATE TABLE actividades (
  id SERIAL PRIMARY KEY,
  cliente_id INTEGER NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,
  contacto_id INTEGER REFERENCES contactos(id) ON DELETE SET NULL,
  usuario_id INTEGER REFERENCES usuarios(id) ON DELETE SET NULL,
  tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('llamada', 'email', 'reunion', 'tarea', 'nota')),
  titulo VARCHAR(200) NOT NULL,
  descripcion TEXT,
  fecha_actividad TIMESTAMP NOT NULL,
  completada BOOLEAN DEFAULT FALSE,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para mejorar el rendimiento
CREATE INDEX idx_clientes_usuario ON clientes(usuario_asignado_id);
CREATE INDEX idx_clientes_status ON clientes(status);
CREATE INDEX idx_clientes_contract_number ON clientes(contract_number);
CREATE INDEX idx_clientes_email ON clientes(email);
CREATE INDEX idx_clientes_document_number ON clientes(document_number);
CREATE INDEX idx_clientes_payment_status ON clientes(payment_status);
CREATE INDEX idx_clientes_fecha_registro ON clientes(fecha_registro);
CREATE INDEX idx_contactos_cliente ON contactos(cliente_id);
CREATE INDEX idx_actividades_cliente ON actividades(cliente_id);
CREATE INDEX idx_actividades_usuario ON actividades(usuario_id);
CREATE INDEX idx_actividades_fecha ON actividades(fecha_actividad);

-- Insertar usuario administrador por defecto
INSERT INTO usuarios (nombre, email, password, rol) 
VALUES (
  'Administrador',
  'admin@crm.com',
  -- Password: admin123 (hasheado con bcrypt)
  '$2a$10$0jdOS9wjsPAaAg30b7NtEOFKRqH47tNrW.jgOdgNguhzy1R2f10cC',
  'admin'
);

-- Usuarios para dashboards (contraseña desarrollo: admin123)
INSERT INTO usuarios (nombre, email, password, rol) 
VALUES 
  ('Cobranzas', 'cobranzas@crm.com', '$2a$10$0jdOS9wjsPAaAg30b7NtEOFKRqH47tNrW.jgOdgNguhzy1R2f10cC', 'cobranzas'),
  ('Contratos', 'contratos@crm.com', '$2a$10$0jdOS9wjsPAaAg30b7NtEOFKRqH47tNrW.jgOdgNguhzy1R2f10cC', 'contratos'),
  ('Atención Cliente', 'atencion@crm.com', '$2a$10$0jdOS9wjsPAaAg30b7NtEOFKRqH47tNrW.jgOdgNguhzy1R2f10cC', 'atencion'),
  ('Postventa', 'postventa@crm.com', '$2a$10$0jdOS9wjsPAaAg30b7NtEOFKRqH47tNrW.jgOdgNguhzy1R2f10cC', 'postventa'),
  ('Cliente Blue', 'cliente@crm.com', '$2a$10$0jdOS9wjsPAaAg30b7NtEOFKRqH47tNrW.jgOdgNguhzy1R2f10cC', 'blue'),
  ('Cliente Gold', 'clienteib1@crm.com', '$2a$10$0jdOS9wjsPAaAg30b7NtEOFKRqH47tNrW.jgOdgNguhzy1R2f10cC', 'gold'),
  ('Cliente Black', 'clienteib2@crm.com', '$2a$10$0jdOS9wjsPAaAg30b7NtEOFKRqH47tNrW.jgOdgNguhzy1R2f10cC', 'black');

INSERT INTO clientes (
  first_name, last_name, email, phone, document_number, contract_number, 
  fecha_registro, status, total_nights, remaining_nights, años, 
  international_bonus, total_amount, iva, neto, payment_status,
  ciudad, pais, usuario_asignado_id, notas, linner, closer
)
VALUES
  ('Carlos', 'Rodríguez', 'carlos@techsolutions.com', '+34 600 123 456', '1234567890', 'KMPRY UIO 0001', 
   '2024-01-15', 'activo', 7, 7, 2, 'Si', 2500.00, 326.09, 2173.91, 'pagado',
   'Madrid', 'España', 2, 'Cliente potencial interesado en servicios de consultoría', 'María González', 'Juan Pérez'),
   
  ('Ana', 'Martínez', 'ana@globalimports.com', '+34 600 234 567', '0987654321', 'KMPRY GYE 0002', 
   '2024-02-10', 'activo', 14, 10, 3, 'No', 3500.00, 456.52, 3043.48, 'pago_parcial',
   'Barcelona', 'España', 2, 'Primera reunión programada para la próxima semana', 'Pedro Sánchez', 'Carlos López'),
   
  ('Luis', 'Fernández', 'luis@innovatech.com', '+34 600 345 678', '1122334455', 'KMPRY CUE 0003', 
   '2024-03-05', 'activo', 10, 10, 0, 'Si', 1800.00, 234.78, 1565.22, 'sin_pago',
   'Valencia', 'España', 3, 'Budget confirmado, esperando propuesta', 'Ana Torres', 'Luis García'),
   
  ('Elena', 'Torres', 'elena@digitalmarketingpro.com', '+34 600 456 789', '5566778899', 'KMPRY UIO 0004', 
   '2024-03-20', 'activo', 21, 21, 5, 'No', 5000.00, 652.17, 4347.83, 'pagado',
   'Sevilla', 'España', 3, 'Propuesta enviada, seguimiento en 3 días', 'María González', 'Juan Pérez');

INSERT INTO contactos (cliente_id, nombre, cargo, email, telefono, es_principal)
VALUES
  (1, 'Carlos Rodríguez', 'CEO', 'carlos@techsolutions.com', '+34 600 123 456', TRUE),
  (1, 'Pedro Sánchez', 'CTO', 'pedro@techsolutions.com', '+34 600 111 222', FALSE),
  (2, 'Ana Martínez', 'Directora de Compras', 'ana@globalimports.com', '+34 600 234 567', TRUE),
  (3, 'Luis Fernández', 'CEO', 'luis@innovatech.com', '+34 600 345 678', TRUE),
  (4, 'Elena Torres', 'CMO', 'elena@digitalmarketingpro.com', '+34 600 456 789', TRUE);

INSERT INTO actividades (cliente_id, contacto_id, usuario_id, tipo, titulo, descripcion, fecha_actividad, completada)
VALUES
  (1, 1, 2, 'llamada', 'Primera llamada de contacto', 'Contacto inicial para presentar servicios', CURRENT_TIMESTAMP - INTERVAL '2 days', TRUE),
  (1, 2, 2, 'reunion', 'Reunión técnica', 'Discutir requisitos técnicos del proyecto', CURRENT_TIMESTAMP + INTERVAL '3 days', FALSE),
  (2, 3, 2, 'email', 'Envío de información', 'Enviar catálogo de productos y precios', CURRENT_TIMESTAMP - INTERVAL '1 day', TRUE),
  (2, 3, 2, 'tarea', 'Preparar propuesta', 'Elaborar propuesta comercial personalizada', CURRENT_TIMESTAMP + INTERVAL '2 days', FALSE),
  (3, 4, 3, 'llamada', 'Seguimiento de propuesta', 'Verificar recepción y resolver dudas', CURRENT_TIMESTAMP - INTERVAL '5 hours', TRUE),
  (4, 5, 3, 'reunion', 'Presentación de propuesta', 'Presentación formal de la propuesta comercial', CURRENT_TIMESTAMP + INTERVAL '1 day', FALSE);
