const { PrismaClient } = require("@prisma/client");
const {
  successCode,
  errorCode,
  errorText,
  failCode,
  failText,
  successText,
} = require("../utils/response");
const prisma = new PrismaClient();

const addServiceDetail = async (req, res) => {
  try {
    const { product_id, bill_id, quantity, service_time } = req.body;
    const product = await prisma.PRODUCT.findUnique({
      where: {
        product_id: Number(product_id),
      },
    });
    const bill = await prisma.BILL.findUnique({
      where: {
        bill_id: Number(bill_id),
      },
    });
    if (product && bill) {
      const data = {
        product_id,
        bill_id,
        quantity,
        service_time,
        price: product.price * quantity,
      };
      await prisma.PRODUCT.update({
        where: {
          product_id: Number(product_id),
        },
        data: {
          quantity: product.quantity - quantity,
        },
      });
      const service = await prisma.SERVICE_DETAIL.create({ data });
      const newData = { ...service, product_name: product.product_name };
      successCode(res, newData, "Created!");
    } else {
      failCode(res, null, failText);
    }
  } catch (err) {
    errorCode(err, errorText);
  }
};
const deleteServiceDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const serviceDetail = await prisma.SERVICE_DETAIL.findUnique({
      where: {
        service_detail_id: Number(id),
      },
    });
    const product = await prisma.PRODUCT.findUnique({
      where: {
        product_id: Number(serviceDetail.product_id),
      },
    });
    if (serviceDetail && product) {
      await prisma.SERVICE_DETAIL.delete({
        where: {
          service_detail_id: Number(id),
        },
      });
      await prisma.PRODUCT.update({
        where: {
          product_id: Number(product.product_id),
        },
        data: {
          quantity: product.quantity + serviceDetail.quantity,
        },
      });
      successCode(res, serviceDetail, "Deleted!");
    } else {
      failCode(res, null, failText);
    }
  } catch (err) {
    errorCode(err, errorText);
  }
};
const getServiceDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const bill = await prisma.BILL.findUnique({
      where: {
        bill_id: Number(id),
      },
    });
    if (bill) {
      const serviceList = await prisma.SERVICE_DETAIL.findMany({
        where: {
          bill_id: Number(id),
        },
      });
      successCode(res, serviceList, successText);
    } else {
      failCode(res, null, failText);
    }
  } catch (err) {
    errorCode(err, errorText);
  }
};
module.exports = {
  addServiceDetail,
  deleteServiceDetail,
  getServiceDetail,
};
