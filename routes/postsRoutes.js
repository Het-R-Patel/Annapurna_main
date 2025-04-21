const express = require("express");
const router = express.Router();
const { addDonation, UpdateOrderDetails ,DeleteOrderDetails,RenderDonationForm,UpdateUserProfile} = require("../controllers/posts");

router.get("/donateform",RenderDonationForm);

router.post("/donateformsubmit", addDonation);

router.put("/update/:id", UpdateOrderDetails);
router.delete("/delete/:id",DeleteOrderDetails);

router.post("/update-profile",UpdateUserProfile)




module.exports = router;
