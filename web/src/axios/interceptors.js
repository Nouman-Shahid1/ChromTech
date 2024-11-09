
import store from "../store/store";
import { refreshToken, logout } from "../reducers/Auth/authSlice";
import { getCookie } from "../utilities/utils";

export const addAccessToken = async (config) => {
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
  const originalRequest = error.config;

  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    try {
      const result = await store.dispatch(refreshToken()).unwrap();
      const newAccessToken = result.access_token;

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return axios(originalRequest);
    } catch (refreshError) {
      store.dispatch(logout());
      return Promise.reject(refreshError);
    }
  }

  return Promise.reject(error);
};
