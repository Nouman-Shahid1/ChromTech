"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import RelatedProducts from "@/components/RelatedProducts/RelatedProducts";
import MenuPage from "@/components/MenuPage/MenuPage";
import { getCategories } from "@/reducers/Category/categorySlice";
import { getProducts } from "@/reducers/Product/productSlice";
import { useDispatch, useSelector } from "react-redux";

// Initial data for Syringes
const initialData = [
  {
    title: "{subcategory.name}",
    img: "https://cdn11.bigcommerce.com/s-czhvm5lnv4/images/stencil/original/image-manager/syringes.jpg",
    subTitle: "Syringes",
  },
  {
    title: "{subcategory.name}",
    img: "https://cdn11.bigcommerce.com/s-czhvm5lnv4/images/stencil/original/image-manager/syringes.jpg",
    subTitle: "Syringes",
  },
  {
    title: "{subcategory.name}",
    img: "https://cdn11.bigcommerce.com/s-czhvm5lnv4/images/stencil/original/image-manager/syringes.jpg",
    subTitle: "Syringes",
  },
  {
    title: "{subcategory.name}",
    img: "https://cdn11.bigcommerce.com/s-czhvm5lnv4/images/stencil/original/image-manager/syringes.jpg",
    subTitle: "Syringes",
  },
  {
    title: "{subcategory.name}",
    img: "https://cdn11.bigcommerce.com/s-czhvm5lnv4/images/stencil/original/image-manager/syringes.jpg",
    subTitle: "Syringes",
  },
];

const Syringes = () => {
  const [syringesData, setSyringesData] = useState(initialData);
  const [syringesCategory, setSyringesCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories first
        await dispatch(getCategories()); // Find the "Syringes" category

        const category = categories.find(
          (cat) => cat.name === "Syringes"
        );

        if (category) {
          setSyringesCategory(category); // Update syringesData with subcategory names

          const updatedData = initialData.map((item, index) => {
            const subcategory = category.subcategories?.[index];
            return {
              ...item,
              title: subcategory ? subcategory.name : item.title,
            };
          });

          setSyringesData(updatedData); // Fetch products and filter by "Syringes" category

          await dispatch(getProducts());
          const syringesProducts = products.filter(
            (product) => product.category?.name === "Syringes"
          );

          setFilteredProducts(syringesProducts);
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
        data={syringesData}
        titleText="Syringes"
        breadcrumbText="Home / Syringes Products"
        descriptionTitle="Syringes & Accessories"
        descriptionText="Browse our collection of high-quality syringes and accessories, designed for precise sample injection and reliable performance."
      />
           {" "}
      <RelatedProducts
        category={syringesCategory}
        products={filteredProducts}
      />
            <Footer />   {" "}
    </>
  );
};

export default Syringes;
