// interceptors.js

import store from "../store/store"; // Import Redux store if you need to dispatch actions
import { refreshToken } from "../reducers/Auth/authSlice"; // Import your refresh token action from authSlice

// Add Access Token to Request Headers
export const addAccessToken = async (config) => {
  // Example: Get the token from localStorage or Redux store
  const token = localStorage.getItem("accessToken"); // Or use store.getState().auth.accessToken

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

// Handle Request Error
export const handleRequestError = (error) => {
  console.error("Request Error:", error);
  return Promise.reject(error);
};

// Handle Successful Response
export const handleResponseOK = (response) => {
  return response; // You could process or log the response here
};

// Handle Response Error
export const handleResponseError = async (error) => {
  const originalRequest = error.config;

  // Check if the error is due to unauthorized access (401)
  if (
    error.response &&
    error.response.status === 401 &&
    !originalRequest._retry
  ) {
    originalRequest._retry = true; // Mark the request as retried

    try {
      // Attempt to refresh the token using Redux
      const { payload } = await store.dispatch(refreshToken());

      if (payload.access_token) {
        // Update the Authorization header with the new token
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${payload.access_token}`;
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${payload.access_token}`;

        // Retry the original request
        return axios(originalRequest);
      }
    } catch (refreshError) {
      console.error("Token refresh failed:", refreshError);
      // Handle failed token refresh, e.g., redirect to login
      window.location.href = "/login";
    }
  }

  console.error("Response Error:", error);
  return Promise.reject(error);
};
