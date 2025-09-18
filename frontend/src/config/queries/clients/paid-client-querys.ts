import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import axiosPrivate from "../../api";
import { notification } from "antd";
import { paidClientEndpoints } from "../../endpoint";

interface PaidClientsResponse {
  data: PaidClient[];
  page: number;
  limit: number;
  total: number;
  price: number;
}
export interface PaidClient {
  id: number;
  clientId: number;
  saleId: number;
  paymentId: number;
  paidDate: string;
  price: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  registerId: number | null;
  modifyId: number | null;
  Client?: any;
  Sale?: any;
  Payment?: any;
}

export interface PaidClientDto {
  clientId: number;
  saleId: number;
  paymentId: number;
  paidDate: string;
  price: number;
}

export const useGetAllPaidClients = (params?: {
  page?: number;
  limit?: number;
  minPrice?: number;
  maxPrice?: number;
  fromDate?: string;
  toDate?: string;
  clientId?: number;
  saleId?: number;
  paymentId?: number;
}) => {
  return useQuery<PaidClientsResponse>({
    queryKey: ["paid-clients", params],
    queryFn: async () => {
      const { data } = await axiosPrivate.get(paidClientEndpoints.all, {
        params,
      });
      return data;
    },
  });
};

export const useGetPaidClientById = (id?: number) => {
  return useQuery<PaidClient>({
    queryKey: ["paid-client", id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await axiosPrivate.get(
        `${paidClientEndpoints.one}/${id}`
      );
      return data;
    },
  });
};

export const useCreatePaidClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: PaidClientDto) => {
      const { data } = await axiosPrivate.post(
        paidClientEndpoints.create,
        input
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paid-clients"] });
      notification.success({ message: "To‘lov muvaffaqiyatli qo‘shildi" });
    },
    onError: () => {
      notification.error({ message: "To‘lovni qo‘shishda xatolik yuz berdi" });
    },
  });
};

export const useUpdatePaidClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...input }: PaidClientDto & { id: number }) => {
      const { data } = await axiosPrivate.patch(
        paidClientEndpoints.update(String(id)),
        input
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paid-clients"] });
      notification.success({ message: "To‘lov muvaffaqiyatli yangilandi" });
    },
    onError: () => {
      notification.error({ message: "To‘lovni yangilashda xatolik yuz berdi" });
    },
  });
};

export const useDeletePaidClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axiosPrivate.delete(
        paidClientEndpoints.delete(String(id))
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paid-clients"] });
      notification.success({ message: "To‘lov muvaffaqiyatli o‘chirildi" });
    },
    onError: () => {
      notification.error({ message: "To‘lovni o‘chirishda xatolik yuz berdi" });
    },
  });
};
