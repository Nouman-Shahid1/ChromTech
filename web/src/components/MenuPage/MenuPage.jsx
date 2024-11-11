import React from "react";
import Title from "../Title/Title";
import CategoryCard from "../CategoryCard/CategoryCard";

const MenuPage = ({
  data,
  breadcrumbText,
  descriptionTitle,
  descriptionText,
  titleText
}) => {
  return (
    <div className="pt-[220px] w-[75%] m-auto">
      {/* Breadcrumb Text */}
      <p className="text-gray-400 py-8">{breadcrumbText}</p>

      {/* Page Title */}
      <Title text1={titleText} />

      {/* Category Cards */}
      <div className="flex gap-5 py-3 flex-col sm:flex-row">
        {data.map((item, index) => (
          <CategoryCard
            key={index}
            title={item.title}
            img={item.img}
            subTitle={item.subTitle}
          />
        ))}
      </div>

      {/* Description Section */}
      <div className="py-6">
        <p
          className="font-bold pb-3 text-lg sm:text-xl md:text-2xl lg:text-3xl"
          style={{ color: "#4e4e4e" }}
        >
          {descriptionTitle}
        </p>
        <p>{descriptionText}</p>
      </div>
    </div>
  );
};

export default MenuPage;
