"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import RelatedProducts from "@/components/RelatedProducts/RelatedProducts";
import MenuPage from "@/components/MenuPage/MenuPage";
import { getCategories } from "@/reducers/Category/categorySlice";
import { getProducts } from "@/reducers/Product/productSlice";
import { useDispatch, useSelector } from "react-redux";

const Plates = () => {
  const [platesData, setPlatesData] = useState([]);
  const [platesCategory, setPlatesCategory] = useState(null);
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

        // Find the "Vials & 96-Well Plates" category
        const category = categories.find(
          (cat) => cat.name?.toUpperCase() === "VIALS & 96-WELL PLATES"
        );

        if (category) {
          setPlatesCategory(category);

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

          setPlatesData(updatedData || []);

          // Filter products by "Vials & 96-Well Plates" category
          const platesProducts = products.filter(
            (product) =>
              product.category?.name?.toUpperCase() === "VIALS & 96-WELL PLATES"
          );

          setFilteredProducts(platesProducts);
        } else {
          console.warn("Vials & 96-Well Plates category not found");
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
        data={platesData}
        titleText="Vials & 96-Well Plates"
        breadcrumbText="Home / Plates Products"
        descriptionTitle="Plates & Accessories"
        descriptionText="Discover our selection of plates and plate accessories designed for laboratory efficiency and accuracy."
      />
      <RelatedProducts category={platesCategory} products={filteredProducts} />
      <Footer />
    </>
  );
};

export default Plates;
