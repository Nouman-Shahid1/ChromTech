const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

const app = express();

connectDB();

app.use(express.json());

app.use("/api/auth", authRoutes);
const errorHandler = require("./middleware/errorHandler");

app.use(errorHandler);
module.exports = app;
