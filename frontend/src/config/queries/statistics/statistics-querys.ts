import axiosPrivate from "../../api";
import { statisticsEndpoints } from "../../endpoint";
import { useQuery } from "@tanstack/react-query";

export interface StatisticsResponse {
  balance: number;
  month: {
    name: string;
    income: number;
    outcome: number;
    credit: number;
  };
  totals: {
    clients: number;
    contracts: number;
    income: number;
    expenses: number;
    debts: number;
    currentMonthIncome: number;
    currentMonthExpenses: number;
    yearlyIncome: number;
    lastYearIncome: number;
  };
  charts: {
    monthlyStats: {
      month: number;
      tushum: number;
      chiqim: number;
      qarzdorlik: number;
      expectedSubscription: number;
    }[];
    subscriptionForecast: number[];
  };
}

export interface StatisticsOutcomeResponse {
  paidSupplier: number;
  paidOther: number;
  paidServer: number;
}

export const useGetStatistics = (params?: { year?: number }) => {
  return useQuery<StatisticsResponse>({
    queryKey: ["statistics", params?.year],
    queryFn: async () => {
      const { data } = await axiosPrivate.get(statisticsEndpoints.get, {
        params,
      });
      return data;
    },
  });
};

export const useGetStatisticsOutcome = (params?: {
  fromDate?: string;
  toDate?: string;
}) => {
  return useQuery<StatisticsOutcomeResponse>({
    queryKey: ["statistics-outcome", params?.fromDate, params?.toDate],
    queryFn: async () => {
      const { data } = await axiosPrivate.get(statisticsEndpoints.getOutcome, {
        params,
      });
      return data;
    },
  });
};
