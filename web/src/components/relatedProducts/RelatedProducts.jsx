import React from "react";
import { useRouter } from "next/navigation";
import ProductCard from "../ProductCard/ProductCard";
import Pagination from "../Pagination/Pagination";

const RelatedProducts = ({ category, products }) => {
  const router = useRouter();

  if (!category) return <p>Loading...</p>;

  const { name: categoryName, subcategories = [] } = category;

  // Navigate to the subcategory page when clicked
  const handleSubcategoryClick = (subcategoryName) => {
    router.push(`/subcategory/${encodeURIComponent(subcategoryName)}`);
  };

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
              <select className="p-2 rounded-xl text-sm">
                <option>Sort By: Featured Items</option>
                <option>Sort By: Newest Items</option>
                <option>Sort By: A To Z</option>
                <option>Sort By: Z To A</option>
                <option>Sort By: Pricing: Ascending</option>
                <option>Sort By: Pricing: Descending</option>
              </select>
            </div>

            <div className="rounded-xl hidden md:block">
              <Pagination />
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 gap-y-6">
            {products.length > 0 ? (
              products.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))
            ) : (
              <p>No products found for {categoryName} category</p>
            )}
          </div>

          <div className="flex w-full sm:justify-end py-4">
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
