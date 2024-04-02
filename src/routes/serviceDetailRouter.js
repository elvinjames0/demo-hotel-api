const express = require("express");
const serviceDetailRouter = express.Router();
const ServiceDetail = require("../controller/serviceDetailController");

serviceDetailRouter.post("/addServiceDetail", ServiceDetail.addServiceDetail);
serviceDetailRouter.delete(
  "/deleteServiceDetail/:id",
  ServiceDetail.deleteServiceDetail
);
serviceDetailRouter.get(
  "/getServiceDetail/:id",
  ServiceDetail.getServiceDetail
);
module.exports = serviceDetailRouter;
