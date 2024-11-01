"use client";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import Logo from "../../assets/images/logologo.png";

const Navigation = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Blogs", href: "/blogs" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [navbar, setNavbar] = useState(false);

  return (
    <div className="shadow-md bg-[#023020] ">
      <header className="header sticky top-0 w-[90%] mx-auto flex items-center justify-between py-4">
        <div className="flex items-center">
          <Link href="/">
            <span className="flex items-center">
              <Image src={Logo} alt="Logo" width={170} height={40} />
            </span>
          </Link>
        </div>

        <nav className="nav flex-grow flex justify-center font-semibold text-xl">
          <ul className="flex items-center space-x-8">
            {Navigation.map((item) => (
              <li key={item.name} className="cursor-pointer">
                <Link href={item.href}>
                  <span className="hover:text-green-500 transition-all text-white duration-200">
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center space-x-6 text-white">
          <Link href="/become-a-seller">
            <span className="text-lg  font-semibold text-white hover:text-green-500">
              Become a Seller
            </span>
          </Link>
          <Link href="/signin">
            <span className="text-lg font-semibold text-white hover:text-green-500">
              Sign In
            </span>
          </Link>
          <Link href="/join">
            <span className="px-5 py-2 text-lg font-semibold text-green-500 border border-green-500 rounded-full hover:bg-green-500 hover:text-white shadow-md transition-all duration-300">
              Join
            </span>
          </Link>

          <Link href="/cart">
            <span className="relative text-white hover:text-green-500 transition-all duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
              <span className="absolute -top-1 -right-1 w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full flex items-center justify-center">
                3
              </span>
            </span>
          </Link>
        </div>
      </header>
    </div>
  );
}
