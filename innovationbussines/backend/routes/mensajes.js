const express = require('express');
const router = express.Router();
const Mensaje = require('../models/Mensaje');

// Enviar mensaje
router.post('/', async (req, res) => {
  const { remitente_id, destinatario_id, contenido, tipo } = req.body;
  // Validación de campos obligatorios
  if (!remitente_id || !destinatario_id || !contenido) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }
  const mensaje = await Mensaje.crear({ remitente_id, destinatario_id, contenido, tipo });
  res.json(mensaje);
});

// Obtener mensajes de un cliente
router.get('/:clienteId', async (req, res) => {
  const mensajes = await Mensaje.obtenerPorCliente(req.params.clienteId);
  res.json(mensajes);
});

module.exports = router;