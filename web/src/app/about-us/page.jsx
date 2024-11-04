import React from "react";
import Navbar from "../../components/Navbar/Navbar";

const AboutUs = () => {
  return (
    <div>
      <Navbar />

      <div className="w-[73%]  mx-auto mt-10 text-gray-700 ">
        <span>Home / about</span>
        <h1 className=" font-bold text-4xl mt-8">About Us</h1>
        <p className="mt-8 text-3xl font-bold text-black">
          Your Chromatography Product Specialist & Trusted Supplier
        </p>

        <img
          src="https://i.shgcdn.com/8d512b62-0c00-4ed2-81ba-d22246c9aa0c/-/format/auto/-/preview/3000x3000/-/quality/lighter/"
          alt="img"
          className="mt-10 mb-12"
        />

        <div className="flex justify-center flex-col items-center">
          <span className="w-[76%] flex justify-center items-center  font-medium ">
            Frustrated with all the time and energy you're wasting shopping for
            chromatography supplies or waiting on unresponsive vendors? Chrom
            Tech is a team of chromatography consumables specialists who
            expedite procurement so you can get back to the work that matters.
          </span>

          <h1 className=" w-[76%]  flex mt-10 text-3xl font-bold text-black  ">
            About Us
          </h1>
          <span className="w-[76%] flex justify-center items-center  font-medium mt-10">
            Since 1983, Chrom Tech has been dedicated to providing technical
            expertise in the chromatography field by recommending products to
            meet your analytical requirements. We're proud to be a worldwide
            distributor of chromatography instrumentation and supplies to
            leading labs and facilities like yours
          </span>
        </div>
      </div>
      <div className="w-full mt-16 bg-gray-100 p-8 ">
        <div className="flex justify-center items-center flex-col">
          <h1 className="text-4xl text-black">What You Can Expect</h1>
          <span className="text-2xl ">Our Promises To You</span>
        </div>
        <div className="flex flex-wrap justify-center items-center ">
          <div className="w-1/3 h-[420px] flex justify-center items-center flex-col border border-red-500 m-3 p-10 rounded-xl space-y-4 text-center mt-14">
            <img
              src="https://i.shgcdn.com/a943e112-5d6d-416c-b3c5-a1a18b1f305f/"
              alt="img"
            />
            <h3 className="text-red-600 text-2xl p-4">
              Get the Answers You Need— Quickly!
            </h3>
            <span className="text-black ">
              We don't like waiting around for answers, so we don't expect our
              customers to either. Call Chrom Tech and you'll speak with a real
              person. We respond to chat/email inquiries within 24 hours. If we
              don't know the answer right away, your question will be excalated
              until we've resolved it.
            </span>
          </div>
          <div className="w-1/3 h-[420px] flex justify-center items-center flex-col border border-red-500 m-3 p-9 rounded-xl space-y-4 text-center mt-14">
            <img
              src="https://i.shgcdn.com/31ba760e-fbc4-478d-922a-e2e5deebf6e8/"
              alt="img"
            />
            <h3 className="text-red-600 text-2xl p-4">
              Receive Your Supplies, When You Need Them
            </h3>
            <span className="text-black ">
              You need supplies on your timeline, so we take great care to know
              what you're up against and communicate proactively to get you what
              you need
            </span>
          </div>
          <div className="w-1/3 h-[420px] flex justify-center items-center flex-col border border-red-500 m-3 p-12 rounded-xl space-y-4 text-center mt-3">
            <img
              src="https://i.shgcdn.com/f9f5e30d-9055-4d9f-9395-f0b21fa3eb9d/"
              alt="img"
            />
            <h3 className="text-red-600 text-2xl p-4">
              Anticipate Future Needs
            </h3>
            <span className="text-black ">
              With our predictive stocking and ordering, our customer service
              experts will look at your past orders and their understanding of
              your process to make stocking or ordering recommendations. We want
              to ensure that you always have what you need.
            </span>
          </div>
          <div className="w-1/3 h-[420px] flex justify-center items-center flex-col border border-red-500 m-3 p-12 rounded-xl space-y-4 text-center mt-3">
            <img
              src="https://i.shgcdn.com/9529a9a9-5eec-45c9-9ec3-f2052b1c38d4/"
              alt="img"
            />
            <h3 className="text-red-600 text-2xl p-4">
              Get Expert Assistance
            </h3>
            <span className="text-black ">
              We're here to help you solve problems. Whether you know exactly what you want to buy or if you have no clue, you can rest assured that we'll give you a straightforward and honest answer from a real person. You tell us what you're trying to accomplish, and we'll make sure you have what you need.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;