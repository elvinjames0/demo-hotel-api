const express = require("express");
const shiftRouter = express.Router();
const Shift = require("../controller/shiftController");

shiftRouter.get("/getAllShift", Shift.getAllShift);
shiftRouter.put("/updateShift", Shift.updateShift);

module.exports = shiftRouter;
