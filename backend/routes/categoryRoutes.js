const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.post("/", categoryController.createCategory); // Create category
router.get("/", categoryController.getCategories); // Read all categories with nested subcategories
router.get("/:id", categoryController.getCategoryById); // Read single category with all nested subcategories
router.post("/add-subcategory", categoryController.addSubcategory); // Add subcategory to a category
router.delete("/:id", categoryController.deleteCategory); // Delete category

module.exports = router;
