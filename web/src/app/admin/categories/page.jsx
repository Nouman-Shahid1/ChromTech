"use client";
import Profile from "@/components/Profile/Profile";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import CreateCategory from "@/components/CreateCategory/CreateCategory";
import Table from "@/components/CategoryTable/table";
import { useDispatch } from "react-redux";
import { createCategory } from "../../../reducers/Category/categorySlice";

const Category = () => {
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const dispatch = useDispatch();

  // API call function to create category
  const handleCreateCategory = async (categoryData) => {
    try {
      await dispatch(createCategory(categoryData));
      setOpenAddProduct(false); // Close the modal after successful API call
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  return (
    <>
      <div className="bg-gray-100 p-8 min-h-[100vh]">
        <Profile />
        {openAddProduct && (
          <CreateCategory
            setOpenAddProduct={setOpenAddProduct}
            onCreateCategory={handleCreateCategory}
          />
        )}
        <div className="py-8 px-6">
          <p className="text-lg">HOME / Category</p>
        </div>
        <div className="relative bg-white rounded-xl h-[250px] sm:h-[150px] py-8 w-full mx-auto">
          <div className="px-6">
            <p className="text-2xl text-gray-800">
              <strong>Category</strong>
            </p>
          </div>
          <div className="absolute flex flex-col sm:flex-row bottom-5 sm:bottom-5 sm:right-5">
            <div className="mx-3 bg-gray-100 p-2">
              <button className="pt-1 px-2">
                <CiSearch />
              </button>
              <input
                type="text"
                className="border-none outline-none bg-gray-100"
                placeholder="Search..."
              />
            </div>
            <div>
              <button
                className="py-2 px-2 m-3 sm:m-0 rounded-lg bg-red-600 text-white"
                onClick={() => setOpenAddProduct(true)}
              >
                Create Category
              </button>
            </div>
          </div>
        </div>
        <Table />
      </div>
    </>
  );
};

export default Category;
