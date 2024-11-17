"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ProductCard from "../ProductCard/ProductCard";
import Pagination from "../Pagination/Pagination";

const RelatedProducts = ({ category, products }) => {
  const router = useRouter();
  const [sortOption, setSortOption] = useState("featured"); // Add this line to manage sorting state
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 9;

  if (!category) return <p>Loading...</p>;
  const sortedProducts = [...products].sort((a, b) => {
    // Apply sorting
    switch (sortOption) {
      case "newest":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "a-z":
        return a.name.localeCompare(b.name);
      case "z-a":
        return b.name.localeCompare(a.name);
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      default:
        return 0;
    }
  });
  const currentProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const { name: categoryName, subcategories = [] } = category;

  // Navigate to the subcategory page when clicked
  const handleSubcategoryClick = (subcategoryName) => {
    router.push(`/subcategory/${encodeURIComponent(subcategoryName)}`);
  };
  const handleProductClick = (productId) => {
    router.push(`/product/${productId}`);
  };

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const handleSortChange = (event) => setSortOption(event.target.value); // Add this handler

  return (
    <div className="bg-gray-100">
      <div className="flex flex-col md:flex-row w-[75%] m-auto py-8">
        {/* Subcategories Section */}
        <div className="min-w-[200px] sm:w-[300px] mx-auto my-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <p className="border-b border-gray-800 py-3">
              <strong>{categoryName} Subcategories</strong>
            </p>
            {subcategories.length > 0 ? (
              subcategories.map((subcategory, index) => (
                <p
                  key={index}
                  className="pt-1 hover:text-gray-300 cursor-pointer"
                  onClick={() => handleSubcategoryClick(subcategory.name)}
                >
                  {subcategory.name}
                </p>
              ))
            ) : (
              <p>No subcategories found</p>
            )}
          </div>
        </div>

        {/* Products Section */}
        <div className="flex-1 mx-auto md:m-8">
          <div className="flex justify-between">
            <div className="mx-auto md:mx-0">
              <select
                className="p-2 rounded-xl text-sm"
                value={sortOption}
                onChange={handleSortChange}
              >
                  <option value="featured">Sort By: Featured Items</option> {" "}
                <option value="newest">Sort By: Newest Items</option> {" "}
                <option value="a-z">Sort By: A To Z</option> {" "}
                <option value="z-a">Sort By: Z To A</option> {" "}
                <option value="price-asc">Sort By: Pricing: Ascending</option> {" "}
                <option value="price-desc">Sort By: Pricing: Descending</option>
              </select>
            </div>

            <div className="rounded-xl hidden md:block">
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 gap-y-6">
            {currentProducts.length > 0 ? (
              currentProducts.map((product, index) => (
                <div
                  key={index}
                  onClick={() => handleProductClick(product._id)}
                  className="cursor-pointer"
                >
                        <ProductCard key={index} product={product} />   {" "}
                </div>
              ))
            ) : (
              <p>No products found for {categoryName} category</p>
            )}
          </div>

          <div className="flex w-full sm:justify-end py-4">
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
