const { validationResult } = require("express-validator");
const { failCode } = require("../../utils/response");
const authValidation = require("./authValidation");
const userValidation = require("./userValidation");

const checkValidate = (req, res, next) => {
  const result = validationResult(req);
  const hasErrors = !result.isEmpty();
  if (!hasErrors) next();
  else {
    failCode(res, result, "Validator", 402);
  }
};

const Auth = {
  checkLogin: authValidation.checkLogin,
  checkSignUp: userValidation.checkSignUp,
};

let validator = {
  checkValidate,
  Auth,
};

module.exports = { validator };
