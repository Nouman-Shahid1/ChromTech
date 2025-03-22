"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { registerUser } from "../../reducers/Auth/authSlice";
import logo from "../../assets/images/logo.png";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Register = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading } = useSelector((state) => state.auth);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);

  const [accountType, setAccountType] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    companyName: "",
    companyEmail: "",
    companyNumber: "",
    country: "",
    address1: "",
    city: "",
    password: "",
  });

  const handleClose = () => {
    console.log("Close button clicked");
  };

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      registerUser({
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        accountType,
        companyName: formData.companyName,
        companyEmail: formData.companyEmail,
        companyNumber: formData.companyNumber,
        country: formData.country,
        address1: formData.address1,
        city: formData.city,
        password: formData.password,
      })
    )
      .unwrap()
      .then(() => {
        setIsSubmitted(true);
      })
      .catch((err) => {
        console.error("Registration error:", err);
        setError(
          err.response?.data?.message ||
            "An unknown error occurred during registration."
        );
      });
  };
  const handleFinish = () => {
    router.push("/login");
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center min-h-screen bg-gray-200 pt-5 px-4 sm:px-8">
        <button
          className="absolute top-4 right-4 text-gray-700 text-2xl focus:outline-none"
          onClick={() => console.log("Close button clicked")}
        >
          &times;
        </button>
        <div className="flex items-center justify-center py-8">
          <img src={logo.src} alt="Logo" className="h-10 sm:h-12 mr-2" />
        </div>
        <div className="bg-white w-full max-w-lg p-6 sm:p-8 md:p-10 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">
            Application submitted
          </h2>
          <p className="text-gray-700 text-lg mb-6">
            Thank you for creating your account at Chrom Tech, Inc. Your company
            account application has been approved.
          </p>
          <button
            onClick={handleFinish}
            className="bg-red-600 text-white py-2 px-6 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Finish
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gray-200 pt-5 px-4 sm:px-8">
      <button
        className="absolute top-4 right-4 text-gray-700 text-2xl focus:outline-none"
        onClick={handleClose}
      >
        &times;
      </button>

      <div className="flex items-center justify-center py-8">
        <img src={logo.src} alt="Logo" className="h-10 sm:h-12 mr-2" />
      </div>

      <div className="bg-white w-full max-w-lg p-6 sm:p-8 md:p-10 rounded-lg shadow-lg mb-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {typeof error === "string"
              ? error
              : error.message || "An error occurred."}
          </div>
        )}

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

        {/* Step Components */}
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
                name="firstName"
                placeholder="First Name *"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 mb-4"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name *"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 mb-4"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address *"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 mb-4"
              />
              <span className="text-gray-500 text-xs sm:text-sm mt-1 block">
                This email will be used to sign in to your account
              </span>
              <input
                type="number"
                name="phoneNumber"
                placeholder="Phone Number *"
                onChange={handleChange}
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

        {/* Step 2 */}
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
              name="companyName"
              placeholder="Company Name *"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 mb-4"
            />
            <input
              type="email"
              name="companyEmail"
              placeholder="Company Email *"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 mb-4"
            />
            <input
              type="number"
              name="companyNumber"
              placeholder="Company Number *"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 mb-4"
            />
            <input
              type="text"
              name="country"
              placeholder="Country *"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 mb-4"
            />
            <input
              type="text"
              name="address1"
              placeholder="Address 1 *"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 mb-4"
            />
            <input
              type="text"
              name="city"
              placeholder="City *"
              onChange={handleChange}
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

        {/* Step 3 */}
        {step === 3 && (
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-4">
              Finish Registration
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mb-6">
              Create a password for {formData.email}
            </p>

            <div className="mb-6 relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password *"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 mb-4"
              />
              <span
                className="absolute top-4 right-3 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <AiFillEyeInvisible size={24} />
                ) : (
                  <AiFillEye size={24} />
                )}
              </span>
              <span className="text-gray-500 text-xs sm:text-sm mt-1 block">
                By clicking Continue, you agree to our Terms of Service and
                Privacy Policy
              </span>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={handleBack}
                className="bg-gray-300 text-gray-700 py-2 px-6 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                BACK
              </button>
              <button
                onClick={handleSubmit}
                className="bg-red-600 text-white py-2 px-6 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                SUBMIT
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
