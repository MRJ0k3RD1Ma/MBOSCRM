import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import axiosPrivate from "../../api";
import { paymentEndpoints } from "../../endpoint";

export interface Payment {
  id: number;
  name: string;
  icon: string;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreatePaymentInput {
  name: string;
  icon: string;
}

export interface UpdatePaymentInput extends CreatePaymentInput {
  id: number;
}

export interface PaymentResponse {
  total: number;
  page: number;
  limit: number;
  data: Payment[];
}

export const useGetAllPayments = (params?: {
  page?: number;
  limit?: number;
  name?: string;
}) => {
  return useQuery<PaymentResponse>({
    queryKey: ["payments", params],
    queryFn: async () => {
      const { data } = await axiosPrivate.get(paymentEndpoints.all, { params });
      return data;
    },
  });
};

export const useGetPaymentById = (id?: number) => {
  return useQuery<Payment>({
    queryKey: ["payment", id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await axiosPrivate.get(paymentEndpoints.one(String(id)));
      return data;
    },
  });
};

export const useCreatePayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreatePaymentInput) => {
      const { data } = await axiosPrivate.post(paymentEndpoints.create, input);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      notification.success({
        message: "To‘lov usuli muvaffaqiyatli qo‘shildi",
      });
    },
    onError: () => {
      notification.error({
        message: "To‘lov usulini qo‘shishda xatolik yuz berdi",
      });
    },
  });
};

export const useUpdatePayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...input }: UpdatePaymentInput) => {
      const { data } = await axiosPrivate.patch(
        paymentEndpoints.update(String(id)),
        input
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      notification.success({ message: "To‘lov usuli yangilandi" });
    },
    onError: () => {
      notification.error({
        message: "To‘lov usulini yangilashda xatolik yuz berdi",
      });
    },
  });
};

export const useDeletePayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axiosPrivate.delete(
        paymentEndpoints.delete(String(id))
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      notification.success({ message: "To‘lov usuli o‘chirildi" });
    },
    onError: () => {
      notification.error({
        message: "To‘lov usulini o‘chirishda xatolik yuz berdi",
      });
    },
  });
};
