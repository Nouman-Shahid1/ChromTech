"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import Navbar from "@/components/Navbar/Navbar";

function ShopAllCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Fetch categories when the component loads
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/categories");
        const data = await response.json();
        setCategories(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch categories.");
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Handle subcategory click
  const handleSubcategoryClick = (categoryName, subcategoryName) => {
    if (!subcategoryName) {
      console.error("Subcategory name is undefined.");
      return;
    }
    router.push(
      `/category/${encodeURIComponent(categoryName)}/${encodeURIComponent(
        subcategoryName
      )}`
    );
  };

  // Loading and error handling
  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <>
      <Navbar />
      <div className="w-[75%] mx-auto pt-36 mt-10">
        {/* Breadcrumb Navigation */}
        <div className="flex">
          <button className="font-thin">Home / </button>
          <p>Shop All Categories</p>
        </div>

        {/* Page Title */}
        <h1 className="text-5xl font-bold mt-10">Shop All Categories</h1>
        <p className="mt-10">
          Welcome to our Shop All Categories page! Explore our wide range of
          chromatography supplies, including vials, columns, syringes, and more.
          Easily find high-quality products from top brands to enhance your
          lab's performance.
        </p>

        {/* Display Categories with Subcategories */}
        <div className="pt-6">
          {categories
            .filter(
              (category) => category.image && category.image.trim() !== ""
            )
            .map((category) => (
              <div key={category._id} className="mb-10">
                {/* Main Category Name */}
                <h2 className="text-3xl font-bold mb-4">{category.subtitle}</h2>

                {/* Subcategories List */}
                {category.subcategories && category.subcategories.length > 0 ? (
                  <div className="flex flex-wrap gap-8">
                    {category.subcategories.map((sub) => (
                      <div
                        key={sub._id}
                        onClick={() =>
                          handleSubcategoryClick(category.name, sub.name)
                        }
                        className="cursor-pointer"
                      >
                        <CategoryCard
                          title={sub.name}
                          img={
                            sub.image
                              ? `http://localhost:5000/uploads/${sub.image
                                  .split("\\")
                                  .pop()}`
                              : "/placeholder-image.png"
                          }
                          subTitle={sub.name || "No subtitle available"}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No subcategories available</p>
                )}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default ShopAllCategoriesPage;
