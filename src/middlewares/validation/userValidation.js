const { body } = require("express-validator");

let checkSignUp = [
  body("username", "Invalid does not empty").not().isEmpty(),
  body("username", "username more than 6 characters").isLength({
    min: 6,
  }),
  body("password", "password more than 6 characters").isLength({
    min: 6,
  }),
  body("fullname", "Invalid does not empty").not().isEmpty(),
  body("cccd", "Invalid does not empty").not().isEmpty(),
  body("cccd", "cccd more than 12 characters").isLength({
    min: 12,
  }),
  body("phone", "Invalid phone").isMobilePhone(),
  body("address", "Invalid does not empty").not().isEmpty(),
  body("gender", "Invalid gender").matches(/[0,1]/),
  body("date_of_birth", "Birthdate format dd/mm/yyyy").matches(
    /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/
  ),
  body("gmail", "Invalid does not empty").not().isEmpty(),
  body("gmail", "Invalid gmail").isEmail(),
  body("nationality", "Invalid does not empty").not().isEmpty(),
  body("status", "Invalid does not empty").not().isEmpty(),
  body("date_start", "Invalid does not empty").not().isEmpty(),
  body("base_salary", "Invalid does not empty").not().isEmpty(),
];

module.exports = {
  checkSignUp,
};
