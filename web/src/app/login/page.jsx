"use client";
import React from "react";
import logo from "../../assets/images/logo.png";

const Login = () => {
  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gray-100 pt-5">
      <button
        className="absolute top-4 right-4 text-gray-700 text-2xl focus:outline-none"
        onClick={() => console.log("Close button clicked")}
      >
        &times;
      </button>

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
              className="bg-red-600 text-white py-2 px-4 mt-4 rounded hover:bg-red-700"
            >
              SIGN IN
            </button>
          </form>
          <a href="#" className="mt-4 inline-block text-gray-600 underline">
            Forgot your password?
          </a>
        </div>

        <div className="flex-1 pl-5">
          <h2 className="text-xl font-semibold mb-4">New Customer?</h2>
          <p className="mb-4">
            At Chrom Tech, we know how frustrating it can be to spend so much of
            your time ordering supplies. That’s why we’ve created a convenient
            online ordering system where you can{" "}
            <strong>buy from more than 30 suppliers in one place</strong>.
          </p>
          <p className="mb-4">
            Create an account with us and you'll be able to:
          </p>
          <ul className="list-disc pl-5 mb-4">
            <li>Check out faster</li>
            <li>Save multiple shipping addresses</li>
            <li>Access your order history</li>
            <li>View accurate, account-level pricing at your convenience</li>
          </ul>
          <button className="bg-red-600 text-white py-2 px-6 mt-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400">
            CREATE ACCOUNT
          </button>
        </div>
      </div>

      <div className="mt-5 py-5 bg-gray-200 w-full text-left text-gray-700 px-4">
        <p>
          <strong>Please note:</strong> Due to the sensitive nature of selling
          analytical consumables, all accounts are vetted through our customer
          service team. International shipments: Due to fees associated with
          international shipments, we are not able to accept online orders for
          accounts based outside of the United States. We are also not
          authorized to sell the following for export: Agilent, Intact, Thermo,
          Restek, Pickering, Sigma/Supelco, Perkins Elmer and any hazardous
          items. We are also not able to ship to forwarder, distribution or
          residential addresses.
        </p>
      </div>
    </div>
  );
};

export default Login;
