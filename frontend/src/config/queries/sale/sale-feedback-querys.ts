import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import axiosPrivate from "../../api";
import { notification } from "antd";
import { saleFeedbackEndpoints } from "../../endpoint";

export interface CreateSaleFeedbackInput {
  saleId: number;
  name: string;
  description?: string;
  score: number;
}

export interface UpdateSaleFeedbackInput {
  alias: string;
  saleId?: number;
  name?: string;
  description?: string;
  score?: number;
  state?: string;
  result?: string;
}

export interface SaleFeedback {
  id: number;
  saleId: number;
  alias: string;
  name: string;
  description: string;
  score: number;
  state: string;
  result: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SaleFeedbackResponse {
  total: number;
  page: number;
  limit: number;
  data: SaleFeedback[];
}

// ---- Queries ----
export const useGetAllSaleFeedback = (params?: {
  page?: number;
  limit?: number;
  name?: string;
  saleId?: number;
  state?: string;
  result?: string;
}) => {
  return useQuery<SaleFeedbackResponse>({
    queryKey: ["sale-feedback", params],
    queryFn: async () => {
      const { data } = await axiosPrivate.get(saleFeedbackEndpoints.all, {
        params,
      });
      return data;
    },
  });
};

export const useGetSaleFeedbackById = (id?: number, enabled = true) => {
  return useQuery<SaleFeedback>({
    queryKey: ["sale-feedback", id],
    enabled: enabled && !!id,
    queryFn: async () => {
      const { data } = await axiosPrivate.get(
        saleFeedbackEndpoints.one(String(id))
      );
      return data;
    },
  });
};

export const useCreateSaleFeedback = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreateSaleFeedbackInput) => {
      const { data } = await axiosPrivate.post(
        saleFeedbackEndpoints.create,
        input
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sale-feedback"] });
      notification.success({ message: "Fikr muvaffaqiyatli qo‘shildi" });
    },
    onError: () => {
      notification.error({ message: "Fikr qo‘shishda xatolik yuz berdi" });
    },
  });
};

export const useUpdateSaleFeedback = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ alias, ...input }: UpdateSaleFeedbackInput) => {
      const { data } = await axiosPrivate.patch(
        saleFeedbackEndpoints.update(alias),
        input
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sale-feedback"] });
      notification.success({ message: "Fikr yangilandi" });
    },
    onError: () => {
      notification.error({ message: "Fikrni yangilashda xatolik yuz berdi" });
    },
  });
};

export const useDeleteSaleFeedback = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axiosPrivate.delete(
        saleFeedbackEndpoints.delete(String(id))
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sale-feedback"] });
      notification.success({ message: "Fikr o‘chirildi" });
    },
    onError: () => {
      notification.error({ message: "Fikrni o‘chirishda xatolik yuz berdi" });
    },
  });
};
