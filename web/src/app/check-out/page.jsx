'use client'
import CartCard from '@/components/CartCard/CartCard';
import { useMyContext } from '@/ContextApi/store';
import Link from 'next/link';
import React from 'react'
import { countries } from 'countries-list'; 

const CheckoutPage = () => {
  const { cartItems, getTotalCount, totalPrice, currency, shipping_fee } = useMyContext();
  
  const countryList = Object.values(countries);  
  return (
    <>
     <div className="w-[100%] lg:w-[80%] mx-auto  h-[100%]">
  <div className="w-full flex flex-col  md:flex-row mx-auto h-full bg-white px-8 py-8 rounded-lg shadow-lg">
    <Link href="/">
      <p className="text-blue-500 cursor-pointer text-sm">Go back</p>
    </Link>

    {/* Left side */}
    <div className="w-full md:w-[50%]">
      <h1 className="text-3xl font-semibold text-gray-800 mb-2">Checkout</h1>

      {/* Contact Information */}
      <div>
        <p className="text-lg font-medium text-gray-700">Contact Information</p>
        <input
          type="email"
          placeholder="Email Address"
          className="border border-gray-300 mt-2 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />
        <div className="mt-2 flex items-center">
          <input type="checkbox" id="email-updates" className="mr-2" />
          <label htmlFor="email-updates" className="text-sm text-gray-600">Email me with news and offers</label>
        </div>
      </div>

      {/* Shipping Details */}
      <div className="mt-2">
        <h3 className="text-lg font-medium text-gray-700">Shipping Details</h3>
        <div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2">
          <input
            type="text"
            placeholder="First Name"
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <input
          type="text"
          placeholder="Address"
          className="border border-gray-300 mt-2 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />
        <input
          type="text"
          placeholder="Address (Line 2)"
          className="border border-gray-300 mt-2 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />
        <div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2">
          <select className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-black">
            <option>Select City</option>
            <option>USA</option>
            <option>Canada</option>
            <option>Mexico</option>
          </select>
          <select className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-black">
            <option>Region (Optional)</option>
            <option>California</option>
            <option>Texas</option>
            <option>New York</option>
          </select>
        </div>
        <div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2">
          <select className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-black">
            <option>Select Country</option>
            {countryList.map((country) => (
              <option key={country.alpha2} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
          <select className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-black">
            <option>Select Zip Code</option>
            <option>California</option>
            <option>Texas</option>
            <option>New York</option>
          </select>
        </div>

        <input
          type="number"
          placeholder="Phone Number"
          className="border border-gray-300 mt-2 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />
        <div className="mt-4 flex items-center">
          <input type="checkbox" id="save-info" className="mr-2" />
          <label htmlFor="save-info" className="text-sm text-gray-600">Save this information for next time</label>
        </div>
      </div>

      {/* Payment Section */}
      <div className="mt-2">
        <div className="border-t border-gray-300 pt-3">
          <p className="text-lg font-medium text-gray-700">Card Payment</p>
          <input
            type="text"
            placeholder="Card Number"
            className="border border-gray-300 mt-2 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          <div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2">
            <input
              type="text"
              placeholder="MM/YY Expiry"
              className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            <input
              type="text"
              placeholder="CVV"
              className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>
      </div>

      <div className="mt-2 text-center">
        <button className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition duration-200">
          Complete Order
        </button>
      </div>
    </div>

    {/* Right side */}
    <div className="w-full md:w-[50%] xl:p-8 ">
      <div className="ml-3">
        <p className="text-2xl">Order Summary</p>
      </div>
      <div className="max-h-[500px] border overflow-scroll">
        {cartItems.length ? cartItems.map((item) => <CartCard key={item._id} product={item} />) : ""}
      </div>
      <div className="px-2">
        <div className="flex justify-between pt-2">
          <p className="font-bold">Total Items</p>
          <p>{getTotalCount()}</p>
        </div>
        <div className="flex justify-between pt-2">
          <p className="font-bold">Total Charges</p>
          <p>{currency}{totalPrice}</p>
        </div>
        <div className="flex justify-between py-2">
          <p className="font-bold">Shipping</p>
          <p>{currency}{shipping_fee}</p>
        </div>
        <hr style={{ borderColor: "black" }} />
        <div className="flex justify-between pt-3">
          <p className="font-bold">Total</p>
          <p className="font-bold">{currency}{(shipping_fee + totalPrice).toFixed(2)}</p>
        </div>
      </div>
    </div>
  </div>
</div>

    </>
  )
}

export default CheckoutPage;
