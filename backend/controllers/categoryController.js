const Category = require("../models/Category");
const upload = require("../middleware/multer");

exports.createCategory = [
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.body.subtitle) {
        return res.status(400).json({ error: "Subtitle is required" });
      }

      const image = req.file ? req.file.path : "";
      const name = req.body.name || "";
      const subcategories = Array.isArray(req.body.subcategories)
        ? req.body.subcategories
        : [req.body.subcategories];


      const subcategoryIds = await Promise.all(
        subcategories.map(async (subName) => {
          const subcategory = new Category({ name: subName });
          await subcategory.save();
          return subcategory._id;
        })
      );

      const category = new Category({
        name,
        subtitle: req.body.subtitle, // Directly assign subtitle from req.body
        image,
        subcategories: subcategoryIds,
      });


      await category.save();
      res.status(201).json(category);
    } catch (error) {
      console.error("Error creating category:", error);
      res.status(400).json({ error: error.message });
    }
  },
];

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate({
      path: "subcategories",
      model: "Category",
      select: "name subtitle image subcategories", 
      options: { lean: true },
      populate: {
        path: "subcategories",
        model: "Category",
        select: "name subtitle image", 
      },
    });

    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
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

exports.updateCategory = [
  upload.single("image"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { name, subtitle, subcategories } = req.body;
      const image = req.file ? req.file.path : undefined;

      const category = await Category.findById(id);
      if (!category)
        return res.status(404).json({ error: "Category not found" });

      if (name) category.name = name;
      if (subtitle) category.subtitle = subtitle;
      if (image) category.image = image;

      const subcategoriesArray = Array.isArray(subcategories)
        ? subcategories
        : subcategories
        ? [subcategories]
        : [];

      if (subcategoriesArray.length > 0) {
        category.subcategories = await Promise.all(
          subcategoriesArray.map(async (subName) => {
            let subcategory = await Category.findOne({ name: subName });
            if (!subcategory) {
              subcategory = new Category({ name: subName });
              await subcategory.save();
            }
            return subcategory._id;
          })
        );
      }

      await category.save();

      const updatedCategory = await Category.findById(id).populate(
        "subcategories"
      );
      res.json(updatedCategory);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
];
