const { body } = require("express-validator");

let checkLogin = [
  body("username", "Invalid does not empty").not().isEmpty(),
  body("password", "password more than 6 degits").isLength({
    min: 6,
  }),
];

module.exports = {
  checkLogin,
};
