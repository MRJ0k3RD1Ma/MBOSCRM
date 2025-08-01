import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import axiosPrivate from "../../api";
import { saleEndpoints } from "../../endpoint";

export interface SaleProductInput {
  productId: number;
  count: number;
  price: number;
}

export interface CreateSaleInput {
  date: string;
  clientId: number;
  credit: number;
  products: SaleProductInput[];
}

export interface UpdateSaleInput {
  id: number;
  date: string;
  credit: number;
}

export interface SaleProduct {
  id: number;
  saleId: number;
  productId: number;
  price: number;
  count: number;
  priceCount: number;
  is_subscribe: boolean;
  registerId: number;
  modifyId: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Sale {
  id: number;
  date: string;
  code: string;
  codeId: number;
  clientId: number;
  price: number;
  dept: number;
  credit: number;
  state: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  registerId: number;
  modifyId: number;
  SaleProduct: SaleProduct[];
}

export interface SaleResponse {
  total: number;
  page: number;
  limit: number;
  data: Sale[];
}

export const useGetAllSale = (params?: {
  page?: number;
  limit?: number;
  minPrice?: number;
  maxPrice?: number;
  fromDate?: string;
  toDate?: string;
  clientId?: number;
  code?: string;
}) => {
  return useQuery<SaleResponse>({
    queryKey: ["sale", params],
    queryFn: async () => {
      const { data } = await axiosPrivate.get(saleEndpoints.all, { params });
      return data;
    },
  });
};

export const useGetSaleById = (id?: number, enabled = true) => {
  return useQuery<Sale>({
    queryKey: ["sale", id],
    enabled: enabled && !!id,
    queryFn: async () => {
      const { data } = await axiosPrivate.get(saleEndpoints.one(String(id)));
      return data;
    },
  });
};

export const useCreateSale = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreateSaleInput) => {
      const { data } = await axiosPrivate.post(saleEndpoints.create, input);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sale"] });
      notification.success({ message: "Savdo muvaffaqiyatli qo‘shildi" });
    },
    onError: () => {
      notification.error({ message: "Savdo qo‘shishda xatolik yuz berdi" });
    },
  });
};

export const useUpdateSale = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...input }: UpdateSaleInput) => {
      const { data } = await axiosPrivate.patch(
        saleEndpoints.update(String(id)),
        input
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sale"] });
      notification.success({ message: "Savdo yangilandi" });
    },
    onError: () => {
      notification.error({ message: "Savdoni yangilashda xatolik yuz berdi" });
    },
  });
};

export const useDeleteSale = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axiosPrivate.delete(
        saleEndpoints.delete(String(id))
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sale"] });
      notification.success({ message: "Savdo o‘chirildi" });
    },
    onError: () => {
      notification.error({ message: "Savdoni o‘chirishda xatolik yuz berdi" });
    },
  });
};
