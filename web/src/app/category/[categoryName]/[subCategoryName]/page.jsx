"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "@/reducers/Category/categorySlice";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import dynamic from "next/dynamic";

// Lazy load CategoryCard component
const CategoryCard = dynamic(
  () => import("@/components/CategoryCard/CategoryCard"),
  {
    loading: () => <p>Loading category...</p>,
  }
);

const NestedSubCategoryPage = ({ params: paramsPromise }) => {
  const [categoryName, setCategoryName] = useState(null);
  const [subCategoryName, setSubCategoryName] = useState(null);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Unwrap `params` and fetch categories concurrently
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [params] = await Promise.all([
          paramsPromise,
          dispatch(getCategories()),
        ]);
        setCategoryName(decodeURIComponent(params.categoryName));
        setSubCategoryName(decodeURIComponent(params.subCategoryName));
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Failed to load subcategory. Please try again.");
      }
    };

    fetchData();
  }, [paramsPromise, dispatch]);

  // Memoize nested subcategories
  const nestedSubcategories = useMemo(() => {
    if (!categoryName || !subCategoryName || !categories.length) return [];

    const category = categories.find(
      (cat) => cat.name?.toUpperCase() === categoryName.toUpperCase()
    );

    if (!category) {
      setError("Category not found");
      return [];
    }

    const subCategory = category.subcategories?.find(
      (sub) => sub.name?.toUpperCase() === subCategoryName.toUpperCase()
    );

    if (!subCategory) {
      setError("Subcategory not found");
      return [];
    }

    return subCategory.subcategories || [];
  }, [categories, categoryName, subCategoryName]);

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }
  return (
    <>
      <Navbar hasHeadline={true} />
      <div className="w-[75%] m-auto py-64">
        <h1 className="my-3 font-bold text-2xl"> {subCategoryName}</h1>
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
