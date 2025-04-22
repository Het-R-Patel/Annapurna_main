const User = require("../models/User");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

exports.signup = async (req, res) => {
  const { fullName, email, phone, password, confirmPassword } = req.body;

  

  if (password !== confirmPassword)
    return res.send("Passwords do not match");

  try {
    const user = await User.create({ fullName, email, phone, password });
  
    res.redirect("/login"); 
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

  const token = createToken({id:user._id,name:user.fullName,email:user.email});
    res.cookie("jwt", token, { httpOnly: true });
    
  res.redirect("/");
};

exports.logout = (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/login");
};
