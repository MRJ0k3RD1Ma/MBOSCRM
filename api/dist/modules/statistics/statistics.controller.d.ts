import { StatisticsService } from './statistics.service';
export declare class StatisticsController {
    private readonly statisticsService;
    constructor(statisticsService: StatisticsService);
    findOne(year?: number): Promise<{
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
