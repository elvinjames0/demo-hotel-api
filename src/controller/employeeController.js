const { PrismaClient } = require("@prisma/client");
const { encodeToken } = require("../middlewares/auth");
const { hashPassword, comparePassword } = require("../utils/password");
const {
  successCode,
  failCode,
  errorCode,
  errorText,
  successText,
  failText,
} = require("../utils/response");
const prisma = new PrismaClient();

const loginEmployee = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      failCode(res, null, "Please fill in username or password");
      return;
    }
    let employee = await prisma.EMPLOYEE.findUnique({ where: { username } });
    if (!employee) {
      failCode(res, null, failText);
      return;
    }
    let checkPass = await comparePassword(password, employee.password);
    if (!checkPass) {
      failCode(res, null, "Wrong password!");
      return;
    }
    let token = encodeToken(
      { id: employee.employee_id, username: employee.username },
      "12h"
    );
    successCode(res, { token }, "Login successfully");
  } catch (err) {
    errorCode(err, errorText);
  }
};

const addEmployee = async (req, res) => {
  try {
    const {
      role_id,
      username,
      password,
      fullname,
      cccd,
      phone,
      address,
      gender,
      date_of_birth,
      gmail,
      nationality,
      status,
      date_start,
      date_end,
      base_salary,
    } = req.body;
    const hashPass = await hashPassword(password);
    const hashcccd = await hashPassword(cccd);
    const data = {
      role_id,
      username,
      password: hashPass,
      fullname,
      cccd: hashcccd,
      phone,
      address,
      gender,
      date_of_birth,
      gmail,
      nationality,
      status,
      date_start,
      date_end,
      base_salary,
    };
    let employee = await prisma.EMPLOYEE.findUnique({ where: { username } });
    if (employee) {
      failCode(res, null, "Username has been used!");
      return;
    }
    employee = await prisma.EMPLOYEE.create({ data });
    if (employee) {
      successCode(res, employee, "Created!");
    }
  } catch (err) {
    errorCode(err, errorText);
  }
};

const getDetailEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    let user = await prisma.EMPLOYEE.findUnique({
      where: { employee_id: Number(id) },
    });
    user ? successCode(res, user, successText) : failCode(res, null, failText);
  } catch (err) {
    errorCode(err, errorText);
  }
};
const getEmployeeList = async (req, res) => {
  let employeeList = await prisma.EMPLOYEE.findMany();
  successCode(res, employeeList, successText);
};
const deleteEmployee = async (req, res) => {
  let { id } = req.params;
  let user = await prisma.EMPLOYEE.findUnique({
    where: { employee_id: Number(id) },
  });
  if (!user) {
    failCode(res, null, failText);
    return;
  }
  await prisma.EMPLOYEE.delete({ where: { employee_id: Number(id) } });
  successCode(res, user, "Deleted!");
};

// const searchUserByName = async (req, res) => {
//   try {
//     const { name } = req.params;
//     if (!name) {
//       failCode(res, null, "Nhập tên người dùng cần tìm kiếm!");
//       return;
//     }
//     let user = await prisma.nguoi_dung.findMany({
//       where: { name: { contains: name } },
//     });
//     successCode(res, user, "Thành công");
//   } catch (err) {}
// };

const updateEmployee = async (req, res) => {
  try {
    let { id } = req.params;
    const {
      role_id,
      username,
      password,
      fullname,
      cccd,
      phone,
      address,
      gender,
      date_of_birth,
      gmail,
      nationality,
      status,
      date_start,
      date_end,
      base_salary,
    } = req.body;
    const hashPass = await hashPassword(password);
    const hashcccd = await hashPassword(cccd);
    const data = {
      role_id,
      username,
      password: hashPass,
      fullname,
      cccd: hashcccd,
      phone,
      address,
      gender,
      date_of_birth,
      gmail,
      nationality,
      status,
      date_start,
      date_end,
      base_salary,
    };
    let employee = await prisma.EMPLOYEE.findUnique({
      where: { employee_id: Number(id) },
    });
    if (!employee) {
      failCode(res, null, failText);
      return;
    }
    employee = await prisma.EMPLOYEE.update({
      data,
      where: { employee_id: Number(id) },
    });
    successCode(res, employee, "Updated");
  } catch (err) {
    errorCode(err, errorText);
  }
};

module.exports = {
  loginEmployee,
  addEmployee,
  getDetailEmployee,
  getEmployeeList,
  deleteEmployee,
  updateEmployee,
  // searchUserByName,
  // searchUserPanigation,
};
