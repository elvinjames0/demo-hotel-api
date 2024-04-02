const express = require("express");
const payrollRouter = express.Router();
const Payroll = require("../controller/payrollController");

payrollRouter.get("/getAllPayroll", Payroll.getAllPayroll);
payrollRouter.post("/addPayroll", Payroll.addPayroll);
payrollRouter.put("/paySalary/:id", Payroll.paySalary);
payrollRouter.get("/getAllBonusFine", Payroll.getAllBonusFine);
payrollRouter.post("/addBonusFine", Payroll.addBonusFine);
payrollRouter.put("/updateBonusFine/:id", Payroll.updateBonusFine);
payrollRouter.delete("/deleteBonusFine/:id", Payroll.deleteBonusFine);

module.exports = payrollRouter;
