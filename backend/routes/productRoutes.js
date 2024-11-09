const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const upload = require("../middleware/multer");

router.post("/", upload.single("image"), productController.createProduct); // Create product with image
router.get("/", productController.getProducts); // Get all products
router.get("/:id", productController.getProductById); // Get single product by ID
router.put("/:id", upload.single("image"), productController.updateProduct); // Update product with image
router.delete("/:id", productController.deleteProduct); // Delete product by ID

module.exports = router;
