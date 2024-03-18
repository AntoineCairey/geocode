const express = require("express");
const userControllers = require("../controllers/userControllers");
const jwtService = require("../services/jwtService");

const router = express.Router();

router.get(
  "/",
  jwtService.verifyToken,
  jwtService.verifyAdmin,
  userControllers.browse
);

router.get(
  "/:id([0-9]+)",
  jwtService.verifyToken,
  jwtService.verifyAdmin,
  userControllers.read
);

router.get("/me", jwtService.verifyToken, userControllers.read);

router.get(
  "/count",
  jwtService.verifyToken,
  jwtService.verifyAdmin,
  userControllers.usersCount
);

router.get(
  "/isadmin",
  jwtService.verifyToken,
  jwtService.verifyAdmin,
  jwtService.acceptAdmin
);

router.post("/register", userControllers.add);

router.post("/login", userControllers.login);

router.put(
  "/:id([0-9]+)",
  jwtService.verifyToken,
  jwtService.verifyAdmin,
  userControllers.edit
);

router.put("/me", jwtService.verifyToken, userControllers.edit);

router.delete(
  "/:id([0-9]+)",
  jwtService.verifyToken,
  jwtService.verifyAdmin,
  userControllers.destroy
);

router.delete("/:id([0-9]+)", jwtService.verifyToken, userControllers.destroy);

module.exports = router;
