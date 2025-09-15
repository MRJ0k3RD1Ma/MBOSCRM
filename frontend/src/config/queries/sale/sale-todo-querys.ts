import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import axiosPrivate from "../../api";
import { notification } from "antd";
import { saleTodoEndpoints } from "../../endpoint";

export interface CreateSaleTodoInput {
  saleId: number;
  name: string;
}

export interface UpdateSaleTodoInput {
  id: number;
  saleId?: number;
  name?: string;
  isCompleted?: boolean;
}

export interface SaleTodo {
  id: number;
  saleId: number;
  feedbackId: number;
  name: string;
  isCompleted: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  registerId: number;
  modifyId: number;
}

export interface SaleTodoResponse {
  total: number;
  page: number;
  limit: number;
  data: SaleTodo[];
}

export const useGetAllSaleTodo = (params?: {
  page?: number;
  limit?: number;
  saleId?: number;
  feedbackId?: number;
  name?: string;
  isCompleted?: boolean;
}) => {
  return useQuery<SaleTodoResponse>({
    queryKey: ["sale-todo", params],
    queryFn: async () => {
      const { data } = await axiosPrivate.get(saleTodoEndpoints.all, {
        params,
      });
      return data;
    },
  });
};

export const useGetSaleTodoById = (id?: number, enabled = true) => {
  return useQuery<SaleTodo>({
    queryKey: ["sale-todo", id],
    enabled: enabled && !!id,
    queryFn: async () => {
      const { data } = await axiosPrivate.get(
        saleTodoEndpoints.one(String(id))
      );
      return data;
    },
  });
};

export const useCreateSaleTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreateSaleTodoInput) => {
      const { data } = await axiosPrivate.post(saleTodoEndpoints.create, input);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sale-todo"] });
      notification.success({ message: "Todo muvaffaqiyatli qo‘shildi" });
    },
    onError: () => {
      notification.error({ message: "Todo qo‘shishda xatolik yuz berdi" });
    },
  });
};

export const useUpdateSaleTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...input }: UpdateSaleTodoInput) => {
      const { data } = await axiosPrivate.patch(
        saleTodoEndpoints.update(String(id)),
        input
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sale-todo"] });
      notification.success({ message: "Todo yangilandi" });
    },
    onError: () => {
      notification.error({ message: "Todo yangilashda xatolik yuz berdi" });
    },
  });
};

export const useDeleteSaleTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axiosPrivate.delete(
        saleTodoEndpoints.delete(String(id))
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sale-todo"] });
      notification.success({ message: "Todo o‘chirildi" });
    },
    onError: () => {
      notification.error({ message: "Todo o‘chirishda xatolik yuz berdi" });
    },
  });
};
