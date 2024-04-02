const jwt = require("jsonwebtoken");
require("dotenv").config();
const response = require("../utils/response");

const encodeToken = (data, time = "10s") => {
  return jwt.sign({ data }, process.env.SIGN_TOKEN, { expiresIn: time });
};
const decodeToken = (token) => {
  return jwt.decode(token);
};

const verifyToken = async (req, res, next) => {
  try {
    let { authorization } = req.headers;
    let checkToken = await jwt.verify(
      authorization.split(" ")[1],
      process.env.SIGN_TOKEN
    );
    if (checkToken) {
      req = { ...req, user: checkToken?.data };
      next();
    }
  } catch (error) {
    response.failCode(res, null, "Lỗi bảo mật", 401);
  }
};

module.exports = {
  encodeToken,
  decodeToken,
  verifyToken,
};
