import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { refreshToken, setToken } from "../reducers/Auth/authSlice";

const Authentication = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
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
      dispatch(refreshToken())
        .unwrap()
        .catch(() => {
          router.push("/login"); // Redirect to login if refresh fails
        });
    }
  }, [accessToken, dispatch, isMounted, router]);

  if (!isMounted || !accessToken) {
    return <div>Loading...</div>; // Show loading until the token is confirmed
  }

  return children; // Render children only if authenticated
};

export default Authentication;
