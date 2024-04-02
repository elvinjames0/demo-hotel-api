const express = require("express");
const employeeRouter = express.Router();
const Employee = require("../controller/employeeController");
const { validator } = require("../middlewares/validation");

employeeRouter.post(
  "/loginEmployee",
  validator.Auth.checkLogin,
  validator.checkValidate,
  Employee.loginEmployee
);
employeeRouter.post(
  "/addEmployee",
  validator.Auth.checkSignUp,
  validator.checkValidate,
  Employee.addEmployee
);
employeeRouter.get("/getDetailEmployee/:id", Employee.getDetailEmployee);
employeeRouter.get("/getEmployeeList", Employee.getEmployeeList);
employeeRouter.delete("/deleteEmployee/:id", Employee.deleteEmployee);
employeeRouter.put("/updateEmployee/:id", Employee.updateEmployee);

module.exports = employeeRouter;
