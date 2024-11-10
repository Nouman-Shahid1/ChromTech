import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../reducers/Product/productSlice";
import DeleteProduct from "../DeleteProduct/DeleteProduct";

export default function Table() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);
  const [openDelProduct, setOpenDelProduct] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleOpenDeleteModal = (productId) => {
    setSelectedProductId(productId);
    setOpenDelProduct(true);
  };

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
        <table className="min-w-full bg-white text-center">
          <thead className="bg-gray-100">
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
            {products.map((product, index) => (
              <tr key={product._id || index} className="text-gray-700">
                <td className="px-4 py-2 border-b">{index + 1}</td>
                <td className="px-4 py-2 border-b">{product.name}</td>
                <td className="px-4 py-2 border-b">{product.price}</td>
                <td className="px-4 py-2 border-b">
                  {product.category?.name || "N/A"}
                </td>
                <td className="px-4 py-2 border-b">
                  {Array.isArray(product.subcategory)
                    ? product.subcategory.map((sub) => (
                        <span
                          key={sub._id}
                          className="inline-block px-2 py-1 bg-gray-200 rounded m-1"
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
                    width="30"
                    className="mx-auto"
                  />
                </td>
                <td className="px-4 py-2 border-b flex justify-center space-x-2">
                  <button className="bg-blue-200 p-2 rounded-full">
                    <CiEdit size={20} color="blue" />
                  </button>
                  <button
                    className="bg-red-200 p-2 rounded-full"
                    onClick={() => handleOpenDeleteModal(product._id)}
                  >
                    <FaTrash size={20} color="red" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {openDelProduct && (
        <DeleteProduct
          setOpenDelProduct={setOpenDelProduct}
          productId={selectedProductId}
        />
      )}
    </div>
  );
}
