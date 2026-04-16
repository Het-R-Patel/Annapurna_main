const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const { signupValidation } = require("../middlewares/validators");

const checkUser = require("../middlewares/checkUser");

const { getDashboard, getVolunteerDashboard, getAdminDashboard, acceptDonation, completeDonation, rejectDonation } = require("../controllers/posts");

router.post("/signup", signupValidation, authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

// Protected routes
router.get("/dashboard", authMiddleware, getDashboard);

// Admin Route
router.get("/admin-dashboard", authMiddleware, getAdminDashboard);

// Volunteer Routes
router.get("/volunteer-dashboard", authMiddleware, getVolunteerDashboard);
router.post("/donation/:id/accept", authMiddleware, acceptDonation);
router.post("/donation/:id/complete", authMiddleware, completeDonation);
router.post("/donation/:id/reject", authMiddleware, rejectDonation);

module.exports = router;
