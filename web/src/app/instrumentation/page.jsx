"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import RelatedProducts from "@/components/RelatedProducts/RelatedProducts";
import MenuPage from "@/components/MenuPage/MenuPage";
import { getCategories } from "@/reducers/Category/categorySlice";
import { getProducts } from "@/reducers/Product/productSlice";
import { useDispatch, useSelector } from "react-redux";

// Initial data for Instrumentation
const initialData = [
  {
    title: "{subcategory.name}",
    img: "https://cdn11.bigcommerce.com/s-czhvm5lnv4/images/stencil/original/image-manager/lccolumns.jpg?t=1708457490",
    subTitle: "Instrumentation Columns",
  },
  {
    title: "{subcategory.name}",
    img: "https://cdn11.bigcommerce.com/s-czhvm5lnv4/images/stencil/original/image-manager/lcaccess.jpg?t=1708457525",
    subTitle: "Instrumentation Accessories",
  },
  {
    title: "{subcategory.name}",
    img: "https://cdn11.bigcommerce.com/s-czhvm5lnv4/images/stencil/original/image-manager/lcaccess.jpg?t=1708457525",
    subTitle: "Instrumentation Accessories",
  },
];

const Instrumentation = () => {
  const [instrumentData, setInstrumentData] = useState(initialData);
  const [instrumentCategory, setInstrumentCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories first
        await dispatch(getCategories()); // Find the "Instrumentation" category

        const category = categories.find(
          (cat) => cat.name.toUpperCase() === "INSTRUMENTATION"
        );

        if (category) {
          setInstrumentCategory(category); // Update instrumentData with subcategory names

          const updatedData = initialData.map((item, index) => {
            const subcategory = category.subcategories?.[index];
            return {
              ...item,
              title: subcategory ? subcategory.name : item.title,
            };
          });

          setInstrumentData(updatedData); // Fetch products and filter by "Instrumentation" category

          await dispatch(getProducts());
          const instrumentProducts = products.filter(
            (product) =>
              product.category?.name?.toUpperCase() === "INSTRUMENTATION"
          );

          setFilteredProducts(instrumentProducts);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [dispatch, categories.length, products]); // Debugging information (optional) // console.log("Filtered Instrumentation Products:", filteredProducts); // console.log("Category:", instrumentCategory);

  console.log("Products:", products);

  return (
    <>
            <Navbar hasHeadline={true} />     {" "}
      <MenuPage
        data={instrumentData}
        titleText="Instrumentation"
        breadcrumbText="Home / Instrumentation Products"
        descriptionTitle="Instrumentation Consumables & Accessories"
        descriptionText="Explore our comprehensive selection of instrumentation consumables and accessories, including high-quality columns and safety systems for efficient operations."
      />
            {/* Pass filtered products to RelatedProducts */}     {" "}
      <RelatedProducts
        category={instrumentCategory}
        products={filteredProducts}
      />
            <Footer />   {" "}
    </>
  );
};

export default Instrumentation;
