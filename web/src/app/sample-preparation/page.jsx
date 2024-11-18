"use client";
import React, { useEffect, useState, useMemo } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import RelatedProducts from "@/components/RelatedProducts/RelatedProducts";
import MenuPage from "@/components/MenuPage/MenuPage";
import { getCategories } from "@/reducers/Category/categorySlice";
import { getProducts } from "@/reducers/Product/productSlice";
import { useDispatch, useSelector } from "react-redux";

const SamplePreparation = () => {
  const [samplePrepCategory, setSamplePrepCategory] = useState(null);
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
  const samplePrepData = useMemo(() => {
    const category = categories.find(
      (cat) => cat.name?.toUpperCase() === "SAMPLE PREPARATION"
    );

    if (!category) {
      console.warn("Sample Preparation category not found");
      return [];
    }

    setSamplePrepCategory(category);

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
    if (!samplePrepCategory) return [];
    return products.filter(
      (product) =>
        product.category?.name?.toUpperCase() === "SAMPLE PREPARATION"
    );
  }, [products, samplePrepCategory]);

  return (
    <>
      <Navbar hasHeadline={true} />
      <MenuPage
        data={samplePrepData}
        titleText="Sample Preparation"
        breadcrumbText="Home / Sample Preparation Products"
        descriptionTitle="Sample Preparation Tools & Accessories"
        descriptionText="Explore our range of sample preparation tools and accessories, designed for efficient and accurate laboratory sample processing."
      />
      <RelatedProducts
        category={samplePrepCategory}
        products={filteredProducts}
      />
      <Footer />
    </>
  );
};

export default SamplePreparation;
