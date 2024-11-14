import React from "react";
import { useMyContext } from "@/ContextApi/store";

const ProductCard = ({ product }) => {
  if (!product) {
    return null; // Return null if the product is undefined
  }

  const { name, imageUrl, price, description } = product;

  const { addToCart } = useMyContext();

  return (
    <div className="w-[230px] sm:w-[280px] h-[350px] overflow-hidden flex flex-wrap flex-col m-auto">
      <div className="rounded-3xl my-4 py-4 h-[230px] group hover:h-auto bg-white border border-gray-300 m-auto w-full flex justify-center flex-col">
        <div className="mx-auto w-[150px] h-[200px]">
          <img
            src={imageUrl || "https://via.placeholder.com/200"}
            width={"100%"}
            height={'190px'}
            // alt={name || "Product Image"}
          />
        </div>
        <div className="flex pt-8 px-4 justify-between hidden group-hover:block">
          <div className="border border-black p-1 text-sm cursor-pointer text-center">
            Quick View
          </div>
          <div
            className="bg-black border border-black text-white text-sm cursor-pointer mt-2 text-center p-1"
            onClick={() => addToCart(product)}
          >
            Add To Cart
          </div>
        </div>
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
