import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import axiosPrivate from "../../api";
import { paidOtherGroupEndpoints } from "../../endpoint";

export interface PaidOtherGroup {
  id: number;
  name: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  registerId: number | null;
  modifyId: number | null;
}

export interface PaidOtherGroupDto {
  name: string;
}

export interface PaidOtherGroupQueryParams {
  page?: number;
  limit?: number;
  name?: string;
}

export const useGetAllPaidOtherGroups = (
  params?: PaidOtherGroupQueryParams
) => {
  return useQuery({
    queryKey: ["paid-other-groups", params],
    queryFn: async () => {
      const { data } = await axiosPrivate.get(paidOtherGroupEndpoints.all, {
        params,
      });
      return data;
    },
  });
};

export const useGetPaidOtherGroupById = (id?: string) => {
  return useQuery({
    queryKey: ["paid-other-group", id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await axiosPrivate.get(paidOtherGroupEndpoints.one(id!));
      return data;
    },
  });
};

export const useCreatePaidOtherGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: PaidOtherGroupDto) => {
      const { data } = await axiosPrivate.post(
        paidOtherGroupEndpoints.create,
        input
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paid-other-groups"] });
      notification.success({
        message: "To‘lov guruhi muvaffaqiyatli qo‘shildi",
      });
    },
    onError: () => {
      notification.error({
        message: "To‘lov guruhini qo‘shishda xatolik yuz berdi",
      });
    },
  });
};

export const useUpdatePaidOtherGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      ...input
    }: PaidOtherGroupDto & { id: string }) => {
      const { data } = await axiosPrivate.patch(
        paidOtherGroupEndpoints.update(id),
        input
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paid-other-groups"] });
      notification.success({
        message: "To‘lov guruhi muvaffaqiyatli yangilandi",
      });
    },
    onError: () => {
      notification.error({
        message: "To‘lov guruhini yangilashda xatolik yuz berdi",
      });
    },
  });
};

export const useDeletePaidOtherGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosPrivate.delete(
        paidOtherGroupEndpoints.delete(id)
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paid-other-groups"] });
      notification.success({
        message: "To‘lov guruhi muvaffaqiyatli o‘chirildi",
      });
    },
    onError: () => {
      notification.error({
        message: "To‘lov guruhini o‘chirishda xatolik yuz berdi",
      });
    },
  });
};
