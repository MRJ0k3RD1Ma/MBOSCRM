import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import axiosPrivate from "../../api";
import { userRoleEndpoints } from "../../endpoint";

export interface UserRole {
  id: number;
  name: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateUserRoleInput {
  name: string;
}

export interface UpdateUserRoleInput {
  id: number;
  name?: string;
}

export interface UserRoleResponse {
  total: number;
  page: number;
  limit: number;
  data: UserRole[];
}

export const useGetAllUserRoles = (params?: {
  page?: number;
  limit?: number;
  name?: string;
}) => {
  return useQuery<UserRoleResponse>({
    queryKey: ["userRoles", params],
    queryFn: async () => {
      const { data } = await axiosPrivate.get(userRoleEndpoints.all, {
        params,
      });
      return data;
    },
  });
};

export const useGetUserRoleById = (id?: number) => {
  return useQuery<UserRole>({
    queryKey: ["userRole", id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await axiosPrivate.get(
        userRoleEndpoints.one(String(id))
      );
      return data;
    },
  });
};

export const useCreateUserRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (role: CreateUserRoleInput) => {
      const { data } = await axiosPrivate.post(userRoleEndpoints.create, role);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userRoles"] });
      notification.success({
        message: "Role muvaffaqiyatli qo‘shildi",
      });
    },
    onError: () => {
      notification.error({ message: "Role qo‘shishda xatolik" });
    },
  });
};

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...rest }: UpdateUserRoleInput) => {
      const { data } = await axiosPrivate.patch(
        userRoleEndpoints.update(String(id)),
        rest
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userRoles"] });
      notification.success({ message: "Role yangilandi" });
    },
    onError: () => {
      notification.error({ message: "Role yangilashda xatolik" });
    },
  });
};

export const useDeleteUserRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axiosPrivate.delete(
        userRoleEndpoints.delete(String(id))
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userRoles"] });
      notification.success({ message: "Role o‘chirildi" });
    },
    onError: () => {
      notification.error({ message: "Role o‘chirishda xatolik" });
    },
  });
};
