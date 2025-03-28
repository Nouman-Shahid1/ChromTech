import React from "react";
import { useRouter } from "next/navigation";
import Title from "../Title/Title";
import CategoryCard from "../CategoryCard/CategoryCard";

const MenuPage = ({
  data,
  breadcrumbText,
  descriptionTitle,
  descriptionText,
  titleText,
}) => {
  const router = useRouter();

  // Navigate to the category page when clicked
  const handleCategoryClick = (categoryName) => {
    router.push(`/category/${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="pt-[220px] w-[75%] m-auto">
      {/* Breadcrumb Text */}
      <p className="text-gray-400 py-8">{breadcrumbText}</p>

      {/* Page Title */}
      <Title text1={titleText} />

      {/* Category Cards */}
      <div className="grid md:flex md:gap-5 grid-cols-1 sm:grid-cols-2 ">
        {data.map((item, index) => (
          <div
            key={index}
            className="cursor-pointer"
            onClick={() => handleCategoryClick(item.title)}
          >
            <CategoryCard
              title={item.title}
              img={item.img}
              subTitle={item.subTitle}
            />
          </div>
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
