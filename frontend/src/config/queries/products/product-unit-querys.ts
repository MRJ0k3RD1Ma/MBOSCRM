import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import axiosPrivate from "../../api";
import { productUnitEndpoints } from "../../endpoint";

export interface ProductUnit {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  creatorId: number;
  modifyId: number;
}

export interface ProductUnitResponse {
  data: ProductUnit[];
  total: number;
  page: number;
  limit: number;
}

type CreateInput = { name: string };
type UpdateInput = { id: number; name: string };

export const useGetAllProductUnits = (params?: {
  page?: number;
  limit?: number;
  name?: string;
}) => {
  return useQuery<ProductUnitResponse>({
    queryKey: ["product-units", params],
    queryFn: async () => {
      const { data } = await axiosPrivate.get(productUnitEndpoints.all, {
        params,
      });
      return data;
    },
  });
};

export const useGetProductUnitById = (id: number) => {
  return useQuery<ProductUnit>({
    queryKey: ["product-unit", id],
    queryFn: async () => {
      const { data } = await axiosPrivate.get(
        productUnitEndpoints.one(id.toString())
      );
      return data;
    },
    enabled: !!id,
  });
};

export const useCreateProductUnit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreateInput) => {
      const { data } = await axiosPrivate.post(
        productUnitEndpoints.create,
        input
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product-units"] });
      notification.success({ message: "Mahsulot birligi qo‘shildi" });
    },
    onError: () => {
      notification.error({ message: "Qo‘shishda xatolik yuz berdi" });
    },
  });
};

export const useUpdateProductUnit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, name }: UpdateInput) => {
      const { data } = await axiosPrivate.patch(
        productUnitEndpoints.update(id.toString()),
        { name }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product-units"] });
      notification.success({ message: "Mahsulot birligi yangilandi" });
    },
    onError: () => {
      notification.error({ message: "Yangilashda xatolik yuz berdi" });
    },
  });
};

export const useDeleteProductUnit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axiosPrivate.delete(
        productUnitEndpoints.delete(id.toString())
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product-units"] });
      notification.success({ message: "Mahsulot birligi o‘chirildi" });
    },
    onError: () => {
      notification.error({ message: "O‘chirishda xatolik yuz berdi" });
    },
  });
};
