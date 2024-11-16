const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// POST: Create a new order
router.post("/create", async (req, res) => {
  try {
    const orderData = req.body;
    if (!orderData.userEmail) {
      return res
        .status(400)
        .json({ message: "User email is required to create an order." });
    }
    const newOrder = new Order(orderData);
    await newOrder.save();
    res
      .status(201)
      .json({ message: "Order saved successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Error saving order", error });
  }
});

// GET: Fetch orders for a specific user
router.get("/user-orders", async (req, res) => {
  try {
    const userEmail = req.query.email;
    if (!userEmail) {
      return res.status(400).json({ message: "User email is required" });
    }
    const userOrders = await Order.find({ userEmail });
    res
      .status(200)
      .json({
        message: "User orders fetched successfully",
        orders: userOrders,
      });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user orders", error });
  }
});

// GET: Fetch all orders (Admin)
router.get("/all-orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res
      .status(200)
      .json({ message: "All orders fetched successfully", orders });
  } catch (error) {
    res.status(500).json({ message: "Error fetching all orders", error });
  }
});

// PATCH: Update order status
router.patch("/update-status/:id", async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Order status updated", order: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: "Error updating order status", error });
  }
});

// DELETE: Delete an order by ID
router.delete("/:id", async (req, res) => {
  try {
    const orderId = req.params.id;
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    res.status(200).json({ message: "Order deleted", order: deletedOrder });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order", error });
  }
});

module.exports = router;
