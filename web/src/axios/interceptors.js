import store from "../store/store"; // Import the Redux store
import { refreshToken, logout } from "../reducers/Auth/authSlice"; // Import actions
import { getCookie } from "../utilities/utils";

export const addAccessToken = async (config) => {
  // Retrieve access token from Redux state or cookie as a fallback
  const accessToken =
    store.getState().auth.accessToken || getCookie("access_token");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
};

export const handleRequestError = (error) => {
  return Promise.reject(error);
};

export const handleResponseOK = (response) => {
  return response;
};

export const handleResponseError = async (error) => {
  const originalRequest = error.config; // If token is expired (usually 401 error) and it hasn't been retried

  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    try {
      // Attempt to refresh the token
      const result = await store.dispatch(refreshToken()).unwrap();
      const newAccessToken = result.access_token; // Update the request's authorization header with the new token

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`; // Retry the original request with the new token

      return axios(originalRequest);
    } catch (refreshError) {
      // Refresh failed - logout the user
      store.dispatch(logout());
      return Promise.reject(refreshError);
    }
  }

  return Promise.reject(error);
};
