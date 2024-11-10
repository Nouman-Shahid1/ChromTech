import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createCategory } from "../../reducers/Category/categorySlice";

const CreateCategory = ({ setOpenAddProduct }) => {
  const [name, setName] = useState("");
  const [subcategories, setSubcategories] = useState([{ name: "" }]);
  const dispatch = useDispatch();

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
      await dispatch(createCategory(categoryData));
      alert("Category created successfully!");
      setOpenAddProduct(false);
    } catch (error) {
      console.error("Error creating category:", error);
      alert("Failed to create category.");
    }
  };

  const handleSubcategoryChange = (index, value) => {
    const updatedSubcategories = [...subcategories];
    updatedSubcategories[index].name = value;
    setSubcategories(updatedSubcategories);
  };

  const addSubcategoryField = () => {
    setSubcategories([...subcategories, { name: "" }]);
  };

  const removeSubcategoryField = (index) => {
    const updatedSubcategories = subcategories.filter((_, i) => i !== index);
    setSubcategories(updatedSubcategories);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg p-8 transition-transform transform hover:scale-105">
        {/* Modal Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Create New Category
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
              xmlns="http://www.w3.org/2000/svg"
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

        {/* Modal Body */}
        <form onSubmit={handleSubmit}>
          {/* Category Name Input */}
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Category Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Enter Category Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Subcategory Inputs */}
          <h3 className="text-lg font-semibold mb-4 dark:text-white">
            Add Subcategories (Optional)
          </h3>
          {subcategories.map((sub, index) => (
            <div key={index} className="flex items-center mb-4">
              <input
                type="text"
                className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder={`Subcategory ${index + 1} Name`}
                value={sub.name}
                onChange={(e) => handleSubcategoryChange(index, e.target.value)}
              />
              <button
                type="button"
                className="ml-3 p-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition-all"
                onClick={() => removeSubcategoryField(index)}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
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

          {/* Add Subcategory Button */}
          <button
            type="button"
            className="w-full py-3 mb-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all"
            onClick={addSubcategoryField}
          >
            Add Subcategory
          </button>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="py-3 px-6 rounded-lg bg-gray-400 hover:bg-gray-500 text-white transition-all"
              onClick={() => setOpenAddProduct(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-3 px-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all"
            >
              Create Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCategory;
