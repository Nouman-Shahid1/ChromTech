"use client";
import Profile from "@/components/Profile/Profile";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import CreateProducts from "@/components/CreateProducts/CreateProducts";
import Table from "@/components/Table/Table";
import { useDispatch } from "react-redux";
import { createProduct } from "../../../reducers/Product/productSlice";

const LC = () => {
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const dispatch = useDispatch();

  // Handle opening the Create Product modal
  const handleCreate = () => {
    setOpenAddProduct(true);
  };

  // API call function to be passed as a prop
  const handleCreateProduct = async (productData) => {
    try {
      await dispatch(createProduct(productData));
      setOpenAddProduct(false); // Close the modal after successful API call
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <>
      <div className="bg-gray-100 p-8 min-h-[100vh]">
        <Profile />
        {openAddProduct && (
          <CreateProducts
            setOpenAddProduct={setOpenAddProduct}
            onCreateProduct={handleCreateProduct}
          />
        )}
        <div className="py-8 px-6">
          <p className="text-lg">HOME / LC</p>
        </div>
        <div className="relative bg-white rounded-xl h-[250px] sm:h-[150px] py-8 w-full mx-auto">
          <div className="px-6">
            <p className="text-2xl text-gray-800">
              <strong>LC</strong>
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
                onClick={handleCreate}
              >
                Create Product
              </button>
            </div>
          </div>
        </div>
        <Table />
      </div>
    </>
  );
};

export default LC;
