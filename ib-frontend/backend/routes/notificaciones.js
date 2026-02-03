const express = require('express');
const router = express.Router();
const Notificacion = require('../models/Notificacion');

router.get('/:usuario_id', async (req, res) => {
  try {
    const usuario_id = req.params.usuario_id;
    const notificaciones = await Notificacion.obtenerPorUsuario(usuario_id);
    res.json(notificaciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener notificaciones' });
  }
});

module.exports = router;