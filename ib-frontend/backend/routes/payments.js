const express = require('express');
const router = express.Router();
const db = require('../config/database');

const buildDateFilter = (params) => {
  if (params.date) {
    return { clause: 'c.fecha_registro = $1', values: [params.date] };
  }

  if (params.start_date && params.end_date) {
    return { clause: 'c.fecha_registro BETWEEN $1 AND $2', values: [params.start_date, params.end_date] };
  }

  return { clause: '1=1', values: [] };
};

router.get('/', (req, res) => {
  const { clause, values } = buildDateFilter(req.query);

  db.query(
    `SELECT c.id AS client_id,
            c.first_name,
            c.last_name,
            c.contract_number,
            c.total_amount,
            c.fecha_registro
     FROM clientes c
     WHERE c.payment_status = 'pagado'
       AND ${clause}
     ORDER BY c.fecha_registro DESC`,
    values
  )
    .then((result) => {
      const payments = result.rows.map((row, index) => ({
        id: `${row.client_id}-${index}`,
        client_id: row.client_id,
        client_name: `${row.first_name} ${row.last_name}`,
        contract_number: row.contract_number,
        payment_amount: row.total_amount,
        payment_date: row.fecha_registro,
        payment_method: null,
        receipt_number: null
      }));

      res.json({ payments });
    })
    .catch((error) => {
      console.error('Error obteniendo pagos:', error);
      res.status(500).json({ error: 'Error al obtener pagos' });
    });
});

router.get('/client/:clientId', (req, res) => {
  db.query(
    `SELECT c.id AS client_id,
            c.first_name,
            c.last_name,
            c.contract_number,
            c.total_amount,
            c.fecha_registro
     FROM clientes c
     WHERE c.id = $1
       AND c.payment_status = 'pagado'
     ORDER BY c.fecha_registro DESC`,
    [req.params.clientId]
  )
    .then((result) => {
      const payments = result.rows.map((row, index) => ({
        id: `${row.client_id}-${index}`,
        client_id: row.client_id,
        client_name: `${row.first_name} ${row.last_name}`,
        contract_number: row.contract_number,
        payment_amount: row.total_amount,
        payment_date: row.fecha_registro,
        payment_method: null,
        receipt_number: null
      }));

      res.json({ payments });
    })
    .catch((error) => {
      console.error('Error obteniendo pagos del cliente:', error);
      res.status(500).json({ error: 'Error al obtener pagos del cliente' });
    });
});

router.get('/stats/overview', (req, res) => {
  db.query(
    `SELECT COUNT(*) FILTER (WHERE payment_status = 'pagado')::int AS total_payments,
            COALESCE(SUM(CASE WHEN payment_status = 'pagado' THEN total_amount ELSE 0 END), 0) AS total_amount
     FROM clientes`
  )
    .then((result) => {
      res.json({
        total_payments: result.rows[0]?.total_payments || 0,
        total_amount: Number(result.rows[0]?.total_amount || 0)
      });
    })
    .catch((error) => {
      console.error('Error obteniendo estadísticas de pagos:', error);
      res.status(500).json({ error: 'Error al obtener estadísticas de pagos' });
    });
});

router.get('/:id', (req, res) => {
  res.status(404).json({ error: 'Payment no encontrado' });
});

router.post('/', (req, res) => {
  res.status(501).json({ error: 'Funcionalidad no implementada aún' });
});

router.put('/:id', (req, res) => {
  res.status(501).json({ error: 'Funcionalidad no implementada aún' });
});

router.delete('/:id', (req, res) => {
  res.status(501).json({ error: 'Funcionalidad no implementada aún' });
});

module.exports = router;
