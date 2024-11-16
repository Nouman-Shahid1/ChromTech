const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  cartItems: { type: Array, required: true },
  totalItems: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  currency: { type: String, required: true },
  shippingFee: { type: Number, required: true },
  address: {
    firstName: String,
    lastName: String,
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    country: String,
    zipCode: String,
    phoneNumber: String,
  },
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
