"use client";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../reducers/Category/categorySlice";
import DeleteCategory from "../DeleteCategory/DeleteCategory";

export default function Table() {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const openDeleteModal = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedCategoryId(null);
  };

  if (loading) {
    return <p className="text-center">Loading categories...</p>;
  }

  if (error) {
    return (
      <p className="text-red-600 text-center">Error: {JSON.stringify(error)}</p>
    );
  }

  return (
    <>
      <div className="flex justify-center items-center py-6">
        <div className="overflow-x-auto w-full">
          <table className="min-w-full bg-white text-center">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b font-semibold">#</th>
                <th className="px-4 py-2 border-b font-semibold">
                  Category Name
                </th>
                <th className="px-4 py-2 border-b font-semibold">
                  Subcategories
                </th>
                <th className="px-4 py-2 border-b font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={category._id || index} className="text-gray-700">
                  <td className="px-4 py-2 border-b">{index + 1}</td>
                  <td className="px-4 py-2 border-b">{category.name}</td>
                  <td className="px-4 py-2 border-b">
                    {category.subcategories &&
                    category.subcategories.length > 0 ? (
                      <div className="flex flex-wrap gap-2 justify-center">
                        {category.subcategories.map((sub) => (
                          <span
                            key={sub._id}
                            className="inline-block px-2 py-1 bg-gray-200 rounded m-1"
                          >
                            {sub.name || "Unnamed Subcategory"}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-500">No Subcategories</span>
                    )}
                  </td>
                  <td className="px-4 py-2 border-b flex justify-center space-x-2">
                    <button className="bg-blue-200 p-2 rounded-full">
                      <CiEdit size={20} color="blue" />
                    </button>
                    <button
                      className="bg-red-200 p-2 rounded-full"
                      onClick={() => openDeleteModal(category._id)}
                    >
                      <FaTrash size={20} color="red" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <DeleteCategory
          setOpenDelCategory={closeDeleteModal}
          categoryId={selectedCategoryId}
        />
      )}
    </>
  );
}
