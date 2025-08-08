import { useQuery } from "@tanstack/react-query";
import axiosPrivate from "../../api";
import { statisticsEndpoints } from "../../endpoint";

export interface StatisticsResponse {
  balance: number;
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

export const useGetStatistics = () => {
  return useQuery<StatisticsResponse>({
    queryKey: ["statistics"],
    queryFn: async () => {
      const { data } = await axiosPrivate.get(statisticsEndpoints.get);
      return data;
    },
  });
};
