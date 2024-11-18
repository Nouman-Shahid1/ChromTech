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

const GC = () => {
  const [gcCategory, setGcCategory] = useState(null);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const products = useSelector((state) => state.product.products);

  // Fetch categories and products concurrently
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

  // Memoize category and subcategories data
  const gcData = useMemo(() => {
    const category = categories.find((cat) => cat.name?.toUpperCase() === "GC");

    if (!category) {
      console.warn("GC category not found");
      return [];
    }

    setGcCategory(category);

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

  // Memoize filtered products
  const filteredProducts = useMemo(() => {
    if (!gcCategory) return [];
    return products.filter(
      (product) => product.category?.name?.toUpperCase() === "GC"
    );
  }, [products, gcCategory]);

  return (
    <>
      <Navbar hasHeadline={true} />
      <MenuPage
        data={gcData}
        titleText="GC"
        breadcrumbText="Home / GC Products"
        descriptionTitle="GC Consumables & Accessories"
        descriptionText="Explore our comprehensive selection of GC consumables and accessories, including high-quality columns and safety systems for efficient gas chromatography operations."
      />
      <RelatedProducts category={gcCategory} products={filteredProducts} />
      <Footer />
      <Chatbot/>
    </>
  );
};

export default GC;
