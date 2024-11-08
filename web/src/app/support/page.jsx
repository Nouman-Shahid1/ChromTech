import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import Link from "next/link";

const Support = () => {
  return (
    <div>
      <div className="background">
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
    </div>
  );
};

export default Support;
