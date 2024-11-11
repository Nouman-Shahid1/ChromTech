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
    subTitle: "HPLC and UHPLC Columns",
  },
  {
    title: "{subcategory.name}",
    img: "https://cdn11.bigcommerce.com/s-czhvm5lnv4/images/stencil/original/image-manager/lcaccess.jpg?t=1708457525",
    subTitle: "Fitting, Tubing, and Accessories",
  },
  {
    title: "{subcategory.name}",
    img: "https://cdn11.bigcommerce.com/s-czhvm5lnv4/images/stencil/original/image-manager/safetykit2.jpg?t=1708457735",
    subTitle: "HPLC Solvent Safety System",
  },
];

const LC = () => {
  const [lcData, setLcData] = useState(initialData);
  const [lcCategory, setLcCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories first
        await dispatch(getCategories());

        // Find the "LC" category
        const category = categories.find(
          (cat) => cat.name.toUpperCase() === "LC"
        );

        if (category) {
          setLcCategory(category);

          // Update lcData with subcategory names
          const updatedData = initialData.map((item, index) => {
            const subcategory = category.subcategories?.[index];
            return {
              ...item,
              title: subcategory ? subcategory.name : item.title,
            };
          });

          setLcData(updatedData);

          // Fetch products and filter by "LC" category
          await dispatch(getProducts());
          const lcProducts = products.filter(
            (product) => product.category?.name?.toUpperCase() === "LC"
          );

          setFilteredProducts(lcProducts);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [dispatch, categories.length, products]);

  console.log("Filtered LC Products:", filteredProducts);

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
      {/* Pass filtered products to RelatedProducts */}
      <RelatedProducts category={lcCategory} products={filteredProducts} />
      <Footer />
    </>
  );
};

export default LC;
