// backend/controllers/authController.js
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const authService = require("../services/authService");

exports.registerUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      accountType,
      password,
      ...rest
    } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await authService.createUser({
      firstName,
      lastName,
      email,
      phoneNumber,
      accountType,
      password: hashedPassword,
      ...rest,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
