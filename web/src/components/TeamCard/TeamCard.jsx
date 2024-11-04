import React from "react";

const TeamCard = ({ imgSrc, name, position }) => {
  return (
    <div className="w-full sm:w-1/2 lg:w-1/3 h-auto border rounded-3xl flex flex-col justify-center items-center shadow-md m-4 p-6 sm:p-8 space-y-4">
      <img
        src={imgSrc}
        alt={name}
        className="rounded-full w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 mb-4 object-cover"
      />
      <h1 className="font-bold text-red-600 text-lg sm:text-xl lg:text-2xl">
        {name}
      </h1>
      <span className="text-gray-400 text-sm sm:text-base lg:text-lg">
        {position}
      </span>
    </div>
  );
};

export default TeamCard;
