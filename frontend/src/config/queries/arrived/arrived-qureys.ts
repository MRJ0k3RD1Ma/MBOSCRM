import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import axiosPrivate from "../../api";
import { arrivedEndpoints } from "../../endpoint";

export interface ArrivedProductInput {
  productId: number;
  count: number;
  price: number;
  priceCount: number;
}

export interface CreateArrivedInput {
  date: string;
  code: string;
  codeId: number;
  waybillNumber: string;
  supplierId: number;
  description: string;
  products: ArrivedProductInput[];
}

export interface UpdateArrivedInput {
  id: number;
  date: string;
  code: string;
  codeId: number;
  waybillNumber: string;
  supplierId: number;
  description: string;
  price: number;
}

export interface Arrived {
  id: number;
  date: string;
  code: string;
  codeId: number;
  waybillNumber: string;
  supplierId: number;
  description: string;
  price: number;
  isDeleted: boolean;
  created: string;
  updated: string;
  registerId: number;
  modifyId: number;
  ArrivedProduct?: any[];
}

export interface ArrivedResponse {
  total: number;
  page: number;
  limit: number;
  data: Arrived[];
}

export const useGetAllArrived = (params?: {
  page?: number;
  limit?: number;
  minPrice?: number;
  maxPrice?: number;
  fromDate?: string;
  toDate?: string;
  supplierId?: number;
  code?: string;
}) => {
  return useQuery<ArrivedResponse>({
    queryKey: ["arrived", params],
    queryFn: async () => {
      const { data } = await axiosPrivate.get(arrivedEndpoints.all, { params });
      return data;
    },
  });
};

export const useGetArrivedById = (id?: number) => {
  return useQuery<Arrived>({
    queryKey: ["arrived", id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await axiosPrivate.get(arrivedEndpoints.one(String(id)));
      return data;
    },
  });
};

export const useCreateArrived = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreateArrivedInput) => {
      const { data } = await axiosPrivate.post(arrivedEndpoints.create, input);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["arrived"] });
      notification.success({ message: "Kirim muvaffaqiyatli qo‘shildi" });
    },
    onError: () => {
      notification.error({ message: "Kirim qo‘shishda xatolik yuz berdi" });
    },
  });
};

export const useUpdateArrived = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...input }: UpdateArrivedInput) => {
      const { data } = await axiosPrivate.patch(
        arrivedEndpoints.update(String(id)),
        input
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["arrived"] });
      notification.success({ message: "Kirim yangilandi" });
    },
    onError: () => {
      notification.error({ message: "Kirimni yangilashda xatolik yuz berdi" });
    },
  });
};

export const useDeleteArrived = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axiosPrivate.delete(
        arrivedEndpoints.delete(String(id))
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["arrived"] });
      notification.success({ message: "Kirim o‘chirildi" });
    },
    onError: () => {
      notification.error({ message: "Kirimni o‘chirishda xatolik yuz berdi" });
    },
  });
};
