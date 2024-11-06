// backend/services/authService.js
const User = require("../models/User");
const db = require("../config/db");
exports.createUser = async (userData) => {
  const user = new User(userData);
  await user.save();
  return user;
};
exports.logout = async (refreshToken) => {
  if (!refreshToken) throw new Error("No refresh token provided");

  // Invalidate the refresh token here.
  // Example: Remove the token from the database if you're storing it there
  await db.query("DELETE FROM refresh_tokens WHERE token = ?", [refreshToken]); // Example SQL

  // If you’re not using a database, consider using a cache like Redis to manage token blacklists.
};
