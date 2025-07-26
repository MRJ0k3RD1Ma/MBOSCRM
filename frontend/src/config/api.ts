import axios, { AxiosError } from "axios";
import { api } from ".";
import { TokenManager } from "./token-manager";

const baseURL = import.meta.env.VITE_API_URL;

const axiosPrivate = axios.create({
  baseURL,
  withCredentials: false,
});

axiosPrivate.interceptors.request.use(
  (config) => {
    const token = TokenManager.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;
    const status = error.response?.status;
    const errorData = error.response?.data as any;
    const errorMessage = errorData?.message || errorData?.error;

    const tokenErrors = ["JWT_EXPIRED", "Unauthorized", "TOKEN_INVALIDATED"];

    const isTokenError = status === 401 && tokenErrors.includes(errorMessage);

    if (isTokenError && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await api.get("/user/auth/refresh");
        const newAccessToken = res.data.accessToken;

        if (newAccessToken) {
          TokenManager.setAccessToken(newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosPrivate(originalRequest);
        }
      } catch (refreshError) {
        TokenManager.clearTokens();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    if (isTokenError && originalRequest._retry) {
      TokenManager.clearTokens();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosPrivate;
