import { useQuery } from "@tanstack/react-query";
import { userEndpoints } from "../../config/endpoint";
import { api } from "../../config";

export const useAuthCheck = (token: string | null) => {
  return useQuery({
    queryKey: ["authCheck"],
    queryFn: async () => {
      const res = await api.get(userEndpoints.me, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
    enabled: !!token,
    retry: false,
  });
};
