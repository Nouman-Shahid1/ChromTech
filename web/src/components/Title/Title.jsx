import React from "react";

const Title = ({ text1 }) => {
  return (
    <div className="mb-3 text-center">
      <h1
        className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
        style={{ color: "#4e4e4e" }}
      >
        {text1}
      </h1>
    </div>
  );
};

export default Title;
