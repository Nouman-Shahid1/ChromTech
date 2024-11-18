"use client";
import React, { useState } from "react";

const items = Array.from({ length: 53 }, (_, i) => `Product ${i + 1}`); // Static list of 53 items

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <ul className="inline-flex flex-wrap rounded-xl">
      {/* Previous Button */}
      <li>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className={`flex items-center justify-center border px-3 h-8 text-black rounded-lg border-black hover:cursor-pointer ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={currentPage === 1}
        >
          Previous
        </button>
      </li>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <li key={page}>
            <button
              onClick={() => onPageChange(page)}
              className={`flex items-center justify-center px-3 h-8 border text-gray-600 rounded-lg mx-1 border-gray-300 hover:cursor-pointer ${
                currentPage === page
                  ? "text-xl text-gray-800 border-gray-800"
                  : ""
              }`}
            >
              {page}
            </button>
          </li>
        )
      )}

      {/* Next Button */}
      <li>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className={`flex items-center justify-center px-3 h-8 text-black border border-black rounded-lg hover:cursor-pointer ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
