import React from "react";

const TeamCard = ({ imgSrc, name, position }) => {
  return (
    <div className="w-1/3 h-[450px] border rounded-3xl flex justify-center items-center flex-col shadow-md m-4">
      <img src={imgSrc} alt={name} className="rounded-full w-24 h-24 mb-4" />
      <h1 className="font-bold text-red-600">{name}</h1>
      <span className="text-gray-400 text-lg">{position}</span>
    </div>
  );
};

export default TeamCard;
