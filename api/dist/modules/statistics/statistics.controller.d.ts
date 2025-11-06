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
        };
        charts: {
            monthlyStats: {
                month: number;
                tushum: any;
                chiqim: any;
                expectedSubscription: number;
            }[];
            subscriptionForecast: number[];
        };
    }>;
}
