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

const getAllPayroll = async (req, res) => {
  try {
    const payrollList = await prisma.PAYROLL.findMany();
    successCode(res, payrollList, successText);
  } catch (err) {
    errorCode(res, errorText);
  }
};
const addPayroll = async (req, res) => {
  try {
    const {
      employee_id,
      day_of_work,
      allowance,
      total_bonus,
      total_fine,
      payroll_date_time,
      status,
      total_salary,
    } = req.body;
    const employee = await prisma.EMPLOYEE.findUnique({
      where: { employee_id: Number(employee_id) },
    });
    if (employee) {
      const data = {
        employee_id,
        day_of_work,
        allowance,
        total_bonus,
        total_fine,
        payroll_date_time,
        status,
        total_salary,
      };
      const newData = await prisma.PAYROLL.create({ data });
      successCode(res, newData, "Created!");
    } else {
      failCode(res, null, failText);
    }
  } catch (err) {
    errorCode(res, errorText);
  }
};
const paySalary = async (req, res) => {
  try {
    const { id } = req.params;
    const { allowance } = req.body;
    const payroll = await prisma.PAYROLL.findUnique({
      where: { payroll_id: Number(id) },
      include: {
        EMPLOYEE: true,
      },
    });
    const bonusFine = await prisma.BONUS_FINE.findMany({
      where: { payroll_id: Number(id) },
    });
    const bonus = bonusFine.reduce((total, e) => {
      if (e.bf_type === true) {
        return total + e.money;
      }
      return total;
    }, 0);
    const fine = bonusFine.reduce((total, e) => {
      if (e.bf_type === false) {
        return total + e.money;
      }
      return total;
    }, 0);
    if (payroll) {
      const month = new Date().getMonth() + 1;
      const year = new Date().getFullYear();
      const time = new Date().toLocaleString();
      const result = {
        allowance: allowance,
        status: true,
        total_bonus: bonus,
        total_fine: fine,
        payroll_date_time: time,
        total_salary: Math.round(
          (payroll.EMPLOYEE.base_salary * payroll.day_of_work) /
            new Date(year, month, 0).getDate() +
            bonus +
            allowance -
            fine
        ),
      };
      await prisma.PAYROLL.update({
        where: { payroll_id: Number(id) },
        data: result,
      });
      successCode(res, result, "Successfully!");
    } else {
      failCode(res, null, failText);
    }
  } catch (err) {
    errorCode(res, errorText);
  }
};
const getAllBonusFine = async (req, res) => {
  try {
    const bonusFineList = await prisma.BONUS_FINE.findMany();
    successCode(res, bonusFineList, successText);
  } catch (err) {
    errorCode(res, errorText);
  }
};
const addBonusFine = async (req, res) => {
  try {
    const {
      employee_id,
      payroll_id,
      bf_date_time,
      money,
      description,
      bf_type,
    } = req.body;
    const data = {
      employee_id,
      payroll_id,
      bf_date_time,
      money,
      description,
      bf_type,
    };
    const newData = await prisma.BONUS_FINE.create({ data });
    successCode(res, newData, "Created!");
  } catch (err) {
    errorCode(res, errorText);
  }
};
const updateBonusFine = async (req, res) => {
  try {
    const { id } = req.params;
    const { money, description, bf_type } = req.body;
    const bonusFine = await prisma.BONUS_FINE.findUnique({
      where: { bf_id: Number(id) },
    });
    if (bonusFine) {
      const data = await prisma.BONUS_FINE.update({
        where: { bf_id: Number(id) },
        data: {
          money: money,
          description: description,
          bf_type: bf_type,
        },
      });

      successCode(res, data, "Successfully!");
    } else {
      failCode(res, null, failText);
    }
  } catch (err) {
    errorCode(err, errorText);
  }
};
const deleteBonusFine = async (req, res) => {
  try {
    const { id } = req.params;
    const bonusFine = await prisma.BONUS_FINE.findUnique({
      where: { bf_id: Number(id) },
    });
    if (bonusFine) {
      await prisma.BONUS_FINE.delete({
        where: { bf_id: Number(id) },
      });
      successCode(res, bonusFine, "Deleted!");
    } else {
      failCode(res, null, failText);
    }
  } catch (err) {
    errorCode(err, errorText);
  }
};
// làm thêm xuất file excel bảng lương cho nhân viên
module.exports = {
  getAllPayroll,
  addPayroll,
  paySalary,
  getAllBonusFine,
  addBonusFine,
  updateBonusFine,
  deleteBonusFine,
};
