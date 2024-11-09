const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
require("dotenv").config();

const { REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET } = process.env;

// Register User
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
      role,
    } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    // Set default role as 'business', allow 'superadmin' only from backend request
    const userRole = role === "superadmin" ? "superadmin" : "business";

    // Create new user
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
      role: userRole,
    });

    // Save user
    await user.save();

    // Generate access token
    const access_token = jwt.sign(
      { id: user._id, role: user.role },
      ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({ access_token, user });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    // Generate tokens
    const access_token = jwt.sign(
      { id: user._id, role: user.role },
      ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m",
      }
    );
    const refresh_token = jwt.sign(
      { id: user._id, role: user.role },
      REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Set refresh token as cookie
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

// Logout User
exports.logout = async (req, res) => {
  try {
    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({ message: "Logout failed" });
  }
};

// Refresh Token
exports.refreshToken = async (req, res) => {
  try {
    const { refresh_token } = req.cookies;

    if (!refresh_token)
      return res.status(401).json({ message: "No refresh token provided" });

    jwt.verify(refresh_token, REFRESH_TOKEN_SECRET, (err, user) => {
      if (err)
        return res.status(403).json({ message: "Invalid refresh token" });

      const access_token = jwt.sign(
        { id: user.id, role: user.role },
        ACCESS_TOKEN_SECRET,
        {
          expiresIn: "15m",
        }
      );

      res.status(200).json({ access_token, expires_in: 900 });
    });
  } catch (error) {
    console.error("Refresh Token Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update User
exports.updateUser = async (req, res) => {
  try {
    const { userId, role } = req.body;
    const updateData = req.body;

    // Prevent sensitive fields from being updated
    delete updateData.password;
    delete updateData.email;

    // Only allow updating role to 'superadmin' from backend
    if (role === "superadmin") {
      updateData.role = "superadmin";
    } else {
      delete updateData.role;
    }

    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Update User Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Middleware to verify access token
exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied, no token provided" });

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({ message: "Invalid or expired token" });
    req.user = user;
    next();
  });
};

// Middleware to check user roles
exports.checkRole = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res
      .status(403)
      .json({ message: "Access denied, insufficient permissions" });
  }
  next();
};
