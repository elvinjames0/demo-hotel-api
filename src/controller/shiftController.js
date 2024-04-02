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

const updateShift = async (req, res) => {
  try {
    const {
      shift_id,
      total_cash,
      total_card,
      expenditures,
      total_revenue,
      cash_in_counter,
      time_start,
      time_end,
      description,
      employee_id,
    } = req.body;
    const shift = await prisma.SHIFT.findUnique({
      where: { shift_id: Number(shift_id) },
    });
    if (shift) {
      const data = {
        total_cash,
        total_card,
        expenditures,
        total_revenue,
        cash_in_counter,
        time_start,
        time_end,
        description,
        status: true,
      };
      await prisma.SHIFT.update({
        where: { shift_id: Number(shift_id) },
        data,
      });
      const newData = await prisma.SHIFT.create({
        data: {
          status: false,
        },
      });
      // lấy employee_id của nhân viên ca sau
      await prisma.SHIFT_DETAIL.create({
        data: {
          shift_id: newData.shift_id,
          employee_id: employee_id,
          time_login: null,
        },
      });
      const payroll = await prisma.PAYROLL.findMany({
        where: { employee_id: Number(employee_id), status: false },
      });
      await prisma.PAYROLL.update({
        where: { payroll_id: Number(payroll[0].payroll_id) },
        data: {
          day_of_work: payroll[0].day_of_work + 1,
        },
      });
      successCode(res, data, "Updated!");
    } else {
      failCode(res, null, failText);
    }
  } catch (err) {
    errorCode(err, errorText);
  }
};

const getAllShift = async (req, res) => {
  try {
    const shiftList = await prisma.SHIFT_DETAIL.findMany({
      include: {
        SHIFT: true,
        EMPLOYEE: true,
      },
    });
    const data = shiftList.map((e) => {
      return {
        fullName: e.EMPLOYEE.fullname,
        shift: e.SHIFT,
      };
    });
    successCode(res, data, successText);
  } catch (err) {
    errorCode(err, errorText);
  }
};

module.exports = { getAllShift, updateShift };
