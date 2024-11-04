import store from "../store/store";
import { refreshToken } from "../reducers/Auth/authSlice";
import { getCookie } from "../utilities/utils";

export const addAccessToken = async (config) => {
  const state = store.getState();
  const { user } = state.auth;
  const { accessToken } = user;

  if (!accessToken) {
    await store.dispatch(
      refreshToken({
        grant_type: "refresh_token",
        refresh_token: getCookie("refresh_token"),
        client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
      })
    );
  } else {
    return {
      ...config,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    };
  }
};

export const handleRequestError = (error) => Promise.reject(error);

export const handleResponseOK = (response) => response;

export const handleResponseError = (error) => Promise.reject(error);

export const addInterceptors = (instance) => {
  instance.interceptors.request.use(addAccessToken, handleRequestError);
  instance.interceptors.response.use(handleResponseOK, handleResponseError);
};
