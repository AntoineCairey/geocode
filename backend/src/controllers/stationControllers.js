const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const stations = await tables.station.readAll();
    res.json(stations);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const station = await tables.station.read(req.params.id);
    if (station == null) {
      res.sendStatus(404);
    } else {
      res.json(station);
    }
  } catch (err) {
    next(err);
  }
};

const getByBounds = async (req, res, next) => {
  try {
    const stations = await tables.station.readByBounds(req.body);
    res.json(stations);
  } catch (err) {
    next(err);
  }
};

const getClusters = async (req, res, next) => {
  try {
    const stations = await tables.station.readClusters(req.body);
    res.json(stations);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  read,
  getByBounds,
  getClusters,
};
