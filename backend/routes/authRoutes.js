// backend/routes/authRoutes.js
const express = require("express");
const { registerUser } = require("../controllers/authController"); // Ensure this path is correct and `registerUser` exists

const router = express.Router();

router.post("/register", registerUser); // Ensure `registerUser` is correctly imported and defined

module.exports = router;
