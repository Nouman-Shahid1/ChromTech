// config.js
import axios from "axios";
import {
  addAccessToken,
  handleRequestError,
  handleResponseOK,
  handleResponseError,
} from "./interceptors";

const baseURL = process?.env?.REACT_APP_GW_URL || "http://localhost:5000";

const instance = axios.create({
  baseURL,
  timeout: 60000,
});

// Create a secure Axios instance for authenticated requests
const secureInstance = axios.create({
  baseURL,
  timeout: 60000,
});

// Attach interceptors to the secure instance
secureInstance.interceptors.request.use(addAccessToken, handleRequestError);
secureInstance.interceptors.response.use(handleResponseOK, handleResponseError);

export default secureInstance;
export { instance };
