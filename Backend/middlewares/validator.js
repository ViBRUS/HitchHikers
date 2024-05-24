const { check, validationResult } = require("express-validator");

exports.validateUser = [
  check("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Name is missing!")
    .isLength({ min: 3, max: 30 })
    .withMessage("Name must be 3 to 30 characters long!"),
  check("email").normalizeEmail().isEmail().withMessage("Email is invalid!"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is missing!")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be 8 to 20 characters long!"),
    check("mobile")
    .trim()
    .not()
    .isEmpty()
    .withMessage("mobile is missing!"),
];

exports.validate = (req, res, next) => {
  const error = validationResult(req).array();
  if (!error.length) return next();

  res.status(400).json({ success: false, error: error[0].msg });
};
