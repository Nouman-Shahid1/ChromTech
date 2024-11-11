"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import RelatedProducts from "@/components/RelatedProducts/RelatedProducts";
import MenuPage from "@/components/MenuPage/MenuPage";
import { getCategories } from "@/reducers/Category/categorySlice";
import { getProducts } from "@/reducers/Product/productSlice";
import { useDispatch, useSelector } from "react-redux";

// Initial data for Plates
const initialData = [
  {
    title: "{subcategory.name}",
    img: "https://cdn11.bigcommerce.com/s-czhvm5lnv4/images/stencil/original/image-manager/plates.jpg",
    subTitle: "Plates",
  },
  {
    title: "{subcategory.name}",
    img: "https://cdn11.bigcommerce.com/s-czhvm5lnv4/images/stencil/original/image-manager/plate-accessories.jpg",
    subTitle: "Plate Accessories",
  },
];

const Plates = () => {
  const [platesData, setPlatesData] = useState(initialData);
  const [platesCategory, setPlatesCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getCategories()); // Find the "Plates" category

        const category = categories.find(
          (cat) => cat.name === "Vials & 96-Well Plates"
        );

        if (category) {
          setPlatesCategory(category);

          const updatedData = initialData.map((item, index) => {
            const subcategory = category.subcategories?.[index];
            return {
              ...item,
              title: subcategory ? subcategory.name : item.title,
            };
          });

          setPlatesData(updatedData);

          await dispatch(getProducts());
          const platesProducts = products.filter(
            (product) => product.category?.name === "Vials & 96-Well Plates"
          );

          setFilteredProducts(platesProducts);
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
        data={platesData}
        titleText="Vials & 96-Well Plates"
        breadcrumbText="Home / Plates Products"
        descriptionTitle="Plates & Accessories"
        descriptionText="Discover our selection of plates and plate accessories designed for laboratory efficiency and accuracy."
      />
           {" "}
      <RelatedProducts category={platesCategory} products={filteredProducts} />
            <Footer />   {" "}
    </>
  );
};

export default Plates;
