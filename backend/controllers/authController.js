const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
require("dotenv").config();

const { REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET } = process.env;

exports.registerUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      accountType,
      password,
      companyName,
      companyEmail,
      companyNumber,
      country,
      address,
      city,
    } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" }); // Create a new user with password as plain text, schema will hash it

    user = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      accountType,
      password,
      companyName,
      companyEmail,
      companyNumber,
      country,
      address,
      city,
    });

    await user.save();

    if (!ACCESS_TOKEN_SECRET) {
      console.error("ACCESS_TOKEN_SECRET is not defined");
      return res.status(500).json({ message: "Server configuration error" });
    }

    const access_token = jwt.sign({ id: user._id }, ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ access_token, user });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
      console.error("Token secrets are not defined");
      return res.status(500).json({ message: "Server configuration error" });
    }

    const access_token = jwt.sign({ id: user._id }, ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });
    const refresh_token = jwt.sign({ id: user._id }, REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });
    res.status(200).json({ access_token, expires_in: 900, user });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({ message: "Logout failed" });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const { refresh_token } = req.body;

    if (!refresh_token)
      return res.status(401).json({ message: "No refresh token provided" });

    jwt.verify(refresh_token, REFRESH_TOKEN_SECRET, (err, user) => {
      if (err)
        return res.status(403).json({ message: "Invalid refresh token" });

      const access_token = jwt.sign({ id: user.id }, ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
      });
      res.status(200).json({ access_token, expires_in: 900 });
    });
  } catch (error) {
    console.error("Refresh Token Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
