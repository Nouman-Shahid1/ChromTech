"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import RelatedProducts from "@/components/RelatedProducts/RelatedProducts";
import MenuPage from "@/components/MenuPage/MenuPage";
import { getCategories } from "@/reducers/Category/categorySlice";
import { getProducts } from "@/reducers/Product/productSlice";
import { useDispatch, useSelector } from "react-redux";

const Instrumentation = () => {
  const [instrumentData, setInstrumentData] = useState([]);
  const [instrumentCategory, setInstrumentCategory] = useState(null);
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

        // Find the "Instrumentation" category
        const category = categories.find(
          (cat) => cat.name?.toUpperCase() === "INSTRUMENTATION"
        );

        if (category) {
          setInstrumentCategory(category);

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

          setInstrumentData(updatedData || []);

          // Filter products by "Instrumentation" category
          const instrumentProducts = products.filter(
            (product) =>
              product.category?.name?.toUpperCase() === "INSTRUMENTATION"
          );

          setFilteredProducts(instrumentProducts);
        } else {
          console.warn("Instrumentation category not found");
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
    </>
  );
};

export default Instrumentation;
