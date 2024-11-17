import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../reducers/Product/productSlice";
import DeleteProduct from "../DeleteProduct/DeleteProduct";
import CreateProducts from "../CreateProducts/CreateProducts";

export default function Table({ categoryFilter, searchQuery }) {
  const dispatch = useDispatch();
  const { products, searchResults, loading, error } = useSelector(
    (state) => state.product
  );
  const [openDelProduct, setOpenDelProduct] = useState(false);
  const [openEditProduct, setOpenEditProduct] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // Fetch products if there's no search query
    if (!searchQuery) {
      dispatch(getProducts());
    }
  }, [dispatch, searchQuery]);

  const handleOpenDeleteModal = (productId) => {
    setSelectedProductId(productId);
    setOpenDelProduct(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setOpenEditProduct(true);
  };
  // Determine products to display: use `searchResults` if searchQuery exists
  // Determine products to display: use `searchResults` if searchQuery exists
  const productsToDisplay = searchQuery
    ? searchResults.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  // Log products to display for debugging
  console.log("Search Query:", searchQuery);
  console.log("Filtered Products to Display:", productsToDisplay);

  // Log products to display for debugging
  console.log("Products to Display:", productsToDisplay);

  // Skip category filter if searchQuery is present
  const filteredProducts = searchQuery
    ? productsToDisplay
    : productsToDisplay.filter((product) => {
        const isMainCategory = categoryFilter.includes(product.category?.name);
        const isInSubcategory = Array.isArray(product.subcategory)
          ? product.subcategory.some((sub) => categoryFilter.includes(sub.name))
          : categoryFilter.includes(product.subcategory?.name);
        return isMainCategory || isInSubcategory;
      });
  console.log("Search Query:", searchQuery);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div
          aria-label="Loading..."
          role="status"
          className="flex items-center space-x-2"
        >
          <svg
            className="h-20 w-20 animate-spin stroke-gray-500"
            viewBox="0 0 256 256"
          >
            <line
              x1="128"
              y1="32"
              x2="128"
              y2="64"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
            <line
              x1="195.9"
              y1="60.1"
              x2="173.3"
              y2="82.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
            <line
              x1="224"
              y1="128"
              x2="192"
              y2="128"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
            <line
              x1="195.9"
              y1="195.9"
              x2="173.3"
              y2="173.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
            <line
              x1="128"
              y1="224"
              x2="128"
              y2="192"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
            <line
              x1="60.1"
              y1="195.9"
              x2="82.7"
              y2="173.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
            <line
              x1="32"
              y1="128"
              x2="64"
              y2="128"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
            <line
              x1="60.1"
              y1="60.1"
              x2="82.7"
              y2="82.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
          </svg>
          <span className="text-4xl font-medium text-gray-500">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-red-600 text-center">
        Error: {typeof error === "string" ? error : JSON.stringify(error)}
      </p>
    );
  }

  // Show "No results" message if there are no filtered products
  if (filteredProducts.length === 0) {
    return <p className="text-center text-gray-600">No products found.</p>;
  }

  return (
    <div className="flex justify-center items-center py-6">
      <div className="overflow-x-auto w-full">
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border-b font-semibold">#</th>
              <th className="px-4 py-2 border-b font-semibold">Title</th>
              <th className="px-4 py-2 border-b font-semibold">Price</th>
              <th className="px-4 py-2 border-b font-semibold">Category</th>
              <th className="px-4 py-2 border-b font-semibold">Subcategory</th>
              <th className="px-4 py-2 border-b font-semibold">Icon</th>
              <th className="px-4 py-2 border-b font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, index) => (
              <tr
                key={product._id || index}
                className="hover:bg-gray-100 transition text-center"
              >
                <td className="px-4 py-2 border-b">{index + 1}</td>
                <td className="px-4 py-2 border-b">{product.name}</td>
                <td className="px-4 py-2 border-b">
                  ${product.price.toFixed(2)}
                </td>
                <td className="px-4 py-2 border-b">
                  {product.category?.name || "N/A"}
                </td>
                <td className="px-4 py-2 border-b">
                  {Array.isArray(product.subcategory)
                    ? product.subcategory.map((sub) => (
                        <span key={sub._id}>{sub.name}</span>
                      ))
                    : product.subcategory?.name || "N/A"}
                </td>
                <td className="px-4 py-2 border-b">
                  <img
                    src={product.imageUrl || "/blank.png"}
                    alt="Product"
                    className="w-10 h-10"
                  />
                </td>
                <td className="px-4 py-2 border-b ">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <CiEdit className="inline-block mr-1" />
                  </button>
                  <button
                    onClick={() => handleOpenDeleteModal(product._id)}
                    className="text-red-500 ml-3 hover:text-red-700"
                  >
                    <FaTrash className="inline-block mr-1" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Edit Product Modal */}
      {openEditProduct && (
        <CreateProducts
          product={selectedProduct}
          onClose={() => setOpenEditProduct(false)}
        />
      )}

      {openDelProduct && (
        <DeleteProduct
          productId={selectedProductId}
          onClose={() => setOpenDelProduct(false)}
        />
      )}
    </div>
  );
}
