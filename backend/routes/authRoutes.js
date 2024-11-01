const express = require("express");
const { signup, login } = require("../controllers/authController");
const authValidator = require("../validators/authValidator");

const router = express.Router();

router.post("/signup", authValidator.validateSignup, signup);
router.post("/login", authValidator.validateLogin, login);

module.exports = router;
