import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import axiosPrivate from "../../api";
import { clientEndpoints } from "../../endpoint";

export interface Client {
  id: number;
  name: string;
  inn?: string;
  address?: string;
  phone?: string;
  typeId?: number;
  description?: string;
  districtId?: number | null;
}

export interface CreateClientDto {
  name: string;
  inn?: string;
  address?: string;
  phone?: string;
  typeId?: number;
  description?: string;
  districtId?: number | null;
}

export interface ClientType {
  id: number;
  name: string;
}

export interface ClientResponse {
  data: Client[];
  total: number;
  limit: number;
  page: number;
}

export interface CreateClientInput {
  name: string;
  inn: string;
  address: string;
  phone: string;
  typeId: number;
  description?: string;
}

export interface UpdateClientInput extends CreateClientInput {
  id: number;
}

export const useGetAllClients = (params?: {
  page?: number;
  limit?: number;
  name?: string;
  address?: string;
  description?: string;
  phone?: string;
  inn?: string;
  districtId?: number;
}) => {
  return useQuery<ClientResponse>({
    queryKey: ["clients", params],
    queryFn: async () => {
      const { data } = await axiosPrivate.get(clientEndpoints.all, { params });
      return data;
    },
  });
};

export const useGetClientById = (id?: number) => {
  return useQuery<Client>({
    queryKey: ["client", id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await axiosPrivate.get(clientEndpoints.one(String(id)));
      return data;
    },
  });
};

export const useCreateClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (client: CreateClientInput) => {
      const { data } = await axiosPrivate.post(clientEndpoints.create, client);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      notification.success({ message: "Client muvaffaqiyatli qo‘shildi" });
    },
    onError: () => {
      notification.error({ message: "Client qo‘shishda xatolik" });
    },
  });
};

export const useUpdateClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...rest }: UpdateClientInput) => {
      const { data } = await axiosPrivate.patch(
        clientEndpoints.update(String(id)),
        rest
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      notification.success({ message: "Client yangilandi" });
    },
    onError: () => {
      notification.error({ message: "Client yangilashda xatolik" });
    },
  });
};

export const useDeleteClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axiosPrivate.delete(
        clientEndpoints.delete(String(id))
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      notification.success({ message: "Client o‘chirildi" });
    },
    onError: () => {
      notification.error({ message: "Client o‘chirishda xatolik" });
    },
  });
};
