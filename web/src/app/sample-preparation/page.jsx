"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import RelatedProducts from "@/components/RelatedProducts/RelatedProducts";
import MenuPage from "@/components/MenuPage/MenuPage";
import { getCategories } from "@/reducers/Category/categorySlice";
import { getProducts } from "@/reducers/Product/productSlice";
import { useDispatch, useSelector } from "react-redux";

const SamplePreparation = () => {
  const [samplePrepData, setSamplePrepData] = useState([]);
  const [samplePrepCategory, setSamplePrepCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories and products
        await dispatch(getCategories());
        await dispatch(getProducts());

        // Find the "Sample Preparation" category
        const category = categories.find(
          (cat) => cat.name?.toUpperCase() === "SAMPLE PREPARATION"
        );

        if (category) {
          setSamplePrepCategory(category);

          // Extract subcategories with image and subtitle fallback to parent category
          const updatedData = category.subcategories?.map((subcategory) => {
            const imgUrl = subcategory?.image
              ? `http://localhost:5000/uploads/${subcategory.image
                  .split("\\")
                  .pop()}`
              : `http://localhost:5000/uploads/${category.image
                  .split("\\")
                  .pop()}`;

            const subTitle =
              subcategory?.subtitle && subcategory?.subtitle.trim() !== ""
                ? subcategory.subtitle
                : "No subtitle provided";

            return {
              title: subcategory?.name || "Unnamed Subcategory",
              img: imgUrl,
              subTitle: subTitle,
            };
          });

          setSamplePrepData(updatedData || []);

          // Filter products by "Sample Preparation" category
          const samplePrepProducts = products.filter(
            (product) =>
              product.category?.name?.toUpperCase() === "SAMPLE PREPARATION"
          );

          setFilteredProducts(samplePrepProducts);
        } else {
          console.warn("Sample Preparation category not found");
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [dispatch, categories, products]);

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
