import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import axiosPrivate from "../../api";
import { serverEndpoints } from "../../endpoint";

export interface Server {
  id: number;
  name: string;
  responsible: string;
  plan: string;
  endDate: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  registerId: number;
  daysLeft?: number;
  modifyId: number;
  state: "RUNNING" | "STOPPED" | string;
  paidServers?: any[];
}

export interface ServerResponse {
  total: number;
  page: number;
  limit: number;
  data: Server[];
}
export interface CreateServerInput {
  name: string;
  plan?: string;
  responsible?: string;
  description?: string;
  endDate: string;
}

export interface UpdateServerInput extends CreateServerInput {
  id: number;
}

export const useGetAllServers = (params?: {
  page?: number;
  limit?: number;
  name?: string;
  responsible?: string;
  plan?: string;
}) => {
  return useQuery<ServerResponse>({
    queryKey: ["servers", params],
    queryFn: async () => {
      const { data } = await axiosPrivate.get(serverEndpoints.all, { params });
      return data;
    },
  });
};

export const useGetServerById = (id?: number) => {
  return useQuery<Server>({
    queryKey: ["server", id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await axiosPrivate.get(serverEndpoints.one(String(id)));
      return data;
    },
  });
};

export const useCreateServer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (server: CreateServerInput) => {
      const { data } = await axiosPrivate.post(serverEndpoints.create, server);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["servers"] });
      notification.success({ message: "Server muvaffaqiyatli qo‘shildi" });
    },
    onError: () => {
      notification.error({ message: "Server qo‘shishda xatolik" });
    },
  });
};

export const useUpdateServer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...rest }: UpdateServerInput) => {
      const { data } = await axiosPrivate.patch(
        serverEndpoints.update(String(id)),
        rest
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["servers"] });
      notification.success({ message: "Server yangilandi" });
    },
    onError: () => {
      notification.error({ message: "Server yangilashda xatolik" });
    },
  });
};

export const useDeleteServer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axiosPrivate.delete(
        serverEndpoints.delete(String(id))
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["servers"] });
      notification.success({ message: "Server o‘chirildi" });
    },
    onError: () => {
      notification.error({ message: "Server o‘chirishda xatolik" });
    },
  });
};
