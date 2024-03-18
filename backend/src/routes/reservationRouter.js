const express = require("express");
const reservationControllers = require("../controllers/reservationControllers");
const jwtService = require("../services/jwtService");

const router = express.Router();

router.get("/", jwtService.verifyAdmin, reservationControllers.browse);
router.get("/me", reservationControllers.getReservationByUser);
router.post("/", reservationControllers.add);
router.put("/cancel/:id([0-9]+)", reservationControllers.cancel);

module.exports = router;
