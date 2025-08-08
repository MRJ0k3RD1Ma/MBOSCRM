import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import axiosPrivate from "../../api";
import { userEndpoints } from "../../endpoint";

export interface User {
  id: number;
  name: string;
  username: string;
  password?: string;
  phone?: string | null;
  roleId?: number | null;
  chatId?: string | null;
  isDeleted: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateUserInput {
  name: string;
  username: string;
  password: string;
  phone?: string;
  roleId?: number;
  chatId?: string;
}

export interface UpdateUserInput {
  id: number;
  name?: string;
  username?: string;
  password?: string;
  phone?: string;
  roleId?: number;
  chatId?: string;
}

export interface UserResponse {
  total: number;
  page: number;
  limit: number;
  data: User[];
}

export const useGetAllUsers = (params?: {
  page?: number;
  limit?: number;
  name?: string;
}) => {
  return useQuery<UserResponse>({
    queryKey: ["users", params],
    queryFn: async () => {
      const { data } = await axiosPrivate.get(userEndpoints.all, { params });
      return data;
    },
  });
};

export const useGetUserById = (id?: number) => {
  return useQuery<User>({
    queryKey: ["user", id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await axiosPrivate.get(userEndpoints.one(String(id)));
      return data;
    },
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user: CreateUserInput) => {
      const { data } = await axiosPrivate.post(userEndpoints.create, user);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      notification.success({
        message: "Foydalanuvchi muvaffaqiyatli qo‘shildi",
      });
    },
    onError: () => {
      notification.error({ message: "Foydalanuvchi qo‘shishda xatolik" });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...rest }: UpdateUserInput) => {
      const { data } = await axiosPrivate.patch(
        userEndpoints.update(String(id)),
        rest
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      notification.success({ message: "Foydalanuvchi yangilandi" });
    },
    onError: () => {
      notification.error({ message: "Foydalanuvchi yangilashda xatolik" });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axiosPrivate.delete(
        userEndpoints.delete(String(id))
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      notification.success({ message: "Foydalanuvchi o‘chirildi" });
    },
    onError: () => {
      notification.error({ message: "Foydalanuvchi o‘chirishda xatolik" });
    },
  });
};
