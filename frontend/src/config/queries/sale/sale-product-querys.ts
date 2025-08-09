import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import axiosPrivate from "../../api";
import { saleProductEndpoints } from "../../endpoint";

export interface SaleProduct {
  id: number;
  saleId: number;
  productId: number;
  count: number;
  price: number;
  priceCount: number;
  is_subscribe: boolean;
  registerId: number;
  modifyId: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  product?: {
    id: number;
    name: string;
    barcode: string;
    barcodeId: number;
    groupId: number;
    unitId: number;
    priceIncome: number;
    reminderFirst: number;
    price: number;
    type: string;
    countReminder: number;
    countArrived: number;
    countSale: number;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    creatorId: number;
    modifyId: number;
  };
}

export interface SaleProductResponse {
  total: number;
  page: number;
  limit: number;
  data: SaleProduct[];
}

export interface CreateSaleProductInput {
  saleId: number;
  productId: number;
  count: number;
  price: number;
}

export interface UpdateSaleProductInput {
  id: number;
  saleId?: number;
  productId?: number;
  count?: number;
  price?: number;
}

export const useGetAllSaleProduct = (params?: {
  page?: number;
  limit?: number;
  saleId?: number;
  clientId?: number;
  isSubscribe?: boolean;
  productId?: number;
}) => {
  return useQuery<SaleProductResponse>({
    queryKey: ["sale-product", params],
    queryFn: async () => {
      const { data } = await axiosPrivate.get(saleProductEndpoints.all, {
        params,
      });
      return data;
    },
  });
};

export const useGetSaleProductById = (id?: number) => {
  return useQuery<SaleProduct>({
    queryKey: ["sale-product", id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await axiosPrivate.get(
        saleProductEndpoints.one(String(id))
      );
      return data;
    },
  });
};

export const useCreateSaleProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreateSaleProductInput) => {
      const { data } = await axiosPrivate.post(
        saleProductEndpoints.create,
        input
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sale-product"] });
      notification.success({ message: "Sotuv mahsuloti qo‘shildi" });
    },
    onError: () => {
      notification.error({ message: "Qo‘shishda xatolik yuz berdi" });
    },
  });
};

export const useUpdateSaleProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...input }: UpdateSaleProductInput) => {
      const { data } = await axiosPrivate.patch(
        saleProductEndpoints.update(String(id)),
        input
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sale-product"] });
      notification.success({ message: "Mahsulot yangilandi" });
    },
    onError: () => {
      notification.error({ message: "Yangilashda xatolik yuz berdi" });
    },
  });
};

export const useDeleteSaleProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axiosPrivate.delete(
        saleProductEndpoints.delete(String(id))
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sale-product"] });
      notification.success({ message: "Mahsulot o‘chirildi" });
    },
    onError: () => {
      notification.error({ message: "O‘chirishda xatolik yuz berdi" });
    },
  });
};
