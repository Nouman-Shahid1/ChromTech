"use client";
import CartCard from "@/components/CartCard/CartCard";
import { useMyContext } from "@/ContextApi/store";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { countries } from "countries-list";
import { useDispatch, useSelector } from "react-redux";
import { saveOrder } from "@/reducers/Order/orderSlice";
import { useRouter } from "next/navigation";

const CheckoutPage = () => {
  const {
    cartItems,
    getTotalCount,
    totalPrice,
    currency,
    shipping_fee,
    clearCart,
  } = useMyContext();
  const dispatch = useDispatch();
  const router = useRouter();
  const countryList = Object.values(countries);

  // Get authentication state from authSlice
  const { accessToken } = useSelector((state) => state.auth);

  // State for form inputs
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    phoneNumber: "",
  });
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [saveInfo, setSaveInfo] = useState(false);
  const [error, setError] = useState("");

  // Check for user authentication on page load
  // Check for user authentication on page load
  useEffect(() => {
    if (!accessToken) {
      const currentPath = encodeURIComponent(window.location.pathname);
      router.push(`/login?redirect=${currentPath}`);
    }
  }, [accessToken, router]);

  // Handle input changes
  const handleInputChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  // Handle order submission
  const handleOrderSubmit = () => {
    // Check if user is authenticated
    if (!accessToken) {
      alert("You need to log in before completing your order.");
      router.push("/login?redirect=/checkout");
      return;
    }

    // Validate required fields
    if (
      !email ||
      !address.firstName ||
      !address.lastName ||
      !address.addressLine1 ||
      !address.city ||
      !address.state ||
      !address.country ||
      !address.zipCode ||
      !address.phoneNumber
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    const orderData = {
      userEmail: email,
      cartItems: cartItems.map((item) => ({
        productId: item._id,
        productName: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      totalItems: getTotalCount(),
      totalPrice,
      currency,
      shippingFee: shipping_fee,
      address,
      emailUpdates,
      saveInfo,
    };

    // Dispatch the saveOrder action
    dispatch(saveOrder(orderData))
      .then(() => {
        clearCart();
        router.push("/");
        alert("Order submitted successfully!");
      })
      .catch((error) => {
        setError("Failed to submit order. Please try again.");
        console.error(error);
      });
  };

  return (
    <div className="w-[100%] lg:w-[80%] mx-auto h-[100%]">
      <div className="w-full flex flex-col md:flex-row mx-auto h-full bg-white px-8 py-8 mt-8 rounded-lg shadow-lg">
        {/* Left side */}
        <div className="w-full md:w-[50%]">
          <h1 className="text-3xl font-semibold text-gray-800 mb-2">
            Checkout
          </h1>

          {/* Contact Information */}
          <div className="mt-4">
            <p className="text-lg font-medium text-gray-700">
              Contact Information
            </p>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 mt-2 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            <div className="mt-2 flex items-center">
              <input
                type="checkbox"
                id="email-updates"
                checked={emailUpdates}
                onChange={() => setEmailUpdates(!emailUpdates)}
                className="mr-2"
              />
              <label htmlFor="email-updates" className="text-sm text-gray-600">
                Please make sure this email is same as per your account
              </label>
            </div>
          </div>

          {/* Shipping Details */}
          <div className="mt-4">
            <h3 className="text-lg font-medium text-gray-700">
              Shipping Details
            </h3>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={address.firstName}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-black"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={address.lastName}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 mt-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-black"
            />
            <input
              type="text"
              name="addressLine1"
              placeholder="Address"
              value={address.addressLine1}
              onChange={handleInputChange}
              className="border border-gray-300 mt-2 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            <input
              type="text"
              name="addressLine2"
              placeholder="Address (Line 2)"
              value={address.addressLine2}
              onChange={handleInputChange}
              className="border border-gray-300 mt-2 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            <div className="flex gap-5">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={address.city}
                onChange={handleInputChange}
                className="border border-gray-300 mt-2 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={address.state}
                onChange={handleInputChange}
                className="border border-gray-300 mt-2 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div className="flex gap-5">
              <select
                name="country"
                value={address.country}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 mt-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option>Select Country</option>
                {countryList.map((country) => (
                  <option key={country.alpha2} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>

              <input
                type="text"
                name="zipCode"
                placeholder="Zip Code"
                value={address.zipCode}
                onChange={handleInputChange}
                className="border border-gray-300 mt-2 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <input
              type="number"
              name="phoneNumber"
              placeholder="Phone Number"
              value={address.phoneNumber}
              onChange={handleInputChange}
              className="border border-gray-300 mt-2 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            <div className="mt-4 flex items-center">
              <input
                type="checkbox"
                id="save-info"
                checked={saveInfo}
                onChange={() => setSaveInfo(!saveInfo)}
                className="mr-2"
              />
              <label htmlFor="save-info" className="text-sm text-gray-600">
                Save this information for next time
              </label>
            </div>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 mt-2">{error}</p>}

          {/* Complete Order Button */}
          <div className="mt-4 text-center">
            <button
              className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition duration-200"
              onClick={handleOrderSubmit}
            >
              Complete Order
            </button>
          </div>
        </div>

        {/* Right side: Order Summary */}
        <div className="w-full md:w-[50%] xl:p-8">
          <h2 className="text-2xl ml-3">Order Summary</h2>
          <div className="max-h-[500px] border overflow-scroll">
            {cartItems.map((item) => (
              <CartCard key={item._id} product={item} />
            ))}
          </div>
          <div className="px-2">
            <div className="flex justify-between">
              <p className="font-bold">Total Items:</p>
              <p className="font-bold"> {getTotalCount()}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-bold">Total Price:</p>
              <p className="font-bold">
                {" "}
                {currency}
                {totalPrice}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="font-bold">Shipping:</p>
              <p className="font-bold">
                {" "}
                {currency}
                {shipping_fee}
              </p>
            </div>
            <hr
              style={{
                height: "1px",
                margin: "10px 0px",
                backgroundColor: "black",
                border: "none",
              }}
            />
            <div className="flex justify-between">
              <p className="font-bold">Grand Total:</p>
              <p className="font-bold">
                {" "}
                {currency}
                {(shipping_fee + totalPrice).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
