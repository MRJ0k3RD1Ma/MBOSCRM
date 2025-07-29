import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import axiosPrivate from "../../api";
import { supplierEndpoints } from "../../endpoint";

export interface Supplier {
  id: number;
  name: string;
  phone: string;
  phoneTwo: string;
  description: string;
  balance: number;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  registerId?: number;
  modifyId?: number;
}

export interface CreateSupplierInput {
  name: string;
  phone: string;
  phoneTwo?: string;
  description?: string;
  balance?: number;
}

export interface UpdateSupplierInput extends CreateSupplierInput {
  id: number;
}

export interface SupplierResponse {
  total: number;
  page: number;
  limit: number;
  data: Supplier[];
}

export const useGetAllSuppliers = (params?: {
  page?: number;
  limit?: number;
  name?: string;
  phone?: string;
  description?: string;
}) => {
  return useQuery<SupplierResponse>({
    queryKey: ["suppliers", params],
    queryFn: async () => {
      const { data } = await axiosPrivate.get(supplierEndpoints.all, {
        params,
      });
      return data;
    },
  });
};

export const useGetSupplierById = (id?: number) => {
  return useQuery<Supplier>({
    queryKey: ["supplier", id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await axiosPrivate.get(
        supplierEndpoints.one(String(id))
      );
      return data;
    },
  });
};

export const useCreateSupplier = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreateSupplierInput) => {
      const { data } = await axiosPrivate.post(supplierEndpoints.create, input);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      notification.success({ message: "Ta'minotchi muvaffaqiyatli qo‘shildi" });
    },
    onError: () => {
      notification.error({
        message: "Ta'minotchi qo‘shishda xatolik yuz berdi",
      });
    },
  });
};

export const useUpdateSupplier = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...input }: UpdateSupplierInput) => {
      const { data } = await axiosPrivate.patch(
        supplierEndpoints.update(String(id)),
        input
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      notification.success({ message: "Ta'minotchi yangilandi" });
    },
    onError: () => {
      notification.error({
        message: "Ta'minotchini yangilashda xatolik yuz berdi",
      });
    },
  });
};

export const useDeleteSupplier = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axiosPrivate.delete(
        supplierEndpoints.delete(String(id))
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      notification.success({ message: "Ta'minotchi o‘chirildi" });
    },
    onError: () => {
      notification.error({
        message: "Ta'minotchini o‘chirishda xatolik yuz berdi",
      });
    },
  });
};
