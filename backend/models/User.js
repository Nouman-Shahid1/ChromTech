const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  accountType: { type: String, enum: ["business"], required: true },
  password: { type: String, required: true },
  companyName: { type: String },
  companyEmail: { type: String },
  companyNumber: { type: String },
  country: { type: String },
  address: { type: String },
  city: { type: String },
  role: { type: String, enum: ["business", "admin"], default: "business" }, // New field
});

// Hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("User", userSchema);
