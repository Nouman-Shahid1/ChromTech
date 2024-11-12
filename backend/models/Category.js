const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  subtitle: { type: String, required: true, default: "No subtitle provided" }, // Adding default
  image: { type: String },
  subcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
});

module.exports = mongoose.model("Category", categorySchema);
