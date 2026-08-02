import API from "./axios";
import { setAccessToken } from "./token";

API.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      try {
        const res = await API.post("/auth/refresh");

        const newToken = res.data.accessToken;

        setAccessToken(newToken);

        original.headers = {
          ...(original.headers || {}),
          Authorization: "Bearer " + newToken,
        } as any;

        return API(original);
      } catch (err) {
        setAccessToken(null);
        window.location.href = "/auth/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
