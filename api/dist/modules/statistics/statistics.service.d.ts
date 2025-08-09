import { PrismaService } from '../prisma/prisma.service';
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
            debts: any;
            currentMonthIncome: any;
            currentMonthExpenses: any;
            yearlyIncome: any;
            lastYearIncome: any;
        };
        charts: {
            monthlyStats: {
                month: number;
                tushum: any;
                chiqim: any;
                qarzdorlik: any;
                expectedSubscription: number;
            }[];
            subscriptionForecast: number[];
        };
    }>;
}
