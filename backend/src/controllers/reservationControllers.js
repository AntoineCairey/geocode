const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const reservations = await tables.reservation.readAll();
    res.json(reservations);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const reservation = await tables.reservation.read(req.params.id);
    if (reservation == null) {
      res.sendStatus(404);
    } else {
      res.json(reservation);
    }
  } catch (err) {
    next(err);
  }
};

const getReservationByUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const reservations = await tables.reservation.readReservationByUser(userId);
    if (reservations == null) {
      res.sendStatus(404);
    } else {
      res.json(reservations);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const reservation = req.body;
  try {
    const insertId = await tables.reservation.create(reservation);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const cancel = async (req, res, next) => {
  try {
    const result = await tables.reservation.cancel(req.params.id);
    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  read,
  add,
  cancel,
  getReservationByUser,
};
