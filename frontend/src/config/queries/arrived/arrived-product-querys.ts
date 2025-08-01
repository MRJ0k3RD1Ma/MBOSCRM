import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import axiosPrivate from "../../api";
import { arrivedProductEndpoints } from "../../endpoint";

export interface ArrivedProduct {
  id: number;
  arrivedId: number;
  productId: number;
  count: number;
  price: number;
  priceCount: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ArrivedProductResponse {
  total: number;
  page: number;
  limit: number;
  data: ArrivedProduct[];
}

export interface CreateArrivedProductInput {
  arrivedId: number;
  productId: number;
  count: number;
  price: number;
  priceCount: number;
}

export interface UpdateArrivedProductInput {
  id: number;
  count: number;
  price: number;
  priceCount: number;
}

export const useGetAllArrivedProduct = (params?: {
  page?: number;
  limit?: number;
  minPrice?: number;
  maxPrice?: number;
  supplierId?: number;
  productId?: number;
}) => {
  return useQuery<ArrivedProductResponse>({
    queryKey: ["arrived-product", params],
    queryFn: async () => {
      const { data } = await axiosPrivate.get(arrivedProductEndpoints.all, {
        params,
      });
      return data;
    },
  });
};

export const useGetArrivedProductById = (id?: number) => {
  return useQuery<ArrivedProduct>({
    queryKey: ["arrived-product", id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await axiosPrivate.get(
        arrivedProductEndpoints.one(String(id))
      );
      return data;
    },
  });
};

export const useCreateArrivedProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreateArrivedProductInput) => {
      const { data } = await axiosPrivate.post(
        arrivedProductEndpoints.create,
        input
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["arrived-product"] });
      notification.success({ message: "Kirim mahsuloti qo‘shildi" });
    },
    onError: () => {
      notification.error({ message: "Qo‘shishda xatolik yuz berdi" });
    },
  });
};

export const useUpdateArrivedProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...input }: UpdateArrivedProductInput) => {
      const { data } = await axiosPrivate.patch(
        arrivedProductEndpoints.update(String(id)),
        input
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["arrived-product"] });
      notification.success({ message: "Mahsulot yangilandi" });
    },
    onError: () => {
      notification.error({ message: "Yangilashda xatolik yuz berdi" });
    },
  });
};

export const useDeleteArrivedProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axiosPrivate.delete(
        arrivedProductEndpoints.delete(String(id))
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["arrived-product"] });
      notification.success({ message: "Mahsulot o‘chirildi" });
    },
    onError: () => {
      notification.error({ message: "O‘chirishda xatolik yuz berdi" });
    },
  });
};
