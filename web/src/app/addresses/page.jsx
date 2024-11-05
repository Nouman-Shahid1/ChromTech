"use client";

import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import Image from 'next/image';

export default function Home() {
  const [isFilterPopupVisible, setIsFilterPopupVisible] = useState(false);
  const [activeItem, setActiveItem] = useState("my-orders"); 

  const toggleFilterPopup = () => {
    setIsFilterPopupVisible(prevState => !prevState); 
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
            className={`p-3 ${activeItem === "my-orders" ? "bg-red-600 text-white" : "text-red-600 hover:bg-red-600 hover:text-white"} rounded cursor-pointer`}
            onClick={() => handleMenuClick("my-orders")}
          >
            My orders
          </li>
          <li 
            className={`p-3 ${activeItem === "company-orders" ? "bg-red-600 text-white" : "text-red-600 hover:bg-red-600 hover:text-white"} rounded cursor-pointer`}
            onClick={() => handleMenuClick("company-orders")}
          >
            Company orders
          </li>
          <li 
            className={`p-3 ${activeItem === "quick-order" ? "bg-red-600 text-white" : "text-red-600 hover:bg-red-600 hover:text-white"} rounded cursor-pointer`}
            onClick={() => handleMenuClick("quick-order")}
          >
            Quick order
          </li>
          <li 
            className={`p-3 ${activeItem === "addresses" ? "bg-red-600 text-white" : "text-red-600 hover:bg-red-600 hover:text-white"} rounded cursor-pointer`}
            onClick={() => handleMenuClick("addresses")}
          >
            Addresses
          </li>
          <li 
            className={`p-3 ${activeItem === "user-management" ? "bg-red-600 text-white" : "text-red-600 hover:bg-red-600 hover:text-white"} rounded cursor-pointer`}
            onClick={() => handleMenuClick("user-management")}
          >
            User management
          </li>
        </ul>
      </div>

     
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center bg-gray-100 p-4 border-b border-gray-300 relative">
          <h2 className="text-lg font-semibold">Addresses</h2>

          
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <button className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300" onClick={toggleFilterPopup}>
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m2.95-6.65a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </div>

          
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">user name</span>
            <button className="text-gray-700 hover:text-gray-900 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600">
              HOME
            </button>
            <button className="text-gray-700 hover:text-gray-900 px-4 py-2 rounded-md ml-6 focus:outline-none focus:ring-2 focus:ring-red-600">
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

       
        <div className="flex-1 flex justify-center items-center text-gray-500 text-lg">
          No data
        </div>
      </div>

      
      {isFilterPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-80 relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
              onClick={toggleFilterPopup}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>

            <h3 className="text-xl font-semibold mb-4">Filters</h3>

            <div className="space-y-4">
              
        <select className="w-full border border-gray-300 rounded-lg p-2">
          <option>City</option>
          
        </select>
        
        
        <select className="w-full border border-gray-300 rounded-lg p-2">
          <option>State</option>
          
        </select>
        
        
        <select className="w-full border border-gray-300 rounded-lg p-2">
          <option>Country</option>
          
        </select>

              <button className="text-red-600 text-sm">CLEAR FILTERS</button>
            </div>

            <div className="flex justify-end space-x-4 mt-4">
              <button className="text-red-600" onClick={toggleFilterPopup}>CANCEL</button>
              <button className="text-red-600 font-semibold">APPLY</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
