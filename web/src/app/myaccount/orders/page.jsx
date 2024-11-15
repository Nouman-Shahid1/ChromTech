"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders, deleteOrder } from "@/reducers/Order/orderSlice";
import Profile from "@/components/Profile/Profile";

function Orders() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const {
    orders = [],
    status,
    error,
  } = useSelector((state) => state.order || {});

  useEffect(() => {
    if (user && user.email) {
      dispatch(getUserOrders(user.email));
    }
  }, [dispatch, user]);

  const handleDelete = (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      dispatch(deleteOrder(orderId));
    }
  };

  if (status === "loading") {
    return <div>Loading orders...</div>;
  }

  if (status === "failed") {
    console.error("Error object:", error);
    return <div>Error: {error?.message || "An unknown error occurred"}</div>;
  }

  if (!orders || orders.length === 0) {
    return <div>You have no orders yet.</div>;
  }

  return (
    <div className="p-6">
      <Profile />
      <h1 className="text-4xl font-semibold mb-6 py-4">My Orders</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-white p-4 rounded-lg shadow-md">
            <img
              src={order.cartItems[0]?.image || "/default-image.png"}
              alt={order.cartItems[0]?.productName || "Product Image"}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-bold">
              {order.cartItems[0]?.productName}
            </h2>
            <p className="text-gray-600">Price: ${order.cartItems[0]?.price}</p>
            <button
              onClick={() => handleDelete(order._id)}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200"
            >
              Delete Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
