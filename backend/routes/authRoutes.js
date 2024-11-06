// authRoutes.js
const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  refreshToken,
} = require("../controllers/authController");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser); // Add the login route
router.post("/logout", logout);
router.post("/refresh", refreshToken);
module.exports = router;
