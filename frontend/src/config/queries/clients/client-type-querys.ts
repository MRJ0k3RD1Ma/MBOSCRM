import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import axiosPrivate from "../../api";
import { clientTypeEndpoints } from "../../endpoint";

export interface ClientType {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}

export interface ClientTypeResponse {
  data: ClientType[];
  page: number;
  limit: number;
  total: number;
}

type CreateInput = { name: string };
type UpdateInput = { id: number; name: string };

export const useGetAllClientTypes = (params?: {
  page?: number;
  limit?: number;
  name?: string;
}) => {
  return useQuery<ClientTypeResponse>({
    queryKey: ["client-types", params],
    queryFn: async () => {
      const { data } = await axiosPrivate.get(clientTypeEndpoints.all, {
        params,
      });
      return data;
    },
  });
};

export const useCreateClientType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newType: CreateInput) => {
      const { data } = await axiosPrivate.post(
        clientTypeEndpoints.create,
        newType
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client-types"] });
      notification.success({ message: "Muvaffaqiyatli qo‘shildi" });
    },
    onError: () => {
      notification.error({ message: "Qo‘shishda xatolik" });
    },
  });
};

export const useUpdateClientType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, name }: UpdateInput) => {
      const { data } = await axiosPrivate.patch(
        clientTypeEndpoints.update(id.toString()),
        { name }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client-types"] });
      notification.success({ message: "Muvaffaqiyatli yangilandi" });
    },
    onError: () => {
      notification.error({ message: "Yangilashda xatolik" });
    },
  });
};

export const useDeleteClientType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axiosPrivate.delete(
        clientTypeEndpoints.delete(id.toString())
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client-types"] });
      notification.success({ message: "Muvaffaqiyatli o‘chirildi" });
    },
    onError: () => {
      notification.error({ message: "O‘chirishda xatolik" });
    },
  });
};
