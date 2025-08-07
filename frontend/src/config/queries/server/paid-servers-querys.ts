import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import axiosPrivate from "../../api";
import { paidServerEndpoints } from "../../endpoint";

export interface PaidServer {
  id: number;
  serverId: number;
  description: string;
  paymentTypeId: number;
  endDate: string;
  price: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  registerId: number | null;
  modifyId: number | null;
  paymentType?: {
    id: number;
    name: string;
    icon: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    registerId: number | null;
    modifyId: number | null;
  };
}

export interface PaidServerDto {
  serverId: number;
  description: string;
  paymentTypeId: number;
  endDate: string;
  price: number;
}

export interface PaidServerQueryParams {
  page?: number;
  limit?: number;
  minPrice?: number;
  maxPrice?: number;
  description?: string;
  fromDate?: string;
  toDate?: string;
  serverId?: number;
}

export const useGetAllPaidServers = (params?: PaidServerQueryParams) => {
  return useQuery<PaidServer[]>({
    queryKey: ["paid-servers", params],
    queryFn: async () => {
      const { data } = await axiosPrivate.get(paidServerEndpoints.all, {
        params,
      });
      return data;
    },
  });
};

export const useGetPaidServerById = (id?: string) => {
  return useQuery<PaidServer>({
    queryKey: ["paid-server", id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await axiosPrivate.get(paidServerEndpoints.one(id!));
      return data;
    },
  });
};

// ===================== Mutations =====================

export const useCreatePaidServer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: PaidServerDto) => {
      const { data } = await axiosPrivate.post(
        paidServerEndpoints.create,
        input
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paid-servers"] });
      notification.success({
        message: "To‘lov serveri muvaffaqiyatli qo‘shildi",
      });
    },
    onError: () => {
      notification.error({
        message: "To‘lov serverini qo‘shishda xatolik yuz berdi",
      });
    },
  });
};

export const useUpdatePaidServer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...input }: PaidServerDto & { id: string }) => {
      const { data } = await axiosPrivate.patch(
        paidServerEndpoints.update(id),
        input
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paid-servers"] });
      notification.success({
        message: "To‘lov serveri muvaffaqiyatli yangilandi",
      });
    },
    onError: () => {
      notification.error({
        message: "To‘lov serverini yangilashda xatolik yuz berdi",
      });
    },
  });
};

export const useDeletePaidServer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosPrivate.delete(
        paidServerEndpoints.delete(id)
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paid-servers"] });
      notification.success({
        message: "To‘lov serveri muvaffaqiyatli o‘chirildi",
      });
    },
    onError: () => {
      notification.error({
        message: "To‘lov serverini o‘chirishda xatolik yuz berdi",
      });
    },
  });
};
