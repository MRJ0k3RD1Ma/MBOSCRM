import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import axiosPrivate from "../../api";
import { notification } from "antd";
import { todoEndpoints } from "../../endpoint";

export interface CreateTodoInput {
  name: string;
}

export interface UpdateTodoInput {
  id: number;
  name?: string;
}

export interface Todo {
  id: number;
  name: string;
}

export const useGetAllTodos = (params?: { name?: string }) => {
  return useQuery<Todo[]>({
    queryKey: ["todo", params],
    queryFn: async () => {
      const { data } = await axiosPrivate.get(todoEndpoints.all, { params });
      return data;
    },
  });
};

export const useGetTodoById = (id?: number, enabled = true) => {
  return useQuery<Todo>({
    queryKey: ["todo", id],
    enabled: enabled && !!id,
    queryFn: async () => {
      const { data } = await axiosPrivate.get(todoEndpoints.one(String(id)));
      return data;
    },
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreateTodoInput) => {
      const { data } = await axiosPrivate.post(todoEndpoints.create, input);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo"] });
      notification.success({ message: "Todo muvaffaqiyatli qo‘shildi" });
    },
    onError: () => {
      notification.error({ message: "Todo qo‘shishda xatolik yuz berdi" });
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...input }: UpdateTodoInput) => {
      const { data } = await axiosPrivate.patch(
        todoEndpoints.update(String(id)),
        input
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo"] });
      notification.success({ message: "Todo yangilandi" });
    },
    onError: () => {
      notification.error({ message: "Todo yangilashda xatolik yuz berdi" });
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axiosPrivate.delete(todoEndpoints.delete(String(id)));
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo"] });
      notification.success({ message: "Todo o‘chirildi" });
    },
    onError: () => {
      notification.error({ message: "Todo o‘chirishda xatolik yuz berdi" });
    },
  });
};
