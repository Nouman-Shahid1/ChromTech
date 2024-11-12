"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import RelatedProducts from "@/components/RelatedProducts/RelatedProducts";
import MenuPage from "@/components/MenuPage/MenuPage";
import { getCategories } from "@/reducers/Category/categorySlice";
import { getProducts } from "@/reducers/Product/productSlice";
import { useDispatch, useSelector } from "react-redux";

const Syringes = () => {
  const [syringesData, setSyringesData] = useState([]);
  const [syringesCategory, setSyringesCategory] = useState(null);
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

        // Find the "Syringes" category
        const category = categories.find(
          (cat) => cat.name?.toUpperCase() === "SYRINGES"
        );

        if (category) {
          setSyringesCategory(category);

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

          setSyringesData(updatedData || []);

          // Filter products by "Syringes" category
          const syringesProducts = products.filter(
            (product) => product.category?.name?.toUpperCase() === "SYRINGES"
          );

          setFilteredProducts(syringesProducts);
        } else {
          console.warn("Syringes category not found");
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
        data={syringesData}
        titleText="Syringes"
        breadcrumbText="Home / Syringes Products"
        descriptionTitle="Syringes & Accessories"
        descriptionText="Browse our collection of high-quality syringes and accessories, designed for precise sample injection and reliable performance."
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
