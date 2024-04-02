const { PrismaClient } = require("@prisma/client");
const {
  successCode,
  errorCode,
  successText,
  errorText,
  failCode,
  failText,
} = require("../utils/response");
const prisma = new PrismaClient();

const getAllProduct = async (req, res) => {
  try {
    const productList = await prisma.PRODUCT.findMany();
    successCode(res, productList, successText);
  } catch (err) {
    errorCode(err, errorText);
  }
};
const addProduct = async (req, res) => {
  try {
    const { product_name, product_type, quantity, price } = req.body;
    const data = { product_name, product_type, quantity, price };
    const newData = await prisma.PRODUCT.create({ data });
    successCode(res, newData, "Created!");
  } catch (err) {
    errorCode(err, errorText);
  }
};
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.PRODUCT.findUnique({
      where: { product_id: Number(id) },
    });
    if (product) {
      await prisma.PRODUCT.delete({
        where: { product_id: Number(id) },
      });
      successCode(res, product, "Deleted!");
    } else {
      failCode(res, null, failText);
    }
  } catch (err) {
    errorCode(err, errorText);
  }
};
const addStockIn = async (req, res) => {
  try {
    const { stock_date, employee_id } = req.body;
    const employee = await prisma.EMPLOYEE.findUnique({
      where: { employee_id: Number(employee_id) },
    });
    if (employee.role_id == 1) {
      const data = { stock_date, employee_id };
      const newData = await prisma.STOCK_IN.create({ data });
      successCode(res, newData, "Created!");
    } else {
      failCode(res, null, "You aren't manager!");
    }
  } catch (err) {
    errorCode(err, errorText);
  }
};
const getAllStockIn = async (req, res) => {
  try {
    const stockInList = await prisma.STOCK_IN.findMany({
      include: {
        EMPLOYEE: true,
      },
    });
    const data = stockInList.map((item) => ({
      stock_date: item.stock_date,
      fullName: item.EMPLOYEE.fullname,
    }));
    successCode(res, data, successText);
  } catch (err) {
    errorCode(err, errorText);
  }
};
const addStockInDetail = async (req, res) => {
  try {
    const { stock_id, product_id, quantity } = req.body;
    const stock = await prisma.STOCK_IN.findUnique({
      where: { stock_id: Number(stock_id) },
    });
    const product = await prisma.PRODUCT.findUnique({
      where: { product_id: Number(product_id) },
    });
    if (product && stock) {
      const data = { stock_id, product_id, quantity };
      await prisma.PRODUCT.update({
        where: { product_id: Number(product_id) },
        data: {
          quantity: product.quantity + quantity,
        },
      });
      const newData = await prisma.STOCK_IN_DETAIL.create({ data });
      successCode(res, newData, "Successfully!");
    } else {
      failCode(res, null, failText);
    }
  } catch (err) {
    errorCode(err, errorText);
  }
};
const getDetailStockIn = async (req, res) => {
  try {
    const detailStockInList = await prisma.STOCK_IN_DETAIL.findMany({
      where: {
        stock_id: Number(req.params.id),
      },
      include: {
        STOCK_IN: true,
        PRODUCT: true,
      },
    });
    const data = detailStockInList.map((item) => ({
      product_name: item.PRODUCT.product_name,
      quantity: item.quantity,
      date: item.STOCK_IN.stock_date,
    }));

    successCode(res, data, successText);
  } catch (err) {
    errorCode(err, errorText);
  }
};
module.exports = {
  addStockIn,
  getAllStockIn,
  getAllProduct,
  addProduct,
  deleteProduct,
  addStockInDetail,
  getDetailStockIn,
};
