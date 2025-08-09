import { useQuery } from "@tanstack/react-query";
import axiosPrivate from "../../api";
import { locationEndpoints } from "../../endpoint";

export interface Region {
  id: number;
  name: string;
}

export interface District {
  id: number;
  name: string;
  regionId: number;
}

export const useGetAllRegions = () => {
  return useQuery<Region[]>({
    queryKey: ["regions"],
    queryFn: async () => {
      const { data } = await axiosPrivate.get(locationEndpoints.region);
      return data;
    },
  });
};

export const useGetDistrictsByRegion = (regionId?: number) => {
  return useQuery<District[]>({
    queryKey: ["districts", regionId],
    enabled: !!regionId,
    queryFn: async () => {
      const { data } = await axiosPrivate.get(
        locationEndpoints.districtByRegion(regionId!)
      );
      return data;
    },
  });
};
