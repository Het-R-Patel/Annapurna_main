const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const checkUser=require("../middlewares/checkUser");

const {getDashboard} = require("../controllers/posts");


router.get("/login", (req, res) => res.render("login"));
router.get("/signup", (req, res) => res.render("signup"));

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

// // Protected route
// router.get("/", authMiddleware, (req, res) => {
//   res.send("Welcome to the protected dashboard");
// });

router.get("/",checkUser,(req,res)=>{

  res.render("home",{user: req.user,})
});
router.get("/dashboard", authMiddleware, getDashboard);

module.exports = router;
