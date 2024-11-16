"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "@/reducers/Category/categorySlice";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import CategoryCard from "@/components/CategoryCard/CategoryCard";

const NestedSubCategoryPage = ({ params: paramsPromise }) => {
  const [categoryName, setCategoryName] = useState(null);
  const [subCategoryName, setSubCategoryName] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const [nestedSubcategories, setNestedSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Unwrap the `params` Promise using useEffect
  useEffect(() => {
    const unwrapParams = async () => {
      try {
        const params = await paramsPromise;
        setCategoryName(decodeURIComponent(params.categoryName));
        setSubCategoryName(decodeURIComponent(params.subCategoryName));
      } catch (err) {
        console.error("Failed to unwrap params:", err);
        setError("Failed to load subcategory. Please try again.");
        setLoading(false);
      }
    };

    unwrapParams();
  }, [paramsPromise]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!categoryName || !subCategoryName) return;

        await dispatch(getCategories());

        const category = categories.find(
          (cat) => cat.name?.toUpperCase() === categoryName.toUpperCase()
        );

        if (category) {
          const subCategory = category.subcategories?.find(
            (sub) => sub.name?.toUpperCase() === subCategoryName.toUpperCase()
          );

          if (subCategory) {
            setNestedSubcategories(subCategory.subcategories || []);
          } else {
            console.error("Subcategory not found:", subCategoryName);
            setError("Subcategory not found");
          }
        } else {
          console.error("Category not found:", categoryName);
          setError("Category not found");
        }

        setLoading(false);
      } catch (err) {
        console.error("Data fetch error:", err);
        setError("Error fetching data. Please try again.");
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, categories, categoryName, subCategoryName]);

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

  return (
    <>
      <Navbar hasHeadline={true} />
      <div className="w-[75%] m-auto py-64">
        <h1>Nested Subcategories of {subCategoryName}</h1>
        <div className="flex flex-wrap gap-4">
          {nestedSubcategories.length > 0 ? (
            nestedSubcategories.map((nestedSub, index) => (
              <CategoryCard
                key={index}
                title={nestedSub.name}
                img={`http://localhost:5000/uploads/${nestedSub.image
                  ?.split("\\")
                  .pop()}`}
                subTitle={nestedSub.subtitle || "No subtitle"}
              />
            ))
          ) : (
            <p>No nested subcategories found</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NestedSubCategoryPage;
