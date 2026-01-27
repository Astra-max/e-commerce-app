import axios from "axios";
import { BASE_URL } from "../../types";

const API = axios.create({
    baseURL: BASE_URL
})

API.interceptors.request.use(
  (config) => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (auth?.token) config.headers.Authorization = `Bearer ${auth.token}`;
    return config;
  },
  (err) => Promise.reject(err)
);

export default API