// authRoutes.js
const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser); // Add the login route

module.exports = router;
