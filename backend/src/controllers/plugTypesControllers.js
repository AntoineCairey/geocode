const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const plugtypes = await tables.plug_type.readAll();
    res.json(plugtypes);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const plugtype = await tables.plug_type.read(req.params.id);
    if (plugtype == null) {
      res.sendStatus(404);
    } else {
      res.json(plugtype);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  read,
  browse,
};
