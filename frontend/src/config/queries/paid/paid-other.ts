import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import axiosPrivate from "../../api";
import { paidOtherEndpoints } from "../../endpoint";

export interface PaidOther {
  id: number;
  type: "INCOME" | "EXPENSE";
  groupId: number;
  price: number;
  description: string;
  paidDate: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  registerId: number | null;
  modifyId: number | null;
  group?: {
    id: number;
    name: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    registerId: number | null;
    modifyId: number | null;
  };
}

export interface PaidOtherDto {
  groupId: number;
  type: "INCOME" | "EXPENSE";
  description: string;
  paidDate: string;
  price: number;
}

export interface PaidOtherQueryParams {
  page?: number;
  limit?: number;
  minPrice?: number;
  maxPrice?: number;
  description?: string;
  fromDate?: string;
  toDate?: string;
  groupId?: number;
  type?: "INCOME" | "EXPENSE";
}

export const useGetAllPaidOthers = (params?: PaidOtherQueryParams) => {
  return useQuery<PaidOther[]>({
    queryKey: ["paid-others", params],
    queryFn: async () => {
      const { data } = await axiosPrivate.get(paidOtherEndpoints.all, {
        params,
      });
      return data;
    },
  });
};

export const useGetPaidOtherById = (id?: string) => {
  return useQuery<PaidOther>({
    queryKey: ["paid-other", id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await axiosPrivate.get(paidOtherEndpoints.one(id!));
      return data;
    },
  });
};

export const useCreatePaidOther = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: PaidOtherDto) => {
      const { data } = await axiosPrivate.post(
        paidOtherEndpoints.create,
        input
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paid-others"] });
      notification.success({
        message: "To‘lov (boshqa) muvaffaqiyatli qo‘shildi",
      });
    },
    onError: () => {
      notification.error({
        message: "To‘lov (boshqa) qo‘shishda xatolik yuz berdi",
      });
    },
  });
};

export const useUpdatePaidOther = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...input }: PaidOtherDto & { id: string }) => {
      const { data } = await axiosPrivate.patch(
        paidOtherEndpoints.update(id),
        input
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paid-others"] });
      notification.success({
        message: "To‘lov (boshqa) muvaffaqiyatli yangilandi",
      });
    },
    onError: () => {
      notification.error({
        message: "To‘lov (boshqa) yangilashda xatolik yuz berdi",
      });
    },
  });
};

export const useDeletePaidOther = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosPrivate.delete(paidOtherEndpoints.delete(id));
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paid-others"] });
      notification.success({
        message: "To‘lov (boshqa) muvaffaqiyatli o‘chirildi",
      });
    },
    onError: () => {
      notification.error({
        message: "To‘lov (boshqa) o‘chirishda xatolik yuz berdi",
      });
    },
  });
};
