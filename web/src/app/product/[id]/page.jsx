"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { useMyContext } from "@/ContextApi/store";
import axios from "axios";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const ProductDetails = () => {
  const params = useParams();
  const id = params?.id;
  const { addToCart } = useMyContext();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoom, setZoom] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({});

  // Fetch product details from the backend
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );
        if (response.data) {
          setProduct(response.data);
          setSelectedImage(response.data.imageUrl);
        }
      } catch (error) {
        console.error("Error fetching product:", error.message);
      }
    };

    if (id) fetchProductDetails();
  }, [id]);

  // Handle quantity increase
  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  // Handle quantity decrease
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  // Add product to cart with specified quantity
  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity });
    }
  };

  // Image zoom effect
  const handleMouseMove = (e) => {
    const { offsetX, offsetY, target } = e.nativeEvent;
    const { width, height } = target;
    const xPercent = (offsetX / width) * 100;
    const yPercent = (offsetY / height) * 100;
    setZoomStyle({
      backgroundImage: `url(${selectedImage})`,
      backgroundPosition: `${xPercent}% ${yPercent}%`,
      backgroundSize: "250%",
    });
    setZoom(true);
  };

  const handleMouseLeave = () => {
    setZoom(false);
  };

  if (!product) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-64 px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Image Gallery Section */}
          <div className="lg:w-1/2">
            <div
              className={`relative w-full h-[500px] overflow-hidden rounded-xl shadow-lg transition-transform duration-300 
               
              `}
            >
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover rounded-xl hover:scale-105"
              />
            </div>
            <div className="flex gap-4 mt-6">
              <img
                src={product.imageUrl}
                alt="Thumbnail"
                className="w-24 h-24 object-cover rounded-lg cursor-pointer border-2 hover:border-blue-500"
                onClick={() => setSelectedImage(product.imageUrl)}
              />
            </div>
          </div>

          {/* Product Info Section */}
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-5xl font-extrabold mb-4">{product.name}</h1>
            <p className="text-lg text-gray-600">{product.sku}</p>
            <p className="text-4xl font-semibold text-blue-600">
              ${product.price.toLocaleString()}
            </p>
            <p className="text-lg">{product.description}</p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-6">
              <button
                className="bg-gray-200 p-3 rounded-full hover:bg-gray-300"
                onClick={handleDecreaseQuantity}
              >
                <AiOutlineMinus className="text-xl" />
              </button>
              <span className="text-2xl font-medium">{quantity}</span>
              <button
                className="bg-gray-200 p-3 rounded-full hover:bg-gray-300"
                onClick={handleIncreaseQuantity}
              >
                <AiOutlinePlus className="text-xl" />
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              className="w-full py-4 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xl font-bold shadow-lg hover:opacity-90 transition-all"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Product Description Section */}
        <div className="mt-12 p-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl shadow-md">
          <h2 className="text-3xl font-bold mb-6">Product Description</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
