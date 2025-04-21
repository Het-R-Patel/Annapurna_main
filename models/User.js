const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  dob: String,
  password: String,
  address: {
    houseNo: String,
    street: String,
    city: String,
    state: String,
    pincode: String
  },
  latitude: Number,
  longitude: Number,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
