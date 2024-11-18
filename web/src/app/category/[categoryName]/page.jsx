"use client";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "@/reducers/Category/categorySlice";
import { getProducts } from "@/reducers/Product/productSlice";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import dynamic from "next/dynamic";
import Chatbot from "@/components/Chatbot/chatbot";

// Lazy load components
const CategoryCard = dynamic(
  () => import("@/components/CategoryCard/CategoryCard"),
  {
    loading: () => <p>Loading category...</p>,
  }
);
const ProductCard = dynamic(
  () => import("@/components/ProductCard/ProductCard"),
  {
    loading: () => <p>Loading product...</p>,
  }
);

const CategoryPage = ({ params: paramsPromise }) => {
  const [categoryName, setCategoryName] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const categories = useSelector((state) => state.category.categories);
  const products = useSelector((state) => state.product.products);
  const [error, setError] = useState(null);

  // Unwrap `params` Promise in useEffect
  useEffect(() => {
    const unwrapParams = async () => {
      try {
        const params = await paramsPromise;
        setCategoryName(decodeURIComponent(params.categoryName));
      } catch (err) {
        console.error("Failed to unwrap params:", err);
        setError("Failed to load category. Please try again.");
      }
    };
    unwrapParams();
  }, [paramsPromise]);

  // Fetch categories and products concurrently
  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([dispatch(getCategories()), dispatch(getProducts())]);
      } catch (err) {
        console.error("Data fetch error:", err);
        setError("Error fetching data. Please try again.");
      }
    };
    if (!categories.length || !products.length) {
      fetchData();
    }
  }, [dispatch, categories.length, products.length]);

  // Memoize category data
  const selectedCategory = useMemo(() => {
    return categories.find(
      (cat) => cat.name?.toUpperCase() === categoryName?.toUpperCase()
    );
  }, [categories, categoryName]);

  const categoryData = useMemo(() => {
    if (!selectedCategory) return [];

    return (
      selectedCategory.subcategories?.map((subcategory) => {
        const imgUrl = subcategory?.image
          ? `http://localhost:5000/uploads/${subcategory.image
              .split("\\")
              .pop()}`
          : `http://localhost:5000/uploads/${selectedCategory.image
              .split("\\")
              .pop()}`;

        const subTitle =
          subcategory?.subtitle?.trim() || "No subtitle provided";

        return {
          title: subcategory?.name || "Unnamed Subcategory",
          img: imgUrl,
          subTitle,
        };
      }) || []
    );
  }, [selectedCategory]);

  // Gather all subcategories recursively
  const gatherAllSubcategories = useCallback(
    (mainCategoryName) => {
      const result = [mainCategoryName];
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
    },
    [categories]
  );

  // Filter products by selected category and subcategories
  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return [];
    const categoryFilter = gatherAllSubcategories(selectedCategory.name);
    return products.filter((product) =>
      categoryFilter.includes(product.category?.name)
    );
  }, [products, selectedCategory, gatherAllSubcategories]);

  const handleSubcategoryClick = useCallback(
    (subCategoryName) => {
      router.push(`/category/${categoryName}/${subCategoryName}`);
    },
    [router, categoryName]
  );

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <>
      <Navbar hasHeadline={true} />
      <div className="w-[75%] m-auto pt-64">
        <h1 className="text-3xl font-bold">{selectedCategory?.name}</h1>
        <p className="text-gray-500 mb-8">
          {selectedCategory?.subtitle || "No subtitle provided"}
        </p>

        {/* Display Subcategories */}
        <div className="py-8">
          <div className="flex flex-wrap gap-4">
            {categoryData.length > 0 ? (
              categoryData.map((sub, index) => (
                <div
                  key={index}
                  className="cursor-pointer p-4 rounded-lg transition duration-200"
                  onClick={() => handleSubcategoryClick(sub.title)}
                >
                  <CategoryCard
                    title={sub.title}
                    img={sub.img}
                    subTitle={sub.subTitle}
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-600">No subcategories found</p>
            )}
          </div>
        </div>

        {/* Display Products */}
        <div className="py-8">
          <h2 className="text-2xl font-semibold mb-4">Products</h2>
          <div className="flex flex-wrap gap-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))
            ) : (
              <p className="text-gray-600">
                No products found for this category
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
      <Chatbot/>
    </>
  );
};

export default CategoryPage;
