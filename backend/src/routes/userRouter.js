const express = require("express");
const userControllers = require("../controllers/userControllers");
const jwtService = require("../services/jwtService");

const router = express.Router();

router.get("/", jwtService.verifyAdmin, userControllers.browse);
router.get("/:id([0-9]+)", jwtService.verifyAdmin, userControllers.read);
router.get("/me", userControllers.read);
router.get("/count", jwtService.verifyAdmin, userControllers.usersCount);
router.get("/isadmin", jwtService.verifyAdmin, jwtService.acceptAdmin);

router.put("/:id([0-9]+)", jwtService.verifyAdmin, userControllers.edit);
router.put("/me", userControllers.edit);

router.delete("/:id([0-9]+)", jwtService.verifyAdmin, userControllers.destroy);
router.delete("/:id([0-9]+)", userControllers.destroy);

module.exports = router;
