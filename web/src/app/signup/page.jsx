"use client";
import React from "react";
import logo from "../../assets/images/logo.png";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 pt-5">
      <div className="w-full flex justify-center bg-gray-200 py-5">
        <img src={logo.src} alt="Chrom Tech Logo" className="h-10" />
      </div>

      <div className="flex bg-white rounded-lg shadow-lg max-w-4xl w-full mt-5 p-5">
        <div className="flex-1 pr-5 border-r border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Sign in</h2>
          <form className="flex flex-col">
            <label className="mb-2">
              Email address *
              <input
                type="email"
                className="w-full p-2 mt-1 border border-gray-300 rounded bg-gray-50"
                required
              />
            </label>
            <label className="mb-2">
              Password *
              <input
                type="password"
                className="w-full p-2 mt-1 border border-gray-300 rounded bg-gray-50"
                required
              />
            </label>
            <button
              type="submit"
              className="bg-red-600 text-white py-2 mt-4 rounded hover:bg-red-700"
            >
              SIGN IN
            </button>
          </form>
          <a href="#" className="mt-4 inline-block text-gray-600 underline">
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
