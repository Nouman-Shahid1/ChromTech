"use client";

import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import Image from "next/image";

export default function Home() {
  const [isFilterPopupVisible, setIsFilterPopupVisible] = useState(false);
  const [activeItem, setActiveItem] = useState("my-orders");

  const toggleFilterPopup = () => {
    setIsFilterPopupVisible((prevState) => !prevState);
  };

  const handleMenuClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div className="flex h-screen relative">
      <div className="w-72 bg-gray-100 p-6">
        <div className="mb-5">
          <Image src={logo} alt="CHROM TECH Logo" width={220} height={90} />
        </div>
        <ul className="space-y-2">
          <li
            className={`p-3 ${
              activeItem === "my-orders"
                ? "bg-red-600 text-white"
                : "text-red-600 hover:bg-red-600 hover:text-white"
            } rounded cursor-pointer`}
            onClick={() => handleMenuClick("my-orders")}
          >
            My orders
          </li>
          <li
            className={`p-3 ${
              activeItem === "company-orders"
                ? "bg-red-600 text-white"
                : "text-red-600 hover:bg-red-600 hover:text-white"
            } rounded cursor-pointer`}
            onClick={() => handleMenuClick("company-orders")}
          >
            Company orders
          </li>
          <li
            className={`p-3 ${
              activeItem === "quick-order"
                ? "bg-red-600 text-white"
                : "text-red-600 hover:bg-red-600 hover:text-white"
            } rounded cursor-pointer`}
            onClick={() => handleMenuClick("quick-order")}
          >
            Quick order
          </li>
          <li
            className={`p-3 ${
              activeItem === "addresses"
                ? "bg-red-600 text-white"
                : "text-red-600 hover:bg-red-600 hover:text-white"
            } rounded cursor-pointer`}
            onClick={() => handleMenuClick("addresses")}
          >
            Addresses
          </li>
          <li
            className={`p-3 ${
              activeItem === "user-management"
                ? "bg-red-600 text-white"
                : "text-red-600 hover:bg-red-600 hover:text-white"
            } rounded cursor-pointer`}
            onClick={() => handleMenuClick("user-management")}
          >
            User management
          </li>
        </ul>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center bg-gray-100 p-4 border-b border-gray-300 relative">
          <h2 className="text-lg font-semibold">Purchased products</h2>

          <div className="flex items-center space-x-4">
            <span className="text-gray-700">user name</span>
            <button className="text-gray-700 font-semibold hover:text-gray-900 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600">
              HOME
            </button>
            <button className="text-gray-700 font-semibold hover:text-gray-900 px-4 py-2 rounded-md ml-6 focus:outline-none focus:ring-2 focus:ring-red-600">
              CART
            </button>
          </div>
          <br />
          <button
            className="absolute top-2 right-6 text-gray-600 hover:text-gray-900"
            onClick={() => console.log("Close button clicked")}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div className="flex  bg-gray-100 flex-1 p-4 gap-4">
          <div className="flex-1 bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-4">0 products</h3>

           
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center bg-gray-100 border rounded p-2 flex-1">
               
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-4.35-4.35M15 11a6 6 0 11-12 0 6 6 0 0112 0z"
                  />
                </svg>
               
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-gray-100 flex-1 focus:outline-none"
                />
              </div>

              <input
                type="text"
                placeholder="From"
                className="p-2 border rounded w-24 bg-gray-100"
              />
              <input
                type="text"
                placeholder="To"
                className="p-2 border rounded w-24 bg-gray-100"
              />
            </div>

            <div className="flex items-center justify-center h-full text-gray-500">
              <span>No products found</span>
            </div>
          </div>

        
          <div className="w-1/3 bg-white p-6 rounded shadow flex flex-col relative">
            <div className="flex-grow">
              <h3 className="text-xl font-semibold mb-4">Quick order pad</h3>
              <div className="mb-4">
                
                <p className="text-gray-500 mb-2">
                  Search by SKU or product name
                </p>
                 
               
                <input
                  type="text"
                  placeholder="Search products"
                  className="w-full p-2 border rounded"
                />
    
               
                <button className="w-full border border-red-600 text-red-600 mt-2 py-2 rounded">
                  SEARCH PRODUCT
                </button>
              </div>
              <h4 className="text-lg font-semibold mb-2">Quick add</h4>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="SKU#"
                    className="flex-1 p-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Qty"
                    className="w-20 p-2 border rounded"
                  />
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="SKU#"
                    className="flex-1 p-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Qty"
                    className="w-20 p-2 border rounded"
                  />
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="SKU#"
                    className="flex-1 p-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Qty"
                    className="w-20 p-2 border rounded"
                  />
                </div>
              </div>
              <button className="text-red-600 mt-2">Show more rows</button>
            </div>
          </div>
        </div>
      </div>

      
      <div className="fixed bottom-0 left-0 w-full border-t bg-white p-4">
        <div className="flex justify-center items-center space-x-8 text-lg">
          <span>0 products selected</span>
          <span className="font-semibold">Subtotal: $0.00</span>
          <button className="bg-red-600 text-white px-4 py-2 rounded">
            ADD SELECTED TO
          </button>
        </div>
      </div>
    </div>
  );
}
