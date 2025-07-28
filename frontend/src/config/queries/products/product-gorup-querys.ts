import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import axiosPrivate from "../../api";
import { productGroupEndpoints } from "../../endpoint";

export interface ProductGroup {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  creatorId: number;
  modifyId: number;
}

export interface ProductGroupResponse {
  data: ProductGroup[];
  total: number;
  page: number;
  limit: number;
}

type CreateInput = { name: string };
type UpdateInput = { id: number; name: string };

export const useGetAllProductGroups = (params?: {
  page?: number;
  limit?: number;
  name?: string;
}) => {
  return useQuery<ProductGroupResponse>({
    queryKey: ["product-groups", params],
    queryFn: async () => {
      const { data } = await axiosPrivate.get(productGroupEndpoints.all, {
        params,
      });
      return data;
    },
  });
};

export const useGetProductGroupById = (id: number) => {
  return useQuery<ProductGroup>({
    queryKey: ["product-group", id],
    queryFn: async () => {
      const { data } = await axiosPrivate.get(
        productGroupEndpoints.one(id.toString())
      );
      return data;
    },
    enabled: !!id,
  });
};

export const useCreateProductGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreateInput) => {
      const { data } = await axiosPrivate.post(
        productGroupEndpoints.create,
        input
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product-groups"] });
      notification.success({ message: "Mahsulot guruhi qo‘shildi" });
    },
    onError: () => {
      notification.error({ message: "Qo‘shishda xatolik yuz berdi" });
    },
  });
};

export const useUpdateProductGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, name }: UpdateInput) => {
      const { data } = await axiosPrivate.patch(
        productGroupEndpoints.update(id.toString()),
        { name }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product-groups"] });
      notification.success({ message: "Mahsulot guruhi yangilandi" });
    },
    onError: () => {
      notification.error({ message: "Yangilashda xatolik yuz berdi" });
    },
  });
};

export const useDeleteProductGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axiosPrivate.delete(
        productGroupEndpoints.delete(id.toString())
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product-groups"] });
      notification.success({ message: "Mahsulot guruhi o‘chirildi" });
    },
    onError: () => {
      notification.error({ message: "O‘chirishda xatolik yuz berdi" });
    },
  });
};
