const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// POST: Create a new order
router.post("/create", async (req, res) => {
  try {
    const orderData = req.body;

    // Ensure the user's email is included in the order data
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

// GET: Fetch orders for the logged-in user
router.get("/user-orders", async (req, res) => {
  try {
    const userEmail = req.query.email;
    if (!userEmail) {
      return res.status(400).json({ message: "User email is required" });
    }

    const userOrders = await Order.find({ userEmail });
    if (userOrders.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for this user." });
    }

    res.status(200).json({
      message: "User orders fetched successfully",
      orders: userOrders,
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Error fetching user orders", error });
  }
});

// DELETE: Delete an order by ID
router.delete("/:id", async (req, res) => {
  try {
    const orderId = req.params.id;
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res
      .status(200)
      .json({ message: "Order deleted successfully", order: deletedOrder });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order", error });
  }
});

module.exports = router;
