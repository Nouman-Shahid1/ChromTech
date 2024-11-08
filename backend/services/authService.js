const User = require("../models/User");
const db = require("../config/db");
exports.createUser = async (userData) => {
  const user = new User(userData);
  await user.save();
  return user;
};
exports.logout = async (refreshToken) => {
  if (!refreshToken) throw new Error("No refresh token provided");

  await db.query("DELETE FROM refresh_tokens WHERE token = ?", [refreshToken]);
};
