// interceptors.js

// Helper function to get the access token from local storage
const getAccessToken = () => localStorage.getItem("accessToken");

// Request interceptor to add the access token
export const addAccessToken = (config) => {
  const token = getAccessToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
};

// Error handler for request errors
export const handleRequestError = (error) => {
  console.error("Request Error:", error);
  return Promise.reject(error);
};

// Success handler for responses
export const handleResponseOK = (response) => {
  return response;
};

// Placeholder function for token refresh
const refreshAccessToken = async () => {
  // Replace with actual logic to request a new access token if available
  console.log("Refreshing access token...");
  return null; // Return a new token or null if refresh fails
};

// Error handler for response errors, including 401 (unauthorized) retry logic
export const handleResponseError = async (error) => {
  const originalRequest = error.config;

  // Check if error is due to unauthorized access and retry if possible
  if (
    error.response &&
    error.response.status === 401 &&
    !originalRequest._retry
  ) {
    originalRequest._retry = true;
    const refreshedToken = await refreshAccessToken();

    if (refreshedToken) {
      localStorage.setItem("accessToken", refreshedToken);
      originalRequest.headers["Authorization"] = `Bearer ${refreshedToken}`;
      return axios(originalRequest);
    }
  }

  console.error("Response Error:", error);
  return Promise.reject(error);
};
