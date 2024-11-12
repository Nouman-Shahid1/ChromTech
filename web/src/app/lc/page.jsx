"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import RelatedProducts from "@/components/RelatedProducts/RelatedProducts";
import MenuPage from "@/components/MenuPage/MenuPage";
import { getCategories } from "@/reducers/Category/categorySlice";
import { getProducts } from "@/reducers/Product/productSlice";
import { useDispatch, useSelector } from "react-redux";

const LC = () => {
  const [lcData, setLcData] = useState([]);
  const [lcCategory, setLcCategory] = useState(null);
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

        // Find the "LC" category
        const category = categories.find(
          (cat) => cat.name?.toUpperCase() === "LC"
        );

        if (category) {
          setLcCategory(category);

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

          setLcData(updatedData || []);

          // Filter products by "LC" category
          const lcProducts = products.filter(
            (product) => product.category?.name?.toUpperCase() === "LC"
          );

          setFilteredProducts(lcProducts);
        } else {
          console.warn("LC category not found");
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
        data={lcData}
        titleText="LC"
        breadcrumbText="Home / LC Products"
        descriptionTitle="LC Consumables & Accessories"
        descriptionText="Discover the Chrom Tech difference with our complete line of LC consumables and accessories. From HPLC fittings to instrument replacement parts, we offer high-performance options for efficient lab operations."
      />
      <RelatedProducts category={lcCategory} products={filteredProducts} />
      <Footer />
    </>
  );
};

export default LC;
