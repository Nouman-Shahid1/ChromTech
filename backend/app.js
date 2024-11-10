const express = require("express");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/usersRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Enable CORS
app.use(cors());

// Connect to the database
connectDB();

// Parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'uploads' folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/users", userRoutes);
// Error handler middleware
app.use(errorHandler);

module.exports = app;
