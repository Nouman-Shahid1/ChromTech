"use client";
import React, { useEffect, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "@/reducers/Category/categorySlice";
import Link from "next/link";
import Title from "@/components/Title/Title.jsx";
import CategoryCard from "@/components/CategoryCard/CategoryCard.jsx";

const Navbar = dynamic(() => import("../components/Navbar/Navbar.jsx"), {
  ssr: false,
});
const Footer = dynamic(() => import("../components/Footer/Footer.jsx"), {
  ssr: false,
});
const Chatbot = dynamic(() => import("../components/Chatbot/Chatbot.jsx"), {
  ssr: false,
});
const TestimonialCard = dynamic(
  () => import("../components/TestimonialCard/Testimonialcard.jsx"),
  { ssr: false }
);

export default function Home() {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category);

  const testimonials = useMemo(
    () => [
      {
        testimonial:
          "The sales team at Chrom Tech has a tremendous knowledge base.",
        author: "Specialists that are critical to the success of my work",
        starImage:
          "https://cdn11.bigcommerce.com/s-czhvm5lnv4/images/stencil/original/image-manager/fivestars.png",
        commaImage:
          "https://cdn11.bigcommerce.com/s-czhvm5lnv4/images/stencil/original/image-manager/commas.png",
      },
      {
        testimonial: "Chrom Tech’s products have boosted our lab’s efficiency.",
        author: "Increased Efficiency with Exceptional Support",
        starImage:
          "https://cdn11.bigcommerce.com/s-czhvm5lnv4/images/stencil/original/image-manager/fivestars.png",
        commaImage:
          "https://cdn11.bigcommerce.com/s-czhvm5lnv4/images/stencil/original/image-manager/commas.png",
      },
      {
        testimonial: "Working with Chrom Tech has been a game changer for us.",
        author: "Game-Changing Partnership",
        starImage:
          "https://cdn11.bigcommerce.com/s-czhvm5lnv4/images/stencil/original/image-manager/fivestars.png",
        commaImage:
          "https://cdn11.bigcommerce.com/s-czhvm5lnv4/images/stencil/original/image-manager/commas.png",
      },
    ],
    []
  );

  // Fetch categories once
  useEffect(() => {
    if (!categories || categories.length === 0) {
      dispatch(getCategories());
    }
  }, [dispatch, categories]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }
  return (
    <>
      <Navbar hasHeadline={true} />
      <div className="h-[650px] md:h-[330px] w-full -z-50 py-[190px]">
        <div className="bg-no-repeat py-16 h-[450px]  bg-[url('../assets/images/bannerimg.png')] bg-right">
          <div className="w-[75%] mx-auto text-black py-8 md:space-y-4 pt-[400px] md:text-white md:pt-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
              Chromatography Success Starts Here
            </h1>
            <div className="text-lg md:text-2xl font-medium leading-relaxed max-w-md">
              <p>
                Buy from chromatography specialists so you can focus on
                breakthroughs instead of breaking away from your research
              </p>
            </div>
            <Link href="/login" passHref>
              <p className="inline-block border border-red-500 rounded-lg px-6 py-3 text-red-500 text-lg cursor-pointer mt-4 hover:bg-white hover:text-red-600 transition-colors md:text-white md:border-white">
                SIGN IN / SIGN UP
              </p>
            </Link>
          </div>
        </div>
      </div>
      <section className="mt-64">
        <div className="text-center pt-[50px] text-3xl">
          <Title text1={"Featured Categories"} />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 w-[75%] p-auto md:w-[80%] lg:w-[75%] m-auto pt-8">
            {Array.isArray(categories) &&
              categories
                .filter(
                  (category) => category.image && category.image.trim() !== ""
                )
                .slice(0, 10)
                .map((category) => (
                  <CategoryCard
                    key={category._id || category.name}
                    title={category.name || "Unnamed Category"}
                    img={`http://localhost:5000/uploads/${category.image
                      .split("\\")
                      .pop()}`}
                    subTitle={category.subtitle || "No subtitle available"}
                  />
                ))}
          </div>

          <div className="my-16 text-center">
            <Link
              href="/shop-all-category"
              className=" text-white py-3 px-7 text-xl rounded-lg"
              style={{ backgroundColor: "#FF0000" }}
            >
              <strong> SHOW ALL CATEGORIES</strong>
            </Link>
          </div>
        </div>
      </section>
      <div className="h-[950px] md:h-[600px] lg:h-[500px] xl:h-[500px] mt-20">
        <div className="h-[380px] bg-no-repeat bg-cover bg-[url('../assets/images/bannerimg2.png')] bg-right md:bg-center">
          <Link href="/">
            <div className="w-[90%] sm:w-[85%] md:w-[75%] mx-auto py-8 space-y-4 text-black pt-[400px] md:text-white md:pt-6">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light">
                Chromatography Success Starts Here
              </h1>
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-relaxed max-w-md">
                <p>
                  Buy from chromatography specialists so you can focus on
                  breakthroughs instead of breaking away from your research
                </p>
              </div>
              <p className="inline-block rounded-lg px-6 sm:px-8 md:px-10 py-2 sm:py-3 text-base sm:text-lg md:text-xl cursor-pointer mt-4 bg-gray-800 text-white">
                <strong>About</strong>
              </p>
            </div>
          </Link>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 shadow-2xl items-center mt-[-10px] p-4 sm:p-6 md:p-8 rounded-md bg-white w-[90%] sm:w-[85%] md:w-[75%] mx-auto xxl:h-[120px]">
            <div className="text-sm sm:text-base md:text-md flex items-center pt-4 sm:pt-6 md:pt-8 xl:pt-2 ">
              <img
                src="https://cdn11.bigcommerce.com/s-czhvm5lnv4/images/stencil/original/image-manager/icon-proactive-ordering.png"
                className="w-10 sm:w-12 md:w-14 mr-4"
                alt=""
              />
              <div>
                <p className="px-2 sm:px-4">
                  <strong>PRODUCT SELECTION GUIDANCE</strong>
                </p>
                <Link href="/" className="px-2 sm:px-4 underline">
                  Start here
                </Link>
              </div>
            </div>
            <div className="text-sm sm:text-base md:text-md flex items-center pt-4 sm:pt-6 md:pt-8 xl:pt-2 w-full md:w-auto">
              <img
                src="https://cdn11.bigcommerce.com/s-czhvm5lnv4/images/stencil/original/image-manager/icon-nerds.png"
                className="w-10 sm:w-12 md:w-14 mr-4"
                alt=""
              />
              <div>
                <p className="px-2 sm:px-4">
                  <strong>ELEVATED CUSTOMER EXPERIENCE</strong>
                </p>
                <Link href="/" className="px-2 sm:px-4 underline">
                  Contact us
                </Link>
              </div>
            </div>
            <div className="text-sm sm:text-base md:text-md flex items-center pt-4 sm:pt-6 md:pt-8 xl:pt-2 w-full md:w-auto">
              <img
                src="https://cdn11.bigcommerce.com/s-czhvm5lnv4/images/stencil/original/image-manager/icon-timelines.png"
                className="w-10 sm:w-12 md:w-14 mr-4"
                alt=""
              />
              <div>
                <p className="px-2 sm:px-4">
                  <strong>CONVENIENT ONLINE ORDERING</strong>
                </p>
                <Link href="/" className="px-2 sm:px-4 underline">
                  Register Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[90%] md:w-[80%] lg:w-[75%] m-auto mt-0 md:mt-28">
        <div className="text-red-500 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold  my-4">
          TESTIMONIAL
        </div>
        <Title text1="Our Customer Say" />

        <div className="flex gap-8 pt-6 flex-wrap  lg:flex-nowrap">
          {testimonials.map((testimonialData, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonialData.testimonial}
              author={testimonialData.author}
              starImage={testimonialData.starImage}
              commaImage={testimonialData.commaImage}
            />
          ))}
        </div>
      </div>
      <div className="text-center py-20 flex flex-col justify-center md:justify-start">
        <Title text1={"Manufacture"} />
        <div className="grid grid-cols-1 md:grid-cols-2 mt-4 lg:grid-cols-3 gap-4 w-[75%] mx-auto py-8">
          <div className="w-full flex justify-center">
            <img
              src="https://cdn11.bigcommerce.com/s-czhvm5lnv4/images/stencil/original/image-manager/agilenthplogo.png?t=1700498413"
              alt=""
              className="w-[80%] h-auto md:w-full"
            />
          </div>
          <div className="w-full flex justify-center">
            <img
              src="https://cdn11.bigcommerce.com/s-czhvm5lnv4/images/stencil/original/image-manager/idexhplogo.png?t=1700498426"
              alt=""
              className="w-[80%] h-auto md:w-full"
            />
          </div>
          <div className="w-full flex justify-center">
            <img
              src="https://cdn11.bigcommerce.com/s-czhvm5lnv4/images/stencil/original/image-manager/hamiltonhplogo.png?t=1700498440"
              alt=""
              className="w-[80%] h-auto md:w-full"
            />
          </div>
          <div className="w-full flex justify-center">
            <img
              src="https://cdn11.bigcommerce.com/s-czhvm5lnv4/images/stencil/original/image-manager/justritehplogo.png?t=1700498453"
              alt=""
              className="w-[80%] h-auto md:w-full"
            />
          </div>
          <div className="w-full flex justify-center">
            <img
              src="https://cdn11.bigcommerce.com/s-czhvm5lnv4/images/stencil/original/image-manager/restekhplogo.png?t=1700498465"
              alt=""
              className="w-[80%] h-auto md:w-full"
            />
          </div>
          <div className="w-full flex justify-center">
            <img
              src="https://cdn11.bigcommerce.com/s-czhvm5lnv4/images/stencil/original/image-manager/thermofisherhplogo.jpg?t=1702961280"
              alt=""
              className="w-[80%] h-auto md:w-full"
            />
          </div>
        </div>
      </div>
      {/* Chatbot Integration */}
      <div className="fixed bottom-10 right-10">
        <Chatbot />
      </div>
      <Footer />
    </>
  );
}
