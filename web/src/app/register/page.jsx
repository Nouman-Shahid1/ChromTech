"use client";

import React, { useState } from "react";
import logo from "../../assets/images/logo.png";

const Register = () => {
  const [step, setStep] = useState(1); // Track the current step
  const [accountType, setAccountType] = useState(""); // Manage account type state

  const handleClose = () => {
    console.log("Close button clicked");
  };

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1); // Move to the next step
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1); // Move to the previous step
  };

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gray-100 pt-5 px-4 sm:px-8">
      <button
        className="absolute top-4 right-4 text-gray-700 text-2xl focus:outline-none"
        onClick={handleClose}
      >
        &times;
      </button>

      <div className="flex items-center justify-center mb-8">
        <img src={logo.src} alt="Logo" className="h-10 sm:h-12 mr-2" />
      </div>

      <div className="bg-white w-full max-w-lg p-6 sm:p-8 md:p-10 rounded-lg shadow-lg">
        {/* Step Indicator */}
        <div className="flex justify-between items-center mb-6 space-x-2 sm:space-x-4">
          <div className="flex items-center">
            <div
              className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full ${
                step >= 1
                  ? "bg-red-600 text-white"
                  : "bg-gray-300 text-gray-500"
              } flex items-center justify-center text-xs sm:text-sm`}
            >
              1
            </div>
            <span
              className={`ml-1 sm:ml-2 font-semibold ${
                step >= 1 ? "text-red-600" : "text-gray-500"
              } text-xs sm:text-base`}
            >
              Account
            </span>
          </div>
          <div className="flex-grow border-t border-gray-300 mx-1 sm:mx-2"></div>
          <div className="flex items-center">
            <div
              className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full ${
                step >= 2
                  ? "bg-red-600 text-white"
                  : "bg-gray-300 text-gray-500"
              } flex items-center justify-center text-xs sm:text-sm`}
            >
              2
            </div>
            <span
              className={`ml-1 sm:ml-2 ${
                step >= 2 ? "text-red-600" : "text-gray-500"
              } text-xs sm:text-base`}
            >
              Details
            </span>
          </div>
          <div className="flex-grow border-t border-gray-300 mx-1 sm:mx-2"></div>
          <div className="flex items-center">
            <div
              className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full ${
                step === 3
                  ? "bg-red-600 text-white"
                  : "bg-gray-300 text-gray-500"
              } flex items-center justify-center text-xs sm:text-sm`}
            >
              3
            </div>
            <span
              className={`ml-1 sm:ml-2 ${
                step === 3 ? "text-red-600" : "text-gray-500"
              } text-xs sm:text-base`}
            >
              Finish
            </span>
          </div>
        </div>

        {/* Step 1: Account Registration */}
        {step === 1 && (
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-4">
              Account Registration
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Account Type
              </label>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="accountType"
                  value="business"
                  checked={accountType === "business"}
                  onChange={() => setAccountType("business")}
                  className="mr-2 text-red-600"
                />
                <label className="text-gray-800 text-sm sm:text-base">
                  Business Account
                </label>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                Contact Information
              </h3>
              <input
                type="text"
                placeholder="First Name *"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 mb-4"
              />
              <input
                type="text"
                placeholder="Last Name *"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 mb-4"
              />
              <input
                type="email"
                placeholder="Email Address *"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 mb-4"
              />
              <span className="text-gray-500 text-xs sm:text-sm mt-1 block">
                This email will be used to sign in to your account
              </span>
              <input
                type="number"
                placeholder="Phone Number *"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 mt-4"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  className="bg-red-600 text-white py-2 px-6 mt-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  CONTINUE
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Business Details */}
        {step === 2 && (
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-4">
              Business Details
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mb-4">
              Please fill in additional details to complete your registration.
            </p>
            <input
              type="text"
              placeholder="Company Name *"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 mb-4"
            />
            <input
              type="email"
              placeholder="Company Email *"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 mb-4"
            />
            <input
              type="number"
              placeholder="Company Number *"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 mb-4"
            />
            <input
              type="text"
              placeholder="Country *"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 mb-4"
            />
            <input
              type="text"
              placeholder="Address 1 *"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 mb-4"
            />
            <input
              type="text"
              placeholder="City *"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 mb-4"
            />

            <div className="flex justify-between mt-6">
              <button
                onClick={handleBack}
                className="bg-gray-300 text-gray-700 py-2 px-6 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                BACK
              </button>
              <button
                onClick={handleNext}
                className="bg-red-600 text-white py-2 px-6 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                CONTINUE
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Finish */}
        {step === 3 && (
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-4">
              Finish Registration
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mb-6">
              Thank you for completing your registration!
            </p>
            <div className="flex justify-between">
              <button
                onClick={handleBack}
                className="bg-gray-300 text-gray-700 py-2 px-6 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                BACK
              </button>
              <button
                onClick={handleClose}
                className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                DONE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
