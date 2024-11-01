import React from "react";
import Link from "next/link";
import logo from "../../assets/images/logobg.png";
function Footer() {
  return (
    <>
      <div className="  py-16 bg-gradient-to-t from-black to-[#121417]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-8">
          <div className="w-[92%]">
            <h2 className="text-lg font-bold text-blue-500 mb-2">
              Schedule a Call
            </h2>
            <h3 className="text-4xl font-bold mb-4 text-white">
              Book Your Free Consultation Call
            </h3>
            <p className="mb-8 text-[#8c97ab] mt-8">
              At The WebCraft Solutions Limited, we specialize in IT consulting,
              web development, mobile app development, custom software
              development, and digital transformation. Our team of seasoned
              experts is dedicated to helping businesses like yours thrive in
              the digital age.
            </p>
            <p className="mb-8 text-[#8c97ab]">
              Schedule a free consultation call today and discover how our
              comprehensive services can elevate your business. Whether you need
              Shopify or WordPress solutions, cybersecurity measures, or
              AI-powered tools, we are here to support your goals and drive your
              success.
            </p>
            <p className="mb-8 text-[#8c97ab]">
              Let us provide tailored strategies and innovative solutions to
              meet your unique business needs. Our commitment to quality and
              customer satisfaction ensures that you will receive the best
              possible service.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-blue-500 mb-2">
              Get Started
            </h2>
            <h3 className="text-4xl font-bold mb-4 text-white">
              Schedule Your Free Call Now
            </h3>
            <div className="bg-white text-black rounded-lg shadow-lg">
              <div className="flex items-center justify-center p-8 md:p-12">
                <div className="mx-auto w-full max-w-[550px] bg-white">
                  <form>
                    <div className="mb-5">
                      <label
                        htmlFor="name"
                        className="mb-3 block text-base font-medium text-[#07074D]"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Full Name"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#0d6efd] focus:shadow-md"
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="phone"
                        className="mb-3 block text-base font-medium text-[#07074D]"
                      >
                        Phone Number
                      </label>
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        placeholder="Enter your phone number"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#0d6efd] focus:shadow-md"
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="email"
                        className="mb-3 block text-base font-medium text-[#07074D]"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your email"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#0d6efd] focus:shadow-md"
                      />
                    </div>
                    <div className="-mx-3 flex flex-wrap">
                      <div className="w-full px-3 sm:w-1/2">
                        <div className="mb-5">
                          <label
                            htmlFor="date"
                            className="mb-3 block text-base font-medium text-[#07074D]"
                          >
                            Date
                          </label>
                          <input
                            type="date"
                            name="date"
                            id="date"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#0d6efd] focus:shadow-md"
                          />
                        </div>
                      </div>
                      <div className="w-full px-3 sm:w-1/2">
                        <div className="mb-5">
                          <label
                            htmlFor="time"
                            className="mb-3 block text-base font-medium text-[#07074D]"
                          >
                            Time
                          </label>
                          <input
                            type="time"
                            name="time"
                            id="time"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#0d6efd] focus:shadow-md"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="description"
                        className="mb-3 block text-base font-medium text-[#07074D]"
                      >
                        Description
                      </label>
                      <textarea
                        name="description"
                        id="description"
                        placeholder="Enter your description"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#0d6efd] focus:shadow-md"
                      ></textarea>
                    </div>
                    <div>
                      <button className="hover:shadow-form w-full rounded-md bg-[#0d6efd] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                        Book Appointment
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-[#121417]" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8">
              <img
                className="h-20"
                src={logo.src}
                alt="The WebCraft Solutions Limited"
              />
              <p className="text-sm leading-6 text-white">
                Crafting innovative web solutions tailored to your business
                needs.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-yellow-500 hover:text-gray-500">
                  <span className="sr-only">the team is on fire</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.074.945A4.993 4.993 0 0 0 6 5v.032c.004.6.114 1.176.311 1.709.16.428-.204.91-.61.7a5.023 5.023 0 0 1-1.868-1.677c-.202-.304-.648-.363-.848-.058a6 6 0 1 0 8.017-1.901l-.004-.007a4.98 4.98 0 0 1-2.18-2.574c-.116-.31-.477-.472-.744-.28Zm.78 6.178a3.001 3.001 0 1 1-3.473 4.341c-.205-.365.215-.694.62-.59a4.008 4.008 0 0 0 1.873.03c.288-.065.413-.386.321-.666A3.997 3.997 0 0 1 8 8.999c0-.585.126-1.14.351-1.641a.42.42 0 0 1 .503-.235Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400">
                  <span className="sr-only">X</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path d="M2.75 2a.75.75 0 0 0-.75.75v10.5a.75.75 0 0 0 1.5 0v-2.624l.33-.083A6.044 6.044 0 0 1 8 11c1.29.645 2.77.807 4.17.457l1.48-.37a.462.462 0 0 0 .35-.448V3.56a.438.438 0 0 0-.544-.425l-1.287.322C10.77 3.808 9.291 3.646 8 3a6.045 6.045 0 0 0-4.17-.457l-.34.085A.75.75 0 0 0 2.75 2Z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">GitHub</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">YouTube</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold leading-6 text-white">
                    Company
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    <li>
                      <Link
                        href="/"
                        className="text-sm leading-6 text-gray-400 hover:text-white"
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/about"
                        className="text-sm leading-6 text-gray-400 hover:text-white"
                      >
                        About
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/reviews"
                        className="text-sm leading-6 text-gray-400 hover:text-white"
                      >
                        Reviews
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/careers"
                        className="text-sm leading-6 text-gray-400 hover:text-white"
                      >
                        Careers
                      </Link>
                    </li>

                    <li>
                      <Link
                        href="/contact"
                        className="text-sm leading-6 text-gray-400 hover:text-white"
                      >
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm font-semibold leading-6 text-white">
                    Services & Solutions
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    <li>
                      <Link
                        href="/services/web-development"
                        className="text-sm leading-6 text-gray-400 hover:text-white"
                      >
                        Web Development
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services/mobile-app-development"
                        className="text-sm leading-6 text-gray-400 hover:text-white"
                      >
                        Mobile App Development
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services/generative-ai"
                        className="text-sm leading-6 text-gray-400 hover:text-white"
                      >
                        Generative AI
                      </Link>
                    </li>
                    <li>
                      <a
                        href="/services/custom-development"
                        className="text-sm leading-6 text-gray-400 hover:text-white"
                      >
                        Custom Development
                      </a>
                    </li>
                    <li>
                      <Link
                        href="/services/microsoft-dynamics-365-business-solutions"
                        className="text-sm leading-6 text-gray-400 hover:text-white"
                      >
                        Microsoft Dynamics 365
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services/cybersecurity-solutions"
                        className="text-sm leading-6 text-gray-400 hover:text-white"
                      >
                        Cybersecurity Solutions
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services/quality-assurance"
                        className="text-sm leading-6 text-gray-400 hover:text-white"
                      >
                        QA Testing
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services/digital-transformation"
                        className="text-sm leading-6 text-gray-400 hover:text-white"
                      >
                        Digital Transformation
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services/cloud-services"
                        className="text-sm leading-6 text-gray-400 hover:text-white"
                      >
                        Cloud Services
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services/business-process-outsourcing"
                        className="text-sm leading-6 text-gray-400 hover:text-white"
                      >
                        BPO
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold leading-6 text-white">
                    Resources
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    <li>
                      <Link
                        href="/case-studies"
                        className="text-sm leading-6 text-gray-400 hover:text-white"
                      >
                        Case Studies
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/learning"
                        className="text-sm leading-6 text-gray-400 hover:text-white"
                      >
                        Learning
                      </Link>
                    </li>

                    <li>
                      <a
                        href="#"
                        className="text-sm leading-6 text-gray-400 hover:text-white"
                      >
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm leading-6 text-gray-400 hover:text-white"
                      >
                        Terms of Service
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm font-semibold leading-6 text-white">
                    Contact Us
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    <li>
                      <a
                        href="mailto:info@webcraftsolutions.com"
                        className="text-sm leading-6 text-gray-400 hover:text-white"
                      >
                        info@webcraftsolutions.com
                      </a>
                    </li>
                    <li>
                      <a
                        href="tel:+1234567890"
                        className="text-sm leading-6 text-gray-400 hover:text-white"
                      >
                        +1 234 567 890
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm leading-6 text-gray-400 hover:text-white"
                      >
                        Office Locations
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16 pt-8 sm:mt-20 lg:mt-24">
            <div className="sm:flex sm:items-center sm:justify-between">
              <p className="text-xs leading-5 text-gray-500">
                &copy; 2024 The WebCraft Solutions Limited. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
