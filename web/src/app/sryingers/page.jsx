"use client";
import React, { useEffect, useState, useMemo } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import MenuPage from "@/components/MenuPage/MenuPage";
import { getCategories } from "@/reducers/Category/categorySlice";
import { getProducts } from "@/reducers/Product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";

// Lazy load RelatedProducts component
const RelatedProducts = dynamic(
  () => import("@/components/RelatedProducts/RelatedProducts"),
  {
    loading: () => <p>Loading...</p>,
  }
);

const Syringes = () => {
  const [syringesCategory, setSyringesCategory] = useState(null);
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
  const syringesData = useMemo(() => {
    const category = categories.find(
      (cat) => cat.name?.toUpperCase() === "SYRINGES"
    );

    if (!category) {
      console.warn("Syringes category not found");
      return [];
    }

    setSyringesCategory(category);

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

  // Memoize filtered products by category
  const filteredProducts = useMemo(() => {
    if (!syringesCategory) return [];
    return products.filter(
      (product) => product.category?.name?.toUpperCase() === "SYRINGES"
    );
  }, [products, syringesCategory]);

  return (
    <>
      <Navbar hasHeadline={true} />
      <MenuPage
        data={syringesData}
        titleText="Syringes"
        breadcrumbText="Home / Syringes Products"
        descriptionTitle="Syringes & Accessories"
        descriptionText="Explore our range of high-quality syringes and accessories designed for precision and reliability in laboratory applications."
      />
      <RelatedProducts
        category={syringesCategory}
        products={filteredProducts}
      />
      <Footer />
    </>
  );
};

export default Syringes;
