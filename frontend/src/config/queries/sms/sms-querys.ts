import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import axiosPrivate from "../../api";
import { notification } from "antd";
import { smsEndpoints } from "../../endpoint";

export interface Sms {
  id: number;
  accessId: string | null;
  clientId: string | null;
  phone_number: string;
  message: string;
  messageId: string | null;
  state: "NEW" | "SENT" | "FAILED";
  count: number;
  price: number;
  crmId: string | null;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  client?: any | null;
  crm?: any | null;
}

export interface SmsResponse {
  total: number;
  page: number;
  limit: number;
  data: Sms[];
}

export interface SendSmsDto {
  mobile_phone: string;
  message: string;
}

export const useGetAllSms = (
  params?: { page?: number; limit?: number; message?: string },
  options?: { enabled?: boolean }
) => {
  return useQuery<SmsResponse>({
    queryKey: ["sms", params],
    queryFn: async () => {
      const { data } = await axiosPrivate.get(smsEndpoints.all, { params });
      return data;
    },
    enabled: options?.enabled ?? true,
  });
};

export const useSendSms = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: SendSmsDto) => {
      const { data } = await axiosPrivate.post(smsEndpoints.create, payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sms"] });
      notification.success({ message: "SMS muvaffaqiyatli yuborildi" });
    },
    onError: () => {
      notification.error({ message: "SMS yuborishda xatolik" });
    },
  });
};
