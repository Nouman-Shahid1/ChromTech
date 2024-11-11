const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin", "business"], default: "user" },
  address: { type: String },
  city: { type: String },
});

module.exports = mongoose.model("AdminUser", UserSchema);
