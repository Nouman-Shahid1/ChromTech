"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../reducers/Auth/authSlice";
import { useRouter, useSearchParams } from "next/navigation";
import logo from "../../assets/images/logo.png";
import Link from "next/link";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { accessToken, loading, error, user } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  useEffect(() => {
    if (accessToken && user) {
      // If the user is a superadmin, redirect to the admin dashboard
      if (user.role === "superadmin") {
        router.push("/admin");
      } else {
        // Get the `redirect` query parameter or default to the home page
        const redirectPath = searchParams.get("redirect") || "/";
        router.push(redirectPath);
      }
    }
  }, [accessToken, user, router, searchParams]);

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gray-200 pt-5">
      <button
        className="absolute top-4 right-4 text-gray-700 text-2xl focus:outline-none"
        onClick={() => console.log("Close button clicked")}
      >
        &times;
      </button>

      <div className="w-full flex justify-center bg-gray-200 pt-32 py-16">
        <img src={logo.src} alt="Chrom Tech Logo" className="h-12" />
      </div>

      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg max-w-6xl w-full mt-5 p-5">
        <div className="flex-1 md:pr-5 md:border-r border-gray-200 mb-5 md:mb-0">
          <h2 className="text-3xl font-semibold mb-4 text-center">Sign in</h2>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <label className="mb-2">
              Email address *
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 mt-1 border border-gray-300 rounded bg-gray-50"
                required
              />
            </label>
            <label className="mb-2 relative">
              Password *
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 mt-1 border border-gray-300 rounded bg-gray-50"
                required
              />
              <span
                className="absolute top-10 right-3 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <AiFillEyeInvisible size={24} />
                ) : (
                  <AiFillEye size={24} />
                )}
              </span>
            </label>
            <button
              type="submit"
              className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
            >
              {loading ? "Signing in..." : "SIGN IN"}
            </button>
          </form>
          {error && (
            <div className="mt-4 text-red-600 text-center">
              {error.message || "Failed to sign in. Please try again."}
            </div>
          )}
        </div>

        <div className="flex-1 pl-5 max-w-md mx-auto">
          <h2 className="text-3xl font-semibold mb-4 text-center">
            New Customer?
          </h2>
          <p className="mb-4  md:text-left">
            At Chrom Tech, we know how frustrating it can be to spend so much of
            your time ordering supplies. That’s why we’ve created a convenient
            online ordering system where you can{" "}
            <strong>buy from more than 30 suppliers in one place</strong>.
          </p>
          <p className="mb-4 md:text-left">
            Create an account with us and you'll be able to:
          </p>
          <ul className="list-disc pl-5 mb-4">
            <li>Check out faster</li>
            <li>Save multiple shipping addresses</li>
            <li>Access your order history</li>
            <li>View accurate, account-level pricing at your convenience</li>
          </ul>
          <Link href="/register" passHref>
            <button className="bg-red-600 text-white py-2 px-6 w-full md:w-auto mt-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400">
              CREATE ACCOUNT
            </button>
          </Link>
        </div>
      </div>

      <div className="mt-5 py-5 bg-gray-200 w-full text-left text-black text-base px-4 mb-8">
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
