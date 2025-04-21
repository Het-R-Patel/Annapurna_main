const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const {getDashboard} = require("../controllers/posts");
const getCoordinatesFromAddress = require('../utils/geocode');

router.get("/login", (req, res) => res.render("login"));
router.get("/signup", (req, res) => res.render("signup"));

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

// // Protected route
// router.get("/", authMiddleware, (req, res) => {
//   res.send("Welcome to the protected dashboard");
// });

router.get("/",authMiddleware,(req,res)=>{
  res.render("home")
});

router.get("/dashboard", authMiddleware, getDashboard);

router.get("/geocode",async (req, res) => {
  try {
    const address = req.query.address;
    if (!address) return res.status(400).json({ error: "Address required" });

    const coords = await getCoordinatesFromAddress(address);
    res.json(coords);
  } catch (err) {
    console.error("Geocoding error:", err.message);
    res.status(500).json({ error: "Failed to geocode address" });
  }
});
module.exports = router;
