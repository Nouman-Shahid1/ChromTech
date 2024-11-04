import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import ServiceCard from "@/components/ServiceCard/ServiceCard";
import TeamCard from "@/components/TeamCard/TeamCard";

const AboutUs = () => {
  const serviceCardData = [
    {
      imgSrc: "https://i.shgcdn.com/a943e112-5d6d-416c-b3c5-a1a18b1f305f/",
      title: "Get the Answers You Need— Quickly!",
      description:
        "We don't like waiting around for answers, so we don't expect our customers to either. Call Chrom Tech and you'll speak with a real person. We respond to chat/email inquiries within 24 hours. If we don't know the answer right away, your question will be escalated until we've resolved it.",
    },
    {
      imgSrc: "https://i.shgcdn.com/31ba760e-fbc4-478d-922a-e2e5deebf6e8/",
      title: "Receive Your Supplies, When You Need Them",
      description:
        "You need supplies on your timeline, so we take great care to know what you're up against and communicate proactively to get you what you need.",
    },
    {
      imgSrc: "https://i.shgcdn.com/f9f5e30d-9055-4d9f-9395-f0b21fa3eb9d/",
      title: "Anticipate Future Needs",
      description:
        "With our predictive stocking and ordering, our customer service experts will look at your past orders and their understanding of your process to make stocking or ordering recommendations. We want to ensure that you always have what you need.",
    },
    {
      imgSrc: "https://i.shgcdn.com/9529a9a9-5eec-45c9-9ec3-f2052b1c38d4/",
      title: "Get Expert Assistance",
      description:
        "We're here to help you solve problems. Whether you know exactly what you want to buy or if you have no clue, you can rest assured that we'll give you a straightforward and honest answer from a real person. You tell us what you're trying to accomplish, and we'll make sure you have what you need.",
    },
  ];

  const teamData = [
    {
      imgSrc:
        "https://i.shgcdn.com/98578e91-c68f-4185-bbc2-7e2c6d25b843/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
      name: "MICHELLE IVERSON",
      position: "President | CEO",
    },
    {
      imgSrc:
        "https://i.shgcdn.com/212a7928-d5b5-4f9a-86e1-9be705cd78f2/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
      name: "JEANETTE MORRISON",
      position: "Director of Finance & Administration",
    },
    {
      imgSrc:
        "https://i.shgcdn.com/58baed84-630c-4943-9a12-74361b6f258f/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
      name: "Lance Iverson",
      position: "Director of Operations",
    },
    {
      imgSrc:
        "https://i.shgcdn.com/f8322c7b-1913-4410-aea3-5409718a9ace/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
      name: "LEAH SPURZEM",
      position: "Director of Customer Experience",
    },
  ];

  return (
    <div>
      <Navbar />

      <div className="w-full sm:w-11/12 lg:w-[73%] mx-auto mt-10 text-gray-700 px-4 sm:px-8">
        <span className="text-xs sm:text-sm md:text-base">Home / about</span>
        <h1 className="font-bold text-2xl sm:text-4xl mt-6 md:mt-8">
          About Us
        </h1>
        <p className="mt-4 md:mt-8 text-lg sm:text-2xl md:text-3xl font-bold text-black">
          Your Chromatography Product Specialist & Trusted Supplier
        </p>

        <img
          src="https://i.shgcdn.com/8d512b62-0c00-4ed2-81ba-d22246c9aa0c/-/format/auto/-/preview/3000x3000/-/quality/lighter/"
          alt="Chromatography Image"
          className="w-full mt-6 md:mt-10 mb-6 md:mb-12 object-cover"
        />

        <div className="flex flex-col items-center text-center space-y-6 md:space-y-10">
          <span className="w-full sm:w-4/5 md:w-[76%] text-sm sm:text-base">
            Frustrated with all the time and energy you're wasting shopping for
            chromatography supplies or waiting on unresponsive vendors? Chrom
            Tech is a team of chromatography consumables specialists who
            expedite procurement so you can get back to the work that matters.
          </span>

          <h1 className="w-full sm:w-4/5 md:w-[76%] text-2xl sm:text-3xl font-bold text-black">
            About Us
          </h1>
          <span className="w-full sm:w-4/5 md:w-[76%] text-sm sm:text-base">
            Since 1983, Chrom Tech has been dedicated to providing technical
            expertise in the chromatography field by recommending products to
            meet your analytical requirements. We're proud to be a worldwide
            distributor of chromatography instrumentation and supplies to
            leading labs and facilities like yours.
          </span>
        </div>
      </div>

      <div className="w-full mt-10 bg-gray-100 p-6 sm:p-8 lg:p-12">
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-black">
            What You Can Expect
          </h1>
          <span className="text-lg sm:text-xl md:text-2xl">
            Our Promises To You
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-6 sm:mt-10">
          {serviceCardData.map((card, index) => (
            <ServiceCard
              key={index}
              imgSrc={card.imgSrc}
              title={card.title}
              description={card.description}
              className="w-full sm:w-1/2 lg:w-1/4 p-4"
            />
          ))}
        </div>
      </div>

      <div className="w-full flex justify-center mt-8 sm:mt-12">
        <img
          src="https://i.shgcdn.com/13722dc3-3d41-4024-9ace-0271544486fa/-/format/auto/-/preview/3000x3000/-/quality/lighter/"
          alt="Team"
          className="w-full sm:w-3/4 lg:w-1/2 object-cover"
        />
      </div>

      <div className="flex flex-col items-center mt-10 sm:mt-14 text-center px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl">Meet the Team</h1>
        <p className="text-gray-500 text-base sm:text-lg md:text-xl mt-2">
          Real People Working Hard to Get You What You Need, When You Need It
        </p>
      </div>

      <div className="flex flex-wrap justify-center mt-6 sm:mt-10 gap-4">
        {teamData.map((member, index) => (
          <TeamCard
            key={index}
            imgSrc={member.imgSrc}
            name={member.name}
            position={member.position}
            className="w-full sm:w-1/2 md:w-1/4 p-4"
          />
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
