"use client";
import React from "react";
// import logoIcon from "../../images/logo.png";
import { CiSearch } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import Link from "next/link";
import "../../app/globals.css";
const Navbar = () => {
  return (
    <nav>
      <div className="navbar">
        <div className="main-nav">
          <div className="logo">
            <img
              src="https://cdn11.bigcommerce.com/s-czhvm5lnv4/images/stencil/245x80/2023chromtechlogo_1675205357__83333.original.png"
              alt=""
            />
          </div>
          <div className="search-bar">
            <button className="search-icon">
              <CiSearch />
            </button>
            <input type="text" placeholder="What are you looking for?" />
          </div>
          <div className="header-btn">
            <Link href="">REQUEST A QUOTE</Link>
          </div>
          <div className="nav-sign">
            <FaRegUser style={{ fontSize: "16px", padding: "0px 10px" }} />
            <span>| Sign in or Register |</span>
            <CiShoppingCart
              style={{ fontSize: "16px", paddingLeft: " 5px" }}
            />{" "}
            (0)
          </div>
        </div>
      </div>
      {/* <hr /> */}
      <hr style={{ border: "1px solid lightgray" }} />
      {/* Sub-nav with links */}
      <div className="sub-nav">
        <ul>
          <li>
            <Link href="/">VIALS & 96 WELL Plates</Link>
          </li>
          <li>
            <Link href="/">LC</Link>
          </li>
          <li>
            <Link href="/">GC</Link>
          </li>
          <li>
            <Link href="/">INSTRUMENTATION</Link>
          </li>
          <li>
            <Link href="/">SYRINGERS</Link>
          </li>
          <li>
            <Link href="/">SAMPLE PREPARATIONS</Link>
          </li>
          <li>
            <Link href="/">SUPPORT</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
