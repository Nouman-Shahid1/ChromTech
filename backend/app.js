const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());

connectDB();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use(errorHandler);

module.exports = app;
