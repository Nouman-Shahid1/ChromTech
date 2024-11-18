"use client";
import React, { useEffect, useState, useMemo } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import RelatedProducts from "@/components/RelatedProducts/RelatedProducts";
import MenuPage from "@/components/MenuPage/MenuPage";
import { getCategories } from "@/reducers/Category/categorySlice";
import { getProducts } from "@/reducers/Product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import Chatbot from "@/components/Chatbot/chatbot";

const LC = () => {
  const [lcCategory, setLcCategory] = useState(null);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const products = useSelector((state) => state.product.products);

  // Fetch categories and products concurrently on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([dispatch(getCategories()), dispatch(getProducts())]);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  // Find "LC" category and memoize derived state
  const lcData = useMemo(() => {
    const category = categories.find((cat) => cat.name?.toUpperCase() === "LC");

    if (!category) {
      console.warn("LC category not found");
      return [];
    }

    setLcCategory(category);

    return (
      category.subcategories?.map((subcategory) => {
        const imgUrl = subcategory?.image
          ? `http://localhost:5000/uploads/${subcategory.image
              .split("\\")
              .pop()}`
          : `http://localhost:5000/uploads/${category.image.split("\\").pop()}`;

        const subTitle =
          subcategory?.subtitle && subcategory?.subtitle.trim() !== ""
            ? subcategory.subtitle
            : "No subtitle provided";

        return {
          title: subcategory?.name || "Unnamed Subcategory",
          img: imgUrl,
          subTitle,
        };
      }) || []
    );
  }, [categories]);

  // Memoize filtered products to avoid re-filtering on every render
  const filteredProducts = useMemo(() => {
    if (!lcCategory) return [];
    return products.filter(
      (product) => product.category?.name?.toUpperCase() === "LC"
    );
  }, [products, lcCategory]);

  return (
    <>
      <Navbar hasHeadline={true} />
      <MenuPage
        data={lcData}
        titleText="LC"
        breadcrumbText="Home / LC Products"
        descriptionTitle="LC Consumables & Accessories"
        descriptionText="Discover the Chrom Tech difference with our complete line of LC consumables and accessories. From HPLC fittings to instrument replacement parts, we offer high-performance options for efficient lab operations."
      />
      <RelatedProducts category={lcCategory} products={filteredProducts} />
      <Footer />
      <Chatbot/>
    </>
  );
};

export default LC;
