  "use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import Logo from "../../assets/images/logo.png";

const AdminSidebar  = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLinkClick = () => {
    setIsSidebarOpen(false);
  };

  const isActive = (path) => {
    return window.location.pathname === path;
  };
  useEffect(() => {
    const closeSidebarOnOutsideClick = (event) => {
      const sidebar = document.getElementById("separator-sidebar");

      if (isSidebarOpen && sidebar && !sidebar.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("click", closeSidebarOnOutsideClick);

    return () => {
      document.removeEventListener("click", closeSidebarOnOutsideClick);
    };
  }, [isSidebarOpen]);

  return (
    <>
      <button
        data-drawer-target="separator-sidebar"
        data-drawer-toggle="separator-sidebar"
        aria-controls="separator-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        onClick={toggleSidebar}
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>
      <aside
        className={`fixed top-0 left-0 z-40 bg-white h-screen transition-transform flex flex-col ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 w-[270px] md:w-[250px] md:w-[280px] lg:w-[345px] py-10 px-3 md :px-6 md:px-8 lg:px-10`}
        aria-label="Sidebar"
      >
        <Image src={Logo} height={56} width={200} alt="" />
        <Link href="/admin" passHref>
          <div className="rounded-xl text-lg items-center font-poppins font-semibold mt-11 leading-[27px] py-4 px-6 pr-1 flex gap-6 text-white bg-red-600 shadow-[0px 20px 50px 0px #3745571A]">
            <span>Dashboard</span>
          </div>
        </Link>
        <div id="separator-sidebar" className="mt-8">
          <ul className="space-y-2 font-medium  pb-8  overflow-y-auto">
            <Link
              href="/admin/lc"
              className={`${
                isActive("/myaccount/company-orders") ? "active" : ""
              }  `}
            >
              <li
                className="flex gap-6 mt-1 p-2 text-red-500 category rounded-lg dark:text-white group transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={handleLinkClick}
              >
                <span className="flex-1 text-lg font-poppins font-bold ">
                  LC
                </span>
              </li>
            </Link>
            <Link
              href="/admin/gc"
              className={`${
                isActive("/myaccount/quick-orders") ? "active" : ""
              }  `}
            >
              <li
                className="flex gap-6 mt-1 p-2 text-red-500 category rounded-lg dark:text-white group transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={handleLinkClick}
              >

                <span className="flex-1 text-lg font-poppins font-bold ">
                  GC
                </span>
              </li>
            </Link>

            <Link
              href="/admin/instruction"
              className={`${isActive("/myaccount/users") ? "active" : ""}  `}
            >
              <li
                className="flex gap-6 mt-1 p-2 text-red-500 category rounded-lg dark:text-white group transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={handleLinkClick}
              >
 
                <span className="flex-1 text-lg font-poppins font-bold ">
                  INSTRUCTION
                </span>
              </li>
            </Link>
            <Link href="/admin/sryingers">
              <li
                onClick={handleLinkClick}
                className="flex mt-1 items-center gap-6 p-2 text-red-500 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
            
                <span className="flex-1 text-lg font-poppins font-bold ">
                  SRYINGERS
                </span>
              </li>
            </Link>
            <Link href="/admin/sample-preparation">
              <li
                onClick={handleLinkClick}
                className="flex mt-1 items-center gap-6 p-2 text-red-500 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
            
                <span className="flex-1 text-lg font-poppins font-bold ">
                  SAMPLE PREPARATION
                </span>
              </li>
            </Link>
            <Link href="#">
              <li
                onClick={handleLinkClick}
                className="flex mt-1 items-center gap-6 p-2 text-red-500 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
            
                <span className="flex-1 text-lg font-poppins font-bold ">
                  SIGN OUT
                </span>
              </li>
            </Link>
          </ul>
        </div>
      </aside>
    
    </>
  )
}

export default AdminSidebar