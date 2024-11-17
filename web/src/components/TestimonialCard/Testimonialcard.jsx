import React from "react";

const TestimonialCard = ({ testimonial, author, starImage, commaImage }) => {
  return (
    <div className="bg-gray-200 w-[300px] md:w-[350px] lg:w-[400px] p-6 md:py-8 md:px-10 rounded-lg mx-auto">
      <img
        src={commaImage}
        className="w-8 h-8 md:w-10 md:h-10 mb-4 mx-auto"
        alt="comma icon"
      />
      <div className="text-center border-b border-gray-600 py-6 md:py-8 pb-8 md:pb-10">
        <p className="text-lg md:text-xl font-bold pb-4 md:pb-6">{author}</p>
        <p className="text-base md:text-lg">{testimonial}</p>
      </div>
      <div className="pt-4 md:pt-6 flex justify-center">
        <img src={starImage} className="w-24 md:w-28" alt="star rating" />
      </div>
    </div>
  );
};

export default TestimonialCard;
