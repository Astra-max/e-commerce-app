import axios from "axios";
import { getAccessToken } from "./token";

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true, // Include cookies in requests
});

API.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers = {
      ...(config.headers || {}),
      Authorization: "Bearer " + token,
    } as any;
  }

  return config;
});

export default API;
