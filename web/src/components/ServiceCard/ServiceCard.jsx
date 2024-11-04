import React from 'react';

const ServiceCard = ({ imgSrc, title, description }) => {
  return (
    <div className="w-1/3 h-[420px] flex justify-center items-center flex-col border border-red-500 m-3 p-10 rounded-xl space-y-4 text-center mt-14">
      <img src={imgSrc} alt="img" />
      <h3 className="text-red-600 text-2xl p-4">{title}</h3>
      <span className="text-black">{description}</span>
    </div>
  );
};

export default ServiceCard;
