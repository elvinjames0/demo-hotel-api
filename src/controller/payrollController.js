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
    const payrollList = await prisma.PAYROLL.findMany({
      include: {
        EMPLOYEE: true,
      },
    });

    const newData = payrollList.map((e) => {
      return {
        ...e,
        EMPLOYEE: e.EMPLOYEE.fullname,
      };
    });
    successCode(res, newData, successText);
  } catch (err) {
    errorCode(res, errorText);
  }
};
const addPayroll = async (req, res) => {
  try {
    const employeeList = await prisma.EMPLOYEE.findMany();
    const workingList = employeeList.filter((e) => {
      return e.status == true;
    });
    await Promise.all(
      workingList.map(async (e) => {
        if (e.status == true) {
          return await prisma.PAYROLL.create({
            data: {
              employee_id: e.employee_id,
              day_of_work: 0,
              allowance: 0,
              total_bonus: 0,
              total_fine: 0,
              status: false,
              payroll_date_time: new Date().toISOString(),
              total_salary: 0,
            },
          });
        }
      })
    );
    successCode(res, employeeList, "Created!");
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
    if (payroll.status == false) {
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
      const month = new Date().getMonth() + 1;
      const year = new Date().getFullYear();
      const salary =
        (payroll.EMPLOYEE.base_salary * payroll.day_of_work) /
          new Date(year, month, 0).getDate() +
        bonus +
        allowance -
        fine;
      const result = {
        allowance: allowance,
        status: true,
        total_bonus: bonus,
        total_fine: fine,
        payroll_date_time: new Date().toISOString(),
        total_salary: Math.round(salary),
      };
      await prisma.PAYROLL.update({
        where: { payroll_id: Number(id) },
        data: result,
      });
      successCode(res, result, "Successfully!");
    } else {
      failCode(res, null, "Paid");
    }
  } catch (err) {
    errorCode(res, errorText);
  }
};
const getAllBonusFine = async (req, res) => {
  try {
    const bonusFineList = await prisma.BONUS_FINE.findMany({
      include: {
        EMPLOYEE: true,
      },
    });
    const data = bonusFineList.map((e) => ({
      bf_id: e.bf_id,
      fullName: e.EMPLOYEE.fullname,
      bf_date_time: e.bf_date_time,
      description: e.description,
      money: e.money,
      bf_type: e.bf_type,
    }));
    successCode(res, data, successText);
  } catch (err) {
    errorCode(res, errorText);
  }
};
const addBonusFine = async (req, res) => {
  try {
    const { employee_id, money, description, bf_type } = req.body;
    const payroll = await prisma.PAYROLL.findFirst({
      where: {
        employee_id,
        status: false,
      },
    });
    const data = {
      employee_id,
      payroll_id: payroll.payroll_id,
      bf_date_time: new Date().toISOString(),
      money,
      description,
      bf_type,
    };
    if (bf_type == true) {
      await prisma.PAYROLL.update({
        where: {
          payroll_id: payroll.payroll_id,
        },
        data: {
          total_bonus: payroll.total_bonus + money,
        },
      });
    } else {
      await prisma.PAYROLL.update({
        where: {
          payroll_id: payroll.payroll_id,
        },
        data: {
          total_fine: payroll.total_fine + money,
        },
      });
    }
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
          money,
          description,
          bf_type,
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
