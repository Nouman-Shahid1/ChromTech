"use client";
import React, { useState, useEffect, useCallback } from "react";
import { CiSearch } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import { useSelector } from "react-redux";
import { RxCrossCircled } from "react-icons/rx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMyContext } from "@/ContextApi/store";
import dynamic from "next/dynamic";

// Lazy load heavy components
const CartSidebar = dynamic(() => import("../CartSidebar/CartSidebar"), {
  loading: () => <p>Loading cart...</p>,
});

const Navbar = ({ hasHeadline }) => {
  const { openCartBar, getTotalCount } = useMyContext();
  const [showSubNav, setShowSubNav] = useState(true);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const { user, accessToken } = useSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // Handle scroll effect for hiding/showing sub-nav
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50 && !isHamburgerOpen) {
        setShowSubNav(false);
      } else {
        setShowSubNav(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHamburgerOpen]);

  const toggleHamburger = useCallback(() => {
    setIsHamburgerOpen((prev) => !prev);
  }, []);

  // Debounced search handler
  const handleSearch = useCallback(() => {
    if (searchQuery.trim()) {
      router.push(`/search?query=${searchQuery}`);
    }
  }, [searchQuery, router]);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const closeSubNav = useCallback(() => {
    setIsHamburgerOpen(false);
    setShowSubNav(true);
  }, []);

  const handleLinkClick = useCallback(
    (path) => {
      if (typeof path === "string" && path.startsWith("/")) {
        closeSubNav();
        router.push(path);
      } else {
        console.error("Invalid path:", path);
      }
    },
    [closeSubNav, router]
  );

  return (
    <>
      <CartSidebar />
      <nav className="fixed bg-white w-full z-10">
        <div className="fixed top-0 w-full bg-red-600 text-white text-center py-2 z-20 text-sm font-light">
          <p>
            Safety First, Coffee Second: Score a FREE coffee tumbler with the
            purchase of our safety waste containment kits!
            <span>
              <strong>
                <Link href="/" prefetch className="underline">
                  <strong>SHOP NOW</strong>
                </Link>
              </strong>
            </span>
          </p>
        </div>
        <div
          className={`navbar ${hasHeadline ? "with-headline" : "no-headline"}`}
          style={{ top: hasHeadline ? "40px" : "0px", zIndex: -100 }}
        >
          <div className="main-nav">
            <div className="logo flex relative w-full md:w-auto  justify-center pt-3">
              <div
                className={`absolute -left-1 sm:left-3 md:-left-8 mt-3  top-0  hamburger  ${
                  !showSubNav ? "show" : ""
                }`}
                onClick={toggleHamburger}
                aria-label="Toggle Menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div>
                <img
                  src="https://cdn11.bigcommerce.com/s-czhvm5lnv4/images/stencil/245x80/2023chromtechlogo_1675205357__83333.original.png"
                  alt="Logo"
                  className="pl-3 sm:pl-0"
                />
              </div>
            </div>
            <div className="search-bar">
              <button
                className="search-icon"
                aria-label="Search"
                onClick={handleSearch}
              >
                <CiSearch />
              </button>
              <input
                type="text"
                placeholder="What are you looking for?"
                aria-label="Search input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            {/* <div className="header-btn">
            <Link href="">REQUEST A QUOTE</Link>
          </div> */}
            <div className=" flex cursor-pointer">
              {accessToken && user ? (
                <Link href="/myaccount" prefetch>
                  <span className="flex justify-center content-center gap-3">
                    <FaRegUser
                      style={{
                        fontSize: "25px",
                        paddingLeft: "5px",
                        paddingRight: "5px",
                        display: "inline-block",
                      }}
                    />
                    <span className="font-medium text-lg">
                      {`${user.firstName} ${user.lastName}`}
                    </span>{" "}
                  </span>
                </Link>
              ) : (
                <Link href="/login" prefetch>
                  <span>
                    <FaRegUser
                      style={{
                        fontSize: "25px",
                        paddingLeft: "5px",
                        paddingRight: "5px",
                        display: "inline-block",
                      }}
                    />
                    | Sign in or Register |
                  </span>
                </Link>
              )}
              <div className="flex ml-8" onClick={openCartBar}>
                <CiShoppingCart
                  style={{
                    fontSize: "25px",
                    paddingLeft: "5px",
                    paddingTop: "5px",
                  }}
                />
                ({getTotalCount()})
              </div>
            </div>
          </div>
        </div>
        <hr style={{ border: "1px solid lightgray" }} />

        {/* Sub-nav with conditional rendering */}
        {(showSubNav || isHamburgerOpen) && (
          <div className={`sub-nav ${isHamburgerOpen ? "active" : ""}`}>
            <div
              className="block absolute top-5 right-5 cursor pointer md:hidden "
              onClick={closeSubNav}
            >
              <RxCrossCircled style={{ fontSize: "25px", color: "wheat" }} />
            </div>
            <div className="sub-nav-menu">
              <div className=" flex border-b border-gray-700 py-4 m-5 mt-0  md:hidden">
                <div className="sub-nav-icon">
                  <FaRegUser
                    style={{
                      fontSize: "20px",
                      paddingLeft: "5px",
                      paddingTop: "3px",
                    }}
                  />
                </div>
                <div className="sub-nav-head">
                  <Link href="/login" prefetch>
                    <span>| Sign in or Register |</span>
                  </Link>
                </div>
              </div>
              <ul className="flex justify-around">
                <li>
                  <Link
                    href="/vials-and-plates"
                    prefetch
                    onClick={() => handleLinkClick("/vials-and-plates")}
                  >
                    <p>VIALS & 96 WELL Plates</p>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/lc"
                    prefetch
                    onClick={() => handleLinkClick("/lc")}
                  >
                    <p>LC</p>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/gc"
                    prefetch
                    onClick={() => handleLinkClick("/gc")}
                  >
                    <p>GC</p>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/instrumentation"
                    prefetch
                    onClick={() => handleLinkClick("/instrumentation")}
                  >
                    <p>INSTRUMENTATION</p>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/syringes"
                    prefetch
                    onClick={() => handleLinkClick("/syringes")}
                  >
                    <p>SYRINGES</p>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sample-preparation"
                    prefetch
                    onClick={() => handleLinkClick("/sample-preparation")}
                  >
                    <p>SAMPLE PREPARATIONS</p>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/support"
                    prefetch
                    onClick={() => handleLinkClick("/support")}
                  >
                    <p>SUPPORT</p>
                  </Link>
                  <ul className="absolute left-0 w-[300px] bg-gray-100 hidden group-hover:block   shadow-md mt-2">
                    <li>
                      <Link
                        href="/contact-us"
                        prefetch
                        onClick={handleLinkClick}
                        className="block px-4 hover:border-b hover:border-gray-800 hover:pb-2"
                      >
                        Contact Us
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/about-us"
                        prefetch
                        onClick={handleLinkClick}
                        className="block px-4 hover:border-b hover:border-gray-800 hover:pb-2"
                      >
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/resources"
                        prefetch
                        onClick={handleLinkClick}
                        className="block px-4 hover:border-b hover:border-gray-800 hover:pb-2"
                      >
                        Resources
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
