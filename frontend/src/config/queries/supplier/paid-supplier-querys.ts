import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import axiosPrivate from "../../api";
import { paidSupplierEndpoints } from "../../endpoint";

export interface PaidSupplier {
  id: number;
  supplierId: number;
  paidDate: string;
  price: number;
  paymentId: number;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  registerId?: number;
  modifyId?: number;
}

export interface CreatePaidSupplierInput {
  supplierId: number;
  paidDate: string;
  price: number;
  paymentId: number;
}

export interface UpdatePaidSupplierInput extends CreatePaidSupplierInput {
  id: number;
}

export interface PaidSupplierResponse {
  total: number;
  page: number;
  limit: number;
  data: PaidSupplier[];
}

export const useGetAllPaidSuppliers = (params?: {
  page?: number;
  limit?: number;
  supplierId?: number;
  paymentId?: number;
  minPaidDate?: string;
  maxPaidDate?: string;
}) => {
  return useQuery<PaidSupplierResponse>({
    queryKey: ["paidsuppliers", params],
    queryFn: async () => {
      const { data } = await axiosPrivate.get(paidSupplierEndpoints.all, {
        params,
      });
      return data;
    },
  });
};

export const useGetPaidSupplierById = (id?: number) => {
  return useQuery<PaidSupplier>({
    queryKey: ["paidsupplier", id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await axiosPrivate.get(
        paidSupplierEndpoints.one(String(id))
      );
      return data;
    },
  });
};

export const useCreatePaidSupplier = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreatePaidSupplierInput) => {
      const { data } = await axiosPrivate.post(
        paidSupplierEndpoints.create,
        input
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paidsuppliers"] });
      notification.success({ message: "To‘lov muvaffaqiyatli qo‘shildi" });
    },
    onError: () => {
      notification.error({ message: "To‘lov qo‘shishda xatolik yuz berdi" });
    },
  });
};

export const useUpdatePaidSupplier = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...input }: UpdatePaidSupplierInput) => {
      const { data } = await axiosPrivate.patch(
        paidSupplierEndpoints.update(String(id)),
        input
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paidsuppliers"] });
      notification.success({ message: "To‘lov muvaffaqiyatli yangilandi" });
    },
    onError: () => {
      notification.error({ message: "To‘lovni yangilashda xatolik yuz berdi" });
    },
  });
};

export const useDeletePaidSupplier = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axiosPrivate.delete(
        paidSupplierEndpoints.delete(String(id))
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paidsuppliers"] });
      notification.success({ message: "To‘lov muvaffaqiyatli o‘chirildi" });
    },
    onError: () => {
      notification.error({ message: "To‘lovni o‘chirishda xatolik yuz berdi" });
    },
  });
};
