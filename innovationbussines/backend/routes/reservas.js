const express = require('express');
const router = express.Router();
const reservasController = require('../controllers/reservasController');

router.get('/', reservasController.getAllReservas);
router.get('/search', reservasController.searchReservasByContrato);
router.get('/:id', reservasController.getReservaById);
router.post('/', reservasController.createReserva);
router.put('/:id', reservasController.updateReserva);
router.delete('/:id', reservasController.deleteReserva);

module.exports = router;
