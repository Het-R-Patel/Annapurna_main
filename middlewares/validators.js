const { body } = require("express-validator");

exports.signupValidation = [
  body("fullName").notEmpty().withMessage("Full name is required"),
  body("email").isEmail().withMessage("Enter a valid email"),
  body("phone").isLength({ min: 10, max: 10 }).withMessage("Phone must be 10 digits"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) throw new Error("Passwords do not match");
    return true;
  }),
  body("dob").notEmpty().withMessage("Date of birth is required"),
  body("address").isLength({ min: 10 }).withMessage("Address must be at least 10 characters"),
];