import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { appealEndpoints } from "../../endpoint";
import axiosPrivate from "../../api";
import { notification } from "antd";

export interface AppealInput {
  name: string;
  phone: string;
  subject: string;
  detail: string;
  state?: string;
}

export interface UpdateAppealInput {
  id: number;
  name?: string;
  phone?: string;
  subject?: string;
  detail?: string;
  state?: string;
}

export interface Appeal {
  id: number;
  name: string;
  phone: string;
  subject: string;
  detail: string;
  state: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  modifyId: number | null;
}

export interface AppealResponse {
  total: number;
  page: number;
  limit: number;
  data: Appeal[];
}

export const useGetAllAppeal = (
  params?: { page?: number; limit?: number },
  options?: { enabled?: boolean }
) => {
  return useQuery<AppealResponse>({
    queryKey: ["appeal", params],
    queryFn: async () => {
      const { data } = await axiosPrivate.get(appealEndpoints.all, { params });
      return data;
    },
    enabled: options?.enabled ?? true,
  });
};

export const useGetAppealById = (id?: number, enabled = true) => {
  return useQuery<Appeal>({
    queryKey: ["appeal", id],
    enabled: enabled && !!id,
    queryFn: async () => {
      const { data } = await axiosPrivate.get(appealEndpoints.one(String(id)));
      return data;
    },
  });
};

export const useCreateAppeal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: AppealInput) => {
      const { data } = await axiosPrivate.post(appealEndpoints.create, input);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appeal"] });
      notification.success({ message: "Murojaat muvaffaqiyatli yaratildi" });
    },
    onError: () => {
      notification.error({ message: "Murojaat yaratishda xatolik yuz berdi" });
    },
  });
};

export const useUpdateAppeal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...input }: UpdateAppealInput) => {
      const { data } = await axiosPrivate.patch(
        appealEndpoints.update(String(id)),
        input
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appeal"] });
      notification.success({ message: "Murojaat yangilandi" });
    },
    onError: () => {
      notification.error({ message: "Murojaat yangilashda xatolik yuz berdi" });
    },
  });
};

export const useDeleteAppeal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axiosPrivate.delete(
        appealEndpoints.delete(String(id))
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appeal"] });
      notification.success({ message: "Murojaat o‘chirildi" });
    },
    onError: () => {
      notification.error({ message: "Murojaat o‘chirishda xatolik yuz berdi" });
    },
  });
};
