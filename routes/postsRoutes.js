const express = require("express");
const router = express.Router();
const { addDonation, UpdateOrderDetails ,DeleteOrderDetails,RenderDonationForm,UpdateUserProfile} = require("../controllers/posts");
const { signupValidation } = require("../middlewares/validators");
router.get("/donateform",RenderDonationForm);

router.post("/donateformsubmit", addDonation);

router.put("/update/:id", UpdateOrderDetails);
router.delete("/delete/:id",DeleteOrderDetails);

router.post("/update-profile",signupValidation,UpdateUserProfile)


module.exports = router;
