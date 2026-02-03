const express = require('express');
const router = express.Router();
const contratosFisicosController = require('../controllers/contratosFisicosController');

// Crear contrato físico
router.post('/', contratosFisicosController.createContratoFisico);
// Obtener todos los contratos físicos
router.get('/', contratosFisicosController.getContratosFisicos);
// Obtener contrato físico por ID
router.get('/:id', contratosFisicosController.getContratoFisicoById);
// Eliminar contrato físico
router.delete('/:id', contratosFisicosController.deleteContratoFisico);

module.exports = router;
