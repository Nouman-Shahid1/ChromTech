"use client";
import React, { useState, useEffect } from "react";
import Profile from "@/components/Profile/Profile";
import { CiSearch } from "react-icons/ci";
import CreateProducts from "@/components/CreateProducts/CreateProducts";
import Table from "@/components/Table/Table";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../reducers/Category/categorySlice";
import { createProduct } from "../../../reducers/Product/productSlice";

const VialsPlates = () => {
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const dispatch = useDispatch();

  const mainCategory = "Vials & 96-Well Plates";
  const { categories, loading, error } = useSelector((state) => state.category);

  // Fetch categories from Redux when the component mounts
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  // Build the category filter dynamically based on the Redux state
  useEffect(() => {
    if (categories.length > 0) {
      const filter = gatherAllSubcategories(mainCategory, categories);
      setCategoryFilter(filter);
    }
  }, [categories]);

  // Recursive function to gather all subcategories dynamically
  const gatherAllSubcategories = (mainCategoryName, categories) => {
    let result = [mainCategoryName];
    const findSubcategories = (categoryName) => {
      const category = categories.find((cat) => cat.name === categoryName);
      if (category && category.subcategories) {
        for (let sub of category.subcategories) {
          result.push(sub.name);
          findSubcategories(sub.name);
        }
      }
    };
    findSubcategories(mainCategoryName);
    return result;
  };

  const handleCreate = () => {
    setOpenAddProduct(true);
  };

  const handleCreateProduct = async (productData) => {
    try {
      await dispatch(createProduct(productData));
      setOpenAddProduct(false);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  if (loading) {
    return <p className="text-center">Loading categories...</p>;
  }

  if (error) {
    return <p className="text-red-600 text-center">Error: {error}</p>;
  }

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
          <p className="text-lg">HOME / Vials and Plates</p>
        </div>
        <div className="relative bg-white rounded-xl h-[250px] sm:h-[150px] py-8 w-full mx-auto">
          <div className="px-6">
            <p className="text-2xl text-gray-800">
              <strong>Vials and Plates Products</strong>
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
                className="py-2 px-2 m-3 sm:m-0 rounded-lg bg-red-500 text-white"
                onClick={handleCreate}
              >
                Create Product
              </button>
            </div>
          </div>
        </div>

        {/* Pass the dynamically built category filter to the Table component */}
        <Table categoryFilter={categoryFilter} />
      </div>
    </>
  );
};

export default VialsPlates;
