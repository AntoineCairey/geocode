const express = require("express");
const userRouter = require("./userRouter");
const vehicleRouter = require("./vehicleRouter");
const stationRouter = require("./stationRouter");
const chargingpointRouter = require("./chargingPointRouter");
const plugtypesRouter = require("./plugtypesRouter");
const reservationRouter = require("./reservationRouter");
const jwtService = require("../services/jwtService");
const userControllers = require("../controllers/userControllers");

const router = express.Router();

router.use("/users", jwtService.verifyToken, userRouter);
router.use("/vehicle", jwtService.verifyToken, vehicleRouter);
router.use("/reservation", jwtService.verifyToken, reservationRouter);
router.use("/station", stationRouter);
router.use("/chargingpoint", chargingpointRouter);
router.use("/plugtypes", plugtypesRouter);

router.post("/register", userControllers.add);
router.post("/login", userControllers.login);

module.exports = router;
