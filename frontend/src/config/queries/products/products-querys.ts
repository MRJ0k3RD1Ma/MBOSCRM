import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import axiosPrivate from "../../api";
import { productEndpoints } from "../../endpoint";

export interface Product {
  id: number;
  name: string;
  barcode: string;
  barcodeId?: number;
  groupId: number;
  unitId: number;
  priceIncome: number;
  reminderFirst: number;
  price: number;
  type: "DEVICE" | "SERVICE" | "SERVICE";
  countReminder: number;
  countArrived: number;
  countSale: number;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  creatorId?: number;
  modifyId?: number;
}

export interface CreateProductInput {
  name: string;
  barcode: string;
  groupId: number;
  unitId: number;
  priceIncome: number;
  reminderFirst: number;
  price: number;
  type: string;
  countReminder: number;
  countArrived: number;
  countSale: number;
}

export interface UpdateProductInput extends CreateProductInput {
  id: number;
}

export interface ProductResponse {
  total: number;
  page: number;
  limit: number;
  data: Product[];
}

export const useGetAllProducts = (params?: {
  page?: number;
  limit?: number;
  name?: string;
}) => {
  return useQuery<ProductResponse>({
    queryKey: ["products", params],
    queryFn: async () => {
      const { data } = await axiosPrivate.get(productEndpoints.all, { params });
      return data;
    },
  });
};

export const useGetProductById = (id?: number) => {
  return useQuery<Product>({
    queryKey: ["product", id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await axiosPrivate.get(productEndpoints.one(String(id)));
      return data;
    },
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreateProductInput) => {
      const { data } = await axiosPrivate.post(productEndpoints.create, input);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      notification.success({ message: "Mahsulot muvaffaqiyatli qo‘shildi" });
    },
    onError: () => {
      notification.error({ message: "Mahsulot qo‘shishda xatolik yuz berdi" });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...input }: UpdateProductInput) => {
      const { data } = await axiosPrivate.patch(
        productEndpoints.update(String(id)),
        input
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      notification.success({ message: "Mahsulot yangilandi" });
    },
    onError: () => {
      notification.error({ message: "Mahsulot yangilashda xatolik" });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axiosPrivate.delete(
        productEndpoints.delete(String(id))
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      notification.success({ message: "Mahsulot o‘chirildi" });
    },
    onError: () => {
      notification.error({
        message: "Mahsulotni o‘chirishda xatolik yuz berdi",
      });
    },
  });
};
