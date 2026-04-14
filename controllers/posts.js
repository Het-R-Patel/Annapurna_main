const FoodDonation = require("../models/donate");
const bcrypt = require('bcrypt');
const User = require("../models/User");



async function addDonation(req, res) {
  const {
    fullName,
    email,
    phone,
    address,
    foodName,
    quantity,
    preparedDate,
    foodType,
    packagingStatus,
    additionalNotes,
    preferredPickupTime,
    pickupDate,
    landmark,
    specialInstructions
  } = req.body;


  let errors = {};

  if (!fullName || fullName.trim().length === 0) errors.fullName = "Full Name is required";
  if (!email || !email.includes('@')) errors.email = "Enter a valid email";
  if (!phone || phone.length !== 10) errors.phone = "Phone must be 10 digits";
  if (!address || address.length < 10) errors.address = "Address must be at least 10 characters";
  if (!foodName) errors.foodName = "Food name is required";
  if (!quantity) errors.quantity = "Quantity is required";
  if (!preparedDate) errors.preparedDate = "Prepared date is required";
  if (!foodType) errors.foodType = "Select a food type";
  if (!packagingStatus) errors.packagingStatus = "Select packaging status";
  if (!preferredPickupTime) errors.preferredPickupTime = "Pickup time required";
  if (!pickupDate) errors.pickupDate = "Pickup date required";

  if (Object.keys(errors).length > 0) {
    
    return res.json({
      formData: req.body,
      errors,
      success: false
    });
  }

  try {
    const donation = new FoodDonation({
      fullName,
      email,
      phone,
      address,
      foodName,
      quantity,
      preparedDate,
      foodType,
      packagingStatus,
      additionalNotes,
      preferredPickupTime,
      pickupDate,
      landmark,
      specialInstructions
    });

    await donation.save();
    return res.json({
      success: true
    })
  } catch (err) {
    console.error("Error saving donation:", err);
    res.json({
      formData: req.body,
      errors: { general: "Something went wrong. Please try again." }
    });
  }
}

async function getDashboard(req, res) {
  try {
    const donations = await FoodDonation.find({
      email: req.user.id.email,
    }).sort({ createdAt: -1 });
    console.log(donations)

    const userData = await User.find({
      email: req.user.id.email,
      
    });
  

    
    res.render("data", { donation: donations,user:req.user, User: userData[0]});
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
 
  if (!errors.isEmpty()) {
    const errorObj = {};
    errors.array().forEach(err => {
      errorObj[err.path] = err.msg;
    });

    req.flash("signupErrors", errorObj);
    req.flash("formData", req.body);
    req.flash("showSignupModal", true); 
    return res.redirect("/");
  }
  try {
    const {
      fullName,
      phone,
      dob,
      address,
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
    user.address = address;
    
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
