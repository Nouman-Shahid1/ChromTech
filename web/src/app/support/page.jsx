import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import Link from "next/link";
import AboutUs from "../about-us/page";
import Footer from "@/components/Footer/Footer";

const Support = () => {
  return (
    <div>
      <div className="background ">
        <Navbar />
        <div className="w-full h-screen flex justify-center items-center flex-col ">
          <h1 className="text-4xl font-bold text-white mt-20 ">
            Quick responses, timely deliveries, expert assistance.
          </h1>
          <Link href="/contact-us" className="mt-10">
            <span className="text-xl font-bold bg-white p-4  hover:bg-gray-300 ">
              CONTACT US
            </span>
          </Link>
        </div>
      </div>
      <div className="flex justify-center items-center mt-4 mb-4">
        <div className="w-[30%] h-[550px] flex justify-center items-center flex-col bgAboutus ">
          <h1 className="text-4xl font-bold text-white mt-28 p-4 text-center">
            Your Chromatography Experts
          </h1>
          {/* <hr className="mt-4 mb-4 font-bold" /> */}
          <span className="text-white  text-xl">
            <i>Empowering Laboratories Since 1983</i>
          </span>
          <Link href="/about-us" className="mt-14">
            <span className="text-xl font-bold border border-white p-3 pl-28 pr-28 text-white hover:bg-white hover:text-black">
              ABOUT US
            </span>
          </Link>
        </div>
        <div className="w-[30%] h-[550px] flex justify-center items-center flex-col bgBlog">
          <h1 className="text-4xl font-bold text-white mt-28 p-4 text-center">
            Explore the World of Chromatography
          </h1>
          {/* <hr className="mt-4 mb-4 font-bold" /> */}
          <span className="text-white  text-xl">
            <i>Stay Ahead in the Science of Separation</i>
          </span>
          <Link href="/blog" className="mt-14">
            <span className="text-xl font-bold border border-white p-3 pl-28 pr-28 text-white hover:bg-white hover:text-black">
              BLOG
            </span>
          </Link>
        </div>
        <div className="w-[30%] h-[550px] flex justify-center items-center flex-col bgResources">
          <h1 className="text-4xl font-bold text-white mt-28 p-4 text-center">
            Chrom Tech Resource Center
          </h1>
          {/* <hr className="mt-4 mb-4 font-bold" /> */}
          <span className="text-white  text-xl">
            <i>Explore for Seamless Solutions</i>
          </span>
          <Link href="/resources" className="mt-14">
            <span className="text-xl font-bold border border-white p-3 pl-28 pr-28 text-white hover:bg-white hover:text-black">
              ABOUT US
            </span>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Support;
