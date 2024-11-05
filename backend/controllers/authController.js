const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body; // Check if user exists

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" }); // Create user

    user = new User(req.body);
    await user.save(); // Generate token

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
