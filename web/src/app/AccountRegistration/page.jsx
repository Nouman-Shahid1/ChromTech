"use client"; 

import React from 'react';
import logo from "../../assets/images/logo.png";

const AccountRegistrationForm = () => {
  const handleClose = () => {
   
    console.log("Close button clicked");
  };

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gray-100 pt-5">
    
      <button
        className="absolute top-4 right-4 text-gray-700 text-2xl focus:outline-none"
        onClick={handleClose}
      >
        &times;
      </button>
      
      
      <div className="flex items-center justify-center mb-8">
        <img src={logo.src} alt="Logo" className="h-12 mr-2" />
      </div>

     
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
        
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center">1</div>
            <span className="ml-2 font-semibold">Account</span>
          </div>
          <div className="flex-grow border-t border-gray-300 mx-2"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-500 flex items-center justify-center">2</div>
            <span className="ml-2 text-gray-500">Details</span>
          </div>
          <div className="flex-grow border-t border-gray-300 mx-2"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-500 flex items-center justify-center">3</div>
            <span className="ml-2 text-gray-500">Finish</span>
          </div>
        </div>

        
        <h2 className="text-xl font-semibold mb-4">Account registration</h2>
        
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Account type</label>
          <div className="flex items-center">
            <input type="radio" name="accountType" className="mr-2 text-red-600" />
            <label className="text-gray-800">Business account</label>
          </div>
        </div>

        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
          <div className="mb-4">
            <input
              type="text"
              placeholder="First Name *"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Last Name *"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email Address *"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <span className="text-gray-500 text-sm mt-1 block">
              This email will be used to sign in to your account
            </span>
          </div>
          <div className="mb-4">
            <input
              type="number"
              placeholder="Phone Number *"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
          <div className="flex justify-end">
            <button className="bg-red-600 text-white py-2 px-6 mt-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400">
              CONTINUE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountRegistrationForm;

