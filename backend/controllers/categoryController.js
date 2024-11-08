const Category = require("../models/Category");

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all categories with nested subcategories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate({
      path: "subcategories",
      populate: {
        path: "subcategories",
        populate: { path: "subcategories" }, // Recursive population for deeper levels
      },
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a subcategory to an existing category
exports.addSubcategory = async (req, res) => {
  try {
    const { parentCategoryId, subcategoryId } = req.body;
    const parentCategory = await Category.findById(parentCategoryId);
    if (!parentCategory)
      return res.status(404).json({ error: "Parent category not found" });

    parentCategory.subcategories.push(subcategoryId);
    await parentCategory.save();
    res.json(parentCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single category by ID with its nested subcategories
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate({
      path: "subcategories",
      populate: { path: "subcategories" }, // Recursive population
    });
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
