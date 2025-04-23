const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const { signupValidation } = require("../middlewares/validators");

const checkUser = require("../middlewares/checkUser");

const { getDashboard } = require("../controllers/posts");

router.post("/signup", signupValidation, authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

// // Protected route
// router.get("/", authMiddleware, (req, res) => {
//   res.send("Welcome to the protected dashboard");
// });


router.get("/dashboard", authMiddleware, getDashboard);



module.exports = router;
