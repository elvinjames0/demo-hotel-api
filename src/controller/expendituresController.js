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

const addExpenditures = async (req, res) => {
  try {
    const { shift_id, description, money, expenditures_date_time } = req.body;
    const data = { shift_id, description, money, expenditures_date_time };
    const newData = await prisma.eXPENDITURES.create({ data });
    successCode(res, newData, "Created!");
  } catch (err) {
    errorCode(err, errorText);
  }
};

const getAllExpenditures = async (req, res) => {
  try {
    const expendituresList = await prisma.EXPENDITURES.findMany();
    successCode(res, expendituresList, successText);
  } catch (err) {
    errorCode(err, errorText);
  }
};
const deleteExpenditures = async (req, res) => {
  try {
    const { id } = req.params;
    const expenditures = await prisma.EXPENDITURES.findUnique({
      where: { expenditures_id: Number(id) },
    });
    if (expenditures) {
      await prisma.EXPENDITURES.delete({
        where: { expenditures_id: Number(id) },
      });
      successCode(res, expenditures, "Deleted!");
    } else {
      failCode(res, null, failText);
    }
  } catch (err) {
    errorCode(err, errorText);
  }
};
module.exports = { addExpenditures, getAllExpenditures, deleteExpenditures };
