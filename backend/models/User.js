const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  accountType: { type: String, enum: ["business"], required: true },
  password: { type: String, required: true }, // Add password field
  companyName: { type: String },
  companyEmail: { type: String },
  companyNumber: { type: String },
  country: { type: String },
  address: { type: String },
  city: { type: String },
});

module.exports = mongoose.model("User", userSchema);
