"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation"; // Use 'next/navigation' for client-only routing
import { refreshToken } from "../reducers/Auth/authSlice";

const Authentication = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false); // Track client-side mounting
  const dispatch = useDispatch();
  const router = useRouter(); // Use router from next/navigation
  const { accessToken } = useSelector((state) => state.auth);

  // Ensure component only runs on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  // Redirect to /login if no accessToken and on the client side
  useEffect(() => {
    if (isMounted && !accessToken) {
      dispatch(refreshToken())
        .unwrap()
        .catch(() => {
          router.push("/login"); // Redirect to login if refresh token fails
        });
    }
  }, [accessToken, dispatch, isMounted, router]);

  // Show loading state while determining if mounted or if accessToken is unavailable
  if (!isMounted || !accessToken) {
    return <div>Loading...</div>;
  }

  return children;
};

export default Authentication;
