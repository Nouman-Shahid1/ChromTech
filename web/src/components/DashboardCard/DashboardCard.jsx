import Link from "next/link";
import Image from "next/image";

const DashboardCard = ({ details }) => {
  const { name, src } = details;
  const dynamicLink = name
    ? `/myaccount/${name.toLowerCase().replace(/\s+/g, "-")}`
    : "/myaccount";
  return (
    <>
      <Link href={dynamicLink} passHref className="w-full md:w-1/2 ">
        <div className="md:mt-0 mt-8 me-4 transition ml-0 duration-300 ease-in-out transform shadow hover:ring-4 hover:ring-teal-600 bg-white rounded-[32px] px-4 md:px-8 py-4 md:py-6">
          <div className="justify-between items-center">
            <div className="md:pr-4 flex items-center justify-between">
              <h2 className="font-poppinsmedium font-normal text-lg text-[#1E1E1E] md:text-2xl">
                Total {name}
              </h2>
              <Image
                src={src}
                alt=""
                height={64}
                width={64}
                className="w-10 h-10 sm:w-10 sm:h-10 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-16 xl:h-16"
              />
            </div>
            <div className="md:mt-0 flex items-center justify-between">
              <div className="flex gap-4 mt-4 md:mt-16">
                <Link
                  href={dynamicLink}
                  passHref
                  className="cursor-pointer flex gap-4"
                >
                  <p className="font-poppinsmedium font-medium text-base md:text-xl text-[#078C89] mb-4">
                    View All
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 md:w-8 md:h-8 text-[#078C89]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default DashboardCard;
