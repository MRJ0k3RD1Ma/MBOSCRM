import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { authEndpoints } from "../../endpoint";
import { api } from "../..";
import axiosPrivate from "../../api";
import { TokenManager } from "../../token-manager";

export type LoginInput = {
  username: string;
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
      message.success("Muvaffaqiyatli tizimga kirildi");
    },
    onError: (error: Error) => {
      message.error(`Bunday foydalanuvchi mavjud emas`);
      console.log(error.message);
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
      message.success("Tizimdan muvaffaqiyatli chiqildi");
    },
    onError: (error: Error) => {
      queryClient.clear();
      message.error(`Logout xatoligi: ${error.message}`);
    },
  });
};
