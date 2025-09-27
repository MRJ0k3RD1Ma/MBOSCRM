import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import axiosPrivate from "../../api";
import { notification } from "antd";
import { simCardEndpoints } from "../../endpoint";

export interface SimCard {
  id: number;
  clientId: number;
  description?: string;
  company: string;
  isActive: boolean;
  activeDate: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface SimCardResponse {
  total: number;
  page: number;
  limit: number;
  data: SimCard[];
}

export interface CreateSimCardInput {
  clientId: number;
  description?: string;
  company: string;
  isActive: boolean;
  activeDate: any;
  phoneNumber: string;
}

export interface UpdateSimCardInput extends Partial<CreateSimCardInput> {
  id: number;
}

export const useGetAllSimCards = (params?: {
  page?: number;
  limit?: number;
  clientId?: number;
  phoneNumber?: string;
  company?: string;
  description?: string;
  isActive?: boolean;
}) => {
  return useQuery<SimCardResponse>({
    queryKey: ["sim-cards", params],
    queryFn: async () => {
      const { data } = await axiosPrivate.get(simCardEndpoints.all, { params });
      return data;
    },
  });
};

export const useGetSimCardById = (id?: number) => {
  return useQuery<SimCard>({
    queryKey: ["sim-card", id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await axiosPrivate.get(simCardEndpoints.one(String(id)));
      return data;
    },
  });
};

export const useCreateSimCard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (simCard: CreateSimCardInput) => {
      const { data } = await axiosPrivate.post(
        simCardEndpoints.create,
        simCard
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sim-cards"] });
      notification.success({ message: "Sim karta muvaffaqiyatli qo‘shildi" });
    },
    onError: () => {
      notification.error({ message: "Sim karta qo‘shishda xatolik" });
    },
  });
};

export const useUpdateSimCard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...rest }: UpdateSimCardInput) => {
      const { data } = await axiosPrivate.patch(
        simCardEndpoints.update(String(id)),
        rest
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sim-cards"] });
      notification.success({ message: "Sim karta yangilandi" });
    },
    onError: () => {
      notification.error({ message: "Sim karta yangilashda xatolik" });
    },
  });
};

export const useDeleteSimCard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axiosPrivate.delete(
        simCardEndpoints.delete(String(id))
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sim-cards"] });
      notification.success({ message: "Sim karta o‘chirildi" });
    },
    onError: () => {
      notification.error({ message: "Sim karta o‘chirishda xatolik" });
    },
  });
};
