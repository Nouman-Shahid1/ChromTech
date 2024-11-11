"use client";
import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import { RxCrossCircled } from "react-icons/rx";
import Link from "next/link";

const Navbar = ({ hasHeadline }) => {
  const [showSubNav, setShowSubNav] = useState(true);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        if (!isHamburgerOpen) {
          setShowSubNav(false);
        }
      } else {
        setShowSubNav(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHamburgerOpen]);

  const toggleHamburger = () => {
    setIsHamburgerOpen(!isHamburgerOpen);
  };

  const closeSubNav = () => {
    setIsHamburgerOpen(false);
    setShowSubNav(true);
  };

  const handleLinkClick = () => {
    closeSubNav();
  };

  return (
    <nav className="fixed bg-white w-full ">
      <div className="fixed top-0 w-full bg-red-600 text-white text-center py-2 z-20 text-sm font-light">
        <p>
          Safety First, Coffee Second: Score a FREE coffee tumbler with the
          purchase of our safety waste containment kits!
          <span>
            <strong>
              <Link href="/" className="underline">
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
          <div
            className={`hamburger ${!showSubNav ? "show" : ""}`}
            onClick={toggleHamburger}
            aria-label="Toggle Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="logo">
            <img
              src="https://cdn11.bigcommerce.com/s-czhvm5lnv4/images/stencil/245x80/2023chromtechlogo_1675205357__83333.original.png"
              alt="Logo"
            />
          </div>
          <div className="search-bar">
            <button className="search-icon" aria-label="Search">
              <CiSearch />
            </button>
            <input
              type="text"
              placeholder="What are you looking for?"
              aria-label="Search input"
            />
          </div>
          {/* <div className="header-btn">
            <Link href="">REQUEST A QUOTE</Link>
          </div> */}
          <div className="nav-sign">
            <FaRegUser
              style={{
                fontSize: "20px",
                paddingLeft: "5px",
                paddingTop: "5px",
              }}
            />
            <span>| Sign in or Register |</span>
            <CiShoppingCart
              style={{
                fontSize: "20px",
                paddingLeft: "5px",
                paddingTop: "5px",
              }}
            />{" "}
            (0)
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
                <span>| Sign in or Register |</span>
              </div>
            </div>
            <ul className="flex justify-around">
              <li><Link href="/" onClick={handleLinkClick}>VIALS & 96 WELL Plates</Link></li>
              <li><Link href="/lc" onClick={handleLinkClick}>LC</Link></li>
              <li><Link href="/gc" onClick={handleLinkClick}>GC</Link></li>
              <li><Link href="/" onClick={handleLinkClick}>INSTRUMENTATION</Link></li>
              <li><Link href="/sryingers" onClick={handleLinkClick}>SYRINGERS</Link></li>
              <li><Link href="/sample-preparation" onClick={handleLinkClick}>SAMPLE PREPARATIONS</Link></li>
              <li><Link href="/support" onClick={handleLinkClick}>SUPPORT</Link></li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
