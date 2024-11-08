const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    companyName: { type: String },
    companyEmail: { type: String },
    companyNumber: { type: String },
    country: { type: String },
    address: { type: String },
    city: { type: String },
    role: {
      type: String,
      enum: ["businessOwner", "superAdmin"],
      default: "businessOwner",
    },
  },
  { timestamps: true }
);

// Hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12); // Stronger hash with 12 salt rounds
  next();
});

// Password comparison method
userSchema.methods.comparePassword = async function (inputPassword) {
  return bcrypt.compare(inputPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
