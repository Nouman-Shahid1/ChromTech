const jwt = require("jsonwebtoken");

// Load the environment variables
require("dotenv").config();

function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
}

module.exports = generateToken;
