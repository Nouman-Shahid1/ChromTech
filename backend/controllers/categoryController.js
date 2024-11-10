const Category = require("../models/Category");

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

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
