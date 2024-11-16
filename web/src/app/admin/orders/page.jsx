"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, updateOrderStatus } from "@/reducers/Order/orderSlice";
import { FaCheckCircle, FaTimesCircle, FaRedo } from "react-icons/fa";
import { motion } from "framer-motion";
import Profile from "@/components/Profile/Profile";

function AdminOrders() {
  const dispatch = useDispatch();
  const { orders, status } = useSelector((state) => state.order);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const handleStatusChange = (orderId, status) => {
    dispatch(updateOrderStatus({ orderId, status }));
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const filterOrders = () => {
    if (activeTab === "pending") {
      return orders.filter((order) => order.status === "Pending");
    } else if (activeTab === "completed") {
      return orders.filter((order) => order.status === "Completed");
    }
    return orders;
  };

  if (status === "loading")
    return (
      <div className="flex items-center justify-center h-screen">
        <div
          aria-label="Loading..."
          role="status"
          className="flex items-center space-x-2"
        >
          <svg
            className="h-20 w-20 animate-spin stroke-gray-500"
            viewBox="0 0 256 256"
          >
            <line
              x1="128"
              y1="32"
              x2="128"
              y2="64"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
            <line
              x1="195.9"
              y1="60.1"
              x2="173.3"
              y2="82.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
            <line
              x1="224"
              y1="128"
              x2="192"
              y2="128"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
            <line
              x1="195.9"
              y1="195.9"
              x2="173.3"
              y2="173.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
            <line
              x1="128"
              y1="224"
              x2="128"
              y2="192"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
            <line
              x1="60.1"
              y1="195.9"
              x2="82.7"
              y2="173.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
            <line
              x1="32"
              y1="128"
              x2="64"
              y2="128"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
            <line
              x1="60.1"
              y1="60.1"
              x2="82.7"
              y2="82.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
          </svg>
          <span className="text-4xl font-medium text-gray-500">Loading...</span>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50 p-8">
      <Profile />
      <header className="text-center mt-12 mb-10 bg-gradient-to-r from-red-600 to-red-400 py-10 rounded-lg shadow-lg">
        <h1 className="text-5xl font-extrabold text-white">
          🛒 Admin Orders Dashboard
        </h1>
        <p className="text-lg text-gray-100">
          Efficiently manage all customer orders with real-time updates.
        </p>
      </header>

      {/* Tabs for filtering orders */}
      <div className="flex justify-center mb-10">
        {["all", "pending", "completed"].map((tab) => (
          <motion.button
            key={tab}
            onClick={() => setActiveTab(tab)}
            whileHover={{ scale: 1.05 }}
            className={`px-8 py-3 mx-2 rounded-full shadow-lg ${
              activeTab === tab
                ? "bg-red-600 text-white"
                : "bg-gray-200 text-red-600"
            } hover:bg-red-500 transition duration-200`}
          >
            {tab === "all"
              ? "All Orders"
              : tab === "pending"
              ? "Pending Orders"
              : "Completed Orders"}
          </motion.button>
        ))}
      </div>

      {/* Card-Based Orders Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filterOrders().map((order) => (
          <motion.div
            key={order._id}
            whileHover={{ scale: 1.03 }}
            className="bg-white p-6 rounded-lg shadow-xl border border-red-100 hover:border-red-300 cursor-pointer"
            onClick={() => handleOrderClick(order)}
          >
            <h2 className="text-xl font-bold mb-2 text-red-600">
              Order ID: {order._id}
            </h2>
            <p className="text-gray-700 mb-2">User: {order.userEmail}</p>
            <p className="text-gray-700 mb-2">Items: {order.totalItems}</p>
            <p className="text-gray-700 mb-4">
              Total: {order.currency} {order.totalPrice}
            </p>
            <span
              className={`px-4 py-2 rounded-full text-sm font-bold ${
                order.status === "Pending"
                  ? "bg-yellow-200 text-yellow-800"
                  : "bg-green-200 text-green-800"
              }`}
            >
              {order.status}
            </span>
            <div className="mt-4">
              {order.status === "Pending" ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStatusChange(order._id, "Completed");
                  }}
                  className="w-full bg-green-600 text-white py-2 rounded-full shadow-md hover:bg-green-500 transition duration-150 flex items-center justify-center"
                >
                  <FaCheckCircle className="mr-2" /> Mark Completed
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStatusChange(order._id, "Pending");
                  }}
                  className="w-full bg-yellow-500 text-white py-2 rounded-full shadow-md hover:bg-yellow-400 transition duration-150 flex items-center justify-center"
                >
                  <FaRedo className="mr-2" /> Mark Pending
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-10 rounded-lg shadow-2xl w-2/3 max-w-3xl border-t-8 border-red-600"
          >
            <h2 className="text-3xl font-bold mb-6 text-red-600 text-center">
              Order Details
            </h2>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p>
                  <strong>Order ID:</strong> {selectedOrder._id}
                </p>
                <p>
                  <strong>User Email:</strong> {selectedOrder.userEmail}
                </p>
                <p>
                  <strong>Total Items:</strong> {selectedOrder.totalItems}
                </p>
                <p>
                  <strong>Total Price:</strong> {selectedOrder.currency}{" "}
                  {selectedOrder.totalPrice}
                </p>
                <p>
                  <strong>Shipping Fee:</strong> {selectedOrder.currency}{" "}
                  {selectedOrder.shippingFee}
                </p>
                <p>
                  <strong>Status:</strong> {selectedOrder.status}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Ordered Items</h3>
                <ul>
                  {selectedOrder.cartItems.map((item, index) => (
                    <li key={index} className="mb-3">
                      <p>
                        <strong>Product:</strong> {item.productName}
                      </p>
                      <p>
                        <strong>Quantity:</strong> {item.quantity}
                      </p>
                      <p>
                        <strong>Price:</strong> {selectedOrder.currency}{" "}
                        {item.price}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-8 w-full bg-red-600 text-white py-4 rounded-lg shadow-lg hover:bg-red-500 transition duration-150"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default AdminOrders;
