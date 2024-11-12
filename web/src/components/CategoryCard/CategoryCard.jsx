import React from "react";

const CategoryCard = ({ title, img, subTitle }) => {
  return (
    <>
      <div
        className="w-[200px] h-[300px] flex flex-col justify-between items-center text-center rounded-lg py-4 my-3 mx-auto sm:mx-0 hover:border border-red-500"
        style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.7)" }}
      >
        {/* Title */}
        <p className="my-2 text-sm font-bold">{title}</p>

        {/* Image */}
        <div className="w-[80%] flex-1 flex items-center justify-center ">
          <img className="max-h-[120px]" src={img} width="80%" alt={title} />
        </div>

        {/* Subtitle */}
        <p className="mt-2 text-sm">{subTitle}</p>
      </div>
    </>
  );
};

export default CategoryCard;
