const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.post("/create", async (req, res) => {
  try {
    const orderData = req.body;
    const newOrder = new Order(orderData);
    await newOrder.save();
    res
      .status(201)
      .json({ message: "Order saved successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Error saving order", error });
  }
});

module.exports = router;
