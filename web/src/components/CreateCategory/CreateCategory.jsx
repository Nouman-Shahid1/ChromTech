import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  createCategory,
  updateCategory,
} from "../../reducers/Category/categorySlice";

const CreateCategory = ({ setOpenAddProduct, category }) => {
  const dispatch = useDispatch();
  const isEditMode = !!category;

  // Initialize state with existing category data if in edit mode
  const [name, setName] = useState(category?.name || "");
  const [subcategories, setSubcategories] = useState(
    category?.subcategories?.map((sub) => ({ name: sub.name })) || [
      { name: "" },
    ]
  );

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      alert("Please enter a category name.");
      return;
    }

    const subcategoryNames = subcategories
      .filter((sub) => sub.name.trim() !== "")
      .map((sub) => sub.name);

    const categoryData = {
      name,
      subcategories: subcategoryNames,
    };

    try {
      if (isEditMode) {
        // Update existing category
        await dispatch(
          updateCategory({
            id: category._id,
            updatedCategoryData: categoryData,
          })
        );
        alert("Category updated successfully!");
      } else {
        // Create new category
        await dispatch(createCategory(categoryData));
        alert("Category created successfully!");
      }

      setOpenAddProduct(false);
    } catch (error) {
      console.error("Error saving category:", error);
      alert("Failed to save category.");
    }
  };

  // Handle subcategory input change
  const handleSubcategoryChange = (index, value) => {
    const updatedSubcategories = [...subcategories];
    updatedSubcategories[index].name = value;
    setSubcategories(updatedSubcategories);
  };

  // Add new subcategory input field
  const addSubcategoryField = () => {
    setSubcategories([...subcategories, { name: "" }]);
  };

  // Remove a subcategory input field
  const removeSubcategoryField = (index) => {
    const updatedSubcategories = subcategories.filter((_, i) => i !== index);
    setSubcategories(updatedSubcategories);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg p-8 transition-transform transform hover:scale-105">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {isEditMode ? "Edit Category" : "Create New Category"}
          </h2>
          <button
            type="button"
            className="text-gray-500 hover:text-gray-800 dark:hover:text-white"
            onClick={() => setOpenAddProduct(false)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Category Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-3 rounded-lg border"
              placeholder="Enter Category Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <h3 className="text-lg font-semibold mb-4">
            Add Subcategories (Optional)
          </h3>
          {subcategories.map((sub, index) => (
            <div key={index} className="flex items-center mb-4">
              <input
                type="text"
                className="flex-1 p-3 rounded-lg border"
                placeholder={`Subcategory ${index + 1} Name`}
                value={sub.name}
                onChange={(e) => handleSubcategoryChange(index, e.target.value)}
              />
              <button
                type="button"
                className="ml-3 p-2 rounded-full bg-red-500 hover:bg-red-600 text-white"
                onClick={() => removeSubcategoryField(index)}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 12H4"
                  />
                </svg>
              </button>
            </div>
          ))}

          <button
            type="button"
            className="w-full py-3 mb-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
            onClick={addSubcategoryField}
          >
            Add Subcategory
          </button>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="py-3 px-6 rounded-lg bg-gray-400 hover:bg-gray-500 text-white"
              onClick={() => setOpenAddProduct(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-3 px-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isEditMode ? "Update Category" : "Create Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCategory;
