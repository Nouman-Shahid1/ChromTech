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

const Instrumentation = () => {
  const [instrumentCategory, setInstrumentCategory] = useState(null);
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

  // Memoize category data and subcategories processing
  const instrumentData = useMemo(() => {
    const category = categories.find(
      (cat) => cat.name?.toUpperCase() === "INSTRUMENTATION"
    );

    if (!category) {
      console.warn("Instrumentation category not found");
      return [];
    }

    setInstrumentCategory(category);

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
    if (!instrumentCategory) return [];
    return products.filter(
      (product) => product.category?.name?.toUpperCase() === "INSTRUMENTATION"
    );
  }, [products, instrumentCategory]);

  return (
    <>
      <Navbar hasHeadline={true} />
      <MenuPage
        data={instrumentData}
        titleText="Instrumentation"
        breadcrumbText="Home / Instrumentation Products"
        descriptionTitle="Instrumentation Consumables & Accessories"
        descriptionText="Explore our comprehensive selection of instrumentation consumables and accessories, including high-quality columns and safety systems for efficient operations."
      />
      <RelatedProducts
        category={instrumentCategory}
        products={filteredProducts}
      />
      <Footer />
      <Chatbot/>
    </>
  );
};

export default Instrumentation;
