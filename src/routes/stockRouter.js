const express = require("express");
const stockRouter = express.Router();
const Stock = require("../controller/stockController");

stockRouter.get("/getAllStockIn", Stock.getAllStockIn);
stockRouter.post("/addStockIn", Stock.addStockIn);
stockRouter.get("/getAllProduct", Stock.getAllProduct);
stockRouter.post("/addProduct", Stock.addProduct);
stockRouter.delete("/deleteProduct/:id", Stock.deleteProduct);
stockRouter.post("/addStockInDetail", Stock.addStockInDetail);
stockRouter.get("/getDetailStockIn/:id", Stock.getDetailStockIn);

module.exports = stockRouter;
