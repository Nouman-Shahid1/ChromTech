"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "@/reducers/Category/categorySlice";
import { getProducts } from "@/reducers/Product/productSlice";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import CategoryCard from "@/components/CategoryCard/CategoryCard";
import ProductCard from "@/components/ProductCard/ProductCard";

const CategoryPage = ({ params: paramsPromise }) => {
  const [categoryName, setCategoryName] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const categories = useSelector((state) => state.category.categories);
  const products = useSelector((state) => state.product.products);
  const [loading, setLoading] = useState(true);
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
        setLoading(false);
      }
    };

    unwrapParams();
  }, [paramsPromise]);

  // Fetch categories and products only once
  useEffect(() => {
    const fetchDataOnce = async () => {
      if (isDataFetched || categories.length > 0 || products.length > 0) return;

      try {
        setLoading(true);
        await dispatch(getCategories());
        await dispatch(getProducts());
        setIsDataFetched(true);
        setLoading(false);
      } catch (err) {
        console.error("Data fetch error:", err);
        setError("Error fetching data. Please try again.");
        setLoading(false);
      }
    };

    fetchDataOnce();
  }, [dispatch, isDataFetched, categories.length, products.length]);

  // Process category and products data
  useEffect(() => {
    if (!categoryName || !isDataFetched) return;

    const processData = () => {
      // Find the selected category
      const category = categories.find(
        (cat) => cat.name?.toUpperCase() === categoryName.toUpperCase()
      );

      if (category) {
        setSelectedCategory(category);

        // Prepare subcategory data
        const subcategoryData = category.subcategories?.map((subcategory) => {
          const imgUrl = subcategory?.image
            ? `http://localhost:5000/uploads/${subcategory.image
                .split("\\")
                .pop()}`
            : `http://localhost:5000/uploads/${category.image
                .split("\\")
                .pop()}`;

          const subTitle =
            subcategory?.subtitle?.trim() || "No subtitle provided";
          return {
            title: subcategory?.name || "Unnamed Subcategory",
            img: imgUrl,
            subTitle: subTitle,
          };
        });

        setCategoryData(subcategoryData || []);

        // Build the category filter dynamically
        const filter = gatherAllSubcategories(categoryName, categories);
        setCategoryFilter(filter);

        // Filter products by selected category and subcategories
        const categoryProducts = products.filter((product) =>
          filter.includes(product.category?.name)
        );

        setFilteredProducts(categoryProducts);
      } else {
        console.warn(`Category "${categoryName}" not found`);
        setError("Category not found");
      }
    };

    processData();
  }, [categories, products, categoryName, isDataFetched]);

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

  const handleSubcategoryClick = (subCategoryName) => {
    router.push(`/category/${categoryName}/${subCategoryName}`);
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
    </>
  );
};

export default CategoryPage;
