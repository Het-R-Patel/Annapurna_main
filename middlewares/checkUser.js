// middleware/checkUser.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const checkUser = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    } catch (err) {
      console.log("Token invalid or expired");
    }
  }
  next();
};

module.exports = checkUser;
