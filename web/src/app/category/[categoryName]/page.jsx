"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "@/reducers/Category/categorySlice";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import CategoryCard from "@/components/CategoryCard/CategoryCard";

const CategoryPage = ({ params: paramsPromise }) => {
  const [categoryName, setCategoryName] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const categories = useSelector((state) => state.category.categories);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Unwrap `params` Promise in useEffect
  useEffect(() => {
    const unwrapParams = async () => {
      try {
        const params = await paramsPromise;
        setCategoryName(params.categoryName);
      } catch (err) {
        console.error("Failed to unwrap params:", err);
        setError("Failed to load category. Please try again.");
        setLoading(false);
      }
    };

    unwrapParams();
  }, [paramsPromise]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!categoryName) return;

        setLoading(true);
        setError(null);

        // Fetch categories if not already loaded
        if (!categories || categories.length === 0) {
          await dispatch(getCategories());
        }

        // Find the selected category
        const category = categories.find(
          (cat) => cat.name?.toUpperCase() === categoryName.toUpperCase()
        );

        if (category) {
          setSelectedCategory(category);
          setSubcategories(category.subcategories || []);
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
  }, [dispatch, categories, categoryName]);

  const handleSubcategoryClick = (subCategoryName) => {
    router.push(`/category/${categoryName}/${subCategoryName}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }



  return (
    <>
      <Navbar hasHeadline={true} />
      <div className="w-[75%] m-auto py-16">
        <h1 className="text-3xl font-bold">{selectedCategory?.name}</h1>
        <p className="text-gray-500 mb-8">
          {selectedCategory?.subtitle || "No subtitle provided"}
        </p>

        {/* Subcategories Section */}
        <div className="py-8">
          <h2 className="text-2xl font-semibold mb-4">Subcategories</h2>
          <div className="flex flex-wrap gap-4">
            {subcategories.length > 0 ? (
              subcategories.map((sub, index) => (
                <div
                  key={index}
                  className="cursor-pointer p-4 rounded-lg transition duration-200"
                  onClick={() => handleSubcategoryClick(sub.name)}
                >
                  <CategoryCard
                    title={sub.name}
                    img={`http://localhost:5000/uploads/${sub.image
                      ?.split("\\")
                      .pop()}`}
                    subTitle={sub.subtitle || "No subtitle"}
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-600">No subcategories found</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CategoryPage;
