const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

exports.signup = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorObj = {};
    errors.array().forEach(err => {
      errorObj[err.path] = err.msg;
    });

    req.flash("signupErrors", errorObj);
    req.flash("formData", req.body);
    req.flash("showSignupModal", true); 
    return res.redirect("/");
  }
  const { fullName, email, phone, password, confirmPassword, dob, address } =
    req.body;

  if ((fullName, email, phone, password, confirmPassword, dob, address))
    if (password !== confirmPassword) return res.send("Passwords do not match");

  try {
    const user = await User.create({ fullName, email, phone, password,dob, address });

    res.redirect("/");
  } catch (err) {
    res.send("Error during signup: " + err.message);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.send("Invalid email or password");
  }

  const token = createToken({
    id: user._id,
    name: user.fullName,
    email: user.email,
  });
  res.cookie("jwt", token, { httpOnly: true });

  res.redirect("/");
};

exports.logout = (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/");
};
