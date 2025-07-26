import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { authEndpoints } from "../../endpoint";
import { api } from "../..";
import axiosPrivate from "../../api";
import { TokenManager } from "../../token-manager";

type LoginInput = {
  name: string;
  password: string;
};

type TokenResponse = {
  accessToken: string;
  refreshToken: string;
};

type ErrorResponse = {
  success: boolean;
  data: null;
  error: string;
};

export const useAdminLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: LoginInput) => {
      try {
        const { data } = await api.post<TokenResponse>(
          authEndpoints.login,
          credentials
        );
        TokenManager.setTokens(data.accessToken, data.refreshToken);
        return data;
      } catch (error: any) {
        const errorResponse = error?.response?.data as ErrorResponse;
        throw new Error(errorResponse?.error || "Tizimga kirishda xatolik");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      notification.success({
        message: "Muvaffaqiyatli tizimga kirildi",
        placement: "bottomRight",
      });
    },
    onError: (error: Error) => {
      notification.error({
        message: `Login xatoligi: ${error.message}`,
        placement: "bottomRight",
      });
    },
  });
};

export const useAdminRefresh = () => {
  return useMutation({
    mutationFn: async () => {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("Refresh token topilmadi");

        const { data } = await api.post<TokenResponse>(authEndpoints.refresh, {
          refreshToken,
        });

        TokenManager.setTokens(data.accessToken, data.refreshToken);
        return data;
      } catch (error: any) {
        const errorResponse = error?.response?.data as ErrorResponse;
        throw new Error(errorResponse?.error || "Token yangilashda xatolik");
      }
    },
  });
};

export const useAdminLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      try {
        await axiosPrivate.post(authEndpoints.logout);
      } finally {
        TokenManager.clearTokens();
        window.location.href = "/login";
      }
    },
    onSuccess: () => {
      queryClient.clear();
      notification.success({
        message: "Tizimdan muvaffaqiyatli chiqildi",
        placement: "bottomRight",
      });
    },
    onError: (error: Error) => {
      queryClient.clear();
      notification.error({
        message: `Logout xatoligi: ${error.message}`,
        placement: "bottomRight",
      });
    },
  });
};
