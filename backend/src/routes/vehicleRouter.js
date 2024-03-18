const express = require("express");
const vehicleControllers = require("../controllers/vehicleControllers");
const jwtService = require("../services/jwtService");

const router = express.Router();

router.get("/", jwtService.verifyAdmin, vehicleControllers.browse);
router.get("/count", jwtService.verifyAdmin, vehicleControllers.vehicleCount);
router.get("/:id([0-9]+)", vehicleControllers.read);
router.get("/me", vehicleControllers.getCarByUser);
router.post("/", vehicleControllers.add);
router.delete("/:id([0-9]+)", vehicleControllers.destroy);
router.put("/:id([0-9]+)", vehicleControllers.edit);

module.exports = router;
