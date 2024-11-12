"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import RelatedProducts from "@/components/RelatedProducts/RelatedProducts";
import MenuPage from "@/components/MenuPage/MenuPage";
import { getCategories } from "@/reducers/Category/categorySlice";
import { getProducts } from "@/reducers/Product/productSlice";
import { useDispatch, useSelector } from "react-redux";

const GC = () => {
  const [gcData, setGcData] = useState([]);
  const [gcCategory, setGcCategory] = useState(null);
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

        // Find the "GC" category
        const category = categories.find(
          (cat) => cat.name?.toUpperCase() === "GC"
        );

        if (category) {
          setGcCategory(category);

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

          setGcData(updatedData || []);

          // Filter products by "GC" category
          const gcProducts = products.filter(
            (product) => product.category?.name?.toUpperCase() === "GC"
          );

          setFilteredProducts(gcProducts);
        } else {
          console.warn("GC category not found");
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
        data={gcData}
        titleText="GC"
        breadcrumbText="Home / GC Products"
        descriptionTitle="GC Consumables & Accessories"
        descriptionText="Explore our comprehensive selection of GC consumables and accessories, including high-quality columns and safety systems for efficient gas chromatography operations."
      />
      <RelatedProducts category={gcCategory} products={filteredProducts} />
      <Footer />
    </>
  );
};

export default GC;
