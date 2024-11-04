import React from "react";

const ServiceCard = ({ imgSrc, title, description }) => {
  return (
    <div className="w-full sm:w-1/2 lg:w-1/3 h-auto flex flex-col justify-center items-center border border-red-500 m-3 p-4 sm:p-6 lg:p-10 rounded-xl space-y-4 text-center mt-8 sm:mt-10 lg:mt-14">
      <img
        src={imgSrc}
        alt="Service"
        className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 object-cover"
      />
      <h3 className="text-red-600 text-lg sm:text-xl lg:text-2xl p-2 sm:p-3 lg:p-4">
        {title}
      </h3>
      <span className="text-black text-sm sm:text-base lg:text-lg px-2">
        {description}
      </span>
    </div>
  );
};

export default ServiceCard;
