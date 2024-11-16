"use client";
import CartCard from "@/components/CartCard/CartCard";
import { useMyContext } from "@/ContextApi/store";
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

  const { accessToken } = useSelector((state) => state.auth);
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
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  useEffect(() => {
    if (!accessToken) {
      const currentPath = encodeURIComponent(window.location.pathname);
      router.push(`/login?redirect=${currentPath}`);
    }
  }, [accessToken, router]);

  const handleInputChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleCardInputChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const handleOrderSubmit = () => {
    if (!accessToken) {
      alert("You need to log in before completing your order.");
      router.push("/login?redirect=/checkout");
      return;
    }

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

    if (
      paymentMethod === "creditCard" &&
      (!cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv)
    ) {
      setError("Please fill in all credit card details.");
      return;
    }

    const orderData = {
      userEmail: email,
      cartItems,
      totalItems: getTotalCount(),
      totalPrice,
      currency,
      shippingFee: shipping_fee,
      address,
      emailUpdates,
      saveInfo,
      paymentMethod,
      cardDetails: paymentMethod === "creditCard" ? cardDetails : null,
    };

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
    <div className="w-full lg:w-[80%] mx-auto h-full">
      <div className="flex flex-col md:flex-row mx-auto bg-white p-8 mt-8 rounded-lg shadow-xl">
        {/* Left side */}
        <div className="w-full md:w-[50%]">
          <h1 className="text-4xl font-bold text-red-500 mb-6">Checkout</h1>

          <div className="mb-6">
            <p className="text-lg font-semibold text-gray-700 mb-2">
              Contact Information
            </p>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-300"
            />
            <p className="text-sm text-gray-500 mt-1">
              Make sure you have entered an email at which you have an account.
            </p>
          </div>

          {/* Shipping Details */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Shipping Details
            </h3>
            {[
              "firstName",
              "lastName",
              "addressLine1",
              "addressLine2",
              "city",
              "state",
              "zipCode",
              "phoneNumber",
            ].map((field, index) => (
              <input
                key={index}
                type="text"
                name={field}
                placeholder={field.replace(/([A-Z])/g, " $1")}
                value={address[field]}
                onChange={handleInputChange}
                className="w-full mb-4 p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-300"
              />
            ))}
          </div>

          {/* Payment Method */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Payment Method
            </h3>
            <div className="flex gap-4">
              <button
                className={`w-1/2 py-3 rounded-lg shadow-md ${
                  paymentMethod === "creditCard"
                    ? "bg-red-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setPaymentMethod("creditCard")}
              >
                Credit Card
              </button>
              <button
                className={`w-1/2 py-3 rounded-lg shadow-md ${
                  paymentMethod === "cod"
                    ? "bg-red-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setPaymentMethod("cod")}
              >
                Cash on Delivery
              </button>
            </div>
          </div>

          {/* Credit Card Details */}
          {paymentMethod === "creditCard" && (
            <div className="mb-6">
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={cardDetails.cardNumber}
                onChange={handleCardInputChange}
                className="w-full mb-4 p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-300"
              />
              <input
                type="text"
                name="expiryDate"
                placeholder="Expiry Date (MM/YY)"
                value={cardDetails.expiryDate}
                onChange={handleCardInputChange}
                className="w-full mb-4 p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-300"
              />
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={cardDetails.cvv}
                onChange={handleCardInputChange}
                className="w-full mb-4 p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-300"
              />
            </div>
          )}

          <button
            className="w-full py-3 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-lg shadow-md hover:from-red-600 hover:to-red-800 transition duration-300"
            onClick={handleOrderSubmit}
          >
            Complete Order
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>

        {/* Right side: Order Summary */}
        <div className="w-full md:w-[50%] xl:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Order Summary
          </h2>
          <div className="max-h-[500px] bg-gray-50 p-4 rounded-lg shadow-inner overflow-y-auto">
            {cartItems.map((item) => (
              <CartCard key={item._id} product={item} />
            ))}
          </div>
          <div className="mt-4 text-lg">
            <div className="flex justify-between mb-2">
              <span>Total Items:</span>
              <span>{getTotalCount()}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Total Price:</span>
              <span>
                {currency}
                {totalPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping Fee:</span>
              <span>
                {currency}
                {shipping_fee.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between font-bold text-xl">
              <span>Grand Total:</span>
              <span>
                {currency}
                {(totalPrice + shipping_fee).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
