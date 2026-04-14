const mongoose = require("mongoose");

const foodDonationSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/,
  },
  address: {
    type: String,
    required: true,
    minlength: 10,
  },
  foodName: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: String, 
    required: true,
  },
  preparedDate: {
    type: Date,
    required: true,
  },
  foodType: {
    type: String,
    enum: ["Vegetarian", "Non-Vegetarian"],
    required: true,
  },
  packagingStatus: {
    type: String,
    enum: ["Packaged", "Not Packed"],
    required: true,
  },
  additionalNotes: {
    type: String,
    default: "",
  },
  preferredPickupTime: {
    type: String,
    required: true,
  },
  pickupDate: {
    type: Date,
    required: true,
  },
  landmark: {
    type: String,
    default: "",
  },
  specialInstructions: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  deliverystatus: {
    type: String,
    enum: ["delivered", "not delivered"],
    default: "not delivered",
  },
  latitude: {
    type: Number,
  },
  longitude: {
    Type: Number,
  },
});

module.exports = mongoose.model("FoodDonation", foodDonationSchema);
