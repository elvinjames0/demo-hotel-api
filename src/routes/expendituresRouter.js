const express = require("express");
const expendituresRouter = express.Router();
const Expenditures = require("../controller/expendituresController");
expendituresRouter.post("/addExpenditures", Expenditures.addExpenditures);
expendituresRouter.get("/getAllExpenditures", Expenditures.getAllExpenditures);
expendituresRouter.delete(
  "/deleteExpenditures/:id",
  Expenditures.deleteExpenditures
);
module.exports = expendituresRouter;
