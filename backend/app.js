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
const upload = require("./middleware/multer");
const app = express();
const bodyParser = require("body-parser");
const orderRoutes = require('./routes/orderRoutes');

// Enable CORS
app.use(cors());

// Connect to the database
connectDB();

// Parse JSON requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'uploads' folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use("/api/categories", categoryRoutes,upload.single("image"));
// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/users", userRoutes);
app.use('/api/orders', orderRoutes);

// Error handler middleware
app.use(errorHandler);

module.exports = app;
