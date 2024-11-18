const express = require("express");
const { updateUser } = require("../controllers/authController");
const {
  registerUser,
  loginUser,
  logout,
  updatePassword,
  // updateUserRole,
  refreshToken,
} = require("../controllers/authController");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logout);

router.post("/refresh", refreshToken);
router.put("/update-user", updateUser);
module.exports = router;
