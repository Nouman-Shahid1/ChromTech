const Product = require("../models/Product");
const Category = require("../models/Category");

exports.createProduct = async (req, res) => {
  try {
    const productData = req.body;

    if (req.file) {
      productData.imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
    }

    if (!productData.name || !productData.price || !productData.category) {
      return res
        .status(400)
        .json({ error: "Name, price, and category are required" });
    }

    const product = new Product(productData);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ error: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category", "name _id")
      .populate("subcategory", "name _id");

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category", "name _id")
      .populate("subcategory", "name _id");

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const productData = req.body;

    if (req.file) {
      productData.imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      productData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search Products
exports.searchProducts = async (req, res) => {
  try {
    const query = req.query.query;

    // If query is empty, return all products
    if (!query) {
      const products = await Product.find()
        .populate("category", "name _id")
        .populate("subcategory", "name _id");
      return res.json(products);
    }

    // Perform a case-insensitive search on the product name and description
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    })
      .populate("category", "name _id")
      .populate("subcategory", "name _id");

    res.json(products);
  } catch (error) {
    console.error("Error in searchProducts:", error);
    res.status(500).json({ error: error.message });
  }
};
