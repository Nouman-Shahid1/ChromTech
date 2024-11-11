"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import RelatedProducts from "@/components/RelatedProducts/RelatedProducts";
import MenuPage from "@/components/MenuPage/MenuPage";
import { getCategories } from "@/reducers/Category/categorySlice";
import { getProducts } from "@/reducers/Product/productSlice";
import { useDispatch, useSelector } from "react-redux";

const initialData = [
  {
    title: "{subcategory.name}",
    img: "https://cdn11.bigcommerce.com/s-czhvm5lnv4/images/stencil/original/image-manager/lccolumns.jpg?t=1708457490",
    subTitle: "GC Columns",
  },
  {
    title: "{subcategory.name}",
    img: "https://cdn11.bigcommerce.com/s-czhvm5lnv4/images/stencil/original/image-manager/lcaccess.jpg?t=1708457525",
    subTitle: "GC Accessories",
  },
];

const GC = () => {
  const [gcData, setGcData] = useState(initialData);
  const [gcCategory, setGcCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories first
        await dispatch(getCategories());

        // Find the "GC" category
        const category = categories.find(
          (cat) => cat.name.toUpperCase() === "GC"
        );

        if (category) {
          setGcCategory(category);

          // Update gcData with subcategory names
          const updatedData = initialData.map((item, index) => {
            const subcategory = category.subcategories?.[index];
            return {
              ...item,
              title: subcategory ? subcategory.name : item.title,
            };
          });

          setGcData(updatedData);

          // Fetch products and filter by "GC" category
          await dispatch(getProducts());
          const gcProducts = products.filter(
            (product) => product.category?.name?.toUpperCase() === "GC"
          );

          setFilteredProducts(gcProducts);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [dispatch, categories.length, products]);

  // console.log("Filtered GC Products:", filteredProducts);
  // console.log("Category:", category);
  console.log("Products:", products);
  
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
      {/* Pass filtered products to RelatedProducts */}
      <RelatedProducts category={gcCategory} products={filteredProducts} />
      <Footer />
    </>
  );
};

export default GC;
