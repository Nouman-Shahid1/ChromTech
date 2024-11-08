"use client";
import { useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "../../reducers/Auth/authSlice";
import ProfileImage from "../../assets/images/blank.png";

const Profile = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state) => state.auth.user);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <div className="bg-white shadow-md px-4 md:px-4 lg:px-4 xl:px-6 2xl:px-6 py-4 md:py-6 lg:py-6 xl:py-6 2xl:py-8 rounded-[32px] flex flex-col md:flex-row items-center justify-between">
      <h1 className="text-4xl font-poppinssemibold font-semibold text-[#151D48] mb-4 md:mb-0">
        Welcome!
      </h1>
      <div className="flex items-center gap-4">
        <Image
          src={ProfileImage}
          alt="Profile"
          height={60}
          width={60}
          className="rounded-2xl"
        />
        <div>
          <div className="flex gap-3 items-center">
            <button
              onClick={toggleDropdown}
              id="dropdownDefaultButton"
              type="button"
              className="font-poppinsmedium flex items-center text-base font-medium text-[#151D48]"
            >
              {user?.firstName || "User"}
              <svg
                className={`w-2.5 h-2.5 ms-3 transform ${
                  isDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            <div
              id="dropdown"
              className={`${
                isDropdownOpen ? "visible" : "hidden"
              } absolute z-10 bg-white mt-28 divide-y divide-gray-100 rounded-lg shadow w-24`}
            >
              <ul className="py-2 text-sm text-gray-700">
                <li>
                  <span
                    onClick={handleLogout}
                    className="block px-2 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Logout
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <p className="text-sm font-poppinsregular font-normal text-[#737791]">
            Business Account
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
