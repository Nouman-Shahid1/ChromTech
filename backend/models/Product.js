const mongoose = require("mongoose");
const Category = require("./Category");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  quantity: { type: Number, default: 1 },
  imageUrl: { type: String }, 
});

module.exports = mongoose.model("Product", productSchema);
