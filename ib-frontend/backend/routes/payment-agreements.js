const express = require('express');
const router = express.Router();

// Endpoints mock para convenios de pago
// TODO: Implementar funcionalidad completa cuando se necesite

router.get('/', (req, res) => {
  res.json({ agreements: [], pagination: { page: 1, limit: 100, total: 0, totalPages: 1 } });
});

router.get('/stats/overview', (req, res) => {
  res.json({
    total_agreements: 0,
    active_agreements: 0,
    completed_agreements: 0,
    pending_amount: 0
  });
});

router.get('/client/:clientId', (req, res) => {
  res.json({ agreements: [] });
});

router.get('/:id', (req, res) => {
  res.status(404).json({ error: 'Convenio no encontrado' });
});

router.post('/', (req, res) => {
  res.status(501).json({ error: 'Funcionalidad no implementada aún' });
});

router.patch('/:id/status', (req, res) => {
  res.status(501).json({ error: 'Funcionalidad no implementada aún' });
});

router.patch('/:id/due-date', (req, res) => {
  res.status(501).json({ error: 'Funcionalidad no implementada aún' });
});

router.delete('/:id', (req, res) => {
  res.status(501).json({ error: 'Funcionalidad no implementada aún' });
});

router.delete('/', (req, res) => {
  res.status(501).json({ error: 'Funcionalidad no implementada aún' });
});

module.exports = router;
