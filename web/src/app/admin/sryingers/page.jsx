"use client";
import React, { useState, useEffect } from "react";
import Profile from "@/components/Profile/Profile";
import { CiSearch } from "react-icons/ci";
import CreateProducts from "@/components/CreateProducts/CreateProducts";
import Table from "@/components/Table/Table";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../reducers/Category/categorySlice";
import {
  createProduct,
  searchProducts,
} from "../../../reducers/Product/productSlice";

const Syringes = () => {
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  const mainCategory = "Syringes";
  const { categories, loading, error } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (categories.length > 0) {
      const filter = gatherAllSubcategories(mainCategory, categories);
      setCategoryFilter(filter);
    }
  }, [categories]);

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

  const handleSearchChange = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query.length > 0) {
      await dispatch(searchProducts(query));
    } else {
      dispatch(getCategories());
    }
  };

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
    return <p className="text-red-600 text-center">Error: {error}</p>;
  }

  return (
    <>
      <div className="bg-gray-100 p-8 min-h-[100vh]">
        <Profile />
        {openAddProduct && (
          <CreateProducts setOpenAddProduct={setOpenAddProduct} />
        )}
        <button onClick={() => setOpenAddProduct(true)}>Add Product</button>
        <div className="py-8 px-6">
          <p className="text-lg">HOME / Syringes</p>
        </div>
        <div className="relative bg-white rounded-xl h-[250px] sm:h-[150px] py-8 w-full mx-auto">
          <div className="px-6">
            <p className="text-2xl text-gray-800">
              <strong>Syringes Products</strong>
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
                value={searchQuery}
                onChange={handleSearchChange}
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

        {/* Pass the dynamically built category filter to the Table component */}
        <Table categoryFilter={categoryFilter} searchQuery={searchQuery} />
      </div>
    </>
  );
};

export default Syringes;
