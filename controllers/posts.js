const FoodDonation = require("../models/donate");
const bcrypt = require('bcrypt');
const User = require("../models/User");



async function addDonation(req, res) {
  try {
    const {
      name,
      phone,
      houseNo,
      street,
      city,
      state,
      pincode,
      food_name,
      quantity,
      expiry_date,
      food_type,
      packaging_status,
      pickup_time,
      notes,
    } = req.body;
    const fullAddress = `${houseNo}, ${street}, ${city}, ${state}, ${pincode}`;
    // if (
    //   !name ||
    //   !email ||
    //   !phone ||
    //   ! ||
    //   !food_name ||
    //   !quantity ||
    //   !expiry_date
    // ) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Please fill in all required fields",
    //   });
    // }

    const newDonation = new FoodDonation({
      donorName: name,
      email:req.user.id.email,
      phone,
      address: fullAddress,
      foodName: food_name,
      foodType: food_type,
      quantity,
      additionalNotes: notes,
      expiry_date,
      status: packaging_status,
    });

    await newDonation.save();

    res.status(201).redirect("/dashboard");
  } catch (error) {
    console.error("Error adding donation:", error);
    res
      .status(500)
      .json({ success: false, message: "Error adding donation", error });
  }
}

async function getDashboard(req, res) {
  try {
    const donations = await FoodDonation.find({
      email: req.user.id.email,
    }).sort({ createdAt: -1 }); // latest first
    const address = await User.find({
      email: req.user.id.email,
      
    },{address:1 ,_id:0});
    res.render("data", { donation: donations, user: req.user, User: address[0] });
  } catch (err) {
    console.error("Error fetching dashboard data:", err);
    res.status(500).send("Something went wrong");
  }
}

async function UpdateOrderDetails(req, res) {
  try {
    await FoodDonation.findByIdAndUpdate(req.params.id, req.body);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Update failed" });
  }
}

async function DeleteOrderDetails(req, res) {
  try {
    await FoodDonation.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Delete failed" });
  }
}

async function RenderDonationForm(req, res) {
  try {
    const address = await User.find({
      email: req.user.id.email,
    }).sort({ createdAt: -1 });
    res.render("formdonation", {
      user: req.user,
      address:address[0].address,
    });
  } catch (err) {
    console.error("Error fetching dashboard data:", err);
    res.status(500).send("Something went wrong");
  }
}

async function UpdateUserProfile(req, res) {
  try {
    const {
      fullName,
      phone,
      dob,
      houseNo,
      street,
      city,
      state,
      pincode,
      currentPassword,
      newPassword,
    
    } = req.body;


    const user = await User.findOne({email:req.user.id.email });

    if (!user) {
      return res.status(404).send("User not found");
    }

    user.fullName = fullName;
    user.phone = phone;
    user.dob = dob;

    user.address = { houseNo, street, city, state, pincode };
    
    if (currentPassword && newPassword) {
      if (!user || !(await user.comparePassword(currentPassword))) {
        return res.send("Invalid curretntpassword ");
      }
      user.password = newPassword;
    }

    await user.save();
    res.redirect("/dashboard");
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).send("Something went wrong");
  }
}

module.exports = {
  addDonation,
  getDashboard,
  UpdateOrderDetails,
  DeleteOrderDetails,
  RenderDonationForm,
  UpdateUserProfile,
};
