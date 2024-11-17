import axios from "axios";
import {
  addAccessToken,
  handleRequestError,
  handleResponseOK,
  handleResponseError,
} from "./interceptors";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

console.log("Axios Base URL:", baseURL); // Debugging log

const instance = axios.create({
  baseURL,
  timeout: 60000,
});

const secureInstance = axios.create({
  baseURL,
  timeout: 60000,
});

secureInstance.interceptors.request.use(addAccessToken, handleRequestError);
secureInstance.interceptors.response.use(handleResponseOK, handleResponseError);

export default secureInstance;
export { instance };
