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

const getAllBill = async (req, res) => {
  try {
    const billList = await prisma.BILL.findMany();
    successCode(res, billList, successText);
  } catch (err) {
    errorCode(err, errorText);
  }
};

const addBill = async (req, res) => {
  try {
    const { shift_id, room_id, cus_name, cccd, gender } = req.body;
    const customer = await prisma.CUSTOMER.create({
      data: {
        cus_name,
        cccd,
        gender,
      },
    });
    const shift = await prisma.SHIFT.findUnique({
      where: { shift_id: Number(shift_id) },
    });
    const room = await prisma.ROOM.findUnique({
      where: { room_id: Number(room_id) },
    });
    if (shift && customer && room) {
      const data = {
        shift_id,
        cus_id: customer.cus_id,
        room_id,
      };
      const newData = await prisma.BILL.create({ data });
      successCode(res, newData, "Created!");
    } else {
      failCode(res, null, failText);
    }
  } catch (err) {
    errorCode(err, errorText);
  }
};

const updateBill = async (req, res) => {
  try {
    const {
      bill_id,
      shift_id,
      cus_id,
      room_id,
      check_in,
      check_out,
      room_price,
      total_service,
      total_prepayment,
      discount,
      other_expense,
      description,
      total_bill,
    } = req.body;
    const shift = await prisma.SHIFT.findUnique({
      where: { shift_id: Number(shift_id) },
    });
    const room = await prisma.ROOM.findUnique({
      where: { room_id: Number(room_id) },
    });
    const bill = await prisma.BILL.findUnique({
      where: { bill_id: Number(bill_id) },
    });
    const customer = await prisma.CUSTOMER.findUnique({
      where: { cus_id: Number(cus_id) },
    });
    if (shift && room & bill & customer) {
      const data = {
        bill_id,
        shift_id,
        cus_id,
        room_id,
        check_in,
        check_out,
        room_price,
        total_service,
        total_prepayment,
        discount,
        other_expense,
        description,
        bill_type: true,
        total_bill,
      };
      await prisma.BILL.update({ data });
      successCode(res, data, "Updated!");
    } else {
      failCode(res, null, failText);
    }
  } catch (err) {
    errorCode(err, errorText);
  }
};

module.exports = { getAllBill, addBill, updateBill };
