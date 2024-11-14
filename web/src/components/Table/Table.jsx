import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../reducers/Product/productSlice";
import DeleteProduct from "../DeleteProduct/DeleteProduct";
import CreateProducts from "../CreateProducts/CreateProducts";

export default function Table({ categoryFilter }) {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);
  const [openDelProduct, setOpenDelProduct] = useState(false);
  const [openEditProduct, setOpenEditProduct] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleOpenDeleteModal = (productId) => {
    setSelectedProductId(productId);
    setOpenDelProduct(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setOpenEditProduct(true);
  };

  // Dynamically filter products based on the main category and its subcategories
  const filteredProducts = products.filter((product) => {
    const isMainCategory = categoryFilter.includes(product.category?.name);
    const isInSubcategory = Array.isArray(product.subcategory)
      ? product.subcategory.some((sub) => categoryFilter.includes(sub.name))
      : categoryFilter.includes(product.subcategory?.name);
    return isMainCategory || isInSubcategory;
  });

  if (loading) {
    return <p className="text-center">Loading products...</p>;
  }

  if (error) {
    return (
      <p className="text-red-600 text-center">
        Error: {typeof error === "string" ? error : JSON.stringify(error)}
      </p>
    );
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
                className="hover:bg-gray-100 transition text-center duration-200 ease-in-out"
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
                        <span
                          key={sub._id}
                          className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded m-1 text-sm"
                        >
                          {sub.name}
                        </span>
                      ))
                    : product.subcategory?.name || "N/A"}
                </td>
                <td className="px-4 py-2 border-b">
                  <img
                    src={product.imageUrl || "/blank.png"}
                    alt="Product Icon"
                    className="w-10 h-10 object-cover mx-auto rounded-full border"
                  />
                </td>
                <td className="px-4 py-2 border-b flex justify-center space-x-2">
                  <button
                    className="bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600 transition"
                    onClick={() => handleEditProduct(product)}
                    title="Edit Product"
                  >
                    <CiEdit size={20} />
                  </button>
                  <button
                    className="bg-red-500 p-2 rounded-full text-white hover:bg-red-600 transition"
                    onClick={() => handleOpenDeleteModal(product._id)}
                    title="Delete Product"
                  >
                    <FaTrash size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Product Modal */}
      {openDelProduct && (
        <DeleteProduct
          setOpenDelProduct={setOpenDelProduct}
          productId={selectedProductId}
        />
      )}

      {/* Edit Product Modal */}
      {openEditProduct && (
        <CreateProducts
          setOpenAddProduct={setOpenEditProduct}
          product={selectedProduct}
        />
      )}
    </div>
  );
}
