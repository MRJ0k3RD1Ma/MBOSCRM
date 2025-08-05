import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import axiosPrivate from "../../api";
import { subscribeEndpoints } from "../../endpoint";

export interface Subscribe {
  id: number;
  paying_date: string;
  clientId: number;
  saleId: number;
  price: number;
  paid: number;
  state: "PAYING" | "NOTPAYING" | string;
  createdAt?: string;
  updatedAt?: string;
  client?: any;
  sale?: any;
}

export interface SubscribeDto {
  payingDate: string;
  clientId: number;
  saleId: number;
  price: number;
  paid: number;
  state: string;
}

export interface UpdateSubscribeDto {
  payingDate?: string;
  price?: number;
  paid?: number;
  state?: string;
}

export interface SubscribeResponse {
  data: Subscribe[];
  total: number;
  page: number;
  limit: number;
}

export const useGetAllSubscribes = (params?: {
  page?: number;
  limit?: number;
  fromDate?: string;
  toDate?: string;
  minPrice?: number;
  maxPrice?: number;
  clientId?: number;
  saleId?: number;
  state?: string;
}) => {
  return useQuery<SubscribeResponse>({
    queryKey: ["subscribes", params],
    queryFn: async () => {
      const { data } = await axiosPrivate.get(subscribeEndpoints.all, {
        params,
      });
      return data;
    },
  });
};

export const useGetSubscribeById = (id?: number) => {
  return useQuery<Subscribe>({
    queryKey: ["subscribe", id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await axiosPrivate.get(
        subscribeEndpoints.one(String(id))
      );
      return data;
    },
  });
};

export const useCreateSubscribe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: SubscribeDto) => {
      const { data } = await axiosPrivate.post(
        subscribeEndpoints.create,
        input
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscribes"] });
      notification.success({ message: "Subscribe qo‘shildi" });
    },
    onError: () => {
      notification.error({ message: "Subscribe qo‘shishda xatolik" });
    },
  });
};

export const useUpdateSubscribe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      ...update
    }: UpdateSubscribeDto & { id: number }) => {
      const { data } = await axiosPrivate.patch(
        subscribeEndpoints.update(String(id)),
        update
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscribes"] });
      notification.success({ message: "Subscribe yangilandi" });
    },
    onError: () => {
      notification.error({ message: "Subscribe yangilashda xatolik" });
    },
  });
};

export const useDeleteSubscribe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axiosPrivate.delete(
        subscribeEndpoints.delete(String(id))
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscribes"] });
      notification.success({ message: "Subscribe o‘chirildi" });
    },
    onError: () => {
      notification.error({ message: "Subscribe o‘chirishda xatolik" });
    },
  });
};
