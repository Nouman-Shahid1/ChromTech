const Category = require("../models/Category");

// Create Category
exports.createCategory = async (req, res) => {
  try {
    const { name, subcategories } = req.body;

    const subcategoryIds = await Promise.all(
      subcategories.map(async (subName) => {
        const subcategory = new Category({ name: subName });
        await subcategory.save();
        return subcategory._id;
      })
    );

    const category = new Category({ name, subcategories: subcategoryIds });
    await category.save();

    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate({
      path: "subcategories",
      model: "Category",
      select: "name subcategories",
      options: { lean: true },
      populate: {
        path: "subcategories",
        model: "Category",
        select: "name subcategories",
      },
    });

    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add Subcategory
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

// Get Category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate({
      path: "subcategories",
      populate: { path: "subcategories" },
    });
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Category
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Category
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, subcategories } = req.body;

    // Find the category by ID
    const category = await Category.findById(id);
    if (!category) return res.status(404).json({ error: "Category not found" });

    // Update the category name if provided
    if (name) {
      category.name = name;
    }

    // Update subcategories if provided
    if (subcategories && Array.isArray(subcategories)) {
      // Clear existing subcategories
      category.subcategories = [];

      // Create or find subcategories and add them to the category
      const subcategoryIds = await Promise.all(
        subcategories.map(async (subName) => {
          // Check if subcategory exists by name
          let subcategory = await Category.findOne({ name: subName });
          if (!subcategory) {
            // Create new subcategory if it doesn't exist
            subcategory = new Category({ name: subName });
            await subcategory.save();
          }
          return subcategory._id;
        })
      );

      category.subcategories = subcategoryIds;
    }

    // Save the updated category
    await category.save();

    // Populate subcategories before sending the response
    const updatedCategory = await Category.findById(id).populate(
      "subcategories"
    );

    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
