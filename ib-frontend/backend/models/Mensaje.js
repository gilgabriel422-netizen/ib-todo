const db = require('../config/database');

class Mensaje {
  static async crear({ remitente_id, destinatario_id, contenido, tipo }) {
    const result = await db.query(
      `INSERT INTO mensajes (remitente_id, destinatario_id, contenido, tipo, fecha_envio)
       VALUES ($1, $2, $3, $4, NOW()) RETURNING *`,
      [remitente_id, destinatario_id, contenido, tipo]
    );
    return result.rows[0];
  }

  static async obtenerPorCliente(clienteId) {
    const result = await db.query(
      `SELECT * FROM mensajes WHERE remitente_id = $1 OR destinatario_id = $1 ORDER BY fecha_envio ASC`,
      [clienteId]
    );
    return result.rows;
  }
}

module.exports = Mensaje;