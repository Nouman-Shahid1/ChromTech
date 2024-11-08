"use client";
import React, { useState, useEffect } from "react";

import { FaTrash } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
export default function Table() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Replace with your API call
    fetch("YOUR_API_ENDPOINT")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);
  const [openAddProduct, setOpenAddProduct] = useState(false);
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b font-semibold">#</th>
              <th className="px-4 py-2 border-b font-semibold">Title</th>
              <th className="px-4 py-2 border-b font-semibold">Price</th>
              <th className="px-4 py-2 border-b font-semibold">Category</th>
              <th className="px-4 py-2 border-b font-semibold">Icon</th>
              <th className="px-4 py-2 border-b font-semibold text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id || index} className="text-gray-700">
                <td className="px-4 py-2 border-b text-center">{index + 1}</td>
                <td className="px-4 py-2 border-b">{product.title}</td>
                <td className="px-4 py-2 border-b">{product.price}</td>
                <td className="px-4 py-2 border-b">{product.category}</td>

                <td className="px-4 py-2 border-b text-center">
                  <img src={product.icon || "/blank.png"} alt="" width="30" />
                </td>
                <td className="px-4 py-2 border-b flex justify-center">
                  <button className="bg-blue-200 p-2 rounded-full mx-2">
                    <CiEdit size={20} color="blue" />
                  </button>
                  <button className="bg-red-200 p-2 rounded-full">
                    <FaTrash size={20} color="red" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
