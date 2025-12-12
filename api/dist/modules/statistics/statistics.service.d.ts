import { PrismaService } from "../prisma/prisma.service";
export declare class StatisticsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getStatistics(year?: number): Promise<{
        balance: number;
        totals: {
            clients: number;
            contracts: number;
            income: any;
            expenses: any;
            debts: number;
            currentMonthIncome: any;
            currentMonthExpenses: any;
            yearlyIncome: any;
            lastYearIncome: any;
        };
        month: {
            name: string;
            income: any;
            outcome: any;
            credit: any;
        };
        charts: {
            monthlyStats: {
                month: number;
                tushum: any;
                chiqim: any;
                expectedSubscription: number;
                productsSold: any;
                servicesSold: any;
                subscriptionSold: any;
                credit: any;
            }[];
            subscriptionForecast: number[];
        };
    }>;
}
