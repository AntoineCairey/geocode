const jwt = require("jsonwebtoken");
const tables = require("../tables");

// Middleware de vérification du JWT
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Authentification requise" });
  }
  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.APP_SECRET
    );
    req.user = await tables.user.read(decoded.id);
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token invalide" });
  }
  return null;
};

const verifyAdmin = async (req, res, next) => {
  try {
    if (req.user.is_admin === 1) {
      next();
    } else {
      return res.status(403).json({ message: "Not admin" });
    }
  } catch (err) {
    return res.status(403).json({ message: "Token invalide" });
  }
  return null;
};

const acceptAdmin = async (req, res) => {
  return res.status(200).json({ message: "ok" });
};

module.exports = {
  verifyToken,
  verifyAdmin,
  acceptAdmin,
};
