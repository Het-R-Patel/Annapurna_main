const express = require("express");
const router = express.Router();
const { addDonation, UpdateOrderDetails, DeleteOrderDetails, RenderDonationForm, UpdateUserProfile } = require("../controllers/posts");
const { signupValidation } = require("../middlewares/validators");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/donateform", RenderDonationForm);

router.post("/donateformsubmit", authMiddleware, addDonation);

router.put("/update/:id", authMiddleware, UpdateOrderDetails);
router.delete("/delete/:id", authMiddleware, DeleteOrderDetails);

router.post("/update-profile", authMiddleware, signupValidation, UpdateUserProfile);

module.exports = router;
