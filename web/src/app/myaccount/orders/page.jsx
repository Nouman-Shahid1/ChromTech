"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "@/reducers/Order/orderSlice";
import Profile from "@/components/Profile/Profile";

function UserOrders() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orders, status } = useSelector((state) => state.order);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (user && user.email) {
      dispatch(getUserOrders(user.email));
    }
  }, [dispatch, user]);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
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
    <div className="p-8 bg-gradient-to-b from-white to-red-50 min-h-screen">
      <Profile />
      <h1 className="text-5xl mt-10 font-bold text-red-600 mb-10 text-center">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="text-center text-gray-700">No orders found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-6 rounded-lg shadow-lg border border-red-200 hover:border-red-400 cursor-pointer"
              onClick={() => handleOrderClick(order)}
            >
              <h2 className="text-xl font-bold mb-2 text-red-600">
                {order.cartItems[0]?.productName || "Product Name"}
              </h2>
              <p className="text-gray-700">
                Status:{" "}
                <span
                  className={`font-semibold ${
                    order.status === "Pending"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  {order.status}
                </span>
              </p>
              <p className="text-gray-700">
                Total Price: {order.currency} {order.totalPrice}
              </p>
              <button className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg shadow hover:bg-red-500 transition duration-150">
                View Details
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="bg-white p-10 rounded-lg shadow-2xl w-2/3 max-w-3xl border-t-8 border-red-600">
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
          </div>
        </div>
      )}
    </div>
  );
}

export default UserOrders;
