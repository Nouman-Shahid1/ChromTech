// backend/app.js
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Apply CORS middleware
app.use(cors());

// Connect to the database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Error handling middleware
app.use(errorHandler);

module.exports = app;
