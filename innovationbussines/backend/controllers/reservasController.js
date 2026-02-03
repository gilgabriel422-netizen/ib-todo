const Reserva = require('../models/Reserva');
const Cliente = require('../models/Cliente');

exports.getAllReservas = async (req, res) => {
  try {
    const reservas = await Reserva.findAll({
      include: [{ model: Cliente, attributes: ['id', 'first_name', 'last_name', 'email'] }],
      order: [['fecha_creacion', 'DESC']]
    });
    res.json(reservas);
  } catch (error) {
    console.error('Error al obtener reservas:', error);
    res.status(500).json({ error: 'Error al obtener reservas' });
  }
};

exports.getReservaById = async (req, res) => {
  try {
    const reserva = await Reserva.findByPk(req.params.id, {
      include: [{ model: Cliente, attributes: ['id', 'first_name', 'last_name', 'email'] }]
    });
    if (!reserva) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    res.json(reserva);
  } catch (error) {
    console.error('Error al obtener reserva:', error);
    res.status(500).json({ error: 'Error al obtener reserva' });
  }
};

exports.createReserva = async (req, res) => {
  try {
    const { cliente_id, numero_reserva, fecha_entrada, fecha_salida, noches, personas, ciudad, valor_total, observaciones } = req.body;
    
    const reserva = await Reserva.create({
      cliente_id,
      numero_reserva: numero_reserva || `RES-${Date.now()}`,
      fecha_entrada,
      fecha_salida,
      noches,
      personas,
      ciudad,
      valor_total,
      observaciones,
      estado: 'pendiente'
    });

    res.status(201).json(reserva);
  } catch (error) {
    console.error('Error al crear reserva:', error);
    res.status(500).json({ error: 'Error al crear reserva' });
  }
};

exports.updateReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const { fecha_entrada, fecha_salida, noches, personas, ciudad, valor_total, estado, observaciones } = req.body;

    const reserva = await Reserva.findByPk(id);
    if (!reserva) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }

    await reserva.update({
      fecha_entrada,
      fecha_salida,
      noches,
      personas,
      ciudad,
      valor_total,
      estado,
      observaciones
    });

    res.json(reserva);
  } catch (error) {
    console.error('Error al actualizar reserva:', error);
    res.status(500).json({ error: 'Error al actualizar reserva' });
  }
};

exports.deleteReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findByPk(req.params.id);
    if (!reserva) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }

    await reserva.destroy();
    res.json({ message: 'Reserva eliminada' });
  } catch (error) {
    console.error('Error al eliminar reserva:', error);
    res.status(500).json({ error: 'Error al eliminar reserva' });
  }
};

exports.searchReservasByContrato = async (req, res) => {
  try {
    const { ultimos_4_digitos } = req.query;
    const reservas = await Reserva.findAll({
      where: {
        numero_reserva: {
          [require('sequelize').Op.like]: `%${ultimos_4_digitos}`
        }
      },
      include: [{ model: Cliente, attributes: ['id', 'first_name', 'last_name'] }]
    });
    res.json(reservas);
  } catch (error) {
    console.error('Error al buscar reservas:', error);
    res.status(500).json({ error: 'Error al buscar reservas' });
  }
};
