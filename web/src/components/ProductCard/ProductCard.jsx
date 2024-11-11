import React from "react";

const ProductCard = ({ product }) => {
  const { name, imageUrl, price, description } = product;

  return (
    <div className="w-[230px] sm:w-[290px] flex flex-wrap m-auto">
      <div className="rounded-3xl my-4 py-4 bg-white border border-gray-300 m-auto w-full flex justify-center">
        <img
          src={imageUrl || "https://via.placeholder.com/200"}
          width={"60%"}
          alt={name || "Product Image"}
        />
      </div>
      <p className="text-sm text-red-500">
        <strong>{name || "Product Name"}</strong>
      </p>
      <p className="text-gray-500">
        {price ? `$${price}` : "Price not available"}
      </p>
      <p className="text-gray-500">
        {description || "No description available"}
      </p>
    </div>
  );
};

export default ProductCard;
