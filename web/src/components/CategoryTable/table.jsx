"use client";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../reducers/Category/categorySlice";
import DeleteCategory from "../DeleteCategory/DeleteCategory";
import CreateCategory from "../CreateCategory/CreateCategory";

const CategoryTable = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch categories when the component mounts
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  // Open delete modal
  const openDeleteModal = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setIsDeleteModalOpen(true);
  };

  // Open edit modal
  const openEditModal = (category) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  // Close modals
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedCategoryId(null);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedCategory(null);
  };

  // Display loading or error states
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
                <th className="px-4 py-2 border-b font-semibold">Image</th>
                <th className="px-4 py-2 border-b font-semibold">
                  Category Name
                </th>
                <th className="px-4 py-2 border-b font-semibold">Subtitle</th>
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
                  <td className="px-4 py-2 border-b">
                    {category.image ? (
                      <img
                        src={`http://localhost:5000/uploads/${category.image
                          .split("\\")
                          .pop()}`} // Use only the filename
                        alt={`${category.name} Image`}
                        className="h-12 w-12 object-cover rounded-full"
                      />
                    ) : (
                      <span className="text-gray-500">No Image</span>
                    )}
                  </td>
                  <td className="px-4 py-2 border-b">{category.name}</td>
                  <td className="px-4 py-2 border-b">
                    {category.subtitle || "No Subtitle"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {category.subcategories &&
                    category.subcategories.length > 0 ? (
                      <div className="flex flex-wrap gap-2 justify-center">
                        {category.subcategories.map((sub) => (
                          <span key={sub._id} className="inline">
                            {sub.name || "Unnamed Subcategory"}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-500">No Subcategories</span>
                    )}
                  </td>
                  <td className="px-4 py-2 border-b flex justify-center space-x-2">
                    <button
                      className="bg-blue-200 p-2 rounded-full"
                      onClick={() => openEditModal(category)}
                    >
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

      {/* Edit Modal */}
      {isEditModalOpen && (
        <CreateCategory
          setOpenAddProduct={closeEditModal}
          category={selectedCategory}
        />
      )}
    </>
  );
};

export default CategoryTable;
