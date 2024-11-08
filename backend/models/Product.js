const mongoose = require("mongoose");
const Category = require("./Category"); // Import the Category model

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }, // Reference to Category
  quantity: { type: Number, default: 1 },
  imageUrl: { type: String },
});

module.exports = mongoose.model("Product", productSchema);
