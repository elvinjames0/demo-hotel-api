const { body } = require("express-validator");

let checkSignUp = [
  body("username", "Invalid does not empty").not().isEmpty(),
  body("username", "username more than 6 characters").isLength({
    min: 6,
  }),
  body("password", "password more than 6 characters and 1 digit").matches(
    /^(?=.*\d).{6,}$/
  ),
  body("fullname", "Invalid does not empty").not().isEmpty(),
  body("cccd", "Invalid does not empty").not().isEmpty(),
  body("cccd", "cccd more than 12 characters").isLength({
    min: 12,
  }),
  body("phone", "Invalid phone").isMobilePhone(),
  body("address", "Invalid does not empty").not().isEmpty(),
  body("gender", "Invalid gender").isBoolean().toBoolean(),
  body("date_of_birth", "Birthdate format MM/DD/YYYY").matches(
    /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/
  ),
  body("gmail", "Invalid does not empty").not().isEmpty(),
  body("gmail", "Invalid gmail").isEmail(),
  body("nationality", "Invalid does not empty").not().isEmpty(),
  body("date_start", "Invalid does not empty").not().isEmpty(),
  body("base_salary", "Invalid does not empty").not().isEmpty(),
];

module.exports = {
  checkSignUp,
};
