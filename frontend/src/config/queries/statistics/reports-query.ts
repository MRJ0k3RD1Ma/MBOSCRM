import axiosPrivate from "../../api";
import { statisticsEndpoints } from "../../endpoint";
import { useQuery } from "@tanstack/react-query";

export interface ExportRecord {
    name: string;
    type: string;
    remiderInStartOfMonth: number;
    numberOfSold: number;
    priceOfSold: number;
    numberOfArrived: number;
    priceOfArrived: number;
    profit: number;
    remiderInEndOfMonth: number;
}

export interface ExportResponse {
    rows: ExportRecord[];
    totals: {
        priceOfTotalSold: number;
        priceOfTotalArrived: number;
        profit: number;
    };
}

export const useGetExportStatistics = (
    params: { year: number; month: number },
    enabled: boolean = true
) => {
    return useQuery<ExportResponse>({
        queryKey: ["statistics-export", params.year, params.month],
        queryFn: async () => {
            const { data } = await axiosPrivate.get(statisticsEndpoints.exportJson, {
                params,
            });
            return data;
        },
        enabled: enabled && !!params.year && !!params.month,
    });
};

export const useDownloadReport = () => {
    const downloadReport = async (year: number, month: number) => {
        try {
            const response = await axiosPrivate.get(statisticsEndpoints.exportExcel, {
                params: { year, month },
                responseType: "blob",
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `hisobot_${year}_${month}.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("Download failed", error);
        }
    };

    return { downloadReport };
};

