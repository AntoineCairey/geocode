const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const chargingpoints = await tables.charging_point.readAll(
      req.query?.station_id
    );
    res.json(chargingpoints);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const chargingpoint = await tables.charging_point.read(req.params.id);
    if (chargingpoint == null) {
      res.sendStatus(404);
    } else {
      res.json(chargingpoint);
    }
  } catch (err) {
    next(err);
  }
};

const chargingpointCount = async (req, res, next) => {
  try {
    const users = await tables.charging_point.countAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  read,
  chargingpointCount,
};
