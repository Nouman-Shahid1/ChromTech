import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../assets/images/logo.png";
import Title from "../../components/Title/Title.jsx";

function Footer() {
  return (
    <>
      <div
        className="text-center py-8"
        style={{ background: "linear-gradient(to right, #FAF8F6, #C7B299)" }}
      >
        <Title text1={"Stay Connected And Stay Ahead"} />
        <p className="py-8 px-2 flex flex-wrap m-auto text-xs w-full max-w-[700px] md:text-sm">
          Subscribe to Chromatography Connections for a monthly update from our
          team of product specialists. Each month, we’ll send updates about the
          latest chromatography trends, our best deals, and product spotlights.
        </p>
        <div className="bg-white flex w-[300px] sm:min-w-[400px]  mx-auto border border-black sm:mx-auto px-8 mb-8 rounded-full justify-between">
          <input
            className="border-none outline-none py-3"
            type="email"
            placeholder="Enter Your Email Address"
          />
          <button className="outline-none text-xs sm:text-sm cursor-pointer py-3 pl-1 md:pl-4 border-l border-black">
            Subscribe
          </button>
        </div>
      </div>
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <div className="flex flex-col items-start space-y-4">
              <Image src={Logo} alt="Chrom Tech Logo" width={300} height={80} />
              <p className="text-gray-400 text-[17px]">
                5995 149th St W #102
                <br />
                Apple Valley, MN 55124
              </p>
              <a
                href="mailto:sales@chromtech.com"
                className="text-gray-400 hover:text-gray-200 block"
              >
                sales@chromtech.com
              </a>
              <p className="text-gray-400">📞 9524316000</p>
            </div>
          </div>

          <div className="col-span-2 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-white font-semibold text-xl mb-4">
                Categories
              </h4>
              <ul className="space-y-1">
                <li>
                  <Link href="#">
                    <span className="hover:text-gray-200">
                      Vials & 96-Well Plates
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <span className="hover:text-gray-200">LC</span>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <span className="hover:text-gray-200">GC</span>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <span className="hover:text-gray-200">Instrumentation</span>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <span className="hover:text-gray-200">Syringes</span>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <span className="hover:text-gray-200">
                      Sample Preparation
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold text-xl mb-4">
                Information
              </h4>
              <ul className="space-y-1">
                <li>
                  <Link href="#">
                    <span className="hover:text-gray-200">
                      Shop All Categories
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <span className="hover:text-gray-200">About Us</span>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <span className="hover:text-gray-200">Blog</span>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <span className="hover:text-gray-200">Careers</span>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <span className="hover:text-gray-200">Contact Us</span>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <span className="hover:text-gray-200">
                      Conditions of Use
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <span className="hover:text-gray-200">
                      Payment & Sales Tax
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <span className="hover:text-gray-200">Privacy Policy</span>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <span className="hover:text-gray-200">Resources</span>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <span className="hover:text-gray-200">
                      Shipping & Returns
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <span className="hover:text-gray-200">Sitemap</span>
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold text-xl mb-4">Brands</h4>
              <ul className="space-y-1">
                <li>
                  <Link href="#">
                    <span className="hover:text-gray-200">Agilent</span>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <span className="hover:text-gray-200">Restek</span>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <span className="hover:text-gray-200">
                      Idex Health and Science
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <span className="hover:text-gray-200">Hamilton</span>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <span className="hover:text-gray-200">Chrom Tech</span>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <span className="hover:text-gray-200">SGE/Trajan</span>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <span className="hover:text-gray-200">
                      Thermo Fisher Scientific
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <span className="hover:text-gray-200">Imtakt</span>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <span className="hover:text-gray-200">ASI</span>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <span className="hover:text-gray-200">View All</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-500 mt-8 border-t border-gray-700 pt-4">
          © 2024 Chrom Tech, Inc.
        </div>
      </footer>
    </>
  );
}

export default Footer;
