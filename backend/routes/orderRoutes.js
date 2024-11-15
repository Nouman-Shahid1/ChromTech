const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// POST: Create a new order
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

// GET: Fetch all orders
router.get("/all", async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ message: "Orders fetched successfully", orders });
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
});

// GET: Fetch order by ID
router.get("/:id", async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order fetched successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error });
  }
});

module.exports = router;
