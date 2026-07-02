import axios from "axios";
import { BASE_URL } from "../../types";

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Include cookies in requests
});

API.interceptors.request.use(
  (config) => {
    const authString = localStorage.getItem("auth");

    if (authString) {
      const auth = JSON.parse(authString);

      if (auth?.token) {
        config.headers.Authorization = `Bearer ${auth.token}`;
      }
    }

    return config;
  },
  (err) => Promise.reject(err)
);

export default API;