import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import Link from "next/link";
import AboutUs from "../about-us/page";
import Footer from "@/components/Footer/Footer";

const Support = () => {
  return (
    <div>
      <div className="background mt-[30px] ">
        <Navbar />
        <div className="w-full h-screen flex justify-center items-center flex-col px-4">
          <p className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-white mt-20  ">
            Quick responses, timely deliveries, expert assistance.
          </p>
          <Link href="/contact-us" className="mt-10">
            <span className="text-lg md:text-xl font-bold bg-white p-3 md:p-4  hover:bg-gray-300 ">
              CONTACT US
            </span>
          </Link>
        </div>
      </div>
      <div className="w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 justify-items-center items-center mt-4 mb-4">
        
          <div className="w-[300px] sm:w-[400px] h-[550px] flex justify-center items-center flex-col bgAboutus">
            <h1 className="h-[150px] text-2xl sm:text-4xl font-bold text-white mt-28 p-4 text-center">
              Your Chromatography Experts
            </h1>
            <span className="text-white text-md">
              <i>Empowering Laboratories Since 1983</i>
            </span>
            <Link href="/about-us" className="mt-14">
              <span className="text-xl font-bold border border-white px-8 py-4 text-white hover:bg-white hover:text-black">
                ABOUT US
              </span>
            </Link>
        </div>

        <div className="w-[300px] sm:w-[400px] h-[550px] flex justify-center items-center flex-col bgBlog">
          <h1 className="h-[150px] text-2xl sm:text-4xl font-bold text-white mt-28 p-4 text-center">
            Explore the World of Chromatography
          </h1>
          <span className="text-white text-xl">
            <i>Stay Ahead in the Science of Separation</i>
          </span>
          <Link href="/blog" className="mt-14">
            <span className="text-xl font-bold border border-white px-8 py-4 text-white hover:bg-white hover:text-black">
              BLOG
            </span>
          </Link>
        </div>

        <div className="w-[300px] sm:w-[400px] h-[550px] flex justify-center items-center flex-col bgResources">
          <h1 className="h-[150px] text-2xl sm:text-4xl font-bold text-white mt-28 p-4 text-center">
            Chrom Tech Resource Center
          </h1>
          <span className="text-white text-xl">
            <i>Explore for Seamless Solutions</i>
          </span>
          <Link href="/resources" className="mt-14">
            <span className="text-xl font-bold border border-white px-8 py-4 text-white hover:bg-white hover:text-black">
              RESOURCES
            </span>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Support;
