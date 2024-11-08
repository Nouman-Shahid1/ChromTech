"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "../../reducers/Auth/authSlice";

import Logo from "../../assets/images/logo.png";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLinkClick = () => {
    setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
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
        } sm:translate-x-0 w-[270px] sm:w-[250px] md:w-[280px] lg:w-[345px] py-10 px-3 sm:px-6 md:px-8 lg:px-10`}
        aria-label="Sidebar"
      >
        <Image src={Logo} height={56} width={200} alt="" />
        <Link href="/myaccount" passHref>
          <div className="rounded-2xl text-lg items-center font-poppins font-semibold mt-11 leading-[27px] py-4 px-6 pr-1 flex gap-6 text-white bg-red-600 shadow-[0px 20px 50px 0px #3745571A]">
            <span>Dashboard</span>
          </div>
        </Link>
        <div id="separator-sidebar" className="mt-8">
          <ul className="space-y-2 font-medium pl-8 pb-8 md:pl-10 lg:pl-12 overflow-y-auto">
            <Link
              href="/myaccount/orders"
              className={`${isActive("/myaccount/orders") ? "active" : ""}  `}
            >
              <li
                className="flex mt-12 gap-6 p-2 text-red-500 category rounded-lg dark:text-white group transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={handleLinkClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>

                <span className="flex-1  text-lg font-poppins font-bold ">
                  Orders
                </span>
              </li>
            </Link>
            <Link
              href="/myaccount/company-orders"
              className={`${
                isActive("/myaccount/company-orders") ? "active" : ""
              }  `}
            >
              <li
                className="flex gap-6 mt-1 p-2 text-red-500 category rounded-lg dark:text-white group transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={handleLinkClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                  />
                </svg>

                <span className="flex-1 text-lg font-poppins font-bold ">
                  Company Orders
                </span>
              </li>
            </Link>
            <Link
              href="/myaccount/quick-orders"
              className={`${
                isActive("/myaccount/quick-orders") ? "active" : ""
              }  `}
            >
              <li
                className="flex gap-6 mt-1 p-2 text-red-500 category rounded-lg dark:text-white group transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={handleLinkClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
                  />
                </svg>

                <span className="flex-1 text-lg font-poppins font-bold ">
                  Quick Orders
                </span>
              </li>
            </Link>

            <Link
              href="/myaccount/users"
              className={`${isActive("/myaccount/users") ? "active" : ""}  `}
            >
              <li
                className="flex gap-6 mt-1 p-2 text-red-500 category rounded-lg dark:text-white group transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={handleLinkClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                  />
                </svg>

                <span className="flex-1 text-lg font-poppins font-bold ">
                  Users
                </span>
              </li>
            </Link>
            <a href="#">
              <li
                onClick={handleLinkClick}
                className="flex mt-1 items-center gap-6 p-2 text-red-500 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                  />
                </svg>

                <span
                  onClick={handleLogout}
                  className="flex-1 text-lg font-poppins font-bold "
                >
                  Sign Out
                </span>
              </li>
            </a>
          </ul>
        </div>
      </aside>
    </>
  );
};
export default Sidebar;
