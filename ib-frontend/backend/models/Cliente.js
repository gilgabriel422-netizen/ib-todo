const db = require('../config/database');

class Cliente {
  // Obtener todos los clientes
  static async getAll() {
    const result = await db.query(`
        SELECT c.*, u.nombre as usuario_asignado_nombre, c.categoria_cliente
        FROM clientes c 
        LEFT JOIN usuarios u ON c.usuario_asignado_id = u.id
        ORDER BY c.fecha_creacion DESC
    `);
    return result.rows;
  }

  // Obtener cliente por ID
  static async getById(id) {
    const result = await db.query(`
        SELECT c.*, u.nombre as usuario_asignado_nombre, c.categoria_cliente
        FROM clientes c 
        LEFT JOIN usuarios u ON c.usuario_asignado_id = u.id
        WHERE c.id = $1
    `, [id]);
    return result.rows[0];
  }

  // Crear nuevo cliente
  static async create(clienteData) {
    const { 
      // Información personal
      first_name, 
      last_name, 
      email, 
      phone,
      document_number,
      
      // Información del contrato
      contract_number, 
      fecha_registro = new Date().toISOString().split('T')[0],
      status = 'activo',
      
      // Información de paquete
      total_nights = 0,
      remaining_nights = 0,
      anos = 0,
      anos_indefinido = false,
      international_bonus = 'No',
      
      // Información financiera
      total_amount = 0,
      iva = 0,
      neto = 0,
      payment_status = 'sin_pago',
      categoria_cliente,
      
      // Información de pago
      pago_mixto = 'No',
      cantidad_tarjetas = 1,
      tarjetas = null,
      datafast,
      tipo_tarjeta,
      forma_pago,
      tiempo_meses,
      
      // Información de pagaré
      pagare = 'No',
      fecha_pagare,
      monto_pagare,
      pagare_cuotas,
      pagare_cuotas_asumidas,
      pagare_valor_cuota,
      pagare_total,
      
      // Personal de ventas
      linner,
      closer,
      
      // Información adicional
      empresa, 
      telefono, 
      direccion, 
      ciudad = 'Quito', 
      pais = 'Ecuador', 
      usuario_asignado_id, 
      notas 
    } = clienteData;
    
    const pagareVal = pagare === true || pagare === 'Si' || pagare === 'si' ? 'Si' : 'No';
    
    const result = await db.query(
      `INSERT INTO clientes (
        first_name, last_name, email, phone, document_number, contract_number, 
        fecha_registro, status, total_nights, remaining_nights, anos, anos_indefinido,
        international_bonus, total_amount, iva, neto, payment_status, categoria_cliente,
        pago_mixto, cantidad_tarjetas, tarjetas, datafast, tipo_tarjeta, forma_pago, tiempo_meses,
        pagare, fecha_pagare, monto_pagare, pagare_cuotas, pagare_cuotas_asumidas, pagare_valor_cuota, pagare_total,
        linner, closer,
        empresa, telefono, direccion, ciudad, pais, usuario_asignado_id, notas
      ) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40) 
      RETURNING *`,
      [
        first_name, last_name, email, phone, document_number, contract_number,
        fecha_registro, status, total_nights, remaining_nights, anos, anos_indefinido,
        international_bonus, total_amount, iva, neto, payment_status, categoria_cliente || null,
        pago_mixto, cantidad_tarjetas, tarjetas ? JSON.stringify(tarjetas) : null, datafast, tipo_tarjeta, forma_pago, tiempo_meses,
        pagareVal, fecha_pagare || null, monto_pagare || null, pagare_cuotas || null, pagare_cuotas_asumidas || null, pagare_valor_cuota || null, pagare_total || null,
        linner, closer,
        empresa, telefono, direccion, ciudad, pais, usuario_asignado_id, notas
      ]
    );
    return result.rows[0];
  }

  // Actualizar cliente
  static async update(id, clienteData) {
    // Primero obtenemos el cliente actual
    const clienteActual = await this.getById(id);
    if (!clienteActual) {
      return 0;
    }

    // Mezclamos los datos actuales con los nuevos
    const datosActualizados = {
      first_name: clienteData.first_name !== undefined ? clienteData.first_name : clienteActual.first_name,
      last_name: clienteData.last_name !== undefined ? clienteData.last_name : clienteActual.last_name,
      email: clienteData.email !== undefined ? clienteData.email : clienteActual.email,
      phone: clienteData.phone !== undefined ? clienteData.phone : clienteActual.phone,
      document_number: clienteData.document_number !== undefined ? clienteData.document_number : clienteActual.document_number,
      contract_number: clienteData.contract_number !== undefined ? clienteData.contract_number : clienteActual.contract_number,
      fecha_registro: clienteData.fecha_registro !== undefined ? clienteData.fecha_registro : clienteActual.fecha_registro,
      status: clienteData.status !== undefined ? clienteData.status : clienteActual.status,
      total_nights: clienteData.total_nights !== undefined ? clienteData.total_nights : clienteActual.total_nights,
      remaining_nights: clienteData.remaining_nights !== undefined ? clienteData.remaining_nights : clienteActual.remaining_nights,
      anos: clienteData.anos !== undefined ? clienteData.anos : clienteActual.anos,
      anos_indefinido: clienteData.anos_indefinido !== undefined ? clienteData.anos_indefinido : clienteActual.anos_indefinido,
      international_bonus: clienteData.international_bonus !== undefined ? clienteData.international_bonus : clienteActual.international_bonus,
      total_amount: clienteData.total_amount !== undefined ? clienteData.total_amount : clienteActual.total_amount,
      iva: clienteData.iva !== undefined ? clienteData.iva : clienteActual.iva,
      neto: clienteData.neto !== undefined ? clienteData.neto : clienteActual.neto,
      payment_status: clienteData.payment_status !== undefined ? clienteData.payment_status : clienteActual.payment_status,
      categoria_cliente: clienteData.categoria_cliente !== undefined ? clienteData.categoria_cliente : clienteActual.categoria_cliente,
      pago_mixto: clienteData.pago_mixto !== undefined ? clienteData.pago_mixto : clienteActual.pago_mixto,
      cantidad_tarjetas: clienteData.cantidad_tarjetas !== undefined ? clienteData.cantidad_tarjetas : clienteActual.cantidad_tarjetas,
      tarjetas: clienteData.tarjetas !== undefined ? clienteData.tarjetas : clienteActual.tarjetas,
      datafast: clienteData.datafast !== undefined ? clienteData.datafast : clienteActual.datafast,
      tipo_tarjeta: clienteData.tipo_tarjeta !== undefined ? clienteData.tipo_tarjeta : clienteActual.tipo_tarjeta,
      forma_pago: clienteData.forma_pago !== undefined ? clienteData.forma_pago : clienteActual.forma_pago,
      tiempo_meses: clienteData.tiempo_meses !== undefined ? clienteData.tiempo_meses : clienteActual.tiempo_meses,
      pagare: clienteData.pagare !== undefined ? (clienteData.pagare === true || clienteData.pagare === 'Si' ? 'Si' : 'No') : clienteActual.pagare,
      fecha_pagare: clienteData.fecha_pagare !== undefined ? clienteData.fecha_pagare : clienteActual.fecha_pagare,
      monto_pagare: clienteData.monto_pagare !== undefined ? clienteData.monto_pagare : clienteActual.monto_pagare,
      pagare_cuotas: clienteData.pagare_cuotas !== undefined ? clienteData.pagare_cuotas : clienteActual.pagare_cuotas,
      pagare_cuotas_asumidas: clienteData.pagare_cuotas_asumidas !== undefined ? clienteData.pagare_cuotas_asumidas : clienteActual.pagare_cuotas_asumidas,
      pagare_valor_cuota: clienteData.pagare_valor_cuota !== undefined ? clienteData.pagare_valor_cuota : clienteActual.pagare_valor_cuota,
      pagare_total: clienteData.pagare_total !== undefined ? clienteData.pagare_total : clienteActual.pagare_total,
      linner: clienteData.linner !== undefined ? clienteData.linner : clienteActual.linner,
      closer: clienteData.closer !== undefined ? clienteData.closer : clienteActual.closer,
      empresa: clienteData.empresa !== undefined ? clienteData.empresa : clienteActual.empresa,
      telefono: clienteData.telefono !== undefined ? clienteData.telefono : clienteActual.telefono,
      direccion: clienteData.direccion !== undefined ? clienteData.direccion : clienteActual.direccion,
      ciudad: clienteData.ciudad !== undefined ? clienteData.ciudad : clienteActual.ciudad,
      pais: clienteData.pais !== undefined ? clienteData.pais : clienteActual.pais,
      usuario_asignado_id: clienteData.usuario_asignado_id !== undefined ? clienteData.usuario_asignado_id : clienteActual.usuario_asignado_id,
      notas: clienteData.notas !== undefined ? clienteData.notas : clienteActual.notas
    };

    const result = await db.query(
      `UPDATE clientes 
       SET first_name = $1, last_name = $2, email = $3, phone = $4, document_number = $5,
           contract_number = $6, fecha_registro = $7, status = $8, total_nights = $9, remaining_nights = $10,
           anos = $11, anos_indefinido = $12, international_bonus = $13, total_amount = $14, iva = $15,
           neto = $16, payment_status = $17, categoria_cliente = $18, pago_mixto = $19, cantidad_tarjetas = $20, tarjetas = $21,
           datafast = $22, tipo_tarjeta = $23, forma_pago = $24, tiempo_meses = $25, pagare = $26,
           fecha_pagare = $27, monto_pagare = $28, pagare_cuotas = $29, pagare_cuotas_asumidas = $30, pagare_valor_cuota = $31, pagare_total = $32,
           linner = $33, closer = $34, empresa = $35,
           telefono = $36, direccion = $37, ciudad = $38, pais = $39, usuario_asignado_id = $40,
           notas = $41, fecha_actualizacion = CURRENT_TIMESTAMP
       WHERE id = $42`,
      [
        datosActualizados.first_name, datosActualizados.last_name, datosActualizados.email, 
        datosActualizados.phone, datosActualizados.document_number, datosActualizados.contract_number,
        datosActualizados.fecha_registro, datosActualizados.status, datosActualizados.total_nights,
        datosActualizados.remaining_nights, datosActualizados.anos, datosActualizados.anos_indefinido,
        datosActualizados.international_bonus, datosActualizados.total_amount, datosActualizados.iva,
        datosActualizados.neto, datosActualizados.payment_status, datosActualizados.categoria_cliente,
        datosActualizados.pago_mixto,
        datosActualizados.cantidad_tarjetas, datosActualizados.tarjetas ? JSON.stringify(datosActualizados.tarjetas) : null,
        datosActualizados.datafast, datosActualizados.tipo_tarjeta, datosActualizados.forma_pago,
        datosActualizados.tiempo_meses, datosActualizados.pagare, datosActualizados.fecha_pagare,
        datosActualizados.monto_pagare, datosActualizados.pagare_cuotas, datosActualizados.pagare_cuotas_asumidas,
        datosActualizados.pagare_valor_cuota, datosActualizados.pagare_total,
        datosActualizados.linner, datosActualizados.closer,
        datosActualizados.empresa, datosActualizados.telefono, datosActualizados.direccion,
        datosActualizados.ciudad, datosActualizados.pais, datosActualizados.usuario_asignado_id,
        datosActualizados.notas, id
      ]
    );
    return result.rowCount;
  }

  // Eliminar cliente
  static async delete(id) {
    const result = await db.query('DELETE FROM clientes WHERE id = $1', [id]);
    return result.rowCount;
  }

  // Buscar clientes
  static async search(query) {
    const result = await db.query(`
       SELECT c.*, u.nombre as usuario_asignado_nombre, c.categoria_cliente
       FROM clientes c 
       LEFT JOIN usuarios u ON c.usuario_asignado_id = u.id
       WHERE (c.first_name || ' ' || c.last_name) ILIKE $1
         OR c.first_name ILIKE $1
         OR c.last_name ILIKE $1
         OR c.email ILIKE $1
         OR c.phone ILIKE $1
         OR c.telefono ILIKE $1
         OR c.contract_number ILIKE $1
         OR c.document_number ILIKE $1
       ORDER BY c.fecha_creacion DESC
    `, [`%${query}%`]);
    return result.rows;
  }

  // Obtener clientes creados por el usuario administrador (admin@crm.com)
  static async getCreatedByAdmin() {
    const result = await db.query(`
       SELECT c.*, u.nombre as usuario_asignado_nombre, c.categoria_cliente
       FROM clientes c
       LEFT JOIN usuarios u ON c.usuario_asignado_id = u.id
       WHERE c.usuario_asignado_id = (
         SELECT id FROM usuarios WHERE email = 'admin@crm.com' LIMIT 1
       ) OR c.usuario_asignado_id IS NULL
       ORDER BY c.fecha_creacion DESC
    `);
    return result.rows;
  }
}

module.exports = Cliente;
