"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import RelatedProducts from "@/components/RelatedProducts/RelatedProducts";
import MenuPage from "@/components/MenuPage/MenuPage";
import { getCategories } from "@/reducers/Category/categorySlice";
import { getProducts } from "@/reducers/Product/productSlice";
import { useDispatch, useSelector } from "react-redux";

// Initial data for Sample Preparation
const initialData = [
  {
    title: "{subcategory.name}",
    img: "https://cdn11.bigcommerce.com/s-czhvm5lnv4/images/stencil/original/image-manager/sample-preparation.jpg",
    subTitle: "Sample Preparation Tools",
  },
  {
    title: "{subcategory.name}",
    img: "https://cdn11.bigcommerce.com/s-czhvm5lnv4/images/stencil/original/image-manager/sample-preparation-accessories.jpg",
    subTitle: "Sample Preparation Accessories",
  },
];

const SamplePreparation = () => {
  const [samplePrepData, setSamplePrepData] = useState(initialData);
  const [samplePrepCategory, setSamplePrepCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories first
        await dispatch(getCategories()); // Find the "Sample Preparation" category

        const category = categories.find(
          (cat) => cat.name === "Sample Preparation"
        );

        if (category) {
          setSamplePrepCategory(category); // Update samplePrepData with subcategory names

          const updatedData = initialData.map((item, index) => {
            const subcategory = category.subcategories?.[index];
            return {
              ...item,
              title: subcategory ? subcategory.name : item.title,
            };
          });

          setSamplePrepData(updatedData); // Fetch products and filter by "Sample Preparation" category

          await dispatch(getProducts());
          const samplePrepProducts = products.filter(
            (product) => product.category?.name === "Sample Preparation"
          );

          setFilteredProducts(samplePrepProducts);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [dispatch, categories.length, products]);

  return (
    <>
            <Navbar hasHeadline={true} />     {" "}
      <MenuPage
        data={samplePrepData}
        titleText="Sample Preparation"
        breadcrumbText="Home / Sample Preparation Products"
        descriptionTitle="Sample Preparation Tools & Accessories"
        descriptionText="Explore our range of sample preparation tools and accessories, designed for efficient and accurate laboratory sample processing."
      />
           {" "}
      <RelatedProducts
        category={samplePrepCategory}
        products={filteredProducts}
      />
            <Footer />   {" "}
    </>
  );
};

export default SamplePreparation;
