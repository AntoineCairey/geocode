const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const vehicles = await tables.vehicle.readAll();
    res.json(vehicles);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const vehicle = await tables.vehicle.read(req.params.id);
    if (vehicle == null) {
      res.sendStatus(404);
    } else {
      res.json(vehicle);
    }
  } catch (err) {
    next(err);
  }
};

const getCarByUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const vehicles = await tables.vehicle.readCarByUser(userId);
    if (vehicles == null) {
      res.sendStatus(404);
    } else {
      res.json(vehicles);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const vehicle = req.body;
  try {
    const insertId = await tables.vehicle.create(vehicle);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await tables.vehicle.delete(req.params.id);
    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(200);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const edit = async (req, res, next) => {
  try {
    const result = await tables.vehicle.update(req.body, req.params.id);
    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

const vehicleCount = async (req, res, next) => {
  try {
    const users = await tables.vehicle.countAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  read,
  add,
  destroy,
  edit,
  getCarByUser,
  vehicleCount,
};
