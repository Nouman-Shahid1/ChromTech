"use client";
import React, { useEffect, useState, useMemo } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import MenuPage from "@/components/MenuPage/MenuPage";
import { getCategories } from "@/reducers/Category/categorySlice";
import { getProducts } from "@/reducers/Product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import Chatbot from "@/components/Chatbot/chatbot";

// Lazy load RelatedProducts component
const RelatedProducts = dynamic(
  () => import("@/components/RelatedProducts/RelatedProducts"),
  {
    loading: () => <p>Loading...</p>,
  }
);

const Plates = () => {
  const [platesCategory, setPlatesCategory] = useState(null);
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

  // Memoize the processed category data
  const platesData = useMemo(() => {
    const category = categories.find(
      (cat) => cat.name?.toUpperCase() === "VIALS & 96-WELL PLATES"
    );

    if (!category) {
      console.warn("Vials & 96-Well Plates category not found");
      return [];
    }

    setPlatesCategory(category);

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
    if (!platesCategory) return [];
    return products.filter(
      (product) =>
        product.category?.name?.toUpperCase() === "VIALS & 96-WELL PLATES"
    );
  }, [products, platesCategory]);

  return (
    <>
      <Navbar hasHeadline={true} />
      <MenuPage
        data={platesData}
        titleText="Vials & 96-Well Plates"
        breadcrumbText="Home / Plates Products"
        descriptionTitle="Plates & Accessories"
        descriptionText="Discover our selection of plates and plate accessories designed for laboratory efficiency and accuracy."
      />
      <RelatedProducts category={platesCategory} products={filteredProducts} />
      <Footer />
      <Chatbot/>
    </>
  );
};

export default Plates;
