import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { refreshToken, setToken } from "../reducers/Auth/authSlice";

const Authentication = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname(); // Get the current page path
  const { accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
      const savedToken = localStorage.getItem("access_token");
      if (savedToken) {
        dispatch(setToken(savedToken));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (isMounted && !accessToken) {
      // Redirect to login and pass the current pathname as a query parameter
      router.push(`/login?redirect=${pathname}`);
    }
  }, [accessToken, dispatch, isMounted, router, pathname]);

  if (!isMounted || !accessToken) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div
          aria-label="Loading..."
          role="status"
          className="flex items-center space-x-2"
        >
          <svg
            className="h-20 w-20 animate-spin stroke-gray-500"
            viewBox="0 0 256 256"
          >
            <line
              x1="128"
              y1="32"
              x2="128"
              y2="64"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
            <line
              x1="195.9"
              y1="60.1"
              x2="173.3"
              y2="82.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
            <line
              x1="224"
              y1="128"
              x2="192"
              y2="128"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
            <line
              x1="195.9"
              y1="195.9"
              x2="173.3"
              y2="173.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
            <line
              x1="128"
              y1="224"
              x2="128"
              y2="192"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
            <line
              x1="60.1"
              y1="195.9"
              x2="82.7"
              y2="173.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
            <line
              x1="32"
              y1="128"
              x2="64"
              y2="128"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
            <line
              x1="60.1"
              y1="60.1"
              x2="82.7"
              y2="82.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></line>
          </svg>
          <span className="text-4xl font-medium text-gray-500">Loading...</span>
        </div>
      </div>
    );
  }

  return children;
};

export default Authentication;
