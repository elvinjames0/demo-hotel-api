const express = require("express");
const billRouter = express.Router();
const Bill = require("../controller/billController");

billRouter.post("/addBill", Bill.addBill);
billRouter.get("/getAllBill", Bill.getAllBill);
billRouter.put("/updateBill", Bill.updateBill);
module.exports = billRouter;
