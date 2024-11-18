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

  const [position, setPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100; // Calculate X percentage
    const y = ((e.clientY - top) / height) * 100; // Calculate Y percentage
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setZoom(false);
  };

  if (!product) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="container mt-10 mx-auto pb-6 pt-64 px-6">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          {/* Image Gallery Section */}
          <div className="h-[350px] md:h-full md:w-[300px] lg:mx-auto">
            <div
              className="w-full lg:w-[500px]  overflow-hidden"
              onMouseMove={handleMouseMove}
            >
              <img
               src={selectedImage}
               alt={product.name}
                className=" w-[200px] h-[200px]  md:h-full mx-auto object-cover transition-transform duration-300 hover:scale-150"
                style={{
                  transformOrigin: `${position.x}% ${position.y}%`
                }}
              />
            </div>
            <div className="mx-auto my-6 w-full">
              <img
                src={product.imageUrl}
                alt="Thumbnail"
                className="w-24 h-24 object-cover rounded-lg cursor-pointer border-2 hover:border-blue-500"
                onClick={() => setSelectedImage(product.imageUrl)}
              />
            </div>
          </div>

          {/* Product Info Section */}
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-xl md:text-2xl xl:text-3xl font-extrabold mb-4">{product.name}</h1>
            <p className="text-lg text-gray-600">{product.sku}</p>
            <p className="text-2xl font-semibold text-gray-800">
              ${product.price.toLocaleString()}
            </p>
            <p className="text-lg">{product.description}</p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-6">
              <button
                className="bg-gray-200 p-2 md:p-3 rounded-full hover:bg-gray-300"
                onClick={handleDecreaseQuantity}
              >
                <AiOutlineMinus className="text-xl" />
              </button>
              <span className="text-xl md:text-2xl font-medium">{quantity}</span>
              <button
                className="bg-gray-200 p-2 md:p-3 rounded-full hover:bg-gray-300"
                onClick={handleIncreaseQuantity}
              >
                <AiOutlinePlus className="text-xl" />
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              className="w-[200px] md:w-full py-2 md:py-4 rounded-lg bg-black text-white text-lg md:text-xl font-bold shadow-lg hover:opacity-90 transition-all"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Product Description Section */}
        <div className="mt-12 p-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl shadow-md">
          <h2 className="text-lg md:text-3xl font-bold mb-6">Product Description</h2>
          <p className="text-md md:text-lg text-gray-700 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
